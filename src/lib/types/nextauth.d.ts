import type { User, DefaultUser, Session, DefaultSession } from 'next-auth';
import type { JWT, DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User extends DefaultUser {
    fullname?: string;
    userid?: string;
    privilege?: UserPrivilege
  }
  interface Session extends DefaultSession {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    fullname?: string;
    userid?: string;
    privilege?: UserPrivilege
  }
}
