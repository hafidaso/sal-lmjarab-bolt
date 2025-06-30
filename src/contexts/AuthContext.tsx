import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { Session, User } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'provider' | 'admin';
  avatar?: string;
  verified?: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<Session | null>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  updateUserRole: (userId: string, role: 'patient' | 'provider' | 'admin') => Promise<boolean>;
  completeProfile: (userId: string) => Promise<boolean>;
  updateUserProfile: (updates: Partial<AuthUser>) => Promise<boolean>;
  // Role-based access control utilities
  hasRole: (role: 'patient' | 'provider' | 'admin') => boolean;
  hasAnyRole: (roles: ('patient' | 'provider' | 'admin')[]) => boolean;
  isAdmin: () => boolean;
  isProvider: () => boolean;
  isPatient: () => boolean;
}

interface RegisterData {
  email: string;
  password: string;
  username: string;
  role: 'patient' | 'provider' | 'admin';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingProfile, setIsFetchingProfile] = useState(false);

  useEffect(() => {
    console.log('AuthProvider useEffect - initializing auth state');
    
    // Handle URL hash for auth redirects
    const handleAuthRedirect = async () => {
      const hash = window.location.hash;
      if (hash && hash.includes('access_token')) {
        console.log('Found access token in hash, handling redirect');
        // Clear the hash to avoid exposing tokens
        window.history.replaceState(null, '', window.location.pathname);
        
        // Get the current session
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          console.log('Setting session from hash redirect');
          setSession(data.session);
          await fetchUserProfile(data.session.user);
        }
      }
    };
    
    handleAuthRedirect();

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session ? 'Session found' : 'No session');
      setSession(session);
      if (session) {
        console.log('Fetching user profile from initial session');
        fetchUserProfile(session.user);
      } else {
        console.log('No session, setting loading to false');
        setLoading(false);
        setUser(null);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change event:', event, session ? 'Session present' : 'No session');
      setSession(session);
      if (session) {
        console.log('Fetching user profile from auth state change');
        fetchUserProfile(session.user);
      } else {
        console.log('Auth state change - no session, clearing user');
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (authUser: User) => {
    // Prevent multiple simultaneous calls for the same user
    if (isFetchingProfile) {
      console.log('Already fetching profile, skipping...');
      return;
    }
    
    setIsFetchingProfile(true);
    
    try {
      console.log('Fetching user profile for:', authUser.email);
      
      // Determine role based on email for demo accounts
      let defaultRole = 'patient';
      if (authUser.email === 'doctor@demo.com') {
        defaultRole = 'provider';
      } else if (authUser.email === 'admin@demo.com') {
        defaultRole = 'admin';
      }
      
      // ALWAYS check by email first to avoid duplicate key error
      const { data: existingUser, error: emailError } = await supabase
        .from('users')
        .select('*')
        .eq('email', authUser.email)
        .maybeSingle();
      
      let userData;
      
      if (existingUser) {
        console.log('User found by email, using existing data:', existingUser);
        
        // Update the user's ID to match the auth user if different
        if (existingUser.id !== authUser.id) {
          const { error: updateError } = await supabase
            .from('users')
            .update({ id: authUser.id })
            .eq('email', authUser.email);
          
          if (updateError) {
            console.error('Error updating user ID:', updateError);
          }
        }
        
        // Update role if needed
        if (existingUser.role !== defaultRole) {
          const { error: roleError } = await supabase
            .from('users')
            .update({ role: defaultRole })
            .eq('email', authUser.email);
          
          if (roleError) {
            console.error('Error updating user role:', roleError);
          }
        }
        
        userData = { ...existingUser, id: authUser.id, role: defaultRole };
        
      } else {
        console.log('No user found by email, creating new user...');
        
        // Only create if no user exists with this email
        const { data: newUser, error: insertError } = await supabase
          .from('users')
          .insert([
            {
              id: authUser.id,
              email: authUser.email,
              username: authUser.email?.split('@')[0] || 'User',
              role: defaultRole,
              profile_completed: true
            }
          ])
          .select()
          .single();
        
        if (insertError) {
          console.error('Error creating user profile:', insertError);
          toast.error('Error creating user profile: ' + insertError.message);
          setUser(null);
          return;
        }
        
        userData = newUser;
      }
      
      // Set the user state
      const userToSet = {
        id: userData.id,
        email: userData.email,
        name: userData.username,
        role: userData.role,
        verified: userData.profile_completed
      };
      
      console.log('Setting user state to:', userToSet);
      setUser(userToSet);
      
      // Ensure patient profile exists for patient users
      if (userData.role === 'patient') {
        await ensurePatientProfileExists(userData.id, userData.username);
      }
      
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      setUser(null);
    } finally {
      setLoading(false);
      setIsFetchingProfile(false);
    }
  };

  // Helper function to ensure patient profile exists
  const ensurePatientProfileExists = async (userId: string, username: string) => {
    try {
      // Check if patient profile already exists
      const { data: existingProfile } = await supabase
        .from('patient_profiles')
        .select('id')
        .eq('id', userId)
        .maybeSingle();
      
      if (!existingProfile) {
        console.log('Creating patient profile for:', userId);
        
        const { error: patientError } = await supabase
          .from('patient_profiles')
          .insert([
            {
              id: userId,
              first_name: username.split(' ')[0] || username,
              last_name: username.split(' ').slice(1).join(' ') || '',
              profile_completed: true
            }
          ]);
          
        if (patientError) {
          console.error('Error creating patient profile:', patientError);
          // Don't show error to user, this is not critical
        } else {
          console.log('Patient profile created successfully');
        }
        
        // Create notification preferences
        const { error: notificationError } = await supabase
          .from('patient_notification_preferences')
          .insert([{ patient_id: userId }]);
          
        if (notificationError) {
          console.error('Error creating notification preferences:', notificationError);
          // Don't show error to user, this is not critical
        }
      }
    } catch (error) {
      console.error('Error ensuring patient profile exists:', error);
      // Don't show error to user, this is not critical
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log('Attempting login for:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Provide more specific error messages
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Invalid email or password. Please check your credentials and try again.');
        } else if (error.message.includes('Email not confirmed')) {
          throw new Error('Please check your email and click the confirmation link before logging in.');
        } else if (error.message.includes('Too many requests')) {
          throw new Error('Too many login attempts. Please wait a moment before trying again.');
        } else {
          throw new Error(error.message || 'Login failed. Please try again.');
        }
      }

      if (!data.session) {
        throw new Error('No session returned from Supabase');
      }

      console.log('Authentication successful, session:', data.session);
      console.log('Fetching user profile...');

      // Wait for the user profile to be fetched
      await fetchUserProfile(data.session.user);
      
      console.log('User profile fetched, current user state:', user);
      
      // Show success message after user profile is fetched
      toast.success('Logged in successfully');
      
      return data.session;
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Failed to login');
      throw error; // Re-throw to allow component to handle specific error types
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      // Register the user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      });

      if (authError) {
        if (authError.message.includes('User already registered')) {
          throw new Error('An account with this email already exists. Please try logging in instead.');
        } else if (authError.message.includes('Password should be at least')) {
          throw new Error('Password must be at least 6 characters long.');
        } else {
          throw new Error(authError.message || 'Registration failed');
        }
      }

      if (!authData.user) {
        throw new Error('User registration failed');
      }

      // Create user profile in the users table
      const { error: profileError } = await supabase
        .from('users')
        .insert([
          {
            id: authData.user.id,
            email: userData.email,
            username: userData.username,
            role: userData.role,
            profile_completed: true,
          },
        ]);

      if (profileError) {
        // Log detailed error information for debugging
        console.error('Profile creation error details:', {
          code: profileError.code,
          message: profileError.message,
          details: profileError.details,
          hint: profileError.hint
        });
        
        throw new Error('Failed to create user profile. Please contact support.');
      }

      // If user is a patient, create patient profile
      if (userData.role === 'patient') {
        const { error: patientError } = await supabase
          .from('patient_profiles')
          .insert([
            {
              id: authData.user.id,
              first_name: userData.username.split(' ')[0] || '',
              last_name: userData.username.split(' ').slice(1).join(' ') || '',
              profile_completed: true
            }
          ]);
          
        if (patientError) {
          console.error('Error creating patient profile:', patientError);
        }
        
        // Create notification preferences
        await supabase
          .from('patient_notification_preferences')
          .insert([{ patient_id: authData.user.id }]);
      }

      toast.success('Account created successfully');
      
      // Check if email confirmation is required
      if (authData.session) {
        // If session exists, user is already confirmed
        setSession(authData.session);
        await fetchUserProfile(authData.user);
      } else {
        // Email confirmation required
        toast.success('Please check your email to confirm your account');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      toast.success('Logged out successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to logout');
    }
  };

  const updateUserRole = async (userId: string, role: 'patient' | 'provider' | 'admin'): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ role })
        .eq('id', userId);
      
      if (error) throw error;
      
      // If updating the current user, update the local state
      if (user && user.id === userId) {
        setUser({
          ...user,
          role
        });
      }
      
      return true;
    } catch (error) {
      console.error('Error updating user role:', error);
      return false;
    }
  };

  const completeProfile = async (userId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ profile_completed: true })
        .eq('id', userId);
      
      if (error) throw error;
      
      // If updating the current user, update the local state
      if (user && user.id === userId) {
        setUser({
          ...user,
          verified: true
        });
      }
      
      return true;
    } catch (error) {
      console.error('Error completing user profile:', error);
      return false;
    }
  };

  const updateUserProfile = async (updates: Partial<AuthUser>): Promise<boolean> => {
    try {
      if (!user?.id) {
        console.error('No user ID available for profile update');
        return false;
      }

      console.log('Updating user profile:', { userId: user.id, updates });

      // Prepare updates for users table
      const userUpdates: any = {};
      if (updates.email) userUpdates.email = updates.email;
      if (updates.name && (user.role === 'provider' || user.role === 'admin')) {
        userUpdates.username = updates.name;
      }

      // Update users table
      if (Object.keys(userUpdates).length > 0) {
        const { error: userError } = await supabase
          .from('users')
          .update(userUpdates)
          .eq('id', user.id);
        
        if (userError) {
          console.error('Error updating user data:', userError);
          throw userError;
        }
      }

      // Update patient_profiles table for name (if user is a patient)
      if (updates.name && user.role === 'patient') {
        // Split the name into first and last name
        const nameParts = updates.name.trim().split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        // First try to update existing patient profile
        const { error: updateError } = await supabase
          .from('patient_profiles')
          .update({ 
            first_name: firstName,
            last_name: lastName,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);

        if (updateError) {
          // If update fails, try to insert a new patient profile
          console.log('No existing patient profile, creating new one');
          const { error: insertError } = await supabase
            .from('patient_profiles')
            .insert({
              id: user.id,
              first_name: firstName,
              last_name: lastName,
              profile_completed: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });

          if (insertError) {
            console.error('Error creating patient profile:', insertError);
            throw insertError;
          }
        }
      }

      // Update the local user state
      if (user) {
        setUser({
          ...user,
          ...updates
        });
      }
      
      console.log('Profile update successful');
      return true;
    } catch (error) {
      console.error('Error updating user profile:', error);
      return false;
    }
  };

  const hasRole = (role: 'patient' | 'provider' | 'admin') => {
    return user?.role === role;
  };

  const hasAnyRole = (roles: ('patient' | 'provider' | 'admin')[]) => {
    return roles.some(role => user?.role === role);
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const isProvider = () => {
    return user?.role === 'provider';
  };

  const isPatient = () => {
    return user?.role === 'patient';
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      login, 
      register, 
      logout, 
      isLoading,
      updateUserRole,
      completeProfile,
      updateUserProfile,
      hasRole,
      hasAnyRole,
      isAdmin,
      isProvider,
      isPatient
    }}>
      {children}
    </AuthContext.Provider>
  );
};