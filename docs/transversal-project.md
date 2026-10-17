# Diseño del proyecto transversal — 40 horas

## Estado

**Especificación operativa v1.0 para implementación y piloto.** La línea base curricular reserva 40 horas al proyecto transversal. Para acelerar la ejecución, se adoptan los valores por defecto de este documento; se deben revisar después del piloto antes de convertirlos en política sumativa definitiva. Las decisiones y sus límites quedan versionados aquí.

## Propósito

Integrar las competencias del curso en un trabajo de ingeniería acotado donde el uso de IA se compare con una línea base y las decisiones se justifiquen con evidencia. El objetivo no es maximizar código generado, sino demostrar calidad, verificación, control de riesgos y capacidad de explicar las decisiones.

## Resultados propuestos para validación

Al terminar, el alumno debería poder:

- delimitar un problema y convertirlo en una especificación verificable;
- registrar una línea base antes de introducir cambios asistidos por IA;
- documentar el contexto, las herramientas y las intervenciones humanas relevantes;
- verificar el cambio con pruebas, revisión independiente y controles de seguridad proporcionales;
- comparar resultados, regresiones, esfuerzo de verificación, intervenciones, costes observables y mantenibilidad;
- comunicar límites de la evaluación, riesgo residual y una recomendación argumentada.

Estos resultados son una propuesta de diseño derivada de la descripción del proyecto en `docs/curriculum.md`; deben validarse antes de considerarse criterios curriculares definitivos.

## Distribución de trabajo propuesta

La distribución siguiente suma 40 horas y es orientativa; debe revisarse junto con el proyecto y las condiciones de evaluación.

| Fase | Horas propuestas | Trabajo |
|---|---:|---|
| 1. Selección y delimitación | 4 | Confirmar repositorio, licencia, problema, permisos y alcance |
| 2. Especificación y plan de verificación | 5 | Definir comportamiento esperado, exclusiones, riesgos y pruebas |
| 3. Línea base | 5 | Registrar commit, entorno, pruebas y métricas disponibles antes del cambio |
| 4. Implementación asistida | 10 | Iterar en una rama, registrar contexto y revisar cada cambio |
| 5. Verificación independiente | 7 | Ejecutar pruebas, casos negativos, revisión de diff y controles de seguridad |
| 6. Comparación y análisis | 5 | Comparar línea base y resultado, explicar costes, regresiones y limitaciones |
| 7. Informe y defensa | 4 | Preparar evidencias, recomendación y explicación de decisiones |
| **Total** | **40** | |

No se deben convertir estas horas en límites rígidos ni afirmar que son tiempos validados hasta realizar un piloto con alumnos.

## Decisiones operativas por defecto

Para no bloquear el curso esperando un repositorio único, cada participante selecciona un repositorio existente que cumpla el contrato de admisión. El docente puede ofrecer una opción de reserva, pero no se exige que toda la cohorte trabaje sobre el mismo proyecto.

### Contrato de admisión del repositorio

El repositorio debe: (1) tener licencia explícita compatible con el uso y las modificaciones previstos; se prefieren MIT, BSD-2/3-Clause o Apache-2.0; (2) poder clonarse y probarse sin credenciales personales ni acceso a producción; (3) incluir una forma documentada de ejecutar pruebas, lint o validaciones; (4) permitir delimitar un cambio de bajo o moderado riesgo; (5) no requerir datos personales ni secretos reales; y (6) permitir conservar la evidencia de forma segura. No admitir repositorios sin licencia clara, código propietario sin autorización, servicios críticos ni tareas destructivas.

### Entorno y herramientas

- Registrar sistema operativo, commit base, runtime, dependencias y comandos exactos.
- Usar el runtime que el repositorio seleccionado requiera; preferir versiones LTS soportadas y fijar versiones cuando sea viable.
- La herramienta de IA es opcional para realizar la especificación, las pruebas y la revisión; no se exige una suscripción de pago. Cuando se use IA, registrar proveedor/modelo y versión solo si se conocen, además de las intervenciones relevantes, sin copiar conversaciones privadas completas.
- Ejecutar localmente por defecto. La red, los servicios externos y las acciones que escriben fuera del directorio de trabajo quedan desactivados salvo necesidad documentada y autorización explícita.
- Usar datos sintéticos y credenciales ficticias. No introducir secretos, datos personales innecesarios ni código en servicios no autorizados.
- Si una dependencia o servicio no está disponible, registrar el bloqueo y no declarar una prueba como superada.

### Comparación y evidencias

Comparar el resultado final con la línea base del mismo repositorio y la misma batería de pruebas. No exigir una comparación causal general «con IA vs. sin IA»: si el alumno realiza una comparación de métodos, debe mantener la tarea y los criterios constantes, registrar el orden y declarar los factores de confusión. La evidencia mínima incluye commit base/final, entorno, comandos y salidas, diff, pruebas positivas/negativas pertinentes, revisión independiente y registro de limitaciones. Conservar solo artefactos necesarios y saneados; borrarlos al terminar el periodo docente acordado.

## Evidencias que debería entregar el alumno

1. Especificación del problema, alcance y criterios de aceptación.
2. Identificador del commit base, instrucciones de preparación y resultados iniciales.
3. Registro suficiente de herramientas, modelo/versión cuando esté disponible, contexto relevante e intervenciones humanas, sin incluir secretos.
4. Diff final y justificación de cambios importantes.
5. Resultados de pruebas positivas, negativas y de regresión; explicación de pruebas no ejecutables.
6. Revisión independiente y registro de hallazgos corregidos o aceptados como riesgo residual.
7. Comparación de calidad, regresiones, esfuerzo de verificación, intervención humana, coste observable y mantenibilidad.
8. Informe de limitaciones, riesgos residuales y recomendación.
9. Defensa individual de decisiones y evidencias.

## Condiciones de aceptación propuestas

- El cambio responde a una especificación acordada y el diff permanece dentro del alcance autorizado.
- La línea base y el resultado final son identificables y reproducibles.
- Las afirmaciones principales del informe enlazan con pruebas o evidencias inspeccionables.
- Las pruebas incluyen casos negativos y de regresión apropiados al cambio.
- La revisión independiente no se sustituye por la explicación del modelo.
- Los costes y tiempos no disponibles se declaran como tales; no se fabrican métricas.
- Se declaran las limitaciones de la muestra y no se generaliza más allá de la evidencia.
- No se incluyen credenciales, datos personales innecesarios ni efectos sobre sistemas de producción.

Estos puntos son criterios propuestos para revisión; no constituyen todavía una rúbrica aprobada ni definen por sí solos el aprobado.

## Gates restantes antes del piloto formal

- [ ] Cada repositorio elegido por un participante supera el contrato de admisión y tiene licencia verificada.
- [ ] La persona responsable comunica la herramienta, el entorno y la política de datos aplicables a la cohorte.
- [ ] Se ejecuta el procedimiento de principio a fin en un entorno limpio y se conservan resultados verificables.
- [ ] La rúbrica v1.0 se calibra con al menos dos entregas de muestra; los desacuerdos quedan documentados.
- [ ] El protocolo de privacidad, conservación y eliminación de evidencias se confirma antes de recoger datos de participantes.
- [ ] El piloto registra tiempos y bloqueos reales; ajustar las 40 horas solo con evidencia y explicar la decisión.

## Rúbrica y defensa

Consulta [`docs/transversal-project-rubric.md`](transversal-project-rubric.md) para la rúbrica analítica propuesta, reglas de decisión con fallos críticos no compensables, protocolo de defensa individual y lista de comprobación docente. Está pendiente de aprobación y piloto; no es aún una política sumativa validada.
