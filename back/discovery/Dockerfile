FROM maven:3.8.5-openjdk-17 AS builder-discovery

WORKDIR /app
COPY . ./discovery
RUN mvn -f ./discovery/pom.xml clean package

FROM openjdk:17.0.1-jdk-slim

WORKDIR /app
COPY --from=builder-discovery /app/discovery/target/discovery-0.0.1-SNAPSHOT.jar ./discovery.jar

CMD ["java", "-jar", "discovery.jar"]
