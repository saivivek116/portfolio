import { NextRequest, NextResponse } from "next/server";
import redis from "../../../lib/redis";

// Prefix for interview question keys to differentiate from other Redis keys
const INTERVIEW_PREFIX = "interview:";

export async function GET() {
  try {
    // Get all keys with interview prefix
    const keys = await redis.keys(`${INTERVIEW_PREFIX}*`);

    if (!keys || keys.length === 0) {
      return NextResponse.json({ questions: [] });
    }

    // Fetch all values for the retrieved keys
    const values = await redis.mget(...keys);

    // Map keys and values to question objects with improved error handling
    const questions = keys
      .map((key, index) => {
        const value = values[index];
        
        // Skip if value is null
        if (value === null) return null;
        
        // Extract the actual ID from the key (remove prefix)
        const id = key.replace(INTERVIEW_PREFIX, "");
        
        try {
          // Handle different formats of data that might be stored in Redis
          let parsedValue;
          
          // Check if the value is already an object
          if (typeof value === 'object') {
            parsedValue = value;
          } else {
            // If it's a string that contains "[object Object]", it was improperly stringified
            if (value === "[object Object]") {
              console.warn(`Data for key ${key} is "[object Object]" string, not valid JSON. Creating empty structure.`);
              parsedValue = { question: "", answers: [] };
            } else {
              // Try to parse as JSON
              parsedValue = typeof value === 'string' ? JSON.parse(value) : (value || {});
            }
          }
          
          return { id, ...parsedValue };
        } catch (parseError) {
          console.error(`Error parsing JSON for key ${key}:`, parseError, "Raw value:", value);
          // Skip invalid entries instead of breaking the entire response
          return null;
        }
      })
      .filter(Boolean); // Remove any nulls

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Error fetching interview questions from Redis:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, question, answers } = body;

    if (!id || !question || !answers || !Array.isArray(answers)) {
      return NextResponse.json(
        { error: "Missing required fields or invalid format" },
        { status: 400 }
      );
    }

    // Ensure we're always storing JSON string, not object
    const dataToStore = JSON.stringify({ question, answers });
    
    // Store the question and its answers
    const key = `${INTERVIEW_PREFIX}${id}`;
    await redis.set(key, dataToStore);

    return NextResponse.json(
      { message: "Question saved successfully", id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving interview question:", error);
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}