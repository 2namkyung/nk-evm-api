export interface ERC721TransferEvent {
  from: string;
  to: string;
  tokenId: string;
}

export interface ERC721TransferTxInfo extends ERC721TransferEvent {
  contract: string;
  txHash: string;
  eventName: string;
}
