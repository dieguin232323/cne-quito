import { useEffect } from "react";
import { View, Image, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "../theme/colors";
 
export default function Splash() {
  const router = useRouter();
 
  useEffect(() => {
    const t = setTimeout(() => router.replace("/home"), 2500);
    return () => clearTimeout(t);          // limpieza obligatoria
  }, [router]);
 
  return (
    <View style={s.cont}>
      <Image
        source={require("../assets/images/cne-logo.png")}
        style={s.logo}
        resizeMode="contain"
      />
      <Text style={s.titulo}>Bienvenido/a</Text>
      <Text style={s.sub}>Consejo Nacional Electoral</Text>
      <Text style={s.sub}>Elecciones Seccionales 2027</Text>
      <ActivityIndicator size="large" color={colors.magenta} style={s.spin} />
      <Text style={s.cargando}>Cargando datos del proceso...</Text>
      <Text style={s.nota}>Simulacro academico - datos ficticios</Text>
    </View>
  );
}
 
const s = StyleSheet.create({
  cont: { flex: 1, backgroundColor: colors.morado, alignItems: "center", justifyContent: "center", padding: 24 },
  logo: { width: 140, height: 140, marginBottom: 28 },
  titulo: { color: "#fff", fontSize: 24, fontWeight: "700", marginBottom: 8 },
  sub: { color: "#D9D2EA", fontSize: 13, textAlign: "center" },
  spin: { marginTop: 28 },
  cargando: { color: "#D9D2EA", fontSize: 12, marginTop: 12 },
  nota: { color: "#9C8FC0", fontSize: 10, position: "absolute", bottom: 32 },
});
