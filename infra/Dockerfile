# INTENTIONALLY INSECURE TEST FIXTURE — never build.
FROM node:latest
USER root
COPY . /app
RUN chmod -R 777 /app
EXPOSE 22 3000
CMD ["node", "/app/src/server.js"]
