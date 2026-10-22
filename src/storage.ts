export type Material = {
  id: string;
  name: string;
  size: number;
  pages: number;
  text: string;
  added: string;
  blob?: Blob;
  url?: string;
  builtin?: boolean;
};
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const r = indexedDB.open("fahm-library", 1);
    r.onupgradeneeded = () =>
      r.result.createObjectStore("materials", { keyPath: "id" });
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
}
export async function materialsDB(action: "list"): Promise<Material[]>;
export async function materialsDB(
  action: "put" | "delete",
  value: Material | string,
): Promise<void>;
export async function materialsDB(
  action: "list" | "put" | "delete",
  value?: Material | string,
): Promise<Material[] | void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(
      "materials",
      action === "list" ? "readonly" : "readwrite",
    );
    const s = tx.objectStore("materials");
    const req =
      action === "list"
        ? s.getAll()
        : action === "put"
          ? s.put(value)
          : s.delete(value as string);
    tx.oncomplete = () => {
      db.close();
      resolve(action === "list" ? (req.result as Material[]) : undefined);
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error);
    };
  });
}
export function scoreAnswers(
  answers: Record<string, number>,
  items: { id: string; correct: number }[],
) {
  return {
    correct: items.filter((q) => answers[q.id] === q.correct).length,
    total: items.length,
    answered: items.filter((q) => answers[q.id] !== undefined).length,
  };
}
export function readSaved<T>(key: string, fallback: T): T {
  try {
    const s = localStorage.getItem(key);
    return s ? JSON.parse(s) : fallback;
  } catch {
    return fallback;
  }
}
