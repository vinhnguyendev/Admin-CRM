import React from "react";

import { DialogHeader, DialogDescription } from "@/components/ui/dialog";

import EditCustomerForm from "./edit-customer-form";
import { DialogViewType } from "@/models/Dialog";
import { CustomerData } from "@/models/Customers";
import ViewCustomerCard from "./view-customer-card";

interface DialogViewProps {
  dialog: DialogViewType;
  customer: CustomerData;
  onEdit: (customer: CustomerData) => void;
}

export default function DialogView({
  customer,
  dialog,
  onEdit,
}: DialogViewProps) {
  switch (dialog) {
    case DialogViewType.Edit:
      return (
        <>
          <DialogHeader>Edit customer destails</DialogHeader>
          <DialogDescription>
            Please press "Save" to update customer profile
          </DialogDescription>
          <EditCustomerForm customer={customer} onEdit={onEdit} />
        </>
      );
    case DialogViewType.View:
      return (
        <>
          <ViewCustomerCard customer={customer} />
        </>
      );
  }
}
