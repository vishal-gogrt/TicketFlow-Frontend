import React, { useState, useEffect } from "react";
import { 
  X, 
  Sparkles, 
  AlertCircle, 
  User 
} from "lucide-react";

export default function TicketForm({ ticket = null, users = [], onCancel, onSubmit }) {
  const [formData, setFormData] = useState({
    organization: localStorage.getItem("currentOrg") || "",
    title: "",
    description: "",
    priority: "",
    ticket_type: "",
    status: "open",
    assignedTo: [],
    file: null
  });
  
  const [errors, setErrors] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(users);

  // Initialize form with ticket data if editing
  useEffect(() => {
    if (ticket) {
      setFormData({
        organization: ticket.organization || localStorage.getItem("currentOrg") || "",
        title: ticket.title || "",
        description: ticket.description || "",
        priority: ticket.priority || "",
        ticket_type: ticket.ticket_type || "",
        status: ticket.status || "open",
        assignedTo: Array.isArray(ticket.assignedTo) ? ticket.assignedTo : [ticket.assignedTo].filter(Boolean),
        file: null
      });
    }
  }, [ticket]);

  // Mock users if none provided
  useEffect(() => {
    if (users.length === 0) {
      setUser([
        { _id: "1", name: "John Doe", email: "john@example.com" },
        { _id: "2", name: "Jane Smith", email: "jane@example.com" },
        { _id: "3", name: "Mike Wilson", email: "mike@example.com" }
      ]);
    }
  }, [users]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    
    if (!ticket && !formData.organization.trim()) {
      newErrors.organization = "Organization is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const submitData = {
      ...formData,
      _id: ticket?._id || Date.now().toString(),
      createdAt: ticket?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    onSubmit(submitData);
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="theme-bg-primary rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-8 theme-border border-b">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold theme-text-primary">
                {ticket ? "Edit Ticket" : "Create New Ticket"}
              </h2>
              <p className="theme-text-secondary">
                {ticket
                  ? "Update ticket details and status"
                  : "Fill in the details to create a new support ticket"}
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-2 theme-text-secondary hover:theme-text-primary theme-bg-hover rounded-xl transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Organization field - only for new tickets */}
          {!ticket && (
            <div>
              <label
                htmlFor="organization"
                className="block text-sm font-semibold theme-text-primary mb-3"
              >
                Organization - {localStorage.getItem("currentOrg") || "N/A"}
              </label>
              <input
                type="hidden"
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all theme-text-primary placeholder-slate-400 ${
                  errors.organization
                    ? "border-red-300 bg-red-50"
                    : "theme-border theme-bg-primary"
                }`}
                placeholder="Organization Name"
              />
              {errors.organization && (
                <div className="mt-2 flex items-center text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.organization}
                </div>
              )}
            </div>
          )}

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold theme-text-primary mb-3"
            >
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all theme-text-primary placeholder-slate-400 ${
                errors.title
                  ? "border-red-300 bg-red-50"
                  : "theme-border theme-bg-primary"
              }`}
              placeholder="Enter a clear, descriptive title"
            />
            {errors.title && (
              <div className="mt-2 flex items-center text-sm text-red-600">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.title}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold theme-text-primary mb-3"
            >
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows={5}
              value={formData.description}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all theme-text-primary placeholder-slate-400 resize-none ${
                errors.description
                  ? "border-red-300 bg-red-50"
                  : "theme-border theme-bg-primary"
              }`}
              placeholder="Describe the issue or request in detail..."
            />
            {errors.description && (
              <div className="mt-2 flex items-center text-sm text-red-600">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.description}
              </div>
            )}
          </div>

          {/* Priority and Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="priority"
                className="block text-sm font-semibold theme-text-primary mb-3"
              >
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-3 theme-border border rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all theme-text-primary theme-bg-primary"
              >
                <option>Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="ticket_type"
                className="block text-sm font-semibold theme-text-primary mb-3"
              >
                Ticket Type
              </label>
              <select
                id="ticket_type"
                name="ticket_type"
                value={formData.ticket_type}
                onChange={handleChange}
                className="w-full px-4 py-3 theme-border border rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all theme-text-primary theme-bg-primary"
              >
                <option>Select Type</option>
                <option value="chargeback">Chargeback</option>
                <option value="tnx-issue">Tnx-issue</option>
                <option value="webhook">Webhook</option>
              </select>
            </div>
          </div>

          {/* Status and Assigned To */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-semibold theme-text-primary mb-3"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 theme-border border rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all theme-text-primary theme-bg-primary"
              >
                <option>Select Status</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            {/* Assign To Multi-Select */}
            <div>
              <label className="block text-sm font-semibold theme-text-primary mb-3">
                <User className="h-4 w-4 inline mr-1" /> Assign To
              </label>
              <div className="theme-border border rounded-xl theme-bg-primary p-2 min-h-[44px] flex flex-wrap items-center gap-2 focus-within:ring-2 focus-within:ring-blue-500/20">
                {formData.assignedTo.map((id) => {
                  const selectedUser = user.find((u) => u._id === id);
                  return (
                    <span
                      key={id}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1"
                    >
                      {selectedUser?.name || "User"}
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            assignedTo: prev.assignedTo.filter((uid) => uid !== id),
                          }))
                        }
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  );
                })}
                <div className="relative">
                  <button
                    type="button"
                    className="text-sm theme-text-secondary px-2 py-1 theme-bg-hover rounded-md"
                    onClick={() => setShowDropdown((prev) => !prev)}
                  >
                    + Assign
                  </button>
                  {showDropdown && (
                    <div className="absolute z-10 mt-1 theme-bg-primary theme-border border rounded-xl shadow-lg w-64 max-h-60 overflow-auto">
                      {user.map((u) => (
                        <label
                          key={u._id}
                          className="flex items-center gap-2 px-3 py-2 theme-bg-hover cursor-pointer text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={formData.assignedTo.includes(u._id)}
                            onChange={(e) => {
                              const selected = [...formData.assignedTo];
                              if (e.target.checked) {
                                selected.push(u._id);
                              } else {
                                const index = selected.indexOf(u._id);
                                if (index > -1) selected.splice(index, 1);
                              }
                              setFormData((prev) => ({
                                ...prev,
                                assignedTo: selected,
                              }));
                            }}
                          />
                          <span className="theme-text-primary">{u.name} ({u.email})</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* File Upload - only for new tickets */}
          {!ticket && (
            <div>
              <label
                htmlFor="file"
                className="block text-sm font-semibold theme-text-primary mb-3"
              >
                Attachment (Image / PDF / Excel)
              </label>

              <div className="relative border-2 border-dashed theme-border rounded-xl px-6 py-8 theme-bg-secondary text-center hover:border-blue-400 hover:bg-blue-50 transition-all">
                <input
                  type="file"
                  id="file"
                  name="file"
                  accept=".pdf,.xlsx,.xls,.png,.jpg,.jpeg"
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, file: e.target.files[0] }))
                  }
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                  <div className="text-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M16 8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                  </div>
                  <p className="theme-text-primary text-sm font-medium">
                    Click or drag a file to upload
                  </p>
                  <p className="theme-text-secondary text-xs">
                    Accepted: .pdf, .xlsx, .xls, .png, .jpg, .jpeg
                  </p>
                  {formData.file && (
                    <p className="text-sm text-green-600 font-semibold mt-2">
                      Selected: {formData.file.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 theme-border border rounded-xl theme-text-primary hover:theme-bg-hover transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {ticket ? "Update Ticket" : "Create Ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}