---
title: "sys.master_key_passwords (Transact-SQL)"
description: sys.master_key_passwords returns a row for each database master key password added by using the sp_control_dbmasterkey_password stored procedure.
author: rwestMSFT
ms.author: randolphwest
ms.date: 02/05/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sys.master_key_passwords_TSQL"
  - "master_key_passwords_TSQL"
  - "sys.master_key_passwords"
  - "master_key_passwords"
helpviewer_keywords:
  - "sys.master_key_passwords catalog view"
dev_langs:
  - "TSQL"
---
# sys.master_key_passwords (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





Returns a row for each database master key password added by using the `sp_control_dbmasterkey_password` stored procedure. The passwords that are used to protect the master keys are stored in the credential store. The credential name follows this format: ##DBMKEY_<database_family_guid>_<random_password_guid>##. The password is stored as the credential secret. For each password added by using `sp_control_dbmasterkey_password`, there's a row in `sys.credentials`.

Each row in this view shows a `credential_id` and the `family_guid` of a database the master key of which is protected by the password associated with that credential. A join with `sys.credentials` on the `credential_id` returns useful fields, such as the `create_date` and credential name.

| Column name | Data type | Description |
| --- | --- | --- |
| `credential_id` | **int** | ID of the credential to which the password belongs. This ID is unique within the server instance. |
| `family_guid` | **uniqueidentifier** | Unique ID of the original database at creation. This GUID remains the same after the database is restored or attached, even if the database name is changed.<br /><br />If automatic decryption by the service master key fails,  SQL Server |
 | uses the `family_guid` to identify credentials that might contain the password used to protect the database master key. |
  
## Permissions

The visibility of the metadata in catalog views is limited to securables that a user either owns, or on which the user was granted some permission.
 For more information, see [Metadata Visibility Configuration](../security/metadata-visibility-configuration.md).

 SQL Server 2022 (16.x) 
 and later versions require VIEW SERVER SECURITY STATE permission on the server.

## Related content

- [System catalog views (Transact-SQL)](catalog-views-transact-sql.md)
- [sp_control_dbmasterkey_password (Transact-SQL)](../system-stored-procedures/sp-control-dbmasterkey-password-transact-sql.md)
- [Security Catalog Views (Transact-SQL)](security-catalog-views-transact-sql.md)
- [CREATE SYMMETRIC KEY (Transact-SQL)](../../t-sql/statements/create-symmetric-key-transact-sql.md)
- [Encryption hierarchy](../security/encryption/encryption-hierarchy.md)
