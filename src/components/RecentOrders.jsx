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
} from '@chakra-ui/react'
import { FiEye, FiMoreVertical, FiDownload } from 'react-icons/fi'

const RecentOrders = () => {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const orders = [
    { id: '#ORD-001', customer: 'John Smith', date: '2024-01-15', amount: '$342', status: 'completed' },
    { id: '#ORD-002', customer: 'Emma Johnson', date: '2024-01-14', amount: '$124', status: 'pending' },
    { id: '#ORD-003', customer: 'Michael Brown', date: '2024-01-14', amount: '$567', status: 'completed' },
    { id: '#ORD-004', customer: 'Sarah Davis', date: '2024-01-13', amount: '$89', status: 'failed' },
    { id: '#ORD-005', customer: 'Robert Wilson', date: '2024-01-13', amount: '$234', status: 'processing' },
  ]

  const getStatusColor = (status) => {
    const colors = {
      completed: 'green',
      pending: 'yellow',
      processing: 'blue',
      failed: 'red',
    }
    return colors[status] || 'gray'
  }

  return (
    <Box
      bg={bgColor}
      borderRadius="lg"
      boxShadow="sm"
      border="1px"
      borderColor={borderColor}
      p={6}
      w="100%"
      minW="0"
      overflow="hidden"
    >
      <Flex 
        justify="space-between" 
        align="center" 
        mb={6}
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 3, sm: 0 }}
      >
        <Box minW="0">
          <Text fontSize="lg" fontWeight="semibold" noOfLines={1}>
            Recent Orders
          </Text>
          <Text fontSize="sm" color="gray.500" noOfLines={1}>
            Latest customer orders
          </Text>
        </Box>
        <Flex gap={2}>
          <Button 
            size="sm" 
            variant="outline" 
            leftIcon={<FiDownload />}
            display={{ base: 'none', sm: 'flex' }}
          >
            Export
          </Button>
          <Button size="sm" colorScheme="brand">
            View All
          </Button>
        </Flex>
      </Flex>

      <Box overflowX="auto">
        <Table variant="simple" size="sm" minW="600px">
          <Thead>
            <Tr>
              <Th>Order ID</Th>
              <Th>Customer</Th>
              <Th>Date</Th>
              <Th>Amount</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order) => (
              <Tr key={order.id}>
                <Td>
                  <Text fontWeight="medium">{order.id}</Text>
                </Td>
                <Td>
                  <Text>{order.customer}</Text>
                </Td>
                <Td>
                  <Text color="gray.500">{order.date}</Text>
                </Td>
                <Td>
                  <Text fontWeight="semibold">{order.amount}</Text>
                </Td>
                <Td>
                  <Badge
                    colorScheme={getStatusColor(order.status)}
                    variant="subtle"
                    px={3}
                    py={1}
                    borderRadius="full"
                  >
                    {order.status}
                  </Badge>
                </Td>
                <Td>
                  <Flex gap={2}>
                    <Button size="xs" leftIcon={<FiEye />} variant="ghost" display={{ base: 'none', md: 'flex' }}>
                      View
                    </Button>
                    <Menu>
                      <MenuButton as={IconButton} size="xs" icon={<FiMoreVertical />} variant="ghost" />
                      <MenuList>
                        <MenuItem icon={<FiEye />}>View Details</MenuItem>
                        <MenuItem>Edit Order</MenuItem>
                        <MenuItem>Cancel Order</MenuItem>
                      </MenuList>
                    </Menu>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}

export default RecentOrders