import './App.css';
import Header from './components/header';
import Balance from './components/balance';
import IncomeExpences from './components/incomeExpences';
import TransactionList from './components/transactionList';
import AddTransaction from './components/addTransaction';

import { GlobalProvider } from './context/globalState';
function App() {
  return (
    <GlobalProvider>
      <Header />
      <div className="container">
        <Balance />
        <IncomeExpences />
        <TransactionList />
        <AddTransaction />
      </div>
    </GlobalProvider>
  );
}

export default App;
