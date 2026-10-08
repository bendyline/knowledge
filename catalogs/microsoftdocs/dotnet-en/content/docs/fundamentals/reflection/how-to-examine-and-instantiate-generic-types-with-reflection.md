---
title: "How to: Examine and Instantiate Generic Types with Reflection"
description: See how to examine and instantiate generic types with reflection. Use the IsGenericType, IsGenericParameter, and GenericParameterPosition properties.
ms.date: 03/19/2025
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "reflection, generic types"
  - "generics [.NET], reflection"
---
# How to: Examine and instantiate generic types with reflection

Information about generic types is obtained in the same way as information about other types: by examining a [System.Type](https://learn.microsoft.com/search/?terms=System.Type) object that represents the generic type. The principle difference is that a generic type has a list of [System.Type](https://learn.microsoft.com/search/?terms=System.Type) objects representing its generic type parameters. The first procedure in this section examines generic types.

You can create a [System.Type](https://learn.microsoft.com/search/?terms=System.Type) object that represents a constructed type by binding type arguments to the type parameters of a generic type definition. The second procedure demonstrates this.

## To examine a generic type and its type parameters

1. Get an instance of [System.Type](https://learn.microsoft.com/search/?terms=System.Type) that represents the generic type. In the following code, the type is obtained using the C# `typeof` operator (`GetType` in Visual Basic). For other ways to get a [System.Type](https://learn.microsoft.com/search/?terms=System.Type) object, see [System.Type](https://learn.microsoft.com/search/?terms=System.Type). In the rest of this procedure, the type is contained in a method parameter named `t`.

   [HowToGeneric#2 (complete source file; reference: snippets/csharp/instantiate-generic-type/GenericTypes.cs#2)](../../../_code/docs/fundamentals/reflection/snippets/csharp/instantiate-generic-type/GenericTypes.cs.md)
   [HowToGeneric#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToGeneric/VB/ur.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToGeneric/VB/ur.vb.md)

2. Use the [System.Type.IsGenericType](https://learn.microsoft.com/search/?terms=System.Type.IsGenericType) property to determine whether the type is generic, and use the [System.Type.IsGenericTypeDefinition](https://learn.microsoft.com/search/?terms=System.Type.IsGenericTypeDefinition) property to determine whether the type is a generic type definition.

   [HowToGeneric#3 (complete source file; reference: snippets/csharp/instantiate-generic-type/GenericTypes.cs#3)](../../../_code/docs/fundamentals/reflection/snippets/csharp/instantiate-generic-type/GenericTypes.cs.md)
   [HowToGeneric#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToGeneric/VB/ur.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToGeneric/VB/ur.vb.md)

3. Get an array that contains the generic type arguments, using the [System.Type.GetGenericArguments*](https://learn.microsoft.com/search/?terms=System.Type.GetGenericArguments*) method.

   [HowToGeneric#4 (complete source file; reference: snippets/csharp/instantiate-generic-type/GenericTypes.cs#4)](../../../_code/docs/fundamentals/reflection/snippets/csharp/instantiate-generic-type/GenericTypes.cs.md)
   [HowToGeneric#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToGeneric/VB/ur.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToGeneric/VB/ur.vb.md)

4. For each type argument, determine whether it is a type parameter (for example, in a generic type definition) or a type that has been specified for a type parameter (for example, in a constructed type), using the [System.Type.IsGenericParameter](https://learn.microsoft.com/search/?terms=System.Type.IsGenericParameter) property.

   [HowToGeneric#5 (complete source file; reference: snippets/csharp/instantiate-generic-type/GenericTypes.cs#5)](../../../_code/docs/fundamentals/reflection/snippets/csharp/instantiate-generic-type/GenericTypes.cs.md)
   [HowToGeneric#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToGeneric/VB/ur.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToGeneric/VB/ur.vb.md)

5. In the type system, a generic type parameter is represented by an instance of [System.Type](https://learn.microsoft.com/search/?terms=System.Type), just as ordinary types are. The following code displays the name and parameter position of a [System.Type](https://learn.microsoft.com/search/?terms=System.Type) object that represents a generic type parameter. The parameter position is trivial information here; it's of more interest when you're examining a type parameter that's been used as a type argument of another generic type.

   [HowToGeneric#6 (complete source file; reference: snippets/csharp/instantiate-generic-type/GenericTypes.cs#6)](../../../_code/docs/fundamentals/reflection/snippets/csharp/instantiate-generic-type/GenericTypes.cs.md)
   [HowToGeneric#6 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToGeneric/VB/ur.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToGeneric/VB/ur.vb.md)

6. Determine the base type constraint and the interface constraints of a generic type parameter by using the [System.Type.GetGenericParameterConstraints*](https://learn.microsoft.com/search/?terms=System.Type.GetGenericParameterConstraints*) method to obtain all the constraints in a single array. Constraints are not guaranteed to be in any particular order.

   [HowToGeneric#7 (complete source file; reference: snippets/csharp/instantiate-generic-type/GenericTypes.cs#7)](../../../_code/docs/fundamentals/reflection/snippets/csharp/instantiate-generic-type/GenericTypes.cs.md)
   [HowToGeneric#7 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToGeneric/VB/ur.vb#7)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToGeneric/VB/ur.vb.md)

7. Use the [System.Type.GenericParameterAttributes](https://learn.microsoft.com/search/?terms=System.Type.GenericParameterAttributes) property to discover the special constraints on a type parameter, such as requiring that it be a reference type. The property also includes values that represent variance, which you can mask off as shown in the following code.

   [HowToGeneric#8 (complete source file; reference: snippets/csharp/instantiate-generic-type/GenericTypes.cs#8)](../../../_code/docs/fundamentals/reflection/snippets/csharp/instantiate-generic-type/GenericTypes.cs.md)
   [HowToGeneric#8 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToGeneric/VB/ur.vb#8)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToGeneric/VB/ur.vb.md)

8. The special constraint attributes are flags, and the same flag ([System.Reflection.GenericParameterAttributes.None](https://learn.microsoft.com/search/?terms=System.Reflection.GenericParameterAttributes.None)) that represents no special constraints also represents no covariance or contravariance. Thus, to test for either of these conditions, you must use the appropriate mask. In this case, use [System.Reflection.GenericParameterAttributes.SpecialConstraintMask](https://learn.microsoft.com/search/?terms=System.Reflection.GenericParameterAttributes.SpecialConstraintMask) to isolate the special constraint flags.

   [HowToGeneric#9 (complete source file; reference: snippets/csharp/instantiate-generic-type/GenericTypes.cs#9)](../../../_code/docs/fundamentals/reflection/snippets/csharp/instantiate-generic-type/GenericTypes.cs.md)
   [HowToGeneric#9 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToGeneric/VB/ur.vb#9)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToGeneric/VB/ur.vb.md)

## Construct an instance of a generic type

A generic type is like a template. You can't create instances of it unless you specify real types for its generic type parameters. To do this at runtime, using reflection, requires the [System.Type.MakeGenericType*](https://learn.microsoft.com/search/?terms=System.Type.MakeGenericType*) method.

1. Get a [System.Type](https://learn.microsoft.com/search/?terms=System.Type) object that represents the generic type. The following code gets the generic type [System.Collections.Generic.Dictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602) in two different ways: by using the [System.Type.GetType%28System.String%29](https://learn.microsoft.com/search/?terms=System.Type.GetType%2528System.String%2529) method overload with a string describing the type, and by calling the [System.Type.GetGenericTypeDefinition*](https://learn.microsoft.com/search/?terms=System.Type.GetGenericTypeDefinition*) method on the constructed type `Dictionary\<String, Example>` (`Dictionary(Of String, Example)` in Visual Basic). The [System.Type.MakeGenericType*](https://learn.microsoft.com/search/?terms=System.Type.MakeGenericType*) method requires a generic type definition.

   [HowToGeneric#10 (complete source file; reference: snippets/csharp/instantiate-generic-type/GenericTypes.cs#10)](../../../_code/docs/fundamentals/reflection/snippets/csharp/instantiate-generic-type/GenericTypes.cs.md)
   [HowToGeneric#10 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToGeneric/VB/ur.vb#10)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToGeneric/VB/ur.vb.md)

2. Construct an array of type arguments to substitute for the type parameters. The array must contain the correct number of [System.Type](https://learn.microsoft.com/search/?terms=System.Type) objects, in the same order as they appear in the type parameter list. In this case, the key (first type parameter) is of type [System.String](https://learn.microsoft.com/search/?terms=System.String), and the values in the dictionary are instances of a class named `Example`.

   [HowToGeneric#11 (complete source file; reference: snippets/csharp/instantiate-generic-type/GenericTypes.cs#11)](../../../_code/docs/fundamentals/reflection/snippets/csharp/instantiate-generic-type/GenericTypes.cs.md)
   [HowToGeneric#11 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToGeneric/VB/ur.vb#11)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToGeneric/VB/ur.vb.md)

3. Call the [System.Type.MakeGenericType*](https://learn.microsoft.com/search/?terms=System.Type.MakeGenericType*) method to bind the type arguments to the type parameters and construct the type.

   [HowToGeneric#12 (complete source file; reference: snippets/csharp/instantiate-generic-type/GenericTypes.cs#12)](../../../_code/docs/fundamentals/reflection/snippets/csharp/instantiate-generic-type/GenericTypes.cs.md)
   [HowToGeneric#12 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToGeneric/VB/ur.vb#12)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToGeneric/VB/ur.vb.md)

4. Use the [System.Activator.CreateInstance%28System.Type%29](https://learn.microsoft.com/search/?terms=System.Activator.CreateInstance%2528System.Type%2529) method overload to create an object of the constructed type. The following code stores two instances of the `Example` class in the resulting `Dictionary<String, Example>` object.

   [HowToGeneric#13 (complete source file; reference: snippets/csharp/instantiate-generic-type/GenericTypes.cs#13)](../../../_code/docs/fundamentals/reflection/snippets/csharp/instantiate-generic-type/GenericTypes.cs.md)
   [HowToGeneric#13 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToGeneric/VB/ur.vb#13)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToGeneric/VB/ur.vb.md)

## Example

The following code example defines a `DisplayGenericType` method to examine the generic type definitions and constructed types used in the code and display their information. The `DisplayGenericType` method shows how to use the [System.Type.IsGenericType*](https://learn.microsoft.com/search/?terms=System.Type.IsGenericType*), [System.Type.IsGenericParameter*](https://learn.microsoft.com/search/?terms=System.Type.IsGenericParameter*), and [System.Type.GenericParameterPosition](https://learn.microsoft.com/search/?terms=System.Type.GenericParameterPosition) properties and the [System.Type.GetGenericArguments*](https://learn.microsoft.com/search/?terms=System.Type.GetGenericArguments*) method.

The example also defines a `DisplayGenericParameter` method to examine a generic type parameter and display its constraints.

The code example defines a set of test types, including a generic type that illustrates type parameter constraints, and shows how to display information about these types.

The example constructs a type from the [System.Collections.Generic.Dictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602) class by creating an array of type arguments and calling the [System.Type.MakeGenericType*](https://learn.microsoft.com/search/?terms=System.Type.MakeGenericType*) method. The program compares the [System.Type](https://learn.microsoft.com/search/?terms=System.Type) object constructed using [System.Type.MakeGenericType*](https://learn.microsoft.com/search/?terms=System.Type.MakeGenericType*) with a [System.Type](https://learn.microsoft.com/search/?terms=System.Type) object obtained using `typeof` (`GetType` in Visual Basic), demonstrating that they are the same. Similarly, the program uses the [System.Type.GetGenericTypeDefinition*](https://learn.microsoft.com/search/?terms=System.Type.GetGenericTypeDefinition*) method to obtain the generic type definition of the constructed type, and compares it to the [System.Type](https://learn.microsoft.com/search/?terms=System.Type) object representing the [System.Collections.Generic.Dictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602) class.

[HowToGeneric#1 (complete source file; reference: snippets/csharp/instantiate-generic-type/GenericTypes.cs#1)](../../../_code/docs/fundamentals/reflection/snippets/csharp/instantiate-generic-type/GenericTypes.cs.md)
[HowToGeneric#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToGeneric/VB/ur.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToGeneric/VB/ur.vb.md)

## See also

- [System.Type](https://learn.microsoft.com/search/?terms=System.Type)
- [System.Reflection.MethodInfo](https://learn.microsoft.com/search/?terms=System.Reflection.MethodInfo)
- [Reflection and Generic Types](reflection-and-generic-types.md)
- [Viewing Type Information](viewing-type-information.md)
- [Generics](../../standard/generics/index.md)
