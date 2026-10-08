---
title: "REVOKE (Transact-SQL)"
description: REVOKE (Transact-SQL)
author: VanMSFT
ms.author: vanto
ms.date: "07/26/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "REVOKE_TSQL"
  - "REVOKE"
helpviewer_keywords:
  - "schema-level securables [SQL Server]"
  - "REVOKE statement, Transact-SQL syntax"
  - "removing permissions"
  - "server-level securables [SQL Server]"
  - "deleting permissions"
  - "revoking permissions [SQL Server]"
  - "REVOKE statement"
  - "denying permissions [SQL Server], removing"
  - "database-level securables [SQL Server]"
  - "granting permissions [SQL Server], removing"
  - "permissions [SQL Server], revoking"
  - "dropping permissions"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---
# REVOKE (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Removes a previously granted or denied permission.  
  
 
  
## Syntax  

Syntax for SQL Server, Azure SQL Database, and Fabric SQL database

```syntaxsql
-- Simplified syntax for REVOKE  
REVOKE [ GRANT OPTION FOR ]  
      {   
        [ ALL [ PRIVILEGES ] ]  
        |  
                permission [ ( column [ ,...n ] ) ] [ ,...n ]  
      }  
      [ ON [ class :: ] securable ]   
      { TO | FROM } principal [ ,...n ]   
      [ CASCADE] [ AS principal ]  
```

Syntax for Azure Synapse Analytics and Microsoft Fabric warehouse

```syntaxsql
REVOKE
    <permission> [ ,...n ]  
    [ ON [ <class_type> :: ] securable ]   
    [ FROM | TO ] principal [ ,...n ]  
    [ CASCADE ]  
[;]  
  
<permission> ::=  
{ see the tables below }  
  
<class_type> ::=  
{  
      LOGIN  
    | DATABASE  
    | OBJECT  
    | ROLE  
    | SCHEMA  
    | USER  
}  
```
  
## Arguments
 GRANT OPTION FOR  
 Indicates that the ability to grant the specified permission will be revoked. This is required when you are using the CASCADE argument.  
  
> **Important:**  
>  If the principal has the specified permission without the GRANT option, the permission itself will be revoked.  
  
 ALL  
**Applies to**:  SQL Server 2008 (10.0.x) 
 and later
  
 This option does not revoke all possible permissions. Revoking ALL is equivalent to revoking the following permissions.  
  
-   If the securable is a database, ALL means BACKUP DATABASE, BACKUP LOG, CREATE DATABASE, CREATE DEFAULT, CREATE FUNCTION, CREATE PROCEDURE, CREATE RULE, CREATE TABLE, and CREATE VIEW.  
  
-   If the securable is a scalar function, ALL means EXECUTE and REFERENCES.  
  
-   If the securable is a table-valued function, ALL means DELETE, INSERT, REFERENCES, SELECT, and UPDATE.  
  
-   If the securable is a stored procedure, ALL means EXECUTE.  
  
-   If the securable is a table, ALL means DELETE, INSERT, REFERENCES, SELECT, and UPDATE.  
  
-   If the securable is a view, ALL means DELETE, INSERT, REFERENCES, SELECT, and UPDATE.  
  
