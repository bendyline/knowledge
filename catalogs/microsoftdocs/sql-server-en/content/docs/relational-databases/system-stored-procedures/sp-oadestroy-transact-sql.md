---
title: "sp_OADestroy (Transact-SQL)"
description: sp_OADestroy destroys a created OLE object.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/23/2025
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_OADestroy_TSQL"
  - "sp_OADestroy"
helpviewer_keywords:
  - "sp_OADestroy"
dev_langs:
  - "TSQL"
---
# sp_OADestroy (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Destroys a created OLE object.



## Syntax

```syntaxsql
sp_OADestroy objecttoken
[ ; ]
```

## Arguments

> **Important:**  
> Arguments for extended stored procedures must be entered in the specific order as described in the [Syntax](#syntax) section. If the parameters are entered out of order, an error message occurs.


#### *objecttoken*

The object token of an OLE object that was previously created by using `sp_OACreate`.

## Return code values

`0` (success) or a nonzero number (failure) that is the integer value of the HRESULT returned by the OLE Automation object.

For more information about HRESULT return codes, see [OLE automation return codes and error information](../stored-procedures/ole-automation-return-codes-and-error-information.md).

## Remarks

If `sp_OADestroy` isn't called, the created OLE object is automatically destroyed at the end of the batch.

## Permissions

Requires membership in the **sysadmin** fixed server role or execute permission directly on this stored procedure. The [Ole Automation Procedures](../../database-engine/configure-windows/ole-automation-procedures-server-configuration-option.md) server configuration option must be enabled to use any system procedure related to OLE Automation.

## Examples

The following example destroys the previously created `SQLServer` object.

```sql
EXECUTE
    @hr = sp_OADestroy
    @object;

IF @hr <> 0
BEGIN
    EXECUTE sp_OAGetErrorInfo @object;
    RETURN;
END
```

## Related content

- [OLE Automation stored procedures (Transact-SQL)](ole-automation-stored-procedures-transact-sql.md)
- [OLE Automation Sample Script](../stored-procedures/ole-automation-sample-script.md)
