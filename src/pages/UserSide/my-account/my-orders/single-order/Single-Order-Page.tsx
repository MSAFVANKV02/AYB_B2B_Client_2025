import SettingsLayout from "../../layout";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Separator } from "@/components/ui/separator";
import { OrderStatusStepper } from "./OdrerStatus";
import { IOrder } from "@/types/orderTypes";
import "@/assets/css/remover.css";
import { Input } from "@/components/ui/input";
import PdfFile from "@/pages/UserSide/UserKycPage/KycDetails/PdfFile";

import { useWindowWidth } from "@react-hook/window-size";
import useNavigateClicks from "@/hooks/useClicks";
import MyBackBtn from "@/components/myUi/myBackBtn";
import AyButton from "@/components/myUi/AyButton";
import GstDropDown from "@/components/myUi/GstDropDown";

export default function SingleOrderPage() {
  const onlyWidth = useWindowWidth();
  const { handleClick } = useNavigateClicks();
  const order: IOrder = {
    id: 1,
    slug: "order-12345",
    productName: "Smartphone",
    subtotal: 550,
    orderDate: "2024-11-01",
    deliveryDate: "2024-11-05",
    OrderStatus: "Confirmed",
    deliveryStatus: "Pending",
    paymentStatus: "Confirmed",
    itemQuantity: [
      { size: "M", count: 1, color: "Black" },
      { size: "M", count: 1, color: "red" },
    ],
  };
  return (
    <SettingsLayout>
      {/* =========== */}
      <div className="flex h-fit lg:flex-row gap-3 flex-col justify-between">
        {/* First row =============== */}
        <div className="flex flex-col gap-4 lg:w-[60%] w-full">
          {/* ======  back btn ======= */}
        
            <MyBackBtn icon={"bx:arrow-back"} />
         

          {/* order id ========= */}
          <span className="sm:text-sm text-xs">OD564756-4674676</span>

          {/* ===== Address Starts  */}
          <div className="flex flex-col sm:gap-3 gap-2">
            <span className="sm:text-sm text-xs text-black">
              Delivery Address
            </span>
            <div className="flex flex-col">
              <span className="sm:text-sm text-xs text-black">Name</span>
              <span className="sm:text-sm text-xs">Address</span>
              <span className="sm:text-sm text-xs">Email: </span>
              <span className="tsm:text-sm text-xs text-black">
                Phone Number: +91-12253464
              </span>
            </div>
          </div>
          {/* ===== Address Ends  */}

          <Separator />
          <span className="sm:text-sm text-xs">
            No Refund Available <br />
            No Return Policy, Know More
          </span>
          <Separator />

          {/* Products Details ======= starts*/}
          <div className="flex gap-3">
            <img
              src="/img/products/Group 710.jpg"
              alt="Order Prod-img | ayaaboo"
              className="w-20 rounded-md shadow-md border "
            />

            <div className="">
              <p>{order.productName}</p>
              <div className="flex gap-1 items-center">
                <span className="sm:text-sm text-xs">Subtotel:</span>
                <span className="sm:text-sm text-xs text-black">
                  {order.subtotal}Rs
                </span>
              </div>
              {/* ------------- */}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {order.itemQuantity.map((item, i) => (
              <div key={i} className="flex  gap-2 items-center">
                <div
                  className=""
                  style={{
                    backgroundColor: item.color,
                    borderRadius: "50%",
                    width: "12px",
                    height: "12px",
                    display: "inline-block",
                  }}
                />
                <span className="text-black sm:text-sm text-xs">
                  {item.size} x
                </span>
                <span className="sm:text-sm text-xs">{item.count}</span>
                <span className="sm:text-sm text-xs">times</span>
              </div>
            ))}
          </div>

          {/* ==== price and Gst List starts ===== */}
          <div className="flex w-full">
            <p>Total:</p>

           <GstDropDown />
          </div>
          {/* ==== price and Gst List Ends ===== */}

          <div className="flex flex-col gap-4">
            {/* No:1 */}
            <div className="flex md:flex-row flex-col gap-3 md:items-center justify-between">
              <span className="w-auto whitespace-nowrap">
                Shipping Partner Name
              </span>
              <Input
                type="text"
                placeholder="Name"
                className="bg-gray-100 md:w-3/4 w-full rounded-xl"
              />
            </div>

            {/* No:2 */}
            <div className="flex md:flex-row flex-col gap-3 md:items-center justify-between">
              <span className="w-auto whitespace-nowrap">LR No.</span>
              <Input
                type="text"
                placeholder="Name"
                className="bg-gray-100 md:w-3/4 w-full  rounded-xl"
              />
            </div>
            {/* No:3 */}
            <div className="flex md:flex-row flex-col gap-3 md:items-center justify-between">
              <span className="w-auto whitespace-nowrap">LR Photo</span>
              {/* --- */}
              <div className="md:w-3/4 w-full flex items-start ">
                <a
                  href={"/Invoice_INV1482989614215502 (16).pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative"
                >
                  {/* <p>Uploaded File: {uploadedFile.name}</p> */}

                  <PdfFile
                    fileURL={"/Invoice_INV1482989614215502 (16).pdf"}
                    className="h-16 w-16"
                  />
                  <div className="absolute h-16 w-16 bg-black/50 top-0 rounded-md flex items-center justify-center ">
                    <Icon icon="solar:eye-bold" fontSize={25} color="#fff" />
                  </div>
                </a>
              </div>
              {/* --- */}
            </div>
            {/* No:4 */}
            <div className="flex md:flex-row flex-col gap-3 md:items-center justify-between">
              <span className="w-auto whitespace-nowrap">Return bill pdf</span>
              <div className="md:w-3/4 w-full flex items-start ">
                <a
                  href={"/Invoice_INV1482989614215502 (16).pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative"
                >
                  {/* <p>Uploaded File: {uploadedFile.name}</p> */}

                  <PdfFile
                    fileURL={"/Invoice_INV1482989614215502 (16).pdf"}
                    className="h-16 w-16"
                  />
                  <div className="absolute h-16 w-16 bg-black/50 top-0 rounded-md flex items-center justify-center ">
                    <Icon icon="solar:eye-bold" fontSize={25} color="#fff" />
                  </div>
                </a>
              </div>
            </div>
            {/* No:5 */}
            <div className="flex md:flex-row flex-col gap-3 md:items-center justify-between">
              <span className="w-auto whitespace-nowrap">Date</span>
              <Input
                type="text"
                placeholder="Date"
                className="bg-gray-100 md:w-3/4 w-full  rounded-xl"
              />
            </div>
          </div>

          {/* footer lists */}

          {/* ----- end of first row-------- */}
        </div>

        {/* Second row */}
        <div className="lg:w-[40%] w-full">
          <OrderStatusStepper order={order} />
        </div>
      </div>
      <div className="mt-20">
        <Separator />

        {/* footer starts */}

        <div className="flex justify-between my-5 gap-2 flex-wrap">
          <button
            type="button"
            className="text-sm text-gray-500 hover:underline"
          >
            Create Order
          </button>
          <div className="flex sm:items-center sm:gap-4 gap-2 flex-wrap">
            {/* == */}
            <button className="underline underline-offset-4 text-sm">
              Chat with us
            </button>
            {/* === */}
            <AyButton
              title="Rate & review this product"
              onClick={() => {
                handleClick(`${window.location.pathname}/review/4353453453453`);
              }}
              variant="outlined"
              outLineColor="#CACACA"
              sx={{
                width: "fit-content",
                px: "20px",
                color: "#5B5B5B",
                ml: onlyWidth > 768 ? "2rem" : "",
              }}
            />
            {/* == */}
            <AyButton
              title="Invoice"
              variant="outlined"
              outLineColor="gray"
              icon="material-symbols-light:download"
              iconSize={20}
              sx={{
                width: "fit-content",
                px: "20px",
              }}
            />
          </div>
        </div>

        {/* footer ends */}
      </div>
    </SettingsLayout>
  );
}
