---
title: "How to: Define a Generic Type with Reflection Emit (.NET Framework)"
titleSuffix: ""
description: Learn how to define a generic type with reflection emit. Create a generic type with two type parameters, apply class constraints, interface constraints, and more.
ms.date: 01/09/2026
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "generics [.NET], reflection emit"
  - "generics [.NET], dynamic types"
  - "reflection emit, generic types"
---
# How to: Define a generic type with reflection emit (.NET Framework)

> **Important:**
> This how-to article shows .NET Framework-specific APIs that aren't available in modern .NET. To save a dynamic assembly to disk in modern .NET, use the [System.Reflection.Emit.PersistedAssemblyBuilder](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.PersistedAssemblyBuilder) type.

This article shows you how to:

- Create a simple generic type with two type parameters.
- Apply class constraints, interface constraints, and special constraints to the type parameters.
- Create members that use the type parameters of the class as parameter types and return types.

> **Important:**
> A method is not generic just because it belongs to a generic type and uses the type parameters of that type. A method is generic only if it has its own type parameter list. Most methods on generic types are not generic, as in this example. For an example of emitting a generic method, see [How to: Define a Generic Method with Reflection Emit](how-to-define-a-generic-method-with-reflection-emit.md).

## Define a generic type

1. Define a dynamic assembly named `GenericEmitExample1`. In this example, the assembly is executed and saved to disk, so [System.Reflection.Emit.AssemblyBuilderAccess.RunAndSave](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.AssemblyBuilderAccess.RunAndSave) is specified.

   [EmitGenericType#2 (complete source file; reference: ./snippets/csharp/emit-generic-type/source.cs#2)](../../../_code/docs/fundamentals/reflection/snippets/csharp/emit-generic-type/source.cs.md)
   [EmitGenericType#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/EmitGenericType/VB/source.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/EmitGenericType/VB/source.vb.md)

1. Define a dynamic module. An assembly is made up of executable modules. For a single-module assembly, the module name is the same as the assembly name, and the file name is the module name plus an extension.

   [EmitGenericType#3 (complete source file; reference: ./snippets/csharp/emit-generic-type/source.cs#3)](../../../_code/docs/fundamentals/reflection/snippets/csharp/emit-generic-type/source.cs.md)
   [EmitGenericType#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/EmitGenericType/VB/source.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/EmitGenericType/VB/source.vb.md)

1. Define a class. In this example, the class is named `Sample`.

   [EmitGenericType#4 (complete source file; reference: ./snippets/csharp/emit-generic-type/source.cs#4)](../../../_code/docs/fundamentals/reflection/snippets/csharp/emit-generic-type/source.cs.md)
   [EmitGenericType#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/EmitGenericType/VB/source.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/EmitGenericType/VB/source.vb.md)

1. Define the generic type parameters of `Sample` by passing an array of strings containing the names of the parameters to the [System.Reflection.Emit.TypeBuilder.DefineGenericParameters*](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.TypeBuilder.DefineGenericParameters*) method. This makes the class a generic type. The return value is an array of [System.Reflection.Emit.GenericTypeParameterBuilder](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.GenericTypeParameterBuilder) objects representing the type parameters, which can be used in your emitted code.

   In the following code, `Sample` becomes a generic type with type parameters `TFirst` and `TSecond`. To make the code easier to read, each [System.Reflection.Emit.GenericTypeParameterBuilder](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.GenericTypeParameterBuilder) is placed in a variable with the same name as the type parameter.

   [EmitGenericType#5 (complete source file; reference: ./snippets/csharp/emit-generic-type/source.cs#5)](../../../_code/docs/fundamentals/reflection/snippets/csharp/emit-generic-type/source.cs.md)
   [EmitGenericType#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/EmitGenericType/VB/source.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/EmitGenericType/VB/source.vb.md)

1. Add special constraints to the type parameters. In this example, type parameter `TFirst` is constrained to types that have parameterless constructors, and to reference types.

   [EmitGenericType#6 (complete source file; reference: ./snippets/csharp/emit-generic-type/source.cs#6)](../../../_code/docs/fundamentals/reflection/snippets/csharp/emit-generic-type/source.cs.md)
   [EmitGenericType#6 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/EmitGenericType/VB/source.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/EmitGenericType/VB/source.vb.md)

1. Optionally add class and interface constraints to the type parameters. In this example, type parameter `TFirst` is constrained to types that derive from the base class represented by the [System.Type](https://learn.microsoft.com/search/?terms=System.Type) object contained in the variable `baseType`, and that implement the interfaces whose types are contained in the variables `interfaceA` and `interfaceB`. See the code example for the declaration and assignment of these variables.

   [EmitGenericType#7 (complete source file; reference: ./snippets/csharp/emit-generic-type/source.cs#7)](../../../_code/docs/fundamentals/reflection/snippets/csharp/emit-generic-type/source.cs.md)
   [EmitGenericType#7 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/EmitGenericType/VB/source.vb#7)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/EmitGenericType/VB/source.vb.md)

1. Define a field. In this example, the type of the field is specified by type parameter `TFirst`. [System.Reflection.Emit.GenericTypeParameterBuilder](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.GenericTypeParameterBuilder) derives from [System.Type](https://learn.microsoft.com/search/?terms=System.Type), so you can use generic type parameters anywhere a type can be used.

   [EmitGenericType#21 (complete source file; reference: ./snippets/csharp/emit-generic-type/source.cs#21)](../../../_code/docs/fundamentals/reflection/snippets/csharp/emit-generic-type/source.cs.md)
   [EmitGenericType#21 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/EmitGenericType/VB/source.vb#21)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/EmitGenericType/VB/source.vb.md)

1. Define a method that uses the type parameters of the generic type. Note that such methods are not generic unless they have their own type parameter lists. The following code defines a `static` method (`Shared` in Visual Basic) that takes an array of `TFirst` and returns a `List<TFirst>` (`List(Of TFirst)` in Visual Basic) containing all the elements of the array. To define this method, it is necessary to create the type `List<TFirst>` by calling [System.Type.MakeGenericType*](https://learn.microsoft.com/search/?terms=System.Type.MakeGenericType*) on the generic type definition, `List<T>`. (The `T` is omitted when you use the `typeof` operator (`GetType` in Visual Basic) to get the generic type definition.) The parameter type is created by using the [System.Type.MakeArrayType*](https://learn.microsoft.com/search/?terms=System.Type.MakeArrayType*) method.

   [EmitGenericType#22 (complete source file; reference: ./snippets/csharp/emit-generic-type/source.cs#22)](../../../_code/docs/fundamentals/reflection/snippets/csharp/emit-generic-type/source.cs.md)
   [EmitGenericType#22 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/EmitGenericType/VB/source.vb#22)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/EmitGenericType/VB/source.vb.md)

1. Emit the method body. The method body consists of three opcodes that load the input array onto the stack, call the `List<TFirst>` constructor that takes `IEnumerable<TFirst>` (which does all the work of putting the input elements into the list), and return (leaving the new [System.Collections.Generic.List`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601) object on the stack). The difficult part of emitting this code is getting the constructor.

   The [System.Type.GetConstructor*](https://learn.microsoft.com/search/?terms=System.Type.GetConstructor*) method is not supported on a [System.Reflection.Emit.GenericTypeParameterBuilder](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.GenericTypeParameterBuilder), so it is not possible to get the constructor of `List<TFirst>` directly. First, it is necessary to get the constructor of the generic type definition `List<T>` and then to call a method that converts it to the corresponding constructor of `List<TFirst>`.

   The constructor used for this code example takes an `IEnumerable<T>`. Note, however, that this is not the generic type definition of the [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) generic interface; instead, the type parameter `T` from `List<T>` must be substituted for the type parameter `T` of `IEnumerable<T>`. (This seems confusing only because both types have type parameters named `T`. That is why this code example uses the names `TFirst` and `TSecond`.) To get the type of the constructor argument, start with the generic type definition `IEnumerable<T>` and call [System.Type.MakeGenericType*](https://learn.microsoft.com/search/?terms=System.Type.MakeGenericType*) with the first generic type parameter of `List<T>`. The constructor argument list must be passed as an array, with just one argument in this case.

    > **Note:**
    > The generic type definition is expressed as `IEnumerable<>` when you use the `typeof` operator in C#, or `IEnumerable(Of )` when you use the `GetType` operator in Visual Basic.

   Now it is possible to get the constructor of `List<T>` by calling [System.Type.GetConstructor*](https://learn.microsoft.com/search/?terms=System.Type.GetConstructor*) on the generic type definition. To convert this constructor to the corresponding constructor of `List<TFirst>`, pass `List<TFirst>` and the constructor from `List<T>` to the static [System.Reflection.Emit.TypeBuilder.GetConstructor%28System.Type%2CSystem.Reflection.ConstructorInfo%29](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.TypeBuilder.GetConstructor%2528System.Type%252CSystem.Reflection.ConstructorInfo%2529) method.

   [EmitGenericType#23 (complete source file; reference: ./snippets/csharp/emit-generic-type/source.cs#23)](../../../_code/docs/fundamentals/reflection/snippets/csharp/emit-generic-type/source.cs.md)
   [EmitGenericType#23 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/EmitGenericType/VB/source.vb#23)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/EmitGenericType/VB/source.vb.md)

1. Create the type and save the file.

   [EmitGenericType#8 (complete source file; reference: ./snippets/csharp/emit-generic-type/source.cs#8)](../../../_code/docs/fundamentals/reflection/snippets/csharp/emit-generic-type/source.cs.md)
   [EmitGenericType#8 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/EmitGenericType/VB/source.vb#8)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/EmitGenericType/VB/source.vb.md)

1. Invoke the method. `ExampleMethod` is not generic, but the type it belongs to is generic, so to get a [System.Reflection.MethodInfo](https://learn.microsoft.com/search/?terms=System.Reflection.MethodInfo) that can be invoked, it's necessary to create a constructed type from the type definition for `Sample`. The constructed type uses the `Example` class, which satisfies the constraints on `TFirst` because it is a reference type and has a default parameterless constructor, and the `ExampleDerived` class which satisfies the constraints on `TSecond`. (The code for `ExampleDerived` can be found in the example code section.) These two types are passed to [System.Type.MakeGenericType*](https://learn.microsoft.com/search/?terms=System.Type.MakeGenericType*) to create the constructed type. The [System.Reflection.MethodInfo](https://learn.microsoft.com/search/?terms=System.Reflection.MethodInfo) is then obtained using the [System.Type.GetMethod*](https://learn.microsoft.com/search/?terms=System.Type.GetMethod*) method.

   [EmitGenericType#9 (complete source file; reference: ./snippets/csharp/emit-generic-type/source.cs#9)](../../../_code/docs/fundamentals/reflection/snippets/csharp/emit-generic-type/source.cs.md)
   [EmitGenericType#9 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/EmitGenericType/VB/source.vb#9)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/EmitGenericType/VB/source.vb.md)

1. The following code creates an array of `Example` objects, places that array in an array of type [System.Object](https://learn.microsoft.com/search/?terms=System.Object) representing the arguments of the method to be invoked, and passes them to the [System.Reflection.MethodBase.Invoke%28System.Object%2CSystem.Object%5B%5D%29](https://learn.microsoft.com/search/?terms=System.Reflection.MethodBase.Invoke%2528System.Object%252CSystem.Object%255B%255D%2529) method. The first argument of the [System.Reflection.MethodBase.Invoke*](https://learn.microsoft.com/search/?terms=System.Reflection.MethodBase.Invoke*) method is a null reference because the method is `static`.

   [EmitGenericType#10 (complete source file; reference: ./snippets/csharp/emit-generic-type/source.cs#10)](../../../_code/docs/fundamentals/reflection/snippets/csharp/emit-generic-type/source.cs.md)
   [EmitGenericType#10 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/EmitGenericType/VB/source.vb#10)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/EmitGenericType/VB/source.vb.md)

## Example

The following code example shows the full program. It defines a class named `Sample`, along with a base class and two interfaces. The program defines two generic type parameters for `Sample`, turning it into a generic type. Type parameters are the only thing that makes a type generic. The program shows this by displaying a test message before and after the definition of the type parameters.

The type parameter `TSecond` is used to demonstrate class and interface constraints, using the base class and interfaces, and the type parameter `TFirst` is used to demonstrate special constraints.

The code example defines a field and a method using the class's type parameters for the field type and for the parameter and return type of the method.

After the `Sample` class has been created, the method is invoked.

The program includes a method that lists information about a generic type, and a method that lists the special constraints on a type parameter. These methods are used to display information about the finished `Sample` class.

The program saves the finished module to disk as `GenericEmitExample1.dll`, so you can open it with the [Ildasm.exe (IL Disassembler)](../../framework/tools/ildasm-exe-il-disassembler.md) and examine the CIL for the `Sample` class.

[EmitGenericType#1 (complete source file; reference: ./snippets/csharp/emit-generic-type/source.cs#1)](../../../_code/docs/fundamentals/reflection/snippets/csharp/emit-generic-type/source.cs.md)
[EmitGenericType#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/EmitGenericType/VB/source.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/EmitGenericType/VB/source.vb.md)

## See also

- [System.Reflection.Emit.GenericTypeParameterBuilder](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.GenericTypeParameterBuilder)
- [Using Reflection Emit](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/3y322t50\(v=vs.100\))
- [Reflection Emit Dynamic Assembly Scenarios](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/tt9483fk\(v=vs.100\))
