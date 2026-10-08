---
title: Integrate the Azure Cosmos DB for Table with Service Connector
description: Integrate the Azure Cosmos DB for Table into your application with Service Connector
author: maud-lv
ms.author: malev
ms.service: service-connector
ms.topic: how-to
ms.date: 06/17/2026
---

# Integrate the Azure Cosmos DB for Table with Service Connector

This article shows supported authentication methods and clients, and provides sample code for connecting Azure Cosmos DB for Table to cloud services using Service Connector. You can also connect using other programming languages without Service Connector. The article includes default environment variable names and values you receive when creating a service connection. 

## Supported compute services

Service Connector can be used to connect the following compute services to Azure Cosmos DB for Table:

- Azure App Service
- Azure Functions
- Azure Kubernetes Service (AKS)
- Azure Spring Apps

## Supported authentication types and client types

The table below shows which combinations of client types and authentication methods are supported for connecting your compute service to Azure Cosmos DB for Table using Service Connector. A “Yes” indicates that the combination is supported, while a “No” indicates that it is not supported.

| Client type | System-assigned managed identity | User-assigned managed identity | Secret / connection string | Service principal |
| --- | --- | --- | --- | --- |
| .NET | Yes | Yes | Yes | Yes |
| Java | Yes | Yes | Yes | Yes |
| Node.js | Yes | Yes | Yes | Yes |
| Python | Yes | Yes | Yes | Yes |
| Go | Yes | Yes | Yes | Yes |
| None | Yes | Yes | Yes | Yes |

This table indicates that all combinations of client types and authentication methods in the table are supported. All client types can use any of the authentication methods to connect to Azure Cosmos DB for Table using Service Connector.

> **Note:**
> Cosmos DB does not natively support authentication via managed identity. Therefore, Service Connector uses the managed identity to retrieve the connection string, and the connection is subsequently established using that connection string.

## Default environment variable names or application properties and sample code

