---
title: Integrate Azure Queue Storage using Service Connector
description: Learn how to connect Queue Storage to supported Azure compute services by using Service Connector.
author: maud-lv
ms.author: malev
ms.service: service-connector
ms.topic: how-to
ms.date: 04/08/2026
#customer intent: As an Azure app developer, I want to see authentication methods, environment variables, and sample code for using Service Connector with Queue Storage, so I can easily integrate Queue Storage into my apps.

---

# Integrate Azure Queue Storage with Service Connector

This article shows supported clients, authentication methods, and sample code you can use to connect Azure Queue Storage to other Azure services using Service Connector. The article also shows the default environment variables and Spring Boot configurations you need to create the service connections. 

## Supported compute services

You can use Service Connector to connect the following Azure compute services to Queue Storage:

- Azure App Service
- Azure Functions
- Azure Kubernetes Service (AKS)
- Azure Spring Apps

## Supported clients and authentication types

The following client types support connecting Queue Storage to Azure compute services by using Service Connector:

- .NET
- Go
- Java
- Java Spring Boot
- Node.js
- Python

>**Note:**
>You might be able to connect to Queue Storage in other programming languages without using Service Connector.

All clients that support using Service Connector to connect Queue Storage to Azure compute services support all the following authentication types:

- System-assigned managed identity
- User-assigned managed identity
- Service principal
- Connection string

> **Note:**
> For Spring Boot connections, authenticating with a managed identity or service principal is available only for Spring Cloud Azure version 4.0 or higher. Connections for Spring Cloud Azure versions lower than 4.0 must use connection string authentication.

> **Important:**
> The connection string authentication flow requires a high degree of trust in the application, and carries risks not present in other flows. You should use this flow only when more secure flows, such as managed identities, aren't viable.

## Default environment variables

Use the following connection details to connect supported Azure compute services to Queue Storage using the following authentication types:

