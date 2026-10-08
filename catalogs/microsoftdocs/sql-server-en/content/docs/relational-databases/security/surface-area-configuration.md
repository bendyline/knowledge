---
title: "Surface area configuration"
description: Learn how to change feature defaults for SQL Server installation and selectively enable or disable features of a running instance of SQL Server.
author: VanMSFT
ms.author: vanto
ms.reviewer: randolphwest
ms.date: 02/27/2026
ms.service: sql
ms.subservice: security
ms.topic: how-to
helpviewer_keywords:
  - "reducing attackable surface area"
  - "upgrading SQL Server, security"
  - "surface area configuration [SQL Server]"
  - "surface area configuration [SQL Server], about surface area configuration"
  - "attackable surface area [SQL Server]"
  - "installing SQL Server, security"
---
# Surface area configuration


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

In the default configuration of new installations of  SQL Server 
, many features aren't enabled.  SQL Server 
 selectively installs and starts only key services and features, to minimize the number of features that can be attacked by a malicious user. A system administrator can change these defaults at installation time and also selectively enable or disable features of a running instance of  SQL Server 
. Additionally, some components might not be available when connecting from other computers until protocols are configured.

> **Note:**  
> Unlike new installations, no existing services or features are turned off during an upgrade, but additional surface area configuration options can be applied after the upgrade is completed.

## Protocols, connection, and startup options

Use  SQL Server 
 Configuration Manager to start and stop services, configure the startup options, and enable protocols and other connection options.

#### Start SQL Server Configuration Manager

1. On the **Start** menu, point to **All Programs**, point to   **Microsoft SQL Server**  
, point to **Configuration Tools**, and then select **SQL Server Configuration Manager**.

   - Use the **SQL Server Services** area to start components and configure the automatic starting options.

   - Use the **SQL Server Network Configuration** area to enable connection protocols, and connection options such as fixed TCP/IP ports, or forcing encryption.

For more information, see [SQL Server Configuration Manager](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/sql-server-configuration-manager.md). Remote connectivity can also depend upon the correct configuration of a firewall. For more information, see [Configure the Windows Firewall to Allow SQL Server Access](../../sql-server/install/configure-the-windows-firewall-to-allow-sql-server-access.md).

## Enable and disable features

Enabling and disabling  SQL Server 
 features can be configured using facets in  SQL Server Management Studio 
.

#### Configure surface area using facets

1. In  Management Studio
 connect to a component of  SQL Server 
.

1. In Object Explorer, right-click the server, and then select **Facets**.

1. In the **View Facets** dialog box, expand the **Facet** list, and select the appropriate **Surface Area Configuration** facet (**Surface Area Configuration**, **Surface Area Configuration for Analysis Services**, or **Surface Area Configuration for Reporting Services**).

1. In the **Facet properties** area, select the values that you want for each property.

1. Select **OK**.

To periodically check the configuration of a facet, use Policy-Based Management. For more information about Policy-Based Management, see [Administer Servers by Using Policy-Based Management](../policy-based-management/administer-servers-by-using-policy-based-management.md).

You can also set  Database Engine 
 options using the `sp_configure` stored procedure. For more information, see [Server Configuration Options (SQL Server)](../../database-engine/configure-windows/server-configuration-options-sql-server.md).

To change the **EnableIntegrated Security** property of SSRS
, use the property settings in  SQL Server Management Studio 
. To change the **Schedule events and report delivery** property and the **Web service and HTTP access** property, edit the **RSReportServer.config** configuration file.

## Command-prompt options

Use the **Invoke-PolicyEvaluation**  SQL Server 
 PowerShell cmdlet to invoke Surface Area Configuration Policies. For more information, see [Use the Database Engine cmdlets](https://learn.microsoft.com/powershell/sql-server/sql-server-powershell).

## SOAP and Service Broker endpoints

To turn endpoints off, use Policy-Based Management. To create and alter the properties of endpoints, use [CREATE ENDPOINT (Transact-SQL)](../../t-sql/statements/create-endpoint-transact-sql.md) and [ALTER ENDPOINT (Transact-SQL)](../../t-sql/statements/alter-endpoint-transact-sql.md).

## Related content

- [Security for SQL Server Database Engine and Azure SQL Database](security-center-for-sql-server-database-engine-and-azure-sql-database.md)
- [sys.sp_configure (Transact-SQL)](../system-stored-procedures/sp-configure-transact-sql.md)
