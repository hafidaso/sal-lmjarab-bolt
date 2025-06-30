import { supabase } from '../lib/supabase';

export interface UserSyncData {
  id: string;
  email: string;
  username: string;
  role: 'patient' | 'provider' | 'admin';
  profile_completed: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface PatientProfileSync {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth?: string;
  gender?: string;
  phone_number?: string;
  address?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  insurance_provider?: string;
  insurance_id?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  blood_type?: string;
  allergies?: string[];
  chronic_conditions?: string[];
  avatar_url?: string;
  preferred_language?: string;
  profile_completed: boolean;
}

export interface ProviderProfileSync {
  id: string;
  name: string;
  type: 'doctor' | 'hospital' | 'clinic' | 'pharmacy';
  specialty?: string;
  description?: string;
  address?: string;
  city?: string;
  phone?: string;
  email?: string;
  website?: string;
  image_url?: string;
  services?: string[];
  insurance_accepted?: string[];
  hours?: any;
  location?: any;
  profile_completed: boolean;
}

export interface AdminProfileSync {
  id: string;
  name: string;
  role: 'admin' | 'super_admin';
  permissions?: string[];
  department?: string;
  profile_completed: boolean;
}

// Comprehensive User Synchronization Service
export const userSyncService = {
  // ========================================
  // USER MANAGEMENT
  // ========================================

  // Get all users
  async getAllUsers(): Promise<UserSyncData[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching users:', error);
      throw error;
    }

    return data || [];
  },

