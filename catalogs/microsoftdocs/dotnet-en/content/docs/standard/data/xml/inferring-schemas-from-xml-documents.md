---
description: "Learn more about: Inferring Schemas from XML Documents"
title: "Inferring Schemas from XML Documents"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
---
# Infer schemas from XML documents

This topic describes how to use the [System.Xml.Schema.XmlSchemaInference](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInference) class to infer an XML Schema definition language (XSD) schema from the structure of an XML document.

## The Schema Inference Process

 The [System.Xml.Schema.XmlSchemaInference](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInference) class of the [System.Xml.Schema](https://learn.microsoft.com/search/?terms=System.Xml.Schema) namespace is used to generate one or more XML Schema definition language (XSD) schemas from the structure of an XML document. The generated schemas may be used to validate the original XML document.

 As an XML document is processed by the [System.Xml.Schema.XmlSchemaInference](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInference) class, the [System.Xml.Schema.XmlSchemaInference](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInference) class makes assumptions about the schema components that describe the elements and attributes in the XML document. The [System.Xml.Schema.XmlSchemaInference](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInference) class also infers schema components in a constrained way by inferring the most restrictive type for a particular element or attribute. As more information about the XML document is gathered, these constraints are loosened by inferring less restrictive types. The least restrictive type that can be inferred is `xs:string`.

 Take, for example, the following piece of an XML document.

```xml
<parent attribute1="6">
    <child>One</child>
    <child>Two</child>
</parent>
<parent attribute1="A" />
```

 In the example above, when the `attribute1` attribute is encountered with a value of `6` by the [System.Xml.Schema.XmlSchemaInference](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInference) process, it is assumed to be of type `xs:unsignedByte`. When the second `parent` element is encountered by the [System.Xml.Schema.XmlSchemaInference](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInference) process, the constraint is loosened by modifying the type to `xs:string` because the value of the `attribute1` attribute is now `A`. Similarly, the `minOccurs` attribute for all the `child` elements inferred in the schema are loosened to `minOccurs="0"` because the second parent element has no child elements.

## Inferring Schemas from XML Documents

 The [System.Xml.Schema.XmlSchemaInference](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInference) class uses two overloaded [System.Xml.Schema.XmlSchemaInference.InferSchema*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInference.InferSchema*) methods to infer a schema from an XML document.

 The first [System.Xml.Schema.XmlSchemaInference.InferSchema*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInference.InferSchema*) method is used to create a schema based on an XML document. The second [System.Xml.Schema.XmlSchemaInference.InferSchema*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInference.InferSchema*) method is used to infer a schema that describes multiple XML documents. For example, you can feed multiple XML documents to the [System.Xml.Schema.XmlSchemaInference.InferSchema*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInference.InferSchema*) method one at a time to produce a schema that describes the entire set of XML documents.

 The first [System.Xml.Schema.XmlSchemaInference.InferSchema*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInference.InferSchema*) method infers a schema from an XML document contained in an [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) object, and returns an [System.Xml.Schema.XmlSchemaSet](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet) object containing the inferred schema. The second [System.Xml.Schema.XmlSchemaInference.InferSchema*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInference.InferSchema*) method searches an [System.Xml.Schema.XmlSchemaSet](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet) object for a schema with the same target namespace as the XML document contained in the [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) object, refines the existing schema, and returns an [System.Xml.Schema.XmlSchemaSet](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet) object containing the inferred schema.

 The changes made to the refined schema are based on new structure found in the XML document. For example, as an XML document is traversed, assumptions are made about the data types found, and the schema is created based on those assumptions. However, if data is encountered on a second inference pass that differs from the original assumption, the schema is refined. The following example illustrates the refinement process.
 [XmlSchemaInferenceExamples#4 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XmlSchemaInferenceExamples/CS/XmlSchemaInferenceExamples.cs#4)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XmlSchemaInferenceExamples/CS/XmlSchemaInferenceExamples.cs.md)
 [XmlSchemaInferenceExamples#4 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XmlSchemaInferenceExamples/VB/XmlSchemaInferenceExamples.vb#4)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XmlSchemaInferenceExamples/VB/XmlSchemaInferenceExamples.vb.md)

 The example takes the following file, `item1.xml`, as its first input.

 [XmlSchemaInferenceExamples#13 (complete source file; reference: ../../../../samples/snippets/xml/VS_Snippets_Data/XmlSchemaInferenceExamples/XML/item1.xml#13)](../../../../_code/samples/snippets/xml/VS_Snippets_Data/XmlSchemaInferenceExamples/XML/item1.xml.md)

 The example then takes the `item2.xml` file as its second input:

 [XmlSchemaInferenceExamples#14 (complete source file; reference: ../../../../samples/snippets/xml/VS_Snippets_Data/XmlSchemaInferenceExamples/XML/item2.xml#14)](../../../../_code/samples/snippets/xml/VS_Snippets_Data/XmlSchemaInferenceExamples/XML/item2.xml.md)

 When the `productID` attribute is encountered in the first XML document, the value of `123456789` is assumed to be an `xs:unsignedInt` type. However, when the second XML document is read and the value of `A53-246` is found, the `xs:unsignedInt` type can no longer be assumed. The schema is refined and the type of `productID` is changed to `xs:string`. In addition, the `minOccurs` attribute for the `supplierID` element is set to `0`, because the second XML document contains no `supplierID` element.

 The following is the schema inferred from the first XML document.

 [XmlSchemaInferenceExamples#15 (complete source file; reference: ../../../../samples/snippets/xml/VS_Snippets_Data/XmlSchemaInferenceExamples/XML/InferSchema1.xml#15)](../../../../_code/samples/snippets/xml/VS_Snippets_Data/XmlSchemaInferenceExamples/XML/InferSchema1.xml.md)

 The following is the schema inferred from the first XML document, refined by the second XML document.

 [XmlSchemaInferenceExamples#16 (complete source file; reference: ../../../../samples/snippets/xml/VS_Snippets_Data/XmlSchemaInferenceExamples/XML/InferSchema2.xml#16)](../../../../_code/samples/snippets/xml/VS_Snippets_Data/XmlSchemaInferenceExamples/XML/InferSchema2.xml.md)

## Inline Schemas

 If an inline XML Schema definition language (XSD) schema is encountered during the [System.Xml.Schema.XmlSchemaInference](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInference) process, an [System.Xml.Schema.XmlSchemaInferenceException](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInferenceException) is thrown. For example, the following inline schema throws an [System.Xml.Schema.XmlSchemaInferenceException](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInferenceException).

```xml
<root xmlns:ex="http://www.contoso.com" xmlns="http://www.tempuri.org">
    <xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" targetNamespace="http://www.contoso.com">
        <xs:element name="Contoso" type="xs:normalizedString" />
    </xs:schema>
    <ex:Contoso>Test</ex:Contoso>
</root>
```

## Schemas that Cannot be Refined

 There are W3C XML Schema constructs that the XML Schema definition language (XSD) schema [System.Xml.Schema.XmlSchemaInference](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInference) process cannot handle if given a type to refine and cause an exception to be thrown. Such as a complex type whose top-level compositor is anything other than a sequence. In the Schema Object Model (SOM), this corresponds to an [System.Xml.Schema.XmlSchemaComplexType](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaComplexType) whose [System.Xml.Schema.XmlSchemaComplexType.Particle](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaComplexType.Particle) property is not an instance of [System.Xml.Schema.XmlSchemaSequence](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSequence).

## See also

- [System.Xml.Schema.XmlSchemaInference](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInference)
- [XML Schema Object Model (SOM)](xml-schema-object-model-som.md)
- [Inferring an XML Schema](inferring-an-xml-schema.md)
- [Rules for Inferring Schema Node Types and Structure](rules-for-inferring-schema-node-types-and-structure.md)
- [Rules for Inferring Simple Types](rules-for-inferring-simple-types.md)
