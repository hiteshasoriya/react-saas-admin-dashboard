import { Flex, Box, Grid, GridItem, useColorModeValue, Text, HStack } from '@chakra-ui/react'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import DashboardCards from './components/DashboardCards'
import RevenueChart from './components/RevenueChart'
import DataTable from './components/DataTable'
import TopProducts from './components/TopProducts'
import UserActivity from './components/UserActivity'
import RecentActivity from './components/RecentActivity'
import { Toaster } from 'react-hot-toast'

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  
  // Theme-aware background colors
  const pageBgColor = useColorModeValue('gray.50', 'gray.900')
  const contentBgColor = useColorModeValue('white', 'gray.800')
  const sidebarBgColor = useColorModeValue('white', 'gray.800')
  const headerBgColor = useColorModeValue('white', 'gray.800')
  
  return (
    <Flex minH="100vh" bg={pageBgColor} position="relative">
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
      
      {/* Sidebar */}
      <Box
        position="fixed"
        left={0}
        top={0}
        bottom={0}
        zIndex={1000}
        transition="width 0.3s ease"
        width={{ 
          base: sidebarCollapsed ? '20' : '64',
          md: sidebarCollapsed ? '20' : '64'
        }}
        display={{ base: 'none', md: 'block' }}
        bg={sidebarBgColor}
        boxShadow="sm"
      >
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </Box>
      
      {/* Main Content Area */}
      <Box 
        flex="1" 
        transition="margin-left 0.3s ease, background-color 0.3s ease"
        ml={{ 
          base: 0,
          md: sidebarCollapsed ? '20' : '64'
        }}
        minW="0"
      >
        {/* Header */}
        <Box 
          position="sticky" 
          top={0} 
          zIndex={900}
          bg={headerBgColor}
          boxShadow="sm"
          borderBottom="1px"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
        >
          <Header 
            onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            sidebarCollapsed={sidebarCollapsed}
          />
        </Box>
        
        {/* Content Container */}
        <Box 
          p={{ 
            base: 4, 
            md: sidebarCollapsed ? 5 : 6, 
            lg: sidebarCollapsed ? 5 : 8 
          }}
          minH="calc(100vh - 80px)" // Subtract header height
        >
          {/* 1. Dashboard Cards Grid */}
          <Box mb={8}>
            <DashboardCards sidebarCollapsed={sidebarCollapsed} />
          </Box>
          
          {/* 2. Full Width Revenue Chart */}
          <Box 
            mb={8}
            bg={contentBgColor}
            borderRadius="lg"
            boxShadow="sm"
            border="1px"
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            transition="all 0.3s ease"
          >
            <RevenueChart sidebarCollapsed={sidebarCollapsed} />
          </Box>
          
          {/* 3. Full Width Data Table */}
          <Box mb={8}>
            <DataTable sidebarCollapsed={sidebarCollapsed} />
          </Box>
          
          {/* 4. Three Column Grid (Bottom Row) */}
          <Grid
            templateColumns={{
              base: '1fr',
              md: '1fr',
              lg: sidebarCollapsed ? 'repeat(3, 1fr)' : 'repeat(3, 1fr)'
            }}
            gap={{ base: 6, md: 6, lg: 6 }}
          >
            {/* Column 1: Top Products */}
            <GridItem>
              <Box
                bg={contentBgColor}
                borderRadius="lg"
                boxShadow="sm"
                border="1px"
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                h="100%"
                transition="all 0.3s ease"
              >
                <TopProducts sidebarCollapsed={sidebarCollapsed} />
              </Box>
            </GridItem>
            
            {/* Column 2: User Activity */}
            <GridItem>
              <Box
                bg={contentBgColor}
                borderRadius="lg"
                boxShadow="sm"
                border="1px"
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                h="100%"
                transition="all 0.3s ease"
              >
                <UserActivity sidebarCollapsed={sidebarCollapsed} />
              </Box>
            </GridItem>
            
            {/* Column 3: Recent Activity */}
            <GridItem>
              <Box
                bg={contentBgColor}
                borderRadius="lg"
                boxShadow="sm"
                border="1px"
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                h="100%"
                transition="all 0.3s ease"
              >
                <RecentActivity sidebarCollapsed={sidebarCollapsed} />
              </Box>
            </GridItem>
          </Grid>
        </Box>
        
        {/* Footer */}
        <Box 
          p={4} 
          mt={8}
          borderTop="1px"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          bg={headerBgColor}
          textAlign="center"
          fontSize="sm"
          color={useColorModeValue('gray.600', 'gray.400')}
        >
          <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
            <Text>© 2024 SaaS Dashboard. All rights reserved.</Text>
            <HStack spacing={4}>
              <Text>v1.0.0</Text>
              <Text>•</Text>
              <Text>{new Date().getFullYear()}</Text>
            </HStack>
          </Flex>
        </Box>
      </Box>
    </Flex>
  )
}

export default App