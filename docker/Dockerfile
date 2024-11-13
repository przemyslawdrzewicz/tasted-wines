ARG NODE_VERSION=20.17.0

FROM node:${NODE_VERSION}-slim as base
WORKDIR /src

FROM base as build

COPY . .

RUN npm install


RUN npm run build

FROM base

COPY --from=build /src/.next /src/.next
COPY --from=build /src/node_modules /src/node_modules
COPY --from=build /src/public /src/public
COPY --from=build /src/package.json /src/package.json
COPY --from=build /src/next.config.js /src/next.config.js

CMD ["npm", "run", "start"]
