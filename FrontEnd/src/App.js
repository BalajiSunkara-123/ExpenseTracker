import './App.css';
import Header from './components/header';
import Balance from './components/balance';
import IncomeExpences from './components/incomeExpences';
import TransactionList from './components/transactionList';
import AddTransaction from './components/addTransaction';
import Login from './pages/login';
import HomePage from './pages/homePage';
import Register from './pages/register';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { GlobalProvider } from './context/globalState';

function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem('authToken');
  return isLoggedIn ? children : <Navigate to="/login" />;
}
function App() {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;
