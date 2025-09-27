import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  export interface User {
    id: number;
    email: string;
    is_admin: boolean;
    access: string;
    validity: number;
  }
  export interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  export interface JWT {
    data: User;
  }
}
