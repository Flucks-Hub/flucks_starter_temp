import NextAuth from "next-auth";
import { authoptions } from "./option";

const nextAuth = NextAuth(authoptions);

export {nextAuth as GET, nextAuth as POST}