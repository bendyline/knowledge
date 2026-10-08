---
description: "Learn more about: Editing XML Schemas"
title: "Editing XML Schemas"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
---
# Edit XML schemas

Editing an XML schema is one of the most important features of the Schema Object Model (SOM). All of the pre-schema-compilation properties of the SOM can be used to change the existing values in an XML schema. The XML schema can then be recompiled to reflect the changes.

The first step in editing a schema loaded into the SOM is to traverse the schema. You should be familiar with traversing a schema using the SOM API before you attempt to edit a schema. You should also be familiar with the pre- and post-schema-compilation properties of the Post-Schema-Compilation-Infoset (PSCI).

## Editing an XML Schema

In this section, two code examples are provided, both of which edit the customer schema created in the [Building XML Schemas](building-xml-schemas.md) topic. The first code example adds a new `PhoneNumber` element to the `Customer` element and the second code example adds a new `Title` attribute to the `FirstName` element. The first sample also uses the post-schema-compilation [System.Xml.Schema.XmlSchema.Elements*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema.Elements*) collection as the means of traversing the customer schema while the second code example uses the pre-schema-compilation [System.Xml.Schema.XmlSchema.Items*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema.Items*) collection.

### PhoneNumber Element Example

This first code example adds a new `PhoneNumber` element to the `Customer` element of the customer schema. The code example edits the customer schema in the following steps.

