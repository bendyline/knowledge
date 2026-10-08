---
title: Integrate Azure Cosmos DB for Apache Cassandra with Service Connector
description: Integrate the Azure Cosmos DB for Apache Cassandra into your application with Service Connector
author: maud-lv
ms.author: malev
ms.service: service-connector
ms.topic: how-to
ms.date: 06/17/2026
---

# Integrate Azure Cosmos DB for Cassandra with Service Connector

This article shows supported authentication methods and clients, and provides sample code for connecting Azure Cosmos DB for Apache Cassandra to cloud services using Service Connector. You can also connect using other programming languages without Service Connector. The article includes default environment variable names and values you receive when creating a service connection. 

## Supported compute services

Service Connector can be used to connect the following compute services to Azure Cosmos DB for Apache Cassandra:

- Azure App Service
- Azure Functions
- Azure Kubernetes Service (AKS)
- Azure Spring Apps

## Supported authentication types and client types

The table below shows which combinations of client types and authentication methods are supported for connecting your compute service to Azure Cosmos DB for Apache Cassandra using Service Connector. A “Yes” indicates that the combination is supported, while a “No” indicates that it is not supported.

| Client type | System-assigned managed identity | User-assigned managed identity | Secret / connection string | Service principal |
| --- | --- | --- | --- | --- |
| .NET | Yes | Yes | Yes | Yes |
| Go | Yes | Yes | Yes | Yes |
| Java | Yes | Yes | Yes | Yes |
| Java - Spring Boot | No | No | Yes | No |
| Node.js | Yes | Yes | Yes | Yes |
| Python | Yes | Yes | Yes | Yes |
| None | Yes | Yes | Yes | Yes |

This table indicates that all combinations of client types and authentication methods in the table are supported, except for the Java - Spring Boot client type, which only supports the Secret / connection string method. All other client types can use any of the authentication methods to connect to Azure Cosmos DB for Apache Cassandra using Service Connector.

> **Note:**
> Cosmos DB does not natively support authentication via managed identity. Therefore, Service Connector uses the managed identity to retrieve the connection string, and the connection is subsequently established using that connection string.

## Default environment variable names or application properties and sample code

Reference the connection details and sample code in the following tables, according to your connection's authentication type and client type, to connect your compute services to Azure Cosmos DB for Apache Cassandra. For more information about naming conventions, check the [Service Connector internals](concept-service-connector-internals.md#configuration-naming-convention) article.

### System-assigned managed identity

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| AZURE_COSMOS_LISTKEYURL | The URL to get the connection string | `https://management.azure.com/subscriptions/<subscription-ID>/resourceGroups/<resource-group-name>/providers/Microsoft.DocumentDB/databaseAccounts/<Azure-Cosmos-DB-account>/listKeys?api-version=2021-04-15` |
| AZURE_COSMOS_SCOPE | Your managed identity scope | `https://management.azure.com/.default` |
| AZURE_COSMOS_RESOURCEENDPOINT | Your resource endpoint | `https://<Azure-Cosmos-DB-account>.documents.azure.com:443/` |
| AZURE_COSMOS_CONTACTPOINT | Azure Cosmos DB for Apache Cassandra contact point | `<Azure-Cosmos-DB-account>.cassandra.cosmos.azure.com` |
| AZURE_COSMOS_PORT | Cassandra connection port | 10350 |
| AZURE_COSMOS_KEYSPACE | Cassandra keyspace | `<keyspace>` |
| AZURE_COSMOS_USERNAME | Cassandra username | `<username>` |

#### Sample code

Connect to Azure Cosmos DB for Cassandra using a system-assigned managed identity.

Since Cosmos DB doesn't natively support authentication via managed identity, in the following code sample, we use the managed identity to retrieve the connection string, and the connection is then established using that connection string.



### [.NET](#tab/dotnet)

1. Install dependencies.
    ```bash
    dotnet add package CassandraCSharpDriver --version 3.19.3
    dotnet add package Azure.Identity
    ```

1. Get an access token for the managed identity or service principal by using Azure.Identity. Use the access token and AZURE_COSMOS_LISTKEYURL to get the password. Then use connection information from environment variables added by Service Connector to connect to Azure Cosmos DB for Cassandra. In the code below, uncomment the section for your authentication type:

    ```csharp
    using System;
    using System.Security.Authentication;
    using System.Net.Security;
    using System.Net.Http;
    using System.Security.Authentication;
    using System.Security.Cryptography.X509Certificates;
    using System.Threading.Tasks;
    using Cassandra;
    using Azure.Identity;
    
    public class Program
    {
    	public static async Task Main()
    	{
            var cassandraContactPoint = Environment.GetEnvironmentVariable("AZURE_COSMOS_CONTACTPOINT");
            var userName = Environment.GetEnvironmentVariable("AZURE_COSMOS_USERNAME");
            var cassandraPort = Int32.Parse(Environment.GetEnvironmentVariable("AZURE_COSMOS_PORT"));
            var cassandraKeyspace = Environment.GetEnvironmentVariable("AZURE_COSMOS_KEYSPACE");
            var listKeyUrl = Environment.GetEnvironmentVariable("AZURE_COSMOS_LISTKEYURL");
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
    
            // Get the password.
            var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {accessToken.Token}");
            var response = await httpClient.POSTAsync(listKeyUrl);
            var responseBody = await response.Content.ReadAsStringAsync();
            var keys = JsonConvert.DeserializeObject<Dictionary<string, string>>(responseBody);
            var password = keys["primaryMasterKey"];
            
            // Connect to Azure Cosmos DB for Cassandra
            var options = new Cassandra.SSLOptions(SslProtocols.Tls12, true, ValidateServerCertificate);
            options.SetHostNameResolver((ipAddress) => cassandraContactPoint);
            Cluster cluster = Cluster
                .Builder()
                .WithCredentials(userName, password)
                .WithPort(cassandraPort)
                .AddContactPoint(cassandraContactPoint).WithSSL(options).Build();
            ISession session = await cluster.ConnectAsync();
        }
    
        public static bool ValidateServerCertificate
    	(
            object sender,
            X509Certificate certificate,
            X509Chain chain,
            SslPolicyErrors sslPolicyErrors
        )
        {
            if (sslPolicyErrors == SslPolicyErrors.None)
                return true;
    
            Console.WriteLine("Certificate error: {0}", sslPolicyErrors);
            // Do not allow this client to communicate with unauthenticated servers.
            return false;
        }
    }
    
    ```

### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:
    ```xml
    <dependency>
        <groupId>com.datastax.oss</groupId>
        <artifactId>java-driver-core</artifactId>
        <version>4.5.1</version>
    </dependency>  
    <dependency>
        <groupId>com.datastax.oss</groupId>
        <artifactId>java-driver-query-builder</artifactId>
        <version>4.0.0</version>
    </dependency>       
    <dependency>
        <groupId>com.datastax.cassandra</groupId>
        <artifactId>cassandra-driver-extras</artifactId>
        <version>3.1.4</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.1.5</version>
    </dependency>
    ```

1. Get an access token for the managed identity or service principal using `azure-identity`. Use the access token and `AZURE_COSMOS_LISTKEYURL` to get the password. Get the connection information from the environment variables added by Service Connector and connect to Azure Cosmos DB for Cassandra. When using the code below, uncomment the part of the code snippet for the authentication type you want to use. Replace `<AZURE_COSMOS_DB_ACCOUNT_LOCATION>` with the location of your Azure Cosmos DB account.

    ```java
    import com.datastax.oss.driver.api.core.CqlSession;
    import javax.net.ssl.*;
    import java.net.InetSocketAddress;
    import com.azure.identity.*;
    import com.azure.core.credential.*;
    import java.net.http.*;
    import java.net.URI;

    int cassandraPort = Integer.parseInt(System.getenv("AZURE_COSMOS_PORT"));
    String cassandraUsername = System.getenv("AZURE_COSMOS_USERNAME");
    String cassandraHost = System.getenv("AZURE_COSMOS_CONTACTPOINT");
    String cassandraKeyspace = System.getenv("AZURE_COSMOS_KEYSPACE");
    String listKeyUrl = System.getenv("AZURE_COSMOS_LISTKEYURL");
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

    // Get the password.
    HttpClient client = HttpClient.newBuilder()
        .version(HttpClient.Version.HTTP_1_1)
        .build();
    HttpRequest request = HttpRequest.newBuilder()
        .uri(new URI(listKeyUrl))
        .header("Authorization", "Bearer " + token)
        .POST()
        .build();
    HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
    JSONParser parser = new JSONParser();
    JSONObject responseBody = parser.parse(response.body());
    String cassandraPassword = responseBody.get("primaryMasterKey");
    
    // Connect to Azure Cosmos DB for Cassandra
    final SSLContext sc = SSLContext.getInstance("TLSv1.2");
    sc.init(null, null, null);
    CqlSession session = CqlSession.builder()
        .withSslContext(sc)
        .addContactPoint(new InetSocketAddress(cassandraHost, cassandraPort)).withLocalDatacenter('datacenter1')
        .withLocalDatacenter("<AZURE_COSMOS_DB_ACCOUNT_LOCATION>") // Use the same location as your Azure Cosmos DB account
        .withKeyspace(cassandraKeyspace)
        .withAuthCredentials(cassandraUsername, cassandraPassword)
        .build();
    ```

### [SpringBoot](#tab/springBoot)
Authentication type is not supported for Spring Boot.

### [Python](#tab/python)
1. Install dependencies
    ```bash
    pip install Cassandra-driver 
    pip install pyopenssl
    pip install azure-identity
    ```

1. Use `azure-identity` to authenticate with the managed identity or service principal and send request to `AZURE_COSMOS_LISTKEYURL` to get the password. Get the connection information from the environment variables added by Service Connector and connect to Azure Cosmos DB for Cassandra. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.
    ```python
    from cassandra.cluster import Cluster
    from ssl import PROTOCOL_TLSv1_2, SSLContext, CERT_NONE
    from cassandra.auth import PlainTextAuthProvider
    import requests
    from azure.identity import ManagedIdentityCredential, ClientSecretCredential

    username = os.getenv('AZURE_COSMOS_USERNAME')
    contactPoint = os.getenv('AZURE_COSMOS_CONTACTPOINT')
    port = os.getenv('AZURE_COSMOS_PORT')
    keyspace = os.getenv('AZURE_COSMOS_KEYSPACE')
    listKeyUrl = os.getenv('AZURE_COSMOS_LISTKEYURL')
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
    
    # Get the password 
    session = requests.Session()
    token = cred.get_token(scope)
    response = session.post(listKeyUrl, headers={"Authorization": "Bearer {}".format(token.token)})
    keys_dict = response.json()
    password = keys_dict['primaryMasterKey']
    
    # Connect to Azure Cosmos DB for Cassandra.
    ssl_context = SSLContext(PROTOCOL_TLSv1_2)
    ssl_context.verify_mode = CERT_NONE
    auth_provider = PlainTextAuthProvider(username, password)
    cluster = Cluster([contactPoint], port = port, auth_provider=auth_provider,ssl_context=ssl_context)
    session = cluster.connect()
    ```

### [Go](#tab/go)
1. Install dependencies.
   ```bash
   go get github.com/gocql/gocql
   go get "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
   go get "github.com/Azure/azure-sdk-for-go/sdk/azcore"
   ```
2. In code, get an access token via `azidentity`, then use it to acquire the password. Get the connection information from the environment variables added by Service Connector and connect to Azure Cosmos DB for Cassandra. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

    ```go
    import (
        "fmt"
        "os"
        "context"
        "log"
        "io/ioutil"
        "encoding/json"
    
        "github.com/gocql/gocql"
        "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
    )
    
    func GetSession() *gocql.Session {
        cosmosCassandraContactPoint = os.Getenv("AZURE_COSMOS_CONTACTPOINT")
        cosmosCassandraPort = os.Getenv("AZURE_COSMOS_PORT")
        cosmosCassandraUser = os.Getenv("AZURE_COSMOS_USERNAME")
        cosmosCassandraKeyspace = os.Getenv("AZURE_COSMOS_KEYSPACE")
        listKeyUrl = os.Getenv("AZURE_COSMOS_LISTKEYURL")
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
        
        // Acquire the password.
        client := &http.Client{}
    	req, err := http.NewRequest("POST", listKeyUrl, nil)
    	req.Header.Add("Authorization", "Bearer " + token.Token)
    	resp, err := client.Do(req)
        body, err := ioutil.ReadAll(resp.Body)
        var result map[string]interface{}
	    json.Unmarshal(body, &result)
        cosmosCassandraPassword, err := result["primaryMasterKey"]
        
        // Connect to Azure Cosmos DB for Cassandra
        clusterConfig := gocql.NewCluster(cosmosCassandraContactPoint)
        port, err := strconv.Atoi(cosmosCassandraPort)
        clusterConfig.Port = port
	    clusterConfig.ProtoVersion = 4
        clusterConfig.Authenticator = gocql.PasswordAuthenticator{Username: cosmosCassandraUser, Password: cosmosCassandraPassword}
        clusterConfig.SslOpts = &gocql.SslOptions{Config: &tls.Config{MinVersion: tls.VersionTLS12}}
        
        session, err := clusterConfig.CreateSession()
        return session
    }
    
    func main() {
        session := utils.GetSession(cosmosCassandraContactPoint, cosmosCassandraPort, cosmosCassandraUser, cosmosCassandraPassword)
        defer session.Close()
        ...
    }
    ```

