# Lista de revisión manual de accesibilidad — WCAG 2.2 AA

**Estado:** instrumento de revisión; no afirma que se haya realizado una auditoría ni que el sitio cumpla WCAG 2.2 AA.  
**Alcance:** páginas públicas del curso, navegación, módulos, tablas, bloques de código, enlaces y materiales de laboratorio.

## Registro de la sesión

- **Commit / versión revisada:** [SHA]
- **Fecha y zona horaria:** [ISO 8601]
- **Persona revisora:** [identificador]
- **Sistema operativo y versión:** [valor]
- **Navegador y versión:** [valor]
- **Viewport / dispositivo:** [dimensiones, modelo si aplica]
- **Zoom / escala de texto:** [100 %, 200 %, 400 %]
- **Lector de pantalla y versión:** [NVDA/Firefox, VoiceOver/Safari, TalkBack/Chrome u otro; anotar no probado]
- **Herramientas automáticas:** [nombre y versión]
- **Limitaciones de la sesión:** [navegadores, dispositivos o ayudas técnicas no disponibles]

Para cada punto, marca **Pasa**, **Falla** o **No probado** y enlaza evidencia reproducible. «No probado» nunca equivale a «pasa».

## 1. Teclado y foco

- [ ] Toda la navegación y todos los controles se pueden usar sin ratón.
- [ ] El orden de tabulación sigue el orden visual y lógico; no hay saltos inesperados.
- [ ] El foco es visible en enlaces, controles y elementos interactivos.
- [ ] El enlace para saltar al contenido principal funciona y es visible al recibir foco.
- [ ] No existen trampas de teclado; se puede entrar y salir de menús y controles.
- [ ] Enter y Espacio activan los controles según su semántica.
- [ ] El foco no queda oculto por cabeceras fijas, banners u otros elementos.
- [ ] Al cambiar de página, el foco y el título permiten identificar el nuevo contexto.
- [ ] La navegación móvil y los menús, si los hay, se pueden abrir, recorrer y cerrar con teclado.

## 2. Estructura semántica y lector de pantalla

- [ ] El idioma principal de cada página se identifica correctamente.
- [ ] El título de la página es único, descriptivo y se anuncia correctamente.
- [ ] Hay un encabezado principal claro y la jerarquía de encabezados no omite niveles sin motivo.
- [ ] Las regiones principales (navegación, contenido principal y pie) se reconocen por su semántica.
- [ ] Los enlaces tienen nombre accesible que describe su propósito fuera de contexto cuando sea necesario.
- [ ] Los iconos decorativos no generan anuncios redundantes; los iconos funcionales tienen nombre accesible.
- [ ] Las imágenes informativas tienen texto alternativo útil; las decorativas no duplican contenido.
- [ ] Las tablas tienen encabezados asociados y un título o contexto comprensible.
- [ ] Las listas, citas, código y énfasis conservan semántica útil en el árbol de accesibilidad.
- [ ] Los bloques de código se pueden leer y recorrer sin perder el contexto.
- [ ] No hay errores de marcado que rompan la lectura o la navegación semántica.

## 3. Contraste, color y estados

- [ ] El texto normal alcanza contraste mínimo 4,5:1 y el texto grande 3:1.
- [ ] Los límites de controles, iconos funcionales e indicadores visuales necesarios alcanzan 3:1 frente a colores adyacentes.
- [ ] El foco, los estados seleccionados y los errores no se comunican únicamente mediante color.
- [ ] Enlaces y controles se distinguen sin depender solo del color.
- [ ] Los estados de hover, foco, activo, visitado y deshabilitado siguen siendo identificables.
- [ ] La información se conserva en modo de alto contraste o colores forzados, cuando esté disponible.

Registrar herramienta, elemento, colores, relación de contraste y captura o referencia de cada fallo.

## 4. Ampliación, reflujo y diseño adaptable

