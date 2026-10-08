---
title: Create an Assembly
description: Use CREATE ASSEMBLY to register an assembly in SQL Server and specify its security settings. Register an assembly to use its functionality.
author: rwestMSFT
ms.author: randolphwest
ms.date: 07/23/2025
ms.service: sql
ms.subservice: clr
ms.topic: "reference"
helpviewer_keywords:
  - "creating assemblies"
  - "UNSAFE assemblies"
  - "CREATE ASSEMBLY statement"
  - "SAFE assemblies"
  - "EXTERNAL_ACCESS assemblies"
  - "assemblies [CLR integration], creating"
---
# Create an assembly


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Managed database objects, such as stored procedures or triggers, are compiled and then deployed in units called an assembly. Managed DLL assemblies must be registered in  SQL Server 
 before the functionality the assembly provides can be used. To register an assembly in a  SQL Server 
 database, use the `CREATE ASSEMBLY` statement. This article discusses how to register an assembly in a database using the `CREATE ASSEMBLY` statement, and how to specify the security settings for the assembly.

## Code access security no longer supported

CLR uses Code Access Security (CAS) in the .NET Framework, which is no longer supported as a security boundary. A CLR assembly created with `PERMISSION_SET = SAFE` might be able to access external system resources, call unmanaged code, and acquire sysadmin privileges. In  SQL Server 2017 (14.x) 
 and later versions, the `sp_configure` option, [clr strict security](../../../database-engine/configure-windows/clr-strict-security.md), enhances the security of CLR assemblies. `clr strict security` is enabled by default, and treats `SAFE` and `EXTERNAL_ACCESS` assemblies as if they were marked `UNSAFE`. The `clr strict security` option can be disabled for backward compatibility, but isn't recommended.

We recommend that you sign all assemblies by a certificate or asymmetric key, with a corresponding login that has been granted `UNSAFE ASSEMBLY` permission in the `master` database.  SQL Server 
 administrators can also add assemblies to a list of assemblies, which the Database Engine should trust. For more information, see [sys.sp_add_trusted_assembly](../../system-stored-procedures/sys-sp-add-trusted-assembly-transact-sql.md).


## The CREATE ASSEMBLY statement

The `CREATE ASSEMBLY` statement is used to create an assembly in a database. Here's an example:

```sql
CREATE ASSEMBLY SQLCLRTest
    FROM 'C:\MyDBApp\SQLCLRTest.dll';
```

The `FROM` clause specifies the pathname of the assembly to create. This path can either be a Universal Naming Convention (UNC) path or a physical file path that is local to the machine.

 SQL Server 
 doesn't allow registering different versions of an assembly with the same name, culture, and public key.

It's possible to create assemblies that reference other assemblies. When an assembly is created in  SQL Server 
,  SQL Server 
 also creates the assemblies referenced by the root-level assembly, if the referenced assemblies aren't already created into the database.

Database users or user roles are given permissions to create, and therefore own, assemblies in a database. In order to create assemblies, the database user or role should have the `CREATE ASSEMBLY` permission.

An assembly can only succeed in referencing other assemblies if:

- The assembly that is called or referenced, is owned by the same user or role.
- The assembly that is called or referenced, was created in the same database.

## Specify security when creating assemblies

When creating an assembly into a  SQL Server 
 database, you can specify one of three different levels of security in which your code can run: `SAFE`, `EXTERNAL_ACCESS`, or `UNSAFE`. When the `CREATE ASSEMBLY` statement is run, certain checks are performed on the code assembly, which might cause the assembly to fail to register on the server.

`SAFE` is the default permission set and works for most scenarios. To specify a given security level, you modify the syntax of the `CREATE ASSEMBLY` statement as follows:

```sql
CREATE ASSEMBLY SQLCLRTest
    FROM 'C:\MyDBApp\SQLCLRTest.dll'
    WITH PERMISSION_SET = SAFE;
```

It's also possible to create an assembly with the `SAFE` permission set by omitting the third line of previous.

```sql
CREATE ASSEMBLY SQLCLRTest
    FROM 'C:\MyDBApp\SQLCLRTest.dll';
```

When code in an assembly runs under the `SAFE` permission set, it can only do computation and data access within the server through the in-process managed provider.

## Create EXTERNAL_ACCESS and UNSAFE assemblies

