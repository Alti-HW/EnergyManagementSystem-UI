# Use the latest stable Node.js version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package.json package-lock.json ./

# Remove existing node_modules & package-lock.json to prevent conflicts
RUN rm -rf node_modules package-lock.json

# Ensure npm is up-to-date (but do not force upgrade to an incompatible version)
RUN npm install -g npm@latest

# Install dependencies cleanly
RUN npm install --force --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Fix missing module errors (ajv issue)
RUN npm dedupe && npm install

# Build the React app
RUN NODE_OPTIONS="--max-old-space-size=1024" npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start
