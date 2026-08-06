import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

type ResumenProcesoProps = {
  dignidades: number;
  electores: string | number;
  fecha: string;
};
 
export default function ResumenProceso({ dignidades, electores, fecha }: ResumenProcesoProps) {
  const kpis = [
    { id: "dig", valor: String(dignidades), etiqueta: "Dignidades" },
    { id: "ele", valor: electores, etiqueta: "Electores" },
    { id: "fec", valor: fecha, etiqueta: "Dia de votacion" },
  ];
 
  return (
    <View style={s.card}>
      <Text style={s.titulo}>Resumen del proceso</Text>
      <View style={s.fila}>
        {kpis.map((k) => (
          <View key={k.id} style={s.kpi}>
            <Text style={s.valor}>{k.valor}</Text>
            <Text style={s.etiqueta}>{k.etiqueta}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
 
const s = StyleSheet.create({
  card: { backgroundColor: "#fff", borderRadius: 16, padding: 16, marginBottom: 14,
          borderWidth: 1, borderColor: "#ECECF2" },
  titulo: { fontSize: 15, fontWeight: "700", color: colors.morado, marginBottom: 12 },
  fila: { flexDirection: "row", justifyContent: "space-between" },
  kpi: { flex: 1, alignItems: "center" },
  valor: { fontSize: 20, fontWeight: "800", color: colors.magenta },
  etiqueta: { fontSize: 11, color: "#6B6B7B", marginTop: 2, textAlign: "center" },
});
