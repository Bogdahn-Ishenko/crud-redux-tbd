export async function reqProduct() {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    if (!res.ok) {
      throw new Error(`Ошибка при получении данных ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    throw error;
  }
}
