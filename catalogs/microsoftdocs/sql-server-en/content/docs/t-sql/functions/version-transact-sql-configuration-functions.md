---
title: "@@VERSION (Transact-SQL)"
description: Returns SQL Server installation system and build information.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: maghan, randolphwest
ms.date: 11/25/2025
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "@@VERSION"
  - "@@VERSION_TSQL"
  - "sql13.swb.tsqlquery.f1"
helpviewer_keywords:
  - "@@VERSION function"
  - "current SQL Server installation information"
  - "versions [SQL Server], @@VERSION"
  - "processors [SQL Server], types"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---

# @@VERSION (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



The `@@VERSION` configuration function returns information about the system and  SQL Server 
 build information.



> **Important:**  
> The  Database Engine 
 version numbers for  SQL Server 
 and  Azure SQL Database 
 aren't comparable with each other, and represent internal build numbers for these separate products. For more information, see the [Remarks](#remarks) section.

## Syntax

```syntaxsql
@@VERSION
```

## Return types

**nvarchar**

## Remarks

- The  Database Engine 
 version numbers for  SQL Server 
 and  Azure SQL Database 
 aren't comparable with each other, and represent internal build numbers for these separate products. The  Database Engine 
 for  Azure SQL Database 
 is based on the same code base as the  SQL Server Database Engine 
. Most importantly, the  Database Engine 
 in  Azure SQL Database 
 always has the newest SQL  Database Engine 
 bits. For example, version 12 of  Azure SQL Database 
 is newer than version 16 of  SQL Server 
.

- The `@@VERSION` results appear as one **nvarchar** string. Use the [SERVERPROPERTY](serverproperty-transact-sql.md) function to get the individual property values.

- For  SQL Server 
, the `@@VERSION` results include:

  -  SQL Server 
 version
  - Processor architecture
  -  SQL Server 
 build date
  - Copyright statement
  -  SQL Server 
 edition
  - Operating system version

    The operating system version information comes from the host, virtual machine, or container where  SQL Server 
 is installed. It doesn't necessarily reflect the retail version of the underlying operating system. For information about querying Windows version information using the [WMI Query Language (WQL)](https://learn.microsoft.com/windows/win32/wmisdk/wql-sql-for-wmi), see [Win32_OperatingSystem class](https://learn.microsoft.com/windows/win32/cimwin32prov/win32-operatingsystem).

- For  Azure SQL Database 
 and Azure SQL Managed Instance, the `@@VERSION` results include:

  - Edition: "Microsoft SQL Azure"

  - Product level: "(RTM)"

  - Product version

  - Build date

  - Copyright statement

## Examples

### A: Return the current version of SQL Server

The following example shows the version information for an installation of  SQL Server 2025 (17.x) 
. Depending on the underlying host, virtual machine, or container operating system, the command returns different information.

```sql
SELECT @@VERSION AS 'SQL Server Version';
```

- Windows Server 2019 virtual machine:

  ```output
  Microsoft SQL Server 2025 (RTM) - 17.0.1000.7 (X64)
  Oct 21 2025 12:05:57
  Copyright (C) 2025 Microsoft Corporation
  Enterprise Developer Edition (64-bit) on Windows Server 2019 Standard 10.0 <X64> (Build 17763: ) (Hypervisor)
  ```

- Windows 11 virtual machine:

  ```output
  Microsoft SQL Server 2025 (RTM) - 17.0.1000.7 (X64)
  Oct 21 2025 12:05:57
  Copyright (C) 2025 Microsoft Corporation
  Enterprise Developer Edition (64-bit) on Windows 10 Enterprise 10.0 <X64> (Build 26220: ) (VM)
  ```

  In this example, the output doesn't necessarily reflect the retail version of the operating system.

- Ubuntu Linux 24.04:

  ```output
  Microsoft SQL Server 2025 (RTM) - 17.0.1000.7 (X64)
  Oct 21 2025 12:05:57
  Copyright (C) 2025 Microsoft Corporation
  Enterprise Developer Edition (64-bit) on Linux (Ubuntu 24.04.3 LTS) <X64>
  ```

## Examples: Azure Synapse Analytics

### B. Return the current version of Azure Synapse Analytics

```sql
SELECT @@VERSION AS 'Azure Synapse Analytics Version';
```

## Related content

- [SERVERPROPERTY (Transact-SQL)](serverproperty-transact-sql.md)
