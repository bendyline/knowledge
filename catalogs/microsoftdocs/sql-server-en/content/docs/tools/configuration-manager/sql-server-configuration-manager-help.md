---
title: SQL Server Configuration Manager Help
description: Get acquainted with SQL Server Configuration Manager. Learn how to use it to manage SQL Server services and configure network connectivity.
author: rwestMSFT
ms.author: randolphwest
ms.date: 03/16/2026
ms.service: sql
ms.subservice: tools-other
ms.topic: concept-article
ms.collection:
  - data-tools
helpviewer_keywords:
  - "SQL Server Configuration Manager, help"
monikerRange: ">=sql-server-2017"
---

# SQL Server Configuration Manager help


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows


Use  SQL Server 
 Configuration Manager to configure  SQL Server 
 services and configure network connectivity.

To create or manage database objects, configure security, and write  Transact-SQL  queries, use  SQL Server Management Studio 
. For more information, see [What is SQL Server Management Studio (SSMS)?](https://learn.microsoft.com/ssms/sql-server-management-studio-ssms)

> **Tip:**  
> If you need to configure  SQL Server 
 on Linux, use the **mssql-conf** tool. For more information, see [Configure SQL Server on Linux with the mssql-conf tool](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-configure-mssql-conf.md).

This section contains the F1 Help articles for the dialogs in  SQL Server 
 Configuration Manager.

> **Note:**  
>  SQL Server 
 Configuration Manager can't configure versions of  SQL Server 
 earlier than  SQL Server 2005 (9.x) 
.

## Services

 SQL Server 
 Configuration Manager manages services that are related to  SQL Server 
. Although many of these tasks can be accomplished using the Windows Services dialog, is important to note that  SQL Server 
 Configuration Manager performs additional operations on the services it manages, such as applying the correct permissions when the service account is changed. Using the normal Windows Services dialog to configure any of the  SQL Server 
 services might cause the service to malfunction.

Use  SQL Server 
 Configuration Manager for the following tasks for services:

- Start, stop, and pause services
- Configure services to start automatically or manually, disable the services, or change other service settings
- Change the passwords for the accounts used by the  SQL Server 
 services
- Start  SQL Server 
 using trace flags (command line parameters)
- View the properties of services

## SQL Server network configuration

Use  SQL Server 
 Configuration Manager for the following tasks related to the  SQL Server 
 services on this computer:

- Enable or disable a  SQL Server 
 network protocol
- Configure a  SQL Server 
 network protocol

> **Note:**  
> For a short tutorial about how to configure protocols and connect to the  SQL Server Database Engine 
, see [Tutorial: Get started with the Database Engine](../../relational-databases/tutorial-getting-started-with-the-database-engine.md).

## SQL Server Native Client configuration

> **Important:**  
> [SQL Server Native Client](../../relational-databases/native-client/sql-server-native-client.md) (SNAC) isn't shipped with:

-  SQL Server 2022 (16.x) 
 and later versions
-  SQL Server Management Studio 
 19 and later versions

The SQL Server Native Client (SQLNCLI or SQLNCLI11) and the legacy Microsoft OLE DB Provider for SQL Server (SQLOLEDB) aren't recommended for new application development.

For new projects, use one of the following drivers:

- [Microsoft ODBC Driver for SQL Server](../../connect/odbc/microsoft-odbc-driver-for-sql-server.md)
- [Microsoft OLE DB Driver for SQL Server](../../connect/oledb/oledb-driver-for-sql-server.md)

For SQLNCLI that ships as a component of  SQL Server Database Engine 
 (versions 2012 through 2019), see this [Support Lifecycle exception](../../relational-databases/native-client/applications/support-policies-for-sql-server-native-client.md#support-lifecycle-exception).


 SQL Server 
 clients connect to  SQL Server 
 by using the  SQL Server 
 Native Client network library. Use  SQL Server 
 Configuration Manager for the following tasks related to client applications on this computer:

- For  SQL Server 
 client applications on this computer, specify the protocol order, when connecting to instances of  SQL Server 
.

- Configure client connection protocols.

- For  SQL Server 
 client applications, create aliases for instances of  SQL Server 
, so that clients can connect using a custom connection string.

For more information about each of these tasks, see F1 help for each task.

## Open SQL Server Configuration Manager

Because SQL Server Configuration Manager is a snap-in for the  Microsoft 
 Management Console program and not a stand-alone program, SQL Server Configuration Manager might not appear as an application in newer versions of Windows.

From the Windows **Start** menu, type `SQLServerManager17.msc` (for  SQL Server 2025 (17.x) 
). For other versions of  SQL Server 
, replace `17` with the appropriate number. Selecting `SQLServerManager17.msc` opens SQL Server Configuration Manager.

You can pin SQL Server Configuration Manager to the Start menu or taskbar when you right-click `SQLServerManager17.msc`, and then select **Open file location**. In File Explorer, right-click `SQLServerManager17.msc`, and then select **Pin to Start** or **Pin to taskbar**.


## Related content

- [SQL Server Services](sql-server-services.md)
- [SQL Server Configuration Manager help](sql-server-configuration-manager-help.md)
- [SQL Native Client 11.0 Configuration](sql-native-client-11-0-configuration.md)
- [Choosing a Network Protocol](https://learn.microsoft.com/previous-versions/sql/sql-server-2016/ms187892\(v=sql.130\))
