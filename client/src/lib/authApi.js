const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}/api${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include",
    ...options,
  });

  const data = await response.json().catch(() => ({}));

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
<<<<<<< HEAD

export function fetchUserProfile() {
  return request("/users/profile");
}

export function updateUserProfile(payload) {
  return request("/users/profile", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}
=======
>>>>>>> ee5df9a4864993e52cb5fba829cddd1c386b14a6
