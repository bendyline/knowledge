---
title: "Designing Assemblies"
description: This article describes factors to consider when you design an assembly to host on SQL Server, including packaging, managing, and restrictions on assemblies.
author: rwestMSFT
ms.author: randolphwest
ms.date: 07/23/2025
ms.service: sql
ms.subservice: clr
ms.topic: "reference"
helpviewer_keywords:
  - "designing assemblies [SQL Server]"
  - "assemblies [CLR integration], designing"
---
# Design assemblies


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

This article describes the following factors you should consider when you design assemblies:

- Packaging assemblies
- Managing assembly security
- Restrictions on assemblies

## Package assemblies

An assembly can contain functionality for more than one  SQL Server 
 routine or type in its classes and methods. Most of the time, it makes sense to package the functionality of routines that perform related functions within the same assembly, especially if these routines share classes whose methods call one another. For example, classes that perform data entry management tasks for common language runtime (CLR) triggers and CLR stored procedures can be packaged in the same assembly. This is because the methods for these classes are more likely to call each other than methods of less related tasks.

When you're packaging code into assembly, consider:

- CLR user-defined types and indexes that depend on CLR user-defined functions can cause persisted data to be in the database that depends on the assembly. Modifying the code of an assembly is frequently more complex when there's persisted data that depends on the assembly in the database. Therefore, it's better to separate code on which persisted data dependencies rely (such as user-defined types and indexes using user-defined functions) from code that doesn't have these persisted data dependencies. For more information, see [Implement assemblies](assemblies-implementing.md) and [ALTER ASSEMBLY](../../t-sql/statements/alter-assembly-transact-sql.md).

- If a piece of managed code requires higher permission, it's better to separate that code into a separate assembly from code that doesn't require higher permission.

## Code access security no longer supported

CLR uses Code Access Security (CAS) in the .NET Framework, which is no longer supported as a security boundary. A CLR assembly created with `PERMISSION_SET = SAFE` might be able to access external system resources, call unmanaged code, and acquire sysadmin privileges. In  SQL Server 2017 (14.x) 
 and later versions, the `sp_configure` option, [clr strict security](../../database-engine/configure-windows/clr-strict-security.md), enhances the security of CLR assemblies. `clr strict security` is enabled by default, and treats `SAFE` and `EXTERNAL_ACCESS` assemblies as if they were marked `UNSAFE`. The `clr strict security` option can be disabled for backward compatibility, but isn't recommended.

We recommend that you sign all assemblies by a certificate or asymmetric key, with a corresponding login that has been granted `UNSAFE ASSEMBLY` permission in the `master` database.  SQL Server 
 administrators can also add assemblies to a list of assemblies, which the Database Engine should trust. For more information, see [sys.sp_add_trusted_assembly](../system-stored-procedures/sys-sp-add-trusted-assembly-transact-sql.md).


## Manage assembly security

You can control how much an assembly can access resources protected by .NET Code Access Security when it runs managed code. You do this by specifying one of three permission sets when you create or modify an assembly: `SAFE`, `EXTERNAL_ACCESS`, or `UNSAFE`.

### SAFE permission

`SAFE` is the default permission set and it's the most restrictive. Code run by an assembly with `SAFE` permissions can't access external system resources such as files, the network, environment variables, or the registry. `SAFE` code can access data from the local  SQL Server 
 databases or perform computations and business logic that don't involve accessing resources outside the local databases.

Most assemblies perform computation and data management tasks without having to access resources outside  SQL Server 
. Therefore, we recommend `SAFE` as the assembly permission set.

### EXTERNAL_ACCESS permission

`EXTERNAL_ACCESS` allows for assemblies to access certain external system resources such as files, networks, Web services, environmental variables, and the registry. Only  SQL Server 
 logins with `EXTERNAL ACCESS` permissions can create `EXTERNAL_ACCESS` assemblies.

