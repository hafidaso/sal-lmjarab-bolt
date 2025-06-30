import { useLanguage } from '../contexts/LanguageContext';

// Free translation APIs
const TRANSLATION_APIS = {
  // LibreTranslate (completely free, self-hosted)
  libreTranslate: {
    url: 'https://libretranslate.de/translate',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  },
  
  // Google Translate (free tier: 500k chars/month)
  googleTranslate: {
    url: 'https://translation.googleapis.com/language/translate/v2',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  },
  
  // Microsoft Translator (free tier: 2M chars/month)
  microsoftTranslate: {
    url: 'https://api.cognitive.microsofttranslator.com/translate',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }
};

export interface TranslationResult {
  translatedText: string;
  detectedLanguage?: string;
  confidence?: number;
}

export class TranslationService {
  private static instance: TranslationService;
  private cache: Map<string, string> = new Map();
  private apiKey: string | null = null;

  static getInstance(): TranslationService {
    if (!TranslationService.instance) {
      TranslationService.instance = new TranslationService();
    }
    return TranslationService.instance;
  }

  setApiKey(key: string) {
    this.apiKey = key;
  }

  // Cache translations to avoid repeated API calls
  private getCachedTranslation(key: string, targetLang: string): string | null {
    const cacheKey = `${key}_${targetLang}`;
    return this.cache.get(cacheKey) || null;
  }

  private setCachedTranslation(key: string, targetLang: string, translation: string) {
    const cacheKey = `${key}_${targetLang}`;
    this.cache.set(cacheKey, translation);
  }

  // LibreTranslate (completely free)
  async translateWithLibreTranslate(text: string, targetLang: string, sourceLang: string = 'en'): Promise<TranslationResult> {
    try {
      const response = await fetch(TRANSLATION_APIS.libreTranslate.url, {
        method: TRANSLATION_APIS.libreTranslate.method,
        headers: TRANSLATION_APIS.libreTranslate.headers,
        body: JSON.stringify({
          q: text,
          source: sourceLang,
          target: targetLang,
        }),
      });

      if (!response.ok) {
        throw new Error(`LibreTranslate API error: ${response.status}`);
      }

      const data = await response.json();
      return {
        translatedText: data.translatedText,
        detectedLanguage: data.detected?.language,
        confidence: data.detected?.confidence,
      };
    } catch (error) {
      console.error('LibreTranslate error:', error);
      throw error;
    }
  }

  // Google Translate (free tier)
  async translateWithGoogle(text: string, targetLang: string, sourceLang: string = 'en'): Promise<TranslationResult> {
    if (!this.apiKey) {
      throw new Error('Google Translate API key not set');
    }

    try {
      const response = await fetch(`${TRANSLATION_APIS.googleTranslate.url}?key=${this.apiKey}`, {
        method: TRANSLATION_APIS.googleTranslate.method,
        headers: TRANSLATION_APIS.googleTranslate.headers,
        body: JSON.stringify({
          q: text,
          target: targetLang,
          source: sourceLang,
        }),
      });

      if (!response.ok) {
        throw new Error(`Google Translate API error: ${response.status}`);
      }

      const data = await response.json();
      return {
        translatedText: data.data.translations[0].translatedText,
        detectedLanguage: data.data.translations[0].detectedSourceLanguage,
      };
    } catch (error) {
      console.error('Google Translate error:', error);
      throw error;
    }
  }

