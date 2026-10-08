---
title: "Cryptographic Functions (Transact-SQL)"
description: "Cryptographic Functions (Transact-SQL)"
author: VanMSFT
ms.author: vanto
ms.date: "07/24/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "functions [SQL Server], cryptographic"
  - "crypto functions"
  - "cryptography [SQL Server], functions"
  - "decryption [SQL Server], functions"
  - "security functions"
  - "encryption [SQL Server], functions"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# Cryptographic functions (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



These functions support digital signing, digital signature validation, encryption, and decryption.
  
## Symmetric encryption and decryption



        [ENCRYPTBYKEY](../../t-sql/functions/encryptbykey-transact-sql.md)


        [DECRYPTBYKEY](../../t-sql/functions/decryptbykey-transact-sql.md)




        [ENCRYPTBYPASSPHRASE](../../t-sql/functions/encryptbypassphrase-transact-sql.md)


        [DECRYPTBYPASSPHRASE](../../t-sql/functions/decryptbypassphrase-transact-sql.md)




        [KEY_ID](../../t-sql/functions/key-id-transact-sql.md)


        [KEY_GUID](../../t-sql/functions/key-guid-transact-sql.md)




        [DECRYPTBYKEYAUTOASYMKEY](../../t-sql/functions/decryptbykeyautoasymkey-transact-sql.md)


        [KEY_NAME](../../t-sql/functions/key-name-transact-sql.md)




        [SYMKEYPROPERTY](../../t-sql/functions/symkeyproperty-transact-sql.md)





&nbsp;

## Asymmetric encryption and decryption
  


        [ENCRYPTBYASYMKEY](../../t-sql/functions/encryptbyasymkey-transact-sql.md)


        [DECRYPTBYASYMKEY](../../t-sql/functions/decryptbyasymkey-transact-sql.md)




        [ENCRYPTBYCERT](../../t-sql/functions/encryptbycert-transact-sql.md)


        [DECRYPTBYCERT](../../t-sql/functions/decryptbycert-transact-sql.md)




        [ASYMKEYPROPERTY](../../t-sql/functions/asymkeyproperty-transact-sql.md)


        [ASYMKEY_ID](../../t-sql/functions/asymkey-id-transact-sql.md)



&nbsp;

## Signing and signature verification



        [SIGNBYASYMKEY](../../t-sql/functions/signbyasymkey-transact-sql.md)


        [VERIFYSIGNEDBYASYMKEY](../../t-sql/functions/verifysignedbyasymkey-transact-sql.md)




        [SIGNBYCERT](../../t-sql/functions/signbycert-transact-sql.md)


        [VERIFYSIGNEDBYCERT](../../t-sql/functions/verifysignedbycert-transact-sql.md)




        [IS_OBJECTSIGNED](../../t-sql/functions/is-objectsigned-transact-sql.md)





&nbsp;
  
## Symmetric decryption, with automatic key handling



        [DecryptByKeyAutoCert](../../t-sql/functions/decryptbykeyautocert-transact-sql.md)


 
&nbsp;

## Encryption hashing



        [HASHBYTES](../../t-sql/functions/hashbytes-transact-sql.md)



&nbsp;

## Certificate copying 



        [CERTENCODED &#40;Transact-SQL&#41;](../../t-sql/functions/certencoded-transact-sql.md)


        [CERTPRIVATEKEY &#40;Transact-SQL&#41;](../../t-sql/functions/certprivatekey-transact-sql.md)



&nbsp;

## Related content

- [What are the SQL database functions?](functions.md)
- [Encryption hierarchy](../../relational-databases/security/encryption/encryption-hierarchy.md)
- [Permissions Hierarchy (Database Engine)](../../relational-databases/security/permissions-hierarchy-database-engine.md)
- [CREATE CERTIFICATE (Transact-SQL)](../statements/create-certificate-transact-sql.md)
- [CREATE SYMMETRIC KEY (Transact-SQL)](../statements/create-symmetric-key-transact-sql.md)
- [CREATE ASYMMETRIC KEY (Transact-SQL)](../statements/create-asymmetric-key-transact-sql.md)
- [Security Catalog Views (Transact-SQL)](../../relational-databases/system-catalog-views/security-catalog-views-transact-sql.md)
