'use client';

import { useState } from "react";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { approve } from "thirdweb/extensions/erc20";
import { buyFromListing } from "thirdweb/extensions/marketplace";
import {
  client,
  arcTestnet,
  marketplaceContract,
  MARKETPLACE_ADDRESS,
  USDC_ADDRESS,
  formatUSDC,
} from "@/lib/thirdweb";
import { getContract } from "thirdweb";

type Status = "idle" | "approving" | "buying" | "done" | "error";

interface BuyButtonProps {
  listingId: bigint;
  pricePerToken: bigint;
  onSuccess?: () => void;
}

export default function BuyButton({ listingId, pricePerToken, onSuccess }: BuyButtonProps) {
  const account = useActiveAccount();
  const { mutateAsync: sendTx } = useSendTransaction();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const usdcContract = getContract({
    client,
    chain: arcTestnet,
    address: USDC_ADDRESS,
  });

  const handleBuy = async () => {
    if (!account) return;
    setStatus("approving");
    setErrorMsg("");

    try {
      const approveTx = approve({
        contract: usdcContract,
        spender: MARKETPLACE_ADDRESS,
        amountWei: pricePerToken,
      });
      await sendTx(approveTx);

      setStatus("buying");

      const buyTx = buyFromListing({
        contract: marketplaceContract,
        listingId,
        quantity: 1n,
        recipient: account.address,
      });
      await sendTx(buyTx);

      setStatus("done");
      onSuccess?.();
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : "Transaction failed");
      setStatus("error");
    }
  };

  if (!account) {
    return (
      <p className="text-sm text-center py-3" style={{ color: "rgba(255,255,255,0.4)" }}>
        Connect your wallet to buy
      </p>
    );
  }

  if (status === "done") {
    return (
      <div
        className="w-full py-3 rounded-xl text-center font-semibold text-sm"
        style={{ background: "rgba(6,182,212,0.15)", color: "#06b6d4", border: "1px solid rgba(6,182,212,0.3)" }}
      >
        Purchase successful!
      </div>
    );
  }

  const isLoading = status === "approving" || status === "buying";

  return (
    <div className="space-y-2">
      <button
        onClick={handleBuy}
        disabled={isLoading}
        className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}
      >
        {status === "idle" && `Buy for ${formatUSDC(pricePerToken)} USDC`}
        {status === "approving" && "Step 1/2: Approving USDC..."}
        {status === "buying" && "Step 2/2: Confirming purchase..."}
        {status === "error" && "Try Again"}
      </button>
      {status === "error" && errorMsg && (
        <p className="text-xs text-center" style={{ color: "#f87171" }}>
          {errorMsg.slice(0, 80)}
        </p>
      )}
      <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.3)" }}>
        Payment in USDC · Two-step transaction
      </p>
    </div>
  );
}
