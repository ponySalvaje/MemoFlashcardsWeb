import Dexie from "dexie";

const db = new Dexie("MemoStorage");

db.version(3).stores({
  tokens: "++id,token",
  users: "++id,userData",
});

export default db;
