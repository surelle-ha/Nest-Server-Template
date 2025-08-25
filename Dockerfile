# Use a lightweight Node.js 20 Alpine image as the base
FROM node:20.18.3-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only package files to leverage Docker cache for faster builds
COPY package*.json ./

# Install production dependencies (no dev dependencies)
RUN npm ci --only=production

# Copy the rest of the project files into the container
COPY . .

# Build the application (e.g., transpile TypeScript, bundle assets)
RUN npm run build

# Build the documentation (e.g., Compodoc or similar)
RUN npm run docs:build

# Expose ports for the app (8000) and documentation server (8080)
EXPOSE 8000 8080

# Run the container, executing the "docker:prepare" script
CMD ["npm", "run", "docker:prepare"]
