import React from 'react'
import { cn } from '../../lib/utils'

function Spinner({ text, variant, textColor = 'white' }) {
  return (
    <div className='flex items-center gap-2 bg-transparent'>
      <i
        className={cn(
          `border-[3px] inline-block border-white/40 w-4 h-4 border-t-[3px] border-t-white rounded-full animate-spin`
        )}
      />
      {variant === 'basic' ? null : (
        <span className={`text-${textColor}`}>{text}</span>
      )}
    </div>
  )
}

export default Spinner
