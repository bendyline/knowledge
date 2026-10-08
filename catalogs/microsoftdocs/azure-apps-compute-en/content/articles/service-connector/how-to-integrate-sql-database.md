---
title: Integrate Azure SQL Database with Service Connector
description: Learn how to integrate Azure SQL Database into your application with Service Connector by using the supported authentication methods and clients.
author: maud-lv
ms.author: malev
ms.service: service-connector
ms.topic: how-to
ms.custom: engagement-fy23
ms.date: 02/02/2026
---

# Integrate Azure SQL Database with Service Connector

In this article, we cover the supported authentication methods and clients that you can use to connect your apps to Azure SQL Database using Service Connector. For each supported method, we provide sample code and describe the default environment variable names, values, and configuration obtained when creating a service connection.

## Supported compute services

Service Connector can be used to connect the following compute services to Azure SQL Database:

- Azure App Service
- Azure Functions
- Azure Kubernetes Service (AKS)
- Azure Spring Apps

## Supported authentication types and clients

The following table shows which combinations of authentication methods and clients are supported for connecting your compute service to Azure SQL Database using Service Connector. A *Yes* indicates that the combination is supported, while a *No* indicates that it isn't supported.

| Client type | System-assigned managed identity | User-assigned managed identity | Secret/connection string | Service principal |
| --- | :---: | :---: | :---: | :---: |
| .NET | Yes | Yes | Yes | Yes |
| Go | No | No | Yes | No |
| Java | Yes | Yes | Yes | Yes |
| Java - Spring Boot | Yes | Yes | Yes | Yes |
| Node.js | Yes | Yes | Yes | Yes |
| PHP | No | No | Yes | No |
| Python | Yes | Yes | Yes | Yes |
| Python - Django | No | No | Yes | No |
| Ruby | No | No | Yes | No |
| None | Yes | Yes | Yes | Yes |

> **Note:**
> System-assigned managed identity, user-assigned managed identity and service principal authentication is only supported on Azure CLI.

## Default environment variable names or application properties and sample code

