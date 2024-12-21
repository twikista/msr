import React from 'react'
import Main from '../../../../../components/shared/Main'
import { H1, H2, H3 } from '../../../../../components/shared/headings'
import { TextBlock } from '../../../../../components/shared/TextBlock'
import { cn } from '../../../../../lib/utils'

export default function AuthorsGude() {
  return (
    <Main>
      <H1>Authors Guide</H1>
      <p>
        This guide provides essential information regarding manuscript
        submission, authorship, the editorial process, and ethical
        considerations. Please read carefully to ensure compliance with our
        guidelines.
      </p>
      <div>
        <H2>Manuscript Submission</H2>
        <ul className='flex flex-col gap-1 pl-5 list-disc'>
          <li>
            <TextBlock
              headingText='Submission Method'
              headingType='small'
              text='All manuscripts must be submitted electronically as an email attachment to msr@uniben.edu, with a copy to the Business Manager at darlington.ogbeide@uniben.edu.'
              className='px-0'
            />
          </li>
          <li>
            <TextBlock
              headingText='Submission Fee'
              headingType='small'
              text='A non-refundable submission fee of ₦7,000 must accompany each manuscript.'
              className='px-0'
            />
          </li>
          <li>
            <TextBlock
              headingText='Corresponding Author'
              headingType='small'
              text='The author who submits the manuscript will be designated as the corresponding author and must provide complete contact information for all co-authors, including full name, email address, institutional affliation and mailing address (where necessary).'
              className='px-0'
            />
          </li>
          <div className='flex flex-col gap-1'>
            <H3>Note:</H3>
            <ul className='flex flex-col gap-1 pl-5 list-disc'>
              <li>
                Only manuscript(s) that have not already been submitted to other
                journals should be submitted to MSR.
              </li>
              <li>
                Manuscripts already under review with MSR should not be
                submitted to any other journal.
              </li>
              <li>
                By submitting a manuscript, authors confirm that their work is
                original and that all co-authors have approved the submission.
                Authors are responsible for ensuring that they have permission
                to publish any data included in their manuscript.
              </li>
            </ul>
          </div>
        </ul>
      </div>

      <div className={cn('flex flex-col gap-4')}>
        <H2>Authorship</H2>
        <p>
          Authorship should be limited to those who have made significant
          contributions to the conception, design, execution, or interpretation
          of the research. Individuals with lesser contributions should be
          acknowledged in the manuscript.
        </p>
        <p>
          Authors should carefully consider and finalize the list and order of
          authors before submission. Changes to authorship after submission will
          only be considered in exceptional circumstances and must be clearly
          communicated to the Editor. All authors must agree to any changes.
        </p>
      </div>
      <TextBlock
        headingText='Language'
        className='px-0'
        headingType='normal'
        text='All papers submitted for publication must be written in English.'
      />
      <TextBlock
        headingText='Plagiarism Policy'
        className='px-0'
        headingType='normal'
        text='Plagiarism is considered unethical and is strictly prohibited. Authors must ensure proper citation and acknowledgment of all sources used in their work. Submissions will be screened for plagiarism during the preliminary evaluation phase, and only those with a maximum plagiarism score of 10% will proceed to peer review.'
      />
      <div className={cn('flex flex-col gap-4')}>
        <H2>Correction of Articles</H2>
        <p>
          Errors discovered by the author after submission but before approval
          for publication should be communicated swiftly to the editor of the
          Journal before the end of the review process.
        </p>
        <p>
          If significant errors are identified in published works, authors are
          obligated to inform the editor immediately and cooperate in correcting
          or retracting the paper if necessary. If errors are reported by third
          parties, authors must also assist the editor as required.
        </p>
      </div>
    </Main>
  )
}
