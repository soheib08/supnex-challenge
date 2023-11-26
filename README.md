# Supnex-challenge

Description of supnex backend challenge.

## Table of Contents

- [Project Description](#project-description)
- [Project requirements](#Project-requirements)
- [Plus requirements](#Plus-requirements)
- [Getting Started](#getting-started)
  - [Running the App](#running-the-app)
  - [Running Tests](#running-tests)

## Project Description

This project is based on Nestjs. It has 4 modules: category, raw material, supplier and supplier-material.
each module contains request dtos, repositories, interface of repository, services, controllers and a mongodb schema and may have event emitters and event handlers.
Category module is responsible for crud api management of category. and supplier module as well for crud api management of supplier.
Raw material module contains raw material crud api, and a separate service for get raw material list (project requirement). Supplier-material module is responsible for handling supplier's material stocks and prices.

## Project requirements

- Nestjs : done
- Mongodb or postgreSql: I used mongodb because of aggregation pipeline in raw materials list service. I think postgresql is better for structured data, but i choose mongo for given reason.
- Testing and tdd: All apis are tested and covered by jest successfully. for tdd approach, i tried my best to do as it requested but for lack of time and my lack of experience of tdd approach, i think i would not do it correctly.
- Documentation and git repo: Based on this file, done :)

## Plus requirements

- docker : done. In following section i explain how to project this with docker
- events: done. When a supplier stock changes in add material for supplier api or by change stock api, a "stock.updated" event emits and raw material module handle this event and update given raw material stock in db.
- microservice and queue management: not unfortunately

## Getting Started

### Running the App

For running the app with docker please use this command:

```bash
docker-compose up
```

For running the app locally please run the following commands:

```bash
cd project directory
npm install
npm run start
```

Make sure you have the following installed before running the app locally:

- Node.js
- npm
- MongoDB

  In each case you can see the swagger api documentation on "localhost:3000/api"


### Running Tests
For running tests you can use 
```bash
npm run test
```
