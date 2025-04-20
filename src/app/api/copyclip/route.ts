import { NextRequest, NextResponse } from "next/server"
import redis from "../../../lib/redis"; // Correct relative path

export async function GET(){
    try {
        const keys = await redis.keys('*');

        if (!keys || keys.length === 0) {
            return NextResponse.json({ records: [] });
        }

        // Fetch all values for the retrieved keys
        const values = await redis.mget(...keys);

        // Filter out any potential null values (e.g., if a key expired between KEYS and MGET)
        const records = keys.map((key, index)=>{
            const value = values[index];
            return value!==null ? {id:key, content:value}:null;
        })

        return NextResponse.json({ records });
    } catch (error) {
        console.error("Error fetching clips from Redis:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest){
    try {
        const body = await request.json();
        const { id, content } = body;

        if (!id || !content) {
            return NextResponse.json({ error: "Missing id or content in request body" }, { status: 400 });
        }

        // Store the content in Redis with the provided id
        await redis.set(id, content);

        return NextResponse.json({ message: "Content stored successfully", id }, { status: 201 });
    } catch (error) {
        console.error("Error processing POST request:", error);
        // Check if the error is due to invalid JSON
        if (error instanceof SyntaxError) {
            return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

