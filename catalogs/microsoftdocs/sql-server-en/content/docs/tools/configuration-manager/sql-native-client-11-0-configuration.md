---
title: "SQL Native Client 11.0 Configuration"
description: Find out about the settings that are configured in the SQL Server Native Client Configuration dialog boxes in Microsoft SQL Server Configuration Manager.
author: rwestMSFT
ms.author: randolphwest
ms.date: 12/15/2025
ms.service: sql
ms.subservice: tools-other
ms.topic: concept-article
ms.collection:
  - data-tools
helpviewer_keywords:
  - "client configuration [SQL Server], SQL Server Native Client"
monikerRange: ">=sql-server-2017"
---
# SQL Native Client 11.0 Configuration


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows


This section contains the F1 Help articles for the **SQL Server Native Client Configuration** dialogs in  SQL Server 
 Configuration Manager.  SQL Server 
 Native Client is the network library that client computers use to connect to  SQL Server 
, starting with  SQL Server 
.

The settings configured in  SQL Server 
 Native Client Configuration are used on the computer running the client program. When configured on the computer running  SQL Server 
, they affect only those client programs running on the server.

These settings don't affect clients connecting to previous versions of  SQL Server 
, unless they are using the client tools starting with  SQL Server 
, such as  SQL Server Management Studio 
.

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


## In this section

- [SQL Server Native Client Configuration Properties (Flags Tab)](sql-server-native-client-configuration-properties-flags-tab.md)
- [Client Protocols (SQL Server Configuration Manager)](client-protocols-sql-server-configuration-manager.md)
- [Aliases (SQL Server Configuration Manager)](aliases-sql-server-configuration-manager.md)
