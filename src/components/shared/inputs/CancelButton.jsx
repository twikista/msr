import Link from 'next/link'
import { cn } from '../../../lib/utils'

export const CancelButton = ({ text, href, className }) => (
  <Link href={href} className={cn('btn btn-danger', className)}>
    {text}
  </Link>
)
