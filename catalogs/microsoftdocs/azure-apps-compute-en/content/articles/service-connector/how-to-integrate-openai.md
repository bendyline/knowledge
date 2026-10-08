---
title: Connect Azure OpenAI in Foundry Models to Other Azure Services
titleSuffix: Service Connector
description: Learn how to integrate Azure OpenAI in Foundry Models into your application with Service Connector by using supported authentication methods and clients.
ms.reviewer: wchi
ms.service: service-connector
ms.topic: how-to
ms.date: 06/17/2026
ms.update-cycle: 180-days
ms.collection: ce-skilling-ai-copilot
#customer intent: As a cloud developer, I want to connect my compute services to Azure OpenAI in Foundry Models using Service Connector.
---

# Connect to Azure OpenAI in Foundry Models using Service Connector

In this article, we cover the supported authentication methods and clients that you can use to connect compute services to Azure OpenAI in Foundry Models using Service Connector. For each supported method, we provide sample code and list the default environment variable names and values obtained when creating service connections.

## Supported compute services

Service Connector can be used to connect the following compute services to Azure OpenAI:

- Azure App Service
- Azure Functions
- Azure Kubernetes Service (AKS)
- Azure Spring Apps

## Supported authentication types and client types

This table shows which combinations of authentication methods and clients are supported for connecting your compute service to Azure OpenAI using Service Connector. A *Yes* indicates that the combination is supported, while a *No* indicates that it isn't supported.


| Client type | System-assigned managed identity | User-assigned managed identity | Secret/connection string | Service principal |
| --- | :---: | :---: | :---: | :---: |
| .NET | Yes | Yes | Yes | Yes |
| Java | Yes | Yes | Yes | Yes |
| Node.js | Yes | Yes | Yes | Yes |
| Python | Yes | Yes | Yes | Yes |
| None | Yes | Yes | Yes | Yes |

This table indicates that all combinations of client types and authentication methods in the table are supported. All client types can use any of the authentication methods to connect to Azure OpenAI using Service Connector.

## Default environment variable names or application properties and sample code

