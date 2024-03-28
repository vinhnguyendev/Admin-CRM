import React from 'react'
import { Button } from './ui/button'
import { PlusIcon } from '@radix-ui/react-icons'

export default function ActionBar() {
  return (
    <div className='flex flex-1 justify-between h-[80px] border-b items-center align-middle p-4'>
        <div className='inline-flex text-sm bg-muted px-2 py-1 rounded-md text-slate-500'>customers</div>
        <div>
            <Button className='flex gap-1'><span><PlusIcon/></span>Add customer</Button>
        </div>
    </div>
  )
}
