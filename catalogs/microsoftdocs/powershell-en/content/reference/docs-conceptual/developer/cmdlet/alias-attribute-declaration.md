---
description: Alias Attribute Declaration
ms.date: 06/07/2021
title: Alias Attribute Declaration
---
# Alias Attribute Declaration

The **Alias** attribute allows the user to specify different names for a cmdlet or a cmdlet
parameter. Aliases can be used to provide shortcuts for a parameter name, or they can provide
different names that are appropriate for different scenarios.

## Syntax

```csharp
[Alias(aliasNames)]
```

### Parameters

`aliasNames` (String[])
Required. Specifies a set of comma-separated alias names for the cmdlet parameter.

## Remarks

The **Alias** attribute is defined by the
[System.Management.Automation.AliasAttribute](https://learn.microsoft.com/dotnet/api/System.Management.Automation.AliasAttribute)
class.

### Cmdlet aliases

- The **Alias** attribute is used with the cmdlet declaration. For more information about how to
  declare these attributes, see [Cmdlet Aliases](cmdlet-aliases.md).
- Each parameter alias name must be unique. Windows PowerShell does not check for duplicate alias
  names.

### Parameter aliases

- The **Alias** attribute is used with the **Parameter** attribute when you specify a cmdlet
  parameter. For more information about how to declare these attributes, see [How to Declare Cmdlet Parameters](how-to-declare-cmdlet-parameters.md).
- Each parameter alias name must be unique within a cmdlet. Windows PowerShell does not check for
  duplicate alias names.
- The Alias attribute is used once for each parameter in a cmdlet.

## See Also

[Cmdlet Aliases](cmdlet-aliases.md)

[Parameter Aliases](parameter-aliases.md)

[Writing a Windows PowerShell Cmdlet](https://github.com/MicrosoftDocs/PowerShell-Docs/blob/a3de8f22552170e70852470d46cd52cd9ca471ec/reference/docs-conceptual/developer/cmdlet/writing-a-windows-powershell-cmdlet.md)
