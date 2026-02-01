# SaaS Admin Dashboard

A modern, professional admin dashboard built with React, Chakra UI, and Vite. Designed for SaaS applications with a focus on responsiveness, accessibility, and user experience.

## 🎯 Project Overview

This admin dashboard provides a comprehensive interface for managing SaaS applications with features including:
- **Analytics Dashboard** with real-time metrics
- **User Management** with activity tracking
- **Subscription & Billing** overview
- **Responsive Design** for all device sizes
- **Dark/Light Mode** with persistence
- **Collapsible Sidebar** for space optimization

## 🚀 Features

### Core Features
✨ **Modern UI Design** - Clean, minimalist interface with smooth animations
📊 **Analytics Dashboard** - Stats cards, line charts, and activity tracking
🎨 **Chakra UI Components** - Fully accessible and customizable
🌓 **Dark/Light Mode** - Toggle between themes with localStorage persistence
📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
🔄 **Collapsible Sidebar** - Toggle sidebar to save screen space
🎯 **Mobile Optimized** - Touch-friendly interface with adaptive layouts

### Dashboard Components
- **Stats Cards** - Colorful cards showing key metrics (Revenue, Users, Orders, Growth)
- **Revenue Chart** - Interactive line chart with multiple data series
- **Data Table** - Responsive table with search, filter, and export capabilities
- **Top Products** - Product performance with progress indicators
- **User Activity** - Recent user interactions and online status
- **Recent Activity** - System notifications and updates

## 🛠️ Technologies

### Framework & Libraries
- **React 18** - Modern React framework
- **Chakra UI** - Accessible component library with dark mode support
- **Vite** - Fast build tool and development server
- **Recharts** - Interactive charts and graphs
- **React Icons** - Beautiful icon library
- **Framer Motion** - Smooth animations and transitions
- **Date-fns** - Date manipulation utilities

### Development Tools
- **ESLint** - Code linting and quality control
- **TypeScript** - Type definitions for better development
- **Emotion** - CSS-in-JS styling engine

## 📁 Project Structure

```
src/
├── components/
│   ├── DashboardCards.jsx    # Stats cards with responsive layouts
│   ├── DataTable.jsx         # Responsive table with mobile cards
│   ├── Header.jsx            # Top navigation bar with theme toggle
│   ├── RecentActivity.jsx    # System notifications and updates
│   ├── RevenueChart.jsx      # Interactive revenue overview chart
│   ├── Sidebar.jsx           # Collapsible navigation sidebar
│   ├── TopProducts.jsx       # Product performance tracking
│   └── UserActivity.jsx      # User interaction monitoring
├── App.jsx                   # Main application layout
├── main.jsx                  # React application entry point
└── index.css                 # Global styles
```

## 💻 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/admin-dashboard.git
cd admin-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## 🏗️ Build & Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

Starts a local server to preview the production build.

## 📱 Responsive Features

### Desktop View (> 768px)
- Full sidebar with menu text
- Three-column stats cards layout
- Full-width chart and table
- All navigation elements visible
- Expanded component views

### Tablet View (480px - 768px)
- Collapsible sidebar (toggleable)
- Stats cards stack vertically
- Optimized chart height
- Responsive typography
- Simplified navigation

### Mobile View (< 480px)
- Sidebar collapses to icons only
- Hamburger menu to toggle sidebar
- Stacked layout for all components
- Touch-friendly controls
- Full-width cards and tables
- Mobile-optimized data cards

## 🎨 Theme System

### Theme Toggle
The dashboard supports both light and dark themes with automatic persistence:

**Methods to Toggle Theme:**
1. **Top Navigation Bar** - Click the moon/sun icon
2. **Sidebar** - Click the theme toggle button at the bottom
3. **User Menu** - Theme toggle option in the dropdown

### Theme Storage
- Uses `localStorage` to persist theme preference
- Key: `chakra-ui-color-mode`
- Default: `light`

### Customization
You can customize themes by modifying the Chakra UI theme configuration in your components.

## 📊 Component Details

### Dashboard Cards
- **4 key metrics** displayed with gradient accents
- **Responsive layout** - expands when sidebar is open, compacts when collapsed
- **Progress indicators** - circular progress and linear progress bars
- **Hover effects** - subtle animations on hover

### Revenue Chart
- **Interactive line chart** with area fill
- **Responsive container** - adapts to available space
- **Time period selector** - switch between weekly, monthly, yearly views
- **Tooltip** - shows detailed information on hover

### Data Table
- **Multi-view support** - desktop table, tablet table, mobile cards
- **Search & Filter** - find and filter data quickly
- **Pagination** - navigate through large datasets
- **Export** - download data as CSV
- **Row actions** - view, edit, and delete options

### Top Products
- **Sales tracking** - progress bars for each product
- **Revenue display** - financial metrics for each item
- **Growth indicators** - percentage changes with icons
- **Performance summary** - average revenue and conversion rates

### User Activity
- **Real-time tracking** - recent user interactions
- **Online status** - avatar group showing currently active users
- **Activity timeline** - chronological list of user actions
- **Quick stats** - active users, new users, engagement rates

### Recent Activity
- **System notifications** - payment received, support tickets, etc.
- **Type categorization** - color-coded by activity type
- **Quick stats** - unread and resolved notifications count
- **Mark as read** - bulk action to clear notifications

## 🔧 Customization

### Colors
Customize colors in your Chakra UI theme configuration:
```javascript
// Example: Custom brand color
const brandColors = {
  50: '#EFF6FF',
  100: '#DBEAFE',
  500: '#3B82F6',
  600: '#2563EB',
  900: '#1D4ED8',
}
```

### Chart Data
Update chart data in `RevenueChart.jsx`:
```javascript
const data = [
  { month: 'Jan', revenue: 4000, users: 2400 },
  { month: 'Feb', revenue: 3000, users: 1398 },
  // ... more data points
]
```

### Menu Items
Modify sidebar navigation in `Sidebar.jsx`:
```javascript
const menuItems = [
  { icon: FiHome, label: 'Dashboard', active: true },
  { icon: FiBarChart2, label: 'Analytics' },
  // ... more menu items
]
```

### Stats Cards
Update dashboard metrics in `DashboardCards.jsx`:
```javascript
const cards = [
  {
    title: 'Revenue',
    value: '$54.2K',
    change: '+12.5%',
    trend: 'up',
    // ... other properties
  },
  // ... more cards
]
```

## 🧪 Testing

### Development Mode
Run the development server with hot reloading:
```bash
npm run dev
```

### Linting
Check code quality with ESLint:
```bash
npm run lint
```

## 📖 Documentation

### Additional Guides
- **[SAAS_DASHBOARD_PLAN.md](SAAS_DASHBOARD_PLAN.md)** - Comprehensive implementation plan for future features
- **[THEME_TOGGLE_GUIDE.md](THEME_TOGGLE_GUIDE.md)** - Detailed guide on theme system implementation

## 🎯 Future Enhancements

### Planned Features
- **Authentication System** - Admin login with role-based access control
- **User Management** - CRUD operations for user accounts
- **Subscription & Billing** - Payment processing integration
- **Analytics & Reporting** - Export reports (CSV, PDF)
- **Settings & Configuration** - Application settings management
- **Content Management** - Blog posts and documentation
- **Integration Management** - Third-party service connections

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 👤 Author

**Your Name** - [Your Website](https://yourwebsite.com) - [Your Email](mailto:youremail@example.com)

## 📞 Support

For questions or issues, please open an issue on GitHub or contact the author.

---

**Last Updated:** 2024
