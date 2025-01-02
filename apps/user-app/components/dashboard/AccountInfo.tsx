"use client";
import { useEffect, useState } from "react";
import { getBalance } from "../../lib/actions/getBalance";
import { getOnRampTransactions } from "../../lib/actions/getOnRampTransactions";
import { BalanceCard } from "../BalanceCard";
import { OnRampTransactions } from "../OnRampTransactions";

export default function AccountInfo() {
  const [balance, setBalance] = useState({ amount: 0, locked: 0 });
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    (async () => {
      const b = await getBalance();
      const t = await getOnRampTransactions();
      setBalance(b);
      setTransactions(t);
    })();
  }, []);

  return (
    <div className="w-screen p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <BalanceCard amount={balance.amount} locked={balance.locked} />
        <OnRampTransactions transactions={transactions} />
      </div>
    </div>
  );
}
