
# Usa una imagen oficial de Node.js como base
FROM node:16

# Establece el directorio de trabajo en la imagen Docker
WORKDIR /app

# Copia los archivos `package.json` y `package-lock.json`
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación al contenedor
COPY . .

# Expone el puerto en el que la aplicación se ejecuta
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "app.js"]