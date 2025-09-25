import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Mail, Phone, User, Shield, ShieldCheck } from 'lucide-react';

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  // Mock users data - this would come from your API
  const users = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@company.com',
      phone: '+1 (555) 123-4567',
      role: 'super',
      status: 'active',
      lastLogin: '2 hours ago',
      avatar: null
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 234-5678',
      role: 'support',
      status: 'active',
      lastLogin: '1 day ago',
      avatar: null
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike.wilson@company.com',
      phone: '+1 (555) 345-6789',
      role: 'support',
      status: 'active',
      lastLogin: '3 days ago',
      avatar: null
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@company.com',
      phone: '+1 (555) 456-7890',
      role: 'customer',
      status: 'inactive',
      lastLogin: '1 week ago',
      avatar: null
    }
  ];

  const getRoleIcon = (role) => {
    switch (role) {
      case 'super': return <ShieldCheck className="h-4 w-4 text-purple-500" />;
      case 'support': return <Shield className="h-4 w-4 text-blue-500" />;
      case 'customer': return <User className="h-4 w-4 text-green-500" />;
      default: return <User className="h-4 w-4 theme-text-secondary" />;
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'super': return 'bg-purple-100 text-purple-800';
      case 'support': return 'bg-blue-100 text-blue-800';
      case 'customer': return 'bg-green-100 text-green-800';
      default: return 'theme-bg-secondary theme-text-primary';
    }
  };

  const getStatusBadgeColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold theme-text-primary">Users</h2>
          <p className="theme-text-secondary">Manage your team members and their permissions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Plus className="h-4 w-4" />
          Add User
        </button>
      </div>

      {/* Filters */}
      <div className="theme-bg-primary rounded-lg shadow-sm theme-border border p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 theme-text-secondary" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 theme-bg-secondary theme-text-primary theme-border border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Role Filter */}
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-2 theme-bg-secondary theme-text-primary theme-border border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="super">Super Admin</option>
            <option value="support">Support</option>
            <option value="customer">Customer</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="theme-bg-primary rounded-lg shadow-sm theme-border border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="theme-bg-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium theme-text-secondary uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium theme-text-secondary uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium theme-text-secondary uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium theme-text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium theme-text-secondary uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium theme-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y theme-border">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="theme-bg-hover hover:theme-bg-hover">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center uppercase font-medium">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium theme-text-primary">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm theme-text-primary">
                        <Mail className="h-4 w-4 mr-2 theme-text-secondary" />
                        {user.email}
                      </div>
                      <div className="flex items-center text-sm theme-text-secondary">
                        <Phone className="h-4 w-4 mr-2" />
                        {user.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getRoleIcon(user.role)}
                      <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(user.role)}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(user.status)}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-secondary">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="theme-text-primary hover:text-blue-600">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button className="theme-text-primary hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="theme-text-secondary">
              <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No users found matching your criteria.</p>
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="theme-bg-primary rounded-lg shadow-sm theme-border border p-4">
          <div className="flex items-center">
            <User className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm theme-text-secondary">Total Users</p>
              <p className="text-2xl font-bold theme-text-primary">{users.length}</p>
            </div>
          </div>
        </div>
        <div className="theme-bg-primary rounded-lg shadow-sm theme-border border p-4">
          <div className="flex items-center">
            <ShieldCheck className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm theme-text-secondary">Super Admins</p>
              <p className="text-2xl font-bold theme-text-primary">
                {users.filter(u => u.role === 'super').length}
              </p>
            </div>
          </div>
        </div>
        <div className="theme-bg-primary rounded-lg shadow-sm theme-border border p-4">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm theme-text-secondary">Support Staff</p>
              <p className="text-2xl font-bold theme-text-primary">
                {users.filter(u => u.role === 'support').length}
              </p>
            </div>
          </div>
        </div>
        <div className="theme-bg-primary rounded-lg shadow-sm theme-border border p-4">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm theme-text-secondary">Active Users</p>
              <p className="text-2xl font-bold theme-text-primary">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}