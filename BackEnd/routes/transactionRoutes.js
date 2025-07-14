const express = require('express');
const {
  createTransaction,
  getAllTransactions,
  deleteTransactionById,
} = require('../controllers/transactionControllers');
const router = express.Router();

router.post('/create', createTransaction);
router.get('/getall/:email', getAllTransactions);
router.delete('/delete/:id', deleteTransactionById);

module.exports = router;
