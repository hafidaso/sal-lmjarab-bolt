import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Globe, Heart, Shield, AlertTriangle, Save, Camera, Plus, Trash2, Lock, Key, FileText, Clock, CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

interface PatientProfile {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  dateOfBirth: string;
  gender: string;
  languages: {
    primary: string;
    secondary: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  insurance: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
    expirationDate: string;
  };
  medicalHistory: {
    allergies: string[];
    medications: string[];
    conditions: string[];
    surgeries: string[];
    familyHistory: string[];
  };
  profilePhoto?: string;
  preferredProviders: {
    doctors: string[];
    hospitals: string[];
    pharmacies: string[];
  };
  communicationPreferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
    paperless: boolean;
  };
  lastUpdated: string;
}

interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  field?: string;
  oldValue?: string;
  newValue?: string;
  performedBy: string;
  ipAddress: string;
}

const PatientAccountManager: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<PatientProfile>({
    id: '123456789',
    firstName: 'Fatma',
    middleName: '',
    lastName: 'Alaoui',
    email: 'fatma.alaoui@example.com',
    phone: '+212 6XX XXX XXX',
    address: {
      street: '123 Avenue Mohammed V',
      city: 'Casablanca',
      state: '',
      postalCode: '20000',
      country: 'Morocco'
    },
    dateOfBirth: '1985-06-15',
    gender: 'Female',
    languages: {
      primary: 'Arabic',
      secondary: 'French'
    },
    emergencyContact: {
      name: 'Mohammed Alaoui',
      relationship: 'Spouse',
      phone: '+212 6XX XXX XXX'
    },
    insurance: {
      provider: 'CNSS',
      policyNumber: '123456789',
      groupNumber: 'GRP123456',
      expirationDate: '2025-12-31'
    },
    medicalHistory: {
      allergies: ['Penicillin', 'Pollen'],
      medications: ['Lisinopril 10mg'],
      conditions: ['Hypertension'],
      surgeries: ['Appendectomy (2010)'],
      familyHistory: ['Diabetes (Father)', 'Heart Disease (Grandfather)']
    },
    profilePhoto: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
    preferredProviders: {
      doctors: ['Dr. Ahmed Bennani', 'Dr. Omar Idrissi'],
      hospitals: ['CHU Ibn Rochd'],
      pharmacies: ['Pharmacie Al Andalous']
    },
    communicationPreferences: {
      email: true,
      sms: true,
      push: false,
      paperless: true
    },
    lastUpdated: '2025-01-10T14:30:00Z'
  });

  const [activeSection, setActiveSection] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState<PatientProfile>(profile);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAuditLog, setShowAuditLog] = useState(false);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([
    {
      id: '1',
      timestamp: '2025-01-10T14:30:00Z',
      action: 'Profile Updated',
      field: 'phone',
      oldValue: '+212 6XX XXX XXX',
      newValue: '+212 6XX XXX XXX',
      performedBy: 'Fatma Alaoui',
      ipAddress: '192.168.1.1'
    },
    {
      id: '2',
      timestamp: '2025-01-05T10:15:00Z',
      action: 'Login',
      performedBy: 'Fatma Alaoui',
      ipAddress: '192.168.1.1'
    },
    {
      id: '3',
      timestamp: '2023-12-20T09:45:00Z',
      action: 'Password Changed',
      performedBy: 'Fatma Alaoui',
      ipAddress: '192.168.1.1'
    }
  ]);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showMedicalHistoryModal, setShowMedicalHistoryModal] = useState(false);
  const [medicalHistorySection, setMedicalHistorySection] = useState<keyof PatientProfile['medicalHistory']>('allergies');
  const [newMedicalHistoryItem, setNewMedicalHistoryItem] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, section?: string, field?: string) => {
    const { name, value } = e.target;
    
    if (section && field) {
      setTempProfile(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof PatientProfile],
          [field]: value
        }
      }));
    } else {
      setTempProfile(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCheckboxChange = (section: string, field: string, checked: boolean) => {
    setTempProfile(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof PatientProfile],
        [field]: checked
      }
    }));
  };

  const handleSaveProfile = () => {
    // Simulate API call
    setTimeout(() => {
      setProfile(tempProfile);
      setIsEditing(false);
      
      // Add audit log entry
      const newLog: AuditLogEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        action: 'Profile Updated',
        performedBy: `${profile.firstName} ${profile.lastName}`,
        ipAddress: '192.168.1.1'
      };
      
      setAuditLogs(prev => [newLog, ...prev]);
      
      alert('Profile updated successfully!');
    }, 1000);
  };

  const handleCancelEdit = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    
    if (passwordForm.newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setShowPasswordModal(false);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      // Add audit log entry
      const newLog: AuditLogEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        action: 'Password Changed',
        performedBy: `${profile.firstName} ${profile.lastName}`,
        ipAddress: '192.168.1.1'
      };
      
      setAuditLogs(prev => [newLog, ...prev]);
      
      alert('Password changed successfully!');
    }, 1000);
  };

  const handleDeleteAccount = () => {
    // Simulate API call
    setTimeout(() => {
      setShowDeleteModal(false);
      alert('Account deletion request submitted. You will receive a confirmation email.');
    }, 1000);
  };

  const handleAddMedicalHistoryItem = () => {
    if (!newMedicalHistoryItem.trim()) return;
    
    setTempProfile(prev => ({
      ...prev,
      medicalHistory: {
        ...prev.medicalHistory,
        [medicalHistorySection]: [...prev.medicalHistory[medicalHistorySection], newMedicalHistoryItem]
      }
    }));
    
    setNewMedicalHistoryItem('');
  };

  const handleRemoveMedicalHistoryItem = (section: keyof PatientProfile['medicalHistory'], index: number) => {
    setTempProfile(prev => ({
      ...prev,
      medicalHistory: {
        ...prev.medicalHistory,
        [section]: prev.medicalHistory[section].filter((_, i) => i !== index)
      }
    }));
  };

  const handleAddProvider = (type: 'doctors' | 'hospitals' | 'pharmacies', provider: string) => {
    if (!provider.trim()) return;
    
    setTempProfile(prev => ({
      ...prev,
      preferredProviders: {
        ...prev.preferredProviders,
        [type]: [...prev.preferredProviders[type], provider]
      }
    }));
  };

  const handleRemoveProvider = (type: 'doctors' | 'hospitals' | 'pharmacies', index: number) => {
    setTempProfile(prev => ({
      ...prev,
      preferredProviders: {
        ...prev.preferredProviders,
        [type]: prev.preferredProviders[type].filter((_, i) => i !== index)
      }
    }));
  };

  const languageOptions = ['Arabic', 'French', 'English', 'Spanish', 'German', 'Italian', 'Portuguese', 'Berber'];
  const countryOptions = ['Morocco', 'Algeria', 'Tunisia', 'Egypt', 'France', 'Spain', 'United States', 'Canada'];
  const genderOptions = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
  const insuranceProviders = ['CNSS', 'RAMED', 'Private Insurance', 'None'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Patient Account Management
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your personal information, medical history, and account settings
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex space-x-3">
              <button
                onClick={handleSaveProfile}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
              <button
                onClick={handleCancelEdit}
                className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Photo */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <img
              src={isEditing ? tempProfile.profilePhoto : profile.profilePhoto}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
            {isEditing && (
              <button className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {isEditing ? `${tempProfile.firstName} ${tempProfile.lastName}` : `${profile.firstName} ${profile.lastName}`}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Patient ID: {profile.id}
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600">HIPAA Protected</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Last updated: {new Date(profile.lastUpdated).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6 overflow-x-auto">
            {[
              { id: 'personal', label: 'Personal Information', icon: User },
              { id: 'contact', label: 'Contact Details', icon: Mail },
              { id: 'medical', label: 'Medical History', icon: FileText },
              { id: 'insurance', label: 'Insurance Information', icon: Heart },
              { id: 'preferences', label: 'Preferences', icon: Globe },
              { id: 'security', label: 'Security & Privacy', icon: Lock }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeSection === tab.id
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

        <div className="p-6">
          {activeSection === 'personal' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={isEditing ? tempProfile.firstName : profile.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 disabled:dark:bg-gray-800 disabled:cursor-not-allowed"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    name="middleName"
                    value={isEditing ? tempProfile.middleName : profile.middleName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 disabled:dark:bg-gray-800 disabled:cursor-not-allowed"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={isEditing ? tempProfile.lastName : profile.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 disabled:dark:bg-gray-800 disabled:cursor-not-allowed"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={isEditing ? tempProfile.dateOfBirth : profile.dateOfBirth}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 disabled:dark:bg-gray-800 disabled:cursor-not-allowed"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={isEditing ? tempProfile.gender : profile.gender}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 disabled:dark:bg-gray-800 disabled:cursor-not-allowed"
                  >
                    {genderOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Primary Language
                  </label>
                  <select
                    name="languages"
                    value={isEditing ? tempProfile.languages.primary : profile.languages.primary}
                    onChange={(e) => handleInputChange(e, 'languages', 'primary')}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 disabled:dark:bg-gray-800 disabled:cursor-not-allowed"
                  >
                    {languageOptions.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Secondary Language
                  </label>
                  <select
                    name="languages"
                    value={isEditing ? tempProfile.languages.secondary : profile.languages.secondary}
                    onChange={(e) => handleInputChange(e, 'languages', 'secondary')}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 disabled:dark:bg-gray-800 disabled:cursor-not-allowed"
                  >
                    <option value="">None</option>
                    {languageOptions.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'contact' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Contact Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={isEditing ? tempProfile.email : profile.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 disabled:dark:bg-gray-800 disabled:cursor-not-allowed"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={isEditing ? tempProfile.phone : profile.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 disabled:dark:bg-gray-800 disabled:cursor-not-allowed"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Street Address *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="street"
                    value={isEditing ? tempProfile.address.street : profile.address.street}
                    onChange={(e) => handleInputChange(e, 'address', 'street')}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 disabled:dark:bg-gray-800 disabled:cursor-not-allowed"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={isEditing ? tempProfile.address.city : profile.address.city}
                    onChange={(e) => handleInputChange(e, 'address', 'city')}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 disabled:dark:bg-gray-800 disabled:cursor-not-allowed"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={isEditing ? tempProfile.address.postalCode : profile.address.postalCode}
                    onChange={(e) => handleInputChange(e, 'address', 'postalCode')}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 disabled:dark:bg-gray-800 disabled:cursor-not-allowed"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Country *
                  </label>
                  <select
                    name="country"
                    value={isEditing ? tempProfile.address.country : profile.address.country}
                    onChange={(e) => handleInputChange(e, 'address', 'country')}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 disabled:dark:bg-gray-800 disabled:cursor-not-allowed"
                    required
                  >
                    {countryOptions.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                  Emergency Contact
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={isEditing ? tempProfile.emergencyContact.name : profile.emergencyContact.name}
                      onChange={(e) => handleInputChange(e, 'emergencyContact', 'name')}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 disabled:dark:bg-gray-800 disabled:cursor-not-allowed"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Relationship *
                    </label>
                    <input
                      type="text"
                      name="relationship"
                      value={isEditing ? tempProfile.emergencyContact.relationship : profile.emergencyContact.relationship}
                      onChange={(e) => handleInputChange(e, 'emergencyContact', 'relationship')}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 disabled:dark:bg-gray-800 disabled:cursor-not-allowed"
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Emergency Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={isEditing ? tempProfile.emergencyContact.phone : profile.emergencyContact.phone}
                      onChange={(e) => handleInputChange(e, 'emergencyContact', 'phone')}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 disabled:dark:bg-gray-800 disabled:cursor-not-allowed"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'medical' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Medical History
                </h3>
                
                {isEditing && (
                  <button
                    onClick={() => setShowMedicalHistoryModal(true)}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Medical Information</span>
                  </button>
                )}
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    This information is used to provide better healthcare services. It is protected by HIPAA regulations and only shared with your healthcare providers.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Allergies
                  </h4>
                  <div className="space-y-2">
                    {(isEditing ? tempProfile : profile).medicalHistory.allergies.length > 0 ? (
                      (isEditing ? tempProfile : profile).medicalHistory.allergies.map((allergy, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="text-gray-700 dark:text-gray-300">{allergy}</span>
                          {isEditing && (
                            <button
                              onClick={() => handleRemoveMedicalHistoryItem('allergies', index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400">
                        No allergies recorded
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Current Medications
                  </h4>
                  <div className="space-y-2">
                    {(isEditing ? tempProfile : profile).medicalHistory.medications.length > 0 ? (
                      (isEditing ? tempProfile : profile).medicalHistory.medications.map((medication, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="text-gray-700 dark:text-gray-300">{medication}</span>
                          {isEditing && (
                            <button
                              onClick={() => handleRemoveMedicalHistoryItem('medications', index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400">
                        No medications recorded
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Medical Conditions
                  </h4>
                  <div className="space-y-2">
                    {(isEditing ? tempProfile : profile).medicalHistory.conditions.length > 0 ? (
                      (isEditing ? tempProfile : profile).medicalHistory.conditions.map((condition, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="text-gray-700 dark:text-gray-300">{condition}</span>
                          {isEditing && (
                            <button
                              onClick={() => handleRemoveMedicalHistoryItem('conditions', index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400">
                        No conditions recorded
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Surgical History
                  </h4>
                  <div className="space-y-2">
                    {(isEditing ? tempProfile : profile).medicalHistory.surgeries.length > 0 ? (
                      (isEditing ? tempProfile : profile).medicalHistory.surgeries.map((surgery, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="text-gray-700 dark:text-gray-300">{surgery}</span>
                          {isEditing && (
                            <button
                              onClick={() => handleRemoveMedicalHistoryItem('surgeries', index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400">
                        No surgeries recorded
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Family Medical History
                </h4>
                <div className="space-y-2">
                  {(isEditing ? tempProfile : profile).medicalHistory.familyHistory.length > 0 ? (
                    (isEditing ? tempProfile : profile).medicalHistory.familyHistory.map((history, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="text-gray-700 dark:text-gray-300">{history}</span>
                        {isEditing && (
                          <button
                            onClick={() => handleRemoveMedicalHistoryItem('familyHistory', index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400">
                      No family history recorded
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'insurance' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Insurance Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Insurance Provider *
                  </label>
                  <select
                    name="provider"
                    value={isEditing ? tempProfile.insurance.provider : profile.insurance.provider}
                    onChange={(e) => handleInputChange(e, 'insurance', 'provider')}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 disabled:dark:bg-gray-800 disabled:cursor-not-allowed"
                    required
                  >
                    {insuranceProviders.map(provider => (
                      <option key={provider} value={provider}>{provider}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Policy Number *
                  </label>
                  <input
                    type="text"
                    name="policyNumber"
                    value={isEditing ? tempProfile.insurance.policyNumber : profile.insurance.policyNumber}
                    onChange={(e) => handleInputChange(e, 'insurance', 'policyNumber')}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 disabled:dark:bg-gray-800 disabled:cursor-not-allowed"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Group Number
                  </label>
                  <input
                    type="text"
                    name="groupNumber"
                    value={isEditing ? tempProfile.insurance.groupNumber : profile.insurance.groupNumber}
                    onChange={(e) => handleInputChange(e, 'insurance', 'groupNumber')}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 disabled:dark:bg-gray-800 disabled:cursor-not-allowed"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    name="expirationDate"
                    value={isEditing ? tempProfile.insurance.expirationDate : profile.insurance.expirationDate}
                    onChange={(e) => handleInputChange(e, 'insurance', 'expirationDate')}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 disabled:dark:bg-gray-800 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    Your insurance information is securely stored and only shared with your healthcare providers when necessary for billing purposes.
                  </p>
                </div>
              </div>
              
              {/* Insurance Card Upload */}
              {isEditing && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Upload Insurance Card
                  </h4>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="insurance-card"
                      className="hidden"
                      accept="image/*"
                    />
                    <label
                      htmlFor="insurance-card"
                      className="cursor-pointer"
                    >
                      <Plus className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 dark:text-gray-400">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        Front and back of your insurance card (JPG, PNG)
                      </p>
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeSection === 'preferences' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Preferences
              </h3>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Communication Preferences
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isEditing ? tempProfile.communicationPreferences.email : profile.communicationPreferences.email}
                      onChange={(e) => handleCheckboxChange('communicationPreferences', 'email', e.target.checked)}
                      disabled={!isEditing}
                      className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 disabled:opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Receive email notifications
                    </span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isEditing ? tempProfile.communicationPreferences.sms : profile.communicationPreferences.sms}
                      onChange={(e) => handleCheckboxChange('communicationPreferences', 'sms', e.target.checked)}
                      disabled={!isEditing}
                      className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 disabled:opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Receive SMS notifications
                    </span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isEditing ? tempProfile.communicationPreferences.push : profile.communicationPreferences.push}
                      onChange={(e) => handleCheckboxChange('communicationPreferences', 'push', e.target.checked)}
                      disabled={!isEditing}
                      className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 disabled:opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Receive push notifications
                    </span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isEditing ? tempProfile.communicationPreferences.paperless : profile.communicationPreferences.paperless}
                      onChange={(e) => handleCheckboxChange('communicationPreferences', 'paperless', e.target.checked)}
                      disabled={!isEditing}
                      className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 disabled:opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Paperless communication (receive documents electronically)
                    </span>
                  </label>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Preferred Healthcare Providers
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Preferred Doctors
                    </h5>
                    <div className="space-y-2">
                      {(isEditing ? tempProfile : profile).preferredProviders.doctors.map((doctor, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="text-gray-700 dark:text-gray-300">{doctor}</span>
                          {isEditing && (
                            <button
                              onClick={() => handleRemoveProvider('doctors', index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      
                      {isEditing && (
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            placeholder="Add a doctor..."
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddProvider('doctors', (e.target as HTMLInputElement).value);
                                (e.target as HTMLInputElement).value = '';
                              }
                            }}
                          />
                          <button
                            onClick={() => {
                              const input = document.querySelector('input[placeholder="Add a doctor..."]') as HTMLInputElement;
                              handleAddProvider('doctors', input.value);
                              input.value = '';
                            }}
                            className="px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Preferred Hospitals
                    </h5>
                    <div className="space-y-2">
                      {(isEditing ? tempProfile : profile).preferredProviders.hospitals.map((hospital, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="text-gray-700 dark:text-gray-300">{hospital}</span>
                          {isEditing && (
                            <button
                              onClick={() => handleRemoveProvider('hospitals', index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      
                      {isEditing && (
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            placeholder="Add a hospital..."
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddProvider('hospitals', (e.target as HTMLInputElement).value);
                                (e.target as HTMLInputElement).value = '';
                              }
                            }}
                          />
                          <button
                            onClick={() => {
                              const input = document.querySelector('input[placeholder="Add a hospital..."]') as HTMLInputElement;
                              handleAddProvider('hospitals', input.value);
                              input.value = '';
                            }}
                            className="px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Preferred Pharmacies
                    </h5>
                    <div className="space-y-2">
                      {(isEditing ? tempProfile : profile).preferredProviders.pharmacies.map((pharmacy, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="text-gray-700 dark:text-gray-300">{pharmacy}</span>
                          {isEditing && (
                            <button
                              onClick={() => handleRemoveProvider('pharmacies', index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      
                      {isEditing && (
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            placeholder="Add a pharmacy..."
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddProvider('pharmacies', (e.target as HTMLInputElement).value);
                                (e.target as HTMLInputElement).value = '';
                              }
                            }}
                          />
                          <button
                            onClick={() => {
                              const input = document.querySelector('input[placeholder="Add a pharmacy..."]') as HTMLInputElement;
                              handleAddProvider('pharmacies', input.value);
                              input.value = '';
                            }}
                            className="px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Security & Privacy
              </h3>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    Your account is protected with industry-standard security measures and complies with HIPAA regulations.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center space-x-3 mb-4">
                    <Key className="w-5 h-5 text-primary-600" />
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Password Management
                    </h4>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Your password was last changed on {new Date(auditLogs.find(log => log.action === 'Password Changed')?.timestamp || profile.lastUpdated).toLocaleDateString()}.
                  </p>
                  
                  <button
                    onClick={() => setShowPasswordModal(true)}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Change Password
                  </button>
                </div>
                
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center space-x-3 mb-4">
                    <Clock className="w-5 h-5 text-primary-600" />
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Account Activity
                    </h4>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Last login: {new Date(auditLogs.find(log => log.action === 'Login')?.timestamp || profile.lastUpdated).toLocaleString()}
                  </p>
                  
                  <button
                    onClick={() => setShowAuditLog(true)}
                    className="w-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    View Account Activity
                  </button>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                  Data Management
                </h4>
                
                <div className="space-y-4">
                  <button className="w-full md:w-auto bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Download My Data</span>
                  </button>
                  
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete My Account</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Medical History Modal */}
      <AnimatePresence>
        {showMedicalHistoryModal && (
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
                    Add Medical Information
                  </h2>
                  <button
                    onClick={() => setShowMedicalHistoryModal(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={medicalHistorySection}
                      onChange={(e) => setMedicalHistorySection(e.target.value as keyof PatientProfile['medicalHistory'])}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="allergies">Allergies</option>
                      <option value="medications">Medications</option>
                      <option value="conditions">Medical Conditions</option>
                      <option value="surgeries">Surgical History</option>
                      <option value="familyHistory">Family Medical History</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {medicalHistorySection === 'allergies' ? 'Allergy' :
                       medicalHistorySection === 'medications' ? 'Medication' :
                       medicalHistorySection === 'conditions' ? 'Condition' :
                       medicalHistorySection === 'surgeries' ? 'Surgery' :
                       'Family History Item'}
                    </label>
                    <input
                      type="text"
                      value={newMedicalHistoryItem}
                      onChange={(e) => setNewMedicalHistoryItem(e.target.value)}
                      placeholder={`Enter ${medicalHistorySection === 'allergies' ? 'allergy' :
                                     medicalHistorySection === 'medications' ? 'medication' :
                                     medicalHistorySection === 'conditions' ? 'condition' :
                                     medicalHistorySection === 'surgeries' ? 'surgery' :
                                     'family history item'}`}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      onClick={handleAddMedicalHistoryItem}
                      disabled={!newMedicalHistoryItem.trim()}
                      className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Add Item
                    </button>
                    
                    <button
                      onClick={() => setShowMedicalHistoryModal(false)}
                      className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Password Change Modal */}
      <AnimatePresence>
        {showPasswordModal && (
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
                    Change Password
                  </h2>
                  <button
                    onClick={() => setShowPasswordModal(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Current Password *
                    </label>
                    <input
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      New Password *
                    </label>
                    <input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Password must be at least 8 characters long and include a mix of letters, numbers, and special characters.
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Confirm New Password *
                    </label>
                    <input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={handlePasswordChange}
                      disabled={!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
                      className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Change Password
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setShowPasswordModal(false)}
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

      {/* Delete Account Modal */}
      <AnimatePresence>
        {showDeleteModal && (
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
                    Delete Account
                  </h2>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="mb-6">
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                      <p className="text-sm text-red-800 dark:text-red-300">
                        Warning: This action cannot be undone. All your data will be permanently deleted.
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Before you proceed, please note that deleting your account will:
                  </p>
                  
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400 mb-4">
                    <li>Remove all your personal information</li>
                    <li>Delete your medical records from our system</li>
                    <li>Cancel any upcoming appointments</li>
                    <li>Revoke access to all connected services</li>
                  </ul>
                  
                  <p className="text-gray-600 dark:text-gray-400">
                    To confirm, please type "DELETE" in the field below:
                  </p>
                  
                  <input
                    type="text"
                    placeholder="Type DELETE to confirm"
                    className="w-full mt-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={handleDeleteAccount}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Delete Account
                  </button>
                  
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Audit Log Modal */}
      <AnimatePresence>
        {showAuditLog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Account Activity Log
                  </h2>
                  <button
                    onClick={() => setShowAuditLog(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Action
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Details
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          IP Address
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {auditLogs.map((log) => (
                        <tr key={log.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(log.timestamp).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {log.action}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {log.field ? (
                              <>
                                Changed <span className="font-medium">{log.field}</span>
                                {log.oldValue && log.newValue && (
                                  <> from "{log.oldValue}" to "{log.newValue}"</>
                                )}
                              </>
                            ) : (
                              '-'
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {log.ipAddress}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowAuditLog(false)}
                    className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Close
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

export default PatientAccountManager;