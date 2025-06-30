import React, { useState } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, Pill, Info, AlertTriangle, CheckCircle, Download, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Drug {
  id: string;
  name: string;
  genericName: string;
  category: string;
  description: string;
  usedFor: string[];
  sideEffects: string[];
  warnings: string[];
  dosage: string;
  interactions: string[];
  availability: 'prescription' | 'otc';
  manufacturer: string;
  approvalDate: string;
}

const DrugsDatabase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeDrug, setActiveDrug] = useState<Drug | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    availability: 'all',
    category: 'all'
  });

  // Mock data for drugs
  const drugs: Drug[] = [
    {
      id: '1',
      name: 'Lisinopril',
      genericName: 'Lisinopril',
      category: 'ACE Inhibitor',
      description: 'Lisinopril is an ACE inhibitor used to treat high blood pressure and heart failure.',
      usedFor: ['Hypertension', 'Heart Failure', 'Post-Myocardial Infarction'],
      sideEffects: ['Dry cough', 'Dizziness', 'Headache', 'Fatigue'],
      warnings: ['May cause harm to an unborn baby', 'Not recommended during pregnancy', 'May cause angioedema'],
      dosage: 'Initial: 10mg once daily. Maintenance: 20-40mg once daily.',
      interactions: ['NSAIDs', 'Potassium supplements', 'Lithium'],
      availability: 'prescription',
      manufacturer: 'Various',
      approvalDate: '1987-12-29'
    },
    {
      id: '2',
      name: 'Metformin',
      genericName: 'Metformin Hydrochloride',
      category: 'Antidiabetic',
      description: 'Metformin is a biguanide antihyperglycemic agent used for treating type 2 diabetes mellitus.',
      usedFor: ['Type 2 Diabetes', 'Insulin Resistance', 'Polycystic Ovary Syndrome'],
      sideEffects: ['Nausea', 'Diarrhea', 'Stomach upset', 'Metallic taste'],
      warnings: ['Lactic acidosis risk', 'Not for type 1 diabetes', 'Avoid in severe kidney disease'],
      dosage: 'Initial: 500mg twice daily. Maximum: 2550mg daily in divided doses.',
      interactions: ['Contrast media', 'Alcohol', 'Cimetidine'],
      availability: 'prescription',
      manufacturer: 'Various',
      approvalDate: '1995-03-03'
    },
    {
      id: '3',
      name: 'Paracetamol',
      genericName: 'Acetaminophen',
      category: 'Analgesic',
      description: 'Paracetamol is a pain reliever and fever reducer used to treat many conditions such as headache, muscle aches, arthritis, backache, toothaches, colds, and fevers.',
      usedFor: ['Pain relief', 'Fever reduction', 'Headache', 'Cold symptoms'],
      sideEffects: ['Nausea', 'Stomach pain', 'Loss of appetite', 'Rash'],
      warnings: ['Liver damage with high doses', 'Avoid with alcohol', 'Maximum 4g daily'],
      dosage: 'Adults: 500-1000mg every 4-6 hours as needed. Maximum: 4000mg daily.',
      interactions: ['Alcohol', 'Warfarin', 'Isoniazid'],
      availability: 'otc',
      manufacturer: 'Various',
      approvalDate: '1950-01-01'
    },
    {
      id: '4',
      name: 'Amoxicillin',
      genericName: 'Amoxicillin',
      category: 'Antibiotic',
      description: 'Amoxicillin is a penicillin antibiotic that fights bacteria in the body.',
      usedFor: ['Bacterial infections', 'Bronchitis', 'Pneumonia', 'Ear infections'],
      sideEffects: ['Diarrhea', 'Stomach upset', 'Rash', 'Vomiting'],
      warnings: ['Allergy to penicillin', 'Pseudomembranous colitis', 'Antibiotic resistance'],
      dosage: 'Adults: 250-500mg every 8 hours. Children: Based on weight.',
      interactions: ['Probenecid', 'Allopurinol', 'Oral contraceptives'],
      availability: 'prescription',
      manufacturer: 'Various',
      approvalDate: '1972-01-01'
    },
    {
      id: '5',
      name: 'Ibuprofen',
      genericName: 'Ibuprofen',
      category: 'NSAID',
      description: 'Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) used to relieve pain, reduce inflammation, and lower fever.',
      usedFor: ['Pain relief', 'Inflammation', 'Fever', 'Arthritis'],
      sideEffects: ['Stomach upset', 'Heartburn', 'Dizziness', 'Rash'],
      warnings: ['Stomach bleeding risk', 'Heart attack and stroke risk', 'Not for late pregnancy'],
      dosage: 'Adults: 200-400mg every 4-6 hours as needed. Maximum: 1200mg daily (OTC) or 3200mg daily (prescription).',
      interactions: ['Aspirin', 'Blood thinners', 'ACE inhibitors'],
      availability: 'otc',
      manufacturer: 'Various',
      approvalDate: '1974-01-01'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'analgesic', name: 'Analgesics' },
    { id: 'antibiotic', name: 'Antibiotics' },
    { id: 'antidiabetic', name: 'Antidiabetics' },
    { id: 'antihypertensive', name: 'Antihypertensives' },
    { id: 'nsaid', name: 'NSAIDs' }
  ];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section) 
        : [...prev, section]
    );
  };

  const filteredDrugs = drugs.filter(drug => {
    const matchesSearch = 
      drug.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drug.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drug.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drug.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      activeCategory === 'all' || 
      drug.category.toLowerCase().replace(/\s+/g, '-') === activeCategory;
    
    const matchesAvailability = 
      filters.availability === 'all' || 
      drug.availability === filters.availability;
    
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const alphabeticalGroups = filteredDrugs.reduce((groups, drug) => {
    const firstLetter = drug.name.charAt(0).toUpperCase();
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(drug);
    return groups;
  }, {} as Record<string, Drug[]>);

  const sortedLetters = Object.keys(alphabeticalGroups).sort();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Drugs Database A-Z
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive information on medications available in Morocco
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for medications by name or generic name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
              {(filters.availability !== 'all' || filters.category !== 'all') && (
                <span className="bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {(filters.availability !== 'all' ? 1 : 0) + (filters.category !== 'all' ? 1 : 0)}
                </span>
              )}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Availability
                    </label>
                    <select
                      value={filters.availability}
                      onChange={(e) => setFilters(prev => ({ ...prev, availability: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="all">All Medications</option>
                      <option value="prescription">Prescription Only</option>
                      <option value="otc">Over-the-Counter</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={filters.category}
                      onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="all">All Categories</option>
                      <option value="analgesic">Analgesics</option>
                      <option value="antibiotic">Antibiotics</option>
                      <option value="antidiabetic">Antidiabetics</option>
                      <option value="antihypertensive">Antihypertensives</option>
                      <option value="nsaid">NSAIDs</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => setFilters({ availability: 'all', category: 'all' })}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Clear Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Alphabetical Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-8 overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map(letter => (
              <button
                key={letter}
                onClick={() => {
                  const element = document.getElementById(`letter-${letter}`);
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  sortedLetters.includes(letter)
                    ? 'bg-primary-100 text-primary-800 hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                }`}
                disabled={!sortedLetters.includes(letter)}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Drug Listings */}
        <div className="space-y-8">
          {sortedLetters.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
              <Pill className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No medications found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          ) : (
            sortedLetters.map(letter => (
              <div key={letter} id={`letter-${letter}`} className="scroll-mt-24">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-primary-600 dark:text-primary-400">{letter}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Medications: {letter}
                  </h2>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                  {alphabeticalGroups[letter].map((drug, index) => (
                    <div 
                      key={drug.id}
                      className={`border-b border-gray-200 dark:border-gray-700 last:border-b-0 ${
                        activeDrug?.id === drug.id ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                      }`}
                    >
                      <button
                        onClick={() => setActiveDrug(activeDrug?.id === drug.id ? null : drug)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <Pill className={`w-5 h-5 ${
                            drug.availability === 'prescription' 
                              ? 'text-blue-500 dark:text-blue-400' 
                              : 'text-green-500 dark:text-green-400'
                          }`} />
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{drug.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {drug.genericName} • {drug.category}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            drug.availability === 'prescription'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          }`}>
                            {drug.availability === 'prescription' ? 'Prescription' : 'OTC'}
                          </span>
                          {activeDrug?.id === drug.id ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {activeDrug?.id === drug.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="px-6 pb-6"
                          >
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                              <p className="text-gray-600 dark:text-gray-400 mb-4">
                                {drug.description}
                              </p>
                              
                              <div className="space-y-4">
                                <div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleSection(`${drug.id}-uses`);
                                    }}
                                    className="flex items-center justify-between w-full text-left font-medium text-gray-900 dark:text-white"
                                  >
                                    <span>Uses</span>
                                    {expandedSections.includes(`${drug.id}-uses`) ? (
                                      <ChevronUp className="w-5 h-5 text-gray-400" />
                                    ) : (
                                      <ChevronDown className="w-5 h-5 text-gray-400" />
                                    )}
                                  </button>
                                  
                                  <AnimatePresence>
                                    {expandedSections.includes(`${drug.id}-uses`) && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-2 pl-4 border-l-2 border-gray-200 dark:border-gray-700"
                                      >
                                        <ul className="list-disc pl-4 space-y-1 text-gray-600 dark:text-gray-400">
                                          {drug.usedFor.map((use, i) => (
                                            <li key={i}>{use}</li>
                                          ))}
                                        </ul>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                                
                                <div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleSection(`${drug.id}-side-effects`);
                                    }}
                                    className="flex items-center justify-between w-full text-left font-medium text-gray-900 dark:text-white"
                                  >
                                    <span>Side Effects</span>
                                    {expandedSections.includes(`${drug.id}-side-effects`) ? (
                                      <ChevronUp className="w-5 h-5 text-gray-400" />
                                    ) : (
                                      <ChevronDown className="w-5 h-5 text-gray-400" />
                                    )}
                                  </button>
                                  
                                  <AnimatePresence>
                                    {expandedSections.includes(`${drug.id}-side-effects`) && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-2 pl-4 border-l-2 border-gray-200 dark:border-gray-700"
                                      >
                                        <ul className="list-disc pl-4 space-y-1 text-gray-600 dark:text-gray-400">
                                          {drug.sideEffects.map((effect, i) => (
                                            <li key={i}>{effect}</li>
                                          ))}
                                        </ul>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                                
                                <div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleSection(`${drug.id}-warnings`);
                                    }}
                                    className="flex items-center justify-between w-full text-left font-medium text-gray-900 dark:text-white"
                                  >
                                    <span>Warnings & Precautions</span>
                                    {expandedSections.includes(`${drug.id}-warnings`) ? (
                                      <ChevronUp className="w-5 h-5 text-gray-400" />
                                    ) : (
                                      <ChevronDown className="w-5 h-5 text-gray-400" />
                                    )}
                                  </button>
                                  
                                  <AnimatePresence>
                                    {expandedSections.includes(`${drug.id}-warnings`) && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-2 pl-4 border-l-2 border-red-200 dark:border-red-800"
                                      >
                                        <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                                          <div className="flex items-center space-x-2 mb-2">
                                            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                                            <span className="font-medium text-red-800 dark:text-red-300">Important Warnings</span>
                                          </div>
                                          <ul className="list-disc pl-4 space-y-1 text-red-700 dark:text-red-400">
                                            {drug.warnings.map((warning, i) => (
                                              <li key={i}>{warning}</li>
                                            ))}
                                          </ul>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                                
                                <div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleSection(`${drug.id}-dosage`);
                                    }}
                                    className="flex items-center justify-between w-full text-left font-medium text-gray-900 dark:text-white"
                                  >
                                    <span>Dosage Information</span>
                                    {expandedSections.includes(`${drug.id}-dosage`) ? (
                                      <ChevronUp className="w-5 h-5 text-gray-400" />
                                    ) : (
                                      <ChevronDown className="w-5 h-5 text-gray-400" />
                                    )}
                                  </button>
                                  
                                  <AnimatePresence>
                                    {expandedSections.includes(`${drug.id}-dosage`) && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-2 pl-4 border-l-2 border-gray-200 dark:border-gray-700"
                                      >
                                        <p className="text-gray-600 dark:text-gray-400">{drug.dosage}</p>
                                        <div className="mt-2 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                                          <div className="flex items-center space-x-2">
                                            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                            <span className="text-sm text-blue-800 dark:text-blue-300">
                                              Always follow your doctor's instructions or the directions on the label.
                                            </span>
                                          </div>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                                
                                <div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleSection(`${drug.id}-interactions`);
                                    }}
                                    className="flex items-center justify-between w-full text-left font-medium text-gray-900 dark:text-white"
                                  >
                                    <span>Drug Interactions</span>
                                    {expandedSections.includes(`${drug.id}-interactions`) ? (
                                      <ChevronUp className="w-5 h-5 text-gray-400" />
                                    ) : (
                                      <ChevronDown className="w-5 h-5 text-gray-400" />
                                    )}
                                  </button>
                                  
                                  <AnimatePresence>
                                    {expandedSections.includes(`${drug.id}-interactions`) && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-2 pl-4 border-l-2 border-yellow-200 dark:border-yellow-800"
                                      >
                                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                                          <div className="flex items-center space-x-2 mb-2">
                                            <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                                            <span className="font-medium text-yellow-800 dark:text-yellow-300">
                                              May interact with:
                                            </span>
                                          </div>
                                          <ul className="list-disc pl-4 space-y-1 text-yellow-700 dark:text-yellow-400">
                                            {drug.interactions.map((interaction, i) => (
                                              <li key={i}>{interaction}</li>
                                            ))}
                                          </ul>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              </div>
                              
                              <div className="mt-6 flex flex-wrap gap-3">
                                <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors">
                                  <Download className="w-4 h-4" />
                                  <span>Download Information</span>
                                </button>
                                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors">
                                  <ExternalLink className="w-4 h-4" />
                                  <span>Full Prescribing Information</span>
                                </button>
                              </div>
                              
                              <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                                <p>Last updated: January 2025</p>
                                <p className="mt-1">
                                  Disclaimer: This information is for educational purposes only and is not intended as medical advice.
                                  Always consult with a healthcare professional before taking any medication.
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-8">
          <div className="flex items-center space-x-3">
            <Info className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <div>
              <h3 className="font-semibold text-blue-800 dark:text-blue-300">
                Medical Disclaimer
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                The drug information provided is for informational purposes only and is not a substitute for medical advice, diagnosis, or treatment. 
                Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition or medication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrugsDatabase;