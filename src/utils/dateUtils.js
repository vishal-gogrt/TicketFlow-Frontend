// Date utility functions for the application

export const formatDate = (date) => {
  if (!date) return '';
  
  const dateObj = date instanceof Date ? date : new Date(date);
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(dateObj);
};

export const formatDateTime = (date) => {
  if (!date) return '';
  
  const dateObj = date instanceof Date ? date : new Date(date);
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(dateObj);
};

export const formatMonthYear = (date) => {
  if (!date) return '';
  
  const dateObj = date instanceof Date ? date : new Date(date);
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long'
  }).format(dateObj);
};

export const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false;
  
  const d1 = date1 instanceof Date ? date1 : new Date(date1);
  const d2 = date2 instanceof Date ? date2 : new Date(date2);
  
  return d1.toDateString() === d2.toDateString();
};

export const isToday = (date) => {
  if (!date) return false;
  
  const dateObj = date instanceof Date ? date : new Date(date);
  const today = new Date();
  
  return dateObj.toDateString() === today.toDateString();
};