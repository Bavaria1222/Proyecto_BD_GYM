/* eslint-disable no-useless-escape */
/* eslint-disable no-var */
const DEVELOPMENT = "dev";
const TOKEN_STORE_KEY = "token";

function isDevelopment(): boolean {
  return import.meta.env.VITE_ENV === DEVELOPMENT;
}

function getToken(): string {
  return localStorage.getItem(TOKEN_STORE_KEY);
}

function setToken(token: string): void {
  localStorage.setItem(TOKEN_STORE_KEY, token);
}

function eraseToken(): void {
  localStorage.removeItem(TOKEN_STORE_KEY);
}

function isEmail(search: string): boolean {
  var serchfind: boolean;

  const regexp = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

  serchfind = regexp.test(search);
  return serchfind;
}

export { getToken, setToken, eraseToken, isEmail, isDevelopment };
