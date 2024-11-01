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

COPY --from=builder /app/discovery/target/discovery-0.0.1-SNAPSHOT.jar ./discovery.jar
COPY --from=builder /app/gateway/target/gateway-0.0.1-SNAPSHOT.jar ./gateway.jar
COPY --from=builder /app/generate-picture-ms/target/generate-picture-0.0.1-SNAPSHOT.jar ./generate-picture-ms.jar
COPY --from=builder /app/generate-properties/target/generate-properties-0.0.1-SNAPSHOT.jar ./generate-properties.jar
COPY --from=builder /app/generate-text-ms/target/generate-text-0.0.1-SNAPSHOT.jar ./generate-text-ms.jar
COPY --from=builder /app/mono/target/mono-3.2.5.jar ./mono.jar

CMD ["sh", "-c", "java -jar discovery.jar & java -jar gateway.jar & java -jar generate-picture-ms.jar & java -jar generate-properties.jar & java -jar generate-text-ms.jar & java -jar mono.jar"]
