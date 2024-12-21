import Link from 'next/link'
import { cn } from '../../../lib/utils'

export const LinkButton = ({ children, href, className }) => (
  <Link href={href} className={cn('btn', className)}>
    {children}
  </Link>
)
