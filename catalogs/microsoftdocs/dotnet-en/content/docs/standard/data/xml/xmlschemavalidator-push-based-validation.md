---
description: "Learn more about: XmlSchemaValidator Push-Based Validation"
title: "XmlSchemaValidator Push-Based Validation"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 911d4460-dd91-4958-85b2-2ca3299f9ec6
---
# XmlSchemaValidator Push-Based Validation

The [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class provides an efficient, high-performance mechanism to validate XML data against XML schemas in a push-based manner. For example, the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class allows you to validate an XML infoset in-place without having to serialize it as an XML document and then reparse the document using a validating XML reader.

The [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class can be used in advanced scenarios such as building validation engines over custom XML data sources or as a way to build a validating XML writer.

The following is an example of using the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class to validate the `contosoBooks.xml` file against the `contosoBooks.xsd` schema. The example uses the [System.Xml.Serialization.XmlSerializer](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer) class to deserialize the `contosoBooks.xml` file and pass the value of the nodes to the methods of the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class.

> **Note:**
> This example is used throughout the sections of this topic.

[XmlSchemaValidatorExamples#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XmlSchemaValidatorExamples/CS/XmlSchemaValidatorExamples.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XmlSchemaValidatorExamples/CS/XmlSchemaValidatorExamples.cs.md)
[XmlSchemaValidatorExamples#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XmlSchemaValidatorExamples/VB/XmlSchemaValidatorExamples.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XmlSchemaValidatorExamples/VB/XmlSchemaValidatorExamples.vb.md)

The example takes the `contosoBooks.xml` file as input.

[XPathXMLExamples#2 (complete source file; reference: ../../../../samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/contosoBooks.xml#2)](../../../../_code/samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/contosoBooks.xml.md)

The example also takes the `contosoBooks.xsd` as an input.

```xml
<?xml version="1.0" encoding="utf-8"?>
<xs:schema attributeFormDefault="unqualified" elementFormDefault="qualified" targetNamespace="http://www.contoso.com/books" xmlns:xs="http://www.w3.org/2001/XMLSchema">
    <xs:element name="bookstore">
        <xs:complexType>
            <xs:sequence>
                <xs:element maxOccurs="unbounded" name="book">
                    <xs:complexType>
                        <xs:sequence>
                            <xs:element name="title" type="xs:string" />
                            <xs:element name="author">
                                <xs:complexType>
                                    <xs:sequence>
                                        <xs:element minOccurs="0" name="name" type="xs:string" />
                                        <xs:element minOccurs="0" name="first-name" type="xs:string" />
                                        <xs:element minOccurs="0" name="last-name" type="xs:string" />
                                    </xs:sequence>
                                </xs:complexType>
                            </xs:element>
                            <xs:element name="price" type="xs:decimal" />
                        </xs:sequence>
                        <xs:attribute name="genre" type="xs:string" use="required" />
                        <xs:attribute name="publicationdate" type="xs:date" use="required" />
                        <xs:attribute name="ISBN" type="xs:string" use="required" />
                    </xs:complexType>
                </xs:element>
            </xs:sequence>
        </xs:complexType>
    </xs:element>
</xs:schema>
```

## Validating XML Data using XmlSchemaValidator

To begin validating an XML infoset, you must first initialize a new instance of the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class using the [System.Xml.Schema.XmlSchemaValidator.%23ctor*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.%2523ctor*) constructor.

The [System.Xml.Schema.XmlSchemaValidator.%23ctor*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.%2523ctor*) constructor takes [System.Xml.XmlNameTable](https://learn.microsoft.com/search/?terms=System.Xml.XmlNameTable), [System.Xml.Schema.XmlSchemaSet](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet), and [System.Xml.XmlNamespaceManager](https://learn.microsoft.com/search/?terms=System.Xml.XmlNamespaceManager) objects as parameters as well as a [System.Xml.Schema.XmlSchemaValidationFlags](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidationFlags) value as a parameter. The [System.Xml.XmlNameTable](https://learn.microsoft.com/search/?terms=System.Xml.XmlNameTable) object is used to atomize well-known namespace strings like the schema namespace, the XML namespace, and so on, and is passed to the [System.Xml.Schema.XmlSchemaDatatype.ParseValue*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaDatatype.ParseValue*) method while validating simple content. The [System.Xml.Schema.XmlSchemaSet](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet) object contains the XML schemas used to validate the XML infoset. The [System.Xml.XmlNamespaceManager](https://learn.microsoft.com/search/?terms=System.Xml.XmlNamespaceManager) object is used to resolve namespaces encountered during validation. The [System.Xml.Schema.XmlSchemaValidationFlags](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidationFlags) value is used to disable certain features of validation.

For more information about the [System.Xml.Schema.XmlSchemaValidator.%23ctor*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.%2523ctor*) constructor, see the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class reference documentation.

### Initializing Validation

After an [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) object has been constructed, there are two overloaded [System.Xml.Schema.XmlSchemaValidator.Initialize*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.Initialize*) methods used to initialize the state of the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) object. The following are the two [System.Xml.Schema.XmlSchemaValidator.Initialize*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.Initialize*) methods.

- [System.Xml.Schema.XmlSchemaValidator.Initialize*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.Initialize*)

- [System.Xml.Schema.XmlSchemaValidator.Initialize*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.Initialize*)

The default [System.Xml.Schema.XmlSchemaValidator.Initialize*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.Initialize*) method initializes an [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) object to its starting state, and the overloaded [System.Xml.Schema.XmlSchemaValidator.Initialize*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.Initialize*) method that takes an [System.Xml.Schema.XmlSchemaObject](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaObject) as a parameter initializes an [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) object to its starting state for partial validation.

Both [System.Xml.Schema.XmlSchemaValidator.Initialize*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.Initialize*) methods can only be called immediately after an [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) object has been constructed or after a call to [System.Xml.Schema.XmlSchemaValidator.EndValidation*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.EndValidation*).

For an example of the [System.Xml.Schema.XmlSchemaValidator.Initialize*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.Initialize*) method, see the example in the introduction. For more information about the [System.Xml.Schema.XmlSchemaValidator.Initialize*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.Initialize*) method, see the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class reference documentation.

#### Partial Validation

The [System.Xml.Schema.XmlSchemaValidator.Initialize*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.Initialize*) method that takes an [System.Xml.Schema.XmlSchemaObject](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaObject) as a parameter initializes an [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) object to its starting state for partial validation.

In the following example, an [System.Xml.Schema.XmlSchemaObject](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaObject) is initialized for partial validation using the [System.Xml.Schema.XmlSchemaValidator.Initialize*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.Initialize*) method. The `orderNumber` schema element is passed by selecting the schema element by [System.Xml.XmlQualifiedName](https://learn.microsoft.com/search/?terms=System.Xml.XmlQualifiedName) in the [System.Xml.Schema.XmlSchemaObjectTable](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaObjectTable) collection returned by the [System.Xml.Schema.XmlSchemaSet.GlobalElements](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet.GlobalElements) property of the [System.Xml.Schema.XmlSchemaSet](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet) object. The [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) object then validates this specific element.

```vb
Dim schemaSet As XmlSchemaSet = New XmlSchemaSet()
schemaSet.Add(Nothing, "schema.xsd")
schemaSet.Compile()
Dim nameTable As NameTable = New NameTable()
Dim manager As XmlNamespaceManager = New XmlNamespaceManager(nameTable)

Dim validator As XmlSchemaValidator = New XmlSchemaValidator(nameTable, schemaSet, manager, XmlSchemaValidationFlags.None)
validator.Initialize(schemaSet.GlobalElements.Item(New XmlQualifiedName("orderNumber")))

validator.ValidateElement("orderNumber", "", Nothing)
validator.ValidateEndOfAttributes(Nothing)
validator.ValidateText("123")
validator.ValidateEndElement(Nothing)
```

```csharp
XmlSchemaSet schemaSet = new XmlSchemaSet();
schemaSet.Add(null, "schema.xsd");
schemaSet.Compile();
NameTable nameTable = new NameTable();
XmlNamespaceManager manager = new XmlNamespaceManager(nameTable);

XmlSchemaValidator validator = new XmlSchemaValidator(nameTable, schemaSet, manager, XmlSchemaValidationFlags.None);
validator.Initialize(schemaSet.GlobalElements[new XmlQualifiedName("orderNumber")]);

validator.ValidateElement("orderNumber", "", null);
validator.ValidateEndOfAttributes(null);
validator.ValidateText("123");
validator.ValidateEndElement(null);
```

The example takes the following XML schema as input.

```xml
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="orderNumber" type="xs:int" />
</xs:schema>
```

For more information about the [System.Xml.Schema.XmlSchemaValidator.Initialize*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.Initialize*) method, see the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class reference documentation.

### Adding Additional Schemas

The [System.Xml.Schema.XmlSchemaValidator.AddSchema*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.AddSchema*) method of the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class is used to add an XML schema to the set of schemas used during validation. The [System.Xml.Schema.XmlSchemaValidator.AddSchema*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.AddSchema*) method can be used to simulate the effect of encountering an inline XML schema in the XML infoset being validated.

> **Note:**
> The target namespace of the [System.Xml.Schema.XmlSchema](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchema) parameter cannot match that of any element or attribute already encountered by the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) object.
>
> If the [System.Xml.Schema.XmlSchemaValidationFlags.ProcessInlineSchema](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidationFlags.ProcessInlineSchema) value was not passed as a parameter to the [System.Xml.Schema.XmlSchemaValidator.%23ctor*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.%2523ctor*) constructor, the [System.Xml.Schema.XmlSchemaValidator.AddSchema*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.AddSchema*) method does nothing.

The result of the [System.Xml.Schema.XmlSchemaValidator.AddSchema*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.AddSchema*) method is dependant on the current XML node context being validated. For more information about validation contexts, see the "Validation Context" section of this topic.

For more information about the [System.Xml.Schema.XmlSchemaValidator.AddSchema*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.AddSchema*) method, see the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class reference documentation.

### Validating Elements, Attributes, and Content

The [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class provides several methods used to validate elements, attributes, and content in an XML infoset against XML schemas. The following table describes each of these methods.

| Method | Description |
| --- | --- |
| [System.Xml.Schema.XmlSchemaValidator.ValidateElement*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateElement*) | Validates the element name in the current context. |
| [System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*) | Validates the attribute in the current element context or against the [System.Xml.Schema.XmlSchemaAttribute](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaAttribute) object passed as a parameter to the [System.Xml.Schema.XmlSchemaValidator.Initialize*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.Initialize*) method. |
| [System.Xml.Schema.XmlSchemaValidator.ValidateEndOfAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateEndOfAttributes*) | Verifies whether all the required attributes in the element context are present and prepares the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) object to validate the child content of the element. |
| [System.Xml.Schema.XmlSchemaValidator.ValidateText*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateText*) | Validates whether text is allowed in the current element context, and accumulates the text for validation if the current element has simple content. |
| [System.Xml.Schema.XmlSchemaValidator.ValidateWhitespace*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateWhitespace*) | Validates whether white-space is allowed in the current element context, and accumulates the white-space for validation whether the current element has simple content. |
| [System.Xml.Schema.XmlSchemaValidator.ValidateEndElement*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateEndElement*) | Verifies whether the text content of the element is valid according to its data type for elements with simple content, and verifies whether the content of the current element is complete for elements with complex content. |
| [System.Xml.Schema.XmlSchemaValidator.SkipToEndElement*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.SkipToEndElement*) | Skips validation of the current element content and prepares the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) object to validate content in the parent element's context. |
| [System.Xml.Schema.XmlSchemaValidator.EndValidation*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.EndValidation*) | Ends validation and checks identity constraints for the entire XML document if the [System.Xml.Schema.XmlSchemaValidationFlags.ProcessIdentityConstraints](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidationFlags.ProcessIdentityConstraints) validation option is set. |

> **Note:**
> The [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class has a defined state transition that enforces the sequence and occurrence of calls made to each of the methods described in the previous table. The specific state transition of the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class is described in the "XmlSchemaValidator State Transition" section of this topic.

For an example of the methods used to validate elements, attributes, and content in an XML infoset, see the example in the previous section. For more information about these methods, see the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class reference documentation.

#### Validating Content Using an XmlValueGetter

The [System.Xml.Schema.XmlValueGetter](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlValueGetter)`delegate` can be used to pass the value of attribute, text, or white-space nodes as a Common Language Runtime (CLR) types compatible with the XML Schema Definition Language (XSD) type of the attribute, text, or white-space node. An [System.Xml.Schema.XmlValueGetter](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlValueGetter)`delegate` is useful if the CLR value of an attribute, text, or white-space node is already available, and avoids the cost of converting it to a `string` and then reparsing it again for validation.

The [System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*), [System.Xml.Schema.XmlSchemaValidator.ValidateText*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateText*), and [System.Xml.Schema.XmlSchemaValidator.ValidateWhitespace*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateWhitespace*) methods are overloaded and accept the value of attribute, text, or white-space nodes as a `string` or [System.Xml.Schema.XmlValueGetter](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlValueGetter)`delegate`.

The following methods of the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class accept an [System.Xml.Schema.XmlValueGetter](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlValueGetter)`delegate` as a parameter.

- [System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*)

- [System.Xml.Schema.XmlSchemaValidator.ValidateText*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateText*)

- [System.Xml.Schema.XmlSchemaValidator.ValidateWhitespace*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateWhitespace*)

The following is an example [System.Xml.Schema.XmlValueGetter](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlValueGetter)`delegate` taken from the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class example in the introduction. The [System.Xml.Schema.XmlValueGetter](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlValueGetter)`delegate` returns the value of an attribute as a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) object. To validate this [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) object returned by the [System.Xml.Schema.XmlValueGetter](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlValueGetter), the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) object first converts it to the ValueType (ValueType is the default CLR mapping for the XSD type) for the data type of the attribute and then checks facets on the converted value.

```vb
Shared dateTimeGetterContent As Object

Shared Function DateTimeGetterHandle() As Object
    Return dateTimeGetterContent
End Function

Shared Function DateTimeGetter(dateTime As DateTime) As XmlValueGetter
    dateTimeGetterContent = dateTime
    Return New XmlValueGetter(AddressOf DateTimeGetterHandle)
End Function
```

```csharp
static object dateTimeGetterContent;

static object DateTimeGetterHandle()
{
    return dateTimeGetterContent;
}

static XmlValueGetter DateTimeGetter(DateTime dateTime)
{
    dateTimeGetterContent = dateTime;
    return new XmlValueGetter(dateTimeGetterHandle);
}
```

For a complete example of the [System.Xml.Schema.XmlValueGetter](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlValueGetter)`delegate`, see the example in the introduction. For more information about the [System.Xml.Schema.XmlValueGetter](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlValueGetter)`delegate`, see the [System.Xml.Schema.XmlValueGetter](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlValueGetter), and [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class reference documentation.

#### Post-Schema-Validation-Information

The [System.Xml.Schema.XmlSchemaInfo](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInfo) class represents some of the Post-Schema-Validation-Information of an XML node validated by the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class. Various methods of the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class accept an [System.Xml.Schema.XmlSchemaInfo](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInfo) object as an optional, (`null`) `out` parameter.

Upon successful validation, properties of the [System.Xml.Schema.XmlSchemaInfo](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInfo) object are set with the results of the validation. For example, upon successful validation of an attribute using the [System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*) method, the [System.Xml.Schema.XmlSchemaInfo](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInfo) object's (if specified) [System.Xml.Schema.XmlSchemaInfo.SchemaAttribute*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInfo.SchemaAttribute*), [System.Xml.Schema.XmlSchemaInfo.SchemaType*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInfo.SchemaType*), [System.Xml.Schema.XmlSchemaInfo.MemberType*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInfo.MemberType*), and [System.Xml.Schema.XmlSchemaInfo.Validity](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInfo.Validity) properties are set with the results of the validation.

The following [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class methods accept an [System.Xml.Schema.XmlSchemaInfo](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInfo) object as an out parameter.

- [System.Xml.Schema.XmlSchemaValidator.SkipToEndElement*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.SkipToEndElement*)

- [System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*)

- [System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*)

- [System.Xml.Schema.XmlSchemaValidator.ValidateElement*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateElement*)

- [System.Xml.Schema.XmlSchemaValidator.ValidateElement*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateElement*)

- [System.Xml.Schema.XmlSchemaValidator.ValidateEndElement*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateEndElement*)

- [System.Xml.Schema.XmlSchemaValidator.ValidateEndElement*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateEndElement*)

- [System.Xml.Schema.XmlSchemaValidator.ValidateEndOfAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateEndOfAttributes*)

For a complete example of the [System.Xml.Schema.XmlSchemaInfo](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInfo) class, see the example in the introduction. For more information about the [System.Xml.Schema.XmlSchemaInfo](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInfo) class, see the [System.Xml.Schema.XmlSchemaInfo](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInfo) class reference documentation.

### Retrieving Expected Particles, Attributes, and Unspecified Default Attributes

The [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class provides the [System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*), [System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*), and [System.Xml.Schema.XmlSchemaValidator.GetUnspecifiedDefaultAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetUnspecifiedDefaultAttributes*) methods to retrieve the expected particles, attributes, and unspecified default attributes in the current validation context.

#### Retrieving Expected Particles

The [System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*) method returns an array of [System.Xml.Schema.XmlSchemaParticle](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaParticle) objects containing the expected particles in the current element context. The valid particles that can be returned by the [System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*) method are instances of the [System.Xml.Schema.XmlSchemaElement](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaElement) and [System.Xml.Schema.XmlSchemaAny](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaAny) classes.

When the compositor for the content model is an `xs:sequence`, only the next particle in the sequence is returned. If the compositor for the content model is an `xs:all` or an `xs:choice`, then all valid particles that could follow in the current element context are returned.

> **Note:**
> If the [System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*) method is called immediately after calling the [System.Xml.Schema.XmlSchemaValidator.Initialize*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.Initialize*) method, the [System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*) method returns all global elements.

For example, in the XML Schema Definition Language (XSD) schema and XML document that follow, after validating the `book` element, the `book` element is the current element context. The [System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*) method returns an array containing a single [System.Xml.Schema.XmlSchemaElement](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaElement) object representing the `title` element. When the validation context is the `title` element, the [System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*) method returns an empty array. If the [System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*) method is called after the `title` element has been validated but before the `description` element has been validated, it returns an array containing a single [System.Xml.Schema.XmlSchemaElement](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaElement) object representing the `description` element. If the [System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*) method is called after the `description` element has been validated then it returns an array containing a single [System.Xml.Schema.XmlSchemaAny](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaAny) object representing the wildcard.

```vb
Dim reader As XmlReader =  XmlReader.Create("input.xml")

Dim schemaSet As New XmlSchemaSet()
schemaSet.Add(Nothing, "schema.xsd")
Dim manager As New XmlNamespaceManager(reader.NameTable)

Dim validator As New XmlSchemaValidator(reader.NameTable,schemaSet,manager,XmlSchemaValidationFlags.None)
validator.Initialize()

validator.ValidateElement("book", "", Nothing)

validator.ValidateEndOfAttributes(Nothing)
For Each element As XmlSchemaElement In validator.GetExpectedParticles()
    Console.WriteLine(element.Name)
Next

validator.ValidateElement("title", "", Nothing)
validator.ValidateEndOfAttributes(Nothing)
For Each element As XmlSchemaElement In validator.GetExpectedParticles()
    Console.WriteLine(element.Name)
Next
validator.ValidateEndElement(Nothing)

For Each element As XmlSchemaElement In validator.GetExpectedParticles()
    Console.WriteLine(element.Name)
Next

validator.ValidateElement("description", "", Nothing)
validator.ValidateEndOfAttributes(Nothing)
validator.ValidateEndElement(Nothing)

For Each particle As XmlSchemaParticle In validator.GetExpectedParticles()
    Console.WriteLine(particle.GetType())
Next

validator.ValidateElement("namespace", "", Nothing)
validator.ValidateEndOfAttributes(Nothing)
validator.ValidateEndElement(Nothing)

validator.ValidateEndElement(Nothing)
```

```csharp
XmlReader reader = XmlReader.Create("input.xml");

var schemaSet = new XmlSchemaSet();
schemaSet.Add(null, "schema.xsd");
var manager = new XmlNamespaceManager(reader.NameTable);

var validator = new XmlSchemaValidator(reader.NameTable, schemaSet, manager, XmlSchemaValidationFlags.None);
validator.Initialize();

validator.ValidateElement("book", "", null);

validator.ValidateEndOfAttributes(null);
foreach (XmlSchemaElement element in validator.GetExpectedParticles())
{
    Console.WriteLine(element.Name);
}

validator.ValidateElement("title", "", null);
validator.ValidateEndOfAttributes(null);
foreach (XmlSchemaElement element in validator.GetExpectedParticles())
{
    Console.WriteLine(element.Name);
}
validator.ValidateEndElement(null);

foreach (XmlSchemaElement element in validator.GetExpectedParticles())
{
    Console.WriteLine(element.Name);
}

validator.ValidateElement("description", "", null);
validator.ValidateEndOfAttributes(null);
validator.ValidateEndElement(null);

foreach (XmlSchemaParticle particle in validator.GetExpectedParticles())
{
    Console.WriteLine(particle.GetType());
}

validator.ValidateElement("namespace", "", null);
validator.ValidateEndOfAttributes(null);
validator.ValidateEndElement(null);

validator.ValidateEndElement(null);
```

 The example takes the following XML as input:

```xml
<xs:schema xmlns:xs="http://www.w3c.org/2001/XMLSchema">
  <xs:element name="book">
    <xs:sequence>
      <xs:element name="title" type="xs:string" />
      <xs:element name="description" type="xs:string" />
      <xs:any processContent="lax" maxOccurs="unbounded" />
    </xs:sequence>
  </xs:element>
</xs:schema>
```

The example takes the following XSD schema as input:

```xml
<book>
  <title>My Book</title>
  <description>My Book's Description</description>
  <namespace>System.Xml.Schema</namespace>
</book>
```

> **Note:**
> The results of the [System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*), [System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*), and [System.Xml.Schema.XmlSchemaValidator.AddSchema*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.AddSchema*) methods of the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class are dependent on the current context being validated. For more information, see the "Validation Context" section of this topic.

For an example of the [System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*) method, see the example in the introduction. For more information about the [System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*) method, see the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class reference documentation.

#### Retrieving Expected Attributes

The [System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*) method returns an array of [System.Xml.Schema.XmlSchemaAttribute](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaAttribute) objects containing the expected attributes in the current element context.

For example, in the example in the introduction, the [System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*) method is used to retrieve all the attributes of the `book` element.

If you call the [System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*) method immediately after the [System.Xml.Schema.XmlSchemaValidator.ValidateElement*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateElement*) method, all the attributes that could appear in the XML document are returned. However, if you call the [System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*) method after one or more calls to the [System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*) method, the attributes that have not yet been validated for the current element are returned.

> **Note:**
> The results of the [System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*), [System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*), and [System.Xml.Schema.XmlSchemaValidator.AddSchema*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.AddSchema*) methods of the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class are dependent on the current context being validated. For more information, see the "Validation Context" section of this topic.

For an example of the [System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*) method, see the example in the introduction. For more information about the [System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*) method, see the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class reference documentation.

#### Retrieving Unspecified Default Attributes

The [System.Xml.Schema.XmlSchemaValidator.GetUnspecifiedDefaultAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetUnspecifiedDefaultAttributes*) method populates the [System.Collections.ArrayList](https://learn.microsoft.com/search/?terms=System.Collections.ArrayList) specified with [System.Xml.Schema.XmlSchemaAttribute](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaAttribute) objects for any attributes with default values that have not been previously validated using the [System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*) method in the element context. The [System.Xml.Schema.XmlSchemaValidator.GetUnspecifiedDefaultAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetUnspecifiedDefaultAttributes*) method should be called after calling the [System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*) method on each attribute in the element context. The [System.Xml.Schema.XmlSchemaValidator.GetUnspecifiedDefaultAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetUnspecifiedDefaultAttributes*) method should be used to determine what default attributes are to be inserted into the XML document being validated.

For more information about the [System.Xml.Schema.XmlSchemaValidator.GetUnspecifiedDefaultAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetUnspecifiedDefaultAttributes*) method, see the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class reference documentation.

### Handling Schema Validation Events

Schema validation warnings and errors encountered during validation are handled by the [System.Xml.Schema.XmlSchemaValidator.ValidationEventHandler](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidationEventHandler) event of the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class.

Schema validation warnings have an [System.Xml.Schema.XmlSeverityType](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSeverityType) value of [System.Xml.Schema.XmlSeverityType.Warning](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSeverityType.Warning) and schema validation errors have an [System.Xml.Schema.XmlSeverityType](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSeverityType) value of [System.Xml.Schema.XmlSeverityType.Error](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSeverityType.Error). If no [System.Xml.Schema.XmlSchemaValidator.ValidationEventHandler](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidationEventHandler) has been assigned, an [System.Xml.Schema.XmlSchemaValidationException](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidationException) is thrown for all schema validation errors with an [System.Xml.Schema.XmlSeverityType](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSeverityType) value of [System.Xml.Schema.XmlSeverityType.Error](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSeverityType.Error). However, an [System.Xml.Schema.XmlSchemaValidationException](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidationException) is not thrown for schema validation warnings with an [System.Xml.Schema.XmlSeverityType](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSeverityType) value of [System.Xml.Schema.XmlSeverityType.Warning](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSeverityType.Warning).

The following is an example of a [System.Xml.Schema.ValidationEventHandler](https://learn.microsoft.com/search/?terms=System.Xml.Schema.ValidationEventHandler) that receives schema validation warnings and errors encountered during schema validation taken from the example in the introduction.

```vb
Shared Sub SchemaValidationEventHandler(sender As Object, e As ValidationEventArgs)

    Select Case e.Severity
        Case XmlSeverityType.Error
            Console.WriteLine(vbCrLf & "Error: {0}", e.Message)
            Exit Sub
        Case XmlSeverityType.Warning
            Console.WriteLine(vbCrLf & "Warning: {0}", e.Message)
            Exit Sub
    End Select
End Sub
```

```csharp
static void SchemaValidationEventHandler(object sender, ValidationEventArgs e)
{
    switch (e.Severity)
    {
        case XmlSeverityType.Error:
            Console.WriteLine("\nError: {0}", e.Message);
            break;
        case XmlSeverityType.Warning:
            Console.WriteLine("\nWarning: {0}", e.Message);
            break;
    }
}
```

For a complete example of the [System.Xml.Schema.ValidationEventHandler](https://learn.microsoft.com/search/?terms=System.Xml.Schema.ValidationEventHandler), see the example in the introduction. For more information, see the [System.Xml.Schema.XmlSchemaInfo](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaInfo) class reference documentation.

## XmlSchemaValidator State Transition

The [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class has a defined state transition that enforces the sequence and occurrence of calls made to each of the methods used to validate elements, attributes, and content in an XML infoset.

The following table describes the state transition of the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class, and the sequence and occurrence of method calls that can be made in each state.

| State | Transition |
| --- | --- |
| Validate | [System.Xml.Schema.XmlSchemaValidator.Initialize*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.Initialize*) ([System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*) &#124; TopLevel*) [System.Xml.Schema.XmlSchemaValidator.EndValidation*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.EndValidation*) |
| TopLevel | [System.Xml.Schema.XmlSchemaValidator.ValidateWhitespace*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateWhitespace*) &#124; [System.Xml.Schema.XmlSchemaValidator.ValidateText*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateText*) &#124; Element |
| Element | [System.Xml.Schema.XmlSchemaValidator.ValidateElement*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateElement*) [System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*)* ([System.Xml.Schema.XmlSchemaValidator.ValidateEndOfAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateEndOfAttributes*) Content\*)? [System.Xml.Schema.XmlSchemaValidator.ValidateEndElement*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateEndElement*) &#124;<br /><br /> [System.Xml.Schema.XmlSchemaValidator.ValidateElement*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateElement*) [System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*)\* [System.Xml.Schema.XmlSchemaValidator.SkipToEndElement*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.SkipToEndElement*) &#124;<br /><br /> [System.Xml.Schema.XmlSchemaValidator.ValidateElement*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateElement*) [System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*)\* [System.Xml.Schema.XmlSchemaValidator.ValidateEndOfAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateEndOfAttributes*) Content\* [System.Xml.Schema.XmlSchemaValidator.SkipToEndElement*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.SkipToEndElement*) &#124; |
| Content | [System.Xml.Schema.XmlSchemaValidator.ValidateWhitespace*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateWhitespace*) &#124; [System.Xml.Schema.XmlSchemaValidator.ValidateText*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateText*) &#124; Element |

> **Note:**
> An [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) is thrown by each of the methods in the table above when the call to the method is made in the incorrect sequence according to the current state of an [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) object.

The state transition table above uses punctuation symbols to describe the methods and other states that can be called for each state of the state transition of the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class. The symbols used are the same symbols found in the XML Standards reference for Document Type Definition (DTD).

The following table describes how the punctuation symbols found in the state transition table above affect the methods and other states that can be called for each state in the state transition of the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class.

| Symbol | Description |
| --- | --- |
| &#124; | Either method or state (the one before the bar or the one after it) can be called. |
| ? | The method or state that precedes the question mark is optional but if it is called it can only be called once. |
| \* | The method or state that precedes the \* symbol is optional, and can be called more than once. |

## Validation Context

The methods of the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class used to validate elements, attributes, and content in an XML infoset, change the validation context of an [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) object. For example, the [System.Xml.Schema.XmlSchemaValidator.SkipToEndElement*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.SkipToEndElement*) method skips validation of the current element content and prepares the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) object to validate content in the parent element's context; it is equivalent to skipping validation for all the children of the current element and then calling the [System.Xml.Schema.XmlSchemaValidator.ValidateEndElement*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateEndElement*) method.

The results of the [System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*), [System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*), and [System.Xml.Schema.XmlSchemaValidator.AddSchema*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.AddSchema*) methods of the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class are dependent on the current context being validated.

The following table describes the results of calling these methods after calling one of the methods of the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class used to validate elements, attributes, and content in an XML infoset.

| Method | GetExpectedParticles | GetExpectedAttributes | AddSchema |
| --- | --- | --- | --- |
| [System.Xml.Schema.XmlSchemaValidator.Initialize*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.Initialize*) | If the default [System.Xml.Schema.XmlSchemaValidator.Initialize*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.Initialize*) method is called, [System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*) returns an array containing all global elements.<br /><br /> If the overloaded [System.Xml.Schema.XmlSchemaValidator.Initialize*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.Initialize*) method that takes an [System.Xml.Schema.XmlSchemaObject](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaObject) as a parameter is called to initialize partial validation of an element, [System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*) returns only the element to which the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) object was initialized. | If the default [System.Xml.Schema.XmlSchemaValidator.Initialize*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.Initialize*) method is called, [System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*) returns an empty array.<br /><br /> If the overload of the [System.Xml.Schema.XmlSchemaValidator.Initialize*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.Initialize*) method that takes an [System.Xml.Schema.XmlSchemaObject](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaObject) as a parameter is called to initialize partial validation of an attribute, [System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*) returns only the attribute to which the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) object was initialized. | Adds the schema to the [System.Xml.Schema.XmlSchemaSet](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaSet) of the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) object if it has no preprocessing errors. |
| [System.Xml.Schema.XmlSchemaValidator.ValidateElement*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateElement*) | If the context element is valid, [System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*) returns the sequence of elements expected as children of the context element.<br /><br /> If the context element is invalid, [System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*) returns an empty array. | If the context element is valid, and if no call to [System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*) has been previously made, [System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*) returns a list of all the attributes defined on the context element.<br /><br /> If some attributes have already been validated, [System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*) returns a list of the remaining attributes to be validated.<br /><br /> If the context element is invalid, [System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*) returns an empty array. | Same as above. |
| [System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*) | If the context attribute is a top-level attribute, [System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*) returns an empty array.<br /><br /> Otherwise [System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*) returns the sequence of elements expected as the first child of the context element. | If the context attribute is a top-level attribute, [System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*) returns an empty array.<br /><br /> Otherwise [System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*) returns the list of remaining attributes to be validated. | Same as above. |
| [System.Xml.Schema.XmlSchemaValidator.GetUnspecifiedDefaultAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetUnspecifiedDefaultAttributes*) | [System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*) returns the sequence of elements expected as the first child of the context element. | [System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*) returns a list of the required and optional attributes that are yet to be validated for the context element. | Same as above. |
| [System.Xml.Schema.XmlSchemaValidator.ValidateEndOfAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateEndOfAttributes*) | [System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*) returns the sequence of elements expected as the first child of the context element. | [System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*) returns an empty array. | Same as above. |
| [System.Xml.Schema.XmlSchemaValidator.ValidateText*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateText*) | If the context element's contentType is Mixed, [System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*) returns the sequence of elements expected in the next position.<br /><br /> If the context element's contentType is TextOnly or Empty, [System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*) returns an empty array.<br /><br /> If the context element's contentType is ElementOnly, [System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*) returns the sequence of elements expected in the next position but a validation error has already occurred. | [System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*) returns the context element's list of attributes not validated. | Same as above. |
| [System.Xml.Schema.XmlSchemaValidator.ValidateWhitespace*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateWhitespace*) | If the context white-space is top-level white-space, [System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*) returns an empty array.<br /><br /> Otherwise the [System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*) method's behavior is the same as in [System.Xml.Schema.XmlSchemaValidator.ValidateText*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateText*). | If the context white-space is top-level white-space, [System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*) returns an empty array.<br /><br /> Otherwise the [System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*) method's behavior is the same as in [System.Xml.Schema.XmlSchemaValidator.ValidateText*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateText*). | Same as above. |
| [System.Xml.Schema.XmlSchemaValidator.ValidateEndElement*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateEndElement*) | [System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*) returns the sequence of elements expected after the context element (possible siblings). | [System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*) returns the context element's list of attributes not validated.<br /><br /> If the context element has no parent then [System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*) returns an empty list (the context element is the parent of the current element on which [System.Xml.Schema.XmlSchemaValidator.ValidateEndElement*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateEndElement*) was called). | Same as above. |
| [System.Xml.Schema.XmlSchemaValidator.SkipToEndElement*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.SkipToEndElement*) | Same as [System.Xml.Schema.XmlSchemaValidator.ValidateEndElement*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateEndElement*). | Same as [System.Xml.Schema.XmlSchemaValidator.ValidateEndElement*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.ValidateEndElement*). | Same as above. |
| [System.Xml.Schema.XmlSchemaValidator.EndValidation*](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator.EndValidation*) | Returns an empty array. | Returns an empty array. | Same as above. |

> **Note:**
> The values returned by the various properties of the [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator) class are not altered by calling any of the methods in the above table.

## See also

- [System.Xml.Schema.XmlSchemaValidator](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaValidator)
