---
title: "Expose the Content of a Table Using UI Automation"
description: See how to expose the content of a table using UI Automation. The content and intrinsic properties of each cell within a tabular control are exposed.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "tables, exposing content of"
  - "UI Automation, exposing content of tables"
  - "exposing content of tables using UI Automation"
ms.topic: how-to
---
# Expose the Content of a Table Using UI Automation

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 This topic shows how Microsoft UI Automation can be used to expose the content and intrinsic properties of each cell within a tabular control.

## Example

 The following code example demonstrates how to obtain a [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) that represents the content of a table cell; cell properties such as row and column indices, row and column spans, and row and column header information are also obtained. This example uses a focus change event handler to simulate keyboard traversal of a tabular control that implements UI Automation. Information for each table item is exposed on a focus change event.

> **Note:**
> Since focus changes are global desktop events, focus change events outside the table should be filtered. See the [TrackFocus Sample](https://learn.microsoft.com/previous-versions/dotnet/netframework-3.5/ms771428\(v=vs.90\)) for a related implementation.

 [UIATableItemPattern_snip#StartTarget (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/UIATableItemPattern_snip/CSharp/UIATableItemPattern_snippets.cs#starttarget)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/UIATableItemPattern_snip/CSharp/UIATableItemPattern_snippets.cs.md)
 [UIATableItemPattern_snip#StartTarget (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/UIATableItemPattern_snip/VisualBasic/UIATableItemPattern_snippets.vb#starttarget)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/UIATableItemPattern_snip/VisualBasic/UIATableItemPattern_snippets.vb.md)
[UIATableItemPattern_snip#GetTableElement (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/UIATableItemPattern_snip/CSharp/UIATableItemPattern_snippets.cs#gettableelement)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/UIATableItemPattern_snip/CSharp/UIATableItemPattern_snippets.cs.md)
[UIATableItemPattern_snip#GetTableElement (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/UIATableItemPattern_snip/VisualBasic/UIATableItemPattern_snippets.vb#gettableelement)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/UIATableItemPattern_snip/VisualBasic/UIATableItemPattern_snippets.vb.md)
[UIATableItemPattern_snip#101 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/UIATableItemPattern_snip/CSharp/UIATableItemPattern_snippets.cs#101)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/UIATableItemPattern_snip/CSharp/UIATableItemPattern_snippets.cs.md)
[UIATableItemPattern_snip#101 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/UIATableItemPattern_snip/VisualBasic/UIATableItemPattern_snippets.vb#101)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/UIATableItemPattern_snip/VisualBasic/UIATableItemPattern_snippets.vb.md)
[UIATableItemPattern_snip#1015 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/UIATableItemPattern_snip/CSharp/UIATableItemPattern_snippets.cs#1015)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/UIATableItemPattern_snip/CSharp/UIATableItemPattern_snippets.cs.md)
[UIATableItemPattern_snip#1015 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/UIATableItemPattern_snip/VisualBasic/UIATableItemPattern_snippets.vb#1015)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/UIATableItemPattern_snip/VisualBasic/UIATableItemPattern_snippets.vb.md)
[UIATableItemPattern_snip#102 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/UIATableItemPattern_snip/CSharp/UIATableItemPattern_snippets.cs#102)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/UIATableItemPattern_snip/CSharp/UIATableItemPattern_snippets.cs.md)
[UIATableItemPattern_snip#102 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/UIATableItemPattern_snip/VisualBasic/UIATableItemPattern_snippets.vb#102)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/UIATableItemPattern_snip/VisualBasic/UIATableItemPattern_snippets.vb.md)
[UIATableItemPattern_snip#103 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/UIATableItemPattern_snip/CSharp/UIATableItemPattern_snippets.cs#103)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/UIATableItemPattern_snip/CSharp/UIATableItemPattern_snippets.cs.md)
[UIATableItemPattern_snip#103 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/UIATableItemPattern_snip/VisualBasic/UIATableItemPattern_snippets.vb#103)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/UIATableItemPattern_snip/VisualBasic/UIATableItemPattern_snippets.vb.md)

## See also

- [UI Automation Control Patterns Overview](ui-automation-control-patterns-overview.md)
- [UI Automation Control Patterns for Clients](ui-automation-control-patterns-for-clients.md)
- [Implementing the UI Automation Table Control Pattern](implementing-the-ui-automation-table-control-pattern.md)
- [Implementing the UI Automation TableItem Control Pattern](implementing-the-ui-automation-tableitem-control-pattern.md)
- [Implementing the UI Automation Grid Control Pattern](implementing-the-ui-automation-grid-control-pattern.md)
- [Implementing the UI Automation GridItem Control Pattern](implementing-the-ui-automation-griditem-control-pattern.md)
