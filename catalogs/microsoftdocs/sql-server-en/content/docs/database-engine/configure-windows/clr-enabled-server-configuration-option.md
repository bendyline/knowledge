---
title: "Server Configuration: clr enabled"
description: Learn how to use the clr enabled option to specify whether SQL Server can run user assemblies. See when common language runtime execution isn't supported.
author: rwestMSFT
ms.author: randolphwest
ms.date: 08/26/2025
ms.service: sql
ms.subservice: configuration
ms.topic: how-to
helpviewer_keywords:
  - "assemblies [CLR integration], verifying can run"
  - "clr enabled option"
---
# Server configuration: clr enabled


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Use the `clr enabled` option to specify whether  SQL Server 
 can run user assemblies. The `clr enabled` option provides the following values:

| Value | Description |
| --- | --- |
| `0` | Assembly execution not allowed on  SQL Server |
| . |
| `1` | Assembly execution allowed on  SQL Server |
| . |

For WOW64 only: restart WOW64 servers to apply these changes. No restart is required for other server types.

When you run `RECONFIGURE`, and the run value of the `clr enabled` option is changed from `1` to `0`, all application domains containing user assemblies are immediately unloaded.

## Limitations

### Common language runtime (CLR) execution isn't supported under lightweight pooling

Disable one of two options: `clr enabled` or `lightweight pooling`. Features that rely upon CLR and that don't work properly in fiber mode include the **hierarchyid** data type, the `FORMAT` function, replication, and Policy-Based Management. For more information, see [Server configuration: lightweight pooling](lightweight-pooling-server-configuration-option.md).

Though the `clr enabled` configuration option is enabled in  Azure SQL Database 
, developing CLR user functions aren't supported in  Azure SQL Database 
.

### Code access security no longer supported

CLR uses Code Access Security (CAS) in the .NET Framework, which is no longer supported as a security boundary. A CLR assembly created with `PERMISSION_SET = SAFE` might be able to access external system resources, call unmanaged code, and acquire sysadmin privileges. In  SQL Server 2017 (14.x) 
 and later versions, the `sp_configure` option, [clr strict security](clr-strict-security.md), enhances the security of CLR assemblies. `clr strict security` is enabled by default, and treats `SAFE` and `EXTERNAL_ACCESS` assemblies as if they were marked `UNSAFE`. The `clr strict security` option can be disabled for backward compatibility, but isn't recommended.

We recommend that you sign all assemblies by a certificate or asymmetric key, with a corresponding login that has been granted `UNSAFE ASSEMBLY` permission in the `master` database.  SQL Server 
 administrators can also add assemblies to a list of assemblies, which the Database Engine should trust. For more information, see [sys.sp_add_trusted_assembly](../../relational-databases/system-stored-procedures/sys-sp-add-trusted-assembly-transact-sql.md).


## Examples

The following example first displays the current setting of the `clr enabled` option and then enables the option by setting the option value to 1. To disable the option, set the value to 0.

```sql
EXECUTE sp_configure 'clr enabled';
EXECUTE sp_configure 'clr enabled', '1';
RECONFIGURE;
```

## Related content

- [Server configuration options](server-configuration-options-sql-server.md)
- [sys.sp_configure (Transact-SQL)](../../relational-databases/system-stored-procedures/sp-configure-transact-sql.md)
