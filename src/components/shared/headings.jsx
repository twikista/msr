import { cn } from '../../lib/utils'

export const H1 = ({ children, className }) => (
  <h1 className={cn('text-lg md:text-2xl font-semibold', className)}>
    {children}
  </h1>
)

export const H2 = ({ children, className }) => (
  <h2 className={cn('text-base md:text-lg font-medium', className)}>
    {children}
  </h2>
)

export const H3 = ({ children, className }) => (
  <h3 className={cn('text-sm md:text-base font-medium', className)}>
    {children}
  </h3>
)
