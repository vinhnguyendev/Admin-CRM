import React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { CustomerData } from "@/models/Customers";
import { convertDate } from "@/lib/utils";
import Image from "next/image";

interface ViewCustomerCardProps {
  customer: CustomerData;
}

export default function ViewCustomerCard({ customer }: ViewCustomerCardProps) {
  const customerDetails = {
    firstname: customer.name.first,
    lastname: customer.name.last,
    picture: customer.picture.medium as string,
    gender: customer.gender,
    age: customer.dob.age as number,
  };

  const contactDetails = {
    registered: convertDate(customer.registered.date),
    email: customer.email,
    phone: customer.phone,
  };

  const personalDetails = {
    dob: convertDate(customer.dob.date) as string,
    country: customer.location.country as string,
    city: customer.location.city as string,
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <div className="flex gap-5">
        <Image className="rounded-full" src={customerDetails.picture} height={100} width={100} alt="customer image"/>
        <div>
        <p className="text-lg font-bold ">
          {`${customerDetails.firstname}` + " " + `${customerDetails.lastname}`}
        </p>
          <p className="text-xs">{customerDetails.gender}({customerDetails.age} years old)</p>
        </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea>
          <ul className="grid grid-cols-2 gap-4">
            {Object.entries(personalDetails).map(([key, value]) => (
              <li className="flex flex-col" key={key}>
                <p className="text-gray-500 text-xs">{key}:</p>
                <p className="text-sm">{value}</p>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
