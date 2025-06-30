// Role-Based Access Control (RBAC) Configuration
// This file centralizes all role-based access control settings for the application

export type UserRole = 'patient' | 'provider' | 'admin';

export interface Permission {
  id: string;
  name: string;
  description: string;
  roles: UserRole[];
}

export interface RouteConfig {
  path: string;
  component: string;
  allowedRoles: UserRole[];
  requiredPermissions?: string[];
  description: string;
}

// Define all available permissions
export const PERMISSIONS: Permission[] = [
  // Patient permissions
  {
    id: 'patient:view_dashboard',
    name: 'View Patient Dashboard',
    description: 'Access to patient dashboard and overview',
    roles: ['patient']
  },
  {
    id: 'patient:manage_appointments',
    name: 'Manage Appointments',
    description: 'Book, view, and manage appointments',
    roles: ['patient']
  },
  {
    id: 'patient:view_medical_records',
    name: 'View Medical Records',
    description: 'Access to personal medical records',
    roles: ['patient']
  },
  {
    id: 'patient:submit_reviews',
    name: 'Submit Reviews',
    description: 'Submit reviews and ratings for providers',
    roles: ['patient']
  },
  {
    id: 'patient:manage_profile',
    name: 'Manage Patient Profile',
    description: 'Update personal information and preferences',
    roles: ['patient']
  },

  // Provider permissions
  {
    id: 'provider:view_dashboard',
    name: 'View Provider Dashboard',
    description: 'Access to provider dashboard and analytics',
    roles: ['provider']
  },
  {
    id: 'provider:manage_appointments',
    name: 'Manage Provider Appointments',
    description: 'Manage appointment schedule and patient bookings',
    roles: ['provider']
  },
  {
    id: 'provider:manage_patients',
    name: 'Manage Patients',
    description: 'View and manage patient information',
    roles: ['provider']
  },
  {
    id: 'provider:manage_reviews',
    name: 'Manage Reviews',
    description: 'View and respond to patient reviews',
    roles: ['provider']
  },
  {
    id: 'provider:manage_profile',
    name: 'Manage Provider Profile',
    description: 'Update professional profile and credentials',
    roles: ['provider']
  },

  // Admin permissions
  {
    id: 'admin:view_dashboard',
    name: 'View Admin Dashboard',
    description: 'Access to admin dashboard and system overview',
    roles: ['admin']
  },
  {
    id: 'admin:manage_users',
    name: 'Manage Users',
    description: 'Create, update, and delete user accounts',
    roles: ['admin']
  },
  {
    id: 'admin:moderate_content',
    name: 'Moderate Content',
    description: 'Review and moderate user-generated content',
    roles: ['admin']
  },
  {
    id: 'admin:system_settings',
    name: 'System Settings',
    description: 'Access to system configuration and settings',
    roles: ['admin']
  },
  {
    id: 'admin:view_analytics',
    name: 'View Analytics',
    description: 'Access to system-wide analytics and reports',
    roles: ['admin']
  }
];

// Define all protected routes and their access requirements
export const PROTECTED_ROUTES: RouteConfig[] = [
  // Patient routes
  {
    path: '/patient/dashboard',
    component: 'PatientDashboard',
    allowedRoles: ['patient'],
    requiredPermissions: ['patient:view_dashboard'],
    description: 'Patient dashboard and overview'
  },
  {
    path: '/patient/communication',
    component: 'PatientCommunicationSystem',
    allowedRoles: ['patient'],
    requiredPermissions: ['patient:manage_appointments', 'patient:view_medical_records'],
    description: 'Patient communication and appointment management'
  },
  {
    path: '/patient/profile',
    component: 'PatientProfile',
    allowedRoles: ['patient'],
    requiredPermissions: ['patient:manage_profile'],
    description: 'Patient profile management'
  },

  // Provider routes
  {
    path: '/provider/dashboard',
    component: 'ProviderDashboard',
    allowedRoles: ['provider'],
    requiredPermissions: ['provider:view_dashboard'],
    description: 'Provider dashboard and analytics'
  },
  {
    path: '/provider/profile',
    component: 'MedicalProfessionalProfile',
    allowedRoles: ['provider'],
    requiredPermissions: ['provider:manage_profile'],
    description: 'Provider profile management'
  },
  {
    path: '/provider/reviews',
    component: 'ReviewManagementPage',
    allowedRoles: ['provider'],
    requiredPermissions: ['provider:manage_reviews'],
    description: 'Provider review management'
  },

  // Admin routes
  {
    path: '/admin/dashboard',
    component: 'AdminDashboard',
    allowedRoles: ['admin'],
    requiredPermissions: ['admin:view_dashboard', 'admin:view_analytics'],
    description: 'Admin dashboard and system overview'
  },
  {
    path: '/admin/accounts',
    component: 'AccountSearch',
    allowedRoles: ['admin'],
    requiredPermissions: ['admin:manage_users'],
    description: 'User account management'
  },
  {
    path: '/admin/moderation',
    component: 'ReviewModerationPage',
    allowedRoles: ['admin'],
    requiredPermissions: ['admin:moderate_content'],
    description: 'Content moderation and review management'
  }
];

// Utility functions for RBAC
export const RBAC_UTILS = {
  // Check if a role has a specific permission
  hasPermission: (role: UserRole, permissionId: string): boolean => {
    const permission = PERMISSIONS.find(p => p.id === permissionId);
    return permission ? permission.roles.includes(role) : false;
  },

  // Get all permissions for a role
  getRolePermissions: (role: UserRole): Permission[] => {
    return PERMISSIONS.filter(p => p.roles.includes(role));
  },

  // Get route configuration by path
  getRouteConfig: (path: string): RouteConfig | undefined => {
    return PROTECTED_ROUTES.find(route => route.path === path);
  },

  // Check if a role can access a specific route
  canAccessRoute: (role: UserRole, path: string): boolean => {
    const routeConfig = RBAC_UTILS.getRouteConfig(path);
    return routeConfig ? routeConfig.allowedRoles.includes(role) : false;
  },

  // Get all routes accessible by a role
  getAccessibleRoutes: (role: UserRole): RouteConfig[] => {
    return PROTECTED_ROUTES.filter(route => route.allowedRoles.includes(role));
  },

  // Validate role string
  isValidRole: (role: string): role is UserRole => {
    return ['patient', 'provider', 'admin'].includes(role);
  }
};

// Role hierarchy (for future use)
export const ROLE_HIERARCHY = {
  patient: 1,
  provider: 2,
  admin: 3
};

// Default role for new users
export const DEFAULT_ROLE: UserRole = 'patient';

// Role display names
export const ROLE_DISPLAY_NAMES: Record<UserRole, string> = {
  patient: 'Patient',
  provider: 'Healthcare Provider',
  admin: 'Administrator'
};

// Role descriptions
export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  patient: 'Access to patient features including appointments, medical records, and provider search',
  provider: 'Access to provider features including patient management, appointment scheduling, and profile management',
  admin: 'Full system access including user management, content moderation, and system administration'
}; 