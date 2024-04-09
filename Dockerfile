FROM oven/bun
WORKDIR /app
COPY package*.json bun.lockb ./
RUN bun install
COPY . .
 
ENV NODE_ENV production
ARG PORT
EXPOSE ${PORT:-3000}
 
CMD ["bun", "start"]