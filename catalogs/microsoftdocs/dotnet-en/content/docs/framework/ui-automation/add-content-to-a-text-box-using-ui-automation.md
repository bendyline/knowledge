---
title: "Add Content to a Text Box Using UI Automation"
description: See an example of how to add content into a single-line text box by using Microsoft UI Automation in .NET.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "adding content to text boxes"
  - "text boxes, adding content"
  - "UI Automation, adding content to text boxes"
ms.topic: how-to
---
# Add Content to a Text Box Using UI Automation

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 This topic contains example code that demonstrates how to use Microsoft UI Automation to insert text into a single-line text box. An alternate method is provided for multi-line and rich text controls where UI Automation is not applicable. For comparison purposes, the example also demonstrates how to use Win32 methods to accomplish the same results.

## Example

 The following example steps through a sequence of text controls in a target application. Each text control is tested to see if a [System.Windows.Automation.ValuePattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ValuePattern) object can be obtained from it using the [System.Windows.Automation.AutomationElement.TryGetCurrentPattern*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.TryGetCurrentPattern*) method. If the text control does support [System.Windows.Automation.ValuePattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ValuePattern), the [System.Windows.Automation.ValuePattern.SetValue*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ValuePattern.SetValue*) method is used to insert a user-defined string into the text control. Otherwise, the [System.Windows.Forms.SendKeys.SendWait*](https://learn.microsoft.com/search/?terms=System.Windows.Forms.SendKeys.SendWait*) method is used.

 [InsertText#InsertText (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/InsertText/CSharp/Window1.xaml.cs#inserttext)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/InsertText/CSharp/Window1.xaml.cs.md)
 [InsertText#InsertText (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/InsertText/VisualBasic/Window1.xaml.vb#inserttext)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/InsertText/VisualBasic/Window1.xaml.vb.md)

## See also

- [TextPattern Insert Text Sample](https://learn.microsoft.com/previous-versions/dotnet/netframework-3.5/ms771478\(v=vs.90\))
