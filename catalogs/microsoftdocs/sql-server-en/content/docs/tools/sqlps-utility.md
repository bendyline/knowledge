---
title: "sqlps Utility"
description: The sqlps utility starts a Windows PowerShell session with the SQL Server PowerShell provider and cmdlets loaded and registered.
author: rwestMSFT
ms.author: randolphwest
ms.date: 12/16/2025
ms.service: sql
ms.subservice: tools-other
ms.topic: concept-article
ms.collection:
  - data-tools
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "sqlps utility"
  - "PowerShell [SQL Server], sqlps utility"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =fabric-sqldb"
---
# sqlps utility


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../sql-server/sql-docs-navigation-guide.md#applies-to)



The **sqlps** utility starts a Windows PowerShell session with the  SQL Server 
 PowerShell provider and cmdlets loaded and registered. You can enter PowerShell commands or scripts that use the  SQL Server 
 PowerShell components to work with instances of  SQL Server 
 and their objects.

> **Important:**  
> This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  Use the **sqlps** PowerShell module instead. For more information about the **sqlps** module, see [Import the SQLPS Module](https://learn.microsoft.com/powershell/sql-server/download-sql-server-ps-module).

## Syntax

```powershell
sqlps
[ [ [ -NoLogo ] [ -NoExit ] [ -NoProfile ]
    [ -OutPutFormat { Text | XML } ] [ -InPutFormat { Text | XML } ]
  ]
  [ -Command { -
             | script_block [ -args argument_array ]
             | string [ command_parameters ]
             }
  ]
]
[ -? | -Help ]
```

## Arguments

#### -NoLogo

Specifies that the **sqlps** utility hide the copyright banner when it starts.

#### -NoExit

Specifies that the **sqlps** utility continue running after the startup commands have completed.

#### -NoProfile

Specifies that the **sqlps** utility not load a user profile. User profiles record commonly used aliases, functions, and variables for use across PowerShell sessions.

#### -OutPutFormat { Text | XML }

Specifies that the **sqlps** utility output is formatted as either text strings (**Text**) or in a serialized CLIXML format (**XML**).

#### -InPutFormat { Text | XML }

Specifies that input to the **sqlps** utility is formatted as either text strings (**Text**) or in a serialized CLIXML format (**XML**).

#### -Command

Specifies the command for the **sqlps** utility to run. The **sqlps** utility runs the command and then exits, unless `-NoExit` is also specified. Don't specify any other switches after `-Command`. They're read as command parameters.

#### -

`-Command-` specifies that the **sqlps** utility read the input from the standard input.

#### *script_block* [ -args*argument_array* ]

Specifies a block of PowerShell commands to run, the block must be enclosed in braces: {}. *Script_block* can only be specified when the **sqlps** utility is called from either **PowerShell** or another **sqlps** utility session. The *argument_array* is an array of PowerShell variables containing the arguments for the PowerShell commands in the *script_block*.

#### *string* [ *command_parameters* ]

Specifies a string that contains the PowerShell commands to be run. Use the format `"{<command>}"`. The quotation marks indicate a string, and the invocation operator (`&`) causes the **sqlps** utility to run the command (`<command>`).

#### [ -? | -Help ]

Shows the syntax summary of the **sqlps** utility options.

## Remarks

The **sqlps** utility starts the PowerShell environment (PowerShell.exe) and loads the  SQL Server 
 PowerShell module. The module, also named **sqlps**, loads and registers these  SQL Server 
 PowerShell snap-ins:

- `Microsoft.SqlServer.Management.PSProvider.dll`

  Implements the  SQL Server 
 PowerShell provider and associated cmdlets such as **Encode-SqlName** and **Decode-SqlName**.

- `Microsoft.SqlServer.Management.PSSnapin.dll`

  Implements the **Invoke-Sqlcmd** and **Invoke-PolicyEvaluation** cmdlets.

You can use the **sqlps** utility to do the following tasks:

- Interactively run PowerShell commands.
- Run PowerShell script files.
- Run  SQL Server 
 cmdlets.

- Use the  SQL Server 
 provider paths to navigate through the hierarchy of  SQL Server 
 objects.

By default, the **sqlps** utility runs with the scripting execution policy set to **Restricted**. This prevents running any PowerShell scripts. You can use the **Set-ExecutionPolicy** cmdlet to enable running signed scripts, or any scripts. Only run scripts from trusted sources, and secure all input and output files by using the appropriate NTFS permissions. For more information about enabling PowerShell scripts, see [Running Windows PowerShell Scripts](https://learn.microsoft.com/previous-versions/system-center/virtual-machine-manager-2008-r2/cc917925\(v=technet.10\)).

The version of the **sqlps** utility in  SQL Server 2008 (10.0.x) 
 and  SQL Server 2008 R2 (10.50.x) 
 was implemented as a Windows PowerShell 1.0 mini-shell. Mini-shells have certain restrictions, such as not allowing users to load snap-ins other than those snap-ins loaded by the mini-shell. These restrictions don't apply to the  SQL Server 2012 (11.x) 
 and later versions of the utility, which have been changed to use the **sqlps** module.

## Examples

### A. Run the sqlps utility in default, interactive mode without the copyright banner

```powershell
sqlps -NoLogo
```

### B. Run a SQL Server PowerShell script from the command prompt

```powershell
sqlps -Command "&{.\MyFolder.MyScript.ps1}"
```

### C. Run a SQL Server PowerShell script from the command prompt, and keep running after the script completes

```powershell
sqlps -NoExit -Command "&{.\MyFolder.MyScript.ps1}"
```

## Related content

- [Enable or disable a server network protocol](../database-engine/configure-windows/enable-or-disable-a-server-network-protocol.md)
- [SQL Server PowerShell](https://learn.microsoft.com/powershell/sql-server/sql-server-powershell)
