# Use an official Node.js runtime
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /src

# Copy package.json and package-lock.json first for better caching
COPY package.json package-lock.json ./

# Install the correct version of @testing-library/react
RUN npm install @testing-library/react@latest --save-dev

# Install all dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
