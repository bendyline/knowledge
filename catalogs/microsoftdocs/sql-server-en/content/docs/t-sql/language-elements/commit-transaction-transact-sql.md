---
title: "COMMIT TRANSACTION (Transact-SQL)"
description: This statement marks the end of a successful implicit or explicit transaction.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: dfurman
ms.date: 12/17/2025
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2024
f1_keywords:
  - "COMMIT"
  - "COMMIT TRANSACTION"
  - "COMMIT_TSQL"
  - "COMMIT_TRANSACTION_TSQL"
helpviewer_keywords:
  - "ending transactions [SQL Server]"
  - "user-defined transactions [SQL Server]"
  - "committed transactions"
  - "transactions [SQL Server], ending"
  - "marking end of transactions [SQL Server]"
  - "implicit transactions"
  - "distributed transactions [SQL Server], committed"
  - "transactions [SQL Server], committed"
  - "COMMIT TRANSACTION statement"
  - "rolling back transactions, COMMIT TRANSACTION"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---

# COMMIT TRANSACTION (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Marks the end of a successful implicit or explicit transaction.

If `@@TRANCOUNT` is 1, `COMMIT TRANSACTION` makes all data modifications since the start of the transaction a permanent part of the database, frees the transaction resources, and decrements `@@TRANCOUNT` to 0.

When `@@TRANCOUNT` is greater than 1, `COMMIT TRANSACTION` decrements `@@TRANCOUNT` by 1 and the transaction stays active.



## Syntax

Syntax for  SQL Server 
,  Azure SQL Database 
, Azure SQL Managed Instance, SQL database in Microsoft Fabric
.

```syntaxsql
COMMIT [ { TRAN | TRANSACTION }
    [ transaction_name | @tran_name_variable ] ]
    [ WITH ( DELAYED_DURABILITY = { OFF | ON } ) ]
[ ; ]
```

Syntax for Fabric Data Warehouse and Azure Synapse Analytics.

```syntaxsql
COMMIT [ TRAN | TRANSACTION ]
[ ; ]
```

## Arguments

#### *transaction_name*

**Applies to**:  SQL Server 2008 (10.0.x) 
 and later versions,  Azure SQL Database 
, Azure SQL Managed Instance, SQL database in Microsoft Fabric
.

Ignored by the  Database Engine 
 when specified with `COMMIT`. *transaction_name* specifies a transaction name assigned by a previous `BEGIN TRANSACTION`. *transaction_name* must conform to the rules for identifiers, but can't exceed 32 characters. *transaction_name* can be used as a code documentation technique to indicate which of the inner `BEGIN TRANSACTION` statements the `COMMIT TRANSACTION` statement is associated with.

#### *@tran_name_variable*

**Applies to**:  SQL Server 2008 (10.0.x) 
 and later versions,  Azure SQL Database 
, Azure SQL Managed Instance, SQL database in Microsoft Fabric
.

The name of a user-defined variable containing a valid transaction name. The variable must be declared with a **char**, **varchar**, **nchar**, or **nvarchar** data type. If more than 32 characters are passed to the variable, only the first 32 characters are used. The remaining characters are truncated.

#### WITH DELAYED_DURABILITY = { OFF | ON }

**Applies to**:  SQL Server 2008 (10.0.x) 
 and later versions,  Azure SQL Database 
, Azure SQL Managed Instance, SQL database in Microsoft Fabric
.

The option that requests this transaction to be committed with delayed durability. The request is ignored if delayed durability is disabled for the database. A transaction is committed with delayed durability regardless of this option if delayed durability is forced for the database.

For more information, see [Control Transaction Durability](../../relational-databases/logs/control-transaction-durability.md).

## Remarks

It's the responsibility of the application to issue `COMMIT TRANSACTION` at a point when all data referenced by the transaction reaches the intended state of consistency.

If the transaction committed was a  Transact-SQL  distributed transaction, `COMMIT TRANSACTION` triggers MS DTC to use a two-phase commit protocol to commit the transaction on all of the servers involved in the transaction. When a local transaction spans two or more databases on the same instance of the  Database Engine 
, the instance uses an internal two-phase commit to commit the transaction in all of the databases involved in the transaction.

When used for an inner transactions, a commit doesn't free resources or make data modifications permanent. The data modifications are made permanent and resources are freed only when the outer transaction is committed. Each `COMMIT TRANSACTION` issued when `@@TRANCOUNT` is greater than 1 decrements `@@TRANCOUNT` by 1 but has no other effects. When `@@TRANCOUNT` is finally decremented to 0, the entire outer transaction is committed. Because *transaction_name* specified with `COMMIT TRANSACTION` is ignored by the  Database Engine 
, issuing a `COMMIT TRANSACTION` referencing the name of an outer transaction when there are outstanding inner transactions only decrements `@@TRANCOUNT` by 1.

