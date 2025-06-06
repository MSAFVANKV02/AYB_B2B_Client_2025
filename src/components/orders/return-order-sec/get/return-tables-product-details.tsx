import MyBackBtn from "@/components/myUi/myBackBtn";
import { useModal } from "@/providers/context/modal-context";
import { IReturnDetail, ReturnItem } from "@/types/return_order_types";

const ReturnTablesProductDetails = () => {
  const { modalState, dispatchModal } = useModal();

  const products = modalState.selectedModalData as ReturnItem;

  return (
    <div className=" space-y-3">
      {/* <pre className="text-xs h-[200px] overflow-auto">
        {JSON.stringify(modalState.selectedModalData, null, 4)}
      </pre> */}

      <MyBackBtn
        clickEvent={() => {
          if (modalState.type === "return-product-details") {
            dispatchModal({
              type: "CLOSE_MODAL",
            });
          }
        }}
      />

      <table className="w-full border-collapse ">
        <thead className="bg-[#F8F8F8]">
          <tr>
            <th className="sm:py-2 py-1 sm:px-4 px-2 sm:text-sm text-xs text-left font-medium">
              Name
            </th>
            <th className="sm:py-2 py-1 sm:px-4 px-2 sm:text-sm text-xs text-left font-medium">
              size/color
            </th>
            <th className="sm:py-2 py-1 sm:px-4 px-2 sm:text-sm text-xs text-left font-medium">
              Qty
            </th>
            <th className="sm:py-2 py-1 sm:px-4 px-2 sm:text-sm text-xs text-left font-medium">
              Return Type
            </th>
            <th className="sm:py-2 py-1 sm:px-4 px-2 sm:text-sm text-xs text-left font-medium">
              Return Reason
            </th>
            <th className="sm:py-2 py-1 sm:px-4 px-2 sm:text-sm text-xs text-left font-medium">
              Uploaded File
            </th>
            <th className="sm:py-2 py-1 sm:px-4 px-2 sm:text-sm text-xs text-left font-medium">
              Status
            </th>
            <th className="sm:py-2 py-1 sm:px-4 px-2 sm:text-sm text-xs text-left font-medium">
              Admin Comment
            </th>
          </tr>
        </thead>
        <tbody>
          {modalState.type === "return-product-details" &&
            Array.isArray(modalState.selectedModalData?.allDetails) &&
            modalState.selectedModalData.allDetails.map(
              (details: IReturnDetail, idx: number) => {
                console.log(details, "details");

                return (
                  <tr
                    className="border-t-2 border-t-white bg-[#FCFCFC] "
                    key={idx}
                  >
                    <td className="sm:py-2 py-1 sm:px-4 px-2  text-xs max-w-[100px]">
                      <span className="block truncate overflow-hidden whitespace-nowrap">
                        {modalState.selectedModalData.product?.product_name}
                      </span>
                    </td>

                    <td className="sm:py-2 py-1 sm:px-4 px-2  text-xs">
                      {details.size}/
                      {products.product.variations?.[0].colorName}
                    </td>
                    <td className="sm:py-2 py-1 sm:px-4 px-2  text-xs">
                      {details.returned_quantity}
                    </td>
                    <td className="sm:py-2 py-1 sm:px-4 px-2  text-xs">
                      {details.return_mode}
                    </td>
                    <td className="sm:py-2 py-1 sm:px-4 px-2  text-xs">
                      {details.return_reason || "_"}
                    </td>
                    <td className="sm:py-2 py-1 sm:px-4 px-2 text-xs space-y-1">
                      {details.return_reference_docs?.length > 0
                        ? details.return_reference_docs.map((f: string) => {
                            const fileExt =
                              f.split(".").pop()?.toLowerCase() || "";
                            let typeLabel = "File";

                            const imageExts = ["jpg", "jpeg", "png", "webp"];
                            const videoExts = ["mp4", "mov", "ogv"];
                            const pdfExts = ["pdf"];

                            if (imageExts.includes(fileExt)) {
                              typeLabel = `Image (${fileExt})`;
                            } else if (videoExts.includes(fileExt)) {
                              typeLabel = `Video (${fileExt})`;
                            } else if (pdfExts.includes(fileExt)) {
                              typeLabel = `PDF (${fileExt})`;
                            }

                            return (
                              <a
                                key={f}
                                href={f}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline text-blue-500 block"
                              >
                                {typeLabel}
                              </a>
                            );
                          })
                        : "-"}
                    </td>

                    <td className="sm:py-2 py-1 sm:px-4 px-2  text-xs">
                      {details.return_status}
                    </td>
                    <td className="sm:py-2 py-1 sm:px-4 px-2  text-xs">
                      {details?.remarks || "-"}
                    </td>
                  </tr>
                );
              }
            )}
        </tbody>
      </table>
    </div>
  );
};

export default ReturnTablesProductDetails;
