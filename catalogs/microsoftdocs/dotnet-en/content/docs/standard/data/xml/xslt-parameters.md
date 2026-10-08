---
description: "Learn more about: XSLT Parameters"
title: "XSLT Parameters"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: fe60aaa0-ae43-4b1c-9be1-426af66ba757
---
# XSLT Parameters

XSLT parameters are added to the [System.Xml.Xsl.XsltArgumentList](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XsltArgumentList) using the [System.Xml.Xsl.XsltArgumentList.AddParam*](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XsltArgumentList.AddParam*) method. A qualified name and namespace URI are associated with the parameter object at that time.

### To use an XSLT parameter

1. Create an [System.Xml.Xsl.XsltArgumentList](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XsltArgumentList) object and add the parameter using the [System.Xml.Xsl.XsltArgumentList.AddParam*](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XsltArgumentList.AddParam*) method.

2. Call the parameter from the style sheet.

3. Pass the [System.Xml.Xsl.XsltArgumentList](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XsltArgumentList) object to the [System.Xml.Xsl.XslCompiledTransform.Transform*](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform.Transform*) method.

## Parameter Types

 The parameter object should correspond to a W3C type. The following table shows the corresponding W3C types, the equivalent Microsoft .NET classes (type), and whether the W3C type is an XPath type or XSLT type.

| W3C type | Equivalent .NET class (type) | XPath or XSLT type |
| --- | --- | --- |
| `String` | [System.String](https://learn.microsoft.com/search/?terms=System.String) | XPath |
| `Boolean` | [System.Boolean](https://learn.microsoft.com/search/?terms=System.Boolean) | XPath |
| `Number` | [System.Double](https://learn.microsoft.com/search/?terms=System.Double) | XPath |
| `Result Tree Fragment` | [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) | XSLT |
| `Node*` | [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) | XPath |
| `Node Set` | [System.Xml.XPath.XPathNodeIterator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNodeIterator)<br /><br /> **XPathNavigator[]** | XPath |

 *This is equivalent to a node set that contains a single node.

 If the parameter object is not one of the above classes, it is converted according to the following rules. Common language runtime (CLR) numeric types are converted to [System.Double](https://learn.microsoft.com/search/?terms=System.Double). The [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) type is converted to [System.String](https://learn.microsoft.com/search/?terms=System.String). [System.Xml.XPath.IXPathNavigable](https://learn.microsoft.com/search/?terms=System.Xml.XPath.IXPathNavigable) types are converted to [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator). **XPathNavigator[]** is converted to [System.Xml.XPath.XPathNodeIterator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNodeIterator).

 All other types throw an error.

## Example

 The following example uses the [System.Xml.Xsl.XsltArgumentList.AddParam*](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XsltArgumentList.AddParam*) method to create a parameter to hold calculated discount date. The discount date is calculated to be 20 days from the order date.

 [XSLT_Param#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XSLT_Param/CS/xsltparam.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XSLT_Param/CS/xsltparam.cs.md)
 [XSLT_Param#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XSLT_Param/VB/xsltparam.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XSLT_Param/VB/xsltparam.vb.md)

### Input

##### order.xml

 [XSLT_Param#2 (complete source file; reference: ../../../../samples/snippets/xml/VS_Snippets_Data/XSLT_Param/XML/order.xml#2)](../../../../_code/samples/snippets/xml/VS_Snippets_Data/XSLT_Param/XML/order.xml.md)

##### discount.xsl

 [Code reference unavailable in this source snapshot: ../../../../samples/snippets/xml/VS_Snippets_Data/XSLT_Param/XML/discount.xsl#3](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/standard/data/xml/xslt-parameters.md)

### Output

```xml
<?xml version="1.0" encoding="utf-8"?>
<order>
  <total>36.9</total>
     15% discount if paid by: 2/4/2004 12:00:00 AM
</order>
```

## See also

- [XSLT Transformations](xslt-transformations.md)
