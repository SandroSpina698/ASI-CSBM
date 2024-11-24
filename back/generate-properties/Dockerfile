FROM maven:3.8.5-openjdk-17 AS builder-generate-properties

WORKDIR /app
COPY . ./generate-properties
RUN mvn install:install-file -Dfile=./generate-properties/colorToproperties-1.1.2.jar -DgroupId=de.androidpit -DartifactId=colorToproperties -Dversion=1.1.2 -Dpackaging=jar -DgeneratePom=true && \
    mvn -f ./generate-properties/pom.xml clean package

FROM openjdk:17.0.1-jdk-slim

WORKDIR /app
COPY --from=builder-generate-properties /app/generate-properties/target/generate-properties-0.0.1-SNAPSHOT.jar ./generate-properties.jar

CMD ["java", "-jar", "generate-properties.jar"]
