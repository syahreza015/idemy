import { nanoid } from 'nanoid';
import type { NextAuthOptions } from 'next-auth';
import prisma from './db';
import * as bcrypt from 'bcrypt-ts';

const AuthOptions: NextAuthOptions = {
  providers: [
    {
      id: 'credentials',
      name: 'credentials',
      type: 'credentials',
      credentials: {
        username: { type: 'text' },
        password: { type: 'password' },
      },
      authorize: async (credentials, req) => {
        if (!credentials) {
          return null;
        }
        const result = await prisma.user.findFirst({
          where: {
            username: credentials.username,
          },
          select: {
            username: true,
            password: true,
            id: true,
            email: true,
            fullname: true,
            privilege: true,
          },
        });
        if (!result) {
          return null;
        }
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          result.password
        );
        if (!isPasswordCorrect) {
          return null;
        }
        return {
          id: nanoid(),
          userid: result.id,
          email: result.email,
          fullname: result.fullname,
          name: result.username,
          privilege: result.privilege,
        };
      },
    },
  ],
  callbacks: {
    jwt: async ({ user, token, trigger }) => {
      if (trigger === 'update') {
        const result = await prisma.user.findUnique({
          where: {
            id: token.userid,
          },
        });
        if (!result) {
          return token;
        }
        token.name = result.username;
        token = { ...token, ...result };
      }
      if (user) {
        token = { ...user, ...token };
      }
      return token;
    },
    session: async ({ token, session }) => {
      if (session) {
        session.user = { ...token, ...session.user };
      }
      return session;
    },
  },
  cookies: {
    callbackUrl: {
      name: 'idemy.callback-url',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    csrfToken: {
      name: 'idemy.csrf-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    sessionToken: {
      name: 'idemy.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
  },
};

export default AuthOptions;
