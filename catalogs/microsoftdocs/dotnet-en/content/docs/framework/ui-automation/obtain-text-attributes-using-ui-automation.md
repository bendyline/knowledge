---
title: "Obtain Text Attributes Using UI Automation"
description: Learn how to obtain text attributes using UI Automation. See a code example that gets text attributes from a text range.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "getting, text attributes"
  - "UI Automation, getting text attributes"
  - "text attributes, getting"
ms.topic: how-to
---
# Obtain Text Attributes Using UI Automation

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 This topic shows how to use Microsoft UI Automation to obtain text attributes from a text range. A text range can correspond to the current location of the caret (or degenerate selection) within a document, a contiguous selection of text, a collection of disjoint text selections, or the entire textual content of a document.

## Example

 The following code example demonstrates how to obtain the [System.Windows.Automation.TextPattern.FontNameAttribute](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern.FontNameAttribute) from a text range.

 [UIATextPattern_snip#StartTarget (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/UIATextPattern_snip/CSharp/SearchWindow.cs#starttarget)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/UIATextPattern_snip/CSharp/SearchWindow.cs.md)
 [UIATextPattern_snip#StartTarget (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/UIATextPattern_snip/VisualBasic/SearchWindow.vb#starttarget)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/UIATextPattern_snip/VisualBasic/SearchWindow.vb.md)
[UIATextPattern_snip#GetTextElement (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/UIATextPattern_snip/CSharp/SearchWindow.cs#gettextelement)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/UIATextPattern_snip/CSharp/SearchWindow.cs.md)
[UIATextPattern_snip#GetTextElement (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/UIATextPattern_snip/VisualBasic/SearchWindow.vb#gettextelement)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/UIATextPattern_snip/VisualBasic/SearchWindow.vb.md)
[UIATextPattern_snip#FontName (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/UIATextPattern_snip/CSharp/SearchWindow.cs#fontname)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/UIATextPattern_snip/CSharp/SearchWindow.cs.md)
[UIATextPattern_snip#FontName (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/UIATextPattern_snip/VisualBasic/SearchWindow.vb#fontname)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/UIATextPattern_snip/VisualBasic/SearchWindow.vb.md)

 The [System.Windows.Automation.TextPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern) control pattern, in tandem with the [System.Windows.Automation.Text.TextPatternRange](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange) class, supports basic text attributes, properties, and methods. For control-specific functionality that is not supported by [System.Windows.Automation.TextPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern) or [System.Windows.Automation.Text.TextPatternRange](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange) the [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement), class provides methods for a UI Automation client to access the corresponding native object model.

## See also

- [UI Automation TextPattern Overview](ui-automation-textpattern-overview.md)
- [Add Content to a Text Box Using UI Automation](add-content-to-a-text-box-using-ui-automation.md)
- [Find and Highlight Text Using UI Automation](find-and-highlight-text-using-ui-automation.md)
- [UI Automation Control Patterns Overview](ui-automation-control-patterns-overview.md)
- [UI Automation Control Patterns for Clients](ui-automation-control-patterns-for-clients.md)
- [Obtain Mixed Text Attribute Details Using UI Automation](obtain-mixed-text-attribute-details-using-ui-automation.md)
