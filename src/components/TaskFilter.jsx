import { motion } from 'framer-motion';
import './TaskFilter.css';

const TaskFilter = ({ currentFilter, onFilterChange, taskCounts, searchTerm, onSearchChange }) => {
  const filters = [
    { key: 'all', label: 'All', count: taskCounts.all },
    { key: 'pending', label: 'Pending', count: taskCounts.pending },
    { key: 'completed', label: 'Completed', count: taskCounts.completed }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
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
      transition: { duration: 0.3 }
    }
  };

  const tabVariants = {
    inactive: { 
      scale: 1,
      backgroundColor: "var(--filter-tab-bg)"
    },
    active: { 
      scale: 1.05,
      backgroundColor: "var(--primary-color)",
      transition: { duration: 0.3 }
    },
    hover: {
      scale: 1.02,
      y: -2,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div 
      className="task-filter"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="search-section" variants={itemVariants}>
        <div className="search-input-container">
          <motion.input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
            whileFocus={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          />
          <motion.span 
            className="search-icon"
            animate={{ 
              rotate: searchTerm ? [0, 10, -10, 0] : 0
            }}
            transition={{ duration: 0.5 }}
          >
            🔍
          </motion.span>
        </div>
      </motion.div>

      <motion.div className="filter-tabs" variants={itemVariants}>
        {filters.map(filter => (
          <motion.button
            key={filter.key}
            className={`filter-tab ${currentFilter === filter.key ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.key)}
            variants={tabVariants}
            animate={currentFilter === filter.key ? 'active' : 'inactive'}
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
          >
            <span className="filter-label">{filter.label}</span>
            <motion.span 
              className="filter-count"
              key={filter.count}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {filter.count}
            </motion.span>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default TaskFilter;