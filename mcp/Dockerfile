FROM node:slim

WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Set environment variables (can be overridden at runtime)
ENV NODE_ENV=production

# Expose the port for the Express server
EXPOSE 3001

# Command to run the MCP server
CMD ["npm", "run", "server"]
