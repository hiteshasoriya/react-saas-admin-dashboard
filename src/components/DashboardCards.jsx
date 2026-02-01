import {
  SimpleGrid,
  Box,
  Text,
  Flex,
  Icon,
  useColorModeValue,
  Badge,
  CircularProgress,
  CircularProgressLabel,
  IconButton,
} from '@chakra-ui/react'
import { FiTrendingUp, FiTrendingDown, FiUsers, FiDollarSign, FiPackage, FiActivity, FiRefreshCw } from 'react-icons/fi'
import { useState } from 'react'
import { updateStats } from '../utils/helpers'

const DashboardCards = ({ sidebarCollapsed = false }) => {
  const cardBg = useColorModeValue('white', 'gray.800')
  const cardBorder = useColorModeValue('gray.200', 'gray.700')
  
  const isCollapsed = sidebarCollapsed

  const initialCards = [
    {
      title: 'Revenue',
      value: '$54.2K',
      change: '+12.5%',
      trend: 'up',
      icon: FiDollarSign,
      color: 'green.500',
      bgGradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      progress: 75,
    },
    {
      title: 'Users',
      value: '3.2K',
      change: '+8.2%',
      trend: 'up',
      icon: FiUsers,
      color: 'blue.500',
      bgGradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
      progress: 65,
    },
    {
      title: 'Orders',
      value: '1.6K',
      change: '+5.7%',
      trend: 'up',
      icon: FiPackage,
      color: 'purple.500',
      bgGradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
      progress: 45,
    },
    {
      title: 'Growth',
      value: '24.3%',
      change: '+3.2%',
      trend: 'up',
      icon: FiActivity,
      color: 'orange.500',
      bgGradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      progress: 85,
    },
  ]

  const [cards, setCards] = useState(initialCards)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setCards(updateStats(cards))
      setIsRefreshing(false)
    }, 1000)
  }

  return (
    <>
      <Flex justify="flex-end" mb={4}>
        <IconButton
          aria-label="Refresh stats"
          icon={<FiRefreshCw />}
          size="sm"
          onClick={handleRefresh}
          isLoading={isRefreshing}
          variant="outline"
        />
      </Flex>
      
      <SimpleGrid 
        columns={{ 
          base: 1, 
          sm: 2, 
          lg: isCollapsed ? 4 : 4 
        }} 
        spacing={isCollapsed ? 3 : 6}
      >
        {cards.map((card) => (
          <Box
            key={card.title}
            bg={cardBg}
            borderRadius="lg"
            boxShadow="sm"
            border="1px"
            borderColor={cardBorder}
            p={isCollapsed ? 3 : 6}
            position="relative"
            overflow="hidden"
            transition="all 0.3s ease"
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'md',
              borderColor: card.color,
            }}
            _before={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: card.bgGradient,
              opacity: 0.8,
            }}
          >
            {isCollapsed ? (
              <Flex direction="row" align="center" justify="space-between" h="full">
                <Flex direction="column" align="flex-start" mr={2}>
                  <Flex align="center" mb={1}>
                    <Box
                      w={6}
                      h={6}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      borderRadius="md"
                      bg={`${card.color}15`}
                      mr={2}
                    >
                      <Icon as={card.icon} w={3} h={3} color={card.color} />
                    </Box>
                    <Text fontSize="xs" fontWeight="semibold" color="gray.500">
                      {card.title}
                    </Text>
                  </Flex>
                  <Text fontSize="lg" fontWeight="bold">
                    {card.value}
                  </Text>
                </Flex>
                
                <Flex direction="column" align="flex-end">
                  <Badge
                    colorScheme={card.trend === 'up' ? 'green' : 'red'}
                    variant="subtle"
                    fontSize="2xs"
                    px={2}
                    py={0.5}
                    borderRadius="full"
                    mb={1}
                  >
                    <Flex align="center">
                      <Icon
                        as={card.trend === 'up' ? FiTrendingUp : FiTrendingDown}
                        mr={0.5}
                        size={10}
                      />
                      {card.change}
                    </Flex>
                  </Badge>
                  <CircularProgress
                    value={card.progress}
                    size="40px"
                    thickness="8px"
                    color={card.color}
                    trackColor="gray.100"
                  >
                    <CircularProgressLabel fontSize="2xs" fontWeight="bold">
                      {card.progress}%
                    </CircularProgressLabel>
                  </CircularProgress>
                </Flex>
              </Flex>
            ) : (
              <Flex direction="column" h="full" justify="space-between">
                <Flex justify="space-between" align="flex-start" mb={4}>
                  <Box flex="1">
                    <Text fontSize="sm" fontWeight="semibold" color="gray.500" mb={1}>
                      {card.title}
                    </Text>
                  </Box>
                  <Box
                    w={12}
                    h={12}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="lg"
                    bg={`${card.color}15`}
                    boxShadow="sm"
                    flexShrink={0}
                  >
                    <Icon as={card.icon} w={6} h={6} color={card.color} />
                  </Box>
                </Flex>
                
                <Box mb={4}>
                  <Text fontSize="2xl" fontWeight="bold" mb={2}>
                    {card.value}
                  </Text>
                  <Flex align="center">
                    <Icon
                      as={card.trend === 'up' ? FiTrendingUp : FiTrendingDown}
                      color={card.trend === 'up' ? 'green.500' : 'red.500'}
                      mr={2}
                    />
                    <Text
                      fontSize="sm"
                      fontWeight="medium"
                      color={card.trend === 'up' ? 'green.500' : 'red.500'}
                    >
                      {card.change}
                    </Text>
                    <Text fontSize="sm" color="gray.500" ml={2}>
                      from last month
                    </Text>
                  </Flex>
                </Box>
                
                <Box>
                  <Flex justify="space-between" mb={2}>
                    <Text fontSize="xs" color="gray.500">Progress</Text>
                    <Text fontSize="xs" fontWeight="semibold" color={card.color}>
                      {card.progress}% Complete
                    </Text>
                  </Flex>
                  <Box
                    h={2}
                    bg="gray.100"
                    borderRadius="full"
                    overflow="hidden"
                    position="relative"
                  >
                    <Box
                      w={`${card.progress}%`}
                      h="100%"
                      bg={card.bgGradient}
                      borderRadius="full"
                      position="relative"
                    />
                  </Box>
                </Box>
              </Flex>
            )}
          </Box>
        ))}
      </SimpleGrid>
    </>
  )
}

export default DashboardCards