1. Adds the customer schema to a new [System.Xml.Schema.XmlSchemaSet](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet) object and then compiles it. Any schema validation warnings and errors encountered reading or compiling the schema are handled by the [System.Xml.Schema.ValidationEventHandler](https://learn.microsoft.com/search/?terms=System.Xml.Schema.ValidationEventHandler) delegate.

2. Retrieves the compiled [System.Xml.Schema.XmlSchema](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema) object from the [System.Xml.Schema.XmlSchemaSet](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet) by iterating over the [System.Xml.Schema.XmlSchemaSet.Schemas](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet.Schemas) property. Because the schema is compiled, Post-Schema-Compilation-Infoset (PSCI) properties are accessible.

3. Creates the `PhoneNumber` element using the [System.Xml.Schema.XmlSchemaElement](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaElement) class, the `xs:string` simple type restriction using the [System.Xml.Schema.XmlSchemaSimpleType](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSimpleType) and [System.Xml.Schema.XmlSchemaSimpleTypeRestriction](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSimpleTypeRestriction) classes, adds a pattern facet to the [System.Xml.Schema.XmlSchemaSimpleTypeRestriction.Facets](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSimpleTypeRestriction.Facets) property of the restriction, and adds the restriction to the [System.Xml.Schema.XmlSchemaSimpleType.Content](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSimpleType.Content) property of the simple type and the simple type to the [System.Xml.Schema.XmlSchemaElement.SchemaType*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaElement.SchemaType*) of the `PhoneNumber` element.

4. Iterates over each [System.Xml.Schema.XmlSchemaElement](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaElement) in the [System.Xml.Schema.XmlSchemaObjectTable.Values*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaObjectTable.Values*) collection of the post-schema-compilation [System.Xml.Schema.XmlSchema.Elements*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema.Elements*) collection.

5. If the [System.Xml.Schema.XmlSchemaElement.QualifiedName*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaElement.QualifiedName*) of the element is `"Customer"`, gets the complex type of the `Customer` element using the [System.Xml.Schema.XmlSchemaComplexType](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaComplexType) class and the sequence particle of the complex type using the [System.Xml.Schema.XmlSchemaSequence](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSequence) class.

6. Adds the new `PhoneNumber` element to the sequence containing the existing `FirstName` and `LastName` elements using the pre-schema-compilation [System.Xml.Schema.XmlSchemaSequence.Items*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSequence.Items*) collection of the sequence.

7. Finally, reprocesses and compiles the modified [System.Xml.Schema.XmlSchema](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema) object using the [System.Xml.Schema.XmlSchemaSet.Reprocess*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet.Reprocess*) and [System.Xml.Schema.XmlSchemaSet.Compile*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet.Compile*) methods of the [System.Xml.Schema.XmlSchemaSet](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet) class and writes it to the console.

The following is the complete code example.
[XmlSchemaEditExample1#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XmlSchemaEditExample1/CS/XmlSchemaEditExample1.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XmlSchemaEditExample1/CS/XmlSchemaEditExample1.cs.md)
[XmlSchemaEditExample1#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XmlSchemaEditExample1/VB/XmlSchemaEditExample1.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XmlSchemaEditExample1/VB/XmlSchemaEditExample1.vb.md)

The following is the modified customer schema created in the [Building XML Schemas](building-xml-schemas.md) topic.

```xml
<?xml version="1.0" encoding="utf-8"?>
<xs:schema xmlns:tns="http://www.tempuri.org" targetNamespace="http://www.tempuri.org" xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="Customer">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="FirstName" type="xs:string" />
        <xs:element name="LastName" type="tns:LastNameType" />
        <xs:element name="PhoneNumber">           <xs:simpleType>             <xs:restriction base="xs:string">               <xs:pattern value="\d{3}-\d{3}-\d(4)" />             </xs:restriction>           </xs:simpleType>         </xs:element>
      </xs:sequence>
      <xs:attribute name="CustomerId" type="xs:positiveInteger" use="required" />
    </xs:complexType>
  </xs:element>
  <xs:simpleType name="LastNameType">
    <xs:restriction base="xs:string">
      <xs:maxLength value="20" />
    </xs:restriction>
  </xs:simpleType>
</xs:schema>
```

### Title Attribute Example

This second code example, adds a new `Title` attribute to the `FirstName` element of the customer schema. In the first code example, the type of the `FirstName` element is `xs:string`. For the `FirstName` element to have an attribute along with string content, its type must be changed to a complex type with a simple content extension content model.

The code example edits the customer schema in the following steps.

1. Adds the customer schema to a new [System.Xml.Schema.XmlSchemaSet](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet) object and then compiles it. Any schema validation warnings and errors encountered reading or compiling the schema are handled by the [System.Xml.Schema.ValidationEventHandler](https://learn.microsoft.com/search/?terms=System.Xml.Schema.ValidationEventHandler) delegate.

2. Retrieves the compiled [System.Xml.Schema.XmlSchema](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema) object from the [System.Xml.Schema.XmlSchemaSet](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet) by iterating over the [System.Xml.Schema.XmlSchemaSet.Schemas](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet.Schemas) property. Because the schema is compiled, Post-Schema-Compilation-Infoset (PSCI) properties are accessible.

3. Creates a new complex type for the `FirstName` element using the [System.Xml.Schema.XmlSchemaComplexType](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaComplexType) class.

4. Creates a new simple content extension, with a base type of `xs:string`, using the [System.Xml.Schema.XmlSchemaSimpleContent](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSimpleContent) and [System.Xml.Schema.XmlSchemaSimpleContentExtension](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSimpleContentExtension) classes.

5. Creates the new `Title` attribute using the [System.Xml.Schema.XmlSchemaAttribute](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaAttribute) class, with a [System.Xml.Schema.XmlSchemaAttribute.SchemaTypeName*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaAttribute.SchemaTypeName*) of `xs:string` and adds the attribute to the simple content extension.

6. Sets the content model of the simple content to the simple content extension and the content model of the complex type to the simple content.

7. Adds the new complex type to the pre-schema-compilation [System.Xml.Schema.XmlSchema.Items*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema.Items*) collection.

8. Iterates over each [System.Xml.Schema.XmlSchemaObject](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaObject) in the pre-schema-compilation [System.Xml.Schema.XmlSchema.Items*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema.Items*) collection.

> **Note:**
> Because the `FirstName` element is not a global element in the schema, it is not available in the [System.Xml.Schema.XmlSchema.Items*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema.Items*) or [System.Xml.Schema.XmlSchema.Elements*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema.Elements*) collections. The code example locates the `FirstName` element by first locating the `Customer` element.
>
> The first code example traversed the schema using the post-schema-compilation [System.Xml.Schema.XmlSchema.Elements*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema.Elements*) collection. In this sample, the pre-schema-compilation [System.Xml.Schema.XmlSchema.Items*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema.Items*) collection is used to traverse the schema. While both collections provide access to the global elements in the schema, iterating through the [System.Xml.Schema.XmlSchema.Items*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema.Items*) collection is more time consuming because you must iterate over all global elements in the schema and it does not have any PSCI properties. The PSCI collections ([System.Xml.Schema.XmlSchema.Elements*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema.Elements*), [System.Xml.Schema.XmlSchema.Attributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema.Attributes*), [System.Xml.Schema.XmlSchema.SchemaTypes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema.SchemaTypes*), and so on) provide direct access to their global elements, attributes, and types and their PSCI properties.

1. If the [System.Xml.Schema.XmlSchemaObject](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaObject) is an element, whose [System.Xml.Schema.XmlSchemaElement.QualifiedName*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaElement.QualifiedName*) is `"Customer"`, gets the complex type of the `Customer` element using the [System.Xml.Schema.XmlSchemaComplexType](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaComplexType) class and the sequence particle of the complex type using the [System.Xml.Schema.XmlSchemaSequence](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSequence) class.

2. Iterates over each [System.Xml.Schema.XmlSchemaParticle](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaParticle) in the pre-schema-compilation [System.Xml.Schema.XmlSchemaSequence.Items*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSequence.Items*) collection.

3. If the [System.Xml.Schema.XmlSchemaParticle](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaParticle) is an element, who's [System.Xml.Schema.XmlSchemaElement.QualifiedName*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaElement.QualifiedName*) is `"FirstName"`, sets the [System.Xml.Schema.XmlSchemaElement.SchemaTypeName*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaElement.SchemaTypeName*) of the `FirstName` element to the new `FirstName` complex type.

4. Finally, reprocesses and compiles the modified [System.Xml.Schema.XmlSchema](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema) object using the [System.Xml.Schema.XmlSchemaSet.Reprocess*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet.Reprocess*) and [System.Xml.Schema.XmlSchemaSet.Compile*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet.Compile*) methods of the [System.Xml.Schema.XmlSchemaSet](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet) class and writes it to the console.

The following is the complete code example.
[XmlSchemaEditExample2#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XmlSchemaEditExample2/CS/XmlSchemaEditExample2.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XmlSchemaEditExample2/CS/XmlSchemaEditExample2.cs.md)
[XmlSchemaEditExample2#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XmlSchemaEditExample2/VB/XmlSchemaEditExample2.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XmlSchemaEditExample2/VB/XmlSchemaEditExample2.vb.md)

The following is the modified customer schema created in the [Building XML Schemas](building-xml-schemas.md) topic.

```xml
<?xml version="1.0" encoding=" utf-8"?>
<xs:schema xmlns:tns="http://www.tempuri.org" targetNamespace="http://www.tempuri.org" xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="Customer">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="FirstName" type="tns:FirstNameComplexType" />
        <xs:element name="LastName" type="tns:LastNameType" />
      </xs:sequence>
      <xs:attribute name="CustomerId" type="xs:positiveInteger" use="required" />
    </xs:complexType>
  </xs:element>
  <xs:simpleType name="LastNameType">
    <xs:restriction base="xs:string">
      <xs:maxLength value="20" />
    </xs:restriction>
  </xs:simpleType>
  <xs:complexType name="FirstNameComplexType">     <xs:simpleContent>       <xs:extension base="xs:string">         <xs:attribute name="Title" type="xs:string" />       </xs:extension>     </xs:simpleContent>   </xs:complexType>
</xs:schema>
```

## See also

- [XML Schema Object Model Overview](xml-schema-object-model-overview.md)
- [Reading and Writing XML Schemas](reading-and-writing-xml-schemas.md)
- [Building XML Schemas](building-xml-schemas.md)
- [Traversing XML Schemas](traversing-xml-schemas.md)
- [Including or Importing XML Schemas](including-or-importing-xml-schemas.md)
- [XmlSchemaSet for Schema Compilation](xmlschemaset-for-schema-compilation.md)
- [Post-Schema Compilation Infoset](post-schema-compilation-infoset.md)
