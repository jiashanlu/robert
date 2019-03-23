import { LOAD_ORDER_FORM } from './types';

// LOAD ORDER FORM

export const loadOrderForm = data => {
  return {
    type: LOAD_ORDER_FORM,
    payload: data
  };
};
