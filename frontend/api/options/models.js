// API route for /api/options/models
// This endpoint returns a list of available models from OpenRouter

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Authorization');
  
  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Handle GET request
  if (req.method === 'GET') {
    try {
      // Get API key from request headers
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // If no API key is provided, return a default list of models
        return res.status(200).json([
          "gpt-3.5-turbo",
          "gpt-4o",
          "anthropic/claude-3.5-sonnet",
          "anthropic/claude-3-opus",
          "mistralai/mistral-7b-instruct",
          "meta-llama/llama-3-8b-instruct",
          "google/gemma-7b-it"
        ]);
      }
      
      const apiKey = authHeader.split(' ')[1];
      
      // Fetch models from OpenRouter API
      const response = await fetch('https://openrouter.ai/api/v1/models', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`OpenRouter API returned ${response.status}`);
      }
      
      const data = await response.json();
      
      // Extract model IDs and format them
      // Include both free and paid models
      const models = data.data.map(model => {
        // For Anthropic models, prefix with "anthropic/"
        if (model.id.includes('claude')) {
          return `anthropic/${model.id}`;
        }
        return model.id;
      });
      
      // Return the list of models
      return res.status(200).json(models);
    } catch (error) {
      console.error('Error fetching models:', error);
      
      // Return a fallback list of models in case of error
      return res.status(200).json([
        "gpt-3.5-turbo",
        "gpt-4o",
        "anthropic/claude-3.5-sonnet",
        "anthropic/claude-3-opus",
        "mistralai/mistral-7b-instruct",
        "meta-llama/llama-3-8b-instruct",
        "google/gemma-7b-it"
      ]);
    }
  }
  
  // Handle other methods
  return res.status(405).json({ error: 'Method not allowed' });
}