FROM oven/bun

WORKDIR /app

COPY package*.json bun.lockb ./
RUN bun install --production

COPY src src
COPY tsconfig.json .
# COPY public public
 
ENV NODE_ENV production

EXPOSE 3000
 
CMD ["bun", "start"]