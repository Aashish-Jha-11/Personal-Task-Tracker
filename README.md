# Personal Task Tracker

## 📖 Description
A beautiful, feature-rich Personal Task Tracker application built with React. This app provides a complete task management solution with a modern, responsive design and advanced features including dark mode, priority levels, categories, due dates, and search functionality.

## 🚀 Features
- **Simple Login System** - Username-based authentication with localStorage persistence
- **Complete Task Management** - Add, edit, delete, and toggle task completion
- **Advanced Filtering** - Filter tasks by status (all, pending, completed) with live counts
- **Search Functionality** - Search tasks by title, description, or category
- **Priority Levels** - Assign and visualize task priorities (high, medium, low)
- **Task Categories** - Organize tasks with custom categories
- **Due Dates** - Set due dates with overdue indicators
- **Dark Mode Toggle** - Switch between light and dark themes
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Data Persistence** - All data saved to localStorage
- **Smooth Animations** - Polished UI with micro-interactions
- **Accessibility** - Keyboard navigation and screen reader support

## 🛠 Setup Instructions
1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`
4. Open [http://localhost:5173](http://localhost:5173)

## 🧰 Technologies Used
- React.js 
- Vite
- CSS3 with CSS Custom Properties
- localStorage for data persistence
- Modern JavaScript (ES6+)

## 🎨 Design Features
- **Modern UI** - Clean, professional design with Apple-level aesthetics
- **Color System** - Comprehensive color palette with proper contrast ratios
- **Typography** - Inter font family with proper hierarchy
- **Animations** - Smooth transitions and hover effects
- **Responsive** - Mobile-first approach with breakpoints for all devices
- **Accessibility** - WCAG 2.1 AA compliant design

## 🔧 Technical Architecture
- **Component-based** - Modular React components with clear separation of concerns
- **State Management** - React hooks for local state management
- **Utilities** - Dedicated localStorage utility functions
- **Theming** - CSS custom properties for easy theme switching
- **Performance** - Optimized rendering with useMemo and useCallback

## 📱 Mobile Experience
- Touch-friendly interface
- Responsive design for all screen sizes
- Optimized performance on mobile devices
- Native-like user experience

## 🌟 Bonus Features Implemented
- ✅ Search functionality
- ✅ Task priority levels (high, medium, low)
- ✅ Due dates with overdue indicators
- ✅ Smooth animations and transitions
- ✅ Dark mode toggle
- ✅ Task categories/tags
- ✅ Task counts in filter tabs
- ✅ Confirmation dialogs for destructive actions
- ✅ Visual feedback for all interactions
- ✅ Keyboard accessibility
- ✅ Task sorting (by priority and date)

## 🎯 Usage
1. **Login** - Enter any username to access the app
2. **Add Tasks** - Use the form to create new tasks with title, description, priority, category, and due date
3. **Manage Tasks** - Click the edit button to modify tasks, or the delete button to remove them
4. **Filter Tasks** - Use the filter tabs to view all, pending, or completed tasks
5. **Search** - Use the search bar to find specific tasks
6. **Toggle Theme** - Click the theme toggle button to switch between light and dark modes

## 📊 Sample Data Structure
```javascript
const sampleTask = {
  id: 1704110400000,
  title: "Complete React assignment",
  description: "Build a task tracker application with advanced features",
  priority: "high",
  category: "Work",
  dueDate: "2025-07-20",
  completed: false,
  createdAt: "2025-07-15",
  updatedAt: "2025-07-17",
  completedAt: null
};
```

## 🔒 Privacy & Security
- No data is sent to external servers
- All data is stored locally in your browser
- No personal information is collected beyond the username you provide
- Username is used only for display purposes

## 🎭 Theme System
The app includes a comprehensive theming system with:
- Light and dark mode support
- CSS custom properties for easy customization
- Consistent color palette across all components
- Smooth transitions between themes

## 🚀 Performance Optimizations
- Memoized filtering and searching
- Efficient state updates
- Minimal re-renders
- Optimized bundle size
- Lazy loading where appropriate

## 📖 Component Structure
```
src/
├── components/
│   ├── Header.jsx         # App header with navigation
│   ├── Login.jsx          # Login form component
│   ├── TaskForm.jsx       # Task creation/editing form
│   ├── TaskItem.jsx       # Individual task component
│   ├── TaskList.jsx       # Task list container
│   └── TaskFilter.jsx     # Filter and search component
├── utils/
│   └── localStorage.js    # Local storage utilities
├── App.jsx               # Main application component
├── App.css               # Global styles and theme variables
└── main.jsx             # Application entry point
```

## 🌐 Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎉 Future Enhancements
- Task sharing and collaboration
- Export/import functionality
- Task templates
- Time tracking
- Notifications and reminders
- Task attachments
- Advanced reporting
- Calendar integration
