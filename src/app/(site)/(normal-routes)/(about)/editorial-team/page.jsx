import { H1, H2, H3 } from '../../../../../components/shared/headings'
import Main from '../../../../../components/shared/Main'
import { TextBlock } from '../../../../../components/shared/TextBlock'
import React from 'react'

const editors = [
  {
    department: 'Accounting',
    editors: [
      'prof. Alade Sule Omoye',
      'Prof. Eyesan Leslie Dabor',
      'Prof. Emmanuel Eragbhe',
      'Prof. Peter Okoeguale Ibadin',
      'prof. James odia',
      'Prof. Killian Ogiedu',
      'Dr. Osasu Obaretin',
    ],
  },
  {
    department: 'Finance',
    editors: [
      'Prof. Sunday Osaretin Igbinosa',
      'Dr. M.G. Ajao',
      'Dr. O.G. Omorunkuwa',
    ],
  },
  {
    department: 'Business Administration',
    editors: [
      'Prof. Andrew Tafamel',
      'Prof. Ibrahim Shaibu',
      'Prof. J.O. Ejechi',
      'Dr. Omorodion Omoregbe',
    ],
  },
  {
    department: 'Entrepreneurship',
    editors: [
      'Dr. Mrs. A.O. Oriazowanlan',
      'Dr. S.O. Obeki',
      'Dr. mrs. A.C. Orakwe',
    ],
  },
  {
    department: 'Marketing',
    editors: [
      'Prof. Mrs. E.O. Odia',
      'Prof. Ehiabhi Patrick Oseyomon',
      'Dr. E.C. Gbandi',
      'Dr. S.J. Osifo',
    ],
  },
  {
    department: 'Human Resources Management',
    editors: [
      'Dr. Mrs. E.E. Idubor',
      'Prof. Mrs. E.I. Umemezia',
      'Dr. Mrs. O.R. Dania',
    ],
  },
]

const editorialAdvisoryBoard = [
  'Prof. Esosa Boniface Bob-Osaze',
  'Prof. Famous Izedonmi',
  'Prof. Ifuero Osad Osamwonyi',
  'Prof. Chinwuba Ambrose Okafor',
  'Prof. Adesina Oladipupo',
  'Prof. ofuan James Ilaboya',
]

function EditorialTeam() {
  return (
    <Main>
      <H1>MSR Editorial Team</H1>
      <TextBlock
        headingType='small'
        headingText='Editor-in-Chief'
        text='Prof. Augustine Osa Enofe'
        className='gap-0 p-0'
      />
      <TextBlock
        headingType='small'
        headingText='Business Manager'
        text='Dr. Darlington Osaremwinda Ogbeide '
        className='gap-0 p-0'
      />
      <>
        {editors.map(({ department, editors }) => (
          <>
            <div>
              <H3>{`Editors: Department of ${department}`}</H3>
              <div>
                {editors.map((i) => (
                  <span key={i} className='block'>
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </>
        ))}
      </>
      <div>
        <H3>Editorial Advisory Board</H3>
        <div>
          {editorialAdvisoryBoard.map((i) => (
            <span key={i} className='block'>
              {i}
            </span>
          ))}
        </div>
      </div>
    </Main>
  )
}

export default EditorialTeam
