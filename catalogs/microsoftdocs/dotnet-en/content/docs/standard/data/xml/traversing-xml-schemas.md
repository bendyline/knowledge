---
description: "Learn more about: Traversing XML Schemas"
title: "Traversing XML Schemas"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
---
# Traverse XML schemas

Traversing an XML schema using the Schema Object Model (SOM) API provides access to the elements, attributes, and types stored in the SOM. Traversing an XML schema loaded into the SOM is also the first step in editing an XML schema using the SOM API.

## Traversing an XML Schema

The following properties of the [System.Xml.Schema.XmlSchema](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema) class provide access to the collection of all global items added to the XML schema.

| Property | Object type stored in the collection or array |
| --- | --- |
| [System.Xml.Schema.XmlSchema.Elements*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema.Elements*) | [System.Xml.Schema.XmlSchemaElement](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaElement) |
| [System.Xml.Schema.XmlSchema.Attributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema.Attributes*) | [System.Xml.Schema.XmlSchemaAttribute](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaAttribute) |
| [System.Xml.Schema.XmlSchema.AttributeGroups*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema.AttributeGroups*) | [System.Xml.Schema.XmlSchemaAttributeGroup](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaAttributeGroup) |
| [System.Xml.Schema.XmlSchema.Groups*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema.Groups*) | [System.Xml.Schema.XmlSchemaGroup](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaGroup) |
| [System.Xml.Schema.XmlSchema.Includes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema.Includes*) | [System.Xml.Schema.XmlSchemaExternal](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaExternal), [System.Xml.Schema.XmlSchemaInclude](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInclude), [System.Xml.Schema.XmlSchemaImport](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaImport), or [System.Xml.Schema.XmlSchemaRedefine](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaRedefine) |
| [System.Xml.Schema.XmlSchema.Items*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema.Items*) | [System.Xml.Schema.XmlSchemaObject](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaObject) (provides access to all global level elements, attributes, and types). |
| [System.Xml.Schema.XmlSchema.Notations*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema.Notations*) | [System.Xml.Schema.XmlSchemaNotation](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaNotation) |
| [System.Xml.Schema.XmlSchema.SchemaTypes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema.SchemaTypes*) | [System.Xml.Schema.XmlSchemaType](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaType), [System.Xml.Schema.XmlSchemaSimpleType](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSimpleType), [System.Xml.Schema.XmlSchemaComplexType](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaComplexType) |
| [System.Xml.Schema.XmlSchema.UnhandledAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema.UnhandledAttributes*) | [System.Xml.XmlAttribute](https://learn.microsoft.com/search/?terms=System.Xml.XmlAttribute) (provides access to attributes that do not belong to the schema namespace) |

> **Note:**
> All of the properties listed in the table above, except for the [System.Xml.Schema.XmlSchema.Items](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema.Items) property, are Post-Schema-Compilation-Infoset (PSCI) properties that are not available until the schema has been compiled. The [System.Xml.Schema.XmlSchema.Items](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema.Items) property is a pre-schema-compilation property that can be used before the schema has been compiled to access and edit all global level elements, attributes, and types.
>
> The [System.Xml.Schema.XmlSchema.UnhandledAttributes](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema.UnhandledAttributes) property provides access to all the attributes that do not belong to the schema namespace. These attributes are not processed by the schema processor.

The code example that follows demonstrates traversing the customer schema created in the [Building XML Schemas](building-xml-schemas.md) topic. The code example demonstrates traversing the schema using the collections described above and writes all the elements and attributes in the schema to the console.

The sample traverses the customer schema in the following steps.

1. Adds the customer schema to a new [System.Xml.Schema.XmlSchemaSet](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet) object and then compiles it. Any schema validation warnings and errors encountered reading or compiling the schema are handled by the [System.Xml.Schema.ValidationEventHandler](https://learn.microsoft.com/search/?terms=System.Xml.Schema.ValidationEventHandler) delegate.

2. Retrieves the compiled [System.Xml.Schema.XmlSchema](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema) object from the [System.Xml.Schema.XmlSchemaSet](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet) by iterating over the [System.Xml.Schema.XmlSchemaSet.Schemas](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet.Schemas) property. Because the schema is compiled, Post-Schema-Compilation-Infoset (PSCI) properties are accessible.

3. Iterates over each [System.Xml.Schema.XmlSchemaElement](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaElement) in the [System.Xml.Schema.XmlSchemaObjectTable.Values*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaObjectTable.Values*) collection of the post-schema-compilation [System.Xml.Schema.XmlSchema.Elements*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema.Elements*) collection writing the name of each element to the console.

4. Gets the complex type of the `Customer` element using the [System.Xml.Schema.XmlSchemaComplexType](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaComplexType) class.

5. If the complex type has any attributes, gets an [System.Collections.IDictionaryEnumerator](https://learn.microsoft.com/search/?terms=System.Collections.IDictionaryEnumerator) to enumerate over each [System.Xml.Schema.XmlSchemaAttribute](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaAttribute) and writes its name to the console.

6. Gets the sequence particle of the complex type using the [System.Xml.Schema.XmlSchemaSequence](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSequence) class.

7. Iterates over each [System.Xml.Schema.XmlSchemaElement](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaElement) in the [System.Xml.Schema.XmlSchemaSequence.Items*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSequence.Items*) collection writing the name of each child element to the console.

The following is the complete code example.
[XmlSchemaTraverseExample#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XmlSchemaTraverseExample/CS/XmlSchemaTraverseExample.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XmlSchemaTraverseExample/CS/XmlSchemaTraverseExample.cs.md)
[XmlSchemaTraverseExample#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XmlSchemaTraverseExample/VB/XmlSchemaTraverseExample.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XmlSchemaTraverseExample/VB/XmlSchemaTraverseExample.vb.md)

The [System.Xml.Schema.XmlSchemaElement.ElementSchemaType](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaElement.ElementSchemaType) property can be [System.Xml.Schema.XmlSchemaSimpleType](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSimpleType), or [System.Xml.Schema.XmlSchemaComplexType](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaComplexType) if it is a user-defined simple type or a complex type. It can also be [System.Xml.Schema.XmlSchemaDatatype](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaDatatype) if it is one of the built-in datatypes defined in the W3C XML Schema Recommendation. In the customer schema, the [System.Xml.Schema.XmlSchemaElement.ElementSchemaType*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaElement.ElementSchemaType*) of the `Customer` element is [System.Xml.Schema.XmlSchemaComplexType](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaComplexType), and the `FirstName` and `LastName` elements are [System.Xml.Schema.XmlSchemaSimpleType](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSimpleType).

The code example in the [Building XML Schemas](building-xml-schemas.md) topic used the [System.Xml.Schema.XmlSchemaComplexType.Attributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaComplexType.Attributes*) collection to add the attribute `CustomerId` to the `Customer` element. This is a pre-schema-compilation property. The corresponding Post-Schema-Compilation-Infoset property is the [System.Xml.Schema.XmlSchemaComplexType.AttributeUses*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaComplexType.AttributeUses*) collection, which holds all the attributes of the complex type, including the ones that are inherited through type derivation.

## See also

- [XML Schema Object Model Overview](xml-schema-object-model-overview.md)
- [Reading and Writing XML Schemas](reading-and-writing-xml-schemas.md)
- [Building XML Schemas](building-xml-schemas.md)
- [Editing XML Schemas](editing-xml-schemas.md)
- [Including or Importing XML Schemas](including-or-importing-xml-schemas.md)
- [XmlSchemaSet for Schema Compilation](xmlschemaset-for-schema-compilation.md)
- [Post-Schema Compilation Infoset](post-schema-compilation-infoset.md)
