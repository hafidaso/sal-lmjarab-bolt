import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  Upload, 
  X, 
  CheckCircle, 
  Shield, 
  Star, 
  Calendar,
  ArrowRight,
  ArrowLeft,
  FileText
} from 'lucide-react';

const ClaimProfile = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    facilityType: '',
    name: '',
    specialty: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    email: '',
    website: '',
    license: '',
    identificationDocument: null as File | null,
    licenseDocument: null as File | null,
    additionalDocuments: [] as File[],
    agreeToTerms: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const files = e.target.files;
    if (!files) return;
    
    if (fieldName === 'additionalDocuments') {
      setFormData(prev => ({
        ...prev,
        additionalDocuments: [...prev.additionalDocuments, ...Array.from(files)]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [fieldName]: files[0]
      }));
    }
  };

  const removeAdditionalDocument = (index: number) => {
    setFormData(prev => ({
      ...prev,
      additionalDocuments: prev.additionalDocuments.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the form data to the server
    nextStep();
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3, 4].map((stepNumber) => (
          <React.Fragment key={stepNumber}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                stepNumber < step
                  ? 'bg-green-500 text-white'
                  : stepNumber === step
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
              }`}
            >
              {stepNumber < step ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                stepNumber
              )}
            </div>
            {stepNumber < 4 && (
              <div
                className={`w-12 h-1 ${
                  stepNumber < step
                    ? 'bg-green-500'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Claim Your Free Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Enhance your online presence, connect with patients, and grow your practice
          </p>
        </div>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Form Container */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Basic Information
              </h2>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    I am a:
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className={`relative border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                      formData.facilityType === 'healthcare-provider'
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                    }`}>
                      <input
                        type="radio"
                        name="facilityType"
                        value="healthcare-provider"
                        checked={formData.facilityType === 'healthcare-provider'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="flex items-center space-x-3">
                        <User className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">Healthcare Provider</span>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Doctor, dentist, specialist, etc.</p>
                        </div>
                      </div>
                    </label>
                    
                    <label className={`relative border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                      formData.facilityType === 'facility'
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                    }`}>
                      <input
                        type="radio"
                        name="facilityType"
                        value="facility"
                        checked={formData.facilityType === 'facility'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="flex items-center space-x-3">
                        <Building className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">Facility</span>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Hospital, clinic, pharmacy, etc.</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {formData.facilityType === 'healthcare-provider' ? 'Full Name' : 'Facility Name'}*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>
                
                {formData.facilityType === 'healthcare-provider' && (
                  <div>
                    <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Specialty*
                    </label>
                    <select
                      id="specialty"
                      name="specialty"
                      value={formData.specialty}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    >
                      <option value="">Select a specialty</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Dermatology">Dermatology</option>
                      <option value="Family Medicine">Family Medicine</option>
                      <option value="Gastroenterology">Gastroenterology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Obstetrics & Gynecology">Obstetrics & Gynecology</option>
                      <option value="Oncology">Oncology</option>
                      <option value="Ophthalmology">Ophthalmology</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Psychiatry">Psychiatry</option>
                      <option value="Urology">Urology</option>
                    </select>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Address*
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      City*
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ZIP Code*
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Website (Optional)
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!formData.facilityType || !formData.name || !formData.address || !formData.city || !formData.zipCode || !formData.phone || !formData.email}
                    className="px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Verification Documents
              </h2>
              
              <form className="space-y-6">
                {formData.facilityType === 'healthcare-provider' && (
                  <div>
                    <label htmlFor="license\" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Professional License Number*
                    </label>
                    <input
                      type="text"
                      id="license"
                      name="license"
                      value={formData.license}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Identification Document*
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                    {formData.identificationDocument ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">{formData.identificationDocument.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, identificationDocument: null }))}
                          className="text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          Upload a copy of your ID card or passport
                        </p>
                        <input
                          type="file"
                          id="identificationDocument"
                          onChange={(e) => handleFileChange(e, 'identificationDocument')}
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                        <label
                          htmlFor="identificationDocument"
                          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors inline-block cursor-pointer"
                        >
                          Select File
                        </label>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          Accepted formats: PDF, JPG, PNG (Max 5MB)
                        </p>
                      </>
                    )}
                  </div>
                </div>
                
                {formData.facilityType === 'healthcare-provider' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Professional License Document*
                    </label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                      {formData.licenseDocument ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-700 dark:text-gray-300">{formData.licenseDocument.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, licenseDocument: null }))}
                            className="text-red-600 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600 dark:text-gray-400 mb-2">
                            Upload a copy of your professional license
                          </p>
                          <input
                            type="file"
                            id="licenseDocument"
                            onChange={(e) => handleFileChange(e, 'licenseDocument')}
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png"
                          />
                          <label
                            htmlFor="licenseDocument"
                            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors inline-block cursor-pointer"
                          >
                            Select File
                          </label>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            Accepted formats: PDF, JPG, PNG (Max 5MB)
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Additional Supporting Documents (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                    {formData.additionalDocuments.length > 0 ? (
                      <div className="space-y-2">
                        {formData.additionalDocuments.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <FileText className="w-5 h-5 text-gray-400" />
                              <span className="text-gray-700 dark:text-gray-300">{doc.name}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeAdditionalDocument(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <input
                          type="file"
                          id="additionalDocuments"
                          onChange={(e) => handleFileChange(e, 'additionalDocuments')}
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          multiple
                        />
                        <label
                          htmlFor="additionalDocuments"
                          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors inline-block cursor-pointer mt-2"
                        >
                          Add More Documents
                        </label>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          Upload any additional documents to support your claim
                        </p>
                        <input
                          type="file"
                          id="additionalDocuments"
                          onChange={(e) => handleFileChange(e, 'additionalDocuments')}
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          multiple
                        />
                        <label
                          htmlFor="additionalDocuments"
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors inline-block cursor-pointer"
                        >
                          Select Files
                        </label>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          Accepted formats: PDF, JPG, PNG, DOC (Max 5MB per file)
                        </p>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!formData.identificationDocument || (formData.facilityType === 'healthcare-provider' && !formData.licenseDocument)}
                    className="px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Review & Submit
              </h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                    {formData.facilityType === 'healthcare-provider' ? 'Provider Information' : 'Facility Information'}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Name:</span>
                      <p className="font-medium text-gray-900 dark:text-white">{formData.name}</p>
                    </div>
                    
                    {formData.facilityType === 'healthcare-provider' && formData.specialty && (
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Specialty:</span>
                        <p className="font-medium text-gray-900 dark:text-white">{formData.specialty}</p>
                      </div>
                    )}
                    
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Address:</span>
                      <p className="font-medium text-gray-900 dark:text-white">{formData.address}, {formData.city}, {formData.zipCode}</p>
                    </div>
                    
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Phone:</span>
                      <p className="font-medium text-gray-900 dark:text-white">{formData.phone}</p>
                    </div>
                    
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Email:</span>
                      <p className="font-medium text-gray-900 dark:text-white">{formData.email}</p>
                    </div>
                    
                    {formData.website && (
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Website:</span>
                        <p className="font-medium text-gray-900 dark:text-white">{formData.website}</p>
                      </div>
                    )}
                    
                    {formData.facilityType === 'healthcare-provider' && formData.license && (
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">License Number:</span>
                        <p className="font-medium text-gray-900 dark:text-white">{formData.license}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                    Uploaded Documents
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Identification Document</span>
                    </div>
                    
                    {formData.facilityType === 'healthcare-provider' && (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700 dark:text-gray-300">Professional License</span>
                      </div>
                    )}
                    
                    {formData.additionalDocuments.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {formData.additionalDocuments.length} Additional Document(s)
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="font-medium text-blue-800 dark:text-blue-300">
                      Privacy & Terms
                    </h3>
                  </div>
                  
                  <p className="text-blue-700 dark:text-blue-400 mb-4">
                    By claiming your profile, you agree to our Terms of Service and Privacy Policy. Your information will be verified and used to create or update your public profile on Sal-lmjarab.
                  </p>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-primary-600 bg-white border-blue-300 rounded focus:ring-primary-500"
                      required
                    />
                    <span className="ml-2 text-blue-700 dark:text-blue-400">
                      I agree to the Terms of Service and Privacy Policy
                    </span>
                  </label>
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!formData.agreeToTerms}
                    className="px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                  >
                    Submit Claim
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Claim Submitted Successfully!
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Thank you for submitting your profile claim. Our team will review your information and verify your identity. This process typically takes 2-3 business days.
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6 text-left">
                <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                  Next Steps:
                </h3>
                
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold">
                      1
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">
                      We'll review your submitted information and documents
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold">
                      2
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">
                      You'll receive an email notification once your profile is verified
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold">
                      3
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Log in to complete your profile with additional information, photos, and services
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold">
                      4
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Start managing your online presence and connecting with patients
                    </span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/')}
                  className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                >
                  Return to Homepage
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Contact Support
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Benefits Section (shown on steps 1-3) */}
        {step < 4 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Benefits of Claiming Your Profile
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Enhanced Visibility
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Appear in search results and be discovered by thousands of potential patients looking for healthcare services.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Manage Your Reputation
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Respond to patient reviews, showcase your expertise, and build trust with your online presence.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Online Appointment Booking
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Allow patients to book appointments directly through your profile, reducing administrative work.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClaimProfile;