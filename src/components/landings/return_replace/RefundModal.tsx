import GstDropDown from "@/components/myUi/GstDropDown";
import MyBackBtn from "@/components/myUi/myBackBtn";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useContextPage } from "@/providers/context/context";
import { useEffect } from "react";

import { FaEye } from "react-icons/fa";
import Modal from "react-modal";
import RefundModalForm from "./RefundModalForm";
Modal.setAppElement("#root");

export default function RefundModal() {
  const { isOpenModal, handleOpenModal, handleCloseModal } = useContextPage();

  // ========  Preventing Scroll Behind Modal ======
  useEffect(() => {
    if (isOpenModal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    // Cleanup when component unmounts
    return () => document.body.classList.remove("no-scroll");
  }, [isOpenModal]);

  return (
    <div>
      {/* Modal Trigger ==== */}
      <button
        onClick={handleOpenModal}
        className="text-textGray hover:text-blue-800"
      >
        <FaEye className="inline-block" /> {/* Eye icon */}
      </button>

      {/* Modal Starts here */}
      <Modal
        isOpen={isOpenModal}
        onRequestClose={handleCloseModal}
        shouldCloseOnOverlayClick={true}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] "
        className={`bg-white rounded-lg  max-w-xl p-4 md:max-h-[80vh] h-full  w-full overflow-y-auto relative z-[10001]`}
      >
        {/* Modal Details */}
        <div className="flex flex-col h-full justify-between">
          {/* First Row ===== */}
          <div className="space-y-3  w-full">

            {/* close Button starts ====== */}
            <div className="mb-3">
              <MyBackBtn
                clickEvent={handleCloseModal}
                iconSize={30}
                className=" float-right"
                tooltipTitle="close"
                placeTooltip="left"
                icon="ei:close"
              />
            </div>
            {/* close Button Ends ====== */}

            {/* Fields */}
            <div className="">
               <RefundModalForm />
            </div>

            {/* order-ID starts ======= */}
            <div className="w-full flex justify-between items-center">
              <span className="sm:text-sm text-xs">OD564756-4674676</span>
              <span className="sm:text-sm text-xs text-green-500">
                Approved
              </span>
            </div>

            {/* Store Details ===== */}
            <div className="flex flex-col sm:gap-3 gap-2 border-b pb-5">
              <p className=" text-black">Store Details</p>
              <div className="flex flex-col">
                <span className="sm:text-sm text-xs text-black">Name</span>
                <span className="sm:text-sm text-xs">Address</span>
                <span className="sm:text-sm text-xs">Email: </span>
                <span className="sm:text-sm text-xs text-black">
                  Phone Number: +91-12253464
                </span>
                <span className="sm:text-sm text-xs text-black">
                  GST Number
                </span>
              </div>
            </div>

            {/* Product Details starts ====== */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <div className="w-20 h-20 overflow-hidden rounded-sm ">
                  <img
                    src="/img/products/image 79.png"
                    className="object-cover w-full h-full"
                    alt=""
                  />
                </div>
                <div className="">
                  <p>Oversized 100% Cotton 190GSM 240GSM Plain White T Shirt</p>
                  <span>Subtotal:</span>{" "}
                  <span className="text-black">$2003</span>
                </div>
              </div>
              {/* ==== product variants starts ===== */}
              <div className="">
                <table className="table-auto md:w-3/4 w-full ">
                  <thead className=" text-left">
                    <tr>
                      <th className="px-4 py-2 text-textGray text-sm ">
                        Variant
                      </th>
                      <th className="px-4 py-2 text-textGray text-sm ">
                        Price
                      </th>
                      <th className="px-4 py-2 text-textGray text-sm ">
                        Return Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 text-textGray text-sm ">
                        <img
                          src="/img/products/image 78.png"
                          className="w-10 h-12"
                          alt="return products"
                        />
                      </td>
                      <td className="px-4 py-2 text-textGray text-sm ">$500</td>
                      <td className="px-4 py-2 text-textGray text-sm ">
                        <Input
                          type="number"
                          className="border border-black  w-14 h-8"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-textGray text-sm ">
                        <img
                          src="/img/products/image 78.png"
                          className="w-10 h-12"
                          alt="return products"
                        />
                      </td>
                      <td className="px-4 py-2 text-textGray text-sm ">$500</td>
                      <td className="px-4 py-2 text-textGray text-sm ">
                        <Input
                          type="number"
                          className="border border-black  w-14 h-8"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td className="px-4 py-2 text-black text-lg ">
                        Total:
                        {/* gst Dropdown ============ */}
                        <GstDropDown />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Reason Row */}
          <div className="space-y-3  w-full  ">
            <Textarea
              className="h-fit resize-none  "
              placeholder="Reason For Refund ..."
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
