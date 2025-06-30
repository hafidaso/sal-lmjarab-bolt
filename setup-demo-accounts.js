// Script to set up demo accounts with correct roles
// Run this in the browser console after logging in with demo accounts

const setupDemoAccounts = async () => {
  const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2');
  
  // Replace with your actual Supabase URL and anon key
  const supabaseUrl = 'YOUR_SUPABASE_URL';
  const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.log('No user logged in');
      return;
    }
    
    console.log('Current user:', user.email);
    
    // Check current user profile
    const { data: currentProfile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (profileError) {
      console.error('Error fetching profile:', profileError);
      return;
    }
    
    console.log('Current profile:', currentProfile);
    
    // Set correct role based on email
    let correctRole = 'patient';
    if (user.email === 'doctor@demo.com') {
      correctRole = 'provider';
    } else if (user.email === 'admin@demo.com') {
      correctRole = 'admin';
    }
    
    console.log('Should have role:', correctRole);
    console.log('Currently has role:', currentProfile.role);
    
    if (currentProfile.role !== correctRole) {
      console.log('Updating role...');
      
      const { error: updateError } = await supabase
        .from('users')
        .update({ role: correctRole })
        .eq('id', user.id);
      
      if (updateError) {
        console.error('Error updating role:', updateError);
      } else {
        console.log('Role updated successfully to:', correctRole);
        
        // Refresh the page to apply changes
        window.location.reload();
      }
    } else {
      console.log('Role is already correct');
    }
    
  } catch (error) {
    console.error('Error in setupDemoAccounts:', error);
  }
};

// Instructions for use:
console.log(`
To set up demo accounts:

1. Log in with a demo account (doctor@demo.com, admin@demo.com, or patient@demo.com)
2. Open browser console (F12)
3. Replace supabaseUrl and supabaseKey with your actual values
4. Run: setupDemoAccounts()
5. The page will reload with the correct role

Or manually update the database:
- doctor@demo.com should have role = 'provider'
- admin@demo.com should have role = 'admin'  
- patient@demo.com should have role = 'patient'
`); 