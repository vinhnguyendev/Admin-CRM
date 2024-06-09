"use client";


import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


import { Button } from "../../../../../components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { excelToJson } from "@/lib/utils";
import { Separator } from "../../../../../components/ui/separator";
import { CustomerData } from "@/models/Customer-data";

interface AddCustomerProps {
  onAdd: (newCustomers: CustomerData[]) => void;
}

export default function AddCustomers({ onAdd }: AddCustomerProps) {
  const [open, setOpen] = useState(false);
  const [jsonResult, setJsonResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const result = await excelToJson(file);
      setJsonResult(result);
      setError(null);

      // Assuming the first sheet contains the customer data
      const sheetName = Object.keys(result)[0];
      const rows = result[sheetName];

      // Convert the result to CustomerData and pass it to onAdd
      const newCustomers: CustomerData[] = rows.map((row: any) => ({
        id: row.id,
        firstname: row.firstname,
        lastname: row.lastname,
        email: row.email,
        phone: row.phone,
        lastServiced: row.lastServiced,
        technician: row.technician,
        comments: row.comments,
        address: {
          homeAddress: row.homeAddress,
          state: row.state,
          zipCode: row.zipCode,
          county: row.county,
        },
        seer: row.seer,
        condenser: row.condenser,
        airHandler: row.airHandler,
        heater: row.heater,
        acLocation: row.acLocation,
      }));

      onAdd(newCustomers);
      setOpen(false);
    } catch (error) {
      setError("Failed to convert Excel to JSON");
    }
  };

  return (
    <div className="flex justify-end p-4 border-b">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div>
            <Button className="flex gap-1">
              <span>
                <PlusIcon />
              </span>
              Add customers
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a customer or upload .excel table</DialogTitle>
            <DialogDescription>
              <div className="p-4 border flex justify-center w-full">
                <div className="flex flex-col text-center gap-2">
                  <h1>Upload Excel File</h1>
                  <Button className="">Add a Customer</Button>
                </div>
              </div>
              <div className="grid grid-cols-3 py-5">
                <div className="flex flex-col justify-center">
                  <Separator />
                </div>
                <span className="flex justify-center my-auto">or</span>
                <div className="flex flex-col justify-center ">
                  <Separator />
                </div>
              </div>

              <div className="p-4 border flex justify-start">
                <div>
                  <p>Upload Excel File</p>
                  <input
                    id="file"
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileChange}
                  />
                  {error && <p style={{ color: "red" }}>{error}</p>}
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
