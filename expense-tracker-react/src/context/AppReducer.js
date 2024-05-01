export const AppReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      localStorage.setItem("transactions", JSON.stringify({transactions: [action.payload, ...state.transactions]}));
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    case "DELETE_TRANSACTION":
      localStorage.setItem("transactions", JSON.stringify({transactions: state.transactions.filter((x) => x.id !== action.payload)}));
      return {
        ...state,
        transactions: state.transactions.filter((x) => x.id !== action.payload),
      };
    default:
      return state;
  }
};
