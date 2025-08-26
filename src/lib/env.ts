export const ENV = {
  API_BASE_URL:
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Amadeus Travel',
  IS_PRODUCTION: import.meta.env.PROD,
  IS_DEVELOPMENT: import.meta.env.DEV,
} as const;
