---
title: Integrate Neon Serverless Postgres with Service Connector
description: Integrate Neon Serverless Postgres into your application with Service Connector.
author: maud-lv
ms.author: malev
ms.service: service-connector
ms.topic: how-to
ms.custom: engagement-fy23
ms.date: 06/17/2026
---

# Integrate Neon Serverless Postgres with Service Connector

This article describes the supported authentication methods and clients, and provides sample code for connecting Neon Serverless Postgres from Azure compute services by using Service Connector. You can still connect to Neon Serverless Postgres in other programming languages without using Service Connector. This article also lists default environment variable names and values (or Spring Boot configuration) that you receive when you create the service connection.

## Supported compute services

Service Connector can be used to connect the following compute services to Neon Serverless Postgres:

- Azure App Service
- Azure Functions
- Azure Kubernetes Service (AKS)
- Azure Spring Apps

## Supported authentication types and client types

The table below shows which combinations of authentication methods and clients are supported for connecting your compute service to Neon Serverless Postgres using Service Connector. A “Yes” indicates that the combination is supported, while a “No” indicates that it is not supported.

| Client type | System-assigned managed identity | User-assigned managed identity | Secret/connection string | Service principal |
| --- | :---: | :---: | :---: | :---: |
| .NET | No | No | Yes | No |
| Go (pg) | No | No | Yes | No |
| Java (JDBC) | No | No | Yes | No |
| Java - Spring Boot (JDBC) | No | No | Yes | No |
| Node.js (pg) | No | No | Yes | No |
| PHP (native) | No | No | Yes | No |
| Python (psycopg2) | No | No | Yes | No |
| Python-Django | No | No | Yes | No |
| Ruby (ruby-pg) | No | No | Yes | No |
| None | No | No | Yes | No |

This table shows that Service Connector for Neon Serverless Postgres supports only the connection string authentication method. Managed identity and service principal aren't supported for this target service.

## Default environment variable names or application properties and sample code

Reference the connection details and sample code in the following tables, according to your connection's authentication type and client type, to connect compute services to Neon Serverless Postgres. For more information about naming conventions, check the [Service Connector internals](concept-service-connector-internals.md#configuration-naming-convention) article.

### Connection string

> **Warning:**
> Microsoft recommends that you use the most secure authentication flow available. The authentication flow described in this procedure requires a very high degree of trust in the application, and carries risks that are not present in other flows. You should only use this flow when other more secure flows, such as managed identities, aren't viable.

#### [.NET](#tab/dotnet)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `NEON_POSTGRESQL_CONNECTIONSTRING` | .NET PostgreSQL connection string | `Server=ep-still-mud-a12aa123.eastus2.azure.neon.tech;Database=<database-name>;Port=5432;Ssl Mode=Require;User Id=<username>;` |

#### [Java](#tab/java)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `NEON_POSTGRESQL_CONNECTIONSTRING` | JDBC PostgreSQL connection string | `jdbc:postgresql://ep-still-mud-a12aa123.eastus2.azure.neon.tech:5432/<database-name>?sslmode=require&user=<username>&password=<password>` |

#### [Spring Boot](#tab/springBoot)

| Application properties | Description | Example value |
| --- | --- | --- |
| `spring.datasource.url` | Database URL | `jdbc:postgresql://ep-still-mud-a12aa123.eastus2.azure.neon.tech:5432/<database-name>?sslmode=require` |
| `spring.datasource.username` | Database username | `<username>` |
| `spring.datasource.password` | Database password | `<password>` |

#### [Python](#tab/python)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `NEON_POSTGRESQL_CONNECTIONSTRING` | psycopg2 connection string | `dbname=<database-name> host=ep-still-mud-a12aa123.eastus2.azure.neon.tech port=5432 sslmode=require user=<username> password=<password>` |

#### [Django](#tab/django)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `NEON_POSTGRESQL_NAME` | Database name | `<database-name>` |
| `NEON_POSTGRESQL_HOST` | Database host URL | `ep-still-mud-a12aa123.eastus2.azure.neon.tech` |
| `NEON_POSTGRESQL_USER` | Database username | `<username>` |
| `NEON_POSTGRESQL_PASSWORD` | Database password | `<database-password>` |

