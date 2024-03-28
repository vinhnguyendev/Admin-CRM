"use client";

import React from "react";
import UserAction from "./UserAction";

export default function UserItem() {
  return (
    <div className="flex justify-start gap-4 border rounded-[8px] p-2">
      <div className="avatar flex rounded-full h-12 w-12 bg-orange-300 text-amber-950 font-[700] ">
        <span className="m-auto">G</span>
      </div>
      <div>
        <p className="font-bold">User Name</p>
        <p className="text-sm text-neutral-500">Email@email.com</p>
      </div>
      <div className="flex flex-col justify-start flex-1 items-end">
        <UserAction />
      </div>
    </div>
  );
}
