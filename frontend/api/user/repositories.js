// API route for /api/user/repositories

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
  
  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Handle GET request
  if (req.method === 'GET') {
    // Return mock repositories
    const repositories = [
      { id: 1, full_name: "octocat/hello-world" },
      { id: 2, full_name: "octocat/earth" },
    ];
    
    return res.status(200).json(repositories);
  }
  
  // Handle other methods
  return res.status(405).json({ error: 'Method not allowed' });
}