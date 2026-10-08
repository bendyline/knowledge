---
title: Valid content of XElement and XDocument objects - LINQ to XML
description: The XElement and XDocument constructors accept many argument types, including collections returned from queries. There are other constructors and functions for adding XML content.
ms.date: 07/20/2015
---

# Valid content of XElement and XDocument objects (LINQ to XML)

This article describes the valid arguments that can be passed to constructors, and methods that you use to add content to elements and documents.

## Valid types for the XElement constructor

Queries often evaluate to [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) of [System.Xml.Linq.XElement](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement) or [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) of [System.Xml.Linq.XAttribute](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XAttribute). You can pass collections of [System.Xml.Linq.XElement](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement) or [System.Xml.Linq.XAttribute](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XAttribute) objects to the [System.Xml.Linq.XElement](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement) constructor. That's why it's convenient to pass the results of a query as content into methods and constructors that you use to populate XML trees.

When adding simple content, various types can be passed to this method, including:

- [System.String](https://learn.microsoft.com/search/?terms=System.String)
- [System.Double](https://learn.microsoft.com/search/?terms=System.Double)
- [System.Single](https://learn.microsoft.com/search/?terms=System.Single)
- [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal)
- [System.Boolean](https://learn.microsoft.com/search/?terms=System.Boolean)
- [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime)
- [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan)
- [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset)
- Any type that implements `Object.ToString`.
- Any type that implements [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601).

When adding complex content, various types can be passed to this method, including:

- [System.Xml.Linq.XObject](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XObject)
- [System.Xml.Linq.XNode](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XNode)
- [System.Xml.Linq.XAttribute](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XAttribute)
- Any type that implements [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601)

If an object implements [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601), the collection in the object is enumerated, and all items in the collection are added. If the collection contains [System.Xml.Linq.XNode](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XNode) or [System.Xml.Linq.XAttribute](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XAttribute) objects, each item in the collection is added separately. If the collection contains text (or objects that are converted to text), the text in the collection is concatenated and added as a single text node.

If content is `null`, nothing is added. When passing a collection, items in the collection can be `null`. A `null` item in the collection has no effect on the tree.

An added attribute must have a unique name within its containing element.

When adding [System.Xml.Linq.XNode](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XNode) or [System.Xml.Linq.XAttribute](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XAttribute) objects, if the new content has no parent, then the objects are simply attached to the XML tree. If the new content already is parented and is part of another XML tree, then the new content is cloned, and the newly cloned content is attached to the XML tree.

## Valid types for the XDocument constructor

Attributes and simple content can't be added to a document.

There aren't many scenarios that require you to create an [System.Xml.Linq.XDocument](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XDocument). Instead, you can usually create your XML trees with an [System.Xml.Linq.XElement](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement) root node. Unless you have a specific requirement to create a document (for example, because you have to create processing instructions and comments at the top level, or you have to support document types), it's often more convenient to use [System.Xml.Linq.XElement](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement) as your root node.

Valid types for the [System.Xml.Linq.XDocument.%23ctor*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XDocument.%2523ctor*) constructor include the following:

- Zero or one [System.Xml.Linq.XDocumentType](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XDocumentType) objects. The document types must come before the element.
- Zero or one element.
- Zero or more comments.
- Zero or more processing instructions.
- Zero or more text nodes that contain only white space.

## Constructors and functions for adding content

The following methods allow you to add child content to an [System.Xml.Linq.XElement](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement) or an [System.Xml.Linq.XDocument](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XDocument):

| Method | Description |
| --- | --- |
| [System.Xml.Linq.XElement.%23ctor*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement.%2523ctor*) | Constructs an [System.Xml.Linq.XElement](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement). |
| [System.Xml.Linq.XDocument.%23ctor*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XDocument.%2523ctor*) | Constructs a [System.Xml.Linq.XDocument](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XDocument). |
| [System.Xml.Linq.XContainer.Add*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XContainer.Add*) | Adds to the end of the child content of the [System.Xml.Linq.XElement](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement) or [System.Xml.Linq.XDocument](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XDocument). |
| [System.Xml.Linq.XNode.AddAfterSelf*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XNode.AddAfterSelf*) | Adds content after the [System.Xml.Linq.XNode](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XNode). |
| [System.Xml.Linq.XNode.AddBeforeSelf*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XNode.AddBeforeSelf*) | Adds content before the [System.Xml.Linq.XNode](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XNode). |
| [System.Xml.Linq.XContainer.AddFirst*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XContainer.AddFirst*) | Adds content at the beginning of the child content of the [System.Xml.Linq.XContainer](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XContainer). |
| [System.Xml.Linq.XElement.ReplaceAll*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement.ReplaceAll*) | Replaces all content (child nodes and attributes) of an [System.Xml.Linq.XElement](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement). |
| [System.Xml.Linq.XElement.ReplaceAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement.ReplaceAttributes*) | Replaces the attributes of an [System.Xml.Linq.XElement](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement). |
| [System.Xml.Linq.XContainer.ReplaceNodes*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XContainer.ReplaceNodes*) | Replaces the children nodes with new content. |
| [System.Xml.Linq.XNode.ReplaceWith*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XNode.ReplaceWith*) | Replaces a node with new content. |

## See also

- [XML trees](functional-construction.md)