- [System-assigned managed identity](#system-assigned-managed-identity)
- [User-assigned managed identity](#user-assigned-managed-identity)
- [Service principal](#service-principal)
- [Connection string](#connection-string)

In the examples, replace the following placeholders with the values for your Queue Storage account:

- `<account name>`
- `<account-key>`
- `<client-ID>`
- `<client-secret>`
- `<tenant-ID>`
- `<storage-account-name>`

For more information about naming conventions, see [Configuration naming convention](concept-service-connector-internals.md#configuration-naming-convention).

### System-assigned managed identity

Use the following environment variables for system-assigned managed identity connections.

#### All client types except Spring Boot

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| AZURE_STORAGEQUEUE_RESOURCEENDPOINT | Queue Storage endpoint | `https://<storage-account-name>.queue.core.windows.net/` |

#### Spring Boot client

Authenticating with a system-assigned managed identity is available only for Spring Cloud Azure version 4.0 or higher.

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| spring.cloud.azure.storage.queue.credential.managed-identity-enabled | Whether to enable managed identity | `True` |
| spring.cloud.azure.storage.queue.account-name | Name of the storage account | `<storage-account-name>` |
| spring.cloud.azure.storage.queue.endpoint | Queue Storage endpoint | `https://<storage-account-name>.queue.core.windows.net/` |

### User-assigned managed identity

Use the following environment variables for user-assigned managed identity connections.

#### All client types except Spring Boot

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| AZURE_STORAGEQUEUE_RESOURCEENDPOINT | Queue Storage endpoint | `https://<storage-account-name>.queue.core.windows.net/` |
| AZURE_STORAGEQUEUE_CLIENTID | Client ID | `<client-ID>` |

#### Spring Boot client

Authenticating with a user-assigned managed identity is available only for Spring Cloud Azure version 4.0 or higher.

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| spring.cloud.azure.storage.queue.credential.managed-identity-enabled | Whether to enable managed identity | `True` |
| spring.cloud.azure.storage.queue.account-name | Storage account name | `<storage-account-name>` |
| spring.cloud.azure.storage.queue.endpoint | Queue Storage endpoint | `https://<storage-account-name>.queue.core.windows.net/` |
| spring.cloud.azure.storage.queue.credential.client-id | User-assigned managed identity client ID | `<client-ID>` |

### Service principal

Use the following environment variables for service principal connections.

#### All client types except Spring Boot

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| AZURE_STORAGEQUEUE_RESOURCEENDPOINT | Queue Storage endpoint | `https://<storage-account-name>.queue.core.windows.net/` |
| AZURE_STORAGEQUEUE_CLIENTID | Client ID | `<client-ID>` |
| AZURE_STORAGEQUEUE_CLIENTSECRET | Client secret | `<client-secret>` |
| AZURE_STORAGEQUEUE_TENANTID | Tenant ID | `<tenant-ID>` |

#### Spring Boot client

Authenticating with a service principal is available only for Spring Cloud Azure version 4.0 or higher.

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| spring.cloud.azure.storage.queue.account-name | Name for the storage account | `storage-account-name` |
| spring.cloud.azure.storage.queue.endpoint | Queue Storage endpoint | `https://<storage-account-name>.queue.core.windows.net/` |
| spring.cloud.azure.storage.queue.credential.client-id | Service principal client ID | `<client-ID>` |
| spring.cloud.azure.storage.queue.credential.client-secret | Service principal client secret | `<client-secret>` |

### Connection string

Use the following environment variables for connection string connections.

> **Important:**
> The connection string authentication flow requires a high degree of trust in the application, and carries risks not present in other flows. You should use this flow only when more secure flows, such as managed identities, aren't viable.

#### All client types except Spring Boot

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| AZURE_STORAGEQUEUE_CONNECTIONSTRING | Queue Storage connection string | `DefaultEndpointsProtocol=https;AccountName=<account-name>;AccountKey=<account-key>;EndpointSuffix=core.windows.net` |

#### Spring Boot client

| Application properties | Description | Example value |
| --- | --- | --- |
| spring.cloud.azure.storage.account | Queue Storage account name | `<storage-account-name>` |
| spring.cloud.azure.storage.access-key | Queue Storage account key | `<account-key>` |
| spring.cloud.azure.storage.queue.account-name | Queue Storage account name for Spring Cloud Azure version above 4.0 | `<storage-account-name>` |
| spring.cloud.azure.storage.queue.account-key | Queue Storage account key for Spring Cloud Azure version above 4.0 | `<account-key>` |
| spring.cloud.azure.storage.queue.endpoint | Queue Storage endpoint for Spring Cloud Azure version above 4.0 | `https://<storage-account-name>.queue.core.windows.net/` |

## Sample connection code

The following steps and sample code connect to Queue Storage using Service Connector with [managed identity, service principal](#misp), or [connection string](#connection-string) authentication. The code gets the variable values from the environment variables Service Connector sets.

<a name="misp"></a>
### Managed identity or service principal

Use the following steps and code to connect your services to Queue Storage using a managed identity or service principal. In the code, uncomment the lines for the authentication type you want to use: System-assigned managed identity, user-assigned managed identity, or service principal.


### [.NET](#tab/dotnet)

1. Install dependency.

    ```bash
    dotnet add package Azure.Storage.Queues
    dotnet add package Azure.Identity
    ```

1. Run the following code, uncommenting the part of the code snippet for the authentication type you want to use. The code authenticates using `Azure.Identity` and gets the Azure Queue Storage endpoint from the Service Connector environment variables.

    
    ```csharp
    using Azure.Storage.Queues;
    using Azure.Identity;    
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // system-assigned managed identity
    // var credential = new DefaultAzureCredential();
    
    // user-assigned managed identity
    // var credential = new DefaultAzureCredential(
    //     new DefaultAzureCredentialOptions
    //     {
    //         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_STORAGEQUEUE_CLIENTID");
    //     });
    
    // service principal 
    // var tenantId = Environment.GetEnvironmentVariable("AZURE_STORAGEQUEUE_TENANTID");
    // var clientId = Environment.GetEnvironmentVariable("AZURE_STORAGEQUEUE_CLIENTID");
    // var clientSecret = Environment.GetEnvironmentVariable("AZURE_STORAGEQUEUE_CLIENTSECRET");
    // var credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    Uri queueUri = new Uri(Environment.GetEnvironmentVariable("AZURE_STORAGEQUEUE_RESOURCEENDPOINT"));
    QueueClient queue = new QueueClient(queueUri, credential);
    ```

### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-storage-queue</artifactId>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.1.5</version>
    </dependency>
    ```

1. Run the following code, uncommenting the part of the code snippet for the authentication type you want to use. The code authenticates using `azure-identity` and gets the Queue Storage endpoint from the Service Connector environment variables.

    ```java
    import com.azure.identity.*;
    import com.azure.storage.queue.*;
    import com.azure.storage.queue.models.*;
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-managed identity
    // DefaultAzureCredential credential = new DefaultAzureCredentialBuilder().build();

    // for user-assigned managed identity
    // DefaultAzureCredential credential = new DefaultAzureCredentialBuilder()
    //     .managedIdentityClientId(System.getenv("AZURE_STORAGEQUEUE_CLIENTID"))
    //     .build();

    // for service principal
    // ClientSecretCredential credential = new ClientSecretCredentialBuilder()
    //   .clientId(System.getenv("AZURE_STORAGEQUEUE_CLIENTID"))
    //   .clientSecret(System.getenv("AZURE_STORAGEQUEUE_CLIENTSECRET"))
    //   .tenantId(System.getenv("AZURE_STORAGEQUEUE_TENANTID"))
    //   .build();
    
    String endpoint = System.getenv("AZURE_STORAGEQUEUE_RESOURCEENDPOINT");
    QueueClient queueClient = new QueueClientBuilder()
        .endpoint(endpoint)
        .queueName("<queueName>")
        .credential(credential)
        .buildClient();
    ```

### [Spring Boot](#tab/springBoot)

To set up your Spring application, see [Spring Cloud Azure Storage Queue Operation Code Sample](https://learn.microsoft.com/samples/azure-samples/azure-spring-boot-samples/sending-and-receiving-message-by-azure-storage-queue-and-sdk-client-in-spring-boot-application). Service Connector adds the Spring Cloud Azure 4.0 and above configuration properties to Spring Apps. For more information about configuration properties, see [Azure Storage Queue Properties](https://microsoft.github.io/spring-cloud-azure/current/reference/html/appendix.html#azure_storage_queue_proeprties).

### [Python](#tab/python)

1. Install dependencies.

    ```bash
    pip install azure-identity
    pip install azure-storage-queue
    ```

1. Run the following code, uncommenting the part of the code snippet for the authentication type you want to use. The code authenticates using `azure-identity` and gets the Queue Storage endpoint from the Service Connector environment variables.

    ```python
    import os
    from azure.identity import ManagedIdentityCredential, ClientSecretCredential
    from azure.storage.queue import QueueServiceClient, QueueClient
    
    # Uncomment the following lines corresponding to the authentication type you want to use.
    # system-assigned managed identity
    # cred = ManagedIdentityCredential()
    
    # user-assigned managed identity
    # managed_identity_client_id = os.getenv('AZURE_STORAGEQUEUE_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)
    
    # service principal
    # tenant_id = os.getenv('AZURE_STORAGEQUEUE_TENANTID')
    # client_id = os.getenv('AZURE_STORAGEQUEUE_CLIENTID')
    # client_secret = os.getenv('AZURE_STORAGEQUEUE_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)

    account_url = os.getenv('AZURE_STORAGEQUEUE_RESOURCEENDPOINT')
    queue_client = QueueClient(account_url, queue_name='<queue_name>' ,credential=cred)
    ```

### [NodeJS](#tab/nodejs)

1. Install dependencies.

    ```bash
    npm install @azure/identity
    npm install @azure/storage-queue
    ```

1. Run the following code, uncommenting the part of the code snippet for the authentication type you want to use. The code authenticates using `@azure/identity` and gets the Azure Queue Storage endpoint from the Service Connector environment variables.

    ```javascript
    const { QueueServiceClient } = require("@azure/storage-queue");
    import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-assigned managed identity
    // const credential = new DefaultAzureCredential();
    
    // for user-assigned managed identity
    // const clientId = process.env.AZURE_STORAGEQUEUE_CLIENTID;
    // const credential = new DefaultAzureCredential({
    //     managedIdentityClientId: clientId
    // });
    
    // for service principal
    // const tenantId = process.env.AZURE_STORAGEQUEUE_TENANTID;
    // const clientId = process.env.AZURE_STORAGEQUEUE_CLIENTID;
    // const clientSecret = process.env.AZURE_STORAGEQUEUE_CLIENTSECRET;
    // const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

    const queueServiceClient = new QueueServiceClient(
        process.env.AZURE_STORAGEQUEUE_RESOURCEENDPOINT,
        credential
      );
    ```

---


### Connection string

Use the following steps and code to connect to Queue Storage using a connection string.

> **Important:**
> The connection string authentication flow requires a high degree of trust in the application, and carries risks not present in other flows. You should use this flow only when more secure flows, such as managed identities, aren't viable.


### [.NET](#tab/dotnet)

1. Install dependency.

    ```bash
    dotnet add package Azure.Storage.Queues
    ```

1. Run the following code, getting the connection string from the Service Connector environment variables.

    ```csharp
    using Azure.Storage.Queues;

    var connectionString = Environment.GetEnvironmentVariable("AZURE_STORAGEQUEUE_CONNECTIONSTRING");
    QueueServiceClient service = new QueueServiceClient(connectionString);
    ```

### [Java](#tab/java)

1. Add the following dependency in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-storage-queue</artifactId>
    </dependency>
    ```

1. Run the following code, getting the connection string from the Service Connector environment variables.

    ```java
    String connectionString = System.getenv("AZURE_STORAGEQUEUE_CONNECTIONSTRING");
    QueueClient client = new QueueClientBuilder()
        .connectionString(connectionString)
        .buildClient();
    ```

### [SpringBoot](#tab/springBoot)

To set up your Spring application, see [Spring Cloud Azure Storage Queue Operation Code Sample](https://learn.microsoft.com/samples/azure-samples/azure-spring-boot-samples/sending-and-receiving-message-by-azure-storage-queue-and-sdk-client-in-spring-boot-application). Service Connector provides two sets of configuration properties, depending on whether the Spring Cloud Azure version is below 4.0 or above 4.0. For more information, see [Azure Storage Queue SDK Configuration Changes](https://microsoft.github.io/spring-cloud-azure/current/reference/html/appendix.html#configuration-spring-cloud-azure-starter-integration-storage-queue).

### [Python](#tab/python)

1. Install dependency.

    ```bash
    pip install azure-storage-queue
    ```

1. Run the following code, getting the connection string from the Service Connector environment variables.
    ```python
    from azure.storage.queue import QueueServiceClient
    connection_string = os.getenv('AZURE_STORAGEQUEUE_CONNECTIONSTRING')
    queue_service = QueueServiceClient.from_connection_string(conn_str=connection_string)
    ```

### [NodeJS](#tab/nodejs)

1. Install dependency.

    ```bash
    npm install @azure/storage-queue
    ```

1. Run the following code, getting the connection string from the Service Connector environment variables.

    
    ```javascript
    const { QueueServiceClient } = require("@azure/storage-queue");

    const connection_string = process.env.AZURE_STORAGEQUEUE_CONNECTIONSTRING;
    const queueServiceClient = QueueServiceClient.fromConnectionString(connection_string);
    ```

---



## Related content

- [Service Connector concepts](concept-service-connector-internals.md)
- [Configuration naming convention](concept-service-connector-internals.md#configuration-naming-convention)
