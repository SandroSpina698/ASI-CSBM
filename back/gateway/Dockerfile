FROM maven:3.8.5-openjdk-17 AS builder-gateway

WORKDIR /app
COPY . ./gateway
RUN mvn -f ./gateway/pom.xml clean package

FROM openjdk:17.0.1-jdk-slim

WORKDIR /app
COPY --from=builder-gateway /app/gateway/target/gateway-0.0.1-SNAPSHOT.jar ./gateway.jar

CMD ["java", "-jar", "gateway.jar"]
