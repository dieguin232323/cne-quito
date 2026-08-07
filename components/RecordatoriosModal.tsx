import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  actualizarRecordatorio,
  crearRecordatorio,
  eliminarRecordatorio,
  inicializarRecordatoriosDb,
  listarRecordatorios,
  type Recordatorio,
} from "../services/recordatoriosDb";

type RecordatoriosModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function RecordatoriosModal({
  visible,
  onClose,
}: RecordatoriosModalProps) {
  const [recordatorios, setRecordatorios] = useState<Recordatorio[]>([]);
  const [idEdicion, setIdEdicion] = useState<number | null>(null);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  const cargarRecordatorios = useCallback(async () => {
    await inicializarRecordatoriosDb();
    const datos = await listarRecordatorios();
    setRecordatorios(datos);
  }, []);

  useEffect(() => {
    if (!visible) {
      return;
    }

    cargarRecordatorios().catch(() => {
      Alert.alert("Error", "No se pudieron cargar los recordatorios.");
    });
  }, [cargarRecordatorios, visible]);

  function limpiarFormulario() {
    setIdEdicion(null);
    setTitulo("");
    setDescripcion("");
    setFecha("");
    setHora("");
  }

  async function guardar() {
    if (!titulo.trim() || !fecha.trim() || !hora.trim()) {
      Alert.alert("Campos requeridos", "Completa el título, fecha y hora.");
      return;
    }

    const datos = {
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      fecha: fecha.trim(),
      hora: hora.trim(),
    };

    try {
      if (idEdicion !== null) {
        await actualizarRecordatorio({
          id: idEdicion,
          ...datos,
        });
      } else {
        await crearRecordatorio(datos);
      }

      limpiarFormulario();
      await cargarRecordatorios();
    } catch {
      Alert.alert("Error", "No se pudo guardar el recordatorio.");
    }
  }

  function editar(recordatorio: Recordatorio) {
    setIdEdicion(recordatorio.id);
    setTitulo(recordatorio.titulo);
    setDescripcion(recordatorio.descripcion);
    setFecha(recordatorio.fecha);
    setHora(recordatorio.hora);
  }

  function confirmarEliminacion(id: number) {
    Alert.alert(
      "Eliminar recordatorio",
      "¿Deseas eliminar este recordatorio?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            await eliminarRecordatorio(id);
            await cargarRecordatorios();

            if (idEdicion === id) {
              limpiarFormulario();
            }
          },
        },
      ]
    );
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.modalContenido}>
          <View style={styles.header}>
            <Text style={styles.tituloPantalla}>Mis recordatorios</Text>
            <Pressable onPress={onClose} style={styles.botonCerrar}>
              <Text style={styles.textoCerrar}>Cerrar</Text>
            </Pressable>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Título"
            value={titulo}
            onChangeText={setTitulo}
          />

          <TextInput
            style={[styles.input, styles.descripcion]}
            placeholder="Descripción"
            value={descripcion}
            onChangeText={setDescripcion}
            multiline
          />

          <View style={styles.fila}>
            <TextInput
              style={[styles.input, styles.campoFecha]}
              placeholder="AAAA-MM-DD"
              value={fecha}
              onChangeText={setFecha}
            />

            <TextInput
              style={[styles.input, styles.campoHora]}
              placeholder="HH:MM"
              value={hora}
              onChangeText={setHora}
            />
          </View>

          <Pressable style={styles.botonGuardar} onPress={guardar}>
            <Text style={styles.textoBoton}>
              {idEdicion !== null ? "Actualizar" : "Crear recordatorio"}
            </Text>
          </Pressable>

          {idEdicion !== null && (
            <Pressable style={styles.botonCancelar} onPress={limpiarFormulario}>
              <Text style={styles.textoCancelar}>Cancelar edición</Text>
            </Pressable>
          )}

          <FlatList
            data={recordatorios}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.lista}
            ListEmptyComponent={<Text style={styles.vacio}>No existen recordatorios.</Text>}
            renderItem={({ item }) => (
              <View style={styles.tarjeta}>
                <Text style={styles.tituloRecordatorio}>{item.titulo}</Text>
                <Text>{item.descripcion}</Text>
                <Text style={styles.fecha}>{item.fecha} · {item.hora}</Text>

                <View style={styles.acciones}>
                  <Pressable style={styles.botonEditar} onPress={() => editar(item)}>
                    <Text style={styles.textoBoton}>Editar</Text>
                  </Pressable>

                  <Pressable
                    style={styles.botonEliminar}
                    onPress={() => confirmarEliminacion(item.id)}
                  >
                    <Text style={styles.textoBoton}>Eliminar</Text>
                  </Pressable>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    padding: 12,
  },
  modalContenido: {
    backgroundColor: "#F5F5F8",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  tituloPantalla: {
    fontSize: 24,
    fontWeight: "700",
    color: "#3A145E",
  },
  botonCerrar: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  textoCerrar: {
    color: "#8A1A72",
    fontWeight: "700",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D8D8E0",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  descripcion: {
    minHeight: 70,
    textAlignVertical: "top",
  },
  fila: {
    flexDirection: "row",
    gap: 10,
  },
  campoFecha: {
    flex: 2,
  },
  campoHora: {
    flex: 1,
  },
  botonGuardar: {
    backgroundColor: "#8A1A72",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  botonCancelar: {
    padding: 12,
    alignItems: "center",
  },
  textoBoton: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  textoCancelar: {
    color: "#8A1A72",
    fontWeight: "600",
  },
  lista: {
    paddingTop: 16,
    paddingBottom: 24,
  },
  tarjeta: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  tituloRecordatorio: {
    fontSize: 17,
    fontWeight: "700",
    color: "#3A145E",
    marginBottom: 5,
  },
  fecha: {
    marginTop: 8,
    color: "#666675",
  },
  acciones: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  botonEditar: {
    flex: 1,
    backgroundColor: "#5B2A86",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  botonEliminar: {
    flex: 1,
    backgroundColor: "#C73737",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  vacio: {
    textAlign: "center",
    color: "#666675",
    marginTop: 20,
  },
});
