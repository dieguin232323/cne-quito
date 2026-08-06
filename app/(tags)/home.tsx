import { ScrollView, StyleSheet } from "react-native";
import Bienvenida from "../../components/Bienvenida";
import ResumenProceso from "../../components/ResumenProceso";
import DondeVotar from "../../components/DondeVotar";
import { proceso } from "../../data/proceso";
import { recintos } from "../../data/recintos";
 
export default function Home() {
  const miRecinto = recintos[0];
 
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.cont}>
      <Bienvenida nombre={proceso.usuario} eleccion={proceso.eleccion} ciudad={proceso.ciudad} />
      <ResumenProceso
        dignidades={proceso.dignidades}
        electores={proceso.electoresQuito}
        fecha={proceso.fechaVotacion}
      />
      <DondeVotar recinto={miRecinto} />
    </ScrollView>
  );
}
 
const s = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: "#F7F7FB" },
  cont: { padding: 16, paddingBottom: 32 },
});
