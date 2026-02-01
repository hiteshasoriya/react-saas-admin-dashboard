import {
  Box,
  Text,
  Flex,
  Select,
  useColorModeValue,
  HStack,
  Button,
  IconButton,
  Skeleton,
} from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from "recharts";
import { FiCalendar, FiFilter, FiDownload, FiRefreshCw } from "react-icons/fi";
import { useState } from "react";
import { generateChartData } from "../utils/helpers";
import toast, { Toaster } from "react-hot-toast";

const RevenueChart = ({ sidebarCollapsed = false }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const isCollapsed = sidebarCollapsed;

  const [timeRange, setTimeRange] = useState("monthly");
  const [selectedMetric, setSelectedMetric] = useState("revenue");
  const [chartData, setChartData] = useState(generateChartData("monthly"));
  const [isLoading, setIsLoading] = useState(false);

  const metrics = [
    { key: "revenue", label: "Revenue", color: "#0EA5E9" },
    { key: "users", label: "Users", color: "#10B981" },
    { key: "profit", label: "Profit", color: "#8B5CF6" },
  ];

  const handleTimeRangeChange = (range) => {
    setIsLoading(true);
    setTimeRange(range);
    setTimeout(() => {
      setChartData(generateChartData(range));
      setIsLoading(false);
      toast.success(`Switched to ${range} view`);
    }, 500);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setChartData(generateChartData(timeRange));
      setIsLoading(false);
      toast.success("Chart data refreshed");
    }, 800);
  };

  const handleExport = () => {
    const canvas = document.querySelector("svg.recharts-surface");
    if (canvas) {
      const svgData = new XMLSerializer().serializeToString(canvas);
      const canvasElement = document.createElement("canvas");
      const ctx = canvasElement.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvasElement.width = img.width;
        canvasElement.height = img.height;
        ctx.drawImage(img, 0, 0);

        const pngUrl = canvasElement.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `revenue-chart-${timeRange}.png`;
        downloadLink.click();

        toast.success("Chart exported as PNG");
      };

      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    }
  };

  return (
    <Box
      bg={bgColor}
      borderRadius="lg"
      boxShadow="sm"
      border="1px"
      borderColor={borderColor}
      p={isCollapsed ? 4 : 6}
      transition="all 0.3s ease"
      _hover={{
        boxShadow: isCollapsed ? "lg" : "xl",
      }}
    >
      <Toaster position="top-right" />

      <Flex
        justify="space-between"
        align={{ base: "stretch", sm: "center" }}
        mb={isCollapsed ? 4 : 6}
        direction={{ base: "column", sm: "row" }}
        gap={{ base: 3, sm: 0 }}
      >
        <Box flex="1" minW="0">
          <Text
            fontSize={isCollapsed ? "md" : "lg"}
            fontWeight="semibold"
            noOfLines={1}
            mb={1}
          >
            Revenue Overview
          </Text>
          <Text fontSize="sm" color="gray.500" noOfLines={1}>
            {timeRange === "weekly"
              ? "Weekly performance"
              : timeRange === "monthly"
              ? "Monthly revenue and growth"
              : "Yearly revenue trends"}
          </Text>
        </Box>

        <Flex gap={2} flexDir={{ base: "column", md: "row" }}>
          <HStack spacing={1}>
            {!isCollapsed &&
              ["weekly", "monthly", "yearly"].map((range) => (
                <Button
                  key={range}
                  size="sm"
                  variant={timeRange === range ? "solid" : "outline"}
                  onClick={() => handleTimeRangeChange(range)}
                  colorScheme={timeRange === range ? "brand" : "gray"}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </Button>
              ))}
          </HStack>
          <Flex gap={1}>
          <IconButton
            aria-label="Refresh chart"
            icon={<FiRefreshCw />}
            size="sm"
            onClick={handleRefresh}
            isLoading={isLoading}
            variant="outline"
          />

          <IconButton
            aria-label="Download chart"
            icon={<FiDownload />}
            size="sm"
            onClick={handleExport}
            variant="outline"
          />
          </Flex>
        </Flex>
      </Flex>

      <Box h="300px" minW="0" position="relative">
        {isLoading ? (
          <Skeleton height="100%" borderRadius="md" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={useColorModeValue("#E2E8F0", "#4A5568")}
              />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`$${value}`, selectedMetric]}
                labelFormatter={(label) =>
                  `${
                    timeRange.slice(0, 1).toUpperCase() + timeRange.slice(1)
                  }: ${label}`
                }
              />
              <Area
                type="monotone"
                dataKey="users"
                fill="#4299E1"
                fillOpacity={0.3}
                stroke="#4299E1"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey={selectedMetric}
                stroke={
                  metrics.find((m) => m.key === selectedMetric)?.color ||
                  "#0EA5E9"
                }
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </Box>

      {!isCollapsed && (
        <Flex
          justify="space-between"
          mt={4}
          pt={4}
          borderTop="1px dashed"
          borderColor={borderColor}
          flexWrap="wrap"
          gap={2}
        >
          <HStack spacing={3} flexWrap="wrap">
            {metrics.map((metric) => (
              <Button
                key={metric.key}
                size="xs"
                variant={selectedMetric === metric.key ? "solid" : "outline"}
                colorScheme={selectedMetric === metric.key ? "brand" : "gray"}
                onClick={() => setSelectedMetric(metric.key)}
                leftIcon={
                  <Box w={2} h={2} borderRadius="full" bg={metric.color} />
                }
              >
                {metric.label}
              </Button>
            ))}
          </HStack>

          <Text fontSize="xs" color="gray.500">
            Last updated:{" "}
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default RevenueChart;
