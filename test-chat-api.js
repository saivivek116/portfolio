// Test script for the Chat API
// Run this with: node test-chat-api.js

const API_BASE_URL = 'http://localhost:3000'; // Adjust if your dev server runs on a different port

async function testChatAPI() {
  console.log('🧪 Testing Portfolio Chat Assistant API...\n');

  try {
    // Test 1: Health check
    console.log('1. Testing health check (GET /api/chat)...');
    const healthResponse = await fetch(`${API_BASE_URL}/api/chat`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData.message);

    // Test 2: Professional query
    console.log('\n2. Testing professional query...');
    const professionalQuery = {
      message: "What programming languages and technologies do you have experience with?",
      conversationHistory: []
    };

    const profResponse = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(professionalQuery),
    });

    if (profResponse.body) {
      console.log('✅ Professional query streaming response:');
      const reader = profResponse.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.content) {
                fullResponse += data.content;
                process.stdout.write(data.content);
              }
              if (data.done) {
                console.log('\n✅ Professional query completed!\n');
                break;
              }
            } catch (e) {
              // Ignore parsing errors for incomplete chunks
            }
          }
        }
      }
    }

    // Test 3: Non-professional query
    console.log('3. Testing non-professional query...');
    const casualQuery = {
      message: "What's your favorite pizza topping?",
      conversationHistory: []
    };

    const casualResponse = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(casualQuery),
    });

    if (casualResponse.body) {
      console.log('✅ Non-professional query streaming response:');
      const reader = casualResponse.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.content) {
                process.stdout.write(data.content);
              }
              if (data.done) {
                console.log('\n✅ Non-professional query completed!\n');
                break;
              }
            } catch (e) {
              // Ignore parsing errors for incomplete chunks
            }
          }
        }
      }
    }

    // Test 4: Error handling
    console.log('4. Testing error handling...');
    const errorResponse = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: '' }), // Empty message should trigger error
    });

    const errorData = await errorResponse.json();
    if (errorResponse.status === 400) {
      console.log('✅ Error handling works:', errorData.error);
    } else {
      console.log('❌ Error handling failed');
    }

    console.log('\n🎉 All tests completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Make sure:');
    console.log('1. Your development server is running (npm run dev)');
    console.log('2. Environment variables are set in .env.local');
    console.log('3. Pinecone database is populated with your resume data');
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  testChatAPI();
}

module.exports = { testChatAPI };
