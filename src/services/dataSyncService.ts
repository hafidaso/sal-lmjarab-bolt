import { supabase } from '../lib/supabase';
import { patientService, HealthMetrics } from './patientService';
import { pharmacyService, Pharmacy, Medication, Prescription, PharmacyOrder, ShoppingCart } from './pharmacyService';
import { providerService, Provider } from './providerService';

export interface SyncStatus {
  success: boolean;
  message: string;
  timestamp: string;
  dataType: string;
}

export interface SyncSummary {
  totalOperations: number;
  successfulOperations: number;
  failedOperations: number;
  errors: string[];
  timestamp: string;
}

// Data Synchronization Service
export const dataSyncService = {
  // Health Metrics Synchronization
  async syncHealthMetrics(patientId: string, metrics: Partial<HealthMetrics>): Promise<SyncStatus> {
    try {
      // Convert Partial<HealthMetrics> to the expected type for upsertHealthMetrics
      const upsertMetrics: Omit<HealthMetrics, 'id' | 'patient_id' | 'created_at' | 'updated_at'> = {
        blood_pressure: metrics.blood_pressure || null,
        heart_rate: metrics.heart_rate || null,
        weight: metrics.weight || null,
        last_checkup: metrics.last_checkup || null,
      };
      
      await patientService.upsertHealthMetrics(patientId, upsertMetrics);
      return {
        success: true,
        message: 'Health metrics synchronized successfully',
        timestamp: new Date().toISOString(),
        dataType: 'health_metrics'
      };
    } catch (error) {
      console.error('Error syncing health metrics:', error);
      return {
        success: false,
        message: `Failed to sync health metrics: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date().toISOString(),
        dataType: 'health_metrics'
      };
    }
  },

  // Patient Profile Synchronization
  async syncPatientProfile(patientId: string, profile: any): Promise<SyncStatus> {
    try {
      await patientService.updatePatientProfile(patientId, profile);
      return {
        success: true,
        message: 'Patient profile synchronized successfully',
        timestamp: new Date().toISOString(),
        dataType: 'patient_profile'
      };
    } catch (error) {
      console.error('Error syncing patient profile:', error);
      return {
        success: false,
        message: `Failed to sync patient profile: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date().toISOString(),
        dataType: 'patient_profile'
      };
    }
  },

  // Pharmacy Cart Synchronization
  async syncPharmacyCart(patientId: string, cartData: any): Promise<SyncStatus> {
    try {
      const cart = await pharmacyService.getShoppingCart(patientId);
      if (cart) {
        await pharmacyService.updateShoppingCart(cart.id, cartData);
      } else {
        await pharmacyService.createShoppingCart(patientId);
      }
      return {
        success: true,
        message: 'Pharmacy cart synchronized successfully',
        timestamp: new Date().toISOString(),
        dataType: 'pharmacy_cart'
      };
    } catch (error) {
      console.error('Error syncing pharmacy cart:', error);
      return {
        success: false,
        message: `Failed to sync pharmacy cart: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date().toISOString(),
        dataType: 'pharmacy_cart'
      };
    }
  },

  // Pharmacy Order Synchronization
  async syncPharmacyOrder(order: Omit<PharmacyOrder, 'id' | 'created_at' | 'updated_at'>): Promise<SyncStatus> {
    try {
      await pharmacyService.createOrder(order);
      return {
        success: true,
        message: 'Pharmacy order synchronized successfully',
        timestamp: new Date().toISOString(),
        dataType: 'pharmacy_order'
      };
    } catch (error) {
      console.error('Error syncing pharmacy order:', error);
      return {
        success: false,
        message: `Failed to sync pharmacy order: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date().toISOString(),
        dataType: 'pharmacy_order'
      };
    }
  },

  // Prescription Synchronization
  async syncPrescription(prescription: Omit<Prescription, 'id' | 'created_at' | 'updated_at'>): Promise<SyncStatus> {
    try {
      await pharmacyService.createPrescription(prescription);
      return {
        success: true,
        message: 'Prescription synchronized successfully',
        timestamp: new Date().toISOString(),
        dataType: 'prescription'
      };
    } catch (error) {
      console.error('Error syncing prescription:', error);
      return {
        success: false,
        message: `Failed to sync prescription: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date().toISOString(),
        dataType: 'prescription'
      };
    }
  },

  // Patient Appointment Synchronization
  async syncPatientAppointment(appointment: any): Promise<SyncStatus> {
    try {
      await patientService.createAppointment(appointment);
      return {
        success: true,
        message: 'Patient appointment synchronized successfully',
        timestamp: new Date().toISOString(),
        dataType: 'patient_appointment'
      };
    } catch (error) {
      console.error('Error syncing patient appointment:', error);
      return {
        success: false,
        message: `Failed to sync patient appointment: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date().toISOString(),
        dataType: 'patient_appointment'
      };
    }
  },

  // Patient Review Synchronization
  async syncPatientReview(review: any): Promise<SyncStatus> {
    try {
      await patientService.createReview(review);
      return {
        success: true,
        message: 'Patient review synchronized successfully',
        timestamp: new Date().toISOString(),
        dataType: 'patient_review'
      };
    } catch (error) {
      console.error('Error syncing patient review:', error);
      return {
        success: false,
        message: `Failed to sync patient review: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date().toISOString(),
        dataType: 'patient_review'
      };
    }
  },

  // Patient Medical Record Synchronization
  async syncPatientMedicalRecord(record: any): Promise<SyncStatus> {
    try {
      await patientService.createMedicalRecord(record);
      return {
        success: true,
        message: 'Patient medical record synchronized successfully',
        timestamp: new Date().toISOString(),
        dataType: 'patient_medical_record'
      };
    } catch (error) {
      console.error('Error syncing patient medical record:', error);
      return {
        success: false,
        message: `Failed to sync patient medical record: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date().toISOString(),
        dataType: 'patient_medical_record'
      };
    }
  },

  // Provider Synchronization
  async syncProvider(provider: Omit<Provider, 'id' | 'created_at' | 'updated_at'>): Promise<SyncStatus> {
    try {
      await providerService.createProvider(provider);
      return {
        success: true,
        message: 'Provider synchronized successfully',
        timestamp: new Date().toISOString(),
        dataType: 'provider'
      };
    } catch (error) {
      console.error('Error syncing provider:', error);
      return {
        success: false,
        message: `Failed to sync provider: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date().toISOString(),
        dataType: 'provider'
      };
    }
  },

  // Bulk Data Synchronization
  async syncBulkData(data: {
    healthMetrics?: Partial<HealthMetrics>;
    patientProfile?: any;
    pharmacyCart?: any;
    pharmacyOrder?: Omit<PharmacyOrder, 'id' | 'created_at' | 'updated_at'>;
    prescription?: Omit<Prescription, 'id' | 'created_at' | 'updated_at'>;
    appointment?: any;
    review?: any;
    medicalRecord?: any;
    provider?: Omit<Provider, 'id' | 'created_at' | 'updated_at'>;
  }, patientId?: string): Promise<SyncSummary> {
    const results: SyncStatus[] = [];
    const errors: string[] = [];

    // Sync health metrics
    if (data.healthMetrics && patientId) {
      const result = await this.syncHealthMetrics(patientId, data.healthMetrics);
      results.push(result);
      if (!result.success) errors.push(result.message);
    }

    // Sync patient profile
    if (data.patientProfile && patientId) {
      const result = await this.syncPatientProfile(patientId, data.patientProfile);
      results.push(result);
      if (!result.success) errors.push(result.message);
    }

    // Sync pharmacy cart
    if (data.pharmacyCart && patientId) {
      const result = await this.syncPharmacyCart(patientId, data.pharmacyCart);
      results.push(result);
      if (!result.success) errors.push(result.message);
    }

    // Sync pharmacy order
    if (data.pharmacyOrder) {
      const result = await this.syncPharmacyOrder(data.pharmacyOrder);
      results.push(result);
      if (!result.success) errors.push(result.message);
    }

    // Sync prescription
    if (data.prescription) {
      const result = await this.syncPrescription(data.prescription);
      results.push(result);
      if (!result.success) errors.push(result.message);
    }

    // Sync appointment
    if (data.appointment) {
      const result = await this.syncPatientAppointment(data.appointment);
      results.push(result);
      if (!result.success) errors.push(result.message);
    }

    // Sync review
    if (data.review) {
      const result = await this.syncPatientReview(data.review);
      results.push(result);
      if (!result.success) errors.push(result.message);
    }

    // Sync medical record
    if (data.medicalRecord) {
      const result = await this.syncPatientMedicalRecord(data.medicalRecord);
      results.push(result);
      if (!result.success) errors.push(result.message);
    }

    // Sync provider
    if (data.provider) {
      const result = await this.syncProvider(data.provider);
      results.push(result);
      if (!result.success) errors.push(result.message);
    }

    const successfulOperations = results.filter(r => r.success).length;
    const failedOperations = results.filter(r => !r.success).length;

    return {
      totalOperations: results.length,
      successfulOperations,
      failedOperations,
      errors,
      timestamp: new Date().toISOString()
    };
  },

  // Data Validation
  validateHealthMetrics(metrics: any): boolean {
    return (
      metrics &&
      typeof metrics === 'object' &&
      (metrics.blood_pressure === null || typeof metrics.blood_pressure === 'string') &&
      (metrics.heart_rate === null || typeof metrics.heart_rate === 'string') &&
      (metrics.weight === null || typeof metrics.weight === 'string')
    );
  },

  validatePharmacyCart(cart: any): boolean {
    return (
      cart &&
      typeof cart === 'object' &&
      Array.isArray(cart.items) &&
      typeof cart.total_amount === 'number'
    );
  },

  validatePatientProfile(profile: any): boolean {
    return (
      profile &&
      typeof profile === 'object' &&
      (profile.first_name === null || typeof profile.first_name === 'string') &&
      (profile.last_name === null || typeof profile.last_name === 'string')
    );
  },

  // Offline Data Management
  async storeOfflineData(key: string, data: any): Promise<void> {
    try {
      localStorage.setItem(`offline_${key}`, JSON.stringify({
        data,
        timestamp: new Date().toISOString()
      }));
    } catch (error) {
      console.error('Error storing offline data:', error);
    }
  },

  async getOfflineData(key: string): Promise<any | null> {
    try {
      const stored = localStorage.getItem(`offline_${key}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Check if data is not too old (24 hours)
        const age = Date.now() - new Date(parsed.timestamp).getTime();
        if (age < 24 * 60 * 60 * 1000) {
          return parsed.data;
        }
      }
      return null;
    } catch (error) {
      console.error('Error retrieving offline data:', error);
      return null;
    }
  },

  async clearOfflineData(key: string): Promise<void> {
    try {
      localStorage.removeItem(`offline_${key}`);
    } catch (error) {
      console.error('Error clearing offline data:', error);
    }
  },

  // Sync all offline data when connection is restored
  async syncOfflineData(patientId?: string): Promise<SyncSummary> {
    const results: SyncStatus[] = [];
    const errors: string[] = [];

    try {
      // Get all offline data keys
      const keys = Object.keys(localStorage).filter(key => key.startsWith('offline_'));
      
      for (const key of keys) {
        const data = await this.getOfflineData(key.replace('offline_', ''));
        if (data) {
          let result: SyncStatus | undefined;
          
          switch (key.replace('offline_', '')) {
            case 'health_metrics':
              if (patientId) {
                result = await this.syncHealthMetrics(patientId, data);
              }
              break;
            case 'patient_profile':
              if (patientId) {
                result = await this.syncPatientProfile(patientId, data);
              }
              break;
            case 'pharmacy_cart':
              if (patientId) {
                result = await this.syncPharmacyCart(patientId, data);
              }
              break;
            default:
              continue;
          }
          
          if (result) {
            results.push(result);
            if (result.success) {
              await this.clearOfflineData(key.replace('offline_', ''));
            } else {
              errors.push(result.message);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error syncing offline data:', error);
      errors.push(`Failed to sync offline data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    const successfulOperations = results.filter(r => r.success).length;
    const failedOperations = results.filter(r => !r.success).length;

    return {
      totalOperations: results.length,
      successfulOperations,
      failedOperations,
      errors,
      timestamp: new Date().toISOString()
    };
  }
}; 