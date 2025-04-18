// API route for /api/user/info

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
    // Return mock user info
    const user = {
      id: 1,
      login: "user",
      avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4",
      company: "OpenHands",
      email: "user@example.com",
      name: "OpenHands User",
    };
    
    return res.status(200).json(user);
  }
  
  // Handle other methods
  return res.status(405).json({ error: 'Method not allowed' });
}