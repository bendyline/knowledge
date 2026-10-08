---
title: Integrate the Azure Cosmos DB for NoSQL with Service Connector
description: Integrate the Azure Cosmos DB for NoSQL into your application with Service Connector
author: maud-lv
ms.author: malev
ms.service: service-connector
ms.topic: how-to
ms.date: 06/17/2026
---

# Integrate the Azure Cosmos DB for NoSQL with Service Connector

This article shows supported authentication methods and clients, and provides sample code for connecting Azure Cosmos DB for NoSQL to cloud services using Service Connector. You can also connect using other programming languages without Service Connector. The article includes default environment variable names and values you receive when creating a service connection. 

## Supported compute services

Service Connector can be used to connect the following compute services to Azure Cosmos DB for NoSQL:

- Azure App Service
- Azure Functions
- Azure Kubernetes Service (AKS)
- Azure Spring Apps

## Supported authentication types and client types

The table below shows which combinations of client types and authentication methods are supported for connecting your compute service to Azure Cosmos DB for NoSQL using Service Connector. A “Yes” indicates that the combination is supported, while a “No” indicates that it is not supported.

| Client type | System-assigned managed identity | User-assigned managed identity | Secret / connection string | Service principal |
| --- | --- | --- | --- | --- |
| .NET | Yes | Yes | Yes | Yes |
| Java | Yes | Yes | Yes | Yes |
| Java - Spring Boot | Yes | Yes | Yes | Yes |
| Node.js | Yes | Yes | Yes | Yes |
| Python | Yes | Yes | Yes | Yes |
| Go | Yes | Yes | Yes | Yes |
| None | Yes | Yes | Yes | Yes |

This table indicates that all combinations of client types and authentication methods in the table are supported. All client types can use any of the authentication methods to connect to Azure Cosmos DB for NoSQL using Service Connector.

> **Note:**
> Cosmos DB does not natively support authentication via managed identity. Therefore, Service Connector uses the managed identity to retrieve the connection string, and the connection is subsequently established using that connection string.

## Default environment variable names or application properties and sample code

