---
title: "sysmail_stop_sp (Transact-SQL)"
description: "Stops Database Mail by stopping the Service Broker objects that the external program uses."
author: MashaMSFT
ms.author: mathoma
ms.reviewer: randolphwest
ms.date: 06/23/2025
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sysmail_stop_sp_TSQL"
  - "sysmail_stop_sp"
helpviewer_keywords:
  - "sysmail_stop_sp"
dev_langs:
  - "TSQL"
---
# sysmail_stop_sp (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Stops Database Mail by stopping the  Service Broker 
 objects that the external program uses.



## Syntax

```syntaxsql
sysmail_stop_sp
[ ; ]
```

## Arguments

None.

## Return code values

`0` (success) or `1` (failure).

## Remarks

This stored procedure is in the `msdb` database.

`sysmail_stop_sp` stops the Database Mail queue that holds outgoing message requests and turns off  Service Broker 
 activation for the external program.

When the queues are stopped, the Database Mail external program doesn't process messages. This stored procedure allows you to stop Database Mail for troubleshooting or maintenance purposes.

To start Database Mail, use `sysmail_start_sp`. `sp_send_dbmail` still accepts mail when the  Service Broker 
 objects are stopped.

> **Note:**  
> `sysmail_stop_sp` only stops the queues for Database Mail. This stored procedure doesn't deactivate  Service Broker 
 message delivery in the database. This stored procedure doesn't disable the Database Mail extended stored procedures to reduce the surface area. To disable the extended stored procedures, see [Server configuration: Database Mail XPs](../../database-engine/configure-windows/database-mail-xps-server-configuration-option.md).

## Permissions

You can grant `EXECUTE` permissions on this procedure, but these permissions might be overridden during a SQL Server upgrade.


## Examples

The following example shows stopping Database Mail in the `msdb` database. The example assumes that Database Mail has been enabled.

```sql
USE msdb;
GO

EXECUTE dbo.sysmail_stop_sp;
GO
```

## Related content

- [Database Mail](../database-mail/database-mail.md)
- [sysmail_start_sp (Transact-SQL)](sysmail-start-sp-transact-sql.md)
- [Database Mail stored procedures (Transact-SQL)](database-mail-stored-procedures-transact-sql.md)
