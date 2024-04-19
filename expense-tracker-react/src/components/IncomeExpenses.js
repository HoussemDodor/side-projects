import React, { useContext } from "react";

import { GlobalContext } from "../context/GlobalState";

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map((x) => x.amount);
  const income = amounts.filter(x => x > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
  const expense = amounts.filter(x => x < 0).reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Inkomen</h4>
        <p className="money plus">+€{income}</p>
      </div>
      <div>
        <h4>Uitgave</h4>
        <p className="money minus">-€{expense}</p>
      </div>
    </div>
  );
};
