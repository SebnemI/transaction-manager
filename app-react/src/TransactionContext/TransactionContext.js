import React, { createContext, useReducer } from "react";
import api from "../api";

const TransactionContext = createContext();

const initialState = {
  accounts: [],
  transactions: [],
  selectedAccount: {},
};

const transactionReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      const { account_id, amount } = action.payload;
      const updatedAccounts = state.accounts.map((acc) => {
        if (acc.account_id === account_id) {
          return {
            ...acc,
            amount: acc.amount + amount,
          };
        }
        return acc;
      });

      /*  const newTransaction = {
        ...action.payload,
        transaction_id: uuidv4(),
        created_at: new Date().toISOString(),
      }; */

      const updatedTransactions = [action.payload, ...state.transactions];
      console.log("up", updatedAccounts);

      return {
        ...state,
        accounts: updatedAccounts,
        transactions: updatedTransactions,
      };

    case "ADD_ACCOUNT":
      return {
        ...state,
        accounts: [...state.accounts, action.payload],
      };
    case "SET_TRANSACTIONS":
      return {
        ...state,
        transactions: action.payload,
      };

    case "SET_ACCOUNT":
      console.log("SET_ACCOUNT", action.payload);
      return {
        ...state,
        selectedAccount: action.payload,
      };

    default:
      return state;
  }
};

const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  const addTransaction = async (transaction) => {
    try {
      const response = await api.post("/transactions", transaction);
      const newTransaction = response.data;

      dispatch({ type: "ADD_TRANSACTION", payload: newTransaction });
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const getTransactionById = async (transaction_id) => {
    try {
      const response = await api.get(`/transactions/${transaction_id}`);
      const transactionsData = response.data;
      dispatch({ type: "UPDATE_TRANSACTIONS", payload: transactionsData });
      return transactionsData;
    } catch (error) {
      console.error("Error fetching transaction:", error);
      return null;
    }
  };

  const getAccountById = async (account_id) => {
    try {
      const response = await api.get(`/accounts/${account_id}`);
      const accountData = response.data;
      console.log("accountData", accountData);
      dispatch({ type: "SET_ACCOUNT", payload: accountData });
      return response.data;
    } catch (error) {
      console.error("Error fetching account:", error);
      return null;
    }
  };

  const getTransactions = async () => {
    try {
      const response = await api.get("/transactions");
      const transactionsData = response.data;

      dispatch({ type: "SET_TRANSACTIONS", payload: transactionsData });

      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return [];
    }
  };

  const addAccount = (account) => {
    dispatch({ type: "ADD_ACCOUNT", payload: account });
  };

  return (
    <TransactionContext.Provider
      value={{
        state,
        addTransaction,
        getTransactionById,
        getAccountById,
        getTransactions,
        addAccount,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export { TransactionContext, TransactionProvider };
