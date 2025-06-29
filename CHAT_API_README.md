# Environment Variables Required for Portfolio Chat Assistant

Add these environment variables to your `.env.local` file:

```bash
# Google AI API Key for Gemini models (both embedding and chat)
GOOGLE_API_KEY=your-google-ai-api-key-here

# Pinecone Configuration
PINECONE_API_KEY=your-pinecone-api-key-here
PINECONE_INDEX=your-pinecone-index-name-here
```

## How to Get API Keys:

### Google AI API Key (Gemini):
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Click on "Get API Key"
4. Create a new API key or use an existing one
5. Copy the API key and add it to your environment variables

### Pinecone API Key:
1. Go to [Pinecone Console](https://app.pinecone.io/)
2. Sign in or create an account
3. Go to "API Keys" in the left sidebar
4. Copy your API key
5. Note your index name from the "Indexes" section

## Usage:

1. Make sure your Pinecone database is populated with your resume data (using the script in `src/scripts/index.ts`)
2. Add the environment variables to `.env.local`
3. The chat API will be available at `/api/chat`
4. Integrate the `ChatAssistant` component into your portfolio pages

## API Endpoints:

- `GET /api/chat` - Health check endpoint
- `POST /api/chat` - Chat with the assistant

### POST Request Format:
```json
{
  "message": "What is your experience with React?",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Previous user message",
    },
    {
      "role": "assistant", 
      "content": "Previous assistant response"
    }
  ]
}
```

### Response Format:
Server-Sent Events (SSE) stream with JSON chunks:
```json
{"content": "partial response text"}
{"content": " more text"}
{"done": true}
```
