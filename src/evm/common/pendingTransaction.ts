import { jsonRpcProvider, webSocketProvider } from '../../utils/ethers';

async function listenPendingTx() {
  webSocketProvider.on('pending', getPendingLog);
}

async function getPendingLog(txHash: string) {
  try {
    const pendingTx = await jsonRpcProvider.getTransaction(txHash);
    console.log(pendingTx);
    return pendingTx;
  } catch (error) {
    console.log('[ERROR: GET PENDING LOG]', error);
  }
}

listenPendingTx();
