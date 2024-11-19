import React from 'react'
import Main from '../../../components/shared/Main'
import { H1, H3 } from '../../../components/shared/headings'
import { TextBlock } from '../../../components/shared/TextBlock'

export default function EditorialProcess() {
  return (
    <Main>
      <H1>Editorial Process</H1>
      <p>
        The MSR aims to maintain high standards of academic integrity and
        quality in research publication while providing a seamless experience
        for authors throughout their submission journey, by adhering to the
        structured editorial process outlined below.{' '}
      </p>
      <div>
        <TextBlock
          className='px-0'
          headingText='Article Submission'
          headingType='normal'
          text='The Management Sciences Review (MSR) accepts submissions on an ongoing basis. Authors are encouraged to submit their manuscripts at any time throughout the year. Submissions should be sent as an email attachment to msr@uniben.edu, with a copy to the Business Manager at darlington.ogbeide@uniben.edu.'
        />
        <div className='flex flex-col gap-1'>
          <H3>Note:</H3>
          <ul className='flex flex-col gap-1 pl-5 list-disc'>
            <li>
              All submitted articles must represent original work by the authors
              and must be approved for submission by all co-authors. Authors are
              responsible for any copyright violations.
            </li>
            <li>
              Manuscripts must not have been previously published or currently
              under consideration by other journals. Once submitted to MSR,
              manuscripts cannot be sent to other journals until the review
              process is complete.
            </li>
            <li>
              Submissions will be processed in the order they are received. Only
              manuscripts that adhere to the submission guidelines will be
              accepted for review.
            </li>
          </ul>
        </div>
      </div>
      <div>
        <TextBlock
          className='px-0'
          headingText='Article Review'
          headingType='normal'
          text='Upon submission, all articles undergo a thorough double-blind peer review process. The review process follows these stages:'
        />
        <ul className='pl-5 list-decimal'>
          <li>
            <TextBlock
              className='px-0'
              headingText='Preliminary Review'
              headingType='small'
              text='Submitted manuscripts undergo an initial evaluation at the Editorial Office to ensure compliance with journal guidelines and quality standards. Only manuscripts meeting these criteria will advance to the next stage.'
            />
          </li>
          <li>
            <TextBlock
              className='px-0'
              headingText='Peer Review'
              headingType='small'
              text="Manuscripts that pass the preliminary review are assigned to independent reviewers selected based on their expertise in the and experience in the manuscript's subject area. Each reviewer will receive an honorarium for their work."
            />
            <p>
              Depending on reviewers’ recommendations, the manuscript may
              manuscripts may be returned to the corresponding author for
              necessary revisions. Authors are expected to implement suggested
              changes promptly.
            </p>
          </li>
          <li>
            <div>
              <TextBlock
                className='px-0'
                headingText='Final Review'
                headingType='small'
                text='The Editorial Board, led by the Editor-in-Chief, conducts the final review. This step results in an editorial decision, which may be an acceptance of the manuscript, rejection of the manuscript, or recommendations for further revisions. The corresponding author will receive notification of the editorial decision via email.'
              />
              <H3>Note:</H3>
              <ul className='flex flex-col gap-1 pl-5 list-disc'>
                <li>
                  To facilitate timely communication, authors are encouraged to
                  regularly check their emails for updates from the editorial
                  team. Delays in communication may result in the removal from
                  the review process.
                </li>
                <li>
                  Direct communication with the Editor-in-Chief regarding
                  manuscript status is prohibited. All inquiries should be
                  directed to msr@uniben.edu, with a copy sent to the Business
                  Manager at darlington.ogbeide@uniben.edu.
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <TextBlock
        className='px-0'
        headingText='Article Publication'
        headingType='normal'
        text='Only articles that have been approved by the editorial team in accordance with journal policies will be published. MSR publishes articles biannually, with issues released in June and December, available in both digital (online) and print formats.'
      />
    </Main>
  )
}
