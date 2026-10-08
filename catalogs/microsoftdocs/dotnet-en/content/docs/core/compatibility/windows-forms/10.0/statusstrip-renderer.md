---
title: "Breaking change: System.Windows.Forms.StatusStrip uses System RenderMode by default"
description: Learn about the breaking change in .NET 10 for Windows Forms where System.Windows.Forms.StatusStrip uses a different default value for the RenderMode property.
ms.date: 02/12/2025
---
# System.Windows.Forms.StatusStrip uses System RenderMode by default

[System.Windows.Forms.StatusStrip](https://learn.microsoft.com/search/?terms=System.Windows.Forms.StatusStrip) has been updated to use the system renderer.

## Version introduced

.NET 10

## Previous behavior

Previously, [System.Windows.Forms.StatusStrip](https://learn.microsoft.com/search/?terms=System.Windows.Forms.StatusStrip) used the default renderer.

## New behavior

The `StatusStrip.RenderMode` property is set to [System.Windows.Forms.ToolStripRenderMode.System](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolStripRenderMode.System) by default. You might observe minor changes to the appearance of the `StatusStrip`.

## Change category

This change is a [*behavioral change*](../../categories.md#behavioral-change).

## Reason for change

The previous behavior was [changed in .NET 9](../9.0/statusstrip-renderer.md). This reverts the behavior to the previous default behavior.

## Recommended action

N/A

## Affected APIs

- [System.Windows.Forms.StatusStrip](https://learn.microsoft.com/search/?terms=System.Windows.Forms.StatusStrip)
- [System.Windows.Forms.ToolStripManager.RenderMode](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolStripManager.RenderMode)
