# Fogbound Signals

**Fogbound Signals** is a tense, atmospheric, and mysterious signal-hunting survival game built on Base Mainnet.

## Game Concept
You are a lone **Signal Hunter** navigating a vast, fog-shrouded world where visibility is nearly zero. You must send, receive, and interpret faint signals to navigate, find safe havens, uncover lost stories, and survive the unknown dangers lurking in the mist.

## Core Gameplay
- Slow, deliberate exploration in a dense, dynamic fog environment.
- Tap and hold to send **Signal Pulses** that reveal nearby terrain, objects, and threats for a short time.
- Follow faint returning echoes to navigate toward points of interest.
- Manage limited **Battery**, **Oxygen**, and **Sanity** while exploring deeper into the fog.
- On-chain features powered by Base Mainnet.

## 🤖 ERC-8004 Trustless Agent Integration

This project includes the **Fogbound Signals Orchestrator**, an ERC-8004 compliant Trustless AI Agent that handles fog navigation and signal detection.

- **Agent Identity**: \`0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6\`
- **Capabilities**:
  - Fog navigation
  - Signal detection in low visibility
  - Mysterious signal orchestration
  - Bound communication management

You can inspect the agent's identity via the Agent Card standard (`/.well-known/agent-card.json`) and interact with it through the MCP Server endpoints (`/api/mcp` & `/api/agent`).

## Technology Stack
- React + Vite
- Tailwind CSS & Framer Motion
- React Canvas for the game engine
- Wagmi & Viem for Base Mainnet integrations
- ERC-8021 Transaction Attribution
- ERC-8004 AI Agent

## Running Locally

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

The game will be available at \`http://localhost:3000\`.
