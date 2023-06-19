import { createStore } from 'redux';
import cartsReducer from './reducer/cartsReducer';

export const store = createStore(cartsReducer as any);
