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
      const { action, command, task, params, method, id } = body;
      
      const cmd = (method || action || command || task || "").toLowerCase();

      let result: any = {};

      switch (cmd) {
        case "initialize":
          result = {
            protocolVersion: "2024-11-05",
            capabilities: { tools: {}, prompts: {}, resources: {} },
            serverInfo: { name: "Fogbound Signals Orchestrator", version: "1.0.0" }
          };
          break;

        case "status":
        case "ping":
          result = { 
            status: "online", 
            agent: "Fogbound Signals Orchestrator",
            message: "Signals piercing through the fog - Ready" 
          };
          break;

        case "tools/list":
          result = {
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
          };
          break;

        case "tools/call":
          result = {
            success: true,
            tool: params?.name || "unknown",
            result: `Executed tool ${params?.name || "command"} via MCP`,
            executedAt: new Date().toISOString()
          };
          break;

        case "prompts/list":
          result = { prompts: [] };
          break;

        case "resources/list":
          result = { resources: [] };
          break;

        case "execute":
          result = {
            success: true,
            executed: params || command,
            executedAt: new Date().toISOString(),
            message: "Signal successfully transmitted through the fog"
          };
          break;

        case "get_info":
          result = {
            name: "Fogbound Signals Orchestrator",
            wallet: "0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6",
            platform: "Base",
            version: "1.0.0"
          };
          break;

        default:
          result = {
            success: true,
            message: "Signal received in the fog",
            data: body
          };
      }

      if (method && id !== undefined) {
        return res.status(200).json({
          jsonrpc: "2.0",
          id: id,
          result: result
        });
      }

      return res.status(200).json({
        status: "success",
        agent: "Fogbound Signals Orchestrator",
        response: result,
        result: result,
        tools: result.tools || [],
        prompts: result.prompts || [],
        resources: result.resources || [],
        receivedAt: new Date().toISOString()
      });

    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: "Failed to process signal in the fog"
      });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
