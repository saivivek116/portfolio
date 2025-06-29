import { NextResponse } from 'next/server';
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";

export async function GET(_request) {
  try {
    return NextResponse.json({ message: 'Portfolio Chat Assistant API - Ready to help visitors learn about your background!' });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { message, conversationHistory = [] } = body;
    console.log(message, "message")
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }


    const embeddings = new GoogleGenerativeAIEmbeddings({
      model: "embedding-001",
      apiKey: process.env.GOOGLE_API_KEY,
    });

    // Initialize Pinecone client
    const pinecone = new PineconeClient({
      apiKey: process.env.PINECONE_API_KEY,
    });
    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);

    // Create Pinecone vector store with explicit namespace (same as indexing)
    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex,
      namespace: "", // Explicitly set empty namespace to match indexing script
    });

    // Perform similarity search using Langchain PineconeStore
    const relevantDocs = await vectorStore.similaritySearch(message, 6);
    console.log('Retrieved docs:', relevantDocs.length);
    
    const context = relevantDocs.map(doc => doc.pageContent).join('\n\n');
    console.log('Context:', context);

    // Check if the query is related to professional information
    const isRelevantQuery = await checkQueryRelevance(message, context);
    // Initialize the LLM for response generation
    const llm = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash",
      apiKey: process.env.GOOGLE_API_KEY,
      temperature: 0,
      streaming: true,
    });

    let promptTemplate;
    
    if (isRelevantQuery && context.trim()) {
      // Professional query - use RAG with context
      promptTemplate = PromptTemplate.fromTemplate(`
You are Bruce, a friendly and professional AI chat assistant representing Sai Vivek's portfolio website. Your role is to help visitors learn about Sai Vivek's professional background, skills, experiences, and qualifications.

CONTEXT FROM SAI VIVEK'S RESUME/PORTFOLIO:
{context}


CURRENT QUESTION: {question}

GUIDELINES:
1. RESPONSE LENGTH: Keep responses concise and focused. Aim for 2-4 sentences maximum unless the question specifically requires detailed explanation.

2. FORMATTING: Use plain text without markdown formatting. No asterisks (*), hashtags (#), or other special characters for emphasis. Use simple line breaks and natural language flow.

3. PROFESSIONAL FOCUS: Answer questions about Sai Vivek's education, work experience, skills, projects, certifications, and career achievements based ONLY on the provided context.

4. ACCURACY: Use only information from the context provided. If specific details aren't available, briefly mention what information is available.

5. TONE: Be conversational, helpful, and confident. Speak as if you're a knowledgeable colleague introducing Sai Vivek to someone.

6. STRUCTURE: Use natural conversation flow. If listing items, use simple phrases separated by commas or short sentences.

7. Make sure the response is clear and complete. Do not cut in the middle of something.

Example:
query: tell me where did sai vivek complete his masters
answer: Sai vivek completed his masters from George mason university

query: tell me where is he working currently
answer: Sai Vivk
Answer naturally and concisely:`);
    } else {
      // Non-professional query - polite redirect
      promptTemplate = PromptTemplate.fromTemplate(`
You are Bruce, a friendly AI assistant for Sai Vivek's portfolio website. The visitor has asked a question that's not related to Sai Vivek's professional background.

VISITOR'S QUESTION: {question}

CONVERSATION HISTORY:
{history}

GUIDELINES:
1. RESPONSE LENGTH: Keep it brief and friendly - 1-2 sentences maximum.

2. FORMATTING: Use plain text without any markdown formatting. No asterisks, hashtags, or special characters.

3. POLITE REDIRECT: Acknowledge their question with light humor, then gently redirect to professional topics about Sai Vivek.

4. VALUE PROPOSITION: Briefly mention what you CAN help with regarding Sai Vivek's background.

5. MEETING INVITATION: Suggest connecting directly for non-professional inquiries.

6. TONE: Keep it conversational, friendly, and slightly humorous without being dismissive.

Create a brief, friendly response that redirects to professional topics about Sai Vivek while offering a meeting option.

Answer naturally and concisely:`);
    }

    // Create the conversation history string
    const historyString = conversationHistory
      .slice(-6) // Keep only last 6 messages for context
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n');

    // Create the chain
    const chain = RunnableSequence.from([
      promptTemplate,
      llm,
      new StringOutputParser(),
    ]);

    // Create a readable stream for the response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const streamResponse = await chain.stream({
            context: context,
            history: historyString,
            question: message,
          });

          for await (const chunk of streamResponse) {
            const data = `data: ${JSON.stringify({ content: chunk })}\n\n`;
            controller.enqueue(encoder.encode(data));
          }

          // Send end signal
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
          controller.close();
        } catch (error) {
          console.error('Streaming error:', error);
          const errorData = `data: ${JSON.stringify({ error: 'An error occurred while generating the response' })}\n\n`;
          controller.enqueue(encoder.encode(errorData));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again.' },
      { status: 500 }
    );
  }
}

