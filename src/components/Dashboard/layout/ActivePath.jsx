'use client'

import { usePathname } from 'next/navigation'

export function ActivePath() {
  const path = usePathname()
  const pathArray = path.split('/')

  return (
    <div>
      <h1 className='text-3xl font-bold capitalize'>
        {pathArray.length > 2 ? pathArray[2] : pathArray[1]}
      </h1>
    </div>
  )
}
