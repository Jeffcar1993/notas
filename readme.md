Notas App

Descripción

Notas App es una aplicación web desarrollada con Next.js 13.5+, que permite la gestión de notas con funcionalidades de crear, leer, actualizar y eliminar (CRUD). Se integra con Firebase para el almacenamiento de datos y utiliza TailwindCSS para una experiencia de usuario moderna y responsiva.

Tecnologías Utilizadas

Next.js 13.5+ con App Router (app/) y estructura organizada en src/

Firebase para autenticación y base de datos

TailwindCSS para el diseño y estilos

React Hooks para el manejo del estado (useState, useEffect, useParams)

Optimización de asincronía en la gestión de datos

Barra de busqueda

Diseño UX/UI mejorado para una experiencia de usuario intuitiva

Características

📌 Notas Dinámicas: Lista, agrega, edita y elimina notas fácilmente.

🚀 Visualiza nota espcifica y ejecuta funciones importantes desde alli

🔥 Persistencia con Firebase: Guarda y sincroniza tus notas en la nube.

🎨 Diseño Responsive: Optimizado con TailwindCSS para cualquier dispositivo.

-- contiene una data inicial en formato json de prueba

⚡ Optimizado: Buen manejo de useEffect y useState para mejorar rendimiento.

Instalación y Configuración

Clonar el repositorio:

git clone 

cd notas-app

Instalar dependencias:

npm install

Configurar Firebase:

Crea un proyecto en Firebase y habilita Firestore y Authentication.

Copia las credenciales de Firebase y agrégalas en un archivo .env.local:

NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id

Ejecutar la aplicación:

npm run dev

La aplicación estará disponible en http://localhost:3000.

Uso

Visualiza las notas que te renderiza

Agregar una nueva nota dando clic en el boton crear nota y escribiendo en el formulario y presionando "Guardar".

Editar una nota existente haciendo clic en el botón de edición.

Eliminar una nota con el botón de eliminar.

Las notas se guardan en Firebase y persisten al recargar la página.

Contribuir

Si deseas contribuir:

Haz un fork del repositorio.

Crea una rama con tu nueva funcionalidad: git checkout -b feature/nueva-funcionalidad.

Sube tus cambios y abre un pull request.



