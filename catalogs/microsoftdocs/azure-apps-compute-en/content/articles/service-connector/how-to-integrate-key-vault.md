---
title: Integrate Azure Key Vault with Service Connector
description: Use these code samples to integrate Azure Key Vault into your application with Service Connector.
author: maud-lv
ms.author: malev
ms.service: service-connector
ms.topic: how-to
ms.date: 06/18/2026
#customer intent: As a cloud developer, I want to connect my cloud services to Azure Key Vault by using Service Connector.
---

# Integrate Azure Key Vault with Service Connector

> **Note:**
> When you use Service Connector to connect your Key Vault or manage Key Vault connections, Service Connector uses your token to perform the corresponding operations.

This article covers supported authentication methods and clients, and provides sample code for connecting cloud services to Azure Key Vault by using Service Connector. It also lists default environment variable names, values, and Spring Boot configuration properties created with the service connection.

## Supported compute services

Service Connector can be used to connect the following compute services to Azure Key Vault:

- Azure App Service
- Azure Functions
- Azure Kubernetes Service (AKS)
- Azure Spring Apps

## Supported authentication types and client types

The following table shows which combinations of client types and authentication methods are supported for connecting your compute service to Azure Key Vault using Service Connector. A "Yes" indicates that the combination is supported, while a "No" indicates that it isn't supported.

| Client type | System-assigned managed identity | User-assigned managed identity | Secret / connection string | Service principal |
| --- | --- | --- | --- | --- |
| .NET | Yes | Yes | No | Yes |
| Java | Yes | Yes | No | Yes |
| Java - Spring Boot | Yes | Yes | No | Yes |
| Node.js | Yes | Yes | No | Yes |
| Python | Yes | Yes | No | Yes |
| None | Yes | Yes | No | Yes |

This table indicates that all combinations of client types and authentication methods in the table are supported, except for **Secret / connection string**. That method isn't supported for any of the client types. All client types can use any of the other authentication methods to connect to Azure Key Vault using Service Connector.

## Default environment variable names or application properties and sample code

Use the following connection details to connect compute services to Azure Key Vault. For each of these examples, replace the placeholder texts `<vault-name>`, `<client-ID>`, `<client-secret>`, and `<tenant-id>` with your Key Vault name, client-ID, client secret, and tenant ID. For more information, see [Configuration naming convention](concept-service-connector-internals.md#configuration-naming-convention).

### System-assigned managed identity

#### Spring Boot client type

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| azure.keyvault.uri | Your Key Vault endpoint URL | `"https://<vault-name>.vault.azure.net/"` |
| azure.keyvault.scope | Your Azure RBAC scope | `https://management.azure.com/.default` |
| spring.cloud.azure.keyvault.secret.credential.managed-identity-enabled | Whether to enable managed identity for Spring Cloud Azure version 4.0 and above | `true` |
| spring.cloud.azure.keyvault.secret.endpoint | Your Key Vault endpoint URL for Spring Cloud Azure version 4.0 and above | `"https://<vault-name>.vault.azure.net/"` |

#### Other client types

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| AZURE_KEYVAULT_SCOPE | Your Azure RBAC scope | `https://management.azure.com/.default` |
| AZURE_KEYVAULT_RESOURCEENDPOINT | Your Key Vault endpoint | `https://<vault-name>.vault.azure.net/` |

#### Sample code

To connect to Azure Key Vault using a system-assigned managed identity:

### [.NET](#tab/dotnet)

1. Install dependencies.

    ```bash
    dotnet add package Azure.Identity
    dotnet add package Azure.Security.KeyVault.Secrets
    ```

1. Authenticate using `Azure.Identity` and get the Azure Key Vault endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.

    ```csharp
    using Azure.Identity;
    using Azure.Security.KeyVault.Secrets;
    using Azure.Core;
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // system-assigned managed identity
    // var credential = new DefaultAzureCredential();
    
    // user-assigned managed identity
    // var credential = new DefaultAzureCredential(
    //     new DefaultAzureCredentialOptions
    //     {
    //         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_KEYVAULT_CLIENTID");
    //     });
    
    // service principal 
    // var tenantId = Environment.GetEnvironmentVariable("AZURE_KEYVAULT_TENANTID");
    // var clientId = Environment.GetEnvironmentVariable("AZURE_KEYVAULT_CLIENTID");
    // var clientSecret = Environment.GetEnvironmentVariable("AZURE_KEYVAULT_CLIENTSECRET");
    // var credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

    string endpoint = Environment.GetEnvironmentVariable("AZURE_KEYVAULT_RESOURCEENDPOINT");
    SecretClientOptions options = new SecretClientOptions()
    {
        Retry =
        {
            Delay= TimeSpan.FromSeconds(2),
            MaxDelay = TimeSpan.FromSeconds(16),
            MaxRetries = 5,
            Mode = RetryMode.Exponential
         }
    };
    var client = new SecretClient(new Uri(endpoint), credential, options);
    
    KeyVaultSecret secret = client.GetSecret("<mySecret>");
    ```

### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-security-keyvault-keys</artifactId>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.1.5</version>
    </dependency>
    ```

1. Authenticate using `azure-identity` and get the Azure Key Vault endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.

    ```java
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-managed identity
    // DefaultAzureCredential credential = new DefaultAzureCredentialBuilder().build();

    // for user-assigned managed identity
    // DefaultAzureCredential credential = new DefaultAzureCredentialBuilder()
    //     .managedIdentityClientId(System.getenv("AZURE_KEYVAULT_CLIENTID"))
    //     .build();

    // for service principal
    // ClientSecretCredential credential = new ClientSecretCredentialBuilder()
    //   .clientId(System.getenv("AZURE_KEYVAULT_CLIENTID"))
    //   .clientSecret(System.getenv("AZURE_KEYVAULT_CLIENTSECRET"))
    //   .tenantId(System.getenv("AZURE_KEYVAULT_TENANTID"))
    //   .build();

    String url = System.getenv("AZURE_KEYVAULT_RESOURCEENDPOINT");
    KeyClient keyClient = new KeyClientBuilder()
        .vaultUrl(url)
        .credential(credential)
        .buildClient();
    ```

### [Spring Boot](#tab/springBoot)

To set up your Spring application, see [Connect Azure Spring Apps to Key Vault using managed identities](../spring-apps/basic-standard/tutorial-managed-identities-key-vault.md?tabs=system-assigned-managed-identity). Two sets of configuration properties are added to Spring Apps by Service Connector, according to Spring Cloud Azure version below 4.0 and above 4.0. For more information, see [Migration Guide for 4.0](https://microsoft.github.io/spring-cloud-azure/current/reference/html/appendix.html#configuration-spring-cloud-azure-starter-keyvault-secrets).

### [Python](#tab/python)

1. Install dependencies.

    ```bash
    pip install azure-keyvault-keys azure-identity
    ```

1. Authenticate using `azure-identity` and get the Azure Key Vault endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.

    ```python
    import os
    from azure.identity import ManagedIdentityCredential, ClientSecretCredential
    from azure.keyvault.keys import KeyClient

    # Uncomment the following lines corresponding to the authentication type you want to use.
    # system-assigned managed identity
    # cred = ManagedIdentityCredential()
    
    # user-assigned managed identity
    # managed_identity_client_id = os.getenv('AZURE_KEYVAULT_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)
    
    # service principal
    # tenant_id = os.getenv('AZURE_KEYVAULT_TENANTID')
    # client_id = os.getenv('AZURE_KEYVAULT_CLIENTID')
    # client_secret = os.getenv('AZURE_KEYVAULT_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)

    VAULT_URL = os.environ["AZURE_KEYVAULT_RESOURCEENDPOINT"]
    client = KeyClient(vault_url=VAULT_URL, credential=cred)
    ```

### [Node.js](#tab/nodejs)

1. Install dependencies.

    ```bash
    npm install @azure/identity
    npm install @azure/keyvault-secrets
    ```

1. Authenticate using `@azure/identity` and get the Azure Key Vault endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.

    ```javascript
    import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
    const { SecretClient } = require("@azure/keyvault-secrets");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-assigned managed identity
    // const credential = new DefaultAzureCredential();
    
    // for user-assigned managed identity
    // const clientId = process.env.AZURE_KEYVAULT_CLIENTID;
    // const credential = new DefaultAzureCredential({
    //     managedIdentityClientId: clientId
    // });
    
    // for service principal
    // const tenantId = process.env.AZURE_KEYVAULT_TENANTID;
    // const clientId = process.env.AZURE_KEYVAULT_CLIENTID;
    // const clientSecret = process.env.AZURE_KEYVAULT_CLIENTSECRET;
    // const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

    const url = process.env.AZURE_KEYVAULT_RESOURCEENDPOINT;

    const client = new SecretClient(url, credential);
    ```

### [Other](#tab/none)
For other languages, you can use the connection information that Service Connector sets to the environment variables to connect to Azure Key Vault. For environment variable details, see [Integrate Azure Key Vault with Service Connector](how-to-integrate-key-vault.md).

### User-assigned managed identity

#### Spring Boot client type

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| azure.keyvault.uri | Your Key Vault endpoint URL | `"https://<vault-name>.vault.azure.net/"` |
| azure.keyvault.client-id | Your Client ID | `<client-ID>` |
| azure.keyvault.scope | Your Azure RBAC scope | `https://management.azure.com/.default` |
| spring.cloud.azure.keyvault.secret.credential.managed-identity-enabled | Whether to enable managed identity for Spring Cloud Azure version 4.0 and above | `true` |
| spring.cloud.azure.keyvault.secret.endpoint | Your Key Vault endpoint URL for Spring Cloud Azure version 4.0 and above | `"https://<vault-name>.vault.azure.net/"` |
| spring.cloud.azure.keyvault.secret.credential.client-id | Your Client ID for Spring Cloud Azure version 4.0 and above | `<client-ID>` |

#### Other client types

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| AZURE_KEYVAULT_SCOPE | Your Azure RBAC scope | `https://management.azure.com/.default` |
| AZURE_KEYVAULT_RESOURCEENDPOINT | Your Key Vault endpoint | `https://<vault-name>.vault.azure.net/` |
| AZURE_KEYVAULT_CLIENTID | Your Client ID | `<client-ID>` |

#### Sample code

To connect to Azure Key Vault using a user-assigned managed identity:

### [.NET](#tab/dotnet)

1. Install dependencies.

    ```bash
    dotnet add package Azure.Identity
    dotnet add package Azure.Security.KeyVault.Secrets
    ```

1. Authenticate using `Azure.Identity` and get the Azure Key Vault endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.

    ```csharp
    using Azure.Identity;
    using Azure.Security.KeyVault.Secrets;
    using Azure.Core;
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // system-assigned managed identity
    // var credential = new DefaultAzureCredential();
    
    // user-assigned managed identity
    // var credential = new DefaultAzureCredential(
    //     new DefaultAzureCredentialOptions
    //     {
    //         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_KEYVAULT_CLIENTID");
    //     });
    
    // service principal 
    // var tenantId = Environment.GetEnvironmentVariable("AZURE_KEYVAULT_TENANTID");
    // var clientId = Environment.GetEnvironmentVariable("AZURE_KEYVAULT_CLIENTID");
    // var clientSecret = Environment.GetEnvironmentVariable("AZURE_KEYVAULT_CLIENTSECRET");
    // var credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

    string endpoint = Environment.GetEnvironmentVariable("AZURE_KEYVAULT_RESOURCEENDPOINT");
    SecretClientOptions options = new SecretClientOptions()
    {
        Retry =
        {
            Delay= TimeSpan.FromSeconds(2),
            MaxDelay = TimeSpan.FromSeconds(16),
            MaxRetries = 5,
            Mode = RetryMode.Exponential
         }
    };
    var client = new SecretClient(new Uri(endpoint), credential, options);
    
    KeyVaultSecret secret = client.GetSecret("<mySecret>");
    ```

### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-security-keyvault-keys</artifactId>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.1.5</version>
    </dependency>
    ```

1. Authenticate using `azure-identity` and get the Azure Key Vault endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.

    ```java
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-managed identity
    // DefaultAzureCredential credential = new DefaultAzureCredentialBuilder().build();

    // for user-assigned managed identity
    // DefaultAzureCredential credential = new DefaultAzureCredentialBuilder()
    //     .managedIdentityClientId(System.getenv("AZURE_KEYVAULT_CLIENTID"))
    //     .build();

    // for service principal
    // ClientSecretCredential credential = new ClientSecretCredentialBuilder()
    //   .clientId(System.getenv("AZURE_KEYVAULT_CLIENTID"))
    //   .clientSecret(System.getenv("AZURE_KEYVAULT_CLIENTSECRET"))
    //   .tenantId(System.getenv("AZURE_KEYVAULT_TENANTID"))
    //   .build();

    String url = System.getenv("AZURE_KEYVAULT_RESOURCEENDPOINT");
    KeyClient keyClient = new KeyClientBuilder()
        .vaultUrl(url)
        .credential(credential)
        .buildClient();
    ```

### [Spring Boot](#tab/springBoot)

To set up your Spring application, see [Connect Azure Spring Apps to Key Vault using managed identities](../spring-apps/basic-standard/tutorial-managed-identities-key-vault.md?tabs=system-assigned-managed-identity). Two sets of configuration properties are added to Spring Apps by Service Connector, according to Spring Cloud Azure version below 4.0 and above 4.0. For more information, see [Migration Guide for 4.0](https://microsoft.github.io/spring-cloud-azure/current/reference/html/appendix.html#configuration-spring-cloud-azure-starter-keyvault-secrets).

### [Python](#tab/python)

1. Install dependencies.

    ```bash
    pip install azure-keyvault-keys azure-identity
    ```

1. Authenticate using `azure-identity` and get the Azure Key Vault endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.

    ```python
    import os
    from azure.identity import ManagedIdentityCredential, ClientSecretCredential
    from azure.keyvault.keys import KeyClient

    # Uncomment the following lines corresponding to the authentication type you want to use.
    # system-assigned managed identity
    # cred = ManagedIdentityCredential()
    
    # user-assigned managed identity
    # managed_identity_client_id = os.getenv('AZURE_KEYVAULT_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)
    
    # service principal
    # tenant_id = os.getenv('AZURE_KEYVAULT_TENANTID')
    # client_id = os.getenv('AZURE_KEYVAULT_CLIENTID')
    # client_secret = os.getenv('AZURE_KEYVAULT_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)

    VAULT_URL = os.environ["AZURE_KEYVAULT_RESOURCEENDPOINT"]
    client = KeyClient(vault_url=VAULT_URL, credential=cred)
    ```

### [Node.js](#tab/nodejs)

1. Install dependencies.

    ```bash
    npm install @azure/identity
    npm install @azure/keyvault-secrets
    ```

1. Authenticate using `@azure/identity` and get the Azure Key Vault endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.

    ```javascript
    import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
    const { SecretClient } = require("@azure/keyvault-secrets");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-assigned managed identity
    // const credential = new DefaultAzureCredential();
    
    // for user-assigned managed identity
    // const clientId = process.env.AZURE_KEYVAULT_CLIENTID;
    // const credential = new DefaultAzureCredential({
    //     managedIdentityClientId: clientId
    // });
    
    // for service principal
    // const tenantId = process.env.AZURE_KEYVAULT_TENANTID;
    // const clientId = process.env.AZURE_KEYVAULT_CLIENTID;
    // const clientSecret = process.env.AZURE_KEYVAULT_CLIENTSECRET;
    // const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

    const url = process.env.AZURE_KEYVAULT_RESOURCEENDPOINT;

    const client = new SecretClient(url, credential);
    ```

### [Other](#tab/none)
For other languages, you can use the connection information that Service Connector sets to the environment variables to connect to Azure Key Vault. For environment variable details, see [Integrate Azure Key Vault with Service Connector](how-to-integrate-key-vault.md).

### Service principal

#### Spring Boot client type

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| azure.keyvault.uri | Your Key Vault endpoint URL | `"https://<vault-name>.vault.azure.net/"` |
| azure.keyvault.client-id | Your Client ID | `<client-ID>` |
| azure.keyvault.client-key | Your Client secret | `<client-secret>` |
| azure.keyvault.tenant-id | Your Tenant ID | `<tenant-id>` |
| azure.keyvault.scope | Your Azure RBAC scope | `https://management.azure.com/.default` |
| spring.cloud.azure.keyvault.secret.endpoint | Your Key Vault endpoint URL for Spring Cloud Azure version 4.0 and above | `"https://<vault-name>.vault.azure.net/"` |
| spring.cloud.azure.keyvault.secret.credential.client-id | Your Client ID for Spring Cloud Azure version 4.0 and above | `<client-ID>` |
| spring.cloud.azure.keyvault.secret.credential.client-secret | Your Client secret for Spring Cloud Azure version 4.0 and above | `<client-secret>` |
| spring.cloud.azure.keyvault.secret.profile.tenant-id | Your Tenant ID for Spring Cloud Azure version 4.0 and above | `<tenant-id>` |

#### Other client types

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| AZURE_KEYVAULT_SCOPE | Your Azure RBAC scope | `https://management.azure.com/.default` |
| AZURE_KEYVAULT_RESOURCEENDPOINT | Your Key Vault endpoint | `https://<vault-name>.vault.azure.net/` |
| AZURE_KEYVAULT_CLIENTID | Your Client ID | `<client-ID>` |
| AZURE_KEYVAULT_CLIENTSECRET | Your Client secret | `<client-secret>` |
| AZURE_KEYVAULT_TENANTID | Your Tenant ID | `<tenant-id>` |

#### Sample code

To connect to Azure Key Vault using a service principal:

### [.NET](#tab/dotnet)

1. Install dependencies.

    ```bash
    dotnet add package Azure.Identity
    dotnet add package Azure.Security.KeyVault.Secrets
    ```

1. Authenticate using `Azure.Identity` and get the Azure Key Vault endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.

    ```csharp
    using Azure.Identity;
    using Azure.Security.KeyVault.Secrets;
    using Azure.Core;
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // system-assigned managed identity
    // var credential = new DefaultAzureCredential();
    
    // user-assigned managed identity
    // var credential = new DefaultAzureCredential(
    //     new DefaultAzureCredentialOptions
    //     {
    //         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_KEYVAULT_CLIENTID");
    //     });
    
    // service principal 
    // var tenantId = Environment.GetEnvironmentVariable("AZURE_KEYVAULT_TENANTID");
    // var clientId = Environment.GetEnvironmentVariable("AZURE_KEYVAULT_CLIENTID");
    // var clientSecret = Environment.GetEnvironmentVariable("AZURE_KEYVAULT_CLIENTSECRET");
    // var credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

    string endpoint = Environment.GetEnvironmentVariable("AZURE_KEYVAULT_RESOURCEENDPOINT");
    SecretClientOptions options = new SecretClientOptions()
    {
        Retry =
        {
            Delay= TimeSpan.FromSeconds(2),
            MaxDelay = TimeSpan.FromSeconds(16),
            MaxRetries = 5,
            Mode = RetryMode.Exponential
         }
    };
    var client = new SecretClient(new Uri(endpoint), credential, options);
    
    KeyVaultSecret secret = client.GetSecret("<mySecret>");
    ```

### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-security-keyvault-keys</artifactId>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.1.5</version>
    </dependency>
    ```

1. Authenticate using `azure-identity` and get the Azure Key Vault endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.

    ```java
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-managed identity
    // DefaultAzureCredential credential = new DefaultAzureCredentialBuilder().build();

    // for user-assigned managed identity
    // DefaultAzureCredential credential = new DefaultAzureCredentialBuilder()
    //     .managedIdentityClientId(System.getenv("AZURE_KEYVAULT_CLIENTID"))
    //     .build();

    // for service principal
    // ClientSecretCredential credential = new ClientSecretCredentialBuilder()
    //   .clientId(System.getenv("AZURE_KEYVAULT_CLIENTID"))
    //   .clientSecret(System.getenv("AZURE_KEYVAULT_CLIENTSECRET"))
    //   .tenantId(System.getenv("AZURE_KEYVAULT_TENANTID"))
    //   .build();

    String url = System.getenv("AZURE_KEYVAULT_RESOURCEENDPOINT");
    KeyClient keyClient = new KeyClientBuilder()
        .vaultUrl(url)
        .credential(credential)
        .buildClient();
    ```

### [Spring Boot](#tab/springBoot)

To set up your Spring application, see [Connect Azure Spring Apps to Key Vault using managed identities](../spring-apps/basic-standard/tutorial-managed-identities-key-vault.md?tabs=system-assigned-managed-identity). Two sets of configuration properties are added to Spring Apps by Service Connector, according to Spring Cloud Azure version below 4.0 and above 4.0. For more information, see [Migration Guide for 4.0](https://microsoft.github.io/spring-cloud-azure/current/reference/html/appendix.html#configuration-spring-cloud-azure-starter-keyvault-secrets).

### [Python](#tab/python)

1. Install dependencies.

    ```bash
    pip install azure-keyvault-keys azure-identity
    ```

1. Authenticate using `azure-identity` and get the Azure Key Vault endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.

    ```python
    import os
    from azure.identity import ManagedIdentityCredential, ClientSecretCredential
    from azure.keyvault.keys import KeyClient

    # Uncomment the following lines corresponding to the authentication type you want to use.
    # system-assigned managed identity
    # cred = ManagedIdentityCredential()
    
    # user-assigned managed identity
    # managed_identity_client_id = os.getenv('AZURE_KEYVAULT_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)
    
    # service principal
    # tenant_id = os.getenv('AZURE_KEYVAULT_TENANTID')
    # client_id = os.getenv('AZURE_KEYVAULT_CLIENTID')
    # client_secret = os.getenv('AZURE_KEYVAULT_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)

    VAULT_URL = os.environ["AZURE_KEYVAULT_RESOURCEENDPOINT"]
    client = KeyClient(vault_url=VAULT_URL, credential=cred)
    ```

### [Node.js](#tab/nodejs)

1. Install dependencies.

    ```bash
    npm install @azure/identity
    npm install @azure/keyvault-secrets
    ```

1. Authenticate using `@azure/identity` and get the Azure Key Vault endpoint from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.

    ```javascript
    import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
    const { SecretClient } = require("@azure/keyvault-secrets");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system-assigned managed identity
    // const credential = new DefaultAzureCredential();
    
    // for user-assigned managed identity
    // const clientId = process.env.AZURE_KEYVAULT_CLIENTID;
    // const credential = new DefaultAzureCredential({
    //     managedIdentityClientId: clientId
    // });
    
    // for service principal
    // const tenantId = process.env.AZURE_KEYVAULT_TENANTID;
    // const clientId = process.env.AZURE_KEYVAULT_CLIENTID;
    // const clientSecret = process.env.AZURE_KEYVAULT_CLIENTSECRET;
    // const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

    const url = process.env.AZURE_KEYVAULT_RESOURCEENDPOINT;

    const client = new SecretClient(url, credential);
    ```

### [Other](#tab/none)
For other languages, you can use the connection information that Service Connector sets to the environment variables to connect to Azure Key Vault. For environment variable details, see [Integrate Azure Key Vault with Service Connector](how-to-integrate-key-vault.md).

## Next step

> 
> [Learn about Service Connector concepts](concept-service-connector-internals.md)
