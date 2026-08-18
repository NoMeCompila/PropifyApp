# 🏡 PropifyApp — Plataforma Inmobiliaria & Marketplace de Propiedades y Terrenos

**Web app desarrollada mediante Spec-Driven Development (SDD) con OpenSpec, utilizando un enfoque de desarrollo integral guiado por IA, feature a feature. El proceso incorpora documentación viva como parte del desarrollo y un sólido aseguramiento de calidad, permitiendo iterar de forma controlada, consistente y correcta sobre la solución.**


**PropifyApp** es una plataforma web moderna e interactiva para la compra, venta, reserva y gestión de inmuebles, terrenos en barrios privados, campos y desarrollos residenciales en Argentina. Combina una experiencia de navegación fluida y minimalista para compradores con un portal de administración integral para vendedores e inmobiliarias.

---

## 📸 Capturas de Pantalla
<p align="center">
<img width="1166" height="968" alt="image" src="https://github.com/user-attachments/assets/afb3d5f5-ff87-4b49-943f-cda7979a3ba3" />
</p>

---

## ✨ Características Principales (Features)

### 🛒 Para Compradores & Visitantes
- **Catálogo Inteligente con Filtros en Cascada:**
  - Selección jerárquica y dinámica de **País $\rightarrow$ Provincia $\rightarrow$ Ciudad** sincronizada en tiempo real con Supabase.
  - Filtros por categoría (Construido / Terreno o Lote), tipo de inmueble, estado, rango de precios (USD / ARS) y buscador por texto libre.
- **Ficha Técnica Detallada del Inmueble:**
  - Galería de imágenes con carga diferida y fallback resiliente.
  - Especificaciones constructivas (dormitorios, baños, cocheras, m² cubiertos/totales) y de terrenos (zonificación, topografía, servicios, tipo de acceso).
  - Integración directa con **WhatsApp** para contactar al vendedor al instante.
- **Agendamiento de Visitas & Solicitud de Reserva:**
  - Modal interactivo para seleccionar fecha y franja horaria de visita.
  - Calculador y formulario de seña/reserva con desglose de métodos de pago (transferencia bancaria, efectivo, etc.).
- **Segregación Estricta de Visibilidad:**
  - El marketplace público muestra de manera exclusiva publicaciones activas (`publicadas`), ocultando borradores, ítems pausados o archivados.

### 💼 Para Vendedores & Agencias Inmobiliarias
- **Autenticación Segura (Supabase Auth):**
  - Registro e inicio de sesión seguro para vendedores e inmobiliarias.
  - Persistencia de sesión y estado de interfaz tras recargar la página (F5).
- **Dashboard de Control:**
  - Resumen de métricas clave: total de publicaciones, consultas sin leer, visitas pendientes y reservas en trámite.
- **Gestión de Inventario (CRUD Completo):**
  - Publicación y edición de inmuebles con selector de categorías y detalles específicos para casas, departamentos o lotes.
  - Subida directa de imágenes fotográficas a **Supabase Storage** con previsualización en vivo.
  - Control de estado de publicación: *Publicada*, *Pausada* o *Archivada*.
- **Bandeja de Interacciones:**
  - Gestión de consultas recibidas con estado de lectura y archivado.
  - Confirmación o rechazo de visitas agendadas por interesados.
  - Aprobación y seguimiento de solicitudes de reserva.

### 🎨 Experiencia de Usuario & Diseño
- **Tema Oscuro y Claro:** Alternancia fluida con persistencia en `localStorage`.
- **Diseño Ultra-Responsivo:** Experiencia adaptada para móviles, tablets y escritorio con barra de navegación inferior móvil.
- **Micro-animaciones:** Transiciones fluidas impulsadas por Motion.

---

## 🛠️ Stack Tecnológico

El desarrollo y arquitectura de PropifyApp se construyó utilizando tecnologías de vanguardia:

- **Frontend & UI:**
  - **[React 19](https://react.dev/):** Componentes funcionales y Hooks modernos.
  - **[TypeScript](https://www.typescriptlang.org/):** Tipado estático estricto para máxima robustez.
  - **[Vite 6](https://vite.dev/):** Entorno de compilación ultrarrápido.
  - **[Tailwind CSS v4](https://tailwindcss.com/):** Sistema de diseño basado en utilidades modernas.
  - **[Lucide React](https://lucide.dev/):** Iconografía minimalista y consistente.
  - **[Motion (Framer Motion)](https://motion.dev/):** Animaciones y transiciones de alto rendimiento.

- **Backend as a Service (BaaS) & Base de Datos:**
  - **[Supabase](https://supabase.com/):** Base de datos PostgreSQL en la nube.
  - **Row Level Security (RLS):** Políticas de seguridad a nivel de fila para control de acceso estricto.
  - **Supabase Auth:** Autenticación y gestión de sesiones.
  - **Supabase Storage:** Almacenamiento público para imágenes de inmuebles.

- **Inteligencia Artificial & Pair Programming:**
  - **[Google Antigravity](https://antigravity.google/):** Entorno de desarrollo agéntico asistido por IA.
  - **Gemini 2.0 Flash / Gemini 2.5 Thinking:** Modelos de lenguaje de Google DeepMind utilizados para la arquitectura de software, generación de código, especificaciones OpenSpec y resolución de incidencias.

- **Deploy & Infraestructura:**
  - **[Vercel](https://vercel.com/):** Despliegue continuo (CI/CD) y hosting del frontend.

---

## 🚀 Puesta en Marcha Local

### 1. Clonar el Repositorio
```bash
git clone https://github.com/NoMeCompila/PropifyApp.git
cd PropifyApp
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto con las credenciales de tu proyecto de Supabase:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_publica_anonima
```

### 4. Iniciar el Servidor de Desarrollo
```bash
npm run dev
```
Abre en tu navegador: `http://localhost:5173`

### 5. Compilar para Producción
```bash
npm run build
```

---

## 🔒 Estructura del Proyecto

```text
PropifyApp/
├── public/                 # Archivos estáticos y favicon
├── src/
│   ├── components/         # Componentes UI (Filtros, Modales, Tarjetas, Header)
│   ├── data/               # Datos base y semillas de ubicación geográfica
│   ├── lib/                # Inicialización del cliente Supabase
│   ├── pages/              # Vistas principales (Catálogo, Detalle, Dashboard, Listings)
│   ├── services/           # Capa de integración y servicios API (Auth, Properties, Locations)
│   ├── types.ts            # Definiciones de TypeScript y modelos del sistema
│   ├── App.tsx             # Componente raíz y enrutamiento contextual
│   ├── main.tsx            # Punto de entrada de React
│   └── index.css           # Configuración de estilos y tema
├── vercel.json             # Configuración de deployment en Vercel
├── package.json
└── README.md
```

---
