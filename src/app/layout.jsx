import './globals.css'
import {
  Roboto_Flex,
  Cairo,
  Assistant,
  Overpass,
  Archivo_Narrow,
  Prompt,
  Roboto_Condensed,
  Barlow_Condensed,
  IBM_Plex,
} from 'next/font/google'
import ClientSideToastContainer from '../components/ClientSideToastContainer'

// export const teko = Exo({
//   subsets: ['latin'],
//   variable: '--font-exo',
//   display: 'swap',
// })

// export const teko = Exo({
//   subsets: ['latin'],
//   variable: '--font-exo',
//   display: 'swap',
// })

const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
  display: 'swap',
})

// const teko = Roboto_Condensed({
//   subsets: ['latin'],
//   variable: '--font-cairo',
//   // weight: '600',
//   display: 'swap',
// })

export const metadata = {
  metadataBase: new URL('https://msreview.com.ng'),
  title: {
    default: 'MSR - Management Sciences Review',
    template: '%s | Management Sciences Review',
  },
  description:
    'The Management Sciences Review (MSR) is the official journal of the Faculty of Management Sciences, University of Benin, Benin city, Nigeria.',

  keyword: [
    'Academic',
    'journal',
    'Management sciences',
    'Humanities',
    'university of Benin',
    'UNIBEN',
    'Benin International Journal of Entrepreneurship Development',
    'MSR',
    'Management Sciences Review',
    'Accounting',
    'Taxation',
    'Finace',
    'Business administration',
    'acturial science',
    'Insurance',
    'marketing',
    'management information system',
    'forensic Accounting',
    'audit',
    'human resource management',
    'management sciences',
    'Nigeria',
  ],
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${robotoFlex.className} flex flex-col min-h-screen`}>
        {children}
        <ClientSideToastContainer />
      </body>
    </html>
  )
}
