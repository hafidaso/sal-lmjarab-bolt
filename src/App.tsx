import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import AdvertisingPolicy from './pages/AdvertisingPolicy';
import SearchPage from './pages/SearchPage';
import DoctorProfilePage from './pages/DoctorProfilePage';
import HospitalDetailPage from './pages/HospitalDetailPage';
import PharmacyDetailPage from './pages/PharmacyDetailPage';
import PharmacyPortal from './components/pharmacy/PharmacyPortal';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DoctorRegistration from './pages/auth/DoctorRegistration';
import AdminRegistration from './pages/auth/AdminRegistration';
import AccountTypeSelection from './pages/auth/AccountTypeSelection';
import AccountSearch from './pages/auth/AccountSearch';
import ProviderDashboard from './pages/provider/ProviderDashboard';
import MedicalProfessionalProfile from './pages/provider/MedicalProfessionalProfile';
import PatientDashboard from './pages/patient/PatientDashboard';
import PatientCommunicationSystem from './pages/patient/PatientCommunicationSystem';
import PatientProfile from './pages/patient/PatientProfile';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import EnhancedChatBot from './components/chat/EnhancedChatBot';
import PredictiveInsights from './components/analytics/PredictiveInsights';
import SentimentDashboard from './components/analytics/SentimentDashboard';
import FindFacility from './pages/FindFacility';
import TopHospitals from './pages/TopHospitals';
import SpecialtyDetail from './pages/SpecialtyDetail';
import ProcedureDetail from './pages/ProcedureDetail';
import FacilityType from './pages/FacilityType';
import Blog from './pages/Blog';
import ClaimProfile from './pages/ClaimProfile';
import HelpCenter from './pages/HelpCenter';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Corporate from './pages/Corporate';
import Methodologies from './pages/Methodologies';
import Press from './pages/Press';
import Careers from './pages/Careers';
import PrivacyPolicy from './pages/PrivacyPolicy';
import PrivacySettings from './pages/PrivacySettings';
import HealthDataPrivacy from './pages/HealthDataPrivacy';
import HospitalAwards from './pages/HospitalAwards';
import HealthLibrary from './pages/HealthLibrary';
import VideoCenter from './pages/VideoCenter';
import NewsFeatures from './pages/NewsFeatures';
import { DrugsAZ } from './components/DrugsAZ';
import CookieConsent from './components/CookieConsent';
import PromoteYourPractice from './pages/PromoteYourPractice';
import ReviewFormDemo from './pages/ReviewFormDemo';
import LocationPermissionPrompt from './components/location/LocationPermissionPrompt';
import ReviewModerationPage from './pages/admin/ReviewModerationPage';
import ReviewManagementPage from './pages/provider/ReviewManagementPage';
import TermsOfUse from './pages/TermsOfUse';
import VirtualCare from './pages/VirtualCare';
import DynamicReviewPage from './pages/DynamicReviewPage';
import BlogDetail from './pages/BlogDetail';
import HospitalComparison from './pages/HospitalComparison';
import EmailSignupModal from './components/EmailSignupModal';
import Settings from './pages/Settings';

const queryClient = new QueryClient();

