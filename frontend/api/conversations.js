// API route for /api/conversations

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
    // Return mock conversations
    const conversations = [
      {
        conversation_id: "1",
        title: "My New Project",
        selected_repository: null,
        last_updated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        status: "RUNNING",
      },
      {
        conversation_id: "2",
        title: "Repo Testing",
        selected_repository: "octocat/hello-world",
        last_updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: "STOPPED",
      },
    ];
    
    const results = {
      results: conversations,
      next_page_id: null,
    };
    
    return res.status(200).json(results);
  }
  
  // Handle POST request
  if (req.method === 'POST') {
    const conversation = {
      conversation_id: Math.floor(Math.random() * 1000).toString(),
      title: "New Conversation",
      selected_repository: null,
      last_updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      status: "RUNNING",
    };
    
    return res.status(201).json(conversation);
  }
  
  // Handle other methods
  return res.status(405).json({ error: 'Method not allowed' });
}