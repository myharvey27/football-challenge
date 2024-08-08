# Step 1: Build the React app
FROM node:18-alpine

# Set working directory
WORKDIR /frontend/

# Install dependencies
COPY public/ /frontend/public
COPY src/ /frontend/src
COPY package.json /frontend/
RUN npm install

CMD ["npm", "run", "dev"]
