---
title: "DROP SYMMETRIC KEY (Transact-SQL)"
description: DROP SYMMETRIC KEY (Transact-SQL)
author: VanMSFT
ms.author: vanto
ms.date: "03/06/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "DROP SYMMETRIC KEY"
  - "DROP_SYMMETRIC_KEY_TSQL"
helpviewer_keywords:
  - "symmetric keys [SQL Server], removing"
  - "deleting symmetric keys"
  - "encryption [SQL Server], symmetric keys"
  - "removing symmetric keys"
  - "dropping symmetric keys"
  - "cryptography [SQL Server], symmetric keys"
  - "DROP SYMMETRIC KEY statement"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azuresqldb-mi-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azure-sqldw-latest || =fabric-sqldb"
---
# DROP SYMMETRIC KEY (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Removes a symmetric key from the current database.  
  
 

> **Note:**
>  This syntax is not supported by serverless SQL pool in Azure Synapse Analytics. 
 
  
## Syntax  
  
```syntaxsql  
DROP SYMMETRIC KEY symmetric_key_name [REMOVE PROVIDER KEY]  
```  
  
## Arguments
 *symmetric_key_name*  
 Is the name of the symmetric key to be dropped.  
  
 REMOVE PROVIDER KEY  
 Removes an Extensible Key Management (EKM) key from an EKM device. For more information about Extensible Key Management, see [Extensible Key Management &#40;EKM&#41;](../../relational-databases/security/encryption/extensible-key-management-ekm.md).  
  
## Remarks  
  
If the asymmetric key is mapped to an Extensible Key Management (EKM) key on an EKM device and the **REMOVE PROVIDER KEY** option is not specified, the key will be dropped from the database but not the device, and a warning will be issued.  
  
## Permissions  
 Requires CONTROL permission on the symmetric key.  
  
## Examples  
 The following example removes a symmetric key named `GailSammamishKey6` from the current database.  
  
```sql  
CLOSE SYMMETRIC KEY GailSammamishKey6;  
DROP SYMMETRIC KEY GailSammamishKey6;  
GO  
```  
  
## Related content

- [CREATE SYMMETRIC KEY (Transact-SQL)](create-symmetric-key-transact-sql.md)
- [ALTER SYMMETRIC KEY (Transact-SQL)](alter-symmetric-key-transact-sql.md)
- [Encryption hierarchy](../../relational-databases/security/encryption/encryption-hierarchy.md)
- [CLOSE SYMMETRIC KEY (Transact-SQL)](close-symmetric-key-transact-sql.md)
- [Extensible Key Management (EKM)](../../relational-databases/security/encryption/extensible-key-management-ekm.md)
