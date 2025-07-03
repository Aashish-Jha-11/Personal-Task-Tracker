import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TaskItem.css';

const TaskItem = ({ task, onToggleComplete, onDeleteTask, onEditTask }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    onDeleteTask(task.id);
    setShowDeleteConfirm(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const handleToggleComplete = () => {
    onToggleComplete(task.id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && !task.completed;
  };

  const getDueDateStatus = (dueDate) => {
    if (!dueDate) return null;
    
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { text: 'Overdue', class: 'overdue' };
    } else if (diffDays === 0) {
      return { text: 'Due Today', class: 'due-today' };
    } else if (diffDays === 1) {
      return { text: 'Due Tomorrow', class: 'due-soon' };
    } else if (diffDays <= 7) {
      return { text: `Due in ${diffDays} days`, class: 'due-soon' };
    } else {
      return { text: `Due ${due.toLocaleDateString()}`, class: 'due-later' };
    }
  };

  const priorityColors = {
    low: 'var(--priority-low)',
    medium: 'var(--priority-medium)',
    high: 'var(--priority-high)'
  };

  const priorityIcons = {
    low: '🔵',
    medium: '🟡',
    high: '🔴'
  };

  const dueDateStatus = getDueDateStatus(task.dueDate);

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      x: -100, 
      scale: 0.95,
      transition: { duration: 0.3 }
    }
  };

  const completeButtonVariants = {
    uncompleted: { 
      scale: 1,
      backgroundColor: "transparent"
    },
    completed: { 
      scale: [1, 1.2, 1],
      backgroundColor: "var(--success-color)",
      transition: {
        scale: {
          duration: 0.6,
          ease: "easeInOut"
        }
      }
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 }
    }
  };

  const actionButtonVariants = {
    hover: { 
      scale: 1.1,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.9 }
  };

  return (
    <motion.div 
      className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue(task.dueDate) ? 'overdue' : ''}`}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      whileHover={{ 
        y: -2,
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
        transition: { duration: 0.2 }
      }}
    >
      <div className="task-content">
        <div className="task-header">
          <div className="task-title-section">
            <motion.button
              className={`complete-btn ${task.completed ? 'completed' : ''}`}
              onClick={handleToggleComplete}
              aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
              variants={completeButtonVariants}
              animate={task.completed ? 'completed' : 'uncompleted'}
              whileHover="hover"
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence>
                {task.completed && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ✓
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <motion.h3 
              className="task-title"
              animate={{
                textDecoration: task.completed ? 'line-through' : 'none',
                opacity: task.completed ? 0.7 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              {task.title}
            </motion.h3>
          </div>
          
          <div className="task-actions">
            <motion.button
              className="edit-btn"
              onClick={() => onEditTask(task)}
              aria-label="Edit task"
              variants={actionButtonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              ✏️
            </motion.button>
            <motion.button
              className="delete-btn"
              onClick={handleDelete}
              aria-label="Delete task"
              variants={actionButtonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              🗑️
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {task.description && (
            <motion.p 
              className="task-description"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {task.description}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.div 
          className="task-meta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <div className="task-info">
            <motion.span 
              className="priority-badge" 
              style={{ backgroundColor: priorityColors[task.priority] }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {priorityIcons[task.priority]} {task.priority}
            </motion.span>
            
            {task.category && (
              <motion.span 
                className="category-badge"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                🏷️ {task.category}
              </motion.span>
            )}
            
            {dueDateStatus && (
              <motion.span 
                className={`due-date-badge ${dueDateStatus.class}`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                📅 {dueDateStatus.text}
              </motion.span>
            )}
          </div>
          
          <div className="task-dates">
            <span className="created-date">
              Created: {formatDate(task.createdAt)}
            </span>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div 
            className="delete-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="delete-modal-content"
              initial={{ opacity: 0, scale: 0.8, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <h4>Delete Task</h4>
              <p>Are you sure you want to delete "{task.title}"?</p>
              <div className="delete-modal-actions">
                <motion.button 
                  onClick={confirmDelete} 
                  className="confirm-delete-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Yes, Delete
                </motion.button>
                <motion.button 
                  onClick={cancelDelete} 
                  className="cancel-delete-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskItem;