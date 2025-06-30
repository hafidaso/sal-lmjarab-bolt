import React, { useState } from 'react';
import { Search, Pill, AlertTriangle, Info, Clock } from 'lucide-react';

export const DrugsAZ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('A');

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const drugs = [
    {
      id: 1,
      name: 'Amoxicillin',
      genericName: 'Amoxicillin',
      category: 'Antibiotic',
      description: 'Antibiotic from the penicillin family used to treat various bacterial infections.',
      dosage: '500mg, 1g',
      sideEffects: ['Nausea', 'Diarrhea', 'Allergic reactions'],
      warnings: 'Penicillin allergy',
      prescription: true
    },
    {
      id: 2,
      name: 'Aspirin',
      genericName: 'Acetylsalicylic acid',
      category: 'Anti-inflammatory',
      description: 'Anti-inflammatory, analgesic, and antipyretic medication.',
      dosage: '100mg, 300mg, 500mg',
      sideEffects: ['Gastric irritation', 'Bleeding'],
      warnings: 'Avoid in children under 16 years old',
      prescription: false
    },
    {
      id: 3,
      name: 'Azithromycin',
      genericName: 'Azithromycin',
      category: 'Antibiotic',
      description: 'Macrolide antibiotic used for treating respiratory infections and others.',
      dosage: '250mg, 500mg',
      sideEffects: ['Digestive issues', 'Headaches'],
      warnings: 'Possible drug interactions',
      prescription: true
    }
  ];

  const filteredDrugs = drugs.filter(drug => 
    drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    drug.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (searchTerm === '' && drug.name.startsWith(selectedLetter))
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Pill className="h-12 w-12 text-emerald-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Medications A-Z</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive database of medications available in Morocco with detailed information, dosages, and side effects.
          </p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search for a medication by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Alphabet Navigation */}
        {!searchTerm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Browse by letter</h3>
            <div className="flex flex-wrap gap-2">
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(letter)}
                  className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                    selectedLetter === letter
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-emerald-100'
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        <div className="space-y-6">
          {filteredDrugs.map((drug) => (
            <div key={drug.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-1">{drug.name}</h3>
                    <p className="text-gray-600 mb-2">{drug.genericName}</p>
                    <span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                      {drug.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {drug.prescription && (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                        Prescription required
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">{drug.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Dosage */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Pill className="h-5 w-5 text-blue-600" />
                      <h4 className="font-semibold text-blue-900">Available dosages</h4>
                    </div>
                    <p className="text-blue-800">{drug.dosage}</p>
                  </div>

                  {/* Side Effects */}
                  <div className="bg-amber-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                      <h4 className="font-semibold text-amber-900">Side effects</h4>
                    </div>
                    <ul className="text-amber-800 text-sm space-y-1">
                      {drug.sideEffects.map((effect, index) => (
                        <li key={index}>• {effect}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Warnings */}
                  <div className="bg-red-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Info className="h-5 w-5 text-red-600" />
                      <h4 className="font-semibold text-red-900">Warnings</h4>
                    </div>
                    <p className="text-red-800 text-sm">{drug.warnings}</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-500 text-sm">
                      <Clock className="h-4 w-4" />
                      <span>Last updated: January 2025</span>
                    </div>
                    <button className="text-emerald-600 hover:text-emerald-700 font-medium">
                      View full details →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDrugs.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Pill className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No medication found
            </h3>
            <p className="text-gray-600">
              Try modifying your search or browse by letter.
            </p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mt-8">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900 mb-2">Medical Disclaimer</h4>
              <p className="text-amber-800 text-sm leading-relaxed">
                This information is provided for educational purposes only and is not a substitute 
                for professional medical advice. Always consult your doctor or pharmacist before 
                taking any medication. In case of medical emergency, call 15 (SAMU).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};