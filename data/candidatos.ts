export interface Candidato {
  id: string;
  nombre: string;
  iniciales: string;
  movimiento: string;
  dignidad: string;
  edad: number;
  profesion: string;
  binomio?: string;
  propuesta: string;
  ejesCampana: string[];
  color: string;
  foto: any;
}

export const candidatos: Candidato[] = [
  {
    id: "c1",
    nombre: "Dra. Fabiana Espinoza",
    iniciales: "FE",
    movimiento: "Movimiento Vía Ciudadana (Lista 100)",
    dignidad: "Alcaldía de Quito",
    edad: 38,
    profesion: "Ingeniera en Transporte y Urbanismo",
    binomio: "Dr. Luis Fernando Ramos",
    propuesta: "Ampliar el sistema integrado de transporte público con 200 buses eléctricos ecológicos y crear 12 km de ciclovías protegidas interparroquiales para conectar el norte y sur de Quito.",
    ejesCampana: [
      "Movilidad Sostenible e Integrada",
      "Reducción del Tráfico Vehicular",
      "Infraestructura Verde y Ciclovías"
    ],
    color: "#C4006B",
    foto: require("../assets/images/candidato1.png"),
  },
  {
    id: "c2",
    nombre: "Ing. Mauricio Poma",
    iniciales: "MP",
    movimiento: "Frente Unido Andino (Lista 200)",
    dignidad: "Alcaldía de Quito",
    edad: 46,
    profesion: "Ingeniero Civil y Ambiental",
    binomio: "Msc. Gabriel Paredes",
    propuesta: "Ejecutar el Plan de Agua Segura y Alcantarillado Integral para garantizar el 100% de cobertura en 40 barrios periurbanos y vulnerables del Distrito Metropolitano.",
    ejesCampana: [
      "Agua Potable y Alcantarillado 100%",
      "Prevención de Riesgos en Quebradas",
      "Sostenibilidad Ambiental Barrial"
    ],
    color: "#3B1E6E",
    foto: require("../assets/images/candidato2.png"),
  },
  {
    id: "c3",
    nombre: "Msc. Paulina Torres",
    iniciales: "PT",
    movimiento: "Red de Voces Locales (Lista 300)",
    dignidad: "Alcaldía de Quito",
    edad: 42,
    profesion: "Socióloga y Magíster en Políticas Públicas",
    binomio: "Dra. Patricia Jaramillo",
    propuesta: "Construir Centros de Cuidado Infantil y Adulto Mayor con jornada extendida en cada una de las 9 administraciones zonales, impulsando el desarrollo social y laboral de las familias.",
    ejesCampana: [
      "Centros de Cuidado Barrial",
      "Apoyo a Mujeres y Familias Worker",
      "Inclusión Social y Equidad"
    ],
    color: "#009B8E",
    foto: require("../assets/images/candidato3.png"),
  },
  {
    id: "c4",
    nombre: "Lic. Alexander Cárdenas",
    iniciales: "AC",
    movimiento: "Alianza Futuro Seguro (Lista 400)",
    dignidad: "Alcaldía de Quito",
    edad: 39,
    profesion: "Especialista en Seguridad y Tecnología",
    binomio: "Ing. Roberto Salazar",
    propuesta: "Implementación del Plan Seguridad Inteligente: Iluminación LED del 100% de espacios públicos, instalación de 1,200 cámaras con IA y fortalecimiento de Alarmas Comunitarias en barrios.",
    ejesCampana: [
      "Seguridad con Inteligencia Artificial",
      "Iluminación Integral de Parques",
      "Red Comunal de Alarmas 24/7"
    ],
    color: "#D84315",
    foto: require("../assets/images/candidato4.png"),
  },
];
