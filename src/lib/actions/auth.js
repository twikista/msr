'use server'
// import {
//   hashPassword,
//   signJWT,
//   validatePassword,
//   verifyJWT,
// } from './util'
import { hashPassword } from '../helper'
import uniqid from 'uniqid'
import { revalidatePath } from 'next/cache'
import { connectDB } from '../mongoose/config'
import { User } from '../mongoose/models'
import { redirect } from 'next/navigation'
import { signIn, signOut, auth } from '../../../auth'
import { signinFormSchema } from '../schema'

export async function signup(formData) {
  try {
    connectDB()
    console.log('i got here')
    const user = await User.findOne({ email: formData.email })
    if (user) {
      return { ok: false, error: 'User already exist', errorType: 'other' }
    }
    const hashedPassword = await hashPassword(formData.password)

    const userObjectWithHashedPassword = {
      ...formData,
      password: hashedPassword,
    }
    const newUser = new User(userObjectWithHashedPassword)
    const savedUser = await newUser.save()
    const parsedSavedUser = JSON.parse(JSON.stringify(savedUser))
    const response = { ok: true, data: parsedSavedUser }
    return response
  } catch (error) {
    return { ok: false, error: 'Something went wrong' }
  }
}

export async function login(formData) {
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
    if (formData) {
      await signIn('credentials', {
        redirectTo: '/dashboard',
        ...formData,
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

export async function logOut() {
  await signOut({ redirectTo: '/auth/login' })
}

export async function getCurrentUser() {
  const session = await auth()
  return session
}
