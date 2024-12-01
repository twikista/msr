import Link from 'next/link'
import { H2, H3 } from './headings'
import { cn } from '../../../lib/utils'

export const TextBlock = ({
  headingText,
  text,
  headingType,
  href,
  className,
  headingClassName,
}) => (
  <div className={cn('flex flex-col gap-1 p-2', className)}>
    {headingType === 'normal' ? (
      <H2 className={headingClassName}>{headingText}</H2>
    ) : (
      <H3 className={headingClassName}>{headingText}</H3>
    )}
    <p>{text}</p>
    {href && (
      <Link href={href} className='underline hover:text-blue-600 w-fit'>
        Learn more
      </Link>
    )}
  </div>
)
