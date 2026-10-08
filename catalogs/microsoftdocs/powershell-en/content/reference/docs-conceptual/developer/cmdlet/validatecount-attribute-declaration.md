---
description: ValidateCount Attribute Declaration
ms.date: 09/13/2016
title: ValidateCount Attribute Declaration
---
# ValidateCount Attribute Declaration

The ValidateCount attribute specifies the minimum and maximum number of arguments allowed for a cmdlet parameter.

## Syntax

```csharp
[ValidateCount(int minLength, int maxlength)]
```

#### Parameters

`MinLength` ([System.Int32][Int32])
Required. Specifies the minimum number of arguments.

`MaxLength`([System.Int32][Int32])
Required. Specifies the maximum number of arguments.

## Remarks

- For more information about how to declare this attribute, see
  [How to Validate an Argument Count][howto].
- When this attribute is not invoked, the corresponding cmdlet parameter can have any number of
  arguments.
- The Windows PowerShell runtime throws an error under the following conditions:
  - The `MinLength` and `MaxLength` attribute parameters are not of type [System.Int32][Int32].
  - The value of the `MaxLength` attribute parameter is less than the value of the `MinLength`
    attribute parameter.
- The ValidateCount attribute is defined by the
  [System.Management.Automation.ValidateCountAttribute][ValidateCountAttribute] class.

## See Also

[System.Management.Automation.ValidateCountAttribute][ValidateCountAttribute]

[How to Validate an Argument Count][howto]

[Writing a Windows PowerShell Cmdlet][writing]

[howto]: how-to-validate-an-argument-count.md
[writing]: https://github.com/MicrosoftDocs/PowerShell-Docs/blob/a3de8f22552170e70852470d46cd52cd9ca471ec/reference/docs-conceptual/developer/cmdlet/writing-a-windows-powershell-cmdlet.md
[Int32]: https://learn.microsoft.com/dotnet/api/System.Int32
[ValidateCountAttribute]: https://learn.microsoft.com/dotnet/api/System.Management.Automation.ValidateCountAttribute
