import React, { useState, useEffect } from 'react';
import { FileText, Search, Filter, Calendar, Download, Eye, Lock, Share2, Plus, X, AlertTriangle, CheckCircle, User, Pill, TestTube, Heart, FileImage, Stethoscope } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MedicalRecord {
  id: string;
  type: 'lab-result' | 'prescription' | 'visit-summary' | 'imaging' | 'vaccination' | 'referral';
  title: string;
  date: string;
  provider: {
    id: string;
    name: string;
    specialty?: string;
  };
  facility: string;
  description: string;
  tags: string[];
  fileUrl?: string;
  fileType?: string;
  fileSize?: string;
  status?: 'normal' | 'abnormal' | 'critical' | 'pending';
}

const PatientRecordsDatabase: React.FC = () => {
  const [records, setRecords] = useState<MedicalRecord[]>([
    {
      id: '1',
      type: 'lab-result',
      title: 'Complete Blood Count',
      date: '2025-06-20',
      provider: {
        id: 'doctor-1',
        name: 'Dr. Ahmed Bennani',
        specialty: 'Cardiology'
      },
      facility: 'CHU Ibn Rochd',
      description: 'Routine blood work including CBC, lipid panel, and metabolic panel',
      tags: ['blood', 'routine', 'annual'],
      fileUrl: '#',
      fileType: 'PDF',
      fileSize: '1.2 MB',
      status: 'normal'
    },
    {
      id: '2',
      type: 'prescription',
      title: 'Lisinopril Prescription',
      date: '2025-06-23',
      provider: {
        id: 'doctor-1',
        name: 'Dr. Ahmed Bennani',
        specialty: 'Cardiology'
      },
      facility: 'CHU Ibn Rochd',
      description: 'Prescription for hypertension medication - 10mg daily',
      tags: ['medication', 'hypertension'],
      fileUrl: '#',
      fileType: 'PDF',
      fileSize: '0.5 MB'
    },
    {
      id: '3',
      type: 'visit-summary',
      title: 'Annual Physical Examination',
      date: '2025-06-25',
      provider: {
        id: 'doctor-3',
        name: 'Dr. Omar Idrissi',
        specialty: 'General Medicine'
      },
      facility: 'Clinique Al Andalous',
      description: 'Annual physical examination with general health assessment',
      tags: ['annual', 'physical', 'checkup'],
      fileUrl: '#',
      fileType: 'PDF',
      fileSize: '0.8 MB'
    },
    {
      id: '4',
      type: 'imaging',
      title: 'Chest X-Ray',
      date: '2025-06-05',
      provider: {
        id: 'doctor-4',
        name: 'Dr. Youssef Tazi',
        specialty: 'Radiology'
      },
      facility: 'CHU Ibn Rochd',
      description: 'Chest X-ray to evaluate lung condition',
      tags: ['x-ray', 'chest', 'lungs'],
      fileUrl: '#',
      fileType: 'DICOM',
      fileSize: '15.6 MB',
      status: 'normal'
    },
    {
      id: '5',
      type: 'vaccination',
      title: 'Influenza Vaccine',
      date: '2025-05-16',
      provider: {
        id: 'doctor-3',
        name: 'Dr. Omar Idrissi',
        specialty: 'General Medicine'
      },
      facility: 'Clinique Al Andalous',
      description: 'Annual influenza vaccination',
      tags: ['vaccine', 'flu', 'preventive'],
      fileUrl: '#',
      fileType: 'PDF',
      fileSize: '0.3 MB'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    dateRange: 'all',
    provider: 'all',
    status: 'all'
  });
  const [sortBy, setSortBy] = useState<'date' | 'type' | 'provider'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);

  // New record form state
  const [newRecord, setNewRecord] = useState({
    type: 'lab-result',
    title: '',
    date: new Date().toISOString().split('T')[0],
    providerName: '',
    facility: '',
    description: '',
    tags: '',
    file: null as File | null
  });

  const recordTypes = [
    { value: 'lab-result', label: 'Lab Result', icon: TestTube },
    { value: 'prescription', label: 'Prescription', icon: Pill },
    { value: 'visit-summary', label: 'Visit Summary', icon: Stethoscope },
    { value: 'imaging', label: 'Imaging', icon: FileImage },
    { value: 'vaccination', label: 'Vaccination', icon: Heart },
    { value: 'referral', label: 'Referral', icon: User }
  ];

  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: '30', label: 'Last 30 Days' },
    { value: '90', label: 'Last 90 Days' },
    { value: '365', label: 'Last Year' }
  ];

  const providers = [
    { value: 'all', label: 'All Providers' },
    { value: 'doctor-1', label: 'Dr. Ahmed Bennani' },
    { value: 'doctor-3', label: 'Dr. Omar Idrissi' },
    { value: 'doctor-4', label: 'Dr. Youssef Tazi' }
  ];

  const statuses = [
    { value: 'all', label: 'All Statuses' },
    { value: 'normal', label: 'Normal' },
    { value: 'abnormal', label: 'Abnormal' },
    { value: 'critical', label: 'Critical' },
    { value: 'pending', label: 'Pending' }
  ];

  const getRecordTypeIcon = (type: string) => {
    const recordType = recordTypes.find(t => t.value === type);
    if (!recordType) return <FileText className="w-5 h-5" />;
    
    const Icon = recordType.icon;
    return <Icon className="w-5 h-5" />;
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'abnormal':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'pending':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getRecordTypeColor = (type: string) => {
    switch (type) {
      case 'lab-result':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'prescription':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'visit-summary':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'imaging':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'vaccination':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'referral':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const filteredRecords = records.filter(record => {
    // Search query filter
    const matchesSearch = 
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.facility.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Type filter
    const matchesType = filters.type === 'all' || record.type === filters.type;
    
    // Date range filter
    let matchesDateRange = true;
    if (filters.dateRange !== 'all') {
      const recordDate = new Date(record.date);
      const daysAgo = parseInt(filters.dateRange);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysAgo);
      matchesDateRange = recordDate >= cutoffDate;
    }
    
    // Provider filter
    const matchesProvider = filters.provider === 'all' || record.provider.id === filters.provider;
    
    // Status filter
    const matchesStatus = filters.status === 'all' || record.status === filters.status;
    
    return matchesSearch && matchesType && matchesDateRange && matchesProvider && matchesStatus;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return sortOrder === 'asc'
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'type':
        return sortOrder === 'asc'
          ? a.type.localeCompare(b.type)
          : b.type.localeCompare(a.type);
      case 'provider':
        return sortOrder === 'asc'
          ? a.provider.name.localeCompare(b.provider.name)
          : b.provider.name.localeCompare(a.provider.name);
      default:
        return 0;
    }
  });

  const handleUploadRecord = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newRecord.title || !newRecord.date || !newRecord.providerName) {
      alert('Please fill in all required fields');
      return;
    }
    
    const record: MedicalRecord = {
      id: Date.now().toString(),
      type: newRecord.type as any,
      title: newRecord.title,
      date: newRecord.date,
      provider: {
        id: 'new-provider',
        name: newRecord.providerName
      },
      facility: newRecord.facility,
      description: newRecord.description,
      tags: newRecord.tags.split(',').map(tag => tag.trim()),
      fileUrl: newRecord.file ? URL.createObjectURL(newRecord.file) : undefined,
      fileType: newRecord.file ? newRecord.file.type.split('/')[1].toUpperCase() : undefined,
      fileSize: newRecord.file ? formatFileSize(newRecord.file.size) : undefined
    };
    
    setRecords(prev => [record, ...prev]);
    setShowUploadModal(false);
    setNewRecord({
      type: 'lab-result',
      title: '',
      date: new Date().toISOString().split('T')[0],
      providerName: '',
      facility: '',
      description: '',
      tags: '',
      file: null
    });
    
    alert('Record uploaded successfully!');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewRecord(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Medical Records Database
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Securely access and manage your complete medical history
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Record</span>
          </button>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <div>
            <h3 className="font-medium text-blue-800 dark:text-blue-300">
              HIPAA Compliant Security
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              All medical records are encrypted with 256-bit encryption and stored securely.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search records by title, provider, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="date">Sort by Date</option>
              <option value="type">Sort by Type</option>
              <option value="provider">Sort by Provider</option>
            </select>
            
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Record Type
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="all">All Types</option>
                    {recordTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date Range
                  </label>
                  <select
                    value={filters.dateRange}
                    onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {dateRanges.map(range => (
                      <option key={range.value} value={range.value}>{range.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Provider
                  </label>
                  <select
                    value={filters.provider}
                    onChange={(e) => setFilters(prev => ({ ...prev, provider: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {providers.map(provider => (
                      <option key={provider.value} value={provider.value}>{provider.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {statuses.map(status => (
                      <option key={status.value} value={status.value}>{status.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setFilters({
                    type: 'all',
                    dateRange: 'all',
                    provider: 'all',
                    status: 'all'
                  })}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Records List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Medical Records ({filteredRecords.length})
          </h3>
          
          {filteredRecords.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <FileText className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg font-medium">No records found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRecords.map((record) => (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                  onClick={() => setSelectedRecord(record)}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${getRecordTypeColor(record.type)}`}>
                        {getRecordTypeIcon(record.type)}
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {record.title}
                          </h4>
                          {record.status && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                              {record.status}
                            </span>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(record.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{record.provider.name}</span>
                          </div>
                          <div>{record.facility}</div>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                          {record.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1">
                          {record.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-auto">
                      {record.fileUrl && (
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-2">
                          <span>{record.fileType}</span>
                          <span>•</span>
                          <span>{record.fileSize}</span>
                        </div>
                      )}
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Record Detail Modal */}
      <AnimatePresence>
        {selectedRecord && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${getRecordTypeColor(selectedRecord.type)}`}>
                      {getRecordTypeIcon(selectedRecord.type)}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedRecord.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedRecord(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</h3>
                      <p className="text-gray-900 dark:text-white">
                        {new Date(selectedRecord.date).toLocaleDateString(undefined, { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Provider</h3>
                      <p className="text-gray-900 dark:text-white">
                        {selectedRecord.provider.name}
                        {selectedRecord.provider.specialty && ` (${selectedRecord.provider.specialty})`}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Facility</h3>
                      <p className="text-gray-900 dark:text-white">{selectedRecord.facility}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Record Type</h3>
                      <p className="text-gray-900 dark:text-white capitalize">
                        {selectedRecord.type.replace('-', ' ')}
                      </p>
                    </div>
                    
                    {selectedRecord.status && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</h3>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRecord.status)}`}>
                          {selectedRecord.status}
                        </span>
                      </div>
                    )}
                    
                    {selectedRecord.fileUrl && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">File</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-900 dark:text-white">
                            {selectedRecord.fileType} • {selectedRecord.fileSize}
                          </span>
                          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                            Download
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Description</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedRecord.description}
                  </p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedRecord.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => {
                      setSelectedRecord(null);
                      setShowShareModal(true);
                    }}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share Record</span>
                  </button>
                  <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Upload Record Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Upload Medical Record
                  </h2>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <form onSubmit={handleUploadRecord} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Record Type *
                    </label>
                    <select
                      value={newRecord.type}
                      onChange={(e) => setNewRecord(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    >
                      {recordTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={newRecord.title}
                      onChange={(e) => setNewRecord(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="e.g., Blood Test Results, Annual Physical"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Date *
                      </label>
                      <input
                        type="date"
                        value={newRecord.date}
                        onChange={(e) => setNewRecord(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Provider Name *
                      </label>
                      <input
                        type="text"
                        value={newRecord.providerName}
                        onChange={(e) => setNewRecord(prev => ({ ...prev, providerName: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="e.g., Dr. Ahmed Bennani"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Facility
                    </label>
                    <input
                      type="text"
                      value={newRecord.facility}
                      onChange={(e) => setNewRecord(prev => ({ ...prev, facility: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="e.g., CHU Ibn Rochd"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newRecord.description}
                      onChange={(e) => setNewRecord(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Brief description of the medical record"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={newRecord.tags}
                      onChange={(e) => setNewRecord(prev => ({ ...prev, tags: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="e.g., blood, annual, routine"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      File Upload
                    </label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                      {newRecord.file ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-700 dark:text-gray-300">{newRecord.file.name}</span>
                            <span className="text-gray-500 dark:text-gray-400 text-sm">
                              ({formatFileSize(newRecord.file.size)})
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setNewRecord(prev => ({ ...prev, file: null }))}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="file-upload"
                            onChange={handleFileChange}
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          />
                          <label
                            htmlFor="file-upload"
                            className="cursor-pointer"
                          >
                            <Plus className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-600 dark:text-gray-400">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                              PDF, JPG, PNG, DOC up to 10MB
                            </p>
                          </label>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Upload Record
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowUploadModal(false)}
                      className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Share Record Modal */}
      <AnimatePresence>
        {showShareModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Share Medical Record
                  </h2>
                  <button
                    onClick={() => setShowShareModal(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Share With
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select a provider</option>
                      <option value="doctor-1">Dr. Ahmed Bennani</option>
                      <option value="doctor-3">Dr. Omar Idrissi</option>
                      <option value="doctor-4">Dr. Youssef Tazi</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Access Duration
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="7">7 days</option>
                      <option value="30">30 days</option>
                      <option value="90">90 days</option>
                      <option value="unlimited">Unlimited</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Add a Note (Optional)
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Add a note for the recipient"
                      rows={3}
                    />
                  </div>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                      <p className="text-sm text-yellow-800 dark:text-yellow-300">
                        Sharing will grant temporary access to this record. You can revoke access at any time.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      onClick={() => {
                        setShowShareModal(false);
                        alert('Record shared successfully!');
                      }}
                      className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Share Record
                    </button>
                    <button
                      onClick={() => setShowShareModal(false)}
                      className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PatientRecordsDatabase;