import { ethers } from 'ethers';
import {
  ERC721_TRANSFER_EVENT_SIGNATURE,
  ZERO_ADDRESS,
} from '../../event-signature/erc721';
import { jsonRpcProvider, webSocketProvider } from '../../utils/ethers';
import { insertERC721TransferTxInfo } from './query';

const abiCoder = new ethers.AbiCoder();

export async function findERC721TransferEventInBlock() {
  webSocketProvider.on('block', getBlockLog);
}

async function getBlockLog(newBlockNumber: number) {
  try {
    const block = await jsonRpcProvider.getBlock(newBlockNumber);
    await filterNftTransferLogInBlock(block);
  } catch (error) {
    console.log('[ERROR: GET BLOCK]', error);
  }
}

async function filterNftTransferLogInBlock(block: ethers.Block) {
  for (const txHash of block.transactions) {
    try {
      const receipt = await jsonRpcProvider.getTransactionReceipt(txHash);
      if (receipt?.status && receipt.logs.length !== 0) {
        await processTransactionLogs(txHash, receipt.logs);
      }
    } catch (error) {
      console.log('[ERROR: PROCESS TRANSACTION]', error);
    }
  }
}

async function processTransactionLogs(
  txHash: string,
  logs: readonly ethers.Log[],
) {
  try {
    for (const log of logs) {
      const { topics } = log;
      const contract = log.address;

      if (
        topics[0] === ERC721_TRANSFER_EVENT_SIGNATURE &&
        topics.length === 4
      ) {
        await saveNftTransferTx(txHash, contract, topics);
      }
    }
  } catch (error) {
    console.log('[ERROR: PROCCESS TRANSACTION]', error);
  }
}

async function saveNftTransferTx(
  txHash: string,
  contract: string,
  topics: readonly string[],
) {
  const from = abiCoder.decode(['address'], topics[1])[0];
  const to = abiCoder.decode(['address'], topics[2])[0];
  const tokenId = abiCoder.decode(['uint256'], topics[3])[0].toString();
  const eventName = from === ZERO_ADDRESS ? 'MINT' : 'TRANSFER';
  const { value } = await jsonRpcProvider.getTransaction(txHash);
  const price = ethers.formatEther(value);

  const nftData = {
    contract,
    tokenId,
    from,
    to,
    txHash,
    eventName,
    price,
  };

  try {
    await insertERC721TransferTxInfo(nftData);
  } catch (error) {
    console.log('[ERROR: INSERT ERC721 TRANSFER INFO]', error);
  }
}

findERC721TransferEventInBlock();
