<div align="center">

# 🧰⚡ HomeFix

### Soluciones confiables para cada rincón de tu hogar.

HomeFix es una plataforma web para consultar, solicitar y administrar servicios para el hogar de forma rápida, organizada y confiable.

![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-Language-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Build-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Backend-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

</div>

---

## 📌 Descripción

**HomeFix** es un proyecto académico desarrollado para la asignatura **Estructuras de Datos II**.

La plataforma permite a los clientes consultar servicios para el hogar, revisar información detallada, agregar servicios al carrito, crear solicitudes y hacer seguimiento a sus pedidos.

El proyecto integra estructuras de datos dentro de funcionalidades reales del sistema, buscando que cada estructura tenga una aplicación clara y defendible.

---

## 👥 Integrantes

| Integrante | Responsabilidad principal |
|---|---|
| **Linda Valeria Quintero Hernández** | Home pública, interfaz visual y apoyo en documentación |
| **Juan Miguel Perdomo Muñoz** | Registro, login, dashboard, búsqueda, filtros y catálogo |
| **Manuel Betancurt Pérez** | Estructuras de datos, solicitudes, carrito, historial e integración |

---

## 🛠 Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| **React** | Construcción de la interfaz |
| **TypeScript** | Tipado y organización del código |
| **Vite** | Entorno de desarrollo frontend |
| **Firebase** | Autenticación y almacenamiento de datos |
| **React Router DOM** | Navegación entre páginas |
| **CSS Global** | Estilos del proyecto |
| **GitHub** | Control de versiones y trabajo por ramas |
| **Netlify** | Despliegue del frontend |

---

## 🧩 Módulos principales

| Módulo | Descripción |
|---|---|
| **Home pública** | Presenta HomeFix, sus servicios principales y accesos a login/registro |
| **Registro** | Permite registrarse como cliente o empresa |
| **Inicio de sesión** | Permite acceder al sistema según el rol del usuario |
| **Dashboard cliente** | Vista principal del cliente autenticado |
| **Catálogo de servicios** | Muestra servicios organizados por categorías |
| **Búsqueda y filtros** | Permite encontrar servicios por empresa, costo, categoría, valoración o zona |
| **Detalle de servicio** | Muestra información completa de un servicio |
| **Historial** | Guarda los servicios vistos recientemente |
| **Carrito** | Guarda servicios antes de confirmar una solicitud |
| **Mis solicitudes** | Permite consultar el estado de los servicios solicitados |
| **Perfil** | Permite ver y actualizar datos básicos del cliente |

---

## 🔐 Roles del sistema

| Rol | Descripción |
|---|---|
| **Visitante** | Puede ver la Home pública, iniciar sesión o registrarse |
| **Cliente** | Puede buscar servicios, agregarlos al carrito, crear solicitudes y consultar historial |
| **Empresa** | Puede registrarse para ofrecer servicios dentro de HomeFix |

> En la primera versión, el sistema se enfoca principalmente en la experiencia del cliente.

---

## 🧠 Estructuras de datos implementadas

| Estructura | Uso dentro de HomeFix | Justificación |
|---|---|---|
| **Stack / Pila** | Historial de servicios vistos | El último servicio consultado aparece primero |
| **Queue / Cola** | Solicitudes pendientes | La primera solicitud confirmada debe ser la primera en atenderse |
| **Árbol N-ario** | Categorías y subcategorías | Permite organizar servicios de forma jerárquica |
| **Árbol Binario de Búsqueda** | Búsqueda u ordenamiento de servicios | Permite ordenar por precio, valoración o nombre |
| **Grafo** | Zonas, empresas y servicios | Representa relaciones de cobertura entre elementos del sistema |

---

## 📁 Estructura general del proyecto

    src/
    │
    ├── algorithms/
    │   ├── Stack.ts
    │   ├── Queue.ts
    │   ├── NaryTree.ts
    │   ├── BinarySearchTree.ts
    │   └── Graph.ts
    │
    ├── components/
    │   ├── shared/
    │   └── services/
    │
    ├── context/
    │
    ├── data/
    │
    ├── Firebase/
    │   └── config.ts
    │
    ├── hooks/
    │
    ├── interfaces/
    │
    ├── pages/
    │
    ├── router/
    │
    ├── styles/
    │   └── index.css
    │
    ├── utils/
    │
    ├── App.tsx
    └── main.tsx

---

## 🏗 Arquitectura

HomeFix maneja una arquitectura frontend sencilla y organizada.

| Carpeta | Propósito |
|---|---|
| **algorithms** | Implementación de estructuras de datos |
| **components** | Componentes reutilizables de interfaz |
| **context** | Estado global compartido |
| **data** | Datos mock o información inicial |
| **Firebase** | Configuración de Firebase |
| **hooks** | Lógica reutilizable con hooks personalizados |
| **interfaces** | Tipos e interfaces de TypeScript |
| **pages** | Pantallas principales del sistema |
| **router** | Configuración de rutas |
| **styles** | Estilos globales |
| **utils** | Funciones auxiliares |

---

## 🔥 Firebase

Firebase se utilizará para manejar:

- Registro de clientes.
- Registro de empresas.
- Inicio de sesión.
- Almacenamiento de servicios.
- Almacenamiento de solicitudes.
- Historial.
- Carrito.
- Calificaciones.

Colecciones principales sugeridas:

| Colección | Descripción |
|---|---|
| **cuentas** | Control de correo, rol y estado |
| **clientes** | Información de clientes |
| **empresas** | Información de empresas |
| **servicios** | Servicios disponibles |
| **categorias** | Categorías y subcategorías |
| **solicitudes** | Solicitudes realizadas por clientes |
| **historial** | Servicios vistos recientemente |
| **carrito** | Servicios guardados temporalmente |
| **calificaciones** | Opiniones de servicios finalizados |

---

## 🌿 Ramas de trabajo

| Integrante | Rama principal |
|---|---|
| **Linda** | `feature/linda-home-docs-ui` |
| **Juan Miguel** | `feature/juan-auth-dashboard` |
| **Manuel** | `feature/manuel-core-structures` |

Cada integrante trabaja en su propia rama para facilitar la revisión del aporte individual en GitHub.

---

## 📌 Alcance inicial

La primera versión de HomeFix incluye:

- Home pública.
- Registro de cliente.
- Registro de empresa.
- Inicio de sesión.
- Dashboard del cliente.
- Catálogo de servicios.
- Búsqueda y filtros.
- Detalle de servicio.
- Historial.
- Carrito.
- Solicitudes.
- Implementación de estructuras de datos.
- Documentación del proyecto.
- Despliegue del frontend.

---

## 🚧 Funcionalidades futuras

Estas funcionalidades pueden desarrollarse en una segunda versión:

- Panel completo de empresa.
- Gestión avanzada de técnicos.
- Validación real de empresas.
- Chat entre cliente y empresa.
- Notificaciones en tiempo real.
- Mapa real con API externa.
- Pagos en línea.
- Facturación.

---

## 🌐 Enlaces del proyecto

| Recurso | Enlace |
|---|---|
| Repositorio | Pendiente |
| Despliegue en Netlify | Pendiente |
| Propuesta gráfica | Pendiente |

---

## 📄 Licencia

Proyecto académico desarrollado únicamente con fines educativos para la asignatura **Estructuras de Datos II**.

---

<div align="center">

### HomeFix  
**Soluciones confiables para cada rincón de tu hogar.**

</div>
