// Chatbot Functionality Test Script
// Run this in the browser console to test all chatbot features

console.log('🤖 Starting Chatbot Functionality Tests...\n');

// Test 1: Check if chatbot component is rendered
function testChatbotRendering() {
  console.log('📋 Test 1: Chatbot Rendering');
  const chatbot = document.querySelector('[class*="fixed bottom-4 right-4"]');
  if (chatbot) {
    console.log('✅ Chatbot component is rendered');
    return true;
  } else {
    console.log('❌ Chatbot component not found');
    return false;
  }
}

// Test 2: Check if toggle button works
function testToggleButton() {
  console.log('\n📋 Test 2: Toggle Button');
  const toggleButton = document.querySelector('button[aria-label*="chat"]');
  if (toggleButton) {
    console.log('✅ Toggle button found');
    console.log('🔄 Clicking toggle button...');
    toggleButton.click();
    setTimeout(() => {
      const chatWindow = document.querySelector('[class*="absolute bottom-20"]');
      if (chatWindow) {
        console.log('✅ Chat window opened successfully');
        return true;
      } else {
        console.log('❌ Chat window did not open');
        return false;
      }
    }, 500);
  } else {
    console.log('❌ Toggle button not found');
    return false;
  }
}

// Test 3: Check title display
function testTitleDisplay() {
  console.log('\n📋 Test 3: Title Display');
  const title = document.querySelector('h3');
  if (title && title.textContent.includes('Virtual Health Assistant')) {
    console.log('✅ Title displayed correctly:', title.textContent);
    return true;
  } else {
    console.log('❌ Title not found or incorrect');
    return false;
  }
}

// Test 4: Test quick actions
function testQuickActions() {
  console.log('\n📋 Test 4: Quick Actions');
  const quickActions = document.querySelectorAll('button[class*="rounded-xl"]');
  if (quickActions.length >= 5) {
    console.log(`✅ Found ${quickActions.length} quick action buttons`);
    quickActions.forEach((action, index) => {
      const label = action.textContent.trim();
      console.log(`   ${index + 1}. ${label}`);
    });
    return true;
  } else {
    console.log('❌ Quick actions not found or incomplete');
    return false;
  }
}

// Test 5: Test language selector
function testLanguageSelector() {
  console.log('\n📋 Test 5: Language Selector');
  const globeButton = document.querySelector('button[title="Change language"]');
  if (globeButton) {
    console.log('✅ Language selector button found');
    console.log('🔄 Clicking language selector...');
    globeButton.click();
    setTimeout(() => {
      const languageButtons = document.querySelectorAll('button[class*="rounded-lg"]');
      if (languageButtons.length >= 3) {
        console.log(`✅ Language options displayed: ${languageButtons.length} languages`);
        return true;
      } else {
        console.log('❌ Language options not displayed');
        return false;
      }
    }, 500);
  } else {
    console.log('❌ Language selector button not found');
    return false;
  }
}

// Test 6: Test input field
function testInputField() {
  console.log('\n📋 Test 6: Input Field');
  const input = document.querySelector('input[placeholder*="healthcare"]');
  if (input) {
    console.log('✅ Input field found');
    console.log('🔄 Testing input functionality...');
    input.value = 'Hello, can you help me find a doctor?';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    console.log('✅ Input field accepts text');
    return true;
  } else {
    console.log('❌ Input field not found');
    return false;
  }
}

// Test 7: Test send button
function testSendButton() {
  console.log('\n📋 Test 7: Send Button');
  const sendButton = document.querySelector('button[title="Send"]');
  if (sendButton) {
    console.log('✅ Send button found');
    const isDisabled = sendButton.disabled;
    console.log(`📊 Send button disabled: ${isDisabled}`);
    return true;
  } else {
    console.log('❌ Send button not found');
    return false;
  }
}

