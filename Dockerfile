###################
# BUILD FOR LOCAL DEVELOPMENT
###################
FROM node:18-alpine As dev

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
RUN npx prisma generate


###################
# BUILD FOR PRODUCTION
###################
FROM dev As build

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
RUN npx prisma generate
RUN yarn build
ENV NODE_ENV production
RUN yarn install --frozen-lockfile --production && yarn cache clean


###################
# PRODUCTION
###################
FROM build As prod
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/config ./config
COPY --from=build /usr/src/app/package.json ./

# CMD [ "node", "dist/main.js" ]