import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TaskForm.css';

const TaskForm = ({ onAddTask, onUpdateTask, editingTask, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: '',
    dueDate: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || '',
        description: editingTask.description || '',
        priority: editingTask.priority || 'medium',
        category: editingTask.category || '',
        dueDate: editingTask.dueDate || ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        category: '',
        dueDate: ''
      });
    }
    setErrors({});
  }, [editingTask]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (formData.dueDate && new Date(formData.dueDate) < new Date().setHours(0, 0, 0, 0)) {
      newErrors.dueDate = 'Due date cannot be in the past';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const taskData = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category.trim()
    };

    if (editingTask) {
      onUpdateTask(editingTask.id, taskData);
    } else {
      onAddTask(taskData);
    }

    // Reset form
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      category: '',
      dueDate: ''
    });
    setErrors({});
  };

  const handleCancel = () => {
    if (editingTask) {
      onCancelEdit();
    }
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      category: '',
      dueDate: ''
    });
    setErrors({});
  };

  const formVariants = {
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
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3 }
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

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div 
      className="task-form-container"
      layout
    >
      <AnimatePresence mode="wait">
        <motion.form 
          onSubmit={handleSubmit} 
          className="task-form"
          variants={formVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          key={editingTask ? editingTask.id : 'new'}
        >
          <motion.div className="form-header" variants={itemVariants}>
            <h2>{editingTask ? 'Edit Task' : 'Add New Task'}</h2>
            {editingTask && (
              <motion.button 
                type="button" 
                onClick={handleCancel} 
                className="cancel-btn"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            )}
          </motion.div>

          <motion.div className="form-grid" variants={itemVariants}>
            <motion.div className="input-group" variants={itemVariants}>
              <label htmlFor="title">Title *</label>
              <motion.input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter task title"
                className={errors.title ? 'error' : ''}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
              <AnimatePresence>
                {errors.title && (
                  <motion.span 
                    className="error-message"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {errors.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div className="input-group" variants={itemVariants}>
              <label htmlFor="priority">Priority</label>
              <motion.select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </motion.select>
            </motion.div>

            <motion.div className="input-group" variants={itemVariants}>
              <label htmlFor="category">Category</label>
              <motion.input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="e.g., Work, Personal, Study"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>

            <motion.div className="input-group" variants={itemVariants}>
              <label htmlFor="dueDate">Due Date</label>
              <motion.input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className={errors.dueDate ? 'error' : ''}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
              <AnimatePresence>
                {errors.dueDate && (
                  <motion.span 
                    className="error-message"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {errors.dueDate}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          <motion.div className="input-group" variants={itemVariants}>
            <label htmlFor="description">Description</label>
            <motion.textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter task description (optional)"
              rows="3"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>

          <motion.div className="form-actions" variants={itemVariants}>
            <motion.button 
              type="submit" 
              className="submit-btn"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {editingTask ? 'Update Task' : 'Add Task'}
            </motion.button>
            {editingTask && (
              <motion.button 
                type="button" 
                onClick={handleCancel} 
                className="cancel-btn"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Cancel
              </motion.button>
            )}
          </motion.div>
        </motion.form>
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskForm;