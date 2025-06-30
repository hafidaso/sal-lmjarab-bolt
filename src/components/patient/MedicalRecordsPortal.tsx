import React, { useState } from 'react';
import { FileText, Download, Upload, Eye, Lock, Calendar, User, Pill, TestTube, Heart, Share2, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MedicalRecord {
  id: string;
  type: 'test-result' | 'prescription' | 'visit-summary' | 'imaging' | 'vaccination';
  title: string;
  date: string;
  doctor: string;
  facility: string;
  fileUrl?: string;
  summary: string;
  encrypted: boolean;
  shared: boolean;
}

interface PrescriptionRecord {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  prescribedBy: string;
  date: string;
  status: 'active' | 'completed' | 'discontinued';
  refillsRemaining: number;
}

const MedicalRecordsPortal: React.FC = () => {
  const [records, setRecords] = useState<MedicalRecord[]>([
    {
      id: '1',
      type: 'test-result',
      title: 'Blood Test Results',
      date: '2025-06-20',
      doctor: 'Dr. Ahmed Bennani',
      facility: 'CHU Ibn Rochd',
      summary: 'Complete blood count and lipid panel - All values within normal range',
      encrypted: true,
      shared: false
    },
    {
      id: '2',
      type: 'prescription',
      title: 'Hypertension Medication',
      date: '2025-06-23',
      doctor: 'Dr. Omar Idrissi',
      facility: 'Clinique Al Andalous',
      summary: 'Prescribed medication for blood pressure management',
      encrypted: true,
      shared: false
    }
  ]);

  const [prescriptions, setPrescriptions] = useState<PrescriptionRecord[]>([
    {
      id: '1',
      medication: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      duration: '3 months',
      prescribedBy: 'Dr. Omar Idrissi',
      date: '2025-06-23',
      status: 'active',
      refillsRemaining: 2
    }
  ]);

  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'type' | 'doctor'>('date');

  const recordTypes = [
    { value: 'all', label: 'All Records' },
    { value: 'test-result', label: 'Test Results' },
    { value: 'prescription', label: 'Prescriptions' },
    { value: 'visit-summary', label: 'Visit Summaries' },
    { value: 'imaging', label: 'Imaging' },
    { value: 'vaccination', label: 'Vaccinations' }
  ];

  const getRecordIcon = (type: string) => {
    switch (type) {
      case 'test-result':
        return <TestTube className="w-5 h-5" />;
      case 'prescription':
        return <Pill className="w-5 h-5" />;
      case 'visit-summary':
        return <User className="w-5 h-5" />;
      case 'imaging':
        return <Eye className="w-5 h-5" />;
      case 'vaccination':
        return <Heart className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getRecordColor = (type: string) => {
    switch (type) {
      case 'test-result':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
      case 'prescription':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'visit-summary':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-300';
      case 'imaging':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300';
      case 'vaccination':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const filteredRecords = records
    .filter(record => {
      const matchesSearch = record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          record.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          record.facility.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterType === 'all' || record.type === filterType;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'type':
          return a.type.localeCompare(b.type);
        case 'doctor':
          return a.doctor.localeCompare(b.doctor);
        default:
          return 0;
      }
    });

  const handleExportRecords = () => {
    // Simulate export functionality
    const exportData = {
      patient: 'Patient Name',
      exportDate: new Date().toISOString(),
      records: filteredRecords
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'medical-records-export.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleRefillRequest = (prescriptionId: string) => {
    setPrescriptions(prev => prev.map(p => 
      p.id === prescriptionId 
        ? { ...p, refillsRemaining: Math.max(0, p.refillsRemaining - 1) }
        : p
    ));
    alert('Refill request submitted successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Medical Records Portal
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Secure access to your complete medical history
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowUploadForm(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Record</span>
          </button>
          
          <button
            onClick={handleExportRecords}
            className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <div>
            <h3 className="font-medium text-blue-800 dark:text-blue-300">
              256-bit Encryption Enabled
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              All medical records are encrypted and HIPAA compliant. Your data is secure and private.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search records, doctors, or facilities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {recordTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="date">Sort by Date</option>
            <option value="type">Sort by Type</option>
            <option value="doctor">Sort by Doctor</option>
          </select>
        </div>
      </div>

      {/* Active Prescriptions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Active Prescriptions
        </h3>
        
        {prescriptions.filter(p => p.status === 'active').length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No active prescriptions
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prescriptions.filter(p => p.status === 'active').map((prescription) => (
              <div key={prescription.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {prescription.medication}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {prescription.dosage} - {prescription.frequency}
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full text-xs font-medium">
                    Active
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div>Prescribed by: {prescription.prescribedBy}</div>
                  <div>Duration: {prescription.duration}</div>
                  <div>Refills remaining: {prescription.refillsRemaining}</div>
                </div>
                
                {prescription.refillsRemaining > 0 && (
                  <button
                    onClick={() => handleRefillRequest(prescription.id)}
                    className="mt-3 w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Request Refill
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Medical Records */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Medical Records ({filteredRecords.length})
        </h3>
        
        {filteredRecords.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No records found matching your criteria
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRecords.map((record) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedRecord(record)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${getRecordColor(record.type)}`}>
                      {getRecordIcon(record.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {record.title}
                        </h4>
                        {record.encrypted && (
                          <Lock className="w-4 h-4 text-green-500" />
                        )}
                        {record.shared && (
                          <Share2 className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(record.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{record.doctor}</span>
                        </div>
                        <div>{record.facility}</div>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {record.summary}
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
            ))}
          </div>
        )}
      </div>

      {/* Record Viewer Modal */}
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
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedRecord.title}
                  </h2>
                  <button
                    onClick={() => setSelectedRecord(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Date:</span>
                      <span className="ml-2 text-gray-600 dark:text-gray-400">
                        {new Date(selectedRecord.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Doctor:</span>
                      <span className="ml-2 text-gray-600 dark:text-gray-400">
                        {selectedRecord.doctor}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Facility:</span>
                      <span className="ml-2 text-gray-600 dark:text-gray-400">
                        {selectedRecord.facility}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Type:</span>
                      <span className="ml-2 text-gray-600 dark:text-gray-400 capitalize">
                        {selectedRecord.type.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Summary</h3>
                  <p className="text-gray-600 dark:text-gray-400">{selectedRecord.summary}</p>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Share Record
                  </button>
                  <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
                    Download PDF
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Upload Form Modal */}
      <AnimatePresence>
        {showUploadForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Upload Medical Record
                </h2>
                
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Record Type
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                      <option value="test-result">Test Result</option>
                      <option value="prescription">Prescription</option>
                      <option value="visit-summary">Visit Summary</option>
                      <option value="imaging">Imaging</option>
                      <option value="vaccination">Vaccination</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      File Upload
                    </label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-400">
                        Drag and drop your file here, or click to browse
                      </p>
                      <input type="file" className="hidden" />
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
                      onClick={() => setShowUploadForm(false)}
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
    </div>
  );
};

export default MedicalRecordsPortal;