---
title: Integrate Azure App Configuration with Service Connector
description: Use these code samples to integrate Azure App Configuration into your application with Service Connector.
author: maud-lv
ms.author: malev
ms.service: service-connector
ms.topic: how-to
ms.date: 06/18/2026
#customer intent: As a cloud developer, I want to connect my cloud services to Azure App Configuration by using Service Connector.
---

# Integrate Azure App Configuration with Service Connector

This article covers supported authentication methods and clients, and provides sample code for connecting cloud services to App Configuration by using Service Connector. It also lists default environment variable names and values that you receive when you create the service connection.

## Supported compute services

Service Connector can be used to connect the following compute services to Azure App Configuration:

- Azure App Service
- Azure Functions
- Azure Kubernetes Service (AKS)
- Azure Spring Apps

## Supported authentication types and client types

This table shows which combinations of authentication methods and clients are supported for connecting your compute service to Azure App Configuration using Service Connector. A "Yes" indicates that the combination is supported, while a "No" indicates that it isn't supported.


| Client type | System-assigned managed identity | User-assigned managed identity | Secret/connection string | Service principal |
| --- | :---: | :---: | :---: | :---: |
| .NET | Yes | Yes | Yes | Yes |
| Java | Yes | Yes | Yes | Yes |
| Node.js | Yes | Yes | Yes | Yes |
| Python | Yes | Yes | Yes | Yes |
| None | Yes | Yes | Yes | Yes |

This table indicates that all combinations of client types and authentication methods in the table are supported. All client types can use any of the authentication methods to connect to Azure App Configuration using Service Connector.

## Default environment variable names or application properties and sample code

