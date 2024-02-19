# Simple NOC

Aplicación de monitoreo que continuamente revisa el estado de un servicio, guarda los *logs* en un archivo o base
de datos, y los envia por correo a la media noche de cada dia. Desarrollada con Node.js y TypeScript.

**Conocimientos adquiridos:** Patrón repositorio, inyección de dependencias, monitoreo, MongoDB,
PostgreSQL, NodeMailer.

## Instalación

Clonar el proyecto.

```bash
  git clone https://github.com/RaulF8a/simple-noc.git
```

Colocarse en el directorio del proyecto.

```bash
  cd simple-noc
```

A partir de la plantilla, crear un archivo .env con las variables indicadas. Luego, levantar las bases de datos con Docker.
```bash
  docker compose up -d
```

Instalar las dependencias.

```bash
  npm install
```

Reconstruir el cliente de Prisma.
```
npx prisma migrate dev
```

Correr en modo de desarrollo.

```bash
  npm run dev
```
    