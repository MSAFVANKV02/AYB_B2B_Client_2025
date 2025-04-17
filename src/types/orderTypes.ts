export type IOrderItem = {
  size: string; // Size of the product (e.g., "S")
  count: number; // Quantity of the product
  color: string; // Color of the product as a string (e.g., "red")
};
export type OrderStatus = "Pending" | "Confirmed" | "Shipped" | "Delivered"
export type PaymentStatus = "Pending" | "Confirmed" 


export type IOrder = {
  id: number; // Unique identifier for the order
  slug:string; // Order
  productName: string; // Name of the product
  subtotal: number; // Total amount for the product
  orderDate: string; // Date when the order was placed
  deliveryDate: string; // Date when the order was delivered
  OrderStatus: OrderStatus;
  deliveryStatus: "Delivered" | "Pending" | "Cancelled"; // Status of the delivery
  paymentStatus: PaymentStatus; // Status of the payment
  itemQuantity: IOrderItem[]; // Array of items in the order with details
};
