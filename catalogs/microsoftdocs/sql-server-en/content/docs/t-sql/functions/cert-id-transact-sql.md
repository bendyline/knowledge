---
title: "CERT_ID (Transact-SQL)"
description: "CERT_ID (Transact-SQL)"
author: VanMSFT
ms.author: vanto
ms.date: "07/24/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "CERT_ID"
  - "CERT_ID_TSQL"
helpviewer_keywords:
  - "identification numbers [SQL Server], certificates"
  - "CERT_ID function"
  - "IDs [SQL Server], certificates"
  - "certificates [SQL Server], IDs"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# CERT_ID (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



This function returns the ID value of a certificate.
  

  
## Syntax  
  
```syntaxsql
CERT_ID ( 'cert_name' )  
```  
  
## Arguments
**'** *cert_name* **'**  

The name of a certificate in the database.
  
## Return types
 **int**  
  
## Remarks  
The [sys.certificates](../../relational-databases/system-catalog-views/sys-certificates-transact-sql.md) catalog view shows certificate names.
  
## Permissions  
Requires appropriate permission(s) on the certificate, and requires that the caller has not been denied VIEW DEFINITION permission on the certificate. See [CREATE CERTIFICATE (Transact-SQL)](../statements/create-certificate-transact-sql.md#permissions) for more information about certificate permissions.
  
## Examples  
This example returns the ID of a certificate named `ABerglundCert3`.
  
```sql
SELECT Cert_ID('ABerglundCert3');  
GO  
```  
  
## Related content

- [sys.certificates (Transact-SQL)](../../relational-databases/system-catalog-views/sys-certificates-transact-sql.md)
- [CREATE CERTIFICATE (Transact-SQL)](../statements/create-certificate-transact-sql.md)
- [Encryption hierarchy](../../relational-databases/security/encryption/encryption-hierarchy.md)
