---
title: Integrate Azure Cosmos DB for MongoDB with Service Connector
description: Learn how to integrate Azure Cosmos DB for MongoDB into your application with Service Connector by using the supported authentication methods and clients.
author: maud-lv
ms.author: malev
ms.service: service-connector
ms.topic: how-to
ms.date: 02/03/2026
---

# Integrate Azure Cosmos DB for MongoDB with Service Connector

This article shows supported authentication methods and clients, and shows sample code you can use to connect the Azure Cosmos DB for MongoDB to other cloud services using Service Connector. You might still be able to connect to Azure Cosmos DB for MongoDB in other programming languages without using Service Connector. This page also shows default environment variable names and values (or Spring Boot configuration) you get when you create the service connection.  

## Supported compute services

Service Connector can be used to connect the following compute services to Azure Cosmos DB for MongoDB:

- Azure App Service
- Azure Functions
- Azure Kubernetes Service (AKS)
- Azure Spring Apps

## Supported authentication types and client types

The following table shows which combinations of client types and authentication methods are supported for connecting your compute service to Azure Cosmos DB for MongoDB using Service Connector. A *Yes* indicates that the combination is supported, while a *No* indicates that it isn't supported.

| Client type | System-assigned managed identity | User-assigned managed identity | Secret / connection string | Service principal |
| --- | --- | --- | --- | --- |
| .NET | Yes | Yes | Yes | Yes |
| Java | Yes | Yes | Yes | Yes |
| Java - Spring Boot | No | No | Yes | No |
| Node.js | Yes | Yes | Yes | Yes |
| Python | Yes | Yes | Yes | Yes |
| Go | Yes | Yes | Yes | Yes |
| None | Yes | Yes | Yes | Yes |

This table indicates that all combinations of client types and authentication methods in the table are supported, except for the Java - Spring Boot client type. This client type only supports the Secret / connection string method. All other client types can use any of the authentication methods to connect to Azure Cosmos DB for MongoDB using Service Connector.

> **Note:**
> Cosmos DB doesn't natively support authentication via managed identity. Therefore, Service Connector uses the managed identity to retrieve the connection string, and the connection is then established using that connection string.

## Default environment variable names or application properties and sample code

