---
title: Integrate SQL database in Microsoft Fabric with Service Connector
description: Integrate SQL database in Microsoft Fabric with Service Connector
author: maud-lv
ms.author: malev
ms.service: service-connector
ms.topic: how-to
ms.date: 06/18/2026
---

# Integrate SQL database in Microsoft Fabric with Service Connector

This article covers supported authentication methods and clients, and provides sample code for connecting cloud services to SQL database in Microsoft Fabric by using Service Connector. It also lists default environment variable names and values that you receive when you create the service connection.

## Supported compute services

Service Connector can be used to connect the following compute services to SQL database in Fabric:

- Azure App Service
- Azure Functions
- Azure Kubernetes Service (AKS)

## Supported authentication types and client types

The following table shows which combinations of authentication methods and clients are supported for connecting your compute service to SQL database in Fabric using Service Connector. A "Yes" indicates that the combination is supported, while a "No" indicates that it is not supported.

| Client type | System-assigned managed identity | User-assigned managed identity | Secret/connection string | Service principal |
| --- | :---: | :---: | :---: | :---: |
| .NET | Yes | Yes | No | No |
| Go | Yes | Yes | No | No |
| Java | Yes | Yes | No | No |
| Java - Spring Boot | Yes | Yes | No | No |
| Python | Yes | Yes | No | No |
| None | Yes | Yes | No | No |

This table indicates that as per Fabric behavior, only authentication via managed identities is allowed.

The system-assigned managed identity and user-assigned managed identity methods are supported for .NET, Java, Java - Spring Boot, Python, Go, and None client types. These methods are not supported for any other types.

