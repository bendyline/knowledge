---
title: "Modifying Elements, Attributes, and Nodes in an XML Tree"
description: Learn about methods and properties that you can use to modify an element, its child nodes, or its attributes.
ms.date: 07/20/2015
ms.topic: reference
---

# Modify elements, attributes, and nodes in an XML tree (LINQ to XML)

The following table summarizes the methods and properties that you can use to modify an element, its child elements, or its attributes.

The following methods modify an [System.Xml.Linq.XElement](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement):

| Method | Description |
| --- | --- |
| [System.Xml.Linq.XElement.Parse*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement.Parse*) | Replaces an element with parsed XML. |
| [System.Xml.Linq.XElement.RemoveAll*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement.RemoveAll*) | Removes all content (child nodes and attributes) of an element. |
| [System.Xml.Linq.XElement.RemoveAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement.RemoveAttributes*) | Removes the attributes of an element. |
| [System.Xml.Linq.XElement.ReplaceAll*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement.ReplaceAll*) | Replaces all content (child nodes and attributes) of an element. |
| [System.Xml.Linq.XElement.ReplaceAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement.ReplaceAttributes*) | Replaces the attributes of an element. |
| [System.Xml.Linq.XElement.SetAttributeValue*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement.SetAttributeValue*) | Sets the value of an attribute. Creates the attribute if it doesn't exist. If the value is set to `null`, removes the attribute. |
| [System.Xml.Linq.XElement.SetElementValue*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement.SetElementValue*) | Sets the value of a child element. Creates the element if it doesn't exist. If the value is set to `null`, removes the element. |
| [System.Xml.Linq.XElement.Value*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement.Value*) | Replaces the content (child nodes) of an element with the specified text. |
| [System.Xml.Linq.XElement.SetValue*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement.SetValue*) | Sets the value of an element. |

The following methods modify an [System.Xml.Linq.XAttribute](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XAttribute):

| Method | Description |
| --- | --- |
| [System.Xml.Linq.XAttribute.Value*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XAttribute.Value*) | Sets the value of an attribute. |
| [System.Xml.Linq.XAttribute.SetValue*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XAttribute.SetValue*) | Sets the value of an attribute. |

 The following methods modify an [System.Xml.Linq.XNode](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XNode) (including an [System.Xml.Linq.XElement](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement) or [System.Xml.Linq.XDocument](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XDocument)):

| Method | Description |
| --- | --- |
| [System.Xml.Linq.XNode.ReplaceWith*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XNode.ReplaceWith*) | Replaces a node with new content. |

 The following methods modify an [System.Xml.Linq.XContainer](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XContainer) (an [System.Xml.Linq.XElement](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement) or [System.Xml.Linq.XDocument](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XDocument)):

| Method | Description |
| --- | --- |
| [System.Xml.Linq.XContainer.ReplaceNodes*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XContainer.ReplaceNodes*) | Replaces the children nodes with new content: |
