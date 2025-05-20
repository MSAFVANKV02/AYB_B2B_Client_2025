import AyButton from "@/components/myUi/AyButton";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "./style.css";
import { IOrders, IStoreOrder } from "@/types/orderTypes";
import Logo from "@/components/landings/navbar_Sec/Logo";
import { Separator } from "@/components/ui/separator";
import MyClock from "@/components/myUi/MyClock";

type Props = {
  orders: IOrders;
  storeOrders: IStoreOrder;
};

const InvoicePdf = ({ orders, storeOrders }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({ contentRef });


  return (
    <div>
      <AyButton
        onClick={reactToPrintFn}
        icon="solar:file-text-broken"
        iconSize={15}
        variant="outlined"
        outLineColor="#D0D5DD"
        sx={{
          color: "#667085",
          fontSize: "12px",
          height: "41px",
          borderRadius: "6px",
        }}
      >
        Invoice
      </AyButton>
      <div ref={contentRef} className="printContent p-4 flex flex-col gap-7">
        <div className="flex justify-between">
          <Logo />

          <h4 className="">Tax Invoice</h4>
        </div>
        <Separator />

        <div className="">
          <div className="flex flex-col ">
            <span className="text-sm text-black">
              <b>Invoice No:</b> {storeOrders.invoice}
            </span>
            <span className="text-sm text-black">
              <b> Order Date :</b>{" "}
              <MyClock
                date={orders.createdAt}
                showSeconds={false}
                showTime={false}
                className="text-black"
              />
            </span>
            <span className="text-sm text-black">
              <b> invoice Date :</b>{" "}
              <MyClock
                date={storeOrders.shipped_date}
                showSeconds={false}
                showTime={false}
                className="text-black"
              />
            </span>
          </div>
        </div>
        {/* ========================= */}

        <Separator />
        {/* 3. address details starts */}
        <div className="grid grid-cols-2 border border-black">
          <div className="border-r border-r-black p-3 flex flex-col">
            <h4 className="">Ship From:</h4>
            <span className="text-lg text-black capitalize">
              {storeOrders.store_info.name}
            </span>
            <span className="text-sm text-black w-[50%]">
              {storeOrders.store_info.Address}
            </span>

            <span className="text-sm text-black">
              {!storeOrders.store_info.Address.toLowerCase().includes(
                storeOrders.store_info.state.toLowerCase()
              ) && (
                <>
                  {storeOrders.store_info.state}
                  {", "}
                </>
              )}
              {!storeOrders.store_info.Address.toLowerCase().includes(
                storeOrders.store_info.country.toLowerCase()
              ) && (
                <>
                  {storeOrders.store_info.country}
                  {", "}
                </>
              )}
              {!storeOrders.store_info.Address.toLowerCase().includes(
                storeOrders.store_info.pinCode.toLowerCase?.() ??
                  storeOrders.store_info.pinCode
              ) && storeOrders.store_info.pinCode}
            </span>

            <span className="text-sm text-black">
              GSTIN/UIN: {storeOrders.store_info.gstNumber}
            </span>
          </div>
          {/* 3. shipped to */}
          <div className=" p-3 flex flex-col">
            <h4 className="">Ship To:</h4>
            <span className="text-lg text-black capitalize">
              {orders.shipping_address.name}
            </span>
            <span className="text-sm text-black w-[50%]">
              Building : {orders.shipping_address.building}
            </span>
            <span className="text-sm text-black w-[50%]">
              email : {orders.shipping_address.email}
            </span>
            <span className="text-sm text-black w-[50%]">
              mobile : {orders.shipping_address.mobile}
            </span>
            <span className="text-sm text-black w-[50%]">
              {orders.shipping_address.city}, {orders.shipping_address.state},{" "}
              {orders.shipping_address.country}, {orders.shipping_address.zip}
            </span>
          </div>
        </div>
        {/* ========================= */}
        <Separator />
        {/* product table start */}
        <table className="border border-black w-full text-sm text-left">
          <thead>
            <tr className=" bg-gray-100">
              <th className="p-2 border border-black">Product Name</th>
              <th className="p-2 border border-black">Size</th>
              <th className="p-2 border border-black">Total Qty</th>
              <th className="p-2 border border-black">Rate</th>
            </tr>
          </thead>
          <tbody>
            {storeOrders.items.map((item) => {
              const sizeMap: Record<string, { qty: number; amount: number; perPieceAmount: number; taxableAmount: number  }> =
                {};

              item.product.variations?.forEach((variation) => {
                variation.details?.forEach((detail) => {
                  if (!sizeMap[detail.size]) {
                    sizeMap[detail.size] = { qty: 0, amount: 0, perPieceAmount:0, taxableAmount:0 };
                  }

                  sizeMap[detail.size].qty += detail.quantity;
                //   sizeMap[detail.size].perPieceAmount += detail.taxable_amount + detail.gst;
                  sizeMap[detail.size].taxableAmount += detail.taxable_amount;
                });
              });

              return Object.entries(sizeMap).map(([size, data], idx) => (
                <tr key={`${idx}-${size}`} className="">
                  <td className="p-1 text-xs border-r border-b-0 border-r-black">{item.product.product_name}</td>
                  <td className="p-1 text-xs border-r border-b-0 border-r-black">{size}</td>
                  <td className="p-1 text-xs border-r border-b-0 border-r-black">{data.qty} pcs</td>
                  <td className="p-1 text-xs border-r border-b-0 border-r-black">₹ {data.taxableAmount.toFixed(2)}</td>
                </tr>
              ));
              
            })}
          </tbody>
          <tfoot className="border-t border-black bg-gray-100">
            <tr>
              <td className="p-2 font-bold" colSpan={4}>
                Total Amount: ₹ {storeOrders.order_total.total_amount.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="p-2 font-bold" colSpan={4}>
                Sizes Summary:
               
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default InvoicePdf;
