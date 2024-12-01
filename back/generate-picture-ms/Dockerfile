FROM maven:3.8.5-openjdk-17 AS builder-generate-picture-ms

WORKDIR /app
COPY . ./generate-picture-ms
RUN mvn -f ./generate-picture-ms/pom.xml clean package

FROM openjdk:17.0.1-jdk-slim

WORKDIR /app
COPY --from=builder-generate-picture-ms /app/generate-picture-ms/target/generate-picture-0.0.1-SNAPSHOT.jar ./generate-picture-ms.jar

CMD ["java", "-jar", "generate-picture-ms.jar"]
