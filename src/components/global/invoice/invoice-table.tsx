import { useNumToWord } from "@/hooks/usable-hooks/num-to-word";
import { useAppSelector } from "@/providers/redux/hook";
import { IOrders, IStoreOrder } from "@/types/orderTypes";

type Props = {
  orders: IOrders;
  storeOrders: IStoreOrder;
};

const InvoiceTable = ({ storeOrders }: Props) => {
  const { userKyc } = useAppSelector((state) => state.auth);
  const { convert } = useNumToWord();

  return (
    <table className="border border-black w-full text-sm text-left">
      <thead>
        <tr className=" bg-gray-100">
          <th className="p-2 border border-black">SI No</th>
          <th className="p-2 border border-black">Product Name</th>
          <th className="p-2 border border-black">Size</th>
          <th className="p-2 border border-black">Qty</th>
          <th className="p-2 border border-black">Rate</th>
          <th className="p-2 border border-black">Amount</th>
        </tr>
      </thead>
      <tbody className="">
        {/* {storeOrders.items.map((item) => {
                  const sizeMap: Record<
                    string,
                    {
                      qty: number;
                      amount: number;
                      perPieceAmount: number;
                      taxableAmount: number;
                      totalAmount: number;
                    }
                  > = {};

                  item.product.variations?.forEach((variation) => {
                    variation.details?.forEach((detail) => {
                      if (!sizeMap[detail.size]) {
                        sizeMap[detail.size] = {
                          qty: 0,
                          amount: 0,
                          perPieceAmount: 0,
                          taxableAmount: 0,
                          totalAmount: 0,
                        };
                      }

                      sizeMap[detail.size].qty += detail.quantity;
                      sizeMap[detail.size].amount +=
                        detail.quantity * detail.taxable_amount;
                      //   sizeMap[detail.size].perPieceAmount += detail.taxable_amount + detail.gst;
                      sizeMap[detail.size].taxableAmount +=
                        detail.taxable_amount;
                      sizeMap[detail.size].totalAmount += 6;
                    });
                  });

                  return Object.entries(sizeMap).map(([size, data], idx) => (
                    <>
                      <tr key={`${idx}-${size}`} className="bg-white">
                        <td className="p-1 text-xs border-r border-b-0 border-r-black font-bold">
                          {idx + 1}
                        </td>
                        <td className="p-1 text-xs border-r border-b-0 border-r-black font-bold">
                          {item.product.product_name}
                        </td>
                        <td className="p-1 text-xs border-r border-b-0 border-r-black ">
                          {size}
                        </td>
                        <td className="p-1 text-xs border-r border-b-0 border-r-black font-bold">
                          {data.qty} pcs
                        </td>
                        <td className="p-1 text-xs border-r border-b-0 border-r-black ">
                          ₹ {data.taxableAmount.toFixed(2)}
                        </td>
                        <td
                          className={`p-1 text-xs border-r border-b-0 border-r-black `}
                        >
                          ₹ {data.amount.toFixed(2)}
                        </td>
                      </tr>
                    </>
                  ));
                })} */}
        {(() => {
          let serialNo = 1; // GLOBAL SI NO COUNTER

          return storeOrders.items.flatMap((item) => {
            const sizeMap: Record<
              string,
              {
                qty: number;
                amount: number;
                perPieceAmount: number;
                taxableAmount: number;
                totalAmount: number;
              }
            > = {};

            item.product.variations?.forEach((variation) => {
              variation.details?.forEach((detail) => {
                if (!sizeMap[detail.size]) {
                  sizeMap[detail.size] = {
                    qty: 0,
                    amount: 0,
                    perPieceAmount: 0,
                    taxableAmount: 0,
                    totalAmount: 0,
                  };
                }

                sizeMap[detail.size].qty += detail.quantity;
                sizeMap[detail.size].amount +=
                  detail.quantity * detail.taxable_amount;
                sizeMap[detail.size].taxableAmount += detail.taxable_amount;
                sizeMap[detail.size].totalAmount += 6;
              });
            });

            return Object.entries(sizeMap).map(([size, data]) => {
              const row = (
                <tr key={`${serialNo}-${size}`} className="bg-white">
                  <td className="p-1 text-xs border border-black w-[40px] font-bold text-center">
                    {serialNo}
                  </td>
                  <td className="p-1 text-xs border border-black font-bold">
                    {item.product.product_name}
                  </td>
                  <td className="p-1 text-xs border border-black">{size}</td>

                  <td className="p-1 text-xs border border-black w-[50px] text-center font-bold">
                    {data.qty} pcs
                  </td>
                  <td className="p-1 text-xs border border-black text-right">
                    ₹ {data.taxableAmount.toFixed(2)}
                  </td>
                  <td className="p-1 text-xs border border-black text-right w-[100px]">
                    ₹ {data.amount.toFixed(2)}
                  </td>
                </tr>
              );
              serialNo++;
              return row;
            });
          });
        })()}

        {/* === CGST/SGST/IGST ROWS BASED ON CONDITIONS === */}
        {storeOrders.items.some(
          (item) => item.product.tax_details?.non_gst_goods === "no"
        ) &&
          (() => {
            const buyerGst = userKyc?.gstNumber ?? "";
            const sellerGst = storeOrders.store_info?.gstNumber ?? "";
            const buyerCode = buyerGst.slice(0, 2);
            const sellerCode = sellerGst.slice(0, 2);
            const gstAmount = storeOrders.order_total.gst ?? 0;
            const sumOfAmounts =
              storeOrders.order_total.total_amount -
              storeOrders.order_total.gst;

            if (buyerCode === sellerCode && buyerCode) {
              const halfGst = (gstAmount / 2).toFixed(2);
              return (
                <>
                  <tr className="pb-4 bg-white">
                    <td className="p-1 text-xs border-r border-b-0 border-r-black "></td>
                    <td className="p-1 text-xs border-r border-b-0 border-r-black"></td>
                    <td className="p-1 text-xs border-r border-b-0 border-r-black"></td>
                    <td className="p-1 text-xs border-r border-b-0 border-r-black"></td>
                    <td className="p-1 text-xs border-r border-b-0 border-r-black"></td>{" "}
                    <td className="p-1 text-sm border-r border-b border-b-black  border-r-black border-t border-t-black font-bold text-end">
                      ₹ {sumOfAmounts}
                    </td>
                  </tr>
                  {/* ======== */}
                  <tr className="text-end bg-white">
                    <td className="p-1 text-xs border-r border-b-0 border-r-black"></td>

                    <td className="p-1 text-sm border-r border-b-0 border-r-black font-bold text-end">
                      CGST COLLECTED
                    </td>
                    <td className="p-1 text-xs border-r border-b-0 border-r-black"></td>
                    <td className="p-1 text-xs border-r border-b-0 border-r-black"></td>
                    <td className="p-1 text-xs border-r border-b-0 border-r-black"></td>
                    <td className="p-1 text-sm border-r border-b-0 border-r-black font-bold">
                      ₹ {halfGst}
                    </td>
                  </tr>
                  <tr className="text-end bg-white">
                    <td className="p-1 text-xs border-r border-b-0 border-r-black"></td>

                    <td className="p-1 pb-10 text-sm border-r border-b-0 border-r-black font-bold text-end">
                      SGST COLLECTED
                    </td>
                    <td className="p-1 pb-10 text-sm border-r border-b-0 border-r-black"></td>
                    <td className="p-1 pb-10 text-sm border-r border-b-0 border-r-black"></td>
                    <td className="p-1 pb-10 text-xs border-r border-b-0 border-r-black"></td>
                    <td className="p-1 pb-10 text-sm border-r border-b-0 border-r-black font-bold">
                      ₹ {halfGst}
                    </td>
                  </tr>
                </>
              );
            } else {
              return (
                <tr>
                  <td className="p-1 text-xs border-r border-b-0 border-r-black"></td>

                  <td className="p-1 pb-10 text-sm border-r border-b-0 border-r-black font-bold text-end">
                    IGST COLLECTED
                  </td>
                  <td className="p-1 pb-10 text-xs border-r border-b-0 border-r-black">
                    -
                  </td>
                  <td className="p-1 pb-10 text-xs border-r border-b-0 border-r-black">
                    -
                  </td>
                  <td className="p-1 pb-10 text-xs border-r border-b-0 border-r-black">
                    -
                  </td>
                  <td className="p-1 text-xs border-r border-b-0 border-r-black font-bold">
                    ₹ {gstAmount.toFixed(2)}
                  </td>
                </tr>
              );
            }
          })()}
      </tbody>

      <tfoot className="border-t border-black bg-white">
        <tr>
          <td className="px-2 font-bold text-lg text-end" colSpan={6}>
            Total Amount: ₹ {storeOrders.order_total.total_amount.toFixed(2)}
          </td>
        </tr>
        <tr className="">
          <td className="px-2 space-x-1" colSpan={6}>
            <span className="">tax amount (in words) :</span>
            <span className="font-bold text-black">
              {convert(storeOrders.order_total.total_amount)}
            </span>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default InvoiceTable;
