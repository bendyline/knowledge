---
title: "Use Visual Studio with .NET and C# to Query"
titleSuffix: Azure SQL Database & Azure SQL Managed Instance
description: "Use Visual Studio to create a C# app that connects to a database in Azure SQL Database or Azure SQL Managed Instance and runs queries."
author: dzsquared
ms.author: drskwier
ms.reviewer: wiassaf, mathoma, randolphwest
ms.date: 01/14/2025
ms.service: azure-sql
ms.subservice: connect
ms.topic: quickstart
ms.custom:
  - devx-track-csharp
  - sqldbrb=2
  - mode-ui
ms.devlang: csharp
monikerRange: "=azuresql || =azuresql-db || =azuresql-mi"
---
# Quickstart: Connect to and query a database with .NET and C# in Visual Studio



  **Applies to:**    [Azure SQL Database](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)  [Azure SQL Managed Instance](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)    [Azure Synapse Analytics](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

This quickstart shows how to use the [.NET](https://dotnet.microsoft.com) and C# code in Visual Studio to query a database in Azure SQL or Synapse SQL with Transact-SQL statements.

## Prerequisites

To complete this quickstart, you need:

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [Visual Studio 2022](https://www.visualstudio.com/downloads/) Community, Professional, or Enterprise edition.
- A database where you can run a query.

  
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

## Create code to query the database in Azure SQL Database

1. In Visual Studio, create a new project.

1. In the **New Project** dialog, select the **C# Console App**.

1. Enter *sqltest* for the project name, and then select **Next**.

1. Select a *(Long-term support)* Framework option, such as *.NET 8.0*, and then select **Create**. The new project is created.

1. Select **Project** > **Manage NuGet Packages**.

1. In **NuGet Package Manager**, select the **Browse** tab, then search for and select **Microsoft.Data.SqlClient**.

1. On the **Microsoft.Data.SqlClient** page, select **Install**.
   - If prompted, select **OK** to continue with the installation.
   - If a **License Acceptance** window appears, select **I Accept**.

1. When the install completes, you can close **NuGet Package Manager**.

1. In the code editor, replace the **Program.cs** contents with the following code. Replace your values for `<your_server>`, `<your_username>`, `<password>`, and `<your_database>`.

   ```csharp
   using System;
   using Microsoft.Data.SqlClient;
   using System.Text;

   namespace sqltest
   {
       class Program
       {
           static void Main(string[] args)
           {
               try
               {
                   SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder();
                   builder.DataSource = "<your_server>.database.windows.net";
                   builder.UserID = "<your_username>";
                   builder.Password = "<password>";
                   builder.InitialCatalog = "<your_database>";

                   using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
                   {
                       Console.WriteLine("\nQuery data example:");
                       Console.WriteLine("=========================================\n");

                       String sql = "SELECT name, collation_name FROM sys.databases";

                       using (SqlCommand command = new SqlCommand(sql, connection))
                       {
                           connection.Open();
                           using (SqlDataReader reader = command.ExecuteReader())
                           {
                               while (reader.Read())
                               {
                                   Console.WriteLine("{0} {1}", reader.GetString(0), reader.GetString(1));
                               }
                           }
                       }
                   }
               }
               catch (SqlException e)
               {
                   Console.WriteLine(e.ToString());
               }
               Console.ReadLine();
           }
       }
   }
   ```

## Run the code

1. To run the app, select **Debug** > **Start Debugging**, or select **Start** on the toolbar, or press **F5**.
1. Verify that the database names and collations are returned, and then close the app window.

## Related content

- [Quickstart: Use .NET (C#) to query a database](connect-query-dotnet-core.md)
- [Getting started with .NET on Windows/Linux/macOS using VS Code](https://learn.microsoft.com/dotnet/core/tutorials/with-visual-studio-code)
- [Developing with .NET and SQL](https://learn.microsoft.com/sql/connect/ado-net/sql)
- [Tutorial: Design a relational database in Azure SQL Database](design-first-database-tutorial.md)
- [.NET documentation](https://learn.microsoft.com/dotnet/)
- [Connect resiliently to Azure SQL with ADO.NET](https://learn.microsoft.com/sql/connect/ado-net/step-4-connect-resiliently-sql-ado-net)