#### [Go](#tab/go)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `NEON_POSTGRESQL_CONNECTIONSTRING` | Go PostgreSQL connection string | `host=ep-still-mud-a12aa123.eastus2.azure.neon.tech dbname=<database-name> sslmode=require user=<username> password=<password>` |

#### [NodeJS](#tab/nodejs)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `NEON_POSTGRESQL_HOST` | Database host URL | `ep-still-mud-a12aa123.eastus2.azure.neon.tech` |
| `NEON_POSTGRESQL_USER` | Database username | `<username>` |
| `NEON_POSTGRESQL_PASSWORD` | Database password | `<password>` |
| `NEON_POSTGRESQL_DATABASE` | Database name | `<database-name>` |
| `NEON_POSTGRESQL_PORT` | Port number | `5432` |
| `NEON_POSTGRESQL_SSL` | SSL option | `true` |

#### [PHP](#tab/php)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `NEON_POSTGRESQL_CONNECTIONSTRING` | PHP native PostgreSQL connection string | `host=ep-still-mud-a12aa123.eastus2.azure.neon.tech port=5432 dbname=<database-name> sslmode=require user=<username> password=<password>` |

#### [Ruby](#tab/ruby)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `NEON_POSTGRESQL_CONNECTIONSTRING` | Ruby PostgreSQL connection string | `host=<your-postgres-server-name>.postgres.database.azure.com port=5432 dbname=<database-name> sslmode=require user=<username> password=<password>` |

#### [Other](#tab/none)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `NEON_POSTGRESQL_HOST` | Database host URL | `ep-still-mud-a12aa123.eastus2.azure.neon.tech` |
| `NEON_POSTGRESQL_USERNAME` | Database username | `<username>` |
| `NEON_POSTGRESQL_DATABASE` | Database name | `<database-name>` |
| `NEON_POSTGRESQL_PORT` | Port number | `5432` |
| `NEON_POSTGRESQL_SSL` | SSL option | `true` |
| `NEON_POSTGRESQL_PASSWORD` | Database password | `<password>` |

---

#### Sample code

To connect to Neon Serverless Postgres using a connection string:

### [.NET](#tab/dotnet)

