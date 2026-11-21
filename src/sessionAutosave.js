const DATABASE_NAME = "mega-dungeon";
const STORE_NAME = "autosaves";
const SESSION_KEY = "current";

let databaseConnection;

function openDatabase() {
  databaseConnection ??= new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE_NAME);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const database = request.result;
      database.onversionchange = () => {
        database.close();
        databaseConnection = undefined;
      };
      resolve(database);
    };
  }).catch((error) => {
    databaseConnection = undefined;
    throw error;
  });
  return databaseConnection;
}

export async function loadAutosave() {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, "readonly");
    const request = transaction.objectStore(STORE_NAME).get(SESSION_KEY);
    transaction.oncomplete = () => resolve(request.result);
    transaction.onabort = () => reject(transaction.error);
  });
}

export async function saveAutosave(session) {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, "readwrite");
    transaction.oncomplete = () => resolve();
    transaction.onabort = () => reject(transaction.error);
    transaction.objectStore(STORE_NAME).put(session, SESSION_KEY);
  });
}

export async function clearAutosave() {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, "readwrite");
    transaction.oncomplete = () => resolve();
    transaction.onabort = () => reject(transaction.error);
    transaction.objectStore(STORE_NAME).delete(SESSION_KEY);
  });
}
