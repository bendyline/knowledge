---
title: "Caching in UI Automation Clients"
description: Get details about caching in UI Automation clients in .NET. Caching is defined as the pre-fetching of data.
ms.date: "03/30/2017"
helpviewer_keywords:
  - "UI Automation caching in clients"
  - "caching, UI Automation clients"
ms.assetid: 94c15031-4975-43cc-bcd5-c9439ed21c9c
---
# Caching in UI Automation Clients

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 This topic introduces caching of UI Automation properties and control patterns.

 In UI Automation, caching means pre-fetching of data. The data can then be accessed without further cross-process communication. Caching is typically used by UI Automation client applications to retrieve properties and control patterns in bulk. Information is then retrieved from the cache as needed. The application updates the cache periodically, usually in response to events signifying that something in the user interface (UI) has changed.

 The benefits of caching are most noticeable with Windows Presentation Foundation (WPF) controls and custom controls that have server-side UI Automation providers. There is less benefit when accessing client-side providers such as the default providers for Win32 controls.

 Caching occurs when the application activates a [System.Windows.Automation.CacheRequest](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest) and then uses any method or property that returns an [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement); for example, [System.Windows.Automation.AutomationElement.FindFirst*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.FindFirst*), [System.Windows.Automation.AutomationElement.FindAll*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.FindAll*). The methods of the [System.Windows.Automation.TreeWalker](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TreeWalker) class are an exception; caching is only done if a [System.Windows.Automation.CacheRequest](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest) is specified as a parameter (for example, [System.Windows.Automation.TreeWalker.GetFirstChild%28System.Windows.Automation.AutomationElement%2CSystem.Windows.Automation.CacheRequest%29](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TreeWalker.GetFirstChild%2528System.Windows.Automation.AutomationElement%252CSystem.Windows.Automation.CacheRequest%2529).

 Caching also occurs when you subscribe to an event while a [System.Windows.Automation.CacheRequest](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest) is active. The [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) passed to your event handler as the source of an event contains the cached properties and patterns specified by the original [System.Windows.Automation.CacheRequest](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest). Any changes made to the [System.Windows.Automation.CacheRequest](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest) after you subscribe to the event have no effect.

 The UI Automation properties and control patterns of an element can be cached.

## Options for Caching

 The [System.Windows.Automation.CacheRequest](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest) specifies the following options for caching.

### Properties to Cache

 You can specify properties to cache by calling [System.Windows.Automation.CacheRequest.Add%28System.Windows.Automation.AutomationProperty%29](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest.Add%2528System.Windows.Automation.AutomationProperty%2529) for each property before activating the request.

### Control Patterns to Cache

 You can specify control patterns to cache by calling [System.Windows.Automation.CacheRequest.Add%28System.Windows.Automation.AutomationPattern%29](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest.Add%2528System.Windows.Automation.AutomationPattern%2529) for each pattern before activating the request. When a pattern is cached, its properties are not automatically cached; you must specify the properties you want cached by using [System.Windows.Automation.CacheRequest.Add*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest.Add*).

### Scope and Filtering of Caching

 You can specify the elements whose properties and patterns you want to cache by setting the [System.Windows.Automation.CacheRequest.TreeScope](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest.TreeScope) property before activating the request. The scope is relative to the elements that are retrieved while the request is active. For example, if you set only [System.Windows.Automation.TreeScope.Children](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TreeScope.Children), and then retrieve an [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement), the properties and patterns of children of that element are cached, but not those of the element itself. To ensure that caching is done for the retrieved element itself, you must include [System.Windows.Automation.TreeScope.Element](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TreeScope.Element) in the [System.Windows.Automation.CacheRequest.TreeScope](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest.TreeScope) property. It is not possible to set the scope to [System.Windows.Automation.TreeScope.Parent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TreeScope.Parent) or [System.Windows.Automation.TreeScope.Ancestors](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TreeScope.Ancestors). However, a parent element can be cached when a child element is cached. For more information, see [Retrieving Cached Children and Parents](#retrieving-cached-children-and-parents).

 The extent of caching is also affected by the [System.Windows.Automation.CacheRequest.TreeFilter](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest.TreeFilter) property. By default, caching is performed only for elements that appear in the control view of the UI Automation tree. However, you can change this property to apply caching to all elements, or only to elements that appear in the content view.

### Strength of the Element References

 When you retrieve an [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement), by default you have access to all properties and patterns of that element, including those that were not cached. However, for greater efficiency you can specify that the reference to the element refers to cached data only, by setting the [System.Windows.Automation.CacheRequest.AutomationElementMode](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest.AutomationElementMode) property of the [System.Windows.Automation.CacheRequest](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest) to [System.Windows.Automation.AutomationElementMode.None](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementMode.None). In this case, you do not have access to any non-cached properties and patterns of retrieved elements. This means that you cannot access any properties through [System.Windows.Automation.AutomationElement.GetCurrentPropertyValue*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetCurrentPropertyValue*) or the `Current` property of [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) or any control pattern; nor can you retrieve a pattern by using [System.Windows.Automation.AutomationElement.GetCurrentPattern*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetCurrentPattern*) or [System.Windows.Automation.AutomationElement.TryGetCurrentPattern*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.TryGetCurrentPattern*). On cached patterns, you can call methods that retrieve array properties, such as [System.Windows.Automation.SelectionPattern.SelectionPatternInformation.GetSelection*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.SelectionPattern.SelectionPatternInformation.GetSelection*), but not any that perform actions on the control, such as [System.Windows.Automation.InvokePattern.Invoke*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.InvokePattern.Invoke*).

 An example of an application that might not need full references to objects is a screen reader, which would prefetch the [System.Windows.Automation.AutomationElement.AutomationElementInformation.Name*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationElementInformation.Name*) and [System.Windows.Automation.AutomationElement.AutomationElementInformation.ControlType](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationElementInformation.ControlType) properties of elements in a window but would not need the [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) objects themselves.

## Activating the CacheRequest

 Caching is performed only when [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) objects are retrieved while a [System.Windows.Automation.CacheRequest](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest) is active for the current thread. There are two ways to activate a [System.Windows.Automation.CacheRequest](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest).

 The usual way is to call [System.Windows.Automation.CacheRequest.Activate*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest.Activate*). This method returns an object that implements [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable). The request remains active as long as the [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable) object exists. The easiest way to control the lifetime of the object is to enclose the call within a `using` (C#) or `Using` (Visual Basic) block. This ensures that the request will be popped from the stack even if an exception is raised.

 Another way, which is useful when you wish to nest cache requests, is to call [System.Windows.Automation.CacheRequest.Push*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest.Push*). This puts the request on a stack and activates it. The request remains active until it is removed from the stack by [System.Windows.Automation.CacheRequest.Pop*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest.Pop*). The request becomes temporarily inactive if another request is pushed onto the stack; only the top request on the stack is active.

## Retrieving Cached Properties

 You can retrieve the cached properties of an element through the following methods and properties.

- [System.Windows.Automation.AutomationElement.GetCachedPropertyValue*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetCachedPropertyValue*)

- [System.Windows.Automation.AutomationElement.Cached*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.Cached*)

 An exception is raised if the requested property is not in the cache.

 [System.Windows.Automation.AutomationElement.Cached*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.Cached*), like [System.Windows.Automation.AutomationElement.Current*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.Current*), exposes individual properties as members of a structure. However, you do not need to retrieve this structure; you can access the individual properties directly. For example, the [System.Windows.Automation.AutomationElement.AutomationElementInformation.Name](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationElementInformation.Name) property can be obtained from `element.Cached.Name`, where `element` is an [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement).

## Retrieving Cached Control Patterns

 You can retrieve the cached control patterns of an element through the following methods.

- [System.Windows.Automation.AutomationElement.GetCachedPattern*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetCachedPattern*)

- [System.Windows.Automation.AutomationElement.TryGetCachedPattern*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.TryGetCachedPattern*)

 If the pattern is not in the cache, [System.Windows.Automation.AutomationElement.GetCachedPattern*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetCachedPattern*) raises an exception, and [System.Windows.Automation.AutomationElement.TryGetCachedPattern*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.TryGetCachedPattern*) returns `false`.

 You can retrieve the cached properties of a control pattern by using the `Cached` property of the pattern object. You can also retrieve the current values through the `Current` property, but only if [System.Windows.Automation.AutomationElementMode.None](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementMode.None) was not specified when the [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) was retrieved. ([System.Windows.Automation.AutomationElementMode.Full](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementMode.Full) is the default value, and this permits access to the current values.)

## Retrieving Cached Children and Parents

 When you retrieve an [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) and request caching for children of that element through the [System.Windows.Automation.CacheRequest.TreeScope](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest.TreeScope) property of the request, it is subsequently possible to get the child elements from the [System.Windows.Automation.AutomationElement.CachedChildren](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.CachedChildren) property of the element you retrieved.

 If [System.Windows.Automation.TreeScope.Element](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TreeScope.Element) was included in the scope of the cache request, the root element of the request is subsequently available from the [System.Windows.Automation.AutomationElement.CachedParent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.CachedParent) property of any of the child elements.

> **Note:**
> You cannot cache parents or ancestors of the root element of the request.

## Updating the Cache

 The cache is valid only as long as nothing changes in the UI. Your application is responsible for updating the cache, typically in response to events.

 If you subscribe to an event while a [System.Windows.Automation.CacheRequest](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest) is active, you obtain an [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) with an updated cache as the source of the event whenever your event-handler delegate is called. You can also update cached information for an element by calling [System.Windows.Automation.AutomationElement.GetUpdatedCache*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetUpdatedCache*). You can pass in the original [System.Windows.Automation.CacheRequest](https://learn.microsoft.com/search/?terms=System.Windows.Automation.CacheRequest) to update all information that was previously cached.

 Updating the cache does not alter the properties of any existing [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) references.

## See also

- [UI Automation Events for Clients](ui-automation-events-for-clients.md)
- [Use Caching in UI Automation](use-caching-in-ui-automation.md)
- [FetchTimer Sample](https://learn.microsoft.com/previous-versions/dotnet/netframework-3.5/ms771456\(v=vs.90\))
