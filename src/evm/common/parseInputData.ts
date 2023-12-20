import { TransactionResponse, ethers } from 'ethers';
import { jsonRpcProvider } from '../../utils/ethers';
import consoleLog from '../../utils/log/console';

const methodSig = {
  '0xa9059cbb': ['function transfer(address recipient, uint256 amount)'],
};

async function getTransactionInputData(txHash: string) {
  try {
    const { data }: TransactionResponse = await jsonRpcProvider.getTransaction(
      txHash,
    );

    const methodID = data.substring(0, 10);

    if (!methodSig[methodID]) {
      throw new Error('Unknown method signature');
    }

    const iface = new ethers.Interface(methodSig[methodID]);
    const parsedData = iface.parseTransaction({ data });
    consoleLog(parsedData);
  } catch (error) {
    console.log('[ERROR : getTransactionInputData]', error);
    return error;
  }
}

getTransactionInputData(
  '0x72e40af8ff0d5042f2efac08cd613b1e4bcac6adc957d151b971a4c1108c4df8',
);
