import { configureStore } from '@reduxjs/toolkit';
import productListReducer from 'page/ProductList/model/ProductListSlice';

export const store = configureStore({
  reducer: {
    productList: productListReducer,
    // comments: commentsReducer,
    // users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
