---
title: Integrate MongoDB Atlas cluster with Service Connector
description: Integrate MongoDB Atlas cluster into your application with Service Connector.
author: qianwens
ms.author: qianwens
ms.service: service-connector
ms.topic: how-to
ms.custom:
  - engagement-fy23
  - build-2025
ms.date: 06/18/2026
---

# Integrate MongoDB Atlas cluster with Service Connector

This article describes supported authentication methods and clients, and provides sample code for connecting Azure compute services to MongoDB Atlas clusters by using Service Connector. You can also connect to MongoDB Atlas clusters in other programming languages without using Service Connector. This article also lists default environment variable names and values you get when you create the service connection.

## Supported compute services

Service Connector can be used to connect the following compute services to MongoDB Atlas cluster:

- Azure App Service
- Azure Functions
- Azure Kubernetes Service (AKS)

## Supported authentication types and client types

The table below shows which combinations of authentication methods and clients are supported for connecting your compute service to MongoDB Atlas cluster using Service Connector. A “Yes” indicates that the combination is supported, while a “No” indicates that it is not supported.

| Client type | System-assigned managed identity | User-assigned managed identity | Secret/connection string | Service principal |
| --- | :---: | :---: | :---: | :---: |
| .NET | No | No | Yes | No |
| Go | No | No | Yes | No |
| Java (JDBC) | No | No | Yes | No |
| Java - Spring Boot (JDBC) | No | No | Yes | No |
| Node.js | No | No | Yes | No |
| PHP (native) | No | No | Yes | No |
| Python (PyMongo) | No | No | Yes | No |
| Python-Django | No | No | Yes | No |
| Ruby | No | No | Yes | No |
| None | No | No | Yes | No |


## Default environment variable names or application properties and sample code

Reference the connection details and sample code in the following tables, according to your connection's authentication type and client type, to connect compute services to MongoDB Atlas cluster. For more information about naming conventions, check the [Service Connector internals](concept-service-connector-internals.md#configuration-naming-convention) article.

### Connection string

> **Warning:**
> Microsoft recommends that you use the most secure authentication flow available. The authentication flow described in this procedure requires a very high degree of trust in the application, and carries risks that are not present in other flows. You should only use this flow when other more secure flows, such as managed identities, aren't viable.

#### [.NET](#tab/dotnet)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `MONGODBATLAS_CLUSTER_CONNECTIONSTRING` | .NET MongoDB Atlas connection string | `mongodb+srv://<database-username>:<database-password>@<cluster-URL>/?retryWrites=true&w=majority&appName=Cluster0` |

#### [Java](#tab/java)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `MONGODBATLAS_CLUSTER_CONNECTIONSTRING` | JDBC MongoDB Atlas connection string | `jdbc:mongodb+srv://<database-username>:<database-password>@<cluster-URL>/?retryWrites=true&w=majority&appName=Cluster0` |

#### [Python](#tab/python)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `MONGODBATLAS_CLUSTER_CONNECTIONSTRING` | Python MongoDB Atlas connection string | `mongodb+srv://<database-username>:<database-password>@<cluster-URL>/?retryWrites=true&w=majority&appName=Cluster0` |

#### [Django](#tab/django)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `MONGODBATLAS_CLUSTER_CONNECTIONSTRING` | Django MongoDB Atlas connection string | `mongodb+srv://<database-username>:<database-password>@<cluster-URL>/?retryWrites=true&w=majority&appName=Cluster0` |

#### [Go](#tab/go)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `MONGODBATLAS_CLUSTER_CONNECTIONSTRING` | Go MongoDB Atlas connection string | `mongodb+srv://<database-username>:<database-password>@<cluster-URL>/?retryWrites=true&w=majority&appName=Cluster0` |

#### [Node.js](#tab/nodejs)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `MONGODBATLAS_CLUSTER_CONNECTIONSTRING` | NodeJS MongoDB Atlas connection string | `mongodb+srv://<database-username>:<database-password>@<cluster-URL>/?retryWrites=true&w=majority&appName=Cluster0` |

#### [PHP](#tab/php)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `MONGODBATLAS_CLUSTER_CONNECTIONSTRING` | PHP native MongoDB Atlas connection string | `mongodb+srv://<database-username>:<database-password>@<cluster-URL>/?retryWrites=true&w=majority&appName=Cluster0` |

