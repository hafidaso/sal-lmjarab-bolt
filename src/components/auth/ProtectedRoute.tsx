import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  requiredPermissions?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles,
  requiredPermissions 
}) => {
  const { user, isLoading, completeProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in but doesn't have the required role
    if (user && allowedRoles && !allowedRoles.includes(user.role)) {
      const roleNames = allowedRoles.map(role => {
        switch (role) {
          case 'patient': return 'Patient';
          case 'provider': return 'Healthcare Provider';
          case 'admin': return 'Administrator';
          default: return role;
        }
      }).join(' or ');
      
      toast.error(`Access Denied: This area is restricted to ${roleNames} users only.`);
      
      // Log access attempt for security monitoring
      console.warn(`Unauthorized access attempt: User ${user.email} (${user.role}) tried to access ${location.pathname}`);
    }
    
    // If user is logged in but profile is not complete, mark it as complete
    // This is a workaround for the demo accounts
    if (user && !user.verified) {
      completeProfile(user.id);
    }
  }, [user, allowedRoles, requiredPermissions, completeProfile, location.pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login page and save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on user role
    let redirectPath = '/';
    
    switch (user.role) {
      case 'patient':
        redirectPath = '/patient/dashboard';
        break;
      case 'provider':
        redirectPath = '/provider/dashboard';
        break;
      case 'admin':
        redirectPath = '/admin/dashboard';
        break;
      default:
        redirectPath = '/';
    }
    
    return <Navigate to={redirectPath} replace />;
  }

  // Additional permission checks can be added here
  if (requiredPermissions && user) {
    // This is a placeholder for future permission-based access control
    // Currently, the system uses role-based access control only
    console.log(`Permission check requested for: ${requiredPermissions.join(', ')}`);
  }

  return <>{children}</>;
};

export default ProtectedRoute;