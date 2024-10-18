FROM maven:3.8.5-openjdk-17 AS builder

WORKDIR /app

COPY ./discovery ./discovery
COPY ./gateway ./gateway
COPY ./generate-picture-ms ./generate-picture-ms
COPY ./generate-properties ./generate-properties
COPY ./generate-text-ms ./generate-text-ms
COPY ./mono ./mono

RUN mvn -f ./discovery/pom.xml clean package
RUN mvn -f ./gateway/pom.xml clean package
RUN mvn -f ./generate-picture-ms/pom.xml clean package
RUN mvn install:install-file -Dfile=./generate-properties/colorToproperties-1.1.2.jar -DgroupId=de.androidpit -DartifactId=colorToproperties -Dversion=1.1.2 -Dpackaging=jar -DgeneratePom=true && \
    mvn -f ./generate-properties/pom.xml clean package
RUN mvn -f ./generate-text-ms/pom.xml clean package
RUN mvn -f ./mono/pom.xml clean package


FROM openjdk:17.0.1-jdk-slim

WORKDIR /app

COPY --from=builder /app/discovery/target/discovery.jar ./discovery.jar
COPY --from=builder /app/gateway/target/gateway.jar ./gateway.jar
COPY --from=builder /app/generate-picture-ms/target/generate-picture-ms.jar ./generate-picture-ms.jar
COPY --from=builder /app/generate-properties/target/generate-properties.jar ./generate-properties.jar
COPY --from=builder /app/generate-text-ms/target/generate-text-ms.jar ./generate-text-ms.jar
COPY --from=builder /app/mono/target/mono.jar ./mono.jar

EXPOSE 8080 8081 8082 8083 8084 8085 8761

CMD ["sh", "-c", "java -jar discovery.jar & java -jar gateway.jar & java -jar generate-picture-ms.jar & java -jar generate-properties.jar & java -jar generate-text-ms.jar & java -jar mono.jar"]
