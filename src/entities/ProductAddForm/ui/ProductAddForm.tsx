import { forwardRef, useState } from 'react';
import styles from './ProductAddForm.module.css';
import { useAppDispatch, useAppSelector } from 'app/hooks/hooks';
import classNames from 'classnames';
import {
  addProduct,
  selectProductList,
  TProductList,
} from 'page/ProductList/model/ProductListSlice';
import { read } from 'fs';

type TProductAddFormProps = {
  onOpenAddProductForm: () => void;
};

type TSelectOptions = {
  value: string;
  text: string;
  disabled?: boolean;
}[];

const ProductAddForm = forwardRef<HTMLDialogElement, TProductAddFormProps>(
  ({ onOpenAddProductForm }, ref) => {
    const [imageProduct, setImageProduct] = useState<File[]>([]);
    const [dragActive, setDragActive] = useState(false);
    const dispatch = useAppDispatch();

    const category = [
      ...new Set(
        useAppSelector((state) => state.productList.value).map(
          (product) => product.category,
        ),
      ),
    ];

    const handlerCreateNewProduct = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const reader = new FileReader();
      const file = formData.get('image') as File | null;
      console.log('file', file);

      try {
        if (!file) {
          throw new Error(`Ошибка при получении данных изображения ${file}`);
        }

        reader.onloadend = () => {
          const newProduct: TProductList = {
            id: Date.now(),
            title: String(formData.get('title')),
            price: String(formData.get('price')),
            category: String(formData.get('category')),
            description: String(formData.get('description')),
            image: String(reader.result),
            current: true,
          };

          for (const field in newProduct) {
            if (
              field !== 'image' &&
              !newProduct[field as keyof typeof newProduct]
            ) {
              throw new Error(
                `Ошибка при создании карточки продукта связанная с: ${field} - ${
                  newProduct[field as keyof typeof newProduct]
                }`,
              );
            }
          }

          console.log('newProduct.image ДО', String(reader.result));
          console.log('newProduct.image', newProduct.image);

          dispatch(addProduct(newProduct));
          onOpenAddProductForm();
        };

        reader.readAsDataURL(file);
      } catch (error) {
        throw error;
      }
    };

    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.target.files && e.target.files[0]) {
        setImageProduct([...e.target.files]);
      }
    };
    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragActive(true);
    };

    const handleLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragActive(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        setImageProduct([...e.dataTransfer.files]);
      }
    };

    return (
      <div className={styles.productAddForm}>
        <dialog
          ref={ref}
          className={styles.productAddDialog}
          id="productAddDialog"
          aria-modal="true"
        >
          <form
            className={styles.dialogForm}
            method="dialog"
            onSubmit={(e) => handlerCreateNewProduct(e)}
          >
            <label className={styles.dialogFormElem} htmlFor="title">
              <span className={styles.dialogFormElemTitle}>Заголовок</span>
              <input
                className={classNames(
                  styles.dialogFormElemInput,
                  styles.dialogFormElemField,
                )}
                id="title"
                type="text"
                name="title"
                placeholder="Интересное название ? "
                required
              />
            </label>
            <label className={styles.dialogFormElem} htmlFor="price">
              <span className={styles.dialogFormElemTitle}>Цена</span>
              <input
                className={classNames(
                  styles.dialogFormElemInput,
                  styles.dialogFormElemField,
                )}
                id="price"
                type="text"
                name="price"
                placeholder="Приятная цена ? "
                required
              />
            </label>
            <label className={styles.dialogFormElem} htmlFor="category">
              <span className={styles.dialogFormElemTitle}>Категория</span>
              <select
                className={classNames(
                  styles.dialogFormElemSelect,
                  styles.dialogFormElemField,
                )}
                name="category"
                id="category"
                defaultValue={'DEFAULT'}
              >
                <option value={'DEFAULT'} disabled>
                  Выбрать категорию
                </option>
                {category.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.dialogFormElem} htmlFor="description">
              <span className={styles.dialogFormElemTitle}>Описание</span>
              <textarea
                className={classNames(
                  styles.dialogFormElemTextArea,
                  styles.dialogFormElemField,
                )}
                name="description"
                id="description"
                rows={4}
                spellCheck="false"
                required
              ></textarea>
            </label>
            <div className={classNames(styles.dialogFormElem)}>
              <span className={styles.dialogFormElemTitle}>
                Загрузить изображение
              </span>
              <div
                className={classNames(
                  styles.dialogFormElemImage,
                  styles.dialogFormElemField,
                  { [styles.drag]: dragActive },
                )}
                onDragEnter={(e) => handleDrag(e)}
                onDragOver={(e) => handleDrag(e)}
                onDragLeave={(e) => handleLeave(e)}
                onDrop={(e) => handleDrop(e)}
              >
                <span className={styles.dialogFormElemImageText}>
                  <h2>Перетащите сюда изображение</h2>
                  <p>или</p>
                </span>
                <label
                  className={styles.dialogFormElemImageLoad}
                  htmlFor="image"
                >
                  <span>Выбрать файл</span>
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    id="image"
                    onChange={(e) => handleChangeImage(e)}
                  />
                </label>
              </div>
              {imageProduct &&
                imageProduct.map(({ name }, id) => (
                  <span className={styles.imageProduct} key={id}>
                    {name}
                  </span>
                ))}
            </div>

            <menu className={styles.productAddFormControls}>
              <button type="reset" onClick={onOpenAddProductForm}>
                Отмена
              </button>
              <button type="submit">Создать</button>
            </menu>
          </form>
        </dialog>
      </div>
    );
  },
);

export default ProductAddForm;
