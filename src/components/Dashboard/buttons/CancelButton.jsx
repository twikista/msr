'use client'
import { cn } from '../../../lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// export const CancelButton = ({ text, href, className }) => (
//   <Link href={href} className={cn('btn btn-danger', className)}>
//     {text}
//   </Link>
// )

export default function CancelButton({ text, className }) {
  const router = useRouter()
  return (
    <button
      onClick={() => router.back()}
      type='button'
      className={cn('btn btn-danger', className)}
    >
      {text}
    </button>
  )
}
