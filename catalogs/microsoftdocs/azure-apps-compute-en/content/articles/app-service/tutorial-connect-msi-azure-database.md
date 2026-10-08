---
title: 'Tutorial: Access Azure databases with managed identity'
description: Secure database connectivity (Azure SQL Database, Database for MySQL, and Database for PostgreSQL) with managed identity from .NET, Node.js, Python, and Java apps.
keywords: azure app service, web app, security, msi, managed service identity, managed identity, .net, dotnet, asp.net, c#, csharp, node.js, node, python, java, visual studio, visual studio code, visual studio for mac, azure cli, azure powershell, defaultazurecredential
author: cephalin
ms.author: cephalin
ms.devlang: csharp
# ms.devlang: csharp,java,javascript,python
ms.topic: tutorial
ms.date: 03/18/2026
ms.service: azure-app-service
ms.custom:
  - mvc
  - devx-track-azurecli
  - devx-track-dotnet
  - devx-track-extended-java
  - devx-track-python
  - AppServiceConnectivity
  - service-connector
  - sfi-ropc-nochange
---
# Tutorial: Connect to Azure databases from App Service without secrets using a managed identity

[App Service](overview.md) provides a highly scalable, self-patching web hosting service in Azure. It also provides a [managed identity](overview-managed-identity.md) for your app, which is a turn-key solution for securing access to Azure databases, including:

- [Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/)
- [Azure Database for MySQL](https://learn.microsoft.com/azure/mysql/)
- [Azure Database for PostgreSQL](https://learn.microsoft.com/azure/postgresql/)

> **Note:**
> This tutorial doesn't include guidance for [Azure Cosmos DB](https://learn.microsoft.com/azure/cosmos-db/), which supports Microsoft Entra authentication differently. For more information, see the Azure Cosmos DB documentation, such as [Use system-assigned managed identities to access Azure Cosmos DB data](https://learn.microsoft.com/azure/cosmos-db/how-to-connect-role-based-access-control).

Managed identities in App Service make your app more secure by eliminating secrets from your app, such as credentials in the connection strings. This tutorial shows you how to connect to the above-mentioned databases from App Service using managed identities.

<!-- ![Architecture diagram for tutorial scenario.](./media/tutorial-connect-msi-sql-database/architecture.png) -->

What you'll learn:

> 
>
> - Configure a Microsoft Entra user as an administrator for your Azure database.
> - Connect to your database as the Microsoft Entra user.
> - Configure a system-assigned or user-assigned managed identity for an App Service app.
> - Grant database access to the managed identity.
> - Connect to the Azure database from your code (.NET Framework 4.8, .NET 6, Node.js, Python, Java) using a managed identity.
> - Connect to the Azure database from your development environment using the Microsoft Entra user.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/tutorial-connect-msi-azure-database.md)

## Prerequisites

- Create an app in App Service based on .NET, Node.js, Python, or Java.
- Create a database server with Azure SQL Database, Azure Database for MySQL, or Azure Database for PostgreSQL.
- You should be familiar with the standard connectivity pattern (with username and password) and be able to connect successfully from your App Service app to your database of choice.

Prepare your environment for the Azure CLI.

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/tutorial-connect-msi-azure-database.md)

## 1. Install the Service Connector passwordless extension


Install the latest Service Connector passwordless extension for the Azure CLI:

```azurecli-interactive
az extension add --name serviceconnector-passwordless --upgrade
```

> **Note:**
> Check that the `serviceconnector-passwordless` extension version is 2.0.2 or later by running `az version`. If needed, upgrade the Azure CLI first, and then upgrade the extension.


## 2. Create a passwordless connection

Next, create a passwordless connection with Service Connector.

> **Tip:**
> The Azure portal can help you compose the following commands. In the Azure portal, go to your [Azure App Service](../service-connector/quickstart-portal-app-service-connection.md) resource, select **Service Connector** from the left menu, and select **Create**. Fill out the form with all required parameters. Azure automatically generates the connection creation command, which you can copy to use in the CLI or execute in Azure Cloud Shell.