Use the following connection details to connect compute services to Azure OpenAI. For more information, see [Configuration naming convention](concept-service-connector-internals.md#configuration-naming-convention).

### System-assigned managed identity

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| AZURE_OPENAI_BASE | Azure OpenAI endpoint | `https://<Azure-OpenAI-name>.openai.azure.com/` |

#### Sample code

To connect to Azure OpenAI using a system-assigned managed identity, refer to the following steps and code.


### [.NET](#tab/dotnet)

1. Install dependencies.

    ```bash
    dotnet add package Azure.AI.OpenAI --prerelease
    dotnet add package Azure.Identity
    ```

1. Authenticate using the Azure Identity library and get the Azure OpenAI endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.
    
    ```csharp
    using Azure.AI.OpenAI;
    using Azure.Identity;
    
    string endpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_BASE");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // system-assigned managed identity
    // var credential = new DefaultAzureCredential();
    
    // user-assigned managed identity
    // var credential = new DefaultAzureCredential(
    //     new DefaultAzureCredentialOptions
    //     {
    //         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_OPENAI_CLIENTID");
    //     });
    
    // service principal 
    // var tenantId = Environment.GetEnvironmentVariable("AZURE_OPENAI_TENANTID");
    // var clientId = Environment.GetEnvironmentVariable("AZURE_OPENAI_CLIENTID");
    // var clientSecret = Environment.GetEnvironmentVariable("AZURE_OPENAI_CLIENTSECRET");
    // var credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    AzureOpenAIClient openAIClient = new(
      new Uri(endpoint),
      credential
    );
    ```
    
### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-ai-openai</artifactId>
        <version>1.0.0-beta.6</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.11.4</version>
    </dependency>
    ```

1. Authenticate using `azure-identity` and get the Azure OpenAI endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.

    ```java
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-managed identity
    // DefaultAzureCredential credential = new DefaultAzureCredentialBuilder().build();

    // for user-assigned managed identity
    // DefaultAzureCredential credential = new DefaultAzureCredentialBuilder()
    //     .managedIdentityClientId(System.getenv("AZURE_OPENAI_CLIENTID"))
    //     .build();

    // for service principal
    // ClientSecretCredential credential = new ClientSecretCredentialBuilder()
    //   .clientId(System.getenv("AZURE_OPENAI_CLIENTID"))
    //   .clientSecret(System.getenv("AZURE_OPENAI_CLIENTSECRET"))
    //   .tenantId(System.getenv("AZURE_OPENAI_TENANTID"))
    //   .build();
    
    String endpoint = System.getenv("AZURE_OPENAI_BASE");
    
    OpenAIClient client = new OpenAIClientBuilder()
      .credential(credential)
      .endpoint(endpoint)
      .buildClient();
    ```

### [Python](#tab/python)

1. Install dependencies.

    ```bash
    pip install openai
    pip install azure-identity
    ```

1. Authenticate using `azure-identity` and get the Azure OpenAI endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.

    ```python
    import os
    import OpenAI
    from azure.identity import ManagedIdentityCredential, ClientSecretCredential, get_bearer_token_provider
    
    # Uncomment the following lines corresponding to the authentication type you want to use.
    # system-assigned managed identity
    # cred = ManagedIdentityCredential()
    
    # user-assigned managed identity
    # managed_identity_client_id = os.getenv('AZURE_OPENAI_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)
    
    # service principal
    # tenant_id = os.getenv('AZURE_OPENAI_TENANTID')
    # client_id = os.getenv('AZURE_OPENAI_CLIENTID')
    # client_secret = os.getenv('AZURE_OPENAI_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)

    token_provider = get_bearer_token_provider(
        cred, "https://cognitiveservices.azure.com/.default"
    )

    endpoint = os.getenv('AZURE_OPENAI_BASE')

    client = AzureOpenAI(
        api_version="2024-02-15-preview",
        azure_endpoint=endpoint,
        azure_ad_token_provider=token_provider
    )
    ```

### [Node.js](#tab/nodejs)

1. Install dependencies.

    ```bash
    npm install --save @azure/identity
    npm install @azure/openai
    ```

1. Authenticate using `@azure/identity` and get the Azure OpenAI endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.
    
    ```javascript
    import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-assigned managed identity
    // const credential = new DefaultAzureCredential();
    
    // for user-assigned managed identity
    // const clientId = process.env.AZURE_OPENAI_CLIENTID;
    // const credential = new DefaultAzureCredential({
    //     managedIdentityClientId: clientId
    // });
    
    // for service principal
    // const tenantId = process.env.AZURE_OPENAI_TENANTID;
    // const clientId = process.env.AZURE_OPENAI_CLIENTID;
    // const clientSecret = process.env.AZURE_OPENAI_CLIENTSECRET;
    // const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    const endpoint = process.env.AZURE_OPENAI_BASE;
    const client = new OpenAIClient(endpoint, credential);
    ```

### [Other](#tab/none)
For other languages, you can use the connection information that Service Connector sets to the environment variables to connect to Azure OpenAI. For environment variable details, see [Integrate Azure OpenAI with Service Connector](how-to-integrate-openai.md).

### User-assigned managed identity

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| AZURE_OPENAI_BASE | Azure OpenAI Endpoint | `https://<Azure-OpenAI-name>.openai.azure.com/` |
| AZURE_OPENAI_CLIENTID | Your client ID | `<client-ID>` |

#### Sample code

To connect to Azure OpenAI using a user-assigned managed identity, refer to the following steps and code.


### [.NET](#tab/dotnet)

1. Install dependencies.

    ```bash
    dotnet add package Azure.AI.OpenAI --prerelease
    dotnet add package Azure.Identity
    ```

1. Authenticate using the Azure Identity library and get the Azure OpenAI endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.
    
    ```csharp
    using Azure.AI.OpenAI;
    using Azure.Identity;
    
    string endpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_BASE");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // system-assigned managed identity
    // var credential = new DefaultAzureCredential();
    
    // user-assigned managed identity
    // var credential = new DefaultAzureCredential(
    //     new DefaultAzureCredentialOptions
    //     {
    //         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_OPENAI_CLIENTID");
    //     });
    
    // service principal 
    // var tenantId = Environment.GetEnvironmentVariable("AZURE_OPENAI_TENANTID");
    // var clientId = Environment.GetEnvironmentVariable("AZURE_OPENAI_CLIENTID");
    // var clientSecret = Environment.GetEnvironmentVariable("AZURE_OPENAI_CLIENTSECRET");
    // var credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    AzureOpenAIClient openAIClient = new(
      new Uri(endpoint),
      credential
    );
    ```
    
### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-ai-openai</artifactId>
        <version>1.0.0-beta.6</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.11.4</version>
    </dependency>
    ```

1. Authenticate using `azure-identity` and get the Azure OpenAI endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.

    ```java
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-managed identity
    // DefaultAzureCredential credential = new DefaultAzureCredentialBuilder().build();

    // for user-assigned managed identity
    // DefaultAzureCredential credential = new DefaultAzureCredentialBuilder()
    //     .managedIdentityClientId(System.getenv("AZURE_OPENAI_CLIENTID"))
    //     .build();

    // for service principal
    // ClientSecretCredential credential = new ClientSecretCredentialBuilder()
    //   .clientId(System.getenv("AZURE_OPENAI_CLIENTID"))
    //   .clientSecret(System.getenv("AZURE_OPENAI_CLIENTSECRET"))
    //   .tenantId(System.getenv("AZURE_OPENAI_TENANTID"))
    //   .build();
    
    String endpoint = System.getenv("AZURE_OPENAI_BASE");
    
    OpenAIClient client = new OpenAIClientBuilder()
      .credential(credential)
      .endpoint(endpoint)
      .buildClient();
    ```

### [Python](#tab/python)

1. Install dependencies.

    ```bash
    pip install openai
    pip install azure-identity
    ```

1. Authenticate using `azure-identity` and get the Azure OpenAI endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.

    ```python
    import os
    import OpenAI
    from azure.identity import ManagedIdentityCredential, ClientSecretCredential, get_bearer_token_provider
    
    # Uncomment the following lines corresponding to the authentication type you want to use.
    # system-assigned managed identity
    # cred = ManagedIdentityCredential()
    
    # user-assigned managed identity
    # managed_identity_client_id = os.getenv('AZURE_OPENAI_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)
    
    # service principal
    # tenant_id = os.getenv('AZURE_OPENAI_TENANTID')
    # client_id = os.getenv('AZURE_OPENAI_CLIENTID')
    # client_secret = os.getenv('AZURE_OPENAI_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)

    token_provider = get_bearer_token_provider(
        cred, "https://cognitiveservices.azure.com/.default"
    )

    endpoint = os.getenv('AZURE_OPENAI_BASE')

    client = AzureOpenAI(
        api_version="2024-02-15-preview",
        azure_endpoint=endpoint,
        azure_ad_token_provider=token_provider
    )
    ```

### [Node.js](#tab/nodejs)

1. Install dependencies.

    ```bash
    npm install --save @azure/identity
    npm install @azure/openai
    ```

1. Authenticate using `@azure/identity` and get the Azure OpenAI endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.
    
    ```javascript
    import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-assigned managed identity
    // const credential = new DefaultAzureCredential();
    
    // for user-assigned managed identity
    // const clientId = process.env.AZURE_OPENAI_CLIENTID;
    // const credential = new DefaultAzureCredential({
    //     managedIdentityClientId: clientId
    // });
    
    // for service principal
    // const tenantId = process.env.AZURE_OPENAI_TENANTID;
    // const clientId = process.env.AZURE_OPENAI_CLIENTID;
    // const clientSecret = process.env.AZURE_OPENAI_CLIENTSECRET;
    // const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    const endpoint = process.env.AZURE_OPENAI_BASE;
    const client = new OpenAIClient(endpoint, credential);
    ```

### [Other](#tab/none)
For other languages, you can use the connection information that Service Connector sets to the environment variables to connect to Azure OpenAI. For environment variable details, see [Integrate Azure OpenAI with Service Connector](how-to-integrate-openai.md).

### Connection string

> 
> | Default environment variable name | Description | Sample value |
> | --- | --- | --- |
> | AZURE_OPENAI_BASE | Azure OpenAI Endpoint | `https://<Azure-OpenAI-name>.openai.azure.com/` |
> | AZURE_OPENAI_KEY | Azure OpenAI API key | `<api-key>` |

#### Sample Code 

To connect to Azure OpenAI using a connection string, refer to the following steps and code.


### [.NET](#tab/dotnet)

1. Install the following dependencies.

    ```bash
    dotnet add package Azure.AI.OpenAI --prerelease
    dotnet add package Azure.Core --version 1.40.0
    ```

1. Get the Azure OpenAI endpoint and API key from the environment variables added by Service Connector.
    
    ```csharp
    using Azure.AI.OpenAI;
    
    string endpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_BASE");
    string key = Environment.GetEnvironmentVariable("AZURE_OPENAI_KEY");

    AzureOpenAIClient openAIClient = new(
      new Uri(endpoint),
      new AzureKeyCredential(key));
    ```
    
### [Java](#tab/java)

1. Add the following dependency in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-core</artifactId>
        <version>1.49.1</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-ai-openai</artifactId>
        <version>1.0.0-beta.6</version>
    </dependency>
    ```

1. Get the Azure OpenAI endpoint and API key from the environment variables added by Service Connector.

    ```java
    String endpoint = System.getenv("AZURE_OPENAI_BASE");
    String key = System.getenv("AZURE_OPENAI_KEY");
    OpenAIClient client = new OpenAIClientBuilder()
      .credential(new AzureKeyCredential(key))
      .endpoint(endpoint)
      .buildClient();
    ```

### [Python](#tab/python)

1. Install the following dependencies.

    ```bash
    pip install openai
    pip install azure-core
    ```

1. Get the Azure OpenAI endpoint and API key from the environment variables added by Service Connector.

    ```python
    import os
    from openai import AzureOpenAI
    from azure.core.credentials import AzureKeyCredential
    
    key = os.environ['AZURE_OPENAI_KEY']
    endpoint = os.environ['AZURE_OPENAI_BASE']
    client = AzureOpenAI(
        api_version="2024-02-15-preview",
        azure_endpoint=endpoint,
        api_key=key
    )
    ```

### [Node.js](#tab/nodejs)

1. Install the following dependencies.

    ```bash
    npm install @azure/openai
    npm install @azure/core-auth
    ```

1. Get the Azure OpenAI endpoint and API key from the environment variables added by Service Connector.
    
    ```javascript
    import { OpenAIClient } from "@azure/openai";
    import { AzureKeyCredential } from "@azure/core-auth";

    const endpoint = process.env.AZURE_OPENAI_BASE;
    const credential = new AzureKeyCredential(process.env.AZURE_OPENAI_KEY);

    const client = new OpenAIClient(endpoint, credential);
    ```

### [Other](#tab/none)
For other languages, you can use the connection information that Service Connector sets to the environment variables to connect to Azure OpenAI. For environment variable details, see [Integrate Azure OpenAI with Service Connector](how-to-integrate-openai.md).


### Service principal

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| AZURE_OPENAI_BASE | Azure OpenAI Endpoint | `https://<Azure-OpenAI-name>.openai.azure.com/` |
| AZURE_OPENAI_CLIENTID | Your client ID | `<client-ID>` |
| AZURE_OPENAI_CLIENTSECRET | Your client secret | `<client-secret>` |
| AZURE_OPENAI_TENANTID | Your tenant ID | `<tenant-ID>` |

#### Sample code

To connect to Azure OpenAI using a service principal, refer to the following steps and code.


### [.NET](#tab/dotnet)

1. Install dependencies.

    ```bash
    dotnet add package Azure.AI.OpenAI --prerelease
    dotnet add package Azure.Identity
    ```

1. Authenticate using the Azure Identity library and get the Azure OpenAI endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.
    
    ```csharp
    using Azure.AI.OpenAI;
    using Azure.Identity;
    
    string endpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_BASE");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // system-assigned managed identity
    // var credential = new DefaultAzureCredential();
    
    // user-assigned managed identity
    // var credential = new DefaultAzureCredential(
    //     new DefaultAzureCredentialOptions
    //     {
    //         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_OPENAI_CLIENTID");
    //     });
    
    // service principal 
    // var tenantId = Environment.GetEnvironmentVariable("AZURE_OPENAI_TENANTID");
    // var clientId = Environment.GetEnvironmentVariable("AZURE_OPENAI_CLIENTID");
    // var clientSecret = Environment.GetEnvironmentVariable("AZURE_OPENAI_CLIENTSECRET");
    // var credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    AzureOpenAIClient openAIClient = new(
      new Uri(endpoint),
      credential
    );
    ```
    
### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-ai-openai</artifactId>
        <version>1.0.0-beta.6</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.11.4</version>
    </dependency>
    ```

1. Authenticate using `azure-identity` and get the Azure OpenAI endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.

    ```java
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-managed identity
    // DefaultAzureCredential credential = new DefaultAzureCredentialBuilder().build();

    // for user-assigned managed identity
    // DefaultAzureCredential credential = new DefaultAzureCredentialBuilder()
    //     .managedIdentityClientId(System.getenv("AZURE_OPENAI_CLIENTID"))
    //     .build();

    // for service principal
    // ClientSecretCredential credential = new ClientSecretCredentialBuilder()
    //   .clientId(System.getenv("AZURE_OPENAI_CLIENTID"))
    //   .clientSecret(System.getenv("AZURE_OPENAI_CLIENTSECRET"))
    //   .tenantId(System.getenv("AZURE_OPENAI_TENANTID"))
    //   .build();
    
    String endpoint = System.getenv("AZURE_OPENAI_BASE");
    
    OpenAIClient client = new OpenAIClientBuilder()
      .credential(credential)
      .endpoint(endpoint)
      .buildClient();
    ```

### [Python](#tab/python)

1. Install dependencies.

    ```bash
    pip install openai
    pip install azure-identity
    ```

1. Authenticate using `azure-identity` and get the Azure OpenAI endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.

    ```python
    import os
    import OpenAI
    from azure.identity import ManagedIdentityCredential, ClientSecretCredential, get_bearer_token_provider
    
    # Uncomment the following lines corresponding to the authentication type you want to use.
    # system-assigned managed identity
    # cred = ManagedIdentityCredential()
    
    # user-assigned managed identity
    # managed_identity_client_id = os.getenv('AZURE_OPENAI_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)
    
    # service principal
    # tenant_id = os.getenv('AZURE_OPENAI_TENANTID')
    # client_id = os.getenv('AZURE_OPENAI_CLIENTID')
    # client_secret = os.getenv('AZURE_OPENAI_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)

    token_provider = get_bearer_token_provider(
        cred, "https://cognitiveservices.azure.com/.default"
    )

    endpoint = os.getenv('AZURE_OPENAI_BASE')

    client = AzureOpenAI(
        api_version="2024-02-15-preview",
        azure_endpoint=endpoint,
        azure_ad_token_provider=token_provider
    )
    ```

### [Node.js](#tab/nodejs)

1. Install dependencies.

    ```bash
    npm install --save @azure/identity
    npm install @azure/openai
    ```

1. Authenticate using `@azure/identity` and get the Azure OpenAI endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.
    
    ```javascript
    import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-assigned managed identity
    // const credential = new DefaultAzureCredential();
    
    // for user-assigned managed identity
    // const clientId = process.env.AZURE_OPENAI_CLIENTID;
    // const credential = new DefaultAzureCredential({
    //     managedIdentityClientId: clientId
    // });
    
    // for service principal
    // const tenantId = process.env.AZURE_OPENAI_TENANTID;
    // const clientId = process.env.AZURE_OPENAI_CLIENTID;
    // const clientSecret = process.env.AZURE_OPENAI_CLIENTSECRET;
    // const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    const endpoint = process.env.AZURE_OPENAI_BASE;
    const client = new OpenAIClient(endpoint, credential);
    ```

### [Other](#tab/none)
For other languages, you can use the connection information that Service Connector sets to the environment variables to connect to Azure OpenAI. For environment variable details, see [Integrate Azure OpenAI with Service Connector](how-to-integrate-openai.md).

### Related content

- [Connect to Azure OpenAI in AKS using Workload Identity](tutorial-python-aks-openai-workload-identity.md)
- [Connect to an Azure AI multi-service resource](how-to-integrate-cognitive-services.md)
- [Connect to Foundry Tools](how-to-integrate-ai-services.md)
