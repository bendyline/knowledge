---
description: "Learn more about: Types of XML Nodes"
title: "Types of XML Nodes"
ms.date: "03/30/2017"
ms.topic: reference
---
# Types of XML Nodes

When an XML document is read into memory as a tree of nodes, the node types for the nodes are decided when the nodes are created. The XML Document Object Model (DOM) has several kinds of node types, determined by the World Wide Web Consortium (W3C) and listed in section 1.1.1 The DOM Structure Model. The following table lists the node types, the object assigned to that node type, and a short description of each.

| DOM node type | Object | Description |
| --- | --- | --- |
| Document | [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) | The container of all the nodes in the tree. It is also known as the document root, which is not always the same as the root element. |
| DocumentFragment | [System.Xml.XmlDocumentFragment](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocumentFragment) | A temporary bag containing one or more nodes without any tree structure. |
| DocumentType | [System.Xml.XmlDocumentType](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocumentType) | Represents the `<!DOCTYPE…>` node. |
| EntityReference | [System.Xml.XmlEntityReference](https://learn.microsoft.com/search/?terms=System.Xml.XmlEntityReference) | Represents the non-expanded entity reference text. |
| Element | [System.Xml.XmlElement](https://learn.microsoft.com/search/?terms=System.Xml.XmlElement) | Represents an element node. |
| Attr | [System.Xml.XmlAttribute](https://learn.microsoft.com/search/?terms=System.Xml.XmlAttribute) | Is an attribute of an element. |
| ProcessingInstruction | [System.Xml.XmlProcessingInstruction](https://learn.microsoft.com/search/?terms=System.Xml.XmlProcessingInstruction) | Is a processing instruction node. |
| Comment | [System.Xml.XmlComment](https://learn.microsoft.com/search/?terms=System.Xml.XmlComment) | A comment node. |
| Text | [System.Xml.XmlText](https://learn.microsoft.com/search/?terms=System.Xml.XmlText) | Text belonging to an element or attribute. |
| CDATASection | [System.Xml.XmlCDataSection](https://learn.microsoft.com/search/?terms=System.Xml.XmlCDataSection) | Represents CDATA. |
| Entity | [System.Xml.XmlEntity](https://learn.microsoft.com/search/?terms=System.Xml.XmlEntity) | Represents the `<!ENTITY…>` declarations in an XML document, either from an internal document type definition (DTD) subset or from external DTDs and parameter entities. |
| Notation | [System.Xml.XmlNotation](https://learn.microsoft.com/search/?terms=System.Xml.XmlNotation) | Represents a notation declared in the DTD. |

 Even though an attribute (*attr*) is listed in the W3C DOM Level 1 section 1.2 Fundamental Interfaces as a node, it is not considered a child of any element node.

 The following table shows additional node types not defined by the W3C, however they are available for use in the Microsoft .NET Framework object model as **XmlNodeType** enumerations. Therefore, there is no matching DOM node type column for these node types.

| Node type | Description |
| --- | --- |
| [System.Xml.XmlDeclaration](https://learn.microsoft.com/search/?terms=System.Xml.XmlDeclaration) | Represents the declaration node `<?xml version="1.0"…>`. |
| [System.Xml.XmlSignificantWhitespace](https://learn.microsoft.com/search/?terms=System.Xml.XmlSignificantWhitespace) | Represents significant white space, which is white space in mixed content. |
| [System.Xml.XmlWhitespace](https://learn.microsoft.com/search/?terms=System.Xml.XmlWhitespace) | Represents the white space in the content of an element. |
| EndElement | Returned when **XmlReader** gets to the end of an element.<br /><br /> Example XML: **\</item>**<br /><br /> For more information, see [System.Xml.XmlNodeType](https://learn.microsoft.com/search/?terms=System.Xml.XmlNodeType). |
| EndEntity | Returned when **XmlReader** gets to the end of the entity replacement as a result of a call to [System.Xml.XmlReader.ResolveEntity*](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader.ResolveEntity*). For more information, see [System.Xml.XmlNodeType](https://learn.microsoft.com/search/?terms=System.Xml.XmlNodeType). |

 To view a code example that reads in XML and uses a case construct on the node types to print information about the node and its contents, see [System.Xml.XmlSignificantWhitespace.NodeType*](https://learn.microsoft.com/search/?terms=System.Xml.XmlSignificantWhitespace.NodeType*).

 For more information on the object hierarchy of the node types and their equivalent object name, see [XML Document Object Model (DOM) Hierarchy](xml-document-object-model-dom-hierarchy.md). For more information on the objects created in the node tree, see [Mapping the Object Hierarchy to XML Data](mapping-the-object-hierarchy-to-xml-data.md).

## See also

- [XML Document Object Model (DOM)](xml-document-object-model-dom.md)
