"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import React from "react";

export default function SearchBar() {
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("")

  return (
    <div className="flex gap-2 align-middle items-center h-[70px] border-b p-4">
      <div className="w-[200px]">
        <Input className="shadow-md" placeholder="Search for customer..." />
      </div>
      <div>
        <Select>
          <SelectTrigger className="w-[180px] shadow-md">
            <SelectValue placeholder="" />
            <span className="text-sm"></span>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Filters by:</SelectLabel>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="gender">Gender</SelectItem>
              <SelectItem value="state">State</SelectItem>
              <SelectItem value="country">Country</SelectItem>
              <SelectItem value="age">Age</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
