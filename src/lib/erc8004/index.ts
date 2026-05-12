/**
 * ERC-8004: Trustless Agents Interface
 * Utility stubs for preparing trustless agent deployments and authorizations
 * within the Fogbound game.
 */

export interface AgentConfig {
  owner: `0x${string}`;
  permissions: `0x${string}`[];
  ttl: number;
}

export function encodeAgentAuthorization(config: AgentConfig): `0x${string}` {
  // Placeholder for ERC-8004 parameter encoding
  return `0x000000000000000000000000${config.owner.slice(2)}`;
}
