import { authConfig } from '@/auth.config';
import NextAuth from 'next-auth';

const { auth: middleware } = NextAuth(authConfig);

export default middleware;

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};