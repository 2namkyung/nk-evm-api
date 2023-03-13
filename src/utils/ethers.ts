import { ethers } from 'ethers';

import config from '../config';

const { MAINNET_INFURA_WS, MAINNET_INFURA_URL } = config;

export const webSocketProvider = new ethers.WebSocketProvider(
  MAINNET_INFURA_WS,
);

export const jsonRpcProvider = new ethers.JsonRpcProvider(MAINNET_INFURA_URL);
