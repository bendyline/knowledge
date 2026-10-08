---
title: Integrate Azure Web PubSub using Service Connector
description: Learn how to connect Web PubSub to supported Azure compute services by using Service Connector.
author: maud-lv
ms.author: malev
ms.service: service-connector
ms.topic: how-to
ms.date: 04/08/2026
#customer intent: As an Azure app developer, I want to see authentication methods, environment variables, and sample code for using Service Connector with Web PubSub, so I can easily integrate Web PubSub into my apps.

---

# Integrate Azure Web PubSub with Service Connector

This article shows supported clients, authentication methods, and sample code you can use to connect Azure Web PubSub to other Azure services using Service Connector. The article also shows the default environment variables you need to create the service connections. 

## Supported compute services

You can use Service Connector to connect the following Azure compute services to Web PubSub:

- Azure App Service
- Azure Functions
- Azure Kubernetes Service (AKS)
- Azure Spring Apps

## Supported clients and authentication types

The following client types support connecting Web PubSub to Azure compute services by using Service Connector:

- .NET
- Java
- Node.js
- Python

>**Note:**
>You might be able to connect to Web PubSub in other programming languages without using Service Connector.

All clients that support using Service Connector to connect Web PubSub to Azure compute services support all the following authentication types:

- System-assigned managed identity
- User-assigned managed identity
- Service principal
- Connection string

> **Important:**
> The connection string authentication flow requires a high degree of trust in the application, and carries risks not present in other flows. You should use this flow only when more secure flows, such as managed identities, aren't viable.

## Default environment variables

Use the following connection details to connect supported Azure compute services to Web PubSub using the following authentication types:

