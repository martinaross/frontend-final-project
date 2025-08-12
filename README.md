# Base proyecto final UTN

Este es mi proyecto final para la materia, basado en la plantilla que usamos en clase, aunque no he usado la plantilla.  
Lo extendí y personalicé para cumplir con todos los requisitos de finalización.

Repositorio base: (https://github.com/martinaross/frontend-final-project/commits?author=martinaross)

---

## Objetivo general
Armar una aplicación web de tienda online **responsive** que:
- Liste productos desde una API pública.
- Permita buscar y filtrar productos en tiempo real.
- Tenga una página informativa **Sobre Nosotros**.
- Permita registrar usuarios usando la FakeStoreAPI.


### Diseño y estilo
- Estilos globales unificados en todas las páginas.
- Responsive con 3 puntos de corte:
  - **Mobile**: hasta 480px
  - **Tablet**: hasta 880px
  - **Escritorio**: resolución base
- Home con **grid adaptable** para mostrar productos.

### Interfaz
- **Búsqueda en vivo**: filtra mientras escribís y encuentra coincidencias parciales.
- Validación de formularios con mensajes claros (requerido, formato incorrecto, etc.).
- Página **Sobre Nosotros** con:
  1. De qué trata el proyecto.
  2. A quién está dirigido.
  3. Tecnologías usadas.

### Lógica de usuarios
- **Registro de usuario** usando `POST /users` de FakeStoreAPI.
- Al registrarse: simula inicio de sesión con `setUser(true)`.

---

## Páginas principales
- **Home**: listado y búsqueda de productos.
- **Sobre Nosotros**: información del proyecto.
- **Registro / Login**: formularios con validación.
- **404**: página de error responsive.

---

##  Cómo ejecutarlo localmente

### 1. Clonar el repositorio
```bash
git clone <URL_DEL_REPO>
cd <carpeta-del-proyecto>
