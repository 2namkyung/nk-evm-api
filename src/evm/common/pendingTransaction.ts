import { jsonRpcProvider, webSocketProvider } from '../../utils/ethers';

async function listenPendingTx() {
  webSocketProvider.on('pending', async (txHash: string) => {
    const pendingTx = await jsonRpcProvider.getTransaction(txHash);
    console.log(pendingTx);
  });
}

listenPendingTx();
