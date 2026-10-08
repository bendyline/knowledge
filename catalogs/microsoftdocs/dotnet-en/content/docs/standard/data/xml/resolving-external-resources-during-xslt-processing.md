---
description: "Learn more about: Resolving External Resources During XSLT Processing"
title: "Resolving External Resources During XSLT Processing"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 3a59d31c-0ec5-4de6-a2a9-558531c8116e
---
# Resolving External Resources During XSLT Processing

There are several times during an XSLT transformation when you may need to resolve external resources.

## Using the XmlResolver Class

 The [System.Xml.XmlResolver](https://learn.microsoft.com/search/?terms=System.Xml.XmlResolver) class is used to resolve external resources. The following table describes when the [System.Xml.XmlResolver](https://learn.microsoft.com/search/?terms=System.Xml.XmlResolver) becomes involved during XSLT processing.

| XSLT task | What the XmlResolver is used for |
| --- | --- |
| Compile the style sheet. | Resolve the URI of the style sheet.<br /><br /> -and-<br /><br /> Resolve URI references in any `xsl:import` or `xsl:include` elements. |
| Execute the style sheet. | Resolve the URI of the context document.<br /><br /> -and-<br /><br /> Resolve URI references in any XSLT `document()` functions. |

 The [System.Xml.Xsl.XslCompiledTransform.Load*](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform.Load*) and [System.Xml.Xsl.XslCompiledTransform.Transform*](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform.Transform*) methods include overloads that take an [System.Xml.XmlResolver](https://learn.microsoft.com/search/?terms=System.Xml.XmlResolver) object as one of its arguments. If an [System.Xml.XmlResolver](https://learn.microsoft.com/search/?terms=System.Xml.XmlResolver) is not specified, a default [System.Xml.XmlUrlResolver](https://learn.microsoft.com/search/?terms=System.Xml.XmlUrlResolver) with no credentials is used.

 The following list describes when you may want to specify an [System.Xml.XmlResolver](https://learn.microsoft.com/search/?terms=System.Xml.XmlResolver) object:

- If the XSLT process needs to access a network resource that requires authentication, you can use an [System.Xml.XmlResolver](https://learn.microsoft.com/search/?terms=System.Xml.XmlResolver) with the necessary credentials.

- If you want to restrict the resources that the XSLT process can access, you can use an [System.Xml.XmlSecureResolver](https://learn.microsoft.com/search/?terms=System.Xml.XmlSecureResolver) with the correct permission set. Use the [System.Xml.XmlSecureResolver](https://learn.microsoft.com/search/?terms=System.Xml.XmlSecureResolver) class if you need to open a resource that you do not control, or that is untrusted.

- If you want to customize behavior, you can implement your own [System.Xml.XmlResolver](https://learn.microsoft.com/search/?terms=System.Xml.XmlResolver) class and use it to resolve resources.

- If you want to ensure that no external resources are accessed, you can specify `null` for the [System.Xml.XmlResolver](https://learn.microsoft.com/search/?terms=System.Xml.XmlResolver) argument.

## Example

 The following example compiles a style sheet that is stored on a network resource. An [System.Xml.XmlUrlResolver](https://learn.microsoft.com/search/?terms=System.Xml.XmlUrlResolver) object specifies the credentials necessary to access the style sheet.

 [XslCompiledTransform.Load#11 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XslCompiledTransform.Load/CS/Xslt_Load_v2.cs#11)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XslCompiledTransform.Load/CS/Xslt_Load_v2.cs.md)
 [XslCompiledTransform.Load#11 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XslCompiledTransform.Load/VB/Xslt_Load_v2.vb#11)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XslCompiledTransform.Load/VB/Xslt_Load_v2.vb.md)

## See also

- [System.Xml.Xsl.XslCompiledTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform)
- [System.Xml.Xsl.XsltSettings](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XsltSettings)
- [XSLT Transformations](xslt-transformations.md)
