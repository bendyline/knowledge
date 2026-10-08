---
title: "xp_msver (Transact-SQL)"
description: "Returns version information about SQL Server."
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/23/2025
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "xp_msver_TSQL"
  - "xp_msver"
helpviewer_keywords:
  - "xp_msver"
dev_langs:
  - "TSQL"
---
# xp_msver (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Returns version information about  SQL Server 
. `xp_msver` also returns information about the actual build number of the server and information about the server environment. The information that `xp_msver` returns can be used within  Transact-SQL  statements, batches, stored procedures, and so on, to enhance logic for platform-independent code.



## Syntax

```syntaxsql
xp_msver [ 'optname' ]
```

## Arguments

> **Important:**  
> Arguments for extended stored procedures must be entered in the specific order as described in the [Syntax](#syntax) section. If the parameters are entered out of order, an error message occurs.


#### '*optname*'

The name of an option, and can be one of the following values.

| Option or column name | Description |
| --- | --- |
| **ProductName** | Product name; for example,  SQL Server |
| . |
| **ProductVersion** | Product version. |
| **Language** | The language version of  SQL Server |
| . |
| **Platform** | Operating-system name, manufacturer name, and chip family name for the computer that is running  SQL Server |
| . |
| **Comments** | Miscellaneous information about  SQL Server |
| . |
| **CompanyName** | Company name that produces  SQL Server |
| ; for example,  Microsoft |
 | Corporation. |
| **FileDescription** | The operating system. |
| **FileVersion** | Version of the  SQL Server |
 | executable. |
| **InternalName** | Microsoft |
 | internal name for  SQL Server |
| ; for example, SQLSERVR. |
| **LegalCopyright** | Legal copyright information required for  SQL Server |
| ; for example, Copyright©  Microsoft |
 | Corp. 1988-2005. |
| **LegalTrademarks** | Legal trademark information required for  SQL Server |
| . For example,  Microsoft |
 | is a registered trademark of  Microsoft |
 | Corporation. |
| **OriginalFilename** | File name executed at  SQL Server |
 | startup; for example, Sqlservr.exe. |
| **PrivateBuild** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| **SpecialBuild** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| **WindowsVersion** | Version of Windows that is installed on the computer that is running  SQL Server |
| . |
| **ProcessorCount** | The number of processors in the computer that is running  SQL Server |
| . |
| **ProcessorActiveMask** | Indicates the processors installed in the computer that is running  SQL Server |
 | that are started and usable by  Microsoft |
 | Windows. |
| **ProcessorType** | Processor type. Similar to **Platform**. |
| **PhysicalMemory** | Amount in megabytes (MB) of RAM installed on the computer that is running  SQL Server |
| . |
| **Product ID** | Product ID (PID) number. This is specified during installation. This number is located on a sticker on the original  SQL Server |
 | CD case. |

## Return code values

`1` (success).

## Result set

`xp_msver`, without any parameters, returns a four-column result set that lists all the option values. `xp_msver`, for any parameter, returns the four-column result set with values for that option.

## Permissions

Requires membership in the **public** role.

## Related content

- [System Functions by category for Transact-SQL](../system-functions/system-functions-category-transact-sql.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
- [General extended stored procedures (Transact-SQL)](general-extended-stored-procedures-transact-sql.md)
- [@@VERSION (Transact-SQL)](../../t-sql/functions/version-transact-sql-configuration-functions.md)