Issuing a `COMMIT TRANSACTION` when `@@TRANCOUNT` is zero results in an error because there's no corresponding `BEGIN TRANSACTION`.

You can't roll back a transaction after a `COMMIT TRANSACTION` statement is issued, because the data modifications are already a permanent part of the database.

> **Note:**  
> The  Database Engine 
 doesn't support independently manageable nested transactions. A commit of an inner transaction decrements `@@TRANCOUNT` but has no other effects. A rollback of an inner transaction always rolls back the outer transaction, unless a [savepoint](save-transaction-transact-sql.md) exists and is specified in the `ROLLBACK` statement.

## Permissions

Requires membership in the `public` role.

## Examples

The code samples in this article use the  `AdventureWorks2025` ,  `AdventureWorksDW2025` , or  `AdventureWorksLT2025`  sample database, which you can download from the [Azure Data SQL Samples Repository](https://github.com/microsoft/sql-server-samples) GitHub repository.

### A. Commit a transaction

**Applies to**:  SQL Server 
,  Azure SQL Database 
, Azure SQL Managed Instance, SQL database in Microsoft Fabric
,  Azure Synapse Analytics 

The following example deletes a job candidate.

```sql
BEGIN TRANSACTION;
DELETE FROM HumanResources.JobCandidate
WHERE JobCandidateID = 13;
COMMIT TRANSACTION;
```

### B. Commit an outer transaction and the inner transactions

**Applies to**:  SQL Server 
,  Azure SQL Database 
, Azure SQL Managed Instance, SQL database in Microsoft Fabric
.

The following example creates a table, starts an outer and two inner transactions, and then commits each transaction. The *transaction_name* parameters used in this example help the developer ensure that the correct number of commits are coded to decrement `@@TRANCOUNT` to 0 and to commit the outer transaction.

```sql
IF OBJECT_ID(N'TestTran', N'U') IS NOT NULL
    DROP TABLE TestTran;
GO

CREATE TABLE TestTran (
    Cola INT PRIMARY KEY,
    Colb CHAR(3)
);
GO

-- This statement sets @@TRANCOUNT to 1.
BEGIN TRANSACTION OuterTran;

PRINT N'Transaction count after BEGIN OuterTran = ' + CAST(@@TRANCOUNT AS NVARCHAR(10));

INSERT INTO TestTran
VALUES (1, 'aaa');

-- This statement sets @@TRANCOUNT to 2.
BEGIN TRANSACTION Inner1;

PRINT N'Transaction count after BEGIN Inner1 = ' + CAST(@@TRANCOUNT AS NVARCHAR(10));

INSERT INTO TestTran
VALUES (2, 'bbb');

-- This statement sets @@TRANCOUNT to 3.
BEGIN TRANSACTION Inner2;

PRINT N'Transaction count after BEGIN Inner2 = ' + CAST(@@TRANCOUNT AS NVARCHAR(10));

INSERT INTO TestTran
VALUES (3, 'ccc');

-- This statement decrements @@TRANCOUNT to 2.
-- Nothing is committed.
COMMIT TRANSACTION Inner2;

PRINT N'Transaction count after COMMIT Inner2 = ' + CAST(@@TRANCOUNT AS NVARCHAR(10));

-- This statement decrements @@TRANCOUNT to 1.
-- Nothing is committed.
COMMIT TRANSACTION Inner1;

PRINT N'Transaction count after COMMIT Inner1 = ' + CAST(@@TRANCOUNT AS NVARCHAR(10));

-- This statement decrements @@TRANCOUNT to 0 and
-- commits outer transaction OuterTran.
COMMIT TRANSACTION OuterTran;

PRINT N'Transaction count after COMMIT OuterTran = ' + CAST(@@TRANCOUNT AS NVARCHAR(10));
```

## Related content

- [BEGIN DISTRIBUTED TRANSACTION (Transact-SQL)](begin-distributed-transaction-transact-sql.md)
- [BEGIN TRANSACTION (Transact-SQL)](begin-transaction-transact-sql.md)
- [COMMIT WORK (Transact-SQL)](commit-work-transact-sql.md)
- [ROLLBACK TRANSACTION (Transact-SQL)](rollback-transaction-transact-sql.md)
- [ROLLBACK WORK (Transact-SQL)](rollback-work-transact-sql.md)
- [SAVE TRANSACTION (Transact-SQL)](save-transaction-transact-sql.md)
- [@@TRANCOUNT (Transact-SQL)](../functions/trancount-transact-sql.md)
- [Transaction locking and row versioning guide](../../relational-databases/sql-server-transaction-locking-and-row-versioning-guide.md)
