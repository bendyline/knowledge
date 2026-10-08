---
title: "Find and Highlight Text Using UI Automation"
description: Find and highlight text using UI Automation. An example sequentially searches for and highlights each occurrence of a string within the text control content.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "text, highlighting"
  - "finding text"
  - "text, finding"
  - "UI automation, highlighting text"
  - "UI automation, finding text"
  - "highlighting text"
ms.topic: how-to
---
# Find and Highlight Text Using UI Automation

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 This topic demonstrates how to sequentially search for and highlight each occurrence of a string within the content of a text control using Microsoft UI Automation.

## Example

 The following example obtains a [System.Windows.Automation.TextPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern) object from a text control. A [System.Windows.Automation.Text.TextPatternRange](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange) object, representing the textual content of the entire document, is then created using the [System.Windows.Automation.TextPattern.DocumentRange](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern.DocumentRange) property of this [System.Windows.Automation.TextPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern). Two additional [System.Windows.Automation.Text.TextPatternRange](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange) objects are then created for the sequential search and highlight functionality.

[FindText#StartApp (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/FindText/CSharp/SearchWindow.cs#startapp)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/FindText/CSharp/SearchWindow.cs.md)
[FindText#StartApp (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/FindText/VisualBasic/SearchWindow.vb#startapp)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/FindText/VisualBasic/SearchWindow.vb.md)
[FindText#FindTextProvider (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/FindText/CSharp/SearchWindow.cs#findtextprovider)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/FindText/CSharp/SearchWindow.cs.md)
[FindText#FindTextProvider (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/FindText/VisualBasic/SearchWindow.vb#findtextprovider)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/FindText/VisualBasic/SearchWindow.vb.md)
[FindText#SearchTarget (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/FindText/CSharp/SearchWindow.cs#searchtarget)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/FindText/CSharp/SearchWindow.cs.md)
[FindText#SearchTarget (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/FindText/VisualBasic/SearchWindow.vb#searchtarget)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/FindText/VisualBasic/SearchWindow.vb.md)

## See also

- [Find and Highlight Text Using UI Automation](find-and-highlight-text-using-ui-automation.md)
