'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'

function MobileNavItem({ url, linkText, OutlineIcon, FillIcon }) {
  const pathname = usePathname()
  return (
    <li
      className={clsx('flex items-center text-gray-50 hover:text-[#ffebb2]', {
        ['text-[#ffebb2]']:
          pathname.includes(url.split('/')[2]) || pathname === url,
      })}
    >
      <Link
        href={url}
        className={clsx(`flex flex-col items-center w-full text-sm`, {
          ['text-[#ffebb2]']:
            pathname.includes(url.split('/')[2]) || pathname === url,
        })}
      >
        {pathname !== url ? (
          <OutlineIcon className={clsx('w-5', {})} />
        ) : (
          <FillIcon className={clsx('w-5', {})} />
        )}

        <span>{linkText}</span>
      </Link>
    </li>
  )
}

export default MobileNavItem
