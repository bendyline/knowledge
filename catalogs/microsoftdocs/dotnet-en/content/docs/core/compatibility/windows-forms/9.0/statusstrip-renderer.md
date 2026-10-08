---
title: "Breaking change: System.Windows.Forms.StatusStrip uses a different default renderer"
description: Learn about the breaking change in .NET 9 for Windows Forms where System.Windows.Forms.StatusStrip uses a different default value for the RenderMode property.
ms.date: 02/12/2025
---
# System.Windows.Forms.StatusStrip uses a different default renderer

[System.Windows.Forms.StatusStrip](https://learn.microsoft.com/search/?terms=System.Windows.Forms.StatusStrip) has been updated to use the default renderer.

## Version introduced

.NET 9

## Previous behavior

Previously, the `StatusStrip.RenderMode` property was set to [System.Windows.Forms.ToolStripRenderMode.System](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolStripRenderMode.System) by default.

## New behavior

[System.Windows.Forms.StatusStrip](https://learn.microsoft.com/search/?terms=System.Windows.Forms.StatusStrip) uses the default renderer. You might observe minor changes to the appearance of the `StatusStrip`.

## Change category

This change is a [*behavioral change*](../../categories.md#behavioral-change).

## Reason for change

The previous default behavior didn't meet accessibility standards. The focus indicator over the `ToolStripSplitButton` was difficult to see due to the lack of contrast.

## Recommended action

The new behavior is recommended for accessibility reasons. If you want to revert to the previous behavior, set the `RenderMode` property to [System.Windows.Forms.ToolStripRenderMode.System](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolStripRenderMode.System).

> **Note:**
> The new behavior was reverted to the previous behavior in a .NET 9 servicing release and [.NET 10 Preview 1](../10.0/statusstrip-renderer.md).

## Affected APIs

- [System.Windows.Forms.StatusStrip](https://learn.microsoft.com/search/?terms=System.Windows.Forms.StatusStrip)
- [System.Windows.Forms.ToolStripManager.RenderMode](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolStripManager.RenderMode)
