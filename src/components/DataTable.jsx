import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  useColorModeValue,
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Select,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Avatar,
  Tag,
  TagLabel,
  TagLeftIcon,
  Stack,
  VStack,
  useBreakpointValue,
  SimpleGrid,
  Card,
  CardBody,
  CardFooter,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import {
  FiEye,
  FiMoreVertical,
  FiDownload,
  FiFilter,
  FiSearch,
  FiEdit,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiUser,
  FiCheck,
  FiClock,
  FiX,
  FiCalendar,
  FiDollarSign,
  FiPlus,
  FiAlertTriangle,
} from "react-icons/fi";

// Confirmation Modal Component
const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to perform this action?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "delete",
  isLoading = false,
  rowData = null,
}) => {
  const getIcon = () => {
    switch (type) {
      case 'delete':
        return FiTrash2
      case 'warning':
        return FiAlertTriangle
      default:
        return FiAlertTriangle
    }
  }

  const getIconColor = () => {
    switch (type) {
      case 'delete':
        return 'red.500'
      case 'warning':
        return 'orange.500'
      default:
        return 'orange.500'
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottom="1px" borderColor="gray.200">
          {title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py={6}>
          <VStack spacing={4} align="center">
            <Box
              w={12}
              h={12}
              borderRadius="full"
              bg={`${getIconColor()}15`}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box as={getIcon()} w={6} h={6} color={getIconColor()} />
            </Box>
            <Text textAlign="center" fontSize="md" color={useColorModeValue('gray.700', 'red.500')}>
              {message}
            </Text>
            {rowData && (
              <Box
                p={3}
                borderRadius="lg"
                bg="gray.50"
                border="1px"
                borderColor="gray.200"
                w="full"
              >
                <Flex align="center" gap={3}>
                  <Avatar size="sm" name={rowData.customer} src={rowData.avatar} />
                  <Box>
                    <Text color={useColorModeValue('gray.700', 'gray.600')} fontWeight="medium">{rowData.customer}</Text>
                    <Text fontSize="sm" color="gray.500">{rowData.name} • {rowData.amount}</Text>
                  </Box>
                </Flex>
              </Box>
            )}
            {type === 'delete' && (
              <Box
                p={3}
                borderRadius="lg"
                bg="red.50"
                border="1px"
                borderColor="red.200"
                w="full"
              >
                <Text fontSize="sm" color="red.600" textAlign="center">
                  ⚠️ This action cannot be undone. The data will be permanently deleted.
                </Text>
              </Box>
            )}
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="outline"
            mr={3}
            onClick={onClose}
            isDisabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            colorScheme={type === 'delete' ? 'red' : 'orange'}
            onClick={onConfirm}
            isLoading={isLoading}
            loadingText="Deleting..."
            leftIcon={<FiTrash2 />}
          >
            {confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

// Mobile Card Component
const MobileCard = ({ row, getStatusColor, getStatusIcon, onEdit, onDelete }) => (
  <Card key={row.id} variant="outline" size="sm">
    <CardBody>
      <Flex justify="space-between" align="center" mb={3}>
        <HStack>
          <Avatar size="sm" name={row.customer} src={row.avatar} />
          <Box>
            <Text fontWeight="bold">{row.customer}</Text>
            <Text fontSize="sm" color="gray.500">
              {row.name}
            </Text>
          </Box>
        </HStack>
        <Tag
          colorScheme={getStatusColor(row.status)}
          size="sm"
          borderRadius="full"
        >
          <TagLeftIcon as={getStatusIcon(row.status)} />
          <TagLabel>{row.status}</TagLabel>
        </Tag>
      </Flex>

      <SimpleGrid columns={2} spacing={3} mt={4}>
        <Box>
          <Text fontSize="xs" color="gray.500">
            Date
          </Text>
          <Text fontSize="sm" fontWeight="medium">
            {row.date}
          </Text>
        </Box>
        <Box>
          <Text fontSize="xs" color="gray.500">
            Amount
          </Text>
          <HStack>
            <FiDollarSign size={12} />
            <Text fontSize="sm" fontWeight="bold" color="brand.500">
              {row.amount}
            </Text>
          </HStack>
        </Box>
      </SimpleGrid>
    </CardBody>
    <CardFooter pt={0}>
      <Flex justify="space-between" w="full">
        <HStack spacing={2}>
          <IconButton
            aria-label="Edit"
            icon={<FiEdit />}
            size="sm"
            variant="ghost"
            onClick={() => onEdit(row)}
          />
          <IconButton
            aria-label="Delete"
            icon={<FiTrash2 />}
            size="sm"
            variant="ghost"
            colorScheme="red"
            onClick={() => onDelete(row.id)}
          />
        </HStack>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FiMoreVertical />}
            size="sm"
            variant="ghost"
          />
          <MenuList>
            <MenuItem icon={<FiEye />}>View Details</MenuItem>
            <MenuItem icon={<FiEdit />} onClick={() => onEdit(row)}>
              Edit
            </MenuItem>
            <MenuItem icon={<FiTrash2 />} color="red.500" onClick={() => onDelete(row.id)}>
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </CardFooter>
  </Card>
);

// Add/Edit Modal Component
const EditModal = ({ isOpen, onClose, row, onSave, mode = "add" }) => {
  const [formData, setFormData] = useState({
    name: "",
    customer: "",
    date: new Date().toISOString().split("T")[0],
    amount: "$99",
    status: "active",
    type: "subscription",
  });

  useEffect(() => {
    if (row && mode === "edit") {
      setFormData(row);
    } else {
      setFormData({
        name: "",
        customer: "",
        date: new Date().toISOString().split("T")[0],
        amount: "$99",
        status: "active",
        type: "subscription",
      });
    }
  }, [row, mode]);

  const handleSubmit = () => {
    if (!formData.customer || !formData.name || !formData.amount) {
      toast.error("Please fill all required fields");
      return;
    }

    onSave(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{mode === "add" ? "Add New Record" : "Edit Record"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Customer Name</FormLabel>
              <Input
                value={formData.customer}
                onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                placeholder="Enter customer name"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Plan Name</FormLabel>
              <Select
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              >
                <option value="Basic Plan">Basic Plan</option>
                <option value="Pro Plan">Pro Plan</option>
                <option value="Premium Plan">Premium Plan</option>
                <option value="Enterprise">Enterprise</option>
                <option value="Team Plan">Team Plan</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Amount</FormLabel>
              <Input
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="$99"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Status</FormLabel>
              <Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="expired">Expired</option>
              </Select>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="brand" onClick={handleSubmit}>
            {mode === "add" ? "Add Record" : "Save Changes"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

// Responsive Header Component
const ResponsiveHeader = ({ 
  isMobile, 
  isCollapsed, 
  searchQuery, 
  setSearchQuery, 
  filterStatus, 
  setFilterStatus, 
  onAddClick,
  handleExportCSV 
}) => {
  const accentColor = useColorModeValue("brand.50", "brand.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      align={{ base: "stretch", md: "center" }}
      spacing={4}
      p={isMobile ? 4 : 6}
      borderBottom="1px"
      borderColor={borderColor}
      bg={!isCollapsed ? accentColor : "transparent"}
    >
      <Box>
        <Text fontSize={isMobile ? "md" : "lg"} fontWeight="semibold">
          Recent Transactions
        </Text>
        <Text fontSize="sm" color="gray.500">
          {isMobile
            ? "Customer data"
            : "All recent transactions and subscriptions"}
        </Text>
      </Box>

      <Stack
        direction={{ base: "column", sm: "row" }}
        spacing={3}
        w={{ base: "full", sm: "auto", md:"full" }} 
      >
        <InputGroup size="sm">
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search customers or plans..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="sm"
          />
        </InputGroup>

        {/* {!isMobile && ( */}
          <Flex justifyContent={"space-between"} w="full" gap={2}>
            <Select
              size="sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              w="full"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="expired">Expired</option>
            </Select>

            <Button
              leftIcon={<FiPlus />}
              colorScheme="brand"
              size="sm"
              onClick={onAddClick}
              w="full"
            >
              Add New
            </Button>
          </Flex>
        {/* )} */}

        <Button
          leftIcon={<FiDownload />}
          colorScheme="brand"
          variant="outline"
          size="sm"
          onClick={handleExportCSV}
          // w="full"
          px={10}
        >
          Export CSV
        </Button>
      </Stack>
    </Stack>
  );
};

// Responsive Footer Component
const ResponsiveFooter = ({ isMobile, currentPage, totalPages, onPageChange }) => {
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Stack
      direction={{ base: "column", sm: "row" }}
      justify="space-between"
      align={{ base: "stretch", sm: "center" }}
      spacing={3}
      p={isMobile ? 3 : 4}
      borderTop="1px"
      borderColor={borderColor}
    >
      <Text
        fontSize="sm"
        color="gray.500"
        textAlign={{ base: "center", sm: "left" }}
      >
        Page {currentPage} of {totalPages}
      </Text>

      {!isMobile ? (
        <HStack spacing={2}>
          <Button 
            size="sm" 
            variant="outline" 
            leftIcon={<FiChevronLeft />}
            onClick={() => onPageChange(currentPage - 1)}
            isDisabled={currentPage === 1}
          >
            Previous
          </Button>
          {[...Array(Math.min(totalPages, 5))].map((_, i) => (
            <Button
              key={i + 1}
              size="sm"
              variant={currentPage === i + 1 ? "solid" : "outline"}
              colorScheme={currentPage === i + 1 ? "brand" : "gray"}
              onClick={() => onPageChange(i + 1)}
              isDisabled={totalPages > 5 && i === 4}
            >
              {i + 1}
            </Button>
          ))}
          {totalPages > 5 && (
            <Text color="gray.500">...</Text>
          )}
          <Button 
            size="sm" 
            variant="outline" 
            rightIcon={<FiChevronRight />}
            onClick={() => onPageChange(currentPage + 1)}
            isDisabled={currentPage === totalPages}
          >
            Next
          </Button>
        </HStack>
      ) : (
        <HStack justify="center" spacing={3}>
          <IconButton
            aria-label="Previous"
            icon={<FiChevronLeft />}
            size="sm"
            variant="outline"
            onClick={() => onPageChange(currentPage - 1)}
            isDisabled={currentPage === 1}
          />
          <Text fontWeight="medium">Page {currentPage}</Text>
          <IconButton
            aria-label="Next"
            icon={<FiChevronRight />}
            size="sm"
            variant="outline"
            onClick={() => onPageChange(currentPage + 1)}
            isDisabled={currentPage === totalPages}
          />
        </HStack>
      )}

      {!isMobile && (
        <HStack spacing={2}>
          <Text fontSize="sm" color="gray.500">
            Rows:
          </Text>
          <Select size="sm" width="auto" defaultValue="5">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
          </Select>
        </HStack>
      )}
    </Stack>
  );
};

// Main DataTable Component
const DataTable = ({ sidebarCollapsed = false }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const accentColor = useColorModeValue("brand.50", "brand.900");
  const hoverColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const isCollapsed = sidebarCollapsed;
  const isMobile = useBreakpointValue({ base: true, md: false });
  const isTablet = useBreakpointValue({ base: false, md: true, lg: false });

  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [editModal, setEditModal] = useState({ isOpen: false, row: null, mode: "add" });
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    rowId: null,
    rowData: null,
  });

  const [tableData, setTableData] = useState([
    {
      id: 1,
      name: "Premium Plan",
      customer: "John Smith",
      date: "2024-01-15",
      amount: "$342",
      status: "active",
      type: "subscription",
      avatar: "https://bit.ly/dan-abramov",
    },
    {
      id: 2,
      name: "Basic Plan",
      customer: "Emma Johnson",
      date: "2024-01-14",
      amount: "$124",
      status: "pending",
      type: "subscription",
      avatar: "https://bit.ly/ryan-florence",
    },
    {
      id: 3,
      name: "Enterprise",
      customer: "Michael Brown",
      date: "2024-01-14",
      amount: "$567",
      status: "active",
      type: "upgrade",
      avatar: "https://bit.ly/prosper-baba",
    },
    {
      id: 4,
      name: "Pro Plan",
      customer: "Sarah Davis",
      date: "2024-01-13",
      amount: "$89",
      status: "expired",
      type: "subscription",
      avatar: "https://bit.ly/code-beast",
    },
    {
      id: 5,
      name: "Team Plan",
      customer: "Robert Wilson",
      date: "2024-01-13",
      amount: "$234",
      status: "active",
      type: "renewal",
      avatar: "https://bit.ly/sage-adebayo",
    },
    {
      id: 6,
      name: "Basic Plan",
      customer: "Alex Turner",
      date: "2024-01-12",
      amount: "$124",
      status: "active",
      type: "subscription",
      avatar: "https://bit.ly/kent-c-dodds",
    },
    {
      id: 7,
      name: "Premium Plan",
      customer: "Lisa Wang",
      date: "2024-01-11",
      amount: "$342",
      status: "pending",
      type: "upgrade",
      avatar: "https://bit.ly/tioluwani-kolawole",
    },
  ]);

  // Helper functions
  const getStatusColor = (status) => {
    const colors = {
      active: "green",
      pending: "yellow",
      expired: "red",
    };
    return colors[status] || "gray";
  };

  const getStatusIcon = (status) => {
    const icons = {
      active: FiCheck,
      pending: FiClock,
      expired: FiX,
    };
    return icons[status] || FiUser;
  };

  // CRUD Operations
  const handleAdd = () => {
    setEditModal({ isOpen: true, row: null, mode: "add" });
  };

  const handleEdit = (row) => {
    setEditModal({ isOpen: true, row: row, mode: "edit" });
  };

  const handleDelete = (id) => {
    const rowToDelete = tableData.find(row => row.id === id);
    setDeleteModal({
      isOpen: true,
      rowId: id,
      rowData: rowToDelete,
    });
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setTableData(tableData.filter((row) => row.id !== deleteModal.rowId));
    
    toast.success("Record deleted successfully!", {
      duration: 3000,
      position: "top-right",
      icon: '🗑️',
    });
    
    setIsDeleting(false);
    setDeleteModal({ isOpen: false, rowId: null, rowData: null });
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, rowId: null, rowData: null });
  };

  const handleSave = (formData) => {
    if (editModal.mode === "add") {
      const newRow = {
        ...formData,
        id: Date.now(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.customer)}&background=0ea5e9&color=fff`,
      };
      setTableData([newRow, ...tableData]);
      toast.success("Record added successfully!", {
        icon: '✅',
      });
    } else {
      setTableData(
        tableData.map((row) =>
          row.id === editModal.row.id ? { ...row, ...formData } : row
        )
      );
      toast.success("Record updated successfully!", {
        icon: '✏️',
      });
    }
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Customer", "Plan", "Date", "Amount", "Status"];
    const csvContent = [
      headers.join(","),
      ...filteredData.map((row) =>
        [
          row.id,
          `"${row.customer}"`,
          `"${row.name}"`,
          row.date,
          row.amount.replace("$", ""),
          row.status,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    link.click();
    window.URL.revokeObjectURL(url);
    
    toast.success("Data exported to CSV!", {
      icon: '📥',
    });
  };

  // Filter and pagination logic
  const filteredData = tableData.filter((row) => {
    const matchesSearch =
      row.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || row.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Render appropriate view based on screen size
  const renderTableView = () => {
    if (isMobile) {
      return (
        <VStack spacing={4} align="stretch" p={2}>
          {paginatedData.map((row) => (
            <MobileCard
              key={row.id}
              row={row}
              getStatusColor={getStatusColor}
              getStatusIcon={getStatusIcon}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </VStack>
      );
    } else if (isTablet) {
      return (
        <Box overflowX="auto" p={2}>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Customer</Th>
                <Th>Plan</Th>
                <Th>Amount</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {paginatedData.map((row) => (
                <Tr key={row.id} _hover={{ bg: hoverColor }}>
                  <Td>
                    <HStack>
                      <Avatar size="xs" name={row.customer} src={row.avatar} />
                      <Text fontSize="sm">{row.customer.split(" ")[0]}</Text>
                    </HStack>
                  </Td>
                  <Td>
                    <Text fontSize="sm">{row.name}</Text>
                  </Td>
                  <Td>
                    <Text fontWeight="bold" color="brand.500" fontSize="sm">
                      {row.amount}
                    </Text>
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={getStatusColor(row.status)}
                      fontSize="xs"
                      px={2}
                      py={1}
                      borderRadius="full"
                    >
                      {row.status}
                    </Badge>
                  </Td>
                  <Td>
                    <HStack spacing={1}>
                      <IconButton
                        aria-label="Edit"
                        icon={<FiEdit />}
                        size="xs"
                        variant="ghost"
                        onClick={() => handleEdit(row)}
                      />
                      <IconButton
                        aria-label="Delete"
                        icon={<FiTrash2 />}
                        size="xs"
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => handleDelete(row.id)}
                      />
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          icon={<FiMoreVertical />}
                          size="xs"
                          variant="ghost"
                        />
                        <MenuList fontSize="sm">
                          <MenuItem icon={<FiEye />}>View</MenuItem>
                          <MenuItem icon={<FiEdit />} onClick={() => handleEdit(row)}>
                            Edit
                          </MenuItem>
                          <MenuItem icon={<FiTrash2 />} onClick={() => handleDelete(row.id)}>
                            Delete
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      );
    } else {
      return (
        <Box overflowX="auto" p={2}>
          <Table variant={isCollapsed ? "simple" : "striped"} size="md">
            <Thead bg={isCollapsed ? "gray.500" : accentColor}>
              <Tr>
                <Th>Customer</Th>
                <Th>Plan</Th>
                <Th>Date</Th>
                <Th>Amount</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {paginatedData.map((row) => (
                <Tr key={row.id} _hover={{ bg: hoverColor }}>
                  <Td>
                    <HStack>
                      <Avatar size="sm" name={row.customer} src={row.avatar} />
                      <Text fontWeight="medium">{row.customer}</Text>
                    </HStack>
                  </Td>
                  <Td>
                    <Text>{row.name}</Text>
                  </Td>
                  <Td>
                    <Text color="gray.500">{row.date}</Text>
                  </Td>
                  <Td>
                    <Text fontWeight="bold" color="brand.600">
                      {row.amount}
                    </Text>
                  </Td>
                  <Td>
                    <Tag
                      colorScheme={getStatusColor(row.status)}
                      size="md"
                      borderRadius="full"
                      variant={isCollapsed ? "subtle" : "solid"}
                    >
                      <TagLeftIcon as={getStatusIcon(row.status)} />
                      <TagLabel>{row.status}</TagLabel>
                    </Tag>
                  </Td>
                  <Td>
                    <HStack spacing={1}>
                      <IconButton
                        aria-label="Edit"
                        icon={<FiEdit />}
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(row)}
                      />
                      <IconButton
                        aria-label="Delete"
                        icon={<FiTrash2 />}
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => handleDelete(row.id)}
                      />
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          icon={<FiMoreVertical />}
                          size="sm"
                          variant="ghost"
                        />
                        <MenuList>
                          <MenuItem icon={<FiEye />}>View Details</MenuItem>
                          <MenuItem icon={<FiEdit />} onClick={() => handleEdit(row)}>
                            Edit
                          </MenuItem>
                          <MenuItem icon={<FiTrash2 />} color="red.500" onClick={() => handleDelete(row.id)}>
                            Delete
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      );
    }
  };

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: useColorModeValue('#fff', '#2D3748'),
            color: useColorModeValue('#2D3748', '#fff'),
            border: '1px solid',
            borderColor: useColorModeValue('#E2E8F0', '#4A5568'),
          },
        }}
      />
      
      <Box
        bg={bgColor}
        borderRadius="lg"
        boxShadow="sm"
        border="1px"
        borderColor={borderColor}
        overflow="hidden"
        transition="all 0.3s ease"
      >
        <ResponsiveHeader
          isMobile={isMobile}
          isCollapsed={isCollapsed}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          onAddClick={handleAdd}
          handleExportCSV={handleExportCSV}
        />
        {renderTableView()}
        <ResponsiveFooter
          isMobile={isMobile}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Box>

      {/* Edit/Add Modal */}
      <EditModal
        isOpen={editModal.isOpen}
        onClose={() => setEditModal({ isOpen: false, row: null, mode: "add" })}
        row={editModal.row}
        onSave={handleSave}
        mode={editModal.mode}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Record"
        message={
          deleteModal.rowData 
            ? `Are you sure you want to delete this record?`
            : "Are you sure you want to delete this record?"
        }
        confirmText={isDeleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        type="delete"
        isLoading={isDeleting}
        rowData={deleteModal.rowData}
      />
    </>
  );
};

export default DataTable;