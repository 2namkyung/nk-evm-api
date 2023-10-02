import { ethers } from 'ethers';

import config from '../config';

const {
  MAINNET_INFURA_WS,
  MAINNET_INFURA_URL,
  POLYGON_ALCHEMY_URL,
  POLYGON_ALCHEMY_WS,
  MUMBAI_ALCHEMY_WS,
  MUMBAI_ALCHEMY_URL,
  NETWORK,
  PRIVATE_KEY,
} = config;

let ws: string | null;
let http: string | null;

function providerInit() {
  switch (NETWORK) {
    case 'ETH':
      ws = MAINNET_INFURA_WS;
      http = MAINNET_INFURA_URL;
      break;

    case 'MATIC':
      ws = POLYGON_ALCHEMY_WS;
      http = POLYGON_ALCHEMY_URL;
      break;

    case 'MUMBAI':
      ws = MUMBAI_ALCHEMY_WS;
      http = MUMBAI_ALCHEMY_URL;
      break;

    default:
      throw new Error('Invalid Blockchain Network');
  }
}

providerInit();

export const jsonRpcProvider = new ethers.JsonRpcProvider(http);
export const webSocketProvider = new ethers.WebSocketProvider(ws);

export const signer = new ethers.Wallet(PRIVATE_KEY, jsonRpcProvider);
