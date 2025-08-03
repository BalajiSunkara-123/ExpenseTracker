const transaction = require('../models/transaction');

const createTransaction = async (req, res) => {
  try {
    const { text, amount, category, transactionType } = req.body;
    const user = req.user;

    // console.log(text, amount, category);
    const newTransaction = await transaction.create({
      email: user.email,
      text: text,
      category: category,
      Amount: amount < 0 ? -amount : amount,
      type: amount < 0 ? '-' : '+',
      transactionType: transactionType,
    });
    if (newTransaction) {
      res.status(200).json({
        success: true,
        message: 'Item Added',
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: 'Unable to Add Item',
    });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const user = req.user;

    console.log(user);
    const data = await transaction.find({ email: user.email });
    res.status(200).json({
      success: true,
      message: 'Got All Transactions',
      transactions: data,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: 'Unable to get Transactions',
    });
  }
};

const deleteTransactionById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await transaction.findByIdAndDelete({ _id: id });
    res.status(200).json({
      success: true,
      message: 'Transaction Deleted',
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: 'Unable to Delete Transaction',
    });
  }
};
module.exports = {
  createTransaction,
  getAllTransactions,
  deleteTransactionById,
};
