---
description: "Learn more about: Select XML Data Using XPathNavigator"
title: "Select XML Data Using XPathNavigator"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.topic: how-to
---
# Select XML Data Using XPathNavigator

The [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class provides a set of methods used to select a set of nodes in an [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument) or [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object using an XPath expression. Once selected, you can iterate over the selected set of nodes.

## XPathNavigator Selection Methods

 The [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class provides a set of methods used to select a set of nodes in an [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument) or [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object using an XPath expression. The [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class also provides a set of optimized methods for selecting ancestor, child and descendant nodes faster than using an XPath expression. The selected set of nodes is returned in an [System.Xml.XPath.XPathNodeIterator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNodeIterator) object or an [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object in the case of a single selected node.

### Selecting Nodes Using XPath Expressions

 To select a set of nodes using an XPath expression, use one of the following selection methods.

- [System.Xml.XPath.XPathNavigator.Select*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.Select*)

- [System.Xml.XPath.XPathNavigator.SelectSingleNode*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.SelectSingleNode*)

 When called, these methods return a set of nodes that you can navigate freely using an [System.Xml.XPath.XPathNodeIterator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNodeIterator) object or an [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object in the case of a single selected node.

 Navigating with an [System.Xml.XPath.XPathNodeIterator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNodeIterator) object does not affect the position of the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object used to create it. The [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object returned from the [System.Xml.XPath.XPathNavigator.SelectSingleNode*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.SelectSingleNode*) methods is positioned on the single returned node and also does not affect the position of the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object used to create it.

 The following example shows the creation of an [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object from an [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument) object, the use of the [System.Xml.XPath.XPathNavigator.Select*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.Select*) method to select nodes in the [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument) object, and the use of the [System.Xml.XPath.XPathNodeIterator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNodeIterator) object to iterate over the selected nodes.

```vb
Dim document As XPathDocument = New XPathDocument("books.xml")
Dim navigator As XPathNavigator = document.CreateNavigator()
Dim nodes As XPathNodeIterator = navigator.Select("/bookstore/book")

While nodes.MoveNext()
    Console.WriteLine(nodes.Current.Name)
End While
```

```csharp
XPathDocument document = new XPathDocument("books.xml");
XPathNavigator navigator = document.CreateNavigator();
XPathNodeIterator nodes = navigator.Select("/bookstore/book");

while(nodes.MoveNext())
{
    Console.WriteLine(nodes.Current.Name);
}
```

 The example takes the `books.xml` file as input.

 [XPathXMLExamples#1 (complete source file; reference: ../../../../samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/books.xml#1)](../../../../_code/samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/books.xml.md)

### Optimized Selection Methods

 The [System.Xml.XPath.XPathNavigator.SelectChildren*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.SelectChildren*), [System.Xml.XPath.XPathNavigator.SelectAncestors*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.SelectAncestors*), and [System.Xml.XPath.XPathNavigator.SelectDescendants*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.SelectDescendants*) methods of the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class represent XPath expressions commonly used to retrieve child, descendant, and ancestor nodes. These methods are optimized for performance and are faster than their corresponding XPath expressions. The [System.Xml.XPath.XPathNavigator.SelectChildren*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.SelectChildren*), [System.Xml.XPath.XPathNavigator.SelectAncestors*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.SelectAncestors*), and [System.Xml.XPath.XPathNavigator.SelectDescendants*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.SelectDescendants*) methods selects ancestor, child, and descendant nodes based on an [System.Xml.XPath.XPathNodeType](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNodeType) value or the local name and namespace URI of the nodes to select. The selected ancestor, child, and descendant nodes are returned in an [System.Xml.XPath.XPathNodeIterator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNodeIterator) object.

## See also

- [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument)
- [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument)
- [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator)
- [Process XML Data Using the XPath Data Model](process-xml-data-using-the-xpath-data-model.md)
- [Evaluate XPath Expressions using XPathNavigator](evaluate-xpath-expressions-using-xpathnavigator.md)
- [Matching Nodes using XPathNavigator](matching-nodes-using-xpathnavigator.md)
- [Node Types Recognized with XPath Queries](node-types-recognized-with-xpath-queries.md)
- [XPath Queries and Namespaces](xpath-queries-and-namespaces.md)
- [Compiled XPath Expressions](compiled-xpath-expressions.md)
