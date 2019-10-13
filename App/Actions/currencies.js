import {
  SWAP_CURRENCY,
  CHANGE_CURRENCY_AMOUNT,
  CHANGE_BASE_CURRENCY,
  CHANGE_QUOTE_CURRENCY,
  GET_INITIAL_CONVERSION
} from "./actionTypes";

export const swapCurrency = () => ({
  type: SWAP_CURRENCY
});

export const changeCurrencyAmount = amount => ({
  type: CHANGE_CURRENCY_AMOUNT,
  amount: parseFloat(amount)
});

export const changeBaseCurrency = currency => ({
  type: CHANGE_BASE_CURRENCY,
  currency
});

export const changeQuoteCurrency = currency => ({
  type: CHANGE_QUOTE_CURRENCY,
  currency
});

export const getInitialConversion = () => ({
  type: GET_INITIAL_CONVERSION
});
