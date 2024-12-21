import React from 'react'
import LayoutWrapper from '../../../../../../components/Dashboard/layout/LayoutWrapper'
import IssueForm from '../../../../../../components/Dashboard/forms/IssueForm'

export default function NewIssue() {
  const initialFormState = {
    issueNumber: '',
    volume: '',
    issueYear: new Date(),
  }
  return (
    <LayoutWrapper>
      <IssueForm initialFormState={initialFormState} />
    </LayoutWrapper>
  )
}