Use the following connection details to connect compute services to Azure Cosmos DB. This page also shows default environment variable names and values (or Spring Boot configuration) you get when you create the service connection, and sample code. For each of these examples, replace the placeholder texts `<mongo-db-admin-user>`, `<password>`, `<Azure-Cosmos-DB-API-for-MongoDB-account>`, `<subscription-ID>`, `<resource-group-name>`, `<client-secret>`, and `<tenant-id>` with your own information. For more information about naming conventions, check the [Service Connector internals](concept-service-connector-internals.md#configuration-naming-convention) article.

### System-assigned managed identity

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| AZURE_COSMOS_LISTCONNECTIONSTRINGURL | The URL to get the connection string | `https://management.azure.com/subscriptions/<subscription-ID>/resourceGroups/<resource-group-name>/providers/Microsoft.DocumentDB/databaseAccounts/<Azure-Cosmos-DB-API-for-MongoDB-account>/listConnectionStrings?api-version=2021-04-15` |
| AZURE_COSMOS_SCOPE | Your managed identity scope | `https://management.azure.com/.default` |
| AZURE_COSMOS_RESOURCEENDPOINT | Your resource endpoint | `https://<Azure-Cosmos-DB-API-for-MongoDB-account>.documents.azure.com:443/` |

#### Sample code

To connect to Azure Cosmos DB for MongoDB using a system-assigned managed identity, refer to the following steps and sample code.

Since Cosmos DB doesn't natively support authentication via managed identity, in the following code sample, we use the managed identity to retrieve the connection string, and the connection is then established using that connection string.


### [.NET](#tab/dotnet)

1. Install dependencies.
    ```bash
    dotnet add package MongoDb.Driver
    dotnet add package Azure.Identity
    ```

1. Get an access token for the managed identity or service principal using client library [Azure.Identity](https://www.nuget.org/packages/Azure.Identity/). Use the access token and `AZURE_COSMOS_LISTCONNECTIONSTRINGURL` to get the connection string. Get the connection information from the environment variables added by Service Connector and connect to Azure Cosmos DB for MongoDB. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

    ```csharp
    using System;
    using System.Security.Authentication;
    using System.Net.Security;
    using System.Net.Http;
    using System.Security.Authentication;
    using System.Security.Cryptography.X509Certificates;
    using System.Threading.Tasks;
    using MongoDB.Driver;
    using Azure.Identity;
    using System.Text.Json;

    // you can retrieve the endpoint of the resource with the following env variable:
    // Environment.GetEnvironmentVariable("AZURE_COSMOS_RESOURCEENDPOINT");
    var listConnectionStringUrl = Environment.GetEnvironmentVariable("AZURE_COSMOS_LISTCONNECTIONSTRINGURL");
    var scope = Environment.GetEnvironmentVariable("AZURE_COSMOS_SCOPE");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // For system-assigned identity.
    // var tokenProvider = new DefaultAzureCredential();
    
    // For user-assigned identity.
    // var tokenProvider = new DefaultAzureCredential(
    //     new DefaultAzureCredentialOptions
    //     {
    //         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_COSMOS_CLIENTID")
    //     }
    // );
    
    // For service principal.
    // var tenantId = Environment.GetEnvironmentVariable("AZURE_COSMOS_TENANTID");
    // var clientId = Environment.GetEnvironmentVariable("AZURE_COSMOS_CLIENTID");
    // var clientSecret = Environment.GetEnvironmentVariable("AZURE_COSMOS_CLIENTSECRET");
    // var tokenProvider = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    // Acquire the access token. 
    AccessToken accessToken = await tokenProvider.GetTokenAsync(
        new TokenRequestContext(scopes: new string[]{ scope }));

    // Get the connection string.
    var httpClient = new HttpClient();
    httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {accessToken.Token}");
    var response = await httpClient.PostAsync(new Uri(listConnectionStringUrl), null);
    var responseBody = await response.Content.ReadAsStringAsync();
    var connectionStrings = JsonSerializer.Deserialize<Dictionary<string, List<Dictionary<string, string>>>>(responseBody);
    var connectionString = connectionStrings["connectionStrings"][0]["connectionString"];
    
    // Connect to Azure Cosmos DB for MongoDB
    var client = new MongoClient(connectionString);
    ```

### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:
    ```xml
    <dependency>
	    <groupId>org.mongodb</groupId>
	    <artifactId>mongo-java-driver</artifactId>
	    <version>3.4.2</version>
	</dependency> 
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.1.5</version>
    </dependency>
    ```

1. Get an access token for the managed identity or service principal using `azure-identity`. Use the access token and `AZURE_COSMOS_LISTCONNECTIONSTRINGURL` to get the connection string. Get the connection information from the environment variables added by Service Connector and connect to Azure Cosmos DB for MongoDB. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

    ```java
    import com.mongodb.MongoClient;
    import com.mongodb.MongoClientURI;
    import com.mongodb.client.MongoCollection;
    import com.mongodb.client.MongoDatabase;
    import com.mongodb.client.model.Filters;
    import javax.net.ssl.*;
    import java.net.InetSocketAddress;
    import com.azure.identity.*;
    import com.azure.core.credential.*;
    import java.net.http.*;
    import java.net.URI;

    String endpoint = System.getenv("AZURE_COSMOS_RESOURCEENDPOINT");
    String listConnectionStringUrl = System.getenv("AZURE_COSMOS_LISTCONNECTIONSTRINGURL");
    String scope = System.getenv("AZURE_COSMOS_SCOPE");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // For system managed identity.
    // DefaultAzureCredential defaultCredential = new DefaultAzureCredentialBuilder().build();

    // For user assigned managed identity.
    // DefaultAzureCredential defaultCredential = new DefaultAzureCredentialBuilder()
    //     .managedIdentityClientId(System.getenv("AZURE_COSMOS_CLIENTID"))
    //     .build();

    // For service principal.
    // ClientSecretCredential defaultCredential = new ClientSecretCredentialBuilder()
    //   .clientId(System.getenv("<AZURE_COSMOS_CLIENTID>"))
    //   .clientSecret(System.getenv("<AZURE_COSMOS_CLIENTSECRET>"))
    //   .tenantId(System.getenv("<AZURE_COSMOS_TENANTID>"))
    //   .build();
    
    // Get the access token.
    AccessToken accessToken = defaultCredential.getToken(new TokenRequestContext().addScopes(new String[]{ scope })).block();
    String token = accessToken.getToken();

    // Get the connection string.
    HttpClient client = HttpClient.newBuilder().build();
    HttpRequest request = HttpRequest.newBuilder()
        .uri(new URI(listConnectionStringUrl))
        .header("Authorization", "Bearer " + token)
        .POST()
        .build();
    HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
    JSONParser parser = new JSONParser();
    JSONObject responseBody = parser.parse(response.body());
    List<Map<String, String>> connectionStrings = responseBody.get("connectionStrings");
    String connectionString = connectionStrings.get(0).get("connectionString");
    
    // Connect to Azure Cosmos DB for MongoDB
    MongoClientURI uri = new MongoClientURI(connectionString);
    MongoClient mongoClient = new MongoClient(uri);
    ```

### [Spring Boot](#tab/springBoot)
Authentication type is not supported for Spring Boot.

### [Python](#tab/python)
1. Install dependencies.
    ```bash
    pip install pymongo
    pip install azure-identity
    ```

1. In code, get an access token via `azure-identity`, then use it to get the connection string. Get connection information from environment variables added by Service Connector and connect to Azure Cosmos DB for MongoDB. In the code below, uncomment the section for your authentication type:
    ```python
    import os
    import pymongo
    import requests
    from azure.identity import ManagedIdentityCredential, ClientSecretCredential

    endpoint = os.getenv('AZURE_COSMOS_RESOURCEENDPOINT')
    listConnectionStringUrl = os.getenv('AZURE_COSMOS_LISTCONNECTIONSTRINGURL')
    scope = os.getenv('AZURE_COSMOS_SCOPE')

    # Uncomment the following lines corresponding to the authentication type you want to use.
    # For system-assigned managed identity
    # cred = ManagedIdentityCredential()

    # For user-assigned managed identity
    # managed_identity_client_id = os.getenv('AZURE_COSMOS_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)

    # For service principal
    # tenant_id = os.getenv('AZURE_COSMOS_TENANTID')
    # client_id = os.getenv('AZURE_COSMOS_CLIENTID')
    # client_secret = os.getenv('AZURE_COSMOS_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)

    # Get the connection string
    session = requests.Session()
    token = cred.get_token(scope)
    response = session.post(listConnectionStringUrl, headers={"Authorization": "Bearer {}".format(token.token)})
    keys_dict = response.json()
    conn_str = keys_dict["connectionStrings"][0]["connectionString"]

    # Connect to Azure Cosmos DB for MongoDB
    client = pymongo.MongoClient(conn_str)
    ```



### [Go](#tab/go)
1. Install dependencies.
   ```bash
   go get go.mongodb.org/mongo-driver/mongo
   go get "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
   go get "github.com/Azure/azure-sdk-for-go/sdk/azcore"
   ```
1. In code, get an access token via `azidentity`, then use it to get the connection string. Get connection information from environment variables added by Service Connector and connect to Azure Cosmos DB for MongoDB. In the code below, uncomment the section for your authentication type:

    ```go
    import (
        "fmt"
        "os"
        "context"
        "log"
        "io/ioutil"
        "encoding/json"
    
        "go.mongodb.org/mongo-driver/bson"
    	"go.mongodb.org/mongo-driver/mongo"
    	"go.mongodb.org/mongo-driver/mongo/options"
        "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
    )
    
    endpoint = os.Getenv("AZURE_COSMOS_RESOURCEENDPOINT")
    listConnectionStringUrl = os.Getenv("AZURE_COSMOS_LISTCONNECTIONSTRINGURL")
    scope = os.Getenv("AZURE_COSMOS_SCOPE")

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

    // Acquire the access token.
    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    token, err := cred.GetToken(ctx, policy.TokenRequestOptions{
        Scopes: []string{scope},
    })
    
    // Acquire the connection string.
    client := &http.Client{}
    req, err := http.NewRequest("POST", listConnectionStringUrl, nil)
    req.Header.Add("Authorization", "Bearer " + token.Token)
    resp, err := client.Do(req)
    body, err := ioutil.ReadAll(resp.Body)
    var result map[string]interface{}
    json.Unmarshal(body, &result)
    connectionString, err := result["connectionStrings"][0]["connectionString"];
    
    // Connect to Azure Cosmos DB for MongoDB
    ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
    clientOptions := options.Client().ApplyURI(connectionString).SetDirect(true)
    
    c, err := mongo.Connect(ctx, clientOptions)
    ```

### [NodeJS](#tab/nodejs)
1. Install dependencies.
   ```bash
   npm install mongodb
   npm install --save @azure/identity
   ```
1. In code, get the access token via `@azure/identity`, then use it to get the connection string. Get connection information from environment variables added by Service Connector and connect to Azure Cosmos DB for MongoDB. In the code below, uncomment the section for your authentication type:

    ```javascript
    import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
    const { MongoClient, ObjectId } = require('mongodb');
    const axios = require('axios');
    
    let endpoint = process.env.AZURE_COSMOS_RESOURCEENDPOINT;
    let listConnectionStringUrl = process.env.AZURE_COSMOS_LISTCONNECTIONSTRINGURL;
    let scope = process.env.AZURE_COSMOS_SCOPE;
    
    // Uncomment the following lines corresponding to the authentication type you want to use.  
    // For system-assigned identity.
    // const credential = new DefaultAzureCredential();
    
    // For user-assigned identity.
    // const clientId = process.env.AZURE_COSMOS_CLIENTID;
    // const credential = new DefaultAzureCredential({
    //     managedIdentityClientId: clientId
    // });
    
    // For service principal.
    // const tenantId = process.env.AZURE_COSMOS_TENANTID;
    // const clientId = process.env.AZURE_COSMOS_CLIENTID;
    // const clientSecret = process.env.AZURE_COSMOS_CLIENTSECRET;
    
    // Acquire the access token.
    var accessToken = await credential.getToken(scope);
    
    // Get the connection string.
    const config = {
        method: 'post',
        url: listConnectionStringUrl,
        headers: { 
          'Authorization': `Bearer ${accessToken.token}`
        }
    };
    const response = await axios(config);
    const keysDict = response.data;
    const connectionString = keysDict['connectionStrings'][0]['connectionString'];
    
    const client = new MongoClient(connectionString);
    ```


### [Other](#tab/none)
For other languages, you can use the MongoDB resource endpoint and other properties that Service Connector sets to the environment variables to connect to Azure Cosmos DB for MongoDB. For environment variable details, see [Integrate Azure Cosmos DB for MongoDB with Service Connector](how-to-integrate-cosmos-db.md).


### User-assigned managed identity

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| AZURE_COSMOS_LISTCONNECTIONSTRINGURL | The URL to get the connection string | `https://management.azure.com/subscriptions/<subscription-ID>/resourceGroups/<resource-group-name>/providers/Microsoft.DocumentDB/databaseAccounts/<Azure-Cosmos-DB-API-for-MongoDB-account>/listConnectionStrings?api-version=2021-04-15` |
| AZURE_COSMOS_SCOPE | Your managed identity scope | `https://management.azure.com/.default` |
| AZURE_COSMOS_CLIENTID | Your client ID | `<client-ID>` |
| AZURE_COSMOS_RESOURCEENDPOINT | Your resource endpoint | `https://<Azure-Cosmos-DB-API-for-MongoDB-account>.documents.azure.com:443/` |

#### Sample code

To connect to Azure Cosmos DB for MongoDB using a user-assigned managed identity, refer to the following steps and sample code.

Since Cosmos DB doesn't natively support authentication via managed identity, in the following code sample, we use the managed identity to retrieve the connection string, and the connection is then established using that connection string.


### [.NET](#tab/dotnet)

1. Install dependencies.
    ```bash
    dotnet add package MongoDb.Driver
    dotnet add package Azure.Identity
    ```

1. Get an access token for the managed identity or service principal using client library [Azure.Identity](https://www.nuget.org/packages/Azure.Identity/). Use the access token and `AZURE_COSMOS_LISTCONNECTIONSTRINGURL` to get the connection string. Get the connection information from the environment variables added by Service Connector and connect to Azure Cosmos DB for MongoDB. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

    ```csharp
    using System;
    using System.Security.Authentication;
    using System.Net.Security;
    using System.Net.Http;
    using System.Security.Authentication;
    using System.Security.Cryptography.X509Certificates;
    using System.Threading.Tasks;
    using MongoDB.Driver;
    using Azure.Identity;
    using System.Text.Json;

    // you can retrieve the endpoint of the resource with the following env variable:
    // Environment.GetEnvironmentVariable("AZURE_COSMOS_RESOURCEENDPOINT");
    var listConnectionStringUrl = Environment.GetEnvironmentVariable("AZURE_COSMOS_LISTCONNECTIONSTRINGURL");
    var scope = Environment.GetEnvironmentVariable("AZURE_COSMOS_SCOPE");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // For system-assigned identity.
    // var tokenProvider = new DefaultAzureCredential();
    
    // For user-assigned identity.
    // var tokenProvider = new DefaultAzureCredential(
    //     new DefaultAzureCredentialOptions
    //     {
    //         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_COSMOS_CLIENTID")
    //     }
    // );
    
    // For service principal.
    // var tenantId = Environment.GetEnvironmentVariable("AZURE_COSMOS_TENANTID");
    // var clientId = Environment.GetEnvironmentVariable("AZURE_COSMOS_CLIENTID");
    // var clientSecret = Environment.GetEnvironmentVariable("AZURE_COSMOS_CLIENTSECRET");
    // var tokenProvider = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    // Acquire the access token. 
    AccessToken accessToken = await tokenProvider.GetTokenAsync(
        new TokenRequestContext(scopes: new string[]{ scope }));

    // Get the connection string.
    var httpClient = new HttpClient();
    httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {accessToken.Token}");
    var response = await httpClient.PostAsync(new Uri(listConnectionStringUrl), null);
    var responseBody = await response.Content.ReadAsStringAsync();
    var connectionStrings = JsonSerializer.Deserialize<Dictionary<string, List<Dictionary<string, string>>>>(responseBody);
    var connectionString = connectionStrings["connectionStrings"][0]["connectionString"];
    
    // Connect to Azure Cosmos DB for MongoDB
    var client = new MongoClient(connectionString);
    ```

### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:
    ```xml
    <dependency>
	    <groupId>org.mongodb</groupId>
	    <artifactId>mongo-java-driver</artifactId>
	    <version>3.4.2</version>
	</dependency> 
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.1.5</version>
    </dependency>
    ```

1. Get an access token for the managed identity or service principal using `azure-identity`. Use the access token and `AZURE_COSMOS_LISTCONNECTIONSTRINGURL` to get the connection string. Get the connection information from the environment variables added by Service Connector and connect to Azure Cosmos DB for MongoDB. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

    ```java
    import com.mongodb.MongoClient;
    import com.mongodb.MongoClientURI;
    import com.mongodb.client.MongoCollection;
    import com.mongodb.client.MongoDatabase;
    import com.mongodb.client.model.Filters;
    import javax.net.ssl.*;
    import java.net.InetSocketAddress;
    import com.azure.identity.*;
    import com.azure.core.credential.*;
    import java.net.http.*;
    import java.net.URI;

    String endpoint = System.getenv("AZURE_COSMOS_RESOURCEENDPOINT");
    String listConnectionStringUrl = System.getenv("AZURE_COSMOS_LISTCONNECTIONSTRINGURL");
    String scope = System.getenv("AZURE_COSMOS_SCOPE");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // For system managed identity.
    // DefaultAzureCredential defaultCredential = new DefaultAzureCredentialBuilder().build();

    // For user assigned managed identity.
    // DefaultAzureCredential defaultCredential = new DefaultAzureCredentialBuilder()
    //     .managedIdentityClientId(System.getenv("AZURE_COSMOS_CLIENTID"))
    //     .build();

    // For service principal.
    // ClientSecretCredential defaultCredential = new ClientSecretCredentialBuilder()
    //   .clientId(System.getenv("<AZURE_COSMOS_CLIENTID>"))
    //   .clientSecret(System.getenv("<AZURE_COSMOS_CLIENTSECRET>"))
    //   .tenantId(System.getenv("<AZURE_COSMOS_TENANTID>"))
    //   .build();
    
    // Get the access token.
    AccessToken accessToken = defaultCredential.getToken(new TokenRequestContext().addScopes(new String[]{ scope })).block();
    String token = accessToken.getToken();

    // Get the connection string.
    HttpClient client = HttpClient.newBuilder().build();
    HttpRequest request = HttpRequest.newBuilder()
        .uri(new URI(listConnectionStringUrl))
        .header("Authorization", "Bearer " + token)
        .POST()
        .build();
    HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
    JSONParser parser = new JSONParser();
    JSONObject responseBody = parser.parse(response.body());
    List<Map<String, String>> connectionStrings = responseBody.get("connectionStrings");
    String connectionString = connectionStrings.get(0).get("connectionString");
    
    // Connect to Azure Cosmos DB for MongoDB
    MongoClientURI uri = new MongoClientURI(connectionString);
    MongoClient mongoClient = new MongoClient(uri);
    ```

### [Spring Boot](#tab/springBoot)
Authentication type is not supported for Spring Boot.

### [Python](#tab/python)
1. Install dependencies.
    ```bash
    pip install pymongo
    pip install azure-identity
    ```

1. In code, get an access token via `azure-identity`, then use it to get the connection string. Get connection information from environment variables added by Service Connector and connect to Azure Cosmos DB for MongoDB. In the code below, uncomment the section for your authentication type:
    ```python
    import os
    import pymongo
    import requests
    from azure.identity import ManagedIdentityCredential, ClientSecretCredential

    endpoint = os.getenv('AZURE_COSMOS_RESOURCEENDPOINT')
    listConnectionStringUrl = os.getenv('AZURE_COSMOS_LISTCONNECTIONSTRINGURL')
    scope = os.getenv('AZURE_COSMOS_SCOPE')

    # Uncomment the following lines corresponding to the authentication type you want to use.
    # For system-assigned managed identity
    # cred = ManagedIdentityCredential()

    # For user-assigned managed identity
    # managed_identity_client_id = os.getenv('AZURE_COSMOS_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)

    # For service principal
    # tenant_id = os.getenv('AZURE_COSMOS_TENANTID')
    # client_id = os.getenv('AZURE_COSMOS_CLIENTID')
    # client_secret = os.getenv('AZURE_COSMOS_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)

    # Get the connection string
    session = requests.Session()
    token = cred.get_token(scope)
    response = session.post(listConnectionStringUrl, headers={"Authorization": "Bearer {}".format(token.token)})
    keys_dict = response.json()
    conn_str = keys_dict["connectionStrings"][0]["connectionString"]

    # Connect to Azure Cosmos DB for MongoDB
    client = pymongo.MongoClient(conn_str)
    ```



### [Go](#tab/go)
1. Install dependencies.
   ```bash
   go get go.mongodb.org/mongo-driver/mongo
   go get "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
   go get "github.com/Azure/azure-sdk-for-go/sdk/azcore"
   ```
1. In code, get an access token via `azidentity`, then use it to get the connection string. Get connection information from environment variables added by Service Connector and connect to Azure Cosmos DB for MongoDB. In the code below, uncomment the section for your authentication type:

    ```go
    import (
        "fmt"
        "os"
        "context"
        "log"
        "io/ioutil"
        "encoding/json"
    
        "go.mongodb.org/mongo-driver/bson"
    	"go.mongodb.org/mongo-driver/mongo"
    	"go.mongodb.org/mongo-driver/mongo/options"
        "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
    )
    
    endpoint = os.Getenv("AZURE_COSMOS_RESOURCEENDPOINT")
    listConnectionStringUrl = os.Getenv("AZURE_COSMOS_LISTCONNECTIONSTRINGURL")
    scope = os.Getenv("AZURE_COSMOS_SCOPE")

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

    // Acquire the access token.
    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    token, err := cred.GetToken(ctx, policy.TokenRequestOptions{
        Scopes: []string{scope},
    })
    
    // Acquire the connection string.
    client := &http.Client{}
    req, err := http.NewRequest("POST", listConnectionStringUrl, nil)
    req.Header.Add("Authorization", "Bearer " + token.Token)
    resp, err := client.Do(req)
    body, err := ioutil.ReadAll(resp.Body)
    var result map[string]interface{}
    json.Unmarshal(body, &result)
    connectionString, err := result["connectionStrings"][0]["connectionString"];
    
    // Connect to Azure Cosmos DB for MongoDB
    ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
    clientOptions := options.Client().ApplyURI(connectionString).SetDirect(true)
    
    c, err := mongo.Connect(ctx, clientOptions)
    ```

### [NodeJS](#tab/nodejs)
1. Install dependencies.
   ```bash
   npm install mongodb
   npm install --save @azure/identity
   ```
1. In code, get the access token via `@azure/identity`, then use it to get the connection string. Get connection information from environment variables added by Service Connector and connect to Azure Cosmos DB for MongoDB. In the code below, uncomment the section for your authentication type:

    ```javascript
    import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
    const { MongoClient, ObjectId } = require('mongodb');
    const axios = require('axios');
    
    let endpoint = process.env.AZURE_COSMOS_RESOURCEENDPOINT;
    let listConnectionStringUrl = process.env.AZURE_COSMOS_LISTCONNECTIONSTRINGURL;
    let scope = process.env.AZURE_COSMOS_SCOPE;
    
    // Uncomment the following lines corresponding to the authentication type you want to use.  
    // For system-assigned identity.
    // const credential = new DefaultAzureCredential();
    
    // For user-assigned identity.
    // const clientId = process.env.AZURE_COSMOS_CLIENTID;
    // const credential = new DefaultAzureCredential({
    //     managedIdentityClientId: clientId
    // });
    
    // For service principal.
    // const tenantId = process.env.AZURE_COSMOS_TENANTID;
    // const clientId = process.env.AZURE_COSMOS_CLIENTID;
    // const clientSecret = process.env.AZURE_COSMOS_CLIENTSECRET;
    
    // Acquire the access token.
    var accessToken = await credential.getToken(scope);
    
    // Get the connection string.
    const config = {
        method: 'post',
        url: listConnectionStringUrl,
        headers: { 
          'Authorization': `Bearer ${accessToken.token}`
        }
    };
    const response = await axios(config);
    const keysDict = response.data;
    const connectionString = keysDict['connectionStrings'][0]['connectionString'];
    
    const client = new MongoClient(connectionString);
    ```


### [Other](#tab/none)
For other languages, you can use the MongoDB resource endpoint and other properties that Service Connector sets to the environment variables to connect to Azure Cosmos DB for MongoDB. For environment variable details, see [Integrate Azure Cosmos DB for MongoDB with Service Connector](how-to-integrate-cosmos-db.md).


### Connection string

> **Warning:**
> Microsoft recommends that you use the most secure authentication flow available. The authentication flow described in this procedure requires a high degree of trust in the application, and carries risks that aren't present in other flows. You should only use this flow when other more secure flows, such as managed identities, aren't viable.

#### Spring Boot client type

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| spring.data.mongodb.database | Your database | `<database-name>` |
| spring.data.mongodb.uri | Your database URI | `mongodb://<mongo-db-admin-user>:<password>@<mongo-db-server>.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@<mongo-db-server>@` |

#### Other client types

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| AZURE_COSMOS_CONNECTIONSTRING | MongoDB API connection string | `mongodb://<mongo-db-admin-user>:<password>@<mongo-db-server>.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@<mongo-db-server>@` |

#### Sample code

To connect to Azure Cosmos DB for MongoDB using a connection string, refer to the following steps and sample code.


### [.NET](#tab/dotnet)

1. Install dependency.
    ```bash
    dotnet add package MongoDb.Driver
    ```

1. Get the connection string from the environment variable added by Service Connector and connect to Azure Cosmos DB for MongoDB.
    ```csharp
    using MongoDB.Driver;

    var connectionString = Environment.GetEnvironmentVariable("AZURE_COSMOS_CONNECTIONSTRING");
    var client = new MongoClient(connectionString);
    ```


### [Java](#tab/java)

1. Add the following dependency in your *pom.xml* file:
    ```xml
    <dependency>
	    <groupId>org.mongodb</groupId>
	    <artifactId>mongo-java-driver</artifactId>
	    <version>3.4.2</version>
	</dependency>   
    ```

1. Get the connection string from the environment variable added by Service Connector and connect to Azure Cosmos DB for MongoDB.

    ```java
    import com.mongodb.MongoClient;
    import com.mongodb.MongoClientURI;
    import com.mongodb.client.MongoCollection;
    import com.mongodb.client.MongoDatabase;
    import com.mongodb.client.model.Filters;
    
    String connectionString = System.getenv("AZURE_COSMOS_CONNECTIONSTRING");
    MongoClientURI uri = new MongoClientURI(connectionString);
		
    MongoClient mongoClient = null;
    try {
        mongoClient = new MongoClient(uri);        
    } finally {
        if (mongoClient != null) {
            mongoClient.close();
        }
    }
    ```

### [SpringBoot](#tab/springBoot)
Refer to [Use Spring Data with Azure Cosmos DB for MongoDB API](https://learn.microsoft.com/azure/developer/java/spring-framework/configure-spring-data-mongodb-with-cosmos-db) to set up your Spring application. The configuration properties `spring.data.mongodb.database` and `spring.data.mongodb.uri` are set to Spring Apps by Service Connector.

### [Python](#tab/python)
1. Install dependency.
    ```bash
    pip install pymongo
    ```

1. Get the connection string from the environment variable added by Service Connector and connect to Azure Cosmos DB for MongoDB.
    ```python
    import os
    import pymongo

    conn_str = os.environ.get("AZURE_COSMOS_CONNECTIONSTRING")
    client = pymongo.MongoClient(conn_str)
    ```

### [Go](#tab/go)
1. Install dependency.
   ```bash
   go get go.mongodb.org/mongo-driver/mongo
   ```
1. Get the connection string from the environment variable added by Service Connector and connect to Azure Cosmos DB for MongoDB.
    ```go
    import (
    	"context"
    	"fmt"
    	"log"
    	"os"
        
        "go.mongodb.org/mongo-driver/bson"
    	"go.mongodb.org/mongo-driver/mongo"
    	"go.mongodb.org/mongo-driver/mongo/options"
    )

    ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
    defer cancel()
    
    mongoDBConnectionString = os.Getenv("AZURE_COSMOS_CONNECTIONSTRING")
    clientOptions := options.Client().ApplyURI(mongoDBConnectionString).SetDirect(true)
    
    c, err := mongo.Connect(ctx, clientOptions)
    if err != nil {
        log.Fatalf("unable to initialize connection %v", err)
    }

    err = c.Ping(ctx, nil)
    if err != nil {
        log.Fatalf("unable to connect %v", err)
    }
    ```

### [NodeJS](#tab/nodejs)
1. Install dependency.
    ```bash
    npm install mongodb
    ```
1. Get the connection string from the environment variable added by Service Connector and connect to Azure Cosmos DB for MongoDB.
    ```javascript
    const { MongoClient, ObjectId } = require('mongodb');
    
    const url = process.env.AZURE_COSMOS_CONNECTIONSTRING;
    const client = new MongoClient(url);
    ```


### [Other](#tab/none)
For other languages, you can use the MongoDB resource endpoint and other properties that Service Connector sets to the environment variables to connect to Azure Cosmos DB for MongoDB. For environment variable details, see [Integrate Azure Cosmos DB for MongoDB with Service Connector](how-to-integrate-cosmos-db.md).


### Service principal

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| AZURE_COSMOS_LISTCONNECTIONSTRINGURL | The URL to get the connection string | `https://management.azure.com/subscriptions/<subscription-ID>/resourceGroups/<resource-group-name>/providers/Microsoft.DocumentDB/databaseAccounts/<Azure-Cosmos-DB-API-for-MongoDB-account>/listConnectionStrings?api-version=2021-04-15` |
| AZURE_COSMOS_SCOPE | Your managed identity scope | `https://management.azure.com/.default` |
| AZURE_COSMOS_CLIENTID | Your client ID | `<client-ID>` |
| AZURE_COSMOS_CLIENTSECRET | Your client secret | `<client-secret>` |
| AZURE_COSMOS_TENANTID | Your tenant ID | `<tenant-ID>` |
| AZURE_COSMOS_RESOURCEENDPOINT | Your resource endpoint | `https://<Azure-Cosmos-DB-API-for-MongoDB-account>.documents.azure.com:443/` |

#### Sample code

To connect to Azure Cosmos DB for MongoDB using a service principal, refer to the following steps and sample code.


### [.NET](#tab/dotnet)

1. Install dependencies.
    ```bash
    dotnet add package MongoDb.Driver
    dotnet add package Azure.Identity
    ```

1. Get an access token for the managed identity or service principal using client library [Azure.Identity](https://www.nuget.org/packages/Azure.Identity/). Use the access token and `AZURE_COSMOS_LISTCONNECTIONSTRINGURL` to get the connection string. Get the connection information from the environment variables added by Service Connector and connect to Azure Cosmos DB for MongoDB. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

    ```csharp
    using System;
    using System.Security.Authentication;
    using System.Net.Security;
    using System.Net.Http;
    using System.Security.Authentication;
    using System.Security.Cryptography.X509Certificates;
    using System.Threading.Tasks;
    using MongoDB.Driver;
    using Azure.Identity;
    using System.Text.Json;

    // you can retrieve the endpoint of the resource with the following env variable:
    // Environment.GetEnvironmentVariable("AZURE_COSMOS_RESOURCEENDPOINT");
    var listConnectionStringUrl = Environment.GetEnvironmentVariable("AZURE_COSMOS_LISTCONNECTIONSTRINGURL");
    var scope = Environment.GetEnvironmentVariable("AZURE_COSMOS_SCOPE");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // For system-assigned identity.
    // var tokenProvider = new DefaultAzureCredential();
    
    // For user-assigned identity.
    // var tokenProvider = new DefaultAzureCredential(
    //     new DefaultAzureCredentialOptions
    //     {
    //         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_COSMOS_CLIENTID")
    //     }
    // );
    
    // For service principal.
    // var tenantId = Environment.GetEnvironmentVariable("AZURE_COSMOS_TENANTID");
    // var clientId = Environment.GetEnvironmentVariable("AZURE_COSMOS_CLIENTID");
    // var clientSecret = Environment.GetEnvironmentVariable("AZURE_COSMOS_CLIENTSECRET");
    // var tokenProvider = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    // Acquire the access token. 
    AccessToken accessToken = await tokenProvider.GetTokenAsync(
        new TokenRequestContext(scopes: new string[]{ scope }));

    // Get the connection string.
    var httpClient = new HttpClient();
    httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {accessToken.Token}");
    var response = await httpClient.PostAsync(new Uri(listConnectionStringUrl), null);
    var responseBody = await response.Content.ReadAsStringAsync();
    var connectionStrings = JsonSerializer.Deserialize<Dictionary<string, List<Dictionary<string, string>>>>(responseBody);
    var connectionString = connectionStrings["connectionStrings"][0]["connectionString"];
    
    // Connect to Azure Cosmos DB for MongoDB
    var client = new MongoClient(connectionString);
    ```

### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:
    ```xml
    <dependency>
	    <groupId>org.mongodb</groupId>
	    <artifactId>mongo-java-driver</artifactId>
	    <version>3.4.2</version>
	</dependency> 
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.1.5</version>
    </dependency>
    ```

1. Get an access token for the managed identity or service principal using `azure-identity`. Use the access token and `AZURE_COSMOS_LISTCONNECTIONSTRINGURL` to get the connection string. Get the connection information from the environment variables added by Service Connector and connect to Azure Cosmos DB for MongoDB. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

    ```java
    import com.mongodb.MongoClient;
    import com.mongodb.MongoClientURI;
    import com.mongodb.client.MongoCollection;
    import com.mongodb.client.MongoDatabase;
    import com.mongodb.client.model.Filters;
    import javax.net.ssl.*;
    import java.net.InetSocketAddress;
    import com.azure.identity.*;
    import com.azure.core.credential.*;
    import java.net.http.*;
    import java.net.URI;

    String endpoint = System.getenv("AZURE_COSMOS_RESOURCEENDPOINT");
    String listConnectionStringUrl = System.getenv("AZURE_COSMOS_LISTCONNECTIONSTRINGURL");
    String scope = System.getenv("AZURE_COSMOS_SCOPE");
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // For system managed identity.
    // DefaultAzureCredential defaultCredential = new DefaultAzureCredentialBuilder().build();

    // For user assigned managed identity.
    // DefaultAzureCredential defaultCredential = new DefaultAzureCredentialBuilder()
    //     .managedIdentityClientId(System.getenv("AZURE_COSMOS_CLIENTID"))
    //     .build();

    // For service principal.
    // ClientSecretCredential defaultCredential = new ClientSecretCredentialBuilder()
    //   .clientId(System.getenv("<AZURE_COSMOS_CLIENTID>"))
    //   .clientSecret(System.getenv("<AZURE_COSMOS_CLIENTSECRET>"))
    //   .tenantId(System.getenv("<AZURE_COSMOS_TENANTID>"))
    //   .build();
    
    // Get the access token.
    AccessToken accessToken = defaultCredential.getToken(new TokenRequestContext().addScopes(new String[]{ scope })).block();
    String token = accessToken.getToken();

    // Get the connection string.
    HttpClient client = HttpClient.newBuilder().build();
    HttpRequest request = HttpRequest.newBuilder()
        .uri(new URI(listConnectionStringUrl))
        .header("Authorization", "Bearer " + token)
        .POST()
        .build();
    HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
    JSONParser parser = new JSONParser();
    JSONObject responseBody = parser.parse(response.body());
    List<Map<String, String>> connectionStrings = responseBody.get("connectionStrings");
    String connectionString = connectionStrings.get(0).get("connectionString");
    
    // Connect to Azure Cosmos DB for MongoDB
    MongoClientURI uri = new MongoClientURI(connectionString);
    MongoClient mongoClient = new MongoClient(uri);
    ```

### [Spring Boot](#tab/springBoot)
Authentication type is not supported for Spring Boot.

### [Python](#tab/python)
1. Install dependencies.
    ```bash
    pip install pymongo
    pip install azure-identity
    ```

1. In code, get an access token via `azure-identity`, then use it to get the connection string. Get connection information from environment variables added by Service Connector and connect to Azure Cosmos DB for MongoDB. In the code below, uncomment the section for your authentication type:
    ```python
    import os
    import pymongo
    import requests
    from azure.identity import ManagedIdentityCredential, ClientSecretCredential

    endpoint = os.getenv('AZURE_COSMOS_RESOURCEENDPOINT')
    listConnectionStringUrl = os.getenv('AZURE_COSMOS_LISTCONNECTIONSTRINGURL')
    scope = os.getenv('AZURE_COSMOS_SCOPE')

    # Uncomment the following lines corresponding to the authentication type you want to use.
    # For system-assigned managed identity
    # cred = ManagedIdentityCredential()

    # For user-assigned managed identity
    # managed_identity_client_id = os.getenv('AZURE_COSMOS_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)

    # For service principal
    # tenant_id = os.getenv('AZURE_COSMOS_TENANTID')
    # client_id = os.getenv('AZURE_COSMOS_CLIENTID')
    # client_secret = os.getenv('AZURE_COSMOS_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)

    # Get the connection string
    session = requests.Session()
    token = cred.get_token(scope)
    response = session.post(listConnectionStringUrl, headers={"Authorization": "Bearer {}".format(token.token)})
    keys_dict = response.json()
    conn_str = keys_dict["connectionStrings"][0]["connectionString"]

    # Connect to Azure Cosmos DB for MongoDB
    client = pymongo.MongoClient(conn_str)
    ```



### [Go](#tab/go)
1. Install dependencies.
   ```bash
   go get go.mongodb.org/mongo-driver/mongo
   go get "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
   go get "github.com/Azure/azure-sdk-for-go/sdk/azcore"
   ```
1. In code, get an access token via `azidentity`, then use it to get the connection string. Get connection information from environment variables added by Service Connector and connect to Azure Cosmos DB for MongoDB. In the code below, uncomment the section for your authentication type:

    ```go
    import (
        "fmt"
        "os"
        "context"
        "log"
        "io/ioutil"
        "encoding/json"
    
        "go.mongodb.org/mongo-driver/bson"
    	"go.mongodb.org/mongo-driver/mongo"
    	"go.mongodb.org/mongo-driver/mongo/options"
        "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
    )
    
    endpoint = os.Getenv("AZURE_COSMOS_RESOURCEENDPOINT")
    listConnectionStringUrl = os.Getenv("AZURE_COSMOS_LISTCONNECTIONSTRINGURL")
    scope = os.Getenv("AZURE_COSMOS_SCOPE")

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

    // Acquire the access token.
    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    token, err := cred.GetToken(ctx, policy.TokenRequestOptions{
        Scopes: []string{scope},
    })
    
    // Acquire the connection string.
    client := &http.Client{}
    req, err := http.NewRequest("POST", listConnectionStringUrl, nil)
    req.Header.Add("Authorization", "Bearer " + token.Token)
    resp, err := client.Do(req)
    body, err := ioutil.ReadAll(resp.Body)
    var result map[string]interface{}
    json.Unmarshal(body, &result)
    connectionString, err := result["connectionStrings"][0]["connectionString"];
    
    // Connect to Azure Cosmos DB for MongoDB
    ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
    clientOptions := options.Client().ApplyURI(connectionString).SetDirect(true)
    
    c, err := mongo.Connect(ctx, clientOptions)
    ```

### [NodeJS](#tab/nodejs)
1. Install dependencies.
   ```bash
   npm install mongodb
   npm install --save @azure/identity
   ```
1. In code, get the access token via `@azure/identity`, then use it to get the connection string. Get connection information from environment variables added by Service Connector and connect to Azure Cosmos DB for MongoDB. In the code below, uncomment the section for your authentication type:

    ```javascript
    import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
    const { MongoClient, ObjectId } = require('mongodb');
    const axios = require('axios');
    
    let endpoint = process.env.AZURE_COSMOS_RESOURCEENDPOINT;
    let listConnectionStringUrl = process.env.AZURE_COSMOS_LISTCONNECTIONSTRINGURL;
    let scope = process.env.AZURE_COSMOS_SCOPE;
    
    // Uncomment the following lines corresponding to the authentication type you want to use.  
    // For system-assigned identity.
    // const credential = new DefaultAzureCredential();
    
    // For user-assigned identity.
    // const clientId = process.env.AZURE_COSMOS_CLIENTID;
    // const credential = new DefaultAzureCredential({
    //     managedIdentityClientId: clientId
    // });
    
    // For service principal.
    // const tenantId = process.env.AZURE_COSMOS_TENANTID;
    // const clientId = process.env.AZURE_COSMOS_CLIENTID;
    // const clientSecret = process.env.AZURE_COSMOS_CLIENTSECRET;
    
    // Acquire the access token.
    var accessToken = await credential.getToken(scope);
    
    // Get the connection string.
    const config = {
        method: 'post',
        url: listConnectionStringUrl,
        headers: { 
          'Authorization': `Bearer ${accessToken.token}`
        }
    };
    const response = await axios(config);
    const keysDict = response.data;
    const connectionString = keysDict['connectionStrings'][0]['connectionString'];
    
    const client = new MongoClient(connectionString);
    ```


### [Other](#tab/none)
For other languages, you can use the MongoDB resource endpoint and other properties that Service Connector sets to the environment variables to connect to Azure Cosmos DB for MongoDB. For environment variable details, see [Integrate Azure Cosmos DB for MongoDB with Service Connector](how-to-integrate-cosmos-db.md).


## Next steps

To learn more about Service Connector, see the following tutorial.

> 
> [Learn about Service Connector concepts](concept-service-connector-internals.md)
