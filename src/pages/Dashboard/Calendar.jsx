import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';

const Calendar = ({ tickets = [], users = [], onTicketClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const firstDay = new Date(currentYear, currentMonth, 1);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  const getUserName = (userId) => {
    const user = users.find(u => u._id === userId || u.id === userId);
    return user ? user.name : 'Unknown User';
  };

  const getTicketsForDate = (date) => {
    const dateString = date.toDateString();
    return tickets.filter(ticket => {
      const created = new Date(ticket.createdAt).toDateString();
      const due = ticket.dueDate ? new Date(ticket.dueDate).toDateString() : null;
      return created === dateString || due === dateString;
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const renderCalendarGrid = () => {
    const days = [];
    const gridStart = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      const day = new Date(gridStart);
      day.setDate(startDate.getDate() + i);

      const isCurrentMonth = day.getMonth() === currentMonth;
      const isToday = day.toDateString() === today.toDateString();
      const dayTickets = getTicketsForDate(day);

      days.push(
        <div
          key={i}
          className={`min-h-[120px] theme-border border text-xs cursor-default ${
            isCurrentMonth ? 'theme-bg-primary' : 'theme-bg-secondary'
          } ${isToday ? 'ring-2 ring-blue-500' : ''}`}
        >
          <div
            className={`text-sm font-medium mb-1 ${
              isCurrentMonth ? 'theme-text-primary' : 'theme-text-secondary'
            } ${isToday ? 'text-blue-600' : ''}`}
          >
            {day.getDate()}
          </div>

          <div className="space-y-1">
            {dayTickets.slice(0, 3).map(ticket => (
              <div
                key={ticket._id}
                onClick={() => onTicketClick?.(ticket)}
                className={`text-white text-xs px-1 py-0.5 rounded truncate hover:opacity-80 cursor-pointer ${getPriorityColor(ticket.priority)}`}
                title={`${ticket.title} - ${ticket.priority}`}
              >
                #{ticket._id?.slice(-4)} {ticket.title}
              </div>
            ))}
            {dayTickets.length > 3 && (
              <div className="text-xs theme-text-secondary">
                +{dayTickets.length - 3} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold theme-text-primary">Calendar</h2>
          <p className="theme-text-secondary">View tickets by date</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setView('month')}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              view === 'month' ? 'bg-blue-600 text-white' : 'theme-bg-secondary theme-text-primary theme-bg-hover'
            }`}
          >
            Month
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="theme-bg-primary rounded-lg shadow-sm theme-border border">
        <div className="flex items-center justify-between p-4 theme-border border-b">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 theme-bg-hover rounded-md"
            >
              <ChevronLeft className="h-5 w-5 theme-text-primary" />
            </button>
            <h3 className="text-lg font-semibold theme-text-primary">
              {monthNames[currentMonth]} {currentYear}
            </h3>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 theme-bg-hover rounded-md"
            >
              <ChevronRight className="h-5 w-5 theme-text-primary" />
            </button>
          </div>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-1 text-sm font-medium text-blue-600 theme-bg-hover rounded-md"
          >
            Today
          </button>
        </div>

        {/* Grid */}
        <div className="p-4">
          <div className="grid grid-cols-7 gap-px mb-2">
            {weekDays.map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium theme-text-secondary">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-px theme-bg-secondary rounded-lg overflow-hidden">
            {renderCalendarGrid()}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="theme-bg-primary rounded-lg shadow-sm theme-border border p-4">
        <h3 className="text-lg font-semibold theme-text-primary mb-3">Priority Legend</h3>
        <div className="flex flex-wrap gap-4">
          {[
            { color: 'bg-red-500', label: 'Urgent' },
            { color: 'bg-orange-500', label: 'High' },
            { color: 'bg-yellow-500', label: 'Medium' },
            { color: 'bg-green-500', label: 'Low' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center">
              <div className={`w-4 h-4 rounded mr-2 ${color}`}></div>
              <span className="text-sm theme-text-primary">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;