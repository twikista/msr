export const menuItems = [
  { pathName: 'home', url: '/' },
  {
    pathName: 'about',
    subMenuItems: [
      { pathName: 'Editorial Team', url: '/editorial-team' },
      { pathName: 'Journal Policies', url: '/journal-policies' },
      { pathName: 'Privacy Statement', url: '/privacy-statement' },
      { pathName: 'Publication Ethics', url: 'publication-ethics' },
    ],
  },

  {
    pathName: 'journal',
    subMenuItems: [
      { pathName: 'Current', url: '/current' },
      { pathName: 'Archive', url: '/archive' },
      { pathName: 'Editorial Process', url: '/editorial-process' },
      // { pathName: 'Submission Guide', url: 'submission-guide' },
      { pathName: 'Processing Charges', url: '/processing-charges' },
    ],
  },
  {
    pathName: 'For Authors',
    subMenuItems: [
      { pathName: 'Authors Guide', url: '/authors-guide' },
      { pathName: 'submission Guide', url: '/submission-guide' },
    ],
  },
  { pathName: 'For Reviewers', url: '/for-reviewers' },
  { pathName: 'contact', url: '/contact' },
  { pathName: 'login', url: `/auth/login` },
]

export const footerItems = [
  {
    pathName: 'about',
    subMenuItems: [
      { pathName: 'Editorial Team', url: '/editorial-team' },
      { pathName: 'Journal Policies', url: '/journal-policies' },
      { pathName: 'Privacy Statement', url: '/privacy-statement' },
      { pathName: 'Publication Ethics', url: 'publication-ethics' },
    ],
  },

  {
    pathName: 'journal',
    subMenuItems: [
      { pathName: 'Current', url: '/current' },
      { pathName: 'Archive', url: '/archive' },
      { pathName: 'Editorial Process', url: '/editorial-process' },
      { pathName: 'Processing Charges', url: '/processing-charges' },
    ],
  },
  {
    pathName: 'For Authors',
    subMenuItems: [
      { pathName: 'Authors Guide', url: '/authors-guide' },
      { pathName: 'submission Guide', url: '/submission-guide' },
      { pathName: 'For Reviewers', url: '/for-reviewers' },
    ],
  },
]
