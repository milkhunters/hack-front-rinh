import { toCamelCase, toSnakeCase } from "./formating.js";

export default async function makeApiRequest(service, method, data = {}) {
  const request = toSnakeCase(data);
  const url = makeUrl(service, request.query ?? {});
  const body = makeBody(method, request.data);
  const contentType = makeContentType(method, request.data);
  const response = await fetch(url, { method, body, credentials: "include", headers: contentType });
  return await getResult(response);
}

function makeUrl(service, query) {
  const url = new URL(import.meta.env.VITE_BACKEND_URL + service);
  for (const [key, value] of Object.entries(query))
    if (value != null) url.searchParams.set(key, value?.toString());
  return url;
}

function makeBody(method, data) {
  if (!data || ["GET", "HEAD"].includes(method)) return null;
  if (data instanceof FormData) return data;
  return JSON.stringify(data);
}

function makeContentType(method, data) {
  if (!data || ["GET", "HEAD"].includes(method) || data instanceof FormData) return {};
  return { "Content-Type": "application/json" };
}

async function getResult(response) {
  try {
    const result = await response.json();
    return toCamelCase(result);
  } catch {
    return null;
  }
}
