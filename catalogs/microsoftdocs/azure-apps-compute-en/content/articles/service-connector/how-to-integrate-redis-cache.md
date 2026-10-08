---
title: Integrate Azure Cache for Redis with Service Connector
description: Learn how to integrate Azure Cache for Redis and Azure Cache for Redis Enterprise into your application with Service Connector.
author: maud-lv
ms.author: malev
ms.service: service-connector
ms.topic: how-to
ms.date: 07/23/2026
---

# Integrate Azure Cache for Redis with Service Connector

This article covers supported authentication methods, clients, and sample code you can use to connect your apps to Azure Cache for Redis using Service Connector. In this article, you'll also find default environment variable names, values, and configuration obtained when creating service connections.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-cache-for-redis/includes/cache-retirement-alert.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-connector/how-to-integrate-redis-cache.md)

## Supported compute services

You can use Service Connector to connect the following compute services to Azure Cache for Redis:

- Azure App Service
- Azure Functions
- Azure Kubernetes Service (AKS)
- Azure Spring Apps

## Supported authentication and client types

The following table shows which combinations of authentication methods and clients are supported for connecting your compute service to Azure Cache for Redis by using Service Connector. "Yes" means that the combination is supported. "No" means that it isn't supported.

| Client type | System-assigned managed identity | User-assigned managed identity | Secret / connection string | Service principal |
| --- | --- | --- | --- | --- |
| .NET | Yes | Yes | Yes | Yes |
| Go | Yes | Yes | Yes | Yes |
| Java | Yes | Yes | Yes | Yes |
| Java - Spring Boot | No | No | Yes | No |
| Node.js | Yes | Yes | Yes | Yes |
| Python | Yes | Yes | Yes | Yes |
| None | Yes | Yes | Yes | Yes |

## Default environment variable names or application properties and sample code

