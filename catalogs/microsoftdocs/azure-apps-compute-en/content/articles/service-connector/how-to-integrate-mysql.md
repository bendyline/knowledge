---
title: Integrate Azure Database for MySQL with Service Connector
description: Integrate Azure Database for MySQL into your application with Service Connector
author: maud-lv
ms.author: malev
ms.service: service-connector
ms.topic: how-to
ms.custom: engagement-fy23
ms.date: 06/17/2026
---

# Integrate Azure Database for MySQL with Service Connector

This article covers supported authentication methods, clients, and sample code you can use to connect your apps to Azure Database for MySQL - Flexible Server using Service Connector. In this article, you'll also find default environment variable names, values, and configuration obtained when creating service connections.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/mysql/includes/azure-database-for-mysql-single-server-deprecation.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-connector/how-to-integrate-mysql.md)

## Supported compute services

Service Connector can be used to connect the following compute services to Azure Database for MySQL:

- Azure App Service
- Azure Functions
- Azure Kubernetes Service (AKS)
- Azure Spring Apps

## Supported authentication types and client types

The table below shows which combinations of authentication methods and clients are supported for connecting your compute services to Azure Database for MySQL using Service Connector. A “Yes” indicates that the combination is supported, while a “No” indicates that it is not supported.

| Client type | System-assigned managed identity | User-assigned managed identity | Secret/connection string | Service principal |
| --- | :---: | :---: | :---: | :---: |
| .NET | Yes | Yes | Yes | Yes |
| Go (go-sql-driver for mysql) | Yes | Yes | Yes | Yes |
| Java (JDBC) | Yes | Yes | Yes | Yes |
| Java - Spring Boot (JDBC) | Yes | Yes | Yes | Yes |
| Node.js (mysql) | Yes | Yes | Yes | Yes |
| Python (mysql-connector-python) | Yes | Yes | Yes | Yes |
| Python-Django | Yes | Yes | Yes | Yes |
| PHP (MySQLi) | Yes | Yes | Yes | Yes |
| Ruby (mysql2) | Yes | Yes | Yes | Yes |
| None | Yes | Yes | Yes | Yes |

> **Note:**
> System-assigned managed identity, user-assigned managed identity and service principal authentication is only supported on Azure CLI.

## Default environment variable names or application properties and sample code

Reference the connection details and sample code in the following tables, based on your connection's authentication type and client type, to connect your compute services to Azure Database for MySQL. For more information about naming conventions, see [Service Connector internals](concept-service-connector-internals.md#configuration-naming-convention).

### System-assigned managed identity

#### [.NET](#tab/dotnet)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_CONNECTIONSTRING ` | ADO.NET MySQL connection string | `Server=<MySQL-DB-name>.mysql.database.azure.com;Database=<MySQL-DB-name>;Port=3306;User Id=<MySQL-DBusername>;SSL Mode=Required;` |

#### [Java](#tab/java)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_CONNECTIONSTRING` | JDBC MySQL connection string | `jdbc:mysql://<MySQL-DB-name>.mysql.database.azure.com:3306/<MySQL-DB-name>?sslmode=required&user=<MySQL-DB-username>` |

#### [Spring Boot](#tab/springBoot)

| Application properties | Description | Example value |
| --- | --- | --- |
| `spring.datasource.azure.passwordless-enabled` | Enable passwordless authentication | `true` |
| `spring.datasource.url` | Spring Boot JDBC database URL | `jdbc:mysql://<MySQL-DB-name>.mysql.database.azure.com:3306/<MySQL-DB-name>?sslmode=required` |
| `spring.datasource.username` | Database username | `<MySQL-DB-username>` |

#### [Python](#tab/python)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_NAME` | Database name | `MySQL-DB-name` |
| `AZURE_MYSQL_HOST ` | Database host URL | `<MySQL-DB-name>.mysql.database.azure.com` |
| `AZURE_MYSQL_USER` | Database username | `<MySQL-DB-username>@<MySQL-DB-name>` |

#### [Django](#tab/django)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_NAME` | Database name | `MySQL-DB-name` |
| `AZURE_MYSQL_HOST` | Database host URL | `<MySQL-DB-name>.mysql.database.azure.com` |
| `AZURE_MYSQL_USER` | Database username | `<MySQL-DB-username>@<MySQL-DB-name>` |

#### [Go](#tab/go)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_CONNECTIONSTRING` | Go-sql-driver connection string | `<MySQL-DB-username>@tcp(<server-host>:<port>)/<MySQL-DB-name>?tls=true` |

#### [NodeJS](#tab/nodejs)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_HOST` | Database host URL | `<MySQL-DB-name>.mysql.database.azure.com` |
| `AZURE_MYSQL_USER` | Database username | `MySQL-DB-username` |
| `AZURE_MYSQL_DATABASE` | Database name | `<database-name>` |
| `AZURE_MYSQL_PORT` | Port number | `3306` |
| `AZURE_MYSQL_SSL` | SSL option | `true` |

#### [PHP](#tab/php)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_DBNAME` | Database name | `<MySQL-DB-name>` |
| `AZURE_MYSQL_HOST` | Database host URL | `<MySQL-DB-name>.mysql.database.azure.com` |
| `AZURE_MYSQL_PORT` | Port number | `3306` |
| `AZURE_MYSQL_FLAG` | SSL or other flags | `MySQL_CLIENT_SSL` |
| `AZURE_MYSQL_USERNAME` | Database username | `<MySQL-DB-username>` |

#### [Ruby](#tab/ruby)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_DATABASE` | Database name | `<MySQL-DB-name>` |
| `AZURE_MYSQL_HOST` | Database host URL | `<MySQL-DB-name>.mysql.database.azure.com` |
| `AZURE_MYSQL_USERNAME` | Database username | `<MySQL-DB-username>@<MySQL-DB-name>` |
| `AZURE_MYSQL_SSLMODE` | SSL option | `required` |

#### [Other](#tab/none)
| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_HOST` | Database host URL | `<MySQL-DB-name>.mysql.database.azure.com` |
| `AZURE_MYSQL_USERNAME` | Database username | `MySQL-DB-username` |
| `AZURE_MYSQL_DATABASE` | Database name | `<database-name>` |
| `AZURE_MYSQL_PORT` | Port number | `3306` |
| `AZURE_MYSQL_SSL` | SSL option | `true` |

---

#### Sample code

Refer to the steps and code below to connect to Azure Database for MySQL using a system-assigned managed identity.


### [.NET](#tab/dotnet)
For .NET, there's not a plugin or library to support passwordless connections. You can get an access token for the managed identity or service principal using client library like [Azure.Identity](https://www.nuget.org/packages/Azure.Identity/). Then you can use the access token as the password to connect to the database. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

```csharp
using Azure.Core;
using Azure.Identity;
using MySqlConnector;

// Uncomment the following lines corresponding to the authentication type you want to use.
// For system-assigned managed identity.
// var credential = new DefaultAzureCredential();

// For user-assigned managed identity.
// var credential = new DefaultAzureCredential(
//     new DefaultAzureCredentialOptions
//     {
//         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_MYSQL_CLIENTID");
//     });

// For service principal.
// var tenantId = Environment.GetEnvironmentVariable("AZURE_MYSQL_TENANTID");
// var clientId = Environment.GetEnvironmentVariable("AZURE_MYSQL_CLIENTID");
// var clientSecret = Environment.GetEnvironmentVariable("AZURE_MYSQL_CLIENTSECRET");
// var credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

var tokenRequestContext = new TokenRequestContext(
    new[] { "https://ossrdbms-aad.database.windows.net/.default" });
AccessToken accessToken = await credential.GetTokenAsync(tokenRequestContext);
// Open a connection to the MySQL server using the access token.
string connectionString =
    $"{Environment.GetEnvironmentVariable("AZURE_MYSQL_CONNECTIONSTRING")};Password={accessToken.Token}";

using var connection = new MySqlConnection(connectionString);
Console.WriteLine("Opening connection using access token...");
await connection.OpenAsync();

// do something
```

### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.33</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity-extensions</artifactId>
        <version>1.2.0</version>
    </dependency>
    ```
