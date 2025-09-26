# Use an official Java runtime as the base image
FROM openjdk:21-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the pre-built JAR file from your target folder
COPY target/BackEnd-0.0.1-SNAPSHOT.jar /app/app.jar

# Expose the port your Spring Boot app listens on
EXPOSE 8082

# Define the command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]