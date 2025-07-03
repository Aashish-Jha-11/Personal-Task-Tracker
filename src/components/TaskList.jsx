import { motion, AnimatePresence } from 'framer-motion';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, onToggleComplete, onDeleteTask, onEditTask, currentFilter }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const emptyStateVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  if (tasks.length === 0) {
    return (
      <motion.div 
        className="empty-state"
        variants={emptyStateVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="empty-state-icon"
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
          📝
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          No tasks found
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          {currentFilter === 'all' && "Start by adding your first task above!"}
          {currentFilter === 'completed' && "No completed tasks yet."}
          {currentFilter === 'pending' && "No pending tasks. Great job!"}
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="task-list"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="popLayout">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskList;