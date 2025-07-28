const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv').config();

const database = require('./db/db');

const transactionRouter = require('./routes/transactionRoutes');
const authRouter = require('./routes/authRoutes');

app.use(express.json());
app.use(cors());

app.use('/api/transactions', transactionRouter);
app.use('/api/auth/', authRouter);

database();
app.get('/', (req, res) => {
  res.send('Hello, welcome to Expense Tracker Back End');
});

PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is Running at PORT ${PORT}`);
});
