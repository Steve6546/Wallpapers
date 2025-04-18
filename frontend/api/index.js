// This file is required for Vercel API routes
// It redirects all API requests to the mock API handlers

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
  
  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // For now, just return a 200 response for all API requests
  // In a real implementation, you would handle the API requests here
  // or proxy them to your backend server
  return res.status(200).json({ message: 'API route handled by Vercel serverless function' });
}