function App() {
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);
  const [showEmailSignup, setShowEmailSignup] = useState(false);

  useEffect(() => {
    // Check if we should show the location prompt
    const hasSeenLocationPrompt = localStorage.getItem('hasSeenLocationPrompt');
    const userLocation = localStorage.getItem('userLocation');
    if (!userLocation || (!hasSeenLocationPrompt && !userLocation)) {
      setShowLocationPrompt(true);
    }

    // Check if we should show the email signup modal
    const hasSeenEmailSignup = localStorage.getItem('emailSignupDismissed');
    const hasSignedUp = localStorage.getItem('emailSignupCompleted');
    if (!hasSeenEmailSignup && !hasSignedUp) {
      // Show after a short delay
      const timer = setTimeout(() => {
        setShowEmailSignup(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleLocationPermissionResponse = () => {
    localStorage.setItem('hasSeenLocationPrompt', 'true');
    setShowLocationPrompt(false);
  };

  const handleEmailSignup = (email: string) => {
    // Here you would typically send the email to your backend
    console.log('Email signup:', email);
    localStorage.setItem('emailSignupCompleted', 'true');
    localStorage.setItem('userEmail', email);
  };

  const handleEmailSignupClose = () => {
    setShowEmailSignup(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <BrowserRouter>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
                <Navbar />
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/doctor/:id" element={<DoctorProfilePage />} />
                  <Route path="/doctor/:doctorId/review" element={<DynamicReviewPage />} />
                  <Route
                    path="/hospital/:id"
                    element={<HospitalDetailPage />}
                  />
                  <Route path="/pharmacy" element={<PharmacyPortal />} />
                  <Route
                    path="/pharmacy/:id"
                    element={<PharmacyDetailPage />}
                  />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/register/select" element={<AccountTypeSelection />} />
                  <Route path="/register/doctor" element={<DoctorRegistration />} />
                  <Route path="/register/admin" element={<AdminRegistration />} />
                  <Route path="/find-facility" element={<FindFacility />} />
                  <Route path="/top-hospitals" element={<TopHospitals />} />
                  <Route
                    path="/top-hospitals/:specialtyId"
                    element={<SpecialtyDetail />}
                  />
                  <Route
                    path="/procedure/:procedureId"
                    element={<ProcedureDetail />}
                  />
                  <Route path="/:type" element={<FacilityType />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogDetail />} />
                  <Route path="/hospital-comparison" element={<HospitalComparison />} />
                  <Route path="/help-center" element={<HelpCenter />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/corporate" element={<Corporate />} />
                  <Route path="/methodologies" element={<Methodologies />} />
                  <Route path="/press" element={<Press />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/careers/:id" element={<Careers />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route
                    path="/privacy-settings"
                    element={<PrivacySettings />}
                  />
                  <Route
                    path="/terms-of-use"
                    element={<TermsOfUse />}
                  />
                  <Route
                    path="/advertising-policy"
                    element={<AdvertisingPolicy />}
                  />
                  <Route
                    path="/health-data-privacy"
                    element={<HealthDataPrivacy />}
                  />
                  <Route path="/hospitals" element={<HospitalAwards />} />
                  <Route path="/library" element={<HealthLibrary />} />
                  <Route path="/videos" element={<VideoCenter />} />
                  <Route path="/news" element={<NewsFeatures />} />
                  <Route path="/drugs-az" element={<DrugsAZ />} />
                  <Route
                    path="/promote-practice"
                    element={<PromoteYourPractice />}
                  />
                  <Route path="/review-form-demo" element={<ReviewFormDemo />} />
                  <Route path="/virtual-care" element={<VirtualCare />} />
                  <Route path="/settings" element={<Settings />} />

                  {/* Protected Routes */}
                  <Route
                    path="/provider/dashboard"
                    element={
                      <ProtectedRoute allowedRoles={['provider']}>
                        <ProviderDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/provider/profile"
                    element={
                      <ProtectedRoute allowedRoles={['provider']}>
                        <MedicalProfessionalProfile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/provider/reviews"
                    element={
                      <ProtectedRoute allowedRoles={['provider']}>
                        <ReviewManagementPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/patient/dashboard"
                    element={
                      <ProtectedRoute allowedRoles={['patient']}>
                        <PatientDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/patient/communication"
                    element={
                      <ProtectedRoute allowedRoles={['patient']}>
                        <PatientCommunicationSystem />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/patient/profile"
                    element={
                      <ProtectedRoute allowedRoles={['patient']}>
                        <PatientProfile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/dashboard"
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/accounts"
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <AccountSearch />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/moderation"
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <ReviewModerationPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
                <EnhancedChatBot />
                <CookieConsent />
                {/* Location Permission Prompt (global, floating) */}
                {showLocationPrompt && (
                  <LocationPermissionPrompt
                    onPermissionGranted={handleLocationPermissionResponse}
                    onPermissionDenied={handleLocationPermissionResponse}
                    onClose={() => setShowLocationPrompt(false)}
                  />
                )}
                {/* Email Signup Modal */}
                {showEmailSignup && (
                  <EmailSignupModal
                    onClose={handleEmailSignupClose}
                    onSignup={handleEmailSignup}
                  />
                )}
                <Toaster
                  position="bottom-right"
                  toastOptions={{
                    duration: 4000,
                    className: 'dark:bg-gray-800 dark:text-white',
                  }}
                />
              </div>
            </BrowserRouter>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;