'use server'

import {
  handleServerSideValidationError,
  hashPassword,
  replaceSpaceInTitleWithHyphen,
  signJWT,
  validatePassword,
  verifyJWT,
} from '../helper'
import uniqid from 'uniqid'
import { revalidatePath } from 'next/cache'
import { connectDB } from '../mongoose/config'
import {
  Announcement,
  Article,
  EditorialBoard,
  Issue,
  JobQueue,
  User,
} from '../mongoose/models'
import { removePdfFromStorage } from './firebase/services'
import { redirect } from 'next/navigation'
import { signIn, signOut, auth } from '../../auth'

import {
  compileActivationTemplate,
  compileResetPasswordEmailTemplate,
  sendEmail,
} from './emailServices'
import {
  signinFormSchema,
  newUserSchema,
  activateAccountSchema,
  forgetPasswordSchema,
  passwordSchema,
  issueFormSchema,
  articleSchemaForServer,
  announcementSchema,
  editorialBoardSchema,
} from './schema'

//create new issue
export const addIssue = async (formData) => {
  const user = await auth()
  const {
    user: { firstName, lastName },
  } = user
  console.log('form data ------------', firstName)
  const parsedData = issueFormSchema.safeParse(formData)
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
    publishDate: new Date(),
    initiatedBy: `${firstName} ${lastName}`,
  }
  console.log('it got here')
  try {
    connectDB()
    const newIssue = new Issue(issueData)
    const savedIssue = await newIssue.save()
    console.log('saved issue', savedIssue)
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

//publish issue
export const publishIssue = async (issueRef, jobTicketId, user) => {
  const date = new Date()
  try {
    connectDB()
    const session = await JobQueue.startSession()
    await session.withTransaction(async () => {
      const job = await JobQueue.findOneAndUpdate(
        { jobTicketId: jobTicketId },
        {
          $set: {
            status: 'approved',
            approvedBy: `${user.firstName} ${user.lastName}`,
            dateApproved: date,
          },
        },
        { new: true }
      ).session(session)
      const publishedIssue = await Issue.findOneAndUpdate(
        { ref: issueRef },
        { $set: { published: true, publishDate: date } },
        { new: true }
      ).session(session)
      const publishedArticles = await Article.updateMany(
        { ref: issueRef },
        { $set: { published: true, publishDate: date } }
      ).session(session)
    })

    await session.endSession()
    revalidatePath(`/dashboard/issues/unpublished${issueRef}`)
    revalidatePath(`/dashboard/issues/published${issueRef}`)
    revalidatePath(`/dashboard/archive/${issueRef}`)
    revalidatePath(`/dashboard/job-queue/pending-jobs`)
    revalidatePath(`/dashboard/job-queue/approved-jobs`)
    return { ok: true }
  } catch (error) {
    // console.log(error)
  }
}

export async function updateIssue(id, initialValue, formData) {
  const parsedData = issueFormSchema.safeParse(formData)
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

export async function deleteArticle(id) {
  connectDB()
  let ref = null
  try {
    const deletedArticle = await Article.findByIdAndDelete(id)

    if (deletedArticle._id !== undefined) {
      await Issue.updateOne(
        { ref: deletedArticle.ref },
        { $pull: { articles: deletedArticle._id } }
      )
      await removePdfFromStorage(deletedArticle.pdfUrl)

      revalidatePath(`/dashboard/issues/${deletedArticle.ref}`)
      revalidatePath(`/archive/${deletedArticle.ref}`)
      ref = deletedArticle.ref

      return { ok: true }
    }
    return { ok: false }
  } catch (error) {
    return { ok: false, error: 'Something went wrong', errorType: 'other' }
  } finally {
    redirect(`/dashboard/issues/${ref}`)
  }
}

export async function updateArticle(initialValue, formData, url) {
  //validate form dtata from frontend
  const parsedData = articleSchemaForServer.safeParse(formData)
  if (!parsedData.success) {
    const validationError = handleServerSideValidationError(parsedData)
    return { ok: false, error: validationError, errorType: 'validationError' }
  }
  //update article fields to reflect changes by user
  const { data } = parsedData
  const articleData = {
    ...initialValue,
    ...data,
    slug: `${data.startPage}-${data.endPage}`,
    ref: `volume-${data.volume}-issue-${data.issue}`,
    keywords: data.keywords
      .filter((i) => i.keyword !== '')
      .map((i) => i.keyword),
    pdfUrl: url !== null ? url : initialValue.pdfUrl,
  }

  try {
    connectDB()
    //update article in database
    const updatedArticle = await Article.findByIdAndUpdate(
      { _id: initialValue._id },
      articleData,
      {
        new: true,
      }
    )

    if (updatedArticle._id === undefined) {
      return { ok: false, error: 'Something went wrong', errorType: 'other' }
    }
    //revalidate all routes to reflect updated data
    revalidatePath(`/archive/${updatedArticle.ref}`)
    revalidatePath(`/dashboard/issues/${updatedArticle.ref}`)
    return { ok: true }
  } catch (error) {
    return { ok: false, error: 'Something went wrong', errorType: 'other' }
  }
}

export async function createArticle(formData, url, params) {
  //validate form dtata from frontend
  const parsedData = articleSchemaForServer.safeParse(formData)
  if (!parsedData.success) {
    const validationError = handleServerSideValidationError(parsedData)
    return { ok: false, error: validationError, errorType: 'validationError' }
  }

  const { pdfFile, ...articleData } = parsedData.data

  //add computed fields to article object
  articleData.keywords = articleData.keywords
    .filter((i) => i.keyword !== '')
    .map((i) => i.keyword)
  articleData.pdfUrl = url
  articleData.slug = `${articleData.startPage}-${articleData.endPage}`
  articleData.ref = `volume-${articleData.volume}-issue-${articleData.issue}`
  articleData.published = params.published ? true : false
  articleData.publishDate = new Date(params.publishDate)

  try {
    connectDB()
    //add new article to database
    const newArticle = new Article(articleData)
    const savedArticle = await newArticle.save()
    console.log(savedArticle)
    //return if article wasn't created due to error
    if (savedArticle?._id === undefined) {
      return { ok: false, error: 'Something went wrong', errorType: 'other' }
    }

    //update issues with newly created article
    await Issue.updateOne(
      {
        volume: `${savedArticle.volume}`,
        issueNumber: `${savedArticle?.issue}`,
      },
      { $push: { articles: savedArticle?._id } }
    )

    //revalidate routes affected by artice creation to reflect changes
    revalidatePath(`/archive/${savedArticle.ref}`)
    revalidatePath(`/dashboard/issues/${savedArticle.ref}`)
    // send success response back to client
    return { ok: true }
  } catch (error) {
    console.log(error)
    return { ok: false, error: 'Something went wrong', errorType: 'other' }
  }
}

export const getAllPublishedArticles = async () => {
  const publishedArticles = await Article.find({ published: true })
  return publishedArticles
}

export async function signup(formData) {
  const parsedData = newUserSchema.safeParse(formData)
  if (!parsedData.success) {
    const validationError = Object.fromEntries(
      parsedData.error?.issues?.map((issue) => [
        issue.path[0],
        issue.message,
      ]) || []
    )
    return { error: validationError, errorType: 'validationError' }
  }

  try {
    connectDB()
    const modifiedFormData = {
      ...parsedData.data,
      isAdmin: false,
      password: uniqid.time(),
    }
    const user = await User.findOne({ email: modifiedFormData.email })
    if (user) {
      return { ok: false, error: 'User already exist', errorType: 'other' }
    }
    const hashedPassword = await hashPassword(modifiedFormData.password)

    const userObjectWithHashedPassword = {
      ...modifiedFormData,
      password: hashedPassword,
    }
    const newUser = new User(userObjectWithHashedPassword)
    const savedUser = await newUser.save()
    const parsedSavedUser = JSON.parse(JSON.stringify(savedUser))
    const { password, ...savedUserWithoutPassword } = parsedSavedUser

    const encryptedUserId = signJWT({ id: savedUser._id })
    const activationUrl = `${process.env.AUTH}/account-activation/${encryptedUserId}`
    const body = compileActivationTemplate({
      name: modifiedFormData.firstName,
      email: modifiedFormData.email,
      password: modifiedFormData.password,
      url: activationUrl,
      link: `${process.env.AUTH}/login`,
    })

    const sendEmailResult = await sendEmail({
      to: modifiedFormData.email,
      subject: 'BIJED - Activate Your Account',
      body,
    })

    if (sendEmailResult.successful) {
      return { ok: true }
    } else {
      return {
        ok: false,
        error: 'Something went wrong. Please ensure email is valid',
        errorType: 'other',
      }
    }
  } catch (error) {
    return { ok: false, error: 'Something went wrong', errorType: 'other' }
  }
}

export async function activateUser(id, formData) {
  const parsedData = activateAccountSchema.safeParse(formData)
  if (!parsedData.success) {
    const validationError = handleServerSideValidationError(parsedData)
    return { ok: false, error: validationError, errorType: 'validationError' }
  }

  const verifiedToken = verifyJWT(id)
  try {
    connectDB()
    const user = await User.findById(verifiedToken.id)

    if (!user) {
      return { ok: false, error: 'Account does not exist', errorType: 'other' }
    }

    if (user.isActivated) {
      return {
        ok: false,
        error: 'Account already activated',
        errorType: 'other',
      }
    }

    const isPasswordValid = await validatePassword(
      formData.defaultPassword,
      user.password
    )

    if (!isPasswordValid) {
      return { ok: false, error: 'Invalid password', errorType: 'other' }
    }

    const hashedPassword = await hashPassword(formData.newPassword)
    const updatedUser = await User.findByIdAndUpdate(
      verifiedToken.id,
      {
        $set: { password: hashedPassword, isActivated: true },
      },
      { new: true }
    )
    if (updatedUser) return { ok: true }
  } catch (error) {
    return { ok: true, error: 'Something went wrong!', errorType: 'other' }
  }
}

export async function authenticate(formData) {
  const parsedData = signinFormSchema.safeParse(formData)
  // If validation errors, map them into an object
  if (!parsedData.success) {
    const validationError = Object.fromEntries(
      parsedData.error?.issues?.map((issue) => [
        issue.path[0],
        issue.message,
      ]) || []
    )
    return { ok: false, errors: validationError, errorType: 'validationError' }
  }

  try {
    if (parsedData.success) {
      await signIn('credentials', {
        redirectTo: '/dashboard',
        ...parsedData.data,
      })
    }
  } catch (error) {
    if (error && error?.type?.includes('CredentialsSignin')) {
      return { ok: false, error: 'Invalid credentials', errorType: 'authError' }
    }

    throw error
  }
  // redirect('/dashboard')
}

export async function forgetPassword(formData) {
  const parsedData = forgetPasswordSchema.safeParse(formData)
  if (!parsedData.success) {
    const validationError = handleServerSideValidationError(parsedData)
    return { ok: false, error: validationError, errorType: 'validationError' }
  }

  try {
    connectDB()
    const user = await User.findOne({ email: formData.email })
    if (!user) {
      return { ok: false, error: 'user does not exist', errorType: 'other' }
    }

    const encryptedUserId = signJWT({ id: user._id }, { expiresIn: '900000ms' })
    const resetPasswordUrl = `/auth/password-reset/${encryptedUserId}`
    const body = compileResetPasswordEmailTemplate({
      name: user.firstName,
      url: resetPasswordUrl,
      link: `/auth/login`,
    })

    const sendEmailResult = await sendEmail({
      to: user.email,
      subject: 'BIJED - Reset your Password',
      body,
    })
    if (sendEmailResult.successful) {
      return { ok: true }
    } else {
      return {
        ok: false,
        error: 'Something went wrong. Please ensure email is valid',
        errorType: 'other',
      }
    }
  } catch (error) {
    return { ok: false, error: 'Something went wrong', errorType: 'other' }
  }
}

export async function resetPassword(authToken, formData) {
  const parsedData = passwordSchema.safeParse(formData)
  if (!parsedData.success) {
    const validationError = handleServerSideValidationError(parsedData)
    return { ok: false, error: validationError, errorType: 'validationError' }
  }

  try {
    const newpassword = formData.password
    const { id, expired } = verifyJWT(authToken)
    if (!id) {
      return { ok: false, error: 'user does not exist', errorType: 'other' }
    }

    connectDB()
    const user = await User.findById(id)

    if (!user) {
      return { ok: false, error: 'user does not exist', errorType: 'other' }
    }

    const hashedPassword = await hashPassword(newpassword)
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { password: hashedPassword } },
      { new: true }
    )
    if (updatedUser) {
      const { password, ...updatedUserWithoutPassword } = updatedUser

      return {
        ok: true,
        data: JSON.parse(JSON.stringify(updatedUserWithoutPassword)),
      }
    }
  } catch (error) {
    return {
      ok: false,
      error: 'Something went wrong. please try again',
      errorType: 'other',
    }
  }
}

