import { StyleSheet, Text, View } from "react-native";

import type { OpcionElectoral } from "../data/intencion";

type BarraVotoProps = {
  opcion: OpcionElectoral;
};

export default function BarraVoto({ opcion }: BarraVotoProps) {
  return (
    <View style={styles.contenedor}>
      <View style={styles.encabezado}>
        <Text style={styles.nombre}>{opcion.nombre}</Text>

        <Text style={styles.porcentaje}>
          {opcion.porcentaje.toFixed(1).replace(".", ",")} %
        </Text>
      </View>

      <View style={styles.fondoBarra}>
        <View
          style={[
            styles.rellenoBarra,
            {
              width: `${opcion.porcentaje}%`,
              backgroundColor: opcion.color,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    marginBottom: 18,
  },
  encabezado: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 7,
  },
  nombre: {
    color: "#333333",
    fontSize: 15,
    fontWeight: "600",
  },
  porcentaje: {
    color: "#2E1A5B",
    fontSize: 15,
    fontWeight: "700",
  },
  fondoBarra: {
    height: 14,
    backgroundColor: "#E5E5E8",
    borderRadius: 7,
    overflow: "hidden",
  },
  rellenoBarra: {
    height: "100%",
    borderRadius: 7,
  },
});