`EXTERNAL_ACCESS` addresses scenarios in which the code needs to access resources outside the server, such as files, network, registry, and environment variables. Whenever the server accesses an external resource, it impersonates the security context of the user calling the managed code.

`UNSAFE` code permission is for those situations in which an assembly isn't verifiably safe or requires additional access to restricted resources, such as the Win32 API.

To create an `EXTERNAL_ACCESS` or `UNSAFE` assembly in  SQL Server 
, one of the following two conditions must be met:

1. The assembly is strong name signed or Authenticode signed with a certificate. This strong name (or certificate) is created inside  SQL Server 
 as an asymmetric key (or certificate), and has a corresponding login with `EXTERNAL ACCESS ASSEMBLY` permission (for external access assemblies) or `UNSAFE ASSEMBLY` permission (for unsafe assemblies).

1. The database owner (DBO) has `EXTERNAL ACCESS ASSEMBLY` (for `EXTERNAL ACCESS` assemblies) or `UNSAFE ASSEMBLY` (for `UNSAFE` assemblies) permission, and the database has the [TRUSTWORTHY database property](../../security/trustworthy-database-property.md) set to `ON`.

The two conditions listed previously are also checked at assembly load time (which includes execution). At least one of the conditions must be met in order to load the assembly.

We recommend that the [TRUSTWORTHY database property](../../security/trustworthy-database-property.md) on a database isn't set to `ON` only to run common language runtime (CLR) code in the server process. Instead, we recommend that an asymmetric key is created from the assembly file in the `master` database. A login mapped to this asymmetric key must then be created, and the login must be granted `EXTERNAL ACCESS ASSEMBLY` or `UNSAFE ASSEMBLY` permission.

The following  Transact-SQL  statements perform the steps that are required to create an asymmetric key, map a login to this key, and then grant `EXTERNAL_ACCESS` permission to the login. You must run the following  Transact-SQL  statements before running the `CREATE ASSEMBLY` statement.

```sql
USE master;
GO

CREATE ASYMMETRIC KEY SQLCLRTestKey
     FROM EXECUTABLE FILE = 'C:\MyDBApp\SQLCLRTest.dll';

CREATE LOGIN SQLCLRTestLogin
    FROM ASYMMETRIC KEY SQLCLRTestKey;

GRANT EXTERNAL ACCESS ASSEMBLY TO SQLCLRTestLogin;
GO
```

> **Note:**  
> You must create a new login to associate with the asymmetric key. This login is only used to grant permissions. It doesn't have to be associated with a user, or used within the application.

To create an `EXTERNAL ACCESS` assembly, the creator needs to specify `EXTERNAL ACCESS` permission when creating the assembly:

```sql
CREATE ASSEMBLY SQLCLRTest
    FROM 'C:\MyDBApp\SQLCLRTest.dll'
    WITH PERMISSION_SET = EXTERNAL_ACCESS;
```

The following  Transact-SQL  statements perform the steps that are required to create an asymmetric key, map a login to this key, and then grant `UNSAFE` permission to the login. You must run the following  Transact-SQL  statements before running the `CREATE ASSEMBLY` statement.

```sql
USE master;
GO

CREATE ASYMMETRIC KEY SQLCLRTestKey
     FROM EXECUTABLE FILE = 'C:\MyDBApp\SQLCLRTest.dll';

CREATE LOGIN SQLCLRTestLogin
    FROM ASYMMETRIC KEY SQLCLRTestKey;

GRANT UNSAFE ASSEMBLY TO SQLCLRTestLogin;
GO
```

To specify that an assembly loads with `UNSAFE` permission, you specify the `UNSAFE` permission set when loading the assembly into the server:

```sql
CREATE ASSEMBLY SQLCLRTest
    FROM 'C:\MyDBApp\SQLCLRTest.dll'
    WITH PERMISSION_SET = UNSAFE;
```

For more information about the permissions for each of the settings, see [CLR integration security](../security/clr-integration-security.md).

## Related content

- [Manage CLR integration assemblies](managing-clr-integration-assemblies.md)
- [Alter an assembly](altering-an-assembly.md)
- [Drop an assembly](dropping-an-assembly.md)
- [CLR integration code access security](../security/clr-integration-code-access-security.md)
- [TRUSTWORTHY database property](../../security/trustworthy-database-property.md)
