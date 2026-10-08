---
description: "Learn more about: Node Set Navigation Using XPathNavigator"
title: "Node Set Navigation Using XPathNavigator"
ms.date: "03/30/2017"
ms.assetid: 1a954b41-7173-40bc-8544-d430f209b1e5
---
# Node Set Navigation Using XPathNavigator

You can navigate over nodes in an [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument) or [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object using the node set navigation methods of the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class. You can navigate over all the nodes or over a selected set of nodes returned by one of the selection methods of the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class.

## Element Node Set Navigation

 The [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class provides several methods used to navigate element nodes. The following table shows the navigation methods available and a description of how they move; this does not include methods used to navigate attribute and namespace nodes.

 For more information about selecting nodes in an [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object, see [Selecting, Evaluating and Matching XML Data using XPathNavigator](selecting-evaluating-and-matching-xml-data-using-xpathnavigator.md). For more information about navigating attribute and namespace nodes, see [Attribute and Namespace Node Navigation Using XPathNavigator](attribute-and-namespace-node-navigation-using-xpathnavigator.md).

| Method | Description |
| --- | --- |
| [System.Xml.XPath.XPathNavigator.MoveTo*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.MoveTo*) | Moves the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) to the same position of the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) specified. |
| [System.Xml.XPath.XPathNavigator.MoveToChild*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.MoveToChild*) | Moves the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) to a child node of the current node. |
| [System.Xml.XPath.XPathNavigator.MoveToFirst*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.MoveToFirst*) | Moves the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) to the first sibling node of the current node. |
| [System.Xml.XPath.XPathNavigator.MoveToFirstChild*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.MoveToFirstChild*) | Moves the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) to the first child node of the current node. |
| [System.Xml.XPath.XPathNavigator.MoveToFollowing*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.MoveToFollowing*) | Moves the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) to the specified element in document order. |
| [System.Xml.XPath.XPathNavigator.MoveToId*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.MoveToId*) | Moves the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) to the node that has an attribute of type `ID` with a value that matches the given [System.String](https://learn.microsoft.com/search/?terms=System.String). |
| [System.Xml.XPath.XPathNavigator.MoveToNext*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.MoveToNext*) | Moves the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) to the next sibling node of the current node. |
| [System.Xml.XPath.XPathNavigator.MoveToParent*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.MoveToParent*) | Moves the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) to the parent node of the current node. |
| [System.Xml.XPath.XPathNavigator.MoveToPrevious*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.MoveToPrevious*) | Moves the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) to the previous sibling node of the current node. |
| [System.Xml.XPath.XPathNavigator.MoveToRoot*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.MoveToRoot*) | Moves the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) to the root node of the XML document. |

## Comments and Processing Instruction Node Navigation

 The following [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class methods are valid for moving to comments or processing instructions from other nodes in an XML document.

- [System.Xml.XPath.XPathNavigator.MoveTo*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.MoveTo*)

- [System.Xml.XPath.XPathNavigator.MoveToNext*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.MoveToNext*)

- [System.Xml.XPath.XPathNavigator.MoveToPrevious*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.MoveToPrevious*)

- [System.Xml.XPath.XPathNavigator.MoveToFirst*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.MoveToFirst*)

- [System.Xml.XPath.XPathNavigator.MoveToFirstChild*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.MoveToFirstChild*)

- [System.Xml.XPath.XPathNavigator.MoveToChild*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.MoveToChild*)

- [System.Xml.XPath.XPathNavigator.MoveToParent*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.MoveToParent*)

- [System.Xml.XPath.XPathNavigator.MoveToId*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.MoveToId*)

## See also

- [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument)
- [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument)
- [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator)
- [Process XML Data Using the XPath Data Model](process-xml-data-using-the-xpath-data-model.md)
- [Attribute and Namespace Node Navigation Using XPathNavigator](attribute-and-namespace-node-navigation-using-xpathnavigator.md)
- [Extract XML Data Using XPathNavigator](extract-xml-data-using-xpathnavigator.md)
- [Accessing Strongly Typed XML Data Using XPathNavigator](accessing-strongly-typed-xml-data-using-xpathnavigator.md)
