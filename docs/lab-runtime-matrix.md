# Matriz operativa de herramientas y entornos por laboratorio

**Estado:** valores por defecto para preparar y ejecutar el piloto; no constituye evidencia de que los laboratorios se hayan ejecutado. Registrar los valores reales en una copia de `docs/lab-evidence-template.md` por ejecución.

## Reglas comunes

- **Entorno del sitio y validadores:** Node.js 22 o superior (coherente con `engines` en `package.json` y CI en Node.js 22/24), npm y dependencias fijadas por `package-lock.json`. Usar `npm ci` y después `npm run check` para validar el repositorio del curso. Esto valida el sitio y los contratos de datos, no los experimentos con modelos ni el trabajo de los alumnos. Los entornos didácticos de cada laboratorio pueden tener requisitos propios, que deben indicarse por separado.
- **Entorno del alumno:** el runtime del repositorio candidato, fijado por ese proyecto. No cambiar versiones ni actualizar dependencias solo para hacer pasar el ejercicio; registrar incompatibilidades como bloqueos.
- **Herramienta de IA:** opcional salvo que el objetivo del caso requiera observar una salida de modelo. No exigir una suscripción de pago. Registrar proveedor, modelo, versión y parámetros cuando se conozcan; anotar «no disponible» cuando no se expongan.
- **Aislamiento:** usar repositorios de práctica, directorios temporales, datos sintéticos y credenciales ficticias. No conectar a producción, no subir secretos y no permitir acciones externas por defecto.
- **Evidencia:** registrar commit, versiones, comandos, resultados observados y casos no evaluables. No sustituir resultados ausentes por estimaciones ni llamar «verificado» a un ejercicio que solo se haya revisado documentalmente.

## Matriz por laboratorio

| Laboratorio | Entorno y herramientas por defecto | Qué debe medirse o verificarse | Límite / condición de bloqueo |
|---|---|---|---|
| LAB-01 — Caracterización de modelo | Interfaz de modelo disponible para el participante; fixture versionada; hoja de registro. No se impone proveedor. | Salidas por caso, corrección, cumplimiento de esquema, abstención, respeto de instrucciones y variabilidad; modelo/parámetros cuando sean visibles. | Si no se dispone de un modelo ejecutable, puede inspeccionarse la fixture pero el experimento queda bloqueado, no verificado. |
| LAB-02 — Especificación | Editor de texto, repositorio de curso y plantilla de evidencia; IA opcional. | Requisitos, exclusiones, preguntas bloqueantes, criterios de aceptación, condiciones de parada y revisión adversarial. | Si la especificación necesita contexto oral no documentado, la prueba de autonomía no pasa. |
| LAB-03 — Contexto A/B | Mismo modelo/interfaz y conjunto de casos para ambas variantes; registro de resultados. | Cambiar una variable cada vez; exactitud, omisiones, afirmaciones sin soporte, latencia y coste solo cuando se puedan medir. | Si no se pueden mantener constantes las condiciones o faltan salidas originales, declarar la comparación no concluyente. |
| LAB-04 — Desarrollo y revisión | Git y el runtime declarado por el repositorio candidato; para el ejemplo de normalización, Node.js 20+ es el entorno didáctico previsto. | Commit base/final, diff, pruebas antes/después, casos positivos, negativos, borde y regresión; revisión por persona distinta de quien implementó. | Sin línea base ejecutable o sin posibilidad de revisar el diff, no declarar reproducibilidad ni aceptación. |
| LAB-05 — Agentes y herramientas | Workspace temporal; comandos allowlisted; permisos de sistema de archivos y red controlados por el entorno, no solo por el prompt. | Operaciones permitidas y denegadas, límites de tiempo, efectos secundarios, intentos de acceso a secretos y recuperación. | Si no hay sandbox o control externo real de permisos, realizar análisis de diseño solamente y marcar la prueba de aislamiento como no ejecutada. |
| LAB-06 — Harness y gates | Scripts de validación locales o CI de práctica; artefactos sintéticos con commit y digest identificables. | Casos de aprobación/rechazo, identidad del artefacto, evidencia del mismo commit, autorización y bloqueo de publicación. | No conectar el ejercicio a despliegues productivos. Una tabla o simulación no demuestra enforcement real. |
| LAB-07 — Testing y evals | Fixture de evaluación versionada; ejecutor de casos; hoja de puntuación y revisión humana. | Fórmula, datos ausentes, mínimos por dimensión, fallos críticos y consistencia entre puntuación automática y revisión. | Las salidas sintéticas prueban el cálculo, no la calidad del modelo ni la fiabilidad de evaluadores reales. |
| LAB-08 — Seguridad | Modelo de amenazas y entorno aislado, con casos adversariales inocuos y datos sintéticos. | Rechazos esperados, controles externos, ausencia de efectos no autorizados, registros y recuperación. | Sin aislamiento comprobable no ejecutar pruebas que puedan afectar a sistemas o datos reales; mantener el estado bloqueado. |
| LAB-09 — Operación y recuperación | Pipeline y entorno de staging/sandbox; telemetría sintética o de un servicio de demostración. | Señales, umbrales, respuesta a fallo controlado, bloqueo de promoción, rollback o recuperación y registro temporal. | Umbrales del ejemplo son didácticos; no trasladarlos a producción sin datos y objetivos de servicio aprobados. |
| LAB-10 — Coste y gobernanza | Fixture de datos sintéticos, hoja de cálculo o script reproducible y calculadora verificable. | Recalcular coste total, productividad neta, defectos, incertidumbre, factores de confusión y criterios de retirada. | Las cifras de fixture no son evidencia empírica; no presentar diferencias sintéticas como ahorro real. |

## Procedimiento de fijación del entorno

1. Seleccionar la revisión exacta del repositorio y comprobar su licencia y contrato de admisión.
2. Registrar sistema operativo, runtime, versión de paquete y comandos de instalación/prueba.
3. Ejecutar la instalación desde cero en un directorio limpio y guardar la salida.
4. Ejecutar la línea base antes de cualquier modificación.
5. Realizar el ejercicio y guardar los resultados originales, el diff y los comandos.
6. Repetir las pruebas de aceptación y los casos negativos relevantes.
7. Registrar dependencias no disponibles, intervenciones manuales, tiempo real y desviaciones.
8. Si un paso crítico no se puede ejecutar, marcarlo como «bloqueado» o «no evaluable»; no sustituir silenciosamente el entorno previsto.

## Relación con otros documentos

- Registro de ejecución: [plantilla de evidencias](lab-evidence-template.md).
- Criterios y estado de ejecución: [plan de validación de laboratorios](lab-validation-plan.md).
- Admisión de repositorios para el proyecto: [proyecto transversal](transversal-project.md).
- Estado de gates y evidencia requerida: [matriz de trazabilidad](traceability.md).
