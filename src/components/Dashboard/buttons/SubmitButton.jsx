import Spinner from '../../shared/Spinner'
import { cn } from '../../../lib/utils'
import { motion } from 'framer-motion'

function SubmitButton({
  mainText,
  altText,
  isSubmitting,
  className,
  // disabled = false,
}) {
  return (
    <motion.button
      //   whileHover={{ scale: 1.1 }}
      type='submit'
      // disabled={disabled}
      className={cn(
        'btn bg-secondary transition-all duration-200 hover:bg-hover',
        className
      )}
    >
      {isSubmitting ? (
        <Spinner text={altText} />
      ) : (
        <span className=''>{mainText}</span>
      )}
    </motion.button>
  )
}

export default SubmitButton
