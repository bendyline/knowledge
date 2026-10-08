---
title: "Traverse Text Using UI Automation"
description: See an example of how to traverse the text content of a document using Microsoft UI Automation, in TextUnit increments.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "UI Automation, traversing text"
  - "text, traversing"
  - "traversing text"
ms.topic: how-to
---
# Traverse Text Using UI Automation

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 This topic shows how to use Microsoft UI Automation to traverse the textual content of a document by [System.Windows.Automation.Text.TextUnit](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextUnit) increments.

## Example

 The following code example demonstrates how to traverse the content of a UI Automation text provider. The [System.Windows.Automation.Text.TextPatternRange.Move*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange.Move*) method moves the [System.Windows.Automation.Text.TextPatternRangeEndpoint.Start](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRangeEndpoint.Start) and [System.Windows.Automation.Text.TextPatternRangeEndpoint.End](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRangeEndpoint.End) endpoints of a [System.Windows.Automation.Text.TextPatternRange](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange). This text range is typically a degenerate range representing the text insertion point.

> **Note:**
> Since only text-based embedded objects are considered part of the text stream, embedded objects such as images do not affect `Move` or its return value.

[FindText#StartApp (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/FindText/CSharp/SearchWindow.cs#startapp)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/FindText/CSharp/SearchWindow.cs.md)
[FindText#StartApp (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/FindText/VisualBasic/SearchWindow.vb#startapp)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/FindText/VisualBasic/SearchWindow.vb.md)
[FindText#FindTextProvider (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/FindText/CSharp/SearchWindow.cs#findtextprovider)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/FindText/CSharp/SearchWindow.cs.md)
[FindText#FindTextProvider (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/FindText/VisualBasic/SearchWindow.vb#findtextprovider)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/FindText/VisualBasic/SearchWindow.vb.md)
[FindText#Navigate (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/FindText/CSharp/SearchWindow.cs#navigate)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/FindText/CSharp/SearchWindow.cs.md)
[FindText#Navigate (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/FindText/VisualBasic/SearchWindow.vb#navigate)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/FindText/VisualBasic/SearchWindow.vb.md)

 Any method using [System.Windows.Automation.Text.TextUnit](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextUnit) will defer to the next largest [System.Windows.Automation.Text.TextUnit](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextUnit) supported if the given [System.Windows.Automation.Text.TextUnit](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextUnit) is not supported by the control.

## See also

- [UI Automation TextPattern Overview](ui-automation-textpattern-overview.md)
- [Add Content to a Text Box Using UI Automation](add-content-to-a-text-box-using-ui-automation.md)
- [Find and Highlight Text Using UI Automation](find-and-highlight-text-using-ui-automation.md)
- [UI Automation Control Patterns Overview](ui-automation-control-patterns-overview.md)
- [UI Automation Control Patterns for Clients](ui-automation-control-patterns-for-clients.md)
