import { auth } from '../../../../../../../auth'
import IssueEmptyState from '../../../../../../components/Dashboard/issues/IssueEmptyState'
import IssueContent from '../../../../../../components/Dashboard/issues/Issue'
import { connectDB } from '../../../../../../lib/mongoose/config'
import { Issue, Article } from '../../../../../../lib/mongoose/models'
// import { getArticlesInIssue } from '../../../../../../lib/data'

const getArticlesInIssue = async (issueRef) => {
  connectDB()
  const articlesInIssue = await Promise.all([
    Issue.find({
      ref: 'volume-1-issue-1',
    }),
    Article.find({
      ref: `${issueRef}`,
    }).sort({
      startPage: 1,
    }),
  ])
  return articlesInIssue
}

async function IssuePage({ params }) {
  const { user } = await auth()

  const { issue: issueRef } = params

  const [[issue], articlesInIssue] = await getArticlesInIssue(issueRef)

  const adminPrivilege = issue?.status === 'draft' && user?.role === 'admin'
  console.log(articlesInIssue.length)

  const systemAdminPrevilege = user?.role === 'system-admin'
  const adminRoles = {
    admin: adminPrivilege,
    systemAdmin: systemAdminPrevilege,
  }

  return (
    <>
      {!articlesInIssue.length ? (
        <IssueEmptyState issue={issue} adminRoles={adminRoles} />
      ) : (
        <IssueContent
          adminRoles={adminRoles}
          articlesInIssue={articlesInIssue}
          issue={issue}
        />
      )}
    </>
  )

  // return (
  //   <main className='relative flex h-screen'>
  //     <SideNav />
  //     <MobileNav />
  //     <DashboardContainer>
  //       <DashboardWrapper>
  //         <section>
  //           <div>
  //             <h2 className='text-2xl font-bold text-center capitalize md:text-left font-cairo'>
  //               {`Volume ${issue.volume} Issue ${issue.issueNumber} (${new Date(
  //                 issue.publishDate
  //               ).getFullYear()})`}
  //             </h2>
  //             <div className='flex justify-center my-1 md:justify-start'>
  //               <span
  //                 className={clsx(
  //                   'inline-block px-2 py-[2px] text-sm font-medium bg-gray-300 rounded-3xl',
  //                   {
  //                     [`bg-green-500 text-white`]: issue.status === 'published',
  //                   }
  //                 )}
  //               >{`status: ${issue?.status}`}</span>
  //             </div>
  //             <p className='text-sm text-center text-gray-400 md:text-left font-cairo'>
  //               {issue.published
  //                 ? `Publish Date: ${new Date(
  //                     issue.publishDate
  //                   ).toLocaleDateString('en-US', {
  //                     year: 'numeric',
  //                     month: 'long',
  //                     day: 'numeric',
  //                   })}`
  //                 : 'Publish Date: N/A'}
  //             </p>
  //           </div>
  //           <div className='flex justify-end mt-5'>
  //             {businessManagerPrivilege && (
  //               <CreateButton
  //                 label='Add Article'
  //                 href={`/dashboard/issues/${issue.ref}/new-article`}
  //               />
  //             )}
  //           </div>
  //         </section>
  //         <section className='pb-6'>
  //           <div className='p-2 bg-[#e5d4ff] rounded-lg md:pt-0 overflow-x-auto'>
  //             <table className='min-w-full overflow-x-scroll'>
  //               <thead className='rounded-lg'>
  //                 <tr className=''>
  //                   <th className='px-4 py-6 pb-1 font-medium w-20px]'>S/N</th>
  //                   <th className='px-4 pt-4 pb-1 table-fixed'>Article</th>
  //                   <th className='px-4 pt-4 pb-1 table-fixed'>
  //                     Author&#40;s&#41;
  //                   </th>
  //                   <th className='px-2 pt-4 pb-1 min-w-[100px]'>Page</th>
  //                   <th className='px-4 pt-4 pb-1 font-medium w-14'>Status</th>
  //                   {(businessManagerPrivilege || adminPrevilege) && (
  //                     <>
  //                       <th className='sr-only'></th>
  //                       <th className='sr-only'></th>
  //                     </>
  //                   )}
  //                 </tr>
  //               </thead>
  //               <tbody className='text-center bg-white divide-y-2 rounded-sm'>
  //                 {articlesInIssue.map((article, index) => (
  //                   <tr className='py-5 text-sm' key={article._id}>
  //                     <td className='px-4 py-5 border border-solid'>{`${
  //                       index + 1
  //                     }.`}</td>
  //                     <td className='px-4 py-5 text-left border border-solid'>
  //                       <Link
  //                         className='text-left text-[#800080] hover:text-blue-600 font-medium'
  //                         href={`/dashboard/issues/${issue.ref}/${article.slug}`}
  //                       >
  //                         {article.title}
  //                       </Link>
  //                     </td>
  //                     <td className='px-4 py-4 text-left border border-solid'>
  //                       {/* <span>{article.slug}</span> */}
  //                       <Authors
  //                         authors={article?.authors}
  //                         additionalStyles='font-normal text-sm'
  //                       />
  //                     </td>
  //                     <td className='px-4 py-4 text-center border border-solid'>
  //                       <span>{article.slug}</span>
  //                     </td>
  //                     <td className='px-4 py-4 text-center border border-solid'>
  //                       {article.published ? (
  //                         <span className='px-1 py-[5px] space-x-1 text-center'>
  //                           published
  //                         </span>
  //                       ) : (
  //                         <span className='flex items-center px-1 py-[5px] space-x-1 w-fit'>
  //                           unpublished
  //                         </span>
  //                       )}
  //                     </td>
  //                     {(businessManagerPrivilege || adminPrevilege) && (
  //                       <>
  //                         <td className='px-4 py-4 text-center'>
  //                           <EditButton
  //                             href={`/dashboard/issues/${issue.ref}/${article.slug}/edit`}
  //                             variant='secondary'
  //                           />
  //                         </td>
  //                         <td className='px-4 py-4 text-center'>
  //                           <DeleteButton
  //                             action={deleteArticle}
  //                             id={String(article._id)}
  //                             variant='secondary'
  //                           />
  //                         </td>
  //                       </>
  //                     )}
  //                   </tr>
  //                 ))}
  //               </tbody>
  //             </table>
  //           </div>
  //         </section>
  //         {businessManagerPrivilege && (
  //           <div className='flex justify-center gap-6 pt-2 md:pt-6'>
  //             <SendForAuthorizationButton
  //               resourceRef={issueRef}
  //               action={submitIssueForPublishing}
  //               label={{
  //                 main: 'Submit for Authorization',
  //                 alt: 'submitting Issue...',
  //               }}
  //               notificationMessage={{
  //                 success: 'Issue submitted for authorization',
  //                 error: 'Something went wrong',
  //               }}
  //             />
  //           </div>
  //         )}
  //         {managingEditorPrivilege && (
  //           <div className='flex justify-center gap-6 pt-2 pb-4 md:pt-6'>
  //             <RejectPublishButton
  //               resourceRef={issue?.ref}
  //               label={{ main: 'Reject Publish Request', alt: 'Processing...' }}
  //               action={rejectRequestToPublishIssue}
  //               notificationMessage={{
  //                 success: 'Publish request rejected successfully',
  //                 error: 'Something went wrong',
  //               }}
  //             />
  //             <PublishButton
  //               resourceRef={issue?.ref}
  //               user={user}
  //               action={publishIssue}
  //               notificationMessage={{
  //                 success: 'Issue published',
  //                 error: 'Error publishing issue',
  //               }}
  //               label={{
  //                 main: 'Publish issue',
  //                 alt: 'Publishing issue',
  //               }}
  //             />
  //           </div>
  //         )}
  //       </DashboardWrapper>
  //     </DashboardContainer>
  //   </main>
  // )
}

export default IssuePage
