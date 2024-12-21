import React from 'react'
import LayoutWrapper from '../../../../../components/Dashboard/layout/LayoutWrapper'
import { auth } from '../../../../../../auth'
import { getIssues } from '../../../../../lib/actions/issues'
import Link from 'next/link'
import { CgMathPlus } from 'react-icons/cg'
import Issues from '../../../../../components/Dashboard/issues/Issues'
import IssuesEmptyState from '../../../../../components/Dashboard/issues/IssuesEmptyState'

export default async function IssuesPage({ searchParams }) {
  const { user } = await auth()
  // const user = {
  //   email: 'aaronanama@gmail.com',
  //   firstName: 'Darlington',
  //   lastName: 'Ogbeide',
  //   isAdmin: false,
  //   role: 'admin',
  // }
  const status = String(searchParams.status)
  const issues = status ? await getIssues(status) : await getIssues('published')
  console.log(status)
  console.log(issues)
  return (
    <>
      {!issues?.length ? (
        <IssuesEmptyState status={status} user={user} />
      ) : (
        <Issues issues={issues} status={status} user={user} />
      )}
    </>
  )
}
