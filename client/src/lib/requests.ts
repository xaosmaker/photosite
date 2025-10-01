import { auth } from "@/lib/auth";

export async function postRequest(
  url: string,
  header: "application/json",
  body: Record<string, string | boolean | number>,
) {
  const session = await auth();
  if (!session) {
    throw new Error("Invalid Credential from Session");
  }
  return fetch(url, {
    method: "post",
    headers: {
      "Content-Type": header,
      cookie: session.user.access,
    },
    body: JSON.stringify(body),
  });
}
