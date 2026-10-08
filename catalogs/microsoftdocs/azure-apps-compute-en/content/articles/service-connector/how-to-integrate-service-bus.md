---
title: Integrate Azure Service Bus with Service Connector
description: Use these code samples to integrate Azure Service Bus into your application with Service Connector.
author: maud-lv
ms.author: malev
ms.service: service-connector
ms.topic: how-to
ms.date: 06/17/2026
#customer intent: As a cloud developer, I want to connect my compute services to Azure Service Bus using Service Connector.
---

# Integrate Service Bus with Service Connector

This article describes supported authentication methods and clients. It also provides sample code to connect compute services to Azure Service Bus by using Service Connector. You can still connect to Service Bus in other programming languages without using Service Connector. This article also lists default environment variable names and values (or Spring Boot configuration) that you receive when you create service connections.

## Supported compute services

Service Connector can be used to connect the following compute services to Azure Service Bus:

- Azure App Service
- Azure Functions
- Azure Kubernetes Service (AKS)
- Azure Spring Apps

## Supported authentication types and client types

This table shows which combinations of authentication methods and clients are supported for connecting your compute service to Azure Service Bus using Service Connector. A "Yes" indicates that the combination is supported, while a "No" indicates that it isn't supported.

| Client type | System-assigned managed identity | User-assigned managed identity | Secret/connection string | Service principal |
| --- | :---: | :---: | :---: | :---: |
| .NET | Yes | Yes | Yes | Yes |
| Go | Yes | Yes | Yes | Yes |
| Java | Yes | Yes | Yes | Yes |
| Java - Spring Boot | Yes | Yes | Yes | Yes |
| Node.js | Yes | Yes | Yes | Yes |
| Python | Yes | Yes | Yes | Yes |
| None | Yes | Yes | Yes | Yes |

This table shows that all listed combinations of client types and authentication methods are supported.

## Default environment variable names or application properties

Use the following connection details to connect compute services to Service Bus. For each example, replace the placeholder texts `<Service-Bus-namespace>`, `<access-key-name>`, `<access-key-value>` `<client-ID>`, `<client-secret>`, and `<tenant-id>` with your own Service Bus namespace, shared access key name, shared access key value, client ID, client secret, and tenant ID. For more information, see [Configuration naming convention](concept-service-connector-internals.md#configuration-naming-convention).

### System-assigned managed identity

#### Spring Boot client type

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| spring.cloud.azure.servicebus.namespace | Service Bus namespace | `<Service-Bus-namespace>.servicebus.windows.net` |

#### Other client types

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| AZURE_SERVICEBUS_FULLYQUALIFIEDNAMESPACE | Service Bus namespace | `<Service-Bus-namespace>.servicebus.windows.net` |

#### Sample code

To connect to Service Bus using a system-assigned managed identity:

### [.NET](#tab/dotnet)

1. Install dependencies.

    ```bash
    dotnet add package Azure.Messaging.ServiceBus
    dotnet add package Azure.Identity
    ```

1. Authenticate using `Azure.Identity` and get the Service Bus namespace from the environment variables added by Service Connector. When you use the following code, uncomment the part of the code snippet for the authentication type you want to use.
    
    ```csharp
    using Azure.Identity;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Configuration.AzureSERVICEBUS;
    
    string namespace = Environment.GetEnvironmentVariable("AZURE_SERVICEBUS_FULLYQUALIFIEDNAMESPACE");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // system-assigned managed identity
    // var credential = new DefaultAzureCredential();
    
    // user-assigned managed identity
    // var credential = new DefaultAzureCredential(
    //     new DefaultAzureCredentialOptions
    //     {
    //         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_SERVICEBUS_CLIENTID");
    //     });
    
    // service principal 
    // var tenantId = Environment.GetEnvironmentVariable("AZURE_SERVICEBUS_TENANTID");
    // var clientId = Environment.GetEnvironmentVariable("AZURE_SERVICEBUS_CLIENTID");
    // var clientSecret = Environment.GetEnvironmentVariable("AZURE_SERVICEBUS_CLIENTSECRET");
    // var credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    var client = new ServiceBusClient(namespace, credential);
    ```
    
### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-messaging-servicebus</artifactId>
        <version>7.13.3</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.8.0</version>
        <scope>compile</scope>
    </dependency>
    ```

1. Authenticate using `azure-identity` and get the Service Bus namespace from the environment variables added by Service Connector. When you use the following code, uncomment the part of the code snippet for the authentication type you want to use.

    ```java
    import com.azure.messaging.servicebus.*;
    import com.azure.identity.*;

    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-managed identity
    // DefaultAzureCredential defaultCredential = new DefaultAzureCredentialBuilder().build();

    // for user-assigned managed identity
    // DefaultAzureCredential defaultCredential = new DefaultAzureCredentialBuilder()
    //     .managedIdentityClientId(System.getenv("AZURE_SERVICEBUS_CLIENTID"))
    //     .build();

    // for service principal
    // ClientSecretCredential defaultCredential = new ClientSecretCredentialBuilder()
    //   .clientId(System.getenv("<AZURE_SERVICEBUS_CLIENTID>"))
    //   .clientSecret(System.getenv("<AZURE_SERVICEBUS_CLIENTSECRET>"))
    //   .tenantId(System.getenv("<AZURE_SERVICEBUS_TENANTID>"))
    //   .build();
    
    String namespace = System.getenv("AZURE_SERVICEBUS_FULLYQUALIFIEDNAMESPACE");

    // For example, create a Service Bus Sender client for a queue using a managed identity or a service principal.
    ServiceBusSenderClient senderClient = new ServiceBusClientBuilder()
            .fullyQualifiedNamespace(namespace)
            .credential(credential)
            .sender()
            .queueName("<queueName>")
            .buildClient();
    ```

### [Spring Boot](#tab/springBoot)

1. Add the following dependencies to your pom.xml file:

    ```xml
    <dependencyManagement>
      <dependencies>
        <dependency>
          <groupId>com.azure.spring</groupId>
          <artifactId>spring-cloud-azure-dependencies</artifactId>
          <version>5.20.0</version>
          <type>pom</type>
          <scope>import</scope>
        </dependency>
      </dependencies>
    </dependencyManagement>
    ```

1. Set up a Spring application. The Service Bus connection configuration properties are set to Spring Apps by Service Connector. For more information, see [Use Azure Service Bus in Spring applications](https://learn.microsoft.com/azure/developer/java/spring-framework/using-service-bus-in-spring-applications).

### [Python](#tab/python)

1. Install dependencies.

    ```bash
    pip install azure-servicebus
    pip install azure-identity
    ```

1. Authenticate using `azure-identity` and get the Service Bus namespace from the environment variables added by Service Connector. When you use the following code, uncomment the part of the code snippet for the authentication type you want to use.

    ```python
    import os
    from azure.servicebus.aio import ServiceBusClient
    from azure.servicebus import ServiceBusMessage
    from azure.identity import ManagedIdentityCredential, ClientSecretCredential
    
    # Uncomment the following lines corresponding to the authentication type you want to use.
    # system-assigned managed identity
    # cred = ManagedIdentityCredential()
    
    # user-assigned managed identity
    # managed_identity_client_id = os.getenv('AZURE_SERVICEBUS_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)
    
    # service principal
    # tenant_id = os.getenv('AZURE_SERVICEBUS_TENANTID')
    # client_id = os.getenv('AZURE_SERVICEBUS_CLIENTID')
    # client_secret = os.getenv('AZURE_SERVICEBUS_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)

    namespace = os.getenv('AZURE_SERVICEBUS_FULLYQUALIFIEDNAMESPACE')

    client = ServiceBusClient(fully_qualified_namespace=namespace, credential=cred)
    ```

### [Go](#tab/go)

1. Install dependencies.

    ```bash
    go get github.com/Azure/azure-sdk-for-go/sdk/azidentity
    go get github.com/Azure/azure-sdk-for-go/sdk/messaging/azservicebus
    ```

1. Authenticate using `azidentity` and get the Service Bus namespace from the environment variables added by Service Connector. When you use the following code, uncomment the part of the code snippet for the authentication type you want to use.

    ```go
    import (
    	"context"
    	"errors"
    	"fmt"
    	"os"
    
    	"github.com/Azure/azure-sdk-for-go/sdk/azcore/to"
    	"github.com/Azure/azure-sdk-for-go/sdk/azidentity"
    	"github.com/Azure/azure-sdk-for-go/sdk/messaging/azservicebus"
    )

    namespace, ok := os.LookupEnv("AZURE_SERVICEBUS_FULLYQUALIFIEDNAMESPACE")
	if !ok {
		panic("AZURE_SERVICEBUS_FULLYQUALIFIEDNAMESPACE environment variable not found")
	}

	// Uncomment the following lines corresponding to the authentication type you want to use.
    // For system-assigned identity.
    // cred, err := azidentity.NewDefaultAzureCredential(nil)
    
    // For user-assigned identity.
    // clientid := os.Getenv("AZURE_POSTGRESQL_CLIENTID")
    // azidentity.ManagedIdentityCredentialOptions.ID := clientid
    // options := &azidentity.ManagedIdentityCredentialOptions{ID: clientid}
    // cred, err := azidentity.NewManagedIdentityCredential(options)
    
    // For service principal.
    // clientid := os.Getenv("AZURE_POSTGRESQL_CLIENTID")
    // tenantid := os.Getenv("AZURE_POSTGRESQL_TENANTID")
    // clientsecret := os.Getenv("AZURE_POSTGRESQL_CLIENTSECRET")
    // cred, err := azidentity.NewClientSecretCredential(tenantid, clientid, clientsecret, &azidentity.ClientSecretCredentialOptions{})

	if err != nil {
		panic(err)
	}

	client, err := azservicebus.NewClient(namespace, cred, nil)
	if err != nil {
		panic(err)
	}
    ```

### [NodeJS](#tab/nodejs)

1. Install dependencies.

    ```bash
    npm install @azure/service-bus @azure/identity
    ```

1. Authenticate using `@azure/identity` and get the Service Bus namespace from the environment variables added by Service Connector. When you use the following code, uncomment the part of the code snippet for the authentication type you want to use.
    
    ```javascript
    import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
    const { ServiceBusClient } = require("@azure/service-bus");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-assigned managed identity
    // const credential = new DefaultAzureCredential();
    
    // for user-assigned managed identity
    // const clientId = process.env.AZURE_SERVICEBUS_CLIENTID;
    // const credential = new DefaultAzureCredential({
    //     managedIdentityClientId: clientId
    // });
    
    // for service principal
    // const tenantId = process.env.AZURE_SERVICEBUS_TENANTID;
    // const clientId = process.env.AZURE_SERVICEBUS_CLIENTID;
    // const clientSecret = process.env.AZURE_SERVICEBUS_CLIENTSECRET;
    // const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    const fullyQualifiedNamespace = process.env.AZURE_SERVICEBUS_FULLYQUALIFIEDNAMESPACE;
    const client = new ServiceBusClient(fullyQualifiedNamespace, credential);
    ```

### [Other](#tab/none)
For other languages, you can use the connection information that Service Connector sets to the environment variables to connect compute services to the Service Bus. For environment variable details, see [Integrate Service Bus with Service Connector](how-to-integrate-service-bus.md).

### User-assigned managed identity

#### Spring Boot client type

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| spring.cloud.azure.servicebus.namespace | Service Bus namespace | `<Service-Bus-namespace>.servicebus.windows.net` |
| spring.cloud.azure.client-id | Your client ID | `<client-ID>` |

#### Other client types

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| AZURE_SERVICEBUS_FULLYQUALIFIEDNAMESPACE | Service Bus namespace | `<Service-Bus-namespace>.servicebus.windows.net` |
| AZURE_SERVICEBUS_CLIENTID | Your client ID | `<client-ID>` |

#### Sample code

To connect to Service Bus using a user-assigned managed identity:

### [.NET](#tab/dotnet)

1. Install dependencies.

    ```bash
    dotnet add package Azure.Messaging.ServiceBus
    dotnet add package Azure.Identity
    ```

1. Authenticate using `Azure.Identity` and get the Service Bus namespace from the environment variables added by Service Connector. When you use the following code, uncomment the part of the code snippet for the authentication type you want to use.
    
    ```csharp
    using Azure.Identity;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Configuration.AzureSERVICEBUS;
    
    string namespace = Environment.GetEnvironmentVariable("AZURE_SERVICEBUS_FULLYQUALIFIEDNAMESPACE");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // system-assigned managed identity
    // var credential = new DefaultAzureCredential();
    
    // user-assigned managed identity
    // var credential = new DefaultAzureCredential(
    //     new DefaultAzureCredentialOptions
    //     {
    //         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_SERVICEBUS_CLIENTID");
    //     });
    
    // service principal 
    // var tenantId = Environment.GetEnvironmentVariable("AZURE_SERVICEBUS_TENANTID");
    // var clientId = Environment.GetEnvironmentVariable("AZURE_SERVICEBUS_CLIENTID");
    // var clientSecret = Environment.GetEnvironmentVariable("AZURE_SERVICEBUS_CLIENTSECRET");
    // var credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    var client = new ServiceBusClient(namespace, credential);
    ```
    
### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-messaging-servicebus</artifactId>
        <version>7.13.3</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.8.0</version>
        <scope>compile</scope>
    </dependency>
    ```

1. Authenticate using `azure-identity` and get the Service Bus namespace from the environment variables added by Service Connector. When you use the following code, uncomment the part of the code snippet for the authentication type you want to use.

    ```java
    import com.azure.messaging.servicebus.*;
    import com.azure.identity.*;

    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-managed identity
    // DefaultAzureCredential defaultCredential = new DefaultAzureCredentialBuilder().build();

    // for user-assigned managed identity
    // DefaultAzureCredential defaultCredential = new DefaultAzureCredentialBuilder()
    //     .managedIdentityClientId(System.getenv("AZURE_SERVICEBUS_CLIENTID"))
    //     .build();

    // for service principal
    // ClientSecretCredential defaultCredential = new ClientSecretCredentialBuilder()
    //   .clientId(System.getenv("<AZURE_SERVICEBUS_CLIENTID>"))
    //   .clientSecret(System.getenv("<AZURE_SERVICEBUS_CLIENTSECRET>"))
    //   .tenantId(System.getenv("<AZURE_SERVICEBUS_TENANTID>"))
    //   .build();
    
    String namespace = System.getenv("AZURE_SERVICEBUS_FULLYQUALIFIEDNAMESPACE");

    // For example, create a Service Bus Sender client for a queue using a managed identity or a service principal.
    ServiceBusSenderClient senderClient = new ServiceBusClientBuilder()
            .fullyQualifiedNamespace(namespace)
            .credential(credential)
            .sender()
            .queueName("<queueName>")
            .buildClient();
    ```

### [Spring Boot](#tab/springBoot)

1. Add the following dependencies to your pom.xml file:

    ```xml
    <dependencyManagement>
      <dependencies>
        <dependency>
          <groupId>com.azure.spring</groupId>
          <artifactId>spring-cloud-azure-dependencies</artifactId>
          <version>5.20.0</version>
          <type>pom</type>
          <scope>import</scope>
        </dependency>
      </dependencies>
    </dependencyManagement>
    ```

1. Set up a Spring application. The Service Bus connection configuration properties are set to Spring Apps by Service Connector. For more information, see [Use Azure Service Bus in Spring applications](https://learn.microsoft.com/azure/developer/java/spring-framework/using-service-bus-in-spring-applications).

### [Python](#tab/python)

1. Install dependencies.

    ```bash
    pip install azure-servicebus
    pip install azure-identity
    ```

1. Authenticate using `azure-identity` and get the Service Bus namespace from the environment variables added by Service Connector. When you use the following code, uncomment the part of the code snippet for the authentication type you want to use.

    ```python
    import os
    from azure.servicebus.aio import ServiceBusClient
    from azure.servicebus import ServiceBusMessage
    from azure.identity import ManagedIdentityCredential, ClientSecretCredential
    
    # Uncomment the following lines corresponding to the authentication type you want to use.
    # system-assigned managed identity
    # cred = ManagedIdentityCredential()
    
    # user-assigned managed identity
    # managed_identity_client_id = os.getenv('AZURE_SERVICEBUS_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)
    
    # service principal
    # tenant_id = os.getenv('AZURE_SERVICEBUS_TENANTID')
    # client_id = os.getenv('AZURE_SERVICEBUS_CLIENTID')
    # client_secret = os.getenv('AZURE_SERVICEBUS_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)

    namespace = os.getenv('AZURE_SERVICEBUS_FULLYQUALIFIEDNAMESPACE')

    client = ServiceBusClient(fully_qualified_namespace=namespace, credential=cred)
    ```

### [Go](#tab/go)

1. Install dependencies.

    ```bash
    go get github.com/Azure/azure-sdk-for-go/sdk/azidentity
    go get github.com/Azure/azure-sdk-for-go/sdk/messaging/azservicebus
    ```

1. Authenticate using `azidentity` and get the Service Bus namespace from the environment variables added by Service Connector. When you use the following code, uncomment the part of the code snippet for the authentication type you want to use.

    ```go
    import (
    	"context"
    	"errors"
    	"fmt"
    	"os"
    
    	"github.com/Azure/azure-sdk-for-go/sdk/azcore/to"
    	"github.com/Azure/azure-sdk-for-go/sdk/azidentity"
    	"github.com/Azure/azure-sdk-for-go/sdk/messaging/azservicebus"
    )

    namespace, ok := os.LookupEnv("AZURE_SERVICEBUS_FULLYQUALIFIEDNAMESPACE")
	if !ok {
		panic("AZURE_SERVICEBUS_FULLYQUALIFIEDNAMESPACE environment variable not found")
	}

	// Uncomment the following lines corresponding to the authentication type you want to use.
    // For system-assigned identity.
    // cred, err := azidentity.NewDefaultAzureCredential(nil)
    
    // For user-assigned identity.
    // clientid := os.Getenv("AZURE_POSTGRESQL_CLIENTID")
    // azidentity.ManagedIdentityCredentialOptions.ID := clientid
    // options := &azidentity.ManagedIdentityCredentialOptions{ID: clientid}
    // cred, err := azidentity.NewManagedIdentityCredential(options)
    
    // For service principal.
    // clientid := os.Getenv("AZURE_POSTGRESQL_CLIENTID")
    // tenantid := os.Getenv("AZURE_POSTGRESQL_TENANTID")
    // clientsecret := os.Getenv("AZURE_POSTGRESQL_CLIENTSECRET")
    // cred, err := azidentity.NewClientSecretCredential(tenantid, clientid, clientsecret, &azidentity.ClientSecretCredentialOptions{})

	if err != nil {
		panic(err)
	}

	client, err := azservicebus.NewClient(namespace, cred, nil)
	if err != nil {
		panic(err)
	}
    ```

### [NodeJS](#tab/nodejs)

1. Install dependencies.

    ```bash
    npm install @azure/service-bus @azure/identity
    ```

1. Authenticate using `@azure/identity` and get the Service Bus namespace from the environment variables added by Service Connector. When you use the following code, uncomment the part of the code snippet for the authentication type you want to use.
    
    ```javascript
    import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
    const { ServiceBusClient } = require("@azure/service-bus");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-assigned managed identity
    // const credential = new DefaultAzureCredential();
    
    // for user-assigned managed identity
    // const clientId = process.env.AZURE_SERVICEBUS_CLIENTID;
    // const credential = new DefaultAzureCredential({
    //     managedIdentityClientId: clientId
    // });
    
    // for service principal
    // const tenantId = process.env.AZURE_SERVICEBUS_TENANTID;
    // const clientId = process.env.AZURE_SERVICEBUS_CLIENTID;
    // const clientSecret = process.env.AZURE_SERVICEBUS_CLIENTSECRET;
    // const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    const fullyQualifiedNamespace = process.env.AZURE_SERVICEBUS_FULLYQUALIFIEDNAMESPACE;
    const client = new ServiceBusClient(fullyQualifiedNamespace, credential);
    ```

### [Other](#tab/none)
For other languages, you can use the connection information that Service Connector sets to the environment variables to connect compute services to the Service Bus. For environment variable details, see [Integrate Service Bus with Service Connector](how-to-integrate-service-bus.md).

### Connection string

> **Warning:**
> Microsoft recommends that you use the most secure authentication flow available. The authentication flow described in this procedure requires a very high degree of trust in the application. It carries risks that aren't present in other flows. You should only use this flow when other more secure flows, such as managed identities, aren't viable.

#### Spring Boot client type

> 
>
> | Default environment variable name | Description | Sample value |
> | --- | --- | --- |
> | spring.cloud.azure.servicebus.connection-string | Service Bus connection string | `Endpoint=sb://<Service-Bus-namespace>.servicebus.windows.net/;SharedAccessKeyName=<access-key-name>;SharedAccessKey=<access-key-value>` |

#### Other client types

> 
> | Default environment variable name | Description | Sample value |
> | --- | --- | --- |
> | AZURE_SERVICEBUS_CONNECTIONSTRING | Service Bus connection string | `Endpoint=sb://<Service-Bus-namespace>.servicebus.windows.net/;SharedAccessKeyName=<access-key-name>;SharedAccessKey=<access-key-value>` |

#### Sample code

To connect to Service Bus using a connection string:

### [.NET](#tab/dotnet)

1. Install dependencies.

    ```bash
    dotnet add package Azure.Messaging.ServiceBus
    ```

1. Get the Service Bus connection string from the environment variables added by Service Connector.
    
    ```csharp
    using Azure.Messaging.ServiceBus;
    
    var connectionString = Environment.GetEnvironmentVariable("AZURE_SERVICEBUS_CONNECTIONSTRING");
    var client = client = new ServiceBusClient(connectionString);
    ```
    
### [Java](#tab/java)

1. Add the following dependency in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-messaging-servicebus</artifactId>
        <version>7.13.3</version>
    </dependency>
    ```

1. Get the Service Bus connection string from the environment variables added by Service Connector.

    ```java
    import com.azure.messaging.servicebus.*;
    
    String connectionString = System.getenv("AZURE_SERVICEBUS_CONNECTIONSTRING");

    // For example, create a Service Bus Sender client for a queue using the connection string.
    ServiceBusSenderClient senderClient = new ServiceBusClientBuilder()
            .connectionString(connectionString)
            .sender()
            .queueName("<queueName>")
            .buildClient();
    ```

### [Spring Boot](#tab/springBoot)

1. Add the following dependencies to your pom.xml file:

    ```xml
    <dependencyManagement>
      <dependencies>
        <dependency>
          <groupId>com.azure.spring</groupId>
          <artifactId>spring-cloud-azure-dependencies</artifactId>
          <version>5.20.0</version>
          <type>pom</type>
          <scope>import</scope>
        </dependency>
      </dependencies>
    </dependencyManagement>
    ```

1. Set up a Spring application. The Service Bus connection string `spring.cloud.azure.servicebus.connection-string` is set to Spring Apps by Service Connector. For more information, see [Use Azure Service Bus in Spring applications](https://learn.microsoft.com/azure/developer/java/spring-framework/using-service-bus-in-spring-applications).

### [Python](#tab/python)

1. Install dependencies.

    ```bash
    pip install azure-servicebus
    ```

1. Get the Service Bus connection string from the environment variables added by Service Connector.

    ```python
    import os
    from azure.servicebus.aio import ServiceBusClient
    from azure.servicebus import ServiceBusMessage    

    connection_str = os.getenv('AZURE_SERVICEBUS_CONNECTIONSTRING')
    client = ServiceBusClient.from_connection_string(connection_str)
    ```

### [Go](#tab/go)

1. Install dependencies.

    ```bash
    go get github.com/Azure/azure-sdk-for-go/sdk/messaging/azservicebus
    ```

1. Get the Service Bus connection string from the environment variables added by Service Connector.
    
    ```go
    import (
    	"context"
    	"errors"
    	"fmt"
    	"os"
    
    	"github.com/Azure/azure-sdk-for-go/sdk/azcore/to"
    	"github.com/Azure/azure-sdk-for-go/sdk/messaging/azservicebus"
    )

    connectionString, ok := os.LookupEnv("AZURE_SERVICEBUS_CONNECTIONSTRING")
	if !ok {
		panic("AZURE_SERVICEBUS_CONNECTIONSTRING environment variable not found")
	}

	client, err := azservicebus.NewClientFromConnectionString(connectionString, nil)
	if err != nil {
		panic(err)
	}
    ```

### [NodeJS](#tab/nodejs)

1. Install dependencies.

    ```bash
    npm install @azure/service-bus
    ```

1. Get the Service Bus connection string from the environment variables added by Service Connector.
    
    ```javascript
    const { ServiceBusClient } = require("@azure/service-bus");

    const connectionString = process.env.AZURE_SERVICEBUS_CONNECTIONSTRING;
    
    const client = new ServiceBusClient(connectionString);
    ```

### [Other](#tab/none)
For other languages, you can use the connection information that Service Connector sets to the environment variables to connect compute services to the Service Bus. For environment variable details, see [Integrate Service Bus with Service Connector](how-to-integrate-service-bus.md).


### Service principal

#### Spring Boot client type

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| spring.cloud.azure.servicebus.namespace | Service Bus namespace | `<Service-Bus-namespace>.servicebus.windows.net` |
| spring.cloud.azure.client-id | Your client ID | `<client-ID>` |
| spring.cloud.azure.tenant-id | Your client secret | `<client-secret>` |
| spring.cloud.azure.client-secret | Your tenant ID | `<tenant-id>` |

#### Other client types

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| AZURE_SERVICEBUS_FULLYQUALIFIEDNAMESPACE | Service Bus namespace | `<Service-Bus-namespace>.servicebus.windows.net` |
| AZURE_SERVICEBUS_CLIENTID | Your client ID | `<client-ID>` |
| AZURE_SERVICEBUS_CLIENTSECRET | Your client secret | `<client-secret>` |
| AZURE_SERVICEBUS_TENANTID | Your tenant ID | `<tenant-id>` |

#### Sample code

To connect to Service Bus using a service principal:

### [.NET](#tab/dotnet)

1. Install dependencies.

    ```bash
    dotnet add package Azure.Messaging.ServiceBus
    dotnet add package Azure.Identity
    ```

1. Authenticate using `Azure.Identity` and get the Service Bus namespace from the environment variables added by Service Connector. When you use the following code, uncomment the part of the code snippet for the authentication type you want to use.
    
    ```csharp
    using Azure.Identity;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Configuration.AzureSERVICEBUS;
    
    string namespace = Environment.GetEnvironmentVariable("AZURE_SERVICEBUS_FULLYQUALIFIEDNAMESPACE");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // system-assigned managed identity
    // var credential = new DefaultAzureCredential();
    
    // user-assigned managed identity
    // var credential = new DefaultAzureCredential(
    //     new DefaultAzureCredentialOptions
    //     {
    //         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_SERVICEBUS_CLIENTID");
    //     });
    
    // service principal 
    // var tenantId = Environment.GetEnvironmentVariable("AZURE_SERVICEBUS_TENANTID");
    // var clientId = Environment.GetEnvironmentVariable("AZURE_SERVICEBUS_CLIENTID");
    // var clientSecret = Environment.GetEnvironmentVariable("AZURE_SERVICEBUS_CLIENTSECRET");
    // var credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    var client = new ServiceBusClient(namespace, credential);
    ```
    
### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-messaging-servicebus</artifactId>
        <version>7.13.3</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.8.0</version>
        <scope>compile</scope>
    </dependency>
    ```

1. Authenticate using `azure-identity` and get the Service Bus namespace from the environment variables added by Service Connector. When you use the following code, uncomment the part of the code snippet for the authentication type you want to use.

    ```java
    import com.azure.messaging.servicebus.*;
    import com.azure.identity.*;

    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-managed identity
    // DefaultAzureCredential defaultCredential = new DefaultAzureCredentialBuilder().build();

    // for user-assigned managed identity
    // DefaultAzureCredential defaultCredential = new DefaultAzureCredentialBuilder()
    //     .managedIdentityClientId(System.getenv("AZURE_SERVICEBUS_CLIENTID"))
    //     .build();

    // for service principal
    // ClientSecretCredential defaultCredential = new ClientSecretCredentialBuilder()
    //   .clientId(System.getenv("<AZURE_SERVICEBUS_CLIENTID>"))
    //   .clientSecret(System.getenv("<AZURE_SERVICEBUS_CLIENTSECRET>"))
    //   .tenantId(System.getenv("<AZURE_SERVICEBUS_TENANTID>"))
    //   .build();
    
    String namespace = System.getenv("AZURE_SERVICEBUS_FULLYQUALIFIEDNAMESPACE");

    // For example, create a Service Bus Sender client for a queue using a managed identity or a service principal.
    ServiceBusSenderClient senderClient = new ServiceBusClientBuilder()
            .fullyQualifiedNamespace(namespace)
            .credential(credential)
            .sender()
            .queueName("<queueName>")
            .buildClient();
    ```

### [Spring Boot](#tab/springBoot)

1. Add the following dependencies to your pom.xml file:

    ```xml
    <dependencyManagement>
      <dependencies>
        <dependency>
          <groupId>com.azure.spring</groupId>
          <artifactId>spring-cloud-azure-dependencies</artifactId>
          <version>5.20.0</version>
          <type>pom</type>
          <scope>import</scope>
        </dependency>
      </dependencies>
    </dependencyManagement>
    ```

1. Set up a Spring application. The Service Bus connection configuration properties are set to Spring Apps by Service Connector. For more information, see [Use Azure Service Bus in Spring applications](https://learn.microsoft.com/azure/developer/java/spring-framework/using-service-bus-in-spring-applications).

### [Python](#tab/python)

1. Install dependencies.

    ```bash
    pip install azure-servicebus
    pip install azure-identity
    ```

1. Authenticate using `azure-identity` and get the Service Bus namespace from the environment variables added by Service Connector. When you use the following code, uncomment the part of the code snippet for the authentication type you want to use.

    ```python
    import os
    from azure.servicebus.aio import ServiceBusClient
    from azure.servicebus import ServiceBusMessage
    from azure.identity import ManagedIdentityCredential, ClientSecretCredential
    
    # Uncomment the following lines corresponding to the authentication type you want to use.
    # system-assigned managed identity
    # cred = ManagedIdentityCredential()
    
    # user-assigned managed identity
    # managed_identity_client_id = os.getenv('AZURE_SERVICEBUS_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)
    
    # service principal
    # tenant_id = os.getenv('AZURE_SERVICEBUS_TENANTID')
    # client_id = os.getenv('AZURE_SERVICEBUS_CLIENTID')
    # client_secret = os.getenv('AZURE_SERVICEBUS_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)

    namespace = os.getenv('AZURE_SERVICEBUS_FULLYQUALIFIEDNAMESPACE')

    client = ServiceBusClient(fully_qualified_namespace=namespace, credential=cred)
    ```

### [Go](#tab/go)

1. Install dependencies.

    ```bash
    go get github.com/Azure/azure-sdk-for-go/sdk/azidentity
    go get github.com/Azure/azure-sdk-for-go/sdk/messaging/azservicebus
    ```

1. Authenticate using `azidentity` and get the Service Bus namespace from the environment variables added by Service Connector. When you use the following code, uncomment the part of the code snippet for the authentication type you want to use.

    ```go
    import (
    	"context"
    	"errors"
    	"fmt"
    	"os"
    
    	"github.com/Azure/azure-sdk-for-go/sdk/azcore/to"
    	"github.com/Azure/azure-sdk-for-go/sdk/azidentity"
    	"github.com/Azure/azure-sdk-for-go/sdk/messaging/azservicebus"
    )

    namespace, ok := os.LookupEnv("AZURE_SERVICEBUS_FULLYQUALIFIEDNAMESPACE")
	if !ok {
		panic("AZURE_SERVICEBUS_FULLYQUALIFIEDNAMESPACE environment variable not found")
	}

	// Uncomment the following lines corresponding to the authentication type you want to use.
    // For system-assigned identity.
    // cred, err := azidentity.NewDefaultAzureCredential(nil)
    
    // For user-assigned identity.
    // clientid := os.Getenv("AZURE_POSTGRESQL_CLIENTID")
    // azidentity.ManagedIdentityCredentialOptions.ID := clientid
    // options := &azidentity.ManagedIdentityCredentialOptions{ID: clientid}
    // cred, err := azidentity.NewManagedIdentityCredential(options)
    
    // For service principal.
    // clientid := os.Getenv("AZURE_POSTGRESQL_CLIENTID")
    // tenantid := os.Getenv("AZURE_POSTGRESQL_TENANTID")
    // clientsecret := os.Getenv("AZURE_POSTGRESQL_CLIENTSECRET")
    // cred, err := azidentity.NewClientSecretCredential(tenantid, clientid, clientsecret, &azidentity.ClientSecretCredentialOptions{})

	if err != nil {
		panic(err)
	}

	client, err := azservicebus.NewClient(namespace, cred, nil)
	if err != nil {
		panic(err)
	}
    ```

### [NodeJS](#tab/nodejs)

1. Install dependencies.

    ```bash
    npm install @azure/service-bus @azure/identity
    ```

1. Authenticate using `@azure/identity` and get the Service Bus namespace from the environment variables added by Service Connector. When you use the following code, uncomment the part of the code snippet for the authentication type you want to use.
    
    ```javascript
    import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
    const { ServiceBusClient } = require("@azure/service-bus");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-assigned managed identity
    // const credential = new DefaultAzureCredential();
    
    // for user-assigned managed identity
    // const clientId = process.env.AZURE_SERVICEBUS_CLIENTID;
    // const credential = new DefaultAzureCredential({
    //     managedIdentityClientId: clientId
    // });
    
    // for service principal
    // const tenantId = process.env.AZURE_SERVICEBUS_TENANTID;
    // const clientId = process.env.AZURE_SERVICEBUS_CLIENTID;
    // const clientSecret = process.env.AZURE_SERVICEBUS_CLIENTSECRET;
    // const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    const fullyQualifiedNamespace = process.env.AZURE_SERVICEBUS_FULLYQUALIFIEDNAMESPACE;
    const client = new ServiceBusClient(fullyQualifiedNamespace, credential);
    ```

### [Other](#tab/none)
For other languages, you can use the connection information that Service Connector sets to the environment variables to connect compute services to the Service Bus. For environment variable details, see [Integrate Service Bus with Service Connector](how-to-integrate-service-bus.md).

## Next step

> 
> [Learn about Service Connector concepts](concept-service-connector-internals.md)
