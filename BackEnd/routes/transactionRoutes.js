const express = require('express');
const {
  createTransaction,
  getAllTransactions,
  deleteTransactionById,
} = require('../controllers/transactionControllers');
const router = express.Router();

const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/create', authMiddleware, createTransaction);
router.get('/getall', authMiddleware, getAllTransactions);
router.delete('/delete/:id', authMiddleware, deleteTransactionById);

module.exports = router;
