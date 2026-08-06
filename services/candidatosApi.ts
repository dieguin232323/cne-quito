import { Candidato } from "../data/candidatos";

const API_URL =
  process.env.EXPO_PUBLIC_CANDIDATOS_API_URL ??
  "https://raw.githubusercontent.com/dieguin232323/cne-quito/tema8-api-sqlite-gabriel/api/candidatos.json";

const TIMEOUT_MS = 10000;

function esCandidato(valor: unknown): valor is Candidato {
  if (!valor || typeof valor !== "object") {
    return false;
  }

  const candidato = valor as Record<string, unknown>;

  return (
    typeof candidato.id === "string" &&
    typeof candidato.nombre === "string" &&
    typeof candidato.iniciales === "string" &&
    typeof candidato.movimiento === "string" &&
    typeof candidato.dignidad === "string" &&
    typeof candidato.edad === "number" &&
    typeof candidato.profesion === "string" &&
    typeof candidato.propuesta === "string" &&
    Array.isArray(candidato.ejesCampana) &&
    candidato.ejesCampana.every((eje) => typeof eje === "string") &&
    typeof candidato.color === "string" &&
    typeof candidato.foto === "string"
  );
}

export async function obtenerCandidatos(): Promise<Candidato[]> {
  const controlador = new AbortController();
  const temporizador = setTimeout(() => controlador.abort(), TIMEOUT_MS);

  try {
    const respuesta = await fetch(API_URL, {
      signal: controlador.signal,
      headers: {
        Accept: "application/json",
      },
    });

    if (!respuesta.ok) {
      throw new Error(`Error HTTP ${respuesta.status}`);
    }

    const datos: unknown = await respuesta.json();

    if (!Array.isArray(datos) || !datos.every(esCandidato)) {
      throw new Error("La API devolvió datos de candidatos no válidos.");
    }

    return datos;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("La API tardó demasiado en responder.");
    }

    throw error;
  } finally {
    clearTimeout(temporizador);
  }
}