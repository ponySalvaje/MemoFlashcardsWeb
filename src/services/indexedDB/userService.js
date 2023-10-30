import db from "./db";

const storeUserData = async (userData) => {
  await db.users.add({ userData });
};

const getUserData = async () => {
  const userData = await db.users.orderBy("id").last();
  return userData ? userData.userData : null;
};

const removeUserData = async () => {
  const userData = await db.users.orderBy("id").last();

  if (userData) {
    await db.users.delete(userData.id);
  }
};

export { storeUserData, getUserData, removeUserData };
