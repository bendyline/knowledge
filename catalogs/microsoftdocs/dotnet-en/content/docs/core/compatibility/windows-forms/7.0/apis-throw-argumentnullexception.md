---
title: "Breaking change: Some APIs throw ArgumentNullException (.NET 7)"
description: Learn about the breaking change in .NET 7 where some APIs validate arguments and now throw an ArgumentNullException.
ms.date: 01/21/2022
---
# Some APIs throw ArgumentNullException (.NET 7)

Some APIs now validate input parameters and throw an [System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException) where previously they threw a [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException), if invoked with `null` input arguments.

## Previous behavior

In previous .NET versions, the affected APIs throw a [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException) if invoked with an argument that's `null`.

## New behavior

Starting in .NET 7, the affected APIs throw an [System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException) if invoked with an argument that's `null`.

## Change category

This change affects [binary compatibility](../../categories.md#binary-compatibility).

## Reason for change

Throwing [System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException) conforms to .NET Runtime behavior. It provides a better debug experience by clearly communicating which argument caused the exception.

## Version introduced

.NET 7

## Recommended action

- Review and, if necessary, update your code to prevent passing `null` input arguments to the affected APIs.
- If your code handles [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException), replace or add an additional handler for [System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException).

## Affected APIs

The following table lists the affected APIs and specific parameters.

| Method/property | Parameter name | Change version |
| --- | --- | --- |
| [System.Windows.Forms.ComboBox.ChildAccessibleObject.%23ctor(System.Windows.Forms.ComboBox,System.IntPtr)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ComboBox.ChildAccessibleObject.%2523ctor(System.Windows.Forms.ComboBox%2CSystem.IntPtr)) | `owner` | Preview 1 |
| [System.Windows.Forms.ControlPaint.CreateHBitmap16Bit(System.Drawing.Bitmap,System.Drawing.Color)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ControlPaint.CreateHBitmap16Bit(System.Drawing.Bitmap%2CSystem.Drawing.Color)) | `bitmap` | Preview 1 |
| [System.Windows.Forms.ControlPaint.CreateHBitmapColorMask(System.Drawing.Bitmap,System.IntPtr)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ControlPaint.CreateHBitmapColorMask(System.Drawing.Bitmap%2CSystem.IntPtr)) | `bitmap` | Preview 1 |
| [System.Windows.Forms.DataGridViewEditingControlShowingEventArgs.%23ctor(System.Windows.Forms.Control,System.Windows.Forms.DataGridViewCellStyle)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewEditingControlShowingEventArgs.%2523ctor(System.Windows.Forms.Control%2CSystem.Windows.Forms.DataGridViewCellStyle)) | `control` or `cellStyle` | Preview 1 |
| [System.Windows.Forms.ToolStripArrowRenderEventArgs.%23ctor(System.Drawing.Graphics,System.Windows.Forms.ToolStripItem,System.Drawing.Rectangle,System.Drawing.Color,System.Windows.Forms.ArrowDirection)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolStripArrowRenderEventArgs.%2523ctor(System.Drawing.Graphics%2CSystem.Windows.Forms.ToolStripItem%2CSystem.Drawing.Rectangle%2CSystem.Drawing.Color%2CSystem.Windows.Forms.ArrowDirection)) | `g` | Preview 1 |
| [System.Windows.Forms.ToolStripContentPanelRenderEventArgs.%23ctor(System.Drawing.Graphics,System.Windows.Forms.ToolStripContentPanel)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolStripContentPanelRenderEventArgs.%2523ctor(System.Drawing.Graphics%2CSystem.Windows.Forms.ToolStripContentPanel)) | `g` or `contentPanel` | Preview 1 |
| [System.Windows.Forms.ToolStripItemRenderEventArgs.%23ctor(System.Drawing.Graphics,System.Windows.Forms.ToolStripItem)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolStripItemRenderEventArgs.%2523ctor(System.Drawing.Graphics%2CSystem.Windows.Forms.ToolStripItem)) | `g` or `item` | Preview 1 |
| [System.Windows.Forms.ToolStripPanelRenderEventArgs.%23ctor(System.Drawing.Graphics,System.Windows.Forms.ToolStripPanel)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolStripPanelRenderEventArgs.%2523ctor(System.Drawing.Graphics%2CSystem.Windows.Forms.ToolStripPanel)) | `g` or `toolStripPanel` | Preview 1 |
| [System.Windows.Forms.ListView.CheckedIndexCollection.%23ctor(System.Windows.Forms.ListView)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ListView.CheckedIndexCollection.%2523ctor(System.Windows.Forms.ListView)) | `owner` | Preview 5 |