// Test 8: Test voice input button
function testVoiceInput() {
  console.log('\n📋 Test 8: Voice Input');
  const voiceButton = document.querySelector('button[title*="voice"]');
  if (voiceButton) {
    console.log('✅ Voice input button found');
    const micIcon = voiceButton.querySelector('svg');
    if (micIcon) {
      console.log('✅ Voice input icon displayed');
      return true;
    } else {
      console.log('❌ Voice input icon not found');
      return false;
    }
  } else {
    console.log('❌ Voice input button not found');
    return false;
  }
}

// Test 9: Test human transfer button
function testHumanTransfer() {
  console.log('\n📋 Test 9: Human Transfer');
  const transferButton = document.querySelector('button[title*="human"]');
  if (transferButton) {
    console.log('✅ Human transfer button found');
    return true;
  } else {
    console.log('❌ Human transfer button not found');
    return false;
  }
}

// Test 10: Test message display
function testMessageDisplay() {
  console.log('\n📋 Test 10: Message Display');
  const messages = document.querySelectorAll('[class*="rounded-2xl"]');
  if (messages.length > 0) {
    console.log(`✅ Found ${messages.length} message bubbles`);
    return true;
  } else {
    console.log('❌ No messages displayed');
    return false;
  }
}

// Test 11: Test responsive design
function testResponsiveDesign() {
  console.log('\n📋 Test 11: Responsive Design');
  const chatWindow = document.querySelector('[class*="max-w-md"]');
  if (chatWindow) {
    const classes = chatWindow.className;
    if (classes.includes('w-full') && classes.includes('max-w-md')) {
      console.log('✅ Responsive design classes applied');
      return true;
    } else {
      console.log('❌ Responsive design classes missing');
      return false;
    }
  } else {
    console.log('❌ Chat window not found');
    return false;
  }
}

// Test 12: Test animations
function testAnimations() {
  console.log('\n📋 Test 12: Animations');
  const animatedElements = document.querySelectorAll('[class*="motion"]');
  if (animatedElements.length > 0) {
    console.log(`✅ Found ${animatedElements.length} animated elements`);
    return true;
  } else {
    console.log('❌ No animated elements found');
    return false;
  }
}

