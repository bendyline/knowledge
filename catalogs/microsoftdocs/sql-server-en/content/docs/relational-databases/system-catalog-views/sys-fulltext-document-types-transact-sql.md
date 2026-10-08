---
title: sys.fulltext_document_types (Transact-SQL)
description: sys.fulltext_document_types returns a row for each document type that is available for full-text indexing operations.
author: rwestMSFT
ms.author: randolphwest
ms.date: 07/09/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: reference
f1_keywords:
  - "sys.fulltext_document_types_TSQL"
  - "sys.fulltext_document_types"
  - "fulltext_document_types_TSQL"
  - "fulltext_document_types"
helpviewer_keywords:
  - "sys.fulltext_document_types catalog view"
dev_langs:
  - TSQL
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# sys.fulltext_document_types (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Returns a row for each document type that is available for full-text indexing operations. Each row represents the IFilter interface that is registered in the instance of  SQL Server 
.

| Column name | Data type | Description |
| --- | --- | --- |
| `document_type` | **sysname** | The file extension of the supported document type.<br /><br />This value can be used to identify the filter that will be used during full-text indexing of columns of type **varbinary(max)** or **image**. |
| `class_id` | **uniqueidentifier** | GUID of the IFilter class that supports file extension. |
| `path` | **nvarchar(260)** | The path to the IFilter DLL. The path is only visible to members of the **serveradmin** fixed server role. |
| `version` | **sysname** | Version of the IFilter DLL. |
| `manufacturer` <sup>1</sup> | **sysname** | Name of the IFilter manufacturer. |

<sup>1</sup> Only documents with  Microsoft 
 as the manufacturer are supported on  Azure SQL Database 
.

## Permissions

The visibility of the metadata in catalog views is limited to securables that a user either owns, or on which the user was granted some permission.


## Related content

- [System catalog views (Transact-SQL)](catalog-views-transact-sql.md)
