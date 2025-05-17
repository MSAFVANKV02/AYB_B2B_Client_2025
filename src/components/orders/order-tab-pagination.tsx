import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { IOrdersType } from "@/types/orderTypes";
import { useSearchParams, useNavigate } from "react-router-dom";

type Props = {
  order: IOrdersType;
};

const OrderTabPagination = ({ order }: Props) => {
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") ?? "1");
  const navigate = useNavigate();

  const totalPages = order.totalPages;

  // Handler for page navigation
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      navigate(`?page=${page}`);
    }
  };

  // const renderPaginationItems = () => {
  //   const items = [];
  //   for (let i = 1; i <= totalPages; i++) {
  //     items.push(
  //       <PaginationItem key={i} className={i === currentPage ? "active" : ""}>
  //         <PaginationLink onClick={() => handlePageChange(i)}>{i}</PaginationLink>
  //       </PaginationItem>
  //     );
  //   }
  //   return items;
  // };
  const renderPaginationItems = () => {
    const items = [];

    // Always show first 3 pages
    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      items.push(
        <PaginationItem key={i} className={i === currentPage ? "" : "text-gray-400"}>
          <PaginationLink onClick={() => handlePageChange(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Middle Ellipsis Logic
    if (currentPage > 4)
      items.push(<PaginationEllipsis key="start-ellipsis" />);
    if (currentPage > 3 && currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key={currentPage} className="active">
          <PaginationLink onClick={() => handlePageChange(currentPage)}>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
      );
    }
    if (currentPage < totalPages - 3)
      items.push(<PaginationEllipsis key="end-ellipsis" />);

    // Always show last 3 pages
    for (let i = Math.max(totalPages - 2, 4); i <= totalPages; i++) {
      items.push(
        <PaginationItem key={i} className={i === currentPage ? "active" : ""}>
          <PaginationLink onClick={() => handlePageChange(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <Pagination className="sticky bottom-0 bg-white flex justify-center gap-2 ">
      <PaginationContent className=" mt-4">
        <PaginationItem
          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
        >
          <PaginationPrevious
            href="#"
            onClick={() => handlePageChange(currentPage - 1)}
          />
        </PaginationItem>

        {renderPaginationItems()}

        <PaginationItem
          className={
            currentPage === totalPages ? "pointer-events-none opacity-50" : ""
          }
        >
          <PaginationNext
            href="#"
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default OrderTabPagination;
