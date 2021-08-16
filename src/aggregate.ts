import * as hubbleBls from "../deps/hubble-bls";

import { AggregateTransactionData, TransactionData } from "./types";

export default function aggregate(
  txs: TransactionData[],
): AggregateTransactionData {
  const sigsG1 = txs.map(tx => hubbleBls.mcl.loadG1(tx.signature));
  const aggSigG1 = hubbleBls.signer.aggregate(sigsG1);

  const aggregateSignature = hubbleBls.mcl.dumpG1(aggSigG1);

  return {
    transactions: txs.map(tx => ({
      contractAddress: tx.contractAddress,
      encodedFunctionData: tx.encodedFunctionData,
      nonce: tx.nonce,
      tokenRewardAmount: tx.tokenRewardAmount,
      publicKey: tx.publicKey,
    })),
    aggregateSignature,
  };
}