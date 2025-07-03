import { useState } from 'react';
import { motion } from 'framer-motion';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.trim()) {
      setIsLoading(true);
      // Simulate loading for better UX
      setTimeout(() => {
        onLogin(username.trim());
        setIsLoading(false);
      }, 500);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div 
      className="login-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="login-card"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="login-header" variants={itemVariants}>
          <motion.h1
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              delay: 0.3,
              type: "spring",
              stiffness: 200,
              damping: 10
            }}
          >
            📋 Task Tracker
          </motion.h1>
          <motion.p variants={itemVariants}>
            Welcome back! Please enter your username to continue.
          </motion.p>
        </motion.div>
        
        <motion.form 
          onSubmit={handleSubmit} 
          className="login-form"
          variants={itemVariants}
        >
          <motion.div className="input-group" variants={itemVariants}>
            <label htmlFor="username">Username</label>
            <motion.input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              disabled={isLoading}
              autoFocus
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
          
          <motion.button 
            type="submit" 
            className={`login-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading || !username.trim()}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {isLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="loading-content"
              >
                <motion.div 
                  className="spinner"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                Logging in...
              </motion.div>
            ) : (
              'Login'
            )}
          </motion.button>
        </motion.form>
        
        <motion.div className="login-footer" variants={itemVariants}>
          <p>No account needed - just enter any username to get started!</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;