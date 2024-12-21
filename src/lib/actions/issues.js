'use server'

import { revalidatePath } from 'next/cache'
import { connectDB } from '../mongoose/config'
import { Article, Issue } from '../mongoose/models'
import { auth } from '../../../auth'
import { IssueFormSchema } from '../schema'
import mongoose from 'mongoose'

export const getIssues = async (status) => {
  try {
    connectDB()
    const issues = await Issue.find({ status }).sort({
      volume: -1,
      issueNumber: -1,
    })
    console.log(issues)
    return issues
  } catch (error) {
    // console.log(error)
  }
}

export const getIssue = async (issueRef) => {
  try {
    connectDB()
    const issue = await Issue.findOne({ ref: issueRef }).lean()

    // const json = JSON.stringify(issue)
    // const issueObject = JSON.parse(json)
    return issue
  } catch (error) {
    // console.log(error)
  }
}

//create new issue
export const createIssue = async (formData) => {
  const user = await auth()
  const {
    user: { firstName, lastName },
  } = user

  const parsedData = IssueFormSchema.safeParse(formData)
  if (!parsedData.success) {
    const validationError = handleServerSideValidationError(parsedData)
    return { ok: false, error: validationError, errorType: 'validationError' }
  }
  const { issueNumber, issueYear, volume } = parsedData.data
  const issueData = {
    issueNumber,
    volume,
    issueYear,
    ref: `volume-${volume}-issue-${issueNumber}`,
    issueTitle: `Vol. ${volume} No. ${issueNumber} (${new Date(
      issueYear
    ).getFullYear()})`,
    published: false,
    publishDate: new Date(issueYear),
    initiatedBy: `${firstName} ${lastName}`,
  }

  try {
    connectDB()
    const newIssue = new Issue(issueData)
    const savedIssue = await newIssue.save()
    if (savedIssue?._id !== null) {
      revalidatePath('/archive')
      revalidatePath('/dashboard/issues')
      return { ok: true }
    }
  } catch (error) {
    console.log(error)
    return { ok: false, error: 'Something went wrong', errorType: 'other' }
  }
}

export async function updateIssue(id, initialValue, formData) {
  const parsedData = IssueFormSchema.safeParse(formData)
  if (!parsedData.success) {
    const validationError = handleServerSideValidationError(parsedData)
    return { ok: false, error: validationError, errorType: 'validationError' }
  }
  const { issueNumber, issueYear, volume } = parsedData.data
  const issueData = {
    ...initialValue,
    ...parsedData.data,
    ref: `volume-${volume}-issue-${issueNumber}`,
    issueTitle: `Vol. ${volume} No. ${issueNumber} (${new Date(
      issueYear
    ).getFullYear()})`,
  }
  try {
    connectDB()
    const updatedIssue = await Issue.findByIdAndUpdate({ _id: id }, issueData, {
      new: true,
    })
    if (updatedIssue._id === undefined)
      return { ok: false, error: 'Something went wrong', errorType: 'other' }
    //update all articles associated wtih an issue

    revalidatePath('/dashboard/issues')
    revalidatePath('/archive')
    return { ok: true }
  } catch (error) {
    return { ok: false, error: 'Something went wrong', errorType: 'other' }
  }
}

//send draft editorial board for authorization
export const submitIssueForPublishing = async (ref) => {
  try {
    connectDB()
    const issueSubmittedForPublishing = await Issue.findOneAndUpdate(
      { ref: ref, status: 'draft' },
      {
        $set: {
          status: 'review',
        },
      },
      { new: true }
    )

    if (issueSubmittedForPublishing?._id) {
      revalidatePath(`/dashboard/issues/${issueSubmittedForPublishing?.ref}`)
      return { ok: true }
    } else {
      return { ok: false, error: 'something went wrong', errorType: 'other' }
    }
  } catch (error) {
    // console.log(error)
  }
}

export const rejectRequestToPublishIssue = async (ref) => {
  // const date = new Date()
  try {
    connectDB()
    const publishedIssue = await Issue.findOneAndUpdate(
      { ref: ref, status: 'review' },
      {
        $set: {
          status: 'draft',
        },
      },
      { new: true }
    )

    if (publishedIssue._id) {
      revalidatePath(`/dashboard/issues/${publishedIssue.ref}`)
      return { ok: true }
    } else {
      return { ok: false, error: 'something went wrong', errorType: 'other' }
    }
  } catch (error) {
    console.log(error)
  }
}

//publish issue
export const publishIssue = async (issueRef, user) => {
  try {
    connectDB()
    const publishedIssue = await Issue.findOneAndUpdate(
      { ref: issueRef, status: 'review' },
      {
        $set: {
          published: true,
          // publishDate: issue?.publishDate,
          status: 'published',
          mode: 'final',
          approvedBy: `${user.firstName} ${user.lastName}`,
        },
      },
      { new: true }
    )
    if (publishedIssue?._id) {
      const publishedArticles = await Article.updateMany(
        { ref: issueRef },
        { $set: { published: true, publishDate: publishedIssue?.publishDate } }
      )
      if (publishedArticles.acknowledged) {
        revalidatePath(`/dashboard/issues/${publishedIssue.ref}`)
        revalidatePath(`/dashboard/issues`)
        revalidatePath(`/archive`)
        return { ok: true }
      } else {
        return { ok: false, error: 'something went wrong', errorType: 'other' }
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const getPublishedIssues = async () => {
  try {
    connectDB()
    const publishedIssues = await Issue.find({ published: true }).sort({
      volume: -1,
      issueNumber: -1,
    })
    return publishedIssues
  } catch (error) {
    console.log(error)
  }
}

export async function deleteIssueWithArticles(id) {
  console.log('Attempting to delete issue with ID:', id)

  // Ensure the database connection
  await connectDB()

  const session = await mongoose.startSession() // Start a session for the transaction

  try {
    session.startTransaction() // Start the transaction

    // Find and delete the issue
    const deletedIssue = await Issue.findByIdAndDelete(id, { session })

    if (!deletedIssue) {
      await session.abortTransaction() // Abort transaction if issue not found
      console.error('Issue not found.')
      return { ok: false, message: 'Issue not found.' }
    }

    // Delete all associated articles
    const deleteOutcome = await Article.deleteMany(
      { ref: deletedIssue.ref },
      { session }
    )

    if (
      deletedIssue.articles.length > 0 && // If articles are associated
      deleteOutcome.deletedCount === 0 // And no articles were deleted
    ) {
      await session.abortTransaction() // Abort transaction if article deletion fails
      console.error('Failed to delete associated articles.')
      return { ok: false, message: 'Failed to delete associated articles.' }
    }

    // Commit the transaction if all operations succeed
    await session.commitTransaction()

    // Revalidate paths for updated pages
    revalidatePath('/archive')
    revalidatePath('/dashboard/issues')

    console.log('Issue and associated articles successfully deleted.')
    return { ok: true, message: 'Issue and articles deleted successfully.' }
  } catch (error) {
    // Abort transaction in case of any error
    await session.abortTransaction()
    console.error('An error occurred during the transaction:', error)
    return { ok: false, message: 'An error occurred during deletion.' }
  } finally {
    session.endSession() // End the session
  }
}

export async function deleteIssueWithNoArticles(id) {
  console.log(id)
  try {
    connectDB()
    const deletedIssue = await Issue.findByIdAndDelete(id)
    if (!!deletedIssue) {
      revalidatePath('/archive')
      revalidatePath('/dashboard/issues')
      return { ok: true }
    } else {
      return { ok: false }
    }
  } catch (error) {
    console.log(error)
  }
}
