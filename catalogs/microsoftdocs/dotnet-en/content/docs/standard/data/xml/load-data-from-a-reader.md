---
description: "Learn more about: Load Data from a Reader"
title: "Load Data from a Reader"
ms.date: "03/30/2017"
ms.assetid: 7e74918c-bc72-4977-a49b-e1520a6d8f60
---
# Load Data from a Reader

If an XML document is loaded using the [System.Xml.XmlDocument.Load*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.Load*) method and a parameter of an [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader), there are differences in the behavior that occurs when compared to the behavior of loading data from the other formats. If the reader is in its initial state, [System.Xml.XmlDocument.Load*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.Load*) consumes the entire contents from the reader and builds the XML Document Object Model (DOM) from all the data in the reader.

 If the reader is already positioned on a node somewhere in the document, and the reader is then passed to the [System.Xml.XmlDocument.Load*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.Load*) method, [System.Xml.XmlDocument.Load*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.Load*) attempts to read the current node and all of its siblings, up to the end tag that closes the current depth into memory. The success of the attempted [System.Xml.XmlDocument.Load*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.Load*) depends on the node that the reader is on when the load is attempted, as [System.Xml.XmlDocument.Load*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.Load*) verifies that the XML from the reader is well-formed. If the XML is not well-formed, the [System.Xml.XmlDocument.Load*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.Load*) throws an exception. For example, the following set of nodes contain two root-level elements, the XML is not well-formed, and [System.Xml.XmlDocument.Load*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.Load*) throws an exception.

- Comment node, followed by an Element node, followed by an Element node, followed by an EndElement node.

 The following set of nodes creates an incomplete DOM, because there is no root-level element.

- Comment node followed by a ProcessingInstruction node followed by a Comment node followed by an EndElement node.

 This does not throw an exception, and the data is loaded. You can add a root element to the top of these nodes and create well-formed XML that can be saved without error.

 If the reader is positioned on a leaf node that is invalid for the root level of a document (for example, a white space or attribute node), the reader continues to read until it is positioned on a node that can be used for the root. The document begins loading at this point.

 By default, [System.Xml.XmlDocument.Load*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.Load*) does not verify whether the XML is valid using document type definition (DTD) or schema validation. It only verifies whether the XML is well-formed. In order for validation to occur, you need to create an [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) using the [System.Xml.XmlReaderSettings](https://learn.microsoft.com/search/?terms=System.Xml.XmlReaderSettings) class. The [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) class can enforce validation using a DTD or Schema definition language (XSD) schema. The [System.Xml.ValidationType](https://learn.microsoft.com/search/?terms=System.Xml.ValidationType) property on the [System.Xml.XmlReaderSettings](https://learn.microsoft.com/search/?terms=System.Xml.XmlReaderSettings) class determines whether the [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) instance enforces validation. For more information about validating XML data, see the Remarks section of the [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) reference page.

## See also

- [XML Document Object Model (DOM)](xml-document-object-model-dom.md)
