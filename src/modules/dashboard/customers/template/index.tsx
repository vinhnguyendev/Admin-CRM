"use client";

import React, { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import { CustomerData } from "@/models/Customers";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DataTable } from "../components/CustomerTable/data-table";
import { columns } from "../components/CustomerTable/columns";

const BASE_URL = "https://randomuser.me/api/?results=20";

export default function CustomersDashboard() {
  const [customerData, setCustomerData] = React.useState<CustomerData[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    setError(false);

    try {
      const query = await fetch(BASE_URL);
      const data = await query.json();
      const customers = data.results as CustomerData[];
      setCustomerData(customers);
   
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div>
     
      <div>
        {loading && !error && (
          <div className="flex h-[150px] w-full mb-2 items-center justify-center text-sm">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          </div>
        )}
        {!loading && error && (
          <div className="flex flex-col space-y-4 items-center py-8">
            <Label>Something went wrong. Please try again</Label>
            <Button onClick={getData}>Try Again</Button>
          </div>
        )}
        {!loading && !error && (
          <DataTable
            columns={columns({
              onEdit: (customer) => {
                setLoading(true)

                const updateCustomerInfo = () => {
                    setCustomerData(
                        customerData.map((c) => {
                            if (customer.login.uuid === 'make equal to c.id') {
                                return customer;
                            }
                            return c;
                        })
                    );
                      setLoading(false)
                };

                setTimeout(updateCustomerInfo, 2000)
            },
              onDelete: (customer) => {
                console.log("Delete");
              },
            })}
            data={customerData}
          />
        )}
      </div>
    </div>
  );
}
