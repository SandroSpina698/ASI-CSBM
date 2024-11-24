FROM maven:3.8.5-openjdk-17 AS builder-generate-text-ms

WORKDIR /app
COPY . ./generate-text-ms
RUN mvn -f ./generate-text-ms/pom.xml clean package

FROM openjdk:17.0.1-jdk-slim

WORKDIR /app
COPY --from=builder-generate-text-ms /app/generate-text-ms/target/generate-text-0.0.1-SNAPSHOT.jar ./generate-text-ms.jar

CMD ["java", "-jar", "generate-text-ms.jar"]
