# 📄 Service Detail Page - Documentación

## Descripción General

Página de detalle de servicio completa que muestra toda la información de un servicio específico cuando el usuario hace clic desde la lista de servicios o categorías.

## 🎯 Ruta

```
/services/[id]
```

**Ejemplos:**

- `/services/srv-001` → Fugas de Agua
- `/services/srv-002` → Instalación Eléctrica
- `/services/srv-003` → Pintura de Interiores

## 🏗️ Arquitectura

### Separación de Capas

```
┌─────────────────────────────────────────────┐
│           PRESENTACIÓN (UI)                 │
│  - ServiceHero, ServiceDetails, etc.        │
│  - Componentes puros (props → JSX)         │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│           LÓGICA (Hooks)                    │
│  - useServiceDetail, useProviders           │
│  - useReviews                               │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│           DATOS (JSON Mock)                 │
│  - services.json, providers.json            │
│  - reviews.json                             │
└─────────────────────────────────────────────┘
```

### Estructura de Archivos

```
app/services/[id]/
└── page.tsx                          # Orquestador principal

components/service-detail/
├── ServiceHero.tsx                   # Hero con imagen e info
├── ServiceDetails.tsx                # Detalles y características
├── ProvidersList.tsx                 # Lista de proveedores
├── ReviewsSection.tsx                # Reseñas y ratings
├── ServiceCTA.tsx                    # CTA final
└── ServiceDetailSkeleton.tsx         # Loading state

components/
├── ReviewCard.tsx                    # Card de reseña (reutilizable)
└── ProviderCard.tsx                  # Card de proveedor (reutilizable)

hooks/
├── useServiceDetail.ts               # Obtener servicio por ID
├── useProviders.ts                   # Obtener proveedores
└── useReviews.ts                     # Obtener reseñas

data/
├── services.json                     # Servicios (ya existía)
├── providers.json                    # Proveedores (nuevo)
└── reviews.json                      # Reseñas (nuevo)
```

## 🧩 Componentes Principales

### 1. ServiceHero

**Propósito:** Hero section con información principal

**Props:**

```typescript
{
  service: Service;
  onStartRequest: () => void;
}
```

**Características:**

- Layout 2 columnas (responsive)
- Gradiente azul de fondo
- Imagen del servicio (aspect-ratio 4:3)
- Badge de categoría
- Rating con estrellas
- Precio formateado según tipo
- Tags del servicio
- Botón CTA principal

**Diseño:**

- Desktop: imagen izquierda, info derecha
- Mobile: stack vertical

---

### 2. ServiceDetails

**Propósito:** Información detallada y características

**Props:**

```typescript
{
  service: Service;
}
```

**Muestra:**

- Descripción extendida del servicio
- 4 características destacadas con iconos:
  - ✓ Servicio Certificado
  - 🛡️ Garantía Incluida
  - ⏱️ Respuesta Rápida
  - 🏆 Alta Calificación
- Disponibilidad por días (pills interactivas)

**Features Grid:**

- 2 columnas en desktop
- 1 columna en mobile
- Iconos de Lucide React

---

### 3. ProvidersList

**Propósito:** Mostrar profesionales que ofrecen el servicio

**Props:**

```typescript
{
  providers: ProviderData[];
  isLoading: boolean;
}
```

**Comportamiento:**

- Se oculta si no hay proveedores
- Muestra skeleton mientras carga
- Grid 2 columnas (responsive)
- Cada proveedor en ProviderCard

---

### 4. ReviewsSection

**Propósito:** Reseñas y calificaciones

**Props:**

```typescript
{
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  isLoading: boolean;
}
```

**Características:**

- Promedio visual grande (ej: 4.8/5)
- Distribución de estrellas con barras de progreso
- Lista de hasta 5 reseñas
- Botón "Ver todas" si hay más de 5
- Estado vacío si no hay reseñas

**Layout:**

