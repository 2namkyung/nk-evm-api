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
} = config;

let WS, HTTP;
function providerInit() {
  switch (NETWORK) {
    case 'ETH':
      WS = MAINNET_INFURA_WS;
      HTTP = MAINNET_INFURA_URL;
      break;

    case 'MATIC':
      WS = POLYGON_ALCHEMY_WS;
      HTTP = POLYGON_ALCHEMY_URL;
      break;

    case 'MUMBAI':
      WS = MUMBAI_ALCHEMY_WS;
      HTTP = MUMBAI_ALCHEMY_URL;
      break;

    default:
      throw new Error('Invalid Blockchain Network');
  }
}

providerInit();

export const webSocketProvider = new ethers.WebSocketProvider(WS);

export const jsonRpcProvider = new ethers.JsonRpcProvider(HTTP);