Use the following connection details to connect compute services to Azure App Configuration stores. For more information, see [Configuration naming convention](concept-service-connector-internals.md#configuration-naming-convention).

### System-assigned managed identity

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| AZURE_APPCONFIGURATION_ENDPOINT | App Configuration   endpoint | `https://<App-Configuration-name>.azconfig.io` |

#### Sample code

To connect to Azure App Configuration using a system-assigned managed identity:

### [.NET](#tab/dotnet)

1. Install dependencies.

    ```bash
    dotnet add package Microsoft.Extensions.Configuration.AzureAppConfiguration
    dotnet add package Azure.Identity
    ```

1. Authenticate using `Azure.Identity` and get the Azure App Configuration endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.
    
    ```csharp
    using Azure.Identity;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Configuration.AzureAppConfiguration;
    
    string endpoint = Environment.GetEnvironmentVariable("AZURE_APPCONFIGURATION_ENDPOINT");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // system-assigned managed identity
    // var credential = new DefaultAzureCredential();
    
    // user-assigned managed identity
    // var credential = new DefaultAzureCredential(
    //     new DefaultAzureCredentialOptions
    //     {
    //         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_APPCONFIGURATION_CLIENTID");
    //     });
    
    // service principal 
    // var tenantId = Environment.GetEnvironmentVariable("AZURE_APPCONFIGURATION_TENANTID");
    // var clientId = Environment.GetEnvironmentVariable("AZURE_APPCONFIGURATION_CLIENTID");
    // var clientSecret = Environment.GetEnvironmentVariable("AZURE_APPCONFIGURATION_CLIENTSECRET");
    // var credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    var client = new ConfigurationClient(new Uri(endpoint), credential);
    ```
    
### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-data-appconfiguration</artifactId>
        <version>1.4.9</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.1.5</version>
    </dependency>
    ```

1. Authenticate using `azure-identity` and get the Azure App Configuration endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.

    ```java
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-managed identity
    // DefaultAzureCredential defaultCredential = new DefaultAzureCredentialBuilder().build();

    // for user-assigned managed identity
    // DefaultAzureCredential defaultCredential = new DefaultAzureCredentialBuilder()
    //     .managedIdentityClientId(System.getenv("AZURE_APPCONFIGURATION_CLIENTID"))
    //     .build();

    // for service principal
    // ClientSecretCredential defaultCredential = new ClientSecretCredentialBuilder()
    //   .clientId(System.getenv("AZURE_APPCONFIGURATION_CLIENTID"))
    //   .clientSecret(System.getenv("AZURE_APPCONFIGURATION_CLIENTSECRET"))
    //   .tenantId(System.getenv("AZURE_APPCONFIGURATION_TENANTID"))
    //   .build();
    
    String endpoint = System.getenv("AZURE_APPCONFIGURATION_ENDPOINT");

    ConfigurationClient configurationClient = new ConfigurationClientBuilder()
        .credential(credential)
        .endpoint(endpoint)
        .buildClient();
    ```

### [Python](#tab/python)

1. Install dependencies.

    ```bash
    pip install azure-appconfiguration
    pip install azure-identity
    ```

1. Authenticate using `azure-identity` and get the Azure App Configuration endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.

    ```python
    import os
    from azure.appconfiguration import AzureAppConfigurationClient
    from azure.identity import ManagedIdentityCredential, ClientSecretCredential
    
    # Uncomment the following lines corresponding to the authentication type you want to use.
    # system-assigned managed identity
    # cred = ManagedIdentityCredential()
    
    # user-assigned managed identity
    # managed_identity_client_id = os.getenv('AZURE_APPCONFIGURATION_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)
    
    # service principal
    # tenant_id = os.getenv('AZURE_APPCONFIGURATION_TENANTID')
    # client_id = os.getenv('AZURE_APPCONFIGURATION_CLIENTID')
    # client_secret = os.getenv('AZURE_APPCONFIGURATION_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)

    endpoint_url = os.getenv('AZURE_APPCONFIGURATION_ENDPOINT')

    client = AzureAppConfigurationClient(base_url=endpoint_url, credential=cred)
    ```

### [Node.js](#tab/nodejs)

1. Install dependencies.

    ```bash
    npm install --save @azure/identity
    npm install @azure/app-configuration
    ```

1. Authenticate using `@azure/identity` and get the Azure App Configuration endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.
    
    ```javascript
    import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
    const appConfig = require("@azure/app-configuration");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-assigned managed identity
    // const credential = new DefaultAzureCredential();
    
    // for user-assigned managed identity
    // const clientId = process.env.AZURE_APPCONFIGURATION_CLIENTID;
    // const credential = new DefaultAzureCredential({
    //     managedIdentityClientId: clientId
    // });
    
    // for service principal
    // const tenantId = process.env.AZURE_APPCONFIGURATION_TENANTID;
    // const clientId = process.env.AZURE_APPCONFIGURATION_CLIENTID;
    // const clientSecret = process.env.AZURE_APPCONFIGURATION_CLIENTSECRET;
    // const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    const endpoint = process.env.AZURE_APPCONFIGURATION_ENDPOINT;

    const client = new appConfig.AppConfigurationClient(
        endpoint,
        credential
    );
    ```

### [Other](#tab/none)
For other languages, you can use the connection information that Service Connector sets to the environment variables to connect to Azure App Configuration. For environment variable details, see [Integrate Azure App Configuration with Service Connector](how-to-integrate-app-configuration.md).

### User-assigned managed identity

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| AZURE_APPCONFIGURATION_ENDPOINT | App Configuration Endpoint | `https://App-Configuration-name>.azconfig.io` |
| AZURE_APPCONFIGURATION_CLIENTID | Your client ID | `<client-ID>` |

#### Sample code

To connect to Azure App Configuration using a user-assigned managed identity:

### [.NET](#tab/dotnet)

1. Install dependencies.

    ```bash
    dotnet add package Microsoft.Extensions.Configuration.AzureAppConfiguration
    dotnet add package Azure.Identity
    ```

1. Authenticate using `Azure.Identity` and get the Azure App Configuration endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.
    
    ```csharp
    using Azure.Identity;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Configuration.AzureAppConfiguration;
    
    string endpoint = Environment.GetEnvironmentVariable("AZURE_APPCONFIGURATION_ENDPOINT");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // system-assigned managed identity
    // var credential = new DefaultAzureCredential();
    
    // user-assigned managed identity
    // var credential = new DefaultAzureCredential(
    //     new DefaultAzureCredentialOptions
    //     {
    //         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_APPCONFIGURATION_CLIENTID");
    //     });
    
    // service principal 
    // var tenantId = Environment.GetEnvironmentVariable("AZURE_APPCONFIGURATION_TENANTID");
    // var clientId = Environment.GetEnvironmentVariable("AZURE_APPCONFIGURATION_CLIENTID");
    // var clientSecret = Environment.GetEnvironmentVariable("AZURE_APPCONFIGURATION_CLIENTSECRET");
    // var credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    var client = new ConfigurationClient(new Uri(endpoint), credential);
    ```
    
### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-data-appconfiguration</artifactId>
        <version>1.4.9</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.1.5</version>
    </dependency>
    ```

1. Authenticate using `azure-identity` and get the Azure App Configuration endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.

    ```java
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-managed identity
    // DefaultAzureCredential defaultCredential = new DefaultAzureCredentialBuilder().build();

    // for user-assigned managed identity
    // DefaultAzureCredential defaultCredential = new DefaultAzureCredentialBuilder()
    //     .managedIdentityClientId(System.getenv("AZURE_APPCONFIGURATION_CLIENTID"))
    //     .build();

    // for service principal
    // ClientSecretCredential defaultCredential = new ClientSecretCredentialBuilder()
    //   .clientId(System.getenv("AZURE_APPCONFIGURATION_CLIENTID"))
    //   .clientSecret(System.getenv("AZURE_APPCONFIGURATION_CLIENTSECRET"))
    //   .tenantId(System.getenv("AZURE_APPCONFIGURATION_TENANTID"))
    //   .build();
    
    String endpoint = System.getenv("AZURE_APPCONFIGURATION_ENDPOINT");

    ConfigurationClient configurationClient = new ConfigurationClientBuilder()
        .credential(credential)
        .endpoint(endpoint)
        .buildClient();
    ```

### [Python](#tab/python)

1. Install dependencies.

    ```bash
    pip install azure-appconfiguration
    pip install azure-identity
    ```

1. Authenticate using `azure-identity` and get the Azure App Configuration endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.

    ```python
    import os
    from azure.appconfiguration import AzureAppConfigurationClient
    from azure.identity import ManagedIdentityCredential, ClientSecretCredential
    
    # Uncomment the following lines corresponding to the authentication type you want to use.
    # system-assigned managed identity
    # cred = ManagedIdentityCredential()
    
    # user-assigned managed identity
    # managed_identity_client_id = os.getenv('AZURE_APPCONFIGURATION_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)
    
    # service principal
    # tenant_id = os.getenv('AZURE_APPCONFIGURATION_TENANTID')
    # client_id = os.getenv('AZURE_APPCONFIGURATION_CLIENTID')
    # client_secret = os.getenv('AZURE_APPCONFIGURATION_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)

    endpoint_url = os.getenv('AZURE_APPCONFIGURATION_ENDPOINT')

    client = AzureAppConfigurationClient(base_url=endpoint_url, credential=cred)
    ```

### [Node.js](#tab/nodejs)

1. Install dependencies.

    ```bash
    npm install --save @azure/identity
    npm install @azure/app-configuration
    ```

1. Authenticate using `@azure/identity` and get the Azure App Configuration endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.
    
    ```javascript
    import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
    const appConfig = require("@azure/app-configuration");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-assigned managed identity
    // const credential = new DefaultAzureCredential();
    
    // for user-assigned managed identity
    // const clientId = process.env.AZURE_APPCONFIGURATION_CLIENTID;
    // const credential = new DefaultAzureCredential({
    //     managedIdentityClientId: clientId
    // });
    
    // for service principal
    // const tenantId = process.env.AZURE_APPCONFIGURATION_TENANTID;
    // const clientId = process.env.AZURE_APPCONFIGURATION_CLIENTID;
    // const clientSecret = process.env.AZURE_APPCONFIGURATION_CLIENTSECRET;
    // const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    const endpoint = process.env.AZURE_APPCONFIGURATION_ENDPOINT;

    const client = new appConfig.AppConfigurationClient(
        endpoint,
        credential
    );
    ```

### [Other](#tab/none)
For other languages, you can use the connection information that Service Connector sets to the environment variables to connect to Azure App Configuration. For environment variable details, see [Integrate Azure App Configuration with Service Connector](how-to-integrate-app-configuration.md).

### Connection string

> **Warning:**
> Microsoft recommends that you use the most secure authentication flow available. The authentication flow described in this procedure requires a very high degree of trust in the application. It carries risks that aren't present in other flows. You should only use this flow when other more secure flows, such as managed identities, aren't viable.

> 
> | Default environment variable name | Description | Sample value |
> | --- | --- | --- |
> | AZURE_APPCONFIGURATION_CONNECTIONSTRING | Your App Configuration Connection String | `Endpoint=https://<App-Configuration-name>.azconfig.io;Id=<ID>;Secret=<secret>` |

#### Sample Code

To connect to Azure App Configuration using a connection string:

### [.NET](#tab/dotnet)

1. Install dependencies.

    ```bash
    dotnet add package Microsoft.Extensions.Configuration.AzureAppConfiguration
    ```

1. Get the App Configuration connection string from the environment variables added by Service Connector.
    
    ```csharp
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Configuration.AzureAppConfiguration;
    
    var connectionString = Environment.GetEnvironmentVariable("AZURE_APPCONFIGURATION_CONNECTIONSTRING");
    var builder = new ConfigurationBuilder();
    builder.AddAzureAppConfiguration(connectionString);

    var config = builder.Build();
    ```
    
### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-data-appconfiguration</artifactId>
        <version>1.4.9</version>
    </dependency>
    ```

1. Get the App Configuration connection string from the environment variables added by Service Connector.

    ```java
    String connectionString = System.getenv("AZURE_APPCONFIGURATION_CONNECTIONSTRING");
    ConfigurationClient configurationClient = new ConfigurationClientBuilder()
        .connectionString(connectionString)
        .buildClient();
    ```

### [Python](#tab/python)

1. Install dependencies.

    ```bash
    pip install azure-appconfiguration
    ```

1. Get the App Configuration connection string from the environment variables added by Service Connector.

    ```python
    import os
    from azure.appconfiguration import AzureAppConfigurationClient
    
    connection_string = os.getenv('AZURE_APPCONFIGURATION_CONNECTIONSTRING')
    app_config_client = AzureAppConfigurationClient.from_connection_string(connection_string)
    ```

### [Node.js](#tab/nodejs)

1. Install dependencies.

    ```bash
    npm install @azure/app-configuration
    ```

1. Get the App Configuration connection string from the environment variables added by Service Connector.
    
    ```javascript
    const appConfig = require("@azure/app-configuration");

    const connection_string = process.env.AZURE_APPCONFIGURATION_CONNECTIONSTRING;
    const client = new appConfig.AppConfigurationClient(connection_string);
    ```

### [Other](#tab/none)
For other languages, you can use the connection information that Service Connector sets to the environment variables to connect to Azure App Configuration. For environment variable details, see [Integrate Azure App Configuration with Service Connector](how-to-integrate-app-configuration.md).


### Service principal

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| AZURE_APPCONFIGURATION_ENDPOINT | App Configuration Endpoint | `https://<AppConfigurationName>.azconfig.io` |
| AZURE_APPCONFIGURATION_CLIENTID | Your client ID | `<client-ID>` |
| AZURE_APPCONFIGURATION_CLIENTSECRET | Your client secret | `<client-secret>` |
| AZURE_APPCONFIGURATION_TENANTID | Your tenant ID | `<tenant-ID>` |

#### Sample code

To connect to Azure App Configuration using a service principal:

### [.NET](#tab/dotnet)

1. Install dependencies.

    ```bash
    dotnet add package Microsoft.Extensions.Configuration.AzureAppConfiguration
    dotnet add package Azure.Identity
    ```

1. Authenticate using `Azure.Identity` and get the Azure App Configuration endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.
    
    ```csharp
    using Azure.Identity;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Configuration.AzureAppConfiguration;
    
    string endpoint = Environment.GetEnvironmentVariable("AZURE_APPCONFIGURATION_ENDPOINT");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // system-assigned managed identity
    // var credential = new DefaultAzureCredential();
    
    // user-assigned managed identity
    // var credential = new DefaultAzureCredential(
    //     new DefaultAzureCredentialOptions
    //     {
    //         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_APPCONFIGURATION_CLIENTID");
    //     });
    
    // service principal 
    // var tenantId = Environment.GetEnvironmentVariable("AZURE_APPCONFIGURATION_TENANTID");
    // var clientId = Environment.GetEnvironmentVariable("AZURE_APPCONFIGURATION_CLIENTID");
    // var clientSecret = Environment.GetEnvironmentVariable("AZURE_APPCONFIGURATION_CLIENTSECRET");
    // var credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    var client = new ConfigurationClient(new Uri(endpoint), credential);
    ```
    
### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-data-appconfiguration</artifactId>
        <version>1.4.9</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.1.5</version>
    </dependency>
    ```

1. Authenticate using `azure-identity` and get the Azure App Configuration endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.

    ```java
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-managed identity
    // DefaultAzureCredential defaultCredential = new DefaultAzureCredentialBuilder().build();

    // for user-assigned managed identity
    // DefaultAzureCredential defaultCredential = new DefaultAzureCredentialBuilder()
    //     .managedIdentityClientId(System.getenv("AZURE_APPCONFIGURATION_CLIENTID"))
    //     .build();

    // for service principal
    // ClientSecretCredential defaultCredential = new ClientSecretCredentialBuilder()
    //   .clientId(System.getenv("AZURE_APPCONFIGURATION_CLIENTID"))
    //   .clientSecret(System.getenv("AZURE_APPCONFIGURATION_CLIENTSECRET"))
    //   .tenantId(System.getenv("AZURE_APPCONFIGURATION_TENANTID"))
    //   .build();
    
    String endpoint = System.getenv("AZURE_APPCONFIGURATION_ENDPOINT");

    ConfigurationClient configurationClient = new ConfigurationClientBuilder()
        .credential(credential)
        .endpoint(endpoint)
        .buildClient();
    ```

### [Python](#tab/python)

1. Install dependencies.

    ```bash
    pip install azure-appconfiguration
    pip install azure-identity
    ```

1. Authenticate using `azure-identity` and get the Azure App Configuration endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.

    ```python
    import os
    from azure.appconfiguration import AzureAppConfigurationClient
    from azure.identity import ManagedIdentityCredential, ClientSecretCredential
    
    # Uncomment the following lines corresponding to the authentication type you want to use.
    # system-assigned managed identity
    # cred = ManagedIdentityCredential()
    
    # user-assigned managed identity
    # managed_identity_client_id = os.getenv('AZURE_APPCONFIGURATION_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)
    
    # service principal
    # tenant_id = os.getenv('AZURE_APPCONFIGURATION_TENANTID')
    # client_id = os.getenv('AZURE_APPCONFIGURATION_CLIENTID')
    # client_secret = os.getenv('AZURE_APPCONFIGURATION_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)

    endpoint_url = os.getenv('AZURE_APPCONFIGURATION_ENDPOINT')

    client = AzureAppConfigurationClient(base_url=endpoint_url, credential=cred)
    ```

### [Node.js](#tab/nodejs)

1. Install dependencies.

    ```bash
    npm install --save @azure/identity
    npm install @azure/app-configuration
    ```

1. Authenticate using `@azure/identity` and get the Azure App Configuration endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.
    
    ```javascript
    import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
    const appConfig = require("@azure/app-configuration");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-assigned managed identity
    // const credential = new DefaultAzureCredential();
    
    // for user-assigned managed identity
    // const clientId = process.env.AZURE_APPCONFIGURATION_CLIENTID;
    // const credential = new DefaultAzureCredential({
    //     managedIdentityClientId: clientId
    // });
    
    // for service principal
    // const tenantId = process.env.AZURE_APPCONFIGURATION_TENANTID;
    // const clientId = process.env.AZURE_APPCONFIGURATION_CLIENTID;
    // const clientSecret = process.env.AZURE_APPCONFIGURATION_CLIENTSECRET;
    // const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    const endpoint = process.env.AZURE_APPCONFIGURATION_ENDPOINT;

    const client = new appConfig.AppConfigurationClient(
        endpoint,
        credential
    );
    ```

### [Other](#tab/none)
For other languages, you can use the connection information that Service Connector sets to the environment variables to connect to Azure App Configuration. For environment variable details, see [Integrate Azure App Configuration with Service Connector](how-to-integrate-app-configuration.md).

## Next step

> 
> [Learn about Service Connector concepts](concept-service-connector-internals.md)
