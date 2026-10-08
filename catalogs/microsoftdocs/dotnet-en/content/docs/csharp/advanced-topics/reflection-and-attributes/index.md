---
title: Attributes and reflection
description: Use attributes to associate metadata or declarative information in C#. Query attributes at run time with reflection APIs that describe assemblies, modules, and types.
ms.date: 03/14/2025
---
# Attributes

Attributes provide a powerful way to associate metadata, or declarative information, with code (assemblies, types, methods, properties, and so on). After you associate an attribute with a program entity, you can query the attribute at run time by using a technique called *reflection*.

Attributes have the following properties:

- Attributes add metadata to your program. *Metadata* is information about the types defined in a program. All .NET assemblies contain a specified set of metadata that describes the types and type members defined in the assembly. You can add custom attributes to specify any other required information.
- Attributes can be applied to entire assemblies, modules, or smaller program elements, such as classes and properties.
- Attributes can accept arguments in the same way as methods and properties.
- Attributes enable a program to examine its own metadata or metadata in other programs by using reflection.

## Work with reflection

[Reflection](../../../fundamentals/reflection/overview.md) APIs provided by [System.Type](https://learn.microsoft.com/search/?terms=System.Type) describe assemblies, modules, and types. You can use reflection to dynamically create an instance of a type, bind the type to an existing object, or get the type from an existing object and invoke its methods or access its fields and properties. When you use attributes in your code, reflection enables you to access them. For more information, see [Attributes](../../../standard/attributes/index.md).

Here's a simple example of reflection with the [System.Object.GetType](https://learn.microsoft.com/search/?terms=System.Object.GetType) method. All types from the `Object` base class inherit this method, which is used to obtain the type of a variable:

> **Note:**
> Make sure you add the `using System;` and `using System.Reflection;` statements at the top of your C# (*.cs*) code file.

[language="csharp" source="./snippets/conceptual/Program.cs" id="GetTypeInformation"::: (complete source file; reference: ./snippets/conceptual/Program.cs)](../../../../_code/docs/csharp/advanced-topics/reflection-and-attributes/snippets/conceptual/Program.cs.md)

The output shows the type:

```output
System.Int32
```

The following example uses reflection to obtain the full name of the loaded assembly.

[language="csharp" source="./snippets/conceptual/Program.cs" id="GetAssemblyInfo"::: (complete source file; reference: ./snippets/conceptual/Program.cs)](../../../../_code/docs/csharp/advanced-topics/reflection-and-attributes/snippets/conceptual/Program.cs.md)

The output is similar to the following example:

```output
System.Private.CoreLib, Version=7.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e
```

### Keyword differences for IL

The C# keywords `protected` and `internal` have no meaning in Intermediate Language (IL) and aren't used in the reflection APIs. The corresponding terms in IL are *Family* and *Assembly*. Here some ways you can use these terms:

- To identify an `internal` method by using reflection, use the [System.Reflection.MethodBase.IsAssembly](https://learn.microsoft.com/search/?terms=System.Reflection.MethodBase.IsAssembly) property.
- To identify a `protected internal` method, use the [System.Reflection.MethodBase.IsFamilyOrAssembly*](https://learn.microsoft.com/search/?terms=System.Reflection.MethodBase.IsFamilyOrAssembly*).

## Work with attributes

Attributes can be placed on almost any declaration, though a specific attribute might restrict the types of declarations on which it's valid. In C#, you specify an attribute by placing the name of the attribute enclosed in square brackets (`[]`) above the declaration of the entity to which it applies.

In this example, you use the [System.SerializableAttribute](https://learn.microsoft.com/search/?terms=System.SerializableAttribute) attribute to apply a specific characteristic to a class:

[language="csharp" source="./snippets/conceptual/AttributesOverview.cs" id="Snippet1"::: (complete source file; reference: ./snippets/conceptual/AttributesOverview.cs)](../../../../_code/docs/csharp/advanced-topics/reflection-and-attributes/snippets/conceptual/AttributesOverview.cs.md)

You can declare a method with the [System.Runtime.InteropServices.DllImportAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.DllImportAttribute) attribute:

[language="csharp" source="./snippets/conceptual/AttributesOverview.cs" id="Snippet2"::: (complete source file; reference: ./snippets/conceptual/AttributesOverview.cs)](../../../../_code/docs/csharp/advanced-topics/reflection-and-attributes/snippets/conceptual/AttributesOverview.cs.md)

You can place multiple attributes on a declaration:

[language="csharp" source="./snippets/conceptual/AttributesOverview.cs" id="Snippet4"::: (complete source file; reference: ./snippets/conceptual/AttributesOverview.cs)](../../../../_code/docs/csharp/advanced-topics/reflection-and-attributes/snippets/conceptual/AttributesOverview.cs.md)

Some attributes can be specified more than once for a given entity. The following example shows multiuse of the [System.Diagnostics.ConditionalAttribute](https://learn.microsoft.com/search/?terms=System.Diagnostics.ConditionalAttribute) attribute:

[language="csharp" source="./snippets/conceptual/AttributesOverview.cs" id="Snippet5"::: (complete source file; reference: ./snippets/conceptual/AttributesOverview.cs)](../../../../_code/docs/csharp/advanced-topics/reflection-and-attributes/snippets/conceptual/AttributesOverview.cs.md)

> **Note:**
> By convention, all attribute names end with the suffix "Attribute" to distinguish them from other types in the .NET libraries. However, you don't need to specify the attribute suffix when you use attributes in code. For example, a `[DllImport]` declaration is equivalent to a `[DllImportAttribute]` declaration, but `DllImportAttribute` is the actual name of the class in the .NET Class Library.

### Attribute parameters

Many attributes have parameters, which can be *positional*, *unnamed*, or *named*. The following table describes how to work with named and positional attributes:



**Positional parameters**

Parameters of the attribute constructor:


**Named parameters**

Properties or fields of the attribute:






- Must specify, can't omit
- Always specify first
- Specify in **certain** order




- Always optional, omit when false
- Specify after positional parameters
- Specify in any order




For example, the following code shows three equivalent `DllImport` attributes:

```csharp
[DllImport("user32.dll")]
[DllImport("user32.dll", SetLastError=false, ExactSpelling=false)]
[DllImport("user32.dll", ExactSpelling=false, SetLastError=false)]
```

The first parameter, the DLL name, is positional and always comes first. The other instances are named parameters. In this scenario, both named parameters default to false, so they can be omitted. Refer to the individual attribute's documentation for information on default parameter values. For more information on allowed parameter types, see the [Attributes](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/attributes.md#2324-attribute-parameter-types) section of the [C# language specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/README.md).

### Attribute targets

The *target* of an attribute is the entity that the attribute applies to. For example, an attribute can apply to a class, a method, or an assembly. By default, an attribute applies to the element that follows it. But you can also explicitly identify the element to associate, such as a method, a parameter, or the return value.

To explicitly identify an attribute target, use the following syntax:

```csharp
[target : attribute-list]
```

The following table shows the list of possible `target` values.

| Target value | Applies to |
| --- | --- |
| `assembly` | Entire assembly |
| `module` | Current assembly module |
| `field` | Field in a class or a struct |
| `event` | Event |
| `method` | Method, constructor (including a primary constructor), or `get` and `set` property accessors |
| `param` | Method parameters or `set` property accessor parameters |
| `property` | Property |
| `return` | Return value of a method, property indexer, or `get` property accessor |
| `type` | Struct, class, interface, enum, or delegate |

You can specify the `field` target value to apply an attribute to the backing field created for an [automatically implemented property](../../programming-guide/classes-and-structs/properties.md).

The following example shows how to apply attributes to assemblies and modules. For more information, see [Common attributes (C#)](../../language-reference/attributes/global.md).

```csharp
using System;
using System.Reflection;
[assembly: AssemblyTitleAttribute("Production assembly 4")]
[module: CLSCompliant(true)]
```

The following example shows how to apply attributes to methods, method parameters, and method return values in C#.

[language="csharp" source="./snippets/conceptual/AttributesOverview.cs" id="Snippet6"::: (complete source file; reference: ./snippets/conceptual/AttributesOverview.cs)](../../../../_code/docs/csharp/advanced-topics/reflection-and-attributes/snippets/conceptual/AttributesOverview.cs.md)

> **Note:**
> Regardless of the targets on which the `ValidatedContract` attribute is defined to be valid, the `return` target has to be specified, even if the `ValidatedContract` attribute is defined to apply only to return values. In other words, the compiler doesn't use the `AttributeUsage` information to resolve ambiguous attribute targets. For more information, see [AttributeUsage](../../language-reference/attributes/general.md).

## Review ways to use attributes

Here are some common ways to use attributes in code:

- Mark controller methods that respond to POST messages by using the `HttpPost` attribute. For more information, see the [Microsoft.AspNetCore.Mvc.HttpPostAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.HttpPostAttribute) class.
- Describe how to marshal method parameters when interoperating with native code. For more information, see the [System.Runtime.InteropServices.MarshalAsAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.MarshalAsAttribute) class.
- Describe Component Object Model (COM) properties for classes, methods, and interfaces.
- Call unmanaged code by using the [System.Runtime.InteropServices.DllImportAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.DllImportAttribute) class.
- Describe your assembly in terms of title, version, description, or trademark.
- Describe which members of a class to serialize for persistence.
- Describe how to map between class members and XML nodes for XML serialization.
- Describe the security requirements for methods.
- Specify characteristics used to enforce security.
- Control optimizations with the just-in-time (JIT) compiler so the code remains easy to debug.
- Obtain information about the caller to a method.

## Review reflection scenarios

Reflection is useful in the following scenarios:

- Access attributes in your program's metadata. For more information, see [Retrieving information stored in attributes](../../../standard/attributes/retrieving-information-stored-in-attributes.md).
- Examine and instantiate types in an assembly.
- Build new types at run time by using classes in the [System.Reflection.Emit](https://learn.microsoft.com/search/?terms=System.Reflection.Emit) namespace.
- Perform late binding and access methods on types created at run time. For more information, see [Dynamically loading and using types](../../../fundamentals/reflection/dynamically-loading-and-using-types.md).

## Related links

- [Common attributes (C#)](../../language-reference/attributes/global.md)
- [Caller information (C#)](../../language-reference/attributes/caller-information.md)
- [Attributes](../../../standard/attributes/index.md)
- [Reflection](../../../fundamentals/reflection/overview.md)
- [View type information](../../../fundamentals/reflection/viewing-type-information.md)
- [Reflection and generic types](../../../fundamentals/reflection/reflection-and-generic-types.md)
- [System.Reflection.Emit](https://learn.microsoft.com/search/?terms=System.Reflection.Emit)
- [Retrieving information stored in attributes](../../../standard/attributes/retrieving-information-stored-in-attributes.md)