export async function logOut() {
  await signOut({ redirectTo: '/auth/login' })
}

export async function removeUser(id) {
  try {
    connectDB()
    const deletedUser = await User.findByIdAndDelete(id)
    if (deletedUser) {
      revalidatePath('/dashboard/manage-users')
      return { ok: true }
    } else {
      return { ok: false, error: 'something went wrong' }
    }
  } catch (error) {
    return { ok: false, error: 'something went wrong' }
  }
}

export const createAnnouncement = async (formData) => {
  const currentSession = await auth()
  const parsedData = announcementSchema.safeParse(formData)
  if (!parsedData.success) {
    const validationError = handleServerSideValidationError(parsedData)
    return { ok: false, error: validationError, errorType: 'validationError' }
  }

  const { data } = parsedData
  data.slug = replaceSpaceInTitleWithHyphen(data.title)
  data.status = 'draft'
  data.ref = uniqid.time('ANN-')
  data.initiatedBy = `${currentSession?.user?.firstName} ${currentSession?.user?.lastName}`
  try {
    connectDB()
    const newAnnouncement = new Announcement(data)
    const savedAnnouncement = await newAnnouncement.save()

    if (savedAnnouncement?._id !== undefined) {
      revalidatePath('/dashbard/announcements')
      // await addAnnouncementToJobQueue(savedAnnouncement)
      return { ok: true, announcementSlug: savedAnnouncement.slug }
    } else {
      return { ok: false, error: 'something went wrong', errorType: 'other' }
    }
  } catch (error) {
    return { ok: false, error: 'something went wrong', errorType: 'other' }
  }
}

