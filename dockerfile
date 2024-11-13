# Usa una imagen base de Node.js
FROM node:16

# Define el directorio de trabajo
WORKDIR /code/test1
# Copia el archivo package.json y package-lock.json, e instala dependencias
COPY package*.json ./
RUN npm ci

# Copia todos los archivos del proyecto al directorio de trabajo
COPY .   /code/test1

# Exponer el puerto (opcional)

# Comando para iniciar la aplicación

CMD ["node", "/code/test1/app.js"]
