import React, { useState, useContext, useEffect } from "react";
import { TransactionContext } from "../TransactionContext/TransactionContext"; // Adjust the import path as needed

export default function TransactionForm() {
  const { state, addTransaction, getTransactions, getAccountById } =
    useContext(TransactionContext);

  useEffect(() => {
    getTransactions();
  }, []);

  console.log("state", state);

  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const numericAmount = parseFloat(amount);

    addTransaction({
      account_id: selectedAccountId,
      amount: numericAmount,
    });

    getAccountById(selectedAccountId);

    console.log("state", state);

    setSelectedAccountId("");
    setAmount("");
  };

  return (
    <div className="transaction-form">
      <h2>Submit new transaction</h2>
      <form onSubmit={handleSubmit}>
        <section className="transaction-section">
          <label htmlFor="selectedAccountId">Account Id</label>
          <input
            type="text"
            id="selectedAccountId"
            value={selectedAccountId}
            onChange={(e) => setSelectedAccountId(e.target.value)}
            required
          />

          {/* <label htmlFor="account-id">Account ID</label>
          <select
            id="account-id"
            value={selectedAccountId}
            onChange={(e) => setSelectedAccountId(e.target.value)}
            required
          >
            <option value="" disabled>
              Select an account
            </option>
            {accounts?.map((account) => (
              <option key={account.account_id} value={account.account_id}>
                {account.account_id}
              </option>
            ))}
          </select> */}
        </section>
        <section className="transaction-section">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </section>
        <section className="transaction-section">
          <input type="submit" value="Submit" data-type="transaction-submit" />
        </section>
      </form>
    </div>
  );
}
