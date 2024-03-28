"use client"

import React from 'react'
import { ColumnDef } from "@tanstack/react-table"
import { CustomerData } from "@/models/Customers"



export const columns: ColumnDef<CustomerData>[] = [
  {
    accessorKey: "name.first",
    header: "Firstname",
  },
  {
    accessorKey: "name.last",
    header: "Lastname",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "dob.age",
    header: "Age",
  },
  {
    accessorKey: "location.city",
    header: "City",
  },
  {
    accessorKey: "location.country",
    header: "Country",
  }
]
