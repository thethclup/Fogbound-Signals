# Fogbound Signals

**Fogbound Signals** is a tense, atmospheric, and mysterious signal-hunting survival game built on Base Mainnet.

## Game Concept
You are a lone **Signal Hunter** navigating a vast, fog-shrouded world where visibility is nearly zero. You must send, receive, and interpret faint signals to navigate, find safe havens, uncover lost stories, and survive the unknown dangers lurking in the mist.

## Core Gameplay
- Slow, deliberate exploration in a dense, dynamic fog environment.
- Tap and hold to send **Signal Pulses** that reveal nearby terrain, objects, and threats.
- Follow faint returning echoes to navigate toward points of interest.
- Manage limited **Battery**, **Oxygen**, and **Sanity** while exploring.
- On-chain action powered by Base Mainnet.

## 🤖 ERC-8004 Trustless Agent Integration

The **Fogbound Signals Orchestrator** is an ERC-8004 compliant AI Agent that powers real-time interactions, survival mechanics, and fog coordination.

### Capabilities & Skills
- **Fog Navigation:** Navigate through dense fog and low-visibility areas with high precision.
- **Signal Detection:** Detect, decode, and track mysterious signals and echoes in the unknown.
- **Signal Orchestration:** Manage and orchestrate signal logic and survival mechanics.
- **Environmental Awareness:** Monitor oxygen, sanity, and battery levels in the procedural world.
- **Command Execution:** Execute critical commands via MCP protocols.
- **Bound Communication:** Handle trustless communications between outposts and survivors.

### Model Context Protocol (MCP) Connection Guide

This application fully supports MCP to expose tools, prompts, and resources. 
Agent registration uses standard EIP-8004 capabilities:

- **Agent Card URL:** `https://fogboundsignals.vercel.app/.well-known/agent-card.json`
- **MCP Endpoint:** `https://fogboundsignals.vercel.app/api/mcp`
- **Agent Info Endpoint:** `https://fogboundsignals.vercel.app/api/agent`

To connect via MCP, send a `POST` request to `/api/mcp` with standard JSON payloads like:
- `{"action": "tools/list"}`
- `{"action": "tools/call", "params": {"name": "start_race"}}`
- `{"action": "status"}`

Available MCP Tools:
- `get_race_status`
- `start_race`
- `get_leaderboard`
- `optimize_speed`
- `get_track_info`

## Technology Stack
- Next.js 14 App Router / Vite + Express
- Tailwind CSS & Framer Motion
- React Canvas for the game engine
- Wagmi & Viem for Base Mainnet integrations
- ERC-8021 Transaction Attribution
- ERC-8004 AI Agent Specification

## Running Locally

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The game and its APIs will be available at `http://localhost:3000`.
