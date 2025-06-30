import React, { useState, useEffect } from 'react';
import { Search, Filter, FileText, User, Calendar, Download, Eye, Share2, Navigation, MapPin, Phone, Globe, CheckCircle, X, Clipboard, Pill, Image, Syringe, AlertTriangle, Info, Plus, Edit, Trash2, Tag, AlertCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { patientService, PatientMedicalRecord } from '../../services/patientService';
import { useLanguage } from '../../contexts/LanguageContext';
import { generateRecentDate, formatDateForDisplay, generateRecentDateTime } from '../../lib/utils';

const PatientMedicalRecords = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState<PatientMedicalRecord | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [records, setRecords] = useState<PatientMedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    dateRange: 'all',
    provider: 'all',
    status: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'type' | 'provider'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

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

  useEffect(() => {
    loadMedicalRecords();
  }, [user]);

  const loadMedicalRecords = async () => {
    setLoading(true);
    try {
      const patientRecords = await patientService.getPatientMedicalRecords(user?.id || '');
      setRecords(patientRecords);
    } catch (error) {
      console.error('Error loading medical records:', error);
    } finally {
      setLoading(false);
    }
  };

  const recordTypes = [
    { value: 'all', label: 'All Records' },
    { value: 'lab-result', label: 'Test Results', icon: Clipboard },
    { value: 'prescription', label: 'Prescriptions', icon: Pill },
    { value: 'visit-summary', label: 'Visit Summaries', icon: FileText },
    { value: 'imaging', label: 'Imaging', icon: Image },
    { value: 'vaccination', label: 'Vaccinations', icon: Syringe },
    { value: 'referral', label: 'Referrals', icon: FileText }
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

  // Mock data for demonstration
  const mockRecords: PatientMedicalRecord[] = [
    {
      id: '1',
      patient_id: user?.id || '',
      record_type: 'lab-result',
      title: 'Complete Blood Count',
      date: generateRecentDateTime(5),
      provider_id: 'provider-1',
      provider_name: 'Dr. Ahmed Bennani',
      facility: 'CHU Ibn Rochd',
      description: 'Routine blood work including CBC, lipid panel, and metabolic panel',
      file_url: null,
      file_type: null,
      tags: ['blood', 'routine', 'annual'],
      status: 'normal',
      created_at: generateRecentDateTime(5),
      updated_at: generateRecentDateTime(5)
    },
    {
      id: '2',
      patient_id: user?.id || '',
      record_type: 'prescription',
      title: 'Lisinopril Prescription',
      date: generateRecentDateTime(5),
      provider_id: 'provider-1',
      provider_name: 'Dr. Ahmed Bennani',
      facility: 'CHU Ibn Rochd',
      description: 'Prescription for hypertension medication - 10mg daily',
      file_url: null,
      file_type: null,
      tags: ['medication', 'hypertension'],
      status: null,
      created_at: generateRecentDateTime(5),
      updated_at: generateRecentDateTime(5)
    },
    {
      id: '3',
      patient_id: user?.id || '',
      record_type: 'visit-summary',
      title: 'Annual Physical Examination',
      date: generateRecentDateTime(10),
      provider_id: 'provider-2',
      provider_name: 'Dr. Omar Idrissi',
      facility: 'Clinique Al Andalous',
      description: 'Annual physical examination with general health assessment',
      file_url: null,
      file_type: null,
      tags: ['annual', 'physical', 'checkup'],
      status: null,
      created_at: generateRecentDateTime(10),
      updated_at: generateRecentDateTime(10)
    },
    {
      id: '4',
      patient_id: user?.id || '',
      record_type: 'imaging',
      title: 'Chest X-Ray',
      date: generateRecentDateTime(25),
      provider_id: 'provider-3',
      provider_name: 'Dr. Youssef Tazi',
      facility: 'CHU Ibn Rochd',
      description: 'Chest X-ray to evaluate lung condition',
      file_url: null,
      file_type: null,
      tags: ['x-ray', 'chest', 'lungs'],
      status: 'normal',
      created_at: generateRecentDateTime(25),
      updated_at: generateRecentDateTime(25)
    },
    {
      id: '5',
      patient_id: user?.id || '',
      record_type: 'vaccination',
      title: 'Influenza Vaccine',
      date: generateRecentDateTime(45),
      provider_id: 'provider-2',
      provider_name: 'Dr. Omar Idrissi',
      facility: 'Clinique Al Andalous',
      description: 'Annual influenza vaccination',
      file_url: null,
      file_type: null,
      tags: ['vaccine', 'flu', 'preventive'],
      status: null,
      created_at: generateRecentDateTime(45),
      updated_at: generateRecentDateTime(45)
    }
  ];

  const displayRecords = records.length > 0 ? records : mockRecords;

  const filteredRecords = displayRecords.filter(record => {
    const matchesSearch = 
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (record.provider_name && record.provider_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (record.facility && record.facility.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (record.description && record.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (record.tags && record.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesCategory = 
      activeCategory === 'all' || 
      record.record_type === activeCategory;
    
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
    const matchesProvider = filters.provider === 'all' || (record.provider_id && record.provider_id === filters.provider);
    
    // Status filter
    const matchesStatus = filters.status === 'all' || record.status === filters.status;
    
    return matchesSearch && matchesCategory && matchesDateRange && matchesProvider && matchesStatus;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return sortOrder === 'asc'
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'type':
        return sortOrder === 'asc'
          ? a.record_type.localeCompare(b.record_type)
          : b.record_type.localeCompare(a.record_type);
      case 'provider':
        return sortOrder === 'asc'
          ? (a.provider_name || '').localeCompare(b.provider_name || '')
          : (b.provider_name || '').localeCompare(a.provider_name || '');
      default:
        return 0;
    }
  });

  const getRecordTypeIcon = (type: string) => {
    const recordType = recordTypes.find(t => t.value === type);
    if (!recordType || !recordType.icon) return <FileText className="w-5 h-5" />;
    
    const Icon = recordType.icon;
    return <Icon className="w-5 h-5" />;
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewRecord(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleUploadRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newRecord.title || !newRecord.date) {
      alert('Please fill in all required fields');
      return;
    }
    
    try {
      const record: Omit<PatientMedicalRecord, 'id' | 'created_at' | 'updated_at'> = {
        patient_id: user?.id || '',
        record_type: newRecord.type as any,
        title: newRecord.title,
        date: newRecord.date,
        provider_id: 'provider-1',
        provider_name: newRecord.providerName,
        facility: newRecord.facility,
        description: newRecord.description,
        tags: newRecord.tags ? newRecord.tags.split(',').map(tag => tag.trim()) : [],
        file_url: newRecord.file ? URL.createObjectURL(newRecord.file) : null,
        file_type: newRecord.file ? newRecord.file.type.split('/')[1].toUpperCase() : null,
        status: null
      };
      
      const createdRecord = await patientService.createMedicalRecord(record);
      
      if (createdRecord) {
        setRecords(prev => [createdRecord, ...prev]);
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
      }
    } catch (error) {
      console.error('Error uploading record:', error);
      alert('Failed to upload record. Please try again.');
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Medical Records
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Securely access and manage your complete medical history
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search records by title, provider, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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

          <div className="flex justify-between items-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              {(filters.dateRange !== 'all' || filters.provider !== 'all' || filters.status !== 'all') && (
                <span className="bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {[
                    filters.dateRange !== 'all' ? 1 : 0,
                    filters.provider !== 'all' ? 1 : 0,
                    filters.status !== 'all' ? 1 : 0
                  ].reduce((a, b) => a + b, 0)}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Upload Record</span>
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
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
                      dateRange: 'all',
                      provider: 'all',
                      status: 'all'
                    })}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Clear Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Record Type Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 pb-2 min-w-max">
            {recordTypes.map(type => {
              const TypeIcon = type.icon;
              return (
                <button
                  key={type.value}
                  onClick={() => setActiveCategory(type.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                    activeCategory === type.value
                      ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {TypeIcon && <TypeIcon className="w-4 h-4" />}
                  <span>{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Records List */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : filteredRecords.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No records found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchQuery || activeCategory !== 'all' || filters.dateRange !== 'all' || filters.provider !== 'all' || filters.status !== 'all'
                  ? 'Try adjusting your search or filters to find what you\'re looking for.'
                  : 'You don\'t have any medical records yet. Upload your first record to get started.'}
              </p>
              {!(searchQuery || activeCategory !== 'all' || filters.dateRange !== 'all' || filters.provider !== 'all' || filters.status !== 'all') && (
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Upload Medical Record
                </button>
              )}
            </div>
          ) : (
            filteredRecords.map((record, index) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${getRecordTypeColor(record.record_type)}`}>
                      {getRecordTypeIcon(record.record_type)}
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {record.title}
                        </h3>
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
                        {record.provider_name && (
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{record.provider_name}</span>
                          </div>
                        )}
                        {record.facility && (
                          <div className="flex items-center space-x-1">
                            <Building className="w-4 h-4" />
                            <span>{record.facility}</span>
                          </div>
                        )}
                      </div>
                      
                      {record.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                          {record.description}
                        </p>
                      )}
                      
                      {record.tags && record.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {record.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedRecord(record)}
                      className="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      View Details
                    </button>
                    {record.file_url && (
                      <button className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-sm transition-colors">
                        Download
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setSelectedRecord(record);
                        setShowShareModal(true);
                      }}
                      className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-sm transition-colors"
                    >
                      Share
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Record Detail Modal */}
        <AnimatePresence>
          {selectedRecord && !showShareModal && (
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
                      <div className={`p-3 rounded-lg ${getRecordTypeColor(selectedRecord.record_type)}`}>
                        {getRecordTypeIcon(selectedRecord.record_type)}
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
                      
                      {selectedRecord.provider_name && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Provider</h3>
                          <p className="text-gray-900 dark:text-white">
                            {selectedRecord.provider_name}
                          </p>
                        </div>
                      )}
                      
                      {selectedRecord.facility && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Facility</h3>
                          <p className="text-gray-900 dark:text-white">{selectedRecord.facility}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Record Type</h3>
                        <p className="text-gray-900 dark:text-white capitalize">
                          {selectedRecord.record_type.replace('-', ' ')}
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
                      
                      {selectedRecord.file_url && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">File</h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-900 dark:text-white">
                              {selectedRecord.file_type} • {selectedRecord.file_url.split('/').pop()}
                            </span>
                            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                              Download
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {selectedRecord.description && (
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Description</h3>
                      <p className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        {selectedRecord.description}
                      </p>
                    </div>
                  )}
                  
                  {selectedRecord.tags && selectedRecord.tags.length > 0 && (
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
                  )}
                  
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
                    {selectedRecord.file_url && (
                      <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors flex items-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    )}
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
                        {recordTypes.filter(type => type.value !== 'all').map(type => (
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
                          Provider Name
                        </label>
                        <input
                          type="text"
                          value={newRecord.providerName}
                          onChange={(e) => setNewRecord(prev => ({ ...prev, providerName: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="e.g., Dr. Ahmed Bennani"
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
                              <p className="text-gray-600 dark:text-gray-400 mb-2">
                                Click to upload or drag and drop
                              </p>
                              <button
                                type="button"
                                onClick={() => document.getElementById('file-upload')?.click()}
                                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors inline-block"
                              >
                                Select File
                              </button>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                Accepted formats: PDF, JPG, PNG, DOC up to 10MB
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
                      onClick={() => {
                        setShowShareModal(false);
                        setSelectedRecord(null);
                      }}
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
                          setSelectedRecord(null);
                          alert('Record shared successfully!');
                        }}
                        className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        Share Record
                      </button>
                      <button
                        onClick={() => {
                          setShowShareModal(false);
                          setSelectedRecord(null);
                        }}
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

        {/* Security Notice */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-8">
          <div className="flex items-center space-x-3">
            <Info className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <div>
              <h3 className="font-semibold text-blue-800 dark:text-blue-300">
                Your Records Are Secure
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                All medical records are encrypted with 256-bit encryption and stored securely in compliance with healthcare privacy regulations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientMedicalRecords;