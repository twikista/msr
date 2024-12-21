import { H1 } from '../../../../../components/shared/headings'
import Main from '../../../../../components/shared/Main'
import { TextBlock } from '../../../../../components/shared/TextBlock'

import React from 'react'
import { RxOpenInNewWindow } from 'react-icons/rx'

export default function PublicationEthics() {
  return (
    <Main>
      <H1>Publication Ethics</H1>
      <p>
        The Management Sciences Review (MSR) is dedicated to maintaining and
        promoting the highest standards of ethical conduct in scholarly
        publishing. As part of this commitment, MSR adheres to the ethical
        principles and guidelines established by{' '}
        <a
          href='https://publicationethics.org/guidance/Guidelines'
          target='_blank'
          className='inline-block underline hover:text-blue-600'
        >
          <span>Committee on Publication Ethics (COPE)</span>
        </a>
        . These principles outline outlines the ethical responsibilities of all
        parties involved in the publication process.
      </p>
      <TextBlock
        headingText='Editorial Responsibilities'
        headingType='small'
        text='Editors are responsible for ensuring the integrity of the publication process. They must make decisions based solely on the merit of the work, without bias or conflicts of interest. Editors should maintain confidentiality regarding submitted manuscripts and ensure that all published research adheres to ethical standards, including proper citation practices and avoidance of plagiarism. They must also provide clear guidance to authors regarding authorship criteria and expectations for manuscript preparation.'
      />
      <TextBlock
        headingText='Author Responsibilities'
        headingType='small'
        text='Authors are expected to conduct their research ethically and report their findings honestly. They must ensure that their work is original, properly cited, and free from plagiarism. Any potential conflicts of interest must be disclosed, and authors should acknowledge contributions from all individuals involved in the research. In cases of suspected misconduct, authors are required to cooperate with any investigations conducted by the journal or relevant institutions.'
      />
      <TextBlock
        headingText='Peer Review Process'
        headingType='small'
        text='The peer review process is essential for maintaining the quality and integrity of published research. Reviewers must provide objective, constructive feedback while respecting the confidentiality of the manuscripts they review. They should disclose any conflicts of interest and refrain from using information gained during the review process for personal advantage.'
      />
    </Main>
  )
}
