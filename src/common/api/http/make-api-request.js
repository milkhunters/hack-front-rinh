import { toCamelCase, toSnakeCase } from "./format";

const REFRESH_TOKENS_URL = `/ums/auth/refresh_tokens`;

export default async function makeApiRequest(
  service,
  method,
  { data = {}, sendCookies = true, retry = true } = {},
) {
  const hasBody = !["GET", "HEAD"].includes(method);
  const body = hasBody ? toApiRequest(data) : undefined;
  const headers = { "Content-Type": "application/json" };
  const credentials = sendCookies ? "include" : undefined;
  const url = import.meta.env.VITE_API_URL + service;
  const response = await fetch(url, { method, headers, body, credentials });
  if (response.status === 403 && retry) {
    await makeApiRequest(REFRESH_TOKENS_URL, "POST", { sendCookies: true, retry: false });
    return await makeApiRequest(url, method, { data, sendCookies, retry: false });
  }
  return await toApiResponse(response);
}

function toApiRequest(data) {
  const request = toSnakeCase(data);
  return JSON.stringify(request);
}

async function toApiResponse(data) {
  const response = await tryParse(data);
  if (!response) {
    return { succeed: data.ok };
  }
  if (response.error == null && response.content == null) {
    return { succeed: data.ok, content: response };
  }
  const succeed = response.error === null;
  const content = succeed ? toCamelCase(response.content) : errorToResult(response.error);
  return { succeed, content };
}

async function tryParse(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function errorToResult(error) {
  if (error.type === 1) return error.content;
  if (error.type === 2) {
    const result = error.content.map(({ field, message }) => [field, message]);
    return toCamelCase(Object.fromEntries(result));
  }
  throw new Error(`Unknown api error type ${error.type}.`);
}
