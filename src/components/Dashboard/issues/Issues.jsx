import React from 'react'
import LayoutWrapper from '../layout/LayoutWrapper'
import Link from 'next/link'
import CreateButton from '../buttons/AddButton'
import ResourceFilter from '../Filter'
import DeleteButton from '../buttons/DeleteButton'
import EditButton from '../buttons/EditButton'
import {
  deleteIssueWithArticles,
  deleteIssueWithNoArticles,
} from '../../../lib/actions/issues'

export default function Issues({ issues, user, status }) {
  return (
    <LayoutWrapper>
      <div className='flex flex-row-reverse items-center justify-between pb-3 border-b-2 border-200'>
        <CreateButton href='/dashboard/issues/new-issue' label='Add Issue' />
        <ResourceFilter status={status} />
      </div>
      <div className='p-2 bg-[#e5d4ff] rounded-lg md:pt-0 overflow-x-auto'>
        <table className='min-w-full border-collapse'>
          <thead className='rounded-lg'>
            <tr className=''>
              <th className='px-4 pt-4 pb-1 table-fixed min-w-[200px]'>
                Issue
              </th>
              <th className='px-4 pt-4 pb-1 font-medium'>Status</th>
              <th className='px-4 pt-4 pb-1 font-medium'>Publish Date</th>
              {user.role === 'admin' && (
                <>
                  <th className='sr-only'></th>
                  <th className='sr-only'></th>
                </>
              )}
            </tr>
          </thead>
          <tbody className='text-center bg-white divide-y-2 rounded-sm'>
            {issues.map((issue, index) => (
              <tr className='py-5 text-sm md:text-base' key={issue?._id}>
                <td className='px-4 py-4 text-center border border-solid'>
                  <Link
                    className='text-center text-[#800080] hover:text-blue-600 font-medium'
                    href={`/dashboard/issues/${issue?.ref}`}
                  >{`BIJED ${issue.issueTitle}`}</Link>
                </td>
                <td className='px-4 py-4 text-center border border-solid'>
                  {issue?.status === 'published' ? (
                    <span className='px-1 py-[5px] space-x-1 text-center w-fit'>
                      published
                    </span>
                  ) : (
                    <span className='flex items-center px-1 py-1 space-x-1 w-fit'>
                      unpublished
                    </span>
                  )}
                </td>
                <td className='px-4 py-4 text-center border border-solid'>
                  <span>
                    {issue?.published
                      ? new Intl.DateTimeFormat('en-GB').format(
                          issue?.publishDate
                        )
                      : 'N/A'}
                  </span>
                </td>
                {(user.role === 'system-admin' || !issue.published) && (
                  <>
                    <td className='px-4 py-4 text-center'>
                      <EditButton
                        href={`/dashboard/issues/${issue?.ref}/edit`}
                        variant='secondary'
                      />
                    </td>
                    <td className='px-4 py-4 text-center'>
                      <DeleteButton
                        action={
                          issue?.articles.length > 0
                            ? deleteIssueWithArticles
                            : deleteIssueWithNoArticles
                        }
                        id={String(issue?._id)}
                        variant='secondary'
                      />
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </LayoutWrapper>
  )
}
