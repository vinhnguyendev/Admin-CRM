"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Firstname</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lastname</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input placeholder="mm/dd/yyyy" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Save</Button>
        </form>
      </Form>
    </>
  );
}
