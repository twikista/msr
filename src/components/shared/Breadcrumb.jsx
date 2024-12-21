'use client'

import React from 'react'
import { usePathname, useSelectedLayoutSegment } from 'next/navigation'
import Link from 'next/link'
import { FaChevronRight } from 'react-icons/fa6'
import { cn } from '../../lib/utils'

function Breadcrumb({ homeElement, homeUrl, isProtectedRoute }) {
  const paths = usePathname()
  const pathNames = paths.split('/').filter((path) => path)
  const activePath = useSelectedLayoutSegment()
  //render 'Home' link condtionally if not currently on website home or dashboard route
  const renderHome = () => {
    if (pathNames.length === 0 || isProtectedRoute) {
      return null
    }
    return (
      <>
        <li className='flex items-center'>
          <Link
            href={homeUrl}
            className='flex items-center text-secondary hover:text-blue-600'
          >
            <span>{homeElement}</span>
          </Link>
          <FaChevronRight className='text-[9px] px-0.5' />
          {/* <span className='px-0.5 text-gray-500'>/</span> */}
        </li>
      </>
    )
  }

  return (
    <nav
      className={cn(
        'pt-2 mb-4 text-sm md:text-base block',
        pathNames.length === 0 && 'hidden'
      )}
    >
      <ul className='flex flex-wrap items-center capitalize'>
        {renderHome()}

        {pathNames.map((link, index) => {
          let href =
            //not render link if on home of dashboard
            isProtectedRoute && pathNames.length === 1
              ? ''
              : `/${pathNames.slice(0, index + 1).join('/')}`
          const lastItem = index === pathNames.length - 1
          if (!lastItem) {
            //disable second to last link on breadcrumb if on current issue path
            if (
              pathNames.includes('current') &&
              index + 1 === pathNames.length - 1
            )
              return (
                <React.Fragment key={index}>
                  <li className='flex items-center text-gray-400'>
                    <span>{link}</span>
                  </li>
                  <FaChevronRight className='text-[10px]' />
                </React.Fragment>
              )

            return (
              <React.Fragment key={index}>
                <li className='flex items-center'>
                  <Link
                    href={href}
                    className='text-secondary hover:text-blue-600 '
                  >
                    <span>{`${link}`}</span>
                  </Link>
                  <FaChevronRight className='w-4' />
                </li>
              </React.Fragment>
            )
          } else {
            return (
              <React.Fragment key={index}>
                {paths === href && (
                  <li className='text-gray-400'>
                    <span>{link}</span>
                  </li>
                )}
              </React.Fragment>
            )
          }
        })}
      </ul>
    </nav>
  )
}

export default Breadcrumb
