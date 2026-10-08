---
title: "DROP CRYPTOGRAPHIC PROVIDER (Transact-SQL)"
description: DROP CRYPTOGRAPHIC PROVIDER (Transact-SQL)
author: VanMSFT
ms.author: vanto
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
f1_keywords:
  - "DROP CRYPTOGRAPHIC PROVIDER"
  - "DROP_CRYPTOGRAPHIC_PROVIDER_TSQL"
helpviewer_keywords:
  - "DROP CRYPTOGRAPHIC PROVIDER statement"
dev_langs:
  - "TSQL"
---
# DROP CRYPTOGRAPHIC PROVIDER (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





  Drops a cryptographic provider within  SQL Server 
.  
  
 
  
## Syntax  
  
```syntaxsql
DROP CRYPTOGRAPHIC PROVIDER provider_name   
```  
  
## Arguments
 *provider_name*  
 Is the name of the Extensible Key Management provider.  
  
## Remarks  
 To delete an Extensible Key Management (EKM) provider, all sessions that use the provider must be stopped.  
  
 An EKM provider can only be dropped if there are no credentials mapped to it.  
  
 If there are keys mapped to an EKM provider when it is dropped the GUIDs for the keys remain stored in  SQL Server 
. If a provider is created later with the same key GUIDs, the keys will be reused.  
  
## Permissions  
 Requires CONTROL permission on the symmetric key.  
  
## Examples  
 The following example drops a cryptographic provider called `SecurityProvider`.  
  
```sql  
/* First, disable provider to perform the upgrade.  
This will terminate all open cryptographic sessions. */  
ALTER CRYPTOGRAPHIC PROVIDER SecurityProvider   
SET ENABLED = OFF;  
GO  
/* Drop the provider. */  
DROP CRYPTOGRAPHIC PROVIDER SecurityProvider;  
GO  
```  
  
## Related content

- [Extensible Key Management (EKM)](../../relational-databases/security/encryption/extensible-key-management-ekm.md)
- [CREATE CRYPTOGRAPHIC PROVIDER (Transact-SQL)](create-cryptographic-provider-transact-sql.md)
- [ALTER CRYPTOGRAPHIC PROVIDER (Transact-SQL)](alter-cryptographic-provider-transact-sql.md)
- [CREATE SYMMETRIC KEY (Transact-SQL)](create-symmetric-key-transact-sql.md)
