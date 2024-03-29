import { TransactionRequest, ethers, keccak256 } from 'ethers';
import { signer } from '../../utils/ethers';

// txHash : 0xa3bbbc39989f7eed21cd4eea73c949fe89baa5df6088f5bc114504c344836472
const tx = {
  from: '0x504370060B9d5433679e557621ee31a3B960C157',
  to: '0xeA090721E72aCe074b1d644e730153E9dDD45acA',
  value: ethers.parseEther('0.0001'),
  gasLimit: '21000',
  maxPriorityFeePerGas: ethers.parseUnits('5', 'gwei'),
  maxFeePerGas: ethers.parseUnits('20', 'gwei'),
  nonce: 302,
  chainId: 80001, // MUMBAI
};

export async function signTx(tx: TransactionRequest) {
  const signedTx = await signer.signTransaction(tx);

  // calculate transationHash
  const transactionHash = keccak256(signedTx);

  return {
    signedTx,
    transactionHash,
  };
}

signTx(tx);
