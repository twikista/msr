'use client'

import { useEffect } from 'react'

function DisplayServerValidationError({ error, setError }) {
  useEffect(() => {
    let timeOut = null
    if (error) {
      timeOut = setTimeout(() => setError(null), 5000)
    }
    return () => clearTimeout(timeOut)
  }, [error])
  return (
    <div className='flex w-full p-2 text-white bg-red-400 rounded-[4px]'>
      {error}
    </div>
  )
}

export default DisplayServerValidationError
