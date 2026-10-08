---
description: "Learn more about: Validating an XML Document in the DOM"
title: "Validating an XML Document in the DOM"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
---
# Validate an XML document in the DOM

The[System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) class does not validate the XML in the Document Object Model (DOM) against an XML Schema definition language (XSD) schema or document type definition (DTD) by default; the XML is only verified to be well-formed.

To validate the XML in the DOM, you can validate the XML as it is loaded into the DOM by passing a schema-validating [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) to the [System.Xml.XmlDocument.Load*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.Load*) method of the [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) class, or validate a previously unvalidated XML document in the DOM using the [System.Xml.XmlDocument.Validate*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.Validate*) method of the [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) class.

## Validating an XML Document As It Is Loaded into the DOM

The [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) class validates the XML data as it is loaded into the DOM when a validating [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) is passed to the [System.Xml.XmlDocument.Load*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.Load*) method of the [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) class.

After successful validation, schema defaults are applied, text values are converted to atomic values as necessary, and type information is associated with validated information items. As a result, typed XML data replaces previously untyped XML data.

### Creating an XML Schema-Validating XmlReader

To create an XML schema-validating [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader), follow these steps.

1. Construct a new [System.Xml.XmlReaderSettings](https://learn.microsoft.com/search/?terms=System.Xml.XmlReaderSettings) instance.

2. Add an XML schema to the [System.Xml.XmlReaderSettings.Schemas](https://learn.microsoft.com/search/?terms=System.Xml.XmlReaderSettings.Schemas) property of the [System.Xml.XmlReaderSettings](https://learn.microsoft.com/search/?terms=System.Xml.XmlReaderSettings) instance.

3. Specify `Schema` as the [System.Xml.XmlReaderSettings.ValidationType*](https://learn.microsoft.com/search/?terms=System.Xml.XmlReaderSettings.ValidationType*).

4. Optionally specify [System.Xml.XmlReaderSettings.ValidationFlags*](https://learn.microsoft.com/search/?terms=System.Xml.XmlReaderSettings.ValidationFlags*) and a [System.Xml.XmlReaderSettings.ValidationEventHandler](https://learn.microsoft.com/search/?terms=System.Xml.XmlReaderSettings.ValidationEventHandler) to handle schema validation errors and warnings encountered during validation.

5. Finally, pass the [System.Xml.XmlReaderSettings](https://learn.microsoft.com/search/?terms=System.Xml.XmlReaderSettings) object to the [System.Xml.XmlReader.Create*](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader.Create*) method of the [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) class along with the XML document, creating a schema-validating [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader).

### Example

In the code example that follows, a schema-validating [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) validates the XML data loaded into the DOM. Invalid modifications are made to the XML document and the document is then revalidated, causing schema validation errors. Finally, one of the errors is corrected, and then part of the XML document is partially validated.
[XmlDocumentValidation.Load#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XmlDocumentValidation.Load/CS/XmlDocumentValidationExample.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XmlDocumentValidation.Load/CS/XmlDocumentValidationExample.cs.md)
[XmlDocumentValidation.Load#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XmlDocumentValidation.Load/VB/XmlDocumentValidationExample.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XmlDocumentValidation.Load/VB/XmlDocumentValidationExample.vb.md)

The example takes the `contosoBooks.xml` file as input.

[XPathXMLExamples#2 (complete source file; reference: ../../../../samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/contosoBooks.xml#2)](../../../../_code/samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/contosoBooks.xml.md)

The example also takes the `contosoBooks.xsd` file as input.

[Code reference unavailable in this source snapshot: ../../../../samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/contosoBooks.xsd#3](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/standard/data/xml/validating-an-xml-document-in-the-dom.md)

Consider the following when validating XML data as it is loaded into the DOM.

- In the above example, the [System.Xml.XmlReaderSettings.ValidationEventHandler](https://learn.microsoft.com/search/?terms=System.Xml.XmlReaderSettings.ValidationEventHandler) is called whenever an invalid type is encountered. If a [System.Xml.XmlReaderSettings.ValidationEventHandler](https://learn.microsoft.com/search/?terms=System.Xml.XmlReaderSettings.ValidationEventHandler) is not set on the validating [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader),an [System.Xml.Schema.XmlSchemaValidationException](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidationException) is thrown when [System.Xml.XmlDocument.Load*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.Load*) is called if any attribute or element type does not match the corresponding type specified in the validating schema.

- When an XML document is loaded into an [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object with an associated schema that defines default values, the [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) treats these defaults as if they appeared in the XML document. This means that the [System.Xml.XmlReader.IsEmptyElement](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader.IsEmptyElement) property always returns `false` for an element that was defaulted from the schema. Even if in the XML document, it was written as an empty element.

## Validating an XML Document in the DOM

The [System.Xml.XmlDocument.Validate*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.Validate*) method of the [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) class validates the XML data loaded in the DOM against the schemas in the [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object's [System.Xml.XmlDocument.Schemas](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.Schemas) property. After successful validation, schema defaults are applied, text values are converted to atomic values as necessary, and type information is associated with validated information items. As a result, typed XML data replaces previously untyped XML data.

The example below is similar to the example in "Validating an XML Document As It Is Loaded into the DOM" above. In this example, the XML document is not validated as it is loaded into the DOM, but rather is validated after it has been loaded into the DOM using the [System.Xml.XmlDocument.Validate*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.Validate*) method of the [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) class. The [System.Xml.XmlDocument.Validate*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.Validate*) method validates the XML document against the XML schemas contained in the [System.Xml.XmlDocument.Schemas](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.Schemas) property of the [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument). Invalid modifications are then made to the XML document, and the document is then revalidated, causing schema validation errors. Finally, one of the errors is corrected, and then part of the XML document is partially validated.

[XmlDocumentValidation.Validate#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XmlDocumentValidation.Validate/CS/XmlDocumentValidationExample.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XmlDocumentValidation.Validate/CS/XmlDocumentValidationExample.cs.md)
[XmlDocumentValidation.Validate#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XmlDocumentValidation.Validate/VB/XmlDocumentValidationExample.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XmlDocumentValidation.Validate/VB/XmlDocumentValidationExample.vb.md)

The example takes as input the `contosoBooks.xml` and `contosoBooks.xsd` files referred to in "Validating an XML Document as it is Loaded into the DOM" above.

## Handling Validation Errors and Warnings

XML schema validation errors are reported when validating XML data loaded in the DOM. You are notified about all schema validation errors found while validating the XML data as it is being loaded, or when validating a previously unvalidated XML document.

Validation errors are handled by the [System.Xml.Schema.ValidationEventHandler](https://learn.microsoft.com/search/?terms=System.Xml.Schema.ValidationEventHandler). If a [System.Xml.Schema.ValidationEventHandler](https://learn.microsoft.com/search/?terms=System.Xml.Schema.ValidationEventHandler) was assigned to the [System.Xml.XmlReaderSettings](https://learn.microsoft.com/search/?terms=System.Xml.XmlReaderSettings) instance, or passed to the [System.Xml.XmlDocument.Validate*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.Validate*) method of the [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) class, the [System.Xml.Schema.ValidationEventHandler](https://learn.microsoft.com/search/?terms=System.Xml.Schema.ValidationEventHandler) will handle schema validation errors; otherwise an [System.Xml.Schema.XmlSchemaValidationException](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidationException) is raised when a schema validation error is encountered.

> **Note:**
> The XML data is loaded into the DOM despite schema validation errors unless your [System.Xml.Schema.ValidationEventHandler](https://learn.microsoft.com/search/?terms=System.Xml.Schema.ValidationEventHandler) raises an exception to stop the process.
>
> Schema validation warnings are not reported unless the [System.Xml.Schema.XmlSchemaValidationFlags.ReportValidationWarnings](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidationFlags.ReportValidationWarnings) flag is specified to the [System.Xml.XmlReaderSettings](https://learn.microsoft.com/search/?terms=System.Xml.XmlReaderSettings) object.

 For examples illustrating the [System.Xml.Schema.ValidationEventHandler](https://learn.microsoft.com/search/?terms=System.Xml.Schema.ValidationEventHandler), see "Validating an XML Document As It Is Loaded into the DOM" and "Validating an XML Document in the DOM" above.

## See also

- [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument)
- [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader)
- [System.Xml.Schema.ValidationEventHandler](https://learn.microsoft.com/search/?terms=System.Xml.Schema.ValidationEventHandler)
- [System.Xml.XmlReaderSettings](https://learn.microsoft.com/search/?terms=System.Xml.XmlReaderSettings)
- [Process XML Data Using the DOM Model](process-xml-data-using-the-dom-model.md)
- [Working with XML Schemas](working-with-xml-schemas.md)