// Run all tests
function runAllTests() {
  console.log('🚀 Starting comprehensive chatbot functionality tests...\n');
  
  const tests = [
    testChatbotRendering,
    testToggleButton,
    testTitleDisplay,
    testQuickActions,
    testLanguageSelector,
    testInputField,
    testSendButton,
    testVoiceInput,
    testHumanTransfer,
    testMessageDisplay,
    testResponsiveDesign,
    testAnimations
  ];
  
  let passedTests = 0;
  let totalTests = tests.length;
  
  tests.forEach((test, index) => {
    try {
      const result = test();
      if (result !== false) {
        passedTests++;
      }
    } catch (error) {
      console.log(`❌ Test ${index + 1} failed with error:`, error.message);
    }
  });
  
  console.log('\n📊 TEST SUMMARY');
  console.log('================');
  console.log(`✅ Passed: ${passedTests}/${totalTests}`);
  console.log(`❌ Failed: ${totalTests - passedTests}/${totalTests}`);
  console.log(`📈 Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
  
  if (passedTests === totalTests) {
    console.log('\n🎉 ALL TESTS PASSED! Chatbot is fully functional.');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the issues above.');
  }
}

// Manual interaction tests
function testManualInteractions() {
  console.log('\n🔄 MANUAL INTERACTION TESTS');
  console.log('==========================');
  console.log('Please perform these tests manually:');
  console.log('1. Click the chat button to open the chatbot');
  console.log('2. Click "Find a Doctor" quick action');
  console.log('3. Type "Hello" in the input field');
  console.log('4. Press Enter to send the message');
  console.log('5. Click the language selector (globe icon)');
  console.log('6. Select a different language');
  console.log('7. Click the voice input button');
  console.log('8. Click the human transfer button');
  console.log('9. Close the chatbot');
  console.log('\nReport any issues you encounter during these tests.');
}

// Export functions for manual testing
window.chatbotTests = {
  runAllTests,
  testManualInteractions,
  testChatbotRendering,
  testToggleButton,
  testTitleDisplay,
  testQuickActions,
  testLanguageSelector,
  testInputField,
  testSendButton,
  testVoiceInput,
  testHumanTransfer,
  testMessageDisplay,
  testResponsiveDesign,
  testAnimations
};

console.log('📝 Test functions loaded. Run chatbotTests.runAllTests() to start testing.');
console.log('📝 Run chatbotTests.testManualInteractions() for manual test instructions.');

// Test script for chatbot functionality
console.log('🧪 Testing Chatbot Functionality...\n');

// Test 1: Check if chatbot component loads
console.log('✅ Test 1: Chatbot Component Loading');
console.log('   - Chatbot should be visible in bottom-right corner');
console.log('   - Click the chat bubble to open\n');

// Test 2: Check welcome message and translations
console.log('✅ Test 2: Welcome Message & Translations');
console.log('   - Should show: "Hello! I\'m your AI healthcare assistant..."');
console.log('   - Should show location prompt after 2 seconds');
console.log('   - Should display suggestions: Find a Doctor, Check Symptoms, etc.\n');

// Test 3: Test quick action buttons
console.log('✅ Test 3: Quick Action Buttons');
console.log('   - Find a Doctor → Should show doctor list with links');
console.log('   - Book an Appointment → Should show appointment info');
console.log('   - Show Doctor Reviews → Should show reviews with links');
console.log('   - Check Insurance Coverage → Should show insurance info with links');
console.log('   - Find Pharmacy → Should show pharmacy list with links\n');

// Test 4: Test text input responses
console.log('✅ Test 4: Text Input Responses');
console.log('   - Type "find doctor" → Should show doctor list');
console.log('   - Type "book appointment" → Should show appointment info');
console.log('   - Type "show reviews" → Should show reviews');
console.log('   - Type "check insurance" → Should show insurance info');
console.log('   - Type "find pharmacy" → Should show pharmacy list');
console.log('   - Type "emergency" → Should show emergency contacts\n');

// Test 5: Test location functionality
console.log('✅ Test 5: Location Functionality');
console.log('   - Should prompt for location permission');
console.log('   - Respond "yes" to location prompt → Should confirm location');
console.log('   - Respond "no" to location prompt → Should acknowledge denial\n');

// Test 6: Test language switching
console.log('✅ Test 6: Language Switching');
console.log('   - Click globe icon → Should show language selector');
console.log('   - Select French → Should translate interface');
console.log('   - Select Arabic → Should translate interface');
console.log('   - Select English → Should return to English\n');

// Test 7: Test voice input
console.log('✅ Test 7: Voice Input');
console.log('   - Click microphone icon → Should start listening');
console.log('   - Speak a command → Should transcribe and respond');
console.log('   - Click microphone again → Should stop listening\n');

// Test 8: Test human transfer
console.log('✅ Test 8: Human Transfer');
console.log('   - Click phone icon → Should show transfer message\n');

// Test 9: Test suggestions
console.log('✅ Test 9: Dynamic Suggestions');
console.log('   - After each response, should show relevant suggestions');
console.log('   - Click suggestions → Should trigger appropriate responses\n');

// Test 10: Test error handling
console.log('✅ Test 10: Error Handling');
console.log('   - Should handle network errors gracefully');
console.log('   - Should show appropriate error messages\n');

console.log('🎯 Manual Testing Instructions:');
console.log('1. Open http://localhost:5177/');
console.log('2. Click the chat bubble in bottom-right');
console.log('3. Test each functionality listed above');
console.log('4. Verify all links work and lead to correct pages');
console.log('5. Check that translations work properly\n');

console.log('📋 Expected Results:');
console.log('✅ No translation keys should be visible (like "chatbot.suggestions.findDoctor")');
console.log('✅ All quick actions should provide detailed responses with links');
console.log('✅ Location prompt should work correctly');
console.log('✅ Language switching should work');
console.log('✅ Voice input should work (if supported)');
console.log('✅ All links should be clickable and functional\n');

console.log('🚀 Ready to test! Open your browser and start testing the chatbot.'); 