---
title: Connect Azure AI Multi-Service Resource with Azure Services
titleSuffix: Service Connector
description: Learn how to integrate an Azure AI multi-service resource into your application with Service Connector by using supported authentication methods and clients.
ms.reviewer: wchi
ms.service: service-connector
ms.topic: how-to
ms.date: 06/17/2026
ms.update-cycle: 180-days
ms.collection: ce-skilling-ai-copilot
#customer intent: As a cloud developer, I want to connect my compute services to an Azure AI multi-service resource using Service Connector.
---

# Connect to an Azure AI multi-service resource with Service Connector

In this article, we cover the supported authentication methods and clients that you can use to connect compute services to Azure AI multi-service resource using Service Connector. For each supported method, we provide sample code and list the default environment variable names and values obtained when creating the service connection.

## Supported compute services

Service Connector can be used to connect the following compute services to an Azure AI multi-service resource:

- Azure App Service
- Azure Functions
- Azure Kubernetes Service (AKS)
- Azure Spring Apps

## Supported authentication types and client types

This table indicates the authentication methods and clients supported for connecting your compute service to an Azure AI multi-service resource using Service Connector. A *Yes* indicates that the combination is supported, while a *No* indicates that it isn't supported.


| Client type | System-assigned managed identity | User-assigned managed identity | Secret/connection string | Service principal |
| --- | :---: | :---: | :---: | :---: |
| .NET | Yes | Yes | Yes | Yes |
| Java | Yes | Yes | Yes | Yes |
| Node.js | Yes | Yes | Yes | Yes |
| Python | Yes | Yes | Yes | Yes |
| None | Yes | Yes | Yes | Yes |

This table indicates that all combinations of client types and authentication methods in the table are supported. All client types can use any of the authentication methods to connect to an Azure AI multi-service resource using Service Connector.

## Default environment variable names or application properties and sample code

Use the following connection details to connect compute services to an Azure AI multi-service resource. For more information, see [Configuration naming convention](concept-service-connector-internals.md#configuration-naming-convention).

### System-assigned managed identity (recommended)

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| AZURE_COGNITIVESERVICES_ENDPOINT | Azure Cognitive Services token provider service | `https://<cognitive-service-name>.cognitiveservices.azure.com/` |

#### Sample code

To connect to an Azure AI multi-service resource using a system-assigned managed identity, refer to the following steps and code.


You can use the Azure client library to access various cognitive APIs that an Azure AI multi-service resource supports. This sample uses Azure AI Text Analytics as an example. To call the cognitive APIs directly, see [Authenticate with Microsoft Entra ID](https://learn.microsoft.com/azure/ai-services/authentication#authenticate-with-azure-active-directory).

### [.NET](#tab/dotnet)

1. Install the following dependencies. This example uses `Azure.AI.TextAnalytics`.

    ```bash
    dotnet add package Azure.AI.TextAnalytics
    dotnet add package Azure.Identity
    ```

1. Authenticate using the Azure Identity library and get the Azure AI multi-service resource endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.
    
    ```csharp
    using Azure.AI.TextAnalytics;
    using Azure.Identity;
    
    string endpoint = Environment.GetEnvironmentVariable("AZURE_COGNITIVESERVICES_ENDPOINT");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // system-assigned managed identity
    // var credential = new DefaultAzureCredential();
    
    // user-assigned managed identity
    // var credential = new DefaultAzureCredential(
    //     new DefaultAzureCredentialOptions
    //     {
    //         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_COGNITIVESERVICES_CLIENTID");
    //     });
    
    // service principal 
    // var tenantId = Environment.GetEnvironmentVariable("AZURE_COGNITIVESERVICES_TENANTID");
    // var clientId = Environment.GetEnvironmentVariable("AZURE_COGNITIVESERVICES_CLIENTID");
    // var clientSecret = Environment.GetEnvironmentVariable("AZURE_COGNITIVESERVICES_CLIENTSECRET");
    // var credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    TextAnalyticsClient languageServiceClient = new(
      new Uri(endpoint),
      credential);
    ```
    
### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file. This example uses`azure-ai-textanalytics`.

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-ai-textanalytics</artifactId>
        <version>5.1.12</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.11.4</version>
    </dependency>
    ```

1. Authenticate using `azure-identity` and get the Azure AI multi-service resource endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.

    ```java
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-managed identity
    // DefaultAzureCredential credential = new DefaultAzureCredentialBuilder().build();

    // for user-assigned managed identity
    // DefaultAzureCredential credential = new DefaultAzureCredentialBuilder()
    //     .managedIdentityClientId(System.getenv("AZURE_COGNITIVESERVICES_CLIENTID"))
    //     .build();

    // for service principal
    // ClientSecretCredential credential = new ClientSecretCredentialBuilder()
    //   .clientId(System.getenv("AZURE_COGNITIVESERVICES_CLIENTID"))
    //   .clientSecret(System.getenv("AZURE_COGNITIVESERVICES_CLIENTSECRET"))
    //   .tenantId(System.getenv("AZURE_COGNITIVESERVICES_TENANTID"))
    //   .build();
    
    String endpoint = System.getenv("AZURE_COGNITIVESERVICES_ENDPOINT");
    
    TextAnalyticsClient languageClient = new TextAnalyticsClientBuilder()
        .credential(credential)
        .endpoint(endpoint)
        .buildClient();
    ```

### [Python](#tab/python)

1. Install the following dependencies. This example uses `azure-ai-textanalytics`.

    ```bash
    pip install azure-ai-textanalytics==5.1.0
    pip install azure-identity
    ```

1. Authenticate using `azure-identity` and get the Azure AI multi-service resource endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.

    ```python
    import os
    from azure.ai.textanalytics import TextAnalyticsClient
    from azure.identity import ManagedIdentityCredential, ClientSecretCredential
    
    # Uncomment the following lines corresponding to the authentication type you want to use.
    # system-assigned managed identity
    # cred = ManagedIdentityCredential()
    
    # user-assigned managed identity
    # managed_identity_client_id = os.getenv('AZURE_COGNITIVESERVICES_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)
    
    # service principal
    # tenant_id = os.getenv('AZURE_COGNITIVESERVICES_TENANTID')
    # client_id = os.getenv('AZURE_COGNITIVESERVICES_CLIENTID')
    # client_secret = os.getenv('AZURE_COGNITIVESERVICES_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)
    endpoint = os.getenv('AZURE_COGNITIVESERVICES_ENDPOINT')

    language_service_client = TextAnalyticsClient(
      endpoint=endpoint, 
      credential=cred)
    ```

### [Node.js](#tab/nodejs)

1. Install the following dependencies. This example uses`ai-text-analytics`.

    ```bash
    npm install @azure/ai-text-analytics@5.1.0
    npm install @azure/identity
    ```

1. Authenticate using `@azure/identity` and get the Azure AI multi-service resource endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.
    
    ```javascript
    import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
    const { TextAnalyticsClient } = require("@azure/ai-text-analytics");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-assigned managed identity
    // const credential = new DefaultAzureCredential();
    
    // for user-assigned managed identity
    // const clientId = process.env.AZURE_COGNITIVESERVICES_CLIENTID;
    // const credential = new DefaultAzureCredential({
    //     managedIdentityClientId: clientId
    // });
    
    // for service principal
    // const tenantId = process.env.AZURE_COGNITIVESERVICES_TENANTID;
    // const clientId = process.env.AZURE_COGNITIVESERVICES_CLIENTID;
    // const clientSecret = process.env.AZURE_COGNITIVESERVICES_CLIENTSECRET;
    // const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    const endpoint = process.env.AZURE_COGNITIVESERVICES_ENDPOINT;
    const languageClient = new TextAnalyticsClient(endpoint, credential);
    ```

### [Other](#tab/none)
For other languages, you can use the connection information that Service Connector sets to the environment variables to connect to an Azure AI multi-service resource. For environment variable details, see [Integrate an Azure AI multi-service resource with Service Connector](how-to-integrate-cognitive-services.md).

### User-assigned managed identity

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| AZURE_COGNITIVESERVICES_ENDPOINT | Azure Cognitive Services token provider service | `https://<cognitive-service-name>.cognitiveservices.azure.com/` |
| AZURE_COGNITIVESERVICES_CLIENTID | Your client ID | `<client-ID>` |

#### Sample code

To connect to an Azure AI multi-service resource using a user-assigned managed identity, refer to the following steps and code.

You can use the Azure client library to access various cognitive APIs that an Azure AI multi-service resource supports. This sample uses Azure AI Text Analytics as an example. To call the cognitive APIs directly, see [Authenticate with Microsoft Entra ID](https://learn.microsoft.com/azure/ai-services/authentication#authenticate-with-azure-active-directory).

### [.NET](#tab/dotnet)

1. Install the following dependencies. This example uses `Azure.AI.TextAnalytics`.

    ```bash
    dotnet add package Azure.AI.TextAnalytics
    dotnet add package Azure.Identity
    ```

1. Authenticate using the Azure Identity library and get the Azure AI multi-service resource endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.
    
    ```csharp
    using Azure.AI.TextAnalytics;
    using Azure.Identity;
    
    string endpoint = Environment.GetEnvironmentVariable("AZURE_COGNITIVESERVICES_ENDPOINT");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // system-assigned managed identity
    // var credential = new DefaultAzureCredential();
    
    // user-assigned managed identity
    // var credential = new DefaultAzureCredential(
    //     new DefaultAzureCredentialOptions
    //     {
    //         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_COGNITIVESERVICES_CLIENTID");
    //     });
    
    // service principal 
    // var tenantId = Environment.GetEnvironmentVariable("AZURE_COGNITIVESERVICES_TENANTID");
    // var clientId = Environment.GetEnvironmentVariable("AZURE_COGNITIVESERVICES_CLIENTID");
    // var clientSecret = Environment.GetEnvironmentVariable("AZURE_COGNITIVESERVICES_CLIENTSECRET");
    // var credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    TextAnalyticsClient languageServiceClient = new(
      new Uri(endpoint),
      credential);
    ```
    
### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file. This example uses`azure-ai-textanalytics`.

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-ai-textanalytics</artifactId>
        <version>5.1.12</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.11.4</version>
    </dependency>
    ```

1. Authenticate using `azure-identity` and get the Azure AI multi-service resource endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.

    ```java
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-managed identity
    // DefaultAzureCredential credential = new DefaultAzureCredentialBuilder().build();

    // for user-assigned managed identity
    // DefaultAzureCredential credential = new DefaultAzureCredentialBuilder()
    //     .managedIdentityClientId(System.getenv("AZURE_COGNITIVESERVICES_CLIENTID"))
    //     .build();

    // for service principal
    // ClientSecretCredential credential = new ClientSecretCredentialBuilder()
    //   .clientId(System.getenv("AZURE_COGNITIVESERVICES_CLIENTID"))
    //   .clientSecret(System.getenv("AZURE_COGNITIVESERVICES_CLIENTSECRET"))
    //   .tenantId(System.getenv("AZURE_COGNITIVESERVICES_TENANTID"))
    //   .build();
    
    String endpoint = System.getenv("AZURE_COGNITIVESERVICES_ENDPOINT");
    
    TextAnalyticsClient languageClient = new TextAnalyticsClientBuilder()
        .credential(credential)
        .endpoint(endpoint)
        .buildClient();
    ```

### [Python](#tab/python)

1. Install the following dependencies. This example uses `azure-ai-textanalytics`.

    ```bash
    pip install azure-ai-textanalytics==5.1.0
    pip install azure-identity
    ```

1. Authenticate using `azure-identity` and get the Azure AI multi-service resource endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.

    ```python
    import os
    from azure.ai.textanalytics import TextAnalyticsClient
    from azure.identity import ManagedIdentityCredential, ClientSecretCredential
    
    # Uncomment the following lines corresponding to the authentication type you want to use.
    # system-assigned managed identity
    # cred = ManagedIdentityCredential()
    
    # user-assigned managed identity
    # managed_identity_client_id = os.getenv('AZURE_COGNITIVESERVICES_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)
    
    # service principal
    # tenant_id = os.getenv('AZURE_COGNITIVESERVICES_TENANTID')
    # client_id = os.getenv('AZURE_COGNITIVESERVICES_CLIENTID')
    # client_secret = os.getenv('AZURE_COGNITIVESERVICES_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)
    endpoint = os.getenv('AZURE_COGNITIVESERVICES_ENDPOINT')

    language_service_client = TextAnalyticsClient(
      endpoint=endpoint, 
      credential=cred)
    ```

### [Node.js](#tab/nodejs)

1. Install the following dependencies. This example uses`ai-text-analytics`.

    ```bash
    npm install @azure/ai-text-analytics@5.1.0
    npm install @azure/identity
    ```

1. Authenticate using `@azure/identity` and get the Azure AI multi-service resource endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.
    
    ```javascript
    import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
    const { TextAnalyticsClient } = require("@azure/ai-text-analytics");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-assigned managed identity
    // const credential = new DefaultAzureCredential();
    
    // for user-assigned managed identity
    // const clientId = process.env.AZURE_COGNITIVESERVICES_CLIENTID;
    // const credential = new DefaultAzureCredential({
    //     managedIdentityClientId: clientId
    // });
    
    // for service principal
    // const tenantId = process.env.AZURE_COGNITIVESERVICES_TENANTID;
    // const clientId = process.env.AZURE_COGNITIVESERVICES_CLIENTID;
    // const clientSecret = process.env.AZURE_COGNITIVESERVICES_CLIENTSECRET;
    // const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    const endpoint = process.env.AZURE_COGNITIVESERVICES_ENDPOINT;
    const languageClient = new TextAnalyticsClient(endpoint, credential);
    ```

### [Other](#tab/none)
For other languages, you can use the connection information that Service Connector sets to the environment variables to connect to an Azure AI multi-service resource. For environment variable details, see [Integrate an Azure AI multi-service resource with Service Connector](how-to-integrate-cognitive-services.md).

### Connection string

> 
> | Default environment variable name | Description | Sample value |
> | --- | --- | --- |
> | AZURE_COGNITIVESERVICES_ENDPOINT | Azure Cognitive Services token provider service | `https://<cognitive-service-name>.cognitiveservices.azure.com/` |
> | AZURE_COGNITIVESERVICES_KEY | API key of an Azure AI multi-service resource | `<api-key>` |

#### Sample code

To connect to an Azure AI multi-service resource using a connection string, refer to the following steps and code.


You can use the Azure client library to access various cognitive APIs that an Azure AI multi-service resource supports. This sample uses Azure AI Text Analytics as an example. To call the cognitive APIs directly, see [Authenticate requests to Foundry Tools](https://learn.microsoft.com/azure/ai-services/authentication#authenticate-with-a-foundry-resource-key).

### [.NET](#tab/dotnet)

1. Install the following dependencies. This example uses `Azure.AI.TextAnalytics`.

    ```bash
    dotnet add package Azure.AI.TextAnalytics
    dotnet add package Azure.Core --version 1.40.0
    ```

1. Get the Azure AI multi-service resource endpoint and key from the environment variables added by Service Connector.
    
    ```csharp
    using Azure.AI.TextAnalytics;
    
    string endpoint = Environment.GetEnvironmentVariable("AZURE_COGNITIVESERVICES_ENDPOINT");
    string key = Environment.GetEnvironmentVariable("AZURE_COGNITIVESERVICES_KEY");

    TextAnalyticsClient languageServiceClient = new(
      new Uri(endpoint),
      new AzureKeyCredential(key));
    ```
    
### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file. This example uses `azure-ai-textanalytics`.

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-core</artifactId>
        <version>1.49.1</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-ai-textanalytics</artifactId>
        <version>5.1.12</version>
    </dependency>
    ```

1. Get the Azure AI multi-service resource endpoint and key from the environment variables added by Service Connector.

    ```java
    String endpoint = System.getenv("AZURE_COGNITIVESERVICES_ENDPOINT");
    String key = System.getenv("AZURE_COGNITIVESERVICES_KEY");
    TextAnalyticsClient languageClient = new TextAnalyticsClientBuilder()
        .credential(new AzureKeyCredential(key))
        .endpoint(endpoint)
        .buildClient();
    ```

### [Python](#tab/python)

1. Install the following dependencies. This example uses `azure-ai-textanalytics`.

    ```bash
    pip install azure-ai-textanalytics==5.1.0
    pip install azure-core
    ```

1. Get the Azure AI multi-service resource endpoint and key from the environment variables added by Service Connector.

    ```python
    import os
    from azure.ai.textanalytics import TextAnalyticsClient
    from azure.core.credentials import AzureKeyCredential
    
    key = os.environ['AZURE_COGNITIVESERVICES_KEY']
    endpoint = os.environ['AZURE_COGNITIVESERVICES_ENDPOINT']
        language_service_client = TextAnalyticsClient(
            endpoint=endpoint,
            credential=AzureKeyCredential(key))
    ```

### [Node.js](#tab/nodejs)

1. Install the following dependency. This example uses `ai-text-analytics`.

    ```bash
    npm install @azure/ai-text-analytics@5.1.0
    ```

1. Get the Azure AI multi-service resource endpoint and key from the environment variables added by Service Connector.
    
    ```javascript
    const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

    const endpoint = process.env.AZURE_COGNITIVESERVICES_ENDPOINT;
    const credential = new AzureKeyCredential(process.env.AZURE_COGNITIVESERVICES_KEY);

    const languageClient = new TextAnalyticsClient(endpoint, credential);
    ```

### [Other](#tab/none)
For other languages, you can use the connection information that Service Connector sets to the environment variables to connect to an Azure AI multi-service resource. For environment variable details, see [Integrate an Azure AI multi-service resource with Service Connector](how-to-integrate-cognitive-services.md).


### Service principal

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| AZURE_COGNITIVESERVICES_ENDPOINT | Azure Cognitive Services token provider service | `https://<cognitive-service-name>.cognitiveservices.azure.com/` |
| AZURE_COGNITIVESERVICES_CLIENTID | Your client ID | `<client-ID>` |
| AZURE_COGNITIVESERVICES_CLIENTSECRET | Your client secret | `<client-secret>` |
| AZURE_COGNITIVESERVICES_TENANTID | Your tenant ID | `<tenant-ID>` |

#### Sample code

To connect to an Azure AI multi-service resource using a service principal, refer to the following steps and code.


You can use the Azure client library to access various cognitive APIs that an Azure AI multi-service resource supports. This sample uses Azure AI Text Analytics as an example. To call the cognitive APIs directly, see [Authenticate with Microsoft Entra ID](https://learn.microsoft.com/azure/ai-services/authentication#authenticate-with-azure-active-directory).

### [.NET](#tab/dotnet)

1. Install the following dependencies. This example uses `Azure.AI.TextAnalytics`.

    ```bash
    dotnet add package Azure.AI.TextAnalytics
    dotnet add package Azure.Identity
    ```

1. Authenticate using the Azure Identity library and get the Azure AI multi-service resource endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.
    
    ```csharp
    using Azure.AI.TextAnalytics;
    using Azure.Identity;
    
    string endpoint = Environment.GetEnvironmentVariable("AZURE_COGNITIVESERVICES_ENDPOINT");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // system-assigned managed identity
    // var credential = new DefaultAzureCredential();
    
    // user-assigned managed identity
    // var credential = new DefaultAzureCredential(
    //     new DefaultAzureCredentialOptions
    //     {
    //         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_COGNITIVESERVICES_CLIENTID");
    //     });
    
    // service principal 
    // var tenantId = Environment.GetEnvironmentVariable("AZURE_COGNITIVESERVICES_TENANTID");
    // var clientId = Environment.GetEnvironmentVariable("AZURE_COGNITIVESERVICES_CLIENTID");
    // var clientSecret = Environment.GetEnvironmentVariable("AZURE_COGNITIVESERVICES_CLIENTSECRET");
    // var credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    TextAnalyticsClient languageServiceClient = new(
      new Uri(endpoint),
      credential);
    ```
    
### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file. This example uses`azure-ai-textanalytics`.

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-ai-textanalytics</artifactId>
        <version>5.1.12</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.11.4</version>
    </dependency>
    ```

1. Authenticate using `azure-identity` and get the Azure AI multi-service resource endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.

    ```java
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-managed identity
    // DefaultAzureCredential credential = new DefaultAzureCredentialBuilder().build();

    // for user-assigned managed identity
    // DefaultAzureCredential credential = new DefaultAzureCredentialBuilder()
    //     .managedIdentityClientId(System.getenv("AZURE_COGNITIVESERVICES_CLIENTID"))
    //     .build();

    // for service principal
    // ClientSecretCredential credential = new ClientSecretCredentialBuilder()
    //   .clientId(System.getenv("AZURE_COGNITIVESERVICES_CLIENTID"))
    //   .clientSecret(System.getenv("AZURE_COGNITIVESERVICES_CLIENTSECRET"))
    //   .tenantId(System.getenv("AZURE_COGNITIVESERVICES_TENANTID"))
    //   .build();
    
    String endpoint = System.getenv("AZURE_COGNITIVESERVICES_ENDPOINT");
    
    TextAnalyticsClient languageClient = new TextAnalyticsClientBuilder()
        .credential(credential)
        .endpoint(endpoint)
        .buildClient();
    ```

### [Python](#tab/python)

1. Install the following dependencies. This example uses `azure-ai-textanalytics`.

    ```bash
    pip install azure-ai-textanalytics==5.1.0
    pip install azure-identity
    ```

1. Authenticate using `azure-identity` and get the Azure AI multi-service resource endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.

    ```python
    import os
    from azure.ai.textanalytics import TextAnalyticsClient
    from azure.identity import ManagedIdentityCredential, ClientSecretCredential
    
    # Uncomment the following lines corresponding to the authentication type you want to use.
    # system-assigned managed identity
    # cred = ManagedIdentityCredential()
    
    # user-assigned managed identity
    # managed_identity_client_id = os.getenv('AZURE_COGNITIVESERVICES_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)
    
    # service principal
    # tenant_id = os.getenv('AZURE_COGNITIVESERVICES_TENANTID')
    # client_id = os.getenv('AZURE_COGNITIVESERVICES_CLIENTID')
    # client_secret = os.getenv('AZURE_COGNITIVESERVICES_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)
    endpoint = os.getenv('AZURE_COGNITIVESERVICES_ENDPOINT')

    language_service_client = TextAnalyticsClient(
      endpoint=endpoint, 
      credential=cred)
    ```

### [Node.js](#tab/nodejs)

1. Install the following dependencies. This example uses`ai-text-analytics`.

    ```bash
    npm install @azure/ai-text-analytics@5.1.0
    npm install @azure/identity
    ```

1. Authenticate using `@azure/identity` and get the Azure AI multi-service resource endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.
    
    ```javascript
    import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
    const { TextAnalyticsClient } = require("@azure/ai-text-analytics");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-assigned managed identity
    // const credential = new DefaultAzureCredential();
    
    // for user-assigned managed identity
    // const clientId = process.env.AZURE_COGNITIVESERVICES_CLIENTID;
    // const credential = new DefaultAzureCredential({
    //     managedIdentityClientId: clientId
    // });
    
    // for service principal
    // const tenantId = process.env.AZURE_COGNITIVESERVICES_TENANTID;
    // const clientId = process.env.AZURE_COGNITIVESERVICES_CLIENTID;
    // const clientSecret = process.env.AZURE_COGNITIVESERVICES_CLIENTSECRET;
    // const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    const endpoint = process.env.AZURE_COGNITIVESERVICES_ENDPOINT;
    const languageClient = new TextAnalyticsClient(endpoint, credential);
    ```

### [Other](#tab/none)
For other languages, you can use the connection information that Service Connector sets to the environment variables to connect to an Azure AI multi-service resource. For environment variable details, see [Integrate an Azure AI multi-service resource with Service Connector](how-to-integrate-cognitive-services.md).

## Related content

- [Connect to Foundry Tools](how-to-integrate-ai-services.md)
- [Connect to Azure OpenAI](how-to-integrate-openai.md)
- [Connect to Azure OpenAI in AKS](tutorial-python-aks-openai-workload-identity.md)
