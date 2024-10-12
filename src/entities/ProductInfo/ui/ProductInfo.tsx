import { useAppSelector } from 'app/hooks/hooks';
import classNames from 'classnames';
import styles from './ProductInfo.module.css';
import global from '../../../app/assets/global.module.css';

export default function ProductInfo() {
  const currentProduct = useAppSelector(
    (state) => state.productList.value,
  ).find((product) => product.current === true);
  console.log(currentProduct);

  return (
    <section
      className={classNames(styles.productInfoWrapper, global.container)}
    >
      {currentProduct && (
        <div className={styles.productInfoContainer}>
          <div className={classNames(styles.productTextInfo, global.item)}>
            <div className={styles.productID}>
              <p>{currentProduct.id}</p>
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.productTitle}>{currentProduct?.title}</h3>
              <p className={styles.productCategory}>
                {currentProduct?.category}
              </p>
              <p className={styles.productDescription}>
                {currentProduct?.description}
              </p>
            </div>
            <div className={styles.productPrice}>
              <p>{currentProduct.price} $</p>
            </div>
          </div>
          <div className={classNames(styles.productImage, global.item)}>
            <img src={currentProduct.image} alt="Product" />
          </div>
        </div>
      )}
    </section>
  );
}
