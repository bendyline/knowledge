---
title: "sys.server_sql_modules (Transact-SQL)"
description: sys.server_sql_modules (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "06/10/2016"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sys.server_sql_modules"
  - "sys.server_sql_modules_TSQL"
  - "server_sql_modules_TSQL"
  - "server_sql_modules"
helpviewer_keywords:
  - "sys.server_sql_modules catalog view"
dev_langs:
  - "TSQL"
---
# sys.server_sql_modules (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





  Contains the set of SQL modules for server-level triggers of type TR. You can join this relation to sys.server_triggers. The tuple (object_id) is the key of the relation.  
  
| Column Name | Data Type | Description |
| --- | --- | --- |
| **object_id** | **int** | This is a FOREIGN KEY reference back to the server-level trigger where this module is defined. |
| **definition** | **nvarchar(max)** | SQL text that defines this module.<br /><br /> NULL = Encrypted. |
| **uses_ansi_nulls** | **bit** | Module was created with ANSI NULLS set option set to ON. |
| **uses_quoted_identifier** | **bit** | Module was created with QUOTED IDENTIFIER set option set to ON. |
| **execute_as_principal_id** | **int** | ID of the EXECUTE AS server principal.<br /><br /> NULL by default or if EXECUTE AS CALLER<br /><br /> ID of the specified principal if EXECUTE AS SELF EXECUTE AS principal-2 = EXECUTE AS OWNER. |
  
## Permissions  
 The visibility of the metadata in catalog views is limited to securables that a user either owns, or on which the user was granted some permission.
 For more information, see [Metadata Visibility Configuration](../security/metadata-visibility-configuration.md).  
  
## Related content

- [System catalog views (Transact-SQL)](catalog-views-transact-sql.md)
