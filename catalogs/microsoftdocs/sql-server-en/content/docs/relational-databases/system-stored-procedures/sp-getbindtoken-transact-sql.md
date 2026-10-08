---
title: "sp_getbindtoken (Transact-SQL)"
description: sp_getbindtoken returns a unique identifier for the transaction.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/23/2025
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_getbindtoken"
  - "sp_getbindtoken_TSQL"
helpviewer_keywords:
  - "sp_getbindtoken"
dev_langs:
  - "TSQL"
---
# sp_getbindtoken (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Returns a unique identifier for the transaction. This unique identifier is a string used to bind sessions using `sp_bindsession`.

> **Important:**  
> This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  Use Multiple Active Results Sets (MARS) or distributed transactions instead. For more information, see [Using Multiple Active Result Sets (MARS) in SQL Server Native Client](../native-client/features/using-multiple-active-result-sets-mars.md).



## Syntax

```syntaxsql
sp_getbindtoken [ @out_token = ] 'out_token' OUTPUT
[ ; ]
```

## Arguments

> **Important:**  
> Arguments for extended stored procedures must be entered in the specific order as described in the [Syntax](#syntax) section. If the parameters are entered out of order, an error message occurs.


#### [ @out_token = ] '*out_token*'

The token to use to bind sessions. *@out_token* is **varchar(255)**, with no default.

## Return code values

None.

## Result set

None.

## Remarks

`sp_getbindtoken` returns a valid token only when the stored procedure is executed inside an active transaction. Otherwise, the  Database Engine 
 returns an error message. For example:

```sql
-- Declare a variable to hold the bind token.
-- No active transaction.
DECLARE @bind_token AS VARCHAR (255);

-- Trying to get the bind token returns an error 3921.
EXECUTE sp_getbindtoken @bind_token OUTPUT;
```

 Here's the result set. 


```output
Server: Msg 3921, Level 16, State 1, Procedure sp_getbindtoken, Line 4
Cannot get a transaction token if there is no transaction active.
Reissue the statement after a transaction has been started.
```

When `sp_getbindtoken` is used to enlist a distributed transaction connection inside an open transaction,  SQL Server 
 returns the same token. For example:

```sql
USE AdventureWorks2022;
GO

DECLARE @bind_token AS VARCHAR (255);
BEGIN TRANSACTION;
EXECUTE sp_getbindtoken @bind_token OUTPUT;
SELECT @bind_token AS Token1;

BEGIN DISTRIBUTED TRANSACTION;
EXECUTE sp_getbindtoken @bind_token OUTPUT;
SELECT @bind_token AS Token2;
--COMMIT TRANSACTION;
--COMMIT TRANSACTION;
```

Both `SELECT` statements return the same token:

```output
Token1
------
PKb'gN5<9aGEedk_16>8U=5---/5G=--

Token2
------
PKb'gN5<9aGEedk_16>8U=5---/5G=--
```

The bind token can be used with `sp_bindsession` to bind new sessions to the same transaction. The bind token is only valid locally inside each instance of the  Database Engine 
 and can't be shared across multiple instances.

To obtain and pass a bind token, you must run `sp_getbindtoken` before executing `sp_bindsession` for sharing the same lock space. If you obtain a bind token, `sp_bindsession` runs correctly.

> **Note:**  
> We recommend that you use the srv_getbindtoken Open Data Services application programming interface (API) to obtain a bind token to be used from an extended stored procedure.

## Permissions

Requires membership in the **public** role.

## Examples

The following example obtains a bind token and displays the bind token name.

```sql
DECLARE @bind_token AS VARCHAR (255);
BEGIN TRANSACTION;
EXECUTE sp_getbindtoken @bind_token OUTPUT;
SELECT @bind_token AS Token;
--COMMIT TRANSACTION;
```

 Here's the result set. 


```output
Token
-----
\0]---5^PJK51bP<1F<-7U-]ANZ
```

## Related content

- [sp_bindsession (Transact-SQL)](sp-bindsession-transact-sql.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
- [srv_getbindtoken (Extended Stored Procedure API)](../extended-stored-procedures-reference/srv-getbindtoken-extended-stored-procedure-api.md)
