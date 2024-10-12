import { useAppDispatch } from 'app/hooks/hooks';
import {
  deleteProduct,
  openingProduct,
  TProductList,
} from 'page/ProductList/model/ProductListSlice';
import styles from './ProductItem.module.css';
import global from '../../../app/assets/global.module.css';
import { Close } from 'app/assets/icons';
import classNames from 'classnames';

export function ProductItem({ id, title, current }: TProductList): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div
      className={classNames(
        styles.productItem,
        {
          [styles.productItemOpen]: current,
        },
        global.item,
      )}
      onClick={() => dispatch(openingProduct(id))}
    >
      <div className={styles.productData}>
        <div className={styles.productDescription}>
          <p>{title}</p>
        </div>
      </div>
      <div className={styles.productControls}>
        <button
          className={styles.deleteProduct}
          onClick={() => dispatch(deleteProduct(id))}
        >
          <Close className={styles.deleteProductImage} />
        </button>
      </div>
    </div>
  );
}