#### [Ruby](#tab/ruby)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `MONGODBATLAS_CLUSTER_CONNECTIONSTRING` | Ruby MongoDB Atlas connection string | `mongodb+srv://<database-username>:<database-password>@<cluster-URL>/?retryWrites=true&w=majority&appName=Cluster0` |

#### [Other](#tab/none)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `MONGODBATLAS_CLUSTER_CONNECTIONSTRING` | MongoDB Atlas connection string | `mongodb+srv://<database-username>:<database-password>@<cluster-URL>/?retryWrites=true&w=majority&appName=Cluster0` |

---

#### Sample code

Refer to the steps and code below to connect to MongoDB Atlas cluster using a connection string.

### [.NET](#tab/dotnet)

1. Install dependency.
    ```bash
    dotnet add package MongoDb.Driver
    ```

1. Get the connection string from the environment variable added by Service Connector and connect to MongoDB Atlas.
    ```csharp
    using MongoDB.Driver;

    var connectionString = Environment.GetEnvironmentVariable("MONGODBATLAS_CLUSTER_CONNECTIONSTRING");
    var client = new MongoClient(connectionString);
    ```


### [Java](#tab/java)

1. Add the following dependency in your *pom.xml* file:
    ```xml
    <dependency>
	    <groupId>org.mongodb</groupId>
	    <artifactId>mongo-java-driver</artifactId>
	    <version>3.4.2</version>
	</dependency>   
    ```

1. Get the connection string from the environment variable added by Service Connector and connect to MongoDB Atlas.

    ```java
    import com.mongodb.MongoClient;
    import com.mongodb.MongoClientURI;
    import com.mongodb.client.MongoCollection;
    import com.mongodb.client.MongoDatabase;
    import com.mongodb.client.model.Filters;
    
    String connectionString = System.getenv("MONGODBATLAS_CLUSTER_CONNECTIONSTRING");
    MongoClientURI uri = new MongoClientURI(connectionString);
		
    MongoClient mongoClient = null;
    try {
        mongoClient = new MongoClient(uri);        
    } finally {
        if (mongoClient != null) {
            mongoClient.close();
        }
    }
    ```

### [Python](#tab/python)
1. Install dependency.
    ```bash
    pip install pymongo
    ```

1. Get the connection string from the environment variable added by Service Connector and connect to MongoDB Atlas.
    ```python
    import os
    import pymongo

    conn_str = os.environ.get("MONGODBATLAS_CLUSTER_CONNECTIONSTRING")
    client = pymongo.MongoClient(conn_str)
    ```

### [Go](#tab/go)
1. Install dependency.
   ```bash
   go get go.mongodb.org/mongo-driver/mongo
   ```
1. Get the connection string from the environment variable added by Service Connector and connect to MongoDB Atlas.
    ```go
    import (
    	"context"
    	"fmt"
    	"log"
    	"os"
        
        "go.mongodb.org/mongo-driver/bson"
    	"go.mongodb.org/mongo-driver/mongo"
    	"go.mongodb.org/mongo-driver/mongo/options"
    )

    ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
    defer cancel()
    
    mongoDBConnectionString = os.Getenv("MONGODBATLAS_CLUSTER_CONNECTIONSTRING")
    clientOptions := options.Client().ApplyURI(mongoDBConnectionString).SetDirect(true)
    
    c, err := mongo.Connect(ctx, clientOptions)
    if err != nil {
        log.Fatalf("unable to initialize connection %v", err)
    }

    err = c.Ping(ctx, nil)
    if err != nil {
        log.Fatalf("unable to connect %v", err)
    }
    ```

### [Node.js](#tab/nodejs)
1. Install dependency.
    ```bash
    npm install mongodb
    ```
1. Get the connection string from the environment variable added by Service Connector and connect to MongoDB Atlas.
    ```javascript
    const { MongoClient, ObjectId } = require('mongodb');
    
    const url = process.env.MONGODBATLAS_CLUSTER_CONNECTIONSTRING;
    const client = new MongoClient(url);
    ```


### [Other](#tab/none)
For other languages, you can use the MongoDB resource endpoint and other properties that Service Connector sets to the environment variables to connect to MongoDB Atlas. For environment variable details, see [Integrate MongoDB with Service Connector](how-to-integrate-mongodb-atlas.md).



## Next steps

Follow the tutorials listed below to learn more about Service Connector.

> 
> [Connect apps to MongoDB Atlas](howto-mongodb-atlas-service-connection.md)
