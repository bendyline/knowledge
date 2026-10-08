---
title: "CREATE ASSEMBLY (Transact-SQL)"
description: CREATE ASSEMBLY creates a managed application module that contains class metadata and managed code as an object in an instance of SQL Server.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 07/23/2025
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
f1_keywords:
  - "ASSEMBLY"
  - "CREATE ASSEMBLY"
  - "CREATE_ASSEMBLY_TSQL"
  - "ASSEMBLY_TSQL"
helpviewer_keywords:
  - "assemblies [CLR integration], validating"
  - "validating assemblies"
  - "CREATE ASSEMBLY statement"
  - "assemblies [CLR integration], creating"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-mi-current || >=sql-server-2017 || >=sql-server-linux-2017"
---
# CREATE ASSEMBLY (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





Creates a managed application module that contains class metadata and managed code as an object in an instance of  SQL Server 
. By referencing this module, common language runtime (CLR) functions, stored procedures, triggers, user-defined aggregates, and user-defined types can be created in the database.



## Syntax

```syntaxsql
CREATE ASSEMBLY assembly_name
[ AUTHORIZATION owner_name ]
FROM { <client_assembly_specifier> | <assembly_bits> [ , ...n ] }
[ WITH PERMISSION_SET = { SAFE | EXTERNAL_ACCESS | UNSAFE } ]
[ ; ]
<client_assembly_specifier> ::=
    '[ \\computer_name\ ] share_name\ [ path\ ] manifest_file_name'
    | '[ local_path\ ] manifest_file_name'

<assembly_bits> ::=
{ varbinary_literal | varbinary_expression }
```

## Arguments

#### *assembly_name*

The name of the assembly. The name must be unique within the database and a valid [identifier](../../relational-databases/databases/database-identifiers.md).

#### AUTHORIZATION *owner_name*

Specifies the name of a user or role as owner of the assembly. *owner_name* must either be the name of a role of which the current user is a member, or the current user must have `IMPERSONATE` permission on *owner_name*. If not specified, ownership is given to the current user.

#### \<client_assembly_specifier>

Specifies the local path or network location where the assembly that is being uploaded is located, and also the manifest file name that corresponds to the assembly. `<client_assembly_specifier>` can be expressed as a fixed string or an expression evaluating to a fixed string, with variables. `CREATE ASSEMBLY` doesn't support loading multimodule assemblies.  SQL Server 
 also looks for any dependent assemblies of this assembly in the same location and also uploads them with the same owner as the root level assembly. If these dependent assemblies aren't found and they aren't already loaded in the current database, `CREATE ASSEMBLY` fails. If the dependent assemblies are already loaded in the current database, the owner of those assemblies must be the same as the owner of the newly created assembly.

> **Important:**  
> Azure SQL Database & Azure SQL Managed Instance don't support creating an assembly from a file.

`<client_assembly_specifier>` can't be specified if the logged in user is being impersonated.

#### \<assembly_bits>

The list of binary values that make up the assembly and its dependent assemblies. The first value in the list is considered the root-level assembly. The values corresponding to the dependent assemblies can be supplied in any order. Any values that don't correspond to dependencies of the root assembly are ignored.

> **Note:**  
> This option isn't available in a contained database.

#### *varbinary_literal*

A **varbinary** literal.

#### *varbinary_expression*

An expression of type **varbinary**.

#### PERMISSION_SET { SAFE | EXTERNAL_ACCESS | UNSAFE }

Specifies a set of code access permissions that are granted to the assembly when accessed by  SQL Server 
. If not specified, `SAFE` is applied as the default.

The `PERMISSION_SET` option is affected by the [Server configuration: clr strict security](../../database-engine/configure-windows/clr-strict-security.md) option. When `clr strict security` is enabled, all assemblies are treated as `UNSAFE`.

We recommend using `SAFE`. `SAFE` is the most restrictive permission set. Code executed by an assembly with `SAFE` permissions can't access external system resources such as files, the network, environment variables, or the registry.

`EXTERNAL_ACCESS` enables assemblies to access certain external system resources such as files, networks, environmental variables, and the registry.

`UNSAFE` enables assemblies unrestricted access to resources, both within and outside an instance of  SQL Server 
. Code running from within an `UNSAFE` assembly can call unmanaged code.

`SAFE` is the recommended permission setting for assemblies that perform computation and data management tasks without accessing resources outside an instance of  SQL Server 
.

> **Note:**  
> The `EXTERNAL_ACCESS` and `UNSAFE` options aren't available in a contained database.