- [ ] Con zoom al 200 % no se pierde contenido ni funcionalidad.
- [ ] A 400 % de zoom o viewport equivalente a 320 CSS px, el contenido se refluye sin desplazamiento horizontal de página innecesario.
- [ ] Las tablas o bloques de código que requieren desplazamiento horizontal tienen un contenedor identificable y no desplazan el resto de la página.
- [ ] Los encabezados, menús, cuadros y enlaces no se solapan ni quedan cortados.
- [ ] El contenido se puede leer con orientación vertical y horizontal salvo que una orientación sea esencial.
- [ ] No se requiere desplazamiento en dos dimensiones para leer texto normal.
- [ ] El cambio de tamaño del texto no oculta botones, enlaces, instrucciones o mensajes.

## 5. Espaciado y legibilidad

- [ ] El contenido tolera cambios de espaciado de texto equivalentes a interlineado 1,5; espacio entre párrafos 2 veces el tamaño de fuente; espaciado entre letras 0,12 em y entre palabras 0,16 em.
- [ ] No se recortan líneas ni se solapan elementos al aplicar esos ajustes.
- [ ] Los párrafos, listas, instrucciones y criterios de aceptación son legibles y tienen una estructura clara.
- [ ] Los términos técnicos, acrónimos y abreviaturas relevantes se explican en su primer uso o en un glosario.

## 6. Interacción, enlaces y materiales del curso

- [ ] Los enlaces llevan al destino esperado y su texto no depende de expresiones vagas como «aquí» cuando el destino no es evidente.
- [ ] Los enlaces externos se identifican cuando la salida del sitio puede sorprender al usuario.
- [ ] Las instrucciones de laboratorio no dependen solo de capturas, color, sonido o gestos.
- [ ] Las órdenes de terminal, ejemplos JSON y código se pueden seleccionar, leer y copiar.
- [ ] Las tablas de aceptación siguen siendo comprensibles en un viewport estrecho y con lector de pantalla.
- [ ] Las rutas de navegación permiten identificar dónde está el usuario y volver a una sección anterior.
- [ ] Los controles táctiles cumplen el tamaño mínimo aplicable de WCAG 2.2 AA o documentan la excepción pertinente.
- [ ] Los mensajes de error o bloqueo explican qué ocurrió y qué acción segura puede realizarse a continuación.

## 7. Movimiento, tiempo y estabilidad

- [ ] No hay destellos que superen los límites de seguridad aplicables.
- [ ] Las animaciones no esenciales respetan la preferencia de movimiento reducido.
- [ ] El contenido no desaparece por temporizadores inesperados.
- [ ] Los cambios de contenido no provocan saltos de foco o pérdida de posición sin explicación.
- [ ] La navegación y la lectura siguen funcionando tras recargar una página y volver desde un enlace interno.

## 8. Incidencias y retest

Usa una fila por incidencia. No marques un grupo completo como aprobado si quedan controles relevantes sin probar.

| ID | Punto / criterio | Estado | Página y pasos de reproducción | Impacto | Evidencia | Corrección / responsable | Retest |
|---|---|---|---|---|---|---|---|
| A11Y-01 | [criterio] | No probado | [URL, pasos] | [crítico/alto/medio/bajo] | [captura, log o referencia] | [acción y responsable] | [fecha/estado] |

## Criterio de cierre

- No declarar la revisión completada si hay controles obligatorios sin probar.
- Resolver o aceptar formalmente cada incidencia con responsable, justificación y riesgo residual.
- Repetir los pasos afectados tras la corrección y registrar el commit revisado.
- No afirmar conformidad WCAG 2.2 AA solo por pasar el chequeo estructural de CI o una herramienta automática.
- Si no se dispone de lector de pantalla, teclado, contraste o reflujo, dejarlo como limitación explícita.

## Referencias

- [W3C — WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [W3C WAI — Easy Checks](https://www.w3.org/WAI/test-evaluate/easy-checks/)
