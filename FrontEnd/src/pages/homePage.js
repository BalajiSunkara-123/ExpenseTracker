import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Balance from '../components/balance';
import IncomeExpences from '../components/incomeExpences';
import AddTransaction from '../components/addTransaction';
import TransactionList from '../components/transactionList';
function HomePage() {
  return (
    <>
      <Header />
      <div className="container">
        <Balance />
        <IncomeExpences />
        <AddTransaction />
        <TransactionList />
      </div>
    </>
  );
}

export default HomePage;