Use the following connection details to connect compute services to Azure SQL Database. For each example, replace the placeholder texts `<sql-server>`, `<sql-database>`, `<sql-username>`, and `<sql-password>` with your own server name, database name, user ID, and password. For more information about naming conventions, check the [Service Connector internals](concept-service-connector-internals.md#configuration-naming-convention) article.

### System-assigned managed identity

#### [.NET](#tab/sql-me-id-dotnet)

> 
> | Default environment variable name | Description | Sample value |
> | --- | --- | --- |
> | `AZURE_SQL_CONNECTIONSTRING` | Azure SQL Database connection string | `Data Source=<sql-server>.database.windows.net,1433;Initial Catalog=<sql-database>;Authentication=ActiveDirectoryManagedIdentity` |

#### [Java](#tab/sql-me-id-java)

> 
> | Default environment variable name | Description | Sample value |
> | --- | --- | --- |
> | `AZURE_SQL_CONNECTIONSTRING` | Azure SQL Database connection string | `jdbc:sqlserver://<sql-server>.database.windows.net:1433;databaseName=<sql-database>;authentication=ActiveDirectoryMSI;` |

#### [Spring Boot](#tab/sql-me-id-springBoot)

> 
> | Default environment variable name | Description | Sample value |
> | --- | --- | --- |
> | `spring.datasource.url` | Azure SQL Database datasource URL | `jdbc:sqlserver://<sql-server>.database.windows.net:1433;databaseName=<sql-db>;authentication=ActiveDirectoryMSI;` |

#### [Python](#tab/sql-me-id-python)

> 
> | Default environment variable name | Description | Sample value |
> | --- | --- | --- |
> | `AZURE_SQL_SERVER` | Azure SQL Database server | `<sql-server>.database.windows.net` |
> | `AZURE_SQL_PORT` | Azure SQL Database port | `1433` |
> | `AZURE_SQL_DATABASE` | Azure SQL Database database | `<sql-database>` |
> | `AZURE_SQL_AUTHENTICATION` | Azure SQL authentication | `ActiveDirectoryMsi` |

#### [NodeJS](#tab/sql-me-id-nodejs)

> 
> | Default environment variable name | Description | Sample value |
> | --- | --- | --- |
> | `AZURE_SQL_SERVER` | Azure SQL Database server | `<sql-server>.database.windows.net` |
> | `AZURE_SQL_PORT` | Azure SQL Database port | `1433` |
> | `AZURE_SQL_DATABASE` | Azure SQL Database database | `<sql-database>` |
> | `AZURE_SQL_AUTHENTICATIONTYPE` | Azure SQL Database authentication type | `azure-active-directory-default` |

#### [Other](#tab/sql-me-id-none)

> 
> | Default environment variable name | Description | Sample value |
> | --- | --- | --- |
> | `AZURE_SQL_HOST` | Azure SQL Database server | `<sql-server>.database.windows.net` |
> | `AZURE_SQL_PORT` | Azure SQL Database port | `1433` |
> | `AZURE_SQL_DATABASE` | Azure SQL Database database | `<sql-database>` |
> | `AZURE_SQL_AUTHENTICATION` | Azure SQL Database authentication type | `azure-active-directory-default` |

---

#### Sample code

To connect to Azure SQL Database using a system-assigned managed identity, refer to the following steps and sample code.


### [.NET](#tab/sql-me-id-dotnet)

1. Install dependencies.
    ```bash
    dotnet add package Microsoft.Data.SqlClient
    ```
    
1. Get the Azure SQL Database connection string from the environment variable added by Service Connector.

    ```csharp
    using Microsoft.Data.SqlClient;
    
    string connectionString = 
        Environment.GetEnvironmentVariable("AZURE_SQL_CONNECTIONSTRING")!;
    
    using var connection = new SqlConnection(connectionString);
    connection.Open();
    ```
    For more information, see [Using Active Directory Managed Identity authentication](https://learn.microsoft.com/sql/connect/ado-net/sql/azure-active-directory-authentication#using-active-directory-managed-identity-authentication).

### [Java](#tab/sql-me-id-java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>com.microsoft.sqlserver</groupId>
        <artifactId>mssql-jdbc</artifactId>
        <version>10.2.0.jre11</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.7.0</version>
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
            // For service principal: "jdbc:sqlserver://{SQLName}.database.windows.net:1433;databaseName={SQLDbName};user={ServicePrincipalClientId};password={spSecret};authentication=ActiveDirectoryServicePrincipal;"
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
    For more information, see [Connect to Azure databases from App Service without secrets using a managed identity](https://learn.microsoft.com/azure/app-service/tutorial-connect-msi-azure-database?tabs=sqldatabase%2Csystemassigned%2Cjava%2Cwindowsclient#3-modify-your-code).

### [Spring Boot](#tab/sql-me-id-springBoot)

For a Spring application, if you create a connection with option `--client-type springboot`, Service Connector sets the properties `spring.datasource.url` with value format `jdbc:sqlserver://<sql-server>.database.windows.net:1433;databaseName=<sql-db>;authentication=ActiveDirectoryMSI;` to Azure Spring Apps.

Update your application following the tutorial [Migrate a Java application to use passwordless connections with Azure SQL Database](https://learn.microsoft.com/azure/developer/java/spring-framework/migrate-sql-database-to-passwordless-connection?tabs=spring%2Capp-service%2Cassign-role-service-connector#2-migrate-the-app-code-to-use-passwordless-connections). Remember to remove the `spring.datasource.password` configuration property if it was set before and add the correct dependencies.

### [Python](#tab/sql-me-id-python)

1. Install dependencies.
    ```bash
    python -m pip install mssql-python python-dotenv
    ```

1. Get the Azure SQL Database connection configurations from the environment variable added by Service Connector. In the code below, uncomment the section for your authentication type.

    ```python
    import os
    from mssql_python import connect
    
    server = os.getenv('AZURE_SQL_SERVER')
    port = os.getenv('AZURE_SQL_PORT')
    database = os.getenv('AZURE_SQL_DATABASE')
    
    # Uncomment the following lines corresponding to the authentication type you want to use.
    # For system-assigned managed identity.
    # connection_string = f'Server={server},{port};Database={database};Authentication=ActiveDirectoryMSI;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30'
    
    # For user-assigned managed identity.
    # client_id = os.getenv('AZURE_SQL_USER')
    # connection_string = f'Server={server},{port};Database={database};UID={client_id};Authentication=ActiveDirectoryMSI;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30'
    
    # For service principal.
    # user = os.getenv('AZURE_SQL_USER')
    # password = os.getenv('AZURE_SQL_PASSWORD')
    # connection_string = f'Server={server},{port};Database={database};UID={user};PWD={password};Authentication=ActiveDirectoryServicePrincipal;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30'
    
    conn = connect(connection_string)
    ```

### [Node.js](#tab/sql-me-id-nodejs)

1. Install dependencies.
    ```bash
    npm install mssql
    ```
1. Get the Azure SQL Database connection configurations from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.
    ```javascript
    import sql from 'mssql';
    
    const server = process.env.AZURE_SQL_SERVER;
    const database = process.env.AZURE_SQL_DATABASE;
    const port = parseInt(process.env.AZURE_SQL_PORT);
    const authenticationType = process.env.AZURE_SQL_AUTHENTICATIONTYPE;
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // For system-assigned managed identity.
    // const config = {
    //     server,
    //     port,
    //     database,
    //     authentication: {
    //         type: authenticationType
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

    // For service principal.
    // const clientId = process.env.AZURE_SQL_CLIENTID;
    // const clientSecret = process.env.AZURE_SQL_CLIENTSECRET;
    // const tenantId = process.env.AZURE_SQL_TENANTID;
    // const config = {
    //     server,
    //     port,
    //     database,
    //     authentication: {
    //         type: authenticationType
    //     },
    //     options: {
    //         encrypt: true,
    //         clientId: clientId,
    //         clientSecret: clientSecret,
    //         tenantId: tenantId
    //     }
    // };  

    this.poolconnection = await sql.connect(config);
    ```

### [Other](#tab/sql-me-id-none)
For other languages, use the connection properties that Service Connector sets to the environment variables to connect the database. For environment variable details, see [Integrate Azure SQL Database with Service Connector](how-to-integrate-sql-database.md).


---

For more information, see [Homepage for client programming to Microsoft SQL Server](https://learn.microsoft.com/sql/connect/homepage-sql-connection-programming).



### User-assigned managed identity

#### [.NET](#tab/sql-me-id-dotnet)

> 
> | Default environment variable name | Description | Sample value |
> | --- | --- | --- |
> | `AZURE_SQL_CONNECTIONSTRING` | Azure SQL Database connection string | `Data Source=<sql-server>.database.windows.net,1433;Initial Catalog=<sql-database>;User ID=<identity-client-ID>;Authentication=ActiveDirectoryManagedIdentity` |

#### [Java](#tab/sql-me-id-java)

> 
> | Default environment variable name | Description | Sample value |
> | --- | --- | --- |
> | `AZURE_SQL_CONNECTIONSTRING` | Azure SQL Database connection string | `jdbc:sqlserver://<sql-server>.database.windows.net:1433;databaseName=<sql-database>;msiClientId=<msiClientId>;authentication=ActiveDirectoryMSI;` |

#### [Spring Boot](#tab/sql-me-id-springBoot)

> 
> | Default environment variable name | Description | Sample value |
> | --- | --- | --- |
> | `spring.datasource.url` | Azure SQL Database datasource URL | `jdbc:sqlserver://<sql-server>.database.windows.net:1433;databaseName=<sql-db>;msiClientId=<msiClientId>;authentication=ActiveDirectoryMSI;` |

#### [Python](#tab/sql-me-id-python)

> 
> | Default environment variable name | Description | Sample value |
> | --- | --- | --- |
> | `AZURE_SQL_SERVER` | Azure SQL Database server | `<sql-server>.database.windows.net` |
> | `AZURE_SQL_PORT` | Azure SQL Database port | `1433` |
> | `AZURE_SQL_DATABASE` | Azure SQL Database database | `<sql-database>` |
> | `AZURE_SQL_USER` | Azure SQL Database user | `Object (principal) ID` |
> | `AZURE_SQL_AUTHENTICATION` | Azure SQL authentication | `ActiveDirectoryMsi` |

#### [NodeJS](#tab/sql-me-id-nodejs)

> 
> | Default environment variable name | Description | Sample value |
> | --- | --- | --- |
> | `AZURE_SQL_SERVER` | Azure SQL Database server | `<sql-server>.database.windows.net` |
> | `AZURE_SQL_PORT` | Azure SQL Database port | `1433` |
> | `AZURE_SQL_DATABASE` | Azure SQL Database database | `<sql-database>` |
> | `AZURE_SQL_AUTHENTICATIONTYPE` | Azure SQL Database authentication type | `azure-active-directory-default` |
> | `AZURE_SQL_CLIENTID` | Azure SQL Database client ID | `<identity-client-ID>` |

#### [Other](#tab/sql-me-id-none)

> 
> | Default environment variable name | Description | Sample value |
> | --- | --- | --- |
> | `AZURE_SQL_HOST` | Azure SQL Database server | `<sql-server>.database.windows.net` |
> | `AZURE_SQL_PORT` | Azure SQL Database port | `1433` |
> | `AZURE_SQL_DATABASE` | Azure SQL Database database | `<sql-database>` |
> | `AZURE_SQL_AUTHENTICATION` | Azure SQL Database authentication type | `azure-active-directory-default` |
> | `AZURE_SQL_USERNAME` | Azure SQL Database client ID | `<your Client ID>` |

---

#### Sample code

To connect to Azure SQL Database using a user-assigned managed identity, refer to the following steps and sample code.


### [.NET](#tab/sql-me-id-dotnet)

1. Install dependencies.
    ```bash
    dotnet add package Microsoft.Data.SqlClient
    ```
    
1. Get the Azure SQL Database connection string from the environment variable added by Service Connector.

    ```csharp
    using Microsoft.Data.SqlClient;
    
    string connectionString = 
        Environment.GetEnvironmentVariable("AZURE_SQL_CONNECTIONSTRING")!;
    
    using var connection = new SqlConnection(connectionString);
    connection.Open();
    ```
    For more information, see [Using Active Directory Managed Identity authentication](https://learn.microsoft.com/sql/connect/ado-net/sql/azure-active-directory-authentication#using-active-directory-managed-identity-authentication).

### [Java](#tab/sql-me-id-java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>com.microsoft.sqlserver</groupId>
        <artifactId>mssql-jdbc</artifactId>
        <version>10.2.0.jre11</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.7.0</version>
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
            // For service principal: "jdbc:sqlserver://{SQLName}.database.windows.net:1433;databaseName={SQLDbName};user={ServicePrincipalClientId};password={spSecret};authentication=ActiveDirectoryServicePrincipal;"
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
    For more information, see [Connect to Azure databases from App Service without secrets using a managed identity](https://learn.microsoft.com/azure/app-service/tutorial-connect-msi-azure-database?tabs=sqldatabase%2Csystemassigned%2Cjava%2Cwindowsclient#3-modify-your-code).

### [Spring Boot](#tab/sql-me-id-springBoot)

For a Spring application, if you create a connection with option `--client-type springboot`, Service Connector sets the properties `spring.datasource.url` with value format `jdbc:sqlserver://<sql-server>.database.windows.net:1433;databaseName=<sql-db>;authentication=ActiveDirectoryMSI;` to Azure Spring Apps.

Update your application following the tutorial [Migrate a Java application to use passwordless connections with Azure SQL Database](https://learn.microsoft.com/azure/developer/java/spring-framework/migrate-sql-database-to-passwordless-connection?tabs=spring%2Capp-service%2Cassign-role-service-connector#2-migrate-the-app-code-to-use-passwordless-connections). Remember to remove the `spring.datasource.password` configuration property if it was set before and add the correct dependencies.

### [Python](#tab/sql-me-id-python)

1. Install dependencies.
    ```bash
    python -m pip install mssql-python python-dotenv
    ```

1. Get the Azure SQL Database connection configurations from the environment variable added by Service Connector. In the code below, uncomment the section for your authentication type.

    ```python
    import os
    from mssql_python import connect
    
    server = os.getenv('AZURE_SQL_SERVER')
    port = os.getenv('AZURE_SQL_PORT')
    database = os.getenv('AZURE_SQL_DATABASE')
    
    # Uncomment the following lines corresponding to the authentication type you want to use.
    # For system-assigned managed identity.
    # connection_string = f'Server={server},{port};Database={database};Authentication=ActiveDirectoryMSI;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30'
    
    # For user-assigned managed identity.
    # client_id = os.getenv('AZURE_SQL_USER')
    # connection_string = f'Server={server},{port};Database={database};UID={client_id};Authentication=ActiveDirectoryMSI;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30'
    
    # For service principal.
    # user = os.getenv('AZURE_SQL_USER')
    # password = os.getenv('AZURE_SQL_PASSWORD')
    # connection_string = f'Server={server},{port};Database={database};UID={user};PWD={password};Authentication=ActiveDirectoryServicePrincipal;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30'
    
    conn = connect(connection_string)
    ```

### [Node.js](#tab/sql-me-id-nodejs)

1. Install dependencies.
    ```bash
    npm install mssql
    ```
1. Get the Azure SQL Database connection configurations from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.
    ```javascript
    import sql from 'mssql';
    
    const server = process.env.AZURE_SQL_SERVER;
    const database = process.env.AZURE_SQL_DATABASE;
    const port = parseInt(process.env.AZURE_SQL_PORT);
    const authenticationType = process.env.AZURE_SQL_AUTHENTICATIONTYPE;
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // For system-assigned managed identity.
    // const config = {
    //     server,
    //     port,
    //     database,
    //     authentication: {
    //         type: authenticationType
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

    // For service principal.
    // const clientId = process.env.AZURE_SQL_CLIENTID;
    // const clientSecret = process.env.AZURE_SQL_CLIENTSECRET;
    // const tenantId = process.env.AZURE_SQL_TENANTID;
    // const config = {
    //     server,
    //     port,
    //     database,
    //     authentication: {
    //         type: authenticationType
    //     },
    //     options: {
    //         encrypt: true,
    //         clientId: clientId,
    //         clientSecret: clientSecret,
    //         tenantId: tenantId
    //     }
    // };  

    this.poolconnection = await sql.connect(config);
    ```

### [Other](#tab/sql-me-id-none)
For other languages, use the connection properties that Service Connector sets to the environment variables to connect the database. For environment variable details, see [Integrate Azure SQL Database with Service Connector](how-to-integrate-sql-database.md).


---

For more information, see [Homepage for client programming to Microsoft SQL Server](https://learn.microsoft.com/sql/connect/homepage-sql-connection-programming).



### Connection string

> **Warning:**
> Microsoft recommends that you use the most secure authentication flow available. The authentication flow described in this procedure requires a high degree of trust in the application, and carries risks that aren't present in other flows. You should only use this flow when other more secure flows, such as managed identities, aren't viable.

#### [.NET](#tab/sql-secret-dotnet)

> 
> | Default environment variable name | Description | Sample value |
> | --- | --- | --- |
> | `AZURE_SQL_CONNECTIONSTRING` | Azure SQL Database connection string | `Data Source=<sql-server>.database.windows.net,1433;Initial Catalog=<sql-database>;Password=<sql-password>` |

#### [Java](#tab/sql-secret-java)

> 
> | Default environment variable name | Description | Sample value |
> | --- | --- | --- |
> | `AZURE_SQL_CONNECTIONSTRING` | Azure SQL Database connection string | `jdbc:sqlserver://<sql-server>.database.windows.net:1433;databaseName=<sql-database>;user=<sql-username>;password=<sql-password>;` |

#### [Spring Boot](#tab/sql-secret-springBoot)

> 
>
> | Default environment variable name | Description | Sample value |
> | --- | --- | --- |
> | `spring.datasource.url` | Azure SQL Database datasource URL | `jdbc:sqlserver://<sql-server>.database.windows.net:1433;databaseName=<sql-db>;` |
> | `spring.datasource.username` | Azure SQL Database datasource username | `<sql-user>` |
> | `spring.datasource.password` | Azure SQL Database datasource password | `<sql-password>` |

#### [Python](#tab/sql-secret-python)

> 
> | Default environment variable name | Description | Sample value |
> | --- | --- | --- |
> | `AZURE_SQL_SERVER` | Azure SQL Database server | `<sql-server>.database.windows.net` |
> | `AZURE_SQL_PORT` | Azure SQL Database port | `1433` |
> | `AZURE_SQL_DATABASE` | Azure SQL Database database | `<sql-database>` |
> | `AZURE_SQL_USER` | Azure SQL Database user | `<sql-username>` |
> | `AZURE_SQL_PASSWORD` | Azure SQL Database password | `<sql-password>` |

#### [Django](#tab/sql-secret-django)

> 
> | Default environment variable name | Description | Sample value |
> | --- | --- | --- |
> | `AZURE_SQL_HOST` | Azure SQL Database host | `<sql-server>.database.windows.net` |
> | `AZURE_SQL_PORT` | Azure SQL Database port | `1433` |
> | `AZURE_SQL_NAME` | Azure SQL Database name | `<sql-database>` |
> | `AZURE_SQL_USER` | Azure SQL Database user | `<sql-username>` |
> | `AZURE_SQL_PASSWORD` | Azure SQL Database password | `<sql-password>` |

#### [Go](#tab/sql-secret-go)

> 
> | Default environment variable name | Description | Sample value |
> | --- | --- | --- |
> | `AZURE_SQL_CONNECTIONSTRING` | Azure SQL Database connection string | `server=<sql-server>.database.windows.net;port=1433;database=<sql-database>;user id=<sql-username>;password=<sql-password>;` |

#### [NodeJS](#tab/sql-secret-nodejs)

> 
> | Default environment variable name | Description | Sample value |
> | --- | --- | --- |
> | `AZURE_SQL_SERVER` | Azure SQL Database server | `<sql-server>.database.windows.net` |
> | `AZURE_SQL_PORT` | Azure SQL Database port | `1433` |
> | `AZURE_SQL_DATABASE` | Azure SQL Database database | `<sql-database>` |
> | `AZURE_SQL_USERNAME` | Azure SQL Database username | `<sql-username>` |
> | `AZURE_SQL_PASSWORD` | Azure SQL Database password | `<sql-password>` |

#### [PHP](#tab/sql-secret-php)

> 
> | Default environment variable name | Description | Sample value |
> | --- | --- | --- |
> | `AZURE_SQL_SERVERNAME` | Azure SQL Database servername | `<sql-server>.database.windows.net,1433` |
> | `AZURE_SQL_DATABASE` | Azure SQL Database database | `<sql-database>` |
> | `AZURE_SQL_UID` | Azure SQL Database unique identifier (UID) | `<sql-username>` |
> | `AZURE_SQL_PASSWORD` | Azure SQL Database password | `<sql-password>` |

#### [Ruby](#tab/sql-secret-ruby)

> 
> | Default environment variable name | Description | Sample value |
> | --- | --- | --- |
> | `AZURE_SQL_HOST` | Azure SQL Database host | `<sql-server>.database.windows.net` |
> | `AZURE_SQL_PORT` | Azure SQL Database port | `1433` |
> | `AZURE_SQL_DATABASE` | Azure SQL Database database | `<sql-database>` |
> | `AZURE_SQL_USERNAME` | Azure SQL Database username | `<sql-username>` |
> | `AZURE_SQL_PASSWORD` | Azure SQL Database password | `<sql-password>` |

#### [Other](#tab/sql-secret-none)

> 
> | Default environment variable name | Description | Sample value |
> | --- | --- | --- |
> | `AZURE_SQL_HOST` | Azure SQL Database host | `<sql-server>.database.windows.net` |
> | `AZURE_SQL_PORT` | Azure SQL Database port | `1433` |
> | `AZURE_SQL_DATABASE` | Azure SQL Database database | `<sql-database>` |
> | `AZURE_SQL_USERNAME` | Azure SQL Database username | `<sql-username>` |
> | `AZURE_SQL_PASSWORD` | Azure SQL Database password | `<sql-password>` |

---

#### Sample code

To connect to Azure SQL Database using a connection string, refer to the following steps and sample code.

### [.NET](#tab/sql-secret-dotnet)
1. Install dependencies.
    ```bash
    dotnet add package Microsoft.Data.SqlClient
    ```
    
1. Get the Azure SQL Database connection string from the environment variable added by Service Connector.

    ```csharp
    using Microsoft.Data.SqlClient;
    
    string connectionString = 
        Environment.GetEnvironmentVariable("AZURE_SQL_CONNECTIONSTRING")!;
    
    using var connection = new SqlConnection(connectionString);
    connection.Open();
    ```

### [Java](#tab/sql-secret-java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
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

### [Spring Boot](#tab/sql-secret-springBoot)
1. Add dependency in your 'pom.xml' file:
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
      </dependencies>
    </dependencyManagement>
    ```
1. Set up the Spring application. The connection configurations are added to Spring Apps by Service Connector.


### [Python](#tab/sql-secret-python)

1. Install dependencies.
    ```bash
    python -m pip install mssql-python python-dotenv
    ```

1. Get the Azure SQL Database connection configurations from the environment variable added by Service Connector.
    ```python
    import os
    from mssql_python import connect
    
    server = os.getenv('AZURE_SQL_SERVER')
    port = os.getenv('AZURE_SQL_PORT')
    database = os.getenv('AZURE_SQL_DATABASE')
    user = os.getenv('AZURE_SQL_USER')
    password = os.getenv('AZURE_SQL_PASSWORD')
    
    connection_string = f'Server={server},{port};Database={database};UID={user};PWD={password};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30'

    conn = connect(connection_string)
    ```

### [Django](#tab/sql-secret-django)
1. Install dependencies.
   ```bash
   pip install django
   pip install mssql-django pyodbc
   ```

1. In the setting file, get the Azure SQL Database connection configurations from the environment variable added by Service Connector.
    ```python
    # in your setting file, eg. settings.py
    
    server = os.getenv('AZURE_SQL_HOST')
    port = os.getenv('AZURE_SQL_PORT')
    database = os.getenv('AZURE_SQL_NAME')
    user = os.getenv('AZURE_SQL_USER')
    password = os.getenv('AZURE_SQL_PASSWORD')

    DATABASES = {
        'default': {
            'ENGINE': 'mssql',
            'NAME': database,
            'USER': user,
            'PASSWORD': password,
            'HOST': server,
            'PORT': port,
            'OPTIONS': {
                'driver': 'ODBC Driver 18 for SQL Server',
            },
        },
    }
    ```

### [Go](#tab/sql-secret-go)

1. Install dependency.
    ```bash
    go install github.com/microsoft/go-mssqldb@latest
    ```

1. Get the Azure SQL Database connection string from the environment variable added by Service Connector.

    ```go
    import (
    	"context"
    	"database/sql"
    	"fmt"
    	"log"
    
        "github.com/microsoft/go-mssqldb/azuread"
    )
    connectionString := os.Getenv("AZURE_SQL_CONNECTIONSTRING")
    
    db, err = sql.Open(azuread.DriverName, connString)
    if err != nil {
        log.Fatal("Error creating connection pool: " + err.Error())
    }
    log.Printf("Connected!\n")
    ```

### [Node.js](#tab/sql-secret-nodejs)

1. Install dependencies.
    ```bash
    npm install mssql
    ```
1. Get the Azure SQL Database connection configurations from the environment variables added by Service Connector.
    ```javascript
    import sql from 'mssql';
    
    const server = process.env.AZURE_SQL_SERVER;
    const database = process.env.AZURE_SQL_DATABASE;
    const port = parseInt(process.env.AZURE_SQL_PORT);
    const username = process.env.AZURE_SQL_USERNAME;
    const password = process.env.AZURE_SQL_PASSWORD;
    
    const config = {
        server,
        port,
        database,
        user,
        password,
        options: {
           encrypt: true
        }
    };  

    this.poolconnection = await sql.connect(config);
    ```

### [PHP](#tab/sql-secret-php)

1. Download the Microsoft Drivers for PHP for SQL Server. For more information, check [Getting Started with the Microsoft Drivers for PHP for SQL Server](https://learn.microsoft.com/sql/connect/php/getting-started-with-the-php-sql-driver).

1. Get the Azure SQL Database connection configurations from the environment variables added by Service Connector.
    ```php
    <?php
    $serverName = getenv("AZURE_SQL_SERVERNAME");
    $database = getenv("AZURE_SQL_DATABASE");
    $user = getenv("AZURE_SQL_UID");
    $password = getenv("AZURE_SQL_PASSWORD");
    
    $connectionOptions = array(
        "Database" => $database,
        "Uid" => $user,
        "PWD" => $password
    );

    $conn = sqlsrv_connect($serverName, $connectionOptions);
    ?>
    ```

### [Ruby](#tab/sql-secret-ruby)
1. Download Ruby Driver for SQL Server. For more information, check [Configure development environment for Ruby development](https://learn.microsoft.com/sql/connect/ruby/step-1-configure-development-environment-for-ruby-development).

1. Get the Azure SQL Database connection configurations from the environment variables added by Service Connector.
    ```ruby
    client = TinyTds::Client.new username: ENV['AZURE_SQL_USERNAME'], password: ENV['AZURE_SQL_PASSWORD'],  
    host: ENV['AZURE_SQL_HOST'], port: ENV['AZURE_SQL_PORT'],  
    database: ENV['AZURE_SQL_DATABASE'], azure:true
    ```

### [Other](#tab/sql-secret-none)
For other languages, use the connection properties that Service Connector sets to the environment variables to connect the database. For environment variable details, see [Integrate Azure SQL Database with Service Connector](how-to-integrate-sql-database.md).

---

For more information, see [Homepage for client programming to Microsoft SQL Server](https://learn.microsoft.com/sql/connect/homepage-sql-connection-programming).



### Service principal

#### [.NET](#tab/sql-me-id-dotnet)

> 
> | Default environment variable name | Description | Example value |
> | --- | --- | --- |
> | `AZURE_SQL_CLIENTID` | Your client ID | `<client-ID>` |
> | `AZURE_SQL_CLIENTSECRET` | Your client secret | `<client-secret>` |
> | `AZURE_SQL_TENANTID` | Your tenant ID | `<tenant-ID>` |
> | `AZURE_SQL_CONNECTIONSTRING` | Azure SQL Database connection string | `Data Source=<sql-server>.database.windows.net,1433;Initial Catalog=<sql-database>;User ID=<client-Id>;Password=<client-secret>;Authentication=ActiveDirectoryServicePrincipal` |

#### [Java](#tab/sql-me-id-java)

> 
> | Default environment variable name | Description | Sample value |
> | --- | --- | --- |
> | `AZURE_SQL_CONNECTIONSTRING` | Azure SQL Database connection string | `jdbc:sqlserver://<sql-server>.database.windows.net:1433;databaseName=<sql-database>;user=<client-Id>;password=<client-secret>;authentication=ActiveDirectoryServicePrincipal;` |


#### [Spring Boot](#tab/sql-me-id-springBoot)

> 
> | Default environment variable name | Description | Sample value |
> | --- | --- | --- |
> | `spring.datasource.url` | Azure SQL Database datasource URL | `jdbc:sqlserver://<sql-server>.database.windows.net:1433;databaseName=<sql-db>;authentication=ActiveDirectoryServicePrincipal;` |
> | `spring.datasource.username` | Azure SQL Database datasource username | `<client-Id>` |
> | `spring.datasource.password` | Azure SQL Database datasource password | `<client-Secret>` |


#### [Python](#tab/sql-me-id-python)

> 
> | Default environment variable name | Description | Sample value |
> | --- | --- | --- |
> | `AZURE_SQL_SERVER` | Azure SQL Database server | `<sql-server>.database.windows.net` |
> | `AZURE_SQL_PORT` | Azure SQL Database port | `1433` |
> | `AZURE_SQL_DATABASE` | Azure SQL Database database | `<sql-database>` |
> | `AZURE_SQL_USER` | Azure SQL Database user | `your Client Id` |
> | `AZURE_SQL_AUTHENTICATION` | Azure SQL authentication | `ActiveDirectoryServerPrincipal` |
> | `AZURE_SQL_PASSWORD` | Azure SQL Database password | `your Client Secret` |


#### [NodeJS](#tab/sql-me-id-nodejs)

> 
> | Default environment variable name | Description | Sample value |
> | --- | --- | --- |
> | `AZURE_SQL_SERVER` | Azure SQL Database server | `<sql-server>.database.windows.net` |
> | `AZURE_SQL_PORT` | Azure SQL Database port | `1433` |
> | `AZURE_SQL_DATABASE` | Azure SQL Database database | `<sql-database>` |
> | `AZURE_SQL_AUTHENTICATIONTYPE` | Azure SQL Database authentication type | `azure-active-directory-default` |
> | `AZURE_SQL_CLIENTID` | Azure SQL Database client ID | `<your Client ID>` |
> | `AZURE_SQL_CLIENTSECRET` | Azure SQL Database client Secret | `<your Client Secret >` |
> | `AZURE_SQL_TENANTID` | Azure SQL Database Tenant ID | `<your Tenant ID>` |

#### [Other](#tab/sql-me-id-none)

> 
> | Default environment variable name | Description | Sample value |
> | --- | --- | --- |
> | `AZURE_SQL_HOST` | Azure SQL Database server | `<sql-server>.database.windows.net` |
> | `AZURE_SQL_PORT` | Azure SQL Database port | `1433` |
> | `AZURE_SQL_DATABASE` | Azure SQL Database database | `<sql-database>` |
> | `AZURE_SQL_AUTHENTICATION` | Azure SQL Database authentication type | `azure-active-directory-default` |
> | `AZURE_SQL_USERNAME` | Azure SQL Database client ID | `<your Client ID>` |
> | `AZURE_SQL_PASSWORD` | Azure SQL Database client Secret | `<your Client Secret >` |

---

#### Sample code

To connect to Azure SQL Database using a service principal, refer to the following steps and sample code.


### [.NET](#tab/sql-me-id-dotnet)

1. Install dependencies.
    ```bash
    dotnet add package Microsoft.Data.SqlClient
    ```
    
1. Get the Azure SQL Database connection string from the environment variable added by Service Connector.

    ```csharp
    using Microsoft.Data.SqlClient;
    
    string connectionString = 
        Environment.GetEnvironmentVariable("AZURE_SQL_CONNECTIONSTRING")!;
    
    using var connection = new SqlConnection(connectionString);
    connection.Open();
    ```
    For more information, see [Using Active Directory Managed Identity authentication](https://learn.microsoft.com/sql/connect/ado-net/sql/azure-active-directory-authentication#using-active-directory-managed-identity-authentication).

### [Java](#tab/sql-me-id-java)

1. Add the following dependencies in your *pom.xml* file:

    ```xml
    <dependency>
        <groupId>com.microsoft.sqlserver</groupId>
        <artifactId>mssql-jdbc</artifactId>
        <version>10.2.0.jre11</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.7.0</version>
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
            // For service principal: "jdbc:sqlserver://{SQLName}.database.windows.net:1433;databaseName={SQLDbName};user={ServicePrincipalClientId};password={spSecret};authentication=ActiveDirectoryServicePrincipal;"
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
    For more information, see [Connect to Azure databases from App Service without secrets using a managed identity](https://learn.microsoft.com/azure/app-service/tutorial-connect-msi-azure-database?tabs=sqldatabase%2Csystemassigned%2Cjava%2Cwindowsclient#3-modify-your-code).

### [Spring Boot](#tab/sql-me-id-springBoot)

For a Spring application, if you create a connection with option `--client-type springboot`, Service Connector sets the properties `spring.datasource.url` with value format `jdbc:sqlserver://<sql-server>.database.windows.net:1433;databaseName=<sql-db>;authentication=ActiveDirectoryMSI;` to Azure Spring Apps.

Update your application following the tutorial [Migrate a Java application to use passwordless connections with Azure SQL Database](https://learn.microsoft.com/azure/developer/java/spring-framework/migrate-sql-database-to-passwordless-connection?tabs=spring%2Capp-service%2Cassign-role-service-connector#2-migrate-the-app-code-to-use-passwordless-connections). Remember to remove the `spring.datasource.password` configuration property if it was set before and add the correct dependencies.

### [Python](#tab/sql-me-id-python)

1. Install dependencies.
    ```bash
    python -m pip install mssql-python python-dotenv
    ```

1. Get the Azure SQL Database connection configurations from the environment variable added by Service Connector. In the code below, uncomment the section for your authentication type.

    ```python
    import os
    from mssql_python import connect
    
    server = os.getenv('AZURE_SQL_SERVER')
    port = os.getenv('AZURE_SQL_PORT')
    database = os.getenv('AZURE_SQL_DATABASE')
    
    # Uncomment the following lines corresponding to the authentication type you want to use.
    # For system-assigned managed identity.
    # connection_string = f'Server={server},{port};Database={database};Authentication=ActiveDirectoryMSI;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30'
    
    # For user-assigned managed identity.
    # client_id = os.getenv('AZURE_SQL_USER')
    # connection_string = f'Server={server},{port};Database={database};UID={client_id};Authentication=ActiveDirectoryMSI;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30'
    
    # For service principal.
    # user = os.getenv('AZURE_SQL_USER')
    # password = os.getenv('AZURE_SQL_PASSWORD')
    # connection_string = f'Server={server},{port};Database={database};UID={user};PWD={password};Authentication=ActiveDirectoryServicePrincipal;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30'
    
    conn = connect(connection_string)
    ```

### [Node.js](#tab/sql-me-id-nodejs)

1. Install dependencies.
    ```bash
    npm install mssql
    ```
1. Get the Azure SQL Database connection configurations from the environment variables added by Service Connector. In the code below, uncomment the section for your authentication type.
    ```javascript
    import sql from 'mssql';
    
    const server = process.env.AZURE_SQL_SERVER;
    const database = process.env.AZURE_SQL_DATABASE;
    const port = parseInt(process.env.AZURE_SQL_PORT);
    const authenticationType = process.env.AZURE_SQL_AUTHENTICATIONTYPE;
    
    // Uncomment the following lines corresponding to the authentication type you want to use.
    // For system-assigned managed identity.
    // const config = {
    //     server,
    //     port,
    //     database,
    //     authentication: {
    //         type: authenticationType
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

    // For service principal.
    // const clientId = process.env.AZURE_SQL_CLIENTID;
    // const clientSecret = process.env.AZURE_SQL_CLIENTSECRET;
    // const tenantId = process.env.AZURE_SQL_TENANTID;
    // const config = {
    //     server,
    //     port,
    //     database,
    //     authentication: {
    //         type: authenticationType
    //     },
    //     options: {
    //         encrypt: true,
    //         clientId: clientId,
    //         clientSecret: clientSecret,
    //         tenantId: tenantId
    //     }
    // };  

    this.poolconnection = await sql.connect(config);
    ```

### [Other](#tab/sql-me-id-none)
For other languages, use the connection properties that Service Connector sets to the environment variables to connect the database. For environment variable details, see [Integrate Azure SQL Database with Service Connector](how-to-integrate-sql-database.md).


---

For more information, see [Homepage for client programming to Microsoft SQL Server](https://learn.microsoft.com/sql/connect/homepage-sql-connection-programming).



## Next steps

To learn more about Service Connector, see the following tutorial.

> 
> [Learn about Service Connector concepts](concept-service-connector-internals.md)
