---
title: "REVOKE System Object Permissions (Transact-SQL)"
description: REVOKE System Object Permissions (Transact-SQL)
author: VanMSFT
ms.author: vanto
ms.date: "06/10/2016"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
helpviewer_keywords:
  - "REVOKE statement, system objects"
  - "permissions [SQL Server], system objects"
dev_langs:
  - "TSQL"
---
# REVOKE System Object Permissions (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





  Revokes permissions on system objects such as stored procedures, extended stored procedures, functions, and views from a principal.  
  
 
  
## Syntax  
  
```syntaxsql
REVOKE { SELECT | EXECUTE } ON [sys.]system_object FROM principal   
```  
  
## Arguments
 [**sys.**] .  
 The **sys** qualifier is required only when you are referring to catalog views and dynamic management views.  
  
 *system_object*  
 Specifies the object on which permission is being revoked.  
  
 *principal*  
 Specifies the principal from which the permission is being revoked.  
  
## Remarks  
 This statement can be used to revoke permissions on certain stored procedures, extended stored procedures, table-valued functions, scalar functions, views, catalog views, compatibility views, INFORMATION_SCHEMA views, dynamic management views, and system tables that are installed by  SQL Server 
. Each of these system objects exists as a unique record in the resource database (**mssqlsystemresource**). The resource database is read-only. A link to the object is exposed as a record in the **sys** schema of every database.  
  
 Default name resolution resolves unqualified procedure names to the resource database. Therefore, the **sys.** qualifier is required only when you are specifying catalog views and dynamic management views.  
  
> **Caution:**  
>  Revoking permissions on system objects will cause applications that depend on them to fail.  SQL Server Management Studio 
 uses catalog views and may not function as expected if you change the default permissions on catalog views.  
  
 Revoking permissions on triggers and on columns of system objects is not supported.  
  
 Permissions on system objects will be preserved during upgrades of  SQL Server 
.  
  
 System objects are visible in the [sys.system_objects](../../relational-databases/system-catalog-views/sys-system-objects-transact-sql.md) catalog view.  
  
## Permissions  
 Requires CONTROL SERVER permission.  
  
## Examples  
 The following example revokes `EXECUTE` permission on `sp_addlinkedserver` from `public`.  
  
```sql  
REVOKE EXECUTE ON sys.sp_addlinkedserver FROM public;  
GO  
```  
  
## Related content

- [sys.system_objects (Transact-SQL)](../../relational-databases/system-catalog-views/sys-system-objects-transact-sql.md)
- [sys.database_permissions (Transact-SQL)](../../relational-databases/system-catalog-views/sys-database-permissions-transact-sql.md)
- [GRANT system object permissions (Transact-SQL)](grant-system-object-permissions-transact-sql.md)
- [DENY system object permissions (Transact-SQL)](deny-system-object-permissions-transact-sql.md)
