---
title: CREATE USER (Transact-SQL)
description: CREATE USER (Transact-SQL)
author: VanMSFT
ms.author: vanto
ms.reviewer: wiassaf, jaszymas
ms.date: 02/23/2026
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - sfi-ropc-blocked
  - ignite-2025
f1_keywords:
  - "WITHOUT_LOGIN_TSQL"
  - "CREATE_USER_TSQL"
  - "SQL13.SWB.DATABASEUSER.OWNEDSCHEMAS.F1"
  - "WITHOUT LOGIN"
  - "CREATE USER"
  - "ALLOW_ENCRYPTED_VALUE_MODIFICATIONS"
  - "ALLOW_ENCRYPTED_VALUE_MODIFICATIONS_TSQL"
helpviewer_keywords:
  - "adding users"
  - "WITHOUT LOGIN [SQL Server]"
  - "CREATE USER statement"
  - "database user additions [SQL Server]"
  - "USER WITHOUT LOGIN [SQL Server]"
  - "users [SQL Server], adding"
  - "users [SQL Server]"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---

# CREATE USER (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Adds a user to the current database. The 13 types of users are listed with a sample of the most basic syntax:  
  

> **Note:**
> While Microsoft Entra ID is the [new name for Azure Active Directory (Azure AD)](https://learn.microsoft.com/entra/fundamentals/new-name), to prevent disrupting existing environments, Azure AD still remains in some hardcoded elements such as UI fields, connection providers, error codes, and cmdlets. In this article, the two names are interchangeable. 


**Users based on logins in `master`**
  
-   User based on a login based on a Windows Active Directory account. `CREATE USER [Contoso\Fritz];`     
-   User based on a login based on a Windows group. `CREATE USER [Contoso\Sales];`   
-   User based on a login using  SQL Server 
 authentication. `CREATE USER Mary;`  
-   User based on a Microsoft Entra login. `CREATE USER [bob@contoso.com] FROM LOGIN [bob@contoso.com]`
    > **Note:**
    > [Microsoft Entra server principals (logins)](https://learn.microsoft.com/azure/azure-sql/database/authentication-azure-ad-logins) are currently in public preview for Azure SQL Database.

    > **Note:**
    > Logins, and therefore users based on logins, aren't supported in SQL database in Microsoft Fabric.

**Users that authenticate at the database** - Recommended to help make your database more portable.  
 Always allowed in  SQL Database
. Only allowed in a contained database in  SQL Server 
.  
  
-   User based on a Windows user that has no login. `CREATE USER [Contoso\Fritz];`    
-   User based on a Windows group that has no login. `CREATE USER [Contoso\Sales];`  
-   User in  SQL Database
 or  Azure Synapse Analytics  based on a Microsoft Entra user. `CREATE USER [Fritz@contoso.com] FROM EXTERNAL PROVIDER;`     

-   Contained database user with password. (Not available in  Azure Synapse Analytics .) `CREATE USER Mary WITH PASSWORD = '********';`   
  
**Users based on Windows principals that connect through Windows group logins**  
  
-   User based on a Windows user that has no login, but can connect to the  Database Engine 
 through membership in a Windows group. `CREATE USER [Contoso\Fritz];`  
  
-   User based on a Windows group that has no login, but can connect to the  Database Engine 
 through membership in a different Windows group. `CREATE USER [Contoso\Fritz];`  
  
**Users that cannot authenticate** - These users can't log into  SQL Server 
 or  SQL Database
.  
  
-   User without a login. Can't log in but can be granted permissions. `CREATE USER CustomApp WITHOUT LOGIN;`    
-   User based on a certificate. Can't log in but can be granted permissions and can sign modules. `CREATE USER TestProcess FOR CERTIFICATE CarnationProduction50;`  
-   User based on an asymmetric key. Can't log in but can be granted permissions and can sign modules. `CREATE User TestProcess FROM ASYMMETRIC KEY PacificSales09;`   
 



## Syntax  

Syntax for SQL Server, Azure SQL Database, Azure SQL Managed Instance 

```syntaxsql 
-- Syntax Users based on logins in master  
CREATE USER user_name   
    [   
        { FOR | FROM } LOGIN login_name   
    ]  
    [ WITH <limited_options_list> [ ,... ] ]   
[ ; ]  
  
-- Users that authenticate at the database  
CREATE USER   
    {  
      windows_principal [ WITH <options_list> [ ,... ] ]  
  
    | user_name WITH PASSWORD = 'password' [ , <options_list> [ ,... ]   
    | Microsoft_Entra_principal FROM EXTERNAL PROVIDER [WITH OBJECT_ID = 'objectid'] 
    }  
  
 [ ; ]  
  
-- Users based on Windows principals that connect through Windows group logins  
CREATE USER   
    {   
          windows_principal [ { FOR | FROM } LOGIN windows_principal ]  
        | user_name { FOR | FROM } LOGIN windows_principal  
}  
    [ WITH <limited_options_list> [ ,... ] ]   
[ ; ]  
  
-- Users that cannot authenticate   
CREATE USER user_name   
    {  
         WITHOUT LOGIN [ WITH <limited_options_list> [ ,... ] ]  
       | { FOR | FROM } CERTIFICATE cert_name   
       | { FOR | FROM } ASYMMETRIC KEY asym_key_name   
    }  
 [ ; ]  
  
<options_list> ::=  
      DEFAULT_SCHEMA = schema_name  
    | DEFAULT_LANGUAGE = { NONE | lcid | language name | language alias }  
    | SID = sid   
    | ALLOW_ENCRYPTED_VALUE_MODIFICATIONS = [ ON | OFF ] ]

<limited_options_list> ::=  
      DEFAULT_SCHEMA = schema_name ]   
    | ALLOW_ENCRYPTED_VALUE_MODIFICATIONS = [ ON | OFF ] ]  
  
-- SQL Database syntax when connected to a federation member  
CREATE USER user_name  
[;]

-- Syntax for users based on Microsoft Entra logins for Azure SQL Managed Instance
CREATE USER user_name   
    [   { FOR | FROM } LOGIN login_name  ]  
    | FROM EXTERNAL PROVIDER
    [ WITH <limited_options_list> [ ,... ] ]   
[ ; ]  


<limited_options_list> ::=  
      DEFAULT_SCHEMA = schema_name 
    | DEFAULT_LANGUAGE = { NONE | lcid | language name | language alias }   
    | ALLOW_ENCRYPTED_VALUE_MODIFICATIONS = [ ON | OFF ] ] 
```

Syntax for Azure Synapse Analytics

```syntaxsql
CREATE USER user_name   
    [ { { FOR | FROM } { LOGIN login_name }   
      | WITHOUT LOGIN  
    ]   
    [ WITH DEFAULT_SCHEMA = schema_name ]  
[;]

CREATE USER Microsoft_Entra_principal FROM EXTERNAL PROVIDER  
    [ WITH DEFAULT_SCHEMA = schema_name ]  
[;]
```

Syntax for SQL database in Microsoft Fabric
 and Azure SQL Database

```syntaxsql 
CREATE USER   
    {  
    Microsoft_Entra_principal FROM EXTERNAL PROVIDER [ WITH <limited_options_list> [ ,... ] ]    
    | Microsoft_Entra_principal WITH <options_list> [ ,... ] 
    }  
 [ ; ]  
  
-- Users that cannot authenticate   
CREATE USER user_name   
    {    WITHOUT LOGIN [ WITH DEFAULT_SCHEMA = schema_name ]  
       | { FOR | FROM } CERTIFICATE cert_name   
       | { FOR | FROM } ASYMMETRIC KEY asym_key_name   
    }  
 [ ; ]  
  
<limited_options_list> ::=  
      DEFAULT_SCHEMA = schema_name  
    | OBJECT_ID = 'objectid'

<options_list> ::=  
      DEFAULT_SCHEMA = schema_name  
    | SID = sid  
    | TYPE = { X | E }

```

## Arguments

#### *user_name*  
 Specifies the name by which the user is identified inside this database. *user_name* is a **sysname**. It can be up to 128 characters long. When creating a user based on a Windows principal, the Windows principal name becomes the user name unless another user name is specified.  
  
#### LOGIN *login_name*  
 Specifies the login for which the database user is being created. *login_name* must be a valid login in the server. Can be a login based on a Windows principal (user or group), a login using  SQL Server 
 authentication, or a login using a Microsoft Entra principal (user, group, or application). When this SQL Server login enters the database, it acquires the name and ID of the database user that is being created. When creating a login mapped from a Windows principal, use the format **[**_\<domainName\>_**\\**_\<loginName\>_**]**. For examples, see [Syntax Summary](#SyntaxSummary).  
  
 If the CREATE USER statement is the only statement in a SQL batch, Azure SQL Database supports the WITH LOGIN clause. If the CREATE USER statement isn't the only statement in a SQL batch or runs in dynamic SQL, the WITH LOGIN clause isn't supported.  
  
 #### WITH DEFAULT_SCHEMA = *schema_name*  
 Specifies the first schema searched by the server when it resolves the names of objects for this database user.  
  
 #### '*windows_principal*'  
 Specifies the Windows principal for which the database user is being created. The *windows_principal* can be a Windows user, or a Windows group. The user will be created even if the *windows_principal* doesn't have a login. When connecting to  SQL Server 
, if the *windows_principal* doesn't have a login, the Windows principal must authenticate at the  Database Engine 
 through membership in a Windows group that has a login, or the connection string must specify the contained database as the initial catalog. When creating a user from a Windows principal, use the format **[**_\<domainName\>_**\\**_\<loginName\>_**]**. For examples, see [Syntax Summary](#SyntaxSummary). Users based on Active Directory users, are limited to names of fewer than 21 characters.
  
 #### '*Microsoft_Entra_principal*'  
 **Applies to**:  SQL Server 2022 (16.x) 
 and later,  SQL Database
, SQL Managed Instance,  Azure Synapse Analytics , SQL database in Microsoft Fabric

  
 Specifies the Microsoft Entra principal for which the database user is being created. The *Microsoft_Entra_principal* can be a Microsoft Entra user, a Microsoft Entra group, or a Microsoft Entra application. (Microsoft Entra users can't have Windows Authentication logins in  SQL Database
; only database users.) The connection string must specify the contained database as the initial catalog.

 For Microsoft Entra principals, the CREATE USER syntax requires:

- UserPrincipalName of the Microsoft Entra object for Microsoft Entra users.

  - `CREATE USER [bob@contoso.com] FROM EXTERNAL PROVIDER;`  
  - `CREATE USER [alice@fabrikam.onmicrosoft.com] FROM EXTERNAL PROVIDER;`

- [Microsoft Entra server principals (logins)](https://learn.microsoft.com/azure/azure-sql/database/authentication-azure-ad-logins) introduces creating users that are mapped to Microsoft Entra logins in the `master` database. For example, `CREATE USER [bob@contoso.com] FROM LOGIN [bob@contoso.com];`

- Microsoft Entra users and service principals (applications) that are members of more than 2048 Microsoft Entra security groups aren't supported to log into databases in Azure SQL Database, Azure SQL Managed Instance, or Azure Synapse.
- DisplayName of Microsoft Entra object for Microsoft Entra groups and Microsoft Entra Applications. If you had the *Nurses* security group, you would use:  
  
  - `CREATE USER [Nurses] FROM EXTERNAL PROVIDER;`  
  
 For more information, see [Connecting to SQL Database By Using Microsoft Entra authentication](https://learn.microsoft.com/azure/azure-sql/database/authentication-aad-overview).

For more information about Microsoft Entra authentication in SQL Server, see [Tutorial: Set up Microsoft Entra authentication for SQL Server enabled by Azure Arc](../../sql-server/azure-arc/entra-authentication-setup-tutorial.md).
  
#### WITH PASSWORD = '*password*'  
 **Applies to**:  SQL Server 2012 (11.x) 
 and later,  SQL Database
.  
  
 Can only be used in a contained database. Specifies the password for the user that is being created.


Beginning with  SQL Server 2012 (11.x) 
, SQL Server and Azure SQL Database used a SHA-512 hash combined with a 32-bit random and unique salt. This method made it statistically infeasible for attackers to deduce passwords.

 SQL Server 2025 (17.x) 
 introduces an iterated hash algorithm, RFC2898, also known as a *password-based key derivation function* (PBKDF). This algorithm still uses SHA-512 but hashes the password multiple times (100,000 iterations), significantly slowing down brute-force attacks. This change enhances password protection in response to evolving security threats and helps customers comply with NIST SP 800-63b guidelines. This security enhancement uses a stronger hashing algorithm, which can slightly increase login time for SQL Authentication logins. The impact is generally lower in environments with connection pooling, but might be more noticeable in scenarios without pooling or where login latency is closely monitored.

  
#### WITHOUT LOGIN  
 Specifies that the user shouldn't be mapped to an existing login.  
  
#### CERTIFICATE *cert_name*  
 **Applies to**:  SQL Server 2008 (10.0.x) 
 and later,  SQL Database
, SQL database in Microsoft Fabric

  
 Specifies the certificate for which the database user is being created.  
  
#### ASYMMETRIC KEY *asym_key_name*  
 **Applies to**:  SQL Server 2008 (10.0.x) 
 and later,  SQL Database
, SQL database in Microsoft Fabric

  
 Specifies the asymmetric key for which the database user is being created.  
  
#### DEFAULT_LANGUAGE = *{ NONE \| \<lcid> \| \<language name> \| \<language salias> }*  
 **Applies to**:  SQL Server 2012 (11.x) 
 and later,  SQL Database

  
 Specifies the default language for the new user. If a default language is specified for the user and the default language of the database is later changed, the users default language remains as specified. If no default language is specified, the default language for the user is the default language of the database. If the default language for the user isn't specified and the default language of the database is later changed, the default language of the user changes to the new default language for the database.  
  
> **Important:**  
>  *DEFAULT_LANGUAGE* is used only for a contained database user.  

#### SID = *sid*  
 **Applies to**:  SQL Server 2012 (11.x) 
 and later, and to SQL database in Microsoft Fabric.  
  
 In  SQL Server 2012 (11.x) 
 and later, applies only to users with passwords ( SQL Server 
 authentication) in a contained database. Specifies the SID of the new database user. If this option isn't selected,  SQL Server 
 automatically assigns a SID. Use the SID parameter to create users in multiple databases that have the same identity (SID). This is useful when creating users in multiple databases to prepare for Always On failover. To determine the SID of a user, query sys.database_principals.  

In SQL database in Microsoft Fabric, `sid` should be a valid ID of the specified Microsoft Entra principal. If the principal is a user or a group, the ID should be a Microsoft Entra object ID of the user/group. If the Microsoft Entra principal is a service principal (an application or a managed identity), the ID should be an application ID (or a client ID). The specified ID must be a `binary(16)` value. The  Database Engine 
 doesn't validate the specified ID in Microsoft Entra. The `SID` argument must be used together with `TYPE`.

#### TYPE = [ E | X ]
 **Applies to**: SQL database in Microsoft Fabric and Azure SQL Database. 

Specifies the type of a Microsoft Entra principal. `E` indicates the principal is a user or a service principal (an application or a managed identity). `X` indicates the principal is a group.
  
#### ALLOW_ENCRYPTED_VALUE_MODIFICATIONS = [ ON | OFF ]  
 **Applies to**:  SQL Server 2016 (13.x) 
 and later,  SQL Database
.  
  
 Suppresses cryptographic metadata checks on the server in bulk copy operations. This  enables the user to bulk copy encrypted data between tables or databases, without decrypting the data. The default is OFF.  
  
> **Warning:**  
>  Improper use of this option can lead to data corruption. For more information, see [Migrate Sensitive Data Protected by Always Encrypted](../../relational-databases/security/encryption/migrate-sensitive-data-protected-by-always-encrypted.md).  

#### FROM EXTERNAL PROVIDER <br />
 **Applies to**:  SQL Server 2022 (16.x) 
 and later,  SQL Database
, Azure SQL Managed Instance, SQL database in Microsoft Fabric


Specifies that the principal is for Microsoft Entra authentication.  SQL Server 
 automatically validates the provided principal name in Microsoft Entra. 

If the principal issuing the `CREATE USER` statement is a Microsoft Entra user principal, the principal (or principal's group) must be in the  [Directory Readers role](https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#directory-readers) in Microsoft Entra.

In  SQL Database
 and Azure SQL Managed Instance, if the principal issuing the `CREATE USER` statement is a service principal, the identity of the database server or the managed instance must be in the  [Directory Readers role](https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#directory-readers) in Microsoft Entra.

In SQL database in Microsoft Fabric
, `FROM EXTERNAL PROVIDER` isn't allowed if a principal issuing `CREATE USER` is a service principal in Microsoft Entra. Service principals must use `TYPE` and `SID` arguments to create users for Microsoft Entra principals.

#### WITH OBJECT_ID = *'objectid'*
 **Applies to**:  SQL Server 2025 (17.x) 
 and later,  SQL Database
, Azure SQL Managed Instance, SQL database in Microsoft Fabric


Specifies the Microsoft Entra Object ID. If the `OBJECT_ID` is specified, the user_name can be a user defined alias formed from the original principal display name with a suffix appended. The user_name must be a unique name in the `sys.database_principals` view and adhere to all other `sysname` limitations. For more information on using the `WITH OBJECT_ID` option, see [Microsoft Entra logins and users with nonunique display names](https://learn.microsoft.com/azure/azure-sql/database/authentication-microsoft-entra-create-users-with-nonunique-names).

> **Note:**
> Starting with  SQL Server 2025 (17.x) 
, the `WITH OBJECT_ID` option is supported for Microsoft Entra logins and users with unique display names.
>
> If the service principal display name isn't a duplicate, the default `CREATE LOGIN` or `CREATE USER` statement should be used. The `WITH OBJECT_ID` extension is a troubleshooting repair item implemented for use with nonunique service principals. Using it with a unique service principal isn't recommended. Using the `WITH OBJECT_ID` extension for a service principal without adding a suffix runs successfully, but it isn't obvious which service principal the login or user was created for. It's recommended to create an alias using a suffix to uniquely identify the service principal.

## Remarks  
 If `FOR LOGIN` is omitted, the new database user maps to the  SQL Server 
 login with the same name.  
  
 The default schema is the first schema searched by the server when it resolves the names of objects for this database user. Unless otherwise specified, the default schema is the owner of objects created by this database user.  
  
 If the user has a default schema, that default schema is used. If the user doesn't have a default schema, but the user is a member of a group that has a default schema, the default schema of the group is used. If the user doesn't have a default schema, and is a member of more than one group, the default schema for the user is that of the Windows group with the lowest principal_id and an explicitly set default schema. (It isn't possible to explicitly select one of the available default schemas as the preferred schema.) If no default schema can be determined for a user, the **dbo** schema is used.  
  
 DEFAULT_SCHEMA can be set before the schema that it points to is created.  
  
 DEFAULT_SCHEMA can't be specified when you're creating a user mapped to a certificate, or an asymmetric key.  
  
 The value of DEFAULT_SCHEMA is ignored if the user is a member of the sysadmin fixed server role. All members of the sysadmin fixed server role have a default schema of `dbo`.  
  
 The WITHOUT LOGIN clause creates a user that isn't mapped to a SQL Server login. It can connect to other databases as guest. Permissions can be assigned to this user without a login and when the security context is changed to a user without a login, the original users receives the permissions of the user without a login. See example [D. Creating and using a user without a login](#withoutLogin).  
  
 Only users that are mapped to Windows principals can contain the backslash character (**\\**).
  
 CREATE USER can't be used to create a guest user because the guest user already exists inside every database. You can enable the guest user by granting it CONNECT permission, as shown:  
  
```sql
GRANT CONNECT TO guest; 
GO  
```  
  
 Information about database users is visible in the [sys.database_principals](../../relational-databases/system-catalog-views/sys-database-principals-transact-sql.md) catalog view.

Use the syntax extension `FROM EXTERNAL PROVIDER` to create server-level Microsoft Entra logins in Azure SQL Database and Azure SQL Managed Instance. Microsoft Entra logins allow database-level Microsoft Entra principals to be mapped to server-level Microsoft Entra logins. To create a Microsoft Entra user from a Microsoft Entra login use the following syntax:

```sql
CREATE USER [Microsoft_Entra_principal] FROM LOGIN [Microsoft Entra login];
```

When creating the user in the Azure SQL database, the *login_name* must correspond to an existing Microsoft Entra login, or else using the **FROM EXTERNAL PROVIDER** clause will only create a Microsoft Entra user without a login in the `master` database. For example, this command will create a contained user:

```sql
CREATE USER [bob@contoso.com] FROM EXTERNAL PROVIDER;
```
  
##  <a name="SyntaxSummary"></a> Syntax Summary  
 **Users based on logins in `master`**  
  
 The following list shows possible syntax for users based on logins. The default schema options aren't listed.  
  
-   `CREATE USER [Domain1\WindowsUserBarry]`  
-   `CREATE USER [Domain1\WindowsUserBarry] FOR LOGIN Domain1\WindowsUserBarry`  
-   `CREATE USER [Domain1\WindowsUserBarry] FROM LOGIN Domain1\WindowsUserBarry`  
-   `CREATE USER [Domain1\WindowsGroupManagers]`  
-   `CREATE USER [Domain1\WindowsGroupManagers] FOR LOGIN [Domain1\WindowsGroupManagers]`  
-   `CREATE USER [Domain1\WindowsGroupManagers] FROM LOGIN [Domain1\WindowsGroupManagers]`  
-   `CREATE USER SQLAUTHLOGIN`  
-   `CREATE USER SQLAUTHLOGIN FOR LOGIN SQLAUTHLOGIN`  
-   `CREATE USER SQLAUTHLOGIN FROM LOGIN SQLAUTHLOGIN`  
  
**Users that authenticate at the database**  
  
 The following list shows possible syntax for users that can only be used in a contained database. The users created won't be related to any logins in the **master** database. The default schema and language options aren't listed.  
  
> **Important:**  
>  This syntax grants users access to the database and also grants new access to the  Database Engine 
.  
  
-   `CREATE USER [Domain1\WindowsUserBarry]`  
-   `CREATE USER [Domain1\WindowsGroupManagers]`  
-   `CREATE USER Barry WITH PASSWORD = 'sdjklalie8rew8337!$d'`  
  
**Users based on Windows principals without logins in the `master` system database**  
  
 The following list shows possible syntax for users that have access to the  Database Engine 
 through a Windows group but don't have a login in the `master` system database. This syntax can be used in all types of databases. The default schema and language options aren't listed.  
  
 This syntax is similar to users based on logins in `master`, but this category of user doesn't have a login in `master`. The user must have access to the  Database Engine 
 through a Windows group login.  
  
 This syntax is similar to contained database users based on Windows principals, but this category of user doesn't get new access to the  Database Engine 
.  
  
-   `CREATE USER [Domain1\WindowsUserBarry]`  
-   `CREATE USER [Domain1\WindowsUserBarry] FOR LOGIN Domain1\WindowsUserBarry`  
-   `CREATE USER [Domain1\WindowsUserBarry] FROM LOGIN Domain1\WindowsUserBarry`  
-   `CREATE USER [Domain1\WindowsGroupManagers]`  
-   `CREATE USER [Domain1\WindowsGroupManagers] FOR LOGIN [Domain1\WindowsGroupManagers]`  
-   `CREATE USER [Domain1\WindowsGroupManagers] FROM LOGIN [Domain1\WindowsGroupManagers]`  
  
**Users that cannot authenticate**  
  
 The following list shows possible syntax for users that can't log in to  SQL Server 
.  
  
-   `CREATE USER RIGHTSHOLDER WITHOUT LOGIN`  
-   `CREATE USER CERTUSER FOR CERTIFICATE SpecialCert`  
-   `CREATE USER CERTUSER FROM CERTIFICATE SpecialCert`  
-   `CREATE USER KEYUSER FOR ASYMMETRIC KEY SecureKey`  
-   `CREATE USER KEYUSER FROM ASYMMETRIC KEY SecureKey`  
  
## Security  
 Creating a user grants access to a database but doesn't automatically grant any access to the objects in a database. After creating a user, common actions are to add users to database roles that have permission to access database objects, or grant object permissions to the user. For information about designing a permissions system, see [Getting Started with Database Engine Permissions](../../relational-databases/security/authentication-access/getting-started-with-database-engine-permissions.md).  
  
### Special Considerations for Contained Databases  
 When connecting to a contained database, if the user doesn't have a login in the `master` database, the connection string must include the contained database name as the initial catalog. The initial catalog parameter is always required for a contained database user with password.  
  
 In a contained database, creating users helps separate the database from the instance of the  Database Engine 
 so that the database can easily be moved to another instance of  SQL Server 
. For more information, see [Contained Databases](../../relational-databases/databases/contained-databases.md) and [Contained Database Users - Making Your Database Portable](../../relational-databases/security/contained-database-users-making-your-database-portable.md). To change a database user from a user based on a  SQL Server 
 authentication login to a contained database user with password, see [sp_migrate_user_to_contained &#40;Transact-SQL&#41;](../../relational-databases/system-stored-procedures/sp-migrate-user-to-contained-transact-sql.md).  
  
 In a contained database, users don't have to have logins in the `master` database.  Database Engine 
 administrators should understand that access to a contained database can be granted at the database level, instead of the  Database Engine 
 level. For more information, see [Security Best Practices with Contained Databases](../../relational-databases/databases/security-best-practices-with-contained-databases.md).  
  
 When using contained database users on  Azure SQL Database 
, configure access using a database-level firewall rule, instead of a server-level firewall rule. For more information, see [sp_set_database_firewall_rule &#40;Azure SQL Database&#41;](../../relational-databases/system-stored-procedures/sp-set-database-firewall-rule-azure-sql-database.md).
 
For  SQL Server 2022 (16.x) 
,  SQL Database
, Azure SQL Managed Instance, and  Azure Synapse Analytics  contained database users, SSMS supports multifactor authentication. For more information, see [Using Microsoft Entra multifactor authentication](https://learn.microsoft.com/azure/azure-sql/database/authentication-mfa-ssms-overview).

### Permissions  
 Requires ALTER ANY USER permission on the database.  

### Permissions for SQL Server 2022 and later
Requires CREATE USER permission on the database.
  
## Examples  
  
### A. Creating a database user based on a SQL Server login  
 The following example first creates a  SQL Server 
 login named `AbolrousHazem`, and then creates a corresponding database user `AbolrousHazem` in  `AdventureWorks2025` .  
  
```sql  
CREATE LOGIN AbolrousHazem   
    WITH PASSWORD = '340$Uuxwp7Mcxo7Khy';  
```   
Change to a user database. For example, in  SQL Server 
 use the `USE AdventureWorks2022` statement. In  Azure Synapse Analytics , you must make a new connection to the user database.

```sql   
CREATE USER AbolrousHazem FOR LOGIN AbolrousHazem;  
GO   
```  
  
### B. Creating a database user with a default schema  
 The following example first creates a server login named `WanidaBenshoof` with a password, and then creates a corresponding database user `Wanida`, with the default schema `Marketing`.  
  
```sql  
CREATE LOGIN WanidaBenshoof   
    WITH PASSWORD = '8fdKJl3$nlNv3049jsKK';  
USE AdventureWorks2022;  
CREATE USER Wanida FOR LOGIN WanidaBenshoof   
    WITH DEFAULT_SCHEMA = Marketing;  
GO  
```  
  
### C. Creating a database user from a certificate  
 The following example creates a database user `JinghaoLiu` from certificate `CarnationProduction50`.  
  
**Applies to**:  SQL Server 2008 (10.0.x) 
 and later.  
  
```sql  
USE AdventureWorks2022;  
CREATE CERTIFICATE CarnationProduction50  
    WITH SUBJECT = 'Carnation Production Facility Supervisors',  
    EXPIRY_DATE = '11/11/2011';  
GO  
CREATE USER JinghaoLiu FOR CERTIFICATE CarnationProduction50;  
GO   
```  
  
###  <a name="withoutLogin"></a> D. Creating and using a user without a login  
 The following example creates a database user `CustomApp` that doesn't map to a  SQL Server 
 login. The example then grants a user `adventure-works\tengiz0` permission to impersonate the `CustomApp` user.  
  
```sql  
USE AdventureWorks2022;  
CREATE USER CustomApp WITHOUT LOGIN ;  
GRANT IMPERSONATE ON USER::CustomApp TO [adventure-works\tengiz0] ;  
GO   
```  
  
 To use the `CustomApp` credentials, the user `adventure-works\tengiz0` executes the following statement.  
  
```sql  
EXECUTE AS USER = 'CustomApp' ;  
GO  
```  
  
 To revert back to the `adventure-works\tengiz0` credentials, the user executes the following statement.  
  
```sql  
REVERT ;  
GO  
```  
  
### E. Creating a contained database user with password  
 The following example creates a contained database user with password. This example can only be executed in a contained database.  
  
**Applies to**:  SQL Server 2012 (11.x) 
 and later. This example works in  SQL Database
 if DEFAULT_LANGUAGE is removed.  
  
```sql  
USE AdventureWorks2022;  
GO  
CREATE USER Carlo  
WITH PASSWORD='<password>'
    , DEFAULT_LANGUAGE=[Brazilian]  
    , DEFAULT_SCHEMA=[dbo]  
GO   
```  
  
### F. Creating a contained database user for a domain login  
 The following example creates a contained database user for a login named Fritz in a domain named Contoso. This example can only be executed in a contained database.  
  
**Applies to**:  SQL Server 2012 (11.x) 
 and later.  
  
```sql  
USE AdventureWorks2022;  
GO  
CREATE USER [Contoso\Fritz] ;  
GO   
```  
  
### G. Creating a contained database user with a specific SID  
 The following example creates a SQL Server authenticated contained database user named CarmenW. This example can only be executed in a contained database.  
  
**Applies to**:  SQL Server 2012 (11.x) 
 and later.  
  
```sql  
USE AdventureWorks2022;  
GO  
CREATE USER CarmenW WITH PASSWORD = 'a8ea v*(Rd##+'  
, SID = 0x01050000000000090300000063FF0451A9E7664BA705B10E37DDC4B7;
```  
  
### H. Creating a user to copy encrypted data  
 The following example creates a user that can copy data that is protected by the Always Encrypted feature from  one set of tables, containing encrypted columns, to another set of tables with encrypted columns (in the same or a different database). For more information, see [Migrate Sensitive Data Protected by Always Encrypted](../../relational-databases/security/encryption/migrate-sensitive-data-protected-by-always-encrypted.md).  
  
**Applies to**:  SQL Server 2016 (13.x) 
 and later,  SQL Database
.  
  
```sql  
CREATE USER [Chin]   
WITH   
      DEFAULT_SCHEMA = dbo  
    , ALLOW_ENCRYPTED_VALUE_MODIFICATIONS = ON ;  
```

<a id="i-create-an-azure-ad-user-from-an-azure-ad-login-in-azure-sql"></a>

### I. Create a Microsoft Entra user from a Microsoft Entra login in Azure SQL

 To create a Microsoft Entra user from a Microsoft Entra login, use the following syntax.

 Sign in to your [logical server in Azure](https://learn.microsoft.com/azure/azure-sql/database/logical-servers) or SQL Managed Instance using a Microsoft Entra login granted the `sysadmin` role in SQL Managed Instance, or `loginmanager` role in SQL Database. The following T-SQL script creates a Microsoft Entra user `bob@contoso.com`, from the login `bob@contoso.com`. This login was created in the [CREATE LOGIN](create-login-transact-sql.md#examples) example.

```sql
CREATE USER [bob@contoso.com] FROM LOGIN [bob@contoso.com];
GO
```

> **Important:**
> When creating a **USER** from a Microsoft Entra login, specify the *user_name* as the same *login_name* from **LOGIN**.

Creating a Microsoft Entra user as a group from a Microsoft Entra login that is a group is supported.

```sql
CREATE USER [MS Entra group] FROM LOGIN [MS Entra group];

GO
```

You can also create a Microsoft Entra user from a Microsoft Entra login that is a group.

```sql
CREATE USER [bob@contoso.com] FROM LOGIN [MS Entra group];

GO
```

<a id="j-create-an-azure-ad-user-without-an-azure-ad-login-for-the-database"></a>

### J. Create a contained database user from a Microsoft Entra principal

The following syntax creates a Microsoft Entra user `bob@contoso.com`, in a database without an associated login in `master`. The  Database Engine 
 validates the specified user exists in Microsoft Entra.

```sql
CREATE USER [bob@contoso.com] FROM EXTERNAL PROVIDER;
GO
```

### K. Create a contained database user from a Microsoft Entra principal without validation

 **Applies to**: SQL database in Microsoft Fabric
 and Azure SQL Database

The examples in this section create database users for Microsoft Entra principals, without validating principal names in Microsoft Entra.

The following T-SQL example creates a database user for the Microsoft Entra user, named `bob@contoso.com`. Replace `<unique identifier sid>` with the SID of the new user to the object ID of the Microsoft Entra user.

```sql
DECLARE @principal_name SYSNAME = 'bob@contoso.com';
DECLARE @objectId UNIQUEIDENTIFIER = '<unique identifier sid>'; -- user's object ID in Microsoft Entra

-- Convert the guid to the right type
DECLARE @castObjectId NVARCHAR(MAX) = CONVERT(VARCHAR(MAX), CONVERT (VARBINARY(16), @objectId), 1);

-- Construct command: CREATE USER [@principal_name] WITH SID = @castObjectId, TYPE = E;
DECLARE @cmd NVARCHAR(MAX) = N'CREATE USER [' + @principal_name + '] WITH SID = ' + @castObjectId + ', TYPE = E;'
EXEC (@cmd);
```

The following example creates a database user for the Microsoft Entra service principal, named `HRApp`. Replace `<unique identifier sid>` with the SID of the new user to the client ID of the service principal in Microsoft Entra.

```sql
DECLARE @principal_name SYSNAME = 'HRApp';
DECLARE @clientId UNIQUEIDENTIFIER = '<unique identifier sid>'; -- principal's client ID in Microsoft Entra

-- Convert the guid to the right type
DECLARE @castClientId NVARCHAR(MAX) = CONVERT(VARCHAR(MAX), CONVERT (VARBINARY(16), @clientId), 1);

-- Construct command: CREATE USER [@principal_name] WITH SID = @castClientId, TYPE = E;
DECLARE @cmd NVARCHAR(MAX) = N'CREATE USER [' + @principal_name + '] WITH SID = ' + @castClientId + ', TYPE = E;'
EXEC (@cmd);
```

The following example creates a database user for the Microsoft Entra group, named `HR`. Replace `<unique identifier sid>` with the SID of the new user to the object ID of the group.

```sql
DECLARE @principal_name SYSNAME = 'HR';
DECLARE @objectId UNIQUEIDENTIFIER = '<unique identifier sid>'; -- principal's object ID in Microsoft Entra

-- Convert the guid to the right type
DECLARE @castObjectId NVARCHAR(MAX) = CONVERT(VARCHAR(MAX), CONVERT (VARBINARY(16), @objectId), 1);

-- Construct command: CREATE USER [@principal_name] WITH SID = @castObjectId, TYPE = X;
DECLARE @cmd NVARCHAR(MAX) = N'CREATE USER [' + @principal_name + '] WITH SID = ' + @castObjectId + ', TYPE = X;'
EXEC (@cmd);
```
  
## Related content

- [Create a database user](../../relational-databases/security/authentication-access/create-a-database-user.md)
- [sys.database_principals (Transact-SQL)](../../relational-databases/system-catalog-views/sys-database-principals-transact-sql.md)
- [ALTER USER (Transact-SQL)](alter-user-transact-sql.md)
- [DROP USER (Transact-SQL)](drop-user-transact-sql.md)
- [CREATE LOGIN (Transact-SQL)](create-login-transact-sql.md)
- [EVENTDATA (Transact-SQL)](../functions/eventdata-transact-sql.md)
- [Contained Databases](../../relational-databases/databases/contained-databases.md)
- [Microsoft Entra authentication for Azure SQL](https://learn.microsoft.com/azure/azure-sql/database/authentication-aad-overview)
- [Get started with Database Engine permissions](../../relational-databases/security/authentication-access/getting-started-with-database-engine-permissions.md)
- [ALTER ROLE (Transact-SQL)](alter-role-transact-sql.md)
- [GRANT object permissions (Transact-SQL)](grant-object-permissions-transact-sql.md)
- [Permissions (Database Engine)](../../relational-databases/security/permissions-database-engine.md)
