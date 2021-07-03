# c01

A Node / TypeScript project.

---
A REST API service to manage recipes. It serves as a proof-of-concept, and a way to practice interesting patterns like dependency injection. Besides, it is useful to have a good grasp of TypeScript and its benefits over Javascript, 

Following good practices, this project has a branching model with a `main` and `dev` branches. The multilayer architecture is simple yet efficient and scalable, where each layer has their own set of unit tests (based on a TDD approach). With TypeScript, it was possible to apply OOP concepts and follow the SOLID principles.

With the created pipeline, it was possible to test BitBucket CI capabilities. There is a there is a set of end-to-end tests created with Postman that are yet to be added to this pipeline. 

This project aims to be part of a MERN stack. 

---
Unit tests with Mocha and Chai.

Using the Mongo Driver for database.

---

Install with:
```shell
npm install
```

Build the program:
```shell
npm run:build
```

Run the program:
```shell
npm start
```

Run with auto-reload for development:

```shell
npm run dev
``` 

Run tests:
```shell
npm test
```