1. Get the connection string from the environment variable, and add the plugin name to connect to the database:

    ```java
    String url = System.getenv("AZURE_MYSQL_CONNECTIONSTRING");
    String pluginName = "com.azure.identity.extensions.jdbc.mysql.AzureMysqlAuthenticationPlugin";

    Properties properties = new Properties();
    properties.put("defaultAuthenticationPlugin", pluginName);
    properties.put("authenticationPlugins", pluginName);

    // Uncomment the following lines corresponding to the authentication type you want to use.

    // for user-assigned managed identity
    // String clientId = System.getenv('AZURE_MYSQL_CLIENTID')
    // properties.put("azure.clientId", clientId);

    // For service principal
    // String tenantId = System.getenv('AZURE_MYSQL_TENANTID')
    // String clientId = System.getenv('AZURE_MYSQL_CLIENTID')
    // String clientSecret = System.getenv('AZURE_MYSQL_CLIENTSECRET')
    // properties.put("azure.clientId", clientId);
    // properties.put("azure.clientSecret", clientSecret);
    // properties.put("azure.tenantId", tenantId);

    Connection connection = DriverManager.getConnection(url, properties);
    ```

For more information, see [Use Java and JDBC with Azure Database for MySQL - Flexible Server](https://learn.microsoft.com/azure/mysql/flexible-server/connect-java?tabs=passwordless).

### [Spring Boot](#tab/springBoot)

For a Spring application, if you create a connection with option `--client-type springboot`, Service Connector sets the properties `spring.datasource.azure.passwordless-enabled`, `spring.datasource.url`, and `spring.datasource.username` to Azure Spring Apps. 

Update your application following the tutorial [Connect an Azure Database for MySQL instance to your application in Azure Spring Apps](../spring-apps/basic-standard/how-to-bind-mysql.md#prepare-your-project). Remember to remove the `spring.datasource.password` configuration property if it was set before and add the correct dependencies to your Spring application.

For more tutorials, see [Use Spring Data JDBC with Azure Database for MySQL](https://learn.microsoft.com/azure/developer/java/spring-framework/configure-spring-data-jdbc-with-azure-mysql?tabs=passwordless%2Cservice-connector\&pivots=mysql-passwordless-flexible-server#store-data-from-azure-database-for-mysql)


### [Python](#tab/python)
1. Install dependencies
   ```bash
   pip install azure-identity
   # install Connector/Python https://dev.mysql.com/doc/connector-python/en/connector-python-installation.html
   pip install mysql-connector-python
   ```
1. Authenticate with access token get via `azure-identity` library and get connection information from the environment variable added by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

    ```python
    from azure.identity import ManagedIdentityCredential, ClientSecretCredential
    import mysql.connector
    import os
    
    # Uncomment the following lines corresponding to the authentication type you want to use.
    # For system-assigned managed identity.
    # cred = ManagedIdentityCredential()    

    # For user-assigned managed identity.
    # managed_identity_client_id = os.getenv('AZURE_MYSQL_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)

    # For service principal
    # tenant_id = os.getenv('AZURE_MYSQL_TENANTID')
    # client_id = os.getenv('AZURE_MYSQL_CLIENTID')
    # client_secret = os.getenv('AZURE_MYSQL_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)
    
    # acquire token
    accessToken = cred.get_token('https://ossrdbms-aad.database.windows.net/.default')
    
    # open connect to Azure MySQL with the access token.
    host = os.getenv('AZURE_MYSQL_HOST')
    database = os.getenv('AZURE_MYSQL_NAME')
    user = os.getenv('AZURE_MYSQL_USER')
    password = accessToken.token
      
    cnx = mysql.connector.connect(user=user,
                                  password=password,
                                  host=host,
                                  database=database)
    cnx.close()
    
    ```

### [Django](#tab/django)
1. Install dependencies.
   ```bash
   pip install azure-identity
   ```
1. Get access token via `azure-identity` library with the environment variables added by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.


    ```python
    from azure.identity import ManagedIdentityCredential, ClientSecretCredential
    import os

    # Uncomment the following lines corresponding to the authentication type you want to use.
    # system-assigned managed identity
    # cred = ManagedIdentityCredential()
    
    # user-assigned managed identity
    # managed_identity_client_id = os.getenv('AZURE_MYSQL_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)
    
    # service principal
    # tenant_id = os.getenv('AZURE_MYSQL_TENANTID')
    # client_id = os.getenv('AZURE_MYSQL_CLIENTID')
    # client_secret = os.getenv('AZURE_MYSQL_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)
    
    # acquire token
    accessToken = cred.get_token('https://ossrdbms-aad.database.windows.net/.default')
    ```

1. In setting file, get Azure MySQL database information from environment variables added by Service Connector service. Use `accessToken` acquired in previous step to access the database.
    ```python
    # in your setting file, eg. settings.py
    host = os.getenv('AZURE_MYSQL_HOST')
    database = os.getenv('AZURE_MYSQL_NAME')
    user = os.getenv('AZURE_MYSQL_USER')
    password = accessToken.token # this is accessToken acquired from above step.
    
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': database,
            'USER': user,
            'PASSWORD': password,
            'HOST': host
        }
    }
    ```

### [Go](#tab/go)

1. Install dependencies.
   ```bash
   go get "github.com/go-sql-driver/mysql"
   go get "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
   go get "github.com/Azure/azure-sdk-for-go/sdk/azcore"
   ```
1. In code, get access token via `azidentity`, then connect to Azure MySQL with the token. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.


   ```go
   import (
     "context"
     
     "github.com/Azure/azure-sdk-for-go/sdk/azcore/policy"
     "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
     "github.com/go-sql-driver/mysql"
   )
   
   
   func main() {
       
     // Uncomment the following lines corresponding to the authentication type you want to use.
     // for system-assigned managed identity
     // cred, err := azidentity.NewDefaultAzureCredential(nil)

     // for user-assigned managed identity
     // clientid := os.Getenv("AZURE_MYSQL_CLIENTID")
     // azidentity.ManagedIdentityCredentialOptions.ID := clientid
     // options := &azidentity.ManagedIdentityCredentialOptions{ID: clientid}
     // cred, err := azidentity.NewManagedIdentityCredential(options)

     // for service principal
     // clientid := os.Getenv("AZURE_MYSQL_CLIENTID")
     // tenantid := os.Getenv("AZURE_MYSQL_TENANTID")
     // clientsecret := os.Getenv("AZURE_MYSQL_CLIENTSECRET")
     // cred, err := azidentity.NewClientSecretCredential(tenantid, clientid, clientsecret, &azidentity.ClientSecretCredentialOptions{})
    
     if err != nil {
     }
   
     ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
     token, err := cred.GetToken(ctx, policy.TokenRequestOptions{
       Scopes: []string("https://ossrdbms-aad.database.windows.net/.default"),
     })
     
     connectionString := os.Getenv("AZURE_MYSQL_CONNECTIONSTRING") + ";Password=" + token.Token
     db, err := sql.Open("mysql", connectionString)
   }
   ```

### [NodeJS](#tab/nodejs)
1. Install dependencies
   ```bash
   npm install --save @azure/identity
   npm install --save mysql2
   ```
1. Get access token using `@azure/identity` and Azure MySQL database information from environment variables added by Service Connector service. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.


   ```javascript
   import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
   
   const mysql = require('mysql2');

   // Uncomment the following lines corresponding to the authentication type you want to use.
   // for system-assigned managed identity
   // const credential = new DefaultAzureCredential();

   // for user-assigned managed identity
   // const clientId = process.env.AZURE_MYSQL_CLIENTID;
   // const credential = new DefaultAzureCredential({
   //    managedIdentityClientId: clientId
   // });

   // for service principal
   // const tenantId = process.env.AZURE_MYSQL_TENANTID;
   // const clientId = process.env.AZURE_MYSQL_CLIENTID;
   // const clientSecret = process.env.AZURE_MYSQL_CLIENTSECRET;
   // const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
   
   // acquire token
   var accessToken = await credential.getToken('https://ossrdbms-aad.database.windows.net/.default');
   
   const connection = mysql.createConnection({
     host: process.env.AZURE_MYSQL_HOST,
     user: process.env.AZURE_MYSQL_USER,
     password: accessToken.token,
     database: process.env.AZURE_MYSQL_DATABASE,
     port: process.env.AZURE_MYSQL_PORT,
     ssl: process.env.AZURE_MYSQL_SSL
   });
   
   connection.connect((err) => {
     if (err) {
       console.error('Error connecting to MySQL database: ' + err.stack);
       return;
     }
     console.log('Connected to MySQL database');
   });
   ```

### [PHP](#tab/php)
For other languages, use the connection string and username that Service Connector sets to the environment variables to connect the database. For environment variable details, see [Integrate Azure Database for MySQL with Service Connector](how-to-integrate-mysql.md).

### [Ruby](#tab/ruby)
For other languages, use the connection string and username that Service Connector sets to the environment variables to connect the database. For environment variable details, see [Integrate Azure Database for MySQL with Service Connector](how-to-integrate-mysql.md).

### [Other](#tab/none)
For other languages, use the connection properties that Service Connector sets to the environment variables to connect the database. For environment variable details, see [Integrate Azure Database for MySQL with Service Connector](how-to-integrate-mysql.md).

---

For more code samples, see [Connect to Azure databases from App Service without secrets using a managed identity](https://learn.microsoft.com/azure/app-service/tutorial-connect-msi-azure-database?tabs=mysql#3-modify-your-code).





### User-assigned managed identity

#### [.NET](#tab/dotnet)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_CLIENTID` | Your client ID | `<identity-client-ID>` |
| `AZURE_MYSQL_CONNECTIONSTRING` | ADO.NET MySQL connection string | `Server=<MySQL-DB-name>.mysql.database.azure.com;Database=<MySQL-DB-name>;Port=3306;User Id=<MySQL-DBusername>;SSL Mode=Required;` |

#### [Java](#tab/java)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_CLIENTID` | Your client ID | `<identity-client-ID>` |
| `AZURE_MYSQL_CONNECTIONSTRING` | JDBC MySQL connection string | `jdbc:mysql://<MySQL-DB-name>.mysql.database.azure.com:3306/<MySQL-DB-name>?sslmode=required&user=<MySQL-DB-username>` |

#### [Spring Boot](#tab/springBoot)

| Application properties | Description | Example value |
| --- | --- | --- |
| `spring.datasource.azure.passwordless-enabled` | Enable passwordless authentication | `true` |
| `spring.cloud.azure.credential.client-id` | Your client ID | `<identity-client-ID>` |
| `spring.cloud.azure.credential.client-managed-identity-enabled` | Enable client managed identity | `true` |
| `spring.datasource.url` | Database URL | `jdbc:mysql://<MySQL-DB-name>.mysql.database.azure.com:3306/<MySQL-DB-name>?sslmode=required` |
| `spring.datasource.username` | Database username | `username` |

#### [Python](#tab/python)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_NAME` | Database name | `MySQL-DB-name` |
| `AZURE_MYSQL_HOST` | Database host URL | `<MySQL-DB-name>.mysql.database.azure.com` |
| `AZURE_MYSQL_USER` | Database username | `<MySQL-DB-username>@<MySQL-DB-name>` |
| `AZURE_MYSQL_CLIENTID` | Your client ID | `identity-client-ID` |

#### [Django](#tab/django)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_NAME` | Database name | `MySQL-DB-name` |
| `AZURE_MYSQL_HOST` | Database host URL | `<MySQL-DB-name>.mysql.database.azure.com` |
| `AZURE_MYSQL_USER ` | Database username | `<MySQL-DB-username>@<MySQL-DB-name>` |
| `AZURE_MYSQL_CLIENTID` | Your client ID | `<identity-client-ID>` |

#### [Go](#tab/go)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_CLIENTID` | Your client ID | `<identity-client-ID>` |
| `AZURE_MYSQL_CONNECTIONSTRING` | Go-sql-driver connection string | `<MySQL-DB-username>@tcp(<server-host>:<port>)/<MySQL-DB-name>?tls=true` |

#### [NodeJS](#tab/nodejs)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_HOST` | Database host URL | `<MySQL-DB-name>.mysql.database.azure.com` |
| `AZURE_MYSQL_USER` | Database username | `MySQL-DB-username` |
| `AZURE_MYSQL_DATABASE` | Database name | `<database-name>` |
| `AZURE_MYSQL_PORT` | Port number | `3306` |
| `AZURE_MYSQL_SSL` | SSL option | `true` |
| `AZURE_MYSQL_CLIENTID` | Your client ID | `<identity-client-ID>` |

#### [PHP](#tab/php)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_DBNAME` | Database name | `<MySQL-DB-name>` |
| `AZURE_MYSQL_HOST` | Database host URL | `<MySQL-DB-name>.mysql.database.azure.com` |
| `AZURE_MYSQL_PORT` | Port number | `3306` |
| `AZURE_MYSQL_FLAG` | SSL or other flags | `MySQL_CLIENT_SSL` |
| `AZURE_MYSQL_USERNAME` | Database username | `<MySQL-DB-username>@<MySQL-DB-name>` |
| `AZURE_MYSQL_CLIENTID` | Your client ID | `<identity-client-ID>` |

#### [Ruby](#tab/ruby)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_DATABASE` | Database name | `<MySQL-DB-name>` |
| `AZURE_MYSQL_HOST` | Database host URL | `<MySQL-DB-name>.mysql.database.azure.com` |
| `AZURE_MYSQL_USERNAME` | Database username | `<MySQL-DB-username>@<MySQL-DB-name>` |
| `AZURE_MYSQL_SSLMODE` | SSL option | `required` |
| `AZURE_MYSQL_CLIENTID` | Your client ID | `<identity-client-ID>` |

#### [Other](#tab/none)
| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_HOST` | Database host URL | `<MySQL-DB-name>.mysql.database.azure.com` |
| `AZURE_MYSQL_USERNAME` | Database username | `MySQL-DB-username` |
| `AZURE_MYSQL_DATABASE` | Database name | `<database-name>` |
| `AZURE_MYSQL_PORT` | Port number | `3306` |
| `AZURE_MYSQL_SSL` | SSL option | `true` |
| `AZURE_MYSQL_CLIENTID` | Your client ID | `<identity-client-ID>` |

---

#### Sample code

Refer to the steps and code below to connect to Azure Database for MySQL using a user-assigned managed identity.


### [.NET](#tab/dotnet)
For .NET, there's not a plugin or library to support passwordless connections. You can get an access token for the managed identity or service principal using client library like [Azure.Identity](https://www.nuget.org/packages/Azure.Identity/). Then you can use the access token as the password to connect to the database. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

```csharp
using Azure.Core;
using Azure.Identity;
using MySqlConnector;

// Uncomment the following lines corresponding to the authentication type you want to use.
// For system-assigned managed identity.
// var credential = new DefaultAzureCredential();

// For user-assigned managed identity.
// var credential = new DefaultAzureCredential(
//     new DefaultAzureCredentialOptions
//     {
//         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_MYSQL_CLIENTID");
//     });

// For service principal.
// var tenantId = Environment.GetEnvironmentVariable("AZURE_MYSQL_TENANTID");
// var clientId = Environment.GetEnvironmentVariable("AZURE_MYSQL_CLIENTID");
// var clientSecret = Environment.GetEnvironmentVariable("AZURE_MYSQL_CLIENTSECRET");
// var credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

var tokenRequestContext = new TokenRequestContext(
    new[] { "https://ossrdbms-aad.database.windows.net/.default" });
AccessToken accessToken = await credential.GetTokenAsync(tokenRequestContext);
// Open a connection to the MySQL server using the access token.
string connectionString =
    $"{Environment.GetEnvironmentVariable("AZURE_MYSQL_CONNECTIONSTRING")};Password={accessToken.Token}";

using var connection = new MySqlConnection(connectionString);
Console.WriteLine("Opening connection using access token...");
await connection.OpenAsync();

// do something
```

### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.33</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity-extensions</artifactId>
        <version>1.2.0</version>
    </dependency>
    ```
1. Get the connection string from the environment variable, and add the plugin name to connect to the database:

    ```java
    String url = System.getenv("AZURE_MYSQL_CONNECTIONSTRING");
    String pluginName = "com.azure.identity.extensions.jdbc.mysql.AzureMysqlAuthenticationPlugin";

    Properties properties = new Properties();
    properties.put("defaultAuthenticationPlugin", pluginName);
    properties.put("authenticationPlugins", pluginName);

    // Uncomment the following lines corresponding to the authentication type you want to use.

    // for user-assigned managed identity
    // String clientId = System.getenv('AZURE_MYSQL_CLIENTID')
    // properties.put("azure.clientId", clientId);

    // For service principal
    // String tenantId = System.getenv('AZURE_MYSQL_TENANTID')
    // String clientId = System.getenv('AZURE_MYSQL_CLIENTID')
    // String clientSecret = System.getenv('AZURE_MYSQL_CLIENTSECRET')
    // properties.put("azure.clientId", clientId);
    // properties.put("azure.clientSecret", clientSecret);
    // properties.put("azure.tenantId", tenantId);

    Connection connection = DriverManager.getConnection(url, properties);
    ```

For more information, see [Use Java and JDBC with Azure Database for MySQL - Flexible Server](https://learn.microsoft.com/azure/mysql/flexible-server/connect-java?tabs=passwordless).

### [Spring Boot](#tab/springBoot)

For a Spring application, if you create a connection with option `--client-type springboot`, Service Connector sets the properties `spring.datasource.azure.passwordless-enabled`, `spring.datasource.url`, and `spring.datasource.username` to Azure Spring Apps. 

Update your application following the tutorial [Connect an Azure Database for MySQL instance to your application in Azure Spring Apps](../spring-apps/basic-standard/how-to-bind-mysql.md#prepare-your-project). Remember to remove the `spring.datasource.password` configuration property if it was set before and add the correct dependencies to your Spring application.

For more tutorials, see [Use Spring Data JDBC with Azure Database for MySQL](https://learn.microsoft.com/azure/developer/java/spring-framework/configure-spring-data-jdbc-with-azure-mysql?tabs=passwordless%2Cservice-connector\&pivots=mysql-passwordless-flexible-server#store-data-from-azure-database-for-mysql)


### [Python](#tab/python)
1. Install dependencies
   ```bash
   pip install azure-identity
   # install Connector/Python https://dev.mysql.com/doc/connector-python/en/connector-python-installation.html
   pip install mysql-connector-python
   ```
1. Authenticate with access token get via `azure-identity` library and get connection information from the environment variable added by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

    ```python
    from azure.identity import ManagedIdentityCredential, ClientSecretCredential
    import mysql.connector
    import os
    
    # Uncomment the following lines corresponding to the authentication type you want to use.
    # For system-assigned managed identity.
    # cred = ManagedIdentityCredential()    

    # For user-assigned managed identity.
    # managed_identity_client_id = os.getenv('AZURE_MYSQL_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)

    # For service principal
    # tenant_id = os.getenv('AZURE_MYSQL_TENANTID')
    # client_id = os.getenv('AZURE_MYSQL_CLIENTID')
    # client_secret = os.getenv('AZURE_MYSQL_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)
    
    # acquire token
    accessToken = cred.get_token('https://ossrdbms-aad.database.windows.net/.default')
    
    # open connect to Azure MySQL with the access token.
    host = os.getenv('AZURE_MYSQL_HOST')
    database = os.getenv('AZURE_MYSQL_NAME')
    user = os.getenv('AZURE_MYSQL_USER')
    password = accessToken.token
      
    cnx = mysql.connector.connect(user=user,
                                  password=password,
                                  host=host,
                                  database=database)
    cnx.close()
    
    ```

### [Django](#tab/django)
1. Install dependencies.
   ```bash
   pip install azure-identity
   ```
1. Get access token via `azure-identity` library with the environment variables added by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.


    ```python
    from azure.identity import ManagedIdentityCredential, ClientSecretCredential
    import os

    # Uncomment the following lines corresponding to the authentication type you want to use.
    # system-assigned managed identity
    # cred = ManagedIdentityCredential()
    
    # user-assigned managed identity
    # managed_identity_client_id = os.getenv('AZURE_MYSQL_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)
    
    # service principal
    # tenant_id = os.getenv('AZURE_MYSQL_TENANTID')
    # client_id = os.getenv('AZURE_MYSQL_CLIENTID')
    # client_secret = os.getenv('AZURE_MYSQL_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)
    
    # acquire token
    accessToken = cred.get_token('https://ossrdbms-aad.database.windows.net/.default')
    ```

1. In setting file, get Azure MySQL database information from environment variables added by Service Connector service. Use `accessToken` acquired in previous step to access the database.
    ```python
    # in your setting file, eg. settings.py
    host = os.getenv('AZURE_MYSQL_HOST')
    database = os.getenv('AZURE_MYSQL_NAME')
    user = os.getenv('AZURE_MYSQL_USER')
    password = accessToken.token # this is accessToken acquired from above step.
    
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': database,
            'USER': user,
            'PASSWORD': password,
            'HOST': host
        }
    }
    ```

### [Go](#tab/go)

1. Install dependencies.
   ```bash
   go get "github.com/go-sql-driver/mysql"
   go get "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
   go get "github.com/Azure/azure-sdk-for-go/sdk/azcore"
   ```
1. In code, get access token via `azidentity`, then connect to Azure MySQL with the token. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.


   ```go
   import (
     "context"
     
     "github.com/Azure/azure-sdk-for-go/sdk/azcore/policy"
     "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
     "github.com/go-sql-driver/mysql"
   )
   
   
   func main() {
       
     // Uncomment the following lines corresponding to the authentication type you want to use.
     // for system-assigned managed identity
     // cred, err := azidentity.NewDefaultAzureCredential(nil)

     // for user-assigned managed identity
     // clientid := os.Getenv("AZURE_MYSQL_CLIENTID")
     // azidentity.ManagedIdentityCredentialOptions.ID := clientid
     // options := &azidentity.ManagedIdentityCredentialOptions{ID: clientid}
     // cred, err := azidentity.NewManagedIdentityCredential(options)

     // for service principal
     // clientid := os.Getenv("AZURE_MYSQL_CLIENTID")
     // tenantid := os.Getenv("AZURE_MYSQL_TENANTID")
     // clientsecret := os.Getenv("AZURE_MYSQL_CLIENTSECRET")
     // cred, err := azidentity.NewClientSecretCredential(tenantid, clientid, clientsecret, &azidentity.ClientSecretCredentialOptions{})
    
     if err != nil {
     }
   
     ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
     token, err := cred.GetToken(ctx, policy.TokenRequestOptions{
       Scopes: []string("https://ossrdbms-aad.database.windows.net/.default"),
     })
     
     connectionString := os.Getenv("AZURE_MYSQL_CONNECTIONSTRING") + ";Password=" + token.Token
     db, err := sql.Open("mysql", connectionString)
   }
   ```

### [NodeJS](#tab/nodejs)
1. Install dependencies
   ```bash
   npm install --save @azure/identity
   npm install --save mysql2
   ```
1. Get access token using `@azure/identity` and Azure MySQL database information from environment variables added by Service Connector service. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.


   ```javascript
   import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
   
   const mysql = require('mysql2');

   // Uncomment the following lines corresponding to the authentication type you want to use.
   // for system-assigned managed identity
   // const credential = new DefaultAzureCredential();

   // for user-assigned managed identity
   // const clientId = process.env.AZURE_MYSQL_CLIENTID;
   // const credential = new DefaultAzureCredential({
   //    managedIdentityClientId: clientId
   // });

   // for service principal
   // const tenantId = process.env.AZURE_MYSQL_TENANTID;
   // const clientId = process.env.AZURE_MYSQL_CLIENTID;
   // const clientSecret = process.env.AZURE_MYSQL_CLIENTSECRET;
   // const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
   
   // acquire token
   var accessToken = await credential.getToken('https://ossrdbms-aad.database.windows.net/.default');
   
   const connection = mysql.createConnection({
     host: process.env.AZURE_MYSQL_HOST,
     user: process.env.AZURE_MYSQL_USER,
     password: accessToken.token,
     database: process.env.AZURE_MYSQL_DATABASE,
     port: process.env.AZURE_MYSQL_PORT,
     ssl: process.env.AZURE_MYSQL_SSL
   });
   
   connection.connect((err) => {
     if (err) {
       console.error('Error connecting to MySQL database: ' + err.stack);
       return;
     }
     console.log('Connected to MySQL database');
   });
   ```

### [PHP](#tab/php)
For other languages, use the connection string and username that Service Connector sets to the environment variables to connect the database. For environment variable details, see [Integrate Azure Database for MySQL with Service Connector](how-to-integrate-mysql.md).

### [Ruby](#tab/ruby)
For other languages, use the connection string and username that Service Connector sets to the environment variables to connect the database. For environment variable details, see [Integrate Azure Database for MySQL with Service Connector](how-to-integrate-mysql.md).

### [Other](#tab/none)
For other languages, use the connection properties that Service Connector sets to the environment variables to connect the database. For environment variable details, see [Integrate Azure Database for MySQL with Service Connector](how-to-integrate-mysql.md).

---

For more code samples, see [Connect to Azure databases from App Service without secrets using a managed identity](https://learn.microsoft.com/azure/app-service/tutorial-connect-msi-azure-database?tabs=mysql#3-modify-your-code).





### Connection string

> **Warning:**
> Microsoft recommends that you use the most secure authentication flow available. The authentication flow described in this procedure requires a very high degree of trust in the application, and carries risks that are not present in other flows. You should only use this flow when other more secure flows, such as managed identities, aren't viable.

#### [.NET](#tab/dotnet)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_CONNECTIONSTRING` | ADO.NET MySQL connection string | `Server=<MySQL-DB-name>.mysql.database.azure.com;Database=<MySQL-DB-name>;Port=3306;User Id=<MySQL-DBusername>;Password=<MySQL-DB-password>;SSL Mode=Required` |

#### [Java](#tab/java)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_CONNECTIONSTRING` | JDBC MySQL connection string | `jdbc:mysql://<MySQL-DB-name>.mysql.database.azure.com:3306/<MySQL-DB-name>?sslmode=required&user=<MySQL-DB-username>&password=<Uri.EscapeDataString(<MySQL-DB-password>)` |

#### [Spring Boot](#tab/springBoot)

| Application properties | Description | Example value |
| --- | --- | --- |
| `spring.datasource.url` | Spring Boot JDBC database URL | `jdbc:mysql://<MySQL-DB-name>.mysql.database.azure.com:3306/<MySQL-DB-name>?sslmode=required` |
| `spring.datasource.username` | Database username | `<MySQL-DB-username>` |
| `spring.datasource.password` | Database password | `MySQL-DB-password` |

After created a `springboot` client type connection, Service Connector service will automatically add properties `spring.datasource.url`, `spring.datasource.username`, `spring.datasource.password`. So Spring boot application could add beans automatically.

#### [Python](#tab/python)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_NAME` | Database name | `MySQL-DB-name` |
| `AZURE_MYSQL_HOST` | Database host URL | `<MySQL-DB-name>.mysql.database.azure.com` |
| `AZURE_MYSQL_USER` | Database username | `<MySQL-DB-username>@<MySQL-DB-name>` |
| `AZURE_MYSQL_PASSWORD` | Database password | `MySQL-DB-password` |

#### [Django](#tab/django)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_NAME` | Database name | `MySQL-DB-name` |
| `AZURE_MYSQL_HOST` | Database host URL | `<MySQL-DB-name>.mysql.database.azure.com` |
| `AZURE_MYSQL_USER` | Database username | `<MySQL-DB-username>@<MySQL-DB-name>` |
| `AZURE_MYSQL_PASSWORD` | Database password | `MySQL-DB-password` |

#### [Go](#tab/go)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_CONNECTIONSTRING` | Go-sql-driver connection string | `<MySQL-DB-username>:<MySQL-DB-password>@tcp(<server-host>:<port>)/<MySQL-DB-name>?tls=true` |

#### [NodeJS](#tab/nodejs)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_HOST` | Database host URL | `<MySQL-DB-name>.mysql.database.azure.com` |
| `AZURE_MYSQL_USER` | Database username | `MySQL-DB-username` |
| `AZURE_MYSQL_PASSWORD` | Database password | `MySQL-DB-password` |
| `AZURE_MYSQL_DATABASE` | Database name | `<database-name>` |
| `AZURE_MYSQL_PORT` | Port number | `3306` |
| `AZURE_MYSQL_SSL` | SSL option | `true` |

#### [PHP](#tab/php)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_DBNAME` | Database name | `<MySQL-DB-name>` |
| `AZURE_MYSQL_HOST` | Database host URL | `<MySQL-DB-name>.mysql.database.azure.com` |
| `AZURE_MYSQL_PORT` | Port number | `3306` |
| `AZURE_MYSQL_FLAG` | SSL or other flags | `MySQL_CLIENT_SSL` |
| `AZURE_MYSQL_USERNAME` | Database username | `<MySQL-DB-username>` |
| `AZURE_MYSQL_PASSWORD` | Database password | `<MySQL-DB-password>` |

#### [Ruby](#tab/ruby)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_DATABASE` | Database name | `<MySQL-DB-name>` |
| `AZURE_MYSQL_HOST` | Database host URL | `<MySQL-DB-name>.mysql.database.azure.com` |
| `AZURE_MYSQL_USERNAME` | Database username | `<MySQL-DB-username>@<MySQL-DB-name>` |
| `AZURE_MYSQL_PASSWORD` | Database password | `<MySQL-DB-password>` |
| `AZURE_MYSQL_SSLMODE` | SSL option | `required` |

#### [Other](#tab/none)
| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_HOST` | Database host URL | `<MySQL-DB-name>.mysql.database.azure.com` |
| `AZURE_MYSQL_USERNAME` | Database username | `MySQL-DB-username` |
| `AZURE_MYSQL_PASSWORD` | Database password | `MySQL-DB-password` |
| `AZURE_MYSQL_DATABASE` | Database name | `<database-name>` |
| `AZURE_MYSQL_PORT` | Port number | `3306` |
| `AZURE_MYSQL_SSL` | SSL option | `true` |

---

#### Sample code

Refer to the steps and code below to connect to Azure Database for MySQL using a connection string.

### [.NET](#tab/dotnet)

1. Install dependencies. Follow the guidance to [install connector/NET MySQL](https://dev.mysql.com/doc/connector-net/en/connector-net-installation.html)
1. In code, get MySQL connection string from environment variables added by Service Connector service. To establish encrypted connection to MySQL server over SSL, refer to [these steps](https://learn.microsoft.com/azure/mysql/flexible-server/how-to-connect-tls-ssl#connect-using-mysql-command-line-client-with-tlsssl).
   ```csharp
   using System;
   using System.Data;
   using MySql.Data.MySqlClient;
   
   string connectionString = Environment.GetEnvironmentVariable("AZURE_MYSQL_CONNECTIONSTRING");
   using (MySqlConnection connection = new MySqlConnection(connectionString))
   {
       connection.Open();
   }
   ```

### [Java](#tab/java)

1. Install dependencies. Follow the guidance to [install Connector/J](https://dev.mysql.com/doc/connector-j/en/connector-j-installing.html).
1. In code, get MySQL connection string from environment variables added by Service Connector service. To establish encrypted connection to MySQL server over SSL, refer to [these steps](https://learn.microsoft.com/azure/mysql/flexible-server/how-to-connect-tls-ssl#connect-using-mysql-command-line-client-with-tlsssl).
    ```java
    import java.sql.Connection;
    import java.sql.DriverManager;
    import java.sql.SQLException;

    String connectionString = System.getenv("AZURE_MYSQL_CONNECTIONSTRING");
    try (Connection connection = DriverManager.getConnection(connectionString)) {
        System.out.println("Connection successful!");
    } catch (SQLException e) {
        e.printStackTrace();
    }
    ```

### [Spring Boot](#tab/springBoot)

1. Install dependencies. Add following dependencies to your `pom.xml` file.
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
          <artifactId>spring-cloud-azure-starter-jdbc-mysql</artifactId>
        </dependency>
      </dependencies>
    </dependencyManagement>
    ```
1. Setup normal Spring App application, more detail in this [section](https://learn.microsoft.com/azure/developer/java/spring-framework/configure-spring-data-jpa-with-azure-mysql?tabs=password%2Cservice-connector). To establish encrypted connection to MySQL server over SSL, refer to [these steps](https://learn.microsoft.com/azure/mysql/flexible-server/how-to-connect-tls-ssl#connect-using-mysql-command-line-client-with-tlsssl).

### [Python](#tab/python)

1. Install dependencies. Follow the guidance to [install Connector/Python](https://dev.mysql.com/doc/connector-python/en/connector-python-installation.html).
1. In code, get MySQL connection information from environment variables added by Service Connector service. To establish encrypted connection to MySQL server over SSL, refer to [these steps](https://learn.microsoft.com/azure/mysql/flexible-server/how-to-connect-tls-ssl#connect-using-mysql-command-line-client-with-tlsssl).
   ```python
   import os
   import mysql.connector
   
   host = os.getenv('AZURE_MYSQL_HOST')
   user = os.getenv('AZURE_MYSQL_USER')
   password = os.getenv('AZURE_MYSQL_PASSWORD')
   database = os.getenv('Azure_MYSQL_NAME')
   
   cnx = mysql.connector.connect(user=user, password=password,
                                 host=host,
                                 database=database)
   
   cnx.close()
   ```

### [Django](#tab/django)

1. Install dependencies.
   ```bash
   pip install django
   ```
1. In setting file, get MySQL database information from environment variables added by Service Connector service. To establish encrypted connection to MySQL server over SSL, refer to [these steps](https://learn.microsoft.com/azure/mysql/flexible-server/how-to-connect-tls-ssl#connect-using-mysql-command-line-client-with-tlsssl).
   ```python
   # in your setting file, eg. settings.py
   host = os.getenv('AZURE_MYSQL_HOST')
   user = os.getenv('AZURE_MYSQL_USER')
   password = os.getenv('AZURE_MYSQL_PASSWORD')
   database = os.getenv('AZURE_MYSQL_NAME')
   
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.mysql',
           'NAME': database,
           'USER': user,
           'PASSWORD': password,
           'HOST': host
       }
   }
   ```

### [Go](#tab/go)

1. Install dependencies.
    ```bash
    go get -u github.com/go-sql-driver/mysql
    ```
1. In code, get MySQL connection string from environment variables added by Service Connector service. To establish encrypted connection to MySQL server over SSL, refer to [these steps](https://learn.microsoft.com/azure/mysql/flexible-server/how-to-connect-tls-ssl#connect-using-mysql-command-line-client-with-tlsssl).
    ```go
    import (
    "database/sql"
    "fmt"
    "os"

    _ "github.com/go-sql-driver/mysql"
    )

    connectionString := os.Getenv("AZURE_MYSQL_CONNECTIONSTRING")
    db, err := sql.Open("mysql", connectionString)
    ```


### [NodeJS](#tab/nodejs)

1. Install dependencies.
   ```bash
   npm install mysql2
   ```
1. In code, get MySQL connection information from environment variables added by Service Connector service. To establish encrypted connection to MySQL server over SSL, refer to [these steps](https://learn.microsoft.com/azure/mysql/flexible-server/how-to-connect-tls-ssl#connect-using-mysql-command-line-client-with-tlsssl).
   ```javascript
   const mysql = require('mysql2')
   
   const connection = mysql.createConnection({
     host: process.env.AZURE_MYSQL_HOST,
     user: process.env.AZURE_MYSQL_USER,
     password: process.env.AZURE_MYSQL_PASSWORD,
     database: process.env.AZURE_MYSQL_DATABASE,
     port: Number(process.env.AZURE_MYSQL_PORT) ,
     // ssl: process.env.AZURE_MYSQL_SSL
   });
   
   connection.connect((err) => {
     if (err) {
       console.error('Error connecting to MySQL database: ' + err.stack);
       return;
     }
     console.log('Connected to MySQL database.');
   });
   ```

### [PHP](#tab/php)

1. Install dependencies. Follow the guide to [install MySQLi](https://www.php.net/manual/en/mysqli.installation.php).
1. In code, get MySQL connection information from environment variables added by Service Connector service. To establish encrypted connection to MySQL server over SSL, refer to [these steps](https://learn.microsoft.com/azure/mysql/flexible-server/connect-php?tabs=windows#connecting-to-flexible-server-using-tlsssl-in-php).
   ```php
   <?php
   $host = getenv('AZURE_MYSQL_HOST');
   $username = getenv('AZURE_MYSQL_USER');
   $password = getenv('AZURE_MYSQL_PASSWORD');
   $database = getenv('Azure_MYSQL_DBNAME');
   $port = int(getenv('AZURE_MYSQL_PORT'));
   # $flag = getenv('AZURE_MYSQL_FLAG');
   
   $conn = mysqli_init();
   # mysqli_ssl_set($conn,NULL,NULL,NULL,NULL,NULL);
   mysqli_real_connect($conn, $host, $username, $password, $database, $port, NULL);
   
   if (mysqli_connect_errno($conn)) {
       die('Failed to connect to MySQL: ' . mysqli_connect_error());
   }
   
   echo 'Connected successfully to MySQL database!';
   mysqli_close($conn);
   ?>
   ```

### [Ruby](#tab/ruby)

1. Install dependencies.
   ```bash
   gem install mysql2
   ```
1. In code, get MySQL connection information from environment variables added by Service Connector service. To establish encrypted connection to MySQL server over SSL, refer to [these steps](https://learn.microsoft.com/azure/mysql/flexible-server/how-to-connect-tls-ssl#connect-using-mysql-command-line-client-with-tlsssl).
   ```ruby
   require 'mysql2'
   require 'dotenv/load'
   
   client = Mysql2::Client.new(
     host: ENV['AZURE_MYSQL_HOST'],
     username: ENV['AZURE_MYSQL_USERNAME'],
     password: ENV['AZURE_MYSQL_PASSWORD'],
     database: ENV['AZURE_MYSQL_DATABASE'],
     # sslca: ca_path
   )
   
   client.close
   ```

### [Other](#tab/none)
For other languages, use the connection properties that Service Connector sets to the environment variables to connect the database. For environment variable details, see [Integrate Azure Database for MySQL with Service Connector](how-to-integrate-mysql.md).


### Service principal

#### [.NET](#tab/dotnet)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_CLIENTID` | Your client ID | `<client-ID>` |
| `AZURE_MYSQL_CLIENTSECRET` | Your client secret | `<client-secret>` |
| `AZURE_MYSQL_TENANTID` | Your tenant ID | `<tenant-ID>` |
| `AZURE_MYSQL_CONNECTIONSTRING` | ADO.NET MySQL connection string | `Server=<MySQL-DB-name>.mysql.database.azure.com;Database=<MySQL-DB-name>;Port=3306;User Id=<MySQL-DBusername>;SSL Mode=Required` |

#### [Java](#tab/java)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_CLIENTID` | Your client ID | `<client-ID>` |
| `AZURE_MYSQL_CLIENTSECRET` | Your client secret | `<client-secret>` |
| `AZURE_MYSQL_TENANTID` | Your tenant ID | `<tenant-ID>` |
| `AZURE_MYSQL_CONNECTIONSTRING` | JDBC MySQL connection string | `jdbc:mysql://<MySQL-DB-name>.mysql.database.azure.com:3306/<MySQL-DB-name>?sslmode=required&user=<MySQL-DB-username>` |

#### [Spring Boot](#tab/springBoot)

| Application properties | Description | Example value |
| --- | --- | --- |
| `spring.datasource.azure.passwordless-enabled` | Enable passwordless authentication | `true` |
| `spring.cloud.azure.credential.client-id` | Your client ID | `<client-ID>` |
| `spring.cloud.azure.credential.client-secret` | Your client secret | `<client-secret>` |
| `spring.cloud.azure.credential.tenant-id` | Your tenant ID | `<tenant-ID>` |
| `spring.datasource.url` | Database URL | `jdbc:mysql://<MySQL-DB-name>.mysql.database.azure.com:3306/<MySQL-DB-name>?sslmode=required` |
| `spring.datasource.username` | Database username | `username` |

#### [Python](#tab/python)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_NAME` | Database name | `MySQL-DB-name` |
| `AZURE_MYSQL_HOST` | Database host URL | `<MySQL-DB-name>.mysql.database.azure.com` |
| `AZURE_MYSQL_USER` | Database username | `<MySQL-DB-username>@<MySQL-DB-name>` |
| `AZURE_MYSQL_CLIENTID` | Your client ID | `<client-ID>` |
| `AZURE_MYSQL_CLIENTSECRET` | Your client secret | `<client-secret>` |
| `AZURE_MYSQL_TENANTID` | Your tenant ID | `<tenant-ID>` |

#### [Django](#tab/django)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_NAME` | Database name | `MySQL-DB-name` |
| `AZURE_MYSQL_HOST` | Database host URL | `<MySQL-DB-name>.mysql.database.azure.com` |
| `AZURE_MYSQL_USER` | Database username | `<MySQL-DB-username>@<MySQL-DB-name>` |
| `AZURE_MYSQL_CLIENTID` | Your client ID | `<client-ID>` |
| `AZURE_MYSQL_CLIENTSECRET` | Your client secret | `<client-secret>` |
| `AZURE_MYSQL_TENANTID` | Your tenant ID | `<tenant-ID>` |

#### [Go](#tab/go)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_CLIENTID` | Your client ID | `<client-ID>` |
| `AZURE_MYSQL_CLIENTSECRET` | Your client secret | `<client-secret>` |
| `AZURE_MYSQL_TENANTID` | Your tenant ID | `<tenant-ID>` |
| `AZURE_MYSQL_CONNECTIONSTRING` | Go-sql-driver connection string | `<MySQL-DB-username>@tcp(<server-host>:<port>)/<MySQL-DB-name>?tls=true` |

#### [NodeJS](#tab/nodejs)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_HOST` | Database host URL | `<MySQL-DB-name>.mysql.database.azure.com` |
| `AZURE_MYSQL_USER` | Database username | `MySQL-DB-username` |
| `AZURE_MYSQL_DATABASE` | Database name | `<database-name>` |
| `AZURE_MYSQL_PORT` | Port number | `3306` |
| `AZURE_MYSQL_SSL` | SSL option | `true` |
| `AZURE_MYSQL_CLIENTID` | Your client ID | `<client-ID>` |
| `AZURE_MYSQL_CLIENTSECRET` | Your client secret | `<client-secret>` |
| `AZURE_MYSQL_TENANTID` | Your tenant ID | `<tenant-ID>` |

#### [PHP](#tab/php)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_DBNAME` | Database name | `<MySQL-DB-name>` |
| `AZURE_MYSQL_HOST` | Database host URL | `<MySQL-DB-name>.mysql.database.azure.com` |
| `AZURE_MYSQL_PORT` | Port number | `3306` |
| `AZURE_MYSQL_FLAG` | SSL or other flags | `MySQL_CLIENT_SSL` |
| `AZURE_MYSQL_USERNAME` | Database username | `<MySQL-DB-username>@<MySQL-DB-name>` |
| `AZURE_MYSQL_CLIENTID` | Your client ID | `<client-ID>` |
| `AZURE_MYSQL_CLIENTSECRET` | Your client secret | `<client-secret>` |
| `AZURE_MYSQL_TENANTID` | Your tenant ID | `<tenant-ID>` |

#### [Ruby](#tab/ruby)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_DATABASE` | Database name | `<MySQL-DB-name>` |
| `AZURE_MYSQL_HOST` | Database host URL | `<MySQL-DB-name>.mysql.database.azure.com` |
| `AZURE_MYSQL_USERNAME` | Database username | `<MySQL-DB-username>@<MySQL-DB-name>` |
| `AZURE_MYSQL_SSLMODE` | SSL option | `required` |
| `AZURE_MYSQL_CLIENTID` | Your client ID | `<client-ID>` |
| `AZURE_MYSQL_CLIENTSECRET` | Your client secret | `<client-secret>` |
| `AZURE_MYSQL_TENANTID` | Your tenant ID | `<tenant-ID>` |

#### [Other](#tab/none)
| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `AZURE_MYSQL_HOST` | Database host URL | `<MySQL-DB-name>.mysql.database.azure.com` |
| `AZURE_MYSQL_USERNAME` | Database username | `MySQL-DB-username` |
| `AZURE_MYSQL_DATABASE` | Database name | `<database-name>` |
| `AZURE_MYSQL_PORT` | Port number | `3306` |
| `AZURE_MYSQL_SSL` | SSL option | `true` |
| `AZURE_MYSQL_CLIENTID` | Your client ID | `<identity-client-ID>` |
| `AZURE_MYSQL_CLIENTSECRET` | Your client secret | `<client-secret>` |
| `AZURE_MYSQL_TENANTID` | Your tenant ID | `<tenant-ID>` |

---

#### Sample code

Refer to the steps and code below to connect to Azure Database for MySQL using a service principal.


### [.NET](#tab/dotnet)
For .NET, there's not a plugin or library to support passwordless connections. You can get an access token for the managed identity or service principal using client library like [Azure.Identity](https://www.nuget.org/packages/Azure.Identity/). Then you can use the access token as the password to connect to the database. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

```csharp
using Azure.Core;
using Azure.Identity;
using MySqlConnector;

// Uncomment the following lines corresponding to the authentication type you want to use.
// For system-assigned managed identity.
// var credential = new DefaultAzureCredential();

// For user-assigned managed identity.
// var credential = new DefaultAzureCredential(
//     new DefaultAzureCredentialOptions
//     {
//         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_MYSQL_CLIENTID");
//     });

// For service principal.
// var tenantId = Environment.GetEnvironmentVariable("AZURE_MYSQL_TENANTID");
// var clientId = Environment.GetEnvironmentVariable("AZURE_MYSQL_CLIENTID");
// var clientSecret = Environment.GetEnvironmentVariable("AZURE_MYSQL_CLIENTSECRET");
// var credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

var tokenRequestContext = new TokenRequestContext(
    new[] { "https://ossrdbms-aad.database.windows.net/.default" });
AccessToken accessToken = await credential.GetTokenAsync(tokenRequestContext);
// Open a connection to the MySQL server using the access token.
string connectionString =
    $"{Environment.GetEnvironmentVariable("AZURE_MYSQL_CONNECTIONSTRING")};Password={accessToken.Token}";

using var connection = new MySqlConnection(connectionString);
Console.WriteLine("Opening connection using access token...");
await connection.OpenAsync();

// do something
```

### [Java](#tab/java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.33</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity-extensions</artifactId>
        <version>1.2.0</version>
    </dependency>
    ```
1. Get the connection string from the environment variable, and add the plugin name to connect to the database:

    ```java
    String url = System.getenv("AZURE_MYSQL_CONNECTIONSTRING");
    String pluginName = "com.azure.identity.extensions.jdbc.mysql.AzureMysqlAuthenticationPlugin";

    Properties properties = new Properties();
    properties.put("defaultAuthenticationPlugin", pluginName);
    properties.put("authenticationPlugins", pluginName);

    // Uncomment the following lines corresponding to the authentication type you want to use.

    // for user-assigned managed identity
    // String clientId = System.getenv('AZURE_MYSQL_CLIENTID')
    // properties.put("azure.clientId", clientId);

    // For service principal
    // String tenantId = System.getenv('AZURE_MYSQL_TENANTID')
    // String clientId = System.getenv('AZURE_MYSQL_CLIENTID')
    // String clientSecret = System.getenv('AZURE_MYSQL_CLIENTSECRET')
    // properties.put("azure.clientId", clientId);
    // properties.put("azure.clientSecret", clientSecret);
    // properties.put("azure.tenantId", tenantId);

    Connection connection = DriverManager.getConnection(url, properties);
    ```

For more information, see [Use Java and JDBC with Azure Database for MySQL - Flexible Server](https://learn.microsoft.com/azure/mysql/flexible-server/connect-java?tabs=passwordless).

### [Spring Boot](#tab/springBoot)

For a Spring application, if you create a connection with option `--client-type springboot`, Service Connector sets the properties `spring.datasource.azure.passwordless-enabled`, `spring.datasource.url`, and `spring.datasource.username` to Azure Spring Apps. 

Update your application following the tutorial [Connect an Azure Database for MySQL instance to your application in Azure Spring Apps](../spring-apps/basic-standard/how-to-bind-mysql.md#prepare-your-project). Remember to remove the `spring.datasource.password` configuration property if it was set before and add the correct dependencies to your Spring application.

For more tutorials, see [Use Spring Data JDBC with Azure Database for MySQL](https://learn.microsoft.com/azure/developer/java/spring-framework/configure-spring-data-jdbc-with-azure-mysql?tabs=passwordless%2Cservice-connector\&pivots=mysql-passwordless-flexible-server#store-data-from-azure-database-for-mysql)


### [Python](#tab/python)
1. Install dependencies
   ```bash
   pip install azure-identity
   # install Connector/Python https://dev.mysql.com/doc/connector-python/en/connector-python-installation.html
   pip install mysql-connector-python
   ```
1. Authenticate with access token get via `azure-identity` library and get connection information from the environment variable added by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.

    ```python
    from azure.identity import ManagedIdentityCredential, ClientSecretCredential
    import mysql.connector
    import os
    
    # Uncomment the following lines corresponding to the authentication type you want to use.
    # For system-assigned managed identity.
    # cred = ManagedIdentityCredential()    

    # For user-assigned managed identity.
    # managed_identity_client_id = os.getenv('AZURE_MYSQL_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)

    # For service principal
    # tenant_id = os.getenv('AZURE_MYSQL_TENANTID')
    # client_id = os.getenv('AZURE_MYSQL_CLIENTID')
    # client_secret = os.getenv('AZURE_MYSQL_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)
    
    # acquire token
    accessToken = cred.get_token('https://ossrdbms-aad.database.windows.net/.default')
    
    # open connect to Azure MySQL with the access token.
    host = os.getenv('AZURE_MYSQL_HOST')
    database = os.getenv('AZURE_MYSQL_NAME')
    user = os.getenv('AZURE_MYSQL_USER')
    password = accessToken.token
      
    cnx = mysql.connector.connect(user=user,
                                  password=password,
                                  host=host,
                                  database=database)
    cnx.close()
    
    ```

### [Django](#tab/django)
1. Install dependencies.
   ```bash
   pip install azure-identity
   ```
1. Get access token via `azure-identity` library with the environment variables added by Service Connector. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.


    ```python
    from azure.identity import ManagedIdentityCredential, ClientSecretCredential
    import os

    # Uncomment the following lines corresponding to the authentication type you want to use.
    # system-assigned managed identity
    # cred = ManagedIdentityCredential()
    
    # user-assigned managed identity
    # managed_identity_client_id = os.getenv('AZURE_MYSQL_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)
    
    # service principal
    # tenant_id = os.getenv('AZURE_MYSQL_TENANTID')
    # client_id = os.getenv('AZURE_MYSQL_CLIENTID')
    # client_secret = os.getenv('AZURE_MYSQL_CLIENTSECRET')
    # cred = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)
    
    # acquire token
    accessToken = cred.get_token('https://ossrdbms-aad.database.windows.net/.default')
    ```

1. In setting file, get Azure MySQL database information from environment variables added by Service Connector service. Use `accessToken` acquired in previous step to access the database.
    ```python
    # in your setting file, eg. settings.py
    host = os.getenv('AZURE_MYSQL_HOST')
    database = os.getenv('AZURE_MYSQL_NAME')
    user = os.getenv('AZURE_MYSQL_USER')
    password = accessToken.token # this is accessToken acquired from above step.
    
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': database,
            'USER': user,
            'PASSWORD': password,
            'HOST': host
        }
    }
    ```

### [Go](#tab/go)

1. Install dependencies.
   ```bash
   go get "github.com/go-sql-driver/mysql"
   go get "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
   go get "github.com/Azure/azure-sdk-for-go/sdk/azcore"
   ```
1. In code, get access token via `azidentity`, then connect to Azure MySQL with the token. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.


   ```go
   import (
     "context"
     
     "github.com/Azure/azure-sdk-for-go/sdk/azcore/policy"
     "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
     "github.com/go-sql-driver/mysql"
   )
   
   
   func main() {
       
     // Uncomment the following lines corresponding to the authentication type you want to use.
     // for system-assigned managed identity
     // cred, err := azidentity.NewDefaultAzureCredential(nil)

     // for user-assigned managed identity
     // clientid := os.Getenv("AZURE_MYSQL_CLIENTID")
     // azidentity.ManagedIdentityCredentialOptions.ID := clientid
     // options := &azidentity.ManagedIdentityCredentialOptions{ID: clientid}
     // cred, err := azidentity.NewManagedIdentityCredential(options)

     // for service principal
     // clientid := os.Getenv("AZURE_MYSQL_CLIENTID")
     // tenantid := os.Getenv("AZURE_MYSQL_TENANTID")
     // clientsecret := os.Getenv("AZURE_MYSQL_CLIENTSECRET")
     // cred, err := azidentity.NewClientSecretCredential(tenantid, clientid, clientsecret, &azidentity.ClientSecretCredentialOptions{})
    
     if err != nil {
     }
   
     ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
     token, err := cred.GetToken(ctx, policy.TokenRequestOptions{
       Scopes: []string("https://ossrdbms-aad.database.windows.net/.default"),
     })
     
     connectionString := os.Getenv("AZURE_MYSQL_CONNECTIONSTRING") + ";Password=" + token.Token
     db, err := sql.Open("mysql", connectionString)
   }
   ```

### [NodeJS](#tab/nodejs)
1. Install dependencies
   ```bash
   npm install --save @azure/identity
   npm install --save mysql2
   ```
1. Get access token using `@azure/identity` and Azure MySQL database information from environment variables added by Service Connector service. When using the code below, uncomment the part of the code snippet for the authentication type you want to use.


   ```javascript
   import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
   
   const mysql = require('mysql2');

   // Uncomment the following lines corresponding to the authentication type you want to use.
   // for system-assigned managed identity
   // const credential = new DefaultAzureCredential();

   // for user-assigned managed identity
   // const clientId = process.env.AZURE_MYSQL_CLIENTID;
   // const credential = new DefaultAzureCredential({
   //    managedIdentityClientId: clientId
   // });

   // for service principal
   // const tenantId = process.env.AZURE_MYSQL_TENANTID;
   // const clientId = process.env.AZURE_MYSQL_CLIENTID;
   // const clientSecret = process.env.AZURE_MYSQL_CLIENTSECRET;
   // const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
   
   // acquire token
   var accessToken = await credential.getToken('https://ossrdbms-aad.database.windows.net/.default');
   
   const connection = mysql.createConnection({
     host: process.env.AZURE_MYSQL_HOST,
     user: process.env.AZURE_MYSQL_USER,
     password: accessToken.token,
     database: process.env.AZURE_MYSQL_DATABASE,
     port: process.env.AZURE_MYSQL_PORT,
     ssl: process.env.AZURE_MYSQL_SSL
   });
   
   connection.connect((err) => {
     if (err) {
       console.error('Error connecting to MySQL database: ' + err.stack);
       return;
     }
     console.log('Connected to MySQL database');
   });
   ```

### [PHP](#tab/php)
For other languages, use the connection string and username that Service Connector sets to the environment variables to connect the database. For environment variable details, see [Integrate Azure Database for MySQL with Service Connector](how-to-integrate-mysql.md).

### [Ruby](#tab/ruby)
For other languages, use the connection string and username that Service Connector sets to the environment variables to connect the database. For environment variable details, see [Integrate Azure Database for MySQL with Service Connector](how-to-integrate-mysql.md).

### [Other](#tab/none)
For other languages, use the connection properties that Service Connector sets to the environment variables to connect the database. For environment variable details, see [Integrate Azure Database for MySQL with Service Connector](how-to-integrate-mysql.md).

---

For more code samples, see [Connect to Azure databases from App Service without secrets using a managed identity](https://learn.microsoft.com/azure/app-service/tutorial-connect-msi-azure-database?tabs=mysql#3-modify-your-code).





## Next steps

Follow the documentations to learn more about Service Connector.

> 
> [Learn about Service Connector concepts](concept-service-connector-internals.md)
