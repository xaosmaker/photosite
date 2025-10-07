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

export async function postRequestFile(url: string, body: FormData) {
  const session = await auth();
  if (!session) {
    throw new Error("Invalid Credential from Session");
  }
  return fetch(url, {
    method: "post",
    headers: {
      cookie: session.user.access,
    },
    body: body,
  });
}

export async function putRequest(
  url: string,
  header: "application/json",
  body: Record<string, FormDataEntryValue | string | boolean | number | null>,
) {
  const session = await auth();
  if (!session) {
    throw new Error("Invalid Credential from Session");
  }
  return fetch(url, {
    method: "put",
    headers: {
      "Content-Type": header,
      cookie: session.user.access,
    },
    body: JSON.stringify(body),
  });
}

export async function deleteRequest(url: string) {
  const session = await auth();
  if (!session) {
    throw new Error("Invalid Credential from Session");
  }
  return fetch(url, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",

      cookie: session.user.access,
    },
  });
}
