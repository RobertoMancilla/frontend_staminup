# Sistema de Design Tokens - Stamin-Up

Este documento describe el sistema de design tokens implementado en la aplicación. Todos los tokens están definidos en `app/globals.css`.

## 🎨 Colores

### Variables CSS

```css
--color-primary: #012c5b
--color-primary-dark: #004a9a
--color-primary-light: #0066cc
--color-background: #ffffff
--color-background-secondary: #f9fafb
--color-text-primary: #012c5b
--color-text-secondary: #6b7280
--color-text-muted: #9ca3af
--color-success: #10b981
--color-warning: #f59e0b
--color-error: #ef4444
--color-border: #e5e7eb
--color-border-light: #f3f4f6
```

### Clases de Utilidad

```css
.text-primary        /* color: var(--color-primary) */
/* color: var(--color-primary) */
.text-primary-dark   /* color: var(--color-primary-dark) */
.text-secondary      /* color: var(--color-text-secondary) */
.text-muted          /* color: var(--color-text-muted) */
.bg-primary          /* background: var(--color-primary) */
.bg-primary-dark     /* background: var(--color-primary-dark) */
.bg-secondary; /* background: var(--color-background-secondary) */
```

### Uso en Tailwind (con var())

Para colores que no tienen clase de utilidad:

```tsx
className = "bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]";
className = "text-[var(--color-text-secondary)]";
```

---

## 📝 Tipografía

### Tamaños de Fuente

```css
--font-size-xs: 0.75rem    /* 12px */
--font-size-sm: 0.875rem   /* 14px */
--font-size-base: 1rem     /* 16px */
--font-size-md: 1.125rem   /* 18px */
--font-size-lg: 1.25rem    /* 20px */
--font-size-xl: 1.5rem     /* 24px */
--font-size-2xl: 1.875rem  /* 30px */
--font-size-3xl: 2.25rem   /* 36px */
--font-size-4xl: 3rem      /* 48px */
```

### Pesos de Fuente

```css
--font-weight-normal: 400
--font-weight-medium: 500
--font-weight-semibold: 600
--font-weight-bold: 700
```

### Line Heights

```css
--line-height-tight: 1.25
--line-height-normal: 1.5
--line-height-relaxed: 1.75
```

### Clases de Utilidad

**Headings:**

```css
.heading-xl   /* 48px, bold, tight line-height */
/* 48px, bold, tight line-height */
.heading-lg   /* 36px, bold, tight line-height */
.heading-md   /* 30px, bold, tight line-height */
.heading-sm; /* 24px, semibold, normal line-height */
```

**Body Text:**

```css
.body-lg      /* 18px, relaxed line-height */
/* 18px, relaxed line-height */
.body-base    /* 16px, normal line-height */
.body-sm; /* 14px, normal line-height */
```

### Ejemplos de Uso

```tsx
<h1 className="heading-xl text-primary">Título Principal</h1>
<h2 className="heading-lg text-primary-dark">Subtítulo</h2>
<p className="body-lg text-secondary">Texto descriptivo grande</p>
<p className="body-base text-muted">Texto normal</p>
<span className="body-sm text-muted">Texto pequeño</span>
```

---

## 📏 Espaciado

### Variables CSS

```css
--spacing-xs: 0.5rem    /* 8px */
--spacing-sm: 0.75rem   /* 12px */
--spacing-md: 1rem      /* 16px */
--spacing-lg: 1.5rem    /* 24px */
--spacing-xl: 2rem      /* 32px */
--spacing-2xl: 3rem     /* 48px */
--spacing-3xl: 4rem     /* 64px */
--spacing-4xl: 6rem     /* 96px */
```

### Section Padding

```css
--section-padding-xs: 2rem   /* 32px */
--section-padding-sm: 3rem   /* 48px */
--section-padding-md: 4rem   /* 64px */
--section-padding-lg: 5rem   /* 80px */
```

### Uso

Usar con Tailwind arbitrario o en el componente `<Section>`:

```tsx
<Section size="md">  {/* usa --section-padding-md */}
  {/* contenido */}
</Section>

<div className="p-[var(--spacing-lg)]">
  {/* padding: 24px */}
</div>
```

---

## 🔲 Border Radius

### Variables CSS

