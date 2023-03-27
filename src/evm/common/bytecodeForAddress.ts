import { jsonRpcProvider } from '../../utils/ethers';

export async function getBytecodeForAddress(contractAddress: string) {
  try {
    const code = await jsonRpcProvider.getCode(contractAddress);
    return code;
  } catch (error) {
    console.log(error);
    return error;
  }
}
