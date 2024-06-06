import React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CustomerData } from "@/models/Customers";
import { convertDate } from "@/lib/utils";
import Image from "next/image";

import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { PhoneIcon } from "lucide-react";

import CopyButton from "@/components/ui/copy-button";

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

  //Create separate ui component with debounce feature


  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0">
        <div className="flex gap-5">
          <div className="">
            <Image
              className="rounded-full"
              src={customerDetails.picture}
              height={100}
              width={100}
              alt="customer image"
            />
          </div>
          <div className="flex-col">
            <div>
              <p className="text-xs text-gray-500">Full name</p>
              <p className="text-sm">
                {`${customerDetails.firstname}` +
                  " " +
                  `${customerDetails.lastname}`}
              </p>
            </div>
            <div className="my-2">
              <p className="text-xs text-gray-500">Email</p>
              <div className="flex">
              <EnvelopeClosedIcon className="my-auto mx-1" />
              <CopyButton textToCopy={contactDetails.email}/>
              </div>
              <p className="text-xs text-gray-500">Phone</p>
              <div className="flex">
                <PhoneIcon size={15} className="my-auto mx-1"/>
              <CopyButton textToCopy={contactDetails.phone}/>
              </div>
              
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
