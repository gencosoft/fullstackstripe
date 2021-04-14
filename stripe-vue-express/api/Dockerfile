# Use the official lightweight Node.js 12 image.
# https://hub.docker.com/_/node
FROM node:12-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

# Copy local code to the container image.
COPY . ./

# Set environment variables for container runtime.
ENV NODE_ENV=PROD
ENV PORT=8080
ENV STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY
ENV STRIPE_PUBLIC_KEY=YOUR_STRIPE_PUBLIC_KEY
ENV UI_HOST=YOUR_UI_WEB_SITE_HOST

# Run the web service on container startup.
CMD [ "npm", "start" ]
