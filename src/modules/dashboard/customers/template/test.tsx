"use client";

import React, { useEffect, useState } from "react";

interface CustomerData {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  lastServiced: string;
  technician: string;
  comments: string;
  address: string;
  county: string;
  seer: string;
  condenser: string;
  airHandler: string;
  heater: string;
  acLocation: string;
}

const BASE_URL = "/seed.json";

export default function TestTemplate() {
  const [customerData, setCustomerData] = useState<CustomerData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null | boolean>(null);

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

  useEffect(() => {
    console.log(customerData)
  }, [customerData])

  return (
    <div>
      {customerData && <pre>{JSON.stringify(customerData, null, 2)}</pre>}
    </div>
  );
}
