import Link from 'next/link'
import React from 'react'
import { CgMathPlus } from 'react-icons/cg'

export default function AddButton({ label, href }) {
  return (
    <Link href={href} className='flex gap-1 btn-create btn '>
      <span>{label}</span>
      <CgMathPlus />
    </Link>
  )
}
