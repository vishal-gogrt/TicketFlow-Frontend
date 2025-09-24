import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Shield, 
  MoreHorizontal, 
  Users as UsersIcon, 
  Calendar 
} from "lucide-react";

// TODO: Create these components
// import AddOrgForm from "../../components/AddOrgForm";
// import InviteUserModal from "../../components/InviteUserModal";
// import Spinner from "../../components/Spinner";

export default function Organization() {
  const [showAddOrgModal, setShowAddOrgModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [inviteOrgId, setInviteOrgId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  
  // Mock data for now - replace with actual API call
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOrganizations([
        {
          _id: "1",
          name: "Tech Corp",
          owner: { name: "John Doe", email: "john@techcorp.com" },
          users: [{ id: 1 }, { id: 2 }, { id: 3 }],
          createdAt: new Date().toISOString()
        },
        {
          _id: "2", 
          name: "Innovation Labs",
          owner: { name: "Jane Smith", email: "jane@innovationlabs.com" },
          users: [{ id: 1 }, { id: 2 }],
          createdAt: new Date().toISOString()
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const handleAddOrg = (newOrg) => {
    setOrganizations(prev => [...prev, newOrg]);
    setShowAddOrgModal(false);
  };

  // Simple spinner component
  const Spinner = ({ message }) => (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      <span className="ml-3 text-slate-600">{message}</span>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-6 sm:space-y-0">
        <div>
          <h2 className="text-3xl font-bold theme-text-primary">
            Organization Management
          </h2>
          <p className="theme-text-secondary mt-2">Manage all your organizations</p>
        </div>
        <button
          onClick={() => setShowAddOrgModal(true)}
          className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Organization
        </button>
      </div>

      {/* Search */}
      <div className="theme-bg-primary backdrop-blur-sm p-6 rounded-2xl shadow-sm theme-border border">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 theme-text-secondary h-5 w-5" />
          <input
            type="text"
            placeholder="Search organizations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 theme-border border rounded-xl theme-bg-primary focus:ring-2 focus:ring-green-500/20 focus:border-green-300 transition-all theme-text-primary"
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <Spinner message="Fetching organizations, please wait..." />
      ) : filteredOrganizations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrganizations.map((org) => (
            <div
              key={org._id}
              className="theme-bg-primary backdrop-blur-sm rounded-2xl shadow-sm theme-border border p-6 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold theme-text-primary">
                    {org.name}
                  </h3>
                  <div className="flex items-center text-sm theme-text-secondary mt-1">
                    <Shield className="h-4 w-4 mr-1 text-green-600" />
                    {org.owner?.name} ({org.owner?.email})
                  </div>
                </div>
                <button className="p-2 theme-text-secondary hover:theme-text-primary rounded-lg theme-bg-hover opacity-0 group-hover:opacity-100 transition">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>

              {/* Meta */}
              <div className="text-sm theme-text-secondary flex items-center mb-2">
                <UsersIcon className="h-4 w-4 mr-1" />
                {org.users.length} member{org.users.length !== 1 && "s"}
              </div>

              <div className="text-sm theme-text-secondary flex items-center mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                Created{" "}
                {org.createdAt ? formatDate(new Date(org.createdAt)) : "N/A"}
              </div>

              {/* Invite Button */}
              <button
                onClick={() => setInviteOrgId(org._id)}
                className="mt-2 text-sm text-green-700 font-medium bg-green-50 border border-green-200 rounded-lg px-3 py-2 hover:bg-green-100 transition"
              >
                Invite User
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 theme-bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <UsersIcon className="h-12 w-12 theme-text-secondary" />
          </div>
          <h3 className="text-lg font-medium theme-text-primary mb-2">
            No organizations found
          </h3>
          <p className="theme-text-secondary mb-6">Try adjusting your search</p>
          <button
            onClick={() => setShowAddOrgModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Organization
          </button>
        </div>
      )}

      {/* Modals */}
      {showAddOrgModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="theme-bg-primary rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium theme-text-primary mb-4">Add Organization</h3>
            <p className="theme-text-secondary mb-4">Organization creation functionality will be implemented here.</p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowAddOrgModal(false)}
                className="px-4 py-2 theme-border border rounded-lg theme-text-primary hover:theme-bg-hover transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddOrgModal(false)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      {inviteOrgId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="theme-bg-primary rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium theme-text-primary mb-4">Invite User</h3>
            <p className="theme-text-secondary mb-4">User invitation functionality will be implemented here.</p>
            <div className="flex space-x-3">
              <button
                onClick={() => setInviteOrgId(null)}
                className="px-4 py-2 theme-border border rounded-lg theme-text-primary hover:theme-bg-hover transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setInviteOrgId(null)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}