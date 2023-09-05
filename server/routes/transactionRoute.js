const express = require("express");
const TransactionController = require("./../controllers/transactionController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  TransactionController.webhookCheckout
);

router.use(authController.protect);

router.post(
  "/checkout-session/:propertyId",
  TransactionController.getCheckoutSession
);

router.use(authController.restrictTo("admin", "agent"));

router
  .route("/")
  .get(TransactionController.getAllTransactions)
  .post(TransactionController.createTransaction);

router
  .route("/:id")
  .get(TransactionController.getTransaction)
  .patch(TransactionController.updateTransaction)
  .delete(TransactionController.deleteTransaction);

module.exports = router;
