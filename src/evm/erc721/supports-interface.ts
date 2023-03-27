import { Contract } from 'ethers';
import { jsonRpcProvider } from '../../utils/ethers';
import { SUPPORTS_INTERFACE } from '../../event-signature/erc721';
import { getBytecodeForAddress } from '../common/bytecodeForAddress';
import { erc721FuncInterface } from './types';

async function checkSupportsInterfaceERC721(contractAddress: string) {
  const contract = new Contract(
    contractAddress,
    SUPPORTS_INTERFACE,
    jsonRpcProvider,
  );

  try {
    const result = await contract.supportsInterface('0x80ac58cd');
    console.log(`${contractAddress} is a ERC721 Contract`);
    return result;
  } catch (error) {
    console.log(
      `[ERROR : ${contractAddress} is an UNSUPPORTS_INTERFACE ABOUT ERC721]`,
    );
    return false;
  }
}

async function checkImplERC721Func(contractAddress: string) {
  try {
    const bytecode = await getBytecodeForAddress(contractAddress);
    erc721FuncInterface.forEach((value, index) => {
      const isIncludes = bytecode.includes(value[1]);
      const msg = `${index} - ${value[0]} : ${isIncludes ? 'O' : 'X'}`;
      console.log(msg);
    });

    checkSupportsInterfaceERC721(contractAddress);
  } catch (error) {
    console.log(error);
    return error;
  }
}

checkImplERC721Func('0x716F29B8972D551294d9E02B3eb0fC1107FbF4aA');
// checkSupportsInterfaceERC721('0x716F29B8972D551294d9E02B3eb0fC1107FbF4aA'); // Imaginary Ones - ERC721 - O
// checkSupportsInterfaceERC721('0x75789Db97d94749473cB57A0925b35fFC14437FF'); // Outside Yacht Club - ERC721A - O
// checkSupportsInterfaceERC721('0xA6Cd272874Ee7C872Eb66801Eff62784C0b13285'); // Seizon - TransparentUpgradeableProxy - O
// checkSupportsInterfaceERC721('0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0'); // MATIC - ERC20 - X