1. Install dependencies following [the Npgsql guidance](https://www.npgsql.org/doc/installation.html)
1. In code, get the PostgreSQL connection string from environment variables added by Service Connector.
    ```csharp
    using System;
    using Npgsql;
   
    string connectionString = Environment.GetEnvironmentVariable("NEON_POSTGRESQL_CONNECTIONSTRING");
    using (NpgsqlConnection connection = new NpgsqlConnection(connectionString))
    {
        connection.Open();
    }
    ```

### [Java](#tab/java)

1. Install dependencies following [the pgJDBC guidance](https://jdbc.postgresql.org/documentation/).
1. In code, get the PostgreSQL connection string from environment variables added by Service Connector.
    ```java
    import java.sql.Connection;
    import java.sql.DriverManager;
    import java.sql.SQLException;

    String connectionString = System.getenv("NEON_POSTGRESQL_CONNECTIONSTRING");
    Connection connection = null;
    try {
        connection = DriverManager.getConnection(connectionString);
        System.out.println("Connection successful!");
    } catch (SQLException e){
        System.out.println(e.getMessage());
    }
   ```

### [Spring Boot](#tab/springBoot)

1. Install the Spring Cloud Azure Starter JDBC PostgreSQL module by adding the following dependencies to your `pom.xml` file. Find the version of Spring Cloud Azure [here](https://github.com/Azure/azure-sdk-for-java/wiki/Spring-Versions-Mapping#which-version-of-spring-cloud-azure-should-i-use).
    ```xml
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>com.azure.spring</groupId>
                <artifactId>spring-cloud-azure-dependencies</artifactId>
                <version>4.11.0</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <dependency>
                <groupId>com.azure.spring</groupId>
                <artifactId>spring-cloud-azure-starter-jdbc-postgresql</artifactId>
            </dependency>
        </dependencies>
    </dependencyManagement>
    ```
1. Set up a Spring Boot application, more details in this [section](https://learn.microsoft.com/azure/developer/java/spring-framework/configure-spring-data-jpa-with-azure-postgresql?tabs=password%2Cservice-connector).

### [Python](#tab/python)

1. Install dependencies following [the psycopg2 guidance](https://pypi.org/project/psycopg2/).
1. In code, get the PostgreSQL connection information from environment variables added by Service Connector.
   ```python
   import os
   import psycopg2
   
   connection_string = os.getenv('NEON_POSTGRESQL_CONNECTIONSTRING')
   connection = psycopg2.connect(connection_string)
   print("Connection established")
   
   connection.close()
   ```

### [Django](#tab/django)

1. Install dependencies following [the Django guidance](https://docs.djangoproject.com/en/4.2/topics/install/) and [psycopg2 guidance](https://pypi.org/project/psycopg2/).
   ```bash
   pip install django
   pip install psycopg2
   ```
1. In the setting file, get the PostgreSQL database information from environment variables added by Service Connector.
   ```python
   # in your setting file, eg. settings.py
   host = os.getenv('NEON_POSTGRESQL_HOST')
   user = os.getenv('NEON_POSTGRESQL_USER')
   password = os.getenv('NEON_POSTGRESQL_PASSWORD')
   database = os.getenv('NEON_POSTGRESQL_NAME')
   
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql_psycopg2',
           'NAME': database,
           'USER': user,
           'PASSWORD': password,
           'HOST': host,
           'PORT': '5432',  # Port is 5432 by default 
           'OPTIONS': {'sslmode': 'require'},
       }
   }
   ```

### [Go](#tab/go)

1. Install dependencies.
    ```bash
    go get github.com/lib/pq
    ```
1. In code, get the PostgreSQL connection string from environment variables added by Service Connector.
    ```go
    import (
    "database/sql"
    "fmt"
    "os"

	_ "github.com/lib/pq"
    )

    connectionString := os.Getenv("NEON_POSTGRESQL_CONNECTIONSTRING")
    conn, err := sql.Open("postgres", connectionString)
	if err != nil {
		panic(err)
	}

	conn.Close()
    ```

### [NodeJS](#tab/nodejs)

1. Install dependencies.
    ```bash
    npm install pg dotenv
    ```
1. In code, get the PostgreSQL connection information from environment variables added by Service Connector.
   ```javascript
   import { Client } from 'pg';
   
   (async () => {
    const client = new Client({
        host: process.env.NEON_POSTGRESQL_HOST,
        user: process.env.NEON_POSTGRESQL_USER,
        password: process.env.NEON_POSTGRESQL_PASSWORD,
        database: process.env.NEON_POSTGRESQL_DATABASE,
        port: Number(process.env.NEON_POSTGRESQL_PORT) ,
        ssl: process.env.NEON_POSTGRESQL_SSL
    });
    await client.connect();

    await client.end();
   })();
   ```

### [PHP](#tab/php)

1. In code, get the PostgreSQL connection information from environment variables added by Service Connector.
    ```php
    <?php
    $conn_string = getenv('NEON_POSTGRESQL_CONNECTIONSTRING');
    $dbconn = pg_connect($conn_string);
    ?>
    ```

### [Ruby](#tab/ruby)

1. Install dependencies.
   ```bash
   gem install pg
   ```
1. In code, get the PostgreSQL connection information from environment variables added by Service Connector.
    ```ruby
    require 'pg'
    require 'dotenv/load'

    begin
        conn = PG::Connection.new(
            connection_string: ENV['NEON_POSTGRESQL_CONNECTIONSTRING'],
        )
    rescue PG::Error => e
        puts e.message

    ensure
        connection.close if connection
    end
    ```

### [Other](#tab/none)
For other languages, use the connection properties that Service Connector sets to the environment variables to connect the database. For environment variable details, see [Integrate Neon Serverless Postgres with Service Connector](how-to-integrate-neon-postgres.md).



## Next steps

Follow the tutorials listed below to learn more about Service Connector.

> 
> [Learn about Service Connector concepts](concept-service-connector-internals.md)
