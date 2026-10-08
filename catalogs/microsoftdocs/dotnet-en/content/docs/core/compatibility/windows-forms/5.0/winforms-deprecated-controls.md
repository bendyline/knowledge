---
title: "Breaking change: Removed status bar controls"
description: Learn about the breaking change in .NET 5 where some Windows Forms controls are no longer available.
ms.date: 07/18/2020
---
# Removed status bar controls

Starting in .NET 5, some Windows Forms controls are no longer available.

## Change description

Starting with .NET 5, some of the status bar-related Windows Forms controls are no longer available. Replacement controls that have better design and support were introduced in .NET Framework 2.0. The deprecated controls were previously removed from designer toolboxes but were still available to be used. Now, they have been completely removed.

The following types are no longer available:

* `StatusBar`
* `StatusBarDrawItemEventArgs`
* `StatusBarDrawItemEventHandler`
* `StatusBarPanel`
* `StatusBarPanelAutoSize`
* `StatusBarPanelBorderStyle`
* `StatusBarPanelClickEventArgs`
* `StatusBarPanelClickEventHandler`
* `StatusBarPanelStyle`

## Version introduced

5.0

## Recommended action

Move to the replacement APIs for these controls and their scenarios:

| Old Control (API) | Recommended Replacement |
| --- | --- |
| StatusBar | [System.Windows.Forms.StatusStrip](https://learn.microsoft.com/search/?terms=System.Windows.Forms.StatusStrip) |
| StatusBarPanel | [System.Windows.Forms.ToolStripStatusLabel](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolStripStatusLabel) |

## Affected APIs

- [System.Windows.Forms.StatusBar](https://learn.microsoft.com/search/?terms=System.Windows.Forms.StatusBar)
- [System.Windows.Forms.StatusBarDrawItemEventArgs](https://learn.microsoft.com/search/?terms=System.Windows.Forms.StatusBarDrawItemEventArgs)
- [System.Windows.Forms.StatusBarDrawItemEventHandler](https://learn.microsoft.com/search/?terms=System.Windows.Forms.StatusBarDrawItemEventHandler)
- [System.Windows.Forms.StatusBarPanel](https://learn.microsoft.com/search/?terms=System.Windows.Forms.StatusBarPanel)
- [System.Windows.Forms.StatusBarPanelAutoSize](https://learn.microsoft.com/search/?terms=System.Windows.Forms.StatusBarPanelAutoSize)
- [System.Windows.Forms.StatusBarPanelBorderStyle](https://learn.microsoft.com/search/?terms=System.Windows.Forms.StatusBarPanelBorderStyle)
- [System.Windows.Forms.StatusBarPanelClickEventArgs](https://learn.microsoft.com/search/?terms=System.Windows.Forms.StatusBarPanelClickEventArgs)
- [System.Windows.Forms.StatusBarPanelClickEventHandler](https://learn.microsoft.com/search/?terms=System.Windows.Forms.StatusBarPanelClickEventHandler)
- [System.Windows.Forms.StatusBarPanelStyle](https://learn.microsoft.com/search/?terms=System.Windows.Forms.StatusBarPanelStyle)

<!--

### Affected APIs

- `T:System.Windows.Forms.StatusBar`
- `T:System.Windows.Forms.StatusBarDrawItemEventArgs`
- `T:System.Windows.Forms.StatusBarDrawItemEventHandler`
- `T:System.Windows.Forms.StatusBarPanel`
- `T:System.Windows.Forms.StatusBarPanelAutoSize`
- `T:System.Windows.Forms.StatusBarPanelBorderStyle`
- `T:System.Windows.Forms.StatusBarPanelClickEventArgs`
- `T:System.Windows.Forms.StatusBarPanelClickEventHandler`
- `T:System.Windows.Forms.StatusBarPanelStyle`

### Category

Windows Forms

-->
