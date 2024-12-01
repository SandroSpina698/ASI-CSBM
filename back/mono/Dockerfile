FROM maven:3.8.5-openjdk-17 AS builder-mono

WORKDIR /app
COPY . ./mono
RUN mvn -f ./mono/pom.xml clean package

FROM openjdk:17.0.1-jdk-slim

WORKDIR /app
COPY --from=builder-mono /app/mono/target/mono-3.2.5.jar ./mono.jar

CMD ["java", "-jar", "mono.jar"]
