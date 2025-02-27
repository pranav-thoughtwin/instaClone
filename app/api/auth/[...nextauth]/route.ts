import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
// import { JWT } from "next-auth/jwt";

// Extend the default user object type to include the id property
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        FacebookProvider({
            clientId: '652683303874507',
            clientSecret: '5a2803d07b5f298f51b69a9ae674695e',
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };