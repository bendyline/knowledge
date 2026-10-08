---
title: Use Service Connector to integrate Azure Event Hubs
description: Learn how to connect Azure Event Hubs to supported Azure compute services by using Service Connector.
author: maud-lv
ms.author: malev
ms.service: service-connector
ms.topic: how-to
ms.date: 04/10/2026
#customer intent: As an Azure app developer, I want to see authentication methods, environment variables, and sample code for integrating Azure Event Hubs, so I can use Service Connector to easily connect Event Hubs to my Azure compute services.

---

# Integrate Event Hubs with Service Connector

This article shows supported clients, authentication methods, and sample code you can use to connect Azure Event Hubs to other Azure services using Service Connector. The article also shows the default environment variables and Spring Boot configurations you need to create the service connections. 

>**Note:**
>You might be able to connect to Event Hubs in other programming languages without using Service Connector.

## Supported compute services

You can use Service Connector to connect the following compute services to Event Hubs:

- Azure App Service
- Azure Functions
- Azure Kubernetes Service (AKS)
- Azure Spring Apps

## Supported clients and authentication types

The following client types support connecting Event Hubs to Azure compute services by using Service Connector:

- .NET
- Go
- Java
- Java Spring Boot
- Kafka Spring Boot
- Node.js
- Python

All clients that support using Service Connector to connect Event Hubs to Azure compute services support all the following authentication types:

- System-assigned managed identity
- User-assigned managed identity
- Service principal
- Secret or connection string

> **Important:**
> The secret or connection string authentication flow requires a high degree of trust in the application, and carries risks not present in other flows. You should use this flow only when more secure flows, such as managed identities, aren't viable.

## Default environment variables

Use the following connection details to connect supported Azure compute services to Event Hubs using the following authentication types:

