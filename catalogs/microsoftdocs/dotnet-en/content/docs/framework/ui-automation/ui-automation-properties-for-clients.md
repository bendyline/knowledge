---
title: "UI Automation Properties for Clients"
description: Read an overview of UI Automation properties as they are exposed to UI Automation client applications.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "properties, UI Automation clients"
  - "UI Automation, client properties"
ms.assetid: 255905af-0b17-485c-93d4-8a2db2a6524b
---
# UI Automation Properties for Clients

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 This overview introduces you to UI Automation properties as they are exposed to UI Automation client applications.

 Properties on [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) objects contain information about user interface (UI) elements, usually controls. The properties of an [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) are generic; that is, not specific to a control type. Many of these properties are exposed in the [System.Windows.Automation.AutomationElement.AutomationElementInformation](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.AutomationElementInformation) structure.

 Control patterns also have properties. The properties of control patterns are specific to the pattern. For example, [System.Windows.Automation.ScrollPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ScrollPattern) has properties that enable a client application to discover whether a window is vertically or horizontally scrollable, and what the current view sizes and scroll positions are. Control patterns expose all their properties through a structure; for example, [System.Windows.Automation.ScrollPattern.ScrollPatternInformation](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ScrollPattern.ScrollPatternInformation).

 UI Automation properties are read-only. To set properties of a control, you must use the methods of the appropriate control pattern. For example, use [System.Windows.Automation.ScrollPattern.Scroll*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ScrollPattern.Scroll*) to change the position values of a scrolling window.

 To improve performance, property values of controls and control patterns can be cached when [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) objects are retrieved. For more information, see [Caching in UI Automation Clients](caching-in-ui-automation-clients.md).

## Property IDs

 Property identifiers (IDs) are unique, constant values that are encapsulated in [System.Windows.Automation.AutomationProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationProperty) objects. UI Automation client applications get these IDs from the [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) class or from the appropriate control pattern class, such as [System.Windows.Automation.ScrollPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ScrollPattern). UI Automation providers get them from [System.Windows.Automation.AutomationElementIdentifiers](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers) or from one of the control pattern identifiers classes, such as [System.Windows.Automation.ScrollPatternIdentifiers](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ScrollPatternIdentifiers).

 The numeric [System.Windows.Automation.AutomationIdentifier.Id*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationIdentifier.Id*) of an [System.Windows.Automation.AutomationProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationProperty) is used by providers to identify properties that are being queried for in the [System.Windows.Automation.Provider.IRawElementProviderSimple.GetPropertyValue*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.IRawElementProviderSimple.GetPropertyValue*) method. In general, client applications do not need to examine the [System.Windows.Automation.AutomationIdentifier.Id*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationIdentifier.Id*). The [System.Windows.Automation.AutomationIdentifier.ProgrammaticName*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationIdentifier.ProgrammaticName*) is used only for debugging and diagnostic purposes.

