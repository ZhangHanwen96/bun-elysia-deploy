FROM oven/bun
WORKDIR /app
COPY package*.json bun.lockb ./
RUN bun install
COPY . .
 
ENV NODE_ENV production

EXPOSE 3000
 
CMD ["bun", "start"]