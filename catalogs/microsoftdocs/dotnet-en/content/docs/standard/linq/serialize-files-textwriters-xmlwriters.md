---
title: Serialize to files, TextWriters, and XmlWriters - LINQ to XML
description: You can serialize XML trees to a File, a TextWriter, or an XmlWriter, and you can serialize any XML component, including XDocument and XElement, to a string by using the ToString method.
ms.date: 07/20/2015
ms.topic: how-to
---

# Serialize to files, TextWriters, and XmlWriters (LINQ to XML)

You can serialize XML trees to a [System.IO.File](https://learn.microsoft.com/search/?terms=System.IO.File), a [System.IO.TextWriter](https://learn.microsoft.com/search/?terms=System.IO.TextWriter), or an [System.Xml.XmlWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter).

You can serialize any XML component, including [System.Xml.Linq.XDocument](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XDocument) and [System.Xml.Linq.XElement](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement), to a string by using the `ToString` method.

If you want to suppress formatting when serializing to a string, you can use the [System.Xml.Linq.XNode.ToString*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XNode.ToString*) method.

The default behavior when serializing to a file is to format (indent) the resulting XML document. When you indent, the insignificant white space in the XML tree isn't preserved. To serialize with formatting, use one of the overloads of the following methods that don't take [System.Xml.Linq.SaveOptions](https://learn.microsoft.com/search/?terms=System.Xml.Linq.SaveOptions) as an argument:

- [System.Xml.Linq.XDocument.Save*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XDocument.Save*)
- [System.Xml.Linq.XElement.Save*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement.Save*)

If you want the option not to indent and to preserve the insignificant white space in the XML tree, use one of the overloads of the following methods that takes [System.Xml.Linq.SaveOptions](https://learn.microsoft.com/search/?terms=System.Xml.Linq.SaveOptions) as an argument:

- [System.Xml.Linq.XDocument.Save*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XDocument.Save*)
- [System.Xml.Linq.XElement.Save*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement.Save*)

For examples, see the appropriate reference article.
