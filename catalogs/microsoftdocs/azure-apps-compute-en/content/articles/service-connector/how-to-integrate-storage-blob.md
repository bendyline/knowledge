---
title: Integrate Azure Blob Storage with Service Connector
description: Learn how to integrate Azure Blob Storage into your application with Service Connector by using the supported authentication methods and clients.
author: maud-lv
ms.author: malev
ms.service: service-connector
ms.topic: how-to
ms.date: 02/03/2026
---

# Integrate Azure Blob Storage with Service Connector

In this article, we cover the supported authentication methods and clients that you can use to connect your apps to Azure Blob Storage using Service Connector. For each supported method, we provide sample code and describe the default environment variable names, values, and configuration obtained when creating a service connection.

## Supported compute services

Service Connector can be used to connect the following compute services to Azure Blob Storage:

- Azure App Service
- Azure Functions
- Azure Kubernetes Service (AKS)
- Azure Spring Apps

## Supported authentication types and client types

The following table shows which combinations of authentication methods and clients are supported for connecting your compute services to Azure Blob Storage using Service Connector. A *Yes* indicates that the combination is supported, while a *No* indicates that it isn't supported.

| Client type | System-assigned managed identity | User-assigned managed identity | Secret / connection string | Service principal |
| --- | --- | --- | --- | --- |
| .NET | Yes | Yes | Yes | Yes |
| Java | Yes | Yes | Yes | Yes |
| Java - Spring Boot | Yes | Yes | Yes | Yes |
| Node.js | Yes | Yes | Yes | Yes |
| Python | Yes | Yes | Yes | Yes |
| Go | Yes | Yes | Yes | Yes |
| None | Yes | Yes | Yes | Yes |

## Default environment variable names or application properties and sample code

Reference the connection details and sample code in the following tables, according to your connection's authentication type and client type, to connect compute services to Azure Blob Storage. You can learn more about [Service Connector environment variable naming convention](concept-service-connector-internals.md).

### System-assigned managed identity

#### SpringBoot client

Authenticating with a system-assigned managed identity is only available for Spring Cloud Azure version 4.0 or higher.

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| spring.cloud.azure.storage.blob.credential.managed-identity-enabled | Whether to enable managed identity | `True` |
| spring.cloud.azure.storage.blob.account-name | Name for the storage account | `storage-account-name` |
| spring.cloud.azure.storage.blob.endpoint | Blob Storage endpoint | `https://<storage-account-name>.blob.core.windows.net/` |

#### Other clients

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| AZURE_STORAGEBLOB_RESOURCEENDPOINT | Blob Storage endpoint | `https://<storage-account-name>.blob.core.windows.net/` |

#### Sample code

To connect to Azure Blob Storage using a system-assigned managed identity, refer to the following steps and sample code.


### [.NET](#tab/dotnet)

You can use [`azure-identity`](https://www.nuget.org/packages/Azure.Identity/) to authenticate via managed identity or service principal. Get the Azure Blob Storage endpoint url from the environment variable added by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

Install dependencies
```bash
dotnet add package Azure.Identity
```

Here's sample code to connect to Blob storage using managed identity or service principal.

```csharp
using Azure.Identity;
using Azure.Storage.Blobs;

// get Blob endpoint
var blobEndpoint = Environment.GetEnvironmentVariable("AZURE_STORAGEBLOB_RESOURCEENDPOINT");

// Uncomment the following lines corresponding to the authentication type you want to use.
// system-assigned managed identity
// var credential = new DefaultAzureCredential();

// user-assigned managed identity
// var credential = new DefaultAzureCredential(
//     new DefaultAzureCredentialOptions
//     {
//         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_STORAGEBLOB_CLIENTID");
//     });

// service principal 
// var tenantId = Environment.GetEnvironmentVariable("AZURE_STORAGEBLOB_TENANTID");
// var clientId = Environment.GetEnvironmentVariable("AZURE_STORAGEBLOB_CLIENTID");
// var clientSecret = Environment.GetEnvironmentVariable("AZURE_STORAGEBLOB_CLIENTSECRET");
// var credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

var blobServiceClient = new BlobServiceClient(
        new Uri(blobEndpoint),
        credential);
```

### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-storage-blob</artifactId>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.1.5</version>
    </dependency>
    ```
1. Authenticate using `azure-identity` and get the endpoint URL from the environment variable added by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

    ```java
    String url = System.getenv("AZURE_STORAGEBLOB_RESOURCEENDPOINT");  

    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system managed identity
    // DefaultAzureCredential defaultCredential = new DefaultAzureCredentialBuilder().build();

    // for user assigned managed identity
    // DefaultAzureCredential defaultCredential = new DefaultAzureCredentialBuilder()
    //     .managedIdentityClientId(System.getenv("AZURE_STORAGEBLOB_CLIENTID"))
    //     .build();

    // for service principal
    // ClientSecretCredential defaultCredential = new ClientSecretCredentialBuilder()
    //   .clientId(System.getenv("<AZURE_STORAGEBLOB_CLIENTID>"))
    //   .clientSecret(System.getenv("<AZURE_STORAGEBLOB_CLIENTSECRET>"))
    //   .tenantId(System.getenv("<AZURE_STORAGEBLOB_TENANTID>"))
    //   .build();

    BlobServiceClient blobServiceClient = new BlobServiceClientBuilder()
        .endpoint(url)
        .credential(defaultCredential)
        .buildClient();
    ```

### [Spring Boot](#tab/springBoot)
Refer to [Upload a file to an Azure Blob Storage](https://learn.microsoft.com/azure/developer/java/spring-framework/configure-spring-boot-starter-java-app-with-azure-storage?toc=%2Fazure%2Fstorage%2Fblobs%2Ftoc.json) and set up your Spring application. The configuration properties (of Spring Cloud Azure 4.0 and above) are added to Spring Apps by Service Connector. For more information about configuration properties, see [Azure Storage Blob Properties](https://microsoft.github.io/spring-cloud-azure/current/reference/html/appendix.html#azure_storage_blob_proeprties).

### [Python](#tab/python)
1. Install dependencies
   ```bash
   pip install azure-identity
   pip install azure-storage-blob
   ```
1. Authenticate using `azure-identity` library and get the endpoint URL from the environment variable added by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

   ```python
   from azure.identity import ManagedIdentityCredential, ClientSecretCredential
   from azure.storage.blob import BlobServiceClient
   import os
   
   account_url = os.getenv('AZURE_STORAGEBLOB_RESOURCEENDPOINT')
    
   # Uncomment the following lines corresponding to the authentication type you want to use.
   # system assigned managed identity
   # cred = ManagedIdentityCredential()

   # user assigned managed identity
   # managed_identity_client_id = os.getenv('AZURE_STORAGEBLOB_CLIENTID')
   # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)

   # service principal
   # tenant_id = os.getenv('AZURE_STORAGEBLOB_TENANTID')
   # client_id = os.getenv('AZURE_STORAGEBLOB_CLIENTID')
   # client_secret = os.getenv('AZURE_STORAGEBLOB_CLIENTSECRET')
   # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret) 
   
   blob_service_client = BlobServiceClient(account_url, credential=cred)
   ```

### [Django](#tab/django)
1. Install dependencies.
   ```bash
   pip install azure-identity
   pip install django-storages[azure]
   ```
1. Authenticate via `azure-identity` library. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.
   

   ```python
   from azure.identity import ManagedIdentityCredential, ClientSecretCredential
   import os
    
   # Uncomment the following lines corresponding to the authentication type you want to use.
   # system assigned managed identity
   # cred = ManagedIdentityCredential()

   # user assigned managed identity
   # managed_identity_client_id = os.getenv('AZURE_STORAGEBLOB_CLIENTID')
   # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)
    
   # service principal
   # tenant_id = os.getenv('AZURE_STORAGEBLOB_TENANTID')
   # client_id = os.getenv('AZURE_STORAGEBLOB_CLIENTID')
   # client_secret = os.getenv('AZURE_STORAGEBLOB_CLIENTSECRET')
   # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)
   ```

1. In setting file, add following lines. For more information, see [django-storages[azure]](https://django-storages.readthedocs.io/en/latest/backends/azure.html).
   ```python
   # in your setting file, eg. settings.py
   AZURE_CUSTOM_DOMAIN = os.getenv('AZURE_STORAGEBLOB_RESOURCEENDPOINT')
   AZURE_ACCOUNT_NAME = AZURE_CUSTOM_DOMAIN.split('.')[0].removeprefix('https://')    
   AZURE_TOKEN_CREDENTIAL = cred # this is the cred acquired from above step.
   
   ```

### [Go](#tab/go)

1. Install dependencies.
   ```bash
   go get "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
   go get "github.com/Azure/azure-sdk-for-go/sdk/storage/azblob"
   ```
1. In code, authenticate by using the `azidentity` library. Get the Azure Blob Storage endpoint URL from the environment variable added by Service Connector. In the following code, uncomment the section for your authentication type.

      ```go
      import (
        "context"
        
        "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
        "github.com/Azure/azure-sdk-for-go/sdk/storage/azblob"
      )
      
      
      func main() {
    
        account_endpoint = os.Getenv("AZURE_STORAGEBLOB_RESOURCEENDPOINT")
        
        // Uncomment the following lines corresponding to the authentication type you want to use.
        // for system-assigned managed identity
        // cred, err := azidentity.NewDefaultAzureCredential(nil)
    
        // for user-assigned managed identity
        // clientid := os.Getenv("AZURE_STORAGEBLOB_CLIENTID")
        // azidentity.ManagedIdentityCredentialOptions.ID := clientid
        // options := &azidentity.ManagedIdentityCredentialOptions{ID: clientid}
        // cred, err := azidentity.NewManagedIdentityCredential(options)
      
        // for service principal
        // clientid := os.Getenv("AZURE_STORAGEBLOB_CLIENTID")
        // tenantid := os.Getenv("AZURE_STORAGEBLOB_TENANTID")
        // clientsecret := os.Getenv("AZURE_STORAGEBLOB_CLIENTSECRET")
        // cred, err := azidentity.NewClientSecretCredential(tenantid, clientid, clientsecret, &azidentity.ClientSecretCredentialOptions{})
    
        if err != nil {
          // error handling
        }
      
        client, err := azblob.NewBlobServiceClient(account_endpoint, cred, nil)
      }
      ```

### [NodeJS](#tab/nodejs)
1. Install dependencies
   ```bash
   npm install --save @azure/identity
   npm install @azure/storage-blob
   ```
1. Get the Azure Blob Storage endpoint URL from the environment variable added by Service Connector. Authenticate by using the `@azure/identity` library. In the following code, uncomment the section for your authentication type.

   ```javascript
   import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
   
   const { BlobServiceClient } = require("@azure/storage-blob");
   
   const account_url = process.env.AZURE_STORAGEBLOB_RESOURCEENDPOINT;

   // Uncomment the following lines corresponding to the authentication type you want to use.
   // for system assigned managed identity
   // const credential = new DefaultAzureCredential();

   // for user assigned managed identity
   // const clientId = process.env.AZURE_STORAGEBLOB_CLIENTID;
   // const credential = new DefaultAzureCredential({
   //     managedIdentityClientId: clientId
   // });

   // for service principal
   // const tenantId = process.env.AZURE_STORAGEBLOB_TENANTID;
   // const clientId = process.env.AZURE_STORAGEBLOB_CLIENTID;
   // const clientSecret = process.env.AZURE_STORAGEBLOB_CLIENTSECRET;
   // const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
   
   const blobServiceClient = new BlobServiceClient(account_url, credential);
   ```

### [Other](#tab/none)
For other languages, you can use the Azure Blob Storage account url and other properties that Service Connector sets to the environment variables to connect to Azure Blob storage. For environment variable details, see [Integrate Azure Blob Storage with Service Connector](how-to-integrate-storage-blob.md).


### User-assigned managed identity

#### SpringBoot client

Authenticating with a user-assigned managed identity is only available for Spring Cloud Azure version 4.0 or higher.

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| spring.cloud.azure.storage.blob.credential.managed-identity-enabled | Whether to enable managed identity | `True` |
| spring.cloud.azure.storage.blob.account-name | Name for the storage account | `storage-account-name` |
| spring.cloud.azure.storage.blob.endpoint | Blob Storage endpoint | `https://<storage-account-name>.blob.core.windows.net/` |
| spring.cloud.azure.storage.blob.credential.client-id | Client ID of the user-assigned managed identity | `00001111-aaaa-2222-bbbb-3333cccc4444` |

#### Other clients

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| AZURE_STORAGEBLOB_RESOURCEENDPOINT | Blob Storage endpoint | `https://<storage-account-name>.blob.core.windows.net/` |
| AZURE_STORAGEBLOB_CLIENTID | Your client ID | `<client-ID>` |

#### Sample code

To connect to Azure Blob Storage using a user-assigned managed identity, refer to the following steps and example code.



### [.NET](#tab/dotnet)

You can use [`azure-identity`](https://www.nuget.org/packages/Azure.Identity/) to authenticate via managed identity or service principal. Get the Azure Blob Storage endpoint url from the environment variable added by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

Install dependencies
```bash
dotnet add package Azure.Identity
```

Here's sample code to connect to Blob storage using managed identity or service principal.

```csharp
using Azure.Identity;
using Azure.Storage.Blobs;

// get Blob endpoint
var blobEndpoint = Environment.GetEnvironmentVariable("AZURE_STORAGEBLOB_RESOURCEENDPOINT");

// Uncomment the following lines corresponding to the authentication type you want to use.
// system-assigned managed identity
// var credential = new DefaultAzureCredential();

// user-assigned managed identity
// var credential = new DefaultAzureCredential(
//     new DefaultAzureCredentialOptions
//     {
//         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_STORAGEBLOB_CLIENTID");
//     });

// service principal 
// var tenantId = Environment.GetEnvironmentVariable("AZURE_STORAGEBLOB_TENANTID");
// var clientId = Environment.GetEnvironmentVariable("AZURE_STORAGEBLOB_CLIENTID");
// var clientSecret = Environment.GetEnvironmentVariable("AZURE_STORAGEBLOB_CLIENTSECRET");
// var credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

var blobServiceClient = new BlobServiceClient(
        new Uri(blobEndpoint),
        credential);
```

### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-storage-blob</artifactId>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.1.5</version>
    </dependency>
    ```
1. Authenticate using `azure-identity` and get the endpoint URL from the environment variable added by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

    ```java
    String url = System.getenv("AZURE_STORAGEBLOB_RESOURCEENDPOINT");  

    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system managed identity
    // DefaultAzureCredential defaultCredential = new DefaultAzureCredentialBuilder().build();

    // for user assigned managed identity
    // DefaultAzureCredential defaultCredential = new DefaultAzureCredentialBuilder()
    //     .managedIdentityClientId(System.getenv("AZURE_STORAGEBLOB_CLIENTID"))
    //     .build();

    // for service principal
    // ClientSecretCredential defaultCredential = new ClientSecretCredentialBuilder()
    //   .clientId(System.getenv("<AZURE_STORAGEBLOB_CLIENTID>"))
    //   .clientSecret(System.getenv("<AZURE_STORAGEBLOB_CLIENTSECRET>"))
    //   .tenantId(System.getenv("<AZURE_STORAGEBLOB_TENANTID>"))
    //   .build();

    BlobServiceClient blobServiceClient = new BlobServiceClientBuilder()
        .endpoint(url)
        .credential(defaultCredential)
        .buildClient();
    ```

### [Spring Boot](#tab/springBoot)
Refer to [Upload a file to an Azure Blob Storage](https://learn.microsoft.com/azure/developer/java/spring-framework/configure-spring-boot-starter-java-app-with-azure-storage?toc=%2Fazure%2Fstorage%2Fblobs%2Ftoc.json) and set up your Spring application. The configuration properties (of Spring Cloud Azure 4.0 and above) are added to Spring Apps by Service Connector. For more information about configuration properties, see [Azure Storage Blob Properties](https://microsoft.github.io/spring-cloud-azure/current/reference/html/appendix.html#azure_storage_blob_proeprties).

### [Python](#tab/python)
1. Install dependencies
   ```bash
   pip install azure-identity
   pip install azure-storage-blob
   ```
1. Authenticate using `azure-identity` library and get the endpoint URL from the environment variable added by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

   ```python
   from azure.identity import ManagedIdentityCredential, ClientSecretCredential
   from azure.storage.blob import BlobServiceClient
   import os
   
   account_url = os.getenv('AZURE_STORAGEBLOB_RESOURCEENDPOINT')
    
   # Uncomment the following lines corresponding to the authentication type you want to use.
   # system assigned managed identity
   # cred = ManagedIdentityCredential()

   # user assigned managed identity
   # managed_identity_client_id = os.getenv('AZURE_STORAGEBLOB_CLIENTID')
   # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)

   # service principal
   # tenant_id = os.getenv('AZURE_STORAGEBLOB_TENANTID')
   # client_id = os.getenv('AZURE_STORAGEBLOB_CLIENTID')
   # client_secret = os.getenv('AZURE_STORAGEBLOB_CLIENTSECRET')
   # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret) 
   
   blob_service_client = BlobServiceClient(account_url, credential=cred)
   ```

### [Django](#tab/django)
1. Install dependencies.
   ```bash
   pip install azure-identity
   pip install django-storages[azure]
   ```
1. Authenticate via `azure-identity` library. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.
   

   ```python
   from azure.identity import ManagedIdentityCredential, ClientSecretCredential
   import os
    
   # Uncomment the following lines corresponding to the authentication type you want to use.
   # system assigned managed identity
   # cred = ManagedIdentityCredential()

   # user assigned managed identity
   # managed_identity_client_id = os.getenv('AZURE_STORAGEBLOB_CLIENTID')
   # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)
    
   # service principal
   # tenant_id = os.getenv('AZURE_STORAGEBLOB_TENANTID')
   # client_id = os.getenv('AZURE_STORAGEBLOB_CLIENTID')
   # client_secret = os.getenv('AZURE_STORAGEBLOB_CLIENTSECRET')
   # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)
   ```

1. In setting file, add following lines. For more information, see [django-storages[azure]](https://django-storages.readthedocs.io/en/latest/backends/azure.html).
   ```python
   # in your setting file, eg. settings.py
   AZURE_CUSTOM_DOMAIN = os.getenv('AZURE_STORAGEBLOB_RESOURCEENDPOINT')
   AZURE_ACCOUNT_NAME = AZURE_CUSTOM_DOMAIN.split('.')[0].removeprefix('https://')    
   AZURE_TOKEN_CREDENTIAL = cred # this is the cred acquired from above step.
   
   ```

### [Go](#tab/go)

1. Install dependencies.
   ```bash
   go get "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
   go get "github.com/Azure/azure-sdk-for-go/sdk/storage/azblob"
   ```
1. In code, authenticate by using the `azidentity` library. Get the Azure Blob Storage endpoint URL from the environment variable added by Service Connector. In the following code, uncomment the section for your authentication type.

      ```go
      import (
        "context"
        
        "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
        "github.com/Azure/azure-sdk-for-go/sdk/storage/azblob"
      )
      
      
      func main() {
    
        account_endpoint = os.Getenv("AZURE_STORAGEBLOB_RESOURCEENDPOINT")
        
        // Uncomment the following lines corresponding to the authentication type you want to use.
        // for system-assigned managed identity
        // cred, err := azidentity.NewDefaultAzureCredential(nil)
    
        // for user-assigned managed identity
        // clientid := os.Getenv("AZURE_STORAGEBLOB_CLIENTID")
        // azidentity.ManagedIdentityCredentialOptions.ID := clientid
        // options := &azidentity.ManagedIdentityCredentialOptions{ID: clientid}
        // cred, err := azidentity.NewManagedIdentityCredential(options)
      
        // for service principal
        // clientid := os.Getenv("AZURE_STORAGEBLOB_CLIENTID")
        // tenantid := os.Getenv("AZURE_STORAGEBLOB_TENANTID")
        // clientsecret := os.Getenv("AZURE_STORAGEBLOB_CLIENTSECRET")
        // cred, err := azidentity.NewClientSecretCredential(tenantid, clientid, clientsecret, &azidentity.ClientSecretCredentialOptions{})
    
        if err != nil {
          // error handling
        }
      
        client, err := azblob.NewBlobServiceClient(account_endpoint, cred, nil)
      }
      ```

### [NodeJS](#tab/nodejs)
1. Install dependencies
   ```bash
   npm install --save @azure/identity
   npm install @azure/storage-blob
   ```
1. Get the Azure Blob Storage endpoint URL from the environment variable added by Service Connector. Authenticate by using the `@azure/identity` library. In the following code, uncomment the section for your authentication type.

   ```javascript
   import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
   
   const { BlobServiceClient } = require("@azure/storage-blob");
   
   const account_url = process.env.AZURE_STORAGEBLOB_RESOURCEENDPOINT;

   // Uncomment the following lines corresponding to the authentication type you want to use.
   // for system assigned managed identity
   // const credential = new DefaultAzureCredential();

   // for user assigned managed identity
   // const clientId = process.env.AZURE_STORAGEBLOB_CLIENTID;
   // const credential = new DefaultAzureCredential({
   //     managedIdentityClientId: clientId
   // });

   // for service principal
   // const tenantId = process.env.AZURE_STORAGEBLOB_TENANTID;
   // const clientId = process.env.AZURE_STORAGEBLOB_CLIENTID;
   // const clientSecret = process.env.AZURE_STORAGEBLOB_CLIENTSECRET;
   // const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
   
   const blobServiceClient = new BlobServiceClient(account_url, credential);
   ```

### [Other](#tab/none)
For other languages, you can use the Azure Blob Storage account url and other properties that Service Connector sets to the environment variables to connect to Azure Blob storage. For environment variable details, see [Integrate Azure Blob Storage with Service Connector](how-to-integrate-storage-blob.md).


### Connection string

> **Warning:**
> Microsoft recommends that you use the most secure authentication flow available. The authentication flow described in this procedure requires a high degree of trust in the application, and carries risks that aren't present in other flows. You should only use this flow when other more secure flows, such as managed identities, aren't viable.

#### SpringBoot client

| Application properties | Description | Example value |
| --- | --- | --- |
| azure.storage.account-name | Your Blob storage-account-name | `<storage-account-name>` |
| azure.storage.account-key | Your Blob Storage account key | `<account-key>` |
| azure.storage.blob-endpoint | Your Blob Storage endpoint | `https://<storage-account-name>.blob.core.windows.net/` |
| spring.cloud.azure.storage.blob.account-name | Your Blob storage-account-name for Spring Cloud Azure version 4.0 or above | `<storage-account-name>` |
| spring.cloud.azure.storage.blob.account-key | Your Blob Storage account key for Spring Cloud Azure version 4.0 or above | `<account-key>` |
| spring.cloud.azure.storage.blob.endpoint | Your Blob Storage endpoint for Spring Cloud Azure version 4.0 or above | `https://<storage-account-name>.blob.core.windows.net/` |

#### Other clients

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| AZURE_STORAGEBLOB_CONNECTIONSTRING | Blob Storage connection string | `DefaultEndpointsProtocol=https;AccountName=<account name>;AccountKey=<account-key>;EndpointSuffix=core.windows.net` |

#### Sample code

To connect to Azure Blob Storage using a connection string, refer to the following steps and sample code.


### [.NET](#tab/dotnet)

Get the Azure Blob Storage connection string from the environment variable added by Service Connector.

Install dependencies
```bash
dotnet add package Azure.Storage.Blob
```

```csharp
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using System; 

// get Blob connection string
var connectionString = Environment.GetEnvironmentVariable("AZURE_STORAGEBLOB_CONNECTIONSTRING");

// Create a BlobServiceClient object 
var blobServiceClient = new BlobServiceClient(connectionString);
```

### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-storage-blob</artifactId>
    </dependency>
    ```
1. Get the connection string from the environment variable to connect to Azure Blob Storage:

    ```java
    String connectionStr = System.getenv("AZURE_STORAGEBLOB_CONNECTIONSTRING");
    BlobServiceClient blobServiceClient = new BlobServiceClientBuilder()
        .connectionString(connectionStr)
        .buildClient();
    ```

### [Spring Boot](#tab/springBoot)
Refer to [Upload a file to an Azure Blob Storage](https://learn.microsoft.com/azure/developer/java/spring-framework/configure-spring-boot-starter-java-app-with-azure-storage?toc=%2Fazure%2Fstorage%2Fblobs%2Ftoc.json) and set up your Spring application. The configuration properties are added to Spring Apps by Service Connector. Two sets of configuration properties are provided according to the version of Spring Cloud Azure (below 4.0 and above 4.0). For more information about library changes of Spring Cloud Azure, refer to [Spring Cloud Azure Migration Guide](https://microsoft.github.io/spring-cloud-azure/current/reference/html/appendix.html#_from_azure_spring_boot_starter_storage_to_spring_cloud_azure_starter_storage_blob).


### [Python](#tab/python)
1. Install dependencies
   ```bash
   pip install azure-storage-blob
   ```
1. Get the Azure Blob Storage connection string from the environment variable added by Service Connector.
   ```python
   from azure.storage.blob import BlobServiceClient
   import os
   
   connection_str = os.getenv('AZURE_STORAGEBLOB_CONNECTIONSTRING')

   blob_service_client = BlobServiceClient.from_connection_string(connection_str)
   ```

### [Django](#tab/django)
1. Install dependencies.
   ```bash
   pip install django-storages[azure]
   ```

1. Configure and set up the Azure Blob Storage backend in your Django settings file accordingly to your django version. For more information, see [django-storages[azure]](https://django-storages.readthedocs.io/en/latest/backends/azure.html#configuration-settings).

1. In setting file, add following lines.
   ```python
   # in your setting file, eg. settings.py
   AZURE_CONNECTION_STRING = os.getenv('AZURE_STORAGEBLOB_CONNECTIONSTRING')
   
   ```

### [Go](#tab/go)

1. Install dependencies.
   ```bash
   go get "github.com/Azure/azure-sdk-for-go/sdk/storage/azblob"
   ```
1. Get the Azure Blob Storage connection string from the environment variable added by Service Connector.
   ```go
   import (
     "context"

     "github.com/Azure/azure-sdk-for-go/sdk/storage/azblob"
   )
   
   
   func main() {

     connection_str = os.LookupEnv("AZURE_STORAGEBLOB_CONNECTIONSTRING")     
     client, err := azblob.NewClientFromConnectionString(connection_str, nil);
   }
   ```

### [NodeJS](#tab/nodejs)
1. Install dependencies
   ```bash
   npm install @azure/storage-blob
   ```
1. Get the Azure Blob Storage connection string from the environment variable added by Service Connector.
   ```javascript
   const { BlobServiceClient } = require("@azure/storage-blob");
   
   const connection_str = process.env.AZURE_STORAGEBLOB_CONNECTIONSTRING;
   const blobServiceClient = BlobServiceClient.fromConnectionString(connection_str);
   ```

### [Other](#tab/none)
For other languages, you can use the Azure Blob Storage account url and other properties that Service Connector sets to the environment variables to connect to Azure Blob Storage. For environment variable details, see [Integrate Azure Blob Storage with Service Connector](how-to-integrate-storage-blob.md).


### Service principal

#### SpringBoot client

Authenticating with a service principal is only available for Spring Cloud Azure version 4.0 or higher.

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| spring.cloud.azure.storage.blob.account-name | Name for the storage account | `storage-account-name` |
| spring.cloud.azure.storage.blob.endpoint | Blob Storage endpoint | `https://<storage-account-name>.blob.core.windows.net/` |
| spring.cloud.azure.storage.blob.credential.client-id | Client ID of the service principal | `00001111-aaaa-2222-bbbb-3333cccc4444` |
| spring.cloud.azure.storage.blob.credential.client-secret | Client secret to perform service principal authentication | `Aa1Bb~2Cc3.-Dd4Ee5Ff6Gg7Hh8Ii9_Jj0Kk1Ll2` |

#### Other clients

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| AZURE_STORAGEBLOB_RESOURCEENDPOINT | Blob Storage endpoint | `https://<storage-account-name>.blob.core.windows.net/` |
| AZURE_STORAGEBLOB_CLIENTID | Your client ID | `<client-ID>` |
| AZURE_STORAGEBLOB_CLIENTSECRET | Your client secret | `<client-secret>` |
| AZURE_STORAGEBLOB_TENANTID | Your tenant ID | `<tenant-ID>` |

#### Sample code

To connect to Azure Blob Storage using a service principal, refer to the following steps and sample code.



### [.NET](#tab/dotnet)

You can use [`azure-identity`](https://www.nuget.org/packages/Azure.Identity/) to authenticate via managed identity or service principal. Get the Azure Blob Storage endpoint url from the environment variable added by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

Install dependencies
```bash
dotnet add package Azure.Identity
```

Here's sample code to connect to Blob storage using managed identity or service principal.

```csharp
using Azure.Identity;
using Azure.Storage.Blobs;

// get Blob endpoint
var blobEndpoint = Environment.GetEnvironmentVariable("AZURE_STORAGEBLOB_RESOURCEENDPOINT");

// Uncomment the following lines corresponding to the authentication type you want to use.
// system-assigned managed identity
// var credential = new DefaultAzureCredential();

// user-assigned managed identity
// var credential = new DefaultAzureCredential(
//     new DefaultAzureCredentialOptions
//     {
//         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_STORAGEBLOB_CLIENTID");
//     });

// service principal 
// var tenantId = Environment.GetEnvironmentVariable("AZURE_STORAGEBLOB_TENANTID");
// var clientId = Environment.GetEnvironmentVariable("AZURE_STORAGEBLOB_CLIENTID");
// var clientSecret = Environment.GetEnvironmentVariable("AZURE_STORAGEBLOB_CLIENTSECRET");
// var credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

var blobServiceClient = new BlobServiceClient(
        new Uri(blobEndpoint),
        credential);
```

### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-storage-blob</artifactId>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.1.5</version>
    </dependency>
    ```
1. Authenticate using `azure-identity` and get the endpoint URL from the environment variable added by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

    ```java
    String url = System.getenv("AZURE_STORAGEBLOB_RESOURCEENDPOINT");  

    // Uncomment the following lines corresponding to the authentication type you want to use.
    // for system managed identity
    // DefaultAzureCredential defaultCredential = new DefaultAzureCredentialBuilder().build();

    // for user assigned managed identity
    // DefaultAzureCredential defaultCredential = new DefaultAzureCredentialBuilder()
    //     .managedIdentityClientId(System.getenv("AZURE_STORAGEBLOB_CLIENTID"))
    //     .build();

    // for service principal
    // ClientSecretCredential defaultCredential = new ClientSecretCredentialBuilder()
    //   .clientId(System.getenv("<AZURE_STORAGEBLOB_CLIENTID>"))
    //   .clientSecret(System.getenv("<AZURE_STORAGEBLOB_CLIENTSECRET>"))
    //   .tenantId(System.getenv("<AZURE_STORAGEBLOB_TENANTID>"))
    //   .build();

    BlobServiceClient blobServiceClient = new BlobServiceClientBuilder()
        .endpoint(url)
        .credential(defaultCredential)
        .buildClient();
    ```

### [Spring Boot](#tab/springBoot)
Refer to [Upload a file to an Azure Blob Storage](https://learn.microsoft.com/azure/developer/java/spring-framework/configure-spring-boot-starter-java-app-with-azure-storage?toc=%2Fazure%2Fstorage%2Fblobs%2Ftoc.json) and set up your Spring application. The configuration properties (of Spring Cloud Azure 4.0 and above) are added to Spring Apps by Service Connector. For more information about configuration properties, see [Azure Storage Blob Properties](https://microsoft.github.io/spring-cloud-azure/current/reference/html/appendix.html#azure_storage_blob_proeprties).

### [Python](#tab/python)
1. Install dependencies
   ```bash
   pip install azure-identity
   pip install azure-storage-blob
   ```
1. Authenticate using `azure-identity` library and get the endpoint URL from the environment variable added by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

   ```python
   from azure.identity import ManagedIdentityCredential, ClientSecretCredential
   from azure.storage.blob import BlobServiceClient
   import os
   
   account_url = os.getenv('AZURE_STORAGEBLOB_RESOURCEENDPOINT')
    
   # Uncomment the following lines corresponding to the authentication type you want to use.
   # system assigned managed identity
   # cred = ManagedIdentityCredential()

   # user assigned managed identity
   # managed_identity_client_id = os.getenv('AZURE_STORAGEBLOB_CLIENTID')
   # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)

   # service principal
   # tenant_id = os.getenv('AZURE_STORAGEBLOB_TENANTID')
   # client_id = os.getenv('AZURE_STORAGEBLOB_CLIENTID')
   # client_secret = os.getenv('AZURE_STORAGEBLOB_CLIENTSECRET')
   # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret) 
   
   blob_service_client = BlobServiceClient(account_url, credential=cred)
   ```

### [Django](#tab/django)
1. Install dependencies.
   ```bash
   pip install azure-identity
   pip install django-storages[azure]
   ```
1. Authenticate via `azure-identity` library. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.
   

   ```python
   from azure.identity import ManagedIdentityCredential, ClientSecretCredential
   import os
    
   # Uncomment the following lines corresponding to the authentication type you want to use.
   # system assigned managed identity
   # cred = ManagedIdentityCredential()

   # user assigned managed identity
   # managed_identity_client_id = os.getenv('AZURE_STORAGEBLOB_CLIENTID')
   # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)
    
   # service principal
   # tenant_id = os.getenv('AZURE_STORAGEBLOB_TENANTID')
   # client_id = os.getenv('AZURE_STORAGEBLOB_CLIENTID')
   # client_secret = os.getenv('AZURE_STORAGEBLOB_CLIENTSECRET')
   # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)
   ```

1. In setting file, add following lines. For more information, see [django-storages[azure]](https://django-storages.readthedocs.io/en/latest/backends/azure.html).
   ```python
   # in your setting file, eg. settings.py
   AZURE_CUSTOM_DOMAIN = os.getenv('AZURE_STORAGEBLOB_RESOURCEENDPOINT')
   AZURE_ACCOUNT_NAME = AZURE_CUSTOM_DOMAIN.split('.')[0].removeprefix('https://')    
   AZURE_TOKEN_CREDENTIAL = cred # this is the cred acquired from above step.
   
   ```

### [Go](#tab/go)

1. Install dependencies.
   ```bash
   go get "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
   go get "github.com/Azure/azure-sdk-for-go/sdk/storage/azblob"
   ```
1. In code, authenticate by using the `azidentity` library. Get the Azure Blob Storage endpoint URL from the environment variable added by Service Connector. In the following code, uncomment the section for your authentication type.

      ```go
      import (
        "context"
        
        "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
        "github.com/Azure/azure-sdk-for-go/sdk/storage/azblob"
      )
      
      
      func main() {
    
        account_endpoint = os.Getenv("AZURE_STORAGEBLOB_RESOURCEENDPOINT")
        
        // Uncomment the following lines corresponding to the authentication type you want to use.
        // for system-assigned managed identity
        // cred, err := azidentity.NewDefaultAzureCredential(nil)
    
        // for user-assigned managed identity
        // clientid := os.Getenv("AZURE_STORAGEBLOB_CLIENTID")
        // azidentity.ManagedIdentityCredentialOptions.ID := clientid
        // options := &azidentity.ManagedIdentityCredentialOptions{ID: clientid}
        // cred, err := azidentity.NewManagedIdentityCredential(options)
      
        // for service principal
        // clientid := os.Getenv("AZURE_STORAGEBLOB_CLIENTID")
        // tenantid := os.Getenv("AZURE_STORAGEBLOB_TENANTID")
        // clientsecret := os.Getenv("AZURE_STORAGEBLOB_CLIENTSECRET")
        // cred, err := azidentity.NewClientSecretCredential(tenantid, clientid, clientsecret, &azidentity.ClientSecretCredentialOptions{})
    
        if err != nil {
          // error handling
        }
      
        client, err := azblob.NewBlobServiceClient(account_endpoint, cred, nil)
      }
      ```

### [NodeJS](#tab/nodejs)
1. Install dependencies
   ```bash
   npm install --save @azure/identity
   npm install @azure/storage-blob
   ```
1. Get the Azure Blob Storage endpoint URL from the environment variable added by Service Connector. Authenticate by using the `@azure/identity` library. In the following code, uncomment the section for your authentication type.

   ```javascript
   import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
   
   const { BlobServiceClient } = require("@azure/storage-blob");
   
   const account_url = process.env.AZURE_STORAGEBLOB_RESOURCEENDPOINT;

   // Uncomment the following lines corresponding to the authentication type you want to use.
   // for system assigned managed identity
   // const credential = new DefaultAzureCredential();

   // for user assigned managed identity
   // const clientId = process.env.AZURE_STORAGEBLOB_CLIENTID;
   // const credential = new DefaultAzureCredential({
   //     managedIdentityClientId: clientId
   // });

   // for service principal
   // const tenantId = process.env.AZURE_STORAGEBLOB_TENANTID;
   // const clientId = process.env.AZURE_STORAGEBLOB_CLIENTID;
   // const clientSecret = process.env.AZURE_STORAGEBLOB_CLIENTSECRET;
   // const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
   
   const blobServiceClient = new BlobServiceClient(account_url, credential);
   ```

### [Other](#tab/none)
For other languages, you can use the Azure Blob Storage account url and other properties that Service Connector sets to the environment variables to connect to Azure Blob storage. For environment variable details, see [Integrate Azure Blob Storage with Service Connector](how-to-integrate-storage-blob.md).


## Next steps

Follow the tutorials to learn more about Service Connector.

> 
> [Learn about Service Connector concepts](concept-service-connector-internals.md)
