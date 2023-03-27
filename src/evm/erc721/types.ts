export interface ERC721TransferEvent {
  from: string;
  to: string;
  tokenId: string;
}

export interface ERC721TransferTxInfo extends ERC721TransferEvent {
  contract: string;
  txHash: string;
  eventName: string;
  price: string;
}

/*
  bytes4(keccak256('balanceOf(address)')) == 0x70a08231
  bytes4(keccak256('ownerOf(uint256)')) == 0x6352211e
  bytes4(keccak256('approve(address,uint256)')) == 0x095ea7b3
  bytes4(keccak256('getApproved(uint256)')) == 0x081812fc
  bytes4(keccak256('setApprovalForAll(address,bool)')) == 0xa22cb465
  bytes4(keccak256('isApprovedForAll(address,address)')) == 0xe985e9c5
  bytes4(keccak256('transferFrom(address,address,uint256)')) == 0x23b872dd
  bytes4(keccak256('safeTransferFrom(address,address,uint256)')) == 0x42842e0e
  bytes4(keccak256('safeTransferFrom(address,address,uint256,bytes)')) == 0xb88d4fde

  => 0x70a08231 ^ 0x6352211e ^ 0x095ea7b3 ^ 0x081812fc ^
  0xa22cb465 ^ 0xe985e9c ^ 0x23b872dd ^ 0x42842e0e ^ 0xb88d4fde == 0x80ac58cd
*/

export const erc721FuncInterface = [
  ['balanceOf(address)', '70a08231'],
  ['ownerOf(uint256)', '6352211e'],
  ['approve(address,uint256)', '095ea7b3'],
  ['getApproved(uint256)', '081812fc'],
  ['setApprovalForAll(address,bool)', 'a22cb465'],
  ['isApprovedForAll(address,address)', 'e985e9c5'],
  ['transferFrom(address,address,uint256)', '23b872dd'],
  ['safeTransferFrom(address,address,uint256)', '42842e0e'],
  ['safeTransferFrom(address,address,uint256,bytes)', 'b88d4fde'],
];
