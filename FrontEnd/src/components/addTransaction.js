import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/globalState';
// someChange
const AddTransaction = () => {
  const { addTransaction } = useContext(GlobalContext);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState(null);
  // const [email, setEmail] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const newTransaction = {
      // id: Math.floor(Math.random() * 1000000),
      // email: localStorage.getItem('email'),
      text: text,
      amount: +amount,
      category: category,
    };
    addTransaction(newTransaction);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        {/* text feild */}
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
          />
        </div>
        {/* Category feild */}
        <div className="form-control">
          <label htmlFor="text">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Choose Category.."
          >
            <option value="">-- Select Category --</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Travel">Travel</option>
            <option value="Books">Books</option>
            <option value="Tuition">Tuition</option>
            <option value="Shopping">Shopping</option>
            <option value="Stationary">Stationary</option>
            <option value="Internet">Internet</option>
            <option value="Mobile Recharge">Mobile Recharge</option>
            <option value="Medical">Medical</option>
            <option value="Events">Events</option>
            <option value="Gym">Gym</option>
            <option value="Laundry">Laundry</option>
            <option value="Subscriptions">Subscriptions</option>
            <option value="Others">Others</option>
          </select>
        </div>
        {/* Amount feild */}
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction;
