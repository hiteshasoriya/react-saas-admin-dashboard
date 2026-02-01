import {
  Box,
  Text,
  VStack,
  HStack,
  Avatar,
  Badge,
  useColorModeValue,
  Icon,
  Flex,
  Button,
  Divider,
} from '@chakra-ui/react'
import {
  FiBell,
  FiMessageSquare,
  FiCreditCard,
  FiSettings,
  FiUserPlus,
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
} from 'react-icons/fi'

const RecentActivity = ({ sidebarCollapsed = false }) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  
  const isCompact = sidebarCollapsed

  const activities = [
    {
      type: 'payment',
      title: 'Payment Received',
      description: 'John Doe paid for Pro Plan subscription',
      time: '2 minutes ago',
      icon: FiCreditCard,
      color: 'green.500',
    },
    {
      type: 'support',
      title: 'New Support Ticket',
      description: 'Sarah reported an issue with dashboard',
      time: '15 minutes ago',
      icon: FiMessageSquare,
      color: 'blue.500',
    },
    {
      type: 'user',
      title: 'New User Registered',
      description: 'Michael Brown joined as a new customer',
      time: '1 hour ago',
      icon: FiUserPlus,
      color: 'purple.500',
    },
    {
      type: 'system',
      title: 'System Update',
      description: 'Application updated to version 2.5.1',
      time: '2 hours ago',
      icon: FiSettings,
      color: 'orange.500',
    },
    {
      type: 'alert',
      title: 'Server Alert',
      description: 'High memory usage detected on server-01',
      time: '3 hours ago',
      icon: FiAlertCircle,
      color: 'red.500',
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
            Recent Activity
          </Text>
          <Text fontSize="sm" color="gray.500" noOfLines={1}>
            System notifications and updates
          </Text>
        </Box>
        <Button size="sm" variant="ghost" leftIcon={<FiBell />}>
          {!isCompact && 'Mark All Read'}
        </Button>
      </Flex>

      <VStack spacing={isCompact ? 3 : 4} align="stretch" maxH="400px" overflowY="auto">
        {activities.map((activity, index) => (
          <Box
            key={index}
            p={isCompact ? 3 : 4}
            borderRadius="lg"
            border="1px"
            borderColor={borderColor}
            bg={activity.type === 'alert' ? 'red.50' : 'white'}
            _dark={{
              bg: activity.type === 'alert' ? 'red.900/20' : 'transparent',
            }}
            transition="all 0.2s"
            _hover={{
            //   transform: 'translateX(2px)',
              borderColor: activity.color,
            }}
          >
            <Flex gap={3} align="flex-start">
              <Flex
                w={isCompact ? 8 : 10}
                h={isCompact ? 8 : 10}
                align="center"
                justify="center"
                borderRadius="lg"
                bg={`${activity.color}15`}
                flexShrink={0}
              >
                <Icon as={activity.icon} w={isCompact ? 4 : 5} h={isCompact ? 4 : 5} color={activity.color} />
              </Flex>
              
              <Box flex="1" minW="0">
                <Flex justify="space-between" align="flex-start" mb={1}>
                  <Text fontSize={isCompact ? 'sm' : 'md'} fontWeight="semibold" noOfLines={1}>
                    {activity.title}
                  </Text>
                  <Badge
                    colorScheme={
                      activity.type === 'payment' ? 'green' :
                      activity.type === 'support' ? 'blue' :
                      activity.type === 'user' ? 'purple' :
                      activity.type === 'alert' ? 'red' : 'orange'
                    }
                    variant="subtle"
                    fontSize="xs"
                  >
                    {activity.type}
                  </Badge>
                </Flex>
                
                <Text fontSize={isCompact ? 'xs' : 'sm'} color="gray.500" mb={2} noOfLines={2}>
                  {activity.description}
                </Text>
                
                <HStack spacing={1}>
                  <Icon as={FiClock} w={3} h={3} color="gray.500" />
                  <Text fontSize="xs" color="gray.500">
                    {activity.time}
                  </Text>
                </HStack>
              </Box>
            </Flex>
          </Box>
        ))}
      </VStack>

      {!isCompact && (
        <>
          <Divider my={6} />
          <Box>
            <Text fontSize="sm" fontWeight="medium" color="gray.500" mb={3}>
              Quick Stats
            </Text>
            <SimpleGrid columns={2} spacing={3}>
              <Box p={3} borderRadius="lg" bg="gray.50" _dark={{ bg: 'gray.900' }}>
                <Text fontSize="xs" color="gray.500">Unread</Text>
                <Text fontSize="lg" fontWeight="bold">12</Text>
              </Box>
              <Box p={3} borderRadius="lg" bg="gray.50" _dark={{ bg: 'gray.900' }}>
                <Text fontSize="xs" color="gray.500">Resolved</Text>
                <Text fontSize="lg" fontWeight="bold">48</Text>
              </Box>
            </SimpleGrid>
          </Box>
        </>
      )}

      {isCompact && (
        <Box mt={6} pt={4} borderTop="1px" borderColor={borderColor}>
          <Button size="sm" colorScheme="brand" w="full" leftIcon={<FiCheckCircle />}>
            View All Activities
          </Button>
        </Box>
      )}
    </Box>
  )
}

// Add SimpleGrid import at the top if not already
import { SimpleGrid } from '@chakra-ui/react'

export default RecentActivity