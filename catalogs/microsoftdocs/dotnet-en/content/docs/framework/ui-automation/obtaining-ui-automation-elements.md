---
title: "Obtaining UI Automation Elements"
description: Review various ways to obtain UI Automation element (AutomationElement) objects for user interface (UI) elements.
ms.date: "03/30/2017"
helpviewer_keywords:
  - "UI Automation, obtaining elements"
  - "elements, UI Automation, obtaining"
ms.topic: how-to
---
# Obtaining UI Automation Elements

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 This topic describes the various ways of obtaining [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) objects for user interface (UI) elements.

> **Caution:**
> If your client application might attempt to find elements in its own user interface, you must make all UI Automation calls on a separate thread. For more information, see [UI Automation Threading Issues](ui-automation-threading-issues.md).

<a name="The_Root_Element"></a>

## Root Element

 All searches for [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) objects must have a starting-place. This can be any element, including the desktop, an application window, or a control.

 The root element for the desktop, from which all elements are descended, is obtained from the static [System.Windows.Automation.AutomationElement.RootElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.RootElement) property.

> **Caution:**
> In general, you should try to obtain only direct children of the [System.Windows.Automation.AutomationElement.RootElement*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.RootElement*). A search for descendants may iterate through hundreds or even thousands of elements, possibly resulting in a stack overflow. If you are attempting to obtain a specific element at a lower level, you should start your search from the application window or from a container at a lower level.

<a name="Using_Conditions"></a>

