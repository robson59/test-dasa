const isDevEnv = process.env.NODE_ENV === 'development';

export default {
  // App Details
  appName: 'DasaTest',

  // Build Configuration - eg. Debug or Release?
  isDevEnv,

  // Date Format
  dateFormat: 'Do MMM YYYY',

  // API
  apiBaseUrl: isDevEnv
    ? 'https://api.github.com/'
    : 'https://api.github.com/',
};
