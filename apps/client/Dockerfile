FROM node:20-alpine AS base
# node 20ver alpine으로 경량화된 이미지를 생성

# pnpm설치
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# base를 기반으로 builder 이미지 생성
FROM base AS builder
WORKDIR /app
RUN pnpm install turbo --global
COPY . .
RUN turbo prune client --docker


# 추가한 독립적인 workspace의 lockfile과 package.json 을 추가하고
FROM base AS installer
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install

COPY --from=builder /app/out/full/ .

COPY turbo.json turbo.json

RUN pnpm turbo run build --filter=client...

FROM base AS runner

WORKDIR /app

COPY --from=installer /app/apps/client/dist /app/tmp/client/dist

CMD cp -r /app/tmp/client/dist/* /app/apps/client/dist/


