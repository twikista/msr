import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getUser } from './src/lib/data'
import { validatePassword } from './src/lib/helper'
import { authConfig } from './auth.config'

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await getUser(credentials.email)

          const parsedUser = JSON.parse(JSON.stringify(user))
          if (!user) {
            throw new Error('invalid credentials')
          }

          if (!user.isActivated) {
            throw new Error('Account is not activated')
          }

          const isPasswordValid = await validatePassword(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) throw new Error('Incorrect email or password')

          const { password, ...userWithoutPassword } = parsedUser
          return userWithoutPassword
        } catch (error) {
          return null
        }
      },
    }),
  ],
})
