---
title: "Breaking change - Applications referencing both WPF and WinForms must disambiguate MenuItem and ContextMenu types"
description: "Learn about the breaking change in .NET 10 where applications referencing both WPF and WinForms must disambiguate MenuItem and ContextMenu types."
ms.date: 3/11/2025
ai-usage: ai-assisted
ms.custom: https://github.com/dotnet/docs/issues/44738
---

# Applications referencing both WPF and WinForms must disambiguate MenuItem and ContextMenu types

Applications that reference both Windows Presentation Foundation (WPF) and Windows Forms (WinForms) must now disambiguate certain types, such as `MenuItem` and `ContextMenu`, to avoid compile-time errors.

## Version introduced

.NET 10

## Previous behavior

Previously, the types `ContextMenu`, `DataGrid`, `DataGridCell`, `Menu`, `MenuItem`, `ToolBar`, and `StatusBar` would resolve to the [System.Windows.Controls](https://learn.microsoft.com/search/?terms=System.Windows.Controls) namespace because they did not exist in the [System.Windows.Forms](https://learn.microsoft.com/search/?terms=System.Windows.Forms) namespace in .NET Core 3.1 through .NET 9.0.

```xml
<ImplicitUsings>enable</ImplicitUsings>
<UseWindowsForms>true</UseWindowsForms>
<UseWPF>true</UseWPF>
```

## New behavior

The affected types in the [System.Windows.Forms](https://learn.microsoft.com/search/?terms=System.Windows.Forms) namespace cause a compile-time error when there is an ambiguous reference between [System.Windows.Controls](https://learn.microsoft.com/search/?terms=System.Windows.Controls) and [System.Windows.Forms](https://learn.microsoft.com/search/?terms=System.Windows.Forms).

```output
CS0104 'ContextMenu' is an ambiguous reference between 'System.Windows.Controls.ContextMenu' and 'System.Windows.Forms.ContextMenu'
```

## Type of breaking change

This is a [source incompatible](../../categories.md#source-compatibility) change.

## Reason for change

The change facilitates migration from .NET Framework when third-party libraries cannot be updated. A .NET 10 application can continue to reference .NET Framework dependencies and handle errors at runtime.

## Recommended action

Use aliases to resolve conflicting namespaces. For example:

```csharp
using ContextMenu = System.Windows.Controls.ContextMenu;
```

Refer to the [alias name conflicts documentation](../../../../csharp/language-reference/compiler-messages/using-directive-errors.md#using-alias-restrictions) for more details.

## Affected APIs

- [System.Windows.Forms.ContextMenu](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ContextMenu)
- [System.Windows.Forms.DataGrid](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGrid)
- [System.Windows.Forms.DataGridCell](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridCell)
- [System.Windows.Forms.Menu](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Menu)
- [System.Windows.Forms.MenuItem](https://learn.microsoft.com/search/?terms=System.Windows.Forms.MenuItem)
- [System.Windows.Forms.ToolBar](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolBar)
- [System.Windows.Forms.StatusBar](https://learn.microsoft.com/search/?terms=System.Windows.Forms.StatusBar)
- [System.Windows.Controls.ContextMenu](https://learn.microsoft.com/search/?terms=System.Windows.Controls.ContextMenu)
- [System.Windows.Controls.DataGrid](https://learn.microsoft.com/search/?terms=System.Windows.Controls.DataGrid)
- [System.Windows.Controls.DataGridCell](https://learn.microsoft.com/search/?terms=System.Windows.Controls.DataGridCell)
- [System.Windows.Controls.Menu](https://learn.microsoft.com/search/?terms=System.Windows.Controls.Menu)
- [System.Windows.Controls.MenuItem](https://learn.microsoft.com/search/?terms=System.Windows.Controls.MenuItem)
- [System.Windows.Controls.ToolBar](https://learn.microsoft.com/search/?terms=System.Windows.Controls.ToolBar)
- `System.Windows.Controls.StatusBar`
