import { useAuthStore } from "@/stores/auth.js";
const baseUrl = `${import.meta.env.VITE_API_BASE_URL}`;

export const fetchWrapper = {
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  patch: request("PATCH"),
  delete: request("DELETE"),
};

function request(method) {
  return (url, body) => {
    const requestOptions = {
      method,
      headers: authHeader(url),
    };
    if (body) {
      requestOptions.headers["Content-Type"] = "application/json";
      requestOptions.body = JSON.stringify(body);
    }
    return fetch(`${baseUrl}/${url}`, requestOptions).then(handleResponse);
  };
}

// helper functions

export function authHeader() {
  // return auth header with jwt if user is logged in and request is to the api url
  const { user, accessToken } = useAuthStore();
  // console.log('auth store', accessToken);
  const isLoggedIn = !!user?.data;
  if ((isLoggedIn, accessToken)) {
    return { Authorization: `Bearer ${accessToken}` };
  } else {
    return {};
  }
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const { user, logout } = useAuthStore();
      if ([401, 403].includes(response.status) && user) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        logout();
      }

      const error = data || response;
      return Promise.reject(error);
    }

    return data;
  });
}
