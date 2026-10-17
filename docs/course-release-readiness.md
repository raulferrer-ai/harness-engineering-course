# Lista de preparación para publicar el curso

Esta lista distingue la compilación técnica de la preparación pedagógica. Una compilación verde demuestra que los controles automatizados definidos se han ejecutado correctamente; no demuestra por sí sola que el curso sea accesible, pedagógicamente eficaz o adecuado para evaluación sumativa.

## 1. Integridad del contenido

- [ ] Los diez módulos enlazan con sus lecciones y laboratorios correspondientes.
- [ ] Cada laboratorio declara objetivo, prerrequisitos, procedimiento, entregables y criterios de aceptación.
- [ ] Los ejemplos resueltos están enlazados desde el material correspondiente y desde el [índice de ejemplos](worked-examples-index.md).
- [ ] Cada módulo enlaza al índice de fuentes técnicas y referencias; la propuesta para las páginas publicadas está en el [PR de referencias](https://github.com/raulferrer-ai/harness-engineering-course/pull/46), pendiente de revisión y publicación.
- [ ] Los datos sintéticos, supuestos y resultados ilustrativos están identificados explícitamente.
- [ ] Las instrucciones no presentan ejemplos simulados como ejecuciones reales ni como resultados de producción.
- [ ] Las decisiones docentes pendientes están marcadas como propuestas, no como políticas aprobadas.

## 2. Verificación técnica

- [ ] Ejecutar `npm ci` desde un entorno limpio.
- [ ] Ejecutar `npm run check` y conservar el enlace a la ejecución de CI correspondiente al commit que se va a publicar.
- [ ] Confirmar que el build termina correctamente y que las rutas generadas esperadas existen.
- [ ] Revisar enlaces internos, navegación principal, páginas de error y recursos estáticos.
- [ ] Verificar que los comandos documentados coinciden con los scripts reales del repositorio.
- [ ] Confirmar que fixtures y validadores detectan al menos un caso válido y los fallos críticos previstos.
- [ ] No declarar un laboratorio validado solo porque su Markdown se renderiza o su fixture pasa un chequeo estructural.

## 3. Accesibilidad y experiencia de uso

- [ ] Navegar todo el sitio solo con teclado; foco visible y orden lógico.
- [ ] Comprobar encabezados, títulos de página, enlaces descriptivos y etiquetas de controles.
- [ ] Revisar contraste, ampliación de texto y ausencia de información transmitida solo por color.
- [ ] Probar diseño adaptable en móvil y escritorio, incluyendo tablas y bloques de código.
- [ ] Comprobar que los errores y estados vacíos ofrecen orientación comprensible.
- [ ] Ejecutar `npm run check:a11y:structure`: comprueba idioma del documento, un único `main` y `h1`, atributos `alt`, IDs no vacíos y únicos, referencias `aria-labelledby` existentes con contenido y nombres accesibles básicos en enlaces generados.
- [ ] Tratar el chequeo estructural como una barrera básica, no como una auditoría WCAG completa; realizar además revisión manual de teclado, contraste, zoom, lector de pantalla y móvil.

## 4. Calidad pedagógica

- [ ] Cada módulo tiene resultados de aprendizaje observables y alineados con las actividades.
- [ ] Las actividades progresan desde comprensión guiada hasta aplicación independiente.
- [ ] Las rúbricas incluyen anclajes observables y ejemplos de evidencia suficiente e insuficiente.
- [ ] Se diferencia lo que comprueba un validador automático de lo que requiere juicio humano.
- [ ] Las estimaciones de horas se contrastan con la carga real antes de presentarlas como validadas.
- [ ] Se ha revisado la consistencia terminológica entre currículo, módulos, laboratorios y rúbricas.

## 5. Seguridad, privacidad y reproducibilidad

- [ ] Los ejemplos no incluyen secretos, tokens, datos personales reales ni instrucciones para actuar sobre sistemas de producción.
- [ ] Los laboratorios de seguridad se ejecutan en entornos autorizados, aislados y desechables.
- [ ] Se especifica qué evidencia conservar, quién puede acceder a ella y cuándo eliminarla.
- [ ] Completar y aprobar la política de datos y la información/consentimiento antes de recoger datos de participantes; la plantilla de participante sigue siendo un borrador.
- [ ] Las instrucciones registran versiones, comandos, entradas relevantes y límites de reproducibilidad.
- [ ] Las pruebas no ejecutadas se declaran como tales; no se inventan salidas ni métricas.
- [ ] Los fallos críticos no pueden compensarse mediante una puntuación media elevada.

## 6. Piloto y decisión de publicación

- [ ] Realizar un piloto con participantes representativos del público objetivo.
- [ ] Preparar la [plantilla de observación](pilot-observation-template.md), la [encuesta de cierre](pilot-exit-survey.md) y la [plantilla de informe de resultados](pilot-results-report-template.md); completarlas solo con datos reales.
- [ ] Recoger tiempos reales, puntos de bloqueo, resultados de aprendizaje y problemas de accesibilidad.
- [ ] Registrar incidencias con severidad, responsable, evidencia y criterio de cierre.
- [ ] Calibrar las rúbricas entre evaluadores y revisar desacuerdos.
- [ ] Aprobar explícitamente las decisiones pendientes del proyecto transversal antes de usarlo como evaluación sumativa.
- [ ] Usar la [plantilla de informe del proyecto transversal](transversal-project-report-template.md) para que las afirmaciones estén vinculadas a evidencias.
- [ ] Registrar la decisión final: publicar, publicar con limitaciones documentadas o bloquear hasta corregir.

## Registro de publicación

| Campo | Valor |
|---|---|
| Commit evaluado | |
| Ejecución de CI | |
| Fecha de revisión | |
| Revisor técnico | |
| Revisor pedagógico | |
| Hallazgos bloqueantes | |
| Limitaciones conocidas | |
| Decisión y responsable | |

## Regla de salida

La publicación se considera técnicamente preparada cuando los controles automatizados definidos pasan para el commit evaluado y no quedan defectos técnicos bloqueantes conocidos. La preparación pedagógica requiere además revisión humana y, para afirmar eficacia o carga real, evidencia de un piloto. Mantener ambos estados separados evita convertir una compilación correcta en una afirmación de calidad que todavía no se ha demostrado.
