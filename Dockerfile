FROM oven/bun

WORKDIR /app

COPY package*.json bun.lockb bunfig.toml ./
RUN bun install --frozen-lockfile

COPY . .
# COPY src src
# COPY tsconfig.json .
# COPY public public
# COPY public public
 
ENV NODE_ENV production

EXPOSE 3000
 
CMD ["bun", "src/index.tsx"]