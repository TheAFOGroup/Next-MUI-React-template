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

        const { email, password } = credentials;
        return { email: email } as User;
      }
      ,
    })

  ],
  adapter: D1Adapter(process.env.DB),
  session: {
    strategy: 'jwt',
  },
  jwt: { encode, decode }
})