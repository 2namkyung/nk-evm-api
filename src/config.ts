import dotenv from 'dotenv';

dotenv.config();

const {
  MAINNET_INFURA_WS,
  MAINNET_INFURA_URL,
  POLYGON_ALCHEMY_URL,
  POLYGON_ALCHEMY_WS,
  MUMBAI_ALCHEMY_WS,
  MUMBAI_ALCHEMY_URL,
  MUMBAI_PUBLIC_URL,
  MUMBAI_INFURA_URL,
  BESU_URL,
  BESU_WS,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  PRIVATE_KEY,
  NETWORK,
} = process.env;

export default {
  MAINNET_INFURA_WS,
  MAINNET_INFURA_URL,
  POLYGON_ALCHEMY_URL,
  POLYGON_ALCHEMY_WS,
  MUMBAI_PUBLIC_URL,
  MUMBAI_INFURA_URL,
  BESU_URL,
  BESU_WS,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  PRIVATE_KEY,
  MUMBAI_ALCHEMY_WS,
  MUMBAI_ALCHEMY_URL,
  NETWORK,
};
