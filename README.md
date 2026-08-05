# App CNE Quito — Elecciones Seccionales 2027

**Autor:** Diego Alejandro Chicaiza Quimi — Desarrollador 1 (Líder de Infraestructura y Navegación)
**Asignatura:** Dispositivos Móviles — Universidad Central del Ecuador
**Docente:** Ing. Diego Noguera
**Año:** Quito, agosto de 2026

## Aviso de datos ficticios

Todos los datos, candidatos, movimientos políticos, porcentajes y resultados usados en esta aplicación son **FICTICIOS** y de uso exclusivamente académico. No representan a personas, organizaciones ni procesos electorales reales. La aplicación **no debe publicarse en tiendas ni difundirse fuera del aula**.

## Stack técnico

| Elemento | Versión |
| --- | --- |
| Framework | Expo SDK 57 (React Native 0.86.2, React 19.2.3) |
| Runtime | Node.js LTS 24.19.0 |
| Ejecución | Expo Go en teléfono físico |
| Navegación | expo-router 57 (bottom tabs) |
| Iconos | @expo/vector-icons (Ionicons) |
| Lenguaje | TypeScript (TSX) |

## Instalación y ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar el bundler (leer el QR con Expo Go)
npx expo start

# 3. Si el teléfono y el PC están en redes distintas
npx expo start --tunnel
```

Diagnóstico rápido: `npx expo-doctor` · limpiar caché: `npx expo start -c`

## Estructura de carpetas

```
cne-quito/
  app/
    _layout.tsx              Stack raiz (Tema 2)
    index.tsx                Splash Screen del CNE (Tema 2)
    (tabs)/
      _layout.tsx            Barra inferior de 3 pestanas (Tema 3)
      home.tsx               Pestana Home (Tema 4)
      candidatos.tsx         Pestana Candidatos (Tema 6)
      estadisticas.tsx       Pestana Estadisticas (Tema 7)
  components/                Componentes reutilizables (Tema 4+)
  data/                      Datos ficticios (Tema 6+)
  services/                  Consumo de datos remotos (Tema 8)
  db/                        SQLite local (Tema 8)
  theme/colors.ts            Paleta institucional
  assets/logo-cne.png        Logo del CNE
```

## Tabla criterio del examen -> archivo

| Criterio | Descripcion | Archivo donde se cumple | Estado |
| --- | --- | --- | --- |
| 1 | Splash con logo, indicador de carga y paso automatico al Home | `app/index.tsx`, `app/_layout.tsx`, `app.json` | Completado (Tema 2) |
| 2 | Barra inferior con 3 pestanas navegando | `app/(tabs)/_layout.tsx` | Completado (Tema 3) |
| 3 | Home: bienvenida, resumen y donde votar | `app/(tabs)/home.tsx` + `components/` | Pendiente (Tema 4-5) |
| 4 | Min. 3 candidatos con imagen y propuesta | `app/(tabs)/candidatos.tsx` + `components/CandidatoCard.tsx` | Pendiente (Tema 6) |
| 5 | Diagrama de barras de intencion de voto y lider | `app/(tabs)/estadisticas.tsx` + `data/intencion.ts` | Pendiente (Tema 7) |
| 6 | Componentes reutilizados y organizacion | `components/`, `data/`, `theme/` | En construccion (Temas 4-8) |
| 7 | Repositorio, commits y README | `README.md`, git | Pendiente (Tema 8) |
| 8 | Correo con enlace y PDF | — | Pendiente (Tema 8) |
| 9 | Defensa en Expo Go | — | Pendiente (Tema 8) |

## Capturas de pantalla

> Se agregan las capturas reales tomadas en el telefono al avanzar los temas.

- **Splash:** `assets/capturas/splash.png`
- **Home:** `assets/capturas/home.png`
- **Candidatos:** `assets/capturas/candidatos.png`
- **Estadisticas:** `assets/capturas/estadisticas.png`

# Capturas de Pantalla

| Splash | Home |
| :-: | :-: |
| ![Splash](assets/capturas/Splash.jpeg) | ![Home](assets/capturas/Home.jpeg) |

| Candidatos | Estadísticas |
| :-: | :-: |
| ![Candidatos](assets/capturas/Candidatos.jpeg) | ![Estadísticas](assets/capturas/Estadísticas.jpeg) |