import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { colors } from "../../theme/colors";

export default function EstadisticasScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Pestaña Estadísticas</Text>
        <Text style={styles.subtitle}>Br</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fondo,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.morado,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textoSuave,
  },
});
