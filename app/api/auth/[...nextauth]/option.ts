import prisma from "@/lib/db";
import { AuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google"

export interface CustomSession{
    user?: CustomUser,
}

export interface CustomUser{
    id?: string | null,
    name?: string | null,
    email?: string | null,
    image?: string | null,
    provider?: string | null
}

export const authoptions:AuthOptions = {
    pages: {
        signIn: "/"
    },

    callbacks:{
        async signIn({user, account}) {
            try {
                const existUser = await prisma.user.findUnique({
                    where: {
                         email: user.email!
                    }
                })

                if(existUser){
                   user.id = existUser?.id.toString()
                   return true
                }

                const newuser = await prisma.user.create({
                    data:{
                        email: user.email,
                        name: user.name,
                        oauth_id: account?.providerAccountId,
                        provider: account?.provider,
                        image: user.image
                    }
                })
                user.id = newuser?.id.toString();
                return true
            } catch (error) {
                console.log("error",error)
                return false
            }
        }
    },
    async jwt({token,user}: {token: JWT, user: User}){
        console.log("before token changed", token)
        if(user){
            token.user = user
        }
        return token
    },

    async session({session,token,user}:{session:CustomSession, token: JWT, user:User}){
        session.user = token.user as CustomUser
        return session
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
              params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code",
              },
            },
          }),
    ]


}

