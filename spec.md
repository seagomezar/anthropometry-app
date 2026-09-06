# Spec: Referenced Somatotype Form & Mobile View Refactoring

## Objective
Refactor both the **Form View** (`ReferencedSomatotypeEdit` & `ReferencedSomatotypeCreate`) and ensure **Mobile Responsiveness** across all views according to the designs exported from Stitch (`formulario_de_somatotipo`, `formulario_de_somatotipo_desktop`, `detalle_de_somatotipo`, `detalle_de_somatotipo_desktop`, and `somatotype_vitality_system`).

## Tech Stack & Design Tokens
- Framework: React 19, React Admin 5 (`<Create>`, `<Edit>`, `<SimpleForm>`, `useRecordContext`, `useTranslate`).
- UI & Styling: MUI v9 (`@mui/material`), CSS Grid/Flexbox, custom design system tokens from `somatotype_vitality_system/DESIGN.md`:
  - Primary Blue: `#005ea4` / `#0284c7`
  - Secondary Teal: `#006874` / `#10b981`
  - Tertiary Purple: `#6d45b0` / `#865fcb`
  - Surface Low: `#f2f4f6`
  - Font Families: `Manrope`, `Inter`, `JetBrains Mono`

## Layout & Component Requirements

### 1. Form View (Edit & Create)
- **Header**: `REGISTRO DE DATOS` / `Datos Fisiológicos` with `NUEVA ENTRADA` pill tag.
- **Sport Input**: Bento-card container with `FitnessCenterIcon` and styled text input.
- **Gender Selection**: Responsive pill-toggle / SelectInput supporting `Masculino` (true) and `Femenino` (false).
- **Componentes del Somatotipo Section**:
  - 3 Input Cards: Endomorfo (`bloodtype` badge), Mesomorfo (`fitness_center` badge), Ectomorfo (`height` badge).
- **Coordenadas Cartesianas Section**:
  - Eje X (`x`) & Eje Y (`y`) numerical inputs.
- **Live Preview Section (Desktop)**:
  - Dynamic Somatocarta SVG preview updated in real-time as `x` and `y` change.
  - Profile Analysis (Balance Muscular & Nivel de Adiposidad).
- **Actions**: `GUARDAR` primary button, `ELIMINAR MEDICIÓN` error button (Edit mode), and Mobile Floating Save Action Button (FAB).

### 2. Mobile View Responsiveness
- **Detail View (`ReferencedSomatotypeShow`)**: Single-column stacked bento cards, responsive Somatocarta SVG, touch-friendly buttons, and hero banner.
- **Form View (`ReferencedSomatotypeForm`)**: Mobile single-column stacked layout with floating save button at bottom-right.

## Testing Strategy
- Unit tests in Vitest for `ReferencedSomatotypeForm.test.jsx`, `ReferencedSomatotypeEdit.test.jsx`, and `ReferencedSomatotypeCreate.test.jsx`.
- Production build validation (`npm run build`).

## Success Criteria
1. Form views match `formulario_de_somatotipo` (mobile) and `formulario_de_somatotipo_desktop` (desktop) pixel-for-pixel.
2. Detail views match `detalle_de_somatotipo` (mobile) and `detalle_de_somatotipo_desktop` (desktop).
3. All Vitest tests pass 100%.
4. Clean production build via `npm run build`.