export const updateAnnouncement = async (initialState, formData) => {
  const parsedData = announcementSchema.safeParse(formData)
  if (!parsedData.success) {
    const validationError = handleServerSideValidationError(parsedData)
    return { ok: false, error: validationError, errorType: 'validationError' }
  }
  const data = { ...initialState, ...parsedData.data }
  data.slug = data.title.replace(/ /g, '-')
  try {
    connectDB()
    const announcementEixst = await Announcement.findById(initialState._id)
    if (!announcementEixst._id)
      return { ok: false, error: 'Announcement not found!', errorType: 'other' }

    // const newAnnouncement = new Announcement(data)
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      initialState._id,
      data,
      { new: true }
    )

    if (updatedAnnouncement?._id !== undefined) {
      revalidatePath('/dashboard/announcements')
      return { ok: true, slug: updatedAnnouncement?.slug }
    } else {
      return { ok: false, error: 'something went wrong', errorType: 'other' }
    }
  } catch (error) {
    return { ok: false, error: 'something went wrong', errorType: 'other' }
  }
}

export const deleteAnnouncement = async (id) => {
  let successful = null
  try {
    connectDB()
    const deletedAnnouncement = await Announcement.findByIdAndDelete(id)
    if (deletedAnnouncement) {
      revalidatePath('/dashboard/announcements')
      successful = true
      return { ok: true }
    } else {
      successful = false
      return { ok: false, error: 'something went wrong' }
    }
  } catch (error) {
    successful = false
    return { ok: false, error: 'something went wrong' }
  } finally {
    if (successful) redirect('/dashboard/announcements')
  }
}

