# base image
FROM node:lts as frontend-build
WORKDIR /usr/src/app
COPY frontend/ ./frontend/
RUN cd frontend && npm install @angular/cli && npm install && npm run build

FROM node:lts as backend-build
WORKDIR /root/
COPY --from=frontend-build /usr/src/app/frontend/dist ./frontend/dist
COPY backend/src/app.js ./app.js
COPY backend/package.json ./package.json
COPY backend/package-lock.json ./package-lock.json
COPY backend/example.env ./.env
RUN npm install
CMD ["node", "app.js"]