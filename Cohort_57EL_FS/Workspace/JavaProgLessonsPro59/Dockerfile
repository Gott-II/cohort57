# =========================
# STAGE 1: BUILD
# =========================
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# Nur pom.xml kopieren → Dependency Cache nutzen
COPY pom.xml .
RUN mvn -q -DskipTests dependency:go-offline

# Jetzt erst den Source-Code kopieren
COPY src ./src

# Build
RUN mvn -q -DskipTests package -DfinalName=app

# =========================
# STAGE 2: RUNTIME
# =========================
FROM eclipse-temurin:21-jre

# Sicherheits-User
RUN useradd -m spring
USER spring

WORKDIR /app

# Nur das fertige JAR kopieren
COPY --from=build /app/target/*.jar /app/app.jar

# Logs nach außen mounten
VOLUME ["/app/logs"]

EXPOSE 8080

# JVM optimiert für Container
ENV JAVA_TOOL_OPTIONS="\
  -XX:+UseContainerSupport \
  -XX:MaxRAMPercentage=75 \
  -XX:+ExitOnOutOfMemoryError \
  -Dlogging.file.path=/app/logs \
"

ENTRYPOINT ["java", "-jar", "/app/app.jar"]




