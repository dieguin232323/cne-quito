import type { Candidato } from "../data/candidatos";
import { obtenerCandidatos } from "./candidatosApi";

export async function cargarCandidatos(): Promise<Candidato[]> {
  return obtenerCandidatos();
}