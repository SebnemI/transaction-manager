import "./App.css";
import TransactionForm from "./components/TransactionForm";
import TransactionHistory from "./components/TransactionsList";
import { TransactionProvider } from "./TransactionContext/TransactionContext";

function App() {
  return (
    <TransactionProvider>
      <div className="App">
        <div>
          <h1>Transaction Manager</h1>
        </div>
        <div className="container">
          <TransactionForm></TransactionForm>
          <TransactionHistory></TransactionHistory>
        </div>
      </div>
    </TransactionProvider>
  );
}

export default App;
