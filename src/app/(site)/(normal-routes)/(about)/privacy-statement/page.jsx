import { H1 } from '../../../../../components/shared/headings'
import Main from '../../../../../components/shared/Main'

export default function PrivacyStatement() {
  return (
    <Main>
      <H1>Privacy statement</H1>
      <p>
        Personal information such as names, email addresses, and institutional
        affiliations collected from authors and reviewers during the submission
        and review process is essential for communication regarding manuscript
        status and editorial decisions.
      </p>
      <div className='flex flex-col gap-1'>
        <span>
          The personal information collected will be used solely for the
          purposes of:
        </span>
        <ul className='pl-5 list-disc md:pl-8'>
          <li>Managing the submission and peer review process.</li>
          <li>Communicating with authors and reviewers.</li>
          <li>Ensuring the integrity of the publication process.</li>
        </ul>
      </div>
      <p>
        We do not share personal information with third parties except to
        authorized personnel involved in the editorial process.{' '}
      </p>
      <div className='flex flex-col gap-1'>
        <span className='block'>
          For questions or concerns regarding this privacy statement, please
          contact:
        </span>
        <div>
          <span className='block'>Management Sciences Review,</span>
          <span className='block'>msr@uniben.edu,</span>
          <span className='block'>Faculty of Management Sciences, </span>
          <span className='block'>Univeristy of Benin, Benin city</span>
        </div>
      </div>
    </Main>
  )
}
