import ReturnActionTable from "@/components/orders/return-order-sec/actions/return-action-table";
import { IFlatOrderItem } from "@/types/orderTypes";
import React from "react";

interface Props {
  orders: IFlatOrderItem[];
}

const ReturnOrderActionPage = ({ orders }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="">
        <h1 className="text-xl">Return / Replacement</h1>
      </div>

      <div className="">
        <ReturnActionTable orders={orders} />
      </div>
    </div>
  );
};

export default ReturnOrderActionPage;
