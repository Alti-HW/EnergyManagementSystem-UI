# Use a lightweight Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /src

# Copy package.json and package-lock.json first for better caching
COPY package.json package-lock.json ./

# Remove cached dependencies to avoid conflicts
RUN rm -rf node_modules package-lock.json


RUN npm install -g npm@11.1.0



# Copy the rest of the application
COPY . .

# Build the React app with limited memory usage
RUN NODE_OPTIONS="--max-old-space-size=512" npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
