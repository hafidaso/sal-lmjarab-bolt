import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Award, Building, Heart, Brain, Bone, Stethoscope, Activity, CheckCircle, Users, Shield, Trophy, MapPin, Phone, Globe, ArrowRight, Percent, DollarSign, FileText, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Hospital {
  id: string;
  name: string;
  rank: number;
  rating: number;
  reviewCount: number;
  location: string;
  phone: string;
  website: string;
  patientSatisfaction: number;
  successRate: number;
  expertPhysicians: number;
  accreditations: string[];
  image: string;
}

interface Specialist {
  id: string;
  name: string;
  title: string;
  hospital: string;
  experience: number;
  rating: number;
  image: string;
}

const SpecialtyDetail = () => {
  const { specialtyId } = useParams<{ specialtyId: string }>();
  const [loading, setLoading] = useState(true);
  const [specialty, setSpecialty] = useState<{
    id: string;
    name: string;
    description: string;
    icon: any;
  } | null>(null);
  const [topHospitals, setTopHospitals] = useState<Hospital[]>([]);
  const [topSpecialists, setTopSpecialists] = useState<Specialist[]>([]);

  useEffect(() => {
    // Simulate API call to fetch specialty data
    setLoading(true);
    setTimeout(() => {
      const specialtyData = getSpecialtyData(specialtyId || '');
      setSpecialty(specialtyData);
      setTopHospitals(getMockHospitals(specialtyId || ''));
      setTopSpecialists(getMockSpecialists(specialtyId || ''));
      setLoading(false);
    }, 1000);
  }, [specialtyId]);

  const getSpecialtyData = (id: string) => {
    const specialties = {
      'cardiology': {
        id: 'cardiology',
        name: 'Cardiology',
        description: 'Cardiology is the medical specialty focused on disorders of the heart and cardiovascular system. Cardiologists diagnose and treat conditions such as coronary artery disease, heart failure, valve disorders, and arrhythmias.',
        icon: Heart
      },
      'neurology': {
        id: 'neurology',
        name: 'Neurology',
        description: 'Neurology is the branch of medicine dealing with disorders of the nervous system, including the brain, spinal cord, and peripheral nerves. Neurologists diagnose and treat conditions such as stroke, epilepsy, multiple sclerosis, and Parkinson\'s disease.',
        icon: Brain
      },
      'orthopedics': {
        id: 'orthopedics',
        name: 'Orthopedics',
        description: 'Orthopedics focuses on the diagnosis, treatment, prevention, and rehabilitation of disorders, injuries, and diseases of the musculoskeletal system. Orthopedic surgeons treat conditions affecting bones, joints, muscles, ligaments, tendons, and nerves.',
        icon: Bone
      },
      'oncology': {
        id: 'oncology',
        name: 'Oncology',
        description: 'Oncology is the study and treatment of cancer. Medical oncologists specialize in diagnosing cancer and treating it with chemotherapy, immunotherapy, targeted therapy, and other medications. They work alongside surgical and radiation oncologists.',
        icon: Activity
      },
      'gastroenterology': {
        id: 'gastroenterology',
        name: 'Gastroenterology',
        description: 'Gastroenterology is the branch of medicine focused on the digestive system and its disorders. Gastroenterologists diagnose and treat conditions affecting the esophagus, stomach, small intestine, colon, liver, pancreas, and gallbladder.',
        icon: Stethoscope
      }
    };
    
    return specialties[id as keyof typeof specialties] || {
      id,
      name: id.charAt(0).toUpperCase() + id.slice(1),
      description: 'Medical specialty focused on diagnosis and treatment.',
      icon: Stethoscope
    };
  };

  const getMockHospitals = (specialtyId: string): Hospital[] => {
    return [
      {
        id: '1',
        name: 'CHU Ibn Rochd',
        rank: 1,
        rating: 4.8,
        reviewCount: 1247,
        location: 'Casablanca',
        phone: '+212 522 225 252',
        website: 'www.chu-ibnrochd.ma',
        patientSatisfaction: 92,
        successRate: 94,
        expertPhysicians: 45,
        accreditations: ['JCI Accredited', 'ISO 9001:2015'],
        image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: '2',
        name: 'Hôpital Cheikh Khalifa',
        rank: 2,
        rating: 4.7,
        reviewCount: 986,
        location: 'Casablanca',
        phone: '+212 522 111 222',
        website: 'www.hopital-cheikh-khalifa.ma',
        patientSatisfaction: 90,
        successRate: 92,
        expertPhysicians: 38,
        accreditations: ['JCI Accredited'],
        image: 'https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: '3',
        name: 'CHU Hassan II',
        rank: 3,
        rating: 4.6,
        reviewCount: 854,
        location: 'Fes',
        phone: '+212 535 333 444',
        website: 'www.chu-hassan2.ma',
        patientSatisfaction: 88,
        successRate: 90,
        expertPhysicians: 32,
        accreditations: ['ISO 9001:2015'],
        image: 'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: '4',
        name: 'Clinique Internationale de Marrakech',
        rank: 4,
        rating: 4.5,
        reviewCount: 723,
        location: 'Marrakech',
        phone: '+212 524 555 666',
        website: 'www.clinique-internationale-marrakech.ma',
        patientSatisfaction: 87,
        successRate: 89,
        expertPhysicians: 28,
        accreditations: ['ISO 9001:2015'],
        image: 'https://images.pexels.com/photos/1692693/pexels-photo-1692693.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: '5',
        name: 'Hôpital Militaire Mohammed V',
        rank: 5,
        rating: 4.4,
        reviewCount: 612,
        location: 'Rabat',
        phone: '+212 537 777 888',
        website: 'www.hmimv.ma',
        patientSatisfaction: 85,
        successRate: 87,
        expertPhysicians: 25,
        accreditations: ['ISO 9001:2015'],
        image: 'https://images.pexels.com/photos/127873/pexels-photo-127873.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ];
  };

  const getMockSpecialists = (specialtyId: string): Specialist[] => {
    return [
      {
        id: '1',
        name: 'Dr. Ahmed Bennani',
        title: `${specialtyId.charAt(0).toUpperCase() + specialtyId.slice(1)} Specialist`,
        hospital: 'CHU Ibn Rochd',
        experience: 15,
        rating: 4.9,
        image: 'https://images.pexels.com/photos/5214999/pexels-photo-5214999.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: '2',
        name: 'Dr. Fatima Alaoui',
        title: `${specialtyId.charAt(0).toUpperCase() + specialtyId.slice(1)} Specialist`,
        hospital: 'Hôpital Cheikh Khalifa',
        experience: 12,
        rating: 4.8,
        image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: '3',
        name: 'Dr. Youssef Tazi',
        title: `${specialtyId.charAt(0).toUpperCase() + specialtyId.slice(1)} Specialist`,
        hospital: 'CHU Hassan II',
        experience: 18,
        rating: 4.7,
        image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ];
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!specialty) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Specialty not found</h1>
            <Link to="/top-hospitals" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
              Back to specialties
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const SpecialtyIcon = specialty.icon;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link to="/top-hospitals" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    Top Hospitals
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{specialty.name}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="p-4 bg-primary-100 dark:bg-primary-900 rounded-full">
              <SpecialtyIcon className="w-12 h-12 text-primary-600 dark:text-primary-400" />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Top {specialty.name} Hospitals in Morocco
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                {specialty.description}
              </p>
              
              <div className="inline-flex items-center px-4 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full">
                <Trophy className="w-5 h-5 mr-2" />
                <span>Rankings updated for 2025</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Hospitals List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Award className="w-6 h-6 text-yellow-500 mr-2" />
            Top 5 {specialty.name} Hospitals
          </h2>
          
          <div className="space-y-6">
            {topHospitals.map((hospital) => (
              <motion.div
                key={hospital.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4">
                    <div className="relative">
                      <img
                        src={hospital.image}
                        alt={hospital.name}
                        className="w-full h-48 md:h-full object-cover rounded-lg"
                      />
                      <div className="absolute top-3 left-3 bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                        {hospital.rank}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {hospital.name}
                        </h3>
                        
                        <div className="flex items-center space-x-4 mb-2">
                          <div className="flex items-center space-x-1">
                            {renderStars(hospital.rating)}
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {hospital.rating} ({hospital.reviewCount} reviews)
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-1 mb-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {hospital.location}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-1 mb-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {hospital.phone}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-1 mb-4">
                          <Globe className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {hospital.website}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {hospital.accreditations.map((accreditation, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-xs"
                            >
                              {accreditation}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mt-4 md:mt-0">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                            {hospital.patientSatisfaction}%
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Patient Satisfaction
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                            {hospital.successRate}%
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Success Rate
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                            {hospital.expertPhysicians}+
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Specialists
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        to={`/hospital/${hospital.id}`}
                        className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-center font-medium transition-colors"
                      >
                        View Hospital Profile
                      </Link>
                      <Link
                        to={`/hospital/${hospital.id}/doctors?specialty=${specialtyId}`}
                        className="flex-1 border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900 px-4 py-2 rounded-lg text-center font-medium transition-colors"
                      >
                        Find {specialty.name} Doctors
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quality Metrics */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Understanding Quality Metrics in {specialty.name}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Key Performance Indicators
              </h3>
              
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">Mortality Rate</span>
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    The percentage of patients who die during or after a procedure or hospital stay. Lower rates indicate better care.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">Complication Rate</span>
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    The percentage of patients who experience complications during or after treatment. Lower rates indicate better care.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">Readmission Rate</span>
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    The percentage of patients who return to the hospital within 30 days of discharge. Lower rates indicate better care.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Patient Experience Measures
              </h3>
              
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">Communication Quality</span>
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    How well doctors and nurses communicate with patients about their care, medications, and discharge instructions.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">Pain Management</span>
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    How well the hospital staff helps patients manage pain during their stay.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">Overall Satisfaction</span>
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Patients' overall rating of their hospital experience and likelihood to recommend the hospital to others.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Specialists */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Leading {specialty.name} Specialists
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topSpecialists.map((specialist) => (
              <motion.div
                key={specialist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  <img
                    src={specialist.image}
                    alt={specialist.name}
                    className="w-24 h-24 rounded-full object-cover mb-4"
                  />
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {specialist.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {specialist.title}
                  </p>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {specialist.hospital} • {specialist.experience} years experience
                  </p>
                  
                  <div className="flex items-center space-x-1 mb-4">
                    {renderStars(specialist.rating)}
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {specialist.rating}
                    </span>
                  </div>
                  
                  <Link
                    to={`/doctor/${specialist.id}`}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    View Profile
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Patient Resources */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Patient Resources for {specialty.name}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Educational Materials
                </h3>
              </div>
              
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4 text-primary-600" />
                  <span>Understanding {specialty.name} Conditions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4 text-primary-600" />
                  <span>Treatment Options Guide</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4 text-primary-600" />
                  <span>Preventive Care Recommendations</span>
                </li>
              </ul>
              
              <button className="mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All Resources
              </button>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Cost & Insurance
                </h3>
              </div>
              
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4 text-primary-600" />
                  <span>Average Treatment Costs</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4 text-primary-600" />
                  <span>Insurance Coverage Guide</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4 text-primary-600" />
                  <span>Financial Assistance Programs</span>
                </li>
              </ul>
              
              <button className="mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium">
                Learn More
              </button>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Support Groups
                </h3>
              </div>
              
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4 text-primary-600" />
                  <span>Local Support Communities</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4 text-primary-600" />
                  <span>Online Forums & Resources</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4 text-primary-600" />
                  <span>Caregiver Resources</span>
                </li>
              </ul>
              
              <button className="mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium">
                Find Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialtyDetail;