---
title: "DROP ASYMMETRIC KEY (Transact-SQL)"
description: DROP ASYMMETRIC KEY (Transact-SQL)
author: VanMSFT
ms.author: vanto
ms.date: "03/06/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "DROP ASYMMETRIC KEY"
  - "DROP_ASYMMETRIC_KEY_TSQL"
helpviewer_keywords:
  - "asymmetric keys [SQL Server], removing"
  - "removing asymmetric keys"
  - "encryption [SQL Server], asymmetric keys"
  - "DROP ASYMMETRIC KEY statement"
  - "dropping asymmetric keys"
  - "deleting asymmetric keys"
  - "cryptography [SQL Server], asymmetric keys"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azuresqldb-mi-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azure-sqldw-latest || =fabric-sqldb"
---
# DROP ASYMMETRIC KEY (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Removes an asymmetric key from the database.  
  
 

> **Note:**
>  This syntax is not supported by serverless SQL pool in Azure Synapse Analytics. 
 
  
## Syntax  
  
```syntaxsql
DROP ASYMMETRIC KEY key_name [ REMOVE PROVIDER KEY ]  
```  
  
## Arguments
 *key_name*  
 Is the name of the asymmetric key to be dropped from the database.  
  
 REMOVE PROVIDER KEY  
 Removes an Extensible Key Management (EKM) key from an EKM device. For more information about Extensible Key Management, see [Extensible Key Management &#40;EKM&#41;](../../relational-databases/security/encryption/extensible-key-management-ekm.md).  
  
## Remarks  
 An asymmetric key with which a symmetric key in the database has been encrypted, or to which a user or login is mapped, cannot be dropped. Before you drop such a key, you must drop any user or login that is mapped to the key. You must also drop or change any symmetric key encrypted with the asymmetric key. You can use the DROP ENCRYPTION option of [ALTER SYMMETRIC KEY](alter-symmetric-key-transact-sql.md) to remove encryption by an asymmetric key.  
  
 Metadata of asymmetric keys can be accessed by using the [sys.asymmetric_keys](../../relational-databases/system-catalog-views/sys-asymmetric-keys-transact-sql.md) catalog view. The keys themselves cannot be directly viewed from inside the database.  
  
 If the asymmetric key is mapped to an Extensible Key Management (EKM) key on an EKM device and the REMOVE PROVIDER KEY option is not specified, the key will be dropped from the database but not the device. A warning will be issued.  
  
## Permissions  
 Requires CONTROL permission on the asymmetric key.  
  
## Examples  
 The following example removes the asymmetric key `MirandaXAsymKey6` from the  `AdventureWorks2025`  database.  
  
```sql  
USE AdventureWorks2022;  
DROP ASYMMETRIC KEY MirandaXAsymKey6;  
```  
  
## Related content

- [CREATE ASYMMETRIC KEY (Transact-SQL)](create-asymmetric-key-transact-sql.md)
- [ALTER ASYMMETRIC KEY (Transact-SQL)](alter-asymmetric-key-transact-sql.md)
- [Encryption hierarchy](../../relational-databases/security/encryption/encryption-hierarchy.md)
- [ALTER SYMMETRIC KEY (Transact-SQL)](alter-symmetric-key-transact-sql.md)
