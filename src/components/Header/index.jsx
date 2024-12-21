'use client'

import React, { useState } from 'react'
import unibenLogo from '../../../public/uniben_logo.png'
import Image from 'next/image'
import { MdMenu } from 'react-icons/md'
import { MobileNav } from './MobileNav'
import { menuItems } from '../../static/menuItems'
import { DesktopNav } from './DesktopNav'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function Header() {
  const [active, setActive] = useState(null)
  const [navbarOpen, setNavbarOpen] = useState(false)
  const activePath = useSelectedLayoutSegment()
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen)
  }
  return (
    <>
      {activePath !== 'dashboard' && (
        <header>
          <div className='relative flex flex-col items-center justify-center gap-1 py-1 pt-2 overflow-hidden bg-secondary md:bg-background xl:h-[84px] md:flex-row lg:gap-2 md:py-2 lg:py-3 text-background md:text-secondary'>
            <div className='relative'>
              {/* <div className='hidden md:block bg-red-500 absolute w-[8px] h-[80px] top-[-20px] bottom-[-20px] left-[10px]' />
              <div className=' hidden md:block bg-green-500 w-[8px] h-[80px] absolute top-[-20px] bottom-0  right-[10px]' /> */}
              <div className='md:h-[60px] md:w-[60px] h-10 w-10 flex bg-transparent  md:bg-white relative z-[2] items-center justify-center rounded-full'>
                <Image
                  src={unibenLogo}
                  alt='uniben logo'
                  width={80}
                  height='auto'
                  className='hidden rounded-full md:block relative z-[2]'
                />
                <Image
                  src={unibenLogo}
                  alt='uniben logo'
                  width={40}
                  height='auto'
                  className='rounded-full md:hidden relative z-[2] w-10'
                />
              </div>
            </div>

            <h1
              className={`text-lg font-bold text-center uppercase sm:text-2xl md:text-4xl`}
            >
              management sciences review
            </h1>

            <div
              className='absolute block cursor-pointer md:hidden right-2 top-3'
              onClick={navbarToggleHandler}
            >
              <MdMenu className='text-3xl' />
            </div>

            {/* <MdOutlineClose className='absolute block text-3xl md:hidden right-2 top-3' /> */}
          </div>
          {/* desktop menu */}
          <DesktopNav
            // active={active}
            // setActive={setActive}
            menuItems={menuItems}
          />
          {/* mobile nav */}
          <MobileNav
            active={active}
            setActive={setActive}
            navbarOpen={navbarOpen}
            setNavbarOpen={setNavbarOpen}
            menuItems={menuItems}
          />
        </header>
      )}
    </>
  )
}
