const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

type FetchOptions = RequestInit & {
  requireAuth?: boolean;
};

export async function apiClient<T = unknown>(
  endpoint: string,
  { requireAuth = true, ...options }: FetchOptions = {}
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  // Handle Auth Token
  if (requireAuth) {
    let token: string | undefined;
    
    // Check if we are on the server
    if (typeof window === "undefined") {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      token = cookieStore.get("better-auth.session_token")?.value;
    } else {
      // On client, we can try to get it from cookies directly or session
      // Robust cookie parsing
      const match = document.cookie.match(new RegExp('(^| )better-auth.session_token=([^;]+)'));
      token = match ? match[2] : undefined;
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    } else {
        console.warn("API Client: No token found in cookies.");
    }
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include", 
  });

  if (!response.ok) {
    if (response.status === 401 && requireAuth) {
      // Optional: Redirect to login or handle session expiration
      // window.location.href = "/login";
    }
    
    let errorMessage = `API Error: ${response.statusText}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // ignore json parse error
    }
    
    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}
