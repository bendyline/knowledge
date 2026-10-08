---
title: "managed_backup.fn_backup_instance_config (Transact-SQL)"
description: "managed_backup.fn_backup_instance_config (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "06/10/2016"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "fn_backup_instance_config"
  - "smart_admin.fn_backup_instance_config_TSQL"
  - "fn_backup_instance_config_TSQL"
  - "smart_admin.fn_backup_instance_config"
helpviewer_keywords:
  - "smart_admin.fn_backup_instance_config"
  - "fn_backup_instance_config"
dev_langs:
  - "TSQL"
---
# managed_backup.fn_backup_instance_config (Transact-SQL)

**Applies to:**
 

 and later versions

  Returns 1 row with the  SQL Server managed backup to Microsoft Azure 
 default configuration settings for the instance of SQL Server.  
  
 Use this stored procedure to review or determine the current  SQL Server managed backup to Microsoft Azure 
 default configuration settings for the instance of SQL Server.  
  
  
 
  
## Syntax  
  
```sql  
managed_backup.fn_backup_db_config ()  
```  
  
##  <a name="Arguments"></a> Arguments  
 None  
  
## Table Returned  
  
| Column Name | Data Type | Description |
| --- | --- | --- |
| is_smart_backup_enabled | INT | Displays 1 when  SQL Server managed backup to Microsoft Azure |
 | is enabled, and 0 when  SQL Server managed backup to Microsoft Azure |
 | is disabled. |
| credential_name | SYSNAME | Default SQL Credential used to authenticate to the storage. |
| retention_days | INT | Default retention period set at the instance level. |
| storage_url | NVARCHAR(1024) | The default storage account URL set at the instance level. |
| encryption_algorithm | SYSNAME | Name of the encryption algorithm. Is set to NULL if encryption is not specified. |
| encryptor_type | NVARCHAR(32) | The type of encryptor used: Certificate or Asymmetric Key. Is set to NULL if there is no encryptor specified. |
| encryptor_name | SYSNAME | The name of the certificate or asymmetric key. Is set to NULL if there is no name specified |
  
## Security  
  
### Permissions  
 Requires membership in the **db_backupoperator** database role with **ALTER ANY CREDENTIAL** permissions. The user should not be denied **VIEW ANY DEFINITION** permissions.  
  
## Examples  
 The following example returns the  SQL Server managed backup to Microsoft Azure 
 default configuration settings for the instance it is executed on:  
  
```  
Use msdb;  
GO  
SELECT * FROM managed_backup.fn_backup_instance_config ();  
  
```
