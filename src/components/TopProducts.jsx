import {
  Box,
  Text,
  VStack,
  HStack,
  Progress,
  Avatar,
  Badge,
  useColorModeValue,
  IconButton,
  Flex,
  SimpleGrid,
} from '@chakra-ui/react'
import { FiMoreVertical, FiTrendingUp, FiPackage, FiShoppingBag } from 'react-icons/fi'

const TopProducts = ({ sidebarCollapsed = false }) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  
  const isCompact = sidebarCollapsed

  const products = [
    { 
      name: 'Premium Plan', 
      sales: 342, 
      revenue: '$12,450', 
      growth: 12, 
      color: 'brand.500',
      category: 'Subscription'
    },
    { 
      name: 'Pro Plan', 
      sales: 289, 
      revenue: '$8,920', 
      growth: 8, 
      color: 'green.500',
      category: 'Subscription'
    },
    { 
      name: 'Basic Plan', 
      sales: 156, 
      revenue: '$4,680', 
      growth: 15, 
      color: 'purple.500',
      category: 'Subscription'
    },
    { 
      name: 'Enterprise', 
      sales: 89, 
      revenue: '$31,150', 
      growth: 5, 
      color: 'orange.500',
      category: 'Enterprise'
    },
  ]

  return (
    <Box
      bg={bgColor}
      borderRadius="lg"
      boxShadow="sm"
      border="1px"
      borderColor={borderColor}
      p={isCompact ? 4 : 6}
      h="full"
      transition="all 0.3s ease"
    >
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Text fontSize="lg" fontWeight="semibold" noOfLines={1}>
            Top Products
          </Text>
          <Text fontSize="sm" color="gray.500" noOfLines={1}>
            Best performing products
          </Text>
        </Box>
        <IconButton
          aria-label="More options"
          icon={<FiMoreVertical />}
          size="sm"
          variant="ghost"
        />
      </Flex>

      <VStack spacing={isCompact ? 4 : 6} align="stretch">
        {products.map((product) => (
          <Box key={product.name}>
            <Flex justify="space-between" mb={2}>
              <HStack spacing={3}>
                <Box
                  w={8}
                  h={8}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="lg"
                  bg={`${product.color}15`}
                >
                  <FiPackage color={product.color} />
                </Box>
                <Box>
                  <Text fontWeight="medium">{product.name}</Text>
                  <Text fontSize="xs" color="gray.500">{product.category}</Text>
                </Box>
              </HStack>
              <Box textAlign="right">
                <Text fontWeight="semibold">{product.revenue}</Text>
                <HStack spacing={1} justify="flex-end">
                  <FiTrendingUp size={12} color={product.growth > 0 ? '#10B981' : '#EF4444'} />
                  <Text fontSize="xs" color={product.growth > 0 ? 'green.500' : 'red.500'}>
                    {product.growth > 0 ? '+' : ''}{product.growth}%
                  </Text>
                </HStack>
              </Box>
            </Flex>
            <Progress
              value={product.sales}
              max={400}
              size="sm"
              colorScheme={product.color.split('.')[0]}
              borderRadius="full"
              mb={2}
            />
            <Flex justify="space-between">
              <Text fontSize="sm" color="gray.500">
                {product.sales} sales
              </Text>
              <Text fontSize="sm" color="gray.500">
                {Math.round((product.sales / 400) * 100)}% of total
              </Text>
            </Flex>
          </Box>
        ))}
      </VStack>

      {!isCompact && (
        <Box mt={6} pt={6} borderTop="1px" borderColor={borderColor}>
          <Flex justify="space-between" align="center">
            <Text fontSize="sm" color="gray.500">
              Performance Summary
            </Text>
            <Badge colorScheme="green" variant="subtle">
              +18.5% Overall
            </Badge>
          </Flex>
          <SimpleGrid columns={2} spacing={3} mt={4}>
            <Box p={3} borderRadius="lg" bg="gray.50" _dark={{ bg: 'gray.900' }}>
              <Text fontSize="xs" color="gray.500">Avg. Revenue</Text>
              <Text fontSize="lg" fontWeight="bold">$14,300</Text>
            </Box>
            <Box p={3} borderRadius="lg" bg="gray.50" _dark={{ bg: 'gray.900' }}>
              <Text fontSize="xs" color="gray.500">Conversion</Text>
              <Text fontSize="lg" fontWeight="bold">3.2%</Text>
            </Box>
          </SimpleGrid>
        </Box>
      )}
    </Box>
  )
}

export default TopProducts