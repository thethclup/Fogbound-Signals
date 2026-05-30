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
      protocol: "MCP",
      version: "1.0.0",
      name: "Fogbound Signals Orchestrator MCP",
      status: "active",
      description: "Active MCP server for Fogbound Signals Orchestrator",
      capabilities: {
        tools: true,
        prompts: true,
        resources: true
      },
      timestamp: new Date().toISOString()
    });
  }

  if (req.method === 'POST') {
    try {
      const body = req.body || {};
      const { action, command, task, params } = body;
      
      const cmd = (action || command || task || "").toLowerCase();

      switch (cmd) {
        case "initialize":
        case "status":
        case "ping":
          return res.status(200).json({ 
            status: "online", 
            agent: "Fogbound Signals Orchestrator",
            message: "Signals piercing through the fog - Ready" 
          });

        case "tools/list":
          // return exact root-level tools structure
          return res.status(200).json({
            tools: [
              {
                name: "get_race_status",
                description: "Get the current status of the race/exploration",
                inputSchema: { type: "object", properties: {}, required: [] }
              },
              {
                name: "start_race",
                description: "Start a new race or exploration instance",
                inputSchema: { type: "object", properties: {}, required: [] }
              },
              {
                name: "get_leaderboard",
                description: "Get the current leaderboard of Bravest Signal Hunters",
                inputSchema: { type: "object", properties: {}, required: [] }
              },
              {
                name: "optimize_speed",
                description: "Optimize speed and coordinate exploration mechanics",
                inputSchema: { type: "object", properties: {}, required: [] }
              },
              {
                name: "get_track_info",
                description: "Retrieve information about the current track or area in the fog",
                inputSchema: { type: "object", properties: {}, required: [] }
              }
            ]
          });

        case "tools/call":
          return res.status(200).json({
            success: true,
            tool: params?.name || "unknown",
            result: `Executed tool ${params?.name || "command"} via MCP`,
            executedAt: new Date().toISOString()
          });

        case "prompts/list":
          return res.status(200).json({ prompts: [] });

        case "resources/list":
          return res.status(200).json({ resources: [] });

        case "execute":
          return res.status(200).json({
            success: true,
            executed: params || command,
            executedAt: new Date().toISOString(),
            message: "Signal successfully transmitted through the fog"
          });

        case "get_info":
          return res.status(200).json({
            name: "Fogbound Signals Orchestrator",
            wallet: "0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6",
            platform: "Base",
            version: "1.0.0"
          });

        default:
          return res.status(200).json({
            success: true,
            message: "Signal received in the fog",
            data: body
          });
      }
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: "Failed to process signal in the fog"
      });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
