import React from 'react'
import LayoutWrapper from '../layout/LayoutWrapper'
import AddButton from '../buttons/AddButton'

export default function IssueEmptyState({ issue, adminRoles }) {
  return (
    <LayoutWrapper>
      <section className='flex flex-col'>
        <div className='h-14'>
          <h2 className='text-2xl font-bold text-center capitalize md:text-left font-cairo'>
            {`Volume ${issue.volume} Issue ${issue.issueNumber} (${new Date(
              issue.publishDate
            ).getFullYear()})`}
          </h2>
          <p className='text-sm text-center text-gray-400 font-cairo md:text-left'>
            {issue.published
              ? `Publish Date: ${new Date(issue.publishDate).toLocaleDateString(
                  'en-US',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }
                )}`
              : 'Publish Date: N/A'}
          </p>
        </div>
        <div className='flex flex-col items-center justify-center flex-1 my-24 space-y-8'>
          <p className='text-2xl text-center text-gray-400'>
            There are currently no articles in this issue
          </p>
          {(adminRoles.admin || adminRoles.systemAdmin) && (
            <AddButton
              label='Add Article'
              href={`/dashboard/issues/${issue.ref}/new-article`}
            />
          )}
        </div>
      </section>
    </LayoutWrapper>
  )
}
