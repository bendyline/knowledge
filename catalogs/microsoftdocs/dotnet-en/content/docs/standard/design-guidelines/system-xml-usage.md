---
description: "Learn more about: System.Xml Usage"
title: "System.Xml Usage"
ms.date: "10/22/2008"
ms.assetid: 82302f0d-a621-4c6f-b57d-999bd61f21a6
---
# System.Xml Usage

> **Note:**
> This content is reprinted by permission of Pearson Education, Inc. from *Framework Design Guidelines: Conventions, Idioms, and Patterns for Reusable .NET Libraries, 2nd Edition*. That edition was published in 2008, and the book has since been fully revised in the [third edition](https://www.informit.com/store/framework-design-guidelines-conventions-idioms-and-9780135896464). Some of the information on this page may be out-of-date.


This section talks about usage of several types residing in [System.Xml](https://learn.microsoft.com/search/?terms=System.Xml) namespaces that can be used to represent XML data.

 ❌ DO NOT use [System.Xml.XmlNode](https://learn.microsoft.com/search/?terms=System.Xml.XmlNode) or [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) to represent XML data. Favor using instances of [System.Xml.XPath.IXPathNavigable](https://learn.microsoft.com/search/?terms=System.Xml.XPath.IXPathNavigable), [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader), [System.Xml.XmlWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter), or subtypes of [System.Xml.Linq.XNode](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XNode) instead. `XmlNode` and `XmlDocument` are not designed for exposing in public APIs.

 ✔️ DO use `XmlReader`, `IXPathNavigable`, or subtypes of `XNode` as input or output of members that accept or return XML.

 Use these abstractions instead of `XmlDocument`, `XmlNode`, or [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument), because this decouples the methods from specific implementations of an in-memory XML document and allows them to work with virtual XML data sources that expose `XNode`, `XmlReader`, or [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator).

 ❌ DO NOT subclass `XmlDocument` if you want to create a type representing an XML view of an underlying object model or data source.

 *Portions © 2005, 2009 Microsoft Corporation. All rights reserved.*

 *Reprinted by permission of Pearson Education, Inc. from [Framework Design Guidelines: Conventions, Idioms, and Patterns for Reusable .NET Libraries, 2nd Edition](https://www.informit.com/store/framework-design-guidelines-conventions-idioms-and-9780321545619) by Krzysztof Cwalina and Brad Abrams, published Oct 22, 2008 by Addison-Wesley Professional as part of the Microsoft Windows Development Series.*

## See also

- [Framework Design Guidelines](index.md)
- [Usage Guidelines](usage-guidelines.md)
