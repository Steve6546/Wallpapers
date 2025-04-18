// API route for /api/conversations/[conversationId]

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
  
  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Get conversation ID from the URL
  const { conversationId } = req.query;
  
  // Handle GET request
  if (req.method === 'GET') {
    // Return mock conversation
    const conversation = {
      conversation_id: conversationId,
      title: "Conversation " + conversationId,
      selected_repository: null,
      last_updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      status: "RUNNING",
    };
    
    return res.status(200).json(conversation);
  }
  
  // Handle PATCH request (update title)
  if (req.method === 'PATCH') {
    return res.status(200).json(null);
  }
  
  // Handle DELETE request
  if (req.method === 'DELETE') {
    return res.status(200).json(null);
  }
  
  // Handle other methods
  return res.status(405).json({ error: 'Method not allowed' });
}