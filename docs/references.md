# Referencias técnicas por módulo

**Última revisión de enlaces y alcance:** 2026-10-17.  
**Propósito:** ofrecer fuentes primarias y marcos reconocidos para ampliar los temas del curso. Esta lista no sustituye el juicio técnico, no implica respaldo comercial y no convierte una recomendación en un requisito universal.

Antes de aplicar una referencia a un proyecto, comprueba la versión vigente, el ámbito de aplicación y la licencia. Las páginas de proveedores describen sus propias herramientas; las normas y marcos voluntarios no sustituyen obligaciones legales o políticas de la organización.

## M01 — Modelos, capacidades y límites

- [NIST AI Risk Management Framework (AI RMF 1.0)](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10) — marco voluntario para identificar, medir y gestionar riesgos de sistemas de IA.
- [NIST AI RMF resources](https://www.nist.gov/itl/ai-risk-management-framework/ai-risk-management-framework-resources) — recursos relacionados, incluido el perfil de IA generativa.

**Uso didáctico:** separar calidad observada en casos concretos de afirmaciones generales sobre un modelo; registrar límites, incertidumbre y contexto de evaluación.

## M02 — Especificación de tareas y diseño

- [Google Engineering Practices: Code Review](https://google.github.io/eng-practices/review/) — principios para cambios acotados y revisión orientada a la calidad del cambio.
- [GitHub Docs: About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews) — proceso y estados de revisión de cambios.

**Uso didáctico:** convertir peticiones ambiguas en alcance, criterios observables, preguntas bloqueantes y condiciones de parada antes de implementar.

## M03 — Ingeniería de contexto

- [Anthropic Engineering: Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) — selección y mantenimiento de contexto para agentes con ventanas limitadas.
- [NIST AI RMF resources](https://www.nist.gov/itl/ai-risk-management-framework/ai-risk-management-framework-resources) — marco complementario para documentar riesgos y límites.

**Uso didáctico:** comparar estrategias con tarea y criterios constantes; distinguir fuentes vigentes, material obsoleto y entradas no confiables. La publicación de Anthropic es una perspectiva de proveedor, no una norma independiente.

## M04 — Desarrollo asistido y revisión de código

- [GitHub Docs: About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews) — revisión explícita de diffs y decisiones de integración.
- [Node.js test runner](https://nodejs.org/api/test.html) — documentación oficial de pruebas integradas en Node.js, cuando ese sea el runtime elegido.

**Uso didáctico:** registrar línea base, pruebas positivas/negativas/regresión y revisión independiente; no tratar una explicación del asistente como evidencia de que el cambio funciona.

## M05 — Agentes, herramientas y delegación

- [OWASP GenAI Security Project: Top 10 for LLM and GenAI](https://genai.owasp.org/initiative/owasp-top-10-for-llm-and-genai/) — riesgos actuales de sistemas generativos y agentes; consultar la edición vigente.
- [GitHub Docs: Secure use reference](https://docs.github.com/en/actions/reference/security/secure-use) — ejemplo concreto de privilegios mínimos, secretos y seguridad de automatizaciones.

**Uso didáctico:** tratar el prompt como una guía, no como una frontera de seguridad; aplicar permisos fuera del modelo y comprobar operaciones permitidas y denegadas.

## M06 — Harness y control de ejecución

- [GitHub Docs: Secure use reference](https://docs.github.com/en/actions/reference/security/secure-use) — controles de permisos, secretos y flujos de trabajo.
- [NIST Secure Software Development Framework (SSDF)](https://csrc.nist.gov/Projects/ssdf) — prácticas para integrar seguridad en el ciclo de desarrollo.

**Uso didáctico:** vincular cada gate a evidencia del mismo commit y artefacto, denegar por defecto y separar elegibilidad técnica de autorización de despliegue.

## M07 — Testing, evals y verificación

- [NIST AI RMF 1.0](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10) — enfoque de riesgo y evaluación contextual.
- [OpenAI API docs: Working with evals](https://developers.openai.com/api/docs/guides/evals) — ejemplo específico de evaluación de salidas mediante criterios definidos.

**Nota de vigencia (revisada el 17-10-2026):** la documentación de OpenAI indica que la plataforma Evals pasa a solo lectura el 31 de octubre de 2026 y tiene cierre programado para el 30 de noviembre de 2026. Trátala como referencia histórica, no como dependencia para nuevos proyectos; consulta el aviso vigente antes de cualquier uso. El laboratorio es agnóstico al proveedor y no requiere esa API.

**Uso didáctico:** versionar casos, rúbricas y umbrales antes de puntuar; conservar salidas originales, evidencias y fallos críticos sin ocultarlos con una media.

## M08 — Seguridad y gestión de riesgos

- [OWASP GenAI Security Project: Top 10 for LLM and GenAI](https://genai.owasp.org/initiative/owasp-top-10-for-llm-and-genai/) — riesgos de seguridad de LLM y sistemas agentivos.
- [MITRE ATLAS](https://atlas.mitre.org/) — base de conocimiento de tácticas y técnicas adversarias contra sistemas de IA.
- [NIST AI RMF Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) — publicación oficial AI 600-1, perfil de gestión de riesgos para IA generativa.

**Uso didáctico:** modelar activos y límites de confianza; relacionar amenazas con controles y pruebas; no ejecutar pruebas adversariales sobre sistemas sin autorización y aislamiento.

## M09 — CI/CD, observabilidad y mantenimiento

- [Google SRE Workbook](https://sre.google/workbook/table-of-contents/) — prácticas de fiabilidad, respuesta a incidentes y operación.
- [Google SRE Book](https://sre.google/sre-book/table-of-contents/) — fundamentos de ingeniería de fiabilidad y sistemas operables.
- [GitHub Docs: Secure use reference](https://docs.github.com/en/actions/reference/security/secure-use) — seguridad de los flujos de automatización.

**Uso didáctico:** registrar señales, decisiones y revisiones de artefactos; definir recuperación y pruebas de regresión antes de considerar un incidente resuelto.

## M10 — Productividad, costes y gobernanza

- [NIST AI RMF 1.0](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10) — gobernanza, medición y gestión de riesgos.
- [NIST Generative AI Profile (AI 600-1)](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) — publicación oficial AI 600-1, perfil de gestión de riesgos para IA generativa.
- [DORA research](https://dora.dev/research/) — investigación sobre rendimiento de entrega de software y prácticas organizativas.

**Uso didáctico:** medir entregas aceptadas, defectos, esfuerzo humano y coste total; comparar ventanas y criterios equivalentes; no extrapolar datos sintéticos a resultados empíricos.

## Cómo citar y mantener estas referencias

- Cita la fuente junto a la afirmación concreta que respalda; no uses una lista general como sustituto de la procedencia de un dato específico.
- Registra título, organización/autores, versión o fecha cuando exista, URL y fecha de consulta.
- Distingue normas, marcos voluntarios, documentación de producto, publicaciones de ingeniería y resultados de investigación.
- Revisa enlaces y versiones antes de cada nueva edición del curso. Los enlaces vivos pueden cambiar, redirigir o quedar obsoletos.
- No copies texto protegido en los materiales del curso más allá de citas breves justificadas; resume con palabras propias y respeta licencias.
