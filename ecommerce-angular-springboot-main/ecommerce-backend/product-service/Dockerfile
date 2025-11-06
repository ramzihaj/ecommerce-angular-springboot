# Multi-stage build pour Product Service
# NOTE: Ce Dockerfile doit être exécuté depuis le dossier ecommerce-backend (parent)
# docker build -f product-service/Dockerfile -t product-service .

FROM maven:3.9-eclipse-temurin-21-alpine AS build

WORKDIR /build

# Copier le pom parent
COPY pom.xml .

# Copier et builder le module common d'abord
COPY common/pom.xml ./common/pom.xml
COPY common/src ./common/src
RUN cd common && mvn clean install -DskipTests -B

# Copier le module product-service
COPY product-service/pom.xml ./product-service/pom.xml
COPY product-service/src ./product-service/src

# Build le product-service
RUN cd product-service && mvn clean package -DskipTests -B

# Stage de production
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Installer curl pour healthcheck
RUN apk add --no-cache curl

# Créer un utilisateur non-root
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copier le JAR depuis le stage de build
COPY --from=build /build/product-service/target/*.jar app.jar

# Exposer le port
EXPOSE 8081

# Variables d'environnement par défaut
ENV SPRING_PROFILES_ACTIVE=tunisia
ENV JAVA_OPTS="-Xms512m -Xmx1024m -XX:+UseG1GC"

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:8081/actuator/health || exit 1

# Lancer l'application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar app.jar"]
