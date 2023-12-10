import { TransactionRequest, ethers } from 'ethers';
import erc20Config from '../../abi/erc20DeployConfig';
import { jsonRpcProvider } from '../../utils/ethers';

const decimals = 18;
const iface = new ethers.Interface(erc20Config.abi);

function formattingTokenAmount(amount: number): ethers.BigNumberish {
  const amountToString = amount.toString();
  const amountFormatted = ethers.parseUnits(amountToString, decimals);
  return amountFormatted;
}

function funcCallEncodedData(toAddress: string, amount: ethers.BigNumberish) {
  return iface.encodeFunctionData('transfer', [toAddress, amount]);
}

export async function estimateGas(
  fromAddress: string,
  contractAddress: string,
  toAddress: string,
  amount: number,
) {
  const amountFormatted = formattingTokenAmount(amount);
  const data = funcCallEncodedData(toAddress, amountFormatted);

  const transaction: TransactionRequest = {
    from: fromAddress,
    to: contractAddress,
    data,
  };

  try {
    // The estimateGas function will raise an error if there is a CALL EXCEPTION or if the transaction cannot be executed.
    // but, However, it's unlikely to catch every error.
    const estimatedGas = await jsonRpcProvider.estimateGas(transaction);
    console.log('estimatedGas : ', estimatedGas);
  } catch (error) {
    console.log('[ERROR : Estimate Gas]', error);
    return error;
  }
}

estimateGas(
  '0x504370060B9d5433679e557621ee31a3B960C157',
  '0x85E18D15CE5a472258304C2bce345CB04C526969',
  '0xE0a03Efee097Cd726470A18227D3E790b854752A',
  10,
);
