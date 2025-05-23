import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

 
export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ copyclipid: string }> }
): Promise<NextResponse> {
    const {copyclipid} = await params;

    if (!copyclipid) {
        return NextResponse.json(
            { error: "copyclipid parameter is required" },
            { status: 400 }
        );
    }

    try {
        const result = await redis.del(`${copyclipid}`);

        if (result === 0) {
            return NextResponse.json(
                { error: "Record not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Record deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting from Redis:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}