// Local storage 
export const STORAGE_KEYS = {
  TASKS: 'taskTracker_tasks',
  USER: 'taskTracker_user',
  THEME: 'taskTracker_theme'
};

export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

// Task-specific
export const saveTasks = (tasks) => {
  saveToStorage(STORAGE_KEYS.TASKS, tasks);
};

export const loadTasks = () => {
  const tasks = loadFromStorage(STORAGE_KEYS.TASKS);
  return tasks || [];
};

export const saveUser = (user) => {
  saveToStorage(STORAGE_KEYS.USER, user);
};

export const loadUser = () => {
  return loadFromStorage(STORAGE_KEYS.USER);
};

export const saveTheme = (theme) => {
  saveToStorage(STORAGE_KEYS.THEME, theme);
};

export const loadTheme = () => {
  return loadFromStorage(STORAGE_KEYS.THEME) || 'light';
};