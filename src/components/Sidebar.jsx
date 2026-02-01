import {
  Box,
  Flex,
  Text,
  IconButton,
  VStack,
  HStack,
  Divider,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react'
import {
  FiHome,
  FiBarChart2,
  FiUsers,
  FiPackage,
  FiShoppingCart,
  FiSettings,
  FiHelpCircle,
  FiBell,
  FiChevronLeft,
  FiChevronRight,
  FiCreditCard,
  FiGlobe,
  FiDatabase,
  FiUser,
} from 'react-icons/fi'

const Sidebar = ({ collapsed, onToggle }) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const hoverBg = useColorModeValue('gray.100', 'gray.700')
  const activeBg = useColorModeValue('brand.50', 'brand.900')

  const menuItems = [
    { icon: FiHome, label: 'Dashboard', active: true },
    { icon: FiBarChart2, label: 'Analytics' },
    { icon: FiUsers, label: 'Customers' },
    { icon: FiPackage, label: 'Products' },
    { icon: FiShoppingCart, label: 'Orders' },
    { icon: FiCreditCard, label: 'Payments' },
    { icon: FiBell, label: 'Notifications' },
    { icon: FiGlobe, label: 'Marketing' },
    { icon: FiDatabase, label: 'Reports' },
    { icon: FiSettings, label: 'Settings' },
    { icon: FiHelpCircle, label: 'Help & Support' },
  ]

  const renderMenuItem = (item) => {
    if (collapsed) {
      return (
        <Tooltip label={item.label} placement="right" hasArrow>
          <Flex
            align="center"
            justify="center"
            p={3}
            borderRadius="lg"
            bg={item.active ? activeBg : 'transparent'}
            color={item.active ? 'brand.600' : textColor}
            _hover={{
              bg: item.active ? activeBg : hoverBg,
              cursor: 'pointer',
              color: item.active ? 'brand.600' : useColorModeValue('gray.700', 'gray.200'),
            }}
            transition="all 0.2s"
          >
            <item.icon size={20} />
            {item.active && (
              <Box
                position="absolute"
                right={2}
                w={2}
                h={2}
                bg="brand.500"
                borderRadius="full"
              />
            )}
          </Flex>
        </Tooltip>
      )
    }

    return (
      <Flex
        align="center"
        p={3}
        borderRadius="lg"
        bg={item.active ? activeBg : 'transparent'}
        color={item.active ? 'brand.600' : textColor}
        _hover={{
          bg: item.active ? activeBg : hoverBg,
          cursor: 'pointer',
          color: item.active ? 'brand.600' : useColorModeValue('gray.700', 'gray.200'),
        }}
        transition="all 0.2s"
      >
        <item.icon size={18} />
        <Text ml={3} fontWeight={item.active ? 'semibold' : 'medium'} fontSize="sm">
          {item.label}
        </Text>
        {item.active && (
          <Box ml="auto" w={2} h={2} bg="brand.500" borderRadius="full" />
        )}
      </Flex>
    )
  }

  return (
    <Box
      w="full"
      h="100vh"
      borderRight="1px"
      borderColor={borderColor}
      bg={bgColor}
      display="flex"
      flexDirection="column"
    >
      {/* Logo Section */}
      <Flex
        // h="20"
        align="center"
        justify={collapsed ? 'center' : 'space-between'}
        px={collapsed ? 0 : 6}
        py={5}
        borderBottom="1px"
        borderColor={borderColor}
      >
        {!collapsed && (
          <Flex align="center">
            <Box
              w={8}
              h={8}
              bg="brand.500"
              borderRadius="lg"
              mr={3}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text color="white" fontWeight="bold">S</Text>
            </Box>
            <Text fontSize="xl" fontWeight="bold" color={useColorModeValue('gray.700', 'white')}>
              SaaS Pro
            </Text>
          </Flex>
        )}
        {collapsed && (
          <Box
            w={8}
            h={8}
            bg="brand.500"
            borderRadius="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="white" fontWeight="bold">S</Text>
          </Box>
        )}
        {/* <IconButton
          size="sm"
          icon={collapsed ? <FiChevronRight /> : <FiChevronLeft />}
          onClick={onToggle}
          aria-label="Toggle Sidebar"
          variant="ghost"
          display={{ base: 'none', md: 'flex' }}
        /> */}
      </Flex>

      {/* Scrollable Content */}
      <Box
        flex="1"
        overflowY="auto"
        mb={collapsed ? "0px" : "70px"} // Space for user profile
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: useColorModeValue('#CBD5E0', '#4A5568'),
            borderRadius: '24px',
          },
        }}
      >
        {/* Navigation Menu */}
        <Box mt={6} px={collapsed ? 2 : 4}>
          {!collapsed && (
            <Text
              fontSize="xs"
              fontWeight="semibold"
              color={useColorModeValue('gray.500', 'gray.400')}
              mb={3}
              px={3}
              letterSpacing="wide"
            >
              MAIN NAVIGATION
            </Text>
          )}
          
          <VStack spacing={1} align="stretch">
            {menuItems.slice(0, 5).map((item) => (
              <Box key={item.label}>
                {renderMenuItem(item)}
              </Box>
            ))}
          </VStack>
        </Box>

        <Divider my={6} borderColor={borderColor} />

        {/* Secondary Navigation */}
        <Box px={collapsed ? 2 : 4}>
          {!collapsed && (
            <Text
              fontSize="xs"
              fontWeight="semibold"
              color={useColorModeValue('gray.500', 'gray.400')}
              mb={3}
              px={3}
              letterSpacing="wide"
            >
              BUSINESS
            </Text>
          )}
          
          <VStack spacing={1} align="stretch">
            {menuItems.slice(5, 9).map((item) => (
              <Box key={item.label}>
                {renderMenuItem(item)}
              </Box>
            ))}
          </VStack>
        </Box>

        <Divider my={6} borderColor={borderColor} />

        {/* Settings Navigation */}
        <Box px={collapsed ? 2 : 4} mb={6}>
          <VStack spacing={1} align="stretch">
            {menuItems.slice(9).map((item) => (
              <Box key={item.label}>
                {renderMenuItem(item)}
              </Box>
            ))}
          </VStack>
        </Box>
      </Box>

      {/* User Profile - Fixed at bottom */}
      {!collapsed && (
        <Box
          position="fixed" // FIXED: lowercase "fixed"
          bottom={0}
          width={collapsed ? "80px" : "252px"} // Adjust based on sidebar width
          p={4}
          borderTop="1px"
          borderColor={borderColor}
          bg={bgColor}
        >
          <Menu>
            <MenuButton width="100%">
              <HStack spacing={3}>
                <Avatar
                  size="sm"
                  name="Hites Asoria"
                  src="https://bit.ly/dan-abramov"
                  border="2px solid"
                  borderColor="brand.500"
                />
                <Box flex="1" textAlign="left">
                  <Text fontSize="sm" fontWeight="semibold" color={useColorModeValue('gray.700', 'white')}>
                    Hitesh Asoria
                  </Text>
                  <Text fontSize="xs" color={useColorModeValue('gray.500', 'gray.400')}>
                    Admin
                  </Text>
                </Box>
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem icon={<FiUser />}>My Profile</MenuItem>
              <MenuItem icon={<FiSettings />}>Account Settings</MenuItem>
              <MenuItem icon={<FiCreditCard />}>Billing</MenuItem>
              <Divider />
              <MenuItem color="red.500">Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      )}
    </Box>
  )
}

export default Sidebar