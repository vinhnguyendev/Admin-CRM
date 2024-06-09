"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";




import { CustomerData } from "@/models/Customers";

import { convertDate } from "@/lib/utils";

interface EditCustomerFormProps {
  customer: CustomerData;
  onEdit: (customer: CustomerData) => void;
}

const formSchema = z.object({
  firstname: z.string().min(1, {
    message: "Username must be at least 1 characters.",
  }),
  lastname: z.string().min(1, {
    message: "Username must be at least 1 characters.",
  }),
  email: z.string().email({
    message: "Please enter valid email",
  }),
  dob: z.string(),
  phone: z.string().min(10, { message: "Enter valid phone number" }),
  city: z.string(),
  country: z.string(),
});

export default function EditCustomerForm({
  customer,
  onEdit,
}: EditCustomerFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: customer.name.first,
      lastname: customer.name.last,
      email: customer.email,
      dob: convertDate(customer.dob.date),
      phone: customer.phone,
      city: customer.location.city,
      country: customer.location.country,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
  
    const updatedUser = {
      ...customer,
      name: {
        first:values.firstname,
        last:values.lastname,
      },
      email: values.email,
      dob: {
        ...customer.dob,
        date:convertDate(values.dob)
      },
      phone: values.phone, 
      location: {
        ...customer.location,
        city: values.city,
        country: values.country
      }
    };
    

    onEdit(updatedUser as CustomerData)
  }

  return (
    <>
 
    </>
  );
}
