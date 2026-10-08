---
title: "Breaking change: 'GetXmlNamespaceMaps' type change"
description: Learn about the breaking change in .NET 9 for WPF where the backing property of 'XmlNamespaceMaps' has been changed from 'String' to 'Hashtable'.
ms.date: 03/15/2024
---
# `GetXmlNamespaceMaps` type change

The backing property of [System.Windows.Markup.XmlAttributeProperties.XmlNamespaceMaps](https://learn.microsoft.com/search/?terms=System.Windows.Markup.XmlAttributeProperties.XmlNamespaceMaps) has been changed from [System.String](https://learn.microsoft.com/search/?terms=System.String) to [System.Collections.Hashtable](https://learn.microsoft.com/search/?terms=System.Collections.Hashtable).

## Version introduced

.NET 9 Preview 3

## Previous behavior

Previously, the backing property of [System.Windows.Markup.XmlAttributeProperties.XmlNamespaceMaps](https://learn.microsoft.com/search/?terms=System.Windows.Markup.XmlAttributeProperties.XmlNamespaceMaps) was [System.String](https://learn.microsoft.com/search/?terms=System.String). However, the value returned by `dependencyObject.GetValue(XmlNamespaceMapsProperty)` is of type [System.Collections.Hashtable](https://learn.microsoft.com/search/?terms=System.Collections.Hashtable) and the [System.Windows.Markup.XmlAttributeProperties.GetXmlNamespaceMaps(System.Windows.DependencyObject)](https://learn.microsoft.com/search/?terms=System.Windows.Markup.XmlAttributeProperties.GetXmlNamespaceMaps(System.Windows.DependencyObject)) implementation tried to type cast it to [System.String](https://learn.microsoft.com/search/?terms=System.String), which resulted in an [System.InvalidCastException](https://learn.microsoft.com/search/?terms=System.InvalidCastException).

In addition, the [System.Windows.Markup.XmlAttributeProperties.SetXmlNamespaceMaps(System.Windows.DependencyObject,System.String)](https://learn.microsoft.com/search/?terms=System.Windows.Markup.XmlAttributeProperties.SetXmlNamespaceMaps(System.Windows.DependencyObject%2CSystem.String)) method accepted a [System.String](https://learn.microsoft.com/search/?terms=System.String) argument.

## New behavior

Starting in .NET 9, the backing property of [System.Windows.Markup.XmlAttributeProperties.XmlNamespaceMaps](https://learn.microsoft.com/search/?terms=System.Windows.Markup.XmlAttributeProperties.XmlNamespaceMaps) is [System.Collections.Hashtable](https://learn.microsoft.com/search/?terms=System.Collections.Hashtable), and the [System.InvalidCastException](https://learn.microsoft.com/search/?terms=System.InvalidCastException) is no longer thrown by [System.Windows.Markup.XmlAttributeProperties.GetXmlNamespaceMaps(System.Windows.DependencyObject)](https://learn.microsoft.com/search/?terms=System.Windows.Markup.XmlAttributeProperties.GetXmlNamespaceMaps(System.Windows.DependencyObject)).

In addition, the [System.Windows.Markup.XmlAttributeProperties.SetXmlNamespaceMaps(System.Windows.DependencyObject,System.Collections.Hashtable)](https://learn.microsoft.com/search/?terms=System.Windows.Markup.XmlAttributeProperties.SetXmlNamespaceMaps(System.Windows.DependencyObject%2CSystem.Collections.Hashtable)) method now accepts a [System.Collections.Hashtable](https://learn.microsoft.com/search/?terms=System.Collections.Hashtable) argument.

## Change category

This change is a [*behavioral change*](../../categories.md#behavioral-change) and can also affect [*source compatibility*](../../categories.md#source-compatibility).

## Reason for change

This change was made to prevent the [System.InvalidCastException](https://learn.microsoft.com/search/?terms=System.InvalidCastException) from being thrown.

## Recommended action

Pass `Hashtable` instead of a string to the [System.Windows.Markup.XmlAttributeProperties.SetXmlNamespaceMaps*](https://learn.microsoft.com/search/?terms=System.Windows.Markup.XmlAttributeProperties.SetXmlNamespaceMaps*) API.

## Affected APIs

- [System.Windows.Markup.XmlAttributeProperties.GetXmlNamespaceMaps(System.Windows.DependencyObject)](https://learn.microsoft.com/search/?terms=System.Windows.Markup.XmlAttributeProperties.GetXmlNamespaceMaps(System.Windows.DependencyObject))
- [System.Windows.Markup.XmlAttributeProperties.SetXmlNamespaceMaps*](https://learn.microsoft.com/search/?terms=System.Windows.Markup.XmlAttributeProperties.SetXmlNamespaceMaps*)