### [NodeJS](#tab/node)
1. Install dependencies
   ```bash
   npm install cassandra-driver
   npm install --save @azure/identity
   ```
2. In code, get the access token via `@azure/identity`, then use it to acquire the password. Get the connection information from the environment variables added by Service Connector and connect to Azure Cosmos DB for Cassandra. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

    ```javascript
    import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
    const cassandra = require("cassandra-driver");
    const axios = require('axios');
    
    let username = process.env.AZURE_COSMOS_USERNAME;
    let contactPoint = process.env.AZURE_COSMOS_CONTACTPOINT;
    let port = process.env.AZURE_COSMOS_PORT;
    let keyspace = process.env.AZURE_COSMOS_KEYSPACE;
    let listKeyUrl = process.env.AZURE_COSMOS_LISTKEYURL;
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
    
    // Get the password.
    const config = {
        method: 'post',
        url: listKeyUrl,
        headers: { 
          'Authorization': `Bearer ${accessToken.token}`
        }
    };
    const response = await axios(config);
    const keysDict = response.data;
    const password = keysDict['primaryMasterKey'];
    
    let authProvider = new cassandra.auth.PlainTextAuthProvider(
        username,
        password
    );
    
    let client = new cassandra.Client({
        contactPoints: [`${contactPoint}:${port}`],
        authProvider: authProvider,
        localDataCenter: 'datacenter1',
        sslOptions: {
            secureProtocol: "TLSv1_2_method"
        },
    });
    
    client.connect();
    ```


### [Other](#tab/none)
For other languages, you can use the Cassandra contact point and other properties that Service Connector sets to the environment variables to connect to Azure Cosmos DB for Cassandra resource. For environment variable details, see [Integrate Azure Cosmos DB for Cassandra with Service Connector](how-to-integrate-cosmos-cassandra.md).


### User-assigned managed identity

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| AZURE_COSMOS_LISTKEYURL | The URL to get the connection string | `https://management.azure.com/subscriptions/<subscription-ID>/resourceGroups/<resource-group-name>/providers/Microsoft.DocumentDB/databaseAccounts/<Azure-Cosmos-DB-account>/listKeys?api-version=2021-04-15` |
| AZURE_COSMOS_SCOPE | Your managed identity scope | `https://management.azure.com/.default` |
| AZURE_COSMOS_RESOURCEENDPOINT | Your resource endpoint | `https://<Azure-Cosmos-DB-account>.documents.azure.com:443/` |
| AZURE_COSMOS_CONTACTPOINT | Azure Cosmos DB for Apache Cassandra contact point | `<Azure-Cosmos-DB-account>.cassandra.cosmos.azure.com` |
| AZURE_COSMOS_PORT | Cassandra connection port | 10350 |
| AZURE_COSMOS_KEYSPACE | Cassandra keyspace | `<keyspace>` |
| AZURE_COSMOS_USERNAME | Cassandra username | `<username>` |
| AZURE_COSMOS_CLIENTID | Your client ID | `<client-ID>` |

#### Sample code

Connect to Azure Cosmos DB for Cassandra using a user-assigned managed identity.

Since Cosmos DB doesn't natively support authentication via managed identity, in the following code sample, we use the managed identity to retrieve the connection string, and the connection is then established using that connection string.



### [.NET](#tab/dotnet)

1. Install dependencies.
    ```bash
    dotnet add package CassandraCSharpDriver --version 3.19.3
    dotnet add package Azure.Identity
    ```

1. Get an access token for the managed identity or service principal by using Azure.Identity. Use the access token and AZURE_COSMOS_LISTKEYURL to get the password. Then use connection information from environment variables added by Service Connector to connect to Azure Cosmos DB for Cassandra. In the code below, uncomment the section for your authentication type:

    ```csharp
    using System;
    using System.Security.Authentication;
    using System.Net.Security;
    using System.Net.Http;
    using System.Security.Authentication;
    using System.Security.Cryptography.X509Certificates;
    using System.Threading.Tasks;
    using Cassandra;
    using Azure.Identity;
    
    public class Program
    {
    	public static async Task Main()
    	{
            var cassandraContactPoint = Environment.GetEnvironmentVariable("AZURE_COSMOS_CONTACTPOINT");
            var userName = Environment.GetEnvironmentVariable("AZURE_COSMOS_USERNAME");
            var cassandraPort = Int32.Parse(Environment.GetEnvironmentVariable("AZURE_COSMOS_PORT"));
            var cassandraKeyspace = Environment.GetEnvironmentVariable("AZURE_COSMOS_KEYSPACE");
            var listKeyUrl = Environment.GetEnvironmentVariable("AZURE_COSMOS_LISTKEYURL");
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
    
            // Get the password.
            var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {accessToken.Token}");
            var response = await httpClient.POSTAsync(listKeyUrl);
            var responseBody = await response.Content.ReadAsStringAsync();
            var keys = JsonConvert.DeserializeObject<Dictionary<string, string>>(responseBody);
            var password = keys["primaryMasterKey"];
            
            // Connect to Azure Cosmos DB for Cassandra
            var options = new Cassandra.SSLOptions(SslProtocols.Tls12, true, ValidateServerCertificate);
            options.SetHostNameResolver((ipAddress) => cassandraContactPoint);
            Cluster cluster = Cluster
                .Builder()
                .WithCredentials(userName, password)
                .WithPort(cassandraPort)
                .AddContactPoint(cassandraContactPoint).WithSSL(options).Build();
            ISession session = await cluster.ConnectAsync();
        }
    
        public static bool ValidateServerCertificate
    	(
            object sender,
            X509Certificate certificate,
            X509Chain chain,
            SslPolicyErrors sslPolicyErrors
        )
        {
            if (sslPolicyErrors == SslPolicyErrors.None)
                return true;
    
            Console.WriteLine("Certificate error: {0}", sslPolicyErrors);
            // Do not allow this client to communicate with unauthenticated servers.
            return false;
        }
    }
    
    ```

### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:
    ```xml
    <dependency>
        <groupId>com.datastax.oss</groupId>
        <artifactId>java-driver-core</artifactId>
        <version>4.5.1</version>
    </dependency>  
    <dependency>
        <groupId>com.datastax.oss</groupId>
        <artifactId>java-driver-query-builder</artifactId>
        <version>4.0.0</version>
    </dependency>       
    <dependency>
        <groupId>com.datastax.cassandra</groupId>
        <artifactId>cassandra-driver-extras</artifactId>
        <version>3.1.4</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.1.5</version>
    </dependency>
    ```

1. Get an access token for the managed identity or service principal using `azure-identity`. Use the access token and `AZURE_COSMOS_LISTKEYURL` to get the password. Get the connection information from the environment variables added by Service Connector and connect to Azure Cosmos DB for Cassandra. When using the code below, uncomment the part of the code snippet for the authentication type you want to use. Replace `<AZURE_COSMOS_DB_ACCOUNT_LOCATION>` with the location of your Azure Cosmos DB account.

    ```java
    import com.datastax.oss.driver.api.core.CqlSession;
    import javax.net.ssl.*;
    import java.net.InetSocketAddress;
    import com.azure.identity.*;
    import com.azure.core.credential.*;
    import java.net.http.*;
    import java.net.URI;

    int cassandraPort = Integer.parseInt(System.getenv("AZURE_COSMOS_PORT"));
    String cassandraUsername = System.getenv("AZURE_COSMOS_USERNAME");
    String cassandraHost = System.getenv("AZURE_COSMOS_CONTACTPOINT");
    String cassandraKeyspace = System.getenv("AZURE_COSMOS_KEYSPACE");
    String listKeyUrl = System.getenv("AZURE_COSMOS_LISTKEYURL");
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

    // Get the password.
    HttpClient client = HttpClient.newBuilder()
        .version(HttpClient.Version.HTTP_1_1)
        .build();
    HttpRequest request = HttpRequest.newBuilder()
        .uri(new URI(listKeyUrl))
        .header("Authorization", "Bearer " + token)
        .POST()
        .build();
    HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
    JSONParser parser = new JSONParser();
    JSONObject responseBody = parser.parse(response.body());
    String cassandraPassword = responseBody.get("primaryMasterKey");
    
    // Connect to Azure Cosmos DB for Cassandra
    final SSLContext sc = SSLContext.getInstance("TLSv1.2");
    sc.init(null, null, null);
    CqlSession session = CqlSession.builder()
        .withSslContext(sc)
        .addContactPoint(new InetSocketAddress(cassandraHost, cassandraPort)).withLocalDatacenter('datacenter1')
        .withLocalDatacenter("<AZURE_COSMOS_DB_ACCOUNT_LOCATION>") // Use the same location as your Azure Cosmos DB account
        .withKeyspace(cassandraKeyspace)
        .withAuthCredentials(cassandraUsername, cassandraPassword)
        .build();
    ```

### [SpringBoot](#tab/springBoot)
Authentication type is not supported for Spring Boot.

### [Python](#tab/python)
1. Install dependencies
    ```bash
    pip install Cassandra-driver 
    pip install pyopenssl
    pip install azure-identity
    ```

1. Use `azure-identity` to authenticate with the managed identity or service principal and send request to `AZURE_COSMOS_LISTKEYURL` to get the password. Get the connection information from the environment variables added by Service Connector and connect to Azure Cosmos DB for Cassandra. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.
    ```python
    from cassandra.cluster import Cluster
    from ssl import PROTOCOL_TLSv1_2, SSLContext, CERT_NONE
    from cassandra.auth import PlainTextAuthProvider
    import requests
    from azure.identity import ManagedIdentityCredential, ClientSecretCredential

    username = os.getenv('AZURE_COSMOS_USERNAME')
    contactPoint = os.getenv('AZURE_COSMOS_CONTACTPOINT')
    port = os.getenv('AZURE_COSMOS_PORT')
    keyspace = os.getenv('AZURE_COSMOS_KEYSPACE')
    listKeyUrl = os.getenv('AZURE_COSMOS_LISTKEYURL')
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
    
    # Get the password 
    session = requests.Session()
    token = cred.get_token(scope)
    response = session.post(listKeyUrl, headers={"Authorization": "Bearer {}".format(token.token)})
    keys_dict = response.json()
    password = keys_dict['primaryMasterKey']
    
    # Connect to Azure Cosmos DB for Cassandra.
    ssl_context = SSLContext(PROTOCOL_TLSv1_2)
    ssl_context.verify_mode = CERT_NONE
    auth_provider = PlainTextAuthProvider(username, password)
    cluster = Cluster([contactPoint], port = port, auth_provider=auth_provider,ssl_context=ssl_context)
    session = cluster.connect()
    ```

### [Go](#tab/go)
1. Install dependencies.
   ```bash
   go get github.com/gocql/gocql
   go get "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
   go get "github.com/Azure/azure-sdk-for-go/sdk/azcore"
   ```
2. In code, get an access token via `azidentity`, then use it to acquire the password. Get the connection information from the environment variables added by Service Connector and connect to Azure Cosmos DB for Cassandra. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

    ```go
    import (
        "fmt"
        "os"
        "context"
        "log"
        "io/ioutil"
        "encoding/json"
    
        "github.com/gocql/gocql"
        "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
    )
    
    func GetSession() *gocql.Session {
        cosmosCassandraContactPoint = os.Getenv("AZURE_COSMOS_CONTACTPOINT")
        cosmosCassandraPort = os.Getenv("AZURE_COSMOS_PORT")
        cosmosCassandraUser = os.Getenv("AZURE_COSMOS_USERNAME")
        cosmosCassandraKeyspace = os.Getenv("AZURE_COSMOS_KEYSPACE")
        listKeyUrl = os.Getenv("AZURE_COSMOS_LISTKEYURL")
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
        
        // Acquire the password.
        client := &http.Client{}
    	req, err := http.NewRequest("POST", listKeyUrl, nil)
    	req.Header.Add("Authorization", "Bearer " + token.Token)
    	resp, err := client.Do(req)
        body, err := ioutil.ReadAll(resp.Body)
        var result map[string]interface{}
	    json.Unmarshal(body, &result)
        cosmosCassandraPassword, err := result["primaryMasterKey"]
        
        // Connect to Azure Cosmos DB for Cassandra
        clusterConfig := gocql.NewCluster(cosmosCassandraContactPoint)
        port, err := strconv.Atoi(cosmosCassandraPort)
        clusterConfig.Port = port
	    clusterConfig.ProtoVersion = 4
        clusterConfig.Authenticator = gocql.PasswordAuthenticator{Username: cosmosCassandraUser, Password: cosmosCassandraPassword}
        clusterConfig.SslOpts = &gocql.SslOptions{Config: &tls.Config{MinVersion: tls.VersionTLS12}}
        
        session, err := clusterConfig.CreateSession()
        return session
    }
    
    func main() {
        session := utils.GetSession(cosmosCassandraContactPoint, cosmosCassandraPort, cosmosCassandraUser, cosmosCassandraPassword)
        defer session.Close()
        ...
    }
    ```

