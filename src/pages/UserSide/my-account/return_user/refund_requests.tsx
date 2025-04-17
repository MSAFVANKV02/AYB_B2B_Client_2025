import RefundModal from "@/components/landings/return_replace/RefundModal";

const ResponsiveTable = () => {
  const data = [
    {
      date: "2024-11-22",
      returnId: "RT123",
      orderId: "ORD456",
      store: "Store A",
      status: "Pending",
      action: "Refund",
    },
    {
      date: "2024-11-21",
      returnId: "RT124",
      orderId: "ORD457",
      store: "Store B",
      status: "Approved",
      action: "Replace",
    },
  ];

  return (
    <div className="overflow-x-auto ">
      {/* For large screens */}
      <table className="table-auto w-full border-collapse  hidden md:table">
        <thead>
          <tr className="text-sm">
            <th className=" p-2 text-left">Date</th>
            <th className=" p-2 text-left">Return ID</th>
            <th className=" p-2 text-left">Against Order ID</th>
            <th className=" p-2 text-left">Store</th>
            <th className=" p-2 text-left">Status</th>
            <th className=" p-2 text-left">Refund / replace</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-gray-100 bg-gray-50 text-sm text-textGray cursor-pointer"
            >
              <td className=" p-2">{item.date}</td>
              <td className=" p-2">{item.returnId}</td>
              <td className=" p-2">{item.orderId}</td>
              <td className=" p-2">{item.store}</td>
              <td className=" p-2">{item.status}</td>
              <td className=" p-2">{item.action}</td>
              <td className="p-2">
               <RefundModal />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* For smaller screens */}
      <div className="md:hidden">
        {data.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 mb-4 rounded shadow-sm"
          >
           
            <div className="flex p-2">
              <span className="font-medium w-1/3">Date:</span>
              <span className="w-2/3">{item.date}</span>
            </div>
            <div className="flex p-2 bg-gray-100">
              <span className="font-medium w-1/3">Return ID:</span>
              <span className="w-2/3">{item.returnId}</span>
            </div>
            <div className="flex p-2">
              <span className="font-medium w-1/3">Against Order ID:</span>
              <span className="w-2/3">{item.orderId}</span>
            </div>
            <div className="flex p-2 bg-gray-100">
              <span className="font-medium w-1/3">Store:</span>
              <span className="w-2/3">{item.store}</span>
            </div>
            <div className="flex p-2">
              <span className="font-medium w-1/3">Status:</span>
              <span className="w-2/3">{item.status}</span>
            </div>
            <div className="flex p-2 bg-gray-100">
              <span className="font-medium w-1/3">Refund / replace:</span>
              <span className="w-2/3">{item.action}</span>
            </div>
            <div className="flex p-2 bg-gray-100">
              <span className="font-medium w-1/3">Action:</span>
              <span className="w-2/3">
              <RefundModal />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponsiveTable;
