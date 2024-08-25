import { Session } from 'inspector';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// More info please refer to https://dev.to/peterlidee/full-guide-for-authentication-with-next-14-nextauth-4-strapi-v4-using-google-and-credentials-provider-7jh

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_OOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account && account.provider === 'google' && profile && 'email_verified' in profile) {
        if (!profile.email_verified) return false;
      }
      return true;
    },
    async jwt({ token, trigger, account, user, session }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ token, session }) {
      return { ...session, accessToken: token.accessToken };
    },
  },
  session: {
    strategy: 'jwt',
  },
};

export interface AuthSession extends Session {
  accessToken: string;
}
