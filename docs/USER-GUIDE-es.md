# Conversor de calibres de piercing y tabla de tallas: guía de usuario

Esta guía explica cómo convertir, medir, calibrar y comparar dimensiones de joyería de piercing entre calibres gauge, milímetros y fracciones de pulgada para perforadores profesionales, aprendices y clientes de estudio.

## Para qué sirve

El conversor de calibres de piercing proporciona correspondencias dimensionales exactas entre los tres sistemas de medida utilizados en la modificación corporal: numeración gauge de alambre, milímetros métricos y pulgadas imperiales (decimales o fraccionarias). Resuelve las discrepancias habituales de tamaño derivadas de las tolerancias de cada fabricante, representa secciones físicas a escala real en pantallas calibradas e identifica piezas sin etiquetar mediante la búsqueda inversa con calibre pie de rey digital.

## A quién está dirigido

Esta herramienta está pensada para:
- Perforadores profesionales que seleccionan el grosor inicial de joyería de primera puesta o determinan el calibre de barras de sustitución en citas de reducción (downsize).
- Aprendices de perforación que estudian las equivalencias de calibre, los orígenes derivados de la American Wire Gauge (AWG) y las zonas típicas de perforación inicial.
- Personal de mostrador y encargados de inventario que comprueban las lecturas del pie de rey con las especificaciones del fabricante.
- Clientes de estudio que desean cerciorarse de que una pieza se ajusta al diámetro cicatrizado de su perforación antes de adquirirla o colocarla.

## Cómo utilizarlo

### Convertir entre gauge, milímetros y pulgadas

1. Diríjase a la sección `Conversor de dimensiones` en la parte superior de la interfaz.
2. Elija un grosor de alambre en el menú desplegable `Seleccionar calibre / dilatación`. La herramienta completa al instante los campos `Milímetros (mm)` y `Pulgadas (in)` con sus valores decimales correspondientes.
3. Si lo prefiere, introduzca una dimensión conocida en cualquiera de los dos campos numéricos. Al escribir un valor en `Milímetros (mm)` se calculan automáticamente las pulgadas decimales y fraccionarias, mientras que al escribir en `Pulgadas (in)` se obtienen los milímetros exactos.
4. Si el valor ingresado coincide con un calibre estándar dentro de las tolerancias habituales, dicho gauge se resalta automáticamente en el menú y en la tabla. Las medidas fuera de las normas estándar muestran la etiqueta `Personalizado`.

### Calibrar la pantalla a escala real

1. Haga clic en `Calibrar escala de pantalla` junto al encabezado de referencia visual para abrir la ventana de calibración.
2. Tome una tarjeta plástica estándar conforme a la norma ISO/IEC 7810 ID-1 (tarjeta bancaria o documento de identidad de 85,60 mm de ancho).
3. Sostenga la tarjeta física plana sobre la superficie de su pantalla, haciéndola coincidir con el recuadro guía.
4. Desplace el control deslizante horizontal hasta que el ancho del recuadro digital coincida exactamente de extremo a extremo con su tarjeta física.
5. Haga clic en `Guardar y aplicar calibración`. El sistema recalcula la densidad de píxeles y actualiza el indicador de estado, pasando de `Valor predeterminado 96 DPI` a su escala calibrada.
6. Para restablecer la escala inicial en cualquier momento, pulse `Restablecer a 96 DPI predeterminados`.

### Inspeccionar la referencia visual circular en tiempo real

1. Observe la ilustración circular en el panel `Referencia visual a escala real` tras seleccionar o escribir una medida.
2. Una vez calibrada la pantalla, el círculo central reproduce el diámetro físico exacto de la sección transversal del alambre seleccionado.
3. Compruebe los cuatro bloques informativos situados junto al círculo visual: `Calibre:`, `Diámetro:`, `Pulgadas:` y `Fracción:`.
4. Si una medida dilatada de gran calibre supera los márgenes del marco de previsualización, la gráfica se reduce proporcionalmente acompañada de una nota aclaratoria para mantener una visualización nítida.

### Búsqueda inversa con calibre pie de rey para piezas sin etiquetar

