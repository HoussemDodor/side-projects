import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  transactions: [
    { id: 1, text: "Bloemen", amount: -20 },
    { id: 2, text: "Loon", amount: 300 },
    { id: 3, text: "Boek", amount: -10 },
    { id: 4, text: "Camera", amount: 150 },
    { id: 5, text: "Camera", amount: 150 },
    { id: 6, text: "Camera", amount: 150 },
    { id: 7, text: "Camera", amount: 150 },
    { id: 8, text: "Camera", amount: 150 },
    { id: 9, text: "Camera", amount: 150 },
    { id: 10, text: "Camera", amount: 150 },
    { id: 11, text: "Camera", amount: 150 },
    { id: 12, text: "Camera", amount: 150 },
    { id: 13, text: "Camera", amount: 150 },
    { id: 14, text: "Camera", amount: 150 },
    { id: 15, text: "Camera", amount: 150 },
    { id: 16, text: "Camera", amount: 150 },
    { id: 17, text: "Camera", amount: 150 },
    { id: 18, text: "Camera", amount: 150 },
    { id: 19, text: "Camera", amount: 150 },
    { id: 20, text: "Camera", amount: 150 },
    { id: 21, text: "Camera", amount: 150 },
    { id: 22, text: "Camera", amount: 150 },
    { id: 23, text: "Camera", amount: 150 },
    { id: 24, text: "Camera", amount: 150 },
    { id: 25, text: "Camera", amount: 150 }
  ],
};

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
