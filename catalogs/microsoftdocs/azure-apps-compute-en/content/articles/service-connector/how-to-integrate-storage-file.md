---
title: Integrate Azure Files with Service Connector
description: Integrate Azure Files into your application by using Service Connector.
author: maud-lv
ms.author: malev
ms.service: service-connector
ms.topic: how-to
ms.date: 04/08/2026
#customer intent: As an Azure app developer, I want to see authentication methods, environment variables, and sample code for connecting Azure Files, so I can integrate Azure Files into my Azure apps.
---

# Integrate Azure Files with Service Connector

This article shows supported clients, authentication methods, and sample code you can use to connect Azure Files to other Azure services using Service Connector. This article also shows the default environment variables you need to create the service connections.

## Supported compute services

You can use Service Connector to connect the following Azure compute services to Azure Files:

- Azure App Service
- Azure Functions
- Azure Kubernetes Service (AKS)
- Azure Spring Apps

## Supported clients and authentication type

The following client types support connecting Azure Files to Azure compute services by using Service Connector:

- .NET
- Java
- Java Spring Boot
- Node.js
- Python
- PHP
- Ruby

>**Note:**
>You might be able to connect to Azure Files in other programming languages without using Service Connector.

Azure Files supports only secret or connection string authentication. System-assigned managed identity, user-assigned managed identity, and service principal authentication aren't available.

> **Important:**
> The secret or connection string authentication flow requires a high degree of trust in the application, and carries risks not present in other flows. You should use this flow only when more secure flows, such as managed identities, aren't available.

## Default environment variables

Use the following connection details to connect supported Azure compute services to Azure Files. In the values, replace the following placeholders with the values for your app:

- `<account-name>`
- `<account-key>`
- `<storage-account-name>`
- `<storage-account-key>`

For more information about naming conventions, see [Configuration naming convention](concept-service-connector-internals.md#configuration-naming-convention).

#### All client types except Spring Boot

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| AZURE_STORAGEFILE_CONNECTIONSTRING | File storage connection string | `DefaultEndpointsProtocol=https;AccountName=<account-name>;AccountKey=<account-key>;EndpointSuffix=core.windows.net` |

#### Spring Boot client type

| Application properties | Description | Example value |
| --- | --- | --- |
| azure.storage.account-name | File storage account name | `<storage-account-name>` |
| azure.storage.account-key | File storage account key | `<storage-account-key>` |
| azure.storage.file-endpoint | File storage endpoint | `https://<storage-account-name>.file.core.windows.net/` |
| spring.cloud.azure.storage.fileshare.account-name | File storage account name for Spring Cloud Azure version above 4.0 | `<storage-account-name>` |
| spring.cloud.azure.storage.fileshare.account-key | File storage account key for Spring Cloud Azure version above 4.0 | `<storage-account-key>` |
| spring.cloud.azure.storage.fileshare.endpoint | File storage endpoint for Spring Cloud Azure version above 4.0 | `https://<storage-account-name>.file.core.windows.net/` |

## Sample connection code

Use the following steps and sample code to connect to Azure Files using an account key with Service Connector.


### [.NET](#tab/dotnet)

1. Install dependency.

    ```bash
    dotnet add package Azure.Storage.Files.Shares --version 12.16.0
    ```

1. Run the following code, getting the connection string from the Service Connector environment variable.
    
    ```csharp
    using System;
    using Azure.Storage.Files.Shares;
    using Azure.Storage.Files.Shares.Models;
    
    var connectionString = Environment.GetEnvironmentVariable("AZURE_STORAGEFILE_CONNECTIONSTRING");
    ShareServiceClient service = new ShareServiceClient(connectionString)
    ```

### [Java](#tab/java)

1. Add the following dependency in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-storage-file-share</artifactId>
        <version>12.20.1</version>
    </dependency>
    ```

1. Run the following code, getting the connection string from the environment variable added by Service Connector.

    ```java
    import com.azure.storage.file.share.*;
    
    String connectionString = System.getenv("AZURE_STORAGEFILE_CONNECTIONSTRING");
    ShareServiceClient fileServiceClient = new ShareServiceClientBuilder()
        .connectionString(CONNECTION_STRING).buildClient();
    ```

### [Spring Boot](#tab/springBoot)

To set up your Spring application, see [Using Spring Cloud Azure Storage File Share Starter](https://github.com/Azure-Samples/azure-spring-boot-samples/tree/spring-cloud-azure_4.4.1/storage/spring-cloud-azure-starter-storage-file-share/storage-file-sample). The sample provides two sets of configuration properties according to the version of Spring Cloud Azure, below 4.0 or above 4.0. For more information, see [Azure Storage File Share Properties](https://microsoft.github.io/spring-cloud-azure/current/reference/html/appendix.html#azure_storage_file_share_proeprties).

### [Python](#tab/python)

1. Install dependency.

    ```bash
    pip install azure-storage-file-share
    ```

1. Run the following code, getting the connection string from the Service Connector environment variable.

    ```python
    from azure.storage.fileshare import ShareServiceClient
    
    connection_string = os.getenv('AZURE_STORAGEFILE_CONNECTIONSTRING')
    service_client = ShareServiceClient.from_connection_string(connection_string)
    ```

### [NodeJS](#tab/nodejs)

1. Install dependency.

    ```bash
    npm install @azure/storage-file-share
    ```

1. Run the following code, getting the connection string from the Service Connector environment variable.
    
    ```javascript
    const { ShareServiceClient } = require("@azure/storage-file-share");

    const connection_string = process.env.AZURE_STORAGEFILE_CONNECTIONSTRING;
    const shareServiceClient = ShareServiceClient.fromConnectionString(connection_string);
    ```

### [Others](#tab/none)

For other languages, you can use the connection information that Service Connector adds to the environment variables to connect to Azure Files.

## Related content

- [Service Connector concepts](concept-service-connector-internals.md)
- [Configuration naming convention](concept-service-connector-internals.md#configuration-naming-convention)
