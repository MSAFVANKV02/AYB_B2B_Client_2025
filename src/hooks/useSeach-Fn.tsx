
// a======= after set reset in filter =======
// useSearchFn.ts
import { deepSearch } from "@/utils/deepSearchUtil";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
export function useSearchFn<T extends Record<string, any>>(data: T[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | null>(null);
  const [filteredData, setFilteredData] = useState<T[]>(data);

  useEffect(() => {
    let filtered = data;

    if (dateRange) {
      filtered = filtered.filter((item) => {
        const createdAt = new Date(item.createdAt);
        return createdAt >= dateRange.from && createdAt <= dateRange.to;
      });
    }

    if (searchQuery) {
      filtered = filtered.filter((item) => deepSearch(item, searchQuery));
    }

    if (statusFilter) {
      filtered = filtered.filter((item) =>
        item?.deliveryStatus?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    setFilteredData(filtered);
  }, [searchQuery, dateRange, data, statusFilter]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
  };

  const handleDateSelect = (range: { from: Date; to: Date }) => {
    setDateRange(range);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("");
    setDateRange(null);
  };

  const hasActiveFilters = useMemo(() => {
    return !!searchQuery || !!statusFilter || !!dateRange;
  }, [searchQuery, statusFilter, dateRange]);

  return {
    filteredData,
    handleSearch,
    handleStatusFilter,
    handleDateSelect,
    resetFilters,
    hasActiveFilters,
    searchQuery,
    statusFilter,
    dateRange,
  };
}
