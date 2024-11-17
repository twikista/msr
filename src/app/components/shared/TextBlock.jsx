import Link from 'next/link'
import { H2, H3 } from './headings'
import { cn } from '../../../lib/utils'

export const TextBlock = ({
  headingText,
  text,
  headingType,
  href,
  className,
}) => (
  <div className={cn('flex flex-col gap-1 p-2', className)}>
    {headingType === 'normal' ? <H2>{headingText}</H2> : <H3>{headingText}</H3>}
    <p>{text}</p>
    {href && (
      <Link href={href} className='underline hover:text-blue-600 w-fit'>
        Learn more
      </Link>
    )}
  </div>
)
