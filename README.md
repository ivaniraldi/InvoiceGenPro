# 📄 InvoiceGenPro

## 🚀 Descripción
InvoiceGenPro es un generador de facturas profesionales gratuito que permite a usuarios crear, visualizar y descargar facturas en formato PDF de alta calidad. Desarrollado con HTML, CSS y JavaScript, ofrece una experiencia fluida y profesional sin necesidad de instalación, accesible directamente desde cualquier navegador web. La aplicación combina un diseño elegante con funcionalidades avanzadas, incluyendo procesamiento con inteligencia artificial.

## 🔧 Tecnologías Detalladas

### Frontend
- **HTML5**: Estructura semántica optimizada para SEO y accesibilidad.
- **CSS3 + Tailwind CSS**: Framework CSS utilitario para diseño responsive con clases predefinidas que facilitan el desarrollo.
- **JavaScript (ES6+)**: Implementación vanilla para máxima compatibilidad y rendimiento sin dependencias de frameworks externos.

### Bibliotecas y APIs
- **html2pdf.js (v0.10.1)**: Biblioteca para convertir contenido HTML en documentos PDF de alta calidad, permitiendo la personalización de márgenes, cabeceras y pies de página.
- **Font Awesome (v6.4.0)**: Conjunto completo de iconos vectoriales para mejorar la interfaz de usuario y experiencia visual.
- **Google Gemini AI (v2.0 Flash)**: API de IA para procesamiento y extracción de datos no estructurados, implementando análisis de lenguaje natural.

### Técnicas de Optimización
- **Lazy Loading**: Carga diferida de recursos no críticos para mejorar el tiempo de carga inicial.
- **Preloading**: Precarga de scripts críticos para optimizar la experiencia del usuario.
- **Responsive Design**: Adaptabilidad a múltiples dispositivos mediante media queries y diseño mobile-first.
- **Service Workers**: Implementados para funcionalidad offline y mejora de rendimiento (PWA).

### Características Técnicas
- **Procesamiento Local**: Todos los datos se procesan en el navegador del cliente para garantizar privacidad.
- **Sistema de Traducciones**: Implementación basada en JSON para internacionalización dinámica.
- **Validación de Datos**: Validación en tiempo real para prevenir errores en los cálculos y datos de facturación.
- **Arquitectura Modular**: Separación de responsabilidades en módulos independientes para facilitar mantenimiento.

## ✨ Características Principales
- **🎨 Interfaz Intuitiva**: Diseño moderno con Tailwind CSS que se adapta a dispositivos móviles y de escritorio, con transiciones fluidas y experiencia de usuario optimizada.
- **🌍 Multilenguaje**: Disponible en español, inglés y portugués para mayor accesibilidad global, con sistema de traducciones dinámico basado en JSON.
- **📋 Generación de PDF**: Crea PDFs profesionales con diseño personalizado, listos para enviar a tus clientes, utilizando la biblioteca html2pdf.js.
- **🤖 Procesamiento con IA**: Función experimental que permite importar y procesar datos automáticamente mediante la API de Google Gemini, capaz de interpretar tablas y textos de diversas fuentes.
- **⚙️ Personalización Completa**: Control total sobre los datos del emisor, cliente, artículos y condiciones de la factura, con campos extensibles.
- **🧮 Cálculos Automáticos**: Suma automática de totales, impuestos y balance pendiente, con actualizaciones en tiempo real.
- **📱 Diseño Responsive**: Optimizado para funcionar en dispositivos móviles, tablets y ordenadores de escritorio.
- **🔒 Privacidad**: Procesamiento local sin almacenamiento en servidores externos, garantizando la confidencialidad de los datos.

## 🛠️ Tecnologías Utilizadas
- **Frontend**: 
  - HTML5 con estructura semántica optimizada para SEO
  - CSS3 con Tailwind CSS para estilos modernos y responsivos
  - JavaScript vanilla para máxima compatibilidad y rendimiento
- **Generación de PDF**: 
  - html2pdf.js v0.10.1 para la conversión de HTML a PDF de alta calidad
- **Iconos**: 
  - Font Awesome 6.4.0 para una interfaz visual intuitiva
- **Procesamiento de IA**: 
  - API de Google Gemini 2.0 Flash para análisis y extracción de datos
- **Optimización**: 
  - Lazy loading de recursos para mejor rendimiento
  - Preloading de scripts críticos
  - Compresión de assets para carga rápida

