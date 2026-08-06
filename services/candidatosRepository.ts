import { Platform } from "react-native";
import type { Candidato } from "../data/candidatos";
import { obtenerCandidatos } from "./candidatosApi";

export async function cargarCandidatos(): Promise<Candidato[]> {
  try {
    const candidatosApi = await obtenerCandidatos();

    if (Platform.OS !== "web") {
      const { inicializarBaseDatos, guardarCandidatos } = await import(
        "./candidatosDb"
      );

      await inicializarBaseDatos();
      await guardarCandidatos(candidatosApi);
    }

    return candidatosApi;
  } catch (errorApi) {
    if (Platform.OS === "web") {
      throw errorApi;
    }

    const { inicializarBaseDatos, consultarCandidatos } = await import(
      "./candidatosDb"
    );

    await inicializarBaseDatos();

    const candidatosLocales = await consultarCandidatos();

    if (candidatosLocales.length > 0) {
      return candidatosLocales;
    }

    throw errorApi;
  }
}