- Desktop: resumen en 3 columnas
- Mobile: stack vertical

---

### 5. ServiceCTA

**Propósito:** CTA final para conversión

**Props:**

```typescript
{
  onContactClick: () => void;
}
```

**Características:**

- Fondo gradiente azul
- Iconos decorativos
- Texto motivacional
- Botón grande con hover effects
- Mensaje de garantía

---

## 🪝 Custom Hooks

### useServiceDetail(serviceId)

Obtiene los datos de un servicio por ID desde `services.json`.

**Retorna:**

```typescript
{
  service: Service | null;
  isLoading: boolean;
  error: Error | null;
}
```

**Comportamiento:**

- Simula delay de 600ms
- Retorna `null` si no encuentra el servicio
- Maneja errores de carga

---

### useProviders(serviceId)

Obtiene proveedores que ofrecen un servicio desde `providers.json`.

**Retorna:**

```typescript
{
  providers: ProviderData[];
  isLoading: boolean;
  error: Error | null;
}
```

**Filtrado:**
Busca proveedores donde `serviceIds` incluya el `serviceId` actual.

---

### useReviews(serviceId)

Obtiene reseñas de un servicio desde `reviews.json`.

**Retorna:**

```typescript
{
  reviews: Review[];
  isLoading: boolean;
  error: Error | null;
}
```

**Filtrado:**
Busca reseñas donde `serviceId` coincida.

---

## 📊 Estados de la Página

### 1. Loading State

```tsx
<ServiceDetailSkeleton />
```

- Skeletons animados para todas las secciones
- Gradiente de fondo para hero
- Placeholders para contenido

### 2. Error State

- Icono de alerta rojo
- Mensaje de error descriptivo
- Botón "Intentar de nuevo"

### 3. Not Found State

- Icono de alerta amarillo
- Mensaje "Servicio no encontrado"
- Botón "Volver al inicio"

### 4. Success State

- Renderiza todas las secciones
- Oculta ProvidersList si está vacía
- Muestra ReviewsSection (con estado vacío si no hay reseñas)

---

## 🎨 Diseño Visual

### Paleta de Colores

```css
/* Usamos design tokens */
--color-primary: #012c5b          /* Azul oscuro */
--color-primary-dark: #004a9a     /* Azul más oscuro */
--color-primary-light: #0066cc    /* Azul claro */
--color-primary-low: #9bccfd      /* Azul muy claro */
```

### Tipografía

```css
/* Headings */
.heading-xl    /* Hero title - 48px */
/* Hero title - 48px */
.heading-lg    /* Section titles - 36px */
.heading-md    /* Subsections - 30px */
.heading-sm    /* Card titles - 24px */

/* Body */
.body-lg       /* 18px - descriptions */
.body-base     /* 16px - normal text */
.body-sm; /* 14px - metadata */
```

### Espaciado

```css
/* Sections */
<Section size="md">  /* 64px padding */

/* Cards */
p-6, p-8            /* 24px, 32px padding */

/* Gaps */
gap-4, gap-6, gap-8  /* 16px, 24px, 32px */
```

### Componentes Shadcn

- ✅ Card
- ✅ Badge
- ✅ Button
- ✅ Avatar (vía img tag)

---

## 📱 Responsive Design

### Mobile (< 768px)

- Hero: stack vertical (imagen arriba)
- Features: 1 columna
- Providers: 1 columna
- Reviews: resumen vertical

### Desktop (≥ 768px)

- Hero: 2 columnas (imagen + info)
- Features: 2 columnas
- Providers: 2 columnas
- Reviews: resumen 3 columnas

---

## 🔗 Navegación

### Links Entrantes

```tsx
// Desde ServiceCard
<Link href={`/services/${service.id}`}>
  <ServiceCard service={service} />
</Link>
```

### Links Salientes (Futuros)

- "Ver perfil" en ProviderCard → `/providers/[id]`
- Modales internos (request, contacto)

