---
title: "sys.symmetric_keys (Transact-SQL)"
description: sys.symmetric_keys (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/07/2017"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
ms.custom:
  - ignite-2025
f1_keywords:
  - "symmetric_keys"
  - "sys.symmetric_keys"
  - "sys.symmetric_keys_TSQL"
  - "symmetric_keys_TSQL"
helpviewer_keywords:
  - "sys.symmetric_keys catalog view"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# sys.symmetric_keys (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Returns one row for every symmetric key created with the CREATE SYMMETRIC KEY statement.  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **name** | **sysname** | Name of the key. Unique within the database. |
| **principal_id** | **int** | ID of the database principal who owns the key. |
| **symmetric_key_id** | **int** | ID of the key. Unique within the database. |
| **key_length** | **int** | Length of the key in bits. |
| **key_algorithm** | **char(2)** | Algorithm used with the key:<br /><br /> R2 = RC2<br /><br /> R4 = RC4<br /><br /> D = DES<br /><br /> D3 = Triple DES<br /><br /> DT = TRIPLE_DES_3KEY<br /><br /> DX = DESX<br /><br /> A1 = AES 128<br /><br /> A2 = AES 192<br /><br /> A3 = AES 256<br /><br /> NA = EKM Key |
| **algorithm_desc** | **nvarchar(60)** | Description of the algorithm used with the key:<br /><br /> RC2<br /><br /> RC4<br /><br /> DES<br /><br /> Triple_DES<br /><br /> TRIPLE_DES_3KEY<br /><br /> DESX<br /><br /> AES_128<br /><br /> AES_192<br /><br /> AES_256<br /><br /> NULL (Extensible Key Management algorithms only) |
| **create_date** | **datetime** | Date the key was created. |
| **modify_date** | **datetime** | Date the key was modified. |
| **key_guid** | **uniqueidentifier** | Globally unique identifier (GUID) associated with the key. It is auto-generated for persisted keys. GUIDs for temporary keys are derived from the user-supplied pass phrase. |
| **key_thumbprint** | **sql_variant** | SHA-1 hash of the key. The hash is globally unique. For non-Extensible Key Management keys this value will be NULL. |
| **provider_type** | **nvarchar(120)** | Type of cryptographic provider:<br /><br /> CRYPTOGRAPHIC PROVIDER = Extensible Key Management keys<br /><br /> NULL = Non-Extensible Key Management keys |
| **cryptographic_provider_guid** | **uniqueidentifier** | GUID for the cryptographic provider. For non-Extensible Key Management keys this value will be NULL. |
| **cryptographic_provider_algid** | **sql_variant** | Algorithm ID for the cryptographic provider. For non-Extensible Key Management keys this value will be NULL. |
  
## Permissions  
 The visibility of the metadata in catalog views is limited to securables that a user either owns, or on which the user was granted some permission.
 For more information, see [Metadata Visibility Configuration](../security/metadata-visibility-configuration.md).  
  
## Remarks  
 The RC4 algorithm is deprecated. This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.   
  
> **Note:**  
>  The RC4 algorithm is only supported for backward compatibility. New material can only be encrypted using RC4 or RC4_128 when the database is in compatibility level 90 or 100. (Not recommended.) Use a newer algorithm such as one of the AES algorithms instead. In  SQL Server 2012 (11.x) 
 material encrypted using RC4 or RC4_128 can be decrypted in any compatibility level.  
  
 **Clarification regarding DES algorithms:**  
  
-   DESX was incorrectly named. Symmetric keys created with ALGORITHM = DESX actually use the TRIPLE DES cipher with a 192-bit key. The DESX algorithm is not provided. This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.   
  
-   Symmetric keys created with ALGORITHM = TRIPLE_DES_3KEY use TRIPLE DES with a 192-bit key.  
  
-   Symmetric keys created with ALGORITHM = TRIPLE_DES use TRIPLE DES with a 128-bit key.  
  
## Related content

- [System catalog views (Transact-SQL)](catalog-views-transact-sql.md)
- [Extensible Key Management (EKM)](../security/encryption/extensible-key-management-ekm.md)
- [Security Catalog Views (Transact-SQL)](security-catalog-views-transact-sql.md)
- [Encryption hierarchy](../security/encryption/encryption-hierarchy.md)
- [CREATE SYMMETRIC KEY (Transact-SQL)](../../t-sql/statements/create-symmetric-key-transact-sql.md)
