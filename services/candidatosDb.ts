import {
  inicializarBaseDatos as inicializarDbCompartida,
  obtenerBaseDatos,
} from "./baseDatos";
import type { Candidato } from "../data/candidatos";

export async function inicializarBaseDatos(): Promise<void> {
  await inicializarDbCompartida();
}

interface CandidatoFila {
  id: string;
  nombre: string;
  iniciales: string;
  movimiento: string;
  dignidad: string;
  edad: number;
  profesion: string;
  binomio: string;
  propuesta: string;
  ejes_campana: string;
  color: string;
  foto: string;
}

export async function guardarCandidatos(
  candidatos: Candidato[]
): Promise<void> {
  const db = await obtenerBaseDatos();

  await db.withTransactionAsync(async () => {
    await db.runAsync("DELETE FROM candidatos");

    for (const candidato of candidatos) {
      if (typeof candidato.foto !== "string") {
        throw new Error(
          "SQLite solo puede guardar fotografías mediante una URL."
        );
      }

      await db.runAsync(
        `INSERT INTO candidatos (
          id,
          nombre,
          iniciales,
          movimiento,
          dignidad,
          edad,
          profesion,
          binomio,
          propuesta,
          ejes_campana,
          color,
          foto
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        candidato.id,
        candidato.nombre,
        candidato.iniciales,
        candidato.movimiento,
        candidato.dignidad,
        candidato.edad,
        candidato.profesion,
        candidato.binomio ?? "",
        candidato.propuesta,
        JSON.stringify(candidato.ejesCampana),
        candidato.color,
        candidato.foto
      );
    }
  });
}

export async function consultarCandidatos(): Promise<Candidato[]> {
  const db = await obtenerBaseDatos();

  const filas = await db.getAllAsync<CandidatoFila>(
    "SELECT * FROM candidatos ORDER BY id"
  );

  return filas.map((fila) => ({
    id: fila.id,
    nombre: fila.nombre,
    iniciales: fila.iniciales,
    movimiento: fila.movimiento,
    dignidad: fila.dignidad,
    edad: fila.edad,
    profesion: fila.profesion,
    binomio: fila.binomio,
    propuesta: fila.propuesta,
    ejesCampana: JSON.parse(fila.ejes_campana) as string[],
    color: fila.color,
    foto: fila.foto,
  }));
}