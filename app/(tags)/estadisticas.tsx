import { ScrollView, StyleSheet, Text, View } from "react-native";

import BarraProgreso from "../../components/BarraProgreso";
import { BarChart } from "react-native-gifted-charts";
import {
  intencionVoto,
  porcentajeActasProcesadas,
} from "../../data/intencion";

export default function EstadisticasScreen() {

    const candidatos = intencionVoto.filter((opcion) => opcion.esCandidato);

    const lider = candidatos.reduce((mayor, candidato) =>
    candidato.porcentaje > mayor.porcentaje ? candidato : mayor
    );

    const segundo = candidatos
    .filter((candidato) => candidato.id !== lider.id)
    .reduce((mayor, candidato) =>
    candidato.porcentaje > mayor.porcentaje ? candidato : mayor
    );

    const ventaja = lider.porcentaje - segundo.porcentaje;

    const datosGrafico = intencionVoto.map((opcion) => ({
        value: opcion.porcentaje,
        label:
            opcion.nombre === "Nulo / Blanco"
                ? "Nulo/\nBlanco"
                : opcion.nombre,
        frontColor: opcion.color,
        topLabelComponent: () => (
        <Text style={styles.valorGrafico}>
      {opcion.porcentaje.toFixed(1).replace(".", ",")} %
    </Text>
    ),
}));

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

        <View style={styles.tarjetaLider}>
            <Text style={styles.liderRotulo}>Va ganando</Text>

            <Text style={styles.liderNombre}>
            {lider.nombre} – {lider.porcentaje.toFixed(1).replace(".", ",")} %
            </Text>

            <Text style={styles.liderVentaja}>
            +{ventaja.toFixed(1).replace(".", ",")} puntos sobre {segundo.nombre}
            </Text>
        </View>

      <View style={styles.tarjeta}>
        <Text style={styles.tarjetaTitulo}>Avance del procesamiento</Text>

        <BarraProgreso porcentaje={porcentajeActasProcesadas} />
      </View>

        <View style={[styles.tarjeta, styles.tarjetaResultados]}>
        <Text style={styles.tarjetaTitulo}>Intención de voto</Text>

        <BarChart
            data={datosGrafico}
            height={220}
            maxValue={50}
            noOfSections={5}
            stepValue={10}
            barWidth={28}
            spacing={22}
            initialSpacing={10}
            barBorderTopLeftRadius={6}
            barBorderTopRightRadius={6}
            yAxisLabelSuffix=" %"
            yAxisTextStyle={styles.textoEje}
            xAxisColor="#B8B8BE"
            yAxisColor="#B8B8BE"
            rulesColor="#E5E5E8"
            labelWidth={58}
            xAxisLabelTextStyle={styles.textoEjeX}
            disableScroll
            />
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
tarjetaLider: {
  backgroundColor: "#2E1A5B",
  borderRadius: 14,
  padding: 18,
  marginBottom: 20,
},
liderRotulo: {
  color: "#D9D2EA",
  fontSize: 12,
  fontWeight: "700",
  textTransform: "uppercase",
},
liderNombre: {
  color: "#FFFFFF",
  fontSize: 21,
  fontWeight: "800",
  marginTop: 5,
},
liderVentaja: {
  color: "#FF7AB8",
  fontSize: 13,
  marginTop: 4,
},
valorGrafico: {
  color: "#2E1A5B",
  fontSize: 11,
  fontWeight: "700",
},
textoEje: {
  color: "#666666",
  fontSize: 10,
},
textoEjeX: {
  color: "#4A4A4A",
  fontSize: 10,
  textAlign: "center",
},
});