## 📁 Estructura del Proyecto
```
InvoiceGenPro/
├── assets/
│   ├── css/               # Estilos adicionales (complementa Tailwind)
│   ├── images/            # Imágenes, logos y favicons
│   └── js/
│       ├── app.js             # Lógica principal y controladores de UI
│       ├── iaDataGenerator.js # Procesamiento con IA (Gemini)
│       ├── pdfGenerator.js    # Generación y personalización de PDF
│       ├── translations.js    # Sistema de traducciones multiidioma
│       └── utils.js           # Funciones de utilidad y helpers
├── index.html             # Página principal con UI completa
├── site.webmanifest       # Configuración para PWA
├── robots.txt             # Directivas para crawlers de buscadores
├── sitemap.xml            # Mapa del sitio para SEO
├── favicon.ico            # Favicon del sitio
└── README.md              # Documentación del proyecto
```

## 📋 Funcionalidades Detalladas

### 1. 🏢 Gestión de Datos de Facturación
- **Información del emisor**: 
  - Campos para nombre/empresa con autoguardado
  - Dirección completa con formato multilínea
  - Posibilidad de incluir logo (en desarrollo)
- **Información del cliente**: 
  - Campos para nombre/empresa del destinatario
  - Dirección con soporte para formatos internacionales
  - Referencia de cliente opcional
- **Metadatos de factura**: 
  - Numeración automática con formato personalizable
  - Fechas de emisión y vencimiento con cálculo automático
  - Condiciones de pago preestablecidas (inmediato, 15, 30 o 60 días)
  - Campo opcional para número de orden de compra

### 2. 💰 Cálculo de Importes
- **Gestión de artículos**:
  - Interfaz intuitiva para añadir, editar y eliminar artículos
  - Cálculo automático del precio por cantidad
  - Validación de entrada para prevenir errores
- **Sistema de impuestos**:
  - Tasa de impuestos configurable (IVA, IGIC, etc.)
  - Cálculo automático sobre el subtotal
  - Visualización desglosada de bases imponibles
- **Balances económicos**:
  - Subtotal calculado automáticamente
  - Gestión de pagos a cuenta o parciales
  - Cálculo dinámico del saldo pendiente
  - Soporte para 19 monedas internacionales incluyendo USD, EUR, GBP, ARS, MXN, etc.

### 3. 🤖 Asistente de IA (Experimental)
- **Tecnología avanzada**:
  - Integración con Google Gemini 2.0 Flash API
  - Procesamiento de lenguaje natural para analizar datos estructurados y no estructurados
  - Sistema de prompts optimizados para extracción precisa de información
- **Capacidades de procesamiento**:
  - Reconocimiento automático de tablas de datos
  - Interpretación de información en cualquier formato (Excel, texto, emails)
  - Normalización de datos con diferentes formatos numéricos
  - Extracción de descripciones, cantidades, precios unitarios y totales
- **Flujo de trabajo**:
  - Interfaz modal para entrada de datos
  - Visualización previa de resultados procesados
  - Compatibilidad con formato de importación de datos
  - Sistema de gestión de errores y feedback

### 4. 📊 Generación y Visualización de PDF
- **Editor de diseño**:
  - Vista previa en tiempo real del documento final
  - Estilo profesional con colores personalizados
  - Secciones claramente definidas para mejor legibilidad
- **Características del PDF**:
  - Documento optimizado para visualización digital e impresión
  - Metadatos incorporados para mejor indexación
  - Estructura semántica para accesibilidad
  - Diseño responsivo adaptado a diferentes tamaños de papel
- **Opciones de salida**:
  - Descarga directa en formato PDF
  - Opción de impresión optimizada
  - Posibilidad de guardar como imagen (en desarrollo)

## 📋 Guía de Instalación y Uso Local
1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/ivaniraldi/InvoiceGenPro.git
   ```
2. **Navega al directorio del proyecto**:
   ```bash
   cd InvoiceGenPro
   ```
3. **Abre el archivo index.html en tu navegador** o utiliza un servidor local:
   ```bash
   # Con Python 3
   python -m http.server 8000
   
   # Con Node.js y npx
   npx serve
   ```
4. **Accede a la aplicación** en tu navegador: `http://localhost:8000`

