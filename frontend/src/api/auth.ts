import client from "./client";

export const requestMagicLink = async (email: string) => {
  const res = await client.post("/auth/request-link", { email: email });

  return res.data;
};

export const verifyMagicLink = async (token: string) => {
  const res = await client.post("/auth/verify", { token: token });

  return res.data;
};

export const getMe = async () => {
  const res = await client.get("/auth/me");

  return res.data;
};

export const logout = async () => {
  const res = await client.post("/auth/logout");

  return res.data;
};
