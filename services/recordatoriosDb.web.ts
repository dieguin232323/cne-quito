export interface Recordatorio {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
}

export type NuevoRecordatorio = Omit<Recordatorio, "id">;

let recordatorios: Recordatorio[] = [];

export async function inicializarRecordatoriosDb(): Promise<void> {}

export async function crearRecordatorio(
  recordatorio: NuevoRecordatorio
): Promise<number> {
  const id = Date.now();

  recordatorios.push({
    id,
    ...recordatorio,
  });

  return id;
}

export async function listarRecordatorios(): Promise<Recordatorio[]> {
  return [...recordatorios].sort((a, b) =>
    `${a.fecha} ${a.hora}`.localeCompare(`${b.fecha} ${b.hora}`)
  );
}

export async function actualizarRecordatorio(
  recordatorio: Recordatorio
): Promise<void> {
  recordatorios = recordatorios.map((item) =>
    item.id === recordatorio.id ? recordatorio : item
  );
}

export async function eliminarRecordatorio(id: number): Promise<void> {
  recordatorios = recordatorios.filter((item) => item.id !== id);
}