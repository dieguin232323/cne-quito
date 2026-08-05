import { StyleSheet, Text, View } from "react-native";

type BarraProgresoProps = {
  porcentaje: number;
  color?: string;
};

export default function BarraProgreso({
  porcentaje,
  color = "#C4006B",
}: BarraProgresoProps) {
  const porcentajeSeguro = Math.min(Math.max(porcentaje, 0), 100);

  return (
    <View>
      <View style={styles.encabezado}>
        <Text style={styles.etiqueta}>Actas procesadas</Text>
        <Text style={styles.porcentaje}>
          {porcentajeSeguro.toFixed(1).replace(".", ",")} %
        </Text>
      </View>

      <View style={styles.fondo}>
        <View
          style={[
            styles.progreso,
            {
              width: `${porcentajeSeguro}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  encabezado: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  etiqueta: {
    color: "#333333",
    fontSize: 15,
    fontWeight: "600",
  },
  porcentaje: {
    color: "#C4006B",
    fontSize: 15,
    fontWeight: "700",
  },
  fondo: {
    width: "100%",
    height: 12,
    backgroundColor: "#E5E5E5",
    borderRadius: 6,
    overflow: "hidden",
  },
  progreso: {
    height: "100%",
    borderRadius: 6,
  },
});