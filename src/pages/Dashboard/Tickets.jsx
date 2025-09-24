import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Ticket, 
  MoreHorizontal, 
  User, 
  Clock, 
  ArrowUpRight,
  AlertTriangle,
  CheckCircle,
  Circle,
  PlayCircle
} from "lucide-react";
import TicketDetail from "../../components/TicketDetail";
import TicketForm from "../../components/TicketForm";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  
  const itemsPerPage = 9;
  const totalPages = Math.ceil(tickets.length / itemsPerPage);
  
  // Mock users data
  const users = [
    { _id: "1", name: "John Doe", email: "john@example.com" },
    { _id: "2", name: "Jane Smith", email: "jane@example.com" },
    { _id: "3", name: "Mike Wilson", email: "mike@example.com" }
  ];

  // Load mock tickets
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setTickets([
        {
          _id: "TKT001",
          title: "Payment Processing Issue",
          description: "Customer unable to complete payment for subscription",
          status: "open",
          priority: "high", 
          ticket_type: "tnx-issue",
          assignedTo: ["1"],
          createdBy: { name: "Customer A", _id: "customer1" },
          createdAt: new Date().toISOString(),
          dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          _id: "TKT002",
          title: "Chargeback Investigation Required",
          description: "Disputed transaction needs review",
          status: "in_progress", 
          priority: "medium",
          ticket_type: "chargeback",
          assignedTo: ["2"],
          createdBy: { name: "System", _id: "system" },
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          _id: "TKT003", 
          title: "Webhook Configuration",
          description: "Need to set up webhook endpoints for new integration",
          status: "resolved",
          priority: "low",
          ticket_type: "webhook",
          assignedTo: ["3"],
          createdBy: { name: "Developer", _id: "dev1" },
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter tickets
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter;
    const matchesCategory = categoryFilter === "all" || ticket.ticket_type === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  // Paginate tickets
  const paginatedTickets = filteredTickets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  const getUserName = (assignedTo) => {
    if (Array.isArray(assignedTo)) {
      const user = users.find(u => u._id === assignedTo[0]);
      return user?.name || "Unassigned";
    }
    const user = users.find(u => u._id === assignedTo);
    return user?.name || "Unassigned";
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "border-red-200 bg-red-50 text-red-700";
      case "medium": return "border-yellow-200 bg-yellow-50 text-yellow-700";
      case "low": return "border-green-200 bg-green-50 text-green-700";
      default: return "border-gray-200 bg-gray-50 text-gray-700";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high": return <AlertTriangle className="h-3 w-3" />;
      case "medium": return <Circle className="h-3 w-3" />;
      case "low": return <CheckCircle className="h-3 w-3" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open": return "border-blue-200 bg-blue-50 text-blue-700";
      case "in_progress": return "border-purple-200 bg-purple-50 text-purple-700";
      case "resolved": return "border-green-200 bg-green-50 text-green-700";
      case "closed": return "border-gray-200 bg-gray-50 text-gray-700";
      default: return "border-gray-200 bg-gray-50 text-gray-700";
    }
  };

  const onCreateTicket = () => {
    setShowCreateForm(true);
    setEditingTicket(null);
  };

  const onViewTicket = (ticket) => {
    setSelectedTicket(ticket);
  };

  const onEditTicket = (ticket) => {
    setEditingTicket(ticket);
    setSelectedTicket(null);
    setShowCreateForm(true);
  };

  const handleTicketSubmit = (ticketData) => {
    if (editingTicket) {
      // Update existing ticket
      setTickets(prev => prev.map(t => t._id === editingTicket._id ? ticketData : t));
    } else {
      // Create new ticket
      setTickets(prev => [...prev, ticketData]);
    }
    setShowCreateForm(false);
    setEditingTicket(null);
  };

  // Simple Spinner component
  const Spinner = ({ message }) => (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <span className="ml-3 theme-text-secondary">{message}</span>
    </div>
  );

  // Simple Pagination component
  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return (
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 theme-border border rounded-lg theme-text-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {pages.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 border rounded-lg ${
              page === currentPage 
                ? "bg-blue-600 text-white border-blue-600" 
                : "theme-border theme-text-primary"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 theme-border border rounded-lg theme-text-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-6 sm:space-y-0">
        <div>
          <h2 className="text-3xl font-bold theme-text-primary">Tickets</h2>
          <p className="theme-text-secondary mt-2">
            Manage and track all support tickets
          </p>
          <div className="flex items-center space-x-6 mt-4">
            <div className="flex items-center text-sm theme-text-secondary">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              {tickets.filter((t) => t.status === "open").length} Open
            </div>
            <div className="flex items-center text-sm theme-text-secondary">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              {tickets.filter((t) => t.status === "in_progress").length} In
              Progress
            </div>
            <div className="flex items-center text-sm theme-text-secondary">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              {tickets.filter((t) => t.status === "resolved").length} Resolved
            </div>
          </div>
        </div>
        <button
          onClick={onCreateTicket}
          className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Ticket
        </button>
      </div>

      {/* Filters */}
      <div className="theme-bg-primary backdrop-blur-sm p-6 rounded-2xl shadow-sm theme-border border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 theme-text-secondary h-5 w-5" />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-3 theme-border border rounded-xl theme-bg-primary focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 theme-text-primary"
              />
            </div>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-3 theme-border border rounded-xl theme-bg-primary focus:ring-blue-500/20 theme-text-primary"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => {
              setPriorityFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-3 theme-border border rounded-xl theme-bg-primary focus:ring-blue-500/20 theme-text-primary"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-3 theme-border border rounded-xl theme-bg-primary focus:ring-blue-500/20 theme-text-primary"
          >
            <option value="all">All Categories</option>
            <option value="chargeback">Chargeback</option>
            <option value="tnx-issue">Transaction Issue</option>
            <option value="webhook">Webhook</option>
          </select>
        </div>
      </div>

      {/* Tickets Grid */}
      {loading ? (
        <Spinner message="Fetching tickets, please wait..." />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {paginatedTickets.map((ticket) => (
            <div
              key={ticket._id}
              className="theme-bg-primary backdrop-blur-sm rounded-2xl shadow-sm theme-border border p-6 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group cursor-pointer"
              onClick={() => onViewTicket(ticket)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      #{ticket._id.slice(-3)}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                        ticket.priority
                      )}`}
                    >
                      {getPriorityIcon(ticket.priority)}
                      <span
                        className={
                          getPriorityIcon(ticket.priority) ? "ml-1" : ""
                        }
                      >
                        {ticket.priority}
                      </span>
                    </span>
                  </div>
                </div>
                <button className="p-2 theme-text-secondary hover:theme-text-primary rounded-lg theme-bg-hover transition-colors opacity-0 group-hover:opacity-100">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold theme-text-primary mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors">
                  {ticket.title}
                </h3>
                <p className="theme-text-secondary text-sm line-clamp-2 mb-3">
                  {ticket.description}
                </p>
                <div className="flex items-center space-x-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      ticket.status
                    )}`}
                  >
                    {ticket.status.replace("_", " ")}
                  </span>
                  <span className="text-xs theme-text-secondary theme-bg-secondary px-2 py-1 rounded-md">
                    {ticket.ticket_type}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t theme-border">
                <div className="flex items-center text-xs theme-text-secondary">
                  <User className="h-4 w-4 mr-1" />
                  {getUserName(ticket.assignedTo)}
                </div>
                <div className="flex items-center space-x-2">
                  {ticket.dueDate && (
                    <div
                      className={`flex items-center text-xs ${
                        isOverdue(new Date(ticket.dueDate))
                          ? "text-red-600"
                          : "theme-text-secondary"
                      }`}
                    >
                      <Clock className="h-4 w-4 mr-1" />
                      {formatDate(new Date(ticket.dueDate))}
                    </div>
                  )}
                  <ArrowUpRight className="h-4 w-4 theme-text-secondary group-hover:text-blue-500 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredTickets.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 theme-bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Ticket className="h-12 w-12 theme-text-secondary" />
          </div>
          <h3 className="text-lg font-medium theme-text-primary mb-2">
            No tickets found
          </h3>
          <p className="theme-text-secondary mb-6">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={onCreateTicket}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create First Ticket
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center pt-4 pb-10">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Modals */}
      {selectedTicket && (
        <TicketDetail
          ticket={selectedTicket}
          users={users}
          onClose={() => setSelectedTicket(null)}
          onEdit={() => onEditTicket(selectedTicket)}
        />
      )}

      {showCreateForm && (
        <TicketForm
          ticket={editingTicket}
          users={users}
          onCancel={() => {
            setShowCreateForm(false);
            setEditingTicket(null);
          }}
          onSubmit={handleTicketSubmit}
        />
      )}
    </div>
  );
}