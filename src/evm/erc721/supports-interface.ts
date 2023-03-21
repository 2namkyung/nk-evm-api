import { Contract } from 'ethers';
import { jsonRpcProvider } from '../../utils/ethers';
import { SUPPORTS_INTERFACE } from '../../event-signature/erc721';

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

checkSupportsInterfaceERC721('0x716F29B8972D551294d9E02B3eb0fC1107FbF4aA'); // Imaginary Ones - ERC721 - O
checkSupportsInterfaceERC721('0x75789Db97d94749473cB57A0925b35fFC14437FF'); // Outside Yacht Club - ERC721A - O
checkSupportsInterfaceERC721('0xA6Cd272874Ee7C872Eb66801Eff62784C0b13285'); // Seizon - TransparentUpgradeableProxy - O
checkSupportsInterfaceERC721('0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0'); // MATIC - ERC20 - X
