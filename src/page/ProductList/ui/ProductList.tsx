import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks/hooks';
import {
  addProduct,
  productListAsync,
  selectProductList,
} from '../model/ProductListSlice';
import ProductItem from 'entities/ProductItem';
import RoundAddButton from 'shared/RoundAddButton';
import { Plus } from 'app/assets/icons';
import ProductAddForm from 'entities/ProductAddForm';
import ProductInfo from 'entities/ProductInfo';
import styles from './ProductList.module.css';
import global from '../../../app/assets/global.module.css';
import classNames from 'classnames';

export function ProductList() {
  const productList = useAppSelector(selectProductList);
  const productStatus = useAppSelector((state) => state.productList.status);
  const dispatch = useAppDispatch();
  const ProductAddFormRef = useRef<HTMLDialogElement>(null);

  const [openAddProductForm, setOpenAddProductForm] = useState(false);

  const handlerOpenAddProductForm = () => {
    setOpenAddProductForm((prev) => !prev);
    if (ProductAddFormRef.current) {
      const dialog = ProductAddFormRef.current;

      if (!openAddProductForm) {
        dialog.showModal();
      } else {
        dialog.close();
      }
    }
  };

  useEffect(() => {
    dispatch(productListAsync());
  }, []);

  return (
    <div className={styles.productListContent}>
      <menu className={styles.productListControls}>
        <button
          className={styles.productListUpdate}
          onClick={() => dispatch(productListAsync())}
        >
          Обновить
        </button>
      </menu>
      <div className={styles.productListContentWrapper}>
        <div className={styles.productListWrapper}>
          <main className={classNames(styles.productList, global.container)}>
            {productStatus === 'loading' ? (
              <div>Загрузка...</div>
            ) : productList && productList.length > 0 ? (
              productList.map((productItem) => (
                <ProductItem {...productItem} key={productItem.id} />
              ))
            ) : (
              <p>No products available</p>
            )}
          </main>
        </div>
        <ProductInfo />
      </div>
      <RoundAddButton onClick={handlerOpenAddProductForm}>
        <Plus />
      </RoundAddButton>
      <ProductAddForm
        onOpenAddProductForm={handlerOpenAddProductForm}
        ref={ProductAddFormRef}
      />
    </div>
  );
}
