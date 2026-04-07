export async function setIDB(key: string, value: any): Promise<void> {
  if (typeof indexedDB === "undefined") return;
  return new Promise((resolve, reject) => {
    try {
      const request = indexedDB.open("SaifahDB", 1);
      request.onupgradeneeded = (e: any) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains("store")) {
          db.createObjectStore("store");
        }
      };
      request.onsuccess = (e: any) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains("store")) {
          // This case handles rare race conditions during upgrades
          db.close();
          const secondReq = indexedDB.open("SaifahDB", 2);
          secondReq.onupgradeneeded = (ev: any) => {
            const db2 = ev.target.result;
            if (!db2.objectStoreNames.contains("store")) {
              db2.createObjectStore("store");
            }
          };
          secondReq.onsuccess = (ev: any) => {
            const db2 = ev.target.result;
            const tx = db2.transaction("store", "readwrite");
            tx.objectStore("store").put(value, key);
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
          };
          return;
        }

        const tx = db.transaction("store", "readwrite");
        const store = tx.objectStore("store");
        store.put(value, key);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      };
      request.onerror = () => reject(request.error);
    } catch (err) {
      console.warn("IndexedDB not supported or blocked:", err);
      resolve(); // Resolve silently to avoid crashing the app
    }
  });
}

export async function getIDB(key: string): Promise<any> {
  if (typeof indexedDB === "undefined") return null;
  return new Promise((resolve, reject) => {
    try {
      const request = indexedDB.open("SaifahDB", 1);
      request.onupgradeneeded = (e: any) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains("store")) {
          db.createObjectStore("store");
        }
      };
      request.onsuccess = (e: any) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains("store")) {
          resolve(null);
          return;
        }
        const tx = db.transaction("store", "readonly");
        const store = tx.objectStore("store");
        const getReq = store.get(key);
        getReq.onsuccess = () => resolve(getReq.result);
        getReq.onerror = () => reject(getReq.error);
      };
      request.onerror = () => reject(request.error);
    } catch (err) {
      console.warn("IndexedDB not supported or blocked:", err);
      resolve(null);
    }
  });
}
