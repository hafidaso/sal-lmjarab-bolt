const puppeteer = require('puppeteer');

async function testDynamicReviewSystem() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('🧪 Testing Dynamic Review System...');
    
    // Test 1: Navigate to a doctor profile
    console.log('1. Navigating to doctor profile...');
    await page.goto('http://localhost:5173/doctor/dr-ahmed-bennani');
    await page.waitForSelector('h1', { timeout: 5000 });
    
    // Test 2: Check if review button is visible for logged out user
    console.log('2. Checking review button visibility for logged out user...');
    const reviewButtonLoggedOut = await page.$('[href*="/review"]');
    if (reviewButtonLoggedOut) {
      console.log('❌ Review button should not be visible for logged out users');
    } else {
      console.log('✅ Review button correctly hidden for logged out users');
    }
    
    // Test 3: Login as a patient
    console.log('3. Logging in as patient...');
    await page.goto('http://localhost:5173/login');
    await page.waitForSelector('input[type="email"]');
    await page.type('input[type="email"]', 'patient@example.com');
    await page.type('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
    
    // Test 4: Navigate back to doctor profile and check review button
    console.log('4. Checking review button visibility for logged in user...');
    await page.goto('http://localhost:5173/doctor/dr-ahmed-bennani');
    await page.waitForSelector('h1');
    
    const reviewButton = await page.$('[href*="/review"]');
    if (reviewButton) {
      console.log('✅ Review button visible for logged in user');
    } else {
      console.log('❌ Review button not found for logged in user');
    }
    
    // Test 5: Click review button and verify dynamic page
    console.log('5. Testing dynamic review page...');
    await reviewButton.click();
    await page.waitForNavigation();
    
    const pageTitle = await page.$eval('h1', el => el.textContent);
    if (pageTitle.includes('Review Dr.')) {
      console.log('✅ Dynamic review page loaded correctly');
    } else {
      console.log('❌ Dynamic review page not loading correctly');
    }
    
    // Test 6: Check if doctor info is displayed
    console.log('6. Verifying doctor information on review page...');
    const doctorName = await page.$eval('h2', el => el.textContent);
    if (doctorName.includes('Dr. Ahmed Bennani')) {
      console.log('✅ Doctor information displayed correctly');
    } else {
      console.log('❌ Doctor information not displayed correctly');
    }
    
    // Test 7: Test with different doctor ID
    console.log('7. Testing with different doctor...');
    await page.goto('http://localhost:5173/doctor/dr-fatima-alami/review');
    await page.waitForSelector('h1');
    
    const differentDoctorTitle = await page.$eval('h1', el => el.textContent);
    if (differentDoctorTitle.includes('Dr. Fatima Alami')) {
      console.log('✅ Dynamic routing works for different doctors');
    } else {
      console.log('❌ Dynamic routing not working for different doctors');
    }
    
    // Test 8: Test invalid doctor ID
    console.log('8. Testing invalid doctor ID...');
    await page.goto('http://localhost:5173/doctor/invalid-doctor-id/review');
    await page.waitForSelector('h1');
    
    const errorTitle = await page.$eval('h1', el => el.textContent);
    if (errorTitle.includes('Doctor Not Found')) {
      console.log('✅ Error handling works for invalid doctor IDs');
    } else {
      console.log('❌ Error handling not working for invalid doctor IDs');
    }
    
    console.log('\n🎉 Dynamic Review System Test Completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
}

// Run the test
testDynamicReviewSystem(); 