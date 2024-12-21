import React, { useContext } from 'react';
import { GlobalContext } from '../context/globalState';

function Transaction({ transaction }) {
  const { deleteTransaction } = useContext(GlobalContext);
  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {transaction.text}{' '}
      <span>
        {transaction.amount < 0 ? '-' : '+'}₹{Math.abs(transaction.amount)}
      </span>
      <button
        className="delete-btn"
        onClick={() => deleteTransaction(transaction.id)}
      >
        x
      </button>
    </li>
  );
}

export default Transaction;
