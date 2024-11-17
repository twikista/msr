'use client'

import Link from 'next/link'
import { FaCreativeCommonsBy, FaCreativeCommons } from 'react-icons/fa'
import { useSelectedLayoutSegment } from 'next/navigation'
import { menuItems } from '@/static/menuItems'

function Footer() {
  const routeSegment = useSelectedLayoutSegment()
  const currentYear = new Date().getFullYear()
  return (
    <>
      {routeSegment !== 'dashboard' && (
        <footer className='px-5 text-sm text-white bg-secondary sm:text-base md:px-10'>
          <div className='w-full py-8 mx-auto space-y-5 max-w-7xl'>
            <div className='grid justify-between grid-cols-2 gap-5 mx-auto md:grid-cols-4 font-barlow'>
              {menuItems.map((menuItem) =>
                menuItem.subMenuItems ? (
                  <ul key={menuItem.pathName} className='space-y-1'>
                    {menuItem.subMenuItems.map(({ pathName, url }) => (
                      <>
                        {pathName !== 'home' && (
                          <li
                            key={pathName}
                            className=' hover:text-secondary w-fit'
                          >
                            <Link href={`/${url}`}>{pathName}</Link>
                          </li>
                        )}
                      </>
                    ))}
                  </ul>
                ) : null
              )}
              <div>
                <h3 className='text-base font-bold capitalize md:text-lg'>
                  Contact
                </h3>
                <div>
                  <p>Tel:+2347035877175</p>
                  <p>Email:msr@uniben.edu</p>
                </div>
              </div>
            </div>
            <span className='h-[1px] bg-white/50 block' />
            <div className='flex flex-col items-center'>
              <div className='text-[11px] text-center ms:text-sm sm:text-base'>
                <div className='flex items-center text-'>
                  <span className='uppercase'>&copy;msr</span>
                  <span>&nbsp;</span>
                  <span>{currentYear}</span>
                  <span>&nbsp;&#124;&nbsp;</span>
                  <span className=''>Powered by InnovativeTech</span>
                  {/* <span className='text-left'>
                    Licensed under a{' '}
                    <a
                      href='https://creativecommons.org/licenses/by/4.0/'
                      className='inline-block font-semibold underline hover:text-blue-300'
                    >
                      CC BY 4.0
                    </a>
                  </span>
                  <span className='flex ml-1 border border-white p-[2px] rounded-[4px]'>
                    <FaCreativeCommons className='w-5 h-5' />
                    <FaCreativeCommonsBy className='w-5 h-5' />
                  </span> */}
                </div>
                {/* <div className='mt-2'>
                  <span className=''>Powered by InnovativeTech</span>
                </div> */}
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  )
}

export default Footer
