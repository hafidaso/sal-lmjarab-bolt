import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { User, Calendar, MessageCircle, FileText, Shield, Award, Clock, MapPin, Globe, CheckCircle, X, Edit, Save, Plus, Trash2, Phone, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import DoctorMessageCenter from '../../components/messaging/DoctorMessageCenter';
import DoctorAppointmentSchedule from '../../components/appointment/DoctorAppointmentSchedule';
import PatientFilesViewer from '../../components/records/PatientFilesViewer';

const MedicalProfessionalProfile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  const [profile, setProfile] = useState({
    fullName: 'Dr. Ahmed Bennani',
    title: 'Cardiologist',
    specialties: ['Cardiology', 'Interventional Cardiology', 'Heart Failure'],
    education: [
      { degree: 'MD', institution: 'Faculty of Medicine, University of Casablanca', year: '2008' },
      { degree: 'Cardiology Residency', institution: 'CHU Ibn Rochd, Casablanca', year: '2012' },
      { degree: 'Fellowship in Interventional Cardiology', institution: 'Hôpital Européen Georges-Pompidou, Paris', year: '2014' }
    ],
    certifications: [
      { name: 'Board Certified in Cardiology', issuer: 'Moroccan Society of Cardiology', expiration: '2025-06-30' },
      { name: 'Advanced Cardiac Life Support (ACLS)', issuer: 'American Heart Association', expiration: '2025-12-31' },
      { name: 'Interventional Cardiology Certification', issuer: 'European Society of Cardiology', expiration: '2026-03-15' }
    ],
    experience: 15,
    languages: [
      { language: 'Arabic', proficiency: 'Native' },
      { language: 'French', proficiency: 'Fluent' },
      { language: 'English', proficiency: 'Proficient' }
    ],
    insurance: ['CNSS', 'RAMED', 'Private'],
    practiceInfo: {
      locations: [
        {
          name: 'Cardiology Center of Casablanca',
          address: 'Boulevard Zerktouni, Maarif, Casablanca 20100',
          phone: '+212 522 123 456',
          hours: {
            Monday: '09:00 - 17:00',
            Tuesday: '09:00 - 17:00',
            Wednesday: '09:00 - 17:00',
            Thursday: '09:00 - 17:00',
            Friday: '09:00 - 15:00',
            Saturday: '09:00 - 13:00',
            Sunday: 'Closed'
          }
        }
      ],
      appointmentTypes: ['in-person', 'telehealth'],
      appointmentDuration: 30,
      emergencyAvailability: 'Available for existing patients only'
    },
    schedulingPreferences: {
      workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      bufferTime: 15,
      bookingNotice: 24,
      cancellationPolicy: 'Please cancel or reschedule at least 24 hours in advance to avoid a cancellation fee.',
      calendarSync: ['Google Calendar']
    },
    communicationPreferences: {
      responseTime: 24,
      preferredChannels: ['In-app messaging', 'Email'],
      followUpProtocol: 'Follow-up within 7 days for critical cases, 14 days for routine visits',
      emergencyContact: '+212 522 123 457'
    },
    verificationStatus: {
      verified: true,
      documents: ['Medical License', 'Board Certification', 'Hospital Privileges'],
      references: ['CHU Ibn Rochd', 'Clinique Al Andalous', 'Polyclinique du Littoral'],
      lastVerified: '2025-06-05'
    }
  });

  const [tempProfile, setTempProfile] = useState(profile);

  const handleSaveProfile = () => {
    setProfile(tempProfile);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {profile.fullName}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400">{profile.title}</p>
                  {profile.verificationStatus.verified && (
                    <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm font-medium">Verified Professional</span>
                    </div>
                  )}
                </div>
              </div>
              
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    onClick={handleSaveProfile}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    onClick={() => {
                      setTempProfile(profile);
                      setIsEditing(false);
                    }}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm">
            <TabsTrigger value="profile" className="flex items-center space-x-2 data-[state=active]:bg-primary-50 dark:data-[state=active]:bg-primary-900/20 data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-400">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center space-x-2 data-[state=active]:bg-primary-50 dark:data-[state=active]:bg-primary-900/20 data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-400">
              <MessageCircle className="w-4 h-4" />
              <span>Patient Messages</span>
            </TabsTrigger>
            <TabsTrigger value="manage-appointments" className="flex items-center space-x-2 data-[state=active]:bg-primary-50 dark:data-[state=active]:bg-primary-900/20 data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-400">
              <Calendar className="w-4 h-4" />
              <span>Manage Appointments</span>
            </TabsTrigger>
            <TabsTrigger value="patient-files" className="flex items-center space-x-2 data-[state=active]:bg-primary-50 dark:data-[state=active]:bg-primary-900/20 data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-400">
              <FileText className="w-4 h-4" />
              <span>Patient Files</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6 space-y-6">
            {/* Professional Details */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Professional Details
              </h2>
              
              <div className="space-y-6">
                {/* Specialties */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    Specialties & Sub-specialties
                  </h3>
                  {isEditing ? (
                    <div className="space-y-2">
                      {tempProfile.specialties.map((specialty, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={specialty}
                            onChange={(e) => {
                              const newSpecialties = [...tempProfile.specialties];
                              newSpecialties[index] = e.target.value;
                              setTempProfile(prev => ({ ...prev, specialties: newSpecialties }));
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                          <button
                            onClick={() => {
                              const newSpecialties = tempProfile.specialties.filter((_, i) => i !== index);
                              setTempProfile(prev => ({ ...prev, specialties: newSpecialties }));
                            }}
                            className="p-2 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          setTempProfile(prev => ({
                            ...prev,
                            specialties: [...prev.specialties, '']
                          }));
                        }}
                        className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Specialty</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {profile.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300 rounded-full text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Education */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    Education & Training
                  </h3>
                  {isEditing ? (
                    <div className="space-y-3">
                      {tempProfile.education.map((edu, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => {
                              const newEducation = [...tempProfile.education];
                              newEducation[index] = { ...edu, degree: e.target.value };
                              setTempProfile(prev => ({ ...prev, education: newEducation }));
                            }}
                            placeholder="Degree"
                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => {
                              const newEducation = [...tempProfile.education];
                              newEducation[index] = { ...edu, institution: e.target.value };
                              setTempProfile(prev => ({ ...prev, education: newEducation }));
                            }}
                            placeholder="Institution"
                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={edu.year}
                              onChange={(e) => {
                                const newEducation = [...tempProfile.education];
                                newEducation[index] = { ...edu, year: e.target.value };
                                setTempProfile(prev => ({ ...prev, education: newEducation }));
                              }}
                              placeholder="Year"
                              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                            <button
                              onClick={() => {
                                const newEducation = tempProfile.education.filter((_, i) => i !== index);
                                setTempProfile(prev => ({ ...prev, education: newEducation }));
                              }}
                              className="p-2 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          setTempProfile(prev => ({
                            ...prev,
                            education: [...prev.education, { degree: '', institution: '', year: '' }]
                          }));
                        }}
                        className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Education</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {profile.education.map((edu, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{edu.degree}</p>
                            <p className="text-gray-600 dark:text-gray-400">{edu.institution}, {edu.year}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Certifications */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    Board Certifications & Licenses
                  </h3>
                  {isEditing ? (
                    <div className="space-y-3">
                      {tempProfile.certifications.map((cert, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <input
                            type="text"
                            value={cert.name}
                            onChange={(e) => {
                              const newCertifications = [...tempProfile.certifications];
                              newCertifications[index] = { ...cert, name: e.target.value };
                              setTempProfile(prev => ({ ...prev, certifications: newCertifications }));
                            }}
                            placeholder="Certification Name"
                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                          <input
                            type="text"
                            value={cert.issuer}
                            onChange={(e) => {
                              const newCertifications = [...tempProfile.certifications];
                              newCertifications[index] = { ...cert, issuer: e.target.value };
                              setTempProfile(prev => ({ ...prev, certifications: newCertifications }));
                            }}
                            placeholder="Issuing Organization"
                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                          <div className="flex items-center space-x-2">
                            <input
                              type="date"
                              value={cert.expiration}
                              onChange={(e) => {
                                const newCertifications = [...tempProfile.certifications];
                                newCertifications[index] = { ...cert, expiration: e.target.value };
                                setTempProfile(prev => ({ ...prev, certifications: newCertifications }));
                              }}
                              placeholder="Expiration Date"
                              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                            <button
                              onClick={() => {
                                const newCertifications = tempProfile.certifications.filter((_, i) => i !== index);
                                setTempProfile(prev => ({ ...prev, certifications: newCertifications }));
                              }}
                              className="p-2 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          setTempProfile(prev => ({
                            ...prev,
                            certifications: [...prev.certifications, { name: '', issuer: '', expiration: '' }]
                          }));
                        }}
                        className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Certification</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {profile.certifications.map((cert, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <Award className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{cert.name}</p>
                            <p className="text-gray-600 dark:text-gray-400">
                              {cert.issuer} • Expires: {new Date(cert.expiration).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Languages */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    Languages Spoken
                  </h3>
                  {isEditing ? (
                    <div className="space-y-3">
                      {tempProfile.languages.map((lang, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={lang.language}
                            onChange={(e) => {
                              const newLanguages = [...tempProfile.languages];
                              newLanguages[index] = { ...lang, language: e.target.value };
                              setTempProfile(prev => ({ ...prev, languages: newLanguages }));
                            }}
                            placeholder="Language"
                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                          <div className="flex items-center space-x-2">
                            <select
                              value={lang.proficiency}
                              onChange={(e) => {
                                const newLanguages = [...tempProfile.languages];
                                newLanguages[index] = { ...lang, proficiency: e.target.value };
                                setTempProfile(prev => ({ ...prev, languages: newLanguages }));
                              }}
                              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                              <option value="Native">Native</option>
                              <option value="Fluent">Fluent</option>
                              <option value="Proficient">Proficient</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Basic">Basic</option>
                            </select>
                            <button
                              onClick={() => {
                                const newLanguages = tempProfile.languages.filter((_, i) => i !== index);
                                setTempProfile(prev => ({ ...prev, languages: newLanguages }));
                              }}
                              className="p-2 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          setTempProfile(prev => ({
                            ...prev,
                            languages: [...prev.languages, { language: '', proficiency: 'Proficient' }]
                          }));
                        }}
                        className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Language</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-3">
                      {profile.languages.map((lang, index) => (
                        <div key={index} className="flex items-center space-x-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                          <Globe className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-gray-900 dark:text-white">{lang.language}</span>
                          <span className="text-gray-500 dark:text-gray-400">({lang.proficiency})</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Insurance */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    Insurance Networks
                  </h3>
                  {isEditing ? (
                    <div className="space-y-2">
                      {tempProfile.insurance.map((ins, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={ins}
                            onChange={(e) => {
                              const newInsurance = [...tempProfile.insurance];
                              newInsurance[index] = e.target.value;
                              setTempProfile(prev => ({ ...prev, insurance: newInsurance }));
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                          <button
                            onClick={() => {
                              const newInsurance = tempProfile.insurance.filter((_, i) => i !== index);
                              setTempProfile(prev => ({ ...prev, insurance: newInsurance }));
                            }}
                            className="p-2 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          setTempProfile(prev => ({
                            ...prev,
                            insurance: [...prev.insurance, '']
                          }));
                        }}
                        className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Insurance</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {profile.insurance.map((ins, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm"
                        >
                          {ins}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Practice Information */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Practice Information
              </h2>
              
              <div className="space-y-6">
                {/* Office Locations */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    Office Locations & Hours
                  </h3>
                  {isEditing ? (
                    <div className="space-y-6">
                      {tempProfile.practiceInfo.locations.map((location, locationIndex) => (
                        <div key={locationIndex} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Location Name
                              </label>
                              <input
                                type="text"
                                value={location.name}
                                onChange={(e) => {
                                  const newLocations = [...tempProfile.practiceInfo.locations];
                                  newLocations[locationIndex] = { ...location, name: e.target.value };
                                  setTempProfile(prev => ({
                                    ...prev,
                                    practiceInfo: {
                                      ...prev.practiceInfo,
                                      locations: newLocations
                                    }
                                  }));
                                }}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Phone Number
                              </label>
                              <input
                                type="text"
                                value={location.phone}
                                onChange={(e) => {
                                  const newLocations = [...tempProfile.practiceInfo.locations];
                                  newLocations[locationIndex] = { ...location, phone: e.target.value };
                                  setTempProfile(prev => ({
                                    ...prev,
                                    practiceInfo: {
                                      ...prev.practiceInfo,
                                      locations: newLocations
                                    }
                                  }));
                                }}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Address
                            </label>
                            <input
                              type="text"
                              value={location.address}
                              onChange={(e) => {
                                const newLocations = [...tempProfile.practiceInfo.locations];
                                newLocations[locationIndex] = { ...location, address: e.target.value };
                                setTempProfile(prev => ({
                                  ...prev,
                                  practiceInfo: {
                                    ...prev.practiceInfo,
                                    locations: newLocations
                                  }
                                }));
                              }}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Working Hours
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {Object.entries(location.hours).map(([day, hours], hourIndex) => (
                                <div key={day} className="flex items-center space-x-2">
                                  <span className="w-24 text-gray-700 dark:text-gray-300">{day}:</span>
                                  <input
                                    type="text"
                                    value={hours}
                                    onChange={(e) => {
                                      const newLocations = [...tempProfile.practiceInfo.locations];
                                      newLocations[locationIndex] = {
                                        ...location,
                                        hours: {
                                          ...location.hours,
                                          [day]: e.target.value
                                        }
                                      };
                                      setTempProfile(prev => ({
                                        ...prev,
                                        practiceInfo: {
                                          ...prev.practiceInfo,
                                          locations: newLocations
                                        }
                                      }));
                                    }}
                                    className="flex-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {tempProfile.practiceInfo.locations.length > 1 && (
                            <button
                              onClick={() => {
                                const newLocations = tempProfile.practiceInfo.locations.filter((_, i) => i !== locationIndex);
                                setTempProfile(prev => ({
                                  ...prev,
                                  practiceInfo: {
                                    ...prev.practiceInfo,
                                    locations: newLocations
                                  }
                                }));
                              }}
                              className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center space-x-1"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Remove Location</span>
                            </button>
                          )}
                        </div>
                      ))}
                      
                      <button
                        onClick={() => {
                          setTempProfile(prev => ({
                            ...prev,
                            practiceInfo: {
                              ...prev.practiceInfo,
                              locations: [
                                ...prev.practiceInfo.locations,
                                {
                                  name: '',
                                  address: '',
                                  phone: '',
                                  hours: {
                                    Monday: '',
                                    Tuesday: '',
                                    Wednesday: '',
                                    Thursday: '',
                                    Friday: '',
                                    Saturday: '',
                                    Sunday: ''
                                  }
                                }
                              ]
                            }
                          }));
                        }}
                        className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Location</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {profile.practiceInfo.locations.map((location, index) => (
                        <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">{location.name}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-start space-x-2">
                              <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                              <span className="text-gray-600 dark:text-gray-400">{location.address}</span>
                            </div>
                            <div className="flex items-start space-x-2">
                              <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
                              <span className="text-gray-600 dark:text-gray-400">{location.phone}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <h5 className="font-medium text-gray-900 dark:text-white mb-2">Working Hours</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                              {Object.entries(location.hours).map(([day, hours]) => (
                                <div key={day} className="flex justify-between">
                                  <span className="font-medium text-gray-700 dark:text-gray-300">{day}:</span>
                                  <span className="text-gray-600 dark:text-gray-400">{hours}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Appointment Types */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    Appointment Types
                  </h3>
                  {isEditing ? (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={tempProfile.practiceInfo.appointmentTypes.includes('in-person')}
                            onChange={(e) => {
                              const newTypes = e.target.checked
                                ? [...tempProfile.practiceInfo.appointmentTypes, 'in-person']
                                : tempProfile.practiceInfo.appointmentTypes.filter(t => t !== 'in-person');
                              setTempProfile(prev => ({
                                ...prev,
                                practiceInfo: {
                                  ...prev.practiceInfo,
                                  appointmentTypes: newTypes
                                }
                              }));
                            }}
                            className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                          />
                          <span className="ml-2 text-gray-700 dark:text-gray-300">In-Person</span>
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={tempProfile.practiceInfo.appointmentTypes.includes('telehealth')}
                            onChange={(e) => {
                              const newTypes = e.target.checked
                                ? [...tempProfile.practiceInfo.appointmentTypes, 'telehealth']
                                : tempProfile.practiceInfo.appointmentTypes.filter(t => t !== 'telehealth');
                              setTempProfile(prev => ({
                                ...prev,
                                practiceInfo: {
                                  ...prev.practiceInfo,
                                  appointmentTypes: newTypes
                                }
                              }));
                            }}
                            className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                          />
                          <span className="ml-2 text-gray-700 dark:text-gray-300">Telehealth</span>
                        </label>
                      </div>
                      
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Standard Appointment Duration (minutes)
                        </label>
                        <input
                          type="number"
                          value={tempProfile.practiceInfo.appointmentDuration}
                          onChange={(e) => {
                            setTempProfile(prev => ({
                              ...prev,
                              practiceInfo: {
                                ...prev.practiceInfo,
                                appointmentDuration: parseInt(e.target.value)
                              }
                            }));
                          }}
                          min="5"
                          step="5"
                          className="w-full md:w-1/3 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-3">
                        {profile.practiceInfo.appointmentTypes.map((type, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full text-sm capitalize"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          Standard appointment duration: {profile.practiceInfo.appointmentDuration} minutes
                        </span>
                      </div>
                      
                      <div className="flex items-start space-x-2 text-sm">
                        <AlertTriangle className="w-4 h-4 text-gray-400 mt-0.5" />
                        <span className="text-gray-600 dark:text-gray-400">
                          Emergency availability: {profile.practiceInfo.emergencyAvailability}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Scheduling Preferences */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Scheduling Preferences
              </h2>
              
              <div className="space-y-6">
                {/* Working Days */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    Working Days & Buffer Time
                  </h3>
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-3">
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                          <label key={day} className="flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg">
                            <input
                              type="checkbox"
                              checked={tempProfile.schedulingPreferences.workingDays.includes(day)}
                              onChange={(e) => {
                                const newDays = e.target.checked
                                  ? [...tempProfile.schedulingPreferences.workingDays, day]
                                  : tempProfile.schedulingPreferences.workingDays.filter(d => d !== day);
                                setTempProfile(prev => ({
                                  ...prev,
                                  schedulingPreferences: {
                                    ...prev.schedulingPreferences,
                                    workingDays: newDays
                                  }
                                }));
                              }}
                              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <span className="text-gray-700 dark:text-gray-300">{day}</span>
                          </label>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Buffer Time Between Appointments (minutes)
                          </label>
                          <input
                            type="number"
                            value={tempProfile.schedulingPreferences.bufferTime}
                            onChange={(e) => {
                              setTempProfile(prev => ({
                                ...prev,
                                schedulingPreferences: {
                                  ...prev.schedulingPreferences,
                                  bufferTime: parseInt(e.target.value)
                                }
                              }));
                            }}
                            min="0"
                            step="5"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Minimum Booking Notice (hours)
                          </label>
                          <input
                            type="number"
                            value={tempProfile.schedulingPreferences.bookingNotice}
                            onChange={(e) => {
                              setTempProfile(prev => ({
                                ...prev,
                                schedulingPreferences: {
                                  ...prev.schedulingPreferences,
                                  bookingNotice: parseInt(e.target.value)
                                }
                              }));
                            }}
                            min="0"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {profile.schedulingPreferences.workingDays.map((day, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full text-sm"
                          >
                            {day}
                          </span>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-400">
                            Buffer time: {profile.schedulingPreferences.bufferTime} minutes between appointments
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-400">
                            Minimum {profile.schedulingPreferences.bookingNotice} hours notice required for bookings
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Cancellation Policy */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    Cancellation Policy
                  </h3>
                  {isEditing ? (
                    <textarea
                      value={tempProfile.schedulingPreferences.cancellationPolicy}
                      onChange={(e) => {
                        setTempProfile(prev => ({
                          ...prev,
                          schedulingPreferences: {
                            ...prev.schedulingPreferences,
                            cancellationPolicy: e.target.value
                          }
                        }));
                      }}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">
                      {profile.schedulingPreferences.cancellationPolicy}
                    </p>
                  )}
                </div>
                
                {/* Calendar Sync */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    Calendar Sync Preferences
                  </h3>
                  {isEditing ? (
                    <div className="space-y-2">
                      {['Google Calendar', 'Apple Calendar', 'Outlook'].map((calendar) => (
                        <label key={calendar} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={tempProfile.schedulingPreferences.calendarSync.includes(calendar)}
                            onChange={(e) => {
                              const newCalendars = e.target.checked
                                ? [...tempProfile.schedulingPreferences.calendarSync, calendar]
                                : tempProfile.schedulingPreferences.calendarSync.filter(c => c !== calendar);
                              setTempProfile(prev => ({
                                ...prev,
                                schedulingPreferences: {
                                  ...prev.schedulingPreferences,
                                  calendarSync: newCalendars
                                }
                              }));
                            }}
                            className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                          />
                          <span className="ml-2 text-gray-700 dark:text-gray-300">{calendar}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {profile.schedulingPreferences.calendarSync.map((calendar, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 rounded-full text-sm"
                        >
                          {calendar}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Communication Preferences */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Patient Communication
              </h2>
              
              <div className="space-y-6">
                {/* Response Time */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    Messaging Policy & Response Time
                  </h3>
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Expected Response Time (hours)
                        </label>
                        <input
                          type="number"
                          value={tempProfile.communicationPreferences.responseTime}
                          onChange={(e) => {
                            setTempProfile(prev => ({
                              ...prev,
                              communicationPreferences: {
                                ...prev.communicationPreferences,
                                responseTime: parseInt(e.target.value)
                              }
                            }));
                          }}
                          min="1"
                          className="w-full md:w-1/3 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Preferred Communication Channels
                        </label>
                        <div className="space-y-2">
                          {['In-app messaging', 'Email', 'Phone', 'Video call'].map((channel) => (
                            <label key={channel} className="flex items-center">
                              <input
                                type="checkbox"
                                checked={tempProfile.communicationPreferences.preferredChannels.includes(channel)}
                                onChange={(e) => {
                                  const newChannels = e.target.checked
                                    ? [...tempProfile.communicationPreferences.preferredChannels, channel]
                                    : tempProfile.communicationPreferences.preferredChannels.filter(c => c !== channel);
                                  setTempProfile(prev => ({
                                    ...prev,
                                    communicationPreferences: {
                                      ...prev.communicationPreferences,
                                      preferredChannels: newChannels
                                    }
                                  }));
                                }}
                                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                              />
                              <span className="ml-2 text-gray-700 dark:text-gray-300">{channel}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          Typical response time: within {profile.communicationPreferences.responseTime} hours
                        </span>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <MessageCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Preferred channels:</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {profile.communicationPreferences.preferredChannels.map((channel, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full text-sm"
                              >
                                {channel}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Follow-up Protocol */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    Patient Follow-up Protocol
                  </h3>
                  {isEditing ? (
                    <textarea
                      value={tempProfile.communicationPreferences.followUpProtocol}
                      onChange={(e) => {
                        setTempProfile(prev => ({
                          ...prev,
                          communicationPreferences: {
                            ...prev.communicationPreferences,
                            followUpProtocol: e.target.value
                          }
                        }));
                      }}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">
                      {profile.communicationPreferences.followUpProtocol}
                    </p>
                  )}
                </div>
                
                {/* Emergency Contact */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    Emergency Contact Protocol
                  </h3>
                  {isEditing ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Emergency Contact Number
                      </label>
                      <input
                        type="text"
                        value={tempProfile.communicationPreferences.emergencyContact}
                        onChange={(e) => {
                          setTempProfile(prev => ({
                            ...prev,
                            communicationPreferences: {
                              ...prev.communicationPreferences,
                              emergencyContact: e.target.value
                            }
                          }));
                        }}
                        className="w-full md:w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Phone className="w-5 h-5 text-red-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Emergency contact: {profile.communicationPreferences.emergencyContact}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="messages" className="mt-6">
            <DoctorMessageCenter />
          </TabsContent>
          
          <TabsContent value="manage-appointments" className="mt-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Manage Appointments</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">View, update, and manage all your real appointments. This list is synced with the backend and updates in real time.</p>
              
              {/* Enhanced Appointment Management Dashboard */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                {/* Quick Stats */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Today's Appointments</p>
                      <p className="text-3xl font-bold">8</p>
                    </div>
                    <Calendar className="w-8 h-8 text-blue-200" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">This Week</p>
                      <p className="text-3xl font-bold">32</p>
                    </div>
                    <Calendar className="w-8 h-8 text-green-200" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Pending</p>
                      <p className="text-3xl font-bold">5</p>
                    </div>
                    <Clock className="w-8 h-8 text-purple-200" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm">Completed</p>
                      <p className="text-3xl font-bold">127</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-orange-200" />
                  </div>
                </div>
              </div>
              
              {/* Management Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
                    <Plus className="w-5 h-5" />
                    <span>Add Appointment</span>
                  </button>
                  
                  <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                    <CheckCircle className="w-5 h-5" />
                    <span>Bulk Complete</span>
                  </button>
                  
                  <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    <FileText className="w-5 h-5" />
                    <span>Export Schedule</span>
                  </button>
                  
                  <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span>Send Reminders</span>
                  </button>
                </div>
              </div>
              
              {/* Enhanced Appointment Schedule */}
              <DoctorAppointmentSchedule />
            </div>
          </TabsContent>
          
          <TabsContent value="patient-files" className="mt-6">
            <PatientFilesViewer />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MedicalProfessionalProfile;