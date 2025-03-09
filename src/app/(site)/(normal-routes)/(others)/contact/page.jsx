import React from 'react';
import Main from '../../../../../components/shared/Main';
import { H1, H3 } from '../../../../../components/shared/headings';

export default function Contact() {
  return (
    <Main>
      <H1>Contact</H1>
      <div className='flex flex-col gap-5 md:flex-row md:gap-20'>
        <div>
          <H3>Editor in Chief, MSR</H3>
          <span className='block'>Faculty of Management Sciences</span>
          <span className='block'>University of Benin, Benin city</span>
          <span className='block'>Edo state, Nigeria</span>
          <span className='block'>Email: msr@uniben.edu</span>
          <span className='block'>www.msreview.com.ng</span>
        </div>
        <div>
          <H3>Support Contact</H3>
          <span className='block'>Dr. Osagie Osifo</span>
          <span className='block'>Business manager, MSR</span>
          <span className='block'>Email: osagie.osifo@uniben.edu</span>
          <span className='block'>Phone: 0703 882 3825</span>
        </div>
      </div>
    </Main>
  );
}
