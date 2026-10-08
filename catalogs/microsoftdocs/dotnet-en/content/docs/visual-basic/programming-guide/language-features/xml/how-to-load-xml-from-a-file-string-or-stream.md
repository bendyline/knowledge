---
description: "Learn more about: How to: Load XML from a File, String, or Stream (Visual Basic)"
title: "How to: Load XML from a File, String, or Stream"
ms.date: 07/20/2015
helpviewer_keywords:
  - "XML [Visual Basic], loading"
  - "LINQ to XML [Visual Basic], loading XML from files"
ms.assetid: 2b02dcec-4cca-4575-b4ad-89ceb87b984c
---
# How to: Load XML from a File, String, or Stream (Visual Basic)

You can create [XML Literals](../../../language-reference/xml-literals/index.md) and populate them with the contents from an external source such as a file, a string, or a stream by using several methods. These methods are shown in the following examples.


> **Note:**
> Your computer might show different names or locations for some of the Visual Studio user interface elements in the following instructions. The Visual Studio edition that you have and the settings that you use determine these elements. For more information, see [Personalizing the IDE](https://learn.microsoft.com/visualstudio/ide/personalizing-the-visual-studio-ide).


## To load XML from a file

To populate an XML literal such as an [System.Xml.Linq.XElement](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement) or [System.Xml.Linq.XDocument](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XDocument) object from a file, use the `Load` method. This method can take a file path, text stream, or XML stream as input.

The following code example shows the use of the [System.Xml.Linq.XDocument.Load%28System.String%29](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XDocument.Load%2528System.String%2529) method to populate an [System.Xml.Linq.XDocument](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XDocument) object with XML from a text file.

[VbXMLSamples#43 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbXMLSamples/VB/XMLSamples15.vb#43)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbXMLSamples/VB/XMLSamples15.vb.md)

## To load XML from a string

To populate an XML literal such as an [System.Xml.Linq.XElement](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement) or [System.Xml.Linq.XDocument](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XDocument) object from a string, you can use the `Parse` method.

The following code example shows the use of the [System.Xml.Linq.XDocument.Parse%28System.String%29](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XDocument.Parse%2528System.String%2529) method to populate an [System.Xml.Linq.XDocument](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XDocument) object with XML from a string.

[VbXMLSamples#47 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbXMLSamples/VB/XMLSamples15.vb#47)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbXMLSamples/VB/XMLSamples15.vb.md)

## To load XML from a stream

To populate an XML literal such as an [System.Xml.Linq.XElement](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement) or [System.Xml.Linq.XDocument](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XDocument) object from a stream, you can use the `Load` method or the [System.Xml.Linq.XNode.ReadFrom*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XNode.ReadFrom*) method.

The following code example shows the use of the [System.Xml.Linq.XNode.ReadFrom*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XNode.ReadFrom*) method to populate an [System.Xml.Linq.XDocument](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XDocument) object with XML from an XML stream.

[VbXMLSamples#46 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbXMLSamples/VB/XMLSamples15.vb#46)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbXMLSamples/VB/XMLSamples15.vb.md)

## See also

- [System.Xml.Linq.XDocument.Load*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XDocument.Load*)
- [System.Xml.Linq.XElement.Load*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement.Load*)
- [System.Xml.Linq.XElement.Parse*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement.Parse*)
- [System.Xml.Linq.XDocument.Parse*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XDocument.Parse*)
- [System.Xml.Linq.XNode.ReadFrom*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XNode.ReadFrom*)
- [XML Literals](../../../language-reference/xml-literals/index.md)
- [XML](index.md)
- [Manipulating XML in Visual Basic](manipulating-xml.md)
