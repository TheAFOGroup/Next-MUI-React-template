export const runtime = 'edge';

import { D1Adapter } from "@auth/d1-adapter"
import { D1Database } from '@cloudflare/workers-types'
import bcrypt from 'bcryptjs';
import NextAuth from "next-auth"
import { User } from 'next-auth';
import { decode, encode } from 'next-auth/jwt';
import type { Provider } from 'next-auth/providers';
import Credentials from "next-auth/providers/credentials"
import { z } from 'zod';

import { GetUser } from "@/app/api/_lib/GetUser";


type credentials = Record<string, CredentialInput>;

type CredentialInput = {
  label?: string;
  type?: string;
  placeholder?: string;
};

const providers: Provider[] = [
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
        .object({ email: z.string().email(), password: z.string() })
        .safeParse(credentials);

      if (parsedCredentials.success) {
        const { email, password } = parsedCredentials.data;
        const user = await GetUser(email)
        if (user === null) return null;

        // check if password is valid
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (isPasswordValid) {
          return { id: user.id, email: email } as User;
        }
      }
      return null
    }
    ,
  })

];

export const providerMap = providers.map((provider) => {
  if (typeof provider === 'function') {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  }
  return { id: provider.id, name: provider.name };
});

export interface Env {
  DB: D1Database;
}
export const { handlers, signIn, signOut, auth } = NextAuth({
  // Configure one or more authentication providers
  providers: providers,
  adapter: D1Adapter(process.env.DB),
  session: {
    strategy: 'jwt',
  },
  jwt: { encode, decode },
  callbacks: {
    async jwt({ token, user }) {
      // Add user ID to the token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Add user ID to the session
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/admincp/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/admincp/dashboard', nextUrl));
      }
      return true;
    },

  },
  pages: {
    signIn: "/admincp/signIn"
  }
})

