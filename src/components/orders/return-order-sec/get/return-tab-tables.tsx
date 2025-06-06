import { useModal } from "@/providers/context/modal-context";
import { ReturnItem } from "@/types/return_order_types";

type Props = {
  products: ReturnItem[];
};

function ReturnTabTables({ products }: Props) {
  const {  dispatchModal } = useModal();

  return (
    <div className="overflow-x-auto ">
      <table className="w-full border-collapse ">
        <thead className="bg-[#F8F8F8]">
          <tr>
            <th className="sm:py-2 py-1 sm:px-4 px-2 sm:text-sm text-xs text-left font-medium">
              Name
            </th>
            <th className="sm:py-2 py-1 sm:px-4 px-2 sm:text-sm text-xs text-left font-medium">
              Products
            </th>
            <th className="sm:py-2 py-1 sm:px-4 px-2 sm:text-sm text-xs text-left font-medium">
              Status
            </th>
            <th className="sm:py-2 py-1 sm:px-4 px-2 sm:text-sm text-xs text-left font-medium">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, idx) => {
            // const totalReturnedSItems = product.product.variations
            //   .flatMap((variation) => variation.details)
            //   .filter((detail) => detail.returned_quantity > 0);

            const allDetails = product.product.variations.flatMap(
              (variation) => variation.details
            );

            const returnedDetails = allDetails.filter(
              (detail) => detail.returned_quantity > 0
            );

            const approved = returnedDetails.filter(
              (d) => d.return_status === "refund_approved_by_admin"
            ).length;
            const rejected = returnedDetails.filter(
              (d) =>
                d.return_status === "refund_rejected_by_admin" ||
                d.return_status === "rejected"
            ).length;
            const pending = returnedDetails.filter(
              (d) =>
                ![
                  "refund_approved_by_admin",
                  "refund_rejected_by_admin",
                  "rejected",
                ].includes(d.return_status)
            ).length;

            return (
              <tr className="border-t-2 border-t-white bg-[#FCFCFC] " key={idx}>
                <td className="sm:py-2 py-1 sm:px-4 px-2 sm:text-sm text-xs max-w-[100px]">
                  <span className="block truncate overflow-hidden whitespace-nowrap">
                    {product.product.product_name}
                  </span>
                </td>

                <td className="sm:py-2 py-1 sm:px-4 px-2 sm:text-sm text-xs">
                  {returnedDetails.length} item
                  {returnedDetails.length !== 1 ? "s" : ""}
                </td>
                <td className="sm:py-2 py-1 sm:px-4 px-2 sm:text-sm text-xs space-x-2">
                  {approved > 0 && (
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">
                      {approved} Approved
                    </span>
                  )}
                  {rejected > 0 && (
                    <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs">
                      {rejected} Rejected
                    </span>
                  )}
                  {pending > 0 && (
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs">
                      {pending} Pending
                    </span>
                  )}
                </td>
                <td className="sm:py-2 py-1 sm:px-4 px-2 sm:text-sm text-xs  cursor-pointer hover:underline">
                  <button
                    className=""
                    onClick={() => {
                      dispatchModal({
                        modalType: "return-product-details",
                        type: "OPEN_MODAL",
                        payload: {
                          ...product,
                          allDetails, // flattened details array
                        },
                      });
                    }}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ReturnTabTables;