Use the following environment variable names and application properties to connect compute services to your Redis server. To learn more about naming conventions, check the [Service Connector internals](concept-service-connector-internals.md#configuration-naming-convention) article.

### System-assigned managed identity

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| `AZURE_REDIS_HOST` | Redis endpoint | `<RedisName>.redis.cache.windows.net` |

#### Sample code

The following steps and code show you how to use a system-assigned managed identity to connect to Redis.


#### [.NET](#tab/dotnet)

1. Install dependencies.

    ```bash
    dotnet add package Microsoft.Azure.StackExchangeRedis --version 3.2.0
    ```

1. Add the authentication logic with environment variables set by Service Connector. For more information, see [Microsoft.Azure.StackExchangeRedis Extension](https://github.com/Azure/Microsoft.Azure.StackExchangeRedis).

    ```csharp
    using StackExchange.Redis;
    var cacheHostName = Environment.GetEnvironmentVariable("AZURE_REDIS_HOST");
    var configurationOptions = ConfigurationOptions.Parse($"{cacheHostName}:6380");

    // Uncomment the following lines corresponding to the authentication type you want to use.
    // For system-assigned identity.
    // await configurationOptions.ConfigureForAzureWithTokenCredentialAsync(new DefaultAzureCredential());

    // For user-assigned identity.
    // var managedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_REDIS_CLIENTID");
    // await configurationOptions.ConfigureForAzureWithUserAssignedManagedIdentityAsync(managedIdentityClientId);

    // Service principal secret.
    // var clientId = Environment.GetEnvironmentVariable("AZURE_REDIS_CLIENTID");
    // var tenantId = Environment.GetEnvironmentVariable("AZURE_REDIS_TENANTID");
    // var secret = Environment.GetEnvironmentVariable("AZURE_REDIS_CLIENTSECRET");
    // await configurationOptions.ConfigureForAzureWithServicePrincipalAsync(clientId, tenantId, secret);


    var connectionMultiplexer = await ConnectionMultiplexer.ConnectAsync(configurationOptions);
    ```

#### [Java](#tab/java)

Follow the instructions at [Connect to Azure Managed Redis](https://redis.io/docs/latest/develop/clients/jedis/amr/) for using the `redis-authx-entraid` package.

#### [Spring Boot](#tab/springBoot)

Not supported yet.

#### [Python](#tab/python)

Follow the instructions at [Connect to Azure Managed Redis](https://redis.io/docs/latest/develop/clients/redis-py/amr/) for using the `redis-entra-id` package.

#### [Go](#tab/go)

Follow the instructions at [Connect to Azure Managed Redis](https://redis.io/docs/latest/develop/clients/go/amr/) for using the `go-redis-entraid` package.

#### [Node.js](#tab/nodejs)

Follow the instructions at [Connect to Azure Managed Redis](https://redis.io/docs/latest/develop/clients/nodejs/amr/) for using the `@redis/entraid` package.

### [Other](#tab/other)

For other languages, you can use the Azure Identity client library (and connection information that Service Connector sets to the environment variables) to connect to Azure Managed Redis.


### User-assigned managed identity

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| `AZURE_REDIS_HOST` | Redis endpoint | `<RedisName>.redis.cache.windows.net` |
| `AZURE_REDIS_CLIENTID` | Managed-identity client ID | `<client-ID>` |

#### Sample code

The following steps and code show you how to use a user-assigned managed identity to connect to Redis.


#### [.NET](#tab/dotnet)

1. Install dependencies.

    ```bash
    dotnet add package Microsoft.Azure.StackExchangeRedis --version 3.2.0
    ```

1. Add the authentication logic with environment variables set by Service Connector. For more information, see [Microsoft.Azure.StackExchangeRedis Extension](https://github.com/Azure/Microsoft.Azure.StackExchangeRedis).

    ```csharp
    using StackExchange.Redis;
    var cacheHostName = Environment.GetEnvironmentVariable("AZURE_REDIS_HOST");
    var configurationOptions = ConfigurationOptions.Parse($"{cacheHostName}:6380");

    // Uncomment the following lines corresponding to the authentication type you want to use.
    // For system-assigned identity.
    // await configurationOptions.ConfigureForAzureWithTokenCredentialAsync(new DefaultAzureCredential());

    // For user-assigned identity.
    // var managedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_REDIS_CLIENTID");
    // await configurationOptions.ConfigureForAzureWithUserAssignedManagedIdentityAsync(managedIdentityClientId);

    // Service principal secret.
    // var clientId = Environment.GetEnvironmentVariable("AZURE_REDIS_CLIENTID");
    // var tenantId = Environment.GetEnvironmentVariable("AZURE_REDIS_TENANTID");
    // var secret = Environment.GetEnvironmentVariable("AZURE_REDIS_CLIENTSECRET");
    // await configurationOptions.ConfigureForAzureWithServicePrincipalAsync(clientId, tenantId, secret);


    var connectionMultiplexer = await ConnectionMultiplexer.ConnectAsync(configurationOptions);
    ```

#### [Java](#tab/java)

Follow the instructions at [Connect to Azure Managed Redis](https://redis.io/docs/latest/develop/clients/jedis/amr/) for using the `redis-authx-entraid` package.

#### [Spring Boot](#tab/springBoot)

Not supported yet.

#### [Python](#tab/python)

Follow the instructions at [Connect to Azure Managed Redis](https://redis.io/docs/latest/develop/clients/redis-py/amr/) for using the `redis-entra-id` package.

#### [Go](#tab/go)

Follow the instructions at [Connect to Azure Managed Redis](https://redis.io/docs/latest/develop/clients/go/amr/) for using the `go-redis-entraid` package.

#### [Node.js](#tab/nodejs)

Follow the instructions at [Connect to Azure Managed Redis](https://redis.io/docs/latest/develop/clients/nodejs/amr/) for using the `@redis/entraid` package.

### [Other](#tab/other)

For other languages, you can use the Azure Identity client library (and connection information that Service Connector sets to the environment variables) to connect to Azure Managed Redis.


### Connection string

> **Warning:**
> We recommend that you use the most secure authentication flow available. The authentication flow described here requires a very high degree of trust in the application, and carries risks that aren't present in other flows. You should use this flow only when more secure flows, such as managed identities, aren't viable.

#### [.NET](#tab/dotnet)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_REDIS_CONNECTIONSTRING` | `StackExchange.Redis` connection string | `<redis-server-name>.redis.cache.windows.net:6380,password=<redis-key>,ssl=True,defaultDatabase=0` |

#### [Java](#tab/java)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_REDIS_CONNECTIONSTRING` | Jedis connection string | `rediss://:<redis-key>@<redis-server-name>.redis.cache.windows.net:6380/0` |

#### [Spring Boot](#tab/springBoot)

| Application properties | Description | Example value |
| --- | --- | --- |
| `spring.redis.host` | Redis host | `<redis-server-name>.redis.cache.windows.net` |
| `spring.redis.port` | Redis port | `6380` |
| `spring.redis.database` | Redis database | `0` |
| `spring.redis.password` | Redis key | `<redis-key>` |
| `spring.redis.ssl` | SSL setting | `true` |

#### [Python](#tab/python)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_REDIS_CONNECTIONSTRING` | `redis-py` connection string | `rediss://:<redis-key>@<redis-server-name>.redis.cache.windows.net:6380/0` |

#### [Go](#tab/go)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_REDIS_CONNECTIONSTRING` | `go-redis` connection string | `rediss://:<redis-key>@<redis-server-name>.redis.cache.windows.net:6380/0` |

#### [Node.js](#tab/nodejs)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_REDIS_CONNECTIONSTRING` | `node-redis` connection string | `rediss://:<redis-key>@<redis-server-name>.redis.cache.windows.net:6380/0` |

#### [Other](#tab/none)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_REDIS_HOST` | Redis host | `<redis-server-name>.redis.cache.windows.net` |
| `AZURE_REDIS_PORT` | Redis port | `6380` |
| `AZURE_REDIS_DATABASE` | Redis database | `0` |
| `AZURE_REDIS_PASSWORD` | Redis key | `<redis-key>` |
| `AZURE_REDIS_SSL` | SSL setting | `true` |

---

#### Sample code

The following steps and code show you how to use a connection string to connect to Azure Cache for Redis.


#### [.NET](#tab/dotnet)

1. Install dependencies.
    ```bash
    dotnet add package StackExchange.Redis --version 2.6.122
    ```
1. Get the connection string from the environment variable added by Service Connector.
    
    ```csharp
    using StackExchange.Redis;
    var connectionString = Environment.GetEnvironmentVariable("AZURE_REDIS_CONNECTIONSTRING");
    var _redisConnection = await RedisConnection.InitializeAsync(connectionString: connectionString);
    ```
    
#### [Java](#tab/java)

1. Add the following dependency in your `pom.xml` file:
    ```xml
    <dependency>
      <groupId>redis.clients</groupId>
      <artifactId>jedis</artifactId>
      <version>4.1.0</version>
      <type>jar</type>
      <scope>compile</scope>
    </dependency>
    ```
1. Get the connection string from the environment variable added by Service Connector.
    ```java
    import redis.clients.jedis.DefaultJedisClientConfig;
    import redis.clients.jedis.Jedis;
    import redis.clients.jedis.JedisShardInfo;
    import java.net.URI;
    
    String connectionString = System.getenv("AZURE_REDIS_CONNECTIONSTRING");
    URI uri = new URI(connectionString);
    JedisShardInfo shardInfo = new JedisShardInfo(uri);
    shardInfo.setSsl(true);
    Jedis jedis = new Jedis(shardInfo);
    ```

#### [Spring Boot](#tab/springBoot)

To set up your Spring application, refer to [Use Azure Redis Cache in Spring](https://learn.microsoft.com/azure/developer/java/spring-framework/configure-spring-boot-initializer-java-app-with-redis-cache). Service Connector adds the configuration properties to Spring Apps.

#### [Python](#tab/python)

1. Install dependencies.
    ```bash
    pip install redis
    ```
1. Get the connection string from the environment variable added by Service Connector.
    ```python
    import os
    import redis
    
    url = os.getenv('AZURE_REDIS_CONNECTIONSTRING')
    url_connection = redis.from_url(url)
    url_connection.ping()
    ```

#### [Go](#tab/go)

1. Install dependencies.
    ```bash
    go get github.com/redis/go-redis/v9
    ```
1. Get the connection string from the environment variable added by Service Connector.
    ```go
    import (
        "context"
        "fmt"
    
        "github.com/redis/go-redis/v9"
    )

    connectionString := os.Getenv("AZURE_REDIS_CONNECTIONSTRING")
    opt, err := redis.ParseURL(connectionString)
    if err != nil {
    	panic(err)
    }
    
    client := redis.NewClient(opt)
    ```

#### [Node.js](#tab/nodejs)

1. Install dependencies.
    ```bash
    npm install redis
    ```
1. Get the connection string from the environment variable added by Service Connector.
    
    ```javascript
    const redis = require("redis");
    
    const connectionString = process.env.AZURE_REDIS_CONNECTIONSTRING;
    const cacheConnection = redis.createClient({
        url: connectionString,
    });
    await cacheConnection.connect();
    ```

#### [Other](#tab/other)
For other languages, you can use the connection information that Service Connector sets to the environment variables to connect to Azure Cache for Redis.


### Service principal

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| `AZURE_REDIS_HOST` | Redis endpoint | `<RedisName>.redis.cache.windows.net` |
| `AZURE_REDIS_CLIENTID` | Client ID of the service principal | `<client-ID>` |
| `AZURE_REDIS_CLIENTSECRET` | Secret of the service principal | `<client-secret>` |
| `AZURE_REDIS_TENANTID` | Tenant ID of the service principal | `<tenant-id>` |

#### Sample code

The following steps and code show you how to use a service principal to connect to Redis.


#### [.NET](#tab/dotnet)

1. Install dependencies.

    ```bash
    dotnet add package Microsoft.Azure.StackExchangeRedis --version 3.2.0
    ```

1. Add the authentication logic with environment variables set by Service Connector. For more information, see [Microsoft.Azure.StackExchangeRedis Extension](https://github.com/Azure/Microsoft.Azure.StackExchangeRedis).

    ```csharp
    using StackExchange.Redis;
    var cacheHostName = Environment.GetEnvironmentVariable("AZURE_REDIS_HOST");
    var configurationOptions = ConfigurationOptions.Parse($"{cacheHostName}:6380");

    // Uncomment the following lines corresponding to the authentication type you want to use.
    // For system-assigned identity.
    // await configurationOptions.ConfigureForAzureWithTokenCredentialAsync(new DefaultAzureCredential());

    // For user-assigned identity.
    // var managedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_REDIS_CLIENTID");
    // await configurationOptions.ConfigureForAzureWithUserAssignedManagedIdentityAsync(managedIdentityClientId);

    // Service principal secret.
    // var clientId = Environment.GetEnvironmentVariable("AZURE_REDIS_CLIENTID");
    // var tenantId = Environment.GetEnvironmentVariable("AZURE_REDIS_TENANTID");
    // var secret = Environment.GetEnvironmentVariable("AZURE_REDIS_CLIENTSECRET");
    // await configurationOptions.ConfigureForAzureWithServicePrincipalAsync(clientId, tenantId, secret);


    var connectionMultiplexer = await ConnectionMultiplexer.ConnectAsync(configurationOptions);
    ```

#### [Java](#tab/java)

Follow the instructions at [Connect to Azure Managed Redis](https://redis.io/docs/latest/develop/clients/jedis/amr/) for using the `redis-authx-entraid` package.

#### [Spring Boot](#tab/springBoot)

Not supported yet.

#### [Python](#tab/python)

Follow the instructions at [Connect to Azure Managed Redis](https://redis.io/docs/latest/develop/clients/redis-py/amr/) for using the `redis-entra-id` package.

#### [Go](#tab/go)

Follow the instructions at [Connect to Azure Managed Redis](https://redis.io/docs/latest/develop/clients/go/amr/) for using the `go-redis-entraid` package.

#### [Node.js](#tab/nodejs)

Follow the instructions at [Connect to Azure Managed Redis](https://redis.io/docs/latest/develop/clients/nodejs/amr/) for using the `@redis/entraid` package.

### [Other](#tab/other)

For other languages, you can use the Azure Identity client library (and connection information that Service Connector sets to the environment variables) to connect to Azure Managed Redis.


## Related content

* [Learn about Service Connector concepts](concept-service-connector-internals.md)
