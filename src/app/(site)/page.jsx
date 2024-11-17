import Image from 'next/image'
import unibenLogo from '@/../public/uniben_logo.png'
import { MdMenu, MdOutlineClose } from 'react-icons/md'
import Header from '../components/Header'
import Main from '../components/shared/Main'
import Link from 'next/link'

const TextBlock = ({ heading, text, href = '#' }) => (
  <div className='flex flex-col gap-1 p-2 rounded-lg '>
    <h4 className='font-semibold'>{heading}</h4>
    <p>{text}</p>
    <Link href={href} className='underline hover:text-blue-600 w-fit'>
      Learn more
    </Link>
  </div>
)

export default function Home() {
  return (
    <Main>
      <p className=''>
        The Management Sciences Review (MSR) is a publication of the Faculty of
        Management Sciences, University of Benin, Benin city, Nigeria. The
        Journal is dedicated to promoting and advancing research and practice
        across all disciplines in the management sciences including Accounting,
        Acturial Science, Audit, Business Administration, Entrepreneurship,
        Finance, Forensic Accounting, Human Resource Management, Insurance,
        Magement and Information Systems, Marketing, Taxation, and related
        fields in Humanities and Social Sciences.
      </p>
      <p>
        The MSR aims to proivde a platform for researchers, academicians,
        practitioners and policy makers to engage and share knowledge in the
        form of high quality empirical and theoretical research papers in both
        print and online versions.
      </p>
      <div>
        <div className='flex flex-col rounded-[4px] bg-gray-200 p-2  gap-5'>
          <div className='py-2 border-b border-gray-400/60'>
            <h2 className='text-lg font-medium'>Quick facts about the MSR</h2>
          </div>

          <div className='grid grid-cols-2 gap-x-4 gap-y-5 '>
            <TextBlock
              heading='Submission'
              text='The MRS accepts submissions from authors on an on-going basis. Only submissions that adhere to the MSR Authors guide will be considered for review.'
            />
            <TextBlock
              heading='Publication'
              text='The MSR is published bi-anually in June and December respectively. Only accepted articles as determined by the editorial board will be published'
            />
            <TextBlock
              heading='Access'
              text='The MSR is an open access Journal. Articles are licenced under the Creative Common Attribution 4.0. making them available for free after publication.  '
            />
            <TextBlock
              heading='Review'
              text='The MSR adopts the double-blind peer review system. This eliminates any form of bias and ensures only high qulity submissions are accepted for publishing.'
            />
          </div>
        </div>
      </div>
    </Main>
  )
}
