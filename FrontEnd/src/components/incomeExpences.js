import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext, sendUrl } from '../context/globalState';
function IncomeExpences() {
  const { transactions } = useContext(GlobalContext);
  // const amounts = transactions.map((transaction) => transaction.amount);

  // const income = amounts
  //   .filter((item) => item > 0)
  //   .reduce((acc, item) => (acc += item), 0)
  //   .toFixed(2);

  // const expense = (
  //   amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
  //   -1
  // ).toFixed(2);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  useEffect(() => {
    handleExpense();
  }, [transactions]);
  const handleExpense = async () => {
    var plus = 0;
    var minus = 0;
    for (const tran of transactions) {
      if (tran.type === '+') {
        plus = plus + tran.Amount;
      } else {
        minus = minus + tran.Amount;
      }
    }
    setIncome(plus);
    setExpense(minus);
  };

  return (
    <div>
      <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p className="money plus">+₹{income}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p className="money minus">-₹{expense}</p>
        </div>
      </div>
    </div>
  );
}

export default IncomeExpences;
