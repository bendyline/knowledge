---
description: "Learn more about: Create New Nodes in the DOM"
title: Create New Nodes in the DOM
ms.date: 09/02/2021
ms.assetid: 6c2b9789-b61a-49f9-b33f-db01a945edf2
---
# Create New Nodes in the DOM

The [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) class has a create method for all of the node types. To create a node, supply the method with a name, when required, and content or other parameters for those nodes that have content (for example, a text node). The following methods need a name and a few other parameters filled to create an appropriate node:

- [System.Xml.XmlDocument.CreateCDataSection*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.CreateCDataSection*)

- [System.Xml.XmlDocument.CreateComment*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.CreateComment*)

- [System.Xml.XmlDocument.CreateDocumentFragment*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.CreateDocumentFragment*)

- [System.Xml.XmlDocument.CreateDocumentType*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.CreateDocumentType*)

- [System.Xml.XmlDocument.CreateElement*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.CreateElement*)

- [System.Xml.XmlDocument.CreateNode*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.CreateNode*)

- [System.Xml.XmlDocument.CreateProcessingInstruction*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.CreateProcessingInstruction*)

- [System.Xml.XmlDocument.CreateSignificantWhitespace*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.CreateSignificantWhitespace*)

- [System.Xml.XmlDocument.CreateTextNode*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.CreateTextNode*)

- [System.Xml.XmlDocument.CreateWhitespace*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.CreateWhitespace*)

- [System.Xml.XmlDocument.CreateXmlDeclaration*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.CreateXmlDeclaration*)

 Other node types have more requirements than just providing data to parameters.

 For information on attributes, see [Creating New Attributes for Elements in the DOM](creating-new-attributes-for-elements-in-the-dom.md). For information on element and attribute name validation, see [XML Element and Attribute Name Verification when Creating New Nodes](xml-element-and-attribute-name-verification-when-creating-new-nodes.md). For creating entity references, see [Creating New Entity References](creating-new-entity-references.md). For information on how namespaces affect the expansion of entity references, see [Namespace Affect on Entity Reference Expansion for New Nodes Containing Elements and Attributes](namespace-affect-on-entity-ref-expansion-for-new-nodes.md).

 Once new nodes are created, there are several methods available to insert them into the tree. The table lists the methods with a description of where the new node appears in the XML Document Object Model (DOM).

| Method | Node placement |
| --- | --- |
| [System.Xml.XmlNode.InsertBefore*](https://learn.microsoft.com/search/?terms=System.Xml.XmlNode.InsertBefore*) | Inserted before the reference node. For example, to insert the new node in position 5:<br /><br /> `XmlNode refChild = node.ChildNodes[4]; // The reference is zero-based.`<br/><br/>`node.InsertBefore(newChild, refChild);`<br /><br /> For more information, see the [System.Xml.XmlNode.InsertBefore*](https://learn.microsoft.com/search/?terms=System.Xml.XmlNode.InsertBefore*) method. |
| [System.Xml.XmlNode.InsertAfter*](https://learn.microsoft.com/search/?terms=System.Xml.XmlNode.InsertAfter*) | Inserted after the reference node. For example:<br /><br /> `node.InsertAfter(newChild, refChild);`<br /><br /> For more information, see the [System.Xml.XmlNode.InsertAfter*](https://learn.microsoft.com/search/?terms=System.Xml.XmlNode.InsertAfter*) method. |
| [System.Xml.XmlNode.AppendChild*](https://learn.microsoft.com/search/?terms=System.Xml.XmlNode.AppendChild*) | Adds the node to the end of the list of child nodes for the given node. If the node being added is an [System.Xml.XmlDocumentFragment](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocumentFragment), the entire contents of the document fragment are moved into the child list of this node. For more information, see the [System.Xml.XmlNode.AppendChild*](https://learn.microsoft.com/search/?terms=System.Xml.XmlNode.AppendChild*) method. |
| [System.Xml.XmlNode.PrependChild*](https://learn.microsoft.com/search/?terms=System.Xml.XmlNode.PrependChild*) | Adds the node to the beginning of the list of child nodes of the given node. If the node being added is an [System.Xml.XmlDocumentFragment](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocumentFragment), the entire contents of the document fragment are moved into the child list of this node. For more information, see the [System.Xml.XmlNode.PrependChild*](https://learn.microsoft.com/search/?terms=System.Xml.XmlNode.PrependChild*) method. |
| [System.Xml.XmlAttributeCollection.Append*](https://learn.microsoft.com/search/?terms=System.Xml.XmlAttributeCollection.Append*) | Appends an [System.Xml.XmlAttribute](https://learn.microsoft.com/search/?terms=System.Xml.XmlAttribute) node to the end of the attribute collection associated with an element. For more information, see the [System.Xml.XmlAttributeCollection.Append*](https://learn.microsoft.com/search/?terms=System.Xml.XmlAttributeCollection.Append*) method. |

## See also

- [XML Document Object Model (DOM)](xml-document-object-model-dom.md)
