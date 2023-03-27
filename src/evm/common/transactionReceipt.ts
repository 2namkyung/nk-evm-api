import { jsonRpcProvider } from '../../utils/ethers';

export async function getTx(txHash: string) {
  try {
    const receipt = await jsonRpcProvider.getTransaction(txHash);
    console.log(receipt);
    return receipt;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getTxReceipt(txHash: string) {
  try {
    const receipt = await jsonRpcProvider.getTransactionReceipt(txHash);
    console.log(receipt);
    return receipt;
  } catch (error) {
    console.log(error);
    return error;
  }
}