1. Cierre por completo las mordazas del calibre pie de rey digital y pulse el botón de puesta a cero para establecer la referencia.
2. Coloque las superficies de medición planas en la sección recta y pulida de la barra o aro, limitándose a la zona útil de uso. Evite medir sobre roscas, bolas, terminaciones decorativas o labios acampanados.
3. Tome tres lecturas suaves a lo largo de la barra para verificar que la forma cilíndrica sea homogénea.
4. Desplácese hasta la sección `Mida su propia pieza (búsqueda inversa)` y escriba la lectura en el campo `Grosor medido con calibre (mm):`.
5. Haga clic en `Buscar calibre más cercano`. La aplicación determina el gauge estándar más próximo, señala si la pieza es mayor o menor que el estándar y detalla la diferencia geométrica exacta en milímetros.

### Consultar la tabla de referencia rigurosa

1. Descienda hasta la sección `Tabla de referencia rigurosa de calibres y medidas`.
2. Compare las columnas de consulta: `Calibre / Medida`, `AWG derivado`, `Milímetros habituales`, `Pulgadas aprox.`, `Fracción común más cercana` y `Zonas típicas de perforación inicial`.
3. Preste atención a las filas con doble valor en milímetros (como 10G, 2G y 00G), las cuales reflejan discrepancias reales entre fabricantes reconocidos del sector.
4. Pulse sobre cualquier fila de la tabla para cargar inmediatamente sus medidas en el conversor y actualizar el círculo visual a escala real.

### Incrustar el conversor en el sitio web de su estudio

1. Haga clic en el botón `Incrustación gratuita` en la barra superior de navegación.
2. Revise el fragmento de código iframe adaptable facilitado en la ventana modal.
3. Haga clic en `Copiar código de inserción` para guardar el código en el portapapeles, o en `Descargar archivo HTML` para obtener una versión completa y autónoma que funciona sin conexión.
4. Pegue el código del iframe en el gestor de contenidos de la página web de su estudio sin necesidad de claves API ni cuotas de suscripción.

## Qué no hace

