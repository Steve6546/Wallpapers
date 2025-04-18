// API route for /api/options/config

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
  
  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Return mock config
  const config = {
    APP_MODE: "oss",
    GITHUB_CLIENT_ID: "",
    POSTHOG_CLIENT_KEY: "",
    FEATURE_FLAGS: {
      ENABLE_BILLING: false,
      HIDE_LLM_SETTINGS: false,
    },
  };
  
  return res.status(200).json(config);
}