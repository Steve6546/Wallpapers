# Deploying OpenHands to Vercel with OpenRouter

This guide explains how to deploy the OpenHands frontend to Vercel with OpenRouter integration.

## Prerequisites

1. A GitHub account
2. A Vercel account (you can sign up with your GitHub account)
3. A fork of the OpenHands repository
4. An OpenRouter account and API key (get one at [openrouter.ai](https://openrouter.ai/keys))

## Deployment Steps

1. **Fork the Repository**
   - Go to the [OpenHands repository](https://github.com/All-Hands-AI/OpenHands)
   - Click the "Fork" button in the top right corner
   - Wait for the fork to complete

2. **Connect to Vercel**
   - Go to [Vercel](https://vercel.com/)
   - Sign in with your GitHub account
   - Click "Add New..." and select "Project"
   - Find and select your forked OpenHands repository
   - In the configuration screen:
     - Framework Preset: Vite
     - Root Directory: frontend
     - Build Command: npm run build
     - Output Directory: build

3. **Environment Variables**
   - Add the following environment variables:
     - `VITE_MOCK_API`: true
     - `VITE_USE_TLS`: false
     - `VITE_INSECURE_SKIP_VERIFY`: false
     - `VITE_FRONTEND_PORT`: 3000
     - `OPENROUTER_API_KEY`: Your OpenRouter API key (optional, can be set in the UI later)

4. **Deploy**
   - Click "Deploy"
   - Wait for the deployment to complete

## Setting Up OpenRouter

After deployment, you'll need to set up your OpenRouter API key in the application:

1. Open your deployed application
2. Go to Settings
3. Enter your OpenRouter API key
4. Select a model (free models are marked with a "Free" badge)
5. Save your settings

## Using Free vs. Paid Models

OpenHands now supports both free and paid models from OpenRouter:

### Free Models
- Mistral 7B
- Llama 3 8B
- Gemma 7B
- And others

These models don't require credits on your OpenRouter account.

### Paid Models
- GPT-4o
- Claude 3.5 Sonnet
- And others

These models require credits on your OpenRouter account.

## Troubleshooting

If you encounter a 404 error after deployment:

1. **Check Environment Variables**
   - Make sure `VITE_MOCK_API` is set to `true`
   - Verify other environment variables are set correctly

2. **Verify Build Settings**
   - Ensure the build command is `npm run build`
   - Ensure the output directory is `build`

3. **Check Vercel Configuration**
   - Verify that the `vercel.json` file is present in your repository
   - Ensure it contains the correct rewrites and environment variables

4. **API Key Issues**
   - If you're having trouble with your OpenRouter API key:
     - Verify the key is correct
     - Check if you have sufficient credits for paid models
     - Try using a free model instead

5. **Redeploy**
   - If you've made changes, redeploy your application
   - In the Vercel dashboard, go to your project and click "Redeploy"

## Using the Mock API

This deployment uses a mock API to simulate the backend functionality, but with real OpenRouter integration. This means:

1. You can interact with the UI and use real AI models through OpenRouter
2. Conversation data is not persistent between page refreshes
3. Some advanced features may not work as expected

To use a full backend, you would need to deploy the backend separately and configure the frontend to connect to it.