import {
  SWAP_CURRENCY,
  CHANGE_CURRENCY_AMOUNT,
  CHANGE_BASE_CURRENCY,
  CHANGE_QUOTE_CURRENCY
} from "../Actions/actionTypes";
// import { swapCurrency, changeCurrencyAmount } from "../Actions/currencies";

const initialState = {
  baseCurrency: "USD",
  quoteCurrency: "GBP",
  amount: 100,
  conversions: {}
};

// ...state means copy all of the current state

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CURRENCY_AMOUNT:
      return {
        ...state,
        amount: action.amount || 0
      };
    case SWAP_CURRENCY:
      return {
        ...state,
        baseCurrency: state.quoteCurrency,
        quoteCurrency: state.baseCurrency
      };

    case CHANGE_BASE_CURRENCY:
      return {
        ...state,
        baseCurrency: action.currency
      };
    case CHANGE_QUOTE_CURRENCY:
      return {
        ...state,
        quoteCurrency: action.currency
      };
    default:
      return state;
  }
};

export default reducer;
