Plataforma web integral (Frontend y Backend) desarrollada para modernizar la atención al cliente de instituciones, cooperativas o entes municipales de servicios. El sistema permite a los usuarios buscar, visualizar y descargar sus boletas de forma online, reduciendo la atención presencial y agilizando la gestión administrativa.

El mayor desafío técnico y valor agregado de este proyecto es su capacidad para servir como puente entre interfaces web modernas y bases de datos legadas (archivos .dbf de Visual FoxPro).

✨ Características Principales
Oficina Virtual / Autogestión: Búsqueda segura de facturas utilizando nombre del titular y número de cuenta.

Integración con Sistemas Legados: Backend diseñado para consultar en tiempo real bases de datos de Visual FoxPro.

Generación de Comprobantes: Visualización detallada de la boleta y exportación a formato PDF.

Interfaz UI/UX: Diseño responsive (adaptable a móviles y escritorio), rápido y accesible, construido con HTML semántico.

Sección Institucional: Maquetación de páginas informativas, autoridades, contactos rápidos y un slider de noticias.

🛠️ Tecnologías Utilizadas
Frontend: HTML5, CSS3 (Flexbox/Grid), Vanilla JavaScript, LocalStorage API.

Backend: Node.js, Express.js.

Base de Datos: Visual FoxPro (mediante VFP OLE DB Provider) / Archivos .dbf.

Arquitectura: API RESTful orientada al consumo desde el cliente estático.

🚀 Despliegue (Deployment)
El sistema está diseñado para ser alojado en entornos con Windows Server e IIS (Internet Information Services), actuando como Proxy Inverso hacia el servicio de Node.js (gestionado mediante PM2) para garantizar el acceso a las rutas locales de datos.

Nota: Esta es una versión anonimizada de un proyecto profesional. Los datos, logos y nombres mostrados en las capturas o en el código son ficticios y se utilizan únicamente a modo de demostración.
