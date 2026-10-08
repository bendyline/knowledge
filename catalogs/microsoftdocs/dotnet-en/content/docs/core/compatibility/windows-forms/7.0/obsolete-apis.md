---
title: "Breaking change: .NET 7 obsoletions and warnings in Windows Forms"
titleSuffix: ""
description: Learn about the .NET 7 breaking change where some Windows Forms APIs have been marked as obsolete or otherwise produce a warning.
ms.date: 09/09/2022
---
# Windows Forms obsoletions and warnings (.NET 7)

Some Windows Forms APIs have been marked as obsolete, starting in .NET 7. Other APIs aren't obsolete but will cause a compile-time warning if you reference them.

## Previous behavior

In previous .NET versions, these APIs can be used without any build warning.

## New behavior

In .NET 7 and later versions, use of these APIs produces a compile-time warning or error with a custom diagnostic ID. The use of custom diagnostic IDs allows you to suppress the warnings individually instead of blanket-suppressing all obsoletion warnings.

The following table lists the custom diagnostic IDs and their corresponding warning messages.

| Diagnostic ID | Description | Severity | Version introduced |
| - | - |
| [WFDEV001](https://learn.microsoft.com/dotnet/desktop/winforms/wfdev-diagnostics/wfdev001) | Casting to/from [System.IntPtr](https://learn.microsoft.com/search/?terms=System.IntPtr) is unsafe. Use `WParamInternal`, `LParamInternal`, or `ResultInternal` instead. | Warning | Preview 1 |
| [WFDEV002](https://learn.microsoft.com/dotnet/desktop/winforms/wfdev-diagnostics/wfdev002) | [System.Windows.Forms.DomainUpDown.DomainUpDownAccessibleObject](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.DomainUpDownAccessibleObject) is no longer used to provide accessible support for [System.Windows.Forms.DomainUpDown](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown) controls. Use [System.Windows.Forms.AccessibleObject](https://learn.microsoft.com/search/?terms=System.Windows.Forms.AccessibleObject) instead. | Warning | RC 1 |
| [WFDEV003](https://learn.microsoft.com/dotnet/desktop/winforms/wfdev-diagnostics/wfdev003) | [System.Windows.Forms.DomainUpDown.DomainItemAccessibleObject](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.DomainItemAccessibleObject) is no longer used to provide accessible support for [System.Windows.Forms.DomainUpDown](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown) items. Use [System.Windows.Forms.AccessibleObject](https://learn.microsoft.com/search/?terms=System.Windows.Forms.AccessibleObject) instead. | Warning | RC 1 |

## Version introduced

.NET 7

## Type of breaking change

These obsoletions and warnings can affect [source compatibility](../../categories.md#source-compatibility).

## Recommended action

- Follow the specific guidance provided for the each diagnostic ID using the URL link provided on the warning.
- If necessary, you can suppress the warning using the custom `WFDEVxxx` diagnostic ID value.

## Affected APIs

### WFDEV001

- [System.Windows.Forms.Message.WParam](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Message.WParam)
- [System.Windows.Forms.Message.LParam](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Message.LParam)
- [System.Windows.Forms.Message.Result](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Message.Result)

### WFDEV002

- [System.Windows.Forms.DomainUpDown.DomainUpDownAccessibleObject](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.DomainUpDownAccessibleObject)

### WFDEV003

- [System.Windows.Forms.DomainUpDown.DomainItemAccessibleObject](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.DomainItemAccessibleObject)

## See also

- [Obsolete Windows Forms features in .NET 7+](https://learn.microsoft.com/dotnet/desktop/winforms/wfdev-diagnostics/obsoletions-overview)
