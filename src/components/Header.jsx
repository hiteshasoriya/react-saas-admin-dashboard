import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Text,
  useColorModeValue,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Badge,
  HStack,
  Box,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  useColorMode,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Divider,
  Tag,
  MenuDivider,
  MenuGroup,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverHeader,
  PopoverCloseButton,
  Portal,
  useToast,
  Progress,
} from "@chakra-ui/react";
import {
  FiSearch,
  FiBell,
  FiCalendar,
  FiDownload,
  FiMenu,
  FiFilter,
  FiPlus,
  FiHome,
  FiBarChart2,
  FiUsers,
  FiPackage,
  FiShoppingCart,
  FiSun,
  FiMoon,
  FiCheck,
  FiX,
  FiEye,
  FiMessageSquare,
  FiCreditCard,
  FiAlertCircle,
  FiChevronDown,
} from "react-icons/fi";
import { format, isToday, isYesterday, startOfMonth, endOfMonth } from "date-fns";
import { useState, useRef } from "react";

// Mock notification data
const mockNotifications = [
  {
    id: 1,
    title: "New Order Received",
    message: "Order #ORD-7894 has been placed",
    time: "5 min ago",
    type: "order",
    read: false,
    icon: FiShoppingCart,
    color: "green",
  },
  {
    id: 2,
    title: "Payment Successful",
    message: "Payment of $2,500 received from Acme Corp",
    time: "1 hour ago",
    type: "payment",
    read: false,
    icon: FiCreditCard,
    color: "blue",
  },
  {
    id: 3,
    title: "New Message",
    message: "You have a new support ticket from Sarah Johnson",
    time: "2 hours ago",
    type: "message",
    read: true,
    icon: FiMessageSquare,
    color: "purple",
  },
  {
    id: 4,
    title: "System Alert",
    message: "Server maintenance scheduled for tomorrow 2:00 AM",
    time: "1 day ago",
    type: "alert",
    read: true,
    icon: FiAlertCircle,
    color: "orange",
  },
  {
    id: 5,
    title: "Low Stock Alert",
    message: "Product 'Wireless Headphones' is running low",
    time: "2 days ago",
    type: "alert",
    read: true,
    icon: FiAlertCircle,
    color: "red",
  },
];

