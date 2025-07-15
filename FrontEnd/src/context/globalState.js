// import React, { createContext, useEffect, useReducer, useState } from 'react';
// import AppReducer from './appReducer';
// export const sendUrl = 'http://localhost:3000';
// //initial State
// // const initialState = {
// //   transactions: transactions,
// // };
// //create context
// export const GlobalContext = createContext();

// //provider component
// export const GlobalProvider = ({ children }) => {
//   // const [state, dispatch] = useReducer(AppReducer, initialState);
//   const [transactions, setTransactions] = useState([]);
//   useEffect(() => {
//     handleGetTransactions();
//   }, []);
//   const handleGetTransactions = async () => {
//     const response = await fetch(
//       sendUrl + '/api/transactions/getall/' + 'Balaji@tp.in',
//     );
//     const result = await response.json();
//     setTransactions(result.transactions);
//   };
//   //Actions
//   function deleteTransaction(id) {
//     dispatch({
//       type: 'DELETE_TRANSACTION',
//       payload: id,
//     });
//   }
//   function addTransaction(transaction) {
//     dispatch({
//       type: 'ADD_TRANSACTION',
//       payload: transaction,
//     });
//   }

//   return (
//     <GlobalContext.Provider
//       value={{
//         transactions: state.transactions,
//         deleteTransaction,
//         addTransaction,
//       }}
//     >
//       {children}
//     </GlobalContext.Provider>
//   );
// };

import React, { createContext, useEffect, useState } from 'react';
export const sendUrl = 'http://localhost:3000';
// export const sendUrl = 'https://expensetracker-axic.onrender.com';
export const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    handleGetTransactions();
  }, []);

  const handleGetTransactions = async () => {
    const response = await fetch(sendUrl + '/api/transactions/getall', {
      headers: {
        Authorization: localStorage.getItem('authToken'),
      },
    });
    const result = await response.json();
    setTransactions(result.transactions);
  };

  const addTransaction = async (transaction) => {
    const response = await fetch(sendUrl + '/api/transactions/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('authToken'),
      },
      body: JSON.stringify(transaction),
    });
    const result = await response.json();
    alert(result.message);
    handleGetTransactions();
  };

  const deleteTransaction = async (id) => {
    const response = await fetch(sendUrl + '/api/transactions/delete/' + id, {
      method: 'DELETE',
      headers: {
        Authorization: localStorage.getItem('authToken'),
      },
    });
    const result = await response.json();
    alert(result.message);
    handleGetTransactions();
  };

  return (
    <GlobalContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
