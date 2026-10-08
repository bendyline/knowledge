---
title: Integrate Azure Database for PostgreSQL with Service Connector
description: Integrate Azure Database for PostgreSQL into your application with Service Connector
author: maud-lv
ms.author: malev
ms.service: service-connector
ms.topic: how-to
ms.custom: engagement-fy23
ms.date: 11/21/2025
---

# Integrate Azure Database for PostgreSQL with Service Connector

This article covers supported authentication methods, clients, and sample code you can use to connect your apps to Azure Database for PostgreSQL using Service Connector. In this article, you'll also find default environment variable names, values, and configuration obtained when creating service connections.

## Supported compute services

Service Connector can be used to connect the following compute services to Azure Database for PostgreSQL:

- Azure App Service
- Azure Functions
- Azure Kubernetes Service (AKS)
- Azure Spring Apps

## Supported authentication types and client types

The table below shows which combinations of authentication methods and clients are supported for connecting compute services to Azure Database for PostgreSQL using Service Connector. A “Yes” indicates that the combination is supported, while a “No” indicates that it is not supported.

| Client type | System-assigned managed identity | User-assigned managed identity | Secret/connection string | Service principal |
| --- | :---: | :---: | :---: | :---: |
| .NET | Yes | Yes | Yes | Yes |
| Go (pg) | Yes | Yes | Yes | Yes |
| Java (JDBC) | Yes | Yes | Yes | Yes |
| Java - Spring Boot (JDBC) | Yes | Yes | Yes | Yes |
| Node.js (pg) | Yes | Yes | Yes | Yes |
| PHP (native) | Yes | Yes | Yes | Yes |
| Python (psycopg2) | Yes | Yes | Yes | Yes |
| Python-Django | Yes | Yes | Yes | Yes |
| Ruby (ruby-pg) | Yes | Yes | Yes | Yes |
| None | Yes | Yes | Yes | Yes |

> **Note:**
> System-assigned managed identity, User-assigned managed identity and Service principal are only supported on Azure CLI.

## Default environment variable names or application properties and sample code

Reference the connection details and sample code in the following tables, according to your connection's authentication type and client type. For more information about naming conventions, check the [Service Connector internals](concept-service-connector-internals.md#configuration-naming-convention) article.

### System-assigned managed identity

#### [.NET](#tab/dotnet)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_CONNECTIONSTRING` | .NET PostgreSQL connection string | `Server=<PostgreSQL-server-name>.postgres.database.azure.com;Database=<database-name>;Port=5432;Ssl Mode=Require;User Id=<username>;` |

#### [Java](#tab/java)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_CONNECTIONSTRING` | JDBC PostgreSQL connection string | `jdbc:postgresql://<PostgreSQL-server-name>.postgres.database.azure.com:5432/<database-name>?sslmode=require&user=<username>` |

#### [Spring Boot](#tab/springBoot)

| Application properties | Description | Example value |
| --- | --- | --- |
| `spring.datasource.azure.passwordless-enabled` | Enable passwordless authentication | `true` |
| `spring.datasource.url` | Database URL | `jdbc:postgresql://<PostgreSQL-server-name>.postgres.database.azure.com:5432/<database-name>?sslmode=require` |
| `spring.datasource.username` | Database username | `username` |

#### [Python](#tab/python)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_CONNECTIONSTRING` | psycopg2 connection string | `dbname=<database-name> host=<PostgreSQL-server-name>.postgres.database.azure.com port=5432 sslmode=require user=<username>` |

#### [Django](#tab/django)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_NAME` | Database name | `<database-name>` |
| `AZURE_POSTGRESQL_HOST` | Database host URL | `<PostgreSQL-server-name>.postgres.database.azure.com` |
| `AZURE_POSTGRESQL_USER` | Database username | `<username>` |

#### [Go](#tab/go)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_CONNECTIONSTRING` | Go PostgreSQL connection string | `host=<PostgreSQL-server-name>.postgres.database.azure.com dbname=<database-name> sslmode=require user=<username>` |

#### [NodeJS](#tab/nodejs)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_HOST` | Database host URL | `<PostgreSQL-server-name>.postgres.database.azure.com` |
| `AZURE_POSTGRESQL_USER` | Database username | `<username>` |
| `AZURE_POSTGRESQL_DATABASE` | Database name | `<database-name>` |
| `AZURE_POSTGRESQL_PORT` | Port number | `5432` |
| `AZURE_POSTGRESQL_SSL` | SSL option | `true` |

#### [PHP](#tab/php)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_CONNECTIONSTRING` | PHP native PostgreSQL connection string | `host=<PostgreSQL-server-name>.postgres.database.azure.com port=5432 dbname=<database-name> sslmode=require user=<username>` |

#### [Ruby](#tab/ruby)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_CONNECTIONSTRING` | Ruby PostgreSQL connection string | `host=<your-postgres-server-name>.postgres.database.azure.com port=5432 dbname=<database-name> sslmode=require user=<username>` |

#### [Other](#tab/none)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_HOST` | Database host URL | `<PostgreSQL-server-name>.postgres.database.azure.com` |
| `AZURE_POSTGRESQL_USERNAME` | Database username | `<username>` |
| `AZURE_POSTGRESQL_DATABASE` | Database name | `<database-name>` |
| `AZURE_POSTGRESQL_PORT` | Port number | `5432` |
| `AZURE_POSTGRESQL_SSL` | SSL option | `true` |


---

#### Sample code

Refer to the steps and code below to connect to Azure Database for PostgreSQL using a system-assigned managed identity.


#### [.NET](#tab/dotnet)
For .NET, there's not a plugin or library to support passwordless connections. You can get an access token for the managed identity or service principal using client library like [Azure.Identity](https://www.nuget.org/packages/Azure.Identity/). Then you can use the access token as the password to connect to the database. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

```csharp
using Azure.Identity;
using Azure.Core;
using Npgsql;

// Uncomment the following lines corresponding to the authentication type you want to use.
// For system-assigned identity.
// var sqlServerTokenProvider = new DefaultAzureCredential();

// For user-assigned identity.
// var sqlServerTokenProvider = new DefaultAzureCredential(
//     new DefaultAzureCredentialOptions
//     {
//         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_POSTGRESQL_CLIENTID");
//     }
// );

// For service principal.
// var tenantId = Environment.GetEnvironmentVariable("AZURE_POSTGRESQL_TENANTID");
// var clientId = Environment.GetEnvironmentVariable("AZURE_POSTGRESQL_CLIENTID");
// var clientSecret = Environment.GetEnvironmentVariable("AZURE_POSTGRESQL_CLIENTSECRET");
// var sqlServerTokenProvider = new ClientSecretCredential(tenantId, clientId, clientSecret);

// Acquire the access token. 
AccessToken accessToken = await sqlServerTokenProvider.GetTokenAsync(
    new TokenRequestContext(scopes: new string[]
    {
        "https://ossrdbms-aad.database.windows.net/.default"
    }));

// Combine the token with the connection string from the environment variables provided by Service Connector.
string connectionString =
    $"{Environment.GetEnvironmentVariable("AZURE_POSTGRESQL_CONNECTIONSTRING")};Password={accessToken.Token}";

// Establish the connection.
using (var connection = new NpgsqlConnection(connectionString))
{
    Console.WriteLine("Opening connection using access token...");
    connection.Open();
}
```

#### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
        <version>42.7.5</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity-extensions</artifactId>
        <version>1.2.0</version>
    </dependency>
    ```

1. Get the connection string from environment variables and add the plugin name to connect to the database:

    ```java
    import java.sql.*;
    
    String url = System.getenv("AZURE_POSTGRESQL_CONNECTIONSTRING");
    String pluginName = "com.azure.identity.extensions.jdbc.postgresql.AzurePostgresqlAuthenticationPlugin";  
    Connection connection = DriverManager.getConnection(url + "&authenticationPluginClassName=" + pluginName);
    ```

For more information, see the following resources:

* [Tutorial: Connect to a PostgreSQL Database from Java Tomcat App Service without secrets using a managed identity](../app-service/tutorial-java-tomcat-connect-managed-identity-postgresql-database.md)
* [Quickstart: Use Java and JDBC with Azure Database for PostgreSQL Flexible Server](https://learn.microsoft.com/azure/postgresql/flexible-server/connect-java?tabs=passwordless#connect-to-the-database)
* [Migrate an application to use passwordless connections with Azure Database for PostgreSQL](https://learn.microsoft.com/azure/developer/java/spring-framework/migrate-postgresql-to-passwordless-connection?tabs=sign-in-azure-cli%2Cjava%2Cservice-connector%2Cassign-role-service-connector)

#### [Spring Boot](#tab/springBoot)

For a Spring application, if you create a connection with option `--client-type springboot`, Service Connector sets the properties `spring.datasource.azure.passwordless-enabled`, `spring.datasource.url`, and `spring.datasource.username` to Azure Spring Apps.

Update your application following the tutorial [Bind an Azure Database for PostgreSQL to your application in Azure Spring Apps](../spring-apps/basic-standard/how-to-bind-postgres.md#prepare-your-project). Remember to remove the `spring.datasource.password` configuration property if it was set before and add the correct dependencies to your Spring application.

For more tutorials, see [Use Spring Data JDBC with Azure Database for PostgreSQL](https://learn.microsoft.com/azure/developer/java/spring-framework/configure-spring-data-jdbc-with-azure-postgresql?tabs=passwordless%2Cservice-connector\&pivots=postgresql-passwordless-flexible-server#store-data-from-azure-database-for-postgresql) and [Tutorial: Deploy a Spring application to Azure Spring Apps with a passwordless connection to an Azure database](https://learn.microsoft.com/azure/developer/java/spring-framework/deploy-passwordless-spring-database-app?tabs=postgresql).

#### [Python](#tab/python)

1. Install dependencies.
    ```bash
    pip install azure-identity
    pip install psycopg2-binary
    pip freeze > requirements.txt # Save the dependencies to a file
    ```
1. Get access token using `azure-identity` library and use the token as password. Get connection information from the environment variables added by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.
    
    ```python
    from azure.identity import DefaultAzureCredential
    import psycopg2
     
    # Uncomment the following lines corresponding to the authentication type you want to use.
    # For system-assigned identity.
    # cred = DefaultAzureCredential()

    # For user-assigned identity.
    # managed_identity_client_id = os.getenv('AZURE_POSTGRESQL_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)   
    
    # For service principal.
    # tenant_id = os.getenv('AZURE_POSTGRESQL_TENANTID')
    # client_id = os.getenv('AZURE_POSTGRESQL_CLIENTID')
    # client_secret = os.getenv('AZURE_POSTGRESQL_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)

    # Acquire the access token
    accessToken = cred.get_token('https://ossrdbms-aad.database.windows.net/.default')
    
    # Combine the token with the connection string from the environment variables added by Service Connector to establish the connection.
    conn_string = os.getenv('AZURE_POSTGRESQL_CONNECTIONSTRING')
    conn = psycopg2.connect(conn_string + ' password=' + accessToken.token) 
    ```

#### [Django](#tab/django)

1. Install dependencies.
    ```bash
   pip install azure-identity
   ```
1. Get access token using `azure-identity` library using environment variables added by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.
    
    ```python
    from azure.identity import DefaultAzureCredential
    import psycopg2

    # Uncomment the following lines corresponding to the authentication type you want to use.
    # For system-assigned identity.
    # credential = DefaultAzureCredential()

    # For user-assigned identity.
    # managed_identity_client_id = os.getenv('AZURE_POSTGRESQL_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)    
    
    # For service principal.
    # tenant_id = os.getenv('AZURE_POSTGRESQL_TENANTID')
    # client_id = os.getenv('AZURE_POSTGRESQL_CLIENTID')
    # client_secret = os.getenv('AZURE_POSTGRESQL_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)

    # Acquire the access token.
    accessToken = cred.get_token('https://ossrdbms-aad.database.windows.net/.default')
    ```

1. In setting file, get Azure PostgreSQL database information from environment variables added by Service Connector service. Use `accessToken` acquired in previous step to access the database.
    ```python
    # In your setting file, eg. settings.py
    host = os.getenv('AZURE_POSTGRESQL_HOST')
    user = os.getenv('AZURE_POSTGRESQL_USER')
    password = accessToken.token # this is accessToken acquired from above step.
    database = os.getenv('AZURE_POSTGRESQL_NAME')
    
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': database,
            'USER': user,
            'PASSWORD': password,
            'HOST': host,
            'PORT': '5432',  # Port is 5432 by default 
            'OPTIONS': {'sslmode': 'require'},
        }
    }
    ```

#### [Go](#tab/go)

1. Install dependencies.
    ```bash
    go get github.com/lib/pq
    go get "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
    go get "github.com/Azure/azure-sdk-for-go/sdk/azcore"
    ```
1. In code, get access token using `azidentity`, then use it as password to connect to Azure PostgreSQL along with connection information provided by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.
    
    ```go
    import (
    "database/sql"
    "fmt"
    "os"
    
    "context"
     
    "github.com/Azure/azure-sdk-for-go/sdk/azcore/policy"
    "github.com/Azure/azure-sdk-for-go/sdk/azidentity"

	_ "github.com/lib/pq"
    )    
    
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
        // error handling
    }

    // Acquire the access token
    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    token, err := cred.GetToken(ctx, policy.TokenRequestOptions{
        Scopes: []string("https://ossrdbms-aad.database.windows.net/.default"),
    })

    // Combine the token with the connection string from the environment variables added by Service Connector to establish the connection.
    connectionString := os.Getenv("AZURE_POSTGRESQL_CONNECTIONSTRING") + " password=" + token.Token
    
    conn, err := sql.Open("postgres", connectionString)
	if err != nil {
		panic(err)
	}

	conn.Close()
    ```    

#### [NodeJS](#tab/nodejs)

1. Install dependencies.
    ```bash
    npm install --save @azure/identity
    npm install --save pg
    ```
1. In code, get the access token using `@azure/identity` and PostgreSQL connection information from environment variables added by Service Connector service. Combine them to establish the connection. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.
    
    ```javascript
    import { DefaultAzureCredential, ClientSecretCredential } from "@azure/identity";
    import { Client } from 'pg';

    // Uncomment the following lines corresponding to the authentication type you want to use.  
    // For system-assigned identity.
    // const credential = new DefaultAzureCredential();

    // For user-assigned identity.
    // const clientId = process.env.AZURE_POSTGRESQL_CLIENTID;
    // const credential = new DefaultAzureCredential({
    //     managedIdentityClientId: clientId
    // });
    
    // For service principal.
    // const tenantId = process.env.AZURE_POSTGRESQL_TENANTID;
    // const clientId = process.env.AZURE_POSTGRESQL_CLIENTID;
    // const clientSecret = process.env.AZURE_POSTGRESQL_CLIENTSECRET;
    // const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

    // Acquire the access token.
    var accessToken = await credential.getToken('https://ossrdbms-aad.database.windows.net/.default');
    
    // Use the token and the connection information from the environment variables added by Service Connector to establish the connection.
    (async () => {
    const client = new Client({
        host: process.env.AZURE_POSTGRESQL_HOST,
        user: process.env.AZURE_POSTGRESQL_USER,
        password: accesstoken.token,
        database: process.env.AZURE_POSTGRESQL_DATABASE,
        port: Number(process.env.AZURE_POSTGRESQL_PORT) ,
        ssl: process.env.AZURE_POSTGRESQL_SSL
    });
    await client.connect();
    
    await client.end();
    })();
    ```

#### [PHP](#tab/php)

For PHP, there's not a plugin or library for passwordless connections. You can get an access token for the managed identity or service principal and use it as the password to connect to the database. The access token can be acquired using Azure REST API.

1. In code, get the access token using REST API with your favorite library.

    For user-assigned identity and system-assigned identity, Azure App Service provides an internally accessible REST endpoint to retrieve tokens for managed identities by defining two environment variables: `IDENTITY_ENDPOINT` and `IDENTITY_HEADER`. For more information, see [REST endpoint reference](https://learn.microsoft.com/azure/container-apps/managed-identity?tabs=http#rest-endpoint-reference). 
    Get the access token by making an HTTP GET request to the identity endpoint, and use `https://ossrdbms-aad.database.windows.net` as `resource` in the query. For user-assigned identity, please include the client ID from the environment variables added by Service Connector in the query as well.

    For service principal, refer to [the Azure AD service-to-service access token request](https://learn.microsoft.com/azure/active-directory/develop/v2-oauth2-client-creds-grant-flow#get-a-token) to see the details of how to acquire access token. Make the POST request the scope of `https://ossrdbms-aad.database.windows.net/.default` and with the tenant ID, client ID and client secret of the service principal from the environment variables added by Service Connector.

1. Combine the access token and the PostgreSQL connection string from environment variables added by Service Connector service to establish the connection.
    ```php
    <?php
    $conn_string = sprintf("%s password=", getenv('AZURE_POSTGRESQL_CONNECTIONSTRING'), $access_token);
    $dbconn = pg_connect($conn_string);
    ?>
    ```

#### [Ruby](#tab/ruby)

For Ruby, there's not a plugin or library for passwordless connections. You can get an access token for the managed identity or service principal and use it as the password to connect to the database. The access token can be acquired using Azure REST API.

1. Install dependencies.
    ```bash
    gem install pg
    ```
1. In code, get the access token using REST API and PostgreSQL connection information from environment variables added by Service Connector service. Combine them to establish the connection. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

    Azure App Service provides an internally accessible REST endpoint to retrieve tokens for managed identities. For more information, see [REST endpoint reference](https://learn.microsoft.com/azure/container-apps/managed-identity?tabs=http#rest-endpoint-reference).
    ```ruby
    require 'pg'
    require 'dotenv/load'
    require 'net/http'
    require 'json'
    
    # Uncomment the following lines corresponding to the authentication type you want to use.
    # For system-assigned identity.
    # uri = URI(ENV['IDENTITY_ENDPOINT'] + '?resource=https://ossrdbms-aad.database.windows.net&api-version=2019-08-01')
    # res = Net::HTTP.get_response(uri, {'X-IDENTITY-HEADER' => ENV['IDENTITY_HEADER'], 'Metadata' => 'true'})  

    # For user-assigned identity.
    # uri = URI(ENV[IDENTITY_ENDPOINT] + '?resource=https://ossrdbms-aad.database.windows.net&api-version=2019-08-01&client_id=' + ENV['AZURE_POSTGRESQL_CLIENTID'])
    # res = Net::HTTP.get_response(uri, {'X-IDENTITY-HEADER' => ENV['IDENTITY_HEADER'], 'Metadata' => 'true'})  
    
    # For service principal
    # uri = URI('https://login.microsoftonline.com/' + ENV['AZURE_POSTGRESQL_TENANTID'] + '/oauth2/v2.0/token')
    # params = {
    #     :grant_type => 'client_credentials',
    #     :client_id: => ENV['AZURE_POSTGRESQL_CLIENTID'],
    #     :client_secret => ENV['AZURE_POSTGRESQL_CLIENTSECRET'],
    #     :scope => 'https://ossrdbms-aad.database.windows.net/.default'
    # }
    # req = Net::HTTP::POST.new(uri)
    # req.set_form_data(params)
    # req['Content-Type'] = 'application/x-www-form-urlencoded'
    # res = Net::HTTP.start(uri.hostname, uri.port, :use_ssl => true) do |http|
    #   http.request(req)

    parsed = JSON.parse(res.body)
    access_token = parsed["access_token"]
    
    # Use the token and the connection string from the environment variables added by Service Connector to establish the connection.
    conn = PG::Connection.new(
        connection_string: ENV['AZURE_POSTGRESQL_CONNECTIONSTRING'] + " password="  + access_token,
    )
    ```
    
    Refer to [the Azure AD service-to-service access token request](https://learn.microsoft.com/azure/active-directory/develop/v2-oauth2-client-creds-grant-flow#get-a-token) to see more details of how to acquire access token for service principal.

### [Other](#tab/none)
For other languages, use the connection properties that Service Connector sets to the environment variables to connect the database. For environment variable details, see [Integrate Azure Database for PostgreSQL with Service Connector](how-to-integrate-postgres.md).

---


Next, if you created tables and sequences in PostgreSQL flexible server before using Service Connector, connect as the owner and grant permission to `<aad-username>` created by Service Connector. The username from the connection string or configuration set by Service Connector should look like `aad_<connection name>`. If you use the Azure portal, select the expand button next to the **Service Type** column to get the value. If you use the Azure CLI, check `configurations` in the CLI command output.

Then run the following query to grant permissions:

```azurecli-interactive
az extension add --name rdbms-connect

az postgres flexible-server execute -n <postgres-name> -u <owner-username> -p "<owner-password>" -d <database-name> --querytext "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO \"<aad-username>\";GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO \"<aad username>\";"
```

The `<owner-username>` and `<owner-password>` belong to the owner of the existing table that can grant permissions to others. `<aad-username>` is the user created by Service Connector. Replace them with actual values.

Validate the result:

```azurecli-interactive
az postgres flexible-server execute -n <postgres-name> -u <owner-username> -p "<owner-password>" -d <database-name> --querytext "SELECT distinct(table_name) FROM information_schema.table_privileges WHERE grantee='<aad-username>' AND table_schema='public';" --output table
```




### User-assigned managed identity

#### [.NET](#tab/dotnet)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_CLIENTID` | Your client ID | `<identity-client-ID>` |
| `AZURE_POSTGRESQL_CONNECTIONSTRING` | .NET PostgreSQL connection string | `Server=<PostgreSQL-server-name>.postgres.database.azure.com;Database=<database-name>;Port=5432;Ssl Mode=Require;User Id=<username>;` |

#### [Java](#tab/java)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_CLIENTID` | Your client ID | `<identity-client-ID>` |
| `AZURE_POSTGRESQL_CONNECTIONSTRING` | JDBC PostgreSQL connection string | `jdbc:postgresql://<PostgreSQL-server-name>.postgres.database.azure.com:5432/<database-name>?sslmode=require&user=<username>` |

#### [Spring Boot](#tab/springBoot)

| Application properties | Description | Example value |
| --- | --- | --- |
| `spring.datasource.azure.passwordless-enabled` | Enable passwordless authentication | `true` |
| `spring.cloud.azure.credential.client-id` | Your client ID | `<identity-client-ID>` |
| `spring.cloud.azure.credential.client-managed-identity-enabled` | Enable client managed identity | `true` |
| `spring.datasource.url` | Database URL | `jdbc:postgresql://<PostgreSQL-server-name>.postgres.database.azure.com:5432/<database-name>?sslmode=require` |
| `spring.datasource.username` | Database username | `username` |

#### [Python](#tab/python)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_CLIENTID` | Your client ID | `<identity-client-ID>` |
| `AZURE_POSTGRESQL_CONNECTIONSTRING` | psycopg2 connection string | `dbname=<database-name> host=<PostgreSQL-server-name>.postgres.database.azure.com port=5432 sslmode=require user=<username>` |

#### [Django](#tab/django)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_NAME` | Database name | `<database-name>` |
| `AZURE_POSTGRESQL_HOST` | Database host URL | `<PostgreSQL-server-name>.postgres.database.azure.com` |
| `AZURE_POSTGRESQL_USER` | Database username | `<username>` |
| `AZURE_POSTGRESQL_CLIENTID` | Your client ID | `<<identity-client-ID>>` |

#### [Go](#tab/go)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_CLIENTID` | Your client ID | `<identity-client-ID>` |
| `AZURE_POSTGRESQL_CONNECTIONSTRING` | Go PostgreSQL connection string | `host=<PostgreSQL-server-name>.postgres.database.azure.com dbname=<database-name> sslmode=require user=<username>` |

#### [NodeJS](#tab/nodejs)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_HOST` | Database host URL | `<PostgreSQL-server-name>.postgres.database.azure.com` |
| `AZURE_POSTGRESQL_USER` | Database username | `<username>` |
| `AZURE_POSTGRESQL_DATABASE` | Database name | `<database-name>` |
| `AZURE_POSTGRESQL_PORT` | Port number | `5432` |
| `AZURE_POSTGRESQL_SSL` | SSL option | `true` |
| `AZURE_POSTGRESQL_CLIENTID` | Your client ID | `<identity-client-ID>` |

#### [PHP](#tab/php)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_CLIENTID` | Your client ID | `<identity-client-ID>` |
| `AZURE_POSTGRESQL_CONNECTIONSTRING` | PHP native PostgreSQL connection string | `host=<PostgreSQL-server-name>.postgres.database.azure.com port=5432 dbname=<database-name> sslmode=require user=<username>` |

#### [Ruby](#tab/ruby)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_CLIENTID` | Your client ID | `<identity-client-ID>` |
| `AZURE_POSTGRESQL_CONNECTIONSTRING` | Ruby PostgreSQL connection string | `host=<your-postgres-server-name>.postgres.database.azure.com port=5432 dbname=<database-name> sslmode=require user=<username>` |

#### [Other](#tab/none)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_HOST` | Database host URL | `<PostgreSQL-server-name>.postgres.database.azure.com` |
| `AZURE_POSTGRESQL_USERNAME` | Database username | `<username>` |
| `AZURE_POSTGRESQL_DATABASE` | Database name | `<database-name>` |
| `AZURE_POSTGRESQL_PORT` | Port number | `5432` |
| `AZURE_POSTGRESQL_SSL` | SSL option | `true` |
| `AZURE_POSTGRESQL_CLIENTID` | Your client ID | `<identity-client-ID>` |

---

#### Sample code

Refer to the steps and code below to connect to Azure Database for PostgreSQL using a user-assigned managed identity.


#### [.NET](#tab/dotnet)
For .NET, there's not a plugin or library to support passwordless connections. You can get an access token for the managed identity or service principal using client library like [Azure.Identity](https://www.nuget.org/packages/Azure.Identity/). Then you can use the access token as the password to connect to the database. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

```csharp
using Azure.Identity;
using Azure.Core;
using Npgsql;

// Uncomment the following lines corresponding to the authentication type you want to use.
// For system-assigned identity.
// var sqlServerTokenProvider = new DefaultAzureCredential();

// For user-assigned identity.
// var sqlServerTokenProvider = new DefaultAzureCredential(
//     new DefaultAzureCredentialOptions
//     {
//         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_POSTGRESQL_CLIENTID");
//     }
// );

// For service principal.
// var tenantId = Environment.GetEnvironmentVariable("AZURE_POSTGRESQL_TENANTID");
// var clientId = Environment.GetEnvironmentVariable("AZURE_POSTGRESQL_CLIENTID");
// var clientSecret = Environment.GetEnvironmentVariable("AZURE_POSTGRESQL_CLIENTSECRET");
// var sqlServerTokenProvider = new ClientSecretCredential(tenantId, clientId, clientSecret);

// Acquire the access token. 
AccessToken accessToken = await sqlServerTokenProvider.GetTokenAsync(
    new TokenRequestContext(scopes: new string[]
    {
        "https://ossrdbms-aad.database.windows.net/.default"
    }));

// Combine the token with the connection string from the environment variables provided by Service Connector.
string connectionString =
    $"{Environment.GetEnvironmentVariable("AZURE_POSTGRESQL_CONNECTIONSTRING")};Password={accessToken.Token}";

// Establish the connection.
using (var connection = new NpgsqlConnection(connectionString))
{
    Console.WriteLine("Opening connection using access token...");
    connection.Open();
}
```

#### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
        <version>42.7.5</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity-extensions</artifactId>
        <version>1.2.0</version>
    </dependency>
    ```

1. Get the connection string from environment variables and add the plugin name to connect to the database:

    ```java
    import java.sql.*;
    
    String url = System.getenv("AZURE_POSTGRESQL_CONNECTIONSTRING");
    String pluginName = "com.azure.identity.extensions.jdbc.postgresql.AzurePostgresqlAuthenticationPlugin";  
    Connection connection = DriverManager.getConnection(url + "&authenticationPluginClassName=" + pluginName);
    ```

For more information, see the following resources:

* [Tutorial: Connect to a PostgreSQL Database from Java Tomcat App Service without secrets using a managed identity](../app-service/tutorial-java-tomcat-connect-managed-identity-postgresql-database.md)
* [Quickstart: Use Java and JDBC with Azure Database for PostgreSQL Flexible Server](https://learn.microsoft.com/azure/postgresql/flexible-server/connect-java?tabs=passwordless#connect-to-the-database)
* [Migrate an application to use passwordless connections with Azure Database for PostgreSQL](https://learn.microsoft.com/azure/developer/java/spring-framework/migrate-postgresql-to-passwordless-connection?tabs=sign-in-azure-cli%2Cjava%2Cservice-connector%2Cassign-role-service-connector)

#### [Spring Boot](#tab/springBoot)

For a Spring application, if you create a connection with option `--client-type springboot`, Service Connector sets the properties `spring.datasource.azure.passwordless-enabled`, `spring.datasource.url`, and `spring.datasource.username` to Azure Spring Apps.

Update your application following the tutorial [Bind an Azure Database for PostgreSQL to your application in Azure Spring Apps](../spring-apps/basic-standard/how-to-bind-postgres.md#prepare-your-project). Remember to remove the `spring.datasource.password` configuration property if it was set before and add the correct dependencies to your Spring application.

For more tutorials, see [Use Spring Data JDBC with Azure Database for PostgreSQL](https://learn.microsoft.com/azure/developer/java/spring-framework/configure-spring-data-jdbc-with-azure-postgresql?tabs=passwordless%2Cservice-connector\&pivots=postgresql-passwordless-flexible-server#store-data-from-azure-database-for-postgresql) and [Tutorial: Deploy a Spring application to Azure Spring Apps with a passwordless connection to an Azure database](https://learn.microsoft.com/azure/developer/java/spring-framework/deploy-passwordless-spring-database-app?tabs=postgresql).

#### [Python](#tab/python)

1. Install dependencies.
    ```bash
    pip install azure-identity
    pip install psycopg2-binary
    pip freeze > requirements.txt # Save the dependencies to a file
    ```
1. Get access token using `azure-identity` library and use the token as password. Get connection information from the environment variables added by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.
    
    ```python
    from azure.identity import DefaultAzureCredential
    import psycopg2
     
    # Uncomment the following lines corresponding to the authentication type you want to use.
    # For system-assigned identity.
    # cred = DefaultAzureCredential()

    # For user-assigned identity.
    # managed_identity_client_id = os.getenv('AZURE_POSTGRESQL_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)   
    
    # For service principal.
    # tenant_id = os.getenv('AZURE_POSTGRESQL_TENANTID')
    # client_id = os.getenv('AZURE_POSTGRESQL_CLIENTID')
    # client_secret = os.getenv('AZURE_POSTGRESQL_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)

    # Acquire the access token
    accessToken = cred.get_token('https://ossrdbms-aad.database.windows.net/.default')
    
    # Combine the token with the connection string from the environment variables added by Service Connector to establish the connection.
    conn_string = os.getenv('AZURE_POSTGRESQL_CONNECTIONSTRING')
    conn = psycopg2.connect(conn_string + ' password=' + accessToken.token) 
    ```

#### [Django](#tab/django)

1. Install dependencies.
    ```bash
   pip install azure-identity
   ```
1. Get access token using `azure-identity` library using environment variables added by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.
    
    ```python
    from azure.identity import DefaultAzureCredential
    import psycopg2

    # Uncomment the following lines corresponding to the authentication type you want to use.
    # For system-assigned identity.
    # credential = DefaultAzureCredential()

    # For user-assigned identity.
    # managed_identity_client_id = os.getenv('AZURE_POSTGRESQL_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)    
    
    # For service principal.
    # tenant_id = os.getenv('AZURE_POSTGRESQL_TENANTID')
    # client_id = os.getenv('AZURE_POSTGRESQL_CLIENTID')
    # client_secret = os.getenv('AZURE_POSTGRESQL_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)

    # Acquire the access token.
    accessToken = cred.get_token('https://ossrdbms-aad.database.windows.net/.default')
    ```

1. In setting file, get Azure PostgreSQL database information from environment variables added by Service Connector service. Use `accessToken` acquired in previous step to access the database.
    ```python
    # In your setting file, eg. settings.py
    host = os.getenv('AZURE_POSTGRESQL_HOST')
    user = os.getenv('AZURE_POSTGRESQL_USER')
    password = accessToken.token # this is accessToken acquired from above step.
    database = os.getenv('AZURE_POSTGRESQL_NAME')
    
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': database,
            'USER': user,
            'PASSWORD': password,
            'HOST': host,
            'PORT': '5432',  # Port is 5432 by default 
            'OPTIONS': {'sslmode': 'require'},
        }
    }
    ```

#### [Go](#tab/go)

1. Install dependencies.
    ```bash
    go get github.com/lib/pq
    go get "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
    go get "github.com/Azure/azure-sdk-for-go/sdk/azcore"
    ```
1. In code, get access token using `azidentity`, then use it as password to connect to Azure PostgreSQL along with connection information provided by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.
    
    ```go
    import (
    "database/sql"
    "fmt"
    "os"
    
    "context"
     
    "github.com/Azure/azure-sdk-for-go/sdk/azcore/policy"
    "github.com/Azure/azure-sdk-for-go/sdk/azidentity"

	_ "github.com/lib/pq"
    )    
    
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
        // error handling
    }

    // Acquire the access token
    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    token, err := cred.GetToken(ctx, policy.TokenRequestOptions{
        Scopes: []string("https://ossrdbms-aad.database.windows.net/.default"),
    })

    // Combine the token with the connection string from the environment variables added by Service Connector to establish the connection.
    connectionString := os.Getenv("AZURE_POSTGRESQL_CONNECTIONSTRING") + " password=" + token.Token
    
    conn, err := sql.Open("postgres", connectionString)
	if err != nil {
		panic(err)
	}

	conn.Close()
    ```    

#### [NodeJS](#tab/nodejs)

1. Install dependencies.
    ```bash
    npm install --save @azure/identity
    npm install --save pg
    ```
1. In code, get the access token using `@azure/identity` and PostgreSQL connection information from environment variables added by Service Connector service. Combine them to establish the connection. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.
    
    ```javascript
    import { DefaultAzureCredential, ClientSecretCredential } from "@azure/identity";
    import { Client } from 'pg';

    // Uncomment the following lines corresponding to the authentication type you want to use.  
    // For system-assigned identity.
    // const credential = new DefaultAzureCredential();

    // For user-assigned identity.
    // const clientId = process.env.AZURE_POSTGRESQL_CLIENTID;
    // const credential = new DefaultAzureCredential({
    //     managedIdentityClientId: clientId
    // });
    
    // For service principal.
    // const tenantId = process.env.AZURE_POSTGRESQL_TENANTID;
    // const clientId = process.env.AZURE_POSTGRESQL_CLIENTID;
    // const clientSecret = process.env.AZURE_POSTGRESQL_CLIENTSECRET;
    // const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

    // Acquire the access token.
    var accessToken = await credential.getToken('https://ossrdbms-aad.database.windows.net/.default');
    
    // Use the token and the connection information from the environment variables added by Service Connector to establish the connection.
    (async () => {
    const client = new Client({
        host: process.env.AZURE_POSTGRESQL_HOST,
        user: process.env.AZURE_POSTGRESQL_USER,
        password: accesstoken.token,
        database: process.env.AZURE_POSTGRESQL_DATABASE,
        port: Number(process.env.AZURE_POSTGRESQL_PORT) ,
        ssl: process.env.AZURE_POSTGRESQL_SSL
    });
    await client.connect();
    
    await client.end();
    })();
    ```

#### [PHP](#tab/php)

For PHP, there's not a plugin or library for passwordless connections. You can get an access token for the managed identity or service principal and use it as the password to connect to the database. The access token can be acquired using Azure REST API.

1. In code, get the access token using REST API with your favorite library.

    For user-assigned identity and system-assigned identity, Azure App Service provides an internally accessible REST endpoint to retrieve tokens for managed identities by defining two environment variables: `IDENTITY_ENDPOINT` and `IDENTITY_HEADER`. For more information, see [REST endpoint reference](https://learn.microsoft.com/azure/container-apps/managed-identity?tabs=http#rest-endpoint-reference). 
    Get the access token by making an HTTP GET request to the identity endpoint, and use `https://ossrdbms-aad.database.windows.net` as `resource` in the query. For user-assigned identity, please include the client ID from the environment variables added by Service Connector in the query as well.

    For service principal, refer to [the Azure AD service-to-service access token request](https://learn.microsoft.com/azure/active-directory/develop/v2-oauth2-client-creds-grant-flow#get-a-token) to see the details of how to acquire access token. Make the POST request the scope of `https://ossrdbms-aad.database.windows.net/.default` and with the tenant ID, client ID and client secret of the service principal from the environment variables added by Service Connector.

1. Combine the access token and the PostgreSQL connection string from environment variables added by Service Connector service to establish the connection.
    ```php
    <?php
    $conn_string = sprintf("%s password=", getenv('AZURE_POSTGRESQL_CONNECTIONSTRING'), $access_token);
    $dbconn = pg_connect($conn_string);
    ?>
    ```

#### [Ruby](#tab/ruby)

For Ruby, there's not a plugin or library for passwordless connections. You can get an access token for the managed identity or service principal and use it as the password to connect to the database. The access token can be acquired using Azure REST API.

1. Install dependencies.
    ```bash
    gem install pg
    ```
1. In code, get the access token using REST API and PostgreSQL connection information from environment variables added by Service Connector service. Combine them to establish the connection. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

    Azure App Service provides an internally accessible REST endpoint to retrieve tokens for managed identities. For more information, see [REST endpoint reference](https://learn.microsoft.com/azure/container-apps/managed-identity?tabs=http#rest-endpoint-reference).
    ```ruby
    require 'pg'
    require 'dotenv/load'
    require 'net/http'
    require 'json'
    
    # Uncomment the following lines corresponding to the authentication type you want to use.
    # For system-assigned identity.
    # uri = URI(ENV['IDENTITY_ENDPOINT'] + '?resource=https://ossrdbms-aad.database.windows.net&api-version=2019-08-01')
    # res = Net::HTTP.get_response(uri, {'X-IDENTITY-HEADER' => ENV['IDENTITY_HEADER'], 'Metadata' => 'true'})  

    # For user-assigned identity.
    # uri = URI(ENV[IDENTITY_ENDPOINT] + '?resource=https://ossrdbms-aad.database.windows.net&api-version=2019-08-01&client_id=' + ENV['AZURE_POSTGRESQL_CLIENTID'])
    # res = Net::HTTP.get_response(uri, {'X-IDENTITY-HEADER' => ENV['IDENTITY_HEADER'], 'Metadata' => 'true'})  
    
    # For service principal
    # uri = URI('https://login.microsoftonline.com/' + ENV['AZURE_POSTGRESQL_TENANTID'] + '/oauth2/v2.0/token')
    # params = {
    #     :grant_type => 'client_credentials',
    #     :client_id: => ENV['AZURE_POSTGRESQL_CLIENTID'],
    #     :client_secret => ENV['AZURE_POSTGRESQL_CLIENTSECRET'],
    #     :scope => 'https://ossrdbms-aad.database.windows.net/.default'
    # }
    # req = Net::HTTP::POST.new(uri)
    # req.set_form_data(params)
    # req['Content-Type'] = 'application/x-www-form-urlencoded'
    # res = Net::HTTP.start(uri.hostname, uri.port, :use_ssl => true) do |http|
    #   http.request(req)

    parsed = JSON.parse(res.body)
    access_token = parsed["access_token"]
    
    # Use the token and the connection string from the environment variables added by Service Connector to establish the connection.
    conn = PG::Connection.new(
        connection_string: ENV['AZURE_POSTGRESQL_CONNECTIONSTRING'] + " password="  + access_token,
    )
    ```
    
    Refer to [the Azure AD service-to-service access token request](https://learn.microsoft.com/azure/active-directory/develop/v2-oauth2-client-creds-grant-flow#get-a-token) to see more details of how to acquire access token for service principal.

### [Other](#tab/none)
For other languages, use the connection properties that Service Connector sets to the environment variables to connect the database. For environment variable details, see [Integrate Azure Database for PostgreSQL with Service Connector](how-to-integrate-postgres.md).

---


Next, if you created tables and sequences in PostgreSQL flexible server before using Service Connector, connect as the owner and grant permission to `<aad-username>` created by Service Connector. The username from the connection string or configuration set by Service Connector should look like `aad_<connection name>`. If you use the Azure portal, select the expand button next to the **Service Type** column to get the value. If you use the Azure CLI, check `configurations` in the CLI command output.

Then run the following query to grant permissions:

```azurecli-interactive
az extension add --name rdbms-connect

az postgres flexible-server execute -n <postgres-name> -u <owner-username> -p "<owner-password>" -d <database-name> --querytext "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO \"<aad-username>\";GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO \"<aad username>\";"
```

The `<owner-username>` and `<owner-password>` belong to the owner of the existing table that can grant permissions to others. `<aad-username>` is the user created by Service Connector. Replace them with actual values.

Validate the result:

```azurecli-interactive
az postgres flexible-server execute -n <postgres-name> -u <owner-username> -p "<owner-password>" -d <database-name> --querytext "SELECT distinct(table_name) FROM information_schema.table_privileges WHERE grantee='<aad-username>' AND table_schema='public';" --output table
```



### Connection string

> **Warning:**
> Microsoft recommends that you use the most secure authentication flow available. The authentication flow described in this procedure requires a very high degree of trust in the application, and carries risks that are not present in other flows. You should only use this flow when other more secure flows, such as managed identities, aren't viable.

#### [.NET](#tab/dotnet)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_CONNECTIONSTRING` | .NET PostgreSQL connection string | `Server=<PostgreSQL-server-name>.postgres.database.azure.com;Database=<database-name>;Port=5432;Ssl Mode=Require;User Id=<username>;` |

#### [Java](#tab/java)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_CONNECTIONSTRING` | JDBC PostgreSQL connection string | `jdbc:postgresql://<PostgreSQL-server-name>.postgres.database.azure.com:5432/<database-name>?sslmode=require&user=<username>&password=<password>` |

#### [Spring Boot](#tab/springBoot)

| Application properties | Description | Example value |
| --- | --- | --- |
| `spring.datasource.url` | Database URL | `jdbc:postgresql://<PostgreSQL-server-name>.postgres.database.azure.com:5432/<database-name>?sslmode=require` |
| `spring.datasource.username` | Database username | `<username>` |
| `spring.datasource.password` | Database password | `<password>` |

#### [Python](#tab/python)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_CONNECTIONSTRING` | psycopg2 connection string | `dbname=<database-name> host=<PostgreSQL-server-name>.postgres.database.azure.com port=5432 sslmode=require user=<username> password=<password>` |

#### [Django](#tab/django)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_NAME` | Database name | `<database-name>` |
| `AZURE_POSTGRESQL_HOST` | Database host URL | `<PostgreSQL-server-name>.postgres.database.azure.com` |
| `AZURE_POSTGRESQL_USER` | Database username | `<username>` |
| `AZURE_POSTGRESQL_PASSWORD` | Database password | `<database-password>` |

#### [Go](#tab/go)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_CONNECTIONSTRING` | Go PostgreSQL connection string | `host=<PostgreSQL-server-name>.postgres.database.azure.com dbname=<database-name> sslmode=require user=<username> password=<password>` |

#### [NodeJS](#tab/nodejs)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_HOST` | Database host URL | `<PostgreSQL-server-name>.postgres.database.azure.com` |
| `AZURE_POSTGRESQL_USER` | Database username | `<username>` |
| `AZURE_POSTGRESQL_PASSWORD` | Database password | `<password>` |
| `AZURE_POSTGRESQL_DATABASE` | Database name | `<database-name>` |
| `AZURE_POSTGRESQL_PORT` | Port number | `5432` |
| `AZURE_POSTGRESQL_SSL` | SSL option | `true` |

#### [PHP](#tab/php)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_CONNECTIONSTRING` | PHP native PostgreSQL connection string | `host=<PostgreSQL-server-name>.postgres.database.azure.com port=5432 dbname=<database-name> sslmode=require user=<username> password=<password>` |

#### [Ruby](#tab/ruby)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_CONNECTIONSTRING` | Ruby PostgreSQL connection string | `host=<your-postgres-server-name>.postgres.database.azure.com port=5432 dbname=<database-name> sslmode=require user=<username> password=<password>` |

#### [Other](#tab/none)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_HOST` | Database host URL | `<PostgreSQL-server-name>.postgres.database.azure.com` |
| `AZURE_POSTGRESQL_USERNAME` | Database username | `<username>` |
| `AZURE_POSTGRESQL_DATABASE` | Database name | `<database-name>` |
| `AZURE_POSTGRESQL_PORT` | Port number | `5432` |
| `AZURE_POSTGRESQL_SSL` | SSL option | `true` |
| `AZURE_POSTGRESQL_PASSWORD` | Database password | `<password>` |

---

#### Sample code

Refer to the steps and code below to connect to Azure Database for PostgreSQL using a connection string.

### [.NET](#tab/dotnet)

1. Install dependencies following [the Npgsql guidance](https://www.npgsql.org/doc/installation.html)
1. In code, get the PostgreSQL connection string from environment variables added by Service Connector.
    ```csharp
    using System;
    using Npgsql;
   
    string connectionString = Environment.GetEnvironmentVariable("AZURE_POSTGRESQL_CONNECTIONSTRING");
    using (NpgsqlConnection connection = new NpgsqlConnection(connectionString))
    {
        connection.Open();
    }
    ```

### [Java](#tab/java)

1. Install dependencies following [the pgJDBC guidance](https://jdbc.postgresql.org/documentation/).
1. In code, get the PostgreSQL connection string from environment variables added by Service Connector.
    ```java
    import java.sql.Connection;
    import java.sql.DriverManager;
    import java.sql.SQLException;

    String connectionString = System.getenv("AZURE_POSTGRESQL_CONNECTIONSTRING");
    Connection connection = null;
    try {
        connection = DriverManager.getConnection(connectionString);
        System.out.println("Connection successful!");
    } catch (SQLException e){
        System.out.println(e.getMessage());
    }
   ```

### [Spring Boot](#tab/springBoot)

1. Install the Spring Cloud Azure Starter JDBC PostgreSQL module by adding the following dependencies to your `pom.xml` file. Find the version of Spring Cloud Azure [here](https://github.com/Azure/azure-sdk-for-java/wiki/Spring-Versions-Mapping#which-version-of-spring-cloud-azure-should-i-use).
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
            <dependency>
                <groupId>com.azure.spring</groupId>
                <artifactId>spring-cloud-azure-starter-jdbc-postgresql</artifactId>
            </dependency>
        </dependencies>
    </dependencyManagement>
    ```
1. Set up a Spring Boot application, more details in this [section](https://learn.microsoft.com/azure/developer/java/spring-framework/configure-spring-data-jpa-with-azure-postgresql?tabs=password%2Cservice-connector).

### [Python](#tab/python)

1. Install dependencies following [the psycopg2 guidance](https://pypi.org/project/psycopg2/).
1. In code, get the PostgreSQL connection information from environment variables added by Service Connector.
   ```python
   import os
   import psycopg2
   
   connection_string = os.getenv('AZURE_POSTGRESQL_CONNECTIONSTRING')
   connection = psycopg2.connect(connection_string)
   print("Connection established")
   
   connection.close()
   ```

### [Django](#tab/django)

1. Install dependencies following [the Django guidance](https://docs.djangoproject.com/en/4.2/topics/install/) and [psycopg2 guidance](https://pypi.org/project/psycopg2/).
   ```bash
   pip install django
   pip install psycopg2
   ```
1. In the setting file, get the PostgreSQL database information from environment variables added by Service Connector.
   ```python
   # in your setting file, eg. settings.py
   host = os.getenv('AZURE_POSTGRESQL_HOST')
   user = os.getenv('AZURE_POSTGRESQL_USER')
   password = os.getenv('AZURE_POSTGRESQL_PASSWORD')
   database = os.getenv('AZURE_POSTGRESQL_NAME')
   
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql_psycopg2',
           'NAME': database,
           'USER': user,
           'PASSWORD': password,
           'HOST': host,
           'PORT': '5432',  # Port is 5432 by default 
           'OPTIONS': {'sslmode': 'require'},
       }
   }
   ```

### [Go](#tab/go)

1. Install dependencies.
    ```bash
    go get github.com/lib/pq
    ```
1. In code, get the PostgreSQL connection string from environment variables added by Service Connector.
    ```go
    import (
    "database/sql"
    "fmt"
    "os"

	_ "github.com/lib/pq"
    )

    connectionString := os.Getenv("AZURE_POSTGRESQL_CONNECTIONSTRING")
    conn, err := sql.Open("postgres", connectionString)
	if err != nil {
		panic(err)
	}

	conn.Close()
    ```

### [NodeJS](#tab/nodejs)

1. Install dependencies.
    ```bash
    npm install pg dotenv
    ```
1. In code, get the PostgreSQL connection information from environment variables added by Service Connector.
   ```javascript
   import { Client } from 'pg';
   
   (async () => {
    const client = new Client({
        host: process.env.AZURE_POSTGRESQL_HOST,
        user: process.env.AZURE_POSTGRESQL_USER,
        password: process.env.AZURE_POSTGRESQL_PASSWORD,
        database: process.env.AZURE_POSTGRESQL_DATABASE,
        port: Number(process.env.AZURE_POSTGRESQL_PORT) ,
        ssl: process.env.AZURE_POSTGRESQL_SSL
    });
    await client.connect();

    await client.end();
   })();
   ```

### [PHP](#tab/php)

1. In code, get the PostgreSQL connection information from environment variables added by Service Connector.
    ```php
    <?php
    $conn_string = getenv('AZURE_POSTGRESQL_CONNECTIONSTRING');
    $dbconn = pg_connect($conn_string);
    ?>
    ```

### [Ruby](#tab/ruby)

1. Install dependencies.
   ```bash
   gem install pg
   ```
1. In code, get the PostgreSQL connection information from environment variables added by Service Connector.
    ```ruby
    require 'pg'
    require 'dotenv/load'

    begin
        conn = PG::Connection.new(
            connection_string: ENV['AZURE_POSTGRESQL_CONNECTIONSTRING'],
        )
    rescue PG::Error => e
        puts e.message

    ensure
        connection.close if connection
    end
    ```

### [Other](#tab/none)
For other languages, use the connection properties that Service Connector sets to the environment variables to connect the database. For environment variable details, see [Integrate Azure Database for PostgreSQL with Service Connector](how-to-integrate-postgres.md).


### Service principal

#### [.NET](#tab/dotnet)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_CLIENTID` | Your client ID | `<client-ID>` |
| `AZURE_POSTGRESQL_CLIENTSECRET` | Your client secret | `<client-secret>` |
| `AZURE_POSTGRESQL_TENANTID` | Your tenant ID | `<tenant-ID>` |
| `AZURE_POSTGRESQL_CONNECTIONSTRING` | .NET PostgreSQL connection string | `Server=<PostgreSQL-server-name>.postgres.database.azure.com;Database=<database-name>;Port=5432;Ssl Mode=Require;User Id=<username>;` |

#### [Java](#tab/java)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_CLIENTID` | Your client ID | `<client-ID>` |
| `AZURE_POSTGRESQL_CLIENTSECRET` | Your client secret | `<client-secret>` |
| `AZURE_POSTGRESQL_TENANTID` | Your tenant ID | `<tenant-ID>` |
| `AZURE_POSTGRESQL_CONNECTIONSTRING` | JDBC PostgreSQL connection string | `jdbc:postgresql://<PostgreSQL-server-name>.postgres.database.azure.com:5432/<database-name>?sslmode=require&user=<username>` |

#### [Spring Boot](#tab/springBoot)

| Application properties | Description | Example value |
| --- | --- | --- |
| `spring.datasource.azure.passwordless-enabled` | Enable passwordless authentication | `true` |
| `spring.cloud.azure.credential.client-id` | Your client ID | `<client-ID>` |
| `spring.cloud.azure.credential.client-secret` | Your client secret | `<client-secret>` |
| `spring.cloud.azure.credential.tenant-id` | Your tenant ID | `<tenant-ID>` |
| `spring.datasource.url` | Database URL | `jdbc:postgresql://<PostgreSQL-server-name>.postgres.database.azure.com:5432/<database-name>?sslmode=require` |
| `spring.datasource.username` | Database username | `username` |

#### [Python](#tab/python)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_CLIENTID` | Your client ID | `<client-ID>` |
| `AZURE_POSTGRESQL_CLIENTSECRET` | Your client secret | `<client-secret>` |
| `AZURE_POSTGRESQL_TENANTID` | Your tenant ID | `<tenant-ID>` |
| `AZURE_POSTGRESQL_CONNECTIONSTRING` | psycopg2 connection string | `dbname=<database-name> host=<PostgreSQL-server-name>.postgres.database.azure.com port=5432 sslmode=require user=<username>` |

#### [Django](#tab/django)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_NAME` | Database name | `<database-name>` |
| `AZURE_POSTGRESQL_HOST` | Database host URL | `<PostgreSQL-server-name>.postgres.database.azure.com` |
| `AZURE_POSTGRESQL_USER` | Database username | `<username>` |
| `AZURE_POSTGRESQL_CLIENTID` | Your client ID | `<client-ID>` |
| `AZURE_POSTGRESQL_CLIENTSECRET` | Your client SECRET | `<client-secret>` |
| `AZURE_POSTGRESQL_TENANTID` | Your tenant ID | `<tenant-ID>` |

#### [Go](#tab/go)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_CLIENTID` | Your client ID | `<client-ID>` |
| `AZURE_POSTGRESQL_CLIENTSECRET` | Your client secret | `<client-secret>` |
| `AZURE_POSTGRESQL_TENANTID` | Your tenant ID | `<tenant-ID>` |
| `AZURE_POSTGRESQL_CONNECTIONSTRING` | Go PostgreSQL connection string | `host=<PostgreSQL-server-name>.postgres.database.azure.com dbname=<database-name> sslmode=require user=<username>` |

#### [NodeJS](#tab/nodejs)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_HOST` | Database host URL | `<PostgreSQL-server-name>.postgres.database.azure.com` |
| `AZURE_POSTGRESQL_USER` | Database username | `<username>` |
| `AZURE_POSTGRESQL_DATABASE` | Database name | `<database-name>` |
| `AZURE_POSTGRESQL_PORT` | Port number | `5432` |
| `AZURE_POSTGRESQL_SSL` | SSL option | `true` |
| `AZURE_POSTGRESQL_CLIENTID` | Your client ID | `<client-ID>` |
| `AZURE_POSTGRESQL_CLIENTSECRET` | Your client secret | `<client-secret>` |
| `AZURE_POSTGRESQL_TENANTID` | Your tenant ID | `<tenant-ID>` |

#### [PHP](#tab/php)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_CLIENTID` | Your client ID | `<client-ID>` |
| `AZURE_POSTGRESQL_CLIENTSECRET` | Your client secret | `<client-secret>` |
| `AZURE_POSTGRESQL_TENANTID` | Your tenant ID | `<tenant-ID>` |
| `AZURE_POSTGRESQL_CONNECTIONSTRING` | PHP native PostgreSQL connection string | `host=<PostgreSQL-server-name>.postgres.database.azure.com port=5432 dbname=<database-name> sslmode=require user=<username>` |

#### [Ruby](#tab/ruby)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_CLIENTID` | Your client ID | `<client-ID>` |
| `AZURE_POSTGRESQL_CLIENTSECRET` | Your client secret | `<client-secret>` |
| `AZURE_POSTGRESQL_TENANTID` | Your tenant ID | `<tenant-ID>` |
| `AZURE_POSTGRESQL_CONNECTIONSTRING` | Ruby PostgreSQL connection string | `host=<your-postgres-server-name>.postgres.database.azure.com port=5432 dbname=<database-name> sslmode=require user=<username>` |

#### [Other](#tab/none)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_POSTGRESQL_HOST` | Database host URL | `<PostgreSQL-server-name>.postgres.database.azure.com` |
| `AZURE_POSTGRESQL_USERNAME` | Database username | `<username>` |
| `AZURE_POSTGRESQL_DATABASE` | Database name | `<database-name>` |
| `AZURE_POSTGRESQL_PORT` | Port number | `5432` |
| `AZURE_POSTGRESQL_SSL` | SSL option | `true` |
| `AZURE_POSTGRESQL_CLIENTID` | Your client ID | `<identity-client-ID>` |
| `AZURE_POSTGRESQL_CLIENTSECRET` | Your client secret | `<client-secret>` |
| `AZURE_POSTGRESQL_TENANTID` | Your tenant ID | `<tenant-ID>` |

---

#### Sample code

Refer to the steps and code below to connect to Azure Database for PostgreSQL using a service principal.


#### [.NET](#tab/dotnet)
For .NET, there's not a plugin or library to support passwordless connections. You can get an access token for the managed identity or service principal using client library like [Azure.Identity](https://www.nuget.org/packages/Azure.Identity/). Then you can use the access token as the password to connect to the database. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

```csharp
using Azure.Identity;
using Azure.Core;
using Npgsql;

// Uncomment the following lines corresponding to the authentication type you want to use.
// For system-assigned identity.
// var sqlServerTokenProvider = new DefaultAzureCredential();

// For user-assigned identity.
// var sqlServerTokenProvider = new DefaultAzureCredential(
//     new DefaultAzureCredentialOptions
//     {
//         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_POSTGRESQL_CLIENTID");
//     }
// );

// For service principal.
// var tenantId = Environment.GetEnvironmentVariable("AZURE_POSTGRESQL_TENANTID");
// var clientId = Environment.GetEnvironmentVariable("AZURE_POSTGRESQL_CLIENTID");
// var clientSecret = Environment.GetEnvironmentVariable("AZURE_POSTGRESQL_CLIENTSECRET");
// var sqlServerTokenProvider = new ClientSecretCredential(tenantId, clientId, clientSecret);

// Acquire the access token. 
AccessToken accessToken = await sqlServerTokenProvider.GetTokenAsync(
    new TokenRequestContext(scopes: new string[]
    {
        "https://ossrdbms-aad.database.windows.net/.default"
    }));

// Combine the token with the connection string from the environment variables provided by Service Connector.
string connectionString =
    $"{Environment.GetEnvironmentVariable("AZURE_POSTGRESQL_CONNECTIONSTRING")};Password={accessToken.Token}";

// Establish the connection.
using (var connection = new NpgsqlConnection(connectionString))
{
    Console.WriteLine("Opening connection using access token...");
    connection.Open();
}
```

#### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
        <version>42.7.5</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity-extensions</artifactId>
        <version>1.2.0</version>
    </dependency>
    ```

1. Get the connection string from environment variables and add the plugin name to connect to the database:

    ```java
    import java.sql.*;
    
    String url = System.getenv("AZURE_POSTGRESQL_CONNECTIONSTRING");
    String pluginName = "com.azure.identity.extensions.jdbc.postgresql.AzurePostgresqlAuthenticationPlugin";  
    Connection connection = DriverManager.getConnection(url + "&authenticationPluginClassName=" + pluginName);
    ```

For more information, see the following resources:

* [Tutorial: Connect to a PostgreSQL Database from Java Tomcat App Service without secrets using a managed identity](../app-service/tutorial-java-tomcat-connect-managed-identity-postgresql-database.md)
* [Quickstart: Use Java and JDBC with Azure Database for PostgreSQL Flexible Server](https://learn.microsoft.com/azure/postgresql/flexible-server/connect-java?tabs=passwordless#connect-to-the-database)
* [Migrate an application to use passwordless connections with Azure Database for PostgreSQL](https://learn.microsoft.com/azure/developer/java/spring-framework/migrate-postgresql-to-passwordless-connection?tabs=sign-in-azure-cli%2Cjava%2Cservice-connector%2Cassign-role-service-connector)

#### [Spring Boot](#tab/springBoot)

For a Spring application, if you create a connection with option `--client-type springboot`, Service Connector sets the properties `spring.datasource.azure.passwordless-enabled`, `spring.datasource.url`, and `spring.datasource.username` to Azure Spring Apps.

Update your application following the tutorial [Bind an Azure Database for PostgreSQL to your application in Azure Spring Apps](../spring-apps/basic-standard/how-to-bind-postgres.md#prepare-your-project). Remember to remove the `spring.datasource.password` configuration property if it was set before and add the correct dependencies to your Spring application.

For more tutorials, see [Use Spring Data JDBC with Azure Database for PostgreSQL](https://learn.microsoft.com/azure/developer/java/spring-framework/configure-spring-data-jdbc-with-azure-postgresql?tabs=passwordless%2Cservice-connector\&pivots=postgresql-passwordless-flexible-server#store-data-from-azure-database-for-postgresql) and [Tutorial: Deploy a Spring application to Azure Spring Apps with a passwordless connection to an Azure database](https://learn.microsoft.com/azure/developer/java/spring-framework/deploy-passwordless-spring-database-app?tabs=postgresql).

#### [Python](#tab/python)

1. Install dependencies.
    ```bash
    pip install azure-identity
    pip install psycopg2-binary
    pip freeze > requirements.txt # Save the dependencies to a file
    ```
1. Get access token using `azure-identity` library and use the token as password. Get connection information from the environment variables added by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.
    
    ```python
    from azure.identity import DefaultAzureCredential
    import psycopg2
     
    # Uncomment the following lines corresponding to the authentication type you want to use.
    # For system-assigned identity.
    # cred = DefaultAzureCredential()

    # For user-assigned identity.
    # managed_identity_client_id = os.getenv('AZURE_POSTGRESQL_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)   
    
    # For service principal.
    # tenant_id = os.getenv('AZURE_POSTGRESQL_TENANTID')
    # client_id = os.getenv('AZURE_POSTGRESQL_CLIENTID')
    # client_secret = os.getenv('AZURE_POSTGRESQL_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)

    # Acquire the access token
    accessToken = cred.get_token('https://ossrdbms-aad.database.windows.net/.default')
    
    # Combine the token with the connection string from the environment variables added by Service Connector to establish the connection.
    conn_string = os.getenv('AZURE_POSTGRESQL_CONNECTIONSTRING')
    conn = psycopg2.connect(conn_string + ' password=' + accessToken.token) 
    ```

#### [Django](#tab/django)

1. Install dependencies.
    ```bash
   pip install azure-identity
   ```
1. Get access token using `azure-identity` library using environment variables added by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.
    
    ```python
    from azure.identity import DefaultAzureCredential
    import psycopg2

    # Uncomment the following lines corresponding to the authentication type you want to use.
    # For system-assigned identity.
    # credential = DefaultAzureCredential()

    # For user-assigned identity.
    # managed_identity_client_id = os.getenv('AZURE_POSTGRESQL_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)    
    
    # For service principal.
    # tenant_id = os.getenv('AZURE_POSTGRESQL_TENANTID')
    # client_id = os.getenv('AZURE_POSTGRESQL_CLIENTID')
    # client_secret = os.getenv('AZURE_POSTGRESQL_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)

    # Acquire the access token.
    accessToken = cred.get_token('https://ossrdbms-aad.database.windows.net/.default')
    ```

1. In setting file, get Azure PostgreSQL database information from environment variables added by Service Connector service. Use `accessToken` acquired in previous step to access the database.
    ```python
    # In your setting file, eg. settings.py
    host = os.getenv('AZURE_POSTGRESQL_HOST')
    user = os.getenv('AZURE_POSTGRESQL_USER')
    password = accessToken.token # this is accessToken acquired from above step.
    database = os.getenv('AZURE_POSTGRESQL_NAME')
    
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': database,
            'USER': user,
            'PASSWORD': password,
            'HOST': host,
            'PORT': '5432',  # Port is 5432 by default 
            'OPTIONS': {'sslmode': 'require'},
        }
    }
    ```

#### [Go](#tab/go)

1. Install dependencies.
    ```bash
    go get github.com/lib/pq
    go get "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
    go get "github.com/Azure/azure-sdk-for-go/sdk/azcore"
    ```
1. In code, get access token using `azidentity`, then use it as password to connect to Azure PostgreSQL along with connection information provided by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.
    
    ```go
    import (
    "database/sql"
    "fmt"
    "os"
    
    "context"
     
    "github.com/Azure/azure-sdk-for-go/sdk/azcore/policy"
    "github.com/Azure/azure-sdk-for-go/sdk/azidentity"

	_ "github.com/lib/pq"
    )    
    
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
        // error handling
    }

    // Acquire the access token
    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    token, err := cred.GetToken(ctx, policy.TokenRequestOptions{
        Scopes: []string("https://ossrdbms-aad.database.windows.net/.default"),
    })

    // Combine the token with the connection string from the environment variables added by Service Connector to establish the connection.
    connectionString := os.Getenv("AZURE_POSTGRESQL_CONNECTIONSTRING") + " password=" + token.Token
    
    conn, err := sql.Open("postgres", connectionString)
	if err != nil {
		panic(err)
	}

	conn.Close()
    ```    

#### [NodeJS](#tab/nodejs)

1. Install dependencies.
    ```bash
    npm install --save @azure/identity
    npm install --save pg
    ```
1. In code, get the access token using `@azure/identity` and PostgreSQL connection information from environment variables added by Service Connector service. Combine them to establish the connection. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.
    
    ```javascript
    import { DefaultAzureCredential, ClientSecretCredential } from "@azure/identity";
    import { Client } from 'pg';

    // Uncomment the following lines corresponding to the authentication type you want to use.  
    // For system-assigned identity.
    // const credential = new DefaultAzureCredential();

    // For user-assigned identity.
    // const clientId = process.env.AZURE_POSTGRESQL_CLIENTID;
    // const credential = new DefaultAzureCredential({
    //     managedIdentityClientId: clientId
    // });
    
    // For service principal.
    // const tenantId = process.env.AZURE_POSTGRESQL_TENANTID;
    // const clientId = process.env.AZURE_POSTGRESQL_CLIENTID;
    // const clientSecret = process.env.AZURE_POSTGRESQL_CLIENTSECRET;
    // const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

    // Acquire the access token.
    var accessToken = await credential.getToken('https://ossrdbms-aad.database.windows.net/.default');
    
    // Use the token and the connection information from the environment variables added by Service Connector to establish the connection.
    (async () => {
    const client = new Client({
        host: process.env.AZURE_POSTGRESQL_HOST,
        user: process.env.AZURE_POSTGRESQL_USER,
        password: accesstoken.token,
        database: process.env.AZURE_POSTGRESQL_DATABASE,
        port: Number(process.env.AZURE_POSTGRESQL_PORT) ,
        ssl: process.env.AZURE_POSTGRESQL_SSL
    });
    await client.connect();
    
    await client.end();
    })();
    ```

#### [PHP](#tab/php)

For PHP, there's not a plugin or library for passwordless connections. You can get an access token for the managed identity or service principal and use it as the password to connect to the database. The access token can be acquired using Azure REST API.

1. In code, get the access token using REST API with your favorite library.

    For user-assigned identity and system-assigned identity, Azure App Service provides an internally accessible REST endpoint to retrieve tokens for managed identities by defining two environment variables: `IDENTITY_ENDPOINT` and `IDENTITY_HEADER`. For more information, see [REST endpoint reference](https://learn.microsoft.com/azure/container-apps/managed-identity?tabs=http#rest-endpoint-reference). 
    Get the access token by making an HTTP GET request to the identity endpoint, and use `https://ossrdbms-aad.database.windows.net` as `resource` in the query. For user-assigned identity, please include the client ID from the environment variables added by Service Connector in the query as well.

    For service principal, refer to [the Azure AD service-to-service access token request](https://learn.microsoft.com/azure/active-directory/develop/v2-oauth2-client-creds-grant-flow#get-a-token) to see the details of how to acquire access token. Make the POST request the scope of `https://ossrdbms-aad.database.windows.net/.default` and with the tenant ID, client ID and client secret of the service principal from the environment variables added by Service Connector.

1. Combine the access token and the PostgreSQL connection string from environment variables added by Service Connector service to establish the connection.
    ```php
    <?php
    $conn_string = sprintf("%s password=", getenv('AZURE_POSTGRESQL_CONNECTIONSTRING'), $access_token);
    $dbconn = pg_connect($conn_string);
    ?>
    ```

#### [Ruby](#tab/ruby)

For Ruby, there's not a plugin or library for passwordless connections. You can get an access token for the managed identity or service principal and use it as the password to connect to the database. The access token can be acquired using Azure REST API.

1. Install dependencies.
    ```bash
    gem install pg
    ```
1. In code, get the access token using REST API and PostgreSQL connection information from environment variables added by Service Connector service. Combine them to establish the connection. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

    Azure App Service provides an internally accessible REST endpoint to retrieve tokens for managed identities. For more information, see [REST endpoint reference](https://learn.microsoft.com/azure/container-apps/managed-identity?tabs=http#rest-endpoint-reference).
    ```ruby
    require 'pg'
    require 'dotenv/load'
    require 'net/http'
    require 'json'
    
    # Uncomment the following lines corresponding to the authentication type you want to use.
    # For system-assigned identity.
    # uri = URI(ENV['IDENTITY_ENDPOINT'] + '?resource=https://ossrdbms-aad.database.windows.net&api-version=2019-08-01')
    # res = Net::HTTP.get_response(uri, {'X-IDENTITY-HEADER' => ENV['IDENTITY_HEADER'], 'Metadata' => 'true'})  

    # For user-assigned identity.
    # uri = URI(ENV[IDENTITY_ENDPOINT] + '?resource=https://ossrdbms-aad.database.windows.net&api-version=2019-08-01&client_id=' + ENV['AZURE_POSTGRESQL_CLIENTID'])
    # res = Net::HTTP.get_response(uri, {'X-IDENTITY-HEADER' => ENV['IDENTITY_HEADER'], 'Metadata' => 'true'})  
    
    # For service principal
    # uri = URI('https://login.microsoftonline.com/' + ENV['AZURE_POSTGRESQL_TENANTID'] + '/oauth2/v2.0/token')
    # params = {
    #     :grant_type => 'client_credentials',
    #     :client_id: => ENV['AZURE_POSTGRESQL_CLIENTID'],
    #     :client_secret => ENV['AZURE_POSTGRESQL_CLIENTSECRET'],
    #     :scope => 'https://ossrdbms-aad.database.windows.net/.default'
    # }
    # req = Net::HTTP::POST.new(uri)
    # req.set_form_data(params)
    # req['Content-Type'] = 'application/x-www-form-urlencoded'
    # res = Net::HTTP.start(uri.hostname, uri.port, :use_ssl => true) do |http|
    #   http.request(req)

    parsed = JSON.parse(res.body)
    access_token = parsed["access_token"]
    
    # Use the token and the connection string from the environment variables added by Service Connector to establish the connection.
    conn = PG::Connection.new(
        connection_string: ENV['AZURE_POSTGRESQL_CONNECTIONSTRING'] + " password="  + access_token,
    )
    ```
    
    Refer to [the Azure AD service-to-service access token request](https://learn.microsoft.com/azure/active-directory/develop/v2-oauth2-client-creds-grant-flow#get-a-token) to see more details of how to acquire access token for service principal.

### [Other](#tab/none)
For other languages, use the connection properties that Service Connector sets to the environment variables to connect the database. For environment variable details, see [Integrate Azure Database for PostgreSQL with Service Connector](how-to-integrate-postgres.md).

---


Next, if you created tables and sequences in PostgreSQL flexible server before using Service Connector, connect as the owner and grant permission to `<aad-username>` created by Service Connector. The username from the connection string or configuration set by Service Connector should look like `aad_<connection name>`. If you use the Azure portal, select the expand button next to the **Service Type** column to get the value. If you use the Azure CLI, check `configurations` in the CLI command output.

Then run the following query to grant permissions:

```azurecli-interactive
az extension add --name rdbms-connect

az postgres flexible-server execute -n <postgres-name> -u <owner-username> -p "<owner-password>" -d <database-name> --querytext "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO \"<aad-username>\";GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO \"<aad username>\";"
```

The `<owner-username>` and `<owner-password>` belong to the owner of the existing table that can grant permissions to others. `<aad-username>` is the user created by Service Connector. Replace them with actual values.

Validate the result:

```azurecli-interactive
az postgres flexible-server execute -n <postgres-name> -u <owner-username> -p "<owner-password>" -d <database-name> --querytext "SELECT distinct(table_name) FROM information_schema.table_privileges WHERE grantee='<aad-username>' AND table_schema='public';" --output table
```



## Next steps

Follow the tutorials listed below to learn more about Service Connector.

> 
> [Learn about Service Connector concepts](concept-service-connector-internals.md)
