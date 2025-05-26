// cart/CartLayout.tsx
import React from "react";

interface CartLayoutProps {
  children: React.ReactNode;
}

const CartLayout: React.FC<CartLayoutProps> = ({ children }) => {
  return (
    <main className="flex lg:flex-row flex-col justify-between sm:px-0  min-h-screen  gap-4 lg:my-10 my-5">
      {children}
    </main>
  );
};
 
export default CartLayout;
