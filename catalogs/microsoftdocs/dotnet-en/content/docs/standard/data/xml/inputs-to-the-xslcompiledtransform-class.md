---
description: "Learn more about: Inputs to the XslCompiledTransform Class"
title: "Inputs to the XslCompiledTransform Class"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 834049f1-ab41-449e-9f10-4a1d0701bc48
---
# Inputs to the XslCompiledTransform Class

The [System.Xml.Xsl.XslCompiledTransform.Transform*](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform.Transform*) method accepts three input types for the source document: an object that implements the [System.Xml.XPath.IXPathNavigable](https://learn.microsoft.com/search/?terms=System.Xml.XPath.IXPathNavigable) interface, an [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) object that reads the source document, or a string URI.

> **Note:**
> The [System.Xml.Xsl.XslCompiledTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform) class preserves white space by default. This is in accordance with [section 3.4 of the W3C XSLT 1.0 recommendation](https://www.w3.org/TR/xslt.html#strip).

## IXPathNavigable Interface

 The [System.Xml.XPath.IXPathNavigable](https://learn.microsoft.com/search/?terms=System.Xml.XPath.IXPathNavigable) interface is implemented in the [System.Xml.XmlNode](https://learn.microsoft.com/search/?terms=System.Xml.XmlNode) and [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument) classes. These classes represent an in-memory cache of XML data.

- The [System.Xml.XmlNode](https://learn.microsoft.com/search/?terms=System.Xml.XmlNode) class is based on the W3C Document Object Model (DOM) and includes editing capabilities.

- The [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument) class is a read-only data store based on the XPath data model. [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument) is the recommended class for XSLT processing. It provides faster performance when compared to the [System.Xml.XmlNode](https://learn.microsoft.com/search/?terms=System.Xml.XmlNode) class.

> **Note:**
> Transformations apply to the document as a whole. In other words, if you pass in a node other than the document root node, this does not prevent the transformation process from accessing all nodes in the loaded document. To transform a node fragment, you must create an object containing just the node fragment, and pass that object to the [System.Xml.Xsl.XslCompiledTransform.Transform*](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform.Transform*) method. For more information, see [How to: Transform a Node Fragment](how-to-transform-a-node-fragment.md).

 The following example uses the [System.Xml.Xsl.XslCompiledTransform.Transform*](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform.Transform*) method to transform the books.xml file to the books.html file using the transform.xsl style sheet. The books.xml and transform.xsl files can be found in this topic: [How to: Perform an XSLT Transformation by Using an Assembly](how-to-perform-an-xslt-transformation-by-using-an-assembly.md).

 [XslCompiledTransform.Transform2#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XslCompiledTransform.Transform2/CS/Program.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XslCompiledTransform.Transform2/CS/Program.cs.md)
 [XslCompiledTransform.Transform2#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XslCompiledTransform.Transform2/VB/Module1.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XslCompiledTransform.Transform2/VB/Module1.vb.md)

## XmlReader Object

 The [System.Xml.Xsl.XslCompiledTransform.Transform*](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform.Transform*) method loads from the current node of the [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) through all its children. This enables you to use a portion of a document as the context document. After the [System.Xml.Xsl.XslCompiledTransform.Transform*](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform.Transform*) method returns, the [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) is positioned on the next node after the end of the context document. If the end of the document is reached, the [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) is positioned at the end of file (EOF).

 The following example uses the [System.Xml.Xsl.XslCompiledTransform.Transform*](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform.Transform*) method to transform the books.xml file to the books.html file using the transform.xsl style sheet. The books.xml and transform.xsl files can be found in this topic: [How to: Perform an XSLT Transformation by Using an Assembly](how-to-perform-an-xslt-transformation-by-using-an-assembly.md).

 [XslCompiledTransform.Transform2#2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XslCompiledTransform.Transform2/CS/Program.cs#2)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XslCompiledTransform.Transform2/CS/Program.cs.md)
 [XslCompiledTransform.Transform2#2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XslCompiledTransform.Transform2/VB/Module1.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XslCompiledTransform.Transform2/VB/Module1.vb.md)

## String URI

 You can also specify the source document URI as your XSLT input. An [System.Xml.XmlResolver](https://learn.microsoft.com/search/?terms=System.Xml.XmlResolver) is used to resolve the URI. You can specify the [System.Xml.XmlResolver](https://learn.microsoft.com/search/?terms=System.Xml.XmlResolver) to use by passing it to the [System.Xml.Xsl.XslCompiledTransform.Transform*](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform.Transform*) method. If an [System.Xml.XmlResolver](https://learn.microsoft.com/search/?terms=System.Xml.XmlResolver) is not specified, the [System.Xml.Xsl.XslCompiledTransform.Transform*](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform.Transform*) method uses a default [System.Xml.XmlUrlResolver](https://learn.microsoft.com/search/?terms=System.Xml.XmlUrlResolver) with no credentials.

 The following example uses the [System.Xml.Xsl.XslCompiledTransform.Transform*](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform.Transform*) method to transform the books.xml file to the books.html file using the transform.xsl style sheet. The books.xml and transform.xsl files can be found in this topic: [How to: Perform an XSLT Transformation by Using an Assembly](how-to-perform-an-xslt-transformation-by-using-an-assembly.md).

 [XslCompiledTransform.Transform2#3 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XslCompiledTransform.Transform2/CS/Program.cs#3)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XslCompiledTransform.Transform2/CS/Program.cs.md)
 [XslCompiledTransform.Transform2#3 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XslCompiledTransform.Transform2/VB/Module1.vb#3)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XslCompiledTransform.Transform2/VB/Module1.vb.md)

 For more information, see [Resolving External Resources During XSLT Processing](resolving-external-resources-during-xslt-processing.md).

## See also

- [XSLT Transformations](xslt-transformations.md)
