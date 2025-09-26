# STAGE 1: Build the application with Maven
# Use a valid, existing image tag from Docker Hub
FROM maven:3.9.6-eclipse-temurin-21 AS build

# Set the working directory
WORKDIR /app

# Copy the Maven project file first to leverage Docker's dependency caching
COPY pom.xml .

# Copy the entire backend source code
# This is the crucial step that ensures your new files (like WebConfig.java) are included
COPY src ./src

# Run the Maven build to create the JAR file.
# This now runs on the fresh source code we just copied.
RUN mvn clean install -DskipTests


# STAGE 2: Create the final, lightweight image
FROM openjdk:21-slim

# Set the working directory
WORKDIR /app

# Copy the compiled JAR file from the 'build' stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port the application runs on
EXPOSE 8082

# The command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]

