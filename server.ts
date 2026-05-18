import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON parsing middleware
  app.use(express.json());

  // API Routes
  app.get("/api/agent", (req, res) => {
    res.json({
      name: "Fogbound Signals Orchestrator",
      description: "Navigator through fog and hidden signals",
      status: "active",
      wallet: "0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6",
      platform: "Fogbound Signals",
      version: "1.0.0",
      type: "ERC-8004 Agent",
      lastUpdated: new Date().toISOString()
    });
  });

  app.get("/api/mcp", (req, res) => {
    res.json({
      protocol: "MCP",
      version: "1.0.0",
      name: "Fogbound Signals MCP Endpoint",
      status: "active",
      description: "Active MCP server for Fogbound Signals Orchestrator",
      capabilities: ["fog-navigation", "signal-detection", "low-visibility-operations"],
      timestamp: new Date().toISOString()
    });
  });

  app.post("/api/mcp", (req, res) => {
    try {
      const body = req.body;
      const { action, command, params, task } = body;

      const cmd = (action || command || task || "").toLowerCase();

      let result: any = {};

      switch (cmd) {
        case "initialize":
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

      res.json({
        status: "success",
        agent: "Fogbound Signals Orchestrator",
        response: result,
        receivedAt: new Date().toISOString()
      });

    } catch (error) {
      res.status(400).json({
        status: "error",
        message: "Failed to process signal in the fog"
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
