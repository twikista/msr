'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { cn } from '../../lib/utils'

function ResourceFilter({ status }) {
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()

  const handler = (searchTerm) => {
    const params = new URLSearchParams(searchParams)
    params.set('status', searchTerm)
    replace(`${pathName}?${params.toString()}`)
  }

  return (
    <div className='flex items-center self-end'>
      {/* <div>Filter:</div> */}
      <div className='flex w-[160px] text-xs  items-center overflow-hidden border-2 justify-evenly border-secondary rounded-xl md:w-[160px]'>
        <button
          onClick={() => {
            handler('published')
          }}
          className={cn(
            'flex-1 flex justify-center w-6/12 py-1 px-1 text-primary transition-all duration-300 hover:text-hover',

            status === 'published' || status === 'undefined'
              ? 'text-white bg-secondary hover:text-white'
              : null
          )}
        >
          Published
        </button>
        {/* <div className='mx-[3px] '>|</div> */}
        <button
          onClick={() => {
            handler('draft')
          }}
          className={cn(
            'flex-1 flex py-1 px-1 w-6/12 justify-center text-primary transition-all duration-300 hover:text-hover',
            status === 'draft' && 'text-white bg-secondary hover:text-white'
          )}
        >
          Unpublished
        </button>
      </div>
    </div>
  )
}

export default ResourceFilter