//publish announcement
export const publishAnnouncement = async (ref, user) => {
  const date = new Date()
  try {
    connectDB()
    const publishedAnnouncement = await Announcement.findOneAndUpdate(
      { ref: ref, status: 'review' },
      {
        $set: {
          status: 'published',
          approvedBy: `${user.firstName} ${user.lastName}`,
          dateApproved: date,
        },
      },
      { new: true }
    )
    if (publishedAnnouncement._id) {
      revalidatePath(`/dashboard/announcements/${publishedAnnouncement.slug}`)
      // revalidatePath(`/dashboard/issues/published${issueRef}`)

      return { ok: true, slug: publishedAnnouncement?.slug }
    } else {
      return { ok: false, error: 'something went wrong', errorType: 'other' }
    }
  } catch (error) {
    // console.log(error)
  }
}

export const updateEditorialBoard = async (initialState, formData) => {
  const parsedData = editorialBoardSchema.safeParse(formData)
  if (!parsedData.success) {
    const validationError = handleServerSideValidationError(parsedData)
    return { ok: false, error: validationError, errorType: 'validationError' }
  }

  const data = { ...initialState, ...parsedData.data }
  try {
    connectDB()
    const existingEditorialBoard = await EditorialBoard.findById(
      initialState._id
    )
    if (!existingEditorialBoard._id)
      return {
        ok: false,
        error: 'Editorial Board not found!',
        errorType: 'other',
      }

    // const newAnnouncement = new Announcement(data)
    const updatedEditorialBoard = await EditorialBoard.findByIdAndUpdate(
      initialState._id,
      data,
      { new: true }
    )

    if (updatedEditorialBoard._id) {
      revalidatePath('/dashbard/editorial-board')
      revalidatePath('/editorial-board')
      return { ok: true }
    } else {
      return { ok: false, error: 'something went wrong', errorType: 'other' }
    }
  } catch (error) {
    return { ok: false, error: 'something went wrong', errorType: 'other' }
  }
}

export const sendContactFormMessage = async (formData) => {
  const { name, email, subject, body } = formData
  console.log(formData)
  try {
    const sendEmailResult = await sendEmail({
      to: process.env.SMTP_EMAIL,
      from: `${email}<${name}>`,
      subject,
      body,
      replyTo: email,
    })
    if (sendEmailResult.successful) {
      return { ok: true }
    } else {
      return { ok: false }
    }
  } catch (error) {
    console.log(error)
  }
}
