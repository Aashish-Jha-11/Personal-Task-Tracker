import { motion } from 'framer-motion';
import './Header.css';

const Header = ({ user, onLogout, isDarkMode, onToggleDarkMode }) => {
  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.1,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.9 }
  };

  return (
    <motion.header 
      className="app-header"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="header-content">
        <motion.div className="header-left" variants={itemVariants}>
          <h1 className="app-title">
            <motion.span 
              className="app-icon"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              📋
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Task Tracker
            </motion.span>
          </h1>
        </motion.div>
        
        <motion.div className="header-right" variants={itemVariants}>
          <motion.div 
            className="user-info"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <span className="welcome-text">Welcome back, </span>
            <motion.span 
              className="username"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {user}
            </motion.span>
          </motion.div>
          
          <motion.button
            className="theme-toggle"
            onClick={onToggleDarkMode}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            animate={{ 
              rotate: isDarkMode ? 180 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </motion.button>
          
          <motion.button
            className="logout-btn"
            onClick={onLogout}
            aria-label="Logout"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Logout
          </motion.button>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;