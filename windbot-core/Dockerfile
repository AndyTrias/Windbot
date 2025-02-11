# Stage 1: Build the application
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

# Copy pom.xml and download dependencies separately to leverage caching
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code and build the application
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:21-jdk AS runtime

WORKDIR /app

# Copy the JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Use build arg to set the port
ARG SERVICE_PORT=8080
ENV SERVER_PORT=${SERVICE_PORT}

# Expose the configurable port
EXPOSE ${SERVER_PORT}

# Run the application with the configured port
ENTRYPOINT ["java", "-jar", "-Dserver.port=${SERVER_PORT}", "app.jar"]