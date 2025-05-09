import PaymentMethods from "@/components/checkout/shipping-methods/payment-methods";
import { Icon } from "@iconify/react/dist/iconify.js";

function SelectedPayment() {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-bold flex items-center gap-1">
        {" "}
        <Icon
          icon="fluent:payment-32-regular"
          className="text-lg text-textMain"
        />
        Choose Payment method
      </p>

      <div className="md:ml-6">
        <PaymentMethods />
      </div>
    </div>
  );
}

export default SelectedPayment;
