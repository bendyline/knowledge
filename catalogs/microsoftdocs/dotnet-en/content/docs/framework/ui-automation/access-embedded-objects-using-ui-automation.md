---
title: "Access Embedded Objects Using UI Automation"
description: See how to access embedded objects using UI Automation within text control content. Embedded objects are considered children of the UI Automation text provider.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "embedded objects, accessing"
  - "accessing embedded objects"
  - "UI Automation, accessing embedded objects"
ms.topic: how-to
---
# Access Embedded Objects Using UI Automation

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 This topic shows how Microsoft UI Automation can be used to expose objects embedded within the content of a text control.

> **Note:**
> Embedded objects can include images, hyperlinks, buttons, tables, or ActiveX controls.

 Embedded objects are considered children of the UI Automation text provider. This allows them to be exposed through the same UI Automation tree structure as all other user interface (UI) elements. Functionality, in turn, is exposed through the control patterns typically required by the embedded objects control type (for example, since hyperlinks are text-based they will support [System.Windows.Automation.TextPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern)).

 Embedded objects in a text container.
A sample document with textual content, ("Did You Know?"…) and two embedded objects (a picture of a whale and a text hyperlink), used as a target for the code examples.

## Example 1

 The following code example demonstrates how to retrieve a collection of embedded objects from within a UI Automation text provider. For the sample document provided in the introduction, two objects would be returned (an image element and a text element).

> **Note:**
> The image element should have some intrinsic text associated with it that describes the image, typically in its [System.Windows.Automation.AutomationElement.NameProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.NameProperty) (for example, "A blue whale."). However, when a text range spanning the image object is obtained, neither the image nor this descriptive text is returned in the text stream.

[FindText#StartApp (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/FindText/CSharp/SearchWindow.cs#startapp)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/FindText/CSharp/SearchWindow.cs.md)
[FindText#StartApp (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/FindText/VisualBasic/SearchWindow.vb#startapp)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/FindText/VisualBasic/SearchWindow.vb.md)
[FindText#FindTextProvider (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/FindText/CSharp/SearchWindow.cs#findtextprovider)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/FindText/CSharp/SearchWindow.cs.md)
[FindText#FindTextProvider (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/FindText/VisualBasic/SearchWindow.vb#findtextprovider)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/FindText/VisualBasic/SearchWindow.vb.md)
[FindText#GetChildren (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/FindText/CSharp/SearchWindow.cs#getchildren)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/FindText/CSharp/SearchWindow.cs.md)
[FindText#GetChildren (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/FindText/VisualBasic/SearchWindow.vb#getchildren)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/FindText/VisualBasic/SearchWindow.vb.md)

## Example 2

 The following code example demonstrates how to obtain a text range from an embedded object within a UI Automation text provider. The text range retrieved is an empty range where the starting endpoint follows "… ocean.(space)" and the ending endpoint precedes the closing "." representing the embedded hyperlink (as shown by the image provided in the introduction). Even though this is an empty range, it is not considered a degenerate range because it has a non-zero span.

> **Note:**
> [System.Windows.Automation.TextPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern) can retrieve a text-based embedded object such as a hyperlink; however, a secondary [System.Windows.Automation.TextPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern) will have to be obtained from the embedded object to expose its full functionality.

 [UIATextPattern_snip#GetRangeFromChild (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/UIATextPattern_snip/CSharp/SearchWindow.cs#getrangefromchild)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/UIATextPattern_snip/CSharp/SearchWindow.cs.md)
 [UIATextPattern_snip#GetRangeFromChild (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/UIATextPattern_snip/VisualBasic/SearchWindow.vb#getrangefromchild)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/UIATextPattern_snip/VisualBasic/SearchWindow.vb.md)

## See also

- [UI Automation TextPattern Overview](ui-automation-textpattern-overview.md)
- [UI Automation Control Patterns Overview](ui-automation-control-patterns-overview.md)
- [UI Automation Control Patterns for Clients](ui-automation-control-patterns-for-clients.md)
- [Add Content to a Text Box Using UI Automation](add-content-to-a-text-box-using-ui-automation.md)
- [Find and Highlight Text Using UI Automation](find-and-highlight-text-using-ui-automation.md)
