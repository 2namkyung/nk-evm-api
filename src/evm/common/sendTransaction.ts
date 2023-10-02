import { TransactionRequest } from 'ethers';
import { signTx } from './signTransaction';
import { jsonRpcProvider } from '../../utils/ethers';

export async function sendRawTransaction(tx: TransactionRequest) {
  try {
    const { signedTx, transactionHash } = await signTx(tx);
    await jsonRpcProvider._send({
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_sendRawTransaction',
      params: [signedTx],
    });

    console.log('SEND TX : ', transactionHash);
  } catch (error) {
    console.log('[ERROR : Send Raw Transaction]', error);
  }
}
