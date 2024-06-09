"use client"

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { CustomerData } from "@/models/Customer-data";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogViewType } from "@/models/Dialog";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import DialogView from "./dialog-view";

interface DataTableColumnsProps {
  onEdit: (customer: CustomerData) => void;
  onDelete: (customer: CustomerData) => void;
}

export const columns = ({
  onEdit,
  onDelete,
}: DataTableColumnsProps): ColumnDef<CustomerData>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "firstname",
    accessorKey: "firstname",
    header: "First name",
    // filterFn: (row, columnId, filterValue) => row.original.name.first.toLowerCase() === filterValue.toLowerCase(),
  },
  {
    id: "lastname",
    accessorKey: "lastname",
    header: "Last name",
    // filterFn: (row, columnId, filterValue) => row.original.name.last.toLowerCase() === filterValue.toLowerCase(),
  },
  {
    id: "email",
    accessorKey: "email",
    header: "Email"
  },
  {
    id: 'last-serviced',
    header: 'last serviced',
    accessorKey: "lastServiced",
    // size: 100,
    // filterFn: (row, columnId, filterValue) => row.original.dob.age === Number(filterValue)
  },
  {
    id: "homeAddress",
    accessorKey: "address.homeAddress",
    header: "Address"
    // filterFn: (row, columnId, filterValue) => row.original.location.city.toLowerCase() === filterValue.toLowerCase(),
  },
  {
    id: "state",
    accessorKey: "address.state",
    header: "State"
    // filterFn: (row, columnId, filterValue) => row.original.location.city.toLowerCase() === filterValue.toLowerCase(),
  },
  {
    id: "zipCode",
    accessorKey: "address.zipCode",
    header: "Zip-Code",
    // filterFn: (row, columnId, filterValue) => row.original.location.city.toLowerCase() === filterValue.toLowerCase(),
  },
  {
    id: "county",
    accessorKey: "address.county",
    header: "County",
    // filterFn: (row, columnId, filterValue) => row.original.location.country.toLowerCase() === filterValue.toLowerCase(),
  },
  {
    id: "technician",
    accessorKey: "technician",
    header: "Technician",
    // filterFn: (row, columnId, filterValue) => row.original.location.country.toLowerCase() === filterValue.toLowerCase(),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original;

      const [open, setOpen] = React.useState(false);
      const [dialog, setDialog] = React.useState(DialogViewType.Edit);

      const handleDialogChange = (newDialog: DialogViewType) => {
        setOpen(true);
        setDialog(newDialog);
      };

      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                <DropdownMenuItem
                  onClick={() => handleDialogChange(DialogViewType.Edit)}
                >
                  Edit
                </DropdownMenuItem>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </AlertDialogTrigger>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleDialogChange(DialogViewType.View)}
                >
                  View contact details
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this profile?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your sending profile.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    onDelete(customer);
                  }}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <DialogContent>
            
            {/* <DialogView customer={customer} dialog={dialog} onEdit={onEdit} /> */}
          </DialogContent>
        </Dialog>
      );
    },
  },
];
