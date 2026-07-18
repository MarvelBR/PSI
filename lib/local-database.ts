/**
 * Banco de dados local da aplicacao.
 *
 * O IndexedDB e nativo do navegador e permite que os dados preenchidos na
 * interface continuem disponiveis mesmo depois de fechar ou atualizar a aba.
 */

const DATABASE_NAME = "suisafe";
const DATABASE_VERSION = 1;
const SAFETY_PLANS_STORE = "safetyPlans";
const MOOD_RECORDS_STORE = "moodRecords";
const CURRENT_SAFETY_PLAN_ID = "current";

export type TreatmentPlace = {
  name: string;
  phone: string;
};

export type SafetyPlan = Record<string, unknown> & {
  id: string;
  updatedAt: number;
  treatmentPlace?: TreatmentPlace;
};

export type MoodRecord = {
  id: string;
  date: string;
  positiveEmotions: string;
  negativeEmotions: string;
  situation: string;
  thoughts: string;
  reaction: string;
  createdAt: number;
};

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

    request.onupgradeneeded = () => {
      const database = request.result;

      if (!database.objectStoreNames.contains(SAFETY_PLANS_STORE)) {
        database.createObjectStore(SAFETY_PLANS_STORE, { keyPath: "id" });
      }

      if (!database.objectStoreNames.contains(MOOD_RECORDS_STORE)) {
        const store = database.createObjectStore(MOOD_RECORDS_STORE, {
          keyPath: "id",
        });
        store.createIndex("createdAt", "createdAt");
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Não foi possível abrir o banco local."));
  });
}

async function runTransaction<T>(
  storeName: string,
  mode: IDBTransactionMode,
  operation: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  const database = await openDatabase();

  try {
    return await new Promise<T>((resolve, reject) => {
      const transaction = database.transaction(storeName, mode);
      const request = operation(transaction.objectStore(storeName));

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error ?? new Error("Não foi possível salvar os dados."));
      transaction.onerror = () => reject(transaction.error ?? new Error("Não foi possível salvar os dados."));
    });
  } finally {
    database.close();
  }
}

function readLegacyData<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export async function getSafetyPlan(): Promise<SafetyPlan | null> {
  const plan = await runTransaction<SafetyPlan | undefined>(
    SAFETY_PLANS_STORE,
    "readonly",
    (store) => store.get(CURRENT_SAFETY_PLAN_ID),
  );

  if (plan) return plan;

  const legacyPlan = readLegacyData<Record<string, unknown>>("safetyPlan", {});
  if (Object.keys(legacyPlan).length === 0) return null;

  const migratedPlan: SafetyPlan = {
    ...legacyPlan,
    id: CURRENT_SAFETY_PLAN_ID,
    updatedAt:
      typeof legacyPlan.updatedAt === "number" ? legacyPlan.updatedAt : Date.now(),
  };
  await saveSafetyPlan(migratedPlan);
  localStorage.removeItem("safetyPlan");
  return migratedPlan;
}

export async function saveSafetyPlan(plan: SafetyPlan): Promise<void> {
  await runTransaction<IDBValidKey>(
    SAFETY_PLANS_STORE,
    "readwrite",
    (store) => store.put(plan),
  );
}

export async function addMoodRecord(record: Omit<MoodRecord, "id" | "createdAt">): Promise<void> {
  const moodRecord: MoodRecord = {
    ...record,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };

  await runTransaction<IDBValidKey>(
    MOOD_RECORDS_STORE,
    "readwrite",
    (store) => store.add(moodRecord),
  );
}

/** Migra os registros criados pelas versoes anteriores da interface. */
export async function migrateLegacyMoodRecords(): Promise<void> {
  const records = readLegacyData<Array<Record<string, unknown>>>("moodRecords", []);
  if (!records.length) return;

  for (const record of records) {
    await addMoodRecord({
      date: typeof record.date === "string" ? record.date : "",
      positiveEmotions:
        typeof record.positiveEmotions === "string" ? record.positiveEmotions : "",
      negativeEmotions:
        typeof record.negativeEmotions === "string" ? record.negativeEmotions : "",
      situation: typeof record.situation === "string" ? record.situation : "",
      thoughts: typeof record.thoughts === "string" ? record.thoughts : "",
      reaction: typeof record.reaction === "string" ? record.reaction : "",
    });
  }

  localStorage.removeItem("moodRecords");
}

/**
 * Busca todos os registros de mudança de humor salvos, do mais recente
 * para o mais antigo.
 *
 * Entrada:
 * - não recebe parâmetros.
 *
 * Variáveis usadas:
 * - createdAt: índice do object store usado para ordenar os registros.
 *
 * Saída:
 * - lista de MoodRecord ordenada por data de criação decrescente.
 */
export async function getAllMoodRecords(): Promise<MoodRecord[]> {
  const records = await runTransaction<MoodRecord[]>(
    MOOD_RECORDS_STORE,
    "readonly",
    (store) => store.index("createdAt").getAll(),
  );

  return records.sort((a, b) => b.createdAt - a.createdAt);
}