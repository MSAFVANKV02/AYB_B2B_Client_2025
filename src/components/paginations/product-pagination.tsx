"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useAppSelector } from "@/providers/redux/hook";
import { useNavigate, useSearchParams } from "react-router-dom";

const ProductPagination = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { pagination } = useAppSelector((state) => state.products);

  const { currentPage = 1, totalPages = 1, limit = 20 } = pagination || {};

  const handleChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    params.set("limit", String(limit));
    navigate(`?${params.toString()}`);
  };

  const renderPages = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={i === currentPage}
              onClick={() => handleChangePage(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      const firstPages = [1, 2, 3];
      const lastPages = [totalPages - 2, totalPages - 1, totalPages];

      firstPages.forEach((page) => {
        pages.push(
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === currentPage}
              onClick={() => handleChangePage(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        );
      });

      pages.push(
        <PaginationItem key="dots">
          <PaginationEllipsis />
        </PaginationItem>
      );

      lastPages.forEach((page) => {
        pages.push(
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === currentPage}
              onClick={() => handleChangePage(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        );
      });
    }

    return pages;
  };

  if (!pagination || totalPages <= 1) return null;

  return (
    <div className="flex justify-center my-8">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() =>
                handleChangePage(Math.max(currentPage - 1, 1))
              }
            />
          </PaginationItem>

          {renderPages()}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                handleChangePage(Math.min(currentPage + 1, totalPages))
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ProductPagination;
