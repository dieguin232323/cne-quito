import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CandidatoCard from "../../components/CandidatoCard";
import { Candidato } from "../../data/candidatos";
import { cargarCandidatos as cargarCandidatosRepository } from "../../services/candidatosRepository";

export default function Candidatos() {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarCandidatos = useCallback(async () => {
    setCargando(true);
    setError(null);

    try {
      const datos = await cargarCandidatosRepository();
      setCandidatos(datos);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se pudieron cargar los candidatos."
      );
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarCandidatos();
  }, [cargarCandidatos]);

  if (cargando) {
    return (
      <View style={s.centro}>
        <ActivityIndicator size="large" color="#C4006B" />
        <Text style={s.mensaje}>Cargando candidatos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={s.centro}>
        <Text style={s.error}>{error}</Text>

        <Pressable style={s.boton} onPress={cargarCandidatos}>
          <Text style={s.botonTexto}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      style={s.lista}
      contentContainerStyle={s.cont}
      data={candidatos}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={s.sep} />}
      ListHeaderComponent={
        <View style={s.head}>
          <Text style={s.h1}>Candidatos</Text>
          <Text style={s.h2}>
            Alcaldía de Quito - {candidatos.length} inscritos
          </Text>
        </View>
      }
      ListEmptyComponent={
        <Text style={s.vacio}>No hay candidatos registrados.</Text>
      }
      renderItem={({ item }) => <CandidatoCard candidato={item} />}
      ListFooterComponent={
        <Text style={s.nota}>Datos ficticios de uso académico.</Text>
      }
    />
  );
}

const s = StyleSheet.create({
  lista: {
    flex: 1,
    backgroundColor: "#F7F7FB",
  },
  cont: {
    padding: 16,
    paddingBottom: 32,
  },
  centro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F7F7FB",
    padding: 24,
  },
  mensaje: {
    color: "#6B6B7B",
    marginTop: 12,
  },
  error: {
    color: "#B00020",
    textAlign: "center",
    marginBottom: 16,
  },
  boton: {
    backgroundColor: "#C4006B",
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  botonTexto: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  sep: {
    height: 12,
  },
  head: {
    marginBottom: 14,
  },
  h1: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1A1A24",
  },
  h2: {
    fontSize: 12,
    color: "#6B6B7B",
    marginTop: 2,
  },
  vacio: {
    textAlign: "center",
    color: "#6B6B7B",
    marginTop: 40,
  },
  nota: {
    fontSize: 10,
    color: "#9A9AA8",
    textAlign: "center",
    marginTop: 18,
  },
});