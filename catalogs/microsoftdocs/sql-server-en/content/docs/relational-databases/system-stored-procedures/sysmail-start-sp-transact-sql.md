---
title: "sysmail_start_sp (Transact-SQL)"
description: "Starts Database Mail by starting the Service Broker objects that the external program uses."
author: MashaMSFT
ms.author: mathoma
ms.reviewer: randolphwest
ms.date: 06/23/2025
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sysmail_start_sp"
  - "sysmail_start_sp_TSQL"
helpviewer_keywords:
  - "sysmail_start_sp"
dev_langs:
  - "TSQL"
---
# sysmail_start_sp (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Starts Database Mail by starting the  Service Broker 
 objects that the external program uses.



## Syntax

```syntaxsql
sysmail_start_sp
[ ; ]
```

## Arguments

None.

## Return code values

`0` (success) or `1` (failure).

## Result set

None.

## Remarks

Database Mail isn't enabled or installed upon  SQL Server 
 installation. Use the Database Mail Configuration wizard to enable and install the Database Mail objects.

This stored procedure is in the `msdb` database. This stored procedure starts the Database Mail queue that holds outgoing message requests and enables the  Service Broker 
 activation for the external program.

When the queues are started, the Database Mail external program can process messages. This procedure allows you to restart the queues after the queues have been stopped with the `sysmail_stop_sp` stored procedure.

> **Note:**  
> This stored procedure only starts the queues for Database Mail. This stored procedure doesn't activate  Service Broker 
 message delivery in the database.

## Permissions

You can grant `EXECUTE` permissions on this procedure, but these permissions might be overridden during a SQL Server upgrade.


## Examples

The following example shows starting Database Mail in the `msdb` database. The example assumes that Database Mail has been enabled.

```sql
USE msdb;
GO

EXECUTE dbo.sysmail_start_sp;
GO
```

## Related content

- [Database Mail](../database-mail/database-mail.md)
- [Server configuration: Database Mail XPs](../../database-engine/configure-windows/database-mail-xps-server-configuration-option.md)
- [sysmail_stop_sp (Transact-SQL)](sysmail-stop-sp-transact-sql.md)
- [Database Mail stored procedures (Transact-SQL)](database-mail-stored-procedures-transact-sql.md)
