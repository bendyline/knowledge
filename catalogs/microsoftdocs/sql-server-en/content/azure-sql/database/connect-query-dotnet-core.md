---
title: Use .NET to connect and query a database on Windows, Linux, or macOS
titleSuffix: Azure SQL Database & SQL Managed Instance
description: This article shows you how to use .NET to create a program that connects to a database in Azure SQL Database, or Azure SQL Managed Instance, and queries it using Transact-SQL statements.
author: dzsquared
ms.author: drskwier
ms.reviewer: wiassaf, mathoma, maghan
ms.date: 09/19/2024
ms.service: azure-sql
ms.subservice: connect
ms.topic: quickstart
ms.custom:
  - sqldbrb=2
  - devx-track-csharp
  - mode-other
  - linux-related-content
ms.devlang: csharp
monikerRange: "=azuresql||=azuresql-db||=azuresql-mi"
---

# Quickstart: Use .NET (C#) to query a database



  **Applies to:**    [Azure SQL Database](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)  [Azure SQL Managed Instance](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)    [Azure Synapse Analytics](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

In this quickstart, you'll use [.NET](https://dotnet.microsoft.com) and C# code to connect to a database. You'll then run a Transact-SQL statement to query data. This quickstart is applicable to Windows, Linux, and macOS and leverages the unified .NET platform.

> **Tip:**
> This free Learn module shows you how to [Develop and configure an ASP.NET application that queries a database in Azure SQL Database](https://learn.microsoft.com/training/modules/develop-app-that-queries-azure-sql/)

## Prerequisites

To complete this quickstart, you need:

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [.NET SDK for your operating system](https://dotnet.microsoft.com/download) installed.
- A database where you can run your query.

  
  You can use one of these quickstarts to create and then configure a database:

  | Action | SQL Database | SQL Managed Instance | SQL Server on Azure VM | Azure Synapse Analytics |
  | :--- | :--- | :--- | :--- | :--- |
  | Create | [Portal](single-database-create-quickstart.md) | [Portal](../managed-instance/instance-create-quickstart.md) | [Portal](../virtual-machines/windows/sql-vm-create-portal-quickstart.md) | [Portal](https://learn.microsoft.com/azure/synapse-analytics/quickstart-create-workspace) |
  |  | [CLI](scripts/create-and-configure-database-cli.md) |  |  | [CLI](https://learn.microsoft.com/azure/synapse-analytics/quickstart-create-workspace-cli) |
  |  | [PowerShell](scripts/create-and-configure-database-powershell.md) | [PowerShell](../managed-instance/scripts/create-configure-managed-instance-powershell.md) | [PowerShell](../virtual-machines/windows/sql-vm-create-powershell-quickstart.md) | [PowerShell](https://learn.microsoft.com/azure/synapse-analytics/quickstart-create-workspace-powershell) |
  |  | [Deployment template](single-database-create-arm-template-quickstart.md) | [Deployment template](arm-templates-content-guide.md?tabs=managed-instance) | [Deployment template](../virtual-machines/windows/create-sql-vm-resource-manager-template.md) | [Deployment template](https://learn.microsoft.com/azure/synapse-analytics/quickstart-deployment-template-workspaces) |
  | Configure | [Server-level IP firewall rule](firewall-create-server-level-portal-quickstart.md) | [Connectivity from a VM](../managed-instance/connect-vm-instance-configure.md) |  | [Connectivity settings](https://learn.microsoft.com/azure/synapse-analytics/security/connectivity-settings) |
  |  |  | [Connectivity from on-premises](../managed-instance/point-to-site-p2s-configure.md) | [Connect to a SQL Server instance](../virtual-machines/windows/sql-vm-create-portal-quickstart.md) |
  | Get connection information | [Azure SQL](connect-query-content-reference-guide.md#get-server-connection-information) | [Azure SQL](connect-query-content-reference-guide.md#get-server-connection-information) | [SQL VM](../virtual-machines/windows/sql-vm-create-portal-quickstart.md?#connect-to-sql-server) | [Synapse SQL](https://learn.microsoft.com/azure/synapse-analytics/sql/connect-overview#find-your-server-name) |

## Create a new .NET project

1. Open a command prompt and create a folder named **sqltest**. Navigate to this folder and run this command.

    ```bash
    dotnet new console
    ```

    This command creates new app project files, including an initial C# code file (**Program.cs**), an XML configuration file (**sqltest.csproj**), and needed binaries.

1. At the command prompt used above, run this command.

    ```bash
    dotnet add package Microsoft.Data.SqlClient
    ```

    This command adds the `Microsoft.Data.SqlClient` package to the project.

## Insert code to query the database in Azure SQL Database

1. In a text editor such as [Visual Studio Code](https://code.visualstudio.com/), open **Program.cs**.

1. Replace the contents with the following code and add the appropriate values for your server, database, username, and password.

> **Note:**  
> To use an ADO.NET connection string, replace the 4 lines in the code
> setting the server, database, username, and password with the line below. In
> the string, set your username and password.
>
> `builder.ConnectionString="<connection-string>";`

```csharp
using Microsoft.Data.SqlClient;
using System;
using System.Threading.Tasks;

namespace sqltest
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var builder = new SqlConnectionStringBuilder
            {
                DataSource = "<your_server.database.windows.net>",
                UserID = "<your_username>",
                Password = "<password>",
                InitialCatalog = "<your_database>"
            };

            var connectionString = builder.ConnectionString;

            try
            {
                await using var connection = new SqlConnection(connectionString);
                Console.WriteLine("\nQuery data example:");
                Console.WriteLine("=========================================\n");

                await connection.OpenAsync();

                var sql = "SELECT name, collation_name FROM sys.databases";
                await using var command = new SqlCommand(sql, connection);
                await using var reader = await command.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    Console.WriteLine("{0} {1}", reader.GetString(0), reader.GetString(1));
                }
            }
            catch (SqlException e) when (e.Number == /* specific error number */)
            {
                Console.WriteLine($"SQL Error: {e.Message}");
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }

            Console.WriteLine("\nDone. Press enter.");
            Console.ReadLine();
        }
    }
}
```

Remember to replace `<your_server.database.windows.net>`, `<your_username>`, `<password>`, and `<your_database>` with your actual SQL Server details. Also, replace `/* specific error number */` with the actual SQL error number you want to handle.

## Run the code

1. At the prompt, run the following commands.

   ```bash
   dotnet restore
   dotnet run
   ```

1. Verify that the rows are returned, your output might include other values.

   ```output
   Query data example:
   =========================================

   master    SQL_Latin1_General_CP1_CI_AS
   tempdb    SQL_Latin1_General_CP1_CI_AS
   WideWorldImporters    Latin1_General_100_CI_AS

   Done. Press enter.
   ```

1. Choose **Enter** to close the application window.

## Related content

- [Tutorial: Create a .NET console application using Visual Studio Code](https://learn.microsoft.com/dotnet/core/tutorials/with-visual-studio-code)
- [SQL Server and ADO.NET](https://learn.microsoft.com/sql/connect/ado-net/sql)
- [Quickstart: Connect to and query a database with .NET and C# in Visual Studio](connect-query-dotnet-visual-studio.md)
- [Tutorial: Design a relational database in Azure SQL Database](design-first-database-tutorial.md)
- [.NET documentation](https://learn.microsoft.com/dotnet/)
