import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { v4 as uuid } from 'uuid';

export const AddTransaction = () => {
  const { addTransaction } = useContext(GlobalContext);

  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: uuid(),
      amount: +amount, // By adding the "+" before the variable it converts it into a number
      text
    };

    addTransaction(newTransaction);
  };
  return (
    <>
      <h3>Nieuwe transactie toevoegen</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Tekst</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Beschrijving..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Aantal €</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button className="btn">Transactie toevoegen</button>
      </form>
    </>
  );
};
