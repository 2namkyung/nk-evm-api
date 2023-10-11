import { jsonRpcProvider } from '../../utils/ethers';

async function getGasPrice() {
  try {
    const ethGasPrice = await jsonRpcProvider._send({
      jsonrpc: '2.0',
      method: 'eth_gasPrice',
      params: [],
      id: 1,
    });

    const gasPrice = ethGasPrice[0].result;
    console.log('CURRENT GAS PRICE : ', gasPrice);
  } catch (error) {
    console.log('[ERROR : GET GAS PRICE]', error);
  }
}

async function getChainId() {
  try {
    const ethChainId = await jsonRpcProvider._send({
      jsonrpc: '2.0',
      method: 'eth_chainId',
      params: [],
      id: 1,
    });

    const chainId = Number(ethChainId[0].result);
    console.log('CHAIN ID : ', chainId);
  } catch (error) {
    console.log('[ERROR : GET ChainId]', error);
  }
}

getGasPrice();
getChainId();

/*
  BigNumberish
  - string(hexString, 10진수 문자열)
  - ByteLike(배열 또는 Uint8Array)
  - BigNumber
  - number
  - BigInt
*/
