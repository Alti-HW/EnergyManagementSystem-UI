# Use an official Node.js runtime
FROM node:18-alpine

# Set working directory
WORKDIR /src

# Copy package.json and package-lock.json for better caching
COPY package.json package-lock.json ./

# Remove any cached dependencies
RUN rm -rf node_modules package-lock.json

# Install the latest version of @testing-library/react
RUN npm install @testing-library/react@latest --save-dev --legacy-peer-deps

# Install all dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Build the React app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
