import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Users, UserCheck, Star, AlertTriangle, BarChart3, Settings, Plus, Check, X, Search, Filter, Edit, Trash2, MapPin, Globe, Calendar, FileText, MessageSquare, Bell, X as CloseIcon, Download, Eye, Phone, Mail, MapPin as LocationIcon, GraduationCap, Award, Clock, FileText as DocumentIcon } from 'lucide-react';
import UserManagementTools from '../../components/admin/UserManagementTools';
import FeaturedContentManagement from '../../components/admin/FeaturedContentManagement';
import AdvancedSearchAnalytics from '../../components/admin/AdvancedSearchAnalytics';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<any>(null);
  const [showFacilityModal, setShowFacilityModal] = useState(false);
  const [pendingDoctors, setPendingDoctors] = useState([
    { 
      id: '1', 
      name: 'Dr. Karim Mansouri', 
      specialty: 'Neurology', 
      submittedDate: '2025-06-23', 
      documents: 5, 
      status: 'pending',
      email: 'karim.mansouri@email.com',
      phone: '+212 6 12 34 56 78',
      location: 'Casablanca, Morocco',
      experience: '15 years',
      education: 'MD - University of Casablanca, Neurology Residency - CHU Ibn Rochd',
      languages: ['Arabic', 'French', 'English'],
      certifications: ['Board Certified Neurologist', 'Fellowship in Stroke Management'],
      documentsList: [
        { name: 'Medical License', status: 'verified', uploadedDate: '2025-06-25' },
        { name: 'University Diploma', status: 'verified', uploadedDate: '2025-06-25' },
        { name: 'Professional References', status: 'pending', uploadedDate: '2025-01-06' },
        { name: 'Insurance Certificate', status: 'verified', uploadedDate: '2025-01-07' },
        { name: 'Continuing Education Certificates', status: 'pending', uploadedDate: '2025-06-23' }
      ],
      practiceInfo: {
        clinicName: 'Centre de Neurologie Casablanca',
        address: '123 Avenue Mohammed V, Casablanca',
        workingHours: 'Mon-Fri: 9:00 AM - 6:00 PM',
        consultationFee: '500 MAD',
        acceptedInsurance: ['CNSS', 'CNOPS', 'Private Insurance']
      },
      specializations: ['Stroke Management', 'Epilepsy', 'Multiple Sclerosis', 'Headache Disorders'],
      publications: [
        'Treatment of Acute Ischemic Stroke in Morocco: A Retrospective Analysis',
        'Epilepsy Management in Resource-Limited Settings'
      ]
    },
    { 
      id: '2', 
      name: 'Dr. Leila Benjelloun', 
      specialty: 'Pediatrics', 
      submittedDate: '2025-01-07', 
      documents: 4, 
      status: 'pending',
      email: 'leila.benjelloun@email.com',
      phone: '+212 6 98 76 54 32',
      location: 'Rabat, Morocco',
      experience: '12 years',
      education: 'MD - University of Rabat, Pediatrics Residency - CHU Ibn Sina',
      languages: ['Arabic', 'French', 'English'],
      certifications: ['Board Certified Pediatrician', 'Neonatal Intensive Care Specialist'],
      documentsList: [
        { name: 'Medical License', status: 'verified', uploadedDate: '2025-01-04' },
        { name: 'University Diploma', status: 'verified', uploadedDate: '2025-01-04' },
        { name: 'Professional References', status: 'verified', uploadedDate: '2025-06-25' },
        { name: 'Insurance Certificate', status: 'pending', uploadedDate: '2025-01-06' }
      ],
      practiceInfo: {
        clinicName: 'Clinique Pédiatrique Rabat',
        address: '456 Boulevard Hassan II, Rabat',
        workingHours: 'Mon-Sat: 8:00 AM - 7:00 PM',
        consultationFee: '400 MAD',
        acceptedInsurance: ['CNSS', 'CNOPS', 'Private Insurance']
      },
      specializations: ['Neonatal Care', 'Vaccination', 'Child Development', 'Emergency Pediatrics'],
      publications: [
        'Vaccination Coverage in Moroccan Children: A National Survey',
        'Management of Neonatal Jaundice in Primary Care Settings'
      ]
    },
    { 
      id: '3', 
      name: 'Dr. Mehdi Alami', 
      specialty: 'Orthopedics', 
      submittedDate: '2025-06-25', 
      documents: 6, 
      status: 'pending',
      email: 'mehdi.alami@email.com',
      phone: '+212 6 55 44 33 22',
      location: 'Marrakech, Morocco',
      experience: '18 years',
      education: 'MD - University of Marrakech, Orthopedic Surgery Residency - CHU Mohammed VI',
      languages: ['Arabic', 'French', 'English', 'Spanish'],
      certifications: ['Board Certified Orthopedic Surgeon', 'Sports Medicine Specialist', 'Joint Replacement Specialist'],
      documentsList: [
        { name: 'Medical License', status: 'verified', uploadedDate: '2025-01-02' },
        { name: 'University Diploma', status: 'verified', uploadedDate: '2025-01-02' },
        { name: 'Professional References', status: 'verified', uploadedDate: '2025-06-27' },
        { name: 'Insurance Certificate', status: 'verified', uploadedDate: '2025-06-27' },
        { name: 'Surgical Certifications', status: 'verified', uploadedDate: '2025-01-04' },
        { name: 'Hospital Privileges', status: 'pending', uploadedDate: '2025-06-25' }
      ],
      practiceInfo: {
        clinicName: 'Centre Orthopédique Marrakech',
        address: '789 Avenue Mohammed VI, Marrakech',
        workingHours: 'Mon-Fri: 8:00 AM - 8:00 PM, Sat: 9:00 AM - 5:00 PM',
        consultationFee: '600 MAD',
        acceptedInsurance: ['CNSS', 'CNOPS', 'Private Insurance', 'International Insurance']
      },
      specializations: ['Joint Replacement', 'Sports Medicine', 'Trauma Surgery', 'Spine Surgery'],
      publications: [
        'Outcomes of Total Knee Arthroplasty in Moroccan Patients',
        'Sports Injury Management in Professional Athletes'
      ]
    }
  ]);

  const [facilities, setFacilities] = useState([
    { 
      id: '1', 
      name: 'CHU Ibn Rochd', 
      type: 'Hospital', 
      city: 'Casablanca', 
      verified: true, 
      featured: true,
      address: '1 Rue des Hôpitaux, Casablanca 20000',
      phone: '+212 5 22 22 22 22',
      email: 'contact@chuibnrochd.ma',
      website: 'www.chuibnrochd.ma',
      description: 'University Hospital Center Ibn Rochd is a major public hospital in Casablanca, providing comprehensive healthcare services.',
      specialties: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Emergency Medicine'],
      services: ['Emergency Care', 'Surgery', 'Diagnostic Imaging', 'Laboratory Services', 'Pharmacy'],
      capacity: '800 beds',
      accreditation: 'Ministry of Health', 
      established: '1985',
      director: 'Dr. Ahmed Bennani',
      contactPerson: 'Fatima Alaoui',
      contactPhone: '+212 5 22 22 22 23',
      workingHours: '24/7 Emergency Services, Outpatient: 8:00 AM - 6:00 PM',
      insuranceAccepted: ['CNSS', 'CNOPS', 'Private Insurance', 'International Insurance'],
      facilities: ['ICU', 'Operating Rooms', 'Radiology Department', 'Laboratory', 'Pharmacy', 'Cafeteria'],
      staff: {
        doctors: 150,
        nurses: 300,
        technicians: 80,
        administrative: 120
      },
      ratings: {
        overall: 4.2,
        cleanliness: 4.0,
        staff: 4.3,
        facilities: 4.1,
        care: 4.4
      },
      reviews: 1250,
      lastUpdated: '2025-06-15'
    },
    { 
      id: '2', 
      name: 'Clinique Al Andalous', 
      type: 'Clinic', 
      city: 'Rabat', 
      verified: true, 
      featured: false,
      address: '45 Avenue Mohammed V, Rabat 10000',
      phone: '+212 5 37 77 77 77',
      email: 'info@cliniquealandalous.ma',
      website: 'www.cliniquealandalous.ma',
      description: 'Private medical clinic specializing in outpatient care and preventive medicine.',
      specialties: ['General Medicine', 'Dermatology', 'Gynecology', 'Dental Care', 'Physiotherapy'],
      services: ['Consultations', 'Minor Procedures', 'Laboratory Tests', 'Vaccinations', 'Health Check-ups'],
      capacity: '50 patients/day',
      accreditation: 'Private Healthcare Association',
      established: '2010',
      director: 'Dr. Leila Benjelloun',
      contactPerson: 'Mohammed Idrissi',
      contactPhone: '+212 5 37 77 77 78',
      workingHours: 'Mon-Fri: 8:00 AM - 8:00 PM, Sat: 9:00 AM - 5:00 PM',
      insuranceAccepted: ['CNSS', 'CNOPS', 'Private Insurance'],
      facilities: ['Consultation Rooms', 'Treatment Room', 'Laboratory', 'Pharmacy', 'Waiting Area'],
      staff: {
        doctors: 12,
        nurses: 20,
        technicians: 8,
        administrative: 15
      },
      ratings: {
        overall: 4.5,
        cleanliness: 4.6,
        staff: 4.4,
        facilities: 4.3,
        care: 4.7
      },
      reviews: 890,
      lastUpdated: '2025-06-20'
    },
    { 
      id: '3', 
      name: 'Pharmacie Centrale', 
      type: 'Pharmacy', 
      city: 'Marrakech', 
      verified: true, 
      featured: false,
      address: '123 Place Jemaa el-Fna, Marrakech 40000',
      phone: '+212 5 24 44 44 44',
      email: 'contact@pharmaciecentrale.ma',
      website: 'www.pharmaciecentrale.ma',
      description: 'Central pharmacy providing prescription medications and health products.',
      specialties: ['Prescription Medications', 'Over-the-counter Drugs', 'Health Supplements', 'Medical Devices'],
      services: ['Prescription Filling', 'Medication Counseling', 'Health Consultations', 'Home Delivery'],
      capacity: '200 prescriptions/day',
      accreditation: 'Pharmacy Board',
      established: '1995',
      director: 'Dr. Mehdi Alami',
      contactPerson: 'Amina Tazi',
      contactPhone: '+212 5 24 44 44 45',
      workingHours: 'Mon-Sat: 8:00 AM - 10:00 PM, Sun: 9:00 AM - 8:00 PM',
      insuranceAccepted: ['CNSS', 'CNOPS', 'Private Insurance'],
      facilities: ['Dispensing Area', 'Consultation Room', 'Storage', 'Waiting Area'],
      staff: {
        pharmacists: 8,
        technicians: 12,
        administrative: 6
      },
      ratings: {
        overall: 4.3,
        cleanliness: 4.4,
        staff: 4.2,
        facilities: 4.1,
        service: 4.5
      },
      reviews: 650,
      lastUpdated: '2025-06-18'
    }
  ]);

  const [reportedReviews, setReportedReviews] = useState([
    { id: '1', reviewer: 'Fatima M.', doctorName: 'Dr. Ahmed Bennani', rating: 1, content: 'This doctor was very rude and unprofessional.', reportReason: 'Offensive content', reportDate: '2025-06-20' },
    { id: '2', reviewer: 'Mohammed K.', doctorName: 'Dr. Fatima Alaoui', rating: 2, content: 'The wait time was over 2 hours despite having an appointment.', reportReason: 'Inaccurate information', reportDate: '2025-01-09' }
  ]);

  const stats = [
    { icon: Users, label: 'Total Users', value: '12,543', change: '+8%' },
    { icon: UserCheck, label: 'Verified Doctors', value: '3,421', change: '+12%' },
    { icon: Star, label: 'Total Reviews', value: '45,678', change: '+15%' },
    { icon: AlertTriangle, label: 'Pending Reports', value: '23', change: '-5%' },
  ];

  const recentActivity = [
    { type: 'New Doctor Registration', user: 'Dr. Ahmed Bennani', time: '2 hours ago' },
    { type: 'Review Reported', user: 'Patient Review #1234', time: '4 hours ago' },
    { type: 'Profile Verified', user: 'Dr. Fatima Alaoui', time: '6 hours ago' },
  ];

  const handleApproveDoctor = (doctorId: string) => {
    setPendingDoctors(prev => 
      prev.map(doctor => 
        doctor.id === doctorId ? { ...doctor, status: 'approved' } : doctor
      )
    );
  };

  const handleRejectDoctor = (doctorId: string) => {
    setPendingDoctors(prev => 
      prev.map(doctor => 
        doctor.id === doctorId ? { ...doctor, status: 'rejected' } : doctor
      )
    );
  };

  const handleAddFacility = () => {
    const newFacility = {
      id: (facilities.length + 1).toString(),
      name: 'New Facility',
      type: 'Clinic',
      city: 'Casablanca',
      verified: false,
      featured: false,
      address: 'New Address',
      phone: '+212 5 22 00 00 00',
      email: 'contact@newfacility.ma',
      website: 'www.newfacility.ma',
      description: 'New healthcare facility',
      specialties: ['General Medicine'],
      services: ['Consultations'],
      capacity: '50 patients/day',
      accreditation: 'Pending',
      established: '2025',
      director: 'Dr. New Director',
      contactPerson: 'New Contact',
      contactPhone: '+212 5 22 00 00 01',
      workingHours: 'Mon-Fri: 8:00 AM - 6:00 PM',
      insuranceAccepted: ['CNSS', 'CNOPS'],
      facilities: ['Consultation Rooms'],
      staff: {
        doctors: 5,
        nurses: 10,
        technicians: 3,
        administrative: 8
      },
      ratings: {
        overall: 0,
        cleanliness: 0,
        staff: 0,
        facilities: 0,
        care: 0
      },
      reviews: 0,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setFacilities(prev => [...prev, newFacility]);
  };

  const handleToggleFeatured = (facilityId: string) => {
    setFacilities(prev => 
      prev.map(facility => 
        facility.id === facilityId ? { ...facility, featured: !facility.featured } : facility
      )
    );
  };

  const handleApproveReview = (reviewId: string) => {
    setReportedReviews(prev => prev.filter(review => review.id !== reviewId));
  };

  const handleRemoveReview = (reviewId: string) => {
    setReportedReviews(prev => prev.filter(review => review.id !== reviewId));
  };

  const handleViewDoctor = (doctor: any) => {
    setSelectedDoctor(doctor);
    setShowDoctorModal(true);
  };

  const handleCloseModal = () => {
    setShowDoctorModal(false);
    setSelectedDoctor(null);
  };

  const handleDownloadDocument = (documentName: string) => {
    // Mock download functionality
    alert(`Downloading ${documentName}...`);
  };

  const handleViewFacility = (facility: any) => {
    setSelectedFacility(facility);
    setShowFacilityModal(true);
  };

  const handleCloseFacilityModal = () => {
    setShowFacilityModal(false);
    setSelectedFacility(null);
  };

  const handleUpdateFacility = (facilityId: string, updates: any) => {
    setFacilities(prev => 
      prev.map(facility => 
        facility.id === facilityId ? { ...facility, ...updates } : facility
      )
    );
    handleCloseFacilityModal();
  };

  const DoctorDetailsModal = () => {
    if (!selectedDoctor) return null;

    return (
      <>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Doctor Verification Details
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Review and verify doctor information
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <CloseIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <UserCheck className="w-5 h-5 mr-2" />
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                    <p className="text-gray-900 dark:text-white font-medium">{selectedDoctor.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Specialty</label>
                    <p className="text-gray-900 dark:text-white">{selectedDoctor.specialty}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <p className="text-gray-900 dark:text-white flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      {selectedDoctor.email}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                    <p className="text-gray-900 dark:text-white flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      {selectedDoctor.phone}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                    <p className="text-gray-900 dark:text-white flex items-center">
                      <LocationIcon className="w-4 h-4 mr-2" />
                      {selectedDoctor.location}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Experience</label>
                    <p className="text-gray-900 dark:text-white flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {selectedDoctor.experience}
                    </p>
                  </div>
                </div>
              </div>

              {/* Education & Certifications */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Education & Certifications
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Education</label>
                    <p className="text-gray-900 dark:text-white text-sm">{selectedDoctor.education}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Languages</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedDoctor.languages.map((lang: string, index: number) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Certifications</label>
                    <ul className="space-y-1">
                      {selectedDoctor.certifications.map((cert: string, index: number) => (
                        <li key={index} className="text-gray-900 dark:text-white text-sm flex items-center">
                          <Award className="w-4 h-4 mr-2 text-green-500" />
                          {cert}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Practice Information */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Practice Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Clinic Name</label>
                    <p className="text-gray-900 dark:text-white font-medium">{selectedDoctor.practiceInfo.clinicName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                    <p className="text-gray-900 dark:text-white">{selectedDoctor.practiceInfo.address}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Working Hours</label>
                    <p className="text-gray-900 dark:text-white">{selectedDoctor.practiceInfo.workingHours}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Consultation Fee</label>
                    <p className="text-gray-900 dark:text-white">{selectedDoctor.practiceInfo.consultationFee}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Accepted Insurance</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedDoctor.practiceInfo.acceptedInsurance.map((insurance: string, index: number) => (
                        <span key={index} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                          {insurance}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Specializations */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Specializations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedDoctor.specializations.map((spec: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Publications */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Publications
                </h3>
                <ul className="space-y-2">
                  {selectedDoctor.publications.map((pub: string, index: number) => (
                    <li key={index} className="text-gray-900 dark:text-white text-sm">
                      • {pub}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Documents */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <DocumentIcon className="w-5 h-5 mr-2" />
                  Submitted Documents
                </h3>
                <div className="space-y-3">
                  {selectedDoctor.documentsList.map((doc: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded-lg">
                      <div className="flex items-center">
                        <DocumentIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{doc.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Uploaded: {doc.uploadedDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          doc.status === 'verified' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        }`}>
                          {doc.status}
                        </span>
                        <button
                          onClick={() => handleDownloadDocument(doc.name)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-500 rounded-lg transition-colors"
                          title="Download document"
                        >
                          <Download className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </button>
                        <button
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-500 rounded-lg transition-colors"
                          title="View document"
                        >
                          <Eye className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => handleRejectDoctor(selectedDoctor.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Reject Application
              </button>
              <button
                onClick={() => handleApproveDoctor(selectedDoctor.id)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Approve Application
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const FacilityDetailsModal = () => {
    if (!selectedFacility) return null;

    return (
      <>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Facility Details & Management
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  View and edit facility information
                </p>
              </div>
              <button
                onClick={handleCloseFacilityModal}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <CloseIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Facility Name</label>
                    <p className="text-gray-900 dark:text-white font-medium">{selectedFacility.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                    <p className="text-gray-900 dark:text-white">{selectedFacility.type}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
                    <p className="text-gray-900 dark:text-white">{selectedFacility.city}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      selectedFacility.verified 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}>
                      {selectedFacility.verified ? 'Verified' : 'Pending Verification'}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Featured</label>
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      selectedFacility.featured 
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {selectedFacility.featured ? 'Featured' : 'Not Featured'}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Established</label>
                    <p className="text-gray-900 dark:text-white">{selectedFacility.established}</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                    <p className="text-gray-900 dark:text-white">{selectedFacility.address}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                    <p className="text-gray-900 dark:text-white flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      {selectedFacility.phone}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <p className="text-gray-900 dark:text-white flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      {selectedFacility.email}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Website</label>
                    <p className="text-gray-900 dark:text-white flex items-center">
                      <Globe className="w-4 h-4 mr-2" />
                      {selectedFacility.website}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Director</label>
                    <p className="text-gray-900 dark:text-white">{selectedFacility.director}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Person</label>
                    <p className="text-gray-900 dark:text-white">{selectedFacility.contactPerson}</p>
                  </div>
                </div>
              </div>

              {/* Services & Specialties */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Services & Specialties
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                    <p className="text-gray-900 dark:text-white text-sm">{selectedFacility.description}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Specialties</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedFacility.specialties.map((specialty: string, index: number) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Services</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedFacility.services.map((service: string, index: number) => (
                        <span key={index} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Facilities</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedFacility.facilities.map((facility: string, index: number) => (
                        <span key={index} className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Operational Details */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Operational Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Capacity</label>
                    <p className="text-gray-900 dark:text-white">{selectedFacility.capacity}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Working Hours</label>
                    <p className="text-gray-900 dark:text-white">{selectedFacility.workingHours}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Accreditation</label>
                    <p className="text-gray-900 dark:text-white">{selectedFacility.accreditation}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Updated</label>
                    <p className="text-gray-900 dark:text-white">{selectedFacility.lastUpdated}</p>
                  </div>
                </div>
              </div>

              {/* Staff Information */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Staff Information
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{selectedFacility.staff.doctors}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Doctors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{selectedFacility.staff.nurses}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Nurses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{selectedFacility.staff.technicians}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Technicians</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{selectedFacility.staff.administrative}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Administrative</div>
                  </div>
                </div>
              </div>

              {/* Ratings & Reviews */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  Ratings & Reviews
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Rating</span>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">{selectedFacility.ratings.overall}/5</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Cleanliness</span>
                      <span className="text-sm text-gray-900 dark:text-white">{selectedFacility.ratings.cleanliness}/5</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Staff</span>
                      <span className="text-sm text-gray-900 dark:text-white">{selectedFacility.ratings.staff}/5</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Facilities</span>
                      <span className="text-sm text-gray-900 dark:text-white">{selectedFacility.ratings.facilities}/5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Care Quality</span>
                      <span className="text-sm text-gray-900 dark:text-white">{selectedFacility.ratings.care || selectedFacility.ratings.service}/5</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{selectedFacility.reviews}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Reviews</div>
                  </div>
                </div>
              </div>

              {/* Insurance & Accreditation */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Check className="w-5 h-5 mr-2" />
                  Insurance & Accreditation
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Accepted Insurance</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedFacility.insuranceAccepted.map((insurance: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                        {insurance}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleCloseFacilityModal}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => handleToggleFeatured(selectedFacility.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedFacility.featured
                    ? 'bg-gray-600 hover:bg-gray-700 text-white'
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                {selectedFacility.featured ? 'Remove from Featured' : 'Add to Featured'}
              </button>
              <button
                onClick={() => handleUpdateFacility(selectedFacility.id, { verified: !selectedFacility.verified })}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedFacility.verified
                    ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {selectedFacility.verified ? 'Unverify' : 'Verify'}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-green-600">{stat.change}</p>
              </div>
              <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                <stat.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{activity.type}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{activity.user}</p>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            Pending Verifications
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {pendingDoctors.filter(d => d.status === 'pending').length} doctors awaiting verification
          </p>
          <button
            onClick={() => setActiveTab('user-management')}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Review Verifications
          </button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            Reported Content
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {reportedReviews.length} reviews flagged for review
          </p>
          <button
            onClick={() => setActiveTab('content-management')}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Moderate Content
          </button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            Analytics Dashboard
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            View platform performance metrics
          </p>
          <button
            onClick={() => setActiveTab('analytics')}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );

  const renderUserManagementTab = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Doctor Verification Requests
        </h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Doctor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Specialty
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Submitted
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Documents
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {pendingDoctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900 dark:text-white">{doctor.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-600 dark:text-gray-400">{doctor.specialty}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-600 dark:text-gray-400">{doctor.submittedDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-600 dark:text-gray-400">{doctor.documents} files</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      doctor.status === 'approved' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                        : doctor.status === 'rejected'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}>
                      {doctor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApproveDoctor(doctor.id)}
                        disabled={doctor.status !== 'pending'}
                        className={`px-3 py-1 rounded-md ${
                          doctor.status === 'pending'
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                        }`}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectDoctor(doctor.id)}
                        disabled={doctor.status !== 'pending'}
                        className={`px-3 py-1 rounded-md ${
                          doctor.status === 'pending'
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                        }`}
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleViewDoctor(doctor)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* User Management Tools Component */}
      <UserManagementTools />
    </div>
  );

  const renderContentManagementTab = () => (
    <div className="space-y-6">
      {/* Facilities Management */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Facilities Management
          </h2>
          <button
            onClick={handleAddFacility}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Facility</span>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Featured
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {facilities.map((facility) => (
                <tr key={facility.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900 dark:text-white">{facility.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-600 dark:text-gray-400">{facility.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-600 dark:text-gray-400">{facility.city}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      facility.verified 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}>
                      {facility.verified ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleFeatured(facility.id)}
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        facility.featured 
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' 
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {facility.featured ? 'Featured' : 'Not Featured'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleViewFacility(facility)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                      >
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md">
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Featured Content Management Component */}
      <FeaturedContentManagement />
      
      {/* Reported Reviews */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Reported Reviews
        </h2>
        
        <div className="space-y-4">
          {reportedReviews.map((review) => (
            <div key={review.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Review by {review.reviewer}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    For {review.doctorName} • Rating: {review.rating}/5
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Reported on {review.reportDate} • Reason: {review.reportReason}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleApproveReview(review.id)}
                    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleRemoveReview(review.id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                "{review.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <AdvancedSearchAnalytics />
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      {/* Security Settings */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Security Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Require 2FA for admin accounts
              </p>
            </div>
            <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700">
              <input
                type="checkbox"
                id="toggle-2fa"
                className="sr-only"
                defaultChecked
              />
              <label
                htmlFor="toggle-2fa"
                className="absolute inset-0 rounded-full cursor-pointer"
              >
                <span className="absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full shadow transform translate-x-6"></span>
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Session Timeout</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Automatically log out after inactivity
              </p>
            </div>
            <select
              defaultValue="30"
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">60 minutes</option>
              <option value="120">2 hours</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Password Policy</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Minimum password requirements
              </p>
            </div>
            <select
              defaultValue="strong"
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="basic">Basic (8+ chars)</option>
              <option value="medium">Medium (8+ chars, mixed case)</option>
              <option value="strong">Strong (8+ chars, mixed case, numbers, symbols)</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* API & Integration Settings */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          API & Integrations
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Google Maps API</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                For location services
              </p>
            </div>
            <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700">
              <input
                type="checkbox"
                id="toggle-maps"
                className="sr-only"
                defaultChecked
              />
              <label
                htmlFor="toggle-maps"
                className="absolute inset-0 rounded-full cursor-pointer"
              >
                <span className="absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full shadow transform translate-x-6"></span>
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">SMS Notifications</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                For appointment reminders
              </p>
            </div>
            <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700">
              <input
                type="checkbox"
                id="toggle-sms"
                className="sr-only"
                defaultChecked
              />
              <label
                htmlFor="toggle-sms"
                className="absolute inset-0 rounded-full cursor-pointer"
              >
                <span className="absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full shadow transform translate-x-6"></span>
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">AI Chatbot</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                For customer support
              </p>
            </div>
            <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700">
              <input
                type="checkbox"
                id="toggle-chatbot"
                className="sr-only"
                defaultChecked
              />
              <label
                htmlFor="toggle-chatbot"
                className="absolute inset-0 rounded-full cursor-pointer"
              >
                <span className="absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full shadow transform translate-x-6"></span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin {t('dashboard.welcome')}, {user?.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage the platform and monitor system health
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'user-management', label: 'User Management', icon: Users },
                { id: 'content-management', label: 'Content Management', icon: FileText },
                { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                { id: 'settings', label: 'Settings', icon: Settings },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 whitespace-nowrap ${
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

        {/* Content */}
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'user-management' && renderUserManagementTab()}
        {activeTab === 'content-management' && renderContentManagementTab()}
        {activeTab === 'analytics' && renderAnalyticsTab()}
        {activeTab === 'settings' && renderSettingsTab()}
      </div>

      {/* Doctor Details Modal */}
      {showDoctorModal && <DoctorDetailsModal />}

      {/* Facility Details Modal */}
      {showFacilityModal && <FacilityDetailsModal />}
    </div>
  );
};

export default AdminDashboard;