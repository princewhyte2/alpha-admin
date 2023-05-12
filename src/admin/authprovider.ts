import { httpClient } from "./dataprovider";

const apiUrl = "https://backend-staging.workfynder.com/api";

// TypeScript users must reference the type: `AuthProvider`
export const authProvider = {
  // called when the user attempts to log in
  login: async ({ username, password }: any) => {
    // console.log({ username, password })
    const data = { email: username, password, login_mode: "email" };
    return httpClient(`${apiUrl}/auth/login`, {
      method: "POST",
      body: JSON.stringify(data),
    }).then(({ json }) => {
      localStorage.setItem("authToken", json.result.token);
      Promise.resolve();
    });
    // localStorage.setItem("username", username);
    // accept all username/password combinations
  },
  // called when the user clicks on the logout button
  logout: () => {
    localStorage.removeItem("authToken");
    return Promise.resolve();
  },
  // called when the API returns an error
  checkError: ({ status }: any) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("authtoken");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return localStorage.getItem("authToken")
      ? Promise.resolve()
      : Promise.reject();
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve(),
};
