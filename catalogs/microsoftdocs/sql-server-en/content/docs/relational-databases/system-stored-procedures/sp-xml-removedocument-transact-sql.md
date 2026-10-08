---
title: "sp_xml_removedocument (Transact-SQL)"
description: "Removes the internal representation of the XML document specified by the document handle and invalidates the document handle."
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/23/2025
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
ms.custom:
  - ignite-2025
f1_keywords:
  - "sp_xml_removedocument_TSQL"
  - "sp_xml_removedocument"
helpviewer_keywords:
  - "sp_xml_removedocument"
dev_langs:
  - "TSQL"
---
# sp_xml_removedocument (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Removes the internal representation of the XML document specified by the document handle and invalidates the document handle.

A parsed document is stored in the internal cache of  SQL Server 
. The MSXML parser (`msxmlsql.dll`) uses one-eighth the total memory available for  SQL Server 
. To avoid running out of memory, run `sp_xml_removedocument` to free up the memory.



## Syntax

```syntaxsql
sp_xml_removedocument hdoc
[ ; ]
```

## Arguments

> **Important:**  
> Arguments for extended stored procedures must be entered in the specific order as described in the [Syntax](#syntax) section. If the parameters are entered out of order, an error message occurs.


#### *hdoc*

The handle to the newly created document. A handle that isn't valid returns an error. *hdoc* is an **integer**.

## Return code values

`0` (success) or `> 0` (failure).

## Permissions

Requires membership in the **public** role.

## Examples

The following example removes the internal representation of an XML document. The handle to the document is provided as input.

```sql
EXECUTE sp_xml_removedocument @hdoc;
```

## Related content

- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
- [XML stored procedures (Transact-SQL)](xml-stored-procedures-transact-sql.md)
- [sys.dm_exec_xml_handles (Transact-SQL)](../system-dynamic-management-objects/sys-dm-exec-xml-handles-transact-sql.md)
- [sp_xml_preparedocument (Transact-SQL)](sp-xml-preparedocument-transact-sql.md)
- [OPENXML (Transact-SQL)](../../t-sql/functions/openxml-transact-sql.md)
