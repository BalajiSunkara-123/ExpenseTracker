import React, { useContext } from 'react';
import { GlobalContext } from '../context/globalState';
import Transaction from './transaction';

function TransactionList() {
  const { transactions } = useContext(GlobalContext);
  return (
    <div>
      <h3>History</h3>
      <ul className="list">
        {transactions.map((transaction) => (
          <Transaction key={transaction._id} transaction={transaction} />
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
