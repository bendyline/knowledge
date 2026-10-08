---
title: Integrate Azure Table Storage with Service Connector
description: Use these code samples to integrate Azure Table Storage into your application with Service Connector.
author: maud-lv
ms.author: malev
ms.service: service-connector
ms.topic: how-to
ms.date: 06/17/2026
#customer intent: As a cloud developer, I want to connect my compute services to Azure Table Storage using Service Connector.
---

# Integrate Azure Table Storage with Service Connector

This article describes supported authentication methods and clients. It also provides sample code to connect compute services to Azure Table Storage by using Service Connector. You can still connect to Azure Table Storage in other programming languages without using Service Connector. This article also lists default environment variable names and values that you receive when you create the service connection.

## Supported compute services

Service Connector can be used to connect the following compute services to Azure Table Storage:

- Azure App Service
- Azure Functions
- Azure Kubernetes Service (AKS)
- Azure Spring Apps

This table shows which combinations of authentication methods and clients are supported for connecting your compute service to Azure Table Storage using Service Connector. A "Yes" indicates that the combination is supported, while a "No" indicates that it isn't supported.

| Client type | System-assigned managed identity | User-assigned managed identity | Secret / connection string | Service principal |
| --- | --- | --- | --- | --- |
| .NET | Yes | Yes | Yes | Yes |
| Java | Yes | Yes | Yes | Yes |
| Node.js | Yes | Yes | Yes | Yes |
| Python | Yes | Yes | Yes | Yes |

This table shows that all listed combinations of client types and authentication methods are supported.

## Default environment variable names or application properties and sample code