### [NodeJS](#tab/node)
1. Install dependencies
   ```bash
   npm install cassandra-driver
   npm install --save @azure/identity
   ```
2. In code, get the access token via `@azure/identity`, then use it to acquire the password. Get the connection information from the environment variables added by Service Connector and connect to Azure Cosmos DB for Cassandra. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

    ```javascript
    import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
    const cassandra = require("cassandra-driver");
    const axios = require('axios');
    
    let username = process.env.AZURE_COSMOS_USERNAME;
    let contactPoint = process.env.AZURE_COSMOS_CONTACTPOINT;
    let port = process.env.AZURE_COSMOS_PORT;
    let keyspace = process.env.AZURE_COSMOS_KEYSPACE;
    let listKeyUrl = process.env.AZURE_COSMOS_LISTKEYURL;
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
    
    // Get the password.
    const config = {
        method: 'post',
        url: listKeyUrl,
        headers: { 
          'Authorization': `Bearer ${accessToken.token}`
        }
    };
    const response = await axios(config);
    const keysDict = response.data;
    const password = keysDict['primaryMasterKey'];
    
    let authProvider = new cassandra.auth.PlainTextAuthProvider(
        username,
        password
    );
    
    let client = new cassandra.Client({
        contactPoints: [`${contactPoint}:${port}`],
        authProvider: authProvider,
        localDataCenter: 'datacenter1',
        sslOptions: {
            secureProtocol: "TLSv1_2_method"
        },
    });
    
    client.connect();
    ```


### [Other](#tab/none)
For other languages, you can use the Cassandra contact point and other properties that Service Connector sets to the environment variables to connect to Azure Cosmos DB for Cassandra resource. For environment variable details, see [Integrate Azure Cosmos DB for Cassandra with Service Connector](how-to-integrate-cosmos-cassandra.md).


### Connection string

> **Warning:**
> Microsoft recommends that you use the most secure authentication flow available. The authentication flow described in this procedure requires a very high degree of trust in the application, and carries risks that are not present in other flows. You should only use this flow when other more secure flows, such as managed identities, aren't viable.

#### Spring Boot client type

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| spring.data.cassandra.contact-points | Azure Cosmos DB for Apache Cassandra contact point | `<Azure-Cosmos-DB-account>.cassandra.cosmos.azure.com` |
| spring.data.cassandra.port | Cassandra connection port | 10350 |
| spring.data.cassandra.keyspace-name | Cassandra keyspace | `<keyspace>` |
| spring.data.cassandra.username | Cassandra username | `<username>` |
| spring.data.cassandra.password | Cassandra password | `<password>` |
| spring.data.cassandra.local-datacenter | Azure Region | `<Azure-region>` |
| spring.data.cassandra.ssl | SSL status | true |

#### Other client types

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| AZURE_COSMOS_CONTACTPOINT | Azure Cosmos DB for Apache Cassandra contact point | `<Azure-Cosmos-DB-account>.cassandra.cosmos.azure.com` |
| AZURE_COSMOS_PORT | Cassandra connection port | 10350 |
| AZURE_COSMOS_KEYSPACE | Cassandra keyspace | `<keyspace>` |
| AZURE_COSMOS_USERNAME | Cassandra username | `<username>` |
| AZURE_COSMOS_PASSWORD | Cassandra password | `<password>` |

#### Sample code

To connect using a connection string:


### [.NET](#tab/dotnet)

1. Install dependency.
    ```bash
    dotnet add package CassandraCSharpDriver --version 3.19.3
    ```

2. Get the connection information from the environment variables added by Service Connector and connect to Azure Cosmos DB for Cassandra.
    ```csharp
    using System;
    using System.Security.Authentication;
    using System.Net.Security;
    using System.Security.Authentication;
    using System.Security.Cryptography.X509Certificates;
    using System.Threading.Tasks;
    using Cassandra;
    
    public class Program
    {
    	public static async Task Main()
    	{
            var cassandraContactPoint = Environment.GetEnvironmentVariable("AZURE_COSMOS_CONTACTPOINT");
            var userName = Environment.GetEnvironmentVariable("AZURE_COSMOS_USERNAME");
            var password = Environment.GetEnvironmentVariable("AZURE_COSMOS_PASSWORD");
            var cassandraPort = Int32.Parse(Environment.GetEnvironmentVariable("AZURE_COSMOS_PORT"));
            var cassandraKeyspace = Environment.GetEnvironmentVariable("AZURE_COSMOS_KEYSPACE");
            
            var options = new Cassandra.SSLOptions(SslProtocols.Tls12, true, ValidateServerCertificate);
            options.SetHostNameResolver((ipAddress) => cassandraContactPoint);
            Cluster cluster = Cluster
                .Builder()
                .WithCredentials(userName, password)
                .WithPort(cassandraPort)
                .AddContactPoint(cassandraContactPoint).WithSSL(options).Build();
            ISession session = await cluster.ConnectAsync();
        }
    
        public static bool ValidateServerCertificate
    	(
            object sender,
            X509Certificate certificate,
            X509Chain chain,
            SslPolicyErrors sslPolicyErrors
        )
        {
            if (sslPolicyErrors == SslPolicyErrors.None)
                return true;
    
            Console.WriteLine("Certificate error: {0}", sslPolicyErrors);
            // Do not allow this client to communicate with unauthenticated servers.
            return false;
        }
    }
    
    ```

For more information, see [Build an Apache Cassandra app with .NET SDK and Azure Cosmos DB](https://learn.microsoft.com/azure/cosmos-db/cassandra/manage-data-dotnet).

### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:
    ```xml
    <dependency>
        <groupId>com.datastax.oss</groupId>
        <artifactId>java-driver-core</artifactId>
        <version>4.5.1</version>
    </dependency>  
    <dependency>
        <groupId>com.datastax.oss</groupId>
        <artifactId>java-driver-query-builder</artifactId>
        <version>4.0.0</version>
    </dependency>       
    <dependency>
        <groupId>com.datastax.cassandra</groupId>
        <artifactId>cassandra-driver-extras</artifactId>
        <version>3.1.4</version>
    </dependency>
    ```

1. Get the connection information from the environment variables added by Service Connector and connect to Azure Cosmos DB for Cassandra.

    ```java
    import com.datastax.oss.driver.api.core.CqlSession;
    import javax.net.ssl.*;
    import java.net.InetSocketAddress;

    int cassandraPort = Integer.parseInt(System.getenv("AZURE_COSMOS_PORT"));
    String cassandraUsername = System.getenv("AZURE_COSMOS_USERNAME");
    String cassandraHost = System.getenv("AZURE_COSMOS_CONTACTPOINT");
    String cassandraPassword = System.getenv("AZURE_COSMOS_PASSWORD");
    String cassandraKeyspace = System.getenv("AZURE_COSMOS_KEYSPACE");

    final SSLContext sc = SSLContext.getInstance("TLSv1.2");
    
    CqlSession session = CqlSession.builder().withSslContext(sc)
        .addContactPoint(new InetSocketAddress(cassandraHost, cassandraPort)).withLocalDatacenter('datacenter1')
        .withAuthCredentials(cassandraUsername, cassandraPassword).build();
    ```

For more information, see [Build a Java app to manage Azure Cosmos DB for Apache Cassandra data](https://learn.microsoft.com/azure/cosmos-db/cassandra/manage-data-java-v4-sdk).

### [SpringBoot](#tab/springBoot)
Set up your Spring App application according to [How to use Spring Data with Azure Cosmos DB for Apache Cassandra](https://learn.microsoft.com/azure/developer/java/spring-framework/configure-spring-data-apache-cassandra-with-cosmos-db). The connection configuration properties are added to Spring Apps by Service Connector.


### [Python](#tab/python)
1. Install dependencies
    ```bash
    pip install Cassandra-driver 
    pip install pyopenssl
    ```

1. Get the connection information from the environment variables added by Service Connector and connect to Azure Cosmos DB for Cassandra.
    ```python
    from cassandra.cluster import Cluster
    from ssl import PROTOCOL_TLSv1_2, SSLContext, CERT_NONE
    from cassandra.auth import PlainTextAuthProvider

    username = os.getenv('AZURE_COSMOS_USERNAME')
    password = os.getenv('AZURE_COSMOS_PASSWORD')
    contactPoint = os.getenv('AZURE_COSMOS_CONTACTPOINT')
    port = os.getenv('AZURE_COSMOS_PORT')
    keyspace = os.getenv('AZURE_COSMOS_KEYSPACE')
    
    ssl_context = SSLContext(PROTOCOL_TLSv1_2)
    ssl_context.verify_mode = CERT_NONE
    auth_provider = PlainTextAuthProvider(username, password)
    cluster = Cluster([contactPoint], port = port, auth_provider=auth_provider,ssl_context=ssl_context)
    session = cluster.connect()
    ```

For more information, see [Build a Cassandra app with Python SDK and Azure Cosmos DB](https://learn.microsoft.com/azure/cosmos-db/cassandra/manage-data-python)

### [Go](#tab/go)
1. Install dependencies.
   ```bash
   go get github.com/gocql/gocql
   ```
2. Get the connection information from the environment variables added by Service Connector and connect to Azure Cosmos DB for Cassandra.
    ```go
    import (
        "fmt"
        "os"
        "context"
        "log"
    
        "github.com/gocql/gocql"
    )
    
    func GetSession() *gocql.Session {
        cosmosCassandraContactPoint = os.Getenv("AZURE_COSMOS_CONTACTPOINT")
        cosmosCassandraPort = os.Getenv("AZURE_COSMOS_PORT")
        cosmosCassandraUser = os.Getenv("AZURE_COSMOS_USERNAME")
        cosmosCassandraPassword = os.Getenv("AZURE_COSMOS_PASSWORD")
        cosmosCassandraKeyspace = os.Getenv("AZURE_COSMOS_KEYSPACE")
    
        clusterConfig := gocql.NewCluster(cosmosCassandraContactPoint)
        port, err := strconv.Atoi(cosmosCassandraPort)
        if err != nil {
		    // error handling
	    }
        
        clusterConfig.Port = port
	    clusterConfig.ProtoVersion = 4
        clusterConfig.Authenticator = gocql.PasswordAuthenticator{Username: cosmosCassandraUser, Password: cosmosCassandraPassword}
        clusterConfig.SslOpts = &gocql.SslOptions{Config: &tls.Config{MinVersion: tls.VersionTLS12}}
        
        session, err := clusterConfig.CreateSession()
        if err != nil {
		    // error handling
	    }
        return session
    }
    
    func main() {
        session := utils.GetSession(cosmosCassandraContactPoint, cosmosCassandraPort, cosmosCassandraUser, cosmosCassandraPassword)
        defer session.Close()
        ...
    }
    ```

For more information, refer to [Build a Go app with the gocql client to manage Azure Cosmos DB for Apache Cassandra data](https://learn.microsoft.com/azure/cosmos-db/cassandra/manage-data-go).

### [NodeJS](#tab/node)
1. Install dependencies
   ```bash
   npm install cassandra-driver
   ```
2. Get the connection information from the environment variables added by Service Connector and connect to Azure Cosmos DB for Cassandra.
   ```javascript
   const cassandra = require("cassandra-driver");

   let username = process.env.AZURE_COSMOS_USERNAME;
   let password = process.env.AZURE_COSMOS_PASSWORD;
   let contactPoint = process.env.AZURE_COSMOS_CONTACTPOINT;
   let port = process.env.AZURE_COSMOS_PORT;
   let keyspace = process.env.AZURE_COSMOS_KEYSPACE;

   let authProvider = new cassandra.auth.PlainTextAuthProvider(
      username,
      password
   );

   let client = new cassandra.Client({
        contactPoints: [`${contactPoint}:${port}`],
        authProvider: authProvider,
        localDataCenter: 'datacenter1',
        sslOptions: {
            secureProtocol: "TLSv1_2_method"
        },
    });
    
    client.connect();
   ```

For more details, refer to [Build a Cassandra app with Node.js SDK and Azure Cosmos DB](https://learn.microsoft.com/azure/cosmos-db/cassandra/manage-data-nodejs)


### [Other](#tab/none)
For other languages, you can use the Cassandra contact point and other properties that Service Connector sets to the environment variables to connect to Azure Cosmos DB for Cassandra resource. For environment variable details, see [Integrate Azure Cosmos DB for Cassandra with Service Connector](how-to-integrate-cosmos-cassandra.md).


#### Service principal

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| AZURE_COSMOS_LISTKEYURL | The URL to get the connection string | `https://management.azure.com/subscriptions/<subscription-ID>/resourceGroups/<resource-group-name>/providers/Microsoft.DocumentDB/databaseAccounts/<Azure-Cosmos-DB-account>/listKeys?api-version=2021-04-15` |
| AZURE_COSMOS_SCOPE | Your managed identity scope | `https://management.azure.com/.default` |
| AZURE_COSMOS_RESOURCEENDPOINT | Your resource endpoint | `https://<Azure-Cosmos-DB-account>.documents.azure.com:443/` |
| AZURE_COSMOS_CONTACTPOINT | Azure Cosmos DB for Apache Cassandra contact point | `<Azure-Cosmos-DB-account>.cassandra.cosmos.azure.com` |
| AZURE_COSMOS_PORT | Cassandra connection port | 10350 |
| AZURE_COSMOS_KEYSPACE | Cassandra keyspace | `<keyspace>` |
| AZURE_COSMOS_USERNAME | Cassandra username | `<username>` |
| AZURE_COSMOS_CLIENTID | Your client ID | `<client-ID>` |
| AZURE_COSMOS_CLIENTSECRET | Your client secret | `<client-secret>` |
| AZURE_COSMOS_TENANTID | Your tenant ID | `<tenant-ID>` |

#### Sample code

To connect using a service principal:


### [.NET](#tab/dotnet)

1. Install dependencies.
    ```bash
    dotnet add package CassandraCSharpDriver --version 3.19.3
    dotnet add package Azure.Identity
    ```

1. Get an access token for the managed identity or service principal by using Azure.Identity. Use the access token and AZURE_COSMOS_LISTKEYURL to get the password. Then use connection information from environment variables added by Service Connector to connect to Azure Cosmos DB for Cassandra. In the code below, uncomment the section for your authentication type:

    ```csharp
    using System;
    using System.Security.Authentication;
    using System.Net.Security;
    using System.Net.Http;
    using System.Security.Authentication;
    using System.Security.Cryptography.X509Certificates;
    using System.Threading.Tasks;
    using Cassandra;
    using Azure.Identity;
    
    public class Program
    {
    	public static async Task Main()
    	{
            var cassandraContactPoint = Environment.GetEnvironmentVariable("AZURE_COSMOS_CONTACTPOINT");
            var userName = Environment.GetEnvironmentVariable("AZURE_COSMOS_USERNAME");
            var cassandraPort = Int32.Parse(Environment.GetEnvironmentVariable("AZURE_COSMOS_PORT"));
            var cassandraKeyspace = Environment.GetEnvironmentVariable("AZURE_COSMOS_KEYSPACE");
            var listKeyUrl = Environment.GetEnvironmentVariable("AZURE_COSMOS_LISTKEYURL");
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
    
            // Get the password.
            var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {accessToken.Token}");
            var response = await httpClient.POSTAsync(listKeyUrl);
            var responseBody = await response.Content.ReadAsStringAsync();
            var keys = JsonConvert.DeserializeObject<Dictionary<string, string>>(responseBody);
            var password = keys["primaryMasterKey"];
            
            // Connect to Azure Cosmos DB for Cassandra
            var options = new Cassandra.SSLOptions(SslProtocols.Tls12, true, ValidateServerCertificate);
            options.SetHostNameResolver((ipAddress) => cassandraContactPoint);
            Cluster cluster = Cluster
                .Builder()
                .WithCredentials(userName, password)
                .WithPort(cassandraPort)
                .AddContactPoint(cassandraContactPoint).WithSSL(options).Build();
            ISession session = await cluster.ConnectAsync();
        }
    
        public static bool ValidateServerCertificate
    	(
            object sender,
            X509Certificate certificate,
            X509Chain chain,
            SslPolicyErrors sslPolicyErrors
        )
        {
            if (sslPolicyErrors == SslPolicyErrors.None)
                return true;
    
            Console.WriteLine("Certificate error: {0}", sslPolicyErrors);
            // Do not allow this client to communicate with unauthenticated servers.
            return false;
        }
    }
    
    ```

### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:
    ```xml
    <dependency>
        <groupId>com.datastax.oss</groupId>
        <artifactId>java-driver-core</artifactId>
        <version>4.5.1</version>
    </dependency>  
    <dependency>
        <groupId>com.datastax.oss</groupId>
        <artifactId>java-driver-query-builder</artifactId>
        <version>4.0.0</version>
    </dependency>       
    <dependency>
        <groupId>com.datastax.cassandra</groupId>
        <artifactId>cassandra-driver-extras</artifactId>
        <version>3.1.4</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.1.5</version>
    </dependency>
    ```

1. Get an access token for the managed identity or service principal using `azure-identity`. Use the access token and `AZURE_COSMOS_LISTKEYURL` to get the password. Get the connection information from the environment variables added by Service Connector and connect to Azure Cosmos DB for Cassandra. When using the code below, uncomment the part of the code snippet for the authentication type you want to use. Replace `<AZURE_COSMOS_DB_ACCOUNT_LOCATION>` with the location of your Azure Cosmos DB account.

    ```java
    import com.datastax.oss.driver.api.core.CqlSession;
    import javax.net.ssl.*;
    import java.net.InetSocketAddress;
    import com.azure.identity.*;
    import com.azure.core.credential.*;
    import java.net.http.*;
    import java.net.URI;

    int cassandraPort = Integer.parseInt(System.getenv("AZURE_COSMOS_PORT"));
    String cassandraUsername = System.getenv("AZURE_COSMOS_USERNAME");
    String cassandraHost = System.getenv("AZURE_COSMOS_CONTACTPOINT");
    String cassandraKeyspace = System.getenv("AZURE_COSMOS_KEYSPACE");
    String listKeyUrl = System.getenv("AZURE_COSMOS_LISTKEYURL");
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

    // Get the password.
    HttpClient client = HttpClient.newBuilder()
        .version(HttpClient.Version.HTTP_1_1)
        .build();
    HttpRequest request = HttpRequest.newBuilder()
        .uri(new URI(listKeyUrl))
        .header("Authorization", "Bearer " + token)
        .POST()
        .build();
    HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
    JSONParser parser = new JSONParser();
    JSONObject responseBody = parser.parse(response.body());
    String cassandraPassword = responseBody.get("primaryMasterKey");
    
    // Connect to Azure Cosmos DB for Cassandra
    final SSLContext sc = SSLContext.getInstance("TLSv1.2");
    sc.init(null, null, null);
    CqlSession session = CqlSession.builder()
        .withSslContext(sc)
        .addContactPoint(new InetSocketAddress(cassandraHost, cassandraPort)).withLocalDatacenter('datacenter1')
        .withLocalDatacenter("<AZURE_COSMOS_DB_ACCOUNT_LOCATION>") // Use the same location as your Azure Cosmos DB account
        .withKeyspace(cassandraKeyspace)
        .withAuthCredentials(cassandraUsername, cassandraPassword)
        .build();
    ```

### [SpringBoot](#tab/springBoot)
Authentication type is not supported for Spring Boot.

### [Python](#tab/python)
1. Install dependencies
    ```bash
    pip install Cassandra-driver 
    pip install pyopenssl
    pip install azure-identity
    ```

1. Use `azure-identity` to authenticate with the managed identity or service principal and send request to `AZURE_COSMOS_LISTKEYURL` to get the password. Get the connection information from the environment variables added by Service Connector and connect to Azure Cosmos DB for Cassandra. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.
    ```python
    from cassandra.cluster import Cluster
    from ssl import PROTOCOL_TLSv1_2, SSLContext, CERT_NONE
    from cassandra.auth import PlainTextAuthProvider
    import requests
    from azure.identity import ManagedIdentityCredential, ClientSecretCredential

    username = os.getenv('AZURE_COSMOS_USERNAME')
    contactPoint = os.getenv('AZURE_COSMOS_CONTACTPOINT')
    port = os.getenv('AZURE_COSMOS_PORT')
    keyspace = os.getenv('AZURE_COSMOS_KEYSPACE')
    listKeyUrl = os.getenv('AZURE_COSMOS_LISTKEYURL')
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
    
    # Get the password 
    session = requests.Session()
    token = cred.get_token(scope)
    response = session.post(listKeyUrl, headers={"Authorization": "Bearer {}".format(token.token)})
    keys_dict = response.json()
    password = keys_dict['primaryMasterKey']
    
    # Connect to Azure Cosmos DB for Cassandra.
    ssl_context = SSLContext(PROTOCOL_TLSv1_2)
    ssl_context.verify_mode = CERT_NONE
    auth_provider = PlainTextAuthProvider(username, password)
    cluster = Cluster([contactPoint], port = port, auth_provider=auth_provider,ssl_context=ssl_context)
    session = cluster.connect()
    ```

### [Go](#tab/go)
1. Install dependencies.
   ```bash
   go get github.com/gocql/gocql
   go get "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
   go get "github.com/Azure/azure-sdk-for-go/sdk/azcore"
   ```
2. In code, get an access token via `azidentity`, then use it to acquire the password. Get the connection information from the environment variables added by Service Connector and connect to Azure Cosmos DB for Cassandra. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

    ```go
    import (
        "fmt"
        "os"
        "context"
        "log"
        "io/ioutil"
        "encoding/json"
    
        "github.com/gocql/gocql"
        "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
    )
    
    func GetSession() *gocql.Session {
        cosmosCassandraContactPoint = os.Getenv("AZURE_COSMOS_CONTACTPOINT")
        cosmosCassandraPort = os.Getenv("AZURE_COSMOS_PORT")
        cosmosCassandraUser = os.Getenv("AZURE_COSMOS_USERNAME")
        cosmosCassandraKeyspace = os.Getenv("AZURE_COSMOS_KEYSPACE")
        listKeyUrl = os.Getenv("AZURE_COSMOS_LISTKEYURL")
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
        
        // Acquire the password.
        client := &http.Client{}
    	req, err := http.NewRequest("POST", listKeyUrl, nil)
    	req.Header.Add("Authorization", "Bearer " + token.Token)
    	resp, err := client.Do(req)
        body, err := ioutil.ReadAll(resp.Body)
        var result map[string]interface{}
	    json.Unmarshal(body, &result)
        cosmosCassandraPassword, err := result["primaryMasterKey"]
        
        // Connect to Azure Cosmos DB for Cassandra
        clusterConfig := gocql.NewCluster(cosmosCassandraContactPoint)
        port, err := strconv.Atoi(cosmosCassandraPort)
        clusterConfig.Port = port
	    clusterConfig.ProtoVersion = 4
        clusterConfig.Authenticator = gocql.PasswordAuthenticator{Username: cosmosCassandraUser, Password: cosmosCassandraPassword}
        clusterConfig.SslOpts = &gocql.SslOptions{Config: &tls.Config{MinVersion: tls.VersionTLS12}}
        
        session, err := clusterConfig.CreateSession()
        return session
    }
    
    func main() {
        session := utils.GetSession(cosmosCassandraContactPoint, cosmosCassandraPort, cosmosCassandraUser, cosmosCassandraPassword)
        defer session.Close()
        ...
    }
    ```

### [NodeJS](#tab/node)
1. Install dependencies
   ```bash
   npm install cassandra-driver
   npm install --save @azure/identity
   ```
2. In code, get the access token via `@azure/identity`, then use it to acquire the password. Get the connection information from the environment variables added by Service Connector and connect to Azure Cosmos DB for Cassandra. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

    ```javascript
    import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
    const cassandra = require("cassandra-driver");
    const axios = require('axios');
    
    let username = process.env.AZURE_COSMOS_USERNAME;
    let contactPoint = process.env.AZURE_COSMOS_CONTACTPOINT;
    let port = process.env.AZURE_COSMOS_PORT;
    let keyspace = process.env.AZURE_COSMOS_KEYSPACE;
    let listKeyUrl = process.env.AZURE_COSMOS_LISTKEYURL;
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
    
    // Get the password.
    const config = {
        method: 'post',
        url: listKeyUrl,
        headers: { 
          'Authorization': `Bearer ${accessToken.token}`
        }
    };
    const response = await axios(config);
    const keysDict = response.data;
    const password = keysDict['primaryMasterKey'];
    
    let authProvider = new cassandra.auth.PlainTextAuthProvider(
        username,
        password
    );
    
    let client = new cassandra.Client({
        contactPoints: [`${contactPoint}:${port}`],
        authProvider: authProvider,
        localDataCenter: 'datacenter1',
        sslOptions: {
            secureProtocol: "TLSv1_2_method"
        },
    });
    
    client.connect();
    ```


### [Other](#tab/none)
For other languages, you can use the Cassandra contact point and other properties that Service Connector sets to the environment variables to connect to Azure Cosmos DB for Cassandra resource. For environment variable details, see [Integrate Azure Cosmos DB for Cassandra with Service Connector](how-to-integrate-cosmos-cassandra.md).


## Next steps

Follow the tutorials listed below to learn more about Service Connector.

> 
> [Learn about Service Connector concepts](concept-service-connector-internals.md)
