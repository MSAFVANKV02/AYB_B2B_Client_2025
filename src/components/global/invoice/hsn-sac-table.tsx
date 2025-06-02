import { IOrders, IStoreOrder } from "@/types/orderTypes";

type Props = {
  orders: IOrders;
  storeOrders: IStoreOrder;
};

const HsnSacTable = ({ storeOrders }: Props) => {
  return (
    <>
      <table className="border border-t-0 border-black w-full text-sm text-left bg-white">
        <thead>
          <tr>
            <th className="p-1 text-sm border-t-0 text-center border border-black">
              HSN/SAC
            </th>
            <th className="p-1 text-sm border-t-0 text-center border border-black">
              Taxable Value
            </th>
            <th className="p-1 text-sm border-t-0 text-center border border-black">
              GST Rate
            </th>
            <th className="p-1 text-sm border-t-0 text-center border border-black">
              GST Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {[
            ...new Map(
              storeOrders?.items.map((item) => [item.product._id, item])
            ).values(),
          ].map((item, index) => {
            return (
              <tr key={index}>
                <td className="p-1 text-xs border border-black">
                  {item.product.tax_details.hsn_sac_number}
                </td>
                <td className="p-1 text-xs border border-black">
                  {storeOrders.order_total.taxable_amount}
                </td>
                <td className="p-1 text-xs border border-black">
                  {item.product.gst_rate}%
                </td>
                <td className="p-1 text-xs border border-black">
                  {storeOrders.order_total.gst}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default HsnSacTable;
