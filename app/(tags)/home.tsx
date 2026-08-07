import { ScrollView, StyleSheet, View, Text, Pressable } from "react-native";
import { useState } from "react";
import Bienvenida from "../../components/Bienvenida";
import ResumenProceso from "../../components/ResumenProceso";
import DondeVotar from "../../components/DondeVotar";
import { proceso } from "../../data/proceso";
import { recintos } from "../../data/recintos";
 
export default function Home() {
  const [recintoSeleccionado, setRecintoSeleccionado] = useState(recintos[0]);
 
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.cont}>
      <Bienvenida nombre={proceso.usuario} eleccion={proceso.eleccion} ciudad={proceso.ciudad} />
      <ResumenProceso
        dignidades={proceso.dignidades}
        electores={proceso.electoresQuito}
        fecha={proceso.fechaVotacion}
      />

      <View style={s.selectorCard}>
        <Text style={s.seccionTitulo}>¿Votas en otro recinto?</Text>
        <Text style={s.seccionSubtitulo}>Selecciona el recinto donde realmente vas a votar.</Text>
        {recintos.map((recinto) => (
          <Pressable
            key={recinto.id}
            style={[s.recintoBtn, recintoSeleccionado.id === recinto.id ? s.recintoBtnActivo : null]}
            onPress={() => setRecintoSeleccionado(recinto)}
          >
            <Text style={[s.recintoTexto, recintoSeleccionado.id === recinto.id ? s.recintoTextoActivo : null]}>{recinto.nombre}</Text>
            <Text style={s.recintoDireccion}>{recinto.direccion}</Text>
          </Pressable>
        ))}
      </View>

      <DondeVotar recinto={recintoSeleccionado} />
    </ScrollView>
  );
}
 
const s = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: "#F7F7FB" },
  cont: { padding: 16, paddingBottom: 32 },
  selectorCard: { backgroundColor: "#fff", borderRadius: 16, padding: 16, borderWidth: 1, borderColor: "#ECECF2", marginTop: 16 },
  seccionTitulo: { fontSize: 15, fontWeight: "700", color: "#2E1A5B", marginBottom: 6 },
  seccionSubtitulo: { fontSize: 12, color: "#6B6B7B", marginBottom: 12 },
  recintoBtn: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12, borderWidth: 1, borderColor: "#ECECF2", backgroundColor: "#F7F7FB", marginBottom: 10 },
  recintoBtnActivo: { borderColor: "#C4006B", backgroundColor: "#FFF0F6" },
  recintoTexto: { fontSize: 14, fontWeight: "700", color: "#1A1A24" },
  recintoTextoActivo: { color: "#C4006B" },
  recintoDireccion: { fontSize: 12, color: "#6B6B7B", marginTop: 2 },
});
