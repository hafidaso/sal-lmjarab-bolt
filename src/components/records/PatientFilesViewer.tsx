import React, { useState, useEffect } from 'react';
import { Search, Filter, FileText, User, Calendar, Download, Eye, Share2, Lock, CheckCircle, X, AlertTriangle, Pill, TestTube, Heart, FileImage, Stethoscope, Phone, Mail, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Patient {
  id: string;
  name: string;
  avatar?: string;
  dateOfBirth: string;
  gender: string;
  contactInfo: {
    phone: string;
    email: string;
  };
  insurance: string[];
  lastVisit: string;
}

interface MedicalRecord {
  id: string;
  patientId: string;
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

const PatientFilesViewer: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 'patient-1',
      name: 'Fatma Alaoui',
      avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
      dateOfBirth: '1985-05-15',
      gender: 'Female',
      contactInfo: {
        phone: '+212 6XX XXX XXX',
        email: 'fatma.alaoui@example.com'
      },
      insurance: ['CNSS'],
      lastVisit: '2025-06-20'
    },
    {
      id: 'patient-2',
      name: 'Mohammed Khalid',
      dateOfBirth: '1978-09-22',
      gender: 'Male',
      contactInfo: {
        phone: '+212 6XX XXX XXX',
        email: 'mohammed.khalid@example.com'
      },
      insurance: ['RAMED'],
      lastVisit: '2025-01-09'
    },
    {
      id: 'patient-3',
      name: 'Amina Benali',
      avatar: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400',
      dateOfBirth: '1992-03-10',
      gender: 'Female',
      contactInfo: {
        phone: '+212 6XX XXX XXX',
        email: 'amina.benali@example.com'
      },
      insurance: ['Private'],
      lastVisit: '2025-06-23'
    }
  ]);

  const [records, setRecords] = useState<MedicalRecord[]>([
    {
      id: '1',
      patientId: 'patient-1',
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
      patientId: 'patient-1',
      type: 'prescription',
      title: 'Lisinopril Prescription',
      date: '2025-06-20',
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
      patientId: 'patient-2',
      type: 'visit-summary',
      title: 'Annual Physical Examination',
      date: '2025-01-09',
      provider: {
        id: 'doctor-1',
        name: 'Dr. Ahmed Bennani',
        specialty: 'Cardiology'
      },
      facility: 'CHU Ibn Rochd',
      description: 'Annual physical examination with general health assessment',
      tags: ['annual', 'physical', 'checkup'],
      fileUrl: '#',
      fileType: 'PDF',
      fileSize: '0.8 MB'
    },
    {
      id: '4',
      patientId: 'patient-3',
      type: 'imaging',
      title: 'Chest X-Ray',
      date: '2025-06-23',
      provider: {
        id: 'doctor-1',
        name: 'Dr. Ahmed Bennani',
        specialty: 'Cardiology'
      },
      facility: 'CHU Ibn Rochd',
      description: 'Chest X-ray to evaluate lung condition',
      tags: ['x-ray', 'chest', 'lungs'],
      fileUrl: '#',
      fileType: 'DICOM',
      fileSize: '15.6 MB',
      status: 'normal'
    }
  ]);

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    dateRange: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  const recordTypes = [
    { value: 'all', label: 'All Records' },
    { value: 'lab-result', label: 'Test Results', icon: TestTube },
    { value: 'prescription', label: 'Prescriptions', icon: Pill },
    { value: 'visit-summary', label: 'Visit Summaries', icon: Stethoscope },
    { value: 'imaging', label: 'Imaging', icon: FileImage },
    { value: 'vaccination', label: 'Vaccinations', icon: Heart },
    { value: 'referral', label: 'Referrals', icon: User }
  ];

  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: '30', label: 'Last 30 Days' },
    { value: '90', label: 'Last 90 Days' },
    { value: '365', label: 'Last Year' }
  ];

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

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPatientRecords = (patientId: string): MedicalRecord[] => {
    let patientRecords = records.filter(record => record.patientId === patientId);
    
    // Apply filters
    if (filters.type !== 'all') {
      patientRecords = patientRecords.filter(record => record.type === filters.type);
    }
    
    if (filters.dateRange !== 'all') {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - parseInt(filters.dateRange));
      patientRecords = patientRecords.filter(record => new Date(record.date) >= cutoffDate);
    }
    
    // Sort by date (newest first)
    patientRecords.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return patientRecords;
  };

  const calculateAge = (dateOfBirth: string): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Patient Files
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage medical records for your patients
          </p>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <div>
            <h3 className="font-medium text-blue-800 dark:text-blue-300">
              HIPAA Compliant Access
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              All patient records are encrypted and securely stored. Your access is logged for compliance purposes.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Patient List */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Patients
              </h3>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              {filteredPatients.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No patients found
                </div>
              ) : (
                filteredPatients.map(patient => (
                  <button
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      selectedPatient?.id === patient.id
                        ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 border border-transparent'
                    }`}
                  >
                    {patient.avatar ? (
                      <img
                        src={patient.avatar}
                        alt={patient.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1 text-left">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {patient.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                      </p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
        
        {/* Patient Records */}
        <div className="md:col-span-2">
          {selectedPatient ? (
            <div className="space-y-6">
              {/* Patient Info */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <div className="flex items-center space-x-4 mb-4">
                  {selectedPatient.avatar ? (
                    <img
                      src={selectedPatient.avatar}
                      alt={selectedPatient.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {selectedPatient.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedPatient.gender}, {calculateAge(selectedPatient.dateOfBirth)} years
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        DOB: {new Date(selectedPatient.dateOfBirth).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {selectedPatient.contactInfo.phone}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {selectedPatient.contactInfo.email}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Insurance: {selectedPatient.insurance.join(', ')}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Records Filters */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Medical Records
                  </h3>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center space-x-2 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Filter className="w-4 h-4" />
                    <span>Filters</span>
                  </button>
                </div>
                
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mb-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Record Type
                          </label>
                          <select
                            value={filters.type}
                            onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          >
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
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          >
                            {dateRanges.map(range => (
                              <option key={range.value} value={range.value}>{range.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Records List */}
                <div className="space-y-4">
                  {getPatientRecords(selectedPatient.id).length === 0 ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      No records found for this patient
                    </div>
                  ) : (
                    getPatientRecords(selectedPatient.id).map(record => (
                      <motion.div
                        key={record.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedRecord(record)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${getRecordTypeColor(record.type)}`}>
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
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{new Date(record.date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <User className="w-4 h-4" />
                                  <span>{record.provider.name}</span>
                                </div>
                              </div>
                              
                              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                {record.description}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 flex items-center justify-center h-full">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <FileText className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Select a Patient
                </h3>
                <p>Choose a patient from the list to view their medical records</p>
              </div>
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
                  <p className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
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
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
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
    </div>
  );
};

export default PatientFilesViewer;