---

## 🚀 Funcionalidad Futura

### Modales Pendientes

1. **Request Modal**
   - Trigger: "Comenzar request"
   - Formulario de solicitud
2. **Contact Modal**
   - Trigger: "Hablar con especialista"
   - Formulario de contacto rápido

### Backend Integration

Reemplazar hooks mock por:

```typescript
// Con React Query
const { data } = useQuery({
  queryKey: ["service", serviceId],
  queryFn: () => apiClient.getService(serviceId),
});
```

**Endpoints:**

- `GET /api/services/:id`
- `GET /api/services/:id/providers`
- `GET /api/services/:id/reviews`

---

## 📝 Datos Mock

### Estructura: services.json

```json
{
  "id": "srv-001",
  "title": "Fugas de Agua",
  "description": "...",
  "provider": { ... },
  "category": { ... },
  "price": 350,
  "priceType": "fixed",
  "rating": 4.8,
  "reviewCount": 127,
  "tags": ["urgente", "garantía"],
  "availability": ["lunes", "martes"]
}
```

### Estructura: providers.json

```json
{
  "id": "prv-001",
  "name": "Carlos Méndez",
  "experience": "10 años",
  "rating": 4.8,
  "completedJobs": 245,
  "serviceIds": ["srv-001"],
  "avatarUrl": "...",
  "verified": true,
  "bio": "...",
  "specialties": [...]
}
```

### Estructura: reviews.json

```json
{
  "id": "rev-001",
  "serviceId": "srv-001",
  "userId": "user-001",
  "userName": "Juan Pérez",
  "userAvatar": "...",
  "rating": 5,
  "comment": "...",
  "createdAt": "2024-03-15T10:30:00Z"
}
```

---

## ✅ Checklist de Implementación

- ✅ Datos mock (services, providers, reviews)
- ✅ Hooks para data fetching
- ✅ Componentes presentacionales puros
- ✅ ServiceHero con gradiente y CTA
- ✅ ServiceDetails con features
- ✅ ProvidersList con filtrado
- ✅ ReviewsSection con distribución de estrellas
- ✅ ServiceCTA con diseño atractivo
- ✅ Loading state (skeleton)
- ✅ Error handling
- ✅ Not found state
- ✅ Responsive design
- ✅ Design tokens consistency
- ✅ TypeScript tipado completo
- 🚧 Modales (request y contacto) - Pendiente
- 🚧 React Query - Pendiente
- 🚧 Tests - Pendiente

---

## 🎯 Principios Aplicados

1. ✅ **Separación de capas:** UI → Hooks → Data
2. ✅ **Componentes puros:** Props in, JSX out
3. ✅ **TypeScript:** Tipado completo
4. ✅ **Design tokens:** Variables CSS consistentes
5. ✅ **Modularidad:** Componentes pequeños y reutilizables
6. ✅ **Loading states:** UX durante carga
7. ✅ **Error handling:** Manejo de errores claro
8. ✅ **Responsive:** Mobile-first design

---

## 🔍 Ejemplo de Uso

```tsx
// Navegación automática desde ServiceCard
// El usuario hace clic en cualquier servicio

// URL: /services/srv-001
// ↓
// useServiceDetail('srv-001') obtiene datos
// ↓
// Renderiza:
// - Hero con imagen y datos
// - Detalles y características
// - 2 proveedores disponibles
// - 4 reseñas (promedio 4.8)
// - CTA para contactar
```

---

## 📚 Recursos

- **Design Tokens:** `DESIGN_TOKENS.md`
- **Componente Section:** `components/Section.tsx`
- **Shadcn UI:** https://ui.shadcn.com/
- **Lucide Icons:** https://lucide.dev/

---

**Última actualización:** 14 de octubre de 2025  
**Estado:** ✅ Funcional con datos mock  
**Próximos pasos:** Implementar modales de request y contacto
