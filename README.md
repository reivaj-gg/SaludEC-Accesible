# SaludEC

Portal de servicios públicos de salud del Ecuador — atención primaria, vacunación, salud mental y emergencias (MSP, IESS, ECU 911). Proyecto académico de la asignatura **Usabilidad y Accesibilidad (ISWD732)**, Escuela Politécnica Nacional.

**Sitio en producción:** https://vitaprevent-b2e34.web.app

---

## Usabilidad y accesibilidad

SaludEC adopta el enfoque *accessibility-first*: cada componente se diseña para cumplir con los principios **POUR** (Perceptible, Operable, Comprensible, Robusto) desde el inicio, sin añadir accesibilidad como capa posterior.

### Conformidad WCAG 2.2 Nivel AA

El sitio cumple sustancialmente con WCAG 2.2 Nivel AA. La declaración formal de conformidad está disponible en `/accesibilidad`.

| Herramienta de evaluación | Resultado |
|---|---|
| Lighthouse Accessibility | 100 / 100 |
| axe DevTools | 0 violaciones |
| WAVE | 0 errores |
| NVDA + Chrome (navegación por teclado) | Sin barreras detectadas |

### Criterios clave implementados

**Principio 1 — Perceptible**
- `1.1.1` Texto alternativo único y descriptivo por artículo; imagen diferenciada por sección (no se repite la misma foto en la misma página)
- `1.3.1` Uso de HTML5 semántico: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`; contenido WYSIWYG renderizado como HTML semántico (jerarquía de encabezados preservada para lectores de pantalla)
- `1.3.2` Orden de lectura coherente con el orden visual
- `1.3.3` Instrucciones no dependen únicamente de forma, color o posición
- `1.4.1` El color nunca es el único medio de transmitir información
- `1.4.3` Contraste mínimo 4.5:1 en texto normal; relación real de hasta 17.9:1
- `1.4.4` Texto redimensionable hasta 200 % sin pérdida de funcionalidad
- `1.4.10` Reflow: contenido usable a 320 px de ancho sin scroll horizontal
- `1.4.11` Contraste de componentes de interfaz ≥ 3:1
- `1.4.12` Espaciado de texto ajustable sin pérdida de contenido

**Principio 2 — Operable**
- `2.1.1` Toda la funcionalidad disponible por teclado; sin trampas de foco
- `2.1.2` Focus trap en menú móvil y modal (Escape libera el foco)
- `2.3.1` Ningún contenido parpadea más de 3 veces por segundo
- `2.4.1` SkipLink «Saltar al contenido principal» visible al recibir foco; Biblioteca añade segundo skip link hacia los filtros
- `2.4.2` `document.title` actualizado en cada ruta con formato `«Sección | SaludEC»`
- `2.4.3` Foco se mueve al primer ítem del menú móvil al abrirlo; al modal al activarlo; regresa al disparador al cerrarlo
- `2.4.4` Texto de enlace descriptivo; flechas tipográficas envueltas en `aria-hidden`
- `2.4.7` Indicador de foco visible con `:focus-visible` en todos los elementos interactivos
- `2.4.11` Foco no oculto por elementos superpuestos
- `2.5.3` Etiqueta visible coincide con el nombre accesible de cada control

**Principio 3 — Comprensible**
- `3.1.1` `lang="es"` declarado en `<html>`
- `3.2.1` Sin cambios de contexto al recibir foco
- `3.3.1` Errores identificados y descritos en texto en formulario de contacto
- `3.3.2` Etiquetas e instrucciones presentes en todos los campos

**Principio 4 — Robusto**
- `4.1.2` Nombre, rol y valor disponibles para todos los componentes interactivos vía WAI-ARIA (`aria-expanded`, `aria-current`, `aria-live`, `aria-label`, `aria-hidden`, `role`)
- `4.1.3` Mensajes de estado anunciados con `aria-live="polite"`

### Criterios con cumplimiento parcial

| Criterio | Estado | Alternativa documentada |
|---|---|---|
| 2.5.7 Movimientos de arrastre | Parcial | Cubo 3D usa arrastre; la navegación por Navbar cubre el mismo contenido |
| 3.2.6 Ayuda consistente | Parcial | Contacto en footer; enlace contextual pendiente en módulos de salud |

### Usabilidad

- Diseño *mobile-first* con breakpoints en 480 px, 768 px y 1024 px
- Menú hamburguesa accesible con `aria-expanded` y gestión de foco (WCAG 2.4.3)
- `prefers-reduced-motion`: animaciones desactivadas para usuarios con sensibilidad al movimiento
- `prefers-color-scheme`: preparado para modo oscuro
- Breadcrumbs en todas las páginas interiores para orientación del usuario
- Skeleton screens durante la carga de datos Firestore (evita saltos de layout)
- Formulario de contacto con validación en tiempo real y resumen de errores accesible
- Renderizado adaptivo: detecta contenido HTML (editor WYSIWYG) vs. Markdown y aplica el renderizador correspondiente

---

## Módulos del portal

| Ruta | Sección | Contenido |
|---|---|---|
| `/` | Inicio | Hero con estadísticas nacionales de salud, cubo 3D y últimas noticias |
| `/atencion-primaria` | Atención Primaria | Artículos sobre nutrición, alimentación y salud pública |
| `/vacunacion` | Vacunación | Calendario PAI infantil, esquemas para adultos y adultos mayores |
| `/salud-mental` | Salud Mental | Bienestar emocional, mindfulness y gestión del estrés |
| `/emergencias` | Emergencias | Prevención de enfermedades crónicas, chequeos preventivos, ECU 911 |
| `/biblioteca` | Biblioteca | Recursos digitales: infografías, guías PDF, videos y podcasts |
| `/noticias` | Noticias | Feed paginado de actualidad en salud pública del Ecuador |
| `/contacto` | Contacto | Formulario accesible con validación en tiempo real |
| `/nosotros` | Nosotros | Equipo, misión, visión y valores |
| `/accesibilidad` | Accesibilidad | Declaración de conformidad WCAG 2.2 AA con matriz completa |

> Las rutas anteriores (`/nutricion`, `/actividad-fisica`, `/prevencion`) redirigen automáticamente a las nuevas mediante `<Navigate replace>`.

---

## Arquitectura técnica

### Stack

| Capa | Tecnología | Versión |
|---|---|---|
| Frontend | React + Vite | 19 / 6 |
| Enrutamiento | React Router | v6 (createBrowserRouter) |
| Base de datos | Firebase Firestore | SDK v11 |
| Autenticación | Firebase Auth | Email/Password |
| Hosting | Firebase Hosting | Plan Spark (gratuito) |
| CI/CD | GitHub Actions | Workflow en `.github/workflows/` |
| Estilos | CSS personalizado con tokens | Sin framework CSS |

### Patrón de arquitectura

SPA (*Single Page Application*) con las siguientes capas:

```
src/
├── components/       # Componentes reutilizables (layout, UI, accesibilidad)
│   └── layout/       # Navbar, Footer, PageWrapper, AdminShell, SkipLink
├── pages/            # Una carpeta por ruta (código + CSS colocalizados)
├── services/         # Capa de acceso a Firestore (artículos, noticias, recursos)
├── config/           # Rutas, constantes globales (SITE_NAME, SITE_SLOGAN)
├── context/          # AuthContext para sesión de admin
└── hooks/            # Hooks personalizados (useArticulos, useNoticias, etc.)
```

### Rendimiento

- Code splitting por ruta con `React.lazy` + `Suspense`
- Imágenes Unsplash con parámetros `?w=700&auto=format&fit=crop` (optimización CDN)
- `preload` de fuentes Inter y Merriweather para reducir FOUT
- Lighthouse Performance: ≥ 90

### Administración

Panel en `/admin` (requiere autenticación Firebase):

- CRUD completo de artículos, noticias y recursos con editor WYSIWYG
- Estadísticas de contenido en tiempo real (Firestore listeners)
- Botón «Limpiar base de datos»: normaliza imágenes de todos los artículos con asignación única por sección (`cleanup.service.js`)

---

## Desarrollo local

```bash
# 1. Clonar e instalar
git clone https://github.com/zeuspyEC/VitaPrevent.git
cd VitaPrevent
npm install

# 2. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con las credenciales de Firebase

# 3. Servidor de desarrollo
npm run dev

# 4. Build de producción
npm run build
```

### Variables de entorno requeridas (`.env.local`)

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

### Despliegue manual

```bash
npm run build
firebase deploy --only hosting --project vitaprevent-b2e34
```

El despliegue automático ocurre en cada push a `main` mediante GitHub Actions.

---

## Equipo

| Nombre | Rol principal | GitHub |
|---|---|---|
| Erick Costa | Coordinador / Frontend Lead | [@zeuspyEC](https://github.com/zeuspyEC) |
| Jonathan Tipán | Diseño de interfaz / UX | [@michaelTipan](https://github.com/michaelTipan) |
| Javier Quilumba | Accesibilidad / Documentación | — |

**Escuela Politécnica Nacional · Ingeniería en Ciencias de la Computación · 2026**
Asignatura: Usabilidad y Accesibilidad — ISWD732 GR3SW
