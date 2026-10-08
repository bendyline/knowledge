---
title: "Breaking change: WinForms methods now throw ArgumentException"
description: Learn about the breaking change in .NET 5 where some Windows Forms methods now throw an ArgumentException for invalid arguments.
ms.date: 07/18/2020
---
# WinForms methods now throw ArgumentException

Some Windows Forms methods now throw an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) for invalid arguments, where previously they did not.

## Change description

Previously, passing arguments of an unexpected or incorrect type to certain Windows Forms methods would result in an indeterminate state. Starting in .NET 5, these methods now throw an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) when passed invalid arguments.

Throwing an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) conforms to the behavior of the .NET runtime. It also improves the debugging experience by clearly communicating which argument is invalid.

## Version introduced

.NET 5.0

## Recommended action

- Update the code to prevent passing invalid arguments.
- If necessary, handle an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) when calling the method.

## Affected APIs

The following table lists the affected methods and parameters:

| Method | Parameter name | Condition | Version added |
| --- | --- | --- | --- |
| [System.Windows.Forms.TabControl.GetToolTipText(System.Object)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TabControl.GetToolTipText(System.Object)) | `item` | Argument is not of type [System.Windows.Forms.TabPage](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TabPage). | Preview 1 |
| [System.Windows.Forms.DataFormats.GetFormat(System.String)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataFormats.GetFormat(System.String)) | `format` | Argument is `null`, [System.String.Empty](https://learn.microsoft.com/search/?terms=System.String.Empty), or white space. | Preview 5 |
| [System.Windows.Forms.InputLanguageChangedEventArgs.%23ctor(System.Globalization.CultureInfo,System.Byte)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.InputLanguageChangedEventArgs.%2523ctor(System.Globalization.CultureInfo%2CSystem.Byte)) | `culture` | Unable to retrieve an `InputLanguage` for the specified culture. | Preview 7 |

<!--

### Affected APIs

- `M:System.Windows.Forms.TabControl.GetToolTipText(System.Object)`
- `M:System.Windows.Forms.DataFormats.GetFormat(System.String)`
- `M:System.Windows.Forms.InputLanguageChangedEventArgs.%23ctor(System.Globalization.CultureInfo,System.Byte)`

### Category

Windows Forms

-->
