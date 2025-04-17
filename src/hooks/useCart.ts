// import { useCallback } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../redux/store';
// import { addToCart, removeFromCart, updateCartItemQuantity } from '../features/cart/cartSlice';
// import { Product } from '../types/product';

// interface UseCartResult {
//   cartItems: CartItem[];
//   totalAmount: number;
//   handleAddToCart: (product: Product) => void;
//   handleRemoveFromCart: (id: number) => void;
//   handleUpdateQuantity: (id: number, quantity: number) => void;
// }

// const useCart = (): UseCartResult => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state: RootState) => state.cart.items);
//   const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);

//   const handleAddToCart = useCallback(
//     (product: Product) => {
//       dispatch(addToCart(product));
//     },
//     [dispatch]
//   );

//   const handleRemoveFromCart = useCallback(
//     (id: number) => {
//       dispatch(removeFromCart(id));
//     },
//     [dispatch]
//   );

//   const handleUpdateQuantity = useCallback(
//     (id: number, quantity: number) => {
//       dispatch(updateCartItemQuantity({ id, quantity }));
//     },
//     [dispatch]
//   );

//   return {
//     cartItems,
//     totalAmount,
//     handleAddToCart,
//     handleRemoveFromCart,
//     handleUpdateQuantity,
//   };
// };

// export default useCart;
