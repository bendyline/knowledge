---
description: "Learn more about: Post-Schema Compilation Infoset"
title: "Post-Schema Compilation Infoset"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
---
# Post-schema compilation infoset

The [World Wide Web Consortium (W3C) XML Schema Recommendation](https://www.w3.org/XML/Schema) discusses the information set (infoset) that must be exposed for pre-schema validation and post-schema compilation. The XML Schema Object Model (SOM) views this exposure before and after the [System.Xml.Schema.XmlSchemaSet.Compile*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet.Compile*) method of the [System.Xml.Schema.XmlSchemaSet](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet) is called.

 The pre-schema validation infoset is built during the editing of the schema. The post-schema compilation infoset is generated after the [System.Xml.Schema.XmlSchemaSet.Compile*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet.Compile*) method of the [System.Xml.Schema.XmlSchemaSet](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet) is called, during compilation of the schema, and is exposed as properties.

 The SOM is the object model that represents the pre-schema validation and post-schema compilation infosets; it consists of the classes in the [System.Xml.Schema](https://learn.microsoft.com/search/?terms=System.Xml.Schema) namespace. All read and write properties of classes in the [System.Xml.Schema](https://learn.microsoft.com/search/?terms=System.Xml.Schema) namespace belong to the pre-schema validation infoset, while all read-only properties of classes in the [System.Xml.Schema](https://learn.microsoft.com/search/?terms=System.Xml.Schema) namespace belong to the post-schema compilation infoset. The exception to this rule are the following properties, which are both pre-schema validation infoset and post-schema compilation infoset properties.

| Class | Property |
| --- | --- |
| [System.Xml.Schema.XmlSchemaObject](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaObject) | [System.Xml.Schema.XmlSchemaObject.Parent*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaObject.Parent*) |
| [System.Xml.Schema.XmlSchema](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema) | [System.Xml.Schema.XmlSchema.AttributeFormDefault*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema.AttributeFormDefault*), [System.Xml.Schema.XmlSchema.BlockDefault*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema.BlockDefault*), [System.Xml.Schema.XmlSchema.ElementFormDefault*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema.ElementFormDefault*), [System.Xml.Schema.XmlSchema.FinalDefault*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema.FinalDefault*), [System.Xml.Schema.XmlSchema.TargetNamespace*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema.TargetNamespace*) |
| [System.Xml.Schema.XmlSchemaExternal](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaExternal) | [System.Xml.Schema.XmlSchemaExternal.Schema*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaExternal.Schema*) |
| [System.Xml.Schema.XmlSchemaAttributeGroup](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaAttributeGroup) | [System.Xml.Schema.XmlSchemaAttributeGroup.AnyAttribute*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaAttributeGroup.AnyAttribute*) |
| [System.Xml.Schema.XmlSchemaParticle](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaParticle) | [System.Xml.Schema.XmlSchemaParticle.MaxOccurs*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaParticle.MaxOccurs*), [System.Xml.Schema.XmlSchemaParticle.MinOccurs*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaParticle.MinOccurs*) |
| [System.Xml.Schema.XmlSchemaComplexType](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaComplexType) | [System.Xml.Schema.XmlSchemaComplexType.AnyAttribute*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaComplexType.AnyAttribute*) |

 For example, the [System.Xml.Schema.XmlSchemaElement](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaElement) and [System.Xml.Schema.XmlSchemaComplexType](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaComplexType) classes both have `BlockResolved` and `FinalResolved` properties. These properties are used to hold the values for the `Block` and `Final` properties after the schema has been compiled and validated. `BlockResolved` and `FinalResolved` are read-only properties that are part of the post-schema compilation infoset.

 The following example shows the [System.Xml.Schema.XmlSchemaElement.ElementSchemaType](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaElement.ElementSchemaType) property of the [System.Xml.Schema.XmlSchemaElement](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaElement) class set after validating the schema. Before validation, the property contains a `null` reference, and the [System.Xml.Schema.XmlSchemaElement.SchemaTypeName*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaElement.SchemaTypeName*) is set to the name of the type in question. After validation, the [System.Xml.Schema.XmlSchemaElement.SchemaTypeName*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaElement.SchemaTypeName*) is resolved to a valid type, and the type object is available through the [System.Xml.Schema.XmlSchemaElement.ElementSchemaType](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaElement.ElementSchemaType) property.
 [PsciSample#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/PsciSample/CS/PsciSample.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/PsciSample/CS/PsciSample.cs.md)
 [PsciSample#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/PsciSample/VB/PsciSample.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/PsciSample/VB/PsciSample.vb.md)

## See also

- [XML Schema Object Model (SOM)](xml-schema-object-model-som.md)