We recommend using `EXTERNAL_ACCESS` for assemblies that access resources outside of an instance of  SQL Server 
. `EXTERNAL_ACCESS` assemblies include the reliability and scalability protections of `SAFE` assemblies, but from a security perspective, are similar to `UNSAFE` assemblies. Code in `EXTERNAL_ACCESS` assemblies runs by default under the  SQL Server 
 service account, and accesses external resources under that account, unless the code explicitly impersonates the caller. Therefore, permission to create `EXTERNAL_ACCESS` assemblies should be granted only to logins that are trusted to run code under the  SQL Server 
 service account. For more information about impersonation, see [CLR integration security](../../relational-databases/clr-integration/security/clr-integration-security.md).

Specifying `UNSAFE` enables the code in the assembly complete freedom to perform operations in the  SQL Server 
 process space that can potentially compromise the robustness of  SQL Server 
. `UNSAFE` assemblies can also potentially subvert the security system of either  SQL Server 
 or the common language runtime. `UNSAFE` permissions should be granted only to highly trusted assemblies. Only members of the **sysadmin** fixed server role can create and alter `UNSAFE` assemblies.

For more information about assembly permission sets, see [Design assemblies](../../relational-databases/clr-integration/assemblies-designing.md).

## Code access security no longer supported

CLR uses Code Access Security (CAS) in the .NET Framework, which is no longer supported as a security boundary. A CLR assembly created with `PERMISSION_SET = SAFE` might be able to access external system resources, call unmanaged code, and acquire sysadmin privileges. In  SQL Server 2017 (14.x) 
 and later versions, the `sp_configure` option, [clr strict security](../../database-engine/configure-windows/clr-strict-security.md), enhances the security of CLR assemblies. `clr strict security` is enabled by default, and treats `SAFE` and `EXTERNAL_ACCESS` assemblies as if they were marked `UNSAFE`. The `clr strict security` option can be disabled for backward compatibility, but isn't recommended.

We recommend that you sign all assemblies by a certificate or asymmetric key, with a corresponding login that has been granted `UNSAFE ASSEMBLY` permission in the `master` database.  SQL Server 
 administrators can also add assemblies to a list of assemblies, which the Database Engine should trust. For more information, see [sys.sp_add_trusted_assembly](../../relational-databases/system-stored-procedures/sys-sp-add-trusted-assembly-transact-sql.md).


## Remarks

`CREATE ASSEMBLY` uploads an assembly that was previously compiled as a .dll file from managed code for use inside an instance of SQL Server.

When enabled, the `PERMISSION_SET` option in the `CREATE ASSEMBLY` and `ALTER ASSEMBLY` statements is ignored at run-time, but the `PERMISSION_SET` options are preserved in metadata. Ignoring the option minimizes breaking existing code statements.

 SQL Server 
 doesn't allow registering different versions of an assembly with the same name, culture, and public key.

When attempting to access the assembly specified in `<client_assembly_specifier>`,  SQL Server 
 impersonates the security context of the current Windows login. If `<client_assembly_specifier>` specifies a network location (UNC path), the impersonation of the current login isn't carried forward to the network location because of delegation limitations. In this case, access is made using the security context of the  SQL Server 
 service account. For more information, see [Credentials (Database Engine)](../../relational-databases/security/authentication-access/credentials-database-engine.md).

Besides the root assembly specified by *assembly_name*,  SQL Server 
 tries to upload any assemblies that are referenced by the root assembly being uploaded. If a referenced assembly is already uploaded to the database because of an earlier `CREATE ASSEMBLY` statement, this assembly isn't uploaded but is available to the root assembly. If a dependent assembly wasn't previously uploaded, but  SQL Server 
 can't locate its manifest file in the source directory, `CREATE ASSEMBLY` returns an error.

If any dependent assemblies referenced by the root assembly aren't already in the database and are implicitly loaded together with the root assembly, they have the same permission set as the root level assembly. If the dependent assemblies must be created by using a different permission set than the root-level assembly, they must be uploaded explicitly before the root level assembly with the appropriate permission set.

## Assembly Validation

 SQL Server 
 scans the assembly binaries uploaded by the `CREATE ASSEMBLY` statement to guarantee the following checks:

- The assembly binary is well formed with valid metadata and code segments, and the code segments have valid Microsoft Intermediate language (MSIL) instructions.

- The set of system assemblies it references is one of the following supported assemblies in  SQL Server 
: `Microsoft.VisualBasic.dll`, `mscorlib.dll`, `System.Data.dll`, `System.dll`, `System.Xml.dll`, `Microsoft.VisualC.dll`, `CustomMarshallers.dll`, `System.Security.dll`, `System.Web.Services.dll`, `System.Data.SqlXml.dll`, `System.Core.dll`, and `System.Xml.Linq.dll`. Other system assemblies can be referenced, but they must be explicitly registered in the database.

- For assemblies created by using `SAFE` or `EXTERNAL ACCESS` permission sets:

  - The assembly code should be type-safe. Type safety is established by running the common language runtime verifier against the assembly.

  - The assembly shouldn't contain any static data members in its classes unless they're marked as read-only.

  - The classes in the assembly can't contain finalizer methods.

  - The classes or methods of the assembly should be annotated only with allowed code attributes. For more information, see [CLR integration: custom attributes for CLR routines](../../relational-databases/clr-integration/database-objects/clr-integration-custom-attributes-for-clr-routines.md).

Besides the previous checks that are performed when `CREATE ASSEMBLY` executes, there are extra checks that are performed at execution time of the code in the assembly:

- Calling certain  .NET Framework 
 APIs that require a specific Code Access Permission might fail if the permission set of the assembly doesn't include that permission.

- For `SAFE` and `EXTERNAL_ACCESS` assemblies, any attempt to call  .NET Framework 
 APIs that are annotated with certain HostProtectionAttributes fails.

For more information, see [Design assemblies](../../relational-databases/clr-integration/assemblies-designing.md).

## Permissions

Requires `CREATE ASSEMBLY` permission.

If `PERMISSION_SET = EXTERNAL_ACCESS` is specified, requires `EXTERNAL ACCESS ASSEMBLY` permission on the server. If `PERMISSION_SET = UNSAFE` is specified, requires `UNSAFE ASSEMBLY` permission on the server.

User must be the owner of any assemblies that are referenced by the assembly that are to be uploaded if the assemblies already exist in the database. To upload an assembly by using a file path, the current user must be a Windows authenticated login or a member of the **sysadmin** fixed server role. The Windows login of the user that executes `CREATE ASSEMBLY` must have read permission on the share and the files being loaded in the statement.

### Permissions with CLR strict security

The following permissions required to create a CLR assembly when `CLR strict security` is enabled:

- The user must have the `CREATE ASSEMBLY` permission
- And one of the following conditions must also be true:
  - The assembly is signed with a certificate or asymmetric key that has a corresponding login with the `UNSAFE ASSEMBLY` permission on the server. Signing the assembly is recommended.
  - The database has the `TRUSTWORTHY` property set to `ON`, and the database is owned by a login that has the `UNSAFE ASSEMBLY` permission on the server. This option isn't recommended.

For more information about assembly permission sets, see [Design assemblies](../../relational-databases/clr-integration/assemblies-designing.md).

## Examples

### A. Create an assembly from a DLL

The following example assumes that the  SQL Server Database Engine 
 samples are installed in the default location of the local computer, and the `HelloWorld.csproj` sample application is compiled. For more information, see [Hello World Sample](https://learn.microsoft.com/previous-versions/sql/sql-server-2016/ff878250\(v=sql.130\)).

```sql
CREATE ASSEMBLY HelloWorld
FROM '<system_drive>:\Program Files\Microsoft SQL Server\100\Samples\HelloWorld\CS\HelloWorld\bin\debug\HelloWorld.dll'
WITH PERMISSION_SET = SAFE;
```

> **Important:**  
> Azure SQL Database doesn't support creating an assembly from a file.

### B. Create an assembly from assembly bits

Replace the sample bits (which aren't complete or valid) with your assembly bits.

```sql
CREATE ASSEMBLY HelloWorld
    FROM 0x4D5A900000000000
WITH PERMISSION_SET = SAFE;
```

## Related content

- [ALTER ASSEMBLY (Transact-SQL)](alter-assembly-transact-sql.md)
- [DROP ASSEMBLY (Transact-SQL)](drop-assembly-transact-sql.md)
- [CREATE FUNCTION (Transact-SQL)](create-function-transact-sql.md)
- [CREATE PROCEDURE (Transact-SQL)](create-procedure-transact-sql.md)
- [CREATE TRIGGER (Transact-SQL)](create-trigger-transact-sql.md)
- [CREATE TYPE (Transact-SQL)](create-type-transact-sql.md)
- [CREATE AGGREGATE (Transact-SQL)](create-aggregate-transact-sql.md)
- [EVENTDATA (Transact-SQL)](../functions/eventdata-transact-sql.md)
- [Usage Scenarios and Examples for Common Language Runtime (CLR) Integration](https://learn.microsoft.com/previous-versions/sql/sql-server-2016/ms131078\(v=sql.130\))
