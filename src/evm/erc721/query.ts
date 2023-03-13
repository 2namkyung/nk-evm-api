import pool from '../../database/pool';
import { ERC721TransferTxInfo } from './types';

export async function insertERC721TransferTxInfo(data: ERC721TransferTxInfo) {
  const { contract, tokenId, from, to, txHash, eventName } = data;
  try {
    await pool.query(
      'INSERT INTO erc721_tx(contract, token_id, `from`, `to`, tx_hash, event_name) VALUES (?,?,?,?,?,?)',
      [contract, tokenId, from, to, txHash, eventName],
    );
  } catch (error) {
    console.log('[ERROR] : INSERT NFT Transaction', error);
    return error;
  }
}
