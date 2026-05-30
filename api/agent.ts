import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      name: "Fogbound Signals Orchestrator",
      description: "Navigator through fog and hidden signals on Base Mainnet.",
      status: "active",
      wallet: "0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6",
      platform: "Fogbound Signals",
      version: "1.0.0",
      type: "ERC-8004 Agent",
      lastUpdated: new Date().toISOString()
    });
  }

  if (req.method === 'POST') {
    try {
      const body = req.body || {};
      return res.status(200).json({
        status: "success",
        message: "Agent received the payload.",
        receivedTimestamp: new Date().toISOString(),
        data: body
      });
    } catch (error) {
      return res.status(400).json({ status: "error", message: "Invalid JSON payload" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