Refer to the connection details below to connect your compute services to Azure Cosmos DB for Table. Replace placeholder text such as `<account-name>`, `<table-name>`, and `<account-key>` with your actual values. For naming conventions, see [Service Connector internals](concept-service-connector-internals.md#configuration-naming-convention).

#### System-assigned managed identity

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| AZURE_COSMOS_LISTCONNECTIONSTRINGURL | The URL to get the connection string | `https://management.azure.com/subscriptions/<subscription-ID>/resourceGroups/<resource-group-name>/providers/Microsoft.DocumentDB/databaseAccounts/<table-name>/listConnectionStrings?api-version=2021-04-15` |
| AZURE_COSMOS_SCOPE | Your managed identity scope | `https://management.azure.com/.default` |
| AZURE_COSMOS_RESOURCEENDPOINT | Your resource endpoint | `https://<table-name>.documents.azure.com:443/` |

#### Sample code

To connect using a system-assigned managed identity:

### [.NET](#tab/dotnet)

1. Install dependencies.
    ```bash
    dotnet add package Azure.Data.Tables
    dotnet add package Azure.Identity
    ```
1. Get an access token for the managed identity or service principal using [Azure.Identity](https://www.nuget.org/packages/Azure.Identity/). Use the access token and `AZURE_COSMOS_LISTCONNECTIONSTRINGURL` to get the connection string and connect to Azure Cosmos DB for Table. In the code below, uncomment the section for your authentication type:
    ```csharp
    using System;
    using System.Security.Authentication;
    using System.Net.Security;
    using System.Net.Http;
    using System.Security.Authentication;
    using System.Threading.Tasks;
    using Azure.Data.Tables;
    using Azure.Identity;

    var endpoint = Environment.GetEnvironmentVariable("AZURE_COSMOS_RESOURCEENDPOINT");
    var listConnectionStringUrl = Environment.GetEnvironmentVariable("AZURE_COSMOS_LISTCONNECTIONSTRINGURL");
    var scope = Environment.GetEnvironmentVariable("AZURE_COSMOS_SCOPE");

    // Uncomment the following lines corresponding to the authentication type you want to use.
    // For system-assigned identity.
    // var tokenProvider = new DefaultAzureCredential();

    // For user-assigned identity.
    // var tokenProvider = new DefaultAzureCredential(
    //     new DefaultAzureCredentialOptions
    //     {
    //         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_COSMOS_CLIENTID");
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
    var response = await httpClient.POSTAsync(listConnectionStringUrl);
    var responseBody = await response.Content.ReadAsStringAsync();
    var connectionStrings = JsonConvert.DeserializeObject<Dictionary<string, List<Dictionary<string, string>>>(responseBody);
    var connectionString = connectionStrings["connectionStrings"].Find(connStr => connStr["description"] == "Primary Table Connection String")["connectionString"];

    // Connect to Azure Cosmos DB for Table
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
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.1.5</version>
    </dependency>
    ```
1. Get an access token for the managed identity or service principal using `azure-identity`. Use the access token and `AZURE_COSMOS_LISTCONNECTIONSTRINGURL` to get the connection string and connect to Azure Cosmos DB for Table. In the code below, uncomment the section for your authentication type:
    ```java
    import com.azure.data.tables.TableClient;
    import com.azure.data.tables.TableClientBuilder;
    import javax.net.ssl.*;
    import java.net.InetSocketAddress;
    import com.azure.identity.*;
    import com.azure.core.credential.*;
    import java.net.http.*;

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
    String connectionString;
    for (Map<String, String> connStr : connectionStrings){
        if (connStr.get("description") == "Primary Table Connection String"){
            connectionString = connStr.get("connectionString");
            break;
        }
    }

    // Connect to Azure Cosmos DB for Table
    TableClient tableClient = new TableClientBuilder()
        .connectionString(connectionString)
        .buildClient();
    ```
### [Python](#tab/python)
1. Install dependencies.
    ```bash
    pip install azure-data-tables
    pip install azure-identity
    ```
1. Get an access token for the managed identity or service principal using `azure-identity`. Use the access token and `AZURE_COSMOS_LISTCONNECTIONSTRINGURL` to get the connection string and connect to Azure Cosmos DB for Table. In the code below, uncomment the section for your authentication type:
    ```python
    import os
    from azure.data.tables import TableServiceClient
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
    conn_str = x["connectionString"] for x in keys_dict["connectionStrings"] if x["description"] == "Primary Table Connection String"

    # Connect to Azure Cosmos DB for Table
    table_service = TableServiceClient.from_connection_string(conn_str) 
    ```

### [Go](#tab/go)
1. Install dependencies.
    ```bash
    go get github.com/Azure/azure-sdk-for-go/sdk/data/aztables
    go get github.com/Azure/azure-sdk-for-go/sdk/azidentity
    ```
1. In code, get an access token using `azidentity`, then use it to get the connection string. Get connection information from environment variables added by Service Connector and connect to Azure Cosmos DB for Table. In the code below, uncomment the section for your authentication type:
    ```go
    import (
        "fmt"
        "os"
        "context"
        "log"
        "io/ioutil"
        "encoding/json"

        "github.com/Azure/azure-sdk-for-go/sdk/data/aztables"
        "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
    )

    func main() {
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
        connStr := ""
        for i := range result["connectionStrings"]{
            if result["connectionStrings"][i]["description"] == "Primary Table Connection String" {
                connStr, err := result["connectionStrings"][i]["connectionString"]
                break
            }
        }
        
        serviceClient, err := aztables.NewServiceClientFromConnectionString(connStr, nil)
        if err != nil {
            panic(err)
        }
    }
    ```

### [NodeJS](#tab/nodejs)
1. Install dependencies.
   ```bash
   npm install @azure/data-tables
   npm install --save @azure/identity
   ```
1. In code, get the access token using `@azure/identity`, then use it to get the connection string. Get connection information from environment variables added by Service Connector and connect to Azure Cosmos DB for Table. In the code below, uncomment the section for your authentication type:
    ```javascript
    import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
    const { TableClient } = require("@azure/data-tables");
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
    const connectionString = keysDict["connectionStrings"].find(connStr => connStr["description"] == "Primary Table Connection String")["connectionString"];

    // Connect to Azure Cosmos DB for Table
    const serviceClient = TableClient.fromConnectionString(connectionString);
    ```

### [Other](#tab/none)
For other languages, you can use the endpoint URL and other properties that Service Connector sets to the environment variables to connect to Azure Cosmos DB for Table. For environment variable details, see [Integrate Azure Cosmos DB for Table with Service Connector](how-to-integrate-cosmos-table.md).

#### User-assigned managed identity

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| AZURE_COSMOS_LISTCONNECTIONSTRINGURL | The URL to get the connection string | `https://management.azure.com/subscriptions/<subscription-ID>/resourceGroups/<resource-group-name>/providers/Microsoft.DocumentDB/databaseAccounts/<table-name>/listConnectionStrings?api-version=2021-04-15` |
| AZURE_COSMOS_SCOPE | Your managed identity scope | `https://management.azure.com/.default` |
| AZURE_COSMOS_CLIENTID | Your client secret ID | `<client-ID>` |
| AZURE_COSMOS_RESOURCEENDPOINT | Your resource endpoint | `https://<table-name>.documents.azure.com:443/` |

#### Sample code

To connect using a user-assigned managed identity, the following code uses the managed identity to retrieve the connection string, then establishes the connection:


### [.NET](#tab/dotnet)

1. Install dependencies.
    ```bash
    dotnet add package Azure.Data.Tables
    dotnet add package Azure.Identity
    ```
1. Get an access token for the managed identity or service principal using [Azure.Identity](https://www.nuget.org/packages/Azure.Identity/). Use the access token and `AZURE_COSMOS_LISTCONNECTIONSTRINGURL` to get the connection string and connect to Azure Cosmos DB for Table. In the code below, uncomment the section for your authentication type:
    ```csharp
    using System;
    using System.Security.Authentication;
    using System.Net.Security;
    using System.Net.Http;
    using System.Security.Authentication;
    using System.Threading.Tasks;
    using Azure.Data.Tables;
    using Azure.Identity;

    var endpoint = Environment.GetEnvironmentVariable("AZURE_COSMOS_RESOURCEENDPOINT");
    var listConnectionStringUrl = Environment.GetEnvironmentVariable("AZURE_COSMOS_LISTCONNECTIONSTRINGURL");
    var scope = Environment.GetEnvironmentVariable("AZURE_COSMOS_SCOPE");

    // Uncomment the following lines corresponding to the authentication type you want to use.
    // For system-assigned identity.
    // var tokenProvider = new DefaultAzureCredential();

    // For user-assigned identity.
    // var tokenProvider = new DefaultAzureCredential(
    //     new DefaultAzureCredentialOptions
    //     {
    //         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_COSMOS_CLIENTID");
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
    var response = await httpClient.POSTAsync(listConnectionStringUrl);
    var responseBody = await response.Content.ReadAsStringAsync();
    var connectionStrings = JsonConvert.DeserializeObject<Dictionary<string, List<Dictionary<string, string>>>(responseBody);
    var connectionString = connectionStrings["connectionStrings"].Find(connStr => connStr["description"] == "Primary Table Connection String")["connectionString"];

    // Connect to Azure Cosmos DB for Table
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
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.1.5</version>
    </dependency>
    ```
1. Get an access token for the managed identity or service principal using `azure-identity`. Use the access token and `AZURE_COSMOS_LISTCONNECTIONSTRINGURL` to get the connection string and connect to Azure Cosmos DB for Table. In the code below, uncomment the section for your authentication type:
    ```java
    import com.azure.data.tables.TableClient;
    import com.azure.data.tables.TableClientBuilder;
    import javax.net.ssl.*;
    import java.net.InetSocketAddress;
    import com.azure.identity.*;
    import com.azure.core.credential.*;
    import java.net.http.*;

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
    String connectionString;
    for (Map<String, String> connStr : connectionStrings){
        if (connStr.get("description") == "Primary Table Connection String"){
            connectionString = connStr.get("connectionString");
            break;
        }
    }

    // Connect to Azure Cosmos DB for Table
    TableClient tableClient = new TableClientBuilder()
        .connectionString(connectionString)
        .buildClient();
    ```
### [Python](#tab/python)
1. Install dependencies.
    ```bash
    pip install azure-data-tables
    pip install azure-identity
    ```
1. Get an access token for the managed identity or service principal using `azure-identity`. Use the access token and `AZURE_COSMOS_LISTCONNECTIONSTRINGURL` to get the connection string and connect to Azure Cosmos DB for Table. In the code below, uncomment the section for your authentication type:
    ```python
    import os
    from azure.data.tables import TableServiceClient
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
    conn_str = x["connectionString"] for x in keys_dict["connectionStrings"] if x["description"] == "Primary Table Connection String"

    # Connect to Azure Cosmos DB for Table
    table_service = TableServiceClient.from_connection_string(conn_str) 
    ```

### [Go](#tab/go)
1. Install dependencies.
    ```bash
    go get github.com/Azure/azure-sdk-for-go/sdk/data/aztables
    go get github.com/Azure/azure-sdk-for-go/sdk/azidentity
    ```
1. In code, get an access token using `azidentity`, then use it to get the connection string. Get connection information from environment variables added by Service Connector and connect to Azure Cosmos DB for Table. In the code below, uncomment the section for your authentication type:
    ```go
    import (
        "fmt"
        "os"
        "context"
        "log"
        "io/ioutil"
        "encoding/json"

        "github.com/Azure/azure-sdk-for-go/sdk/data/aztables"
        "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
    )

    func main() {
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
        connStr := ""
        for i := range result["connectionStrings"]{
            if result["connectionStrings"][i]["description"] == "Primary Table Connection String" {
                connStr, err := result["connectionStrings"][i]["connectionString"]
                break
            }
        }
        
        serviceClient, err := aztables.NewServiceClientFromConnectionString(connStr, nil)
        if err != nil {
            panic(err)
        }
    }
    ```

### [NodeJS](#tab/nodejs)
1. Install dependencies.
   ```bash
   npm install @azure/data-tables
   npm install --save @azure/identity
   ```
1. In code, get the access token using `@azure/identity`, then use it to get the connection string. Get connection information from environment variables added by Service Connector and connect to Azure Cosmos DB for Table. In the code below, uncomment the section for your authentication type:
    ```javascript
    import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
    const { TableClient } = require("@azure/data-tables");
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
    const connectionString = keysDict["connectionStrings"].find(connStr => connStr["description"] == "Primary Table Connection String")["connectionString"];

    // Connect to Azure Cosmos DB for Table
    const serviceClient = TableClient.fromConnectionString(connectionString);
    ```

### [Other](#tab/none)
For other languages, you can use the endpoint URL and other properties that Service Connector sets to the environment variables to connect to Azure Cosmos DB for Table. For environment variable details, see [Integrate Azure Cosmos DB for Table with Service Connector](how-to-integrate-cosmos-table.md).

#### Connection string

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| AZURE_COSMOS_CONNECTIONSTRING | Azure Cosmos DB for Table connection string | `DefaultEndpointsProtocol=https;AccountName=<account-name>;AccountKey=<account-key>;TableEndpoint=https://<table-name>.table.cosmos.azure.com:443/; ` |

> **Warning:**
> Microsoft recommends that you use the most secure authentication flow available. The authentication flow described in this procedure requires a very high degree of trust in the application, and carries risks that are not present in other flows. You should only use this flow when other more secure flows, such as managed identities, aren't viable.

#### Sample code

To connect using a connection string:


### [.NET](#tab/dotnet)

1. Install dependency.

    ```bash
    dotnet add package Azure.Data.Tables
    ```

1. Get the connection string from the environment variable added by Service Connector.

    ```csharp
    using Azure.Data.Tables;
    using System; 

    TableServiceClient tableServiceClient = new TableServiceClient(Environment.GetEnvironmentVariable("AZURE_COSMOS_CONNECTIONSTRING"));
    ```

### [Java](#tab/java)

1. Add the following dependency in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-data-tables</artifactId>
        <version>12.2.1</version>
    </dependency>
    ```

1. Get the connection string from the environment variable added by Service Connector.

    ```java
    import com.azure.data.tables.TableClient;
    import com.azure.data.tables.TableClientBuilder;

    String connectionStr = System.getenv("AZURE_COSMOS_CONNECTIONSTRING");

    TableClient tableClient = new TableClientBuilder()
        .connectionString(connectionStr)
        .buildClient();
    ```

### [Python](#tab/python)

1. Install dependency.

    ```bash
    pip install azure-data-tables
    ```

1. Get the connection string from the environment variable added by Service Connector.

    ```python
    import os
    from azure.data.tables import TableServiceClient

    conn_str = os.environ["AZURE_COSMOS_CONNECTIONSTRING"]
    table_service = TableServiceClient.from_connection_string(conn_str) 
    ```

### [Go](#tab/go)
1. Install dependency.
    ```bash
    go get github.com/Azure/azure-sdk-for-go/sdk/data/aztables
    ```
1. Get the connection string from the environment variable added by Service Connector.
    ```go
    import (
        "github.com/Azure/azure-sdk-for-go/sdk/data/aztables"
    )

    func main() {
        connStr := os.Getenv("AZURE_COSMOS_CONNECTIONSTRING")
        serviceClient, err := aztables.NewServiceClientFromConnectionString(connStr, nil)
        if err != nil {
            panic(err)
        }
    }
    ```

### [NodeJS](#tab/nodejs)

1. Install dependency.

    ```bash
    npm install @azure/data-tables
    ```

1. Get the connection string from the environment variable added by Service Connector.

    ```javascript
    const { TableClient } = require("@azure/data-tables");

    const serviceClient = TableClient.fromConnectionString(process.env.AZURE_COSMOS_CONNECTIONSTRING);
    ```

### [Other](#tab/none)
For other languages, you can use the endpoint URL and other properties that Service Connector sets to the environment variables to connect to Azure Cosmos DB for Table. For environment variable details, see [Integrate Azure Cosmos DB for Table with Service Connector](how-to-integrate-cosmos-table.md).


#### Service principal

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| AZURE_COSMOS_LISTCONNECTIONSTRINGURL | The URL to get the connection string | `https://management.azure.com/subscriptions/<subscription-ID>/resourceGroups/<resource-group-name>/providers/Microsoft.DocumentDB/databaseAccounts/<table-name>/listConnectionStrings?api-version=2021-04-15` |
| AZURE_COSMOS_SCOPE | Your managed identity scope | `https://management.azure.com/.default` |
| AZURE_COSMOS_CLIENTID | Your client secret ID | `<client-ID>` |
| AZURE_COSMOS_CLIENTSECRET | Your client secret | `<client-secret>` |
| AZURE_COSMOS_TENANTID | Your tenant ID | `<tenant-ID>` |
| AZURE_COSMOS_RESOURCEENDPOINT | Your resource endpoint | `https://<table-name>.documents.azure.com:443/` |

#### Sample code

To connect using a service principal:

### [.NET](#tab/dotnet)

1. Install dependencies.
    ```bash
    dotnet add package Azure.Data.Tables
    dotnet add package Azure.Identity
    ```
1. Get an access token for the managed identity or service principal using [Azure.Identity](https://www.nuget.org/packages/Azure.Identity/). Use the access token and `AZURE_COSMOS_LISTCONNECTIONSTRINGURL` to get the connection string and connect to Azure Cosmos DB for Table. In the code below, uncomment the section for your authentication type:
    ```csharp
    using System;
    using System.Security.Authentication;
    using System.Net.Security;
    using System.Net.Http;
    using System.Security.Authentication;
    using System.Threading.Tasks;
    using Azure.Data.Tables;
    using Azure.Identity;

    var endpoint = Environment.GetEnvironmentVariable("AZURE_COSMOS_RESOURCEENDPOINT");
    var listConnectionStringUrl = Environment.GetEnvironmentVariable("AZURE_COSMOS_LISTCONNECTIONSTRINGURL");
    var scope = Environment.GetEnvironmentVariable("AZURE_COSMOS_SCOPE");

    // Uncomment the following lines corresponding to the authentication type you want to use.
    // For system-assigned identity.
    // var tokenProvider = new DefaultAzureCredential();

    // For user-assigned identity.
    // var tokenProvider = new DefaultAzureCredential(
    //     new DefaultAzureCredentialOptions
    //     {
    //         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_COSMOS_CLIENTID");
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
    var response = await httpClient.POSTAsync(listConnectionStringUrl);
    var responseBody = await response.Content.ReadAsStringAsync();
    var connectionStrings = JsonConvert.DeserializeObject<Dictionary<string, List<Dictionary<string, string>>>(responseBody);
    var connectionString = connectionStrings["connectionStrings"].Find(connStr => connStr["description"] == "Primary Table Connection String")["connectionString"];

    // Connect to Azure Cosmos DB for Table
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
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.1.5</version>
    </dependency>
    ```
1. Get an access token for the managed identity or service principal using `azure-identity`. Use the access token and `AZURE_COSMOS_LISTCONNECTIONSTRINGURL` to get the connection string and connect to Azure Cosmos DB for Table. In the code below, uncomment the section for your authentication type:
    ```java
    import com.azure.data.tables.TableClient;
    import com.azure.data.tables.TableClientBuilder;
    import javax.net.ssl.*;
    import java.net.InetSocketAddress;
    import com.azure.identity.*;
    import com.azure.core.credential.*;
    import java.net.http.*;

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
    String connectionString;
    for (Map<String, String> connStr : connectionStrings){
        if (connStr.get("description") == "Primary Table Connection String"){
            connectionString = connStr.get("connectionString");
            break;
        }
    }

    // Connect to Azure Cosmos DB for Table
    TableClient tableClient = new TableClientBuilder()
        .connectionString(connectionString)
        .buildClient();
    ```
### [Python](#tab/python)
1. Install dependencies.
    ```bash
    pip install azure-data-tables
    pip install azure-identity
    ```
1. Get an access token for the managed identity or service principal using `azure-identity`. Use the access token and `AZURE_COSMOS_LISTCONNECTIONSTRINGURL` to get the connection string and connect to Azure Cosmos DB for Table. In the code below, uncomment the section for your authentication type:
    ```python
    import os
    from azure.data.tables import TableServiceClient
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
    conn_str = x["connectionString"] for x in keys_dict["connectionStrings"] if x["description"] == "Primary Table Connection String"

    # Connect to Azure Cosmos DB for Table
    table_service = TableServiceClient.from_connection_string(conn_str) 
    ```

### [Go](#tab/go)
1. Install dependencies.
    ```bash
    go get github.com/Azure/azure-sdk-for-go/sdk/data/aztables
    go get github.com/Azure/azure-sdk-for-go/sdk/azidentity
    ```
1. In code, get an access token using `azidentity`, then use it to get the connection string. Get connection information from environment variables added by Service Connector and connect to Azure Cosmos DB for Table. In the code below, uncomment the section for your authentication type:
    ```go
    import (
        "fmt"
        "os"
        "context"
        "log"
        "io/ioutil"
        "encoding/json"

        "github.com/Azure/azure-sdk-for-go/sdk/data/aztables"
        "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
    )

    func main() {
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
        connStr := ""
        for i := range result["connectionStrings"]{
            if result["connectionStrings"][i]["description"] == "Primary Table Connection String" {
                connStr, err := result["connectionStrings"][i]["connectionString"]
                break
            }
        }
        
        serviceClient, err := aztables.NewServiceClientFromConnectionString(connStr, nil)
        if err != nil {
            panic(err)
        }
    }
    ```

### [NodeJS](#tab/nodejs)
1. Install dependencies.
   ```bash
   npm install @azure/data-tables
   npm install --save @azure/identity
   ```
1. In code, get the access token using `@azure/identity`, then use it to get the connection string. Get connection information from environment variables added by Service Connector and connect to Azure Cosmos DB for Table. In the code below, uncomment the section for your authentication type:
    ```javascript
    import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
    const { TableClient } = require("@azure/data-tables");
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
    const connectionString = keysDict["connectionStrings"].find(connStr => connStr["description"] == "Primary Table Connection String")["connectionString"];

    // Connect to Azure Cosmos DB for Table
    const serviceClient = TableClient.fromConnectionString(connectionString);
    ```

### [Other](#tab/none)
For other languages, you can use the endpoint URL and other properties that Service Connector sets to the environment variables to connect to Azure Cosmos DB for Table. For environment variable details, see [Integrate Azure Cosmos DB for Table with Service Connector](how-to-integrate-cosmos-table.md).

## Next steps

Follow the tutorials listed below to learn more about Service Connector.

> 
> [Learn about Service Connector concepts](concept-service-connector-internals.md)
