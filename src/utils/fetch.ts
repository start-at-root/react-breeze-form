/**
 * Fetch with credentials included.
 */
export default async <T>(
  route: string,
  options: RequestInit = {},
): Promise<T> => {
  const defaultOptions: RequestInit = {
    cache: 'no-cache',
    credentials: 'include',
  };

  options = {...defaultOptions, ...options};

  const response = await fetch(route, options);

  return await response.json();
};
