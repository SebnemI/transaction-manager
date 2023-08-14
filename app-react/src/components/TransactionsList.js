import React, { useContext } from "react";
import { TransactionContext } from "../TransactionContext/TransactionContext";

export default function TransactionHistory() {
  const { state } = useContext(TransactionContext);
  const { transactions, selectedAccount } = state;

  console.log("selectedAccount", selectedAccount);

  return (
    <div className="transaction-history">
      <h2>Transaction History</h2>
      <ul className="history-list">
        {transactions.slice(0, 3).map((transaction, index) => (
          <li key={index} className="history-item">
            {index === 0 ? (
              <>
                <p>
                  {transaction.amount < 0
                    ? `Transferred ${transaction.amount}$ from account ${transaction.account_id}.`
                    : `Transferred ${transaction.amount}$ to account ${transaction.account_id}.
                `}
                </p>
                <p className="bold">
                  {selectedAccount.amount && (
                    <>
                      {`The current account balance is ${selectedAccount.amount}$`}
                    </>
                  )}
                </p>
              </>
            ) : (
              <p>
                {transaction.amount < 0
                  ? `Transferred ${transaction.amount}$ from account ${transaction.account_id}.`
                  : `Transferred ${transaction.amount}$ to account ${transaction.account_id}.`}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
