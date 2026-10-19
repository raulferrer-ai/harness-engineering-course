# Registro de revisión manual de accesibilidad

**Estado global: No evaluado.** Este registro coordina la revisión; no afirma conformidad con WCAG 2.2 AA ni sustituye la [lista de revisión manual](accessibility-review-checklist.md). No marcar una sección como aprobada sin evidencia de pruebas realizadas.

## Identificación de la revisión

- **Commit exacto:** Pendiente
- **Fecha y zona horaria:** Pendiente
- **Revisor/a:** Pendiente de asignación
- **Sistema operativo y versiones:** Pendiente
- **Navegadores y versiones:** Pendiente
- **Dispositivos / viewports:** Pendiente
- **Tecnologías de asistencia probadas:** Pendiente; registrar expresamente lo no disponible
- **Herramientas automáticas y versiones:** Pendiente
- **Incidencias abiertas:** No evaluadas
- **Decisión de cierre:** BLOQUEADA hasta completar la revisión y resolver o aceptar formalmente las incidencias

## Cobertura por recorrido

Cada fila requiere pasos reproducibles y evidencia enlazada. Usa los estados **No evaluado**, **En revisión**, **Falla**, **Bloqueado** o **Revisado con evidencia**. «Revisado con evidencia» no equivale por sí solo a conformidad total.

| Área | Cobertura mínima | Estado | Evidencia / incidencias |
|---|---|---|---|
| Sitio común | Inicio, navegación principal, enlaces, pie, salto al contenido y títulos | No evaluado | Pendiente |
| Escritorio | Recorrido completo con teclado, foco visible, orden de tabulación y zoom 200 % | No evaluado | Pendiente |
| Móvil / reflujo | Viewport equivalente a 320 CSS px, orientación, solapamientos y controles táctiles | No evaluado | Pendiente |
| Lector de pantalla | Encabezados, regiones, enlaces, listas, tablas, código y cambios de contexto | No evaluado | Pendiente |
| Contraste / estados | Contraste de texto y controles, foco, errores, enlaces y no dependencia exclusiva del color | No evaluado | Pendiente |
| Materiales de laboratorio | Instrucciones, comandos, criterios de aceptación, tablas y mensajes de bloqueo | No evaluado | Pendiente |
| Revisión automática | Resultado del chequeo estructural y herramienta adicional, si se utiliza | No evaluado | Pendiente; el resultado automático no sustituye pruebas manuales |

## Cobertura de los módulos

Revisar las páginas reales del commit identificado; no inferir su accesibilidad a partir de la plantilla ni de un módulo similar.

| Módulo | Contenido | Teclado / foco | Lector de pantalla | Zoom / reflujo | Estado y evidencia |
|---|---|---|---|---|---|
| M01 | Caracterización de modelos | No evaluado | No evaluado | No evaluado | Pendiente |
| M02 | Especificación y diseño | No evaluado | No evaluado | No evaluado | Pendiente |
| M03 | Ingeniería de contexto | No evaluado | No evaluado | No evaluado | Pendiente |
| M04 | Desarrollo asistido y revisión | No evaluado | No evaluado | No evaluado | Pendiente |
| M05 | Agentes, herramientas y delegación | No evaluado | No evaluado | No evaluado | Pendiente |
| M06 | Harness y control de ejecución | No evaluado | No evaluado | No evaluado | Pendiente |
| M07 | Testing, evaluación y verificación | No evaluado | No evaluado | No evaluado | Pendiente |
| M08 | Seguridad y riesgos | No evaluado | No evaluado | No evaluado | Pendiente |
| M09 | CI/CD, observabilidad y mantenimiento | No evaluado | No evaluado | No evaluado | Pendiente |
| M10 | Productividad, costes y gobernanza | No evaluado | No evaluado | No evaluado | Pendiente |

## Registro de incidencias

Añade una fila por defecto y enlaza pasos de reproducción, evidencia, impacto, corrección y retest. No registrar datos personales innecesarios.

| ID | Página / criterio | Estado | Pasos reproducibles | Impacto | Evidencia | Corrección / responsable | Retest |
|---|---|---|---|---|---|---|---|
| A11Y-01 | [criterio] | No evaluado | [pasos] | [impacto] | [referencia] | [acción / responsable] | [fecha / estado] |

## Criterio de cierre

- Las áreas obligatorias y los diez módulos tienen resultados observados y evidencia reproducible.
- Cada elemento no probado se conserva como limitación; no se convierte en «pasa».
- Las incidencias se corrigen y vuelven a probar, o se aceptan formalmente con responsable, justificación y riesgo residual.
- Se registra el commit final revisado y la decisión de una persona responsable.
- No afirmar conformidad WCAG 2.2 AA solo a partir de CI o herramientas automáticas.

## Documentos relacionados

- [Lista de revisión manual WCAG 2.2 AA](accessibility-review-checklist.md)
- [Lista de preparación para publicar](release-readiness-checklist.md)
- [Registro de ejecución práctica de los laboratorios](lab-execution-register.md)
