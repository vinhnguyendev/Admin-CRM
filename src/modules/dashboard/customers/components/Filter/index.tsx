import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColumnFiltersState } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";

interface columnFilterProps<TData, TValue> {
  columnFilters: ColumnFiltersState;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  table: Table<TData>;
}

export default function Filter<TData, TValue>({
  columnFilters,
  setColumnFilters,
  table,
}: columnFilterProps<TData, TValue>) {
  const [selectedFilter, setSelectedFilter] = React.useState("firstname");

  const filterName =
    columnFilters.find((filter) => filter.id === "firstname")?.value || "";

  const onFilterChange = (id: string, value: string) =>
    setColumnFilters((prev) =>
      prev
        .filter((filterItem) => filterItem.id !== id)
        .concat({
          id,
          value,
        })
    );

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
  };
  console.log(table.getColumn("age")?.getFilterValue());
  return (
    <div className="flex gap-2 items-center px-4">
      <div className="flex items-center py-4">
        <Input
          placeholder={`Search by ${selectedFilter}...`}
          value={
            (table.getColumn(selectedFilter)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(selectedFilter)?.setFilterValue(event.target.value)
          }
        />
      </div>
      <Select onValueChange={handleFilterChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a filter" />
        </SelectTrigger>
        <SelectContent>
          {table.getHeaderGroups().map((headersGroup) => {
            return headersGroup.headers
              .slice(1, headersGroup.headers.length - 1)
              .map((header) => {
                return (
                  <SelectItem value={header.id} key={header.id}>
                    {header.id}
                  </SelectItem>
                );
              });
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
