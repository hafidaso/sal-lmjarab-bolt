import React, { useState } from 'react';
import { Users, UserX, CheckCircle, FileText, Download, Search, Filter, AlertTriangle, Clock, Ban, UserCheck } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'provider' | 'admin';
  status: 'active' | 'suspended' | 'pending';
  lastLogin: string;
  joinDate: string;
  verified: boolean;
}

interface Suspension {
  id: string;
  userId: string;
  userName: string;
  reason: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired';
}

const UserManagementTools = () => {
  const [activeTab, setActiveTab] = useState('suspend');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock data
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Dr. Ahmed Bennani', email: 'ahmed.bennani@email.com', role: 'provider', status: 'active', lastLogin: '2025-06-15', joinDate: '2023-06-15', verified: true },
    { id: '2', name: 'Fatima Alaoui', email: 'fatima.alaoui@email.com', role: 'patient', status: 'active', lastLogin: '2025-06-16', joinDate: '2023-08-20', verified: true },
    { id: '3', name: 'Dr. Omar Idrissi', email: 'omar.idrissi@email.com', role: 'provider', status: 'suspended', lastLogin: '2025-06-20', joinDate: '2023-09-10', verified: false },
    { id: '4', name: 'Youssef Tazi', email: 'youssef.tazi@email.com', role: 'patient', status: 'pending', lastLogin: '2025-06-18', joinDate: '2025-06-25', verified: false },
    { id: '5', name: 'Dr. Leila Benjelloun', email: 'leila.benjelloun@email.com', role: 'provider', status: 'active', lastLogin: '2025-06-15', joinDate: '2023-07-22', verified: true },
  ]);

  const [suspensions, setSuspensions] = useState<Suspension[]>([
    { id: '1', userId: '3', userName: 'Dr. Omar Idrissi', reason: 'Multiple policy violations', startDate: '2025-06-20', endDate: '2025-02-10', status: 'active' },
    { id: '2', userId: '6', userName: 'Mohammed K.', reason: 'Inappropriate behavior', startDate: '2025-06-25', endDate: '2025-06-10', status: 'expired' },
  ]);

  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [suspendReason, setSuspendReason] = useState('');
  const [suspendDuration, setSuspendDuration] = useState('7');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  const handleSuspendUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setUsers(prev => prev.map(u => 
        u.id === userId ? { ...u, status: 'suspended' as const } : u
      ));
      
      // Add suspension record
      const newSuspension: Suspension = {
        id: Date.now().toString(),
        userId,
        userName: user.name,
        reason: suspendReason,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + parseInt(suspendDuration) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'active'
      };
      setSuspensions(prev => [...prev, newSuspension]);
      
      setShowSuspendModal(false);
      setSuspendReason('');
      setSuspendDuration('7');
    }
  };

  const handleBulkVerify = () => {
    setUsers(prev => prev.map(user => 
      selectedUsers.includes(user.id) ? { ...user, verified: true } : user
    ));
    setSelectedUsers([]);
  };

  const handleBulkSuspend = () => {
    setUsers(prev => prev.map(user => 
      selectedUsers.includes(user.id) ? { ...user, status: 'suspended' as const } : user
    ));
    setSelectedUsers([]);
  };

  const handleBulkActivate = () => {
    setUsers(prev => prev.map(user => 
      selectedUsers.includes(user.id) ? { ...user, status: 'active' as const } : user
    ));
    setSelectedUsers([]);
  };

  const generateUserReport = () => {
    const reportData = {
      totalUsers: users.length,
      activeUsers: users.filter(u => u.status === 'active').length,
      suspendedUsers: users.filter(u => u.status === 'suspended').length,
      pendingUsers: users.filter(u => u.status === 'pending').length,
      verifiedUsers: users.filter(u => u.verified).length,
      usersByRole: {
        patient: users.filter(u => u.role === 'patient').length,
        provider: users.filter(u => u.role === 'provider').length,
        admin: users.filter(u => u.role === 'admin').length,
      },
      users: users.map(user => ({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        verified: user.verified,
        lastLogin: user.lastLogin,
        joinDate: user.joinDate
      }))
    };

    // Create and download CSV
    const csvContent = [
      ['Name', 'Email', 'Role', 'Status', 'Verified', 'Last Login', 'Join Date'],
      ...reportData.users.map(user => [
        user.name,
        user.email,
        user.role,
        user.status,
        user.verified ? 'Yes' : 'No',
        user.lastLogin,
        user.joinDate
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `user-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const renderSuspendUserTab = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            User Suspension Management
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowSuspendModal(true)}
              disabled={selectedUsers.length === 0}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedUsers.length > 0
                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <UserX className="w-4 h-4 inline mr-2" />
              Suspend Selected
            </button>
            <button
              onClick={handleBulkActivate}
              disabled={selectedUsers.length === 0}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedUsers.length > 0
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <UserCheck className="w-4 h-4 inline mr-2" />
              Activate Selected
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">All Roles</option>
            <option value="patient">Patient</option>
            <option value="provider">Provider</option>
            <option value="admin">Admin</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Verified
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Last Login
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
                      user.role === 'provider' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                      user.status === 'suspended' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.verified ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedUsers([user.id]);
                          setShowSuspendModal(true);
                        }}
                        className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md text-xs"
                      >
                        Suspend
                      </button>
                      <button
                        onClick={() => handleSuspendUser(user.id)}
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md text-xs"
                      >
                        Activate
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Active Suspensions */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Active Suspensions
        </h3>
        <div className="space-y-4">
          {suspensions.filter(s => s.status === 'active').map((suspension) => (
            <div key={suspension.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{suspension.userName}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{suspension.reason}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Suspended until: {suspension.endDate}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-yellow-600" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBulkVerificationTab = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Bulk Verification Management
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={handleBulkVerify}
              disabled={selectedUsers.length === 0}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedUsers.length > 0
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <CheckCircle className="w-4 h-4 inline mr-2" />
              Verify Selected ({selectedUsers.length})
            </button>
            <button
              onClick={handleBulkSuspend}
              disabled={selectedUsers.length === 0}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedUsers.length > 0
                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Ban className="w-4 h-4 inline mr-2" />
              Suspend Selected ({selectedUsers.length})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h3 className="font-medium text-blue-900 dark:text-blue-100">Pending Verification</h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {users.filter(u => !u.verified).length}
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h3 className="font-medium text-green-900 dark:text-green-100">Verified Users</h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {users.filter(u => u.verified).length}
            </p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <h3 className="font-medium text-yellow-900 dark:text-yellow-100">Suspended Users</h3>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {users.filter(u => u.status === 'suspended').length}
            </p>
          </div>
        </div>

        {/* Users requiring verification */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Join Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
                      user.role === 'provider' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                      user.status === 'suspended' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {user.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setUsers(prev => prev.map(u => 
                            u.id === user.id ? { ...u, verified: true } : u
                          ));
                        }}
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md text-xs"
                      >
                        Verify
                      </button>
                      <button
                        onClick={() => {
                          setUsers(prev => prev.map(u => 
                            u.id === user.id ? { ...u, status: 'suspended' as const } : u
                          ));
                        }}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-xs"
                      >
                        Suspend
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderUserReportsTab = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            User Reports & Analytics
          </h2>
          <button
            onClick={generateUserReport}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h3 className="font-medium text-blue-900 dark:text-blue-100">Total Users</h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{users.length}</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h3 className="font-medium text-green-900 dark:text-green-100">Active Users</h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {users.filter(u => u.status === 'active').length}
            </p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <h3 className="font-medium text-yellow-900 dark:text-yellow-100">New This Month</h3>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {users.filter(u => new Date(u.joinDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
            </p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <h3 className="font-medium text-purple-900 dark:text-purple-100">Verified Users</h3>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {users.filter(u => u.verified).length}
            </p>
          </div>
        </div>

        {/* Role Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Users by Role</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Patients</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {users.filter(u => u.role === 'patient').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Providers</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {users.filter(u => u.role === 'provider').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Admins</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {users.filter(u => u.role === 'admin').length}
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Users by Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Active</span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  {users.filter(u => u.status === 'active').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Suspended</span>
                <span className="font-medium text-red-600 dark:text-red-400">
                  {users.filter(u => u.status === 'suspended').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Pending</span>
                <span className="font-medium text-yellow-600 dark:text-yellow-400">
                  {users.filter(u => u.status === 'pending').length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Recent User Activity</h3>
          <div className="space-y-3">
            {users.slice(0, 5).map((user) => (
              <div key={user.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-600 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Last login: {user.lastLogin}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  user.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                  user.status === 'suspended' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                }`}>
                  {user.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'suspend', label: 'Suspend User', icon: UserX },
              { id: 'bulk', label: 'Bulk Verification', icon: CheckCircle },
              { id: 'reports', label: 'User Reports', icon: FileText },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'suspend' && renderSuspendUserTab()}
      {activeTab === 'bulk' && renderBulkVerificationTab()}
      {activeTab === 'reports' && renderUserReportsTab()}

      {/* Suspend User Modal */}
      {showSuspendModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Suspend User
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Reason for Suspension
                </label>
                <textarea
                  value={suspendReason}
                  onChange={(e) => setSuspendReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={3}
                  placeholder="Enter reason for suspension..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Duration (days)
                </label>
                <select
                  value={suspendDuration}
                  onChange={(e) => setSuspendDuration(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="1">1 day</option>
                  <option value="7">7 days</option>
                  <option value="30">30 days</option>
                  <option value="90">90 days</option>
                  <option value="permanent">Permanent</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowSuspendModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  selectedUsers.forEach(userId => handleSuspendUser(userId));
                }}
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg"
              >
                Suspend Users
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementTools; 