"use client";

import React from "react";
import UserItem from "./UserItem";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { GearIcon, PersonIcon, CardStackIcon, LockClosedIcon, AvatarIcon  } from "@radix-ui/react-icons";

export default function Sidebar() {
  const menuList = [
    {
      group: "General",
      items: [
        {
          link: "/customers",
          icon: <PersonIcon />,
          label: "Customers",
        },
        {
          link: "/template",
          icon: <CardStackIcon />,
          label: "Templates",
        },
      ],
    },
    {
      group: "Settings",
      items: [
        {
          link: "/general-settings",
          icon: <GearIcon />,
          label: "General Settings",
        },
        {
          link: "/",
          icon: <LockClosedIcon />,
          label: "Privacy",
        },
        {
          link: "/",
          icon: <AvatarIcon />,
          label: "Logs",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-4 w-[300px] min-w-[300px] border-r min-h-screen p-4">
      <UserItem />
      <div className="grow">
        <Command>
          <CommandList >
            {menuList.map((menu: any, key: number) => (
              <CommandGroup key={key} heading={menu.group}>
                {menu.items.map((item: any, itemKey: number) => (
                  <CommandItem key={itemKey} className="flex gap-2"><span>{item.icon}</span>{item.label}</CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </div>
    </div>
  );
}
