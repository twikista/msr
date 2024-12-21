import React from 'react'
import Main from '../../../../../components/shared/Main'
import { H1, H2, H3 } from '../../../../../components/shared/headings'
import { TextBlock } from '../../../../../components/shared/TextBlock'
import LayoutWrapper from '../../../../../components/shared/LayoutWrapper'

export default function PublicationFee() {
  return (
    <Main>
      <H1>Processing Charges</H1>
      <div>
        <TextBlock
          className='px-0'
          headingText='Local Authors'
          headingType='small'
          text='Manuscripts must be accompanied with a non-refundable assessment fee of ₦7,000. Upon acceptance, a publication fee of ₦ 25,000 is expected.'
        />
        <TextBlock
          className='px-0'
          headingText='International Authors'
          headingType='small'
          text='Manuscripts must be accompanied with a non-refundable assessment fee of $10. Upon acceptance, a publication fee of $50 is expected.'
        />
      </div>
      <div>
        <p className='mb-1'>Payments should be made directly to:</p>
        <span className='block'>
          Bank: <span className='font-semibold'>UNIBEN Micro Finance Bank</span>
        </span>
        <span className='block'>
          Account Number: <span className='font-semibold'>1100075343</span>
        </span>
        <span className='block'>
          Account Name:
          <span className='font-semibold'>
            {' '}
            Faculty of Management Sciences Journal
          </span>
        </span>
      </div>
    </Main>
  )
}
