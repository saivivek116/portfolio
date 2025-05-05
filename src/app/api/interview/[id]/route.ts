import { NextRequest, NextResponse } from "next/server";
import redis from "../../../../lib/redis";

// Prefix for interview question keys
const INTERVIEW_PREFIX = "interview:";

// GET a specific question by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // In Next.js 15+, params is a Promise that needs to be awaited
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Question ID is required" },
        { status: 400 }
      );
    }
    
    const key = `${INTERVIEW_PREFIX}${id}`;
    
    // Fetch the question data
    const data = await redis.get(key);
    
    if (!data) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }
    
    try {
      // Handle different formats of data that might be stored in Redis
      let parsedData;
      
      // Check if the value is already an object
      if (typeof data === 'object') {
        parsedData = data;
      } else {
        // If it's a string that contains "[object Object]", it was improperly stringified
        if (data === "[object Object]") {
          return NextResponse.json(
            { error: "Question data is corrupted" },
            { status: 500 }
          );
        } else {
          // Try to parse as JSON
          parsedData = JSON.parse(data);
        }
      }
      
      // Parse the stored JSON and include the ID
      return NextResponse.json({ id, ...parsedData });
    } catch (parseError) {
      console.error(`Error parsing JSON for question ${id}:`, parseError);
      return NextResponse.json(
        { error: "Question data is corrupted" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error fetching question:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PUT to update a question
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // In Next.js 15+, params is a Promise that needs to be awaited
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { error: "Question ID is required" },
        { status: 400 }
      );
    }
    
    const key = `${INTERVIEW_PREFIX}${id}`;
    const body = await request.json();
    
    // Check if question exists
    const exists = await redis.exists(key);
    
    if (!exists) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }
    
    const { question, answers } = body;
    
    if (!question || !answers || !Array.isArray(answers)) {
      return NextResponse.json(
        { error: "Missing required fields or invalid format" },
        { status: 400 }
      );
    }
    
    // Ensure we're always storing JSON string, not object
    const dataToStore = JSON.stringify({ question, answers });
    
    // Update the question
    await redis.set(key, dataToStore);
    
    return NextResponse.json(
      { message: "Question updated successfully", id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating question:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE a question
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // In Next.js 15+, params is a Promise that needs to be awaited
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { error: "Question ID is required" },
        { status: 400 }
      );
    }
    
    const key = `${INTERVIEW_PREFIX}${id}`;
    
    // Check if question exists
    const exists = await redis.exists(key);
    
    if (!exists) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }
    
    // Delete the question
    await redis.del(key);
    
    return NextResponse.json(
      { message: "Question deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting question:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}