import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Mail, Phone, MapPin, Store, Globe, Eye, Check, X } from 'lucide-react';

export default function Merchants() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock merchants data
  const merchants = [
    {
      id: 1,
      name: 'TechStore Pro',
      email: 'info@techstore.com',
      phone: '+1 (555) 123-4567',
      address: '123 Tech Avenue, Silicon Valley, CA',
      website: 'www.techstore.com',
      status: 'active',
      joinDate: '2024-01-15',
      totalProducts: 245,
      totalOrders: 1834,
      rating: 4.8,
      category: 'Electronics'
    },
    {
      id: 2,
      name: 'Fashion Hub',
      email: 'contact@fashionhub.com',
      phone: '+1 (555) 234-5678',
      address: '456 Fashion Street, New York, NY',
      website: 'www.fashionhub.com',
      status: 'active',
      joinDate: '2024-02-20',
      totalProducts: 189,
      totalOrders: 967,
      rating: 4.6,
      category: 'Fashion'
    },
    {
      id: 3,
      name: 'Green Garden Supply',
      email: 'sales@greengarden.com',
      phone: '+1 (555) 345-6789',
      address: '789 Garden Road, Portland, OR',
      website: 'www.greengarden.com',
      status: 'pending',
      joinDate: '2024-03-10',
      totalProducts: 78,
      totalOrders: 234,
      rating: 4.3,
      category: 'Garden & Home'
    },
    {
      id: 4,
      name: 'Sports World',
      email: 'info@sportsworld.com',
      phone: '+1 (555) 456-7890',
      address: '321 Sports Center, Denver, CO',
      website: 'www.sportsworld.com',
      status: 'suspended',
      joinDate: '2023-11-05',
      totalProducts: 156,
      totalOrders: 543,
      rating: 3.9,
      category: 'Sports & Fitness'
    }
  ];

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'theme-bg-secondary theme-text-primary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <Check className="h-4 w-4 text-green-500" />;
      case 'pending': return <Eye className="h-4 w-4 text-yellow-500" />;
      case 'suspended': return <X className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredMerchants = merchants.filter(merchant => {
    const matchesSearch = merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         merchant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         merchant.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || merchant.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold theme-text-primary">Merchants</h2>
          <p className="theme-text-secondary">Manage your marketplace merchants and their stores</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Plus className="h-4 w-4" />
          Add Merchant
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
              placeholder="Search merchants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 theme-bg-secondary theme-text-primary theme-border border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 theme-bg-secondary theme-text-primary theme-border border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Merchants Table */}
      <div className="theme-bg-primary rounded-lg shadow-sm theme-border border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="theme-bg-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium theme-text-secondary uppercase tracking-wider">
                  Merchant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium theme-text-secondary uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium theme-text-secondary uppercase tracking-wider">
                  Business
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium theme-text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium theme-text-secondary uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium theme-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y theme-border">
              {filteredMerchants.map((merchant) => (
                <tr key={merchant.id} className="theme-bg-hover hover:theme-bg-hover">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-lg bg-blue-500 text-white flex items-center justify-center">
                        <Store className="h-5 w-5" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium theme-text-primary">{merchant.name}</div>
                        <div className="text-sm theme-text-secondary">{merchant.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm theme-text-primary">
                        <Mail className="h-4 w-4 mr-2 theme-text-secondary" />
                        {merchant.email}
                      </div>
                      <div className="flex items-center text-sm theme-text-secondary">
                        <Phone className="h-4 w-4 mr-2" />
                        {merchant.phone}
                      </div>
                      <div className="flex items-center text-sm theme-text-secondary">
                        <MapPin className="h-4 w-4 mr-2" />
                        {merchant.address.split(',')[0]}...
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm theme-text-primary">
                        <Globe className="h-4 w-4 mr-2 theme-text-secondary" />
                        {merchant.website}
                      </div>
                      <div className="text-sm theme-text-secondary">
                        Joined: {formatDate(merchant.joinDate)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(merchant.status)}
                      <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(merchant.status)}`}>
                        {merchant.status.charAt(0).toUpperCase() + merchant.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="text-sm theme-text-primary">
                        Products: {merchant.totalProducts}
                      </div>
                      <div className="text-sm theme-text-secondary">
                        Orders: {merchant.totalOrders}
                      </div>
                      <div className="text-sm theme-text-secondary">
                        Rating: {merchant.rating}/5.0
                      </div>
                    </div>
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

        {filteredMerchants.length === 0 && (
          <div className="text-center py-12">
            <div className="theme-text-secondary">
              <Store className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No merchants found matching your criteria.</p>
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="theme-bg-primary rounded-lg shadow-sm theme-border border p-4">
          <div className="flex items-center">
            <Store className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm theme-text-secondary">Total Merchants</p>
              <p className="text-2xl font-bold theme-text-primary">{merchants.length}</p>
            </div>
          </div>
        </div>
        <div className="theme-bg-primary rounded-lg shadow-sm theme-border border p-4">
          <div className="flex items-center">
            <Check className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm theme-text-secondary">Active</p>
              <p className="text-2xl font-bold theme-text-primary">
                {merchants.filter(m => m.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="theme-bg-primary rounded-lg shadow-sm theme-border border p-4">
          <div className="flex items-center">
            <Eye className="h-8 w-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm theme-text-secondary">Pending</p>
              <p className="text-2xl font-bold theme-text-primary">
                {merchants.filter(m => m.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        <div className="theme-bg-primary rounded-lg shadow-sm theme-border border p-4">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center">
              <Store className="h-5 w-5 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm theme-text-secondary">Total Products</p>
              <p className="text-2xl font-bold theme-text-primary">
                {merchants.reduce((sum, m) => sum + m.totalProducts, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}