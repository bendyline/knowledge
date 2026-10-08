---
title: "xp_logevent (Transact-SQL)"
description: "Logs a user-defined message in the SQL Server log file and in the Windows Event log."
author: MashaMSFT
ms.author: mathoma
ms.reviewer: randolphwest
ms.date: 06/23/2025
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "xp_logevent"
  - "xp_logevent_TSQL"
helpviewer_keywords:
  - "xp_logevent"
dev_langs:
  - "TSQL"
---
# xp_logevent (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Logs a user-defined message in the  SQL Server 
 log file and in the Windows Event log. `xp_logevent` can be used to send an alert without sending a message to the client.



## Syntax

```syntaxsql
xp_logevent { error_number , 'message' } [ , 'severity' ]
```

## Arguments

> **Important:**  
> Arguments for extended stored procedures must be entered in the specific order as described in the [Syntax](#syntax) section. If the parameters are entered out of order, an error message occurs.


#### *error_number*

A user-defined error number larger than `50000`. The maximum value is `2147483647` (2^31 - 1).

#### '*message*'

A character string with a maximum of 2048 characters.

#### '*severity*'

One of three character strings: `INFORMATIONAL`, `WARNING`, or `ERROR`. *severity* is optional, with a default of `INFORMATIONAL`.

## Return code values

`0` (success) or `1` (failure).

## Result set

`xp_logevent` returns the following error message for the included code example:

```output
The command(s) completed successfully.
```

## Remarks

When you send messages from  Transact-SQL  procedures, triggers, batches, and so on, use the `RAISERROR` statement instead of `xp_logevent`. `xp_logevent` doesn't call a message handler of a client, or set `@@ERROR`. To write messages to the Windows Event log and to the  SQL Server 
 error log file within an instance of  SQL Server 
, execute the `RAISERROR` statement.

## Permissions

Requires membership in the **db_owner** fixed database role in the `master` database, or membership in the **sysadmin** fixed server role.

## Examples

The following example logs the message, with variables passed to the message in the Windows Event Viewer.

```sql
DECLARE @@TABNAME VARCHAR(30),
    @@USERNAME VARCHAR(30),
    @@MESSAGE VARCHAR(255);

SET @@TABNAME = 'customers';
SET @@USERNAME = USER_NAME();

SELECT @@MESSAGE = 'The table ' + @@TABNAME + ' is not owned by the user
   ' + @@USERNAME + '.';

USE master;

EXECUTE xp_logevent 60000,
    @@MESSAGE, informational;
```

## Related content

- [PRINT (Transact-SQL)](../../t-sql/language-elements/print-transact-sql.md)
- [RAISERROR (Transact-SQL)](../../t-sql/language-elements/raiserror-transact-sql.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
- [General extended stored procedures (Transact-SQL)](general-extended-stored-procedures-transact-sql.md)
