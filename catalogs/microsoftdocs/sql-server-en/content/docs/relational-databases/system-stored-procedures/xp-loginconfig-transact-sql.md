---
title: "xp_loginconfig (Transact-SQL)"
description: "Reports the login security configuration of an instance of SQL Server."
author: VanMSFT
ms.author: vanto
ms.reviewer: randolphwest
ms.date: 06/23/2025
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "xp_loginconfig_TSQL"
  - "xp_loginconfig"
helpviewer_keywords:
  - "xp_loginconfig"
dev_langs:
  - "TSQL"
---
# xp_loginconfig (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Reports the login security configuration of an instance of  SQL Server 
.

> **Important:**  
> This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature. 



## Syntax

```syntaxsql
xp_loginconfig [ 'config_name' ]
```

## Arguments

> **Important:**  
> Arguments for extended stored procedures must be entered in the specific order as described in the [Syntax](#syntax) section. If the parameters are entered out of order, an error message occurs.


#### '*config_name*'

The configuration value to be displayed. If *config_name* isn't specified, all configuration values are reported. *config_name* is **sysname**, with a default of `NULL`, and can be one of the following values.

| Value | Description |
| --- | --- |
| **login mode** | Login security mode. Possible values are **Mixed** and **Windows Authentication**.<br /><br />Replaced by:<br /><br />`SELECT SERVERPROPERTY('IsIntegratedSecurityOnly');` |
| **default login** | Name of the default  SQL Server |
 | login ID for authorized users of trusted connections (for users without matching login name). The default login is **guest**.<br /><br />**Note:** This value is provided for backward compatibility. |
| **default domain** | Name of the default Windows domain for network users of trusted connections. The default domain is the domain of the computer running Windows and  SQL Server |
| .<br /><br />**Note:** This value is provided for backward compatibility. |
| **audit level** | Audit level. Possible values are **none**, **success**, **failure**, and **all**. Audits are written to the error log and to the Windows Event Viewer. |
| **set hostname** | Indicates whether the host name from the client login record is replaced with the Windows network user name. Possible values are **true** or **false**. If this option is set, the network user name appears in output from `sp_who`. |
| **map _** | Reports what special Windows characters are mapped to the valid  SQL Server |
 | underscore character (`_`). Possible values are **domain separator** (default), **space**, **null**, or any single character.<br /><br />**Note:** This value is provided for backward compatibility. |
| **map $** | Reports what special Windows characters are mapped to the valid  SQL Server |
 | dollar sign character (`$`). Possible values are **domain separator**, **space**, **null**, or any single character. The default is **space**.<br /><br />**Note:** This value is provided for backward compatibility. |
| **map #** | Reports what special Windows characters are mapped to the valid  SQL Server |
 | number sign character (`#`). Possible values are **domain separator**, **space**, **null**, or any single character. Default is the hyphen.<br /><br />**Note:** This value is provided for backward compatibility. |

## Return code values

`0` (success) or `1` (failure).

## Result set

| Column name | Data type | Description |
| --- | --- | --- |
| **name** | **sysname** | Configuration value |
| **config value** | **sysname** | Configuration value setting |

## Remarks

`xp_loginconfig` can't be used to set configuration values.

To set the login mode and audit level, use  SQL Server Management Studio 
.

## Permissions

Requires CONTROL permission on the `master` database.

## Examples

### A. Report all configuration values

The following example shows all the currently configured settings.

```sql
EXECUTE xp_loginconfig;
GO
```

### B. Report a specific configuration value

The following example shows the setting for only the login mode.

```sql
EXECUTE xp_loginconfig 'login mode';
GO
```

## Related content

- [sys.sp_denylogin (Transact-SQL)](sp-denylogin-transact-sql.md)
- [sys.sp_grantlogin (Transact-SQL)](sp-grantlogin-transact-sql.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
- [sys.sp_revokelogin (Transact-SQL)](sp-revokelogin-transact-sql.md)
- [sys.xp_logininfo (Transact-SQL)](xp-logininfo-transact-sql.md)
