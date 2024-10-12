import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import ProductList from 'page/ProductList';
import './assets/resetStyle.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProductList />,
  },
]);
const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
