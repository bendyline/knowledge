---
title: "Breaking change: 'Text drag-and-drop operations'"
description: Learn about a breaking change in Windows Presentation Foundation (WPF) in .NET Core 3.0. Drag-and-drop behavior changed when dragging text from a text editor control.
ms.date: 11/4/2024
ms.topic: include
ai-usage: ai-assisted
---

### Altered drag-and-drop behavior on text editors

.NET Core 3.0 introduced a change in how text editor controls create a [System.Windows.DataObject](https://learn.microsoft.com/search/?terms=System.Windows.DataObject) when dragging text to another control. The change disabled autoconversion, causing the operation to keep the data as [System.Windows.DataFormats.Text](https://learn.microsoft.com/search/?terms=System.Windows.DataFormats.Text) or [System.Windows.DataFormats.UnicodeText](https://learn.microsoft.com/search/?terms=System.Windows.DataFormats.UnicodeText) instead of converting it to [System.Windows.DataFormats.StringFormat](https://learn.microsoft.com/search/?terms=System.Windows.DataFormats.StringFormat).

#### Version introduced

.NET Core 3.0

#### Category

Windows Presentation Foundation

#### Previous behavior

The data type on [System.Windows.DataObject](https://learn.microsoft.com/search/?terms=System.Windows.DataObject) when dragging text from a text editor control was [System.Windows.DataFormats.StringFormat](https://learn.microsoft.com/search/?terms=System.Windows.DataFormats.StringFormat).

#### New behavior

The data type on [System.Windows.DataObject](https://learn.microsoft.com/search/?terms=System.Windows.DataObject) when dragging text from a text editor control is [System.Windows.DataFormats.Text](https://learn.microsoft.com/search/?terms=System.Windows.DataFormats.Text) or [System.Windows.DataFormats.UnicodeText](https://learn.microsoft.com/search/?terms=System.Windows.DataFormats.UnicodeText).

#### Type of breaking change

This change is a [behavioral change](../../../../docs/core/compatibility/categories.md).

#### Reason for change

The change was unintentional.

#### Recommended action

This change was [reverted in .NET 7](../../../../docs/core/compatibility/wpf/7.0/drag-and-drop.md). Upgrade to .NET 7 or later.

#### Affected APIs

- [System.Windows.DataObject](https://learn.microsoft.com/search/?terms=System.Windows.DataObject)