## Conditions

 For most techniques you can use to retrieve UI Automation elements, you must specify a [System.Windows.Automation.Condition](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Condition), which is a set of criteria defining what elements you want to retrieve.

 The simplest condition is [System.Windows.Automation.Condition.TrueCondition](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Condition.TrueCondition), a predefined object specifying that all elements within the search scope are to be returned. [System.Windows.Automation.Condition.FalseCondition](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Condition.FalseCondition), the converse of [System.Windows.Automation.Condition.TrueCondition](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Condition.TrueCondition), is less useful, as it would prevent any elements from being found.

 Three other predefined conditions can be used alone or in combination with other conditions: [System.Windows.Automation.Automation.ContentViewCondition](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Automation.ContentViewCondition), [System.Windows.Automation.Automation.ControlViewCondition](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Automation.ControlViewCondition), and [System.Windows.Automation.Automation.RawViewCondition](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Automation.RawViewCondition). [System.Windows.Automation.Automation.RawViewCondition](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Automation.RawViewCondition), used by itself, is equivalent to [System.Windows.Automation.Condition.TrueCondition](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Condition.TrueCondition), because it does not filter elements by their [System.Windows.Automation.AutomationElement.AutomationElementInformation.IsControlElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationElementInformation.IsControlElement) or [System.Windows.Automation.AutomationElement.AutomationElementInformation.IsContentElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationElementInformation.IsContentElement) properties.

 Other conditions are built up from one or more [System.Windows.Automation.PropertyCondition](https://learn.microsoft.com/search/?terms=System.Windows.Automation.PropertyCondition) objects, each of which specifies a property value. For example, a [System.Windows.Automation.PropertyCondition](https://learn.microsoft.com/search/?terms=System.Windows.Automation.PropertyCondition) might specify that the element is enabled, or that it supports a certain control pattern.

 Conditions can be combined using Boolean logic by constructing objects of types [System.Windows.Automation.AndCondition](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AndCondition), [System.Windows.Automation.OrCondition](https://learn.microsoft.com/search/?terms=System.Windows.Automation.OrCondition), and [System.Windows.Automation.NotCondition](https://learn.microsoft.com/search/?terms=System.Windows.Automation.NotCondition).

<a name="Search_Scope"></a>

## Search Scope

 Searches done by using [System.Windows.Automation.AutomationElement.FindFirst*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.FindFirst*) or [System.Windows.Automation.AutomationElement.FindAll*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.FindAll*) must have a scope as well as a starting-place.

 The scope defines the space around the starting-place that is to be searched. This might include the element itself, its siblings, its parent, its ancestors, its immediate children, and its descendants.

 The scope of a search is defined by a bitwise combination of values from the [System.Windows.Automation.TreeScope](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TreeScope) enumeration.

<a name="Finding_a_Known_Element"></a>

## Finding a Known Element

 To find a known element, identified by its [System.Windows.Automation.AutomationElement.AutomationElementInformation.Name*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationElementInformation.Name*), [System.Windows.Automation.AutomationElement.AutomationElementInformation.AutomationId*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationElementInformation.AutomationId*), or some other property or combination of properties, it is easiest to use the [System.Windows.Automation.AutomationElement.FindFirst*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.FindFirst*) method. If the element sought is an application window, the starting-point of the search can be the [System.Windows.Automation.AutomationElement.RootElement*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.RootElement*).

 This way of finding UI Automation elements is most useful in automated testing scenarios.

<a name="Finding_Elements_in_a_Subtree"></a>

## Finding Elements in a Subtree

 To find all elements meeting specific criteria that are related to a known element, you can use [System.Windows.Automation.AutomationElement.FindAll*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.FindAll*). For example, you could use this method to retrieve list items or menu items from a list or menu, or to identify all controls in a dialog box.

<a name="Walking_a_Subtree"></a>

## Walking a Subtree

 If you have no prior knowledge of the applications that your client may be used with, you can construct a subtree of all elements of interest by using the [System.Windows.Automation.TreeWalker](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TreeWalker) class. Your application might do this in response to a focus-changed event; that is, when an application or control receives input focus, the UI Automation client examines children and perhaps all descendants of the focused element.

 Another way in which [System.Windows.Automation.TreeWalker](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TreeWalker) can be used is to identify the ancestors of an element. For example, by walking up the tree you can identify the parent window of a control.

 You can use [System.Windows.Automation.TreeWalker](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TreeWalker) either by creating an object of the class (defining the elements of interest by passing a [System.Windows.Automation.Condition](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Condition)), or by using one of the following predefined objects that are defined as fields of [System.Windows.Automation.TreeWalker](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TreeWalker).

| Field | Description |
| --- | --- |
| [System.Windows.Automation.TreeWalker.ContentViewWalker](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TreeWalker.ContentViewWalker) | Finds only elements whose [System.Windows.Automation.AutomationElement.AutomationElementInformation.IsContentElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationElementInformation.IsContentElement) property is `true`. |
| [System.Windows.Automation.TreeWalker.ControlViewWalker](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TreeWalker.ControlViewWalker) | Finds only elements whose [System.Windows.Automation.AutomationElement.AutomationElementInformation.IsControlElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationElementInformation.IsControlElement) property is `true`. |
| [System.Windows.Automation.TreeWalker.RawViewWalker](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TreeWalker.RawViewWalker) | Finds all elements. |

 After you have obtained a [System.Windows.Automation.TreeWalker](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TreeWalker), using it is straightforward. Simply call the `Get` methods to navigate among elements of the subtree.

 The [System.Windows.Automation.TreeWalker.Normalize*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TreeWalker.Normalize*) method can be used for navigating to an element in the subtree from another element that is not part of the view. For example, suppose you have created a view of a subtree by using [System.Windows.Automation.TreeWalker.ContentViewWalker](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TreeWalker.ContentViewWalker). Your application then receives notification that a scroll bar has received the input focus. Because a scroll bar is not a content element, it is not present in your view of the subtree. However, you can pass the [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) representing the scroll bar to [System.Windows.Automation.TreeWalker.Normalize*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TreeWalker.Normalize*) and retrieve the nearest ancestor that is in the content view.

<a name="Other_Ways_to_Retrieve_an_Element"></a>

## Other Ways to Retrieve an Element

 In addition to searches and navigation, you can retrieve an [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) in the following ways.

### From an Event

 When your application receives a UI Automation event, the source object passed to your event handler is an [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement). For example, if you have subscribed to focus-changed events, the source passed to your [System.Windows.Automation.AutomationFocusChangedEventHandler](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationFocusChangedEventHandler) is the element that received the focus.

 For more information, see [Subscribe to UI Automation Events](subscribe-to-ui-automation-events.md).

### From a Point

 If you have screen coordinates (for example, a cursor position), you can retrieve an [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) by using the static [System.Windows.Automation.AutomationElement.FromPoint*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.FromPoint*) method.

### From a Window Handle

 To retrieve an [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) from an HWND, use the static [System.Windows.Automation.AutomationElement.FromHandle*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.FromHandle*) method.

### From the Focused Control

 You can retrieve an [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) that represents the focused control from the static [System.Windows.Automation.AutomationElement.FocusedElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.FocusedElement) property.

## See also

- [Find a UI Automation Element Based on a Property Condition](find-a-ui-automation-element-based-on-a-property-condition.md)
- [Navigate Among UI Automation Elements with TreeWalker](navigate-among-ui-automation-elements-with-treewalker.md)
- [UI Automation Tree Overview](ui-automation-tree-overview.md)
