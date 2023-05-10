import { ethers } from 'ethers';
import {
  ERC721_TRANSFER_EVENT_SIGNATURE,
  ZERO_ADDRESS,
} from '../../event-signature/erc721';
import { jsonRpcProvider, webSocketProvider } from '../../utils/ethers';
import { insertERC721TransferTxInfo } from './query';

const abiCoder = new ethers.AbiCoder();

export async function findERC721TransferEventInBlock() {
  webSocketProvider.on('block', async (newBlockNumber: number) => {
    const block = await jsonRpcProvider.getBlock(newBlockNumber);

    block.transactions.forEach(async (txHash) => {
      try {
        const receipt = await jsonRpcProvider.getTransactionReceipt(txHash);
        if (receipt && receipt.status && receipt.logs.length !== 0) {
          receipt.logs.forEach(async (log) => {
            const { topics } = log;
            const contract = log.address;

            if (
              topics[0] === ERC721_TRANSFER_EVENT_SIGNATURE &&
              topics.length === 4
            ) {
              const from = abiCoder.decode(['address'], topics[1])[0];
              const to = abiCoder.decode(['address'], topics[2])[0];
              const tokenId = abiCoder
                .decode(['uint256'], topics[3])[0]
                .toString();
              const eventName = from === ZERO_ADDRESS ? 'MINT' : 'TRANSFER';
              const { value } = await jsonRpcProvider.getTransaction(txHash);
              const price = ethers.formatEther(value);
              console.log(price);

              const nftData = {
                contract,
                tokenId,
                from,
                to,
                txHash,
                eventName,
                price,
              };

              // await insertERC721TransferTxInfo(nftData);
            }
          });
        }
      } catch (error) {
        console.log('[ERROR : GET BLOCK', error);
        return error;
      }
    });
  });
}

findERC721TransferEventInBlock();
