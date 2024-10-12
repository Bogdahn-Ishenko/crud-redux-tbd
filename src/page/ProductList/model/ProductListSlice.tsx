import {
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
} from '@reduxjs/toolkit';
import { reqProduct } from '../api/reqProduct';
import { RootState } from 'app/store/store';
import { act } from 'react';

export type TProductList = {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  current: boolean;
};

export interface IProductListState {
  value: Array<TProductList>;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: IProductListState = {
  value: [],
  status: 'idle',
};

export const productListAsync = createAsyncThunk(
  'productList/fetchProduct',
  async () => {
    const res: TProductList[] = await reqProduct();

    return res.map((product) => ({ ...product, current: false }));
  },
);

export const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    //! этот метод являлся излишним так как для обновления глобального состояния лучше и проще использовать productListAsync напрямую
    // update: (state, action: PayloadAction<Array<TProductList>>) => {
    //   state.value = action.payload;
    // },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter((item) => item.id !== action.payload);
    },
    addProduct: (state, action: PayloadAction<TProductList>) => {
      console.log('action.payload', action.payload.image);

      state.value = [action.payload, ...state.value];
    },
    openingProduct: (state, action: PayloadAction<number>) => {
      state.value = state.value.map((product) => ({
        ...product,
        current:
          product.id !== action.payload
            ? false
            : product.current === true
            ? false
            : true,
      }));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(productListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(productListAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectProductList = (state: RootState) => state.productList.value;
// console.log(selectProductList);

// export const { update } = productListSlice.actions;
export const { deleteProduct, addProduct, openingProduct } =
  productListSlice.actions;

export default productListSlice.reducer;
