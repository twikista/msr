import Spinner from '../Spinner'
import { cn } from '../../../lib/utils'

function SubmitButton({
  mainText,
  altText,
  isSubmitting,
  className,
  // disabled = false,
}) {
  return (
    <button
      type='submit'
      // disabled={disabled}
      className={cn('btn bg-secondary', className)}
    >
      {isSubmitting ? (
        <Spinner text={altText} />
      ) : (
        <span className=''>{mainText}</span>
      )}
    </button>
  )
}

export default SubmitButton
