export type OpcionElectoral = {
  id: number;
  nombre: string;
  porcentaje: number;
  color: string;
  esCandidato: boolean;
};

export const intencionVoto: OpcionElectoral[] = [
  {
    id: 1,
    nombre: "Cevallos",
    porcentaje: 39.4,
    color: "#C4006B",
    esCandidato: true,
  },
  {
    id: 2,
    nombre: "Andrade",
    porcentaje: 23.6,
    color: "#512B81",
    esCandidato: true,
  },
  {
    id: 3,
    nombre: "Villalba",
    porcentaje: 21.2,
    color: "#FF7AB8",
    esCandidato: true,
  },
  {
    id: 4,
    nombre: "Nulo / Blanco",
    porcentaje: 15.8,
    color: "#8A8A8A",
    esCandidato: false,
  },
];

export const porcentajeActasProcesadas = 69.4;