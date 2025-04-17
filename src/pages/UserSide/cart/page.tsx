
import OrderSummary from "@/components/checkout/OrderSummary";
import useNavigateClicks from "@/hooks/useClicks";
import CartDetails from "@/components/cart/CartDetails";
import { cartDetailsData } from "@/data/dummyData/carData";
import CartLayout from "./layout";




const ShoppingCart = () => {
  // const onlyWidth = useWindowWidth();
  const { handleClick } = useNavigateClicks();
 

  return (
    <CartLayout >
      {/* Shopping Cart Section */}
      <div className="md:w-3/4 w-full">
        <h1 className="text-2xl font-semibold mb-4">Shopping cart</h1>
        {/* <div className="flex items-center mb-4">
          <Checkbox
            color="default"
            sx={{
              "&.Mui-checked": {
                color: "#5F08B1", // Custom color when checked
              },
            }}
          />
          <span className="text-gray-600">Select all items</span>
        </div> */}

        {/* Product Section */}
          <CartDetails
          details={cartDetailsData}
          title={'items'}
          isCollapsible
          isAllSelect
          />
      </div>

      {/* Order Summary Section ======== = == = ====== ======= = ===*/}
      <OrderSummary
        gst={18}
        discount={20}
        cess={2}
        itemSubTotal={500}
        shippingCharge={20}
        subTotal={550}
        totalPrice={600}
        totalItems={3}
       btnLabel="Checkout"
        handleClick={() => handleClick("/cart/checkout")}
      />
    </CartLayout>
  );
};

export default ShoppingCart;
