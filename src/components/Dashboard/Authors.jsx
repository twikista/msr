import { authorsNameWithAbrreviations } from '@/lib/helper'
import { cn } from '../../lib/utils'

export default function Authors({ authors, withAffliation, className }) {
  if (withAffliation)
    return (
      <div className='space-y-2'>
        {authors.map(({ name, department, institution, _id }) => (
          <div key={_id} className=''>
            {/* <div className='flex items-center space-x-1'> */}
            <p className='font-semibold leading-none'>{name}</p>
            {/* </div> */}
            <span className='flex flex-wrap text-neutral-500'>{`Department of ${department}, ${institution}`}</span>
            {/* <p className='text-neutral-500'>{institution}</p> */}
          </div>
        ))}
      </div>
    )
  return (
    <div className=''>
      {authors.map((author, index) => (
        <span
          key={author._id}
          className={cn(
            'text-sm font-medium sm:text-base text-neutral-600',
            className
          )}
        >{`${authorsNameWithAbrreviations(author.name)}${
          index !== authors.length - 1 ? ', ' : ''
        }`}</span>
      ))}
    </div>
  )
}
