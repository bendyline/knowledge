---
title: "XML Schema (XSD) Validation with XmlSchemaSet"
description: Learn how to validate XML documents against an XML schema definition language (XSD) schema, using an XmlSchemaSet class in .NET.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
---
# XML schema (XSD) validation with XmlSchemaSet

XML documents can be validated against an XML schema definition language (XSD) schema in an [System.Xml.Schema.XmlSchemaSet](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet).

## Validate XML documents

 XML documents are validated by the [System.Xml.XmlReader.Create*](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader.Create*) method of the [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) class. To validate an XML document, construct an [System.Xml.XmlReaderSettings](https://learn.microsoft.com/search/?terms=System.Xml.XmlReaderSettings) object that contains an XML schema definition language (XSD) schema with which to validate the XML document.

> **Note:**
> The [System.Xml.Schema](https://learn.microsoft.com/search/?terms=System.Xml.Schema) namespace contains extension methods that make it easy to validate an XML tree against an XSD file when using [LINQ to XML (C#)](../../linq/linq-xml-overview.md) and [LINQ to XML (Visual Basic)](../../linq/linq-xml-overview.md). For more information on validating XML documents with LINQ to XML, see [How to validate using XSD (LINQ to XML) (C#)](../../linq/validate-xsd.md) and [How to: Validate Using XSD (LINQ to XML) (Visual Basic)](../../linq/validate-xsd.md).

 An individual schema or a set of schemas (as an [System.Xml.Schema.XmlSchemaSet](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet)) can be added to an [System.Xml.Schema.XmlSchemaSet](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet) by passing either one as a parameter to the [System.Xml.Schema.XmlSchemaSet.Add*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet.Add*) method of [System.Xml.Schema.XmlSchemaSet](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet). When validating a document the target namespace of the document must match the target namespace of the schema in the schema set.

 The following is an example XML document.

 [XSDInference Examples #5 (complete source file; reference: ../../../../samples/snippets/xml/VS_Snippets_Data/XSDInference Examples/XML/contosoBooks.xml#5)](<../../../../_code/samples/snippets/xml/VS_Snippets_Data/XSDInference Examples/XML/contosoBooks.xml.md>)

 The following is the schema that validates the example XML document.

 [Code reference unavailable in this source snapshot: ../../../../samples/snippets/xml/VS_Snippets_Data/XSDInference Examples/XML/contosoBooks.xsd#6](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/standard/data/xml/xml-schema-xsd-validation-with-xmlschemaset.md)

 In the code example that follows, the schema above is added to the [System.Xml.XmlReaderSettings.Schemas](https://learn.microsoft.com/search/?terms=System.Xml.XmlReaderSettings.Schemas) property of the [System.Xml.XmlReaderSettings](https://learn.microsoft.com/search/?terms=System.Xml.XmlReaderSettings) object. The [System.Xml.XmlReaderSettings](https://learn.microsoft.com/search/?terms=System.Xml.XmlReaderSettings) object is passed as a parameter to the [System.Xml.XmlReader.Create*](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader.Create*) method of the [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) object, which validates the XML document above.

 The [System.Xml.XmlReaderSettings.ValidationType](https://learn.microsoft.com/search/?terms=System.Xml.XmlReaderSettings.ValidationType) property of the [System.Xml.XmlReaderSettings](https://learn.microsoft.com/search/?terms=System.Xml.XmlReaderSettings) object is set to `Schema` to enforce validation of the XML document by the [System.Xml.XmlReader.Create*](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader.Create*) method of the [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) object. A [System.Xml.Schema.ValidationEventHandler](https://learn.microsoft.com/search/?terms=System.Xml.Schema.ValidationEventHandler) is added to the [System.Xml.XmlReaderSettings](https://learn.microsoft.com/search/?terms=System.Xml.XmlReaderSettings) object to handle any [System.Xml.Schema.XmlSeverityType.Warning](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSeverityType.Warning) or [System.Xml.Schema.XmlSeverityType.Error](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSeverityType.Error) events raised by errors found during the validation process of both the XML document and the schema.
 [XmlSchemaSetOverall Example #1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XmlSchemaSetOverall Example/CS/xmlschemasetexample.cs#1)](<../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XmlSchemaSetOverall Example/CS/xmlschemasetexample.cs.md>)
 [XmlSchemaSetOverall Example #1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XmlSchemaSetOverall Example/VB/xmlschemasetexample.vb#1)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XmlSchemaSetOverall Example/VB/xmlschemasetexample.vb.md>)

## See also

- [XmlSchemaSet for Schema Compilation](xmlschemaset-for-schema-compilation.md)
- [Working with XML Schemas](working-with-xml-schemas.md)
