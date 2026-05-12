import { toHex, concat } from 'viem';

export const BASE_BUILDER_CODE = 'bc_pser6cou';

/**
 * ERC-8021: Transaction Attribution Extension
 * Attaches attribution data (builder code) to the calldata of a transaction.
 */
export function generateAttributionData(originalData: `0x${string}`, builderCode: string = BASE_BUILDER_CODE): `0x${string}` {
  const attributionHex = toHex(builderCode);
  return concat([originalData, attributionHex]);
}
