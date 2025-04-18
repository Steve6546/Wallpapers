// API route for /api/settings

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Authorization');
  
  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Handle GET request
  if (req.method === 'GET') {
    // Return null to indicate no settings are saved
    // This will prompt the user to enter their API key
    return res.status(404).json(null);
  }
  
  // Handle POST request
  if (req.method === 'POST') {
    // Save settings (in a real app, this would store to a database)
    // For now, just return success
    return res.status(200).json(null);
  }
  
  // Handle other methods
  return res.status(405).json({ error: 'Method not allowed' });
}