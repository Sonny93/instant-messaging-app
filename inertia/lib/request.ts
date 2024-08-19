// We need to create our own wrapper because useForm functions such as post
// do not work as expected, they are meant to be used only for inertia routes
// and therefore don't work when returning json for example
export const makeRequest = async ({
  url,
  headers,
  body,
  method = 'GET',
}: Omit<RequestInit, 'body'> & { url: string; body?: any }) => {
  return await fetch(url, {
    method,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};
