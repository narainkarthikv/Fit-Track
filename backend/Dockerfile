# Stage 1: Build the backend application
FROM node:18-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm ci

# Copy the rest of the application code to the container
COPY . .

# Stage 2: Create a lightweight runtime image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app /app

# Expose the port the app runs on
EXPOSE 4000

# Define the command to run your application
CMD ["node", "server.js"]