Refer to the connection details below to connect your compute services to Azure Cosmos DB for NoSQL. Replace placeholder text such as `<database-server>`, `<database-name>`, and `<account-key>` with your actual values. For naming conventions, see [Service Connector internals](concept-service-connector-internals.md#configuration-naming-convention).

### System-assigned managed identity

Since Cosmos DB doesn't natively support authentication via managed identity, in the following code sample, we use the managed identity to retrieve the connection string, and the connection is then established using that connection string.

#### Spring Boot client type

Using a system-assigned managed identity as the authentication type is only available for Spring Cloud Azure version 4.0 or higher.

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| spring.cloud.azure.cosmos.credential.managed-identity-enabled | Whether to enable managed identity | `true` |
| spring.cloud.azure.cosmos.database | Your database | `https://management.azure.com/.default` |
| spring.cloud.azure.cosmos.endpoint | Your resource endpoint | `https://<database-server>.documents.azure.com:443/` |

#### Other client types

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| AZURE_COSMOS_LISTCONNECTIONSTRINGURL | The URL to get the connection string | `https://management.azure.com/subscriptions/<subscription-ID>/resourceGroups/<resource-group-name>/providers/Microsoft.DocumentDB/databaseAccounts/<database-server>/listConnectionStrings?api-version=2021-04-15` |
| AZURE_COSMOS_SCOPE | Your managed identity scope | `https://management.azure.com/.default` |
| AZURE_COSMOS_RESOURCEENDPOINT | Your resource endpoint | `https://<database-server>.documents.azure.com:443/` |

#### Sample code

To connect using a system-assigned identity:

### [.NET](#tab/dotnet)

1. Install dependencies.
    ```bash
    dotnet add package Microsoft.Azure.Cosmos
    dotnet add package Azure.Identity
    ```

1. Get an access token for the managed identity or service principal by using Azure.Identity. Then use connection information from environment variables added by Service Connector to connect to Azure Cosmos DB for NoSQL. In the code below, uncomment the section for your authentication type:
    ```csharp
    using Microsoft.Azure.Cosmos;
    using Azure.Core;
    using Azure.Identity;
    using System; 
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // For system-assigned identity.
    // TokenCredential credential = new DefaultAzureCredential();
    
    // For user-assigned identity.
    // TokenCredential credential = new DefaultAzureCredential(
    //     new DefaultAzureCredentialOptions
    //     {
    //         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_COSMOS_CLIENTID");
    //     }
    // );
    
    // For service principal.
    // TokenCredential credential = new ClientSecretCredential(
    //     tenantId: Environment.GetEnvironmentVariable("AZURE_COSMOS_TENANTID")!,
    //     clientId: Environment.GetEnvironmentVariable("AZURE_COSMOS_CLIENTID")!,
    //     clientSecret: Environment.GetEnvironmentVariable("AZURE_COSMOS_CLIENTSECRET")!,
    //     options: new TokenCredentialOptions()
    // );

    // Create a new instance of CosmosClient using the credential above
    using CosmosClient client = new(
        accountEndpoint: Environment.GetEnvironmentVariable("AZURE_COSMOS_RESOURCEENDPOINT")!,
        tokenCredential: credential
    );
    ```

### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
    	<groupId>com.azure</groupId>
    	<artifactId>azure-cosmos</artifactId>
    	<version>LATEST</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.1.5</version>
    </dependency>
    ```
1. Authenticate via `azure-identity` and get the endpoint URL from the environment variable added by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

    ```java
    import com.azure.cosmos.CosmosClient;
    import com.azure.cosmos.CosmosClientBuilder;
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // For system-assigned identity
    // DefaultAzureCredential credential = new DefaultAzureCredentialBuilder().build();
    
    // for user-assigned managed identity
    // DefaultAzureCredential credential = new DefaultAzureCredentialBuilder()
    //     .managedIdentityClientId(System.getenv("AZURE_COSMOS_CLIENTID"))
    //     .build();

    // for service principal
    // ClientSecretCredential credential = new ClientSecretCredentialBuilder()
    //   .clientId(System.getenv("<AZURE_COSMOS_CLIENTID>"))
    //   .clientSecret(System.getenv("<AZURE_COSMOS_CLIENTSECRET>"))
    //   .tenantId(System.getenv("<AZURE_COSMOS_TENANTID>"))
    //   .build();
    
    String endpoint = System.getenv("AZURE_COSMOS_RESOURCEENDPOINT");
    
    CosmosClient cosmosClient = new CosmosClientBuilder()
        .endpoint(endpoint)
        .credential(credential)
        .buildClient();
    ```

### [SpringBoot](#tab/springBoot)

Refer to [Build a Spring Data Azure Cosmos DB v3 app to manage Azure Cosmos DB for NoSQL data](https://learn.microsoft.com/azure/cosmos-db/nosql/quickstart-java-spring-data?tabs=passwordless%2Csign-in-azure-cli) to set up your Spring application. The configuration properties are added to Spring Apps by Service Connector. Managed identity support for Cosmos DB is only available for Spring Cloud Azure version 4.0 and above. For more information, refer to [Spring Cloud Azure - Reference Documentation](https://microsoft.github.io/spring-cloud-azure/current/reference/html/index.html#authentication).
 
### [Python](#tab/python)
1. Install dependencies.
   ```bash
   pip install azure-identity
   pip install azure-cosmos
   ```
1. Authenticate via `azure-identity` library and get the endpoint URL from the environment variable added by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.
   ```python
   import os
   from azure.cosmos import CosmosClient
   from azure.identity import ManagedIdentityCredential, ClientSecretCredential
   
   # Uncomment the following lines corresponding to the authentication type you want to use.
   # system-assigned managed identity
   # cred = ManagedIdentityCredential()

   # user-assigned managed identity
   # managed_identity_client_id = os.getenv('AZURE_COSMOS_CLIENTID')
   # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)

   # service principal
   # tenant_id = os.getenv('AZURE_COSMOS_TENANTID')
   # client_id = os.getenv('AZURE_COSMOS_CLIENTID')
   # client_secret = os.getenv('AZURE_COSMOS_CLIENTSECRET')
   # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)

   endpoint = os.environ["AZURE_COSMOS_RESOURCEENDPOINT"]
   client = CosmosClient(url=endpoint, credential=cred)
   
   ```

### [Go](#tab/go)
1. Install dependencies.
    ```bash
    go get t github.com/Azure/azure-sdk-for-go/sdk/azidentity
    go get github.com/Azure/azure-sdk-for-go/sdk/data/azcosmos
    ```
1. Authenticate using `azidentity` npm package and get the endpoint URL from the environment variable added by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.
    ```go
    import (
        "os"

        "github.com/Azure/azure-sdk-for-go/sdk/data/azcosmos"
        "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
    )

    func main() {
        endpoint = os.Getenv("AZURE_COSMOS_RESOURCEENDPOINT")

        // Uncomment the following lines corresponding to the authentication type you want to use.
        // For system-assigned identity.
        // cred, err := azidentity.NewDefaultAzureCredential(nil)
        
        // For user-assigned identity.
        // clientid := os.Getenv("AZURE_COSMOS_CLIENTID")
        // azidentity.ManagedIdentityCredentialOptions.ID := clientid
        // options := &azidentity.ManagedIdentityCredentialOptions{ID: clientid}
        // cred, err := azidentity.NewManagedIdentityCredential(options)
        
        // For service principal.
        // clientid := os.Getenv("AZURE_COSMOS_CLIENTID")
        // tenantid := os.Getenv("AZURE_COSMOS_TENANTID")
        // clientsecret := os.Getenv("AZURE_COSMOS_CLIENTSECRET")
        // cred, err := azidentity.NewClientSecretCredential(tenantid, clientid, clientsecret, &azidentity.ClientSecretCredentialOptions{})

        client, err := azcosmos.NewClient(endpoint, cred, nil)
    }
    ```

### [NodeJS](#tab/nodejs)
1. Install dependencies.
    ```bash
    npm install @azure/identity
    npm install @azure/cosmos
    ```
1. Authenticate using `@azure/identity` npm package and get the endpoint URL from the environment variable added by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.
   
    ```javascript
    import { CosmosClient } from "@azure/cosmos";
    const { DefaultAzureCredential } = require("@azure/identity");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // For system-assigned managed identity.
    // const credential = new DefaultAzureCredential();

    // For user-assigned managed identity.
    // const credential = new DefaultAzureCredential({
    //     managedIdentityClientId: process.env.AZURE_COSMOS_CLIENTID
    // });
    
    // For service principal.
    // const credential = new ClientSecretCredential(
    //     tenantId: process.env.AZURE_COSMOS_TENANTID,
    //     clientId: process.env.AZURE_COSMOS_CLIENTID,
    //     clientSecret: process.env.AZURE_COSMOS_CLIENTSECRET
    // );
    
    // Create a new instance of CosmosClient using the credential above
    const cosmosClient = new CosmosClient({ 
        process.env.AZURE_COSMOS_RESOURCEENDPOINT, 
        aadCredentials: credential
    });
    ```



### [Other](#tab/none)
For other languages, you can use the endpoint URL and other properties that Service Connector sets to the environment variables to connect to Azure Cosmos DB for NoSQL. For environment variable details, see [Integrate Azure Cosmos DB for NoSQL with Service Connector](how-to-integrate-cosmos-sql.md).


### User-assigned managed identity

Since Cosmos DB doesn't natively support authentication via managed identity, in the following code sample, we use the managed identity to retrieve the connection string, and the connection is then established using that connection string.

#### Spring Boot client type

System-assigned managed identity authentication is available for Spring Cloud Azure version 4.0 or higher.

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| spring.cloud.azure.cosmos.credential.managed-identity-enabled | Whether to enable managed identity | `true` |
| spring.cloud.azure.cosmos.database | Your database | `https://management.azure.com/.default` |
| spring.cloud.azure.cosmos.endpoint | Your resource endpoint | `https://<database-server>.documents.azure.com:443/` |
| spring.cloud.azure.cosmos.credential.client-id | Your client ID | `<client-ID>` |

#### Other client types
| Default environment variable name | Description | Example value |
| --- | --- | --- |
| AZURE_COSMOS_LISTCONNECTIONSTRINGURL | The URL to get the connection string | `https://management.azure.com/subscriptions/<subscription-ID>/resourceGroups/<resource-group-name>/providers/Microsoft.DocumentDB/databaseAccounts/<database-server>/listConnectionStrings?api-version=2021-04-15` |
| AZURE_COSMOS_SCOPE | Your managed identity scope | `https://management.azure.com/.default` |
| AZURE_COSMOS_CLIENTID | Your client ID | `<client-ID>` |
| AZURE_COSMOS_RESOURCEENDPOINT | Your resource endpoint | `https://<database-server>.documents.azure.com:443/` |

#### Sample code

To connect using a user-assigned identity:

### [.NET](#tab/dotnet)

1. Install dependencies.
    ```bash
    dotnet add package Microsoft.Azure.Cosmos
    dotnet add package Azure.Identity
    ```

1. Get an access token for the managed identity or service principal by using Azure.Identity. Then use connection information from environment variables added by Service Connector to connect to Azure Cosmos DB for NoSQL. In the code below, uncomment the section for your authentication type:
    ```csharp
    using Microsoft.Azure.Cosmos;
    using Azure.Core;
    using Azure.Identity;
    using System; 
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // For system-assigned identity.
    // TokenCredential credential = new DefaultAzureCredential();
    
    // For user-assigned identity.
    // TokenCredential credential = new DefaultAzureCredential(
    //     new DefaultAzureCredentialOptions
    //     {
    //         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_COSMOS_CLIENTID");
    //     }
    // );
    
    // For service principal.
    // TokenCredential credential = new ClientSecretCredential(
    //     tenantId: Environment.GetEnvironmentVariable("AZURE_COSMOS_TENANTID")!,
    //     clientId: Environment.GetEnvironmentVariable("AZURE_COSMOS_CLIENTID")!,
    //     clientSecret: Environment.GetEnvironmentVariable("AZURE_COSMOS_CLIENTSECRET")!,
    //     options: new TokenCredentialOptions()
    // );

    // Create a new instance of CosmosClient using the credential above
    using CosmosClient client = new(
        accountEndpoint: Environment.GetEnvironmentVariable("AZURE_COSMOS_RESOURCEENDPOINT")!,
        tokenCredential: credential
    );
    ```

### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
    	<groupId>com.azure</groupId>
    	<artifactId>azure-cosmos</artifactId>
    	<version>LATEST</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.1.5</version>
    </dependency>
    ```
1. Authenticate via `azure-identity` and get the endpoint URL from the environment variable added by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

    ```java
    import com.azure.cosmos.CosmosClient;
    import com.azure.cosmos.CosmosClientBuilder;
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // For system-assigned identity
    // DefaultAzureCredential credential = new DefaultAzureCredentialBuilder().build();
    
    // for user-assigned managed identity
    // DefaultAzureCredential credential = new DefaultAzureCredentialBuilder()
    //     .managedIdentityClientId(System.getenv("AZURE_COSMOS_CLIENTID"))
    //     .build();

    // for service principal
    // ClientSecretCredential credential = new ClientSecretCredentialBuilder()
    //   .clientId(System.getenv("<AZURE_COSMOS_CLIENTID>"))
    //   .clientSecret(System.getenv("<AZURE_COSMOS_CLIENTSECRET>"))
    //   .tenantId(System.getenv("<AZURE_COSMOS_TENANTID>"))
    //   .build();
    
    String endpoint = System.getenv("AZURE_COSMOS_RESOURCEENDPOINT");
    
    CosmosClient cosmosClient = new CosmosClientBuilder()
        .endpoint(endpoint)
        .credential(credential)
        .buildClient();
    ```

### [SpringBoot](#tab/springBoot)

Refer to [Build a Spring Data Azure Cosmos DB v3 app to manage Azure Cosmos DB for NoSQL data](https://learn.microsoft.com/azure/cosmos-db/nosql/quickstart-java-spring-data?tabs=passwordless%2Csign-in-azure-cli) to set up your Spring application. The configuration properties are added to Spring Apps by Service Connector. Managed identity support for Cosmos DB is only available for Spring Cloud Azure version 4.0 and above. For more information, refer to [Spring Cloud Azure - Reference Documentation](https://microsoft.github.io/spring-cloud-azure/current/reference/html/index.html#authentication).
 
### [Python](#tab/python)
1. Install dependencies.
   ```bash
   pip install azure-identity
   pip install azure-cosmos
   ```
1. Authenticate via `azure-identity` library and get the endpoint URL from the environment variable added by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.
   ```python
   import os
   from azure.cosmos import CosmosClient
   from azure.identity import ManagedIdentityCredential, ClientSecretCredential
   
   # Uncomment the following lines corresponding to the authentication type you want to use.
   # system-assigned managed identity
   # cred = ManagedIdentityCredential()

   # user-assigned managed identity
   # managed_identity_client_id = os.getenv('AZURE_COSMOS_CLIENTID')
   # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)

   # service principal
   # tenant_id = os.getenv('AZURE_COSMOS_TENANTID')
   # client_id = os.getenv('AZURE_COSMOS_CLIENTID')
   # client_secret = os.getenv('AZURE_COSMOS_CLIENTSECRET')
   # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)

   endpoint = os.environ["AZURE_COSMOS_RESOURCEENDPOINT"]
   client = CosmosClient(url=endpoint, credential=cred)
   
   ```

### [Go](#tab/go)
1. Install dependencies.
    ```bash
    go get t github.com/Azure/azure-sdk-for-go/sdk/azidentity
    go get github.com/Azure/azure-sdk-for-go/sdk/data/azcosmos
    ```
1. Authenticate using `azidentity` npm package and get the endpoint URL from the environment variable added by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.
    ```go
    import (
        "os"

        "github.com/Azure/azure-sdk-for-go/sdk/data/azcosmos"
        "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
    )

    func main() {
        endpoint = os.Getenv("AZURE_COSMOS_RESOURCEENDPOINT")

        // Uncomment the following lines corresponding to the authentication type you want to use.
        // For system-assigned identity.
        // cred, err := azidentity.NewDefaultAzureCredential(nil)
        
        // For user-assigned identity.
        // clientid := os.Getenv("AZURE_COSMOS_CLIENTID")
        // azidentity.ManagedIdentityCredentialOptions.ID := clientid
        // options := &azidentity.ManagedIdentityCredentialOptions{ID: clientid}
        // cred, err := azidentity.NewManagedIdentityCredential(options)
        
        // For service principal.
        // clientid := os.Getenv("AZURE_COSMOS_CLIENTID")
        // tenantid := os.Getenv("AZURE_COSMOS_TENANTID")
        // clientsecret := os.Getenv("AZURE_COSMOS_CLIENTSECRET")
        // cred, err := azidentity.NewClientSecretCredential(tenantid, clientid, clientsecret, &azidentity.ClientSecretCredentialOptions{})

        client, err := azcosmos.NewClient(endpoint, cred, nil)
    }
    ```

### [NodeJS](#tab/nodejs)
1. Install dependencies.
    ```bash
    npm install @azure/identity
    npm install @azure/cosmos
    ```
1. Authenticate using `@azure/identity` npm package and get the endpoint URL from the environment variable added by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.
   
    ```javascript
    import { CosmosClient } from "@azure/cosmos";
    const { DefaultAzureCredential } = require("@azure/identity");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // For system-assigned managed identity.
    // const credential = new DefaultAzureCredential();

    // For user-assigned managed identity.
    // const credential = new DefaultAzureCredential({
    //     managedIdentityClientId: process.env.AZURE_COSMOS_CLIENTID
    // });
    
    // For service principal.
    // const credential = new ClientSecretCredential(
    //     tenantId: process.env.AZURE_COSMOS_TENANTID,
    //     clientId: process.env.AZURE_COSMOS_CLIENTID,
    //     clientSecret: process.env.AZURE_COSMOS_CLIENTSECRET
    // );
    
    // Create a new instance of CosmosClient using the credential above
    const cosmosClient = new CosmosClient({ 
        process.env.AZURE_COSMOS_RESOURCEENDPOINT, 
        aadCredentials: credential
    });
    ```



### [Other](#tab/none)
For other languages, you can use the endpoint URL and other properties that Service Connector sets to the environment variables to connect to Azure Cosmos DB for NoSQL. For environment variable details, see [Integrate Azure Cosmos DB for NoSQL with Service Connector](how-to-integrate-cosmos-sql.md).


### Connection string

> **Warning:**
> Microsoft recommends that you use the most secure authentication flow available. The authentication flow described in this procedure requires a very high degree of trust in the application, and carries risks that are not present in other flows. You should only use this flow when other more secure flows, such as managed identities, aren't viable.

#### Spring Boot client type

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| azure.cosmos.key | The access key for your database for Spring Cloud Azure version below 4.0 | `<access-key>` |
| azure.cosmos.database | Your database for Spring Cloud Azure version below 4.0 | `<database-name>` |
| azure.cosmos.uri | Your database URI for Spring Cloud Azure version below 4.0 | `https://<database-server>.documents.azure.com:443/` |
| spring.cloud.azure.cosmos.key | The access key for your database for Spring Cloud Azure version over 4.0 | `<access-key>` |
| spring.cloud.azure.cosmos.database | Your database for Spring Cloud Azure version over 4.0 | `<database-name>` |
| spring.cloud.azure.cosmos.endpoint | Your database URI for Spring Cloud Azure version over 4.0 | `https://<database-server>.documents.azure.com:443/` |

#### Other client types

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| AZURE_COSMOS_CONNECTIONSTRING | Azure Cosmos DB for NoSQL connection string | `AccountEndpoint=https://<database-server>.documents.azure.com:443/;AccountKey=<account-key>` |

#### Sample code

To connect using a connection string:

### [.NET](#tab/dotnet)

1. Install dependency.
    ```bash
    dotnet add package Microsoft.Azure.Cosmos
    ```

1. Get the connection string from the environment variable added by Service Connector.
    ```csharp
    using Microsoft.Azure.Cosmos;
    using System; 
    
    // Create a new instance of CosmosClient using a connection string
    using CosmosClient client = new(
        connectionString: Environment.GetEnvironmentVariable("AZURE_COSMOS_CONNECTIONSTRING")!
    );
    ```

### [Java](#tab/java)

1. Add the following dependency in your *pom.xml* file:
    ```xml
    <dependency>
    	<groupId>com.azure</groupId>
    	<artifactId>azure-cosmos</artifactId>
    	<version>LATEST</version>
    </dependency>
    ```
1. Get the connection string from the environment variable added by Service Connector.
    ```java
    import com.azure.cosmos.CosmosClient;
    import com.azure.cosmos.CosmosClientBuilder;
    
    String connectionStr = System.getenv("AZURE_COSMOS_CONNECTIONSTRING");
    String[] connInfo = connectionStr.split(";");
    String endpoint = connInfo[0].split("=")[1];
    String accountKey = connInfo[1].split("=")[1];
    
    CosmosClient cosmosClient = new CosmosClientBuilder()
        .endpoint(endpoint)
        .key(accountKey)
        .buildClient();
    ```

### [SpringBoot](#tab/springBoot)

Refer to [Spring Data Azure Cosmos DB v3 examples](https://learn.microsoft.com/azure/cosmos-db/nosql/samples-java-spring-data) and [Build a Spring Data Azure Cosmos DB v3 app to manage Azure Cosmos DB for NoSQL data](https://learn.microsoft.com/azure/cosmos-db/nosql/quickstart-java-spring-data?tabs=password%2Csign-in-azure-cli) to set up your Spring application. The configuration properties are added to Spring Apps by Service Connector. Two sets of configuration properties are provided according to the version of Spring Cloud Azure (below 4.0 and above 4.0). For more information about library changes of Spring Cloud Azure, refer to [Spring Cloud Azure Migration Guide](https://microsoft.github.io/spring-cloud-azure/current/reference/html/appendix.html#configuration-spring-cloud-azure-starter-data-cosmos). It is recommended to use Spring Cloud Azure version 4.0 and above. The configurations in the format of "azure.cosmos.*" from Spring Cloud Azure 3.x will no longer be supported after 1st July, 2024. 

### [Python](#tab/python)
1. Install dependency.
    ```bash
    pip install azure-cosmos
    ```
1. Get the connection string from the environment variable added by Service Connector.
    ```python
    import os
    from azure.cosmos import CosmosClient
    
    # Create a new instance of CosmosClient using a connection string
    CONN_STR = os.environ["AZURE_COSMOS_CONNECTIONSTRING"]
    client = CosmosClient.from_connection_string(conn_str=CONN_STR) 
    ```

### [Go](#tab/go)
1. Install dependency.
    ```bash
    go get github.com/Azure/azure-sdk-for-go/sdk/data/azcosmos
    ```
1. Get the connection string from the environment variable added by Service Connector.
    ```go
    import {
        "github.com/Azure/azure-sdk-for-go/sdk/data/azcosmos"
    }
    connectionString := os.Getenv("AZURE_COSMOS_CONNECTIONSTRING")
    client, err := azcosmos.NewClientFromConnectionString(connectionString, nil)
    ```


### [NodeJS](#tab/nodejs)
1. Install dependency.
    ```bash
    npm install @azure/cosmos
    ```
1. Get the connection string from the environment variable added by Service Connector.
    ```javascript
    import { CosmosClient } from "@azure/cosmos";
    
    // Create a new instance of CosmosClient using a connection string
    const cosmosClient = new CosmosClient(process.env.AZURE_COSMOS_CONNECTIONSTRING);
    ```



### [Other](#tab/none)
For other languages, you can use the endpoint URL and other properties that Service Connector sets to the environment variables to connect to Azure Cosmos DB for NoSQL. For environment variable details, see [Integrate Azure Cosmos DB for NoSQL with Service Connector](how-to-integrate-cosmos-sql.md).


#### Service principal

#### Spring Boot client type

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| spring.cloud.azure.cosmos.credential.client-id | Your client ID | `<client-ID>` |
| spring.cloud.azure.cosmos.credential.client-secret | Your client secret | `<client-secret>` |
| spring.cloud.azure.cosmos.profile.tenant-id | Your tenant ID | `<tenant-ID>` |
| spring.cloud.azure.cosmos.database | Your database | `<database-name>` |
| spring.cloud.azure.cosmos.endpoint | Your resource endpoint | `https://<database-server>.documents.azure.com:443/` |


#### Other client types
| Default environment variable name | Description | Example value |
| --- | --- | --- |
| AZURE_COSMOS_LISTCONNECTIONSTRINGURL | The URL to get the connection string | `https://management.azure.com/subscriptions/<subscription-ID>/resourceGroups/<resource-group-name>/providers/Microsoft.DocumentDB/databaseAccounts/<database-server>/listConnectionStrings?api-version=2021-04-15` |
| AZURE_COSMOS_SCOPE | Your managed identity scope | `https://management.azure.com/.default` |
| AZURE_COSMOS_CLIENTID | Your client secret ID | `<client-ID>` |
| AZURE_COSMOS_CLIENTSECRET | Your client secret | `<client-secret>` |
| AZURE_COSMOS_TENANTID | Your tenant ID | `<tenant-ID>` |
| AZURE_COSMOS_RESOURCEENDPOINT | Your resource endpoint | `https://<database-server>.documents.azure.com:443/` |

#### Sample code

Refer to the steps and code below to connect to Azure Cosmos DB for NoSQL using a service principal.

### [.NET](#tab/dotnet)

1. Install dependencies.
    ```bash
    dotnet add package Microsoft.Azure.Cosmos
    dotnet add package Azure.Identity
    ```

1. Get an access token for the managed identity or service principal by using Azure.Identity. Then use connection information from environment variables added by Service Connector to connect to Azure Cosmos DB for NoSQL. In the code below, uncomment the section for your authentication type:
    ```csharp
    using Microsoft.Azure.Cosmos;
    using Azure.Core;
    using Azure.Identity;
    using System; 
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // For system-assigned identity.
    // TokenCredential credential = new DefaultAzureCredential();
    
    // For user-assigned identity.
    // TokenCredential credential = new DefaultAzureCredential(
    //     new DefaultAzureCredentialOptions
    //     {
    //         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_COSMOS_CLIENTID");
    //     }
    // );
    
    // For service principal.
    // TokenCredential credential = new ClientSecretCredential(
    //     tenantId: Environment.GetEnvironmentVariable("AZURE_COSMOS_TENANTID")!,
    //     clientId: Environment.GetEnvironmentVariable("AZURE_COSMOS_CLIENTID")!,
    //     clientSecret: Environment.GetEnvironmentVariable("AZURE_COSMOS_CLIENTSECRET")!,
    //     options: new TokenCredentialOptions()
    // );

    // Create a new instance of CosmosClient using the credential above
    using CosmosClient client = new(
        accountEndpoint: Environment.GetEnvironmentVariable("AZURE_COSMOS_RESOURCEENDPOINT")!,
        tokenCredential: credential
    );
    ```

### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
    	<groupId>com.azure</groupId>
    	<artifactId>azure-cosmos</artifactId>
    	<version>LATEST</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.1.5</version>
    </dependency>
    ```
1. Authenticate via `azure-identity` and get the endpoint URL from the environment variable added by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

    ```java
    import com.azure.cosmos.CosmosClient;
    import com.azure.cosmos.CosmosClientBuilder;
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // For system-assigned identity
    // DefaultAzureCredential credential = new DefaultAzureCredentialBuilder().build();
    
    // for user-assigned managed identity
    // DefaultAzureCredential credential = new DefaultAzureCredentialBuilder()
    //     .managedIdentityClientId(System.getenv("AZURE_COSMOS_CLIENTID"))
    //     .build();

    // for service principal
    // ClientSecretCredential credential = new ClientSecretCredentialBuilder()
    //   .clientId(System.getenv("<AZURE_COSMOS_CLIENTID>"))
    //   .clientSecret(System.getenv("<AZURE_COSMOS_CLIENTSECRET>"))
    //   .tenantId(System.getenv("<AZURE_COSMOS_TENANTID>"))
    //   .build();
    
    String endpoint = System.getenv("AZURE_COSMOS_RESOURCEENDPOINT");
    
    CosmosClient cosmosClient = new CosmosClientBuilder()
        .endpoint(endpoint)
        .credential(credential)
        .buildClient();
    ```

### [SpringBoot](#tab/springBoot)

Refer to [Build a Spring Data Azure Cosmos DB v3 app to manage Azure Cosmos DB for NoSQL data](https://learn.microsoft.com/azure/cosmos-db/nosql/quickstart-java-spring-data?tabs=passwordless%2Csign-in-azure-cli) to set up your Spring application. The configuration properties are added to Spring Apps by Service Connector. Managed identity support for Cosmos DB is only available for Spring Cloud Azure version 4.0 and above. For more information, refer to [Spring Cloud Azure - Reference Documentation](https://microsoft.github.io/spring-cloud-azure/current/reference/html/index.html#authentication).
 
### [Python](#tab/python)
1. Install dependencies.
   ```bash
   pip install azure-identity
   pip install azure-cosmos
   ```
1. Authenticate via `azure-identity` library and get the endpoint URL from the environment variable added by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.
   ```python
   import os
   from azure.cosmos import CosmosClient
   from azure.identity import ManagedIdentityCredential, ClientSecretCredential
   
   # Uncomment the following lines corresponding to the authentication type you want to use.
   # system-assigned managed identity
   # cred = ManagedIdentityCredential()

   # user-assigned managed identity
   # managed_identity_client_id = os.getenv('AZURE_COSMOS_CLIENTID')
   # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)

   # service principal
   # tenant_id = os.getenv('AZURE_COSMOS_TENANTID')
   # client_id = os.getenv('AZURE_COSMOS_CLIENTID')
   # client_secret = os.getenv('AZURE_COSMOS_CLIENTSECRET')
   # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)

   endpoint = os.environ["AZURE_COSMOS_RESOURCEENDPOINT"]
   client = CosmosClient(url=endpoint, credential=cred)
   
   ```

### [Go](#tab/go)
1. Install dependencies.
    ```bash
    go get t github.com/Azure/azure-sdk-for-go/sdk/azidentity
    go get github.com/Azure/azure-sdk-for-go/sdk/data/azcosmos
    ```
1. Authenticate using `azidentity` npm package and get the endpoint URL from the environment variable added by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.
    ```go
    import (
        "os"

        "github.com/Azure/azure-sdk-for-go/sdk/data/azcosmos"
        "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
    )

    func main() {
        endpoint = os.Getenv("AZURE_COSMOS_RESOURCEENDPOINT")

        // Uncomment the following lines corresponding to the authentication type you want to use.
        // For system-assigned identity.
        // cred, err := azidentity.NewDefaultAzureCredential(nil)
        
        // For user-assigned identity.
        // clientid := os.Getenv("AZURE_COSMOS_CLIENTID")
        // azidentity.ManagedIdentityCredentialOptions.ID := clientid
        // options := &azidentity.ManagedIdentityCredentialOptions{ID: clientid}
        // cred, err := azidentity.NewManagedIdentityCredential(options)
        
        // For service principal.
        // clientid := os.Getenv("AZURE_COSMOS_CLIENTID")
        // tenantid := os.Getenv("AZURE_COSMOS_TENANTID")
        // clientsecret := os.Getenv("AZURE_COSMOS_CLIENTSECRET")
        // cred, err := azidentity.NewClientSecretCredential(tenantid, clientid, clientsecret, &azidentity.ClientSecretCredentialOptions{})

        client, err := azcosmos.NewClient(endpoint, cred, nil)
    }
    ```

### [NodeJS](#tab/nodejs)
1. Install dependencies.
    ```bash
    npm install @azure/identity
    npm install @azure/cosmos
    ```
1. Authenticate using `@azure/identity` npm package and get the endpoint URL from the environment variable added by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.
   
    ```javascript
    import { CosmosClient } from "@azure/cosmos";
    const { DefaultAzureCredential } = require("@azure/identity");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // For system-assigned managed identity.
    // const credential = new DefaultAzureCredential();

    // For user-assigned managed identity.
    // const credential = new DefaultAzureCredential({
    //     managedIdentityClientId: process.env.AZURE_COSMOS_CLIENTID
    // });
    
    // For service principal.
    // const credential = new ClientSecretCredential(
    //     tenantId: process.env.AZURE_COSMOS_TENANTID,
    //     clientId: process.env.AZURE_COSMOS_CLIENTID,
    //     clientSecret: process.env.AZURE_COSMOS_CLIENTSECRET
    // );
    
    // Create a new instance of CosmosClient using the credential above
    const cosmosClient = new CosmosClient({ 
        process.env.AZURE_COSMOS_RESOURCEENDPOINT, 
        aadCredentials: credential
    });
    ```



### [Other](#tab/none)
For other languages, you can use the endpoint URL and other properties that Service Connector sets to the environment variables to connect to Azure Cosmos DB for NoSQL. For environment variable details, see [Integrate Azure Cosmos DB for NoSQL with Service Connector](how-to-integrate-cosmos-sql.md).


## Next steps

Follow the tutorials listed below to learn more about Service Connector.

> 
> [Learn about Service Connector concepts](concept-service-connector-internals.md)
