import AyButton from "@/components/myUi/AyButton";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "./style.css";
import { IOrders, IStoreOrder } from "@/types/orderTypes";
import Logo from "@/components/landings/navbar_Sec/Logo";
import { Separator } from "@/components/ui/separator";
import MyClock from "@/components/myUi/MyClock";
import { useAppSelector } from "@/providers/redux/hook";
import { useNumToWord } from "@/hooks/usable-hooks/num-to-word";
import InvoiceTable from "./invoice-table";

type Props = {
  orders: IOrders;
  storeOrders: IStoreOrder;
};

const InvoicePdf = ({ orders, storeOrders }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { userKyc } = useAppSelector((state) => state.auth);
  const { convert } = useNumToWord();

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
      {/* ====-======== pdf contents starts here ============
      ======================================================== */}

      <div
        ref={contentRef}
        className="printConten p-10 overflow-hidden flex min-h-[297mm] w-[210mm] bg-slate-50 flex-col relative "
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 flex gap-10">
          {Array.from({ length: 4 }, () => (
            <span className="text-6xl opacity-5 ">ayaboo.com</span>
          ))}
        </div>
        {/* main contents starts */}
        <div className="flex-1 flex flex-col space-y-3 w-full">
          <div className="flex justify-between">
            <Logo />

            <h5 className="">Tax Invoice</h5>
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
          <div className="">
            {/* 3. address details starts */}
            <div className="grid grid-cols-2 border border-black bg-white">
              <div className="border-r border-r-black p-3 flex flex-col leading-3">
                <h5 className="">Ship From:</h5>
                <span className="text-sm font-bold text-black capitalize">
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
              <div className=" p-3 flex flex-col gap-0 leading-3">
                <h5 className="">Ship To:</h5>
                <span className="text-sm font-bold text-black capitalize">
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
                  {orders.shipping_address.city},{" "}
                  {orders.shipping_address.state},{" "}
                  {orders.shipping_address.country},{" "}
                  {orders.shipping_address.zip}
                </span>
                <span className="text-sm text-black">
                  GSTIN/UIN: {userKyc?.gstNumber ?? "Not Provided"}
                </span>
              </div>
            </div>
            {/* ========================= */}
            {/* <Separator /> */}
            {/* product table start */}
            <InvoiceTable orders={orders} storeOrders={storeOrders} />
            {/* product table ends */}

          </div>
        </div>

        <footer className="mt-auto flex h-full justify-end flex-col">
          <div className="  grid grid-cols-2">
            <div className="text-sm p-5">
              Declaration: <br />
              <span className="text-xs text-black">
                We declare that this invoice shows the actual price of the goods
                described and that all particulars are true and correct.
              </span>
            </div>
            <div className="border border-black h-full bg-white flex flex-col items-end p-1 justify-between">
              <span className="capitalize text-black font-semibold">
                {storeOrders.store_info.name}
              </span>
              <span className="capitalize text-black">
                Authorized Signatory
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default InvoicePdf;
