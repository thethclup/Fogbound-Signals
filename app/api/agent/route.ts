import { NextResponse } from 'next/server';

/**
 * Fogbound Signals Orchestrator - Agent Info Endpoint
 * 
 * Provides basic agent identity and status information.
 * Used for ERC-8004 discovery, A2A communication, and platform integrations.
 */

export async function GET() {
  return NextResponse.json({
    name: "Fogbound Signals Orchestrator",
    description: "Navigator through fog and hidden signals on Base Mainnet.",
    status: "active",
    wallet: "0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6",
    platform: "Fogbound Signals",
    version: "1.0.0",
    type: "ERC-8004 Agent",
    lastUpdated: new Date().toISOString()
  }, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({
      status: "success",
      message: "Agent received the payload.",
      receivedTimestamp: new Date().toISOString(),
      data: body
    }, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
      }
    });
  } catch (error) {
    return NextResponse.json({ status: "error", message: "Invalid JSON payload" }, { status: 400 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }
  });
}
