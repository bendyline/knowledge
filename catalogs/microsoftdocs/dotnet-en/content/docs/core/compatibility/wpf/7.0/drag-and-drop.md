---
title: "Breaking change: 'Revert behavior with text drag-and-drop operations'"
description: Learn about a breaking change in Windows Presentation Foundation (WPF) and .NET 7. Drag-and-drop behavior was reverted to .NET Framework behavior when dragging text from a text editor control.
ms.date: 11/4/2024
ai-usage: ai-assisted
---

# Drag-and-drop operations in text editors

.NET 7 addresses a regression introduced in .NET Core 3.0 concerning drag operations in text editor controls. This update restores the behavior to match that of .NET Framework, ensuring consistency in how data is set during drag operations.

## Version introduced

.NET 7

## Previous behavior

In .NET Core 3.0 through .NET 6, the data type on [System.Windows.DataObject](https://learn.microsoft.com/search/?terms=System.Windows.DataObject) when dragging text from a text editor control was [System.Windows.DataFormats.Text](https://learn.microsoft.com/search/?terms=System.Windows.DataFormats.Text) or [System.Windows.DataFormats.UnicodeText](https://learn.microsoft.com/search/?terms=System.Windows.DataFormats.UnicodeText).

## New behavior

Starting in .NET 7, the data type on [System.Windows.DataObject](https://learn.microsoft.com/search/?terms=System.Windows.DataObject) when dragging text from a text editor control is [System.Windows.DataFormats.StringFormat](https://learn.microsoft.com/search/?terms=System.Windows.DataFormats.StringFormat).

## Type of breaking change

This change is a [behavioral change](../../categories.md#behavioral-change).

## Reason for change

The change was made to revert an unintentional change in .NET 3.0 and match the behavior of .NET Framework.

## Recommended action

Upgrade older projects to the latest version of .NET to restore the behavior.

## Affected APIs

- [System.Windows.DataObject](https://learn.microsoft.com/search/?terms=System.Windows.DataObject)
