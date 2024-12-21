'use client'
import { FormProvider, useForm } from 'react-hook-form'
import { cn } from '../../../lib/utils'

function Form({ handler, children, dafaultvalue, props }) {
  const methods = useForm({})
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handler)}
        noValidate
        className={cn(`space-y-5 rounded-b-md`, ...props)}
      >
        {children}
      </form>
    </FormProvider>
  )
}

export default Form
