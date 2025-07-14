const transaction = require('../models/transaction');

const createTransaction = async (req, res) => {
  try {
    const { text, amount, category } = req.body;
    // console.log(text, amount, category);
    const newTransaction = await transaction.create({
      email: 'Balaji@tp.in',
      text: text,
      category: category,
      Amount: amount < 0 ? -amount : amount,
      type: amount < 0 ? '-' : '+',
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
    const email = req.params.email;

    const data = await transaction.find({ email: email });
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
