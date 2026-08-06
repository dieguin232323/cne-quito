import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";
import { colors } from "../theme/colors";

type Recinto = {
  nombre: string;
  direccion: string;
  junta: string;
  lat: number;
  lng: number;
};

type DondeVotarProps = {
  recinto: Recinto;
  onVerMas?: () => void;
};

type Coords = {
  latitude: number;
  longitude: number;
};

const html = (recinto: Recinto, center: Coords, userCoords: Coords | null) => `
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <style>html, body, #map { height: 100%; margin: 0; padding: 0; }</style>
  </head>
  <body>
    <div id="map"></div>
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <script>
      const map = L.map('map').setView([${center.latitude}, ${center.longitude}], 15);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);
      L.marker([${recinto.lat}, ${recinto.lng}]).addTo(map).bindPopup('<strong>${recinto.nombre}</strong><br>${recinto.direccion}').openPopup();
      const userCoords = ${userCoords ? JSON.stringify(userCoords) : 'null'};
      if (userCoords) {
        L.marker([userCoords.latitude, userCoords.longitude]).addTo(map).bindPopup('<strong>Tu ubicación</strong>').openPopup();
        L.circle([userCoords.latitude, userCoords.longitude], { radius: 40, color: 'blue', fillOpacity: 0.2 }).addTo(map);
      }
    </script>
  </body>
</html>
`;

export default function DondeVotar({ recinto, onVerMas }: DondeVotarProps) {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [permiso, setPermiso] = useState<"pendiente" | "concedido" | "denegado">("pendiente");

  useEffect(() => {
    let activo = true;

    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (!activo) return;

        if (status !== "granted") {
          setPermiso("denegado");
          return;
        }

        const servicesEnabled = await Location.hasServicesEnabledAsync();
        if (!servicesEnabled) {
          setPermiso("denegado");
          return;
        }

        const pos = await Location.getCurrentPositionAsync({});
        if (!activo) return;

        setCoords({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setPermiso("concedido");
      } catch (error) {
        if (activo) {
          setPermiso("denegado");
        }
      }
    })();

    return () => {
      activo = false;
    };
  }, []);

  const center = coords ?? { latitude: recinto.lat, longitude: recinto.lng };

  return (
    <View style={s.card}>
      <Text style={s.titulo}>Donde votar en Quito</Text>

      {permiso === "denegado" ? (
        <View style={s.aviso}>
          <Text style={s.avisoTexto}>Permiso de ubicación denegado. Mostrando el recinto asignado.</Text>
        </View>
      ) : null}

      {permiso === "pendiente" ? (
        <View style={s.aviso}>
          <Text style={s.avisoTexto}>Solicitando permiso de ubicación…</Text>
        </View>
      ) : null}

      <View style={s.mapa}>
        <WebView
          source={{ html: html(recinto, center, coords) }}
          originWhitelist={["*"]}
          style={s.webview}
        />
      </View>

      <Text style={s.nombre}>{recinto.nombre}</Text>
      <Text style={s.dir}>{recinto.direccion} - Junta {recinto.junta}</Text>

      <Pressable style={s.btn} onPress={onVerMas}>
        <Text style={s.btnTxt}>Ver en el mapa</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  card: { backgroundColor: "#fff", borderRadius: 16, padding: 16, borderWidth: 1, borderColor: "#ECECF2" },
  titulo: { fontSize: 15, fontWeight: "700", color: colors.morado, marginBottom: 10 },
  mapa: { width: "100%", height: 180, borderRadius: 12, overflow: "hidden", marginTop: 6 },
  webview: { flex: 1, backgroundColor: "transparent" },
  nombre: { fontSize: 14, fontWeight: "700", marginTop: 12 },
  dir: { fontSize: 12, color: "#6B6B7B", marginTop: 2 },
  btn: { backgroundColor: colors.magenta, borderRadius: 10, paddingVertical: 10, alignItems: "center", marginTop: 12 },
  btnTxt: { color: "#fff", fontWeight: "700", fontSize: 13 },
});
