---
title: "Security Stored Procedures (Transact-SQL)"
description: "Security stored procedures (Transact-SQL)"
author: VanMSFT
ms.author: vanto
ms.reviewer: randolphwest
ms.date: 06/23/2025
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "system stored procedures [SQL Server], security"
  - "stored procedures [SQL Server], security"
  - "security [SQL Server], stored procedures"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# Security stored procedures (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



 SQL Server 
 supports the following system stored procedures that are used to manage security. Some of these stored procedures are deprecated, but continue to be available to support backward compatibility. The topics for deprecated procedures will list their replacement.



        [sys.sp_add_trusted_assembly](sys-sp-add-trusted-assembly-transact-sql.md)  


        [sp_addapprole](sp-addapprole-transact-sql.md) (Deprecated)




        [sp_addlinkedserver](sp-addlinkedserver-transact-sql.md)


        [sp_addlinkedsrvlogin](sp-addlinkedsrvlogin-transact-sql.md)




        [sp_addlogin](sp-addlogin-transact-sql.md) (Deprecated)  


        [sp_addremotelogin](sp-addremotelogin-transact-sql.md) (Deprecated)




        [sp_addrole](sp-addrole-transact-sql.md) (Deprecated)  


        [sp_addrolemember](sp-addrolemember-transact-sql.md) (Deprecated)




        [sp_addserver](sp-addserver-transact-sql.md) (Deprecated)  


        [sp_addsrvrolemember](sp-addsrvrolemember-transact-sql.md) (Deprecated)




        [sp_adduser](sp-adduser-transact-sql.md) (Deprecated)  


        [sp_approlepassword](sp-approlepassword-transact-sql.md) (Deprecated)




        [sp_audit_write](sp-audit-write-transact-sql.md)  


        [sp_change_users_login](sp-change-users-login-transact-sql.md) (Deprecated)




        [sp_changedbowner](sp-changedbowner-transact-sql.md) (Deprecated)  


        [sp_changeobjectowner](sp-changeobjectowner-transact-sql.md) (Deprecated)




        [sp_control_dbmasterkey_password](sp-control-dbmasterkey-password-transact-sql.md)  


        [sys.sp_copy_data_in_batches](sys-sp-copy-data-in-batches-transact-sql.md)  




        [sp_dbfixedrolepermission](sp-dbfixedrolepermission-transact-sql.md) (Deprecated)


        [sp_defaultdb](sp-defaultdb-transact-sql.md) (Deprecated)  




        [sp_defaultlanguage](sp-defaultlanguage-transact-sql.md) (Deprecated)


        [sp_denylogin](sp-denylogin-transact-sql.md) (Deprecated)  




        [sp_describe_parameter_encryption](sp-describe-parameter-encryption-transact-sql.md)


        [sp_dropalias](system-stored-procedures-transact-sql.md) (Deprecated)  




        [sys.sp_drop_trusted_assembly](sys-sp-drop-trusted-assembly-transact-sql.md)  


        [sp_dropapprole](sp-dropapprole-transact-sql.md) (Deprecated)  




        [sp_droplinkedsrvlogin](sp-droplinkedsrvlogin-transact-sql.md)  


        [sp_droplogin](sp-droplogin-transact-sql.md) (Deprecated)  




        [sp_dropremotelogin](sp-dropremotelogin-transact-sql.md) (Deprecated)  


        [sp_droprole](sp-droprole-transact-sql.md) (Deprecated)  




        [sp_droprolemember](sp-droprolemember-transact-sql.md) (Deprecated)  


        [sp_dropserver](sp-dropserver-transact-sql.md)  




        [sp_dropsrvrolemember](sp-dropsrvrolemember-transact-sql.md) (Deprecated)  


        [sp_dropuser](sp-dropuser-transact-sql.md) (Deprecated)  




        [sys.sp_generate_database_ledger_digest](sys-sp-generate-database-ledger-digest-transact-sql.md)  


        [sp_external_policy_refresh](sp-external-policy-refresh-transact-sql.md)  




        [sp_grantdbaccess](sp-grantdbaccess-transact-sql.md) (Deprecated)  


        [sp_grantlogin](sp-grantlogin-transact-sql.md) (Deprecated)  




        [sp_helpdbfixedrole](sp-helpdbfixedrole-transact-sql.md)  


        [sp_helplinkedsrvlogin](sp-helplinkedsrvlogin-transact-sql.md)  




        [sp_helplogins](sp-helplogins-transact-sql.md)  


        [sp_helpntgroup](sp-helpntgroup-transact-sql.md)  




        [sp_helpremotelogin](sp-helpremotelogin-transact-sql.md) (Deprecated)  


        [sp_helprole](sp-helprole-transact-sql.md)  




        [sp_helprolemember](sp-helprolemember-transact-sql.md)  


        [sp_helprotect](sp-helprotect-transact-sql.md) (Deprecated)  




        [sp_helpsrvrole](sp-helpsrvrole-transact-sql.md)  


        [sp_helpsrvrolemember](sp-helpsrvrolemember-transact-sql.md)  




        [sp_helpuser](sp-helpuser-transact-sql.md) (Deprecated)  


        [sp_migrate_user_to_contained](sp-migrate-user-to-contained-transact-sql.md)




        [sp_MShasdbaccess](sp-mshasdbaccess-transact-sql.md)  


        [sp_password](sp-password-transact-sql.md) (Deprecated)




        [sp_refresh_parameter_encryption](sp-refresh-parameter-encryption-transact-sql.md)  


        [sp_remoteoption](sp-remoteoption-transact-sql.md) (Deprecated)




        [sp_revokedbaccess](sp-revokedbaccess-transact-sql.md) (Deprecated)  


        [sp_revokelogin](sp-revokelogin-transact-sql.md) (Deprecated)




        [sp_setapprole](sp-setapprole-transact-sql.md)  


        [sp_srvrolepermission](sp-srvrolepermission-transact-sql.md) (Deprecated)




        [sp_testlinkedserver](sp-testlinkedserver-transact-sql.md)  


        [sp_unsetapprole](sp-unsetapprole-transact-sql.md)  




        [sp_validatelogins](sp-validatelogins-transact-sql.md)  


        [sys.sp_verify_database_ledger](sys-sp-verify-database-ledger-transact-sql.md)  




        [sys.sp_verify_database_ledger_from_digest_storage](sys-sp-verify-database-ledger-from-digest-storage-transact-sql.md)  


        [sp_xp_cmdshell_proxy_account](sp-xp-cmdshell-proxy-account-transact-sql.md)  



&nbsp;

## Related content

- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
- [Security Functions (Transact-SQL)](../../t-sql/functions/security-functions-transact-sql.md)
