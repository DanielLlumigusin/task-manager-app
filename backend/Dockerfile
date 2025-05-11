# Usa una imagen de Java oficial
FROM eclipse-temurin:17-jdk

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el jar construido al contenedor
COPY target/taskmanager-0.0.1-SNAPSHOT.jar app.jar

# Expone el puerto que usará el backend
EXPOSE 8080

# Ejecuta la app
ENTRYPOINT ["java", "-jar", "app.jar"]