- No calcula la longitud útil de las barras, el diámetro interior de los aros ni el margen anatómico necesario para la inflamación tisular. Para evaluar la longitud adecuada y el ajuste según la zona, utilice el [Jewelry Size Visualizer](https://poliinternational.com/jewelry-size-visualizer/).
- No realiza seguimiento de los calendarios de cicatrización, protocolos de cuidado ni avisos para el cambio de barra (downsize). Para la gestión paso a paso de la recuperación, utilice el [Healing Tracker](https://poliinternational.com/healing-tracker/).
- No analiza certificados de colada siderúrgica, análisis de composición química ni expedientes de biocompatibilidad de aleaciones. Para la verificación de titanio y acero de grado implante, consulte [Material Certification](https://poliinternational.com/material-certification-checker/).

## Dónde residen sus datos

Todos los cálculos, configuraciones de calibración y preferencias de interfaz se ejecutan exclusivamente en el navegador web de su dispositivo. Los parámetros de calibración de pantalla y la elección de modo oscuro se conservan en el almacenamiento localStorage de su navegador bajo claves específicas. Ninguna medida introducida, ningún parámetro del dispositivo y ningún dato de carácter personal se transmiten a servidores externos ni a terceros. Si limpia los datos de navegación o borra el almacenamiento local, la escala de calibración regresa al valor estándar de 96 DPI. Si descarga el archivo HTML autónomo mediante el panel de inserción, dicho archivo incorpora la totalidad del código y opera con plena funcionalidad sin conexión a internet.

## Impresión y exportación

La herramienta incluye una función de impresión adaptada al entorno de trabajo del estudio:
1. Haga clic en `Imprimir tabla mural de 1 página` situado al pie de la tabla de referencia.
2. En el cuadro de diálogo de impresión de su sistema operativo, fije la escala al 100% (desactive opciones como "Ajustar a la página" o "Reducir para ajustar").
3. Seleccione papel estándar en formato A4 o US Letter e inicie la impresión.
4. Al terminar, sitúe una regla física graduada sobre la `Barra de comprobación de 50 mm` impresa. Si mide con precisión 50 mm, toda la tabla mural de calibres coincide exactamente con la escala física 1:1.

## Preguntas y respuestas

### ¿Qué medida en milímetros tiene un piercing de 16 gauge?

Una joya de piercing estándar de 16 gauge (16G) tiene un diámetro nominal de 1,2 mm (valor teórico derivado de AWG de 1,291 mm, equivalente aproximadamente a 3/64 de pulgada). Es el calibre comúnmente empleado en perforaciones de cartílago como hélix, tragus, conch, daith y rook, así como en ceja y aleta nasal.

### ¿Por qué el 00G se indica tanto en 9,5 mm como en 10,0 mm?

Los fabricantes de joyería corporal emplean distintas normas de referencia para el 00 gauge: las escalas procedentes del sistema americano AWG sitúan el 00G entre 9,26 mm y 9,5 mm (3/8 de pulgada), mientras que los fabricantes europeos y de base métrica redondean la medida a 10,0 mm exactos. Dado que una diferencia de 0,5 mm puede provocar desgarros tisulares al colocar la pieza en un lóbulo dilatado, la tabla expone ambas medidas y aconseja revisar el empaque del fabricante.

### ¿Cómo mido la barra de una joya con un calibre pie de rey digital?

Cierre por completo las mordazas del calibre digital y presione el botón de puesta a cero para establecer la referencia. Coloque las superficies de medición planas alrededor de la parte media del vástago útil, comprobando que el instrumento quede perpendicular al eje de la joya. Realice tres mediciones suaves a lo largo de la barra evitando roscas, esferas de cierre y elementos decorativos.

### ¿Cómo funciona la calibración de pantalla con una tarjeta?

Los monitores y dispositivos móviles presentan densidades de píxeles heterogéneas, por lo que 100 píxeles en una pantalla no ocupan la misma distancia física que en otra. Al ajustar el recuadro digital a una tarjeta estándar ISO/IEC 7810 ID-1 (cuya anchura internacional mide exactamente 85,60 mm), la aplicación calcula con exactitud la relación de píxeles por milímetro de su monitor.

### ¿Un número de gauge mayor indica más o menos grosor?

En el sistema de calibres gauge, un número más alto representa un alambre más delgado. Por ejemplo, una joya de calibre 20 gauge tiene un grosor de 0,8 mm, mientras que un calibre 14 gauge mide 1,6 mm. Una vez superado el tamaño 00 gauge (aproximadamente 9,5 mm a 10,0 mm), el sector abandona la escala gauge y especifica las piezas directamente en milímetros o fracciones de pulgada.

### ¿Cuál es la diferencia entre el estándar AWG y los calibres de piercing?

La American Wire Gauge (AWG) es una norma clásica de ingeniería desarrollada para trefilar conductores metálicos por estiramiento progresivo. La industria del piercing adoptó la numeración por costumbre profesional, aunque redondeó los valores métricos resultantes (como 1,2 mm para 16G y 1,6 mm para 14G) para dotar de coherencia clínica al instrumental y a las agujas en todo el mundo.

### ¿Puedo incrustar gratis este conversor en el sitio web de mi estudio?

Sí, pulsando el botón de incrustación se obtiene un fragmento de código iframe adaptable que cualquier estudio de tatuaje o perforación puede publicar en su sitio web. La herramienta integrada es completamente gratuita, funciona sin registrar usuarios, no utiliza cookies de seguimiento y no devenga costes de licencia.

### ¿Qué calibre inicial se utiliza en piercings de cartílago?

Las perforaciones en el cartílago de la oreja como hélix, tragus, flat, conch y rook se efectúan habitualmente en 16 gauge (1,2 mm) o 14 gauge (1,6 mm). Emplear estos grosores en lugar de alambres más finos de 18G o 20G proporciona estabilidad mecánica a la joya, reduce el riesgo de efecto hilo cortante sobre el tejido sometido a tensión y favorece una cicatrización adecuada.

## Límites

Esta herramienta proporciona cálculos matemáticos y referencias normalizadas de taller, pero en ningún caso puede sustituir la valoración clínica de la anatomía humana. No puede determinar el margen de inflamación necesario durante la sesión inicial, la elasticidad tisular, la irrigación sanguínea, la curvatura del cartílago ni la capacidad individual de curación. La elección de las dimensiones finales de la joya siempre debe quedar en manos de un perforador profesional cualificado que evalúe presencialmente al cliente, examine la zona y considere el ángulo y las particularidades del procedimiento.
