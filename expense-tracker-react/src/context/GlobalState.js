import React, { createContext, useReducer } from "react";
import { AppReducer } from "./AppReducer";
import transactionData from "../data/data.json";

const initialState = JSON.parse(localStorage.getItem("transactions")) ?? transactionData
localStorage.setItem("transactions", JSON.stringify(initialState))


export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function deleteTransaction(id) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