// Helper function to determine if query is professionally relevant
async function checkQueryRelevance(query, context) {
  const professionalKeywords = [
    'experience', 'skill', 'education', 'work', 'project', 'qualification',
    'background', 'career', 'job', 'role', 'responsibility', 'achievement',
    'degree', 'certification', 'technology', 'programming', 'development',
    'internship', 'position', 'company', 'university', 'college', 'learn',
    'know', 'expertise', 'proficient', 'familiar', 'trained', 'studied',
    'built', 'created', 'developed', 'implemented', 'designed', 'managed',
    'led', 'collaborated', 'worked on', 'responsible for', 'accomplished'
  ];

  const queryLower = query.toLowerCase();
  const hasRelevantKeywords = professionalKeywords.some(keyword => 
    queryLower.includes(keyword)
  );

  // Also check if we have relevant context from the vector search
  const hasRelevantContext = context && context.trim().length > 0;

  return hasRelevantKeywords || hasRelevantContext;
}

// Helper function to enhance user queries for better retrieval
async function enhanceUserQuery(originalQuery, conversationHistory) {
  // If the query is already comprehensive, return as is
  if (originalQuery.length > 50) {
    return originalQuery;
  }

  // Common query patterns and their enhancements
  const queryEnhancements = {
    // Short technical queries
    'react': 'React JavaScript framework experience and projects',
    'javascript': 'JavaScript programming language skills and experience',
    'python': 'Python programming language skills projects and experience',
    'node': 'Node.js backend development experience and projects',
    'database': 'database management and SQL experience',
    'frontend': 'frontend development skills and technologies',
    'backend': 'backend development experience and technologies',
    'fullstack': 'fullstack development skills and projects',
    'api': 'API development and integration experience',
    'aws': 'AWS cloud services and deployment experience',
    'docker': 'Docker containerization and deployment experience',
    
    // Education queries
    'education': 'educational background degree university college',
    'degree': 'educational degree and academic qualifications',
    'university': 'university education and academic background',
    'college': 'college education and academic experience',
    'study': 'educational background and areas of study',
    
    // Experience queries
    'experience': 'work experience and professional background',
    'work': 'work experience jobs and professional roles',
    'job': 'job experience and employment history',
    'company': 'company work experience and employment',
    'internship': 'internship experience and training',
    
    // Skills queries
    'skills': 'technical skills programming languages and technologies',
    'tech': 'technology skills and technical expertise',
    'programming': 'programming skills languages and development experience',
    'coding': 'coding skills programming languages and projects',
    
    // Project queries
    'projects': 'software projects development and portfolio work',
    'portfolio': 'portfolio projects and development work',
    'built': 'projects built and development experience',
    'created': 'projects created and development work'
  };

  const queryLower = originalQuery.toLowerCase().trim();
  
  // Check for exact matches first
  if (queryEnhancements[queryLower]) {
    return queryEnhancements[queryLower];
  }
  
  // Check for partial matches
  for (const [key, enhancement] of Object.entries(queryEnhancements)) {
    if (queryLower.includes(key)) {
      return enhancement;
    }
  }
  
  // For very short queries, try to infer context from conversation history
  if (originalQuery.length < 20 && conversationHistory.length > 0) {
    const recentContext = conversationHistory
      .slice(-3) // Last 3 messages
      .map(msg => msg.content)
      .join(' ');
    
    // Extract technical terms from recent conversation
    const technicalTerms = recentContext.match(/\b(react|javascript|python|node|aws|docker|database|api|frontend|backend|programming|development|project|experience|skill|education|work|job)\b/gi) || [];
    
    if (technicalTerms.length > 0) {
      return `${originalQuery} ${technicalTerms.join(' ')} experience and background`;
    }
  }
  
  // If no specific enhancement found, add general context
  if (originalQuery.length < 30) {
    return `${originalQuery} professional experience skills and background`;
  }
  
  return originalQuery;
}