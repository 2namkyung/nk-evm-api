import { jsonRpcProvider, webSocketProvider } from '../../utils/ethers';

async function listenPendingTx() {
  webSocketProvider.on('pending', (txHash: string) => {
    jsonRpcProvider.getTransaction(txHash).then((transaction) => {
      console.log(transaction);
    });
  });
}

listenPendingTx();
