import { ScrollView, StyleSheet, Text, View } from "react-native";

import BarraProgreso from "../../components/BarraProgreso";
import BarraVoto from "../../components/BarraVoto";
import {
  intencionVoto,
  porcentajeActasProcesadas,
} from "../../data/intencion";

export default function EstadisticasScreen() {
  return (
    <ScrollView
      style={styles.contenedor}
      contentContainerStyle={styles.contenido}
    >
      <Text style={styles.titulo}>Estadísticas electorales</Text>

      <Text style={styles.subtitulo}>
        Elecciones Seccionales 2027
      </Text>

      <View style={styles.aviso}>
        <Text style={styles.avisoTitulo}>Simulacro académico</Text>

        <Text style={styles.avisoTexto}>
          Los datos presentados son ficticios y no corresponden a resultados
          oficiales del CNE.
        </Text>
      </View>

      <View style={styles.tarjeta}>
        <Text style={styles.tarjetaTitulo}>Avance del procesamiento</Text>

        <BarraProgreso porcentaje={porcentajeActasProcesadas} />
      </View>

        <View style={[styles.tarjeta, styles.tarjetaResultados]}>
        <Text style={styles.tarjetaTitulo}>Intención de voto</Text>

        {intencionVoto.map((opcion) => (
        <BarraVoto key={opcion.id} opcion={opcion} />
        ))}
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#F5F5F7",
  },
  contenido: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  titulo: {
    color: "#2E1A5B",
    fontSize: 26,
    fontWeight: "800",
  },
  subtitulo: {
    color: "#666666",
    fontSize: 16,
    marginTop: 4,
    marginBottom: 20,
  },
  aviso: {
    backgroundColor: "#FCE8F2",
    borderLeftColor: "#C4006B",
    borderLeftWidth: 4,
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  avisoTitulo: {
    color: "#C4006B",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },
  avisoTexto: {
    color: "#4A4A4A",
    fontSize: 14,
    lineHeight: 20,
  },
  tarjeta: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 18,
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tarjetaTitulo: {
    color: "#2E1A5B",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },

  tarjetaResultados: {
  marginTop: 20,
},
});