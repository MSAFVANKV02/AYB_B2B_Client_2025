// import { useEffect, useState, useMemo } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchProducts } from '../features/product/productThunks';
// import { RootState } from '../redux/store';

// interface UseProductsResult {
//   products: Product[];
//   filteredProducts: Product[];
//   isLoading: boolean;
//   error: string | null;
// }

// const useProducts = (): UseProductsResult => {
//   const dispatch = useDispatch();
//   const { items: products, status, error } = useSelector((state: RootState) => state.products);
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

//   // Fetch products when the component mounts
//   useEffect(() => {
//     if (products.length === 0) {
//       dispatch(fetchProducts());
//     }
//   }, [dispatch, products.length]);

//   // Filter products by category if a category is selected
//   const filteredProducts = useMemo(() => {
//     if (selectedCategory) {
//       return products.filter(product => product.category === selectedCategory);
//     }
//     return products;
//   }, [products, selectedCategory]);

//   return {
//     products,
//     filteredProducts,
//     isLoading: status === 'loading',
//     error,
//   };
// };

// export default useProducts;
