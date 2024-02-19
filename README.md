# Chez Gustave

![Logo](client/public/logo.png)

[Specifications](https://docs.google.com/document/d/1n2IyRwiLYHipTCYBZB25tJW4XGaWm-z8f3i0Kxcx-pU/edit?usp=sharing)
[Kanban](https://projet.errhub404.fr/?controller=BoardViewController&action=show&project_id=7)
[Assets](https://drive.google.com/drive/folders/180yJM1hKLHpg4uTajRZUu5odq5EVkdl2?usp=drive_link)

## Starting the project

The only thing needed is [Docker](https://www.docker.com/products/docker-desktop/).

Once you have it you can only the current folder (the only containing the README.md) in a command line.

And run `docker compose up -d`. This should start the server and the client.

The server should be accessible on `localhost:3630`, and the client on `localhost:5173`.

If you want to close them `docker compose kill` to close the server, client and database and `docker compose down` to delete the containers.

## Tests

### Server

To run server tests your need to run the `docker-compose.test.yml` instead of the normal `docker-compose.yml`

To do that you should run: `docker compose -f docker-compose.test.yml up -d`.

### Client

To run client tests you need to start docker as normal and then `cd` into the client directory and run `npx cypress open`.

This should open a browser where you can access, edit and create e2e tests.
