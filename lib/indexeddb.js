import { openDB } from "idb";

const DB_NAME = "akoka_solve_local";
const DB_VERSION = 1;

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("offline_task_queue")) {
        db.createObjectStore("offline_task_queue", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
      if (!db.objectStoreNames.contains("cached_modules")) {
        db.createObjectStore("cached_modules", { keyPath: "key" });
      }
    },
  });
};

export const saveOfflineTask = async (taskData) => {
  const db = await initDB();
  const tx = db.transaction("offline_task_queue", "readwrite");
  await tx.objectStore("offline_task_queue").add({
    ...taskData,
    timestamp: Date.now(),
    vectorClock: 1, // CRDT baseline
  });
  await tx.done;
};

export const getOfflineTasks = async () => {
  const db = await initDB();
  return db.getAll("offline_task_queue");
};

export const clearOfflineTask = async (id) => {
  const db = await initDB();
  const tx = db.transaction("offline_task_queue", "readwrite");
  await tx.objectStore("offline_task_queue").delete(id);
  await tx.done;
};
