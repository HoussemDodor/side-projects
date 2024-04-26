import "./App.css";
import { Navbar } from "./components/Navbar";
import { Balance } from "./components/Balance";
import { IncomeExpenses } from "./components/IncomeExpenses";
import { TransactionList } from "./components/TransactionList";
import { AddTransaction } from "./components/AddTransaction";

import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <GlobalProvider>
      <Navbar />
      <div className="sidebar">
        <Balance />
        <IncomeExpenses />
        <AddTransaction />
      </div>
      <div className="content">
        <TransactionList />
      </div>
    </GlobalProvider>
  );
}

export default App;
