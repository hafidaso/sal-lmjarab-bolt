module.exports = {
  sourceLocale: "en",
  targetLocales: ["fr", "ar"],
  // Your API key will be read from LINGODOTDEV_API_KEY environment variable
  // or you can set it here: apiKey: "your_api_key_here"
  
  // Configure which files to scan for translations
  files: [
    "src/**/*.{ts,tsx,js,jsx}",
  ],
  
  // Configure the output format
  output: {
    format: "json",
    path: "src/locales",
  },
  
  // Optional: Configure translation memory and quality checks
  quality: {
    enabled: true,
    checks: ["spelling", "grammar", "consistency"],
  },
}; 