# VIGÍA — Dossier técnico para la etapa estatal
### Sistema de monitoreo de salud estructural para puentes
**InnovaTecNM 2026 · Instituto Tecnológico de Chihuahua II · Folio 68283-17**

---

## Índice

1. [Ficha del proyecto](#1-ficha-del-proyecto)
2. [Síntesis del modelo de negocios (etapa local)](#2-síntesis-del-modelo-de-negocios-etapa-local)
3. [Diagnóstico: qué corregir antes de la etapa estatal](#3-diagnóstico-qué-corregir-antes-de-la-etapa-estatal)
4. [Gemelos digitales aplicados a puentes](#4-gemelos-digitales-aplicados-a-puentes)
5. [Tres opciones de prototipo físico](#5-tres-opciones-de-prototipo-físico)
6. [Recomendación y justificación](#6-recomendación-y-justificación)
7. [Lista de materiales con costos estimados](#7-lista-de-materiales-con-costos-estimados)
8. [Pasos de construcción](#8-pasos-de-construcción)
9. [Protocolo de pruebas y validación](#9-protocolo-de-pruebas-y-validación)
10. [Marco normativo y contexto mexicano](#10-marco-normativo-y-contexto-mexicano)
11. [Guion de demostración ante el jurado](#11-guion-de-demostración-ante-el-jurado)
12. [Pendientes y decisiones abiertas](#12-pendientes-y-decisiones-abiertas)

---

## 1. Ficha del proyecto

| Campo | Contenido |
|---|---|
| Nombre corto | VIGÍA |
| Folio | 68283-17 |
| Etapa cursada | Local, Región 1 |
| Categoría registrada | Sector Energético y Electromovilidad |
| Área de aplicación | Aplicaciones de la Electromovilidad y las Energías Renovables |
| Áreas específicas | Implementación e integración funcional de tecnologías existentes |
| Naturaleza técnica | Ciencias Ambientales |
| Descripción corta | Sistema de monitoreo estructural que detecta anomalías mediante sensores en tiempo real para prevenir fallas y mejorar la seguridad estructural |

### Equipo

| Integrante | Carrera | Semestre |
|---|---|---|
| Liliana Edith Sáenz López | Arquitectura | 5 |
| David Santiago López González | Arquitectura | 7 |
| Vanessa Joselyn Lerma Flores | Ing. en Gestión Empresarial | 2 |
| Abil Valentina Sandoval Lugo | Arquitectura | 7 |
| Barbara Valeria Rodríguez Galván | Ing. en Ciberseguridad | 4 |

### Asesores

| Asesor | Correo |
|---|---|
| Héctor Ramón Flores Bernal | hector.fb@chihuahua2.tecnm.mx |
| José Antonio García Escudero | jose.ge@chihuahua2.tecnm.mx |

**Composición del equipo como argumento, no como limitación.** Tres personas de Arquitectura, una de Gestión Empresarial y una de Ciberseguridad. Esa mezcla es justamente la de un equipo de gemelo digital de infraestructura: quien entiende la estructura y su representación tridimensional, quien construye el caso de negocio, y quien asegura la integridad y el resguardo de los datos. Vale la pena decirlo explícitamente en la presentación, porque un jurado podría preguntar por la ausencia de un perfil de electrónica. La respuesta es que el valor de VIGÍA no está en el circuito, está en la interpretación estructural del dato y en la plataforma que lo entrega.

---

## 2. Síntesis del modelo de negocios (etapa local)

### 2.1 Mercado objetivo y cliente potencial

El proyecto se orienta al sector de construcción y gestión de infraestructura, en un contexto de expansión urbana y necesidad de mejorar la conectividad. El mercado objetivo son las organizaciones que participan en el diseño, ejecución, supervisión y mantenimiento de obras civiles, donde la seguridad estructural es un factor determinante de funcionalidad y durabilidad.

**Segmentos identificados:**

- Empresas constructoras especializadas en obra civil
- Desarrolladoras de infraestructura urbana
- Dependencias gubernamentales responsables de planeación y ejecución de obra pública
- Organismos encargados del mantenimiento y operación de infraestructura

**Clientes potenciales directos:** ingenieros estructuristas, supervisores de obra, directores responsables de obra (DRO) y gestores de proyecto, que requieren información confiable y oportuna para tomar decisiones durante el proceso constructivo.

**Extensión de alcance:** además de la etapa constructiva, el sistema se proyecta hacia la etapa de servicio mediante sensores embebidos, generando datos del comportamiento estructural a lo largo del tiempo. El proyecto se plantea escalable a distintos tipos de infraestructura y entornos urbanos.

### 2.2 Estructura de costos, gastos y precio unitario

Componentes de la estructura de costos según el documento local:

| Rubro | Elementos |
|---|---|
| Instrumentación | Galgas extensométricas, acelerómetros MEMS, inclinómetros, sensores de temperatura |
| Adquisición | Módulos DAQ, microcontroladores y electrónica |
| Conexión e instalación | Cableado protegido, canalizaciones, encapsulados para sensores embebidos, materiales de obra |
| Desarrollo | Plataforma SHM, dashboard en tiempo real, sistema de alertas tempranas, almacenamiento y base de datos |
| Puesta en marcha | Configuración, calibración, pruebas y validación en sitio, capacitación de usuarios |
| Operación | Monitoreo remoto, soporte técnico, mantenimiento preventivo y correctivo, actualizaciones, servicios en la nube |

**Cifras declaradas en la etapa local:**

- Sensores de gama intermedia: entre \$1,000 y \$5,000 MXN por unidad
- Inversión inicial estimada del prototipo funcional: entre \$40,000 y \$70,000 MXN, adaptable según dimensiones y necesidades del proyecto

*(La sección 3 propone reencuadrar estas cifras. Ver también la sección 7.)*

### 2.3 Modelo de ingresos

El modelo se basa en la comercialización del sistema más servicios especializados:

1. **Venta e instalación del sistema** — sensores, DAQ, cableado, configuración inicial y puesta en operación de la plataforma. Esquema modular y escalable según dimensión de la obra.
2. **Licenciamiento y suscripción** de la plataforma digital — ingresos recurrentes por monitoreo, almacenamiento de datos y generación de alertas.
3. **Servicios de acompañamiento** — asesoría técnica personalizada, soporte, mantenimiento, actualizaciones y capacitación.
4. **Horizonte a mediano plazo** — incorporación de análisis predictivo basado en inteligencia artificial.

**Canales declarados:** licitaciones y proyectos de obra pública, contacto directo con constructoras e ingenieros, plataformas digitales y redes profesionales, alianzas con despachos de ingeniería.

### 2.4 Bitácora de desarrollo

1. Análisis de necesidades en seguridad estructural; se identificó que la supervisión sigue dependiendo de inspecciones visuales y revisiones periódicas, con limitaciones para detectar anomalías internas o cambios progresivos.
2. Investigación en sistemas de *Structural Health Monitoring* (SHM), instrumentación electrónica aplicada a estructuras y tecnologías usadas internacionalmente en puentes y obra civil de gran escala.
3. Análisis comparativo de sensores considerando precisión, accesibilidad, facilidad de instalación y viabilidad económica. Selección de galgas extensométricas, acelerómetros MEMS e inclinómetros.
4. Definición del sistema de adquisición y transmisión hacia una plataforma digital.
5. Ampliación de alcance hacia monitoreo continuo de estructuras terminadas mediante sensores embebidos en concreto.
6. Revisión de normativas: reglamentos de construcción, normas técnicas complementarias y manuales de seguridad estructural.
7. Desarrollo de la propuesta conceptual integrando sensores, transmisión y plataforma de visualización con gráficas y alertas preventivas.

### 2.5 Modelo Canvas (resumen)

| Bloque | Contenido |
|---|---|
| **Socios clave** | Proveedores de sensores electrónicos, empresas de tecnología y software, constructoras y desarrolladoras, instituciones académicas, dependencias gubernamentales, ingenieros estructuristas |
| **Actividades clave** | Desarrollo de software, instalación de sensores en obra, monitoreo y análisis de datos, generación de alertas, mantenimiento del sistema, capacitación |
| **Recursos clave** | Sensores estructurales, software de monitoreo y análisis, equipo técnico especializado, conocimiento en ingeniería estructural |
| **Propuesta de valor** | Detección temprana de fallas, monitoreo en tiempo real, supervisión continua durante y después de la construcción, sensores embebidos temporales y permanentes, alertas preventivas basadas en datos, reducción de riesgos y costos por fallas, toma de decisiones basada en datos, solución escalable |
| **Relación con el cliente** | Asesoría técnica personalizada, acompañamiento durante instalación, soporte y mantenimiento, capacitación en uso del software |
| **Canales** | Licitaciones y obra pública, contacto directo con constructoras e ingenieros, plataformas digitales y redes profesionales, alianzas con despachos |
| **Segmentos de clientes** | Constructoras de obra civil, desarrolladoras de infraestructura urbana, dependencias gubernamentales, ingenieros y supervisores, empresas de mantenimiento y gestión, operadores de infraestructura crítica (puentes, edificios, vialidades) |
| **Estructura de costes** | Desarrollo de software, adquisición de sensores y hardware, instalación en obra, personal técnico, mantenimiento, I+D, costos operativos |
| **Fuente de ingresos** | Venta del sistema, instalación, licencias de software, mantenimiento y soporte, actualizaciones, monitoreo continuo |

---

## 3. Diagnóstico: qué corregir antes de la etapa estatal

Cinco observaciones sobre el documento de la etapa local. Ninguna es grave, pero todas son cosas que un jurado estatal sí va a notar.

### 3.1 La categoría registrada no corresponde al proyecto

El registro dice **Sector Energético y Electromovilidad**, área de aplicación **Electromovilidad y Energías Renovables**, naturaleza técnica **Ciencias Ambientales**. VIGÍA es monitoreo de salud estructural: no es electromovilidad ni energías renovables, y su naturaleza técnica es ingeniería civil e instrumentación electrónica, no ciencias ambientales.

Esto importa por dos razones. Primero, los jurados suelen evaluar con rúbricas ligadas a la categoría, y si la rúbrica pregunta por impacto en transición energética, VIGÍA sale mal calificado en algo que ni siquiera intenta hacer. Segundo, si un juez lee la ficha antes de la presentación, la incongruencia genera desconfianza desde el primer minuto.

**Acción sugerida:** verificar con los asesores si es posible recategorizar para la etapa estatal hacia algo como desarrollo urbano, infraestructura, TIC o Industria 4.0, según el catálogo de la convocatoria 2026. Si el reglamento no permite cambiarla, entonces construir un puente argumental explícito y honesto: monitoreo estructural aplicado a infraestructura de movilidad, con alimentación autónoma por energía solar en los nodos sensores. La segunda opción es defendible, pero exige que el prototipo efectivamente incluya el módulo solar.

### 3.2 El costo de \$40,000–\$70,000 MXN no es el costo del prototipo

En el documento, esa cifra aparece como *"inversión inicial aproximada para un prototipo funcional"*. Es una cifra alta para un prototipo estudiantil y baja para una instalación real en un puente. Está en tierra de nadie.

**Acción sugerida:** separar en tres cifras distintas y presentarlas en una sola tabla.

| Concepto | Orden de magnitud | Qué es |
|---|---|---|
| Prototipo demostrativo | \$5,000 – \$9,000 MXN | La maqueta instrumentada que se lleva a la etapa estatal (sección 7) |
| Nodo comercial de campo | \$8,000 – \$25,000 MXN por nodo | Sensor de grado industrial, gabinete IP66, alimentación autónoma, comunicación |
| Instalación completa en un puente | \$300,000 MXN a varios millones | Según claro, número de nodos, obra civil de instalación y años de servicio contratados |

Contrastar esto con el costo de un sistema SHM comercial llave en mano, que a nivel internacional se cotiza en decenas o cientos de miles de dólares por estructura. Ahí está el argumento de valor: mismo principio físico de medición, orden de magnitud menos de costo.

### 3.3 Los sensores de \$1,000–\$5,000 MXN por unidad no coinciden con las fotos

Las imágenes del documento muestran un inclinómetro industrial WitMotion, un inclinómetro de un solo eje encapsulado en aluminio y un Arduino Opta (PLC industrial). Son componentes correctos y bien elegidos para un producto real, pero no son la gama de precio declarada, y ninguno es lo que van a poder comprar y montar en unas semanas.

**Acción sugerida:** documentar dos niveles de instrumentación y decir cuál es cuál. El nivel de desarrollo (ESP32, MEMS de consumo, celdas de carga) es el que se construye ahora; el nivel de producto (inclinómetros industriales, DAQ tipo Opta, galgas certificadas) es la ruta de escalamiento. Presentar la tabla de equivalencias sensor-a-sensor entre ambos niveles demuestra que entienden la diferencia, y eso vale más que fingir que ya tienen el equipo caro.

### 3.4 Falta el criterio físico de detección

El documento dice repetidamente *"detecta anomalías"* y *"alertas preventivas"*, pero en ninguna parte define **qué es una anomalía en términos medibles**. Esta es la pregunta que con más probabilidad les van a hacer en la etapa estatal, y es la que separa un proyecto conceptual de uno técnico.

**Acción sugerida:** adoptar y documentar un indicador cuantitativo. La propuesta desarrollada en la sección 5 es el corrimiento de la frecuencia natural, con línea base estadística y compensación térmica. Aunque decidan otro, hay que tener uno escrito, con su fórmula y sus umbrales.

### 3.5 Faltan las fuentes de las imágenes

El documento incluye fotografías de instalaciones reales, un diagrama de instrumentación de un puente atirantado con leyenda en inglés (INC, WSG, LLS, LVD, ACC, MET) y una infografía isométrica. Si son de terceros, hay que acreditarlas; si no, se vuelve un problema de integridad académica que puede costar la etapa completa.

**Acción sugerida:** agregar pies de figura con fuente y liga, o sustituirlas por diagramas propios. La ventaja de tener tres estudiantes de Arquitectura es que pueden producir sus propias láminas isométricas, y unas láminas propias comunican mucho mejor su sistema específico que una infografía genérica.

---

## 4. Gemelos digitales aplicados a puentes

Su intuición es correcta: el gemelo digital es exactamente el marco conceptual donde VIGÍA encaja, y adoptarlo les da vocabulario, estructura y ambición sin cambiar la esencia del proyecto.

### 4.1 Qué es y qué no es

Un **gemelo digital** es una representación virtual de un activo físico, conectada a él por un flujo de datos, que se mantiene sincronizada con el estado real del activo a lo largo de su vida útil.

El concepto tiene raíces en la práctica de la NASA durante el programa Apolo, donde se mantenía en tierra una copia física de la nave para ensayar maniobras y diagnosticar problemas. El término y su formulación moderna se atribuyen a Michael Grieves, en el contexto de la gestión del ciclo de vida del producto a inicios de los 2000, y su adopción en infraestructura civil es mucho más reciente.

Tres componentes son indispensables:

| Componente | En VIGÍA |
|---|---|
| **Entidad física** | El puente (o la maqueta instrumentada) |
| **Modelo virtual** | Modelo geométrico y estructural del puente, con propiedades de rigidez, masa y condiciones de apoyo |
| **Conexión de datos** | Los sensores que alimentan el modelo, y las decisiones que regresan al mundo físico |

**Lo que no es un gemelo digital:** un modelo 3D bonito. Un modelo BIM sin datos en vivo es un modelo, no un gemelo. Un dashboard con gráficas de sensores sin modelo detrás es telemetría, no un gemelo. La palabra "gemelo" exige que el modelo cambie cuando la estructura cambia.

Esa distinción es su oportunidad. Muchos proyectos estudiantiles llaman "gemelo digital" a una visualización 3D. Si ustedes explican por qué eso no lo es, y luego demuestran el ciclo cerrado aunque sea a escala mínima, se colocan por encima del promedio de inmediato.

### 4.2 Niveles de madurez

La literatura de gemelos digitales para activos construidos maneja una progresión de capacidades. Una formulación práctica y fácil de defender:

| Nivel | Capacidad | Pregunta que responde | Alcance realista para ustedes |
|---|---|---|---|
| 1 | **Descriptivo** | ¿Cuál es el estado actual? | Alcanzable con holgura |
| 2 | **Diagnóstico** | ¿Por qué está así y dónde está el problema? | **Objetivo para la etapa estatal** |
| 3 | **Predictivo** | ¿Qué va a pasar y cuándo? | Alcanzable de forma limitada |
| 4 | **Prescriptivo** | ¿Qué conviene hacer al respecto? | Presentar como ruta futura |
| 5 | **Autónomo** | El sistema actúa sin intervención humana | Fuera de alcance, y en infraestructura crítica probablemente indeseable |

Llegar al nivel 2 de forma demostrable es un resultado excelente para una etapa estatal. Prometer el nivel 5 sin evidencia es la manera más rápida de perder credibilidad.

Como marco de referencia citable existe **The Gemini Principles**, publicado en 2018 por el Centre for Digital Built Britain, que propone nueve principios para gemelos digitales de infraestructura organizados en tres grupos: propósito (deben aportar beneficio público, generar valor y dar claridad), confianza (deben ser seguros, abiertos y respetar la calidad de la información) y función (deben ser federables, curados y evolutivos). Citarlo posiciona el proyecto en una conversación internacional seria. También existe la familia **ISO/IEC 30173** sobre conceptos y terminología de gemelos digitales, útil para justificar definiciones.

### 4.3 El mecanismo técnico: calibración del modelo

Aquí está el corazón de la idea, y es más simple de lo que suena.

La frecuencia natural de vibración de una estructura depende de su rigidez y su masa, en una relación aproximada de la forma:

```
f ∝ √(k / m)
```

Cuando un elemento estructural se agrieta, se afloja o se corroe, la rigidez **k** baja. La masa **m** prácticamente no cambia. Por lo tanto la frecuencia natural **baja de forma medible**, muchas veces antes de que exista daño visible a simple vista.

El ciclo del gemelo digital funciona así:

1. Se construye un modelo estructural del puente con las propiedades de rigidez estimadas de diseño.
2. Se miden las frecuencias naturales reales de la estructura sana. Casi nunca coinciden exactamente con el modelo.
3. Se **calibra** el modelo, ajustando parámetros de rigidez hasta que sus frecuencias predichas coincidan con las medidas. Ese modelo calibrado es la línea base, el gemelo.
4. Se sigue midiendo en operación. Si las frecuencias cambian más allá del ruido esperado, se vuelve a calibrar el modelo y se observa **cuál parámetro tuvo que bajar** para explicar el cambio.
5. Ese parámetro señala la zona probable del daño. Eso es diagnóstico, no solo alarma: no dice "algo pasa", dice "la rigidez en la zona 3 bajó aproximadamente un 15 por ciento".

Ese paso 5 es la diferencia entre un sensor con buzzer y un gemelo digital. Y es reproducible en una maqueta.

### 4.4 Limitaciones que conviene declarar ustedes primero

Un jurado técnico va a valorar más que reconozcan estas limitaciones que si las esconden.

- **Poca sensibilidad al daño local pequeño.** El primer modo de vibración de una estructura grande puede cambiar menos del 1 por ciento ante una grieta localizada. Se mitiga midiendo varios modos y usando formas modales, no solo frecuencias.
- **Fuerte sensibilidad a la temperatura.** La variación térmica diaria puede alterar la frecuencia natural de un puente real tanto o más que un daño incipiente. Por eso el sensor de temperatura no es un accesorio: es lo que hace confiable al indicador. Se resuelve construyendo la línea base como una función de la temperatura, no como un número único.
- **No unicidad de la solución inversa.** Distintas combinaciones de pérdida de rigidez pueden producir el mismo corrimiento de frecuencia. Con pocos sensores, la localización del daño es una estimación probable, no una certeza. Más nodos reducen la ambigüedad.
- **Necesita una línea base de estructura sana.** En un puente existente que ya podría estar dañado, no hay línea base histórica. Se compensa con el modelo teórico y con simetría, comparando elementos equivalentes entre sí.

### 4.5 Cómo reposiciona esto la propuesta de valor

| Propuesta actual | Propuesta con marco de gemelo digital |
|---|---|
| Sensores que detectan anomalías y generan alertas | Un modelo estructural vivo del puente, calibrado con datos reales y actualizado de forma continua |
| Vende hardware más una suscripción | Vende un activo de información que gana valor con cada año de datos acumulados |
| Compite por precio de instrumentación | Compite por capacidad de diagnóstico e integración con la gestión de activos |
| Difícil de diferenciar de otros proyectos con sensores | Se conecta con BIM, Industria 4.0 y gestión de infraestructura basada en datos |

El argumento de negocio también mejora. Un sistema de telemetría es reemplazable por otro más barato. Un gemelo digital calibrado con cinco años de historia de ese puente específico no es reemplazable, porque el valor está en los datos acumulados y en el modelo ya ajustado. Eso es retención de cliente real, y sostiene el modelo de suscripción que ya plantearon en el Canvas.

### 4.6 Referencias de campo

Casos frecuentemente citados en la literatura de SHM e instrumentación de puentes, útiles como antecedente en la presentación (conviene verificar las cifras en fuente primaria antes de citarlas en público):

- **Puente Tsing Ma, Hong Kong.** Uno de los sistemas de monitoreo permanente más extensos y antiguos, con cientos de sensores integrados desde su construcción para vigilar viento y respuesta estructural.
- **Queensferry Crossing, Escocia.** Instrumentado con del orden de dos mil sensores desde el diseño, concebido para gestión de activos a largo plazo.
- **Puente del Puerto de Sídney, Australia.** Trabajo desarrollado con CSIRO sobre instrumentación masiva de elementos secundarios y detección de daño mediante aprendizaje automático.
- **Viaducto de Millau, Francia.** Instrumentación para monitoreo de comportamiento bajo viento y temperatura.

El patrón común: los proyectos donde el monitoreo se diseñó junto con la estructura son los que funcionan bien. El hueco de mercado, en México y en general, está en instrumentar estructuras que ya existen y que nunca se pensaron para ser monitoreadas. Ahí es donde vive VIGÍA.

---

## 5. Tres opciones de prototipo físico

Las tres son construibles. Difieren en ambición, riesgo y en cuánto capital técnico demuestran.

### Opción A — Nodo SHM sobre armadura instrumentada

**Concepto.** Una maqueta de puente tipo armadura, de 80 a 120 cm de claro, instrumentada con un nodo ESP32. El nodo muestrea vibración, calcula la FFT a bordo, identifica la frecuencia del primer modo y la compara con una línea base compensada por temperatura. Un elemento diagonal está atornillado en lugar de pegado, para poder aflojarlo frente al jurado y provocar daño real, medible y reversible.

**Qué demuestra.** Que el sistema mide una propiedad física de la estructura, no un umbral arbitrario. Que hay un indicador cuantitativo de daño. Que el procesamiento ocurre en el borde, sin depender de la nube.

**Nivel de gemelo digital alcanzado.** 1 y parcialmente 2.

**Riesgo.** Bajo. Es la opción segura.

**Debilidad.** Es un buen proyecto de instrumentación, pero no explota el marco de gemelo digital. Y es lo que probablemente hagan varios equipos.

---

### Opción B — Gemelo digital ligero de la armadura ⭐

**Concepto.** Todo lo de la opción A, más la mitad que la convierte en gemelo. Un modelo estructural de la maqueta corre en una computadora, en Python. El modelo predice las frecuencias naturales. Al recibir las frecuencias medidas, un algoritmo de calibración ajusta los factores de rigidez de cada grupo de elementos hasta hacer coincidir el modelo con la medición. El resultado se pinta sobre un modelo tridimensional de la maqueta en el navegador: los elementos con pérdida de rigidez estimada se colorean, con su porcentaje.

Cuando alguien afloja la diagonal, el tablero no dice "alerta". Dice: *rigidez de la diagonal D4 estimada en 78 por ciento del valor de referencia, confianza media.* Y colorea esa barra.

**Qué demuestra.** El ciclo cerrado completo: físico, sensor, modelo, diagnóstico, visualización. Localización de daño, no solo detección. Capacidad de modelado estructural, no solo de conexión de sensores.

**Nivel de gemelo digital alcanzado.** 2 completo, con una demostración creíble del 3.

**Riesgo.** Medio. La parte de calibración es la que puede no salir a tiempo. Se mitiga con un plan B: si la calibración automática no converge, se presenta una versión con una tabla de firmas espectrales precalculada para cada escenario de daño, que resuelve el mismo problema por comparación de patrones y sigue siendo defendible.

**Cómo se ve.** Ver el archivo adjunto `VIGIA_prototipo_maqueta.svg`, con la vista lateral esquemática, la ubicación de cada sensor y las dos diagonales desmontables.

![Prototipo físico VIGÍA](VIGIA_prototipo_maqueta.svg)

**Por qué encaja con este equipo.** Arquitectura produce el modelo tridimensional y la visualización, que es su terreno. Ciberseguridad se encarga del canal de datos, la autenticación de los nodos y la integridad del registro histórico, lo cual además abre un tema poco explorado y muy vendible: la seguridad de los datos en infraestructura crítica. Gestión Empresarial toma el modelo de negocio del activo de información. Nadie está trabajando fuera de su formación.

---

### Opción C — Probeta de concreto con sensor embebido

**Concepto.** Aprovecha algo que ya está en el Canvas y que nadie más va a llevar: sensores embebidos en concreto. Se cuelan dos o tres probetas de concreto con instrumentación adentro, encapsulada. Se cargan progresivamente hasta el agrietamiento mientras el sistema registra deformación, temperatura de fraguado y respuesta acústica o vibratoria. Se muestra la firma del dato en el momento en que aparece la primera microfisura.

**Qué demuestra.** Encapsulado, supervivencia del sensor en ambiente alcalino y húmedo, monitoreo desde el fraguado. Es el argumento más fuerte de la propuesta original y el más difícil de imitar.

**Nivel de gemelo digital alcanzado.** 1, con datos de material excelentes.

**Riesgo.** Alto en logística. Requiere acceso al laboratorio de materiales del Tec para el colado y para la prensa de compresión, tiempo de curado (típicamente 28 días para resistencia nominal) y ensayos destructivos que no se pueden repetir frente al jurado. Y no se puede llevar la prensa a la exposición.

**Recomendación.** No como prototipo principal, sino como **evidencia complementaria**. Una probeta agrietada sobre la mesa, con la gráfica del momento exacto de la fisura y un video del ensayo, es una de las piezas más persuasivas que pueden llevar. Cuesta poco y agrega credibilidad de laboratorio real.

---

### Comparativa

| Criterio | A: Nodo SHM | B: Gemelo ligero | C: Probeta embebida |
|---|---|---|---|
| Costo estimado | \$4,500 MXN | \$6,500 MXN | \$3,000 MXN |
| Semanas de trabajo | 4 a 5 | 7 a 9 | 5 más 4 de curado |
| Riesgo técnico | Bajo | Medio | Medio |
| Riesgo logístico | Bajo | Bajo | Alto |
| Demo en vivo repetible | Sí | Sí | No |
| Diferenciación frente a otros equipos | Media | Alta | Alta |
| Aprovecha el perfil del equipo | Parcial | Completo | Parcial |
| Nivel de gemelo digital | 1 a 2 | 2 a 3 | 1 |

---

## 6. Recomendación y justificación

**Construir la opción B como prototipo principal, con la opción C como evidencia complementaria.**

La opción B contiene íntegramente a la opción A, así que la ruta de construcción es incremental y siempre hay algo funcional que mostrar. Si el tiempo se acaba, se presenta la opción A y se explica la calibración como trabajo en curso, con el modelo ya construido en pantalla. No hay escenario en que se queden sin nada.

Tres razones de fondo:

1. **La opción A ya es el promedio.** Puentes de maqueta con sensores y alarma es lo que más se ve en certámenes de este tipo. El corrimiento de frecuencia natural los pone arriba del promedio; la calibración del modelo los saca de la comparación.
2. **Cierra el hueco del diagnóstico de la sección 3.4.** El documento local promete detección de anomalías sin definirla. La opción B no solo la define: la localiza.
3. **Usa a las cinco personas en lo que saben hacer.** Un proyecto donde tres estudiantes de Arquitectura sostienen la parte de modelado estructural y visualización tridimensional, y una de Ciberseguridad sostiene la integridad de los datos, es coherente. Un proyecto donde los cinco intentan hacer electrónica no lo es.

---

## 7. Lista de materiales con costos estimados

Precios de referencia en pesos mexicanos, orden de magnitud para compra al menudeo en México a mediados de 2026. Conviene cotizar con al menos dos proveedores y actualizar la tabla antes de presentarla, porque los jurados sí revisan estas cifras.

### 7.1 Electrónica — núcleo del sistema

| # | Componente | Cant. | Unitario | Subtotal | Función |
|---|---|---|---|---|---|
| 1 | ESP32 DevKit V1 (WiFi, doble núcleo) | 2 | \$220 | \$440 | Nodo sensor con procesamiento en el borde |
| 2 | Acelerómetro MPU6050 (I2C, 6 ejes) | 2 | \$85 | \$170 | Vibración e inclinación |
| 3 | Acelerómetro ADXL345 (menor ruido) | 1 | \$160 | \$160 | Nodo principal, mejor calidad de espectro |
| 4 | Celda de carga 5 kg + módulo HX711 | 2 | \$210 | \$420 | Reacción en apoyos, redistribución de carga |
| 5 | Sensor de temperatura y humedad SHT31 | 1 | \$185 | \$185 | Compensación térmica de la línea base |
| 6 | Módulo lector microSD + tarjeta 16 GB | 1 | \$180 | \$180 | Bitácora continua, respaldo sin red |
| 7 | Pantalla OLED 1.3" I2C | 1 | \$130 | \$130 | Lectura local del estado del nodo |
| 8 | LED RGB, buzzer, resistencias, protoboard, cable Dupont | — | — | \$350 | Indicación local y prototipado |
| **Subtotal electrónica** | | | | **\$2,035** | |

### 7.2 Alimentación

| # | Componente | Cant. | Unitario | Subtotal | Función |
|---|---|---|---|---|---|
| 9 | Batería 18650 3.7 V + portapila | 2 | \$120 | \$240 | Autonomía del nodo |
| 10 | Módulo de carga TP4056 con protección | 2 | \$55 | \$110 | Gestión de carga |
| 11 | Panel solar 6 V 1 W | 1 | \$140 | \$140 | Argumento de autonomía en campo |
| 12 | Convertidor elevador MT3608 | 2 | \$45 | \$90 | Regulación a 5 V |
| **Subtotal alimentación** | | | | **\$580** | |

### 7.3 Estructura de la maqueta

| # | Componente | Cant. | Unitario | Subtotal | Función |
|---|---|---|---|---|---|
| 13 | Solera de aluminio 1/2" × 1/16" (tramo 3 m) | 4 | \$110 | \$440 | Cuerdas y diagonales de la armadura |
| 14 | Tornillería M3 con tuerca y arandela (100 pzas) | 1 | \$180 | \$180 | Nodos atornillados de la armadura |
| 15 | Placa MDF 6 mm para tablero y base | 1 | \$220 | \$220 | Tablero y soporte |
| 16 | Ángulo de aluminio para apoyos y pilas | 2 | \$95 | \$190 | Apoyos fijo y móvil |
| 17 | Pintura, lija, consumibles de acabado | — | — | \$200 | Presentación |
| **Subtotal estructura** | | | | **\$1,230** | |

### 7.4 Encapsulado y montaje profesional

| # | Componente | Cant. | Unitario | Subtotal | Función |
|---|---|---|---|---|---|
| 18 | Gabinete plástico IP65 pequeño | 2 | \$210 | \$420 | Argumento de aptitud para intemperie |
| 19 | Prensaestopas PG7 | 6 | \$25 | \$150 | Sellado de entrada de cable |
| 20 | Cable apantallado 4 hilos (5 m) | 1 | \$180 | \$180 | Reducción de ruido en línea de sensor |
| 21 | Placa perforada o PCB impreso a medida | 2 | \$150 | \$300 | Montaje definitivo, no protoboard |
| **Subtotal encapsulado** | | | | **\$1,050** | |

### 7.5 Cómputo y red (verificar disponibilidad en el Tec antes de comprar)

| # | Componente | Cant. | Unitario | Subtotal | Función |
|---|---|---|---|---|---|
| 22 | Raspberry Pi 4 (2 GB) o laptop del equipo | 1 | \$0 – \$2,400 | \$0 – \$2,400 | Servidor local, broker MQTT y tablero |
| 23 | Router WiFi portátil | 1 | \$420 | \$420 | Red propia, independiente del recinto |
| **Subtotal cómputo y red** | | | | **\$420 – \$2,820** | |

### 7.6 Opción C, evidencia complementaria

| # | Componente | Cant. | Unitario | Subtotal | Función |
|---|---|---|---|---|---|
| 24 | Cemento, arena, grava y moldes cilíndricos | — | — | \$500 | Probetas de concreto |
| 25 | Galgas extensométricas 350 Ω (paquete de 10) | 1 | \$450 | \$450 | Deformación embebida y superficial |
| 26 | Resina epóxica y encapsulante | — | — | \$350 | Protección del sensor embebido |
| **Subtotal opción C** | | | | **\$1,300** | |

### 7.7 Totales

| Alcance | Total estimado |
|---|---|
| Opción A solamente | ≈ \$4,500 MXN |
| **Opción B recomendada, sin Raspberry Pi** | **≈ \$5,300 MXN** |
| Opción B con Raspberry Pi | ≈ \$7,700 MXN |
| Opción B más evidencia de opción C | ≈ \$6,600 – \$9,000 MXN |
| Margen para imprevistos, 15 por ciento | + \$800 – \$1,400 MXN |

Vale la pena anotar los sobrantes: componentes electrónicos de este tipo casi siempre requieren repuestos. Comprar dos ESP32 y dos MPU6050 de más cuesta unos \$600 y evita que un componente quemado a tres días del evento arruine meses de trabajo.

---

## 8. Pasos de construcción

Nueve fases. Se pueden paralelizar entre los cinco integrantes; las asignaciones sugeridas están indicadas.

### Fase 1 — Diseño de la armadura (semana 1) · *Arquitectura*

Elegir una tipología de armadura simple y bien documentada. Una Pratt o una Warren de siete a nueve paneles funciona bien: es simétrica, fácil de analizar y sus elementos diagonales son claramente identificables, lo que ayuda a la narrativa de localización del daño.

Definir: claro libre entre 80 y 120 cm, altura de la armadura de aproximadamente un octavo del claro, un apoyo fijo y uno móvil.

Dibujar el despiece completo con numeración de cada barra y cada nodo. Esa numeración es la que después aparece en el tablero, así que hay que fijarla desde el principio y no cambiarla.

**Decisión crítica:** al menos dos diagonales deben ser **atornilladas y desmontables**, no pegadas. Sin eso no hay demostración posible. Conviene que sean diagonales en posiciones distintas, una cerca del apoyo y otra cerca del centro, para poder mostrar que el sistema distingue *dónde* ocurrió el daño y no solo *que* ocurrió.

### Fase 2 — Modelo estructural y predicción teórica (semanas 1 a 2) · *Arquitectura + asesor*

Antes de cortar aluminio, calcular. Modelar la armadura en un software de análisis y obtener las primeras tres frecuencias naturales predichas. Herramientas gratuitas o accesibles: Ftool para verificación rápida en dos dimensiones, Frame3DD u OpenSees para análisis modal, o una implementación propia de elemento finito de barra en Python, que es perfectamente factible para una armadura plana y demuestra mucho más dominio.

Correr el modelo también para cada escenario de daño: sin la diagonal D4, sin la diagonal D2, con la diagonal D4 al 50 por ciento de su rigidez. Guardar esas frecuencias. Son la predicción, y compararlas después con la medición es el resultado más valioso de todo el proyecto.

Si la frecuencia natural predicha del primer modo cae por debajo de unos 15 Hz o por encima de unos 200 Hz, ajustar la geometría o la sección. El rango cómodo de medición con estos sensores está aproximadamente entre 5 y 200 Hz.

### Fase 3 — Fabricación de la maqueta (semanas 2 a 3) · *Arquitectura*

Cortar, barrenar y armar. Recomendaciones que evitan problemas después:

- Barrenar con guía o plantilla, no a pulso. Una armadura con nodos desalineados introduce holguras que se leen como ruido en el espectro y arruinan la repetibilidad.
- Apretar todos los tornillos con la misma fuerza, idealmente con torquímetro pequeño o con un criterio consistente y documentado. El par de apriete afecta la rigidez de los nodos y por lo tanto la frecuencia natural.
- Los apoyos deben ser rígidos y estar firmemente anclados a la base. Si el apoyo se mueve, están midiendo el apoyo y no la estructura.
- Prever desde ahora los puntos de montaje de los sensores: barrenos o placas de sujeción, no cinta. Un acelerómetro pegado con cinta doble cara genera su propia resonancia y contamina la medición.

### Fase 4 — Electrónica y firmware (semanas 3 a 5) · *Ciberseguridad + asesor*

Construir el nodo por bloques, probando cada uno antes de integrar.

1. Lectura del acelerómetro a frecuencia de muestreo estable. Esto es lo más importante de todo el firmware: usar un temporizador de hardware o la FIFO del sensor, nunca `delay()`. Una frecuencia de muestreo irregular produce un espectro sin sentido, y este es el error más común en proyectos de este tipo. Objetivo: entre 500 y 1000 Hz, verificado midiendo cuántas muestras realmente se capturan por segundo.
2. FFT a bordo con la biblioteca `arduinoFFT`, en ventanas de 1024 muestras con ventaneo de Hanning. Identificar el pico dominante y los dos siguientes.
3. Lectura de temperatura y de las celdas de carga.
4. Registro en microSD con marca de tiempo.
5. Publicación por MQTT hacia el servidor local.
6. Modo de recolección de línea base: un botón que dispara la captura de un lote largo de mediciones etiquetadas como estructura sana.

### Fase 5 — Servidor, base de datos y tablero (semanas 4 a 6) · *Ciberseguridad + Gestión Empresarial*

Broker MQTT local, base de datos de series de tiempo y tablero. Una combinación probada y gratuita es Mosquitto para MQTT, InfluxDB para los datos y Grafana para las gráficas, todo corriendo en la Raspberry Pi o en una laptop. Alternativa más ligera: un solo servicio en Python con FastAPI y SQLite, y un frontend propio.

**Requisito no negociable:** el sistema debe funcionar sin internet. En el recinto de la etapa estatal, la red va a estar saturada. Router propio, todo en red local, y el tablero abierto en una laptop del equipo.

Aquí es donde el perfil de Ciberseguridad agrega algo que casi ningún equipo va a tener: autenticación de los nodos para que no cualquiera pueda inyectar lecturas falsas, cifrado del canal, y un registro histórico con verificación de integridad para que los datos sean admisibles como evidencia técnica. En infraestructura crítica, un sistema de monitoreo que se puede falsificar es peor que no tener monitoreo, porque produce confianza injustificada. Ese argumento es fuerte y es suyo.

### Fase 6 — Recolección de la línea base (semanas 5 a 6) · *todo el equipo*

La fase más aburrida y la más importante.

Dejar la maqueta sana midiendo durante al menos 48 horas continuas, excitándola periódicamente de forma repetible. Para la excitación conviene un método consistente: un impacto con un martillo pequeño de nylon en un punto marcado, o un pequeño motor con masa excéntrica montado en el tablero.

Con esos datos, calcular para cada modo la media y la desviación estándar de la frecuencia, y la relación entre frecuencia y temperatura. Con eso se definen los umbrales:

| Estado | Criterio | Significado |
|---|---|---|
| Verde | Desviación menor a 2σ respecto de la línea base compensada | Comportamiento normal |
| Ámbar | Desviación entre 2σ y 3σ | Anomalía a vigilar, inspección recomendada |
| Rojo | Desviación mayor a 3σ, sostenida en varias ventanas consecutivas | Cambio estructural probable, inspección inmediata |

Exigir persistencia en varias ventanas antes de disparar el estado rojo es lo que reduce las falsas alarmas, y poder explicar ese criterio con números es exactamente lo que un jurado técnico quiere escuchar.

### Fase 7 — Motor de calibración y localización (semanas 6 a 8) · *Arquitectura + asesor*

El paso que convierte el proyecto en gemelo digital.

Implementar una rutina que reciba las frecuencias medidas y busque el conjunto de factores de rigidez por grupo de elementos que minimiza el error entre modelo y medición. Con una armadura pequeña y pocos grupos de elementos, una búsqueda por optimización sencilla es suficiente; no hace falta nada sofisticado.

**Plan B, decidir en la semana 7:** si la calibración no converge de forma confiable, sustituirla por comparación de firmas. Se precalcula con el modelo el vector de frecuencias para cada escenario de daño, se guarda como catálogo, y el sistema clasifica la medición asignándola al escenario más cercano. Resuelve el mismo problema, es robusto, y sigue siendo diagnóstico y no solo detección. Se presenta sin disculpas.

### Fase 8 — Visualización tridimensional (semanas 7 a 8) · *Arquitectura*

Modelo tridimensional de la maqueta, exportado desde el software de modelado del equipo a un formato web como glTF, y visualizado en el navegador con Three.js. Cada barra coloreada según su factor de rigidez estimado: gris para normal, ámbar para pérdida moderada, rojo para pérdida significativa. Un panel lateral con la lista de elementos y sus porcentajes.

Esta es la pieza que la gente recuerda. Un puente en pantalla donde una barra se pone roja en el mismo momento en que alguien aflojó un tornillo en la mesa es un momento de demostración muy difícil de superar.

### Fase 9 — Pruebas, documentación y ensayo (semanas 8 a 9) · *todo el equipo*

Ejecutar el protocolo completo de la sección 9, documentar todo, grabar el video de respaldo y ensayar la presentación al menos cinco veces completas, incluyendo el escenario en que algo falla.

---

## 9. Protocolo de pruebas y validación

Un prototipo sin protocolo de validación es una maqueta. Con protocolo, es un instrumento. Esta sección es la que más peso técnico agrega al documento.

### 9.1 Validación cruzada del instrumento

Medir la vibración de la maqueta simultáneamente con el nodo ESP32 y con una referencia independiente. La opción gratuita y sorprendentemente buena es **Phyphox**, una aplicación desarrollada por la Universidad RWTH Aachen que expone los sensores del teléfono y permite exportar los datos crudos y ver el espectro.

Reportar en una tabla: frecuencia medida por el nodo, frecuencia medida por la referencia, error absoluto y error relativo, para al menos diez repeticiones.

| Repetición | Nodo VIGÍA (Hz) | Referencia (Hz) | Error abs. (Hz) | Error rel. (%) |
|---|---|---|---|---|
| 1 a 10 | *a llenar* | *a llenar* | | |
| Media | | | | |
| Desv. estándar | | | | |

### 9.2 Repetibilidad

Veinte mediciones consecutivas de la estructura sana, sin tocar nada entre ellas, excitando de la misma manera. Calcular media, desviación estándar y coeficiente de variación de la frecuencia del primer modo.

Este número es el que define la resolución real del sistema: no se puede detectar un cambio menor que el propio ruido de medición. Decirlo abiertamente en la presentación demuestra rigor.

### 9.3 Teoría contra medición

Comparar las frecuencias predichas en la fase 2 con las medidas en la estructura sana.

| Modo | Predicha (Hz) | Medida (Hz) | Diferencia (%) |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |

Es normal y esperable que difieran, típicamente entre un 5 y un 20 por ciento en una maqueta atornillada, porque el modelo idealiza los nodos como perfectamente rígidos o perfectamente articulados y la realidad está en medio. Explicar esa diferencia y luego usarla para calibrar el modelo es precisamente el ciclo del gemelo digital funcionando. No es un error del proyecto: es el proyecto.

### 9.4 Curva de sensibilidad al daño

El experimento estrella. Inducir daño progresivo y medir en cada nivel.

| Nivel | Condición | Δf esperado | Δf medido | ¿Detectado? |
|---|---|---|---|---|
| 0 | Sana, todos los tornillos con par nominal | 0 | | Línea base |
| 1 | Diagonal D4 aflojada un cuarto de vuelta | pequeño | | |
| 2 | Diagonal D4 aflojada una vuelta completa | moderado | | |
| 3 | Diagonal D4 retirada | grande | | |
| 4 | Diagonal D2 retirada, D4 restituida | grande, distinta firma | | |

El nivel 4 es el que demuestra **localización**: si el sistema distingue el retiro de D2 del retiro de D4, no solo detecta daño, lo ubica. Ese es el nivel 2 de madurez de gemelo digital, demostrado empíricamente.

Con estos datos se puede reportar el **umbral mínimo de daño detectable**, que es una cifra concreta y honesta sobre el desempeño del sistema.

### 9.5 Efecto de la temperatura

Medir la frecuencia natural a distintas temperaturas ambiente, aprovechando el ciclo día-noche o un calentador y un ventilador. Graficar frecuencia contra temperatura y ajustar una recta.

Esa recta es la compensación térmica. Sin ella, un cambio de temperatura se confundiría con daño; con ella, el sistema distingue una cosa de la otra. Es uno de los detalles que más diferencia un proyecto que leyó la literatura de uno que no.

### 9.6 Falsas alarmas

Con los umbrales ya fijados, operar el sistema durante 24 horas sobre la estructura sana, incluyendo perturbaciones que no son daño: golpes en la mesa, gente caminando cerca, corrientes de aire, carga y descarga de peso sobre el tablero.

Contar cuántas veces se disparó cada nivel de alerta sin que hubiera daño real. Reportar la tasa de falsas alarmas por hora. Un sistema con tasa de falsas alarmas conocida y baja es un producto; uno cuya tasa nadie midió es una promesa.

---

## 10. Marco normativo y contexto mexicano

El documento local menciona genéricamente reglamentos y normas técnicas. Aterrizarlo en referencias concretas mexicanas eleva mucho la percepción de seriedad.

### 10.1 SIPUMEX

El **Sistema de Puentes de México**, operado por la dependencia federal responsable de infraestructura y comunicaciones, es el inventario oficial de los puentes de la red carretera federal. Registra cada estructura y le asigna una calificación de estado de conservación en una escala del 1 al 5, que se usa para priorizar la asignación de recursos de mantenimiento y rehabilitación.

Este es el mejor punto de anclaje para VIGÍA, por dos razones. Primero, porque la calificación proviene fundamentalmente de **inspección visual periódica**, con las limitaciones que el propio documento local ya identificó. Segundo, porque un dato de monitoreo continuo alimentando esa calificación no compite con el sistema existente: lo complementa y lo hace más objetivo. Esa es una historia de adopción mucho más realista que pretender reemplazar el proceso oficial.

El argumento de necesidad es directo: el inventario federal comprende varios miles de estructuras, buena parte de ellas construidas hace décadas y con cargas de tránsito muy superiores a las de su diseño original. Instrumentarlas todas con equipo comercial es económicamente imposible. Ahí está el hueco que ocupa un nodo de bajo costo.

*(Conviene verificar el número exacto de estructuras y la escala de calificación en la fuente oficial vigente antes de citarlos con cifras específicas.)*

### 10.2 Normas técnicas de referencia

| Referencia | Alcance | Uso en el proyecto |
|---|---|---|
| **ISO 4866** | Vibración de estructuras fijas: guías para la medición de vibraciones y la evaluación de sus efectos | Justifica el método de medición y la ubicación de los acelerómetros |
| **Normas N-PRY-CAR** de la dependencia federal de infraestructura | Proyecto de carreteras, incluye estructuras y puentes | Marco de diseño nacional aplicable |
| **AASHTO LRFD Bridge Design Specifications** | Especificación internacional de diseño de puentes, referencia habitual en México | Contexto de estados límite y cargas |
| **Normas Técnicas Complementarias** del reglamento de construcciones aplicable | Diseño estructural local | Marco reglamentario en obra urbana |
| **The Gemini Principles**, CDBB 2018 | Principios para gemelos digitales de infraestructura | Marco conceptual del enfoque de gemelo digital |
| **ISO/IEC 30173** | Conceptos y terminología de gemelos digitales | Sustento de definiciones |

### 10.3 Antecedentes nacionales

México tiene casos documentados de falla estructural en infraestructura de transporte que dan urgencia y pertinencia al proyecto. El colapso del tramo elevado de la Línea 12 del Metro de la Ciudad de México en mayo de 2021, con veintiséis personas fallecidas, motivó peritajes independientes que apuntaron a deficiencias constructivas en la conexión entre la losa y las trabes metálicas, particularmente en los pernos de cortante. El colapso del socavón en el Paso Express de Cuernavaca en 2017 es otro antecedente conocido.

Estos casos se deben tratar con respeto y precisión, no como recurso dramático. La forma correcta de plantearlo es técnica: en ambos casos hubo procesos de degradación progresiva que un sistema de monitoreo continuo tenía posibilidad de haber hecho visibles antes del colapso. Ese es el argumento, y no necesita adornos.

Es importante ser honestos sobre el alcance: no se puede afirmar que VIGÍA habría evitado esas tragedias. Se puede afirmar, con fundamento, que la degradación progresiva de rigidez es detectable por medios instrumentales antes de que sea visible, y que la inspección visual periódica no está diseñada para captarla.

---

## 11. Guion de demostración ante el jurado

Diez minutos, estructurados. Ensayar hasta que salga sin leer.

**Minuto 0 a 1 — El problema, con un dato.** Cuántas estructuras hay en el inventario federal, qué proporción rebasó su vida de diseño, cómo se evalúan hoy. Sin dramatismo. Un dato verificable vale más que tres adjetivos.

**Minuto 1 a 2 — La pregunta técnica.** ¿Cómo se detecta un daño que todavía no se ve? Introducir la relación entre rigidez y frecuencia natural. Es un concepto de física de preparatoria y cualquier jurado lo sigue.

**Minuto 2 a 4 — El sistema.** Mostrar la maqueta y el tablero. Explicar el recorrido del dato: sensor, procesamiento en el nodo, red local, modelo, diagnóstico, visualización. Señalar el modelo tridimensional en pantalla y decir explícitamente que es un gemelo digital calibrado con los datos reales de esa maqueta, y por qué eso no es lo mismo que un modelo 3D.

**Minuto 4 a 6 — La demostración.** Aquí se afloja el tornillo. Que lo haga un miembro del jurado si acepta: eso elimina cualquier sospecha de truco. Mostrar cómo cae la frecuencia, cómo el estado pasa a ámbar y luego a rojo, y cómo se colorea la barra correcta en el modelo tridimensional. Después restituir el tornillo y mostrar el regreso a verde.

Si el jurado acepta, ofrecer el reto de los ojos cerrados: que aflojen la diagonal que quieran mientras el equipo no mira, y que el sistema diga cuál fue. Si funciona, ese es el momento que van a recordar de todo el certamen. Solo ofrecerlo si en las pruebas de la fase 9 salió bien de forma consistente.

**Minuto 6 a 7 — La validación.** La tabla de teoría contra medición, el error contra la referencia independiente, la repetibilidad, la tasa de falsas alarmas. Esta parte separa a los proyectos serios. Es también donde se muestra la probeta de concreto agrietada, si se hizo.

**Minuto 7 a 8 — Las limitaciones.** Decirlas ustedes. Sensibilidad limitada al daño local pequeño, dependencia de la temperatura, no unicidad de la solución inversa, necesidad de línea base. Y para cada una, la estrategia de mitigación. Un equipo que conoce los límites de su sistema proyecta mucho más dominio que uno que afirma no tenerlos.

**Minuto 8 a 10 — El negocio y la ruta.** Los tres niveles de costo, el modelo de suscripción sobre el activo de información, la vía de adopción complementando la inspección visual existente, y los siguientes pasos concretos: instrumentar una estructura real, aunque sea un puente peatonal del campus, en convenio con el Tec.

### Contingencias que hay que tener listas

| Riesgo | Preparación |
|---|---|
| No hay red en el recinto | Router propio, todo en red local, nada depende de internet |
| Se quema un componente | Nodo de repuesto ya armado y probado, en la caja |
| El tablero no carga | Video de respaldo de la demostración completa, en el teléfono y en una USB |
| No hay proyector o no funciona | Láminas impresas con las gráficas clave y las tablas de validación |
| El jurado pide ver el código | Repositorio abierto y ordenado, con README |
| Preguntan por qué no hay nadie de electrónica en el equipo | La respuesta de la sección 1, ensayada |
| Preguntan por la categoría registrada | La respuesta de la sección 3.1, ensayada |

---

## 12. Pendientes y decisiones abiertas

Lo que hace falta resolver, en orden de urgencia.

1. **¿Se puede recategorizar el proyecto para la etapa estatal?** Preguntar a los asesores esta semana. Condiciona cómo se enmarca todo.
2. **¿Cuánto tiempo hay realmente hasta la etapa estatal?** El cronograma de nueve fases asume entre ocho y nueve semanas. Con menos de seis, hay que recortar a la opción A más el modelo en pantalla sin calibración automática.
3. **¿Cuál es el presupuesto disponible y de dónde sale?** Recurso del Tec, aportación del equipo, patrocinio. Determina si se compran los sensores de mejor calidad.
4. **¿Hay acceso al laboratorio de materiales?** Define si la opción C es viable como evidencia complementaria.
5. **¿Los asesores pueden apoyar en análisis modal?** Es el punto donde un profesor de estructuras hace una diferencia enorme en poco tiempo.
6. **¿Qué sensores tenía el simulador de la etapa local?** Hay un simulador en Wokwi del que conviene rescatar el firmware que ya funciona en lugar de empezar de cero.
7. **¿Existe un puente peatonal o una pasarela en el campus que se pueda instrumentar?** Aunque sea una medición única y no un monitoreo permanente, una medición sobre estructura real es un salto cualitativo en credibilidad y cuesta solo una tarde.

---

## Apéndice — Glosario

| Término | Definición |
|---|---|
| **SHM** | *Structural Health Monitoring*, monitoreo de salud estructural. Disciplina que evalúa la condición de una estructura mediante instrumentación permanente o periódica |
| **Frecuencia natural** | Frecuencia a la que una estructura vibra libremente al ser perturbada. Depende de su rigidez y su masa |
| **Modo de vibración** | Patrón característico de deformación con que una estructura vibra a una de sus frecuencias naturales |
| **FFT** | *Fast Fourier Transform*. Algoritmo que descompone una señal en el tiempo en sus componentes de frecuencia |
| **Línea base** | Registro del comportamiento de la estructura en condición sana, contra el cual se comparan las mediciones posteriores |
| **Calibración de modelo** | Ajuste de los parámetros de un modelo estructural para que sus predicciones coincidan con mediciones reales |
| **Galga extensométrica** | Sensor que cambia su resistencia eléctrica al deformarse, usado para medir deformación en un elemento |
| **MEMS** | *Micro Electro-Mechanical Systems*. Tecnología de sensores miniaturizados, base de los acelerómetros de bajo costo |
| **DAQ** | *Data Acquisition*. Módulo o sistema encargado de adquirir, digitalizar y transmitir señales de sensores |
| **MQTT** | Protocolo ligero de mensajería, estándar de facto en telemetría de dispositivos conectados |
| **Gemelo digital** | Representación virtual de un activo físico, sincronizada con él mediante datos, a lo largo de su ciclo de vida |
| **Procesamiento en el borde** | Cómputo realizado en el propio dispositivo sensor en lugar de en un servidor remoto |
| **σ (sigma)** | Desviación estándar. Medida de dispersión de un conjunto de datos, usada aquí para fijar umbrales de alerta |

---

*Documento preparado como insumo de trabajo para la etapa estatal. Las cifras de costo son estimaciones de orden de magnitud y deben cotizarse antes de presentarse. Las referencias normativas y los casos de campo deben verificarse en fuente primaria antes de citarse en público.*