> **Important:**
> Manual access sharing is currently required for complete onboarding. See [Share access to SQL database in Fabric](#share-access-to-sql-database-in-fabric).

## Default environment variable names or application properties and sample code

Refer to the connection details and sample code presented in the following tabs to connect compute services to SQL database in Fabric. For more information about naming conventions, check the [Service Connector internals](concept-service-connector-internals.md#configuration-naming-convention) article.

> **Note:**
> Although SQL database in Fabric is distinct from Azure SQL Database, you can connect to and query your SQL database in Fabric in all the same ways as Azure SQL Database. [Learn more](https://learn.microsoft.com/fabric/database/sql/connect).

### System-assigned managed identity

#### [.NET](#tab/fabric-sql-me-id-dotnet)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `FABRIC_SQL_CONNECTIONSTRING ` | Azure SQL Database connection string | `Data Source=tcp:<Fabric-SQL-Identifier>.msit-database.fabric.microsoft.com,1433;Initial Catalog=<SQL-DB-name>-<Fabric-DB-Identifier>;Authentication=ActiveDirectoryManagedIdentity` |

#### [Java](#tab/fabric-sql-me-id-java)

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| `FABRIC_SQL_CONNECTIONSTRING` | Azure SQL Database connection string | `jdbc:sqlserver://<Fabric-SQL-Identifier>.msit-database.fabric.microsoft.com,1433;databaseName=<SQL-DB-name>-<Fabric-DB-Identifier>;authentication=ActiveDirectoryMSI;` |

#### [Spring Boot](#tab/fabric-sql-me-id-springboot)

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| `FABRIC_SQL_CONNECTIONSTRING` | Azure SQL Database connection string | `jdbc:sqlserver://<Fabric-SQL-Identifier>.msit-database.fabric.microsoft.com,1433;databaseName=<SQL-DB-name>-<Fabric-DB-Identifier>;authentication=ActiveDirectoryMSI;` |

#### [Python](#tab/fabric-sql-me-id-python)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `FABRIC_SQL_CONNECTIONSTRING` | Azure SQL Database connection string | `Driver={ODBC Driver 17 for SQL Server};Server=tcp:<Fabric-SQL-Identifier>.msit-database.fabric.microsoft.com,1433;Database=<SQL-DB-name>-<Fabric-DB-Identifier>;Authentication=ActiveDirectoryMSI;` |

#### [Go](#tab/fabric-sql-me-id-go)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `FABRIC_SQL_CONNECTIONSTRING` | Azure SQL Database connection string | `server=tcp:<Fabric-SQL-Identifier>.msit-database.fabric.microsoft.com;port=1433;database=<SQL-DB-name>-<Fabric-DB-Identifier>;fedauth=ActiveDirectoryManagedIdentity;` |

#### [Other](#tab/fabric-sql-me-id-none)
| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `FABRIC_SQL_CONNECTIONSTRING` | Azure SQL Database connection string | `server=tcp:<Fabric-SQL-Identifier>.msit-database.fabric.microsoft.com;port=1433;database=<SQL-DB-name>-<Fabric-DB-Identifier>;fedauth=ActiveDirectoryManagedIdentity;` |

---

#### Sample code

Outlined below are the steps and code snippets to connect to SQL database in Fabric using a system-assigned managed identity.

### [.NET](#tab/fabricsql-me-id-dotnet)

1. Install dependencies.
    ```bash
    dotnet add package Microsoft.Data.SqlClient
    ```
    
1. Retrieve the SQL database in Microsoft Fabric connection string from the environment variable added by Service Connector.

    ```csharp
    using Microsoft.Data.SqlClient;
    
    string connectionString = 
        Environment.GetEnvironmentVariable("FABRIC_SQL_CONNECTIONSTRING")!;
    
    using var connection = new SqlConnection(connectionString);
    connection.Open();
    ```
    For more information, see [Using Active Directory managed identity authentication](https://learn.microsoft.com/sql/connect/ado-net/sql/azure-active-directory-authentication?view=fabric\&preserve-view=true#using-managed-identity-authentication).

### [Java](#tab/fabricsql-me-id-java)

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

1. Retrieve the SQL database in Microsoft Fabric connection string from the environment variable added by Service Connector.

    ```java
    import java.sql.Connection;
    import java.sql.ResultSet;
    import java.sql.Statement;
    
    import com.microsoft.sqlserver.jdbc.SQLServerDataSource;
    
    public class Main {
        public static void main(String[] args) {
            // FABRIC_SQL_CONNECTIONSTRING should be one of the following:
            // For system-assigned managed identity: "jdbc:sqlserver://<Fabric-SQL-Identifier>.msit-database.fabric.microsoft.com,1433;databaseName=<SQL-DB-name>-<Fabric-DB-Identifier>;authentication=ActiveDirectoryMSI;"
            // For user-assigned managed identity: "jdbc:sqlserver://<Fabric-SQL-Identifier>.msit-database.fabric.microsoft.com,1433;databaseName=<SQL-DB-name>-<Fabric-DB-Identifier>;msiClientId=<msiClientId>;authentication=ActiveDirectoryMSI;"
            String connectionString = System.getenv("FABRIC_SQL_CONNECTIONSTRING");
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

### [Spring Boot](#tab/fabricsql-me-id-springBoot)

For a Spring application, if you create a connection with option `--client-type springboot`, Service Connector sets the environment variable `FABRIC_SQL_CONNECTIONSTRING` with value format `jdbc:sqlserver://<Fabric-SQL-Identifier>.msit-database.fabric.microsoft.com,1433;databaseName=<SQL-DB-name>-<Fabric-DB-Identifier>;authentication=ActiveDirectoryMSI;` to Azure Spring Apps.

For user-assigned managed identities, `msiClientId=<msiClientId>;` is added.

Update your application following the tutorial [Migrate a Java application to use passwordless connections with Azure SQL Database](https://learn.microsoft.com/azure/developer/java/spring-framework/migrate-sql-database-to-passwordless-connection?tabs=spring%2Capp-service%2Cassign-role-service-connector#2-migrate-the-app-code-to-use-passwordless-connections). Remember to remove the `spring.datasource.password` configuration property if it was previously set and add the correct dependencies.

```yaml
spring:
  datasource:
    url: ${FABRIC_SQL_CONNECTIONSTRING}
```

### [Python](#tab/fabricsql-me-id-python)

1. Install dependencies.
    ```bash
    python -m pip install mssql-python python-dotenv
    ```

1. Retrieve the SQL database in Microsoft Fabric connection string from the environment variable added by Service Connector. `Authentication=ActiveDirectoryMSI;` is required in the connection string when connecting using managed identities. `UID=<msiClientId>` is also required in the connection string when connecting using a user-assigned managed identity.

    ```python
    import os
    from mssql_python import connect

    connection_string = os.getenv('FABRIC_SQL_CONNECTIONSTRING')
    
    # System-assigned managed identity connection string format
    # `Server=tcp:<Fabric-SQL-Identifier>.msit-database.fabric.microsoft.com,1433;Database=<SQL-DB-name>-<Fabric-DB-Identifier>;Authentication=ActiveDirectoryMSI;`
    
    # User-assigned managed identity connection string format
    # `Server=tcp:<Fabric-SQL-Identifier>.msit-database.fabric.microsoft.com,1433;Database=<SQL-DB-name>-<Fabric-DB-Identifier>;UID=<msiClientId>;Authentication=ActiveDirectoryMSI;`
    
    conn = connect(connection_string)
    ```

### [Go](#tab/fabricsql-me-id-go)

1. Install dependencies.
    ```bash
    go mod init <YourProjectName>
    go mod tidy
    ```
1. Retrieve the SQL database in Microsoft Fabric connection string from the environment variable added by Service Connector.
    ```golang
    package main

    import (
        "github.com/microsoft/go-mssqldb/azuread"
        "database/sql"
        "context"
        "log"
        "fmt"
        "os"
    )

    var db *sql.DB

    var connectionString = os.Getenv("FABRIC_SQL_CONNECTIONSTRING")

    func main() {
        var err error

        // Create connection pool
        db, err = sql.Open(azuread.DriverName, connectionString)
        if err != nil {
            log.Fatal("Error creating connection pool: ", err.Error())
        }
        ctx := context.Background()
        err = db.PingContext(ctx)
        if err != nil {
            log.Fatal(err.Error())
        }
        fmt.Printf("Connected!\n")
    }
    ```

For more information, see [Use Golang to query a database in Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/connect-query-go).

### [Other](#tab/fabricsql-me-id-none)
For other languages, use the connection string that Service Connector sets to the environment variables to connect the database. For environment variable details, see [Integrate SQL database in Microsoft Fabric with Service Connector](how-to-integrate-fabric-sql.md).

---

For more information, see [Connect to your SQL database in Microsoft Fabric](https://learn.microsoft.com/fabric/database/sql/connect).


### User-assigned Managed Identity

#### [.NET](#tab/fabric-sql-me-id-dotnet)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `FABRIC_SQL_CONNECTIONSTRING ` | Azure SQL Database connection string | `Data Source=tcp:<Fabric-SQL-Identifier>.msit-database.fabric.microsoft.com,1433;Initial Catalog=<SQL-DB-name>-<Fabric-DB-Identifier>;User ID=<msiClientId>;Authentication=ActiveDirectoryManagedIdentity` |

#### [Java](#tab/fabric-sql-me-id-java)

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| `FABRIC_SQL_CONNECTIONSTRING` | Azure SQL Database connection string | `jdbc:sqlserver://<Fabric-SQL-Identifier>.msit-database.fabric.microsoft.com,1433;databaseName=<SQL-DB-name>-<Fabric-DB-Identifier>;msiClientId=<msiClientId>;authentication=ActiveDirectoryMSI;` |

#### [Spring Boot](#tab/fabric-sql-me-id-springboot)

| Default environment variable name | Description | Sample value |
| --- | --- | --- |
| `FABRIC_SQL_CONNECTIONSTRING` | Azure SQL Database connection string | `jdbc:sqlserver://<Fabric-SQL-Identifier>.msit-database.fabric.microsoft.com,1433;databaseName=<SQL-DB-name>-<Fabric-DB-Identifier>;msiClientId=<msiClientId>;authentication=ActiveDirectoryMSI;` |

#### [Python](#tab/fabric-sql-me-id-python)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `FABRIC_SQL_CONNECTIONSTRING` | Azure SQL Database connection string | `Driver={ODBC Driver 17 for SQL Server};Server=tcp:<Fabric-SQL-Identifier>.msit-database.fabric.microsoft.com,1433;Database=<SQL-DB-name>-<Fabric-DB-Identifier>;UID=<msiClientId>;Authentication=ActiveDirectoryMSI;` |

#### [Go](#tab/fabric-sql-me-id-go)

| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `FABRIC_SQL_CONNECTIONSTRING` | Azure SQL Database connection string | `server=tcp:<Fabric-SQL-Identifier>.msit-database.fabric.microsoft.com;port=1433;database=<SQL-DB-name>-<Fabric-DB-Identifier>;user id=<msiClientId>;fedauth=ActiveDirectoryManagedIdentity;` |

#### [Other](#tab/fabric-sql-me-id-none)
| Default environment variable name | Description | Example value |
| --- | --- | --- |
| `FABRIC_SQL_CONNECTIONSTRING` | Azure SQL Database connection string | `server=tcp:<Fabric-SQL-Identifier>.msit-database.fabric.microsoft.com;port=1433;database=<SQL-DB-name>-<Fabric-DB-Identifier>;user id=<msiClientId>;fedauth=ActiveDirectoryManagedIdentity;` |

---

#### Sample code

Outlined below are the steps and code snippets to connect to SQL database in Fabric using a user-assigned managed identity.

### [.NET](#tab/fabricsql-me-id-dotnet)

1. Install dependencies.
    ```bash
    dotnet add package Microsoft.Data.SqlClient
    ```
    
1. Retrieve the SQL database in Microsoft Fabric connection string from the environment variable added by Service Connector.

    ```csharp
    using Microsoft.Data.SqlClient;
    
    string connectionString = 
        Environment.GetEnvironmentVariable("FABRIC_SQL_CONNECTIONSTRING")!;
    
    using var connection = new SqlConnection(connectionString);
    connection.Open();
    ```
    For more information, see [Using Active Directory managed identity authentication](https://learn.microsoft.com/sql/connect/ado-net/sql/azure-active-directory-authentication?view=fabric\&preserve-view=true#using-managed-identity-authentication).

### [Java](#tab/fabricsql-me-id-java)

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

1. Retrieve the SQL database in Microsoft Fabric connection string from the environment variable added by Service Connector.

    ```java
    import java.sql.Connection;
    import java.sql.ResultSet;
    import java.sql.Statement;
    
    import com.microsoft.sqlserver.jdbc.SQLServerDataSource;
    
    public class Main {
        public static void main(String[] args) {
            // FABRIC_SQL_CONNECTIONSTRING should be one of the following:
            // For system-assigned managed identity: "jdbc:sqlserver://<Fabric-SQL-Identifier>.msit-database.fabric.microsoft.com,1433;databaseName=<SQL-DB-name>-<Fabric-DB-Identifier>;authentication=ActiveDirectoryMSI;"
            // For user-assigned managed identity: "jdbc:sqlserver://<Fabric-SQL-Identifier>.msit-database.fabric.microsoft.com,1433;databaseName=<SQL-DB-name>-<Fabric-DB-Identifier>;msiClientId=<msiClientId>;authentication=ActiveDirectoryMSI;"
            String connectionString = System.getenv("FABRIC_SQL_CONNECTIONSTRING");
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

### [Spring Boot](#tab/fabricsql-me-id-springBoot)

For a Spring application, if you create a connection with option `--client-type springboot`, Service Connector sets the environment variable `FABRIC_SQL_CONNECTIONSTRING` with value format `jdbc:sqlserver://<Fabric-SQL-Identifier>.msit-database.fabric.microsoft.com,1433;databaseName=<SQL-DB-name>-<Fabric-DB-Identifier>;authentication=ActiveDirectoryMSI;` to Azure Spring Apps.

For user-assigned managed identities, `msiClientId=<msiClientId>;` is added.

Update your application following the tutorial [Migrate a Java application to use passwordless connections with Azure SQL Database](https://learn.microsoft.com/azure/developer/java/spring-framework/migrate-sql-database-to-passwordless-connection?tabs=spring%2Capp-service%2Cassign-role-service-connector#2-migrate-the-app-code-to-use-passwordless-connections). Remember to remove the `spring.datasource.password` configuration property if it was previously set and add the correct dependencies.

```yaml
spring:
  datasource:
    url: ${FABRIC_SQL_CONNECTIONSTRING}
```

### [Python](#tab/fabricsql-me-id-python)

1. Install dependencies.
    ```bash
    python -m pip install mssql-python python-dotenv
    ```

1. Retrieve the SQL database in Microsoft Fabric connection string from the environment variable added by Service Connector. `Authentication=ActiveDirectoryMSI;` is required in the connection string when connecting using managed identities. `UID=<msiClientId>` is also required in the connection string when connecting using a user-assigned managed identity.

    ```python
    import os
    from mssql_python import connect

    connection_string = os.getenv('FABRIC_SQL_CONNECTIONSTRING')
    
    # System-assigned managed identity connection string format
    # `Server=tcp:<Fabric-SQL-Identifier>.msit-database.fabric.microsoft.com,1433;Database=<SQL-DB-name>-<Fabric-DB-Identifier>;Authentication=ActiveDirectoryMSI;`
    
    # User-assigned managed identity connection string format
    # `Server=tcp:<Fabric-SQL-Identifier>.msit-database.fabric.microsoft.com,1433;Database=<SQL-DB-name>-<Fabric-DB-Identifier>;UID=<msiClientId>;Authentication=ActiveDirectoryMSI;`
    
    conn = connect(connection_string)
    ```

### [Go](#tab/fabricsql-me-id-go)

1. Install dependencies.
    ```bash
    go mod init <YourProjectName>
    go mod tidy
    ```
1. Retrieve the SQL database in Microsoft Fabric connection string from the environment variable added by Service Connector.
    ```golang
    package main

    import (
        "github.com/microsoft/go-mssqldb/azuread"
        "database/sql"
        "context"
        "log"
        "fmt"
        "os"
    )

    var db *sql.DB

    var connectionString = os.Getenv("FABRIC_SQL_CONNECTIONSTRING")

    func main() {
        var err error

        // Create connection pool
        db, err = sql.Open(azuread.DriverName, connectionString)
        if err != nil {
            log.Fatal("Error creating connection pool: ", err.Error())
        }
        ctx := context.Background()
        err = db.PingContext(ctx)
        if err != nil {
            log.Fatal(err.Error())
        }
        fmt.Printf("Connected!\n")
    }
    ```

For more information, see [Use Golang to query a database in Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/connect-query-go).

### [Other](#tab/fabricsql-me-id-none)
For other languages, use the connection string that Service Connector sets to the environment variables to connect the database. For environment variable details, see [Integrate SQL database in Microsoft Fabric with Service Connector](how-to-integrate-fabric-sql.md).

---

For more information, see [Connect to your SQL database in Microsoft Fabric](https://learn.microsoft.com/fabric/database/sql/connect).


## Share access to SQL database in Fabric

1. Complete creating your service connection on the Cloud Shell, or on your local Azure CLI.

1. Once your connection is created, open your compute service resource in the Azure portal, open the Service Connector menu, and locate your SQL database in Fabric service connection. Select **SQL database** to navigate to the Fabric portal.

    Screenshot of the Azure portal, selecting SQL Database link to navigate to the Fabric portal.

1. On the Fabric portal, locate the **Security** tab and select **Manage SQL security**.

    Screenshot of the Fabric portal, selecting Manage SQL Security.

1. Select the role db_ddladmin, then **Manage access**.

    Screenshot of the Fabric portal, selecting the db_ddladmin role, and then clicking Manage access.

1. You should see the name of your system-assigned managed identity, and/or any user-assigned managed identities with a service connection to this SQL database in Fabric. Select **Share database**. If you do not see the **Share database** option, you do not need to continue with the remaining steps.

    Screenshot of the Fabric portal, viewing a list of groups added to the role, and clicking Share database.

1. Enter and select the name of your newly created system-assigned managed identity, and/or any user-assigned managed identities as they appear on the **Manage access** pane. Add any other identities as needed. Select the **Read all data using SQL database** checkbox, then select **Grant**.

    Screenshot of the Fabric portal, typing in the names of any assigned managed identities, selecting Read all data using SQL database, and then clicking Grant.

1. You're now ready to use your new service connection to SQL database in Fabric.

## Next step

Refer to the following article to learn more about Service Connector.

> 
> [Learn about Service Connector concepts](concept-service-connector-internals.md)
