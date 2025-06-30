import { TranslationService } from '../src/services/translationService.ts';
import { translations } from '../src/contexts/LanguageContext.ts';
import fs from 'fs';

async function autoTranslateMissingKeys() {
  console.log('🚀 Starting auto-translation of missing keys...');
  console.log('📊 Current translation stats:');
  
  const sourceLang = 'en';
  const targetLangs = ['fr', 'ar'];
  
  // Count current keys
  const englishKeys = Object.keys(translations[sourceLang] || {});
  console.log(`📝 English keys: ${englishKeys.length}`);
  
  for (const targetLang of targetLangs) {
    const targetKeys = Object.keys(translations[targetLang] || {});
    const missingKeys = englishKeys.filter(key => !targetKeys.includes(key));
    console.log(`🌍 ${targetLang.toUpperCase()} keys: ${targetKeys.length} (missing: ${missingKeys.length})`);
  }
  
  try {
    const service = TranslationService.getInstance();
    console.log('\n🔄 Translating missing keys...');
    
    const updated = await service.autoTranslateMissingKeys(translations);
    
    console.log('\n✅ Translation completed!');
    console.log('\n📋 Updated translations:');
    console.log(JSON.stringify(updated, null, 2));
    
    // Save to a file for easy copying
    const outputPath = './translated-keys.json';
    fs.writeFileSync(outputPath, JSON.stringify(updated, null, 2));
    console.log(`\n💾 Translations saved to: ${outputPath}`);
    
    return updated;
  } catch (error) {
    console.error('❌ Translation failed:', error);
    throw error;
  }
}

// Run the script
autoTranslateMissingKeys()
  .then(() => {
    console.log('\n🎉 Auto-translation script completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Copy the translated keys from translated-keys.json');
    console.log('2. Update your LanguageContext.tsx with the new translations');
    console.log('3. Test by switching languages in your navbar');
  })
  .catch((error) => {
    console.error('💥 Script failed:', error);
    process.exit(1);
  }); 