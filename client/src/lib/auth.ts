import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { serverURL } from "./serverURL";
//TODO: need a  lot of refactor but i do it later
//

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: Number(process.env.JWT_EXPIRES) || 5 * 3600,
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "password", type: "password" },
      },
      authorize: async (c) => {
        const res = await fetch(`${serverURL}/api/users/login`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: c.email, password: c.password }),
        });

        if (res.status !== 200) {
          return null;
        }

        const data: User = await res.json();
        const cook = res.headers
          .getSetCookie()
          .find((cookie) => cookie.startsWith("access"))
          ?.split(";");

        const jwtCook = cook?.find((item) => item.trim().startsWith("access"));
        const expires = cook
          ?.find((item) => item.trim().startsWith("Expires"))
          ?.split("=")[1];

        const timestamp = new Date(expires!).getTime();

        data.access = jwtCook || "";
        data.validity = timestamp;
        return data;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.data = user;
      }
      if (token.data.validity < Date.now()) {
        return null;
      }

      return token;
    },
    async session({ session, token }) {
      if (token?.data) {
        session.user = token.data;
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
});
