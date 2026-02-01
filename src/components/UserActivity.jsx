import {
  Box,
  Text,
  VStack,
  HStack,
  Avatar,
  AvatarGroup,
  Badge,
  useColorModeValue,
  Icon,
  Flex,
  Button,
  Divider,
} from '@chakra-ui/react'
import {
  FiUser,
  FiUserCheck,
  FiUserX,
  FiClock,
  FiChevronRight,
  FiTrendingUp,
  FiMessageSquare,
} from 'react-icons/fi'

const UserActivity = ({ sidebarCollapsed = false }) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  
  const isCompact = sidebarCollapsed

  const activities = [
    { 
      user: 'Alex Johnson', 
      action: 'completed onboarding', 
      time: '5 min ago',
      avatar: 'https://bit.ly/dan-abramov',
    },
    { 
      user: 'Maria Garcia', 
      action: 'updated profile', 
      time: '25 min ago',
      avatar: 'https://bit.ly/ryan-florence',
    },
    { 
      user: 'David Lee', 
      action: 'made first purchase', 
      time: '1 hour ago',
      avatar: 'https://bit.ly/prosper-baba',
    },
    { 
      user: 'Sarah Miller', 
      action: 'joined workspace', 
      time: '2 hours ago',
      avatar: 'https://bit.ly/code-beast',
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
            User Activity
          </Text>
          <Text fontSize="sm" color="gray.500" noOfLines={1}>
            Recent user interactions
          </Text>
        </Box>
        <Button size="sm" variant="ghost" rightIcon={<FiChevronRight />}>
          {!isCompact && 'View All'}
        </Button>
      </Flex>

      {/* User Stats */}
      <Flex justify="space-between" mb={6} p={4} borderRadius="lg" bg="gray.50" _dark={{ bg: 'gray.900' }}>
        <Box textAlign="center">
          <Text fontSize="2xl" fontWeight="bold">487</Text>
          <Text fontSize="xs" color="gray.500">Active</Text>
        </Box>
        <Box textAlign="center">
          <Text fontSize="2xl" fontWeight="bold">128</Text>
          <Text fontSize="xs" color="gray.500">New</Text>
        </Box>
        <Box textAlign="center">
          <Text fontSize="2xl" fontWeight="bold">94%</Text>
          <Text fontSize="xs" color="gray.500">Engagement</Text>
        </Box>
      </Flex>

      {/* Activity List */}
      <VStack spacing={isCompact ? 3 : 4} align="stretch" mb={6}>
        {activities.map((activity, index) => (
          <Box
            key={index}
            p={isCompact ? 3 : 4}
            borderRadius="lg"
            border="1px"
            borderColor={borderColor}
          >
            <Flex justify="space-between" align="center">
              <HStack spacing={3}>
                <Avatar size={isCompact ? 'sm' : 'md'} name={activity.user} src={activity.avatar} />
                <Box>
                  <Text fontSize={isCompact ? 'sm' : 'md'} fontWeight="medium">
                    {activity.user}
                  </Text>
                  <Text fontSize="xs" color="gray.500">{activity.action}</Text>
                </Box>
              </HStack>
              <Text fontSize="xs" color="gray.500">
                {activity.time}
              </Text>
            </Flex>
          </Box>
        ))}
      </VStack>

      {/* Online Users */}
      {!isCompact && (
        <Box>
          <Flex justify="space-between" align="center" mb={3}>
            <Text fontSize="sm" color="gray.500">Currently Online</Text>
            <Badge colorScheme="green" variant="subtle">8 users</Badge>
          </Flex>
          <AvatarGroup size="md" max={5}>
            <Avatar name="John Smith" src="https://bit.ly/dan-abramov" />
            <Avatar name="Emma Johnson" src="https://bit.ly/ryan-florence" />
            <Avatar name="Michael Brown" src="https://bit.ly/prosper-baba" />
            <Avatar name="Sarah Davis" src="https://bit.ly/code-beast" />
            <Avatar name="Robert Wilson" src="https://bit.ly/sage-adebayo" />
          </AvatarGroup>
        </Box>
      )}

      {isCompact && (
        <Box mt={4} pt={4} borderTop="1px" borderColor={borderColor}>
          <Button size="sm" colorScheme="brand" w="full" leftIcon={<FiMessageSquare />}>
            Start Chat
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default UserActivity