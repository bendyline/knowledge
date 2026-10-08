---
title: "Move a UI Automation Element"
description: See example code that shows how to move a UI Automation element to a specified screen location. It uses the WindowPattern and TransformPattern control patterns.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "moving elements"
  - "elements, moving"
  - "UI Automation, moving elements"
ms.topic: how-to
---
# Move a UI Automation Element

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 This example demonstrates how to move a UI Automation element to a specified screen location.

## Example

 The following example uses the [System.Windows.Automation.WindowPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.WindowPattern) and [System.Windows.Automation.TransformPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TransformPattern) control patterns to programmatically move a Win32 target application to discrete screen locations and track the [System.Windows.Automation.AutomationElement.BoundingRectangleProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.BoundingRectangleProperty) [System.Windows.Automation.AutomationElement.AutomationPropertyChangedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationPropertyChangedEvent).

 [WindowMove#1301 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/WindowMove/CSharp/WindowMove.cs#1301)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/WindowMove/CSharp/WindowMove.cs.md)
 [WindowMove#1301 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/WindowMove/VisualBasic/windowmove.vb#1301)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/WindowMove/VisualBasic/windowmove.vb.md)
[WindowMove#1300 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/WindowMove/CSharp/WindowMove.cs#1300)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/WindowMove/CSharp/WindowMove.cs.md)
[WindowMove#1300 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/WindowMove/VisualBasic/windowmove.vb#1300)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/WindowMove/VisualBasic/windowmove.vb.md)

## See also

- [WindowPattern Sample](https://github.com/Microsoft/WPF-Samples/tree/main/Accessibility/WindowMove)