  // Microsoft Translator (free tier)
  async translateWithMicrosoft(text: string, targetLang: string, sourceLang: string = 'en'): Promise<TranslationResult> {
    if (!this.apiKey) {
      throw new Error('Microsoft Translator API key not set');
    }

    try {
      const response = await fetch(`${TRANSLATION_APIS.microsoftTranslate.url}?api-version=3.0&from=${sourceLang}&to=${targetLang}`, {
        method: TRANSLATION_APIS.microsoftTranslate.method,
        headers: {
          ...TRANSLATION_APIS.microsoftTranslate.headers,
          'Ocp-Apim-Subscription-Key': this.apiKey,
        },
        body: JSON.stringify([{ text }]),
      });

      if (!response.ok) {
        throw new Error(`Microsoft Translator API error: ${response.status}`);
      }

      const data = await response.json();
      return {
        translatedText: data[0].translations[0].text,
        detectedLanguage: data[0].detectedLanguage?.language,
        confidence: data[0].detectedLanguage?.score,
      };
    } catch (error) {
      console.error('Microsoft Translator error:', error);
      throw error;
    }
  }

  // Main translation method with fallback
  async translate(text: string, targetLang: string, sourceLang: string = 'en'): Promise<string> {
    // Check cache first
    const cached = this.getCachedTranslation(text, targetLang);
    if (cached) {
      return cached;
    }

    // Try LibreTranslate first (completely free)
    try {
      const result = await this.translateWithLibreTranslate(text, targetLang, sourceLang);
      this.setCachedTranslation(text, targetLang, result.translatedText);
      return result.translatedText;
    } catch (error) {
      console.warn('LibreTranslate failed, trying fallback...');
    }

    // Fallback to Microsoft Translator (free tier)
    try {
      const result = await this.translateWithMicrosoft(text, targetLang, sourceLang);
      this.setCachedTranslation(text, targetLang, result.translatedText);
      return result.translatedText;
    } catch (error) {
      console.warn('Microsoft Translator failed, trying Google...');
    }

    // Final fallback to Google Translate (free tier)
    try {
      const result = await this.translateWithGoogle(text, targetLang, sourceLang);
      this.setCachedTranslation(text, targetLang, result.translatedText);
      return result.translatedText;
    } catch (error) {
      console.error('All translation services failed:', error);
      return text; // Return original text if all translations fail
    }
  }

  // Batch translate multiple texts
  async translateBatch(texts: string[], targetLang: string, sourceLang: string = 'en'): Promise<string[]> {
    const results: string[] = [];
    
    for (const text of texts) {
      try {
        const translation = await this.translate(text, targetLang, sourceLang);
        results.push(translation);
        
        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Failed to translate: ${text}`, error);
        results.push(text); // Fallback to original text
      }
    }
    
    return results;
  }

  // Auto-translate missing keys in your translation object
  async autoTranslateMissingKeys(translations: Record<string, Record<string, string>>): Promise<Record<string, Record<string, string>>> {
    const sourceLang = 'en';
    const targetLangs = ['fr', 'ar'];
    
    for (const targetLang of targetLangs) {
      if (!translations[targetLang]) {
        translations[targetLang] = {};
      }
      
      // Find missing keys
      const missingKeys = Object.keys(translations[sourceLang]).filter(
        key => !translations[targetLang][key]
      );
      
      if (missingKeys.length > 0) {
        console.log(`Translating ${missingKeys.length} missing keys to ${targetLang}...`);
        
        // Translate missing keys
        for (const key of missingKeys) {
          try {
            const translation = await this.translate(translations[sourceLang][key], targetLang, sourceLang);
            translations[targetLang][key] = translation;
            console.log(`Translated: ${key} -> ${translation}`);
            
            // Add delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 200));
          } catch (error) {
            console.error(`Failed to translate key: ${key}`, error);
            translations[targetLang][key] = translations[sourceLang][key]; // Fallback
          }
        }
      }
    }
    
    return translations;
  }
}

// Hook for easy use in components
export const useTranslation = () => {
  const { language, t } = useLanguage();
  const translationService = TranslationService.getInstance();

  const translateText = async (text: string, targetLang?: string) => {
    const target = targetLang || language;
    if (target === 'en') return text;
    
    try {
      return await translationService.translate(text, target, 'en');
    } catch (error) {
      console.error('Translation failed:', error);
      return text;
    }
  };

  return { translateText, language, t };
};

export default TranslationService; 