---
title: Connect to the SQL Server Database Engine
description: Learn how to connect to the Database Engine used by SQL Server and Azure SQL services
author: rwestMSFT
ms.author: randolphwest
ms.date: 09/21/2026
ms.service: sql
ms.subservice: connectivity
ms.topic: how-to
---

# Connect to the Database Engine

This article provides a high level overview for connecting to the  SQL Server Database Engine 
, used by the following products and services:

-  SQL Server 

-  Azure SQL Database 

- Azure SQL Managed Instance
-  Azure Synapse Analytics 
- SQL database in Microsoft Fabric

- [SQL analytics endpoint
and Warehouse
in Microsoft Fabric
](sql-docs-navigation-guide.md#applies-to)


## Prerequisites

You connect to the  Database Engine 
 using a *client tool* or *client library*. Client tools run in a graphical user interface (GUI), or a command-line interface (CLI).

The following table describes some of the more common client tools.

| Client tool | Type | Operating system |
| --- | --- | --- |
| **[SQL Server Management Studio (SSMS)](https://learn.microsoft.com/ssms/sql-server-management-studio-ssms)** | GUI | Windows |
| **[MSSQL extension for Visual Studio Code](../tools/visual-studio-code-extensions/mssql/mssql-extension-visual-studio-code.md)** | GUI | Windows, macOS, Linux |
| **[sqlcmd](../tools/sqlcmd/sqlcmd-utility.md)** | CLI | Windows, macOS, Linux |
| **[bcp](../tools/bcp/bcp-utility.md)** | CLI | Windows, macOS, Linux |

> **Note:**  
> Client tools include at least one client library. For more information, see [Microsoft SQL drivers and frameworks](../connect/sql-connection-libraries.md).

## Connection options

When you connect to the  Database Engine 
, you must provide an *instance* name (that is, the server or instance where the  Database Engine 
 is installed), a network *protocol*, and a connection *port*, in the following format:

```text
[<protocol>:]<instance>[,<port>]
```

The protocol and port are optional because they have default values. Depending on the client tool and client library, they can be skipped.

> **Note:**  
> If you use a custom TCP port for connecting to the  Database Engine 
, you must separate it with a comma (`,`), because the colon (`:`) is used to specify the protocol.

| Setting | Values | Default | Details |
| --- | --- | --- | --- |
| **Protocol** | `tcp` (TCP/IP), `np` (named pipes), or `lpc` (shared memory). | `np` is the default when connecting to  SQL Server |
| .<br /><br />`tcp` is the default when connecting to Azure SQL services. | **Protocol** is optional, and is frequently excluded when connecting to  SQL Server |
 | on the same computer as the client tool.<br /><br />For more information, see [Network protocol considerations](#network-protocol-considerations) in the next section. |
| **Instance** | The name of the server or instance. For example, `MyServer` or `MyServer\MyInstance`. | `localhost` | If the  Database Engine |
 | is located on the same computer as the client tool, you might be able to connect using `localhost`, `127.0.0.1`, or even `.` (a single period).<br /><br />If you're connecting to a named instance, you must specify the server name and the instance name, separated by a slash. For example, `MyServer\MyInstance`. A named instance on the local machine is specified by `.\MyInstance`.  SQL Server Express |
 | uses `MyServer\SQLEXPRESS`. |
| **Port** | Any TCP port. | `1433` | The default TCP port for connecting to the default instance of  SQL Server |
 | is `1433`. However, your infrastructure team might configure custom ports.<br /><br /> SQL Server |
 | on Windows, including  SQL Server Express |
 | edition, can be configured as a named instance and might also have a custom port.<br /><br />For connecting to Azure SQL services, see the [Connect to Azure SQL](#connect-to-azure-sql) section.<br /><br />For more information about custom ports with  SQL Server |
| , see [SQL Server Configuration Manager](../tools/configuration-manager/sql-server-configuration-manager.md). |

## Network protocol considerations

For  SQL Server 
 on Windows, when you connect to an instance on the same machine as the client tool, and depending on which edition is installed, the default protocol can be configured with multiple protocols, including named pipes (`np`), TCP/IP (`tcp`), and shared memory (`lpc`). Use the shared memory protocol for troubleshooting when you suspect the other protocols are configured incorrectly.

If you connect to  SQL Server 
 over a TCP/IP network, make sure that TCP/IP is enabled on the server as well. TCP/IP might be disabled by default on installations of  SQL Server 
. For more information, see [Default SQL Server Network Protocol Configuration](../database-engine/configure-windows/default-sql-server-network-protocol-configuration.md#default-configuration).

Connections to Azure SQL services,  SQL Server 
 on Linux, and  SQL Server 
 in containers, all use TCP/IP.

For both  Azure SQL Database 
 and Azure SQL Managed Instance, see [Azure SQL Database and Azure SQL Managed Instance connect and query articles](https://learn.microsoft.com/azure/azure-sql/database/connect-query-content-reference-guide).

## Connect to Azure SQL

This section provides information on connecting to Azure SQL services.

### [Azure SQL Database](#tab/sqldb)

To quickly connect to and query an  Azure SQL Database 
 from the Azure portal, use the [Azure portal Query editor for Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/query-editor?view=azuresql-db\&preserve-view=true).

For external connections, be aware of the secure-by-default [Azure SQL Database database-level firewall](https://learn.microsoft.com/azure/azure-sql/database/firewall-configure?view=azuresql-db\&preserve-view=true).

Examples for application connections are available:

- [Use .NET and the Microsoft.Data.SqlClient library](https://learn.microsoft.com/azure/azure-sql/database/azure-sql-dotnet-quickstart?view=azuresql-db\&preserve-view=true)
- [Use .NET and EF Core](https://learn.microsoft.com/azure/azure-sql/database/azure-sql-dotnet-entity-framework-core-quickstart?view=azuresql-db\&preserve-view=true)
- [Use Python with mssql-python](https://learn.microsoft.com/azure/azure-sql/database/azure-sql-python-quickstart?view=azuresql-db\&preserve-view=true)
- [Use Node.js with mssql](https://learn.microsoft.com/azure/azure-sql/database/azure-sql-javascript-mssql-quickstart?view=azuresql-db\&preserve-view=true)

### [Azure SQL Managed Instance](#tab/sqlmi)

Connect to an Azure SQL Managed Instance in the same ways you connect to a SQL Server instance. For more information, see [Connect your application to Azure SQL Managed Instance](https://learn.microsoft.com/azure/azure-sql/managed-instance/connect-application-instance?view=azuresql-mi\&preserve-view=true).

You can also [configure a point-to-site connection to Azure SQL Managed Instance from on-premises](https://learn.microsoft.com/azure/azure-sql/managed-instance/point-to-site-p2s-configure?view=azuresql-mi\&preserve-view=true) or [connect to Azure SQL Managed Instance from an Azure VM](https://learn.microsoft.com/azure/azure-sql/managed-instance/connect-vm-instance-configure?view=azuresql-mi\&preserve-view=true).

Azure SQL Managed Instance can enforce a minimum [Transport Layer Security (TLS)](https://learn.microsoft.com/troubleshoot/sql/database-engine/connect/tls-1-2-support-microsoft-sql-server) version for application connections. For more information, see [Configure minimal TLS version in Azure SQL Managed Instance](https://learn.microsoft.com/azure/azure-sql/managed-instance/minimal-tls-version-configure?view=azuresql-mi\&preserve-view=true).

### [SQL Server on Azure VM](#tab/sqlvm)

Connect to the **Public IP address** of the VM. For an example, see [Connect to SQL Server on a Windows virtual machine in the Azure portal](https://learn.microsoft.com/azure/azure-sql/virtual-machines/windows/sql-vm-create-portal-quickstart#connect-to-sql-server).

---

## Connect to SQL Server

This section provides information on connecting to  SQL Server 
.

### Connect to SQL Server on the same machine as the client

You can connect to the local machine using named pipes (`np`), shared memory (`lpc`), or TCP/IP (`tcp`). Shared memory is the fastest, because it doesn't use the network interface.

> **Note:**  
> If you use an IP address for your instance name and don't specify `tcp`, the protocol defaults to `np` (named pipes) if it's a configured protocol.

A named instance has a dynamically assigned TCP port. If you want to connect to a named instance, the  SQL Server 
 Browser service must be running on the server.

#### Connect to a default SQL Server instance on the same machine

1. If you're connecting to a server configured with default settings, use one of the following options:

   - `localhost`
   - `127.0.0.1`
   - `.` (a single period)

1. If you're connecting to a custom TCP port, such as `51433`, use one of the following options:

   - `tcp:localhost,51433`
   - `127.0.0.1,51433`

#### Connect to a SQL Server named instance on the same machine

In this example, the named instance is called `MyInstance`. Make sure the  SQL Server 
 Browser service is running, and use one of the following options:

- `localhost\MyInstance`
- `127.0.0.1\MyInstance`
- `.\MyInstance`

### Connect to SQL Server on the network

You can connect using a server name or an IP address. In this example, the server name `MyServer` resolves to `192.10.1.128`.

#### Connect to a default SQL Server instance on the network, using named pipes

To connect to a server on the local network with named pipes, use one of the following options:

- `MyServer`
- `np:MyServer`

> **Note:**  
> On a local area network, connecting with TCP/IP might be faster than with named pipes.

#### Connect to a default SQL Server instance on the network, using TCP/IP

1. If you're connecting to a server configured with default TCP port `1433`, use one of the following options:

   - `tcp:MyServer`
   - `tcp:192.10.1.128`

1. If you're connecting to a server configured with a custom TCP port, such as `51433`, use one of the following options:

   - `MyServer,51433`
   - `tcp:MyServer,51433`
   - `192.10.1.128,51433`
   - `tcp:192.10.1.128,51433`

#### Connect to a SQL Server named instance on the network, using TCP/IP

In this example, the named instance is called `MyInstance`. Make sure the  SQL Server 
 Browser service is running on the server, and use one of the following options:

- `tcp:MyServer\MyInstance`
- `tcp:192.10.1.128\MyInstance`

#### Connect to data in Microsoft Fabric

You can connect to Fabric Data Warehouse and SQL database in Fabric in much the same way you connect to an Azure SQL Database.

For complete details, see:

- [Connect to Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse/how-to-connect)
- [Connect to your SQL database in Microsoft Fabric](https://learn.microsoft.com/fabric/database/sql/connect)

<a id="tsql"></a>

## Run a Transact-SQL query

Once you connect successfully to the  Database Engine 
 using a client tool, you can execute a  Transact-SQL  (T-SQL) query or script.

> **Tip:**  
> In SQL Server Management Studio and Visual Studio Code, paste or type the query into a new query window.

For more information about running T-SQL queries in client tools, see:

- [SQL Server Management Studio (SSMS)](https://learn.microsoft.com/ssms/quickstarts/ssms-connect-query-sql-server)
- [Quickstart: Run your first query with the MSSQL extension for Visual Studio Code](../tools/visual-studio-code-extensions/mssql/mssql-run-first-query.md)
- [sqlcmd utility](../tools/sqlcmd/sqlcmd-run-transact-sql-script-files.md)
- [Azure portal query editor for Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/query-editor)
- [Query with the SQL query editor](https://learn.microsoft.com/fabric/database/sql/query-editor)

> **Note:**  
> Some tools require a *batch separator* to know that a query is ready to be executed. For example, you might need to put the `GO` separator at the end of a T-SQL query in **sqlcmd** to make sure that the T-SQL query runs.

## Get help

- [Aliases (SQL Server Configuration Manager)](../tools/configuration-manager/aliases-sql-server-configuration-manager.md)
- [Troubleshoot connectivity issues in SQL Server](https://learn.microsoft.com/troubleshoot/sql/database-engine/connect/resolve-connectivity-errors-overview)
- [Trace the network authentication process to the Database Engine](../relational-databases/database-engine-connection-open-network-trace.md)

## Related content

- [Sign in to SQL Server](../database-engine/configure-windows/logging-in-to-sql-server.md)
- [What is SQL Server Management Studio (SSMS)?](https://learn.microsoft.com/ssms/sql-server-management-studio-ssms)
- [MSSQL extension for Visual Studio Code](../tools/visual-studio-code-extensions/mssql/mssql-extension-visual-studio-code.md)
- [Configure Database Engine instances (SQL Server)](../database-engine/configure-windows/configure-database-engine-instances-sql-server.md)
- [sqlcmd utility](../tools/sqlcmd/sqlcmd-utility.md)
