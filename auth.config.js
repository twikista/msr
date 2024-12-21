export const authConfig = {
  providers: [],
  session: { strategy: 'jwt', maxAge: 4 * 60 * 60 },
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.firstName = user.firstName
        token.lastName = user.lastName
        token.isAdmin = user.isAdmin
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.firstName = token.firstName
        session.user.lastName = token.lastName
        session.user.isAdmin = token.isAdmin
        session.user.role = token.role
      }
      return session
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const loggedInUser = auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      const isOnAdminPage = nextUrl.pathname.startsWith(
        '/dashboard/manage-users'
      )
      // const isOnLoginpage = nextUrl.pathname === '/auth/login'
      const isOnCreateUserPage = nextUrl.pathname === '/auth/signup'

      if (isOnCreateUserPage) {
        if (isLoggedIn && loggedInUser.isAdmin) return true
        if (isLoggedIn && !loggedInUser.isAdmin)
          return Response.redirect(new URL('/dashboard', nextUrl))
        return false
      }

      if (isOnAdminPage) {
        if (isLoggedIn && loggedInUser.isAdmin) return true
        if (isLoggedIn && !loggedInUser.isAdmin)
          return Response.redirect(new URL('/dashboard', nextUrl))
        return false
      }

      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl))
      }

      return true
    },
  },
}
