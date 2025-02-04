# Use a stable Node.js 20 image (solves npm version conflict)
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package.json package-lock.json ./

# Remove cached dependencies to avoid conflicts
RUN rm -rf node_modules package-lock.json

# Install dependencies (without forcing an npm upgrade)
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Build the React app with optimized memory usage
RUN NODE_OPTIONS="--max-old-space-size=1024" npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
