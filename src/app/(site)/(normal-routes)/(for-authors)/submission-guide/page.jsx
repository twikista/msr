import React from 'react'
import { H1, H3 } from '../../../../../components/shared/headings'
import Main from '../../../../../components/shared/Main'

export default function SubmissionGuide() {
  return (
    <Main>
      <H1>Submission Guide</H1>
      <p>
        The Management Sciences Review (MSR) shall welcome articles from various
        authors subject to the following guidelines:
      </p>
      <ul className='flex flex-col gap-1 pl-5 list-disc'>
        <li>
          The length of each mauscript should not be more than 6,000 words.
        </li>
        <li>
          The main body of the article shall be typed in double line spacing.
        </li>
        <li>
          The first page of the manuscript should contain Title of the article
          and Authors&#39; bio-data information including name, institutional
          affliation, and correspondence e-mail address
        </li>
        <li>
          The second page of the manuscript should contain an abstract of not
          more than 300 words. please do not put the name(s) of the author(s) on
          this page.
        </li>
        <li>
          References hould be cited in the text by author&#39;s last name,
          publication year where necessary e.g. (Akerele, 2006:23). For multiple
          authors, add &#8223;et al&#750; to the first author&#39;s name for the
          first time of usage, e.g. (Esosa et al, 2008:5).
        </li>
      </ul>
      <div>
        <H3 className='mb-1'>References</H3>
        <ul className='flex flex-col gap-1 pl-5 list-disc'>
          <li>
            All citiations must conform to the American Psychological
            Association (APA) 7th edition
          </li>
          <li>
            Full references at the end of the text should listed alphebetically
            by author7&#39;s last name
          </li>
          <li>
            Where there are seceral citiations by the same author(s), they
            shpild be listed by date of publication, e.g. (Isa, 2006, 2007, etc)
          </li>
        </ul>
      </div>
    </Main>
  )
}
