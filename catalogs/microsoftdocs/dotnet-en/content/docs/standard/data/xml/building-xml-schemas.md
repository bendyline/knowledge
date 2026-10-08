---
description: "Learn more about: Building XML Schemas"
title: "Building XML Schemas"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
---
# Build XML schemas

The classes in the [System.Xml.Schema](https://learn.microsoft.com/search/?terms=System.Xml.Schema) namespace map to the structures defined in the World Wide Web Consortium (W3C) XML Schema Recommendation and can be used to build XML schemas in-memory.

## Building an XML Schema

 In the code examples that follow, the SOM API is used to build a customer XML schema in-memory.

### Creating Element and Attributes

 The code examples build the customer schema from the bottom up, creating the child elements, attributes, and their corresponding types first, and then the top-level elements.

 In the following code example, the `FirstName` and `LastName` elements, as well as the `CustomerId` attribute of the customer schema are created using the [System.Xml.Schema.XmlSchemaElement](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaElement) and [System.Xml.Schema.XmlSchemaAttribute](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaAttribute) classes of the SOM. Apart from the [System.Xml.Schema.XmlSchemaElement.Name](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaElement.Name) properties of the [System.Xml.Schema.XmlSchemaElement](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaElement) and [System.Xml.Schema.XmlSchemaAttribute](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaAttribute) classes, which correspond to the "name" attribute of the `<xs:element />` and `<xs:attribute />` elements in an XML schema, all other attributes allowed by the schema (`defaultValue`, `fixedValue`, `form`, and so on) have corresponding properties in the [System.Xml.Schema.XmlSchemaElement](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaElement) and [System.Xml.Schema.XmlSchemaAttribute](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaAttribute) classes.
 [XmlSchemaCreateExample#2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XmlSchemaCreateExample/CS/XmlSchemaCreateExample.cs#2)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XmlSchemaCreateExample/CS/XmlSchemaCreateExample.cs.md)
 [XmlSchemaCreateExample#2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XmlSchemaCreateExample/VB/XmlSchemaCreateExample.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XmlSchemaCreateExample/VB/XmlSchemaCreateExample.vb.md)

### Creating Schema Types

 The content of elements and attributes is defined by their types. To create elements and attributes whose types are one of the built-in schema types, the [System.Xml.Schema.XmlSchemaElement.SchemaTypeName](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaElement.SchemaTypeName) property of the [System.Xml.Schema.XmlSchemaElement](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaElement) or [System.Xml.Schema.XmlSchemaAttribute](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaAttribute) classes are set with the corresponding qualified name of the built-in type using the [System.Xml.XmlQualifiedName](https://learn.microsoft.com/search/?terms=System.Xml.XmlQualifiedName) class. To create a user-defined type for elements and attributes, a new simple or complex type is created using the [System.Xml.Schema.XmlSchemaSimpleType](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSimpleType) or [System.Xml.Schema.XmlSchemaComplexType](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaComplexType) class.

> **Note:**
> To create unnamed simple or complex types that are anonymous children of an element or attribute (only simple types apply for attributes), set the [System.Xml.Schema.XmlSchemaElement.SchemaType](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaElement.SchemaType) property of the [System.Xml.Schema.XmlSchemaElement](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaElement) or [System.Xml.Schema.XmlSchemaAttribute](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaAttribute) classes to the unnamed simple or complex type, instead of the [System.Xml.Schema.XmlSchemaElement.SchemaTypeName](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaElement.SchemaTypeName) property of the [System.Xml.Schema.XmlSchemaElement](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaElement) or [System.Xml.Schema.XmlSchemaAttribute](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaAttribute) classes.

 XML schemas allow both anonymous and named simple types to be derived by restriction from other simple types (built-in or user-defined) or constructed as a list or union of other simple types. The [System.Xml.Schema.XmlSchemaSimpleTypeRestriction](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSimpleTypeRestriction) class is used to create a simple type by restricting the built-in `xs:string` type. You can also use the [System.Xml.Schema.XmlSchemaSimpleTypeList](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSimpleTypeList) or [System.Xml.Schema.XmlSchemaSimpleTypeUnion](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSimpleTypeUnion) classes to create list or union types. The [System.Xml.Schema.XmlSchemaSimpleType.Content](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSimpleType.Content) property denotes whether it is a simple type restriction, list, or union.

 In the following code example, the `FirstName` element's type is the built-in type `xs:string`, the `LastName` element's type is a named simple type that is a restriction of the built-in type `xs:string`, with a `MaxLength` facet value of 20, and the `CustomerId` attribute's type is the built-in type `xs:positiveInteger`. The `Customer` element is an anonymous complex type whose particle is the sequence of the `FirstName` and `LastName` elements and whose attributes contains the `CustomerId` attribute.

> **Note:**
> You can also use the [System.Xml.Schema.XmlSchemaChoice](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaChoice) or [System.Xml.Schema.XmlSchemaAll](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaAll) classes as the particle of the complex type to replicate `<xs:choice />` or `<xs:all />` semantics.
 [XmlSchemaCreateExample#3 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XmlSchemaCreateExample/CS/XmlSchemaCreateExample.cs#3)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XmlSchemaCreateExample/CS/XmlSchemaCreateExample.cs.md)
 [XmlSchemaCreateExample#3 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XmlSchemaCreateExample/VB/XmlSchemaCreateExample.vb#3)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XmlSchemaCreateExample/VB/XmlSchemaCreateExample.vb.md)

### Creating and Compiling Schemas

 At this point, the child elements and attributes, their corresponding types, and the top-level `Customer` element have been created in-memory using the SOM API. In the following code example, the schema element is created using the [System.Xml.Schema.XmlSchema](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema) class, the top-level elements and types are added to it using the [System.Xml.Schema.XmlSchema.Items](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema.Items) property and the complete schema is compiled using the [System.Xml.Schema.XmlSchemaSet](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet) class and written to the console.
 [XmlSchemaCreateExample#4 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XmlSchemaCreateExample/CS/XmlSchemaCreateExample.cs#4)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XmlSchemaCreateExample/CS/XmlSchemaCreateExample.cs.md)
 [XmlSchemaCreateExample#4 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XmlSchemaCreateExample/VB/XmlSchemaCreateExample.vb#4)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XmlSchemaCreateExample/VB/XmlSchemaCreateExample.vb.md)

 The [System.Xml.Schema.XmlSchemaSet.Compile*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet.Compile*) method validates the customer schema against the rules for an XML schema and makes post-schema-compilation properties available.

> **Note:**
> All post-schema-compilation properties in the SOM API differ from the Post-Schema-Validation-Infoset.

 The [System.Xml.Schema.ValidationEventHandler](https://learn.microsoft.com/search/?terms=System.Xml.Schema.ValidationEventHandler) added to the [System.Xml.Schema.XmlSchemaSet](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet) is a delegate that calls the callback method `ValidationCallback` to handle schema validation warnings and errors.

 The following is the complete code example, and the customer schema written to the console.
 [XmlSchemaCreateExample#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XmlSchemaCreateExample/CS/XmlSchemaCreateExample.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XmlSchemaCreateExample/CS/XmlSchemaCreateExample.cs.md)
 [XmlSchemaCreateExample#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XmlSchemaCreateExample/VB/XmlSchemaCreateExample.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XmlSchemaCreateExample/VB/XmlSchemaCreateExample.vb.md)

```xml
<?xml version="1.0" encoding="utf-8"?>
<xs:schema xmlns:tns="http://www.tempuri.org" targetNamespace="http://www.tempuri.org" xmlns:xs="http://www.w3.org/2001/XMLSchema">
   <xs:element name="Customer">
      <xs:complexType>
         <xs:sequence>
            <xs:element name="FirstName" type="xs:string" />
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
</xs:schema>
```

## See also

- [XML Schema Object Model Overview](xml-schema-object-model-overview.md)
- [Reading and Writing XML Schemas](reading-and-writing-xml-schemas.md)
- [Traversing XML Schemas](traversing-xml-schemas.md)
- [Editing XML Schemas](editing-xml-schemas.md)
- [Including or Importing XML Schemas](including-or-importing-xml-schemas.md)
- [XmlSchemaSet for Schema Compilation](xmlschemaset-for-schema-compilation.md)
- [Post-Schema Compilation Infoset](post-schema-compilation-infoset.md)