`SAFE` and `EXTERNAL_ACCESS` assemblies can contain only code that is verifiably type-safe. This means that these assemblies can only access classes through well-defined entry points that are valid for the type definition. Therefore, they can't arbitrarily access memory buffers not owned by the code. Additionally, they can't perform operations that might have an adverse effect on the robustness of the  SQL Server 
 process.

### UNSAFE permission

`UNSAFE` gives assemblies unrestricted access to resources, both within and outside  SQL Server 
. Code that is running from within an `UNSAFE` assembly can call unmanaged code.

Also, specifying `UNSAFE` allows for the code in the assembly to perform operations that are considered type-unsafe by the CLR verifier. These operations can potentially access memory buffers in the  SQL Server 
 process space in an uncontrolled manner. `UNSAFE` assemblies can also potentially subvert the security system of either  SQL Server 
 or the common language runtime. `UNSAFE` permissions should be granted only to highly trusted assemblies by experienced developers or administrators. Only members of the **sysadmin** fixed server role can create `UNSAFE` assemblies.

## Restrictions on assemblies

 SQL Server 
 puts certain restrictions on managed code in assemblies to make sure that they can run in a reliable and scalable manner. This means that certain operations that can compromise the robustness of the server aren't permitted in `SAFE` and `EXTERNAL_ACCESS` assemblies.

### Disallowed custom attributes

Assemblies can't be annotated with the following custom attributes:

```csharp
System.ContextStaticAttribute
System.MTAThreadAttribute
System.Runtime.CompilerServices.MethodImplAttribute
System.Runtime.CompilerServices.CompilationRelaxationsAttribute
System.Runtime.Remoting.Contexts.ContextAttribute
System.Runtime.Remoting.Contexts.SynchronizationAttribute
System.Runtime.InteropServices.DllImportAttribute
System.Security.Permissions.CodeAccessSecurityAttribute
System.STAThreadAttribute
System.ThreadStaticAttribute
```

Additionally, `SAFE` and `EXTERNAL_ACCESS` assemblies can't be annotated with the following custom attributes:

```csharp
System.Security.SuppressUnmanagedCodeSecurityAttribute
System.Security.UnverifiableCodeAttribute
```

### Disallowed .NET Framework APIs

Any  .NET Framework 
 API that is annotated with one of the disallowed `HostProtectionAttributes` can't be called from `SAFE` and `EXTERNAL_ACCESS` assemblies.

```csharp
HostProtectionAttribute.SelfAffectingProcessMgmt
HostProtectionAttribute.SelfAffectingThreading
HostProtectionAttribute.Synchronization
HostProtectionAttribute.SharedState
HostProtectionAttribute.ExternalProcessMgmt
HostProtectionAttribute.ExternalThreading
HostProtectionAttribute.SecurityInfrastructure
HostProtectionAttribute.MayLeakOnAbort
HostProtectionAttribute.UI
```

### Supported .NET Framework assemblies

Any assembly that is referenced by your custom assembly must be loaded into  SQL Server 
 by using `CREATE ASSEMBLY`. The following  .NET Framework 
 assemblies are already loaded into  SQL Server 
 and, therefore, can be referenced by custom assemblies without having to use `CREATE ASSEMBLY`.


- `mscorlib.dll`
- `CustomMarshalers.dll`
- `Microsoft.VisualBasic.dll`
- `Microsoft.VisualC.dll`
- `System.Configuration.dll`
- `System.Core.dll`
- `System.Data.OracleClient.dll`
- `System.Data.SqlXml.dll`
- `System.Data.dll`
- `System.Deployment.dll`
- `System.Security.dll`
- `System.Transactions.dll`
- `System.Web.Services.dll`
- `System.Xml.Linq.dll`
- `system.Xml.dll`
- `System.dll`


## Related content

- [Assemblies (Database Engine)](assemblies-database-engine.md)
- [CLR integration security](security/clr-integration-security.md)
