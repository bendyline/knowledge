---
title: "Breaking change: WinForms methods now throw ArgumentNullException"
description: Learn about the breaking change in .NET 5 where some Windows Forms methods now throw an ArgumentNullException for null arguments.
ms.date: 09/18/2020
---
# WinForms methods now throw ArgumentNullException

Some Windows Forms methods now throw an [System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException) for null arguments, where previously they threw a [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException).

## Change description

Previously, certain Windows Forms methods threw a [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException) if passed an argument that was null. Starting in .NET 5, these methods now throw an [System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException) for null arguments, instead.

Throwing an [System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException) conforms to the behavior of the .NET runtime. It also improves the debugging experience by clearly communicating that an argument is null and which argument it is.

## Version introduced

.NET 5.0

## Recommended action

If you call any of these methods and your code currently catches a [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException) for null arguments, catch an [System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException) instead. In addition, consider updating the code to prevent passing null arguments to the listed methods.

## Affected APIs

The following table lists the affected methods and parameters:

> 
>
> | Method | Parameter name | Version added |
> | --- | --- | --- |
> | [System.Windows.Forms.Control.ControlCollection.%23ctor(System.Windows.Forms.Control)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Control.ControlCollection.%2523ctor(System.Windows.Forms.Control)) | `owner` | Preview 1 |
> | [System.Windows.Forms.TabControl.GetToolTipText(System.Object)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TabControl.GetToolTipText(System.Object)) | `item` | Preview 1 |
> | [System.Windows.Forms.TableLayoutControlCollection.%23ctor(System.Windows.Forms.TableLayoutPanel)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TableLayoutControlCollection.%2523ctor(System.Windows.Forms.TableLayoutPanel)) | `container` | Preview 1 |
> | [System.Windows.Forms.ToolStripRenderer.OnRenderArrow(System.Windows.Forms.ToolStripArrowRenderEventArgs)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolStripRenderer.OnRenderArrow(System.Windows.Forms.ToolStripArrowRenderEventArgs)) | `e` | Preview 1 |
> | [System.Windows.Forms.ToolStripRenderer.OnRenderItemCheck(System.Windows.Forms.ToolStripItemImageRenderEventArgs)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolStripRenderer.OnRenderItemCheck(System.Windows.Forms.ToolStripItemImageRenderEventArgs)) | `e` | Preview 1 |
> | [System.Windows.Forms.ToolStripRenderer.OnRenderItemImage(System.Windows.Forms.ToolStripItemImageRenderEventArgs)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolStripRenderer.OnRenderItemImage(System.Windows.Forms.ToolStripItemImageRenderEventArgs)) | `e` | Preview 1 |
> | [System.Windows.Forms.ToolStripRenderer.OnRenderItemText(System.Windows.Forms.ToolStripItemTextRenderEventArgs)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolStripRenderer.OnRenderItemText(System.Windows.Forms.ToolStripItemTextRenderEventArgs)) | `e` | Preview 1 |
> | [System.Windows.Forms.ToolStripRenderer.OnRenderStatusStripSizingGrip(System.Windows.Forms.ToolStripRenderEventArgs)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolStripRenderer.OnRenderStatusStripSizingGrip(System.Windows.Forms.ToolStripRenderEventArgs)) > | `e` | Preview 1 |
> | [System.Windows.Forms.DataGridViewComboBoxEditingControl.ApplyCellStyleToEditingControl(System.Windows.Forms.DataGridViewCellStyle)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewComboBoxEditingControl.ApplyCellStyleToEditingControl(System.Windows.Forms.DataGridViewCellStyle)) | `dataGridViewCellStyle` | Preview 2 |
> | [System.Windows.Forms.RichTextBox.LoadFile(System.IO.Stream,System.Windows.Forms.RichTextBoxStreamType)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.RichTextBox.LoadFile(System.IO.Stream%2CSystem.Windows.Forms.RichTextBoxStreamType)) | `data` | Preview 2 |
> | [System.Windows.Forms.ListBox.IntegerCollection.%23ctor(System.Windows.Forms.ListBox)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ListBox.IntegerCollection.%2523ctor(System.Windows.Forms.ListBox)) | `owner` | Preview 5 |
> | [System.Windows.Forms.ListBox.IntegerCollection.CopyTo(System.Array,System.Int32)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ListBox.IntegerCollection.CopyTo(System.Array%2CSystem.Int32)) | `destination` | Preview 5 |
> | [System.Windows.Forms.ListViewGroup.System%23Runtime%23Serialization%23ISerializable%23GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ListViewGroup.System%2523Runtime%2523Serialization%2523ISerializable%2523GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | `info` | Preview 5 |
> | [System.Windows.Forms.VisualStyles.VisualStyleRenderer.%23ctor(System.String,System.Int32,System.Int32)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.VisualStyles.VisualStyleRenderer.%2523ctor(System.String%2CSystem.Int32%2CSystem.Int32)) | `className` | Preview 5 |
> | [System.Windows.Forms.ListBox.ObjectCollection.%23ctor(System.Windows.Forms.ListBox)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ListBox.ObjectCollection.%2523ctor(System.Windows.Forms.ListBox)) | `owner` | Preview 6 |
> | [System.Windows.Forms.ListBox.ObjectCollection.%23ctor(System.Windows.Forms.ListBox,System.Object\[\])](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ListBox.ObjectCollection.%2523ctor(System.Windows.Forms.ListBox%2CSystem.Object%5B%5D)) | `owner`, `value` | Preview 6 |
> | [System.Windows.Forms.ListBox.ObjectCollection.%23ctor(System.Windows.Forms.ListBox,System.Windows.Forms.ListBox.ObjectCollection)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ListBox.ObjectCollection.%2523ctor(System.Windows.Forms.ListBox%2CSystem.Windows.Forms.ListBox.ObjectCollection)) | `owner`, `value` | Preview 6 |
> | [System.Windows.Forms.ListBox.ObjectCollection.AddRange(System.Object\[\])](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ListBox.ObjectCollection.AddRange(System.Object%5B%5D)) | `items` | Preview 6 |
> | [System.Windows.Forms.ListBox.ObjectCollection.AddRange(System.Windows.Forms.ListBox.ObjectCollection)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ListBox.ObjectCollection.AddRange(System.Windows.Forms.ListBox.ObjectCollection)) | `value` | Preview 6 |
> | [System.Windows.Forms.ListBox.ObjectCollection.CopyTo(System.Object\[\],System.Int32)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ListBox.ObjectCollection.CopyTo(System.Object%5B%5D%2CSystem.Int32)) | `destination` | Preview 6 |
> | [System.Windows.Forms.ListBox.ObjectCollection.System%23Collections%23ICollection%23CopyTo(System.Array,System.Int32)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ListBox.ObjectCollection.System%2523Collections%2523ICollection%2523CopyTo(System.Array%2CSystem.Int32)) | `destination` | Preview 6 |
> | [System.Windows.Forms.ListView.SelectedIndexCollection.%23ctor(System.Windows.Forms.ListView)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ListView.SelectedIndexCollection.%2523ctor(System.Windows.Forms.ListView)) | `owner` | Preview 7 |
> | [System.Windows.Forms.TreeNodeCollection.Find(System.String,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TreeNodeCollection.Find(System.String%2CSystem.Boolean)) | `key` is `null` or empty | Preview 8 |
> | [System.Windows.Forms.ListView.ListViewItemCollection.Find(System.String,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ListView.ListViewItemCollection.Find(System.String%2CSystem.Boolean)) | `key` is `null` or empty | RC1 |
> | [System.Windows.Forms.ScrollableControl.OnPaintBackground(System.Windows.Forms.PaintEventArgs)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ScrollableControl.OnPaintBackground(System.Windows.Forms.PaintEventArgs)) | `e` | RC1 |

<!--

### Affected APIs

- `M:System.Windows.Forms.Control.ControlCollection.#ctor(System.Windows.Forms.Control)`
- `M:System.Windows.Forms.TabControl.GetToolTipText(System.Object)`
- `M:System.Windows.Forms.TableLayoutControlCollection.#ctor(System.Windows.Forms.TableLayoutPanel)`
- `M:System.Windows.Forms.ToolStripRenderer.OnRenderArrow(System.Windows.Forms.ToolStripArrowRenderEventArgs)`
- `M:System.Windows.Forms.ToolStripRenderer.OnRenderItemImage(System.Windows.Forms.ToolStripItemImageRenderEventArgs)`
- `M:System.Windows.Forms.ToolStripRenderer.OnRenderItemCheck(System.Windows.Forms.ToolStripItemImageRenderEventArgs)`
- `M:System.Windows.Forms.ToolStripRenderer.OnRenderItemText(System.Windows.Forms.ToolStripItemTextRenderEventArgs)`
- `M:System.Windows.Forms.ToolStripRenderer.OnRenderStatusStripSizingGrip(System.Windows.Forms.ToolStripRenderEventArgs)`
- `M:System.Windows.Forms.DataGridViewComboBoxEditingControl.ApplyCellStyleToEditingControl(System.Windows.Forms.DataGridViewCellStyle)`
- `M:System.Windows.Forms.RichTextBox.LoadFile(System.IO.Stream,System.Windows.Forms.RichTextBoxStreamType)`
- `M:System.Windows.Forms.ListViewGroup.System#Runtime#Serialization#ISerializable#GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`
- `M:System.Windows.Forms.VisualStyles.VisualStyleRenderer.#ctor(System.String,System.Int32,System.Int32)`
- `M:System.Windows.Forms.ListBox.IntegerCollection.#ctor(System.Windows.Forms.ListBox)`
- `M:System.Windows.Forms.ListBox.IntegerCollection.CopyTo(System.Array,System.Int32)`
- `M:System.Windows.Forms.ListBox.ObjectCollection.#ctor(System.Windows.Forms.ListBox)`
- `M:System.Windows.Forms.ListBox.ObjectCollection.#ctor(System.Windows.Forms.ListBox,System.Object[])`
- `M:System.Windows.Forms.ListBox.ObjectCollection.#ctor(System.Windows.Forms.ListBox,System.Windows.Forms.ListBox.ObjectCollection)`
- `M:System.Windows.Forms.ListBox.ObjectCollection.AddRange(System.Object[])`
- `M:System.Windows.Forms.ListBox.ObjectCollection.AddRange(System.Windows.Forms.ListBox.ObjectCollection)`
- `M:System.Windows.Forms.ListBox.ObjectCollection.CopyTo(System.Object[],System.Int32)`
- `M:System.Windows.Forms.ListBox.ObjectCollection.System#Collections#ICollection#CopyTo(System.Array,System.Int32)`
- `M:System.Windows.Forms.ListView.SelectedIndexCollection.#ctor(System.Windows.Forms.ListView)`
- `M:System.Windows.Forms.TreeNodeCollection.Find(System.String,System.Boolean)`
- `M:System.Windows.Forms.ListView.ListViewItemCollection.Find(System.String,System.Boolean)`
- `M:System.Windows.Forms.ScrollableControl.OnPaintBackground(System.Windows.Forms.PaintEventArgs)`

### Category

Windows Forms

-->
