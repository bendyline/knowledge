---
title: "ASYMKEY_ID (Transact-SQL)"
description: "ASYMKEY_ID (Transact-SQL)"
author: VanMSFT
ms.author: vanto
ms.date: "07/24/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "AsymKey_ID"
  - "ASYMKEY_ID_TSQL"
helpviewer_keywords:
  - "asymmetric keys [SQL Server], AsymKey_ID"
  - "ASYMKEY_ID function"
  - "encryption [SQL Server], asymmetric keys"
  - "identification numbers [SQL Server], asymmetric keys"
  - "IDs [SQL Server], asymmetric keys"
  - "cryptography [SQL Server], asymmetric keys"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# ASYMKEY_ID (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Returns the ID of an asymmetric key.
  

  
## Syntax  
  
```syntaxsql
ASYMKEY_ID ( 'Asym_Key_Name' )  
```  
  
## Arguments
*Asym_Key_Name*  
The name of an asymmetric key in the database.
  
## Return types
 **int**  
  
## Permissions  
Requires appropriate permission(s) on the asymmetric key, and requires that the caller has not been denied VIEW permission on the asymmetric key. See [CREATE ASYMMETRIC KEY (Transact-SQL)](../statements/create-asymmetric-key-transact-sql.md) for more information about asymmetric key permissions.
  
## Examples  
This example returns the ID of asymmetric key `ABerglundKey11`.
  
```sql
SELECT ASYMKEY_ID('ABerglundKey11');  
GO  
```  
  
## Related content

- [CREATE ASYMMETRIC KEY (Transact-SQL)](../statements/create-asymmetric-key-transact-sql.md)
- [ALTER ASYMMETRIC KEY (Transact-SQL)](../statements/alter-asymmetric-key-transact-sql.md)
- [DROP ASYMMETRIC KEY (Transact-SQL)](../statements/drop-asymmetric-key-transact-sql.md)
- [SIGNBYASYMKEY (Transact-SQL)](signbyasymkey-transact-sql.md)
- [VERIFYSIGNEDBYASYMKEY (Transact-SQL)](verifysignedbyasymkey-transact-sql.md)
- [Encryption hierarchy](../../relational-databases/security/encryption/encryption-hierarchy.md)
- [sys.asymmetric_keys (Transact-SQL)](../../relational-databases/system-catalog-views/sys-asymmetric-keys-transact-sql.md)
- [Security Catalog Views (Transact-SQL)](../../relational-databases/system-catalog-views/security-catalog-views-transact-sql.md)
- [ASYMKEYPROPERTY (Transact-SQL)](asymkeyproperty-transact-sql.md)
- [KEY_ID (Transact-SQL)](key-id-transact-sql.md)
