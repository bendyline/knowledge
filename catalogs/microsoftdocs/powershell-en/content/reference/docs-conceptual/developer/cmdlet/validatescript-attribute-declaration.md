---
description: ValidateScript Attribute Declaration
ms.date: 09/30/2022
title: ValidateScript Attribute Declaration
---
# ValidateScript Attribute Declaration

The `ValidateScript` attribute specifies a script that's used to validate a parameter or variable
value. PowerShell pipes the value to the script, and generates an error if the script returns
`$false` or if the script throws an exception.

When you use the `ValidateScript` attribute, the value that's being validated is mapped to the `$_`
variable. You can use the `$_` variable to refer to the value in the script.

## Syntax

```csharp
[ValidateScriptAttribute(ScriptBlock scriptBlock)]
[ValidateScriptAttribute(ScriptBlock scriptBlock, Named Parameters)]
```

### Parameters

- `scriptBlock` - ([System.Management.Automation.ScriptBlock][01]) Required. The script block used
  to validate the input.
- `ErrorMessage` - Optional named parameter - The item being validated and the validating
  scriptblock are passed as the first and second formatting arguments.

> **Note:**
> The `ErrorMessage` argument was added in PowerShell 6.

## Remarks

- This attribute can be used only once per parameter.
- If this attribute is applied to a collection, each element in the collection must match the
  pattern.
- The ValidateScript attribute is defined by the
  [System.Management.Automation.ValidateScriptAttribute][02] class.

## See Also

[System.Management.Automation.ValidateScriptAttribute][02]

[Writing a Windows PowerShell Cmdlet][03]

<!-- Reference links -->
[01]: https://learn.microsoft.com/dotnet/api/System.Management.Automation.ScriptBlock
[02]: https://learn.microsoft.com/dotnet/api/System.Management.Automation.ValidateScriptAttribute
[03]: https://github.com/MicrosoftDocs/PowerShell-Docs/blob/a3de8f22552170e70852470d46cd52cd9ca471ec/reference/docs-conceptual/developer/cmdlet/writing-a-windows-powershell-cmdlet.md
