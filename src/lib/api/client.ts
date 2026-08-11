const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

/**
 * Thin fetch wrapper. No endpoints exist yet — the backend is not built.
 * When it is, only this file and the form's submit handler change.
 */
export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }

  return (await res.json()) as T;
}
