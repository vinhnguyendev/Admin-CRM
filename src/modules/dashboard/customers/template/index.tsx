"use client";

import React, { useEffect } from "react";
import { CustomerData } from "@/models/Customer-data";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "../components/CustomerTable/data-table";
import { columns } from "../components/CustomerTable/columns";
import AddCustomers from "../components/CustomerTable/add-customer";

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

const BASE_URL = "/seed.json";

export default function CustomersDashboard() {
  const [customerData, setCustomerData] = React.useState<CustomerData[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null | boolean>(null);
  const [duplicatesRemoved, setDuplicatesRemoved] = React.useState<number>(0);
  const [showAlert, setShowAlert] = React.useState(false);

  const getData = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const customers = data as CustomerData[];
      setCustomerData(customers);
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const addCustomers = (newCustomers: CustomerData[]) => {
    setCustomerData((prevData) => {
      // Filter out new customers with duplicate zip code or email
      const filteredNewCustomers = newCustomers.filter(
        (newCustomer) =>
          !prevData.some(
            (existingCustomer) =>
              existingCustomer.address.zipCode ===
                newCustomer.address.zipCode ||
              existingCustomer.email === newCustomer.email
          )
      );
      const duplicatesCount = newCustomers.length - filteredNewCustomers.length;
      setDuplicatesRemoved(duplicatesCount);

      if (duplicatesCount > 0) {
        setShowAlert(true);
      }

      return [...prevData, ...filteredNewCustomers];
    });
  };

  return (
    <div>
      <AddCustomers onAdd={addCustomers} />
      {showAlert && (
        <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
          <AlertDialogTrigger asChild>
            <div></div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Duplicates Found</AlertDialogTitle>
              <AlertDialogDescription>
                ({duplicatesRemoved}) duplicate{duplicatesRemoved > 1 ? "s" : ""}{" "}
                found and excluded from adding to database.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setShowAlert(false)}>
                OK
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      <div>
        {loading && !error && (
          <div className="flex h-[150px] w-full mb-2 items-center justify-center text-sm">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          </div>
        )}
        {!loading && error && (
          <div className="flex flex-col space-y-4 items-center py-8">
            <p>Something went wrong. Please try again</p>
            <Button onClick={getData}>Try Again</Button>
          </div>
        )}
        {!loading && !error && (
          <DataTable
            columns={columns({
              onEdit: (customer) => {
                setLoading(true);
                const updateCustomerInfo = () => {
                  setCustomerData(
                    customerData.map((c) => {
                      if (customer.id === c.id) {
                        return customer;
                      }
                      return c;
                    })
                  );
                  setLoading(false);
                };

                setTimeout(updateCustomerInfo, 2000);
              },
              onDelete: (customer) => {
                setLoading(true);
                setCustomerData(
                  customerData.filter((c) => c.id !== customer.id)
                );
                setLoading(false);
              },
            })}
            data={customerData}
          />
        )}
      </div>
    </div>
  );
}
