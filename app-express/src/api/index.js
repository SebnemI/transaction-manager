const express = require("express");
const router = express.Router();
const controller = require("../controller/controller");

router.get("/ping", (req, res) => {
  res.status(200).json({ message: "The service is up and running." });
});

router.post("/transactions", controller.createTransaction);

router.get("/transactions", controller.getTransactions);

router.get("/transactions/:transaction_id", controller.getTransactionById);

router.get("/accounts/:account_id", controller.getAccountById);

module.exports = router;
