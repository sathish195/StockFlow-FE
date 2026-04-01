const BASE_URL = "http://localhost:8080/api";

export const apiRequest = async ({
  endpoint,
  method = "GET",
  body = null,
  token = null,
  headers = {},
}) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "API Error");
    }

    return data;
  } catch (error) {
    console.error("API ERROR:", error.message);
    throw error;
  }
};