export function setIDB(key: string, value: any): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('SaifahDB', 1);
    request.onupgradeneeded = (e: any) => {
      e.target.result.createObjectStore('store');
    };
    request.onsuccess = (e: any) => {
      const db = e.target.result;
      // If store doesn't exist, we might have an issue where version didn't upgrade properly.
      // But usually onupgradeneeded handles it.
      if (!db.objectStoreNames.contains('store')) {
        db.close();
        // Force upgrade by bumping version (rare case but good to handle)
        const secondReq = indexedDB.open('SaifahDB', 2);
        secondReq.onupgradeneeded = (ev: any) => ev.target.result.createObjectStore('store');
        secondReq.onsuccess = (ev: any) => {
           const db2 = ev.target.result;
           const tx = db2.transaction('store', 'readwrite');
           tx.objectStore('store').put(value, key);
           tx.oncomplete = () => resolve();
           tx.onerror = () => reject(tx.error);
        };
        return;
      }

      const tx = db.transaction('store', 'readwrite');
      tx.objectStore('store').put(value, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    };
    request.onerror = () => reject(request.error);
  });
}

export function getIDB(key: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('SaifahDB', 1);
    request.onupgradeneeded = (e: any) => {
      e.target.result.createObjectStore('store');
    };
    request.onsuccess = (e: any) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('store')) {
         resolve(null);
         return;
      }
      const tx = db.transaction('store', 'readonly');
      const getReq = tx.objectStore('store').get(key);
      getReq.onsuccess = () => resolve(getReq.result);
      getReq.onerror = () => reject(getReq.error);
    };
    request.onerror = () => reject(request.error);
  });
}
