// function updateCart(cart, variant, size, newQuantity) {
//     const variantIndex = cart.findIndex(v => v.variantId === variant.variantId);
  
//     if (variantIndex === -1) {
//       // Variant not in cart, add if quantity > 0
//       if (newQuantity > 0) {
//         cart.push({
//           ...variant,
//           sizes: [{ size, quantity: newQuantity }],
//           totalQuantity: newQuantity,
//           purchase_Amount: getPurchaseAmount(variant.price_per_pieces, newQuantity)
//         });
//       }
//       return cart;
//     }
  
//     const currentVariant = cart[variantIndex];
//     const sizeIndex = currentVariant.sizes.findIndex(s => s.size === size);
  
//     if (newQuantity > 0) {
//       if (sizeIndex === -1) {
//         currentVariant.sizes.push({ size, quantity: newQuantity });
//       } else {
//         currentVariant.sizes[sizeIndex].quantity = newQuantity;
//       }
//     } else if (sizeIndex !== -1) {
//       currentVariant.sizes.splice(sizeIndex, 1);
//     }
  
//     // If no sizes left, remove the variant
//     if (currentVariant.sizes.length === 0) {
//       cart.splice(variantIndex, 1);
//       return cart;
//     }
  
//     // Recalculate totalQuantity and purchase_Amount
//     const totalQuantity = currentVariant.sizes.reduce((sum, s) => sum + s.quantity, 0);
//     currentVariant.totalQuantity = totalQuantity;
//     currentVariant.purchase_Amount = getPurchaseAmount(currentVariant.price_per_pieces, totalQuantity);
  
//     return cart;
//   }

//   export default updateCart
  
//   function getPurchaseAmount(pricing, totalQty) {
//     const priceObj = pricing.find(p => totalQty >= p.minPiece && totalQty <= p.maxPiece);
//     return priceObj ? priceObj.purchase_Amount : 0;
//   }
  