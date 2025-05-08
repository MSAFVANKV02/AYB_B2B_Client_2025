import PaymentMethods from "@/components/checkout/shipping-methods/payment-methods"
import { Icon } from "@iconify/react/dist/iconify.js"


function SelectedPayment() {
  return (
    <div className="flex flex-col gap-3">
           <p className="font-bold flex items-center gap-1">
          {" "}
          <Icon
            icon="carbon:delivery-truck"
            className="text-lg text-textMain"
          />
          Choose shipping method
        </p>

        <div className="md:ml-6">
              <PaymentMethods />
        </div>
    </div>
  )
}

export default SelectedPayment