---
title: "DROP MASTER KEY (Transact-SQL)"
description: DROP MASTER KEY (Transact-SQL)
author: VanMSFT
ms.author: vanto
ms.date: "03/06/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "DROP MASTER KEY"
  - "DROP_MASTER_KEY_TSQL"
helpviewer_keywords:
  - "removing Database Master Keys"
  - "database master key [SQL Server], removing"
  - "encryption [SQL Server], Database Master Key"
  - "DROP MASTER KEY statement"
  - "cryptography [SQL Server], Database Master Key"
  - "dropping Database Master Keys"
  - "deleting Database Master Keys"
dev_langs:
  - "TSQL"
monikerRange: "=azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# DROP MASTER KEY (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 


 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Removes the master key from the current database.  
  
 
  
## Syntax  
  
```syntaxsql  
DROP MASTER KEY  
```  
  
## Arguments  
 This statement takes no arguments.  
  
## Remarks  
 The drop will fail if any private key in the database is protected by the master key.  
  
## Permissions  
 Requires CONTROL permission on the database.  
  
## Examples  
 The following example removes the master key for the  `AdventureWorks2025`  database.  
  
```sql  
USE AdventureWorks2022;  
DROP MASTER KEY;  
GO  
```  
  
## Examples:  Azure Synapse Analytics 
 The following example removes the master key.  
  
```sql  
USE master;  
DROP MASTER KEY;  
GO  
```  
  
## Related content

- [CREATE MASTER KEY (Transact-SQL)](create-master-key-transact-sql.md)
- [OPEN MASTER KEY (Transact-SQL)](open-master-key-transact-sql.md)
- [CLOSE MASTER KEY (Transact-SQL)](close-master-key-transact-sql.md)
- [BACKUP MASTER KEY (Transact-SQL)](backup-master-key-transact-sql.md)
- [RESTORE MASTER KEY (Transact-SQL)](restore-master-key-transact-sql.md)
- [ALTER MASTER KEY (Transact-SQL)](alter-master-key-transact-sql.md)
- [Encryption hierarchy](../../relational-databases/security/encryption/encryption-hierarchy.md)
