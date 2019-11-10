### Todo List
### Descripción y contexto
---
Webapp que permite al usuario que se registra:
 - Crear una Tarea con una descripción y adjuntarle un documento o imagen.
 - Ver las tareas previamente creadas, filtrarlas por descripción, Id o estado (Pendiente, Realizada, Todas).
 - Cambiar el estado de una tarea de pendiente a realizada o viceversa haciendo click en la etiqueta correspondiente en la columna "Estado".
 - Descargar el archivo adjunto con anterioridad.
 - Eliminar las tareas.


### Guía de usuario
---
Al iniciar la aplicación. Si el usuario no posee cuenta puede registrarse incresando en "Crear Cuenta".
Con una cuenta creada el usuario puede loguearse al sistema ingresando email y la contraseña creada anteriormente.
Una vez dentro del sistema, podrá ver y filtrar todas las tareas creadas, cambiar su estado, eliminarlas, descargar el archivo adjunto si lo tuviera y crear nuevas tareas.

Al crear una nueva tarea el campo "Descripción" es requerido. Mientras que los formatos de archivo adjunto permitidos son: jpg, jpeg, png, gif, doc, docx, pdf, txt.

 	
### Guía de instalación
---

Todo List es una aplicación desarrollada en Node.js y Angular. La cual se conecta a una base de datos MongoDB. Por lo tanto para ejecutar la aplicación se requiere:

- Tener instalado y ejecutando Mongo en su configuración por defecto en el puerto 27017.
- Tener instalado Node.js ^v10.x.x

Para ejecutar la aplicación dirigirse al directorio "backend" e instalar las dependencias.

    npm install

Una vez instaladas las dependencias de node y con MongoDB ejecutandose. Ejecutar la aplicación desde el directorio "backend".

    npm start

Por defecto la aplicación se ejecuta en la dirección

    localhost:3000

---

#### Frontend

El código fuente del frontend esta desarrollado en Angular 8. Y se encuentra dentro del directorio "frontend".

Para poder ejecutarlo es necesario instalar las dependecias dentro del directorio "frontend" con:

    npm install

Una vez instaladas las dependencias ejecutar la SPA con:

    ng serve -o

---

#### Autor

Federico Rodriguez

fs.rodriguez91@gmail.com