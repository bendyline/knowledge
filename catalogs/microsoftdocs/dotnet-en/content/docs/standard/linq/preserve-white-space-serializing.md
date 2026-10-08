---
title: Preserve white space while serializing - LINQ to XML
description: You can control white space in various ways when serializing an XML tree.
ms.date: 07/20/2015
ms.topic: how-to
---

# Preserve white space while serializing (LINQ to XML)

This article describes how to control white space when serializing an XML tree.

A common scenario is to read indented XML, create an in-memory XML tree without any white space text nodes (that is, not preserving white space), do some operations on the XML, and then save the XML with indentation. When you serialize the XML with formatting, only significant white space in the XML tree is preserved. This is the default behavior for LINQ to XML.

Another common scenario is to read and modify XML that has already been intentionally indented. You might not want to change this indentation in any way. To do this in LINQ to XML, you preserve white space when you load or parse the XML and disable formatting when you serialize the XML.

## White-space behavior of methods that serialize XML trees

The following methods in the [System.Xml.Linq.XElement](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement) and [System.Xml.Linq.XDocument](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XDocument) classes serialize an XML tree. You can serialize an XML tree to a file, a [System.IO.TextReader](https://learn.microsoft.com/search/?terms=System.IO.TextReader), or an [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader). The `ToString` method serializes to a string.

- [System.Xml.Linq.XElement.Save*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement.Save*)
- [System.Xml.Linq.XDocument.Save*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XDocument.Save*)
- [XElement.ToString()](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XNode.ToString*)
- [XDocument.ToString()](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XNode.ToString*)

If the method doesn't take [System.Xml.Linq.SaveOptions](https://learn.microsoft.com/search/?terms=System.Xml.Linq.SaveOptions) as an argument, then the method will format (indent) the serialized XML. In this case, all insignificant white space in the XML tree is discarded.

If the method does take [System.Xml.Linq.SaveOptions](https://learn.microsoft.com/search/?terms=System.Xml.Linq.SaveOptions) as an argument, then you can specify that the method not format (indent) the serialized XML. In this case, all white space in the XML tree is preserved.

## Roundtripping XML with carriage return entities

The whitespace preservation discussed in this article is different from XML roundtripping. When XML contains carriage return entities (`&#xD;`), LINQ to XML's standard serialization might not preserve them in a way that allows perfect roundtripping.

Consider the following example XML that contains carriage return entities:

```xml
<x xml:space="preserve">a&#xD;
b
c&#xD;</x>
```

When you parse this XML with `XDocument.Parse()`, the root element's value becomes `"a\r\nb\nc\r"`. However, if you reserialize it using LINQ to XML methods, the carriage returns are not entitized:

[language="csharp" source="snippets/preserve-white-space-serializing/RoundtrippingProblem.cs" Id="XmlRoundTrip"::: (complete source file; reference: snippets/preserve-white-space-serializing/RoundtrippingProblem.cs)](../../../_code/docs/standard/linq/snippets/preserve-white-space-serializing/RoundtrippingProblem.cs.md)

The values are different: the original was `"a\r\nb\nc\r"` but after roundtripping it becomes `"a\nb\nc\n"`.

### Solution: Use XmlWriter with NewLineHandling.Entitize

To achieve true XML roundtripping that preserves carriage return entities, use [System.Xml.XmlWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter) with [System.Xml.XmlWriterSettings.NewLineHandling](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriterSettings.NewLineHandling) set to [System.Xml.NewLineHandling.Entitize](https://learn.microsoft.com/search/?terms=System.Xml.NewLineHandling.Entitize):

[language="csharp" source="snippets/preserve-white-space-serializing/RoundtrippingSolution.cs" Id="XmlRoundTripFix"::: (complete source file; reference: snippets/preserve-white-space-serializing/RoundtrippingSolution.cs)](../../../_code/docs/standard/linq/snippets/preserve-white-space-serializing/RoundtrippingSolution.cs.md)

When you need to preserve carriage return entities for XML roundtripping, use [System.Xml.XmlWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter) with the appropriate [System.Xml.XmlWriterSettings](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriterSettings) instead of LINQ to XML's built-in serialization methods.

For more information about [System.Xml.XmlWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter) and its settings, see [System.Xml.XmlWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter).
