import NextAuth from 'next-auth/next';
import AuthOptions from '@/lib/utils/auth';

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };
