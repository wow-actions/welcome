FROM node:10-slim

# Copy the rest of your action's code
COPY . .

RUN yarn
RUN yarn build

ENTRYPOINT ["node", "/lib/index.js"]
