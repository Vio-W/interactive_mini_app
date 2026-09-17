export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
  };
}

export const API = "https://jsonplaceholder.typicode.com";

/**
 * Three real endpoints so every branch of the UI is reachable for the
 * screenshots -- no fake timers, no mocked errors.
 *   live  -> 10 users
 *   empty -> a filter that matches nobody, so the API returns []
 *   error -> a path that does not exist, so the API returns 404
 */
export type Source = "live" | "empty" | "error";

export const endpoints: Record<Source, string> = {
  live: `${API}/users`,
  empty: `${API}/users?id=9999`,
  error: `${API}/not-a-real-endpoint`,
};