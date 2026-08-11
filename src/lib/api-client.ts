const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

type RequestOptions = RequestInit & {
    headers?: Record<string, string>;
};

async function fetchClient<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (response.status === 204) return {} as T;

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        if (
            response.status === 401 &&
            typeof window !== "undefined" &&
            !endpoint.includes("/login")
        ) {
            localStorage.removeItem("token");
            window.location.href = "/";
        }
        throw new Error(data.message || `API Error: ${response.statusText}`);
    }

    return data as T;
}

export const api = {
    get: <T>(url: string) => fetchClient<T>(url, { method: "GET" }),
    post: <T>(url: string, body: unknown) => fetchClient<T>(url, { method: "POST", body: JSON.stringify(body) }),
    put: <T>(url: string, body: unknown) => fetchClient<T>(url, { method: "PUT", body: JSON.stringify(body) }),
    delete: <T>(url: string) => fetchClient<T>(url, { method: "DELETE" }),
    patch: <T>(url: string, body: unknown) => fetchClient<T>(url, { method: "PATCH", body: JSON.stringify(body) }),
};