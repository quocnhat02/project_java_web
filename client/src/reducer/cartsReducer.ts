export interface CartsState {
  numCarts: number;
}

const initialState = {
  numCarts: 0,
};

type Action = { type: 'UPDATE_CART'; payload: number };

const cartsReducer = (state: CartsState = initialState, action: Action) => {
  switch (action.type) {
    case 'UPDATE_CART': {
      return { ...state, numCarts: action.payload };
    }
    default:
      return state;
  }
};

export default cartsReducer;
