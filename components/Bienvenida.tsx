import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

type BienvenidaProps = {
  nombre: string;
  eleccion: string;
  ciudad?: string;
};

export default function Bienvenida({ nombre, eleccion, ciudad = "Quito" }: BienvenidaProps)  {
  return (
    <View style={s.caja}>
      <Text style={s.saludo}>Hola, {nombre}</Text>
      <Text style={s.linea}>{eleccion}</Text>
      <Text style={s.chip}>{ciudad} - Zona urbana</Text>
    </View>
  );
}
 
const s = StyleSheet.create({
  caja: { backgroundColor: colors.morado, padding: 18, borderRadius: 16, marginBottom: 14 },
  saludo: { color: "#fff", fontSize: 20, fontWeight: "700" },
  linea: { color: "#D9D2EA", fontSize: 13, marginTop: 4 },
  chip: { color: "#fff", fontSize: 11, marginTop: 10, alignSelf: "flex-start",
          backgroundColor: colors.magenta, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
});
