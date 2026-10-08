---
description: "Learn more about: How to: Transform a Node Fragment"
title: "How to: Transform a Node Fragment"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 73a6c582-b9d7-4fa7-9a05-6d931e1f3de8
---
# How to: Transform a Node Fragment

When you transform data contained in an [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) or [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument) object the XSLT transformations apply to a document as a whole. In other words, if you pass in a node other than the document root node, this does not prevent the transformation process from accessing all nodes in the loaded document. To transform a node fragment, you must create a separate object containing just the node fragment, and pass that object to the [System.Xml.Xsl.XslCompiledTransform.Transform*](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform.Transform*) method.

## Procedures

#### To transform a node fragment

1. Create an object containing the source document.

2. Locate the node fragment you wish to transform.

3. Create separate object with just the node fragment.

4. Pass the node fragment to the [System.Xml.Xsl.XslCompiledTransform.Transform*](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform.Transform*) method.

## Example

 The following example transforms a node fragment and outputs the results to the console.

 [XSLT_NodeFrag#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XSLT_NodeFrag/CS/xslt_frag.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XSLT_NodeFrag/CS/xslt_frag.cs.md)
 [XSLT_NodeFrag#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XSLT_NodeFrag/VB/xslt_frag.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XSLT_NodeFrag/VB/xslt_frag.vb.md)

### Input

##### books.xml

 [XML_Core_Files#1 (complete source file; reference: ../../../../samples/snippets/xml/VS_Snippets_Data/XML_Core_Files/XML/books.xml#1)](../../../../_code/samples/snippets/xml/VS_Snippets_Data/XML_Core_Files/XML/books.xml.md)

##### single.xsl

 [Code reference unavailable in this source snapshot: ../../../../samples/snippets/xml/VS_Snippets_Data/XSLT_NodeFrag/XML/single.xsl#2](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/standard/data/xml/how-to-transform-a-node-fragment.md)

### Output

 Book title is The Confidence Man.

## See also

- [Using the XslCompiledTransform Class](using-the-xslcompiledtransform-class.md)
