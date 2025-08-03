import React, { useContext } from 'react';
import { GlobalContext } from '../context/globalState';

function Transaction({ transaction }) {
  const { deleteTransaction } = useContext(GlobalContext);
  const formattedTime = new Date(transaction.time).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  return (
    <li className={transaction.type == '-' ? 'minus' : 'plus'}>
      {transaction.text}{' '}
      <span>
        {transaction.type}₹{transaction.Amount}
      </span>
      <div>
        <p class="time">{formattedTime}</p>
        <br />
        <p class="time">{transaction.transactionType}</p>
      </div>
      <button
        className="delete-btn"
        onClick={async () => {
          deleteTransaction(transaction._id);
        }}
      >
        x
      </button>
    </li>
  );
}

export default Transaction;
