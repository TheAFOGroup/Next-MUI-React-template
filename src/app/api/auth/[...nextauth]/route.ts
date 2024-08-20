export const runtime = 'edge';

import { D1Adapter } from "@auth/d1-adapter"
import { D1Database } from '@cloudflare/workers-types'
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { encode, decode } from 'next-auth/jwt';
import { User } from 'next-auth';


type credentials = Record<string, CredentialInput>;
type CredentialInput = {
  label?: string;
  type?: string;
  placeholder?: string;
};
export interface Env {
  DB: D1Database;
}

import { getRequestContext } from '@cloudflare/next-on-pages'
const { env } = getRequestContext()

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Configure one or more authentication providers
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "john@example.com" },
        password: { label: "Password", type: "password" },
      } as credentials,
      authorize: async (credentials): Promise<User | null> => {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials;      /*
        let user = null

        // logic to salt and hash password
        const pwHash = credentials?.password

        // logic to verify if the user exists
        user = await getUserFromDb(credentials?.email, pwHash)

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.")
        }
*/
        // return user object with their profile data
        return { email: email } as User;
      }
      ,
    })

  ],
  adapter: D1Adapter(env.DB),
  session: {
    strategy: 'jwt',
  },
  jwt: { encode, decode },
  /*pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  }
    */
})

export const GET = handlers.GET;
export const POST = handlers.POST;