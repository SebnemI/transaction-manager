const { v4: uuidv4 } = require("uuid");

var accounts = [
  { account_id: "5ba6e1b0-e3e7-483a-919a-a2fc17629a90", amount: 7 },
  { account_id: "4a92331-a533-4dd3-82e3-3ff75219e33b", amount: 15 },
  { account_id: "7c9be9e8-a6df-4f43-9a44-38c10ad0de4a", amount: 23 },
];
var transactions = [
  {
    transaction_id: "4bcc3959-6fe1-406e-9f04-cad2637b47d5",
    account_id: "5ba6e1b0-e3e7-483a-919a-a2fc17629a90",
    amount: 7,
    created_at: "2021-05-12T18:29:40.206924+00:00",
  },
  {
    transaction_id: "050a75f6-8df1-4ad1-8f5b-54e821e98581",
    account_id: "4a92331-a533-4dd3-82e3-3ff75219e33b",
    amount: -4,
    created_at: "2021-05-18T21:33:47.203136+00:00",
  },
];

const handleServerError = (res, error) => {
  console.error(error);
  return res.status(500).json({ message: "Internal server error." });
};

exports.createTransaction = (req, res) => {
  const { account_id, amount } = req.body;

  try {
    const accountExists = accounts.some(
      (account) => account.account_id === account_id
    );

    if (!accountExists) {
      return res.status(404).json({ message: "Account not found." });
    }

    const transaction_id = uuidv4();
    const transaction = {
      transaction_id,
      account_id,
      amount,
      created_at: new Date().toISOString(),
    };

    transactions.push(transaction);

    const updatedAccounts = accounts.map((acc) => {
      if (acc.account_id === account_id) {
        return {
          ...acc,
          amount: acc.amount + amount,
        };
      }
      return acc;
    });

    accounts = updatedAccounts;

    return res.status(201).json(transaction);
  } catch (error) {
    return handleServerError(res, error);
  }
};

exports.getTransactions = (req, res) => {
  try {
    return res.status(200).json(transactions);
  } catch (error) {
    return handleServerError(res, error);
  }
};

exports.getTransactionById = (req, res) => {
  const { transaction_id } = req.params;

  try {
    const transaction = transactions.find(
      (transaction) => transaction.transaction_id === transaction_id
    );

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    return res.status(200).json(transaction);
  } catch (error) {
    return handleServerError(res, error);
  }
};

exports.getAccountById = (req, res) => {
  const { account_id } = req.params;

  try {
    const accountExists = accounts.some(
      (account) => account.account_id === account_id
    );

    if (!accountExists) {
      return res.status(404).json({ message: "Account not found." });
    }

    const account = accounts.find(
      (account) => account.account_id === account_id
    );

    return res.status(200).json(account);
  } catch (error) {
    return handleServerError(res, error);
  }
};
