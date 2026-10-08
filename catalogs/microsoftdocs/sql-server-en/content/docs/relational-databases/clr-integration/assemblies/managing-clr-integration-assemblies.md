---
title: Manage CLR Integration Assemblies
description: You can host managed DLL assemblies in SQL Server. You can register, alter, and drop assemblies, and also manage associated files and permissions.
author: rwestMSFT
ms.author: randolphwest
ms.date: 07/23/2025
ms.service: sql
ms.subservice: clr
ms.topic: "reference"
helpviewer_keywords:
  - "database objects [CLR integration], assemblies"
  - "common language runtime [SQL Server], assemblies"
  - "assemblies [CLR integration], managing"
dev_langs:
  - "TSQL"
---
# Manage CLR integration assemblies


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Managed code is compiled and then deployed in units called a common language runtime (CLR) assembly. An assembly is packaged as a DLL or executable (`.exe`) file. While an executable file can run on its own, a DLL must be hosted in an existing application. Managed DLL assemblies can be loaded into and hosted by  SQL Server 
.  SQL Server 
 requires you to register the assembly in a database using the `CREATE ASSEMBLY` statement, before it can be loaded in the process and used. Assemblies can also be updated from a more recent version using the `ALTER ASSEMBLY` statement, or removed from  SQL Server 
 using the `DROP ASSEMBLY` statement.

Assembly information is stored in the `sys.assembly_files` table in the database where the assembly is installed. The `sys.assembly_files` table contains the following columns.

| Column | Description |
| --- | --- |
| `assembly_id` | The identifier defined for the assembly. This number is assigned to all objects relating to the same assembly. |
| `name` | The name of the object. |
| `file_id` | A number identifying each object, with the first object associated with a given `assembly_id` being given the value of 1. If multiple objects are associated with the same `assembly_id`, then each subsequent `file_id` value is incremented by 1. |
| `content` | The hexadecimal representation of the assembly or file. |

## In this section

| Article | Description |
| --- | --- |
| [Create an assembly](creating-an-assembly.md) | Discusses creating `SAFE`, `EXTERNAL_ACCESS`, and `UNSAFE` CLR assemblies in  SQL Server |
 |  |
| [Alter an assembly](altering-an-assembly.md) | Describes updating CLR assemblies in  SQL Server |
 |  |
| [Drop an assembly](dropping-an-assembly.md) | Discusses dropping CLR assemblies from  SQL Server |
 |  |

## Code access security no longer supported

CLR uses Code Access Security (CAS) in the .NET Framework, which is no longer supported as a security boundary. A CLR assembly created with `PERMISSION_SET = SAFE` might be able to access external system resources, call unmanaged code, and acquire sysadmin privileges. In  SQL Server 2017 (14.x) 
 and later versions, the `sp_configure` option, [clr strict security](../../../database-engine/configure-windows/clr-strict-security.md), enhances the security of CLR assemblies. `clr strict security` is enabled by default, and treats `SAFE` and `EXTERNAL_ACCESS` assemblies as if they were marked `UNSAFE`. The `clr strict security` option can be disabled for backward compatibility, but isn't recommended.

We recommend that you sign all assemblies by a certificate or asymmetric key, with a corresponding login that has been granted `UNSAFE ASSEMBLY` permission in the `master` database.  SQL Server 
 administrators can also add assemblies to a list of assemblies, which the Database Engine should trust. For more information, see [sys.sp_add_trusted_assembly](../../system-stored-procedures/sys-sp-add-trusted-assembly-transact-sql.md).


## Related content

- [CLR integration security](../security/clr-integration-security.md)
- [CLR integration code access security](../security/clr-integration-code-access-security.md)
