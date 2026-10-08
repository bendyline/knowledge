---
title: "DROP CERTIFICATE (Transact-SQL)"
description: DROP CERTIFICATE removes a certificate from the database.
author: VanMSFT
ms.author: vanto
ms.reviewer: randolphwest
ms.date: 07/24/2025
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "DROP CERTIFICATE"
  - "DROP_CERTIFICATE_TSQL"
helpviewer_keywords:
  - "certificates [SQL Server], removing"
  - "removing certificates"
  - "dropping certificates"
  - "DROP CERTIFICATE statement"
  - "deleting certificates"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azuresqldb-mi-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azure-sqldw-latest || =fabric-sqldb"
---
# DROP CERTIFICATE (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Removes a certificate from the database.

> **Important:**  
> A backup of the certificate used for database encryption should be retained even if the encryption is no longer enabled on a database. Even though the database isn't encrypted anymore, parts of the transaction log might still remain protected; the certificate might be needed for some operations until the full backup of the database is performed. The certificate is also needed to be able to restore from the backups created at the time the database was encrypted.



[Include unavailable in this source snapshot: ../../includes/\\synapse-analytics-od-unsupported-syntax.md](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/t-sql/statements/drop-certificate-transact-sql.md)

## Syntax

```syntaxsql
DROP CERTIFICATE certificate_name
```

## Arguments

#### *certificate_name*

The unique name by which the certificate is known in the database.

## Remarks

Certificates can only be dropped if no entities are associated with them.

## Permissions

Requires `CONTROL` permission on the certificate.

## Examples

The following example drops the certificate `Shipping04` from the `AdventureWorks` database.

```sql
USE AdventureWorks2022;

DROP CERTIFICATE Shipping04;
```

## Related content

- [BACKUP CERTIFICATE (Transact-SQL)](backup-certificate-transact-sql.md)
- [CREATE CERTIFICATE (Transact-SQL)](create-certificate-transact-sql.md)
- [ALTER CERTIFICATE (Transact-SQL)](alter-certificate-transact-sql.md)
- [Encryption hierarchy](../../relational-databases/security/encryption/encryption-hierarchy.md)
- [EVENTDATA (Transact-SQL)](../functions/eventdata-transact-sql.md)
