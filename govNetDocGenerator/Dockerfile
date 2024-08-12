# Stage 1: Build the Vue.js application
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code
COPY . .

# Build the application
RUN npm run build

# Install serve
RUN npm install -g serve

# Expose port
EXPOSE 5173

# Start the server
CMD ["serve", "-s", "dist", "-l", "5173"]
