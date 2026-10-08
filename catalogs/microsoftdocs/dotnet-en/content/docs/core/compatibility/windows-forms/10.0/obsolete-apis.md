---
title: "Breaking change: .NET 10 obsoletions in Windows Forms"
titleSuffix: ""
description: Learn about the .NET 10 breaking change where some Windows Forms APIs have been marked as obsolete.
ms.date: 03/10/2025
---
# Windows Forms obsoletions (.NET 10)

Some Windows Forms APIs have been marked as obsolete, starting in .NET 10.

## Previous behavior

Previously, the [affected APIs](#affected-apis) could be used without any build warnings.

## New behavior

In .NET 10 and later versions, use of these APIs produces a compile-time warning with a custom diagnostic ID. The use of custom diagnostic IDs allows you to suppress the warnings individually instead of blanket-suppressing all obsoletion warnings.

The following table lists the custom diagnostic IDs and their corresponding warning messages.

| Diagnostic ID | Description | Severity |
| --- | --- | --- |
| [WFDEV004](https://learn.microsoft.com/dotnet/desktop/winforms/wfdev-diagnostics/wfdev004) | [System.Windows.Forms.Form.OnClosing(System.ComponentModel.CancelEventArgs)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Form.OnClosing(System.ComponentModel.CancelEventArgs)), [System.Windows.Forms.Form.OnClosed(System.EventArgs)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Form.OnClosed(System.EventArgs)) and the corresponding events are obsolete. Use [System.Windows.Forms.Form.OnFormClosing(System.Windows.Forms.FormClosingEventArgs)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Form.OnFormClosing(System.Windows.Forms.FormClosingEventArgs)), [System.Windows.Forms.Form.OnFormClosed(System.Windows.Forms.FormClosedEventArgs)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Form.OnFormClosed(System.Windows.Forms.FormClosedEventArgs)), [System.Windows.Forms.Form.FormClosing](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Form.FormClosing) and [System.Windows.Forms.Form.FormClosed](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Form.FormClosed) instead. | Warning |
| [WFDEV005](https://learn.microsoft.com/dotnet/desktop/winforms/wfdev-diagnostics/wfdev005) | [System.Windows.Clipboard.GetData(System.String)](https://learn.microsoft.com/search/?terms=System.Windows.Clipboard.GetData(System.String)) method is obsolete. Use [System.Windows.Forms.Clipboard.TryGetData*](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Clipboard.TryGetData*) methods instead. | Warning |
| [WFDEV006](https://learn.microsoft.com/dotnet/desktop/winforms/wfdev-diagnostics/wfdev006) | [System.Windows.Forms.ContextMenu](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ContextMenu), [System.Windows.Forms.DataGrid](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGrid), [System.Windows.Forms.MainMenu](https://learn.microsoft.com/search/?terms=System.Windows.Forms.MainMenu), [System.Windows.Forms.Menu](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Menu), [System.Windows.Forms.StatusBar](https://learn.microsoft.com/search/?terms=System.Windows.Forms.StatusBar), [System.Windows.Forms.ToolBar](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolBar) are obsolete. They're provided for binary compatibility with .NET Framework. | Warning |

## Version introduced

.NET 10

## Type of breaking change

These obsoletion warnings can affect [source compatibility](../../categories.md#source-compatibility).

## Recommended action

- Follow the specific guidance provided for the each diagnostic ID using the URL link provided on the warning.
- If necessary, you can suppress the warning using the custom `WFDEVxxx` diagnostic ID value.

## Affected APIs

### WFDEV004

- [System.Windows.Forms.Form.OnClosing(System.ComponentModel.CancelEventArgs)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Form.OnClosing(System.ComponentModel.CancelEventArgs))
- [System.Windows.Forms.Form.OnClosed(System.EventArgs)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Form.OnClosed(System.EventArgs))

### WFDEV005

- [System.Windows.Clipboard.GetData(System.String)](https://learn.microsoft.com/search/?terms=System.Windows.Clipboard.GetData(System.String))

### WFDEV006

- [System.Windows.Forms.ContextMenu](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ContextMenu)
- [System.Windows.Forms.DataGrid](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGrid)
- [System.Windows.Forms.MainMenu](https://learn.microsoft.com/search/?terms=System.Windows.Forms.MainMenu)
- [System.Windows.Forms.Menu](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Menu)
- [System.Windows.Forms.StatusBar](https://learn.microsoft.com/search/?terms=System.Windows.Forms.StatusBar)
- [System.Windows.Forms.ToolBar](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolBar)

## See also

- [Obsolete Windows Forms features in .NET 10+](https://learn.microsoft.com/dotnet/desktop/winforms/wfdev-diagnostics/obsoletions-overview)
