---
title: "Implementing the UI Automation TableItem Control Pattern"
description: Review guidelines and conventions to implement the TableItem control pattern in UI Automation. Know required members for the ITableItemProvider interface.
ms.date: "03/30/2017"
helpviewer_keywords:
  - "control patterns, Table Item"
  - "UI Automation, Table Item control pattern"
  - "TableItem control pattern"
ms.assetid: ac178408-1485-436f-8d3e-eee3bf80cb24
---
# Implementing the UI Automation TableItem Control Pattern

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 This topic introduces guidelines and conventions for implementing [System.Windows.Automation.Provider.ITableItemProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITableItemProvider), including information about events and properties. Links to additional references are listed at the end of the overview.

 The [System.Windows.Automation.TableItemPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TableItemPattern) control pattern is used to support child controls of containers that implement [System.Windows.Automation.Provider.ITableProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITableProvider). Access to individual cell functionality is provided by the required concurrent implementation of [System.Windows.Automation.Provider.IGridItemProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IGridItemProvider). This control pattern is analogous to [System.Windows.Automation.Provider.IGridItemProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IGridItemProvider) with the distinction that any control implementing [System.Windows.Automation.Provider.ITableItemProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITableItemProvider) must programmatically expose the relationship between the individual cell and its row and column information. For examples of controls that implement this control pattern, see [Control Pattern Mapping for UI Automation Clients](control-pattern-mapping-for-ui-automation-clients.md).

<a name="Implementation_Guidelines_and_Conventions"></a>

## Implementation Guidelines and Conventions

- For related grid item functionality, see [Implementing the UI Automation GridItem Control Pattern](implementing-the-ui-automation-griditem-control-pattern.md).

<a name="Required_Members_for_ITableItemProvider"></a>

## Required Members for ITableItemProvider

| Required member | Member type | Notes |
| --- | --- | --- |
| [System.Windows.Automation.Provider.ITableItemProvider.GetColumnHeaderItems*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITableItemProvider.GetColumnHeaderItems*) | Method | None |
| [System.Windows.Automation.Provider.ITableItemProvider.GetRowHeaderItems*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITableItemProvider.GetRowHeaderItems*) | Method | None |

 This control pattern has no associated properties or events.

<a name="Exceptions"></a>

## Exceptions

 This control pattern has no associated exceptions.

## See also

- [UI Automation Control Patterns Overview](ui-automation-control-patterns-overview.md)
- [Support Control Patterns in a UI Automation Provider](support-control-patterns-in-a-ui-automation-provider.md)
- [UI Automation Control Patterns for Clients](ui-automation-control-patterns-for-clients.md)
- [Implementing the UI Automation Table Control Pattern](implementing-the-ui-automation-table-control-pattern.md)
- [Implementing the UI Automation GridItem Control Pattern](implementing-the-ui-automation-griditem-control-pattern.md)
- [UI Automation Tree Overview](ui-automation-tree-overview.md)
- [Use Caching in UI Automation](use-caching-in-ui-automation.md)