- [System-assigned managed identity](#system-assigned-managed-identity)
- [User-assigned managed identity](#user-assigned-managed-identity)
- [Service principal](#service-principal)
- [Connection string](#connection-string)

In the examples, replace the following placeholders with the values for your Web PubSub account:

- `<name>`
- `<client-ID>`
- `<client-secret>`
- `<access-key>`
- `<tenant-ID>`

For more information about naming conventions, see [Configuration naming convention](concept-service-connector-internals.md#configuration-naming-convention).

### System-assigned managed identity

Use the following environment variables for system-assigned managed identity connections.

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| AZURE_WEBPUBSUB_HOST | Azure Web PubSub host | `<name>.webpubsub.azure.com` |

### User-assigned managed identity

Use the following environment variables for user-assigned managed identity connections.

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| AZURE_WEBPUBSUB_HOST | Azure Web PubSub host | `<name>.webpubsub.azure.com` |
| AZURE_WEBPUBSUB_CLIENTID | Azure Web PubSub client ID | `<client-ID>` |

### Service principal

Use the following environment variables for service principal connections.

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| AZURE_WEBPUBSUB_HOST | Azure Web PubSub host | `<name>.webpubsub.azure.com` |
| AZURE_WEBPUBSUB_CLIENTID | Azure Web PubSub client ID | `<client-ID>` |
| AZURE_WEBPUBSUB_CLIENTSECRET | Azure Web PubSub client secret | `<client-secret>` |
| AZURE_WEBPUBSUB_TENANTID | Azure Web PubSub tenant ID | `<tenant-ID>` |

### Connection string

Use the following environment variables for connection string connections.

> **Important:**
> The connection string authentication flow requires a high degree of trust in the application, and carries risks not present in other flows. You should use this flow only when more secure flows, such as managed identities, aren't viable.

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| AZURE_WEBPUBSUB_CONNECTIONSTRING | Web PubSub connection string | `Endpoint=https://<name>.webpubsub.azure.com;AccessKey=<access-key>;Version=1.0;` |

## Sample connection code

The following steps and sample code connect to Web PubSub using Service Connector with [managed identity, service principal](#misp), or [connection string](#connection-string) authentication. The code gets the variable values from the environment variables Service Connector sets.

<a name="misp"></a>
### Managed identity or service principal

Use the following steps and code to connect your services to Web PubSub using a managed identity or service principal. In the code, uncomment the lines for the authentication type you want to use: System-assigned managed identity, user-assigned managed identity, or service principal.


### [.NET](#tab/dotnet)

1. Install dependencies.

    ```bash
    dotnet add package Azure.Identity
    dotnet add package Azure.Messaging.WebPubSub
    ```

1. Run the following code, uncommenting the part of the code snippet for the authentication type you want to use. The code authenticates using `Azure.Identity` and gets the Azure Web PubSub endpoint from the Service Connector environment variables.

    ```csharp
    using Azure.Identity;
    using Azure.Messaging.WebPubSub;

    // Uncomment the following lines corresponding to the authentication type you want to use.
    // For system-assigned identity.
    // var sqlServerTokenProvider = new DefaultAzureCredential();
    
    // For user-assigned identity.
    // var sqlServerTokenProvider = new DefaultAzureCredential(
    //     new DefaultAzureCredentialOptions
    //     {
    //         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_WEBPUBSUB_CLIENTID");
    //     }
    // );
    
    // For service principal.
    // var tenantId = Environment.GetEnvironmentVariable("AZURE_WEBPUBSUB_TENANTID");
    // var clientId = Environment.GetEnvironmentVariable("AZURE_WEBPUBSUB_CLIENTID");
    // var clientSecret = Environment.GetEnvironmentVariable("AZURE_WEBPUBSUB_CLIENTSECRET");
    // var sqlServerTokenProvider = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    var endpoint = Environment.GetEnvironmentVariable("AZURE_WEBPUBSUB_HOST");

    // Replace "<hub>" with your hub name.
    var client = new WebPubSubServiceClient(new Uri(endpoint), "<hub>", credential);
    ```

### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
      <groupId>com.azure</groupId>
      <artifactId>azure-identity</artifactId>
      <version>1.4.1</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-messaging-webpubsub</artifactId>
        <version>1.0.0</version>
    </dependency>
    ```

1. Run the following code, uncommenting the part of the code snippet for the authentication type you want to use. The code authenticates using `azure-identity` and gets the Web PubSub endpoint from the Service Connector environment variables.

    ```java
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // For system-assigned managed identity.
    // DefaultAzureCredential credential = new DefaultAzureCredentialBuilder().build();

    // For user-assigned managed identity.
    // DefaultAzureCredential credential = new DefaultAzureCredentialBuilder()
    //     .managedIdentityClientId(System.getenv("AZURE_WEBPUBSUB_CLIENTID"))
    //     .build();

    // For service principal.
    // ClientSecretCredential credential = new ClientSecretCredentialBuilder()
    //   .clientId(System.getenv("<AZURE_WEBPUBSUB_CLIENTID>"))
    //   .clientSecret(System.getenv("<AZURE_WEBPUBSUB_CLIENTSECRET>"))
    //   .tenantId(System.getenv("<AZURE_WEBPUBSUB_TENANTID>"))
    //   .build();
    
    String endpoint = System.getenv("AZURE_WEBPUBSUB_HOST");
    
    // Replace "<hub>" with your hub name.
    WebPubSubServiceClient client = new WebPubSubServiceClientBuilder()
                .endpoint(endpoint)
                .credential(credential)
                .hub("<hub>")
                .buildClient();
    
    ```

### [Python](#tab/python)

1. Install dependencies.

    ```bash
    python -m pip install azure-identity
    python -m pip install azure-messaging-webpubsubservice
    ```

1. Run the following code, uncommenting the part of the code snippet for the authentication type you want to use. The code authenticates using `azure-identity` and gets the Web PubSub endpoint from the Service Connector environment variables.

    ```python
    from azure.identity import ManagedIdentityCredential, ClientSecretCredential
    from azure.messaging.webpubsubservice import WebPubSubServiceClient
    
    # Uncomment the following lines corresponding to the authentication type you want to use.
    # For system-assigned managed identity.
    # cred = ManagedIdentityCredential()

    # For user-assigned managed identity.
    # managed_identity_client_id = os.getenv('AZURE_WEBPUBSUB_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)

    # For service principal.
    # tenant_id = os.getenv('AZURE_WEBPUBSUB_TENANTID')
    # client_id = os.getenv('AZURE_WEBPUBSUB_CLIENTID')
    # client_secret = os.getenv('AZURE_WEBPUBSUB_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)
    
    endpoint = os.getenv("AZURE_WEBPUBSUB_HOST")
    
    # Replace "<hub>" with your hub name.
    client = WebPubSubServiceClient(hub="<hub>", endpoint=endpoint, credential=cred)
    ```

### [NodeJS](#tab/nodejs)

1. Install dependencies.

    ```bash
    npm install @azure/web-pubsub
    npm install --save @azure/identity
    ```

1. Run the following code, uncommenting the part of the code snippet for the authentication type you want to use. The code authenticates using `@azure/identity` and gets the Azure Web PubSub endpoint from the Service Connector environment variables.

    ```javascript
    const { DefaultAzureCredential,ClientSecretCredential } = require("@azure/identity");
    const { WebPubSubServiceClient } = require("@azure/web-pubsub");

    // Uncomment the following lines corresponding to the authentication type you want to use.  
    // For system-assigned identity.
    // const credential = new DefaultAzureCredential();
    
    // For user-assigned identity.
    // const clientId = process.env.AZURE_WEBPUBSUB_CLIENTID;
    // const credential = new DefaultAzureCredential({
    //     managedIdentityClientId: clientId
    // });
    
    // For service principal.
    // const tenantId = process.env.AZURE_WEBPUBSUB_TENANTID;
    // const clientId = process.env.AZURE_WEBPUBSUB_CLIENTID;
    // const clientSecret = process.env.AZURE_WEBPUBSUB_CLIENTSECRET;
    
    const endpoint = process.env.AZURE_WEBPUBSUB_HOST;
    
    // Replace "<hub>" with your hub name.
    let serviceClient = new WebPubSubServiceClient(
        endpoint,
        credential,
        "<hub>"
    );
    ```
### [Other](#tab/none)

For other languages, you can use the connection configuration properties that Service Connector sets to the environment variables to connect to Azure Web PubSub.

---

### Connection string

Use the following steps and code to connect to Web PubSub using a connection string.

> **Important:**
> The connection string authentication flow requires a high degree of trust in the application, and carries risks not present in other flows. You should use this flow only when more secure flows, such as managed identities, aren't viable.


### [.NET](#tab/dotnet)

1. Install dependency.

    ```bash
    dotnet add package Azure.Messaging.WebPubSub
    ```

1. Run the following code, getting the connection string from the Service Connector environment variables.

    ```csharp
    using Azure.Messaging.WebPubSub;

    string connectionString = Environment.GetEnvironmentVariable("AZURE_WEBPUBSUB_CONNECTIONSTRING");

    // Replace "<hub>" with your hub name.
    var serviceClient = new WebPubSubServiceClient(connectionString, "<hub>");
    ```

### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-messaging-webpubsub</artifactId>
        <version>1.0.0</version>
    </dependency>
    ```

1. Run the following code, getting the connection string from the Service Connector environment variables.

    ```java
    String connectionString = System.getenv("AZURE_WEBPUBSUB_CONNECTIONSTRING");

    // Replace "<hub>" with your hub name.
    WebPubSubServiceClient webPubSubServiceClient = new WebPubSubServiceClientBuilder()
        .connectionString(connectionString)
        .hub("<hub>")
        .buildClient();
    ```

### [Python](#tab/python)

1. Install dependency.

    ```bash
    python -m pip install azure-messaging-webpubsubservice
    ```

1. Run the following code, getting the connection string from the Service Connector environment variables.

    ```python
    from azure.messaging.webpubsubservice import WebPubSubServiceClient
    
    connection_string = os.getenv('AZURE_WEBPUBSUB_CONNECTIONSTRING')
    
    # Replace "<hub>" with your hub name.
    service = WebPubSubServiceClient.from_connection_string(connection_string=connection_string, hub='<hub>')
    ```

### [NodeJS](#tab/nodejs)

1. Install dependency.

    ```bash
    npm install @azure/web-pubsub
    ```

1. Run the following code, getting the connection string from the Service Connector environment variables.

    ```javascript
    const { WebPubSubServiceClient } = require("@azure/web-pubsub");
    
    const ConnectionString = process.env.AZURE_WEBPUBSUB_CONNECTIONSTRING;
    
    // Replace "<hub>" with your hub name.
    const serviceClient = new WebPubSubServiceClient(ConnectionString, "<hubName>");
    ```

### [Other](#tab/none)
For other languages, you can use the connection configuration properties that Service Connector sets to the environment variables to connect to Azure Web PubSub.

---



## Related content

- [Service Connector concepts](concept-service-connector-internals.md)
- [Configuration naming convention](concept-service-connector-internals.md#configuration-naming-convention)
