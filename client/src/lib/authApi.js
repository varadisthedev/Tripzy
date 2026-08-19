// Strip trailing slash(es) so `${API_BASE_URL}/api${path}` never doubles up
// on "//" if VITE_API_URL is set with a trailing slash on the hosting platform.
const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, "");

const AUTH_PATHS_EXEMPT_FROM_REFRESH = ["/auth/login", "/auth/signup", "/auth/refresh", "/auth/logout"];

async function rawFetch(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}/api${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include",
    ...options,
  });

  const data = await response.json().catch(() => ({}));
  return { response, data };
}

async function request(path, options = {}, { isRetry = false } = {}) {
  const { response, data } = await rawFetch(path, options);

  // On a 401, transparently try to refresh the session and retry the request
  // once. Whether the retry succeeds or the refresh itself fails, we throw a
  // normal error either way — deciding what a final 401 means (redirect to
  // login vs. degrade quietly) is left to the caller, since some callers are
  // on public pages making a best-effort authenticated call, not gated pages.
  if (response.status === 401 && !isRetry && !AUTH_PATHS_EXEMPT_FROM_REFRESH.includes(path)) {
    const { response: refreshResponse } = await rawFetch("/auth/refresh", { method: "POST" });

    if (refreshResponse.ok) {
      return request(path, options, { isRetry: true });
    }
  }

  if (!response.ok) {
    throw new Error(data.message || "Request failed.");
  }

  return data;
}

export function loginUser(payload) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function signupUser(payload) {
  return request("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function fetchCurrentUser() {
  return request("/auth/me");
}

export function logoutUser() {
  return request("/auth/logout", {
    method: "POST",
  });
}

export function fetchUserProfile() {
  return request("/users/profile");
}

export function updateUserProfile(payload) {
  return request("/users/profile", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function fetchBookings() {
  return request("/bookings");
}

export function deleteBooking(id) {
  return request(`/bookings/${id}`, {
    method: "DELETE",
  });
}

export function fetchSearchHistory() {
  return request("/search-history");
}

export function createSearchHistory(payload) {
  return request("/search-history", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
