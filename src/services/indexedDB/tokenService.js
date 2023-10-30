import db from "./db";

const storeToken = async (token) => {
  await db.tokens.add({ token });
};

const getToken = async () => {
  const token = await db.tokens.orderBy("id").last();
  return token ? token.token : null;
};

const removeToken = async () => {
  const token = await db.tokens.orderBy("id").last();
  if (token) {
    await db.tokens.delete(token.id);
  }
};

export { storeToken, getToken, removeToken };
