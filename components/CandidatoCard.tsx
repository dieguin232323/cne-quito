import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Candidato } from "../data/candidatos";
import { colors } from "../theme/colors";

interface CandidatoCardProps {
  candidato: Candidato;
  onPress?: () => void;
}

export default function CandidatoCard({ candidato, onPress }: CandidatoCardProps) {
  const { nombre, iniciales, movimiento, dignidad, edad, profesion, propuesta, ejesCampana, color, foto } = candidato;

  return (
    <Pressable style={s.card} onPress={onPress}>
      {foto ? (
        <Image
          source={typeof foto === "string" ? { uri: foto } : foto}
          style={s.foto}
          resizeMode="cover"
        />
      ) : (
        <View style={[s.avatar, { backgroundColor: color }]}>
          <Text style={s.iniciales}>{iniciales}</Text>
        </View>
      )}

      <View style={s.info}>
        <View style={s.nombreRow}>
          <Text style={s.nombre}>{nombre}</Text>
          <Text style={s.edadBadge}>{edad} años</Text>
        </View>

        <Text style={s.dignidad}>{dignidad}</Text>
        <Text style={s.profesionText}>{profesion}</Text>
        <Text style={s.movimiento}>{movimiento}</Text>

        <Text style={s.rotulo}>Propuesta de campaña</Text>
        <Text style={s.propuesta} numberOfLines={3} ellipsizeMode="tail">
          {propuesta}
        </Text>

        {ejesCampana && ejesCampana.length > 0 && (
          <View style={s.ejesContainer}>
            {ejesCampana.map((eje, idx) => (
              <View key={idx} style={[s.ejeBadge, { borderColor: color }]}>
                <Text style={[s.ejeText, { color: color }]}>• {eje}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#ECECF2",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  foto: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 14,
    borderWidth: 2,
    borderColor: "#ECECF2",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  iniciales: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 20,
  },
  info: {
    flex: 1,
  },
  nombreRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nombre: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A24",
    flex: 1,
  },
  edadBadge: {
    fontSize: 11,
    color: "#8E8EA0",
    backgroundColor: "#F0F0F6",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 6,
  },
  dignidad: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.magenta,
    marginTop: 1,
  },
  profesionText: {
    fontSize: 12,
    color: "#4A4A5A",
    fontStyle: "italic",
    marginTop: 1,
  },
  movimiento: {
    fontSize: 12,
    color: "#6B6B7B",
    marginTop: 2,
    fontWeight: "500",
  },
  rotulo: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.morado,
    marginTop: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  propuesta: {
    fontSize: 12,
    color: "#44444F",
    marginTop: 2,
    lineHeight: 17,
  },
  ejesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginTop: 8,
  },
  ejeBadge: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: "#FAF9FC",
  },
  ejeText: {
    fontSize: 10,
    fontWeight: "600",
  },
});
