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
      capabilities: {
        tools: true,
        prompts: true,
        resources: true
      },
      timestamp: new Date().toISOString()
    });
  });

  app.post("/api/mcp", (req, res) => {
    try {
      const body = req.body;
      const { action, command, params, task, method, id } = body;

      const cmd = (method || action || command || task || "").toLowerCase();

      switch (cmd) {
        case "initialize":
          return res.json({
            protocolVersion: "2024-11-05",
            capabilities: { tools: {}, prompts: {}, resources: {} },
            serverInfo: { name: "Fogbound Signals Orchestrator", version: "1.0.0" }
          });
        case "status":
        case "ping":
          return res.json({ 
            status: "online", 
            agent: "Fogbound Signals Orchestrator",
            message: "Signals piercing through the fog - Ready" 
          });

        case "tools/list":
          return res.json({
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
          return res.json({
            success: true,
            tool: params?.name || "unknown",
            result: `Executed tool ${params?.name || "command"} via MCP`,
            executedAt: new Date().toISOString()
          });

        case "prompts/list":
          return res.json({ prompts: [] });

        case "resources/list":
          return res.json({ resources: [] });

        case "execute":
          return res.json({
            success: true,
            executed: params || command,
            executedAt: new Date().toISOString(),
            message: "Signal successfully transmitted through the fog"
          });

        case "get_info":
          return res.json({
            name: "Fogbound Signals Orchestrator",
            wallet: "0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6",
            platform: "Base",
            version: "1.0.0"
          });

        default:
          return res.json({
            success: true,
            message: "Signal received in the fog",
            data: body
          });
      }
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
