import { H3 } from '@/components/shared/headings'
import React from 'react'

export default function StepHeader({ currentStep, steps }) {
  return (
    <div className='flex justify-center px-4 py-2 text-gray-500 bg-gray-200 border border-gray-200 rounded-md'>
      <H3 className='mx-auto font-semibold w-fit'>
        <span>{`Step ${currentStep} - `}</span>{' '}
        <span>{steps[currentStep - 1].label}</span>
      </H3>
    </div>

    // <div className='w-full max-w-3xl py-6 pb-2 mx-auto'>
    //   {/* Steps container */}
    //   <div className='relative flex justify-between'>
    //     {/* Progress bar */}
    //     <div className='absolute top-1/2 h-0.5 w-full bg-gray-200 -translate-y-1/2'>
    //       <div
    //         className='h-full transition-all duration-300 bg-secondary'
    //         style={{
    //           width: `${(currentStep / steps.length - 1) * 100}%`,
    //         }}
    //       />
    //     </div>

    //     {/* Step indicators */}
    //     {steps.map((step, index) => (
    //       <div key={step.label} className='relative flex flex-col items-center'>
    //         <div
    //           className={`
    //               w-8 h-8 rounded-full flex items-center justify-center
    //               transition-colors duration-300
    //               ${
    //                 index + 1 < currentStep
    //                   ? 'bg-secondary text-white'
    //                   : index + 1 === currentStep
    //                   ? 'bg-secondary text-white'
    //                   : 'bg-white border-2 border-secondary'
    //               }
    //             `}
    //         >
    //           {step.id < currentStep ? (
    //             <LuCheck className='w-5 h-5' />
    //           ) : (
    //             <span className='text-sm font-medium'>{step.id}</span>
    //           )}
    //         </div>

    //         {/* Step label */}
    //         <span
    //           className={`
    //               absolute top-10 text-xs md:text-sm font-medium md:flex hidden whitespace-nowrap
    //               ${index <= currentStep ? 'text-blue-500' : 'text-gray-500'}
    //             `}
    //         >
    //           {step.label}
    //         </span>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  )
}
