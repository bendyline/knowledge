---
title: "Use Caching in UI Automation"
description: See how to use caching in UI Automation. Review steps for activating a cache request, caching AutomationElement properties, and getting cached patterns.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "caching, UI Automation"
  - "UI Automation, caching"
ms.topic: how-to
---
# Use Caching in UI Automation

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

This section shows how to implement caching of [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) properties and control patterns.

## Activate a Cache Request

1. Create a [System.Windows.Automation.CacheRequest](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest).

2. Specify properties and patterns to cache by using [System.Windows.Automation.CacheRequest.Add*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest.Add*).

3. Specify the scope of caching by setting the [System.Windows.Automation.CacheRequest.TreeScope](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest.TreeScope) property.

4. Specify the view of the subtree by setting the [System.Windows.Automation.CacheRequest.TreeFilter](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest.TreeFilter) property.

5. Set the [System.Windows.Automation.CacheRequest.AutomationElementMode](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest.AutomationElementMode) property to [System.Windows.Automation.AutomationElementMode.None](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementMode.None) if you wish to increase efficiency by not retrieving a full reference to objects. (This will make it impossible to retrieve current values from those objects.)

6. Activate the request by using [System.Windows.Automation.CacheRequest.Activate*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest.Activate*) within a `using` block (`Using` in Microsoft Visual Basic .NET).

 After obtaining [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) objects or subscribing to events, deactivate the request by using [System.Windows.Automation.CacheRequest.Pop*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest.Pop*) (if [System.Windows.Automation.CacheRequest.Push*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest.Push*) was used) or by disposing the object created by [System.Windows.Automation.CacheRequest.Activate*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest.Activate*). (Use [System.Windows.Automation.CacheRequest.Activate*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest.Activate*) in a `using` block (`Using` in Microsoft Visual Basic .NET).

## Cache AutomationElement Properties

1. While a [System.Windows.Automation.CacheRequest](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest) is active, obtain [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) objects by using [System.Windows.Automation.AutomationElement.FindFirst*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.FindFirst*) or [System.Windows.Automation.AutomationElement.FindAll*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.FindAll*); or obtain an [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) as the source of an event that you registered for when the [System.Windows.Automation.CacheRequest](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest) was active. (You can also create a cache by passing a [System.Windows.Automation.CacheRequest](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest) to GetUpdatedCache or one of the [System.Windows.Automation.TreeWalker](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TreeWalker) methods.)

2. Use [System.Windows.Automation.AutomationElement.GetCachedPropertyValue*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetCachedPropertyValue*) or retrieve a property from the [System.Windows.Automation.AutomationElement.Cached](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.Cached) property of the [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement).

### Obtain Cached Patterns and Their Properties

1. While a [System.Windows.Automation.CacheRequest](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest) is active, obtain [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) objects by using [System.Windows.Automation.AutomationElement.FindFirst*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.FindFirst*) or [System.Windows.Automation.AutomationElement.FindAll*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.FindAll*); or obtain an [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) as the source of an event that you registered for when the [System.Windows.Automation.CacheRequest](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest) was active. (You can also create a cache by passing a [System.Windows.Automation.CacheRequest](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest) to GetUpdatedCache or one of the [System.Windows.Automation.TreeWalker](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TreeWalker) methods.)

2. Use [System.Windows.Automation.AutomationElement.GetCachedPattern*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetCachedPattern*) or [System.Windows.Automation.AutomationElement.TryGetCachedPattern*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.TryGetCachedPattern*) to retrieve a cached pattern.

3. Retrieve property values from the `Cached` property of the control pattern.

## Example 1

 The following code example shows various aspects of caching, using [System.Windows.Automation.CacheRequest.Activate*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest.Activate*) to activate the [System.Windows.Automation.CacheRequest](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest).

 [UIAClient_snip#107 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/UIAClient_snip/CSharp/ClientForm.cs#107)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/UIAClient_snip/CSharp/ClientForm.cs.md)
 [UIAClient_snip#107 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/UIAClient_snip/VisualBasic/ClientForm.vb#107)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/UIAClient_snip/VisualBasic/ClientForm.vb.md)

## Example 2

 The following code example shows various aspects of caching, using [System.Windows.Automation.CacheRequest.Push*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest.Push*) to activate the [System.Windows.Automation.CacheRequest](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest). Except when you wish to nest cache requests, it is preferable to use [System.Windows.Automation.CacheRequest.Activate*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest.Activate*).

 [UIAClient_snip#108 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/UIAClient_snip/CSharp/ClientForm.cs#108)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/UIAClient_snip/CSharp/ClientForm.cs.md)
 [UIAClient_snip#108 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/UIAClient_snip/VisualBasic/ClientForm.vb#108)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/UIAClient_snip/VisualBasic/ClientForm.vb.md)

## See also

- [Caching in UI Automation Clients](caching-in-ui-automation-clients.md)
