import { H1, H2 } from '../../../../../components/shared/headings'
import Main from '../../../../../components/shared/Main'
import React from 'react'

export default function JournalPolicies() {
  return (
    <Main>
      <H1>Journal Policies</H1>
      <div className='flex flex-col gap-2'>
        <H2>Peer Review Policy</H2>
        <p>
          The MSR employs a double-blind peer review process to ensure
          objectivity and impartiality. This means that both the identities of
          the authors and reviewers are concealed from each other throughout the
          review process.
        </p>
        <ul className='flex flex-col gap-1 pl-5 list-disc md:pl-8'>
          <li>
            <span className='inline-block font-medium pr-[2px]'>
              Review Process:
            </span>
            Each manuscript submitted will be evaluated by at least two
            independent reviewers who are experts in the field. Reviewers will
            assess the manuscript based on originality, significance,
            methodology, clarity, and adherence to ethical standards.
          </li>
          <li>
            <span className='inline-block font-medium pr-[2px]'>
              Timeliness:
            </span>
            Reviewers are expected to complete their evaluations within four
            weeks. If delays occur, they should notify the editorial team
            promptly.
          </li>
          <li>
            <span className='inline-block font-medium pr-[2px]'>
              Decision Making:
            </span>
            The editorial team will make final publication decisions based on
            reviewer feedback. Authors will receive constructive comments and
            suggestions for improvement when applicable.
          </li>
        </ul>
      </div>
      <div className='flex flex-col gap-2'>
        <H2>Copyright Policy</H2>
        <p>
          Upon acceptance of a manuscript, authors are required to transfer
          copyright to the journal. This transfer allows the journal to publish
          and disseminate the work effectively.
        </p>
        <ul className='flex flex-col gap-1 pl-5 list-disc md:pl-8'>
          <li>
            <span className='inline-block font-medium pr-[2px]'>
              Author Rights:
            </span>
            Authors retain the right to use their work in future publications
            and presentations, provided that proper citation is given to the
            original publication in this journal.
          </li>
          <li>
            <span className='inline-block font-medium pr-[2px]'>
              Reproduction:
            </span>
            Authors may reproduce their work in other publications or share it
            publicly after a period of six months post-publication, with
            appropriate acknowledgment of the original source.
          </li>
        </ul>
      </div>
      <div className='flex flex-col gap-2'>
        <H2>Open Access Policy</H2>
        <p>
          The MSR adheres to an open access model under the Creative Commons
          Attribution 4.0 International License{' '}
          <a
            href='https://creativecommons.org/licenses/by/4.0/'
            className='inline-block underline hover:text-blue-600'
          >
            (CC BY 4.0).
          </a>
        </p>
        <ul className='flex flex-col gap-1 pl-5 list-disc md:pl-8'>
          <li>
            <span className='inline-block font-medium pr-[2px]'>Access: </span>
            All articles published in the MSR are freely accessible to readers
            without any subscription or payment barriers.
          </li>
          <li>
            <span className='inline-block font-medium pr-[2px]'>
              Attribution:
            </span>
            Users are free to share and adapt the work as long as appropriate
            credit is given to the authors and the original source is linked.
            This encourages wider dissemination and engagement with research
            findings
          </li>
        </ul>
      </div>
      <div className='flex flex-col gap-2'>
        <H2>Plagiarism Policy</H2>
        <p>
          The MSR take plagiarism very seriously and employ strict measures to
          maintain academic integrity.
        </p>
        <ul className='flex flex-col gap-1 pl-5 list-disc md:pl-8'>
          <li>
            <span className='inline-block font-medium pr-[2px]'>
              Detection:
            </span>
            All submitted manuscripts will be checked for plagiarism using
            industry-standard software before being sent for peer review.
          </li>
          <li>
            <span className='inline-block font-medium pr-[2px]'>
              Consequences:
            </span>
            If plagiarism is detected at any stage of the submission or
            publication process, appropriate actions will be taken, which may
            include rejection of the manuscript or retraction of published
            articles. Authors found guilty of plagiarism may also be banned from
            submitting future work to the journal.
          </li>
        </ul>
      </div>
    </Main>
  )
}