## Property Conditions

 The property IDs are used in constructing [System.Windows.Automation.PropertyCondition](https://learn.microsoft.com/search/?terms=System.Windows.Automation.PropertyCondition) objects used to find [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) objects. For example, you might wish to find an [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) that has a certain name, or all controls that are enabled. Each [System.Windows.Automation.PropertyCondition](https://learn.microsoft.com/search/?terms=System.Windows.Automation.PropertyCondition) specifies an [System.Windows.Automation.AutomationProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationProperty) identifier and the value that the property must match.

 For more information, see the following reference topics:

- [System.Windows.Automation.AutomationElement.FindFirst*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.FindFirst*)

- [System.Windows.Automation.AutomationElement.FindAll*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.FindAll*)

- [System.Windows.Automation.TreeWalker.Condition*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TreeWalker.Condition*)

## Retrieving Properties

 Some properties of [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) and all properties of a control pattern class are exposed as nested properties of the `Current` or `Cached` property of the [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) or control pattern object.

 In addition, any [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) or control pattern property, including a property that is not available in the [System.Windows.Automation.AutomationElement.Cached*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.Cached*) or [System.Windows.Automation.AutomationElement.Current*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.Current*) structure, can be retrieved by using one of the following methods:

- [System.Windows.Automation.AutomationElement.GetCachedPropertyValue*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetCachedPropertyValue*)

- [System.Windows.Automation.AutomationElement.GetCurrentPropertyValue*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetCurrentPropertyValue*)

 These methods offer slightly better performance as well as access to the full range of properties.

 The following code example shows the two ways of retrieving a property on an [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement).

 [UIAClient_snip#121 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/UIAClient_snip/CSharp/ClientForm.cs#121)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/UIAClient_snip/CSharp/ClientForm.cs.md)
 [UIAClient_snip#121 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/UIAClient_snip/VisualBasic/ClientForm.vb#121)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/UIAClient_snip/VisualBasic/ClientForm.vb.md)

 To retrieve properties of control patterns supported by the [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement), you do not need to retrieve the control pattern object. Simply pass one of the pattern property identifiers to the method.

 The following code example shows the two ways of retrieving a property on a control pattern.

 [UIAClient_snip#122 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/UIAClient_snip/CSharp/ClientForm.cs#122)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/UIAClient_snip/CSharp/ClientForm.cs.md)
 [UIAClient_snip#122 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/UIAClient_snip/VisualBasic/ClientForm.vb#122)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/UIAClient_snip/VisualBasic/ClientForm.vb.md)

 The `Get` methods return an [System.Object](https://learn.microsoft.com/search/?terms=System.Object). The application must cast the returned object to the proper type before using the value.

## Default Property Values

 If a UI Automation provider does not implement a property, the UI Automation system is able to supply a default value. For example, if the provider for a control does not support the property identified by [System.Windows.Automation.AutomationElement.HelpTextProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.HelpTextProperty), UI Automation returns an empty string. Similarly, if the provider does not support the property identified by [System.Windows.Automation.AutomationElement.IsDockPatternAvailableProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.IsDockPatternAvailableProperty), UI Automation returns `false`.

 You can change this behavior by using the [System.Windows.Automation.AutomationElement.GetCachedPropertyValue*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetCachedPropertyValue*) and [System.Windows.Automation.AutomationElement.GetCurrentPropertyValue*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetCurrentPropertyValue*) method overloads. When you specify `true` as the second parameter, UI Automation does not return a default value, but instead returns the special value [System.Windows.Automation.AutomationElement.NotSupported](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.NotSupported).

 The following example code attempts to retrieve a property from an element, and if the property is not supported, an application-defined value is used instead.

 [UIAClient_snip#123 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/UIAClient_snip/CSharp/ClientForm.cs#123)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/UIAClient_snip/CSharp/ClientForm.cs.md)
 [UIAClient_snip#123 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/UIAClient_snip/VisualBasic/ClientForm.vb#123)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/UIAClient_snip/VisualBasic/ClientForm.vb.md)

 To discover what properties are supported by an element, use [System.Windows.Automation.AutomationElement.GetSupportedProperties*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetSupportedProperties*). This returns an array of [System.Windows.Automation.AutomationProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationProperty) identifiers.

## Property-changed Events

 When a property value on an [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) or control pattern changes, an event is raised. An application can subscribe to such events by calling [System.Windows.Automation.Automation.AddAutomationPropertyChangedEventHandler*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Automation.AddAutomationPropertyChangedEventHandler*), supplying an array of [System.Windows.Automation.AutomationProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationProperty) identifiers as the last parameter in order to specify the properties of interest.

 In the [System.Windows.Automation.AutomationPropertyChangedEventHandler](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationPropertyChangedEventHandler), you can identify the property that has changed by checking the [System.Windows.Automation.AutomationPropertyChangedEventArgs.Property*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationPropertyChangedEventArgs.Property*) member of the event arguments. The arguments also contain the old and new values of the UI Automation property that has changed. These values are of type [System.Object](https://learn.microsoft.com/search/?terms=System.Object) and must be cast to the correct type before being used.

## Additional AutomationElement Properties

 In addition to the [System.Windows.Automation.AutomationElement.Current*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.Current*) and [System.Windows.Automation.AutomationElement.Cached](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.Cached) property structures, [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) has the following properties, which are retrieved through simple property accessors.

| Property | Description |
| --- | --- |
| [System.Windows.Automation.AutomationElement.CachedChildren*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.CachedChildren*) | A collection of child [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) objects that are in the cache. |
| [System.Windows.Automation.AutomationElement.CachedParent*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.CachedParent*) | An [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) parent object that is in the cache. |
| [System.Windows.Automation.AutomationElement.FocusedElement*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.FocusedElement*) | (Static property) The [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) that has the input focus. |
| [System.Windows.Automation.AutomationElement.RootElement*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.RootElement*) | (Static property) The root [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement). |

## See also

- [Caching in UI Automation Clients](caching-in-ui-automation-clients.md)
- [Server-Side UI Automation Provider Implementation](server-side-ui-automation-provider-implementation.md)
- [Subscribe to UI Automation Events](subscribe-to-ui-automation-events.md)