- [System-assigned managed identity](#system-assigned-managed-identity)
- [User-assigned managed identity](#user-assigned-managed-identity)
- [Service principal](#service-principal)
- [Secret or connection string](#connection-string)

In the examples, replace the following placeholders with the values from your Event Hubs instance:

- `<Event-Hubs-namespace>`
- `<access-key-name>`
- `<access-key-value>`
- `<client-ID>`
- `<client-secret>`
- `<tenant-ID>`

For more information about naming conventions, see [Configuration naming convention](concept-service-connector-internals.md#configuration-naming-convention).

### System-assigned managed identity

Use the following environment variables for system-assigned managed identity connections.

#### All client types except Spring Boot and Kafka Spring Boot

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| AZURE_EVENTHUB_FULLYQUALIFIEDNAMESPACE | Event Hubs namespace | `<Event-Hubs-namespace>.servicebus.windows.net` |

#### Spring Boot client type

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| spring.cloud.azure.eventhub.namespace | Event Hubs namespace | `<Event-Hubs-namespace>.servicebus.windows.net` |
| spring.cloud.azure.eventhubs.namespace | Event Hubs namespace for Spring Cloud Azure version above 4.0 | `<Event-Hubs-namespace>.servicebus.windows.net` |
| spring.cloud.azure.eventhubs.credential.managed-identity-enabled | Whether to enable managed identity | `true` |

#### Kafka Spring Boot client type

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| spring.kafka.bootstrap-servers | Kafka bootstrap server | `<Event-Hubs-namespace>.servicebus.windows.net` |

### User-assigned managed identity

Use the following environment variables for user-assigned managed identity connections.

#### All client types except Spring Boot and Kafka Spring Boot

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| AZURE_EVENTHUB_FULLYQUALIFIEDNAMESPACE | Event Hubs namespace | `<Event-Hubs-namespace>.servicebus.windows.net` |
| AZURE_EVENTHUB_CLIENTID | Client ID | `<client-ID>` |

#### Spring Boot client type

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| spring.cloud.azure.eventhub.namespace | Event Hubs namespace | `<Event-Hubs-namespace>.servicebus.windows.net` |
| spring.cloud.azure.client-id | Client ID | `<client-ID>` |
| spring.cloud.azure.eventhubs.namespace | Event Hubs namespace for Spring Cloud Azure version above 4.0 | `<Event-Hubs-namespace>.servicebus.windows.net` |
| spring.cloud.azure.eventhubs.credential.client-id | Client ID for Spring Cloud Azure version above 4.0 | `<client-ID>` |
| spring.cloud.azure.eventhubs.credential.managed-identity-enabled | Whether to enable managed identity | `true` |

#### Kafka-Spring Boot client type

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| spring.kafka.bootstrap-servers | Kafka bootstrap server | `<Event-Hubs-namespace>.servicebus.windows.net` |
| spring.kafka.properties.azure.credential.managed-identity-enabled | Whether to enable managed identity | `true` |
| spring.kafka.properties.azure.credential.client-id | Client ID | `<client-ID>` |

### Service principal

Use the following environment variables for service principal connections.

#### All client types except Spring Boot and Kafka Spring Boot

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| AZURE_EVENTHUB_FULLYQUALIFIEDNAMESPACE | Event Hubs namespace | `<Event-Hubs-namespace>.servicebus.windows.net` |
| AZURE_EVENTHUB_CLIENTID | Client ID | `<client-ID>` |
| AZURE_EVENTHUB_CLIENTSECRET | Client secret | `<client-secret>` |
| AZURE_EVENTHUB_TENANTID | Tenant ID | `<tenant-ID>` |

#### Spring Boot client type

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| spring.cloud.azure.eventhub.namespace | Event Hubs namespace | `<Event-Hubs-namespace>.servicebus.windows.net` |
| spring.cloud.azure.client-id | Client ID | `<client-ID>` |
| spring.cloud.azure.tenant-id | Tenant ID | `<tenant-ID>` |
| spring.cloud.azure.client-secret | Client secret | `<client-secret>` |
| spring.cloud.azure.eventhubs.namespace | Event Hubs namespace for Spring Cloud Azure version above 4.0 | `<Event-Hubs-namespace>.servicebus.windows.net` |
| spring.cloud.azure.eventhubs.credential.client-id | Client ID for Spring Cloud Azure version above 4.0 | `<client-ID>` |
| spring.cloud.azure.eventhubs.credential.client-secret | Client secret for Spring Cloud Azure version above 4.0 | `<client-secret>` |
| spring.cloud.azure.eventhubs.profile.tenant-id | Tenant ID for Spring Cloud Azure version above 4.0 | `<tenant-ID>` |

#### Kafka Spring Boot client type

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| spring.kafka.bootstrap-servers | Kafka bootstrap server | `<Event-Hubs-namespace>.servicebus.windows.net` |
| spring.kafka.properties.azure.credential.client-id | Client ID | `<client-ID>` |
| spring.kafka.properties.azure.credential.client-secret | Client secret | `<client-secret>` |
| spring.kafka.properties.azure.profile.tenant-id | Tenant ID | `<tenant-ID>` |

### Connection string

Use the following environment variables for connection string connections.

> **Important:**
> The connection string authentication flow requires a high degree of trust in the application, and carries risks not present in other flows. You should use this flow only when more secure flows, such as managed identities, aren't viable.

#### All client types except Spring Boot and Kafka Spring Boot

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| AZURE_EVENTHUB_CONNECTIONSTRING | Event Hubs connection string | `Endpoint=sb://<Event-Hubs-namespace>.servicebus.windows.net/;SharedAccessKeyName=<access-key-name>;SharedAccessKey=<access-key-value>` |

#### Spring Boot client type

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| spring.cloud.azure.storage.connection-string | Event Hubs connection string | `Endpoint=sb://servicelinkertesteventhub.servicebus.windows.net/;SharedAccessKeyName=<access-key-name>;SharedAccessKey=<access-key-value>` |
| spring.cloud.azure.eventhubs.connection-string | Event Hubs connection string for Spring Cloud Azure version above 4.0 | `Endpoint=sb://servicelinkertesteventhub.servicebus.windows.net/;SharedAccessKeyName=<access-key-name>;SharedAccessKey=<access-key-value>` |

#### Kafka Spring Boot client type

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| spring.cloud.azure.eventhubs.connection-string | Event Hubs connection string | `Endpoint=sb://servicelinkertesteventhub.servicebus.windows.net/;SharedAccessKeyName=<access-key-name>;SharedAccessKey=<access-key-value>` |

## Sample connection code

The following steps and sample code connect to Event Hubs using Service Connector using [managed identity, service principal](#misp), or [connection string](#connection-string) authentication. The code gets the variable values from the environment variables Service Connector sets. In the code, replace the `<NAME OF THE EVENT HUB>` placeholder with your event hub name.

<a name="misp"></a>
### Managed identity or service principal

Use the following steps and code to connect your services to Event Hubs using managed identity or service principal authentication. In the code, uncomment the part of the code snippet for the authentication type you want to use: System-assigned managed identity, user-assigned managed identity, or service principal.


### [.NET](#tab/dotnet)

1. Install dependencies.

    ```bash
    dotnet add package Azure.Identity
    dotnet add package Azure.Messaging.EventHubs
    ```

1. Run the following code, uncommenting the part of the code snippet for the authentication type you want to use. The code authenticates using `Azure.Identity` and gets the Azure Event Hubs namespace from the Service Connector environment variables.

    ```csharp
    using System; 
    using Azure.Identity;
    using Azure.Messaging.EventHubs;

    // Uncomment the following lines corresponding to the authentication type you want to use.
    // system-assigned managed identity
    // var credential = new DefaultAzureCredential();
    
    // user-assigned managed identity
    // var credential = new DefaultAzureCredential(
    //     new DefaultAzureCredentialOptions
    //     {
    //         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_EVENTHUB_CLIENTID");
    //     });
    
    // service principal 
    // var tenantId = Environment.GetEnvironmentVariable("AZURE_EVENTHUB_TENANTID");
    // var clientId = Environment.GetEnvironmentVariable("AZURE_EVENTHUB_CLIENTID");
    // var clientSecret = Environment.GetEnvironmentVariable("AZURE_EVENTHUB_CLIENTSECRET");
    // var credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

    var fullyQualifiedNamespace = Environment.GetEnvironmentVariable("AZURE_EVENTHUB_FULLYQUALIFIEDNAMESPACE");
    var eventHubName = "<NAME OF THE EVENT HUB>";

    // Example of sending events
    var producer = new EventHubProducerClient(fullyQualifiedNamespace, eventHubName, credential);
    ```

### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-messaging-eventhubs</artifactId>
        <version>5.15.0</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.1.5</version>
    </dependency>
    ```

1. Run the following code, uncommenting the part of the code snippet for the authentication type you want to use. The code authenticates using `azure-identity` and gets the Azure Event Hubs namespace from the Service Connector environment variables.

    ```java
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-managed identity
    // DefaultAzureCredential credential = new DefaultAzureCredentialBuilder().build();

    // for user-assigned managed identity
    // DefaultAzureCredential credential = new DefaultAzureCredentialBuilder()
    //     .managedIdentityClientId(System.getenv("AZURE_EVENTHUB_CLIENTID"))
    //     .build();

    // for service principal
    // ClientSecretCredential credential = new ClientSecretCredentialBuilder()
    //   .clientId(System.getenv("AZURE_EVENTHUB_CLIENTID"))
    //   .clientSecret(System.getenv("AZURE_EVENTHUB_CLIENTSECRET"))
    //   .tenantId(System.getenv("AZURE_EVENTHUB_TENANTID"))
    //   .build();
    
    String namespace = System.getenv("AZURE_EVENTHUB_FULLYQUALIFIEDNAMESPACE");

    // Example of sending events
    EventProcessorClientBuilder eventProcessorClientBuilder = new EventProcessorClientBuilder()
        .consumerGroup(EventHubClientBuilder.DEFAULT_CONSUMER_GROUP_NAME)
        .credential(namespace, "<event-hub-name>", credential)
    EventProcessorClient eventProcessorClient = eventProcessorClientBuilder.buildEventProcessorClient();    
    ```

### [Spring Boot](#tab/springBoot)

To set up your Spring application, see [Spring Cloud Stream with Azure Event Hubs](https://learn.microsoft.com/azure/developer/java/spring-framework/configure-spring-cloud-stream-binder-java-app-azure-event-hub?toc=%2Fazure%2Fevent-hubs%2FTOC.json) and [Using Spring Integration for Azure Event Hubs](https://github.com/Azure-Samples/azure-spring-boot-samples/tree/spring-cloud-azure_4.4.1/eventhubs/spring-cloud-azure-starter-integration-eventhubs/eventhubs-integration).

Service Connector adds the configuration properties to Spring Apps. Service Connector provides two sets of configuration properties, depending on whether the Spring Cloud Azure version is below 4.0 or above 4.0. For more information about Spring Cloud Azure library changes, see the [Spring Cloud Azure Migration Guide](https://microsoft.github.io/spring-cloud-azure/current/reference/html/appendix.html#configuration-spring-cloud-azure-starter-integration-eventhubs).

### [Kafka Spring Boot](#tab/kafka-springBoot)

To set up your Spring application, see [Use Spring Kafka with Azure Event Hubs for Kafka API](https://learn.microsoft.com/azure/developer/java/spring-framework/configure-spring-cloud-stream-binder-java-app-kafka-azure-event-hub?tabs=passwordless). Service Connector adds the configuration properties to Spring Apps.

### [Python](#tab/python)

1. Install dependencies.

    ```bash
    pip install azure-eventhub
    pip install azure-identity
    ```

1. Run the following code, uncommenting the part of the code snippet for the authentication type you want to use. The code authenticates using `azure-identity` and gets the Azure Event Hubs namespace from the Service Connector environment variables.

    ```python
    import os
    from azure.eventhub import EventData
    from azure.eventhub.aio import EventHubProducerClient

    # Uncomment the following lines corresponding to the authentication type you want to use.
    # system-assigned managed identity
    # cred = ManagedIdentityCredential()
    
    # user-assigned managed identity
    # managed_identity_client_id = os.getenv('AZURE_EVENTHUB_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)
    
    # service principal
    # tenant_id = os.getenv('AZURE_EVENTHUB_TENANTID')
    # client_id = os.getenv('AZURE_EVENTHUB_CLIENTID')
    # client_secret = os.getenv('AZURE_EVENTHUB_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)

    namespace = os.getenv("AZURE_EVENTHUB_FULLYQUALIFIEDNAMESPACE")
    EVENT_HUB_NAME = "EVENT_HUB_NAME"

    # Example of sending events
    producer = EventHubProducerClient(
        fully_qualified_namespace=namespace,
        eventhub_name=EVENT_HUB_NAME,
        credential=cred,
    )
    ```

### [Go](#tab/go)

1. Install dependencies.

    ```bash
    go get github.com/Azure/azure-sdk-for-go/sdk/messaging/azeventhubs
    go get github.com/Azure/azure-sdk-for-go/sdk/azidentity
    ```

1. Run the following code, uncommenting the part of the code snippet for the authentication type you want to use. The code authenticates using `azidentity` and gets the Azure Event Hubs namespace from the Service Connector environment variables.


    ```go
    import (
        "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
        "github.com/Azure/azure-sdk-for-go/sdk/messaging/azeventhubs"
    )
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-assigned managed identity
    // cred, err := azidentity.NewDefaultAzureCredential(nil)

    // for user-assigned managed identity
    // clientid := os.Getenv("AZURE_EVENTHUB_CLIENTID")
    // azidentity.ManagedIdentityCredentialOptions.ID := clientid
    // options := &azidentity.ManagedIdentityCredentialOptions{ID: clientid}
    // cred, err := azidentity.NewManagedIdentityCredential(options)

    // for service principal
    // clientid := os.Getenv("AZURE_EVENTHUB_CLIENTID")
    // tenantid := os.Getenv("AZURE_EVENTHUB_TENANTID")
    // clientsecret := os.Getenv("AZURE_EVENTHUB_CLIENTSECRET")
    // cred, err := azidentity.NewClientSecretCredential(tenantid, clientid, clientsecret, &azidentity.ClientSecretCredentialOptions{})
        
    namespace := os.Getenv("AZURE_EVENTHUB_FULLYQUALIFIEDNAMESPACE")

    // Example of sending events
    producerClient, err := azeventhubs.NewProducerClient(namespace, "<eventhub-name>", defaultAzureCred, nil)
    if err != nil {
        panic(err)
    }
    ```

### [NodeJS](#tab/nodejs)

1. Install dependencies.

    ```bash
    npm install @azure/event-hubs
    npm install @azure/identity
    ```

1. Run the following code, uncommenting the part of the code snippet for the authentication type you want to use. The code authenticates using `@azure/identity` and gets the Azure Event Hubs namespace from the Service Connector environment variables.

    ```javascript
    const { EventHubProducerClient } = require("@azure/event-hubs");
    import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";

    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-assigned managed identity
    // const credential = new DefaultAzureCredential();

    // for user-assigned managed identity
    // const clientId = process.env.AZURE_EVENTHUB_CLIENTID;
    // const credential = new DefaultAzureCredential({
    //     managedIdentityClientId: clientId
    // });

    // for service principal
    // const tenantId = process.env.AZURE_EVENTHUB_TENANTID;
    // const clientId = process.env.AZURE_EVENTHUB_CLIENTID;
    // const clientSecret = process.env.AZURE_EVENTHUB_CLIENTSECRET;
    // const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

    const namespace = process.env.AZURE_EVENTHUB_FULLYQUALIFIEDNAMESPACE; 
    const eventHubName = "EVENT HUB NAME";

    // Example of sending events
    const producer = new EventHubProducerClient(fullyQualifiedNamespace, eventHubName, credential);
    ```

### [Other](#tab/none)
For other languages, you can use the environment variables Service Connector adds as configuration properties to connect to Event Hubs.

---


### Connection string

Use the following steps and code to connect to Event Hubs using a connection string.

> **Important:**
> The connection string authentication flow requires a high degree of trust in the application, and carries risks not present in other flows. You should use this flow only when more secure flows, such as managed identities, aren't viable.


### [.NET](#tab/dotnet)

1. Install dependency.
    ```bash
    dotnet add package Azure.Messaging.EventHubs
    ```

1. Run the following code, getting the connection string from the Service Connector environment variables.

    ```csharp
    using System; 
    using Azure.Messaging.EventHubs;
    
    string connectionString = Environment.GetEnvironmentVariable("AZURE_EVENTHUB_CONNECTIONSTRING");
    var eventHubName = "<NAME OF THE EVENT HUB>";
    var consumerGroup = EventHubConsumerClient.DefaultConsumerGroupName;
    
    var producer = new EventHubProducerClient(connectionString, eventHubName);
    var consumer = new EventHubConsumerClient(consumerGroup, connectionString, eventHubName);
    ```

### [Java](#tab/java)

1. Add the following dependency in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-messaging-eventhubs</artifactId>
        <version>5.15.0</version>
    </dependency>
    ```
    
1. Run the following code, getting the connection string from the Service Connector environment variables.

    ```java
    String connectionStr = System.getenv("AZURE_EVENTHUB_CONNECTIONSTRING");

    // Example of sending events
    EventHubProducerAsyncClient producer = new EventHubClientBuilder()
        .connectionString(
            connStr,
            "<event-hub-name>")
        .buildAsyncProducerClient();
    ```

### [Spring Boot](#tab/springBoot)

To set up your Spring application, see [Spring Cloud Stream with Azure Event Hubs](https://learn.microsoft.com/azure/developer/java/spring-framework/configure-spring-cloud-stream-binder-java-app-azure-event-hub?toc=%2Fazure%2Fevent-hubs%2FTOC.json) and [Using Spring Integration for Azure Event Hubs](https://github.com/Azure-Samples/azure-spring-boot-samples/tree/spring-cloud-azure_4.4.1/eventhubs/spring-cloud-azure-starter-integration-eventhubs/eventhubs-integration).

Service Connector adds the configuration properties to Spring Apps. Service Connector provides two sets of configuration properties, depending on whether the Spring Cloud Azure version is below 4.0 or above 4.0. For more information about Spring Cloud Azure library changes, see the [Spring Cloud Azure Migration Guide](https://microsoft.github.io/spring-cloud-azure/current/reference/html/appendix.html#configuration-spring-cloud-azure-starter-integration-eventhubs).

### [Kafka Spring Boot](#tab/kafka-springBoot)

To set up your Spring application, see [Use Spring Kafka with Azure Event Hubs for Kafka API](https://learn.microsoft.com/azure/developer/java/spring-framework/configure-spring-cloud-stream-binder-java-app-kafka-azure-event-hub?tabs=connection-string). Service Connector sets the preceding configuration properties to Spring Apps.

### [Python](#tab/python)

1. Install dependency.

    ```bash
    pip install azure-eventhub
    ```
    
1. Run the following code, getting the connection string from the Service Connector environment variables.

    ```python
    import os
    from azure.eventhub import EventData
    from azure.eventhub.aio import EventHubProducerClient

    CONN_STR = os.environ["AZURE_EVENTHUB_CONNECTIONSTRING"]
    EVENT_HUB_NAME = "EVENT_HUB_NAME"

    # Example of sending events
    producer = EventHubProducerClient.from_connection_string(
        conn_str=EVENT_HUB_CONNECTION_STR, eventhub_name=EVENT_HUB_NAME
    )
    ```

### [Go](#tab/go)

1. Install dependency.

    ```bash
    
    go get github.com/Azure/azure-sdk-for-go/sdk/messaging/azeventhubs
    ```
    
1. Run the following code, getting the connection string from the Service Connector environment variables.

    ```go
    import (
        "context"

        "github.com/Azure/azure-sdk-for-go/sdk/messaging/azeventhubs"
    )

    connectionString := os.Getenv("AZURE_EVENTHUB_CONNECTIONSTRING")
    
    // Example of sending events
    producerClient, err := azeventhubs.NewProducerClientFromConnectionString(connectionString, "EVENT HUB NAME", nil)
    ```

### [NodeJS](#tab/nodejs)

1. Install dependency.

    ```bash
    npm install @azure/event-hubs
    ```
    
1. Run the following code, getting the connection string from the Service Connector environment variables.

    ```javascript
    const { EventHubProducerClient } = require("@azure/event-hubs");

    const eventHubName = "EVENT HUB NAME";
    const connection_string = process.env.AZURE_EVENTHUB_CONNECTIONSTRING;
    
    // Example of sending events
    const producer = new EventHubProducerClient(connectionString, eventHubName);
    ```

### [Other](#tab/none)

For other languages, you can use the environment variables Service Connector adds as configuration properties to connect to Event Hubs.

---


## Related content

- [Service Connector concepts](concept-service-connector-internals.md)
- [Configuration naming convention](concept-service-connector-internals.md#configuration-naming-convention)
