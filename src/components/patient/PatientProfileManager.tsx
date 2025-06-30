import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Globe, Heart, Shield, AlertTriangle, Save, Camera, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface PatientProfile {
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
  languages: {
    primary: string;
    secondary: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  profilePhoto?: string;
  preferredProviders: {
    doctors: string[];
    hospitals: string[];
    pharmacies: string[];
  };
}

const PatientProfileManager: React.FC = () => {
  const [profile, setProfile] = useState<PatientProfile>({
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
    languages: {
      primary: 'Arabic',
      secondary: 'French'
    },
    emergencyContact: {
      name: 'Mohammed Alaoui',
      relationship: 'Spouse',
      phone: '+212 6XX XXX XXX'
    },
    profilePhoto: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
    preferredProviders: {
      doctors: ['Dr. Ahmed Bennani', 'Dr. Omar Idrissi'],
      hospitals: ['CHU Ibn Rochd'],
      pharmacies: ['Pharmacie Al Andalous']
    }
  });

  const [activeSection, setActiveSection] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState<PatientProfile>(profile);

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

  const handleSaveProfile = () => {
    setProfile(tempProfile);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancelEdit = () => {
    setTempProfile(profile);
    setIsEditing(false);
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Patient Profile Management
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your personal information and preferences
          </p>
        </div>
        
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
              Patient ID: 123456789
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600">HIPAA Protected</span>
            </div>
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
              { id: 'emergency', label: 'Emergency Contact', icon: AlertTriangle },
              { id: 'preferences', label: 'Healthcare Preferences', icon: Heart }
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
            </div>
          )}

          {activeSection === 'emergency' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Emergency Contact
              </h3>
              
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
              
              <div>
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
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    Your emergency contact will only be notified in case of a medical emergency.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'preferences' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Healthcare Preferences
              </h3>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Preferred Doctors
                </h4>
                <div className="space-y-3">
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
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Preferred Hospitals
                </h4>
                <div className="space-y-3">
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
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Preferred Pharmacies
                </h4>
                <div className="space-y-3">
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
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientProfileManager;