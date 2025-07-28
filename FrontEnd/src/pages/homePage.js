import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Balance from '../components/balance';
import IncomeExpences from '../components/incomeExpences';
import AddTransaction from '../components/addTransaction';
import TransactionList from '../components/transactionList';
import Dashboard from '../components/dashboard';
function HomePage() {
  return (
    <>
      <Header />
      <div className="container">
        <Balance />
        <IncomeExpences />
        <Dashboard />
        <h3>Transaction Management</h3>
        <AddTransaction />
        <TransactionList />
      </div>
    </>
  );
}

export default HomePage;
