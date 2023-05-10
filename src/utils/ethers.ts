import { ethers } from 'ethers';

import config from '../config';

const {
  MAINNET_INFURA_WS,
  MAINNET_INFURA_URL,
  POLYGON_ALCHEMY_URL,
  POLYGON_ALCHEMY_WS,
} = config;

const WS =
  process.env.NETWORK === 'ETH' ? MAINNET_INFURA_WS : POLYGON_ALCHEMY_WS;

const HTTP =
  process.env.NETWORK === 'ETH' ? MAINNET_INFURA_URL : POLYGON_ALCHEMY_URL;

export const webSocketProvider = new ethers.WebSocketProvider(WS);

export const jsonRpcProvider = new ethers.JsonRpcProvider(HTTP);