To connect compute services to Azure Table Storage, use the following connection details. For more information, see [Configuration naming convention](concept-service-connector-internals.md#configuration-naming-convention).

### System-assigned managed identity

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| AZURE_STORAGETABLE_RESOURCEENDPOINT | Table Storage endpoint | `https://<storage-account-name>.table.core.windows.net/` |

#### Sample code

To connect to Azure Table Storage using a system-assigned managed identity:


### [.NET](#tab/dotnet)

1. Install dependencies.

    ```bash
    dotnet add package Azure.Identity
    dotnet add package Azure.Data.Tables
    ```

1. Use [Azure.Identity](https://www.nuget.org/packages/Azure.Identity/) to authenticate by using a managed identity or service principal. Get the Azure Table Storage endpoint URL from the environment variable added by Service Connector. In the following code, uncomment the section for your authentication type.

    ```csharp
    using Azure.Identity;
    using Azure.Data.Tables;
    
    // get Table endpoint
    var tableEndpoint = Environment.GetEnvironmentVariable("AZURE_STORAGETABLE_RESOURCEENDPOINT");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // system-assigned managed identity
    // var credential = new DefaultAzureCredential();
    
    // user-assigned managed identity
    // var credential = new DefaultAzureCredential(
    //     new DefaultAzureCredentialOptions
    //     {
    //         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_STORAGETABLE_CLIENTID");
    //     });
    
    // service principal 
    // var tenantId = Environment.GetEnvironmentVariable("AZURE_STORAGETABLE_TENANTID");
    // var clientId = Environment.GetEnvironmentVariable("AZURE_STORAGETABLE_CLIENTID");
    // var clientSecret = Environment.GetEnvironmentVariable("AZURE_STORAGETABLE_CLIENTSECRET");
    // var credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    var tableServiceClient = new TableServiceClient(
            new Uri(tableEndpoint),
            credential);
    ```

### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
      <groupId>com.azure</groupId>
      <artifactId>azure-data-tables</artifactId>
      <version>12.3.15</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.1.5</version>
    </dependency>
    ```

1. Authenticate using `azure-identity` and get the endpoint URL from the environment variable added by Service Connector. When you use the following code, uncomment the part of the code snippet for the authentication type you want to use.

    ```java
    String url = System.getenv("AZURE_STORAGETABLE_RESOURCEENDPOINT");  

    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-assigned managed identity
    // DefaultAzureCredential defaultCredential = new DefaultAzureCredentialBuilder().build();

    // for user-assigned managed identity
    // DefaultAzureCredential defaultCredential = new DefaultAzureCredentialBuilder()
    //     .managedIdentityClientId(System.getenv("AZURE_STORAGETABLE_CLIENTID"))
    //     .build();

    // for service principal
    // ClientSecretCredential defaultCredential = new ClientSecretCredentialBuilder()
    //   .clientId(System.getenv("<AZURE_STORAGETABLE_CLIENTID>"))
    //   .clientSecret(System.getenv("<AZURE_STORAGETABLE_CLIENTSECRET>"))
    //   .tenantId(System.getenv("<AZURE_STORAGETABLE_TENANTID>"))
    //   .build();

    TableServiceClient tableServiceClient = new TableServiceClientBuilder()
        .endpoint(url)
        .credential(defaultCredential)
        .buildClient();
    ```

### [Python](#tab/python)
1. Install dependencies.

   ```bash
   pip install azure-identity
   pip install azure-data-tables
   ```

1. Authenticate using the `azure-identity` library and get the Azure Table Storage endpoint URL from the environment variable added by Service Connector. When you use the following code, uncomment the part of the code snippet for the authentication type you want to use.

    ```python
    from azure.identity import ManagedIdentityCredential, ClientSecretCredential
    from azure.data.tables import TableServiceClient
    import os
    
    account_url = os.getenv('AZURE_STORAGETABLE_RESOURCEENDPOINT')
    
    # Uncomment the following lines corresponding to the authentication type you want to use.
    # system assigned managed identity
    # cred = ManagedIdentityCredential()
    
    # user assigned managed identity
    # managed_identity_client_id = os.getenv('AZURE_STORAGETABLE_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)
    
    # service principal
    # tenant_id = os.getenv('AZURE_STORAGETABLE_TENANTID')
    # client_id = os.getenv('AZURE_STORAGETABLE_CLIENTID')
    # client_secret = os.getenv('AZURE_STORAGETABLE_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret) 
    
    table_service_client = TableServiceClient(account_url, credential=cred)
    ```

### [Node.js](#tab/nodejs)
1. Install dependencies.

   ```bash
   npm install --save @azure/identity
   npm install @azure/data-tables
   ```

1. Authenticate using the `@azure/identity` library and get the Azure Table Storage endpoint URL from the environment variable added by Service Connector. When you use the following code, uncomment the part of the code snippet for the authentication type you want to use.


    ```javascript
    import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
    const { TableClient } = require("@azure/data-tables");
    
    const account_url = process.env.AZURE_STORAGETABLE_RESOURCEENDPOINT;
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system assigned managed identity
    // const credential = new DefaultAzureCredential();
    
    // for user assigned managed identity
    // const clientId = process.env.AZURE_STORAGETABLE_CLIENTID;
    // const credential = new DefaultAzureCredential({
    //     managedIdentityClientId: clientId
    // });
    
    // for service principal
    // const tenantId = process.env.AZURE_STORAGETABLE_TENANTID;
    // const clientId = process.env.AZURE_STORAGETABLE_CLIENTID;
    // const clientSecret = process.env.AZURE_STORAGETABLE_CLIENTSECRET;
    // const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    const tableServiceClient = new TableServiceClient(account_url, credential);
    ```

### [Other](#tab/none)
For other languages, you can use the Azure Table Storage account URL and other properties that Service Connector sets to the environment variables to connect to Azure Table Storage. For environment variable details, see [Integrate Azure Table Storage with Service Connector](how-to-integrate-storage-table.md).


### User-assigned managed identity

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| AZURE_STORAGETABLE_RESOURCEENDPOINT | Table Storage endpoint | `https://<storage-account-name>.table.core.windows.net/` |
| AZURE_STORAGETABLE_CLIENTID | Your client ID | `<client-ID>` |

#### Sample code

To connect to Azure Table Storage using a user-assigned managed identity:


### [.NET](#tab/dotnet)

1. Install dependencies.

    ```bash
    dotnet add package Azure.Identity
    dotnet add package Azure.Data.Tables
    ```

1. Use [Azure.Identity](https://www.nuget.org/packages/Azure.Identity/) to authenticate by using a managed identity or service principal. Get the Azure Table Storage endpoint URL from the environment variable added by Service Connector. In the following code, uncomment the section for your authentication type.

    ```csharp
    using Azure.Identity;
    using Azure.Data.Tables;
    
    // get Table endpoint
    var tableEndpoint = Environment.GetEnvironmentVariable("AZURE_STORAGETABLE_RESOURCEENDPOINT");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // system-assigned managed identity
    // var credential = new DefaultAzureCredential();
    
    // user-assigned managed identity
    // var credential = new DefaultAzureCredential(
    //     new DefaultAzureCredentialOptions
    //     {
    //         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_STORAGETABLE_CLIENTID");
    //     });
    
    // service principal 
    // var tenantId = Environment.GetEnvironmentVariable("AZURE_STORAGETABLE_TENANTID");
    // var clientId = Environment.GetEnvironmentVariable("AZURE_STORAGETABLE_CLIENTID");
    // var clientSecret = Environment.GetEnvironmentVariable("AZURE_STORAGETABLE_CLIENTSECRET");
    // var credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    var tableServiceClient = new TableServiceClient(
            new Uri(tableEndpoint),
            credential);
    ```

### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
      <groupId>com.azure</groupId>
      <artifactId>azure-data-tables</artifactId>
      <version>12.3.15</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.1.5</version>
    </dependency>
    ```

1. Authenticate using `azure-identity` and get the endpoint URL from the environment variable added by Service Connector. When you use the following code, uncomment the part of the code snippet for the authentication type you want to use.

    ```java
    String url = System.getenv("AZURE_STORAGETABLE_RESOURCEENDPOINT");  

    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-assigned managed identity
    // DefaultAzureCredential defaultCredential = new DefaultAzureCredentialBuilder().build();

    // for user-assigned managed identity
    // DefaultAzureCredential defaultCredential = new DefaultAzureCredentialBuilder()
    //     .managedIdentityClientId(System.getenv("AZURE_STORAGETABLE_CLIENTID"))
    //     .build();

    // for service principal
    // ClientSecretCredential defaultCredential = new ClientSecretCredentialBuilder()
    //   .clientId(System.getenv("<AZURE_STORAGETABLE_CLIENTID>"))
    //   .clientSecret(System.getenv("<AZURE_STORAGETABLE_CLIENTSECRET>"))
    //   .tenantId(System.getenv("<AZURE_STORAGETABLE_TENANTID>"))
    //   .build();

    TableServiceClient tableServiceClient = new TableServiceClientBuilder()
        .endpoint(url)
        .credential(defaultCredential)
        .buildClient();
    ```

### [Python](#tab/python)
1. Install dependencies.

   ```bash
   pip install azure-identity
   pip install azure-data-tables
   ```

1. Authenticate using the `azure-identity` library and get the Azure Table Storage endpoint URL from the environment variable added by Service Connector. When you use the following code, uncomment the part of the code snippet for the authentication type you want to use.

    ```python
    from azure.identity import ManagedIdentityCredential, ClientSecretCredential
    from azure.data.tables import TableServiceClient
    import os
    
    account_url = os.getenv('AZURE_STORAGETABLE_RESOURCEENDPOINT')
    
    # Uncomment the following lines corresponding to the authentication type you want to use.
    # system assigned managed identity
    # cred = ManagedIdentityCredential()
    
    # user assigned managed identity
    # managed_identity_client_id = os.getenv('AZURE_STORAGETABLE_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)
    
    # service principal
    # tenant_id = os.getenv('AZURE_STORAGETABLE_TENANTID')
    # client_id = os.getenv('AZURE_STORAGETABLE_CLIENTID')
    # client_secret = os.getenv('AZURE_STORAGETABLE_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret) 
    
    table_service_client = TableServiceClient(account_url, credential=cred)
    ```

### [Node.js](#tab/nodejs)
1. Install dependencies.

   ```bash
   npm install --save @azure/identity
   npm install @azure/data-tables
   ```

1. Authenticate using the `@azure/identity` library and get the Azure Table Storage endpoint URL from the environment variable added by Service Connector. When you use the following code, uncomment the part of the code snippet for the authentication type you want to use.


    ```javascript
    import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
    const { TableClient } = require("@azure/data-tables");
    
    const account_url = process.env.AZURE_STORAGETABLE_RESOURCEENDPOINT;
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system assigned managed identity
    // const credential = new DefaultAzureCredential();
    
    // for user assigned managed identity
    // const clientId = process.env.AZURE_STORAGETABLE_CLIENTID;
    // const credential = new DefaultAzureCredential({
    //     managedIdentityClientId: clientId
    // });
    
    // for service principal
    // const tenantId = process.env.AZURE_STORAGETABLE_TENANTID;
    // const clientId = process.env.AZURE_STORAGETABLE_CLIENTID;
    // const clientSecret = process.env.AZURE_STORAGETABLE_CLIENTSECRET;
    // const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    const tableServiceClient = new TableServiceClient(account_url, credential);
    ```

### [Other](#tab/none)
For other languages, you can use the Azure Table Storage account URL and other properties that Service Connector sets to the environment variables to connect to Azure Table Storage. For environment variable details, see [Integrate Azure Table Storage with Service Connector](how-to-integrate-storage-table.md).


### Connection string

> **Warning:**
> Microsoft recommends that you use the most secure authentication flow available. The authentication flow described in this procedure requires a very high degree of trust in the application. It carries risks that aren't present in other flows. You should only use this flow when other more secure flows, such as managed identities, aren't viable.

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| AZURE_STORAGETABLE_CONNECTIONSTRING | Table Storage connection string | `DefaultEndpointsProtocol=https;AccountName=<account-name>;AccountKey=<account-key>;EndpointSuffix=core.windows.net` |

#### Sample code

To connect to Azure Table Storage using a connection string:

### [.NET](#tab/dotnet)

1. Install dependencies.

    ```bash
    dotnet add package Azure.Data.Tables
    ```

1. Get the Azure Table Storage connection string from the environment variable added by Service Connector.

    ```csharp
    using Azure.Data.Tables;
    
    var connectionString = Environment.GetEnvironmentVariable("AZURE_STORAGETABLE_CONNECTIONSTRING");
    TableServiceClient tableServiceClient = new TableServiceClient(connectionString);
    ```

### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-data-tables</artifactId>
        <version>12.2.1</version>
    </dependency>
    ```

1. Get the Azure Table Storage connection string from the environment variable added by Service Connector.

    ```java
    String connectionStr = System.getenv("AZURE_STORAGETABLE_CONNECTIONSTRING");
    TableServiceClient tableServiceClient = new TableServiceClientBuilder()
        .connectionString(connectionStr)
        .buildClient();
    ```

### [Python](#tab/python)
1. Install dependencies.

    ```bash
    pip install azure-data-tables
    ```

1. Get the Azure Table Storage connection string from the environment variable added by Service Connector.

    ```python
    from azure.data.tables import TableServiceClient
    import os
    
    conn_str = os.getenv("AZURE_STORAGETABLE_CONNECTIONSTRING")
    table_service = TableServiceClient.from_connection_string(conn_str)
    ```

### [Node.js](#tab/nodejs)
1. Install dependencies.

    ```bash
    npm install @azure/data-tables
    ```

1. Get the Azure Table Storage connection string from the environment variable added by Service Connector.

    ```javascript
    const { TableClient } = require("@azure/data-tables");

    const connection_str = process.env.AZURE_STORAGETABLE_CONNECTIONSTRING;
    const serviceClient = TableServiceClient.fromConnectionString(connection_str);
    ```

### [Other](#tab/none)
For other languages, you can use the Azure Table Storage account URL and other properties that Service Connector sets to the environment variables to connect to Azure Table Storage. For environment variable details, see [Integrate Azure Table Storage with Service Connector](how-to-integrate-storage-table.md).

### Service principal

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| AZURE_STORAGETABLE_RESOURCEENDPOINT | Table Storage endpoint | `https://<storage-account-name>.table.core.windows.net/` |
| AZURE_STORAGETABLE_CLIENTID | Your client ID | `<client-ID>` |
| AZURE_STORAGETABLE_CLIENTSECRET | Your client secret | `<client-secret>` |
| AZURE_STORAGETABLE_TENANTID | Your tenant ID | `<tenant-ID>` |

#### Sample code

To connect to Azure Table Storage using a service principal:


### [.NET](#tab/dotnet)

1. Install dependencies.

    ```bash
    dotnet add package Azure.Identity
    dotnet add package Azure.Data.Tables
    ```

1. Use [Azure.Identity](https://www.nuget.org/packages/Azure.Identity/) to authenticate by using a managed identity or service principal. Get the Azure Table Storage endpoint URL from the environment variable added by Service Connector. In the following code, uncomment the section for your authentication type.

    ```csharp
    using Azure.Identity;
    using Azure.Data.Tables;
    
    // get Table endpoint
    var tableEndpoint = Environment.GetEnvironmentVariable("AZURE_STORAGETABLE_RESOURCEENDPOINT");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // system-assigned managed identity
    // var credential = new DefaultAzureCredential();
    
    // user-assigned managed identity
    // var credential = new DefaultAzureCredential(
    //     new DefaultAzureCredentialOptions
    //     {
    //         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_STORAGETABLE_CLIENTID");
    //     });
    
    // service principal 
    // var tenantId = Environment.GetEnvironmentVariable("AZURE_STORAGETABLE_TENANTID");
    // var clientId = Environment.GetEnvironmentVariable("AZURE_STORAGETABLE_CLIENTID");
    // var clientSecret = Environment.GetEnvironmentVariable("AZURE_STORAGETABLE_CLIENTSECRET");
    // var credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    var tableServiceClient = new TableServiceClient(
            new Uri(tableEndpoint),
            credential);
    ```

### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
      <groupId>com.azure</groupId>
      <artifactId>azure-data-tables</artifactId>
      <version>12.3.15</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.1.5</version>
    </dependency>
    ```

1. Authenticate using `azure-identity` and get the endpoint URL from the environment variable added by Service Connector. When you use the following code, uncomment the part of the code snippet for the authentication type you want to use.

    ```java
    String url = System.getenv("AZURE_STORAGETABLE_RESOURCEENDPOINT");  

    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-assigned managed identity
    // DefaultAzureCredential defaultCredential = new DefaultAzureCredentialBuilder().build();

    // for user-assigned managed identity
    // DefaultAzureCredential defaultCredential = new DefaultAzureCredentialBuilder()
    //     .managedIdentityClientId(System.getenv("AZURE_STORAGETABLE_CLIENTID"))
    //     .build();

    // for service principal
    // ClientSecretCredential defaultCredential = new ClientSecretCredentialBuilder()
    //   .clientId(System.getenv("<AZURE_STORAGETABLE_CLIENTID>"))
    //   .clientSecret(System.getenv("<AZURE_STORAGETABLE_CLIENTSECRET>"))
    //   .tenantId(System.getenv("<AZURE_STORAGETABLE_TENANTID>"))
    //   .build();

    TableServiceClient tableServiceClient = new TableServiceClientBuilder()
        .endpoint(url)
        .credential(defaultCredential)
        .buildClient();
    ```

### [Python](#tab/python)
1. Install dependencies.

   ```bash
   pip install azure-identity
   pip install azure-data-tables
   ```

1. Authenticate using the `azure-identity` library and get the Azure Table Storage endpoint URL from the environment variable added by Service Connector. When you use the following code, uncomment the part of the code snippet for the authentication type you want to use.

    ```python
    from azure.identity import ManagedIdentityCredential, ClientSecretCredential
    from azure.data.tables import TableServiceClient
    import os
    
    account_url = os.getenv('AZURE_STORAGETABLE_RESOURCEENDPOINT')
    
    # Uncomment the following lines corresponding to the authentication type you want to use.
    # system assigned managed identity
    # cred = ManagedIdentityCredential()
    
    # user assigned managed identity
    # managed_identity_client_id = os.getenv('AZURE_STORAGETABLE_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)
    
    # service principal
    # tenant_id = os.getenv('AZURE_STORAGETABLE_TENANTID')
    # client_id = os.getenv('AZURE_STORAGETABLE_CLIENTID')
    # client_secret = os.getenv('AZURE_STORAGETABLE_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret) 
    
    table_service_client = TableServiceClient(account_url, credential=cred)
    ```

### [Node.js](#tab/nodejs)
1. Install dependencies.

   ```bash
   npm install --save @azure/identity
   npm install @azure/data-tables
   ```

1. Authenticate using the `@azure/identity` library and get the Azure Table Storage endpoint URL from the environment variable added by Service Connector. When you use the following code, uncomment the part of the code snippet for the authentication type you want to use.


    ```javascript
    import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
    const { TableClient } = require("@azure/data-tables");
    
    const account_url = process.env.AZURE_STORAGETABLE_RESOURCEENDPOINT;
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system assigned managed identity
    // const credential = new DefaultAzureCredential();
    
    // for user assigned managed identity
    // const clientId = process.env.AZURE_STORAGETABLE_CLIENTID;
    // const credential = new DefaultAzureCredential({
    //     managedIdentityClientId: clientId
    // });
    
    // for service principal
    // const tenantId = process.env.AZURE_STORAGETABLE_TENANTID;
    // const clientId = process.env.AZURE_STORAGETABLE_CLIENTID;
    // const clientSecret = process.env.AZURE_STORAGETABLE_CLIENTSECRET;
    // const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    const tableServiceClient = new TableServiceClient(account_url, credential);
    ```

### [Other](#tab/none)
For other languages, you can use the Azure Table Storage account URL and other properties that Service Connector sets to the environment variables to connect to Azure Table Storage. For environment variable details, see [Integrate Azure Table Storage with Service Connector](how-to-integrate-storage-table.md).


## Next step

> 
> [Learn about Service Connector concepts](concept-service-connector-internals.md)
