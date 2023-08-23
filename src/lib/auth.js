import GoogleProvider from 'next-auth/providers/google'
import clientPromise from '@/lib/database'
import { MongoDBAdapter } from '@auth/mongodb-adapter'

function getGoogleCredentials() {
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET

    if (!clientId || clientId.length === 0) {
        throw new Error('Missing GOOGLE_CLIENT_ID')
    }
    if (!clientSecret || clientSecret.length === 0) {
        throw new Error('Missing GOOGLE_CLIENT_SECRET')
    }
    return { clientId, clientSecret }
}

export const authOptions = {
    adapter: MongoDBAdapter(clientPromise),
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: getGoogleCredentials().clientId,
            clientSecret: getGoogleCredentials().clientSecret,
        }),
    ],

    callbacks: {
        async jwt({ token, account, profile,user }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (account) {
                  token.accessToken = account.access_token
               
            }
            return token
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token and user id from a provider.
            session.accessToken = token.accessToken
            session.user.id = token.sub;
            return session
        },
        redirect() {
            return '/dashboard'
        },
    },


}