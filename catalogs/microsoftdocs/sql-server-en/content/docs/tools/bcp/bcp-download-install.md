---
title: Download and Install the bcp Utility
description: Learn how to download and install the bulk copy program (bcp) utility on Windows, Linux, and macOS.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: mahyon
ms.date: 06/30/2026
ms.service: sql
ms.subservice: tools-other
ms.topic: how-to
ms.collection:
  - data-tools
ms.custom:
  - linux-related-content
  - peer-review-program
helpviewer_keywords:
  - "bcp utility [SQL Server], download"
  - "bcp utility [SQL Server], install"
  - "command prompt utilities [SQL Server], bcp"
  - "Microsoft Command Line Utilities for SQL Server"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =fabric-sqldb || =fabric"
---
# Download and install the bcp utility


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



The [bulk copy program utility (bcp)](bcp-utility.md) bulk copies data between an instance of  SQL Server 
 and a data file in a user-specified format.

- For information about authentication when connecting **`bcp`** to Azure SQL Database, see [Authenticate with Microsoft Entra ID in bcp](bcp-authentication.md).
- For detailed information about using **`bcp`** with Azure Synapse Analytics, see [Load data with bcp](https://learn.microsoft.com/azure/sql-data-warehouse/sql-data-warehouse-load-with-bcp).
- **`bcp`** is currently in preview in Warehouse
 in Microsoft Fabric
.
- **`bcp`** can't import data in SQL analytics endpoint
 in Microsoft Fabric
.

## Identify installed version

To determine the installed version of **`bcp`**, run the following command:

```console
bcp -v
```

If multiple versions of **`bcp`** are installed on Windows, the `PATH` environment variable determines which one runs. To list every copy of `bcp.exe` on the search path, use the following command:

```console
where bcp.exe
```

For information about how to set the command path in the `PATH` environment variable, see [Environment variables](https://learn.microsoft.com/windows/win32/shell/user-environment-variables).

## bcp versioning

The **`bcp`** utility is versioned independently of the  SQL Server 
 release it ships with:

| `bcp` major version | Distribution |
| --- | --- |
| `18` | Ships with  SQL Server 2025 (17.x) |
| . Adds `-Y` (TLS encryption mode) and `-u` (trust server certificate) switches. |
| `15` | Distributed as Microsoft Command Line Utilities 15 for SQL Server, and bundled with  SQL Server 2019 (15.x) |
 | and  SQL Server 2022 (16.x) |
 | tools. |

## Download the latest version

The following instructions are for **`bcp`** running on Windows. For instructions on installing **`bcp`** on Linux and macOS, as well as system requirements, see [Install the sqlcmd and bcp SQL Server command-line tools on Linux](../../linux/install-upgrade/setup-tools.md).

| Package | Platform |
| --- | --- |
| Microsoft Command Line Utilities for SQL Server | [x64](https://go.microsoft.com/fwlink/?linkid=2370127)&emsp;[x86](https://go.microsoft.com/fwlink/?linkid=2370024) |

The Microsoft Command Line Utilities package contains both **`bcp`** and **`sqlcmd`** (ODBC). It also installs (or requires) the [Microsoft ODBC Driver for SQL Server](../../connect/odbc/download-odbc-driver-for-sql-server.md).

> **Note:**  
> The standalone **`bcp`** download might not have the same release and build number as the **`bcp`** that ships with the latest  SQL Server 
 cumulative update (CU). This behavior is expected. The standalone download still contains all fixes included in the latest CU.

## System requirements

The following system requirements are for **`bcp`** running on Windows.

- Windows 10 and later versions
- Windows Server 2016 and later versions
- [Microsoft ODBC Driver for SQL Server](../../connect/odbc/download-odbc-driver-for-sql-server.md) (driver 18 is recommended)

## Related content

- [bcp utility](bcp-utility.md)
- [How to use the bcp utility](bcp-use-utility.md)
- [Authenticate with Microsoft Entra ID in bcp](bcp-authentication.md)
- [Prepare data for bulk export or import](../../relational-databases/import-export/prepare-data-for-bulk-export-or-import-sql-server.md)
- [BULK INSERT (Transact-SQL)](../../t-sql/statements/bulk-insert-transact-sql.md)
- [OPENROWSET (Transact-SQL)](../../t-sql/functions/openrowset-transact-sql.md)
- [Format files to import or export data (SQL Server)](../../relational-databases/import-export/format-files-for-importing-or-exporting-data-sql-server.md)


##  Get help

- [Ideas for SQL: Have suggestions for improving SQL Server?](https://feedback.azure.com/forums/908035-sql-server)
- [Microsoft Q & A (SQL Server)](https://learn.microsoft.com/answers/products/sql-server)
- [DBA Stack Exchange (tag sql-server): Ask SQL Server questions](https://dba.stackexchange.com/questions/tagged/sql-server)
- [Stack Overflow (tag sql-server): Answers to SQL development questions](https://stackoverflow.com/questions/tagged/sql-server)
- [Microsoft SQL Server License Terms and Information](https://www.microsoft.com/licensing/product-licensing/sql-server)
- [Support options for business users](https://support.microsoft.com/support-for-business)
- [Additional SQL Server help and feedback](../../sql-server/sql-server-get-help.md)

##  Contribute to SQL documentation

Did you know that you can edit SQL content yourself? If you do so, not only do you help improve our documentation, but you also get credited as a contributor to the page.

For more information, see [Edit Microsoft Learn documentation](../../sql-server/sql-server-docs-contribute.md).
