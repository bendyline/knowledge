---
description: "Learn more about: How to: Access XML Descendant Elements (Visual Basic)"
title: "How to: Access XML Descendant Elements"
ms.date: 07/20/2015
helpviewer_keywords:
  - "XML descendent axis property [Visual Basic]"
  - "XML axis [Visual Basic], descendent"
  - "descendent axis property [Visual Basic]"
  - "XML [Visual Basic], accessing"
ms.assetid: aabfa258-4112-4e7e-bab9-403f96072ef7
---
# How to: Access XML Descendant Elements (Visual Basic)

This example shows how to use a descendant axis property to access all XML elements that have a specified name and that are contained under an XML element. In particular, it uses the `Value` property to get the value of the first element in the collection that the `name` descendant axis property returns. The `name` descendant axis property gets all elements named `name` that are contained in the `contacts` object. This example also uses the `phone` descendant axis property to access all descendants named `phone` that are contained in the `contacts` object.

## Example

 [VbXMLSamples#31 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbXMLSamples/VB/XMLSamples13.vb#31)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbXMLSamples/VB/XMLSamples13.vb.md)

## Compile the code

 This example requires:

- A reference to the [System.Xml.Linq](https://learn.microsoft.com/search/?terms=System.Xml.Linq) namespace.

## See also

- [System.Xml.Linq.XContainer.Descendants*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XContainer.Descendants*)
- [XML Descendant Axis Property](../../../language-reference/xml-axis/xml-descendant-axis-property.md)
- [XML Value Property](../../../language-reference/xml-axis/xml-value-property.md)
- [Accessing XML in Visual Basic](accessing-xml.md)
- [XML](index.md)