> **Note:**  
>  The REVOKE ALL syntax is deprecated. This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  Revoke specific permissions instead.  
  
 PRIVILEGES  
 Included for ISO compliance. Does not change the behavior of ALL.  
  
 *permission*  
 Is the name of a permission. The valid mappings of permissions to securables are described in the topics listed in [Securable-specific Syntax](#securable) later in this topic.  
  
 *column*  
 Specifies the name of a column in a table on which permissions are being revoked. The parentheses are required.  
  
 *class*  
 Specifies the class of the securable on which the permission is being revoked. The scope qualifier **::** is required.  
  
 *securable*  
 Specifies the securable on which the permission is being revoked.  
  
 TO | FROM *principal*  
 Is the name of a principal. The principals from which permissions on a securable can be revoked vary, depending on the securable. For more information about valid combinations, see the topics listed in [Securable-specific Syntax](#securable) later in this topic.  
  
 CASCADE  
 Indicates that the permission that is being revoked is also revoked from other principals to which it has been granted by this principal. When you are using the CASCADE argument, you must also include the GRANT OPTION FOR argument.  
  
> **Caution:**  
>  A cascaded revocation of a permission granted WITH GRANT OPTION will revoke both GRANT and DENY of that permission.  
  
 AS *principal*  
 Use the AS principal clause to indicate that you are revoking a permission that was granted by a principal other than you. For example, presume that user Mary is principal_id 12 and user Raul is principal_id 15. Both Mary and Raul grant a user named Steven the same permission. The sys.database_permissions table will indicate the permissions twice but they will each have a different grantor_principal_id value. Mary could revoke the permission using the `AS RAUL` clause to remove Raul's grant of the permission.
 
The use of AS in this statement does not imply the ability to impersonate another user.  
  
## Remarks  
 The full syntax of the REVOKE statement is complex. The syntax diagram above was simplified to draw attention to its structure. Complete syntax for revoking permissions on specific securables is described in the topics listed in [Securable-specific Syntax](#securable) later in this topic.  
  
 The REVOKE statement can be used to remove granted permissions, and the DENY statement can be used to prevent a principal from gaining a specific permission through a GRANT.  
  
 Granting a permission removes DENY or REVOKE of that permission on the specified securable. If the same permission is denied at a higher scope that contains the securable, the DENY takes precedence. However, revoking the granted permission at a higher scope does not take precedence.  
  
> **Caution:**  
>  A table-level DENY does not take precedence over a column-level GRANT. This inconsistency in the permissions hierarchy has been preserved for backward compatibility. It will be removed in a future release.  
  
 The sp_helprotect system stored procedure reports permissions on a database-level securable  
  
 The REVOKE statement will fail if CASCADE is not specified when you are revoking a permission from a principal that was granted that permission with GRANT OPTION specified.  
  
## Permissions  
 Principals with CONTROL permission on a securable can revoke permission on that securable. Object owners can revoke permissions on the objects they own.  
  
 Grantees of CONTROL SERVER permission, such as members of the sysadmin fixed server role, can revoke any permission on any securable in the server. Grantees of CONTROL permission on a database, such as members of the db_owner fixed database role, can revoke any permission on any securable in the database. Grantees of CONTROL permission on a schema can revoke any permission on any object within the schema.  
  
##  <a name="securable"></a> Securable-specific Syntax  
 The following table lists the securables and the topics that describe the securable-specific syntax.  
  
| Securable | Topic |
| --- | --- |
| Application Role | [REVOKE Database Principal Permissions (Transact-SQL)](revoke-database-principal-permissions-transact-sql.md) |
| Assembly | [REVOKE Assembly Permissions (Transact-SQL)](revoke-assembly-permissions-transact-sql.md) |
| Asymmetric Key | [REVOKE Asymmetric Key Permissions (Transact-SQL)](revoke-asymmetric-key-permissions-transact-sql.md) |
| Availability Group | [REVOKE Availability Group Permissions (Transact-SQL)](revoke-availability-group-permissions-transact-sql.md) |
| Certificate | [REVOKE Certificate Permissions (Transact-SQL)](revoke-certificate-permissions-transact-sql.md) |
| Contract | [REVOKE Service Broker Permissions (Transact-SQL)](revoke-service-broker-permissions-transact-sql.md) |
| Database | [REVOKE Database Permissions (Transact-SQL)](revoke-database-permissions-transact-sql.md) |
| Endpoint | [REVOKE Endpoint Permissions (Transact-SQL)](revoke-endpoint-permissions-transact-sql.md) |
| Database Scoped Credential | [REVOKE Database Scoped Credential (Transact-SQL)](revoke-database-scoped-credential-transact-sql.md) |
| Full-text Catalog | [REVOKE Full-Text Permissions (Transact-SQL)](revoke-full-text-permissions-transact-sql.md) |
| Full-Text Stoplist | [REVOKE Full-Text Permissions (Transact-SQL)](revoke-full-text-permissions-transact-sql.md) |
| Function | [REVOKE Object Permissions (Transact-SQL)](revoke-object-permissions-transact-sql.md) |
| Login | [REVOKE Server Principal Permissions (Transact-SQL)](revoke-server-principal-permissions-transact-sql.md) |
| Message Type | [REVOKE Service Broker Permissions (Transact-SQL)](revoke-service-broker-permissions-transact-sql.md) |
| Object | [REVOKE Object Permissions (Transact-SQL)](revoke-object-permissions-transact-sql.md) |
| Queue | [REVOKE Object Permissions (Transact-SQL)](revoke-object-permissions-transact-sql.md) |
| Remote Service Binding | [REVOKE Service Broker Permissions (Transact-SQL)](revoke-service-broker-permissions-transact-sql.md) |
| Role | [REVOKE Database Principal Permissions (Transact-SQL)](revoke-database-principal-permissions-transact-sql.md) |
| Route | [REVOKE Service Broker Permissions (Transact-SQL)](revoke-service-broker-permissions-transact-sql.md) |
| Schema | [REVOKE Schema Permissions (Transact-SQL)](revoke-schema-permissions-transact-sql.md) |
| Search Property List | [REVOKE Search Property List Permissions (Transact-SQL)](revoke-search-property-list-permissions-transact-sql.md) |
| Server | [REVOKE Server Permissions (Transact-SQL)](revoke-server-permissions-transact-sql.md) |
| Service | [REVOKE Service Broker Permissions (Transact-SQL)](revoke-service-broker-permissions-transact-sql.md) |
| Stored Procedure | [REVOKE Object Permissions (Transact-SQL)](revoke-object-permissions-transact-sql.md) |
| Symmetric Key | [REVOKE Symmetric Key Permissions (Transact-SQL)](revoke-symmetric-key-permissions-transact-sql.md) |
| Synonym | [REVOKE Object Permissions (Transact-SQL)](revoke-object-permissions-transact-sql.md) |
| System Objects | [REVOKE System Object Permissions (Transact-SQL)](revoke-system-object-permissions-transact-sql.md) |
| Table | [REVOKE Object Permissions (Transact-SQL)](revoke-object-permissions-transact-sql.md) |
| Type | [REVOKE Type Permissions (Transact-SQL)](revoke-type-permissions-transact-sql.md) |
| User | [REVOKE Database Principal Permissions (Transact-SQL)](revoke-database-principal-permissions-transact-sql.md) |
| View | [REVOKE Object Permissions (Transact-SQL)](revoke-object-permissions-transact-sql.md) |
| XML Schema Collection | [REVOKE XML Schema Collection Permissions (Transact-SQL)](revoke-xml-schema-collection-permissions-transact-sql.md) |

  
## Examples  
  
### A. Grant and revoke
 **Applies to:**  SQL Server 
,  SQL Database
  
  
The following example creates a schema, a contained database user, and a new role on a user database. It adds the user to the role, grants SELECT permission on the schema to the role, and then removes (`REVOKE`) that permission to the role.

  
```sql  
CREATE SCHEMA Sales;  
GO
CREATE USER Joe without login;
GO
CREATE ROLE Vendors;
GO
ALTER ROLE Vendors ADD MEMBER Joe; 
GO
GRANT SELECT ON SCHEMA :: Sales TO Vendors;
GO
REVOKE SELECT ON SCHEMA :: Sales TO Vendors;
GO
 
```  
  
## Related content

- [Permissions Hierarchy (Database Engine)](../../relational-databases/security/permissions-hierarchy-database-engine.md)
- [DENY (Transact-SQL)](deny-transact-sql.md)
- [GRANT (Transact-SQL)](grant-transact-sql.md)
- [sys.sp_addlogin (Transact-SQL)](../../relational-databases/system-stored-procedures/sp-addlogin-transact-sql.md)
- [sys.sp_adduser (Transact-SQL)](../../relational-databases/system-stored-procedures/sp-adduser-transact-sql.md)
- [sys.sp_changedbowner (Transact-SQL)](../../relational-databases/system-stored-procedures/sp-changedbowner-transact-sql.md)
- [sys.sp_dropuser (Transact-SQL)](../../relational-databases/system-stored-procedures/sp-dropuser-transact-sql.md)
- [sys.sp_helprotect (Transact-SQL)](../../relational-databases/system-stored-procedures/sp-helprotect-transact-sql.md)
- [sys.sp_helpuser (Transact-SQL)](../../relational-databases/system-stored-procedures/sp-helpuser-transact-sql.md)