# [Azure SQL Database](#tab/sqldatabase-sc)

The following Azure CLI command uses a `--client-type` parameter.

1. Optionally run the `az webapp connection create sql -h` to get the supported client types.

1. Choose a client type and run the corresponding command. Replace the following placeholders with your own information.

    # [User-assigned managed identity](#tab/userassigned-sc)

    ```azurecli-interactive
    az webapp connection create sql \
        --resource-group <group-name> \
        --name <server-name> \
        --target-resource-group <sql-group-name> \
        --server <sql-name> \
        --database <database-name> \
        --user-identity client-id=<client-id> subs-id=<subscription-id> \
        --client-type <client-type>
    ```

    # [System-assigned managed identity](#tab/systemassigned-sc)

    ```azurecli-interactive
    az webapp connection create sql \
        --resource-group <group-name> \
        --name <server-name> \
        --target-resource-group <group-name> \
        --server <sql-name> \
        --database <database-name> \
        --system-identity \
        --client-type <client-type>
    ```

    ---

# [Azure Database for MySQL](#tab/mysql-sc)

> **Note:**
> For Azure Database for MySQL - Flexible Server, you must first [manually set up Microsoft Entra authentication](https://learn.microsoft.com/azure/mysql/flexible-server/security-how-to-entra), which requires a separate user-assigned managed identity and specific Microsoft Graph permissions. This step can't be automated.

1. Manually [set up Microsoft Entra authentication for Azure Database for MySQL - Flexible Server](https://learn.microsoft.com/azure/mysql/flexible-server/security-how-to-entra).

1. Optionally run the command `az webapp connection create mysql-flexible -h` to get the supported client types.

1. Choose a client type and run the corresponding command. The following Azure CLI command uses a `--client-type` parameter.

    # [User-assigned managed identity](#tab/userassigned-sc)

    ```azurecli-interactive
    az webapp connection create mysql-flexible \
        --resource-group <group-name> \
        --name <server-name> \
        --target-resource-group <group-name> \
        --server <mysql-name> \
        --database <database-name> \
        --user-identity client-id=XX subs-id=XX mysql-identity-id=$IDENTITY_RESOURCE_ID \
        --client-type <client-type>
    ```

    # [System-assigned managed identity](#tab/systemassigned-sc)

    ```azurecli-interactive
    az webapp connection create mysql-flexible \
    --resource-group <group-name> \
    --name <server-name> \
    --target-resource-group <group-name> \
    --server <mysql-name> \
    --database <database-name> \
    --system-identity mysql-identity-id=$IDENTITY_RESOURCE_ID \
    --client-type <client-type>
    ```

    ---

# [Azure Database for PostgreSQL](#tab/postgresql-sc)

The following Azure CLI command uses a `--client-type` parameter.

1. Optionally run the command `az webapp connection create postgres-flexible -h` to get a list of all supported client types.

1. Choose a client type and run the corresponding command.

    # [User-assigned managed identity](#tab/userassigned-sc)

    ```azurecli-interactive
    az webapp connection create postgres-flexible \
        --resource-group <group-name> \
        --name <server-name> \
        --target-resource-group <group-name> \
        --server <postgresql-name> \
        --database <database-name> \
        --user-identity client-id=XX subs-id=XX \
        --client-type java
    ```

    # [System-assigned managed identity](#tab/systemassigned-sc)

    ```azurecli-interactive
    az webapp connection create postgres-flexible \
        --resource-group <group-name> \
        --name <server-name> \
        --target-resource-group <group-name> \
        --server <postgresql-name> \
        --database <database-name> \
        --system-identity \
        --client-type <client-type>
    ```

    ---

1. Grant permission to precreated tables


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


---

This Service Connector command completes the following tasks in the background:

- Enable system-assigned managed identity, or assign a user identity for the app `<server-name>` hosted by Azure App Service.
- Set the Microsoft Entra admin to the current signed-in user.
- Add a database user for the system-assigned managed identity or user-assigned managed identity. Grant all privileges of the database `<database-name>` to this user. The username can be found in the connection string in preceding command output.
- Set configurations named `AZURE_MYSQL_CONNECTIONSTRING`, `AZURE_POSTGRESQL_CONNECTIONSTRING`, or `AZURE_SQL_CONNECTIONSTRING` to the Azure resource based on the database type.
- For App Service, the configurations are set in the **App Settings** blade.

If you encounter any problem when creating a connection, refer to [Troubleshooting](../service-connector/tutorial-passwordless.md#troubleshooting) for help.

## 3. Modify your code

# [Azure SQL Database](#tab/sqldatabase-sc)



### [.NET](#tab/dotnet)

1. Install dependencies.
    ```bash
    dotnet add package Microsoft.Data.SqlClient
    ```
    
1. Get the Azure SQL Database connection string from the environment variable added by Service Connector.

    ```csharp
    using Microsoft.Data.SqlClient;

    // AZURE_SQL_CONNECTIONSTRING should be one of the following:
    // For system-assigned managed identity:"Server=tcp:<server-name>.database.windows.net;Database=<database-name>;Authentication=Active Directory Default;TrustServerCertificate=True"
    // For user-assigned managed identity: "Server=tcp:<server-name>.database.windows.net;Database=<database-name>;Authentication=Active Directory Default;User Id=<client-id-of-user-assigned-identity>;TrustServerCertificate=True"
    
    string connectionString = 
        Environment.GetEnvironmentVariable("AZURE_SQL_CONNECTIONSTRING")!;
    
    using var connection = new SqlConnection(connectionString);
    connection.Open();
    ```
    For more information, see [Using Active Directory Managed Identity authentication](https://learn.microsoft.com/sql/connect/ado-net/sql/azure-active-directory-authentication#using-active-directory-managed-identity-authentication).

### [Java](#tab/java)
1. Add the following dependencies in your *pom.xml* file:

    ```java
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.4.6</version>
    </dependency>
    <dependency>
        <groupId>com.microsoft.sqlserver</groupId>
        <artifactId>mssql-jdbc</artifactId>
        <version>10.2.0.jre11</version>
    </dependency>
    ```

1. Get the Azure SQL Database connection string from the environment variable added by Service Connector.

    ```java
    import java.sql.Connection;
    import java.sql.ResultSet;
    import java.sql.Statement;
    
    import com.microsoft.sqlserver.jdbc.SQLServerDataSource;
    
    public class Main {
        public static void main(String[] args) {
            // AZURE_SQL_CONNECTIONSTRING should be one of the following:
            // For system-assigned managed identity: "jdbc:sqlserver://{SQLName}.database.windows.net:1433;databaseName={SQLDbName};authentication=ActiveDirectoryMSI;"
            // For user-assigned managed identity: "jdbc:sqlserver://{SQLName}.database.windows.net:1433;databaseName={SQLDbName};msiClientId={UserAssignedMiClientId};authentication=ActiveDirectoryMSI;"
            String connectionString = System.getenv("AZURE_SQL_CONNECTIONSTRING");
            SQLServerDataSource ds = new SQLServerDataSource();
            ds.setURL(connectionString);
            try (Connection connection = ds.getConnection()) {
                System.out.println("Connected successfully.");
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
    ```
For more information, see [Connect using Microsoft Entra authentication](https://learn.microsoft.com/sql/connect/jdbc/connecting-using-azure-active-directory-authentication).

### [Python](#tab/python)

1. Install dependencies.
    ```bash
    python -m pip install mssql-python python-dotenv
    ```

1. Get the Azure SQL Database connection configurations from the environment variable added by Service Connector. Uncomment the part of the code snippet for the authentication type you want to use.
    ```python
    import os
    from mssql_python import connect
    
    server = os.getenv('AZURE_SQL_SERVER')
    port = os.getenv('AZURE_SQL_PORT')
    database = os.getenv('AZURE_SQL_DATABASE')
    
    # Uncomment the following lines according to the authentication type.
    # For system-assigned managed identity.
    # connection_string = f'Server={server},{port};Database={database};Authentication=ActiveDirectoryMSI;Encrypt=yes;'
    
    # For user-assigned managed identity.
    # client_id = os.getenv('AZURE_SQL_USER')
    # connection_string = f'Server={server},{port};Database={database};UID={client_id};Authentication=ActiveDirectoryMSI;Encrypt=yes;'
    
    conn = connect(connection_string)
    ```
    For an alternative method, you can also connect to Azure SQL Database using an access token, refer to [Migrate a Python application to use passwordless connections with Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/azure-sql-passwordless-migration-python).

### [NodeJS](#tab/nodejs)

1. Install dependencies.
    ```bash
    npm install mssql
    ```
1. Get the Azure SQL Database connection configurations from the environment variables added by Service Connector. Uncomment the part of the code snippet for the authentication type you want to use.
    ```javascript
    import sql from 'mssql';
    
    const server = process.env.AZURE_SQL_SERVER;
    const database = process.env.AZURE_SQL_DATABASE;
    const port = parseInt(process.env.AZURE_SQL_PORT);
    const authenticationType = process.env.AZURE_SQL_AUTHENTICATIONTYPE;
    
    // Uncomment the following lines according to the authentication type.
    // For system-assigned managed identity.
    // const config = {
    //     server,
    //     port,
    //     database,
    //     authentication: {
    //         authenticationType
    //     },
    //     options: {
    //        encrypt: true
    //     }
    // };  

    // For user-assigned managed identity.
    // const clientId = process.env.AZURE_SQL_CLIENTID;
    // const config = {
    //     server,
    //     port,
    //     database,
    //     authentication: {
    //         type: authenticationType
    //     },
    //     options: {
    //         encrypt: true,
    //         clientId: clientId
    //     }
    // };  

    this.poolconnection = await sql.connect(config);
    ```


---

For more information, see [Homepage for client programming to Microsoft SQL Server](https://learn.microsoft.com/sql/connect/homepage-sql-connection-programming).
For more code samples, see [Create a passwordless connection to a database service via Service Connector](https://learn.microsoft.com/azure/service-connector/tutorial-passwordless?tabs=user%2Cappservice\&pivots=sql#connect-to-a-database-with-microsoft-entra-authentication).

# [Azure Database for MySQL](#tab/mysql-sc)

Connectivity to the Azure Database for MySQL in your code follows the `DefaultAzureCredential` pattern for all language stacks. `DefaultAzureCredential` is flexible enough to adapt to both the development environment and the Azure environment. When running locally, it can retrieve the logged-in Azure user from the environment of your choice (Visual Studio, Visual Studio Code, Azure CLI, or Azure PowerShell). When running in Azure, it retrieves the managed identity. So it's possible to have connectivity to database both at development time and in production. The pattern is as follows:

1. Instantiate a `DefaultAzureCredential` from the Azure Identity client library. If you're using a user-assigned identity, specify the client ID of the identity.
2. Get an access token for Azure Database for MySQL: `https://ossrdbms-aad.database.windows.net/.default`.
3. Add the token to your connection string.
4. Open the connection.


# [.NET](#tab/dotnet-mysql-mi)
For .NET, get an access token for the managed identity using a client library such as [Azure.Identity](https://www.nuget.org/packages/Azure.Identity/). Then use the access token as a password to connect to the database. When using the code below, make sure you uncomment the part of the code snippet that corresponds to the authentication type you want to use.

```csharp
using Azure.Core;
using Azure.Identity;
using MySqlConnector;

// Uncomment the following lines according to the authentication type.
// For system-assigned managed identity.
// var credential = new DefaultAzureCredential();

// For user-assigned managed identity.
// var credential = new DefaultAzureCredential(
//     new DefaultAzureCredentialOptions
//     {
//         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_MYSQL_CLIENTID");
//     });

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

# [Java](#tab/java-mysql-mi)

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
    Connection connection = DriverManager.getConnection(url + "&defaultAuthenticationPlugin=" +
        pluginName + "&authenticationPlugins=" + pluginName);
    ```

For more information, see [Use Java and JDBC with Azure Database for MySQL - Flexible Server](https://learn.microsoft.com/azure/mysql/flexible-server/connect-java?tabs=passwordless).

# [Python](#tab/python-mysql-mi)

1. Install dependencies.

   ```bash
   pip install azure-identity
   # install Connector/Python https://dev.mysql.com/doc/connector-python/en/connector-python-installation.html
   pip install mysql-connector-python
   ```

1. Authenticate with an access token from the `azure-identity` library. Get the connection information from the environment variable added by Service Connector. When using the code below, make sure you uncomment the part of the code snippet that corresponds to the authentication type you want to use.
    
    ```python
    from azure.identity import ManagedIdentityCredential, ClientSecretCredential
    import mysql.connector
    import os
    
    # Uncomment the following lines according to the authentication type.
    # For system-assigned managed identity.
    # cred = ManagedIdentityCredential()    

    # For user-assigned managed identity.
    # managed_identity_client_id = os.getenv('AZURE_MYSQL_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)

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

# [NodeJS](#tab/nodejs-mysql-mi)

1. Install dependencies.

   ```bash
   npm install --save @azure/identity
   npm install --save mysql2
   ```

1. Get an access token using `@azure/identity` and the Azure MySQL database information from the environment variables added by Service Connector.  When using the code below, make sure you uncomment the part of the code snippet that corresponds to the authentication type you want to use.

   ```javascript
   import { DefaultAzureCredential,ClientSecretCredential } from "@azure/identity";
   
   const mysql = require('mysql2');

   // Uncomment the following lines according to the authentication type.
   // for system-assigned managed identity
   // const credential = new DefaultAzureCredential();

   // for user-assigned managed identity
   // const clientId = process.env.AZURE_MYSQL_CLIENTID;
   // const credential = new DefaultAzureCredential({
   //    managedIdentityClientId: clientId
   // });

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

---

For more code samples, see [Create a passwordless connection to a database service via Service Connector](https://learn.microsoft.com/azure/service-connector/tutorial-passwordless?tabs=user%2Cappservice\&pivots=mysql#connect-to-a-database-with-microsoft-entra-authentication).


# [Azure Database for PostgreSQL](#tab/postgresql-sc)

Connectivity to the Azure Database for PostgreSQL in your code follows the `DefaultAzureCredential` pattern for all language stacks. `DefaultAzureCredential` is flexible enough to adapt to both the development environment and the Azure environment. When running locally, it can retrieve the logged-in Azure user from the environment of your choice (Visual Studio, Visual Studio Code, Azure CLI, or Azure PowerShell). When running in Azure, it retrieves the managed identity. So it's possible to have connectivity to database both at development time and in production. The pattern is as follows:

1. Instantiate a `DefaultAzureCredential` from the Azure Identity client library. If you're using a user-assigned identity, specify the client ID of the identity.
2. Get an access token for Azure Database for PostgreSQL: `https://ossrdbms-aad.database.windows.net/.default`.
3. Add the token to your connection string.
4. Open the connection.


# [.NET](#tab/dotnet-postgres-mi)
For .NET, get an access token for the managed identity using a client library such as [Azure.Identity](https://www.nuget.org/packages/Azure.Identity/). Then use the access token as a password to connect to the database. When using the code below, make sure you uncomment the part of the code snippet that corresponds to the authentication type you want to use.

```csharp
using Azure.Identity;
using Azure.Core;
using Npgsql;

// Uncomment the following lines according to the authentication type.
// For system-assigned identity.
// var sqlServerTokenProvider = new DefaultAzureCredential();

// For user-assigned identity.
// var sqlServerTokenProvider = new DefaultAzureCredential(
//     new DefaultAzureCredentialOptions
//     {
//         ManagedIdentityClientId = Environment.GetEnvironmentVariable("AZURE_POSTGRESQL_CLIENTID");
//     }
// );

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

# [Java](#tab/java-postgres-mi)

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

1. Get the connection string from the environment variables and add the plugin name to connect to the database:

    ```java
    import java.sql.*;
    
    String url = System.getenv("AZURE_POSTGRESQL_CONNECTIONSTRING");
    String pluginName = "com.Azure.identity.extensions.jdbc.postgresql.AzurePostgresqlAuthenticationPlugin";  
    Connection connection = DriverManager.getConnection(url + "&authenticationPluginClassName=" + pluginName);
    ```

For more information, see the following resources:

* [Tutorial: Connect to a PostgreSQL Database from Java Tomcat App Service without secrets using a managed identity](tutorial-java-tomcat-connect-managed-identity-postgresql-database.md)
* [Quickstart: Use Java and JDBC with Azure Database for PostgreSQL Flexible Server](https://learn.microsoft.com/azure/postgresql/flexible-server/connect-java?tabs=passwordless#connect-to-the-database)


# [Python](#tab/python-postgres-mi)

1. Install dependencies.

    ```bash
    pip install azure-identity
    pip install psycopg2-binary
    ```

1. Authenticate with an access token from the `azure-identity` library and use the token as password. Get the connection information from the environment variables added by Service Connector. When using the code below, make sure you uncomment the part of the code snippet that corresponds to the authentication type you want to use.

    ```python
    from azure.identity import DefaultAzureCredential
    import psycopg2
     
    # Uncomment the following lines according to the authentication type.
    # For system-assigned identity.
    # cred = DefaultAzureCredential()

    # For user-assigned identity.
    # managed_identity_client_id = os.getenv('AZURE_POSTGRESQL_CLIENTID')
    # cred = ManagedIdentityCredential(client_id=managed_identity_client_id)   
    
    # Acquire the access token
    accessToken = cred.get_token('https://ossrdbms-aad.database.windows.net/.default')
    
    # Combine the token with the connection string from the environment variables added by Service Connector to establish the connection.
    conn_string = os.getenv('AZURE_POSTGRESQL_CONNECTIONSTRING')
    conn = psycopg2.connect(conn_string + ' password=' + accessToken.token) 
    ```

For more information, see the following resources:

* [Create and deploy a Flask Python web app to Azure with system-assigned managed identity](https://learn.microsoft.com/azure/developer/python/tutorial-python-managed-identity-cli)
* [Create and deploy a Django web app to Azure with a user-assigned managed identity](https://learn.microsoft.com/azure/developer/python/tutorial-python-managed-identity-user-assigned-cli)

# [NodeJS](#tab/nodejs-postgres-mi)

1. Install dependencies.

    ```bash
    npm install --save @azure/identity
    npm install --save pg
    ```

1. In code, get the access token via `@azure/identity` and PostgreSQL connection information from environment variables added by Service Connector service. Combine them to establish the connection. When using the code below, make sure you uncomment the part of the code snippet that corresponds to the authentication type you want to use.

    ```javascript
    import { DefaultAzureCredential, ClientSecretCredential } from "@azure/identity";
    const { Client } = require('pg');

    // Uncomment the following lines according to the authentication type.  
    // For system-assigned identity.
    // const credential = new DefaultAzureCredential();

    // For user-assigned identity.
    // const clientId = process.env.AZURE_POSTGRESQL_CLIENTID;
    // const credential = new DefaultAzureCredential({
    //     managedIdentityClientId: clientId
    // });

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

---

For more code samples, see [Create a passwordless connection to a database service via Service Connector](https://learn.microsoft.com/azure/service-connector/tutorial-passwordless?tabs=user%2Cappservice\&pivots=postgresql#connect-to-a-database-with-microsoft-entra-authentication).


---

## 4. Set up your dev environment

 This sample code uses `DefaultAzureCredential` to get a usable token for your Azure database from Microsoft Entra ID and then adds it to the database connection. While you can customize `DefaultAzureCredential`, it's already versatile by default. It gets a token from the signed-in Microsoft Entra user or from a managed identity, depending on whether you run it locally in your development environment or in App Service.

Without any further changes, your code is ready to be run in Azure. To debug your code locally, however, your develop environment needs a signed-in Microsoft Entra user. In this step, you configure your environment of choice by signing in with your Microsoft Entra user.

# [Visual Studio Windows](#tab/windowsclient)

1. Visual Studio for Windows is integrated with Microsoft Entra authentication. To enable development and debugging in Visual Studio, add your Microsoft Entra user in Visual Studio by selecting **File** > **Account Settings** from the menu, and select **Sign in** or **Add**.

1. To set the Microsoft Entra user for Azure service authentication, select **Tools** > **Options** from the menu, then select **Azure Service Authentication** > **Account Selection**. Select the Microsoft Entra user you added and select **OK**.

# [Visual Studio for macOS](#tab/macosclient)

1. Visual Studio for Mac *isn't* integrated with Microsoft Entra authentication. However, the Azure Identity client library that you'll use later can also retrieve tokens from Azure CLI. To enable development and debugging in Visual Studio, [install Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) on your local machine.

1. Sign in to Azure CLI with the following command using your Microsoft Entra user:

    ```azurecli
    az login --allow-no-subscriptions
    ```

# [Visual Studio Code](#tab/vscode)

1. Visual Studio Code is integrated with Microsoft Entra authentication through the Azure extension. Install the [Azure Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack") extension in Visual Studio Code.

1. In Visual Studio Code, in the [Activity Bar](https://code.visualstudio.com/docs/getstarted/userinterface), select the **Azure** logo.

1. In the **App Service** explorer, select **Sign in to Azure...** and follow the instructions.

# [Azure CLI](#tab/cli)

1. The Azure Identity client library that you'll use later can use tokens from Azure CLI. To enable command-line based development, [install Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) on your local machine.

1. Sign in to Azure with the following command using your Microsoft Entra user:

    ```azurecli
    az login --allow-no-subscriptions
    ```

# [Azure PowerShell](#tab/ps)

1. The Azure Identity client library that you'll use later can use tokens from Azure PowerShell. To enable command-line based development, [install Azure PowerShell](https://learn.microsoft.com/powershell/azure/install-azure-powershell) on your local machine.

1. Sign in to Azure CLI with the following cmdlet using your Microsoft Entra user:

    ```powershell-interactive
    Connect-AzAccount
    ```

---

For more information about setting up your dev environment for Microsoft Entra authentication, see [Azure Identity client library for .NET](https://learn.microsoft.com/dotnet/api/overview/azure/Identity-readme).

You're now ready to develop and debug your app with the SQL Database as the back end, using Microsoft Entra authentication.

## 5. Test and publish

1. Run your code in your dev environment. Your code uses the signed-in Microsoft Entra user in your environment to connect to the back-end database. The user can access the database because it's configured as a Microsoft Entra administrator for the database.

1. Publish your code to Azure using the preferred publishing method. In App Service, your code uses the app's managed identity to connect to the back-end database.

## Frequently asked questions

- [Does managed identity support SQL Server?](#does-managed-identity-support-sql-server)
- [I get the error `Login failed for user '<token-identified principal>'.`](#i-get-the-error-login-failed-for-user-token-identified-principal)
- [I made changes to App Service authentication or the associated app registration. Why do I still get the old token?](#i-made-changes-to-app-service-authentication-or-the-associated-app-registration-why-do-i-still-get-the-old-token)
- [How do I add the managed identity to a Microsoft Entra group?](#how-do-i-add-the-managed-identity-to-an-azure-ad-group)
- [I get the error `SSL connection is required. Please specify SSL options and retry`.](#i-get-the-error-ssl-connection-is-required-please-specify-ssl-options-and-retry)
- [I created my app with the Web App + Database template, and now I can't configure a managed identity connection with the Service Connector commands.](#i-created-my-app-with-the-web-app--database-template-and-now-i-cant-configure-a-managed-identity-connection-with-the-service-connector-commands)

### Does managed identity support SQL Server?

Yes. For more information, see:

- [Microsoft Entra authentication for SQL Server](https://learn.microsoft.com/sql/relational-databases/security/authentication-access/azure-ad-authentication-sql-server-overview)
- [Enable Microsoft Entra authentication for SQL Server on Azure VMs](https://learn.microsoft.com/azure/azure-sql/virtual-machines/windows/configure-azure-ad-authentication-for-sql-vm)

### I get the error `Login failed for user '<token-identified principal>'.`

The managed identity you're attempting to request a token for isn't authorized to access the Azure database.

### I made changes to App Service authentication or the associated app registration. Why do I still get the old token?

The back-end services of managed identities also [maintain a token cache](overview-managed-identity.md#configure-target-resource) that updates the token for a target resource only when it expires. If you modify the configuration *after* trying to get a token with your app, you don't actually get a new token with the updated permissions until the cached token expires. The best way to work around this is to test your changes with a new InPrivate (Edge)/private (Safari)/Incognito (Chrome) window. That way, you're sure to start from a new authenticated session.

<a name='how-do-i-add-the-managed-identity-to-an-azure-ad-group'></a>

### How do I add the managed identity to a Microsoft Entra group?

If you want, you can add the identity to a [Microsoft Entra group](https://learn.microsoft.com/entra/fundamentals/concept-learn-about-groups), then grant access to the Microsoft Entra group instead of the identity. For example, the following commands add the managed identity from the previous step to a new group called *myAzureSQLDBAccessGroup*:

```azurecli-interactive
groupid=$(az ad group create --display-name myAzureSQLDBAccessGroup --mail-nickname myAzureSQLDBAccessGroup --query objectId --output tsv)
msiobjectid=$(az webapp identity show --resource-group <group-name> --name <app-name> --query principalId --output tsv)
az ad group member add --group $groupid --member-id $msiobjectid
az ad group member list -g $groupid
```

To grant database permissions for a Microsoft Entra group, see documentation for the respective database type.

### I get the error `SSL connection is required. Please specify SSL options and retry`.

Connecting to the Azure database requires more settings and is beyond the scope of this tutorial. For more information, see one of the following links:

- [Configure TLS connectivity in Azure Database for PostgreSQL - Single Server](https://learn.microsoft.com/azure/postgresql/security/security-tls-how-to-connect)
- [Configure SSL connectivity in your application to securely connect to Azure Database for MySQL](https://learn.microsoft.com/azure/mysql/flexible-server/security-tls-how-to-connect)

### I created my app with the Web App + Database template, and now I can't configure a managed identity connection with the Service Connector commands.

Service Connector needs network access to the database in order to grant access for the app identity. When you create a secure-by-default app and database architecture in the Azure portal with the Web App + Database template, the architecture locks down network access to the database and only allows connections from within the virtual network. It's also true for Azure Cloud Shell. However, you can [deploy Cloud Shell in the virtual network](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cloud-shell/vnet/deployment.md), then run the Service Connector command in that Cloud Shell.

## Next steps

What you learned:

> 
>
> - Configure a Microsoft Entra user as an administrator for your Azure database.
> - Connect to your database as the Microsoft Entra user.
> - Configure a system-assigned or user-assigned managed identity for an App Service app.
> - Grant database access to the managed identity.
> - Connect to the Azure database from your code (.NET Framework 4.8, .NET 6, Node.js, Python, Java) using a managed identity.
> - Connect to the Azure database from your development environment using the Microsoft Entra user.
>
> 
> [How to use managed identities for App Service and Azure Functions](overview-managed-identity.md)
>
> 
> [Tutorial: Connect to SQL Database from .NET App Service without secrets using a managed identity](tutorial-connect-msi-sql-database.md)
>
> 
> [Tutorial: Connect to Azure services that don't support managed identities (using Key Vault)](tutorial-connect-msi-key-vault.md)
>
> 
> [Tutorial: Isolate back-end communication with Virtual Network integration](tutorial-networking-isolate-vnet.md)
