import * as SQLite from "expo-sqlite";

export interface Recordatorio {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
}

export type NuevoRecordatorio = Omit<Recordatorio, "id">;

let baseDatosPromise: Promise<SQLite.SQLiteDatabase> | null = null;

async function obtenerBaseDatos(): Promise<SQLite.SQLiteDatabase> {
  if (!baseDatosPromise) {
    baseDatosPromise = SQLite.openDatabaseAsync("cne.db");
  }

  return baseDatosPromise;
}

export async function inicializarRecordatoriosDb(): Promise<void> {
  const db = await obtenerBaseDatos();

  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS recordatorios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descripcion TEXT NOT NULL,
      fecha TEXT NOT NULL,
      hora TEXT NOT NULL
    );
  `);
}

export async function crearRecordatorio(
  recordatorio: NuevoRecordatorio
): Promise<number> {
  const db = await obtenerBaseDatos();

  const resultado = await db.runAsync(
    `INSERT INTO recordatorios (titulo, descripcion, fecha, hora)
     VALUES (?, ?, ?, ?)`,
    recordatorio.titulo,
    recordatorio.descripcion,
    recordatorio.fecha,
    recordatorio.hora
  );

  return resultado.lastInsertRowId;
}

export async function listarRecordatorios(): Promise<Recordatorio[]> {
  const db = await obtenerBaseDatos();

  return db.getAllAsync<Recordatorio>(
    `SELECT id, titulo, descripcion, fecha, hora
     FROM recordatorios
     ORDER BY fecha ASC, hora ASC`
  );
}

export async function actualizarRecordatorio(
  recordatorio: Recordatorio
): Promise<void> {
  const db = await obtenerBaseDatos();

  await db.runAsync(
    `UPDATE recordatorios
     SET titulo = ?, descripcion = ?, fecha = ?, hora = ?
     WHERE id = ?`,
    recordatorio.titulo,
    recordatorio.descripcion,
    recordatorio.fecha,
    recordatorio.hora,
    recordatorio.id
  );
}

export async function eliminarRecordatorio(id: number): Promise<void> {
  const db = await obtenerBaseDatos();

  await db.runAsync(
    "DELETE FROM recordatorios WHERE id = ?",
    id
  );
}