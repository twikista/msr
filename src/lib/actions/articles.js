'use server'

import { revalidatePath } from 'next/cache'
import { handleServerSideValidationError } from '../helper'
import { Article, Issue } from '../mongoose/models'
import { articleSchemaForServer } from '../schema'
import { connectDB } from '../mongoose/config'
import mongoose from 'mongoose'

export async function createArticle(formData, url, params) {
  // Validate form data from frontend
  const parsedData = articleSchemaForServer.safeParse(formData)
  if (!parsedData.success) {
    const validationError = handleServerSideValidationError(parsedData)
    return { ok: false, error: validationError, errorType: 'validationError' }
  }

  const { pdfFile, ...articleData } = parsedData.data

  // Add computed fields to article object
  articleData.pdfUrl = url
  articleData.slug = `${articleData.startPage}-${articleData.endPage}`
  articleData.ref = `volume-${articleData.volume}-issue-${articleData.issue}`
  articleData.published = params.published ? true : false
  articleData.publishDate = new Date(params.publishDate)

  // Ensure database connection
  await connectDB()

  // Start a session for the transaction
  const session = await mongoose.startSession()

  try {
    session.startTransaction() // Start the transaction

    // Create new article within transaction
    const newArticle = new Article(articleData)
    const savedArticle = await newArticle.save({ session })

    if (!savedArticle?._id) {
      // Explicitly abort the transaction if article creation fails
      await session.abortTransaction()
      return {
        ok: false,
        error: 'Failed to create article',
        errorType: 'other',
      }
    }

    // Update issue with new article ID within the same transaction
    const issueUpdateResult = await Issue.updateOne(
      {
        volume: `${savedArticle.volume}`,
        issueNumber: `${savedArticle.issue}`,
      },
      { $push: { articles: savedArticle._id } },
      { session }
    )

    if (
      !issueUpdateResult.acknowledged ||
      issueUpdateResult.modifiedCount !== 1
    ) {
      // Explicitly abort the transaction if issue update fails
      await session.abortTransaction()
      return { ok: false, error: 'Failed to update issue', errorType: 'other' }
    }

    // Commit the transaction if all operations succeed
    await session.commitTransaction()

    // Revalidate routes affected by article creation to reflect changes
    revalidatePath(`/archive/${savedArticle.ref}`)
    revalidatePath(`/dashboard/issues/${savedArticle.ref}`)

    // Send success response back to the client
    return { ok: true, articleId: savedArticle._id }
  } catch (error) {
    console.error('Transaction error:', error)
    return { ok: false, error: 'Something went wrong', errorType: 'other' }
  } finally {
    session.endSession() // End the session
  }
}

export async function deleteArticle(id) {
  connectDB()
  //   let ref = null
  //   try {
  //     const deletedArticle = await Article.findByIdAndDelete(id)

  //     if (deletedArticle._id !== undefined) {
  //       await Issue.updateOne(
  //         { ref: deletedArticle.ref },
  //         { $pull: { articles: deletedArticle._id } }
  //       )
  //       await removePdfFromStorage(deletedArticle.pdfUrl)

  //       revalidatePath(`/dashboard/issues/${deletedArticle.ref}`)
  //       revalidatePath(`/archive/${deletedArticle.ref}`)
  //       ref = deletedArticle.ref

  //       return { ok: true }
  //     }
  //     return { ok: false }
  //   } catch (error) {
  //     return { ok: false, error: 'Something went wrong', errorType: 'other' }
  //   } finally {
  //     redirect(`/dashboard/issues/${ref}`)
  //   }
}

export async function updateArticle() {
  console.log('update article')
}

// export async function updateArticle(initialValue, formData, url) {
//   //validate form dtata from frontend
//   const parsedData = articleSchemaForServer.safeParse(formData)
//   if (!parsedData.success) {
//     const validationError = handleServerSideValidationError(parsedData)
//     return { ok: false, error: validationError, errorType: 'validationError' }
//   }
//   //update article fields to reflect changes by user
//   const { data } = parsedData
//   const articleData = {
//     ...initialValue,
//     ...data,
//     slug: `${data.startPage}-${data.endPage}`,
//     ref: `volume-${data.volume}-issue-${data.issue}`,
//     keywords: data.keywords
//       .filter((i) => i.keyword !== '')
//       .map((i) => i.keyword),
//     pdfUrl: url !== null ? url : initialValue.pdfUrl,
//   }

//   try {
//     connectDB()
//     //update article in database
//     const updatedArticle = await Article.findByIdAndUpdate(
//       { _id: initialValue._id },
//       articleData,
//       {
//         new: true,
//       }
//     )

//     if (updatedArticle._id === undefined) {
//       return { ok: false, error: 'Something went wrong', errorType: 'other' }
//     }
//     //revalidate all routes to reflect updated data
//     revalidatePath(`/archive/${updatedArticle.ref}`)
//     revalidatePath(`/dashboard/issues/${updatedArticle.ref}`)
//     return { ok: true }
//   } catch (error) {
//     return { ok: false, error: 'Something went wrong', errorType: 'other' }
//   }
// }
