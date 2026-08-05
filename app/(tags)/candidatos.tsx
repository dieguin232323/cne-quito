import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import CandidatoCard from "../../components/CandidatoCard";
import { candidatos } from "../../data/candidatos";

export default function Candidatos() {
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
          <Text style={s.h2}>Alcaldía de Quito - {candidatos.length} inscritos</Text>
        </View>
      }
      ListEmptyComponent={<Text style={s.vacio}>No hay candidatos registrados.</Text>}
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
