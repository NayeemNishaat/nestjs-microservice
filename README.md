# NestJs Microservices

# Description

This is a NestJs microservices application. It has two microservices, one is the api gateway microservice and the other is the fileurl microservice. The fileurl microservice is responsible for creating/reading/updating/deleting fileurl. The api gateway microservice is the entry point for the application. It is responsible for routing the request to the respective microservice.

# Remark

Please create the .env file by following .env.example file in the respective microservice before running them. For running a microservice go to the resoective folder and run the following command:

```bash
npm ci && npm run start:dev
```
