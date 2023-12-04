export const apiFetch = async (
  url: string,
  body: string,
  token: string,
  method?: "POST" | "GET"
): Promise<Response> => {
  return fetch(url, {
    method: method ?? "POST",
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
