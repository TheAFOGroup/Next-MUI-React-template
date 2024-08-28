export const runtime = 'edge';

import { D1Adapter } from "@auth/d1-adapter"
import { D1Database } from '@cloudflare/workers-types'
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { encode, decode } from 'next-auth/jwt';
import { User } from 'next-auth';
import { z } from 'zod';
import { GetUser } from "@/app/api/_lib/GetUser";
import type { Provider } from 'next-auth/providers';


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
          const user = await GetUser(email)
          if (user === null) return null;
          if (user?.password != password) {
            return null
          }

          return { email: email } as User;
        }
        return null
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
  pages: {
    signIn: "/c0ntr0lPanne1/signIn"
  }
})

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { label: 'Email Address', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    authorize(c) {
      if (c.password !== 'password') {
        return null;
      }
      return {
        id: 'test',
        name: 'Test User',
        email: String(c.email),
      };
    },
  }),
];

export const providerMap = providers.map((provider) => {
  if (typeof provider === 'function') {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  }
  return { id: provider.id, name: provider.name };
});