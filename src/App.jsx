import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Login from './components/Login';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import { saveTasks, loadTasks, saveUser, loadUser, saveTheme, loadTheme } from './utils/localStorage';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load user and tasks from localStorage
  useEffect(() => {
    const savedUser = loadUser();
    const savedTasks = loadTasks();
    const savedTheme = loadTheme();

    if (savedUser) {
      setUser(savedUser);
    }

    if (savedTasks) {
      setTasks(savedTasks);
    }

    setIsDarkMode(savedTheme === 'dark');
  }, []);

  // Apply dark mode
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : 'light';
    saveTheme(isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0 || user) {
      saveTasks(tasks);
    }
  }, [tasks, user]);

  const handleLogin = (username) => {
    setUser(username);
    saveUser(username);
  };

  const handleLogout = () => {
    setUser(null);
    setTasks([]);
    setCurrentFilter('all');
    setSearchTerm('');
    setEditingTask(null);
    saveUser(null);
    saveTasks([]);
  };

  const handleAddTask = (taskData) => {
    const newTask = {
      id: Date.now() + Math.random(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const handleUpdateTask = (taskId, taskData) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, ...taskData, updatedAt: new Date().toISOString() }
          : task
      )
    );
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const handleToggleComplete = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { 
              ...task, 
              completed: !task.completed,
              completedAt: !task.completed ? new Date().toISOString() : null
            }
          : task
      )
    );
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    switch (currentFilter) {
      case 'completed':
        filtered = filtered.filter(task => task.completed);
        break;
      case 'pending':
        filtered = filtered.filter(task => !task.completed);
        break;
      default:
        break;
    }

    // Sort by priority and creation date
    return filtered.sort((a, b) => {
      // First sort by completion status (pending first)
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      
      // Then by priority
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      // Finally by creation date (newest first)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [tasks, currentFilter, searchTerm]);

  // Calculate task counts
  const taskCounts = useMemo(() => {
    const searchFiltered = searchTerm.trim() 
      ? tasks.filter(task =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : tasks;

    return {
      all: searchFiltered.length,
      pending: searchFiltered.filter(task => !task.completed).length,
      completed: searchFiltered.filter(task => task.completed).length
    };
  }, [tasks, searchTerm]);

  const pageVariants = {
    initial: { opacity: 0, scale: 0.95 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.05 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  if (!user) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="login"
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <Login onLogin={handleLogin} />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key="app"
        className={`app ${isDarkMode ? 'dark' : 'light'}`}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Header
          user={user}
          onLogout={handleLogout}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
        />
        
        <main className="main-content">
          <div className="container">
            <TaskForm
              onAddTask={handleAddTask}
              onUpdateTask={handleUpdateTask}
              editingTask={editingTask}
              onCancelEdit={handleCancelEdit}
            />
            
            <TaskFilter
              currentFilter={currentFilter}
              onFilterChange={setCurrentFilter}
              taskCounts={taskCounts}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            
            <TaskList
              tasks={filteredTasks}
              onToggleComplete={handleToggleComplete}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
              currentFilter={currentFilter}
            />
          </div>
        </main>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;