import React, { useContext, useEffect, useState } from 'react';
import { sendUrl, GlobalContext } from '../context/globalState';
function Balance() {
  const { transactions } = useContext(GlobalContext);
  const [totalAmount, setTotalAmount] = useState(0);
  // const amounts = transactions.map((transaction) => transaction.amount);
  // someChange
  // const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const handleTotalAmount = async () => {
    var amount = 0;

    for (const tran of transactions) {
      if (tran.type === '+') {
        amount = amount + tran.Amount;
      } else {
        amount = amount - tran.Amount;
      }
    }
    setTotalAmount(amount);
  };
  useEffect(() => {
    handleTotalAmount();
  }, [transactions]);

  return (
    <div>
      <h4>Your Balance</h4>
      <h1>{totalAmount}</h1>
    </div>
  );
}

export default Balance;