const Header = ({ onMenuClick, sidebarCollapsed, onExportData }) => {
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
  const { isOpen: isNotificationModalOpen, onOpen: onNotificationModalOpen, onClose: onNotificationModalClose } = useDisclosure();
  const { isOpen: isCalendarOpen, onOpen: onCalendarOpen, onClose: onCalendarClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [exporting, setExporting] = useState(false);
  const toast = useToast();
  const exportMenuRef = useRef();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const cardBgColor = useColorModeValue("gray.50", "gray.700");
  const hoverBgColor = useColorModeValue("gray.100", "gray.600");

  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    toast({
      position: "top=right",
      title: "All notifications marked as read",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    toast({
      position: "top=right",
      title: "Notification deleted",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
    toast({
      position: "top=right",
      title: "All notifications cleared",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onCalendarClose();
    
    // In a real app, you would trigger data fetching based on selected date
    toast({
      position: "top=right",
      title: `Date filter applied: ${format(date, "MMM dd, yyyy")}`,
      description: "Dashboard data updated",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Quick date presets
  const quickDateOptions = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "This Week", value: "week" },
    { label: "This Month", value: "month" },
  ];

  // Handle quick date preset
  const handleQuickDate = (preset) => {
    let date = new Date();
    
    switch(preset) {
      case "yesterday":
        date.setDate(date.getDate() - 1);
        break;
      case "week":
        // Start of week (Monday)
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        date.setDate(diff);
        break;
      case "month":
        date = startOfMonth(date);
        break;
      default:
        // today - already set
        break;
    }
    
    setSelectedDate(date);
    
    toast({
      position: "top=right",
      title: `Date range set to: ${preset.charAt(0).toUpperCase() + preset.slice(1)}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Export functions
  const handleExport = async (format) => {
    setExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setExporting(false);
    
    switch(format) {
      case "csv":
        exportCSV();
        break;
      case "pdf":
        exportPDF();
        break;
      case "excel":
        exportExcel();
        break;
      case "json":
        exportJSON();
        break;
    }
    
    toast({
      position: "top=right",
      title: `Exported successfully as ${format.toUpperCase()}`,
      description: "Your file is ready for download",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Mock export functions
  const exportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Date,Revenue,Users,Orders\n" +
      "2024-01-01,5000,150,45\n" +
      "2024-01-02,5200,160,48\n" +
      "2024-01-03,4800,145,42";
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `dashboard_export_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportPDF = () => {
    // In a real app, you would use something like jsPDF
    toast({
      position: "bottom-right",
      title: "PDF Generated",
      description: "dashboard_export.pdf has been generated",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const exportExcel = () => {
    // In a real app, you would use something like xlsx
    toast({
      position: "bottom-right",
      title: "Excel Export Ready",
      description: "dashboard_export.xlsx has been prepared",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const exportJSON = () => {
    const data = {
      exportDate: new Date().toISOString(),
      dashboardData: {
        revenue: "$54.2K",
        users: "3,248",
        orders: "1,258",
        growth: "+12.5%"
      }
    };
    
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `dashboard_export_${format(new Date(), 'yyyy-MM-dd')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Notification modal component
  const NotificationModal = () => (
    <Modal isOpen={isNotificationModalOpen} onClose={onNotificationModalClose} size="lg">
      <ModalOverlay />
      <ModalContent bg={bgColor}>
        <ModalHeader>
          <Flex justify="space-between" align="center">
            <Text>Notifications</Text>
            <HStack spacing={2}>
              {unreadCount > 0 && (
                <Button size="sm" variant="ghost" onClick={markAllAsRead}>
                  Mark all as read
                </Button>
              )}
              {notifications.length > 0 && (
                <Button size="sm" variant="ghost" colorScheme="red" onClick={clearAllNotifications}>
                  Clear all
                </Button>
              )}
            </HStack>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody maxH="400px" overflowY="auto">
          {notifications.length === 0 ? (
            <VStack py={8} spacing={4}>
              <Box
                w={16}
                h={16}
                borderRadius="full"
                bg={useColorModeValue("gray.100", "gray.700")}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <FiBell size={24} color={useColorModeValue("gray.400", "gray.400")} />
              </Box>
              <Text fontSize="lg" fontWeight="medium">
                No notifications
              </Text>
              <Text color="gray.500" textAlign="center">
                You're all caught up! Check back later for updates.
              </Text>
            </VStack>
          ) : (
            <Stack spacing={3}>
              {notifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <Box
                    key={notification.id}
                    p={3}
                    borderRadius="lg"
                    bg={notification.read ? "transparent" : cardBgColor}
                    borderLeft="4px solid"
                    borderLeftColor={`${notification.color}.400`}
                    _hover={{ bg: hoverBgColor }}
                  >
                    <Flex justify="space-between" align="flex-start">
                      <HStack spacing={3} align="flex-start">
                        <Box
                          w={10}
                          h={10}
                          borderRadius="md"
                          bg={`${notification.color}.100`}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          color={`${notification.color}.600`}
                        >
                          <Icon size={18} />
                        </Box>
                        <Box>
                          <Text fontWeight="medium">{notification.title}</Text>
                          <Text fontSize="sm" color="gray.500" mt={1}>
                            {notification.message}
                          </Text>
                          <HStack spacing={3} mt={2}>
                            <Tag size="sm" variant="subtle" colorScheme="gray">
                              {notification.time}
                            </Tag>
                            {!notification.read && (
                              <Tag size="sm" colorScheme="green">
                                New
                              </Tag>
                            )}
                          </HStack>
                        </Box>
                      </HStack>
                      <HStack spacing={1}>
                        {!notification.read && (
                          <IconButton
                            aria-label="Mark as read"
                            icon={<FiCheck />}
                            size="xs"
                            variant="ghost"
                            onClick={() => markAsRead(notification.id)}
                          />
                        )}
                        <IconButton
                          aria-label="Delete notification"
                          icon={<FiX />}
                          size="xs"
                          variant="ghost"
                          colorScheme="red"
                          onClick={() => deleteNotification(notification.id)}
                        />
                      </HStack>
                    </Flex>
                  </Box>
                );
              })}
            </Stack>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onNotificationModalClose}>
            Close
          </Button>
          <Button colorScheme="brand" onClick={onNotificationModalClose}>
            View All Activity
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  // Calendar popover component
  const CalendarPopover = () => (
    <Popover isOpen={isCalendarOpen} onClose={onCalendarClose} placement="bottom-start">
      <PopoverTrigger>
        <Button
          ref={exportMenuRef}
          leftIcon={<FiCalendar />}
          variant="outline"
          size="sm"
          display={{ base: "none", lg: "flex" }}
          borderRadius="lg"
          borderColor={borderColor}
          onClick={onCalendarOpen}
        >
          {format(selectedDate, "MMM dd, yyyy")}
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent pt="10px" bg={bgColor}>
          <PopoverArrow />
          <PopoverCloseButton mt="15px" />
          <PopoverHeader border="0">
            <Text fontWeight="bold">Select Date Range</Text>
          </PopoverHeader>
          <PopoverBody>
            <VStack spacing={3} align="stretch">
              {/* Quick Date Options */}
              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  Quick Select
                </Text>
                <HStack spacing={2} wrap="wrap">
                  {quickDateOptions.map((option) => (
                    <Button
                      key={option.value}
                      size="xs"
                      variant="outline"
                      onClick={() => handleQuickDate(option.value)}
                    >
                      {option.label}
                    </Button>
                  ))}
                </HStack>
              </Box>
              
              <Divider />
              
              {/* Date Selection (simplified - would use a date picker in production) */}
              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  Custom Date
                </Text>
                <Input
                  type="date"
                  size="sm"
                  value={format(selectedDate, 'yyyy-MM-dd')}
                  onChange={(e) => handleDateSelect(new Date(e.target.value))}
                />
                <Text fontSize="xs" color="gray.500" mt={2}>
                  Selected: {format(selectedDate, "EEEE, MMMM dd, yyyy")}
                </Text>
              </Box>
              
              {/* Date Info */}
              <Box p={3} borderRadius="md" bg={cardBgColor}>
                <Text fontSize="sm" fontWeight="medium" mb={1}>
                  Date Information
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {isToday(selectedDate) ? "Today" : 
                   isYesterday(selectedDate) ? "Yesterday" : 
                   format(selectedDate, "EEEE")}
                </Text>
              </Box>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );

  return (
    <>
      <Box
        as="header"
        bg={bgColor}
        borderBottom="1px"
        borderColor={borderColor}
        px={{ base: 4, md: 6, lg: 8 }}
        py={4}
        boxShadow="sm"
      >
        <Flex align="center" justify="space-between" wrap="wrap" gap={4}>
          {/* Left Section - Title & Menu Toggle */}
          <HStack spacing={4}>
            {/* Desktop Toggle Button */}
            <IconButton
              icon={<FiMenu />}
              aria-label="Toggle Sidebar"
              variant="ghost"
              display={{ base: "none", md: "flex" }}
              onClick={onMenuClick}
            />

            {/* Mobile Menu Button */}
            <IconButton
              icon={<FiMenu />}
              aria-label="Open Menu"
              variant="ghost"
              display={{ base: "flex", md: "none" }}
              onClick={onDrawerOpen}
            />

            {/* Search Bar */}
            {/* <InputGroup
              maxW="sm"
              display={{ base: "none", md: "block" }}
              width={{ md: sidebarCollapsed ? "200px" : "250px", lg: "300px" }}
              transition="width 0.3s ease"
            >
              <InputLeftElement pointerEvents="none">
                <FiSearch color="gray.400" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search dashboard..."
                borderRadius="lg"
                size="md"
                bg={useColorModeValue("white", "gray.700")}
                borderColor={borderColor}
              />
            </InputGroup> */}
          </HStack>

          {/* Right Section - Search & Actions */}
          <HStack
            spacing={{ base: 2, md: 4 }}
            flexWrap="wrap"
            justify="flex-end"
          >
            {/* Mobile Search Icon */}
            {/* <IconButton
              aria-label="Search"
              icon={<FiSearch />}
              variant="ghost"
              display={{ base: "flex", md: "none" }}
            /> */}

            {/* Calendar/Date Button */}
            <CalendarPopover />

            {/* Theme Toggle Button */}
            <Tooltip
              label={
                colorMode === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
            >
              <IconButton
                aria-label="Toggle theme"
                icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
                onClick={toggleColorMode}
                variant="ghost"
                size="sm"
                borderRadius="lg"
                color={colorMode === "light" ? "gray.600" : "yellow.400"}
                _hover={{
                  bg: colorMode === "light" ? "gray.100" : "gray.700",
                }}
              />
            </Tooltip>

            {/* Filter Button */}
            {/* <IconButton
              aria-label="Filter"
              icon={<FiFilter />}
              variant="outline"
              size="sm"
              borderRadius="lg"
              borderColor={borderColor}
              display={{ base: "none", sm: "flex" }}
            /> */}

            {/* Add New Button */}
            <Menu>
              <MenuButton
                as={Button}
                leftIcon={<FiPlus />}
                colorScheme="brand"
                size="sm"
                borderRadius="lg"
                display={{ base: "none", md: "flex" }}
              >
                New
              </MenuButton>
              <MenuList>
                <MenuItem icon={<FiUsers />}>New Customer</MenuItem>
                <MenuItem icon={<FiPackage />}>New Product</MenuItem>
                <MenuItem icon={<FiShoppingCart />}>New Order</MenuItem>
                <MenuDivider />
                <MenuItem icon={<FiBarChart2 />}>New Report</MenuItem>
              </MenuList>
            </Menu>

            {/* Export Button with Menu */}
            <Menu>
              <MenuButton
                as={Button}
                leftIcon={exporting ? null : <FiDownload />}
                colorScheme="brand"
                variant="outline"
                size="sm"
                borderRadius="lg"
                borderColor={borderColor}
                isLoading={exporting}
                loadingText="Exporting..."
              >
                Export
              </MenuButton>
              <MenuList>
                <MenuGroup title="Export Format">
                  <MenuItem onClick={() => handleExport("csv")} icon={<FiDownload />}>
                    Export as CSV
                  </MenuItem>
                  <MenuItem onClick={() => handleExport("pdf")} icon={<FiDownload />}>
                    Export as PDF
                  </MenuItem>
                  <MenuItem onClick={() => handleExport("excel")} icon={<FiDownload />}>
                    Export as Excel
                  </MenuItem>
                  <MenuItem onClick={() => handleExport("json")} icon={<FiDownload />}>
                    Export as JSON
                  </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title="Export Range">
                  <MenuItem>Current View</MenuItem>
                  <MenuItem>Last 7 Days</MenuItem>
                  <MenuItem>This Month</MenuItem>
                  <MenuItem>Custom Range...</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>

            {/* Notifications with Modal Trigger */}
            <Box position="relative">
              <IconButton
                aria-label="Notifications"
                icon={<FiBell />}
                variant="ghost"
                borderRadius="lg"
                onClick={onNotificationModalOpen}
              />
              {unreadCount > 0 && (
                <Badge
                  colorScheme="red"
                  borderRadius="full"
                  fontSize="2xs"
                  position="absolute"
                  top={1}
                  right={1}
                  minW={4}
                  h={4}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {unreadCount}
                </Badge>
              )}
            </Box>

            {/* User Menu */}
            <Menu>
              <MenuButton>
                <Avatar
                  size="sm"
                  name="Hitesh Asoria"
                  src="https://bit.ly/dan-abramov"
                  cursor="pointer"
                  border="2px solid"
                  borderColor="transparent"
                  _hover={{ borderColor: "brand.500" }}
                />
              </MenuButton>
              <MenuList>
                <MenuItem icon={<FiUsers />}>Profile</MenuItem>
                <MenuItem icon={<FiHome />}>Settings</MenuItem>
                <MenuItem icon={<FiDownload />}>Billing</MenuItem>
                <MenuItem
                  icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
                  onClick={toggleColorMode}
                >
                  {colorMode === "light" ? "Dark Mode" : "Light Mode"}
                </MenuItem>
                <MenuDivider />
                <MenuItem color="red.500">Logout</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isDrawerOpen} placement="left" onClose={onDrawerClose}>
        <DrawerOverlay />
        <DrawerContent bg={useColorModeValue("white", "gray.800")}>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <HStack>
              <Box
                w={8}
                h={8}
                bg="brand.500"
                borderRadius="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text color="white" fontWeight="bold">
                  S
                </Text>
              </Box>
              <Text>SaaS Pro</Text>
            </HStack>
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={1} align="stretch" mt={4}>
              <Button
                justifyContent="flex-start"
                variant="ghost"
                leftIcon={<FiHome />}
              >
                Dashboard
              </Button>
              <Button
                justifyContent="flex-start"
                variant="ghost"
                leftIcon={<FiBarChart2 />}
              >
                Analytics
              </Button>
              <Button
                justifyContent="flex-start"
                variant="ghost"
                leftIcon={<FiUsers />}
              >
                Customers
              </Button>
              <Button
                justifyContent="flex-start"
                variant="ghost"
                leftIcon={<FiPackage />}
              >
                Products
              </Button>
              <Button
                justifyContent="flex-start"
                variant="ghost"
                leftIcon={<FiShoppingCart />}
              >
                Orders
              </Button>
              <Button
                justifyContent="flex-start"
                variant="ghost"
                leftIcon={colorMode === "light" ? <FiMoon /> : <FiSun />}
                onClick={toggleColorMode}
              >
                {colorMode === "light" ? "Dark Mode" : "Light Mode"}
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Notification Modal */}
      <NotificationModal />
    </>
  );
};

export default Header;