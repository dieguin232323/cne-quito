import * as SQLite from "expo-sqlite";

let baseDatosPromise: Promise<SQLite.SQLiteDatabase> | null = null;
let inicializacionPromise: Promise<void> | null = null;

export async function obtenerBaseDatos(): Promise<SQLite.SQLiteDatabase> {
  if (!baseDatosPromise) {
    baseDatosPromise = SQLite.openDatabaseAsync("cne.db");
  }

  return baseDatosPromise;
}

async function ejecutarMigraciones(): Promise<void> {
  const db = await obtenerBaseDatos();

  await db.execAsync("PRAGMA journal_mode = WAL;");

  const resultado = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version"
  );

  const versionActual = resultado?.user_version ?? 0;

  if (versionActual < 1) {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS candidatos (
        id TEXT PRIMARY KEY NOT NULL,
        nombre TEXT NOT NULL,
        iniciales TEXT NOT NULL,
        movimiento TEXT NOT NULL,
        dignidad TEXT NOT NULL,
        edad INTEGER NOT NULL,
        profesion TEXT NOT NULL,
        binomio TEXT NOT NULL,
        propuesta TEXT NOT NULL,
        ejes_campana TEXT NOT NULL,
        color TEXT NOT NULL,
        foto TEXT NOT NULL
      );

      PRAGMA user_version = 1;
    `);
  }

  if (versionActual < 2) {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS recordatorios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        descripcion TEXT NOT NULL,
        fecha TEXT NOT NULL,
        hora TEXT NOT NULL
      );

      PRAGMA user_version = 2;
    `);
  }
}

export async function inicializarBaseDatos(): Promise<void> {
  if (!inicializacionPromise) {
    inicializacionPromise = ejecutarMigraciones().catch((error) => {
      inicializacionPromise = null;
      throw error;
    });
  }

  return inicializacionPromise;
}