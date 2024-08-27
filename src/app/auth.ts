export const runtime = 'edge';

import { D1Adapter } from "@auth/d1-adapter"
import { D1Database } from '@cloudflare/workers-types'
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { encode, decode } from 'next-auth/jwt';
import { User } from 'next-auth';
import { z } from 'zod';
import { GetUser } from "@/app/api/_lib/GetUser";



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
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await GetUser(email, password);
          if (!user) return null;
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
  jwt: { encode, decode },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/c0ntr0lPanne1/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/c0ntr0lPanne1/dashboard', nextUrl));
      }
      return true;
    },
  },
})