## 🚀 Cómo Usar
1. **Configura los datos del emisor (tu empresa)**:
   - Completa tu nombre o razón social
   - Añade tu dirección completa
   - Personaliza con información adicional en notas si es necesario

2. **Ingresa la información del cliente**:
   - Nombre o razón social del destinatario
   - Dirección completa para entrega y facturación
   - Datos fiscales si aplica

3. **Configura los detalles de la factura**:
   - Fecha de emisión (predeterminada al día actual)
   - Condiciones de pago según acuerdo comercial
   - Número de factura personalizado o autogenerado
   - Fecha de vencimiento calculada según términos

4. **Gestiona los artículos o servicios**:
   - Añade artículos manualmente con el botón "Agregar artículo"
   - Especifica descripción, cantidad y precio unitario
   - Alternativamente, utiliza la función de IA para procesamiento automático

5. **Ajusta impuestos y pagos**:
   - Establece la tasa de impuestos aplicable
   - Selecciona la moneda correspondiente
   - Indica montos ya pagados si existen anticipos

6. **Previsualiza el resultado**:
   - Utiliza el botón "Vista Previa" para comprobar el aspecto final
   - Verifica que todos los datos sean correctos

7. **Genera y gestiona el PDF**:
   - Crea el documento final con "Generar PDF"
   - Descarga el archivo para guardar localmente
   - Imprime directamente desde la aplicación si es necesario

## 🤖 Procesamiento con IA (Función Experimental)
1. **Accede a la función de IA**:
   - Navega a la sección "Funciones Experimentales"
   - Haz clic en "Procesar con IA"

2. **Prepara los datos para procesamiento**:
   - Copia datos de facturas desde cualquier fuente (emails, hojas de cálculo, textos)
   - El sistema funciona mejor con datos tabulares pero puede procesar texto descriptivo

3. **Procesa los datos**:
   - Pega la información en el área de texto del modal
   - Haz clic en "Procesar" y espera mientras la IA analiza el contenido
   - La API de Gemini realizará la extracción y normalización de:
     * Descripciones de artículos o servicios
     * Fechas en formato unificado
     * Cantidades con dos decimales
     * Precios unitarios y totales

4. **Gestiona el resultado**:
   - Revisa los datos procesados para verificar la precisión
   - Copia el contenido procesado con el botón "Copiar"
   - El formato resultante será compatible con la importación

5. **Importa a la factura**:
   - Haz clic en "Importar Datos"
   - Pega el contenido procesado en el área de texto
   - Confirma la importación para añadir los artículos a la factura
   - Los valores serán automáticamente incorporados a la tabla de artículos

## 👨‍💻 Desarrollador
- **Autor**: Ivan Iraldi
- **GitHub**: [ivaniraldi](https://github.com/ivaniraldi)
- **LinkedIn**: [ivaniraldi](https://linkedin.com/in/ivaniraldi)
- **Portfolio**: [iraldidev.vercel.app](https://iraldidev.vercel.app)
- **Contacto**: Para consultas o sugerencias, abre un issue en el repositorio o contacta directamente a través de LinkedIn

## 📝 Contribuciones
Las contribuciones son bienvenidas y pueden realizarse mediante Pull Requests. Para cambios importantes, por favor abre primero un issue para discutir lo que te gustaría cambiar.

Áreas prioritarias para contribuciones:
- Mejoras en la experiencia móvil
- Nuevas plantillas de factura
- Optimización del algoritmo de IA
- Traducciones a otros idiomas

## 📄 Licencia
Este proyecto es de código abierto bajo la licencia MIT.

## 📋 Notas Importantes
- **Seguridad de datos**: La aplicación procesa todos los datos localmente en el navegador del usuario, sin enviar información a servidores externos excepto para el procesamiento de IA.
- **API de IA**: La función de procesamiento con IA utiliza la API de Google Gemini y está en fase experimental. La clave API incluida tiene restricciones y es solo para demostración.
- **Uso en producción**: Para entornos de producción, se recomienda:
  - Actualizar la clave API de Gemini con una adecuadamente configurada
  - Implementar un backend para almacenamiento persistente de facturas
  - Considerar implementaciones adicionales de seguridad

## 🔍 Próximas Funcionalidades
- Sistema de almacenamiento local para guardar facturas
- Exportación en múltiples formatos (XLSX, JSON)
- Personalización avanzada de plantillas
- Dashboard de análisis financiero básico
- Integración con servicios de firma digital
