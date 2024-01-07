import { ethers } from 'ethers';
import { jsonRpcProvider } from '../../utils/ethers';

async function getTransactionCount(address: string) {
  try {
    if (!ethers.isAddress(address)) {
      throw new Error('Invalid Wallet Address');
    }

    const nonce = await jsonRpcProvider.getTransactionCount(address);
    console.log(`${address}'s nonce : ${nonce}`);
  } catch (error) {
    console.log('[ERROR : Get TransactionCount]', error);
    return error;
  }
}

getTransactionCount('0x504370060B9d5433679e557621ee31a3B960C157');