```css
--radius-xs: 0.25rem     /* 4px */
--radius-sm: 0.375rem    /* 6px */
--radius-md: 0.5rem      /* 8px */
--radius-lg: 0.75rem     /* 12px */
--radius-xl: 1rem        /* 16px */
--radius-2xl: 1.5rem     /* 24px */
--radius-full: 9999px
```

### Clases de Utilidad

```css
.rounded-xs      /* border-radius: var(--radius-xs) */
/* border-radius: var(--radius-xs) */
.rounded-sm      /* border-radius: var(--radius-sm) */
.rounded-md      /* border-radius: var(--radius-md) */
.rounded-lg      /* border-radius: var(--radius-lg) */
.rounded-xl      /* border-radius: var(--radius-xl) */
.rounded-2xl     /* border-radius: var(--radius-2xl) */
.rounded-full; /* border-radius: var(--radius-full) */
```

### Ejemplos de Uso

```tsx
<Card className="rounded-2xl">
  {/* Card con bordes redondeados grandes */}
</Card>

<Button className="rounded-full">
  {/* Botón con bordes completamente redondeados */}
</Button>

<div className="rounded-lg bg-white p-4">
  {/* Contenedor con bordes medianos */}
</div>
```

---

## 🌑 Sombras

### Variables CSS

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1)
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1)
```

### Clases de Utilidad

```css
.shadow-sm    /* box-shadow: var(--shadow-sm) */
/* box-shadow: var(--shadow-sm) */
.shadow-md    /* box-shadow: var(--shadow-md) */
.shadow-lg    /* box-shadow: var(--shadow-lg) */
.shadow-xl; /* box-shadow: var(--shadow-xl) */
```

### Ejemplos de Uso

```tsx
<Card className="shadow-lg hover:shadow-xl">
  {/* Card con sombra que aumenta en hover */}
</Card>

<div className="shadow-md rounded-xl">
  {/* Contenedor con sombra mediana */}
</div>
```

---

## 🧩 Componente Section

El componente `<Section>` es un wrapper reutilizable que usa los design tokens automáticamente.

### Props

```typescript
interface SectionProps {
  size?: "xs" | "sm" | "md" | "lg"; // Padding vertical
  background?: "white" | "secondary" | "primary" | "gradient";
  containerSize?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  className?: string;
  children: React.ReactNode;
}
```

### Uso

```tsx
import Section, { SectionHeader } from "@/components/Section";

<Section size="md" background="secondary">
  <SectionHeader title="Título de la Sección" subtitle="Descripción opcional" />

  {/* Contenido de la sección */}
  <div className="grid gap-6 md:grid-cols-3">{/* Cards, etc. */}</div>
</Section>;
```

---

## ✅ Mejores Prácticas

### ✓ DO (Hacer)

```tsx
// Usar clases de utilidad cuando estén disponibles
<div className="rounded-2xl shadow-lg">
<h1 className="heading-xl text-primary">
<p className="body-base text-secondary">

// Usar var() para tokens sin clase de utilidad
<div className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]">
```

### ✗ DON'T (No hacer)

```tsx
// ❌ NO usar valores hardcodeados
<div className="rounded-[24px]">          // ❌ Usar rounded-2xl
<div style={{ borderRadius: '24px' }}>   // ❌ Usar clases

// ❌ NO anidar var() en corchetes cuando existe clase
<div className="rounded-[var(--radius-2xl)]">  // ❌ Usar rounded-2xl
<div className="shadow-[var(--shadow-lg)]">    // ❌ Usar shadow-lg

// ❌ NO usar colores hex directamente
<div className="bg-[#012c5b]">  // ❌ Usar bg-primary o bg-[var(--color-primary)]
```

---

## 🔄 Actualizar Design Tokens

Para agregar nuevos tokens:

1. **Agregar variable en `globals.css`:**

```css
:root {
  --color-nuevo: #valor;
}
```

2. **Crear clase de utilidad (si aplica):**

```css
.nombre-clase {
  propiedad: var(--color-nuevo);
}
```

3. **Documentar en este archivo**

4. **Usar en componentes:**

```tsx
<div className="nombre-clase">
// o
<div className="bg-[var(--color-nuevo)]">
```

---

## 📚 Recursos

- **Archivo principal**: `app/globals.css`
- **Componente Section**: `components/Section.tsx`
- **Ejemplos de uso**: Ver componentes en `components/` y `components/home/`
