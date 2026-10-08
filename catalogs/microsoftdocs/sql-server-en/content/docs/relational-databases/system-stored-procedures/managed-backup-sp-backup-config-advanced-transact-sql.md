---
title: "managed_backup.sp_backup_config_advanced (Transact-SQL)"
description: Configures advanced settings for SQL Server Managed Backup to Azure.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_backup_config_optional"
  - "sp_backup_config_optional_TSQL"
  - "managed_backup.sp_backup_config_optional_TSQL"
  - "managed_backup.sp_backup_config_optional"
helpviewer_keywords:
  - "sp_backup_config_optional"
  - "managed_backup.sp_backup_config_optional"
dev_langs:
  - "TSQL"
---
# managed_backup.sp_backup_config_advanced (Transact-SQL)


**Applies to:**
 

 and later versions

Configures advanced settings for  SQL Server managed backup to Microsoft Azure 
.



## Syntax

```syntaxsql
managed_backup.sp_backup_config_advanced
    [ [ @database_name = ] N'database_name' ]
    [ , [ @encryption_algorithm = ] N'encryption_algorithm' ]
    [ , [ @encryptor_type = ] { 'CERTIFICATE' | 'ASYMMETRIC_KEY' } ]
    [ , [ @encryptor_name = ] N'encryptor_name' ]
    [ , [ @local_cache_path = ] N'local_cache_path' ]
[ ; ]
```

## Arguments

#### [ @database_name = ] N'*database_name*'

The database name for enabling managed backup on a specific database.

If *@database_name* is set to `NULL`, the settings are applied at instance level (applies to all new databases created on the instance).

#### [ @encryption_algorithm = ] N'*encryption_algorithm*'

The name of the encryption algorithm used during the backup to encrypt the backup file. *@encryption_algorithm* is **sysname**. It's a required parameter when configuring  SQL Server managed backup to Microsoft Azure 
 for the first time for the database. Specify `NO_ENCRYPTION` if you don't wish to encrypt the backup file. When you change the  SQL Server managed backup to Microsoft Azure 
 configuration settings, this parameter is optional. If the parameter isn't specified, the existing configuration values are retained. The allowed values for this parameter are:

- AES_128
- AES_192
- AES_256
- TRIPLE_DES_3KEY
- NO_ENCRYPTION

For more information on encryption algorithms, see [Choose an encryption algorithm](../security/encryption/choose-an-encryption-algorithm.md).

#### [ @encryptor_type = ] { 'CERTIFICATE' | 'ASYMMETRIC_KEY' }

The type of encryptor, which can be either `CERTIFICATE` or `ASYMMETRIC_KEY`. *@encryptor_type* is **nvarchar(32)**. This parameter is optional if you specify `NO_ENCRYPTION` for the *@encryption_algorithm* parameter.

#### [ @encryptor_name = ] N'*encryptor_name*'

The name of an existing certificate or asymmetric key to use to encrypt the backup. *@encryptor_name* is **sysname**. If using an asymmetric key, it must be configured with Extensible Key Management (EKM). This parameter is optional if you specify `NO_ENCRYPTION` for the *@encryption_algorithm* parameter.

For more information, see [Extensible Key Management (EKM)](../security/encryption/extensible-key-management-ekm.md).

#### [ @local_cache_path = ] N'*local_cache_path*'

 Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. 


## Return code values

`0` (success) or `1` (failure).

## Permissions

Requires membership in the **db_backupoperator** database role, with ALTER ANY CREDENTIAL permissions, and EXECUTE permissions on the `sp_delete_backuphistory` stored procedure.

## Examples

The following example sets advanced configuration options for  SQL Server managed backup to Microsoft Azure 
 for the instance of SQL Server.

```sql
USE msdb;
GO

EXECUTE managed_backup.sp_backup_config_advanced
    @encryption_algorithm = 'AES_128',
    @encryptor_type = 'CERTIFICATE',
    @encryptor_name = 'MyTestDBBackupEncryptCert';
GO
```

## Related content

- [managed_backup.sp_backup_config_basic (Transact-SQL)](managed-backup-sp-backup-config-basic-transact-sql.md)
- [managed_backup.sp_backup_config_schedule (Transact-SQL)](managed-backup-sp-backup-config-schedule-transact-sql.md)
