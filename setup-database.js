// Database Setup Script
// This script helps set up the initial database state for the healthcare platform

const { createClient } = require('@supabase/supabase-js');

// Configuration
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key';

if (!supabaseServiceKey || supabaseServiceKey === 'your-service-role-key') {
  console.error('❌ Please set SUPABASE_SERVICE_ROLE_KEY environment variable');
  console.log('💡 You can find this in your Supabase dashboard under Settings > API > service_role key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  console.log('🚀 Setting up database...');

  try {
    // 1. Create demo users if they don't exist
    console.log('📝 Creating demo users...');
    
    const demoUsers = [
      {
        id: 'demo-patient-id',
        email: 'patient@demo.com',
        username: 'patient',
        role: 'patient',
        profile_completed: true
      },
      {
        id: 'demo-doctor-id', 
        email: 'doctor@demo.com',
        username: 'doctor',
        role: 'provider',
        profile_completed: true
      },
      {
        id: 'demo-admin-id',
        email: 'admin@demo.com', 
        username: 'admin',
        role: 'admin',
        profile_completed: true
      }
    ];

    for (const user of demoUsers) {
      const { error } = await supabase
        .from('users')
        .upsert([user], { onConflict: 'id' });
      
      if (error) {
        console.error(`❌ Error creating user ${user.email}:`, error.message);
      } else {
        console.log(`✅ User ${user.email} ready`);
      }
    }

    // 2. Create demo patient profiles
    console.log('👤 Creating demo patient profiles...');
    
    const { error: patientError } = await supabase
      .from('patient_profiles')
      .upsert([
        {
          id: 'demo-patient-id',
          first_name: 'Demo',
          last_name: 'Patient',
          profile_completed: true
        }
      ], { onConflict: 'id' });

    if (patientError) {
      console.error('❌ Error creating patient profile:', patientError.message);
    } else {
      console.log('✅ Patient profile ready');
    }

    // 3. Create notification preferences
    console.log('🔔 Creating notification preferences...');
    
    const { error: notificationError } = await supabase
      .from('patient_notification_preferences')
      .upsert([
        {
          patient_id: 'demo-patient-id',
          appointment_reminders: true,
          appointment_changes: true,
          new_messages: true,
          new_medical_records: true,
          marketing_communications: false,
          email_notifications: true,
          sms_notifications: true,
          push_notifications: true
        }
      ], { onConflict: 'patient_id' });

    if (notificationError) {
      console.error('❌ Error creating notification preferences:', notificationError.message);
    } else {
      console.log('✅ Notification preferences ready');
    }

    // 4. Create sample pharmacy data
    console.log('💊 Creating sample pharmacy data...');
    
    const { error: pharmacyError } = await supabase
      .from('pharmacies')
      .upsert([
        {
          id: 'demo-pharmacy-1',
          name: 'City Center Pharmacy',
          address: '123 Main Street',
          city: 'New York',
          phone: '+1-555-0123',
          email: 'info@citycenterpharmacy.com',
          services: ['Prescription Filling', 'Medication Counseling', 'Health Screenings'],
          is_24_hour: true,
          has_delivery: true,
          rating: 4.5,
          review_count: 127,
          safety_rating: 5
        }
      ], { onConflict: 'id' });

    if (pharmacyError) {
      console.error('❌ Error creating pharmacy data:', pharmacyError.message);
    } else {
      console.log('✅ Pharmacy data ready');
    }

    // 5. Create sample medications
    console.log('💊 Creating sample medications...');
    
    const { error: medicationError } = await supabase
      .from('medications')
      .upsert([
        {
          id: 'med-1',
          name: 'Aspirin',
          generic_name: 'Acetylsalicylic Acid',
          description: 'Pain reliever and blood thinner',
          dosage: ['81mg', '325mg'],
          form: ['Tablet', 'Chewable'],
          requires_prescription: false,
          price: 5.99,
          availability: 'in-stock'
        },
        {
          id: 'med-2',
          name: 'Ibuprofen',
          generic_name: 'Ibuprofen',
          description: 'Anti-inflammatory pain reliever',
          dosage: ['200mg', '400mg', '600mg'],
          form: ['Tablet', 'Liquid'],
          requires_prescription: false,
          price: 8.99,
          availability: 'in-stock'
        }
      ], { onConflict: 'id' });

    if (medicationError) {
      console.error('❌ Error creating medication data:', medicationError.message);
    } else {
      console.log('✅ Medication data ready');
    }

    console.log('🎉 Database setup completed successfully!');
    console.log('');
    console.log('📋 Next steps:');
    console.log('1. Make sure your .env file has the correct Supabase credentials');
    console.log('2. Run the development server: npm run dev');
    console.log('3. Test login with: patient@demo.com / password123');
    console.log('4. Check the browser console for any remaining errors');

  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
}

// Run the setup
setupDatabase(); 