  // Get user by ID
  async getUserById(userId: string): Promise<UserSyncData | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }

    return data;
  },

  // Create or update user
  async upsertUser(userData: UserSyncData): Promise<UserSyncData> {
    const { data, error } = await supabase
      .from('users')
      .upsert([userData], { onConflict: 'id' })
      .select()
      .single();

    if (error) {
      console.error('Error upserting user:', error);
      throw error;
    }

    return data;
  },

  // Delete user
  async deleteUser(userId: string): Promise<void> {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', userId);

    if (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  // ========================================
  // PATIENT PROFILES
  // ========================================

  // Get all patient profiles
  async getAllPatientProfiles(): Promise<PatientProfileSync[]> {
    const { data, error } = await supabase
      .from('patient_profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching patient profiles:', error);
      throw error;
    }

    return data || [];
  },

  // Get patient profile by ID
  async getPatientProfileById(patientId: string): Promise<PatientProfileSync | null> {
    const { data, error } = await supabase
      .from('patient_profiles')
      .select('*')
      .eq('id', patientId)
      .single();

    if (error) {
      console.error('Error fetching patient profile:', error);
      return null;
    }

    return data;
  },

  // Create or update patient profile
  async upsertPatientProfile(profileData: PatientProfileSync): Promise<PatientProfileSync> {
    const { data, error } = await supabase
      .from('patient_profiles')
      .upsert([profileData], { onConflict: 'id' })
      .select()
      .single();

    if (error) {
      console.error('Error upserting patient profile:', error);
      throw error;
    }

    return data;
  },

  // Delete patient profile
  async deletePatientProfile(patientId: string): Promise<void> {
    const { error } = await supabase
      .from('patient_profiles')
      .delete()
      .eq('id', patientId);

    if (error) {
      console.error('Error deleting patient profile:', error);
      throw error;
    }
  },

  // ========================================
  // PROVIDER PROFILES
  // ========================================

  // Get all provider profiles
  async getAllProviderProfiles(): Promise<ProviderProfileSync[]> {
    const { data, error } = await supabase
      .from('providers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching provider profiles:', error);
      throw error;
    }

    return data || [];
  },

  // Get provider profile by ID
  async getProviderProfileById(providerId: string): Promise<ProviderProfileSync | null> {
    const { data, error } = await supabase
      .from('providers')
      .select('*')
      .eq('id', providerId)
      .single();

    if (error) {
      console.error('Error fetching provider profile:', error);
      return null;
    }

    return data;
  },

  // Create or update provider profile
  async upsertProviderProfile(profileData: ProviderProfileSync): Promise<ProviderProfileSync> {
    const { data, error } = await supabase
      .from('providers')
      .upsert([profileData], { onConflict: 'id' })
      .select()
      .single();

    if (error) {
      console.error('Error upserting provider profile:', error);
      throw error;
    }

    return data;
  },

  // Delete provider profile
  async deleteProviderProfile(providerId: string): Promise<void> {
    const { error } = await supabase
      .from('providers')
      .delete()
      .eq('id', providerId);

    if (error) {
      console.error('Error deleting provider profile:', error);
      throw error;
    }
  },

  // ========================================
  // COMPREHENSIVE USER SYNC
  // ========================================

  // Sync complete user with all related data
  async syncCompleteUser(userData: {
    user: UserSyncData;
    patientProfile?: PatientProfileSync;
    providerProfile?: ProviderProfileSync;
    adminProfile?: AdminProfileSync;
  }): Promise<{
    user: UserSyncData;
    patientProfile?: PatientProfileSync;
    providerProfile?: ProviderProfileSync;
    adminProfile?: AdminProfileSync;
  }> {
    try {
      console.log('Starting complete user sync for:', userData.user.email);

      // 1. Sync main user record
      const syncedUser = await this.upsertUser(userData.user);
      console.log('User synced:', syncedUser.id);

      // 2. Sync role-specific profile
      let syncedPatientProfile: PatientProfileSync | undefined;
      let syncedProviderProfile: ProviderProfileSync | undefined;
      let syncedAdminProfile: AdminProfileSync | undefined;

      switch (userData.user.role) {
        case 'patient':
          if (userData.patientProfile) {
            syncedPatientProfile = await this.upsertPatientProfile(userData.patientProfile);
            console.log('Patient profile synced:', syncedPatientProfile.id);
          }
          break;

        case 'provider':
          if (userData.providerProfile) {
            syncedProviderProfile = await this.upsertProviderProfile(userData.providerProfile);
            console.log('Provider profile synced:', syncedProviderProfile.id);
          }
          break;

        case 'admin':
          if (userData.adminProfile) {
            // Note: Admin profiles might be stored in a different table
            // For now, we'll handle this in the main user table
            console.log('Admin profile handled in main user table');
          }
          break;
      }

      // 3. Create related records if they don't exist
      await this.createRelatedRecords(syncedUser);

      console.log('Complete user sync finished successfully');

      return {
        user: syncedUser,
        patientProfile: syncedPatientProfile,
        providerProfile: syncedProviderProfile,
        adminProfile: syncedAdminProfile
      };

    } catch (error) {
      console.error('Error in complete user sync:', error);
      throw error;
    }
  },

  // Create related records for a user
  async createRelatedRecords(user: UserSyncData): Promise<void> {
    try {
      if (user.role === 'patient') {
        // Create notification preferences if they don't exist
        const { error: notificationError } = await supabase
          .from('patient_notification_preferences')
          .upsert([{ patient_id: user.id }], { onConflict: 'patient_id' });

        if (notificationError) {
          console.error('Error creating notification preferences:', notificationError);
        }

        // Create health metrics if they don't exist
        const { error: healthError } = await supabase
          .from('health_metrics')
          .upsert([{ patient_id: user.id }], { onConflict: 'patient_id' });

        if (healthError) {
          console.error('Error creating health metrics:', healthError);
        }

        // Create shopping cart if it doesn't exist
        const { error: cartError } = await supabase
          .from('shopping_carts')
          .upsert([{ patient_id: user.id }], { onConflict: 'patient_id' });

        if (cartError) {
          console.error('Error creating shopping cart:', cartError);
        }
      }
    } catch (error) {
      console.error('Error creating related records:', error);
    }
  },

  // ========================================
  // BULK OPERATIONS
  // ========================================

  // Sync multiple users at once
  async syncMultipleUsers(usersData: Array<{
    user: UserSyncData;
    patientProfile?: PatientProfileSync;
    providerProfile?: ProviderProfileSync;
    adminProfile?: AdminProfileSync;
  }>): Promise<{
    success: number;
    failed: number;
    errors: string[];
  }> {
    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[]
    };

    console.log(`Starting bulk sync for ${usersData.length} users`);

    for (const userData of usersData) {
      try {
        await this.syncCompleteUser(userData);
        results.success++;
      } catch (error) {
        results.failed++;
        const errorMessage = `Failed to sync user ${userData.user.email}: ${error instanceof Error ? error.message : 'Unknown error'}`;
        results.errors.push(errorMessage);
        console.error(errorMessage);
      }
    }

    console.log(`Bulk sync completed: ${results.success} successful, ${results.failed} failed`);
    return results;
  },

  // Get sync status for all users
  async getSyncStatus(): Promise<{
    totalUsers: number;
    syncedUsers: number;
    pendingUsers: number;
    errorUsers: number;
    details: Array<{
      userId: string;
      email: string;
      role: string;
      synced: boolean;
      lastSync?: string;
      error?: string;
    }>;
  }> {
    try {
      const users = await this.getAllUsers();
      const status = {
        totalUsers: users.length,
        syncedUsers: 0,
        pendingUsers: 0,
        errorUsers: 0,
        details: [] as Array<{
          userId: string;
          email: string;
          role: string;
          synced: boolean;
          lastSync?: string;
          error?: string;
        }>
      };

      for (const user of users) {
        try {
          // Check if user has complete profile
          let hasCompleteProfile = false;

          switch (user.role) {
            case 'patient':
              const patientProfile = await this.getPatientProfileById(user.id);
              hasCompleteProfile = !!patientProfile && patientProfile.profile_completed;
              break;
            case 'provider':
              const providerProfile = await this.getProviderProfileById(user.id);
              hasCompleteProfile = !!providerProfile && providerProfile.profile_completed;
              break;
            case 'admin':
              hasCompleteProfile = user.profile_completed;
              break;
          }

          status.details.push({
            userId: user.id,
            email: user.email,
            role: user.role,
            synced: hasCompleteProfile,
            lastSync: user.updated_at
          });

          if (hasCompleteProfile) {
            status.syncedUsers++;
          } else {
            status.pendingUsers++;
          }

        } catch (error) {
          status.errorUsers++;
          status.details.push({
            userId: user.id,
            email: user.email,
            role: user.role,
            synced: false,
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }

      return status;

    } catch (error) {
      console.error('Error getting sync status:', error);
      throw error;
    }
  },

  // ========================================
  // DEMO DATA SETUP
  // ========================================

  // Setup demo users with complete profiles
  async setupDemoUsers(): Promise<void> {
    const demoUsers = [
      {
        user: {
          id: 'demo-patient-id',
          email: 'patient@demo.com',
          username: 'patient',
          role: 'patient' as const,
          profile_completed: true
        },
        patientProfile: {
          id: 'demo-patient-id',
          first_name: 'Demo',
          last_name: 'Patient',
          phone_number: '+1-555-0123',
          address: '123 Demo Street',
          city: 'Demo City',
          state: 'Demo State',
          postal_code: '12345',
          blood_type: 'O+',
          allergies: ['Penicillin'],
          chronic_conditions: ['Hypertension'],
          profile_completed: true
        }
      },
      {
        user: {
          id: 'demo-doctor-id',
          email: 'doctor@demo.com',
          username: 'doctor',
          role: 'provider' as const,
          profile_completed: true
        },
        providerProfile: {
          id: 'demo-doctor-id',
          name: 'Dr. Jane Smith',
          type: 'doctor' as const,
          specialty: 'Cardiology',
          description: 'Experienced cardiologist with 15+ years of practice',
          address: '456 Medical Center Dr',
          city: 'Demo City',
          phone: '+1-555-0456',
          email: 'doctor@demo.com',
          services: ['Cardiac Consultation', 'EKG', 'Stress Test'],
          insurance_accepted: ['Blue Cross', 'Aetna', 'Medicare'],
          profile_completed: true
        }
      },
      {
        user: {
          id: 'demo-admin-id',
          email: 'admin@demo.com',
          username: 'admin',
          role: 'admin' as const,
          profile_completed: true
        },
        adminProfile: {
          id: 'demo-admin-id',
          name: 'Admin User',
          role: 'admin' as const,
          permissions: ['user_management', 'content_management', 'analytics'],
          department: 'Administration',
          profile_completed: true
        }
      }
    ];

    console.log('Setting up demo users...');
    const results = await this.syncMultipleUsers(demoUsers);
    
    if (results.failed > 0) {
      console.error('Some demo users failed to sync:', results.errors);
    } else {
      console.log('All demo users synced successfully!');
    }
  }
}; 