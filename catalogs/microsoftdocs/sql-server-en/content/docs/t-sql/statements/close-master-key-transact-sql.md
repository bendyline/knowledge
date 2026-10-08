---
title: "CLOSE MASTER KEY (Transact-SQL)"
description: CLOSE MASTER KEY (Transact-SQL)
author: VanMSFT
ms.author: vanto
ms.date: "05/15/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "CLOSE MASTER KEY"
  - "CLOSE_MASTER_KEY_TSQL"
helpviewer_keywords:
  - "encryption [SQL Server], Database Master Key"
  - "CLOSE MASTER KEY statement"
  - "database master key [SQL Server], closing"
  - "cryptography [SQL Server], Database Master Key"
  - "closing Database Master Keys"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# CLOSE MASTER KEY (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Closes the master key of the current database.  
  
 
  
## Syntax  
  
```syntaxsql  
CLOSE MASTER KEY  
```  

> **Note:**
>  This syntax is not supported by serverless SQL pool in Azure Synapse Analytics. 

  
## Arguments
 Takes no arguments.  
  
## Remarks  
 This statement reverses the operation performed by OPEN MASTER KEY. CLOSE MASTER KEY only succeeds when the database master key was opened in the current session by using the OPEN MASTER KEY statement.  
  
## Permissions  
 No permissions are required.  
  
## Examples  
  
```sql  
USE AdventureWorks2022;  
CLOSE MASTER KEY;  
GO  
```  
  
## Examples:  Azure Synapse Analytics 
  
```sql  
USE master;  
OPEN MASTER KEY DECRYPTION BY PASSWORD = '43987hkhj4325tsku7';  
GO   
CLOSE MASTER KEY;  
GO  
```  
  
## Related content

- [CREATE MASTER KEY (Transact-SQL)](create-master-key-transact-sql.md)
- [OPEN MASTER KEY (Transact-SQL)](open-master-key-transact-sql.md)
- [Encryption hierarchy](../../relational-databases/security/encryption/encryption-hierarchy.md)
