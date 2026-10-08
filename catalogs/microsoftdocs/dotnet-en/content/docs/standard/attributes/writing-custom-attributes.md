---
title: "Writing Custom Attributes"
description: Design your own custom attributes in .NET. Custom attributes are essentially classes derived directly or indirectly from System.Attribute.
ms.date: "03/02/2026"
ms.custom: devdivchpfy22
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "multiple attribute instances"
  - "AttributeTargets enumeration"
  - "attributes [.NET], custom"
  - "AllowMultiple property"
  - "custom attributes"
  - "AttributeUsageAttribute class, custom attributes"
  - "Inherited property"
  - "attribute classes, declaring"
ai-usage: ai-assisted
---
# Write custom attributes

To design custom attributes, you don't need to learn many new concepts. If you're familiar with object-oriented programming and know how to design classes, you already have most of the knowledge needed. Custom attributes are traditional classes that derive directly or indirectly from the [System.Attribute](https://learn.microsoft.com/search/?terms=System.Attribute) class. Just like traditional classes, custom attributes contain methods that store and retrieve data.

 The primary steps to properly design custom attribute classes are as follows:

- [Applying the AttributeUsageAttribute](#applying-the-attributeusageattribute)

- [Declaring the attribute class](#declaring-the-attribute-class)

- [Declaring constructors](#declaring-constructors)

- [Declaring properties](#declaring-properties)

 This section describes each of these steps and concludes with a [custom attribute example](#custom-attribute-example).

## Applying the AttributeUsageAttribute

 A custom attribute declaration begins with the [System.AttributeUsageAttribute](https://learn.microsoft.com/search/?terms=System.AttributeUsageAttribute) attribute, which defines some of the key characteristics of your attribute class. For example, you can specify whether your attribute can be inherited by other classes or which elements the attribute can be applied to. The following code fragment demonstrates how to use the [System.AttributeUsageAttribute](https://learn.microsoft.com/search/?terms=System.AttributeUsageAttribute):

 [Conceptual.Attributes.Usage#5 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.attributes.usage/cs/source2.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.attributes.usage/cs/source2.cs.md)
 [Conceptual.Attributes.Usage#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.attributes.usage/vb/source2.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.attributes.usage/vb/source2.vb.md)

 The [System.AttributeUsageAttribute](https://learn.microsoft.com/search/?terms=System.AttributeUsageAttribute) has three members that are important for the creation of custom attributes: [AttributeTargets](#attributetargets-member), [Inherited](#inherited-property), and [AllowMultiple](#allowmultiple-property).

### AttributeTargets Member

 In the preceding example, [System.AttributeTargets.All](https://learn.microsoft.com/search/?terms=System.AttributeTargets.All) is specified, indicating that this attribute can be applied to all program elements. Alternatively, you can specify [System.AttributeTargets.Class](https://learn.microsoft.com/search/?terms=System.AttributeTargets.Class), indicating that your attribute can be applied only to a class, or [System.AttributeTargets.Method](https://learn.microsoft.com/search/?terms=System.AttributeTargets.Method), indicating that your attribute can be applied only to a method. All program elements can be marked for description by a custom attribute in this manner.

 You can also pass multiple [System.AttributeTargets](https://learn.microsoft.com/search/?terms=System.AttributeTargets) values. The following code fragment specifies that a custom attribute can be applied to any class or method:

 [Conceptual.Attributes.Usage#6 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.attributes.usage/cs/source2.cs#6)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.attributes.usage/cs/source2.cs.md)
 [Conceptual.Attributes.Usage#6 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.attributes.usage/vb/source2.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.attributes.usage/vb/source2.vb.md)

### Inherited Property

 The [System.AttributeUsageAttribute.Inherited](https://learn.microsoft.com/search/?terms=System.AttributeUsageAttribute.Inherited) property indicates whether your attribute can be inherited by classes that are derived from the classes to which your attribute is applied. This property takes either a `true` (the default) or `false` flag. In the following example, `MyAttribute` has a default [System.AttributeUsageAttribute.Inherited*](https://learn.microsoft.com/search/?terms=System.AttributeUsageAttribute.Inherited*) value of `true`, while `YourAttribute` has an [System.AttributeUsageAttribute.Inherited*](https://learn.microsoft.com/search/?terms=System.AttributeUsageAttribute.Inherited*) value of `false`:

 [Conceptual.Attributes.Usage#7 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.attributes.usage/cs/source2.cs#7)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.attributes.usage/cs/source2.cs.md)
 [Conceptual.Attributes.Usage#7 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.attributes.usage/vb/source2.vb#7)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.attributes.usage/vb/source2.vb.md)

 The two attributes are then applied to a method in the base class `MyClass`:

 [Conceptual.Attributes.Usage#9 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.attributes.usage/cs/source2.cs#9)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.attributes.usage/cs/source2.cs.md)
 [Conceptual.Attributes.Usage#9 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.attributes.usage/vb/source2.vb#9)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.attributes.usage/vb/source2.vb.md)

 Finally, the class `YourClass` is inherited from the base class `MyClass`. The method `MyMethod` shows `MyAttribute` but not `YourAttribute`:

 [Conceptual.Attributes.Usage#10 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.attributes.usage/cs/source2.cs#10)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.attributes.usage/cs/source2.cs.md)
 [Conceptual.Attributes.Usage#10 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.attributes.usage/vb/source2.vb#10)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.attributes.usage/vb/source2.vb.md)

### AllowMultiple Property

 The [System.AttributeUsageAttribute.AllowMultiple](https://learn.microsoft.com/search/?terms=System.AttributeUsageAttribute.AllowMultiple) property indicates whether multiple instances of your attribute can exist on an element. If set to `true`, multiple instances are allowed. If set to `false` (the default), only one instance is allowed.

 In the following example, `MyAttribute` has a default [System.AttributeUsageAttribute.AllowMultiple*](https://learn.microsoft.com/search/?terms=System.AttributeUsageAttribute.AllowMultiple*) value of `false`, while `YourAttribute` has a value of `true`:

 [Conceptual.Attributes.Usage#11 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.attributes.usage/cs/source2.cs#11)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.attributes.usage/cs/source2.cs.md)
 [Conceptual.Attributes.Usage#11 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.attributes.usage/vb/source2.vb#11)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.attributes.usage/vb/source2.vb.md)

 When multiple instances of these attributes are applied, `MyAttribute` produces a compiler error. The following code example shows the valid use of `YourAttribute` and the invalid use of `MyAttribute`:

 [Conceptual.Attributes.Usage#13 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.attributes.usage/cs/source2.cs#13)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.attributes.usage/cs/source2.cs.md)
 [Conceptual.Attributes.Usage#13 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.attributes.usage/vb/source2.vb#13)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.attributes.usage/vb/source2.vb.md)

 If both the [System.AttributeUsageAttribute.AllowMultiple](https://learn.microsoft.com/search/?terms=System.AttributeUsageAttribute.AllowMultiple) property and the [System.AttributeUsageAttribute.Inherited](https://learn.microsoft.com/search/?terms=System.AttributeUsageAttribute.Inherited) property are set to `true`, a class that's inherited from another class can inherit an attribute and have another instance of the same attribute applied in the same child class. If [System.AttributeUsageAttribute.AllowMultiple*](https://learn.microsoft.com/search/?terms=System.AttributeUsageAttribute.AllowMultiple*) is set to `false`, the values of any attributes in the parent class will be overwritten by new instances of the same attribute in the child class.

## Declaring the Attribute Class

 After you apply the [System.AttributeUsageAttribute](https://learn.microsoft.com/search/?terms=System.AttributeUsageAttribute), start defining the specifics of your attribute. The declaration of an attribute class looks similar to the declaration of a traditional class, as demonstrated by the following code:

 [Conceptual.Attributes.Usage#14 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.attributes.usage/cs/source2.cs#14)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.attributes.usage/cs/source2.cs.md)
 [Conceptual.Attributes.Usage#14 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.attributes.usage/vb/source2.vb#14)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.attributes.usage/vb/source2.vb.md)

 This attribute definition demonstrates the following points:

- Attribute classes must be declared as public classes.

- By convention, the name of the attribute class ends with the word **Attribute**. While not required, this convention is recommended for readability. When the attribute is applied, the inclusion of the word Attribute is optional.

- All attribute classes must inherit directly or indirectly from the [System.Attribute](https://learn.microsoft.com/search/?terms=System.Attribute) class.

- In Microsoft Visual Basic, all custom attribute classes must have the [System.AttributeUsageAttribute](https://learn.microsoft.com/search/?terms=System.AttributeUsageAttribute) attribute.

## Declaring Constructors

 Just like traditional classes, attributes are initialized with constructors. The following code fragment illustrates a typical attribute constructor. This public constructor takes a parameter and sets a member variable equal to its value.

 [Conceptual.Attributes.Usage#15 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.attributes.usage/cs/source2.cs#15)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.attributes.usage/cs/source2.cs.md)
 [Conceptual.Attributes.Usage#15 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.attributes.usage/vb/source2.vb#15)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.attributes.usage/vb/source2.vb.md)

 You can overload the constructor to accommodate different combinations of values. If you also define a [property](https://learn.microsoft.com/previous-versions/visualstudio/visual-studio-2013/65zdfbdt\(v=vs.120\)) for your custom attribute class, you can use a combination of named and positional parameters when initializing the attribute. Typically, you define all required parameters as positional and all optional parameters as named. In this case, the attribute can't be initialized without the required parameter. All other parameters are optional.

> **Note:**
> In Visual Basic, constructors for an attribute class shouldn't use a `ParamArray` argument.

Constructor parameters and public properties of an attribute are restricted to a limited set of types because the runtime must be able to read the attribute values directly from metadata. The valid attribute parameter types are:

- Simple types (C# keyword / Visual Basic keyword / .NET runtime type):

  | C# | Visual Basic | .NET runtime type |
  | --- | --- | --- |
  | `bool` | `Boolean` | [System.Boolean](https://learn.microsoft.com/search/?terms=System.Boolean) |
  | `byte` | `Byte` | [System.Byte](https://learn.microsoft.com/search/?terms=System.Byte) |
  | `char` | `Char` | [System.Char](https://learn.microsoft.com/search/?terms=System.Char) |
  | `double` | `Double` | [System.Double](https://learn.microsoft.com/search/?terms=System.Double) |
  | `float` | `Single` | [System.Single](https://learn.microsoft.com/search/?terms=System.Single) |
  | `int` | `Integer` | [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32) |
  | `long` | `Long` | [System.Int64](https://learn.microsoft.com/search/?terms=System.Int64) |
  | `short` | `Short` | [System.Int16](https://learn.microsoft.com/search/?terms=System.Int16) |
  | `string` | `String` | [System.String](https://learn.microsoft.com/search/?terms=System.String) |

- [System.Type](https://learn.microsoft.com/search/?terms=System.Type).
- Enum types that are accessible at the attribute usage site.
- In C#, `object` (when the value is one of the valid attribute argument types or a single-dimensional array of them).
- Single-dimensional arrays of any of the preceding types.

If you define a constructor that accepts a type outside this list, the attribute compiles successfully, but a compiler error occurs when you try to apply it. For more information about what expressions are allowed when applying an attribute, see [Apply attributes](applying-attributes.md).

> **Note:**
> The types `sbyte`, `ushort`, `uint`, `ulong`, `decimal`, `nint`, and `nuint` aren't valid attribute parameter types, even though they support literal constants.

The following code example shows how an attribute that uses the previous constructor can be applied using optional and required parameters. It assumes that the attribute has one required Boolean value and one optional string property.

 [Conceptual.Attributes.Usage#17 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.attributes.usage/cs/source2.cs#17)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.attributes.usage/cs/source2.cs.md)
 [Conceptual.Attributes.Usage#17 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.attributes.usage/vb/source2.vb#17)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.attributes.usage/vb/source2.vb.md)

## Declaring Properties

 If you want to define a named parameter or provide an easy way to return the values stored by your attribute, declare a [property](https://learn.microsoft.com/previous-versions/visualstudio/visual-studio-2013/65zdfbdt\(v=vs.120\)). Attribute properties should be declared as public entities with a description of the data type that will be returned. Define the variable that will hold the value of your property and associate it with the `get` and `set` methods. The following code example demonstrates how to implement a property in your attribute:

 [Conceptual.Attributes.Usage#16 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.attributes.usage/cs/source2.cs#16)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.attributes.usage/cs/source2.cs.md)
 [Conceptual.Attributes.Usage#16 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.attributes.usage/vb/source2.vb#16)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.attributes.usage/vb/source2.vb.md)

## Custom Attribute Example

 This section incorporates the previous information and shows how to design an attribute that documents information about the author of a section of code. The attribute in this example stores the name and level of the programmer, and whether the code has been reviewed. It uses three private variables to store the actual values to save. Each variable is represented by a public property that gets and sets the values. Finally, the constructor is defined with two required parameters:

 [Conceptual.Attributes.Usage#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.attributes.usage/cs/source2.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.attributes.usage/cs/source2.cs.md)
 [Conceptual.Attributes.Usage#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.attributes.usage/vb/source2.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.attributes.usage/vb/source2.vb.md)

 You can apply this attribute using the full name, `DeveloperAttribute`, or using the abbreviated name, `Developer`, in one of the following ways:

 [Conceptual.Attributes.Usage#12 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.attributes.usage/cs/source2.cs#12)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.attributes.usage/cs/source2.cs.md)
 [Conceptual.Attributes.Usage#12 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.attributes.usage/vb/source2.vb#12)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.attributes.usage/vb/source2.vb.md)

 The first example shows the attribute applied with only the required named parameters. The second example shows the attribute applied with both the required and optional parameters.

## See also

- [System.Attribute](https://learn.microsoft.com/search/?terms=System.Attribute)
- [System.AttributeUsageAttribute](https://learn.microsoft.com/search/?terms=System.AttributeUsageAttribute)
- [Attributes](index.md)
- [Attribute parameter types](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/attributes.md#2324-attribute-parameter-types)
