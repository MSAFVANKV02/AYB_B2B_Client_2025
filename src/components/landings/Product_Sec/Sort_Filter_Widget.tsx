import { Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useParams } from "react-router-dom";
import {
  ProductState,
  SORT_OPTIONS,
} from "@/utils/Validator/product-validator";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo } from "react";

type Props = {
  setFilter: React.Dispatch<React.SetStateAction<ProductState>>;
  filter: ProductState;
  showFilterTab: boolean;
  setShowFilterTab: (val: boolean) => void;
};

const SortFilterWidget = ({
  filter,
  setFilter,
  setShowFilterTab,
  showFilterTab,
}: Props) => {
  const { page, slug } = useParams();
  const DEFAULT_MIN_PRICE = 0;
  const DEFAULT_MAX_PRICE = 10000;

  const sortName = useMemo(() => {
    return (
      SORT_OPTIONS.find((option) => option.value === filter.sort)?.name ||
      "Sort"
    );
  }, [filter]);

  const hasActiveFilters = (filter: ProductState) => {
    return (
      filter.size.length > 0 ||
      filter.colors.length > 0 ||
      filter.brands.length > 0 ||
      (filter.minimumQuantity ?? 0) > 0 ||
      (filter.priceRange.min ?? DEFAULT_MIN_PRICE) > DEFAULT_MIN_PRICE ||
      (filter.priceRange.max ?? DEFAULT_MAX_PRICE) < DEFAULT_MAX_PRICE
    );
  };

  return (
    <div className="flex justify-between items-center gap-1">
      {/*============= bread crumb starts ====================== */}
      <Breadcrumb className="md:block hidden">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            {slug ? (
              <BreadcrumbLink
                // href="/components"
                className={` capitalize`}
              >
                {page}
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage className="text-textMain">{page}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
          {slug && (
            <>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-textMain">
                  {slug}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
      {/*============= bread crumb ends ====================== */}

      <div
        className={`w-1/2 ${hasActiveFilters(filter) ? "bg-bg text-white font-bold" : ""} capitalize md:hidden h-10 border flex items-center justify-center cursor-pointer text-xs`}
        onClick={() => {
          setShowFilterTab(!showFilterTab);
        }}
      >
        filter
      </div>

      {/* ============= sort option starts ================ */}
      <Select
        onValueChange={(value: ProductState["sort"]) => {
          setFilter((prev) => ({
            ...prev,
            sort: value,
          }));
        }}
      >
        <SelectTrigger className="md:w-[180px] w-1/2 rounded-none ">
          {/* <SelectValue placeholder={`Sort : ${sortName}`} className="md:text-sm text-xs" /> */}
          <SelectValue className="md:text-sm text-xs" placeholder="Sort">
            Sort : {sortName}
          </SelectValue>
        </SelectTrigger>

        <SelectContent className="md:text-sm text-xs">
          {SORT_OPTIONS.map((option, index) => (
            <SelectItem
              value={option.value}
              className="md:text-sm text-xs"
              key={index}
            >
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortFilterWidget;
