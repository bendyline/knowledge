---
title: "How to: Define a Generic Method with Reflection Emit (.NET Framework)"
titleSuffix: ""
description: Define a generic method with reflection emit. One example creates a generic method with two type parameters. A second example shows how to emit the method body.
ms.date: 03/27/2024
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "generics [.NET], reflection emit"
  - "reflection emit, generic methods"
  - "generics [.NET], dynamic types"
---
# How to: Define a generic method with reflection emit (.NET Framework)

> **Important:**
> This how-to article shows .NET Framework-specific APIs that aren't available in modern .NET. To save a dynamic assembly to disk in modern .NET, use the [System.Reflection.Emit.PersistedAssemblyBuilder](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.PersistedAssemblyBuilder) type.

The first procedure shows how to create a simple generic method with two type parameters, and how to apply class constraints, interface constraints, and special constraints to the type parameters.

The second procedure shows how to emit the method body, and how to use the type parameters of the generic method to create instances of generic types and to call their methods.

The third procedure shows how to invoke the generic method.

> **Important:**
> A method is not generic just because it belongs to a generic type and uses the type parameters of that type. A method is generic only if it has its own type parameter list. A generic method can appear on a nongeneric type, as in this example. For an example of a nongeneric method on a generic type, see [How to: Define a Generic Type with Reflection Emit](how-to-define-a-generic-type-with-reflection-emit.md).

## Define a generic method

1. Before beginning, it is useful to look at how the generic method appears when written using a high-level language. The following code is included in the example code for this article, along with code to call the generic method. The method has two type parameters, `TInput` and `TOutput`, the second of which must be a reference type (`class`), must have a parameterless constructor (`new`), and must implement `ICollection<TInput>`. This interface constraint ensures that the [System.Collections.Generic.ICollection`1.Add*](https://learn.microsoft.com/search/?terms=System.Collections.Generic.ICollection%601.Add*) method can be used to add elements to the `TOutput` collection that the method creates. The method has one formal parameter, `input`, which is an array of `TInput`. The method creates a collection of type `TOutput` and copies the elements of `input` to the collection.

   [GenericMethodHowTo#20 (complete source file; reference: ./snippets/csharp/construct-generic-method/source.cs#20)](../../../_code/docs/fundamentals/reflection/snippets/csharp/construct-generic-method/source.cs.md)
   [GenericMethodHowTo#20 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb#20)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb.md)

1. Define a dynamic assembly and a dynamic module to contain the type the generic method belongs to. In this case, the assembly has only one module, named `DemoMethodBuilder1`, and the module name is the same as the assembly name plus an extension. In this example, the assembly is saved to disk and also executed, so [System.Reflection.Emit.AssemblyBuilderAccess.RunAndSave](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.AssemblyBuilderAccess.RunAndSave) is specified. You can use the [Ildasm.exe (IL Disassembler)](../../framework/tools/ildasm-exe-il-disassembler.md) to examine DemoMethodBuilder1.dll and to compare it to the common intermediate language (CIL) for the method shown in step 1.

   [GenericMethodHowTo#2 (complete source file; reference: ./snippets/csharp/construct-generic-method/source.cs#2)](../../../_code/docs/fundamentals/reflection/snippets/csharp/construct-generic-method/source.cs.md)
   [GenericMethodHowTo#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb.md)

1. Define the type the generic method belongs to. The type does not have to be generic. A generic method can belong to either a generic or nongeneric type. In this example, the type is a class, is not generic, and is named `DemoType`.

   [GenericMethodHowTo#3 (complete source file; reference: ./snippets/csharp/construct-generic-method/source.cs#3)](../../../_code/docs/fundamentals/reflection/snippets/csharp/construct-generic-method/source.cs.md)
   [GenericMethodHowTo#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb.md)

1. Define the generic method. If the types of a generic method's formal parameters are specified by generic type parameters of the generic method, use the [System.Reflection.Emit.TypeBuilder.DefineMethod%28System.String%2CSystem.Reflection.MethodAttributes%29](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.TypeBuilder.DefineMethod%2528System.String%252CSystem.Reflection.MethodAttributes%2529) method overload to define the method. The generic type parameters of the method are not yet defined, so you cannot specify the types of the method's formal parameters in the call to [System.Reflection.Emit.TypeBuilder.DefineMethod*](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.TypeBuilder.DefineMethod*). In this example, the method is named `Factory`. The method is public and `static` (`Shared` in Visual Basic).

   [GenericMethodHowTo#4 (complete source file; reference: ./snippets/csharp/construct-generic-method/source.cs#4)](../../../_code/docs/fundamentals/reflection/snippets/csharp/construct-generic-method/source.cs.md)
   [GenericMethodHowTo#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb.md)

1. Define the generic type parameters of `DemoMethod` by passing an array of strings containing the names of the parameters to the [System.Reflection.Emit.MethodBuilder.DefineGenericParameters*](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.MethodBuilder.DefineGenericParameters*) method. This makes the method a generic method. The following code makes `Factory` a generic method with type parameters `TInput` and `TOutput`. To make the code easier to read, variables with these names are created to hold the [System.Reflection.Emit.GenericTypeParameterBuilder](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.GenericTypeParameterBuilder) objects representing the two type parameters.

   [GenericMethodHowTo#5 (complete source file; reference: ./snippets/csharp/construct-generic-method/source.cs#5)](../../../_code/docs/fundamentals/reflection/snippets/csharp/construct-generic-method/source.cs.md)
   [GenericMethodHowTo#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb.md)

1. Optionally add special constraints to the type parameters. Special constraints are added using the [System.Reflection.Emit.GenericTypeParameterBuilder.SetGenericParameterAttributes*](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.GenericTypeParameterBuilder.SetGenericParameterAttributes*) method. In this example, `TOutput` is constrained to be a reference type and to have a parameterless constructor.

   [GenericMethodHowTo#6 (complete source file; reference: ./snippets/csharp/construct-generic-method/source.cs#6)](../../../_code/docs/fundamentals/reflection/snippets/csharp/construct-generic-method/source.cs.md)
   [GenericMethodHowTo#6 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb.md)

1. Optionally add class and interface constraints to the type parameters. In this example, type parameter `TOutput` is constrained to types that implement the `ICollection(Of TInput)` (`ICollection<TInput>` in C#) interface. This ensures that the [System.Collections.Generic.ICollection`1.Add*](https://learn.microsoft.com/search/?terms=System.Collections.Generic.ICollection%601.Add*) method can be used to add elements.

   [GenericMethodHowTo#7 (complete source file; reference: ./snippets/csharp/construct-generic-method/source.cs#7)](../../../_code/docs/fundamentals/reflection/snippets/csharp/construct-generic-method/source.cs.md)
   [GenericMethodHowTo#7 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb#7)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb.md)

1. Define the formal parameters of the method, using the [System.Reflection.Emit.MethodBuilder.SetParameters*](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.MethodBuilder.SetParameters*) method. In this example, the `Factory` method has one parameter, an array of `TInput`. This type is created by calling the [System.Type.MakeArrayType*](https://learn.microsoft.com/search/?terms=System.Type.MakeArrayType*) method on the [System.Reflection.Emit.GenericTypeParameterBuilder](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.GenericTypeParameterBuilder) that represents `TInput`. The argument of [System.Reflection.Emit.MethodBuilder.SetParameters*](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.MethodBuilder.SetParameters*) is an array of [System.Type](https://learn.microsoft.com/search/?terms=System.Type) objects.

   [GenericMethodHowTo#8 (complete source file; reference: ./snippets/csharp/construct-generic-method/source.cs#8)](../../../_code/docs/fundamentals/reflection/snippets/csharp/construct-generic-method/source.cs.md)
   [GenericMethodHowTo#8 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb#8)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb.md)

1. Define the return type for the method, using the [System.Reflection.Emit.MethodBuilder.SetReturnType*](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.MethodBuilder.SetReturnType*) method. In this example, an instance of `TOutput` is returned.

   [GenericMethodHowTo#9 (complete source file; reference: ./snippets/csharp/construct-generic-method/source.cs#9)](../../../_code/docs/fundamentals/reflection/snippets/csharp/construct-generic-method/source.cs.md)
   [GenericMethodHowTo#9 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb#9)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb.md)

1. Emit the method body, using [System.Reflection.Emit.ILGenerator](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.ILGenerator). For details, see the accompanying procedure for emitting the method body.

   > **Important:**
   > When you emit calls to methods of generic types, and the type arguments of those types are type parameters of the generic method, you must use the `static`[System.Reflection.Emit.TypeBuilder.GetConstructor%28System.Type%2CSystem.Reflection.ConstructorInfo%29](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.TypeBuilder.GetConstructor%2528System.Type%252CSystem.Reflection.ConstructorInfo%2529), [System.Reflection.Emit.TypeBuilder.GetMethod%28System.Type%2CSystem.Reflection.MethodInfo%29](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.TypeBuilder.GetMethod%2528System.Type%252CSystem.Reflection.MethodInfo%2529), and [System.Reflection.Emit.TypeBuilder.GetField%28System.Type%2CSystem.Reflection.FieldInfo%29](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.TypeBuilder.GetField%2528System.Type%252CSystem.Reflection.FieldInfo%2529) method overloads of the [System.Reflection.Emit.TypeBuilder](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.TypeBuilder) class to obtain constructed forms of the methods. The accompanying procedure for emitting the method body demonstrates this.

1. Complete the type that contains the method and save the assembly. The accompanying procedure for invoking the generic method shows two ways to invoke the completed method.

   [GenericMethodHowTo#14 (complete source file; reference: ./snippets/csharp/construct-generic-method/source.cs#14)](../../../_code/docs/fundamentals/reflection/snippets/csharp/construct-generic-method/source.cs.md)
   [GenericMethodHowTo#14 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb#14)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb.md)

## Emit the method body

1. Get a code generator and declare local variables and labels. The [System.Reflection.Emit.ILGenerator.DeclareLocal*](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.ILGenerator.DeclareLocal*) method is used to declare local variables. The `Factory` method has four local variables: `retVal` to hold the new `TOutput` that is returned by the method, `ic` to hold the `TOutput` when it is cast to `ICollection<TInput>`, `input` to hold the input array of `TInput` objects, and `index` to iterate through the array. The method also has two labels, one to enter the loop (`enterLoop`) and one for the top of the loop (`loopAgain`), defined using the [System.Reflection.Emit.ILGenerator.DefineLabel*](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.ILGenerator.DefineLabel*) method.

   The first thing the method does is to load its argument using [System.Reflection.Emit.OpCodes.Ldarg_0](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.OpCodes.Ldarg_0) opcode and to store it in the local variable `input` using [System.Reflection.Emit.OpCodes.Stloc_S](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.OpCodes.Stloc_S) opcode.

   [GenericMethodHowTo#10 (complete source file; reference: ./snippets/csharp/construct-generic-method/source.cs#10)](../../../_code/docs/fundamentals/reflection/snippets/csharp/construct-generic-method/source.cs.md)
   [GenericMethodHowTo#10 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb#10)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb.md)

2. Emit code to create an instance of `TOutput`, using the generic method overload of the [System.Activator.CreateInstance*](https://learn.microsoft.com/search/?terms=System.Activator.CreateInstance*) method. Using this overload requires the specified type to have a parameterless constructor, which is the reason for adding that constraint to `TOutput`. Create the constructed generic method by passing `TOutput` to [System.Reflection.MethodInfo.MakeGenericMethod*](https://learn.microsoft.com/search/?terms=System.Reflection.MethodInfo.MakeGenericMethod*). After emitting code to call the method, emit code to store it in the local variable `retVal` using [System.Reflection.Emit.OpCodes.Stloc_S](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.OpCodes.Stloc_S)

   [GenericMethodHowTo#11 (complete source file; reference: ./snippets/csharp/construct-generic-method/source.cs#11)](../../../_code/docs/fundamentals/reflection/snippets/csharp/construct-generic-method/source.cs.md)
   [GenericMethodHowTo#11 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb#11)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb.md)

3. Emit code to cast the new `TOutput` object to `ICollection(Of TInput)` and store it in the local variable `ic`.

   [GenericMethodHowTo#31 (complete source file; reference: ./snippets/csharp/construct-generic-method/source.cs#31)](../../../_code/docs/fundamentals/reflection/snippets/csharp/construct-generic-method/source.cs.md)
   [GenericMethodHowTo#31 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb#31)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb.md)

4. Get a [System.Reflection.MethodInfo](https://learn.microsoft.com/search/?terms=System.Reflection.MethodInfo) representing the [System.Collections.Generic.ICollection`1.Add*](https://learn.microsoft.com/search/?terms=System.Collections.Generic.ICollection%601.Add*) method. The method is acting on an `ICollection<TInput>`, so it's necessary to get the `Add` method specific to that constructed type. You cannot use the [System.Type.GetMethod*](https://learn.microsoft.com/search/?terms=System.Type.GetMethod*) method to get this [System.Reflection.MethodInfo](https://learn.microsoft.com/search/?terms=System.Reflection.MethodInfo) directly from `icollOfTInput`, because [System.Type.GetMethod*](https://learn.microsoft.com/search/?terms=System.Type.GetMethod*) is not supported on a type that has been constructed with a [System.Reflection.Emit.GenericTypeParameterBuilder](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.GenericTypeParameterBuilder). Instead, call [System.Type.GetMethod*](https://learn.microsoft.com/search/?terms=System.Type.GetMethod*) on `icoll`, which contains the generic type definition for the [System.Collections.Generic.ICollection`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.ICollection%601) generic interface. Then use the [System.Reflection.Emit.TypeBuilder.GetMethod%28System.Type%2CSystem.Reflection.MethodInfo%29](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.TypeBuilder.GetMethod%2528System.Type%252CSystem.Reflection.MethodInfo%2529)`static` method to produce the [System.Reflection.MethodInfo](https://learn.microsoft.com/search/?terms=System.Reflection.MethodInfo) for the constructed type. The following code demonstrates this.

   [GenericMethodHowTo#12 (complete source file; reference: ./snippets/csharp/construct-generic-method/source.cs#12)](../../../_code/docs/fundamentals/reflection/snippets/csharp/construct-generic-method/source.cs.md)
   [GenericMethodHowTo#12 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb#12)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb.md)

5. Emit code to initialize the `index` variable, by loading a 32-bit integer 0 and storing it in the variable. Emit code to branch to the label `enterLoop`. This label has not yet been marked, because it is inside the loop. Code for the loop is emitted in the next step.

   [GenericMethodHowTo#32 (complete source file; reference: ./snippets/csharp/construct-generic-method/source.cs#32)](../../../_code/docs/fundamentals/reflection/snippets/csharp/construct-generic-method/source.cs.md)
   [GenericMethodHowTo#32 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb#32)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb.md)

6. Emit code for the loop. The first step is to mark the top of the loop, by calling [System.Reflection.Emit.ILGenerator.MarkLabel*](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.ILGenerator.MarkLabel*) with the `loopAgain` label. Branch statements that use the label will now branch to this point in the code. The next step is to push the `TOutput` object, cast to `ICollection(Of TInput)`, onto the stack. It is not needed immediately, but needs to be in position for calling the `Add` method. Next the input array is pushed onto the stack, then the `index` variable containing the current index into the array. The [System.Reflection.Emit.OpCodes.Ldelem](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.OpCodes.Ldelem) opcode pops the index and the array off the stack and pushes the indexed array element onto the stack. The stack is now ready for the call to the [System.Collections.Generic.ICollection`1.Add*](https://learn.microsoft.com/search/?terms=System.Collections.Generic.ICollection%601.Add*) method, which pops the collection and the new element off the stack and adds the element to the collection.

   The rest of the code in the loop increments the index and tests to see whether the loop is finished: The index and a 32-bit integer 1 are pushed onto the stack and added, leaving the sum on the stack; the sum is stored in `index`. [System.Reflection.Emit.ILGenerator.MarkLabel*](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.ILGenerator.MarkLabel*) is called to set this point as the entry point for the loop. The index is loaded again. The input array is pushed on the stack, and [System.Reflection.Emit.OpCodes.Ldlen](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.OpCodes.Ldlen) is emitted to get its length. The index and the length are now on the stack, and [System.Reflection.Emit.OpCodes.Clt](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.OpCodes.Clt) is emitted to compare them. If the index is less than the length, [System.Reflection.Emit.OpCodes.Brtrue_S](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.OpCodes.Brtrue_S) branches back to the beginning of the loop.

   [GenericMethodHowTo#13 (complete source file; reference: ./snippets/csharp/construct-generic-method/source.cs#13)](../../../_code/docs/fundamentals/reflection/snippets/csharp/construct-generic-method/source.cs.md)
   [GenericMethodHowTo#13 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb#13)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb.md)

7. Emit code to push the `TOutput` object onto the stack and return from the method. The local variables `retVal` and `ic` both contain references to the new `TOutput`; `ic` is used only to access the [System.Collections.Generic.ICollection`1.Add*](https://learn.microsoft.com/search/?terms=System.Collections.Generic.ICollection%601.Add*) method.

   [GenericMethodHowTo#33 (complete source file; reference: ./snippets/csharp/construct-generic-method/source.cs#33)](../../../_code/docs/fundamentals/reflection/snippets/csharp/construct-generic-method/source.cs.md)
   [GenericMethodHowTo#33 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb#33)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb.md)

## Invoke the generic method

1. `Factory` is a generic method definition. In order to invoke it, you must assign types to its generic type parameters. Use the [System.Reflection.MethodInfo.MakeGenericMethod*](https://learn.microsoft.com/search/?terms=System.Reflection.MethodInfo.MakeGenericMethod*) method to do this. The following code creates a constructed generic method, specifying [System.String](https://learn.microsoft.com/search/?terms=System.String) for `TInput` and `List(Of String)` (`List<string>` in C#) for `TOutput`, and displays a string representation of the method.

   [GenericMethodHowTo#21 (complete source file; reference: ./snippets/csharp/construct-generic-method/source.cs#21)](../../../_code/docs/fundamentals/reflection/snippets/csharp/construct-generic-method/source.cs.md)
   [GenericMethodHowTo#21 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb#21)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb.md)

2. To invoke the method late-bound, use the [System.Reflection.MethodBase.Invoke*](https://learn.microsoft.com/search/?terms=System.Reflection.MethodBase.Invoke*) method. The following code creates an array of [System.Object](https://learn.microsoft.com/search/?terms=System.Object), containing as its only element an array of strings, and passes it as the argument list for the generic method. The first parameter of [System.Reflection.MethodBase.Invoke*](https://learn.microsoft.com/search/?terms=System.Reflection.MethodBase.Invoke*) is a null reference because the method is `static`. The return value is cast to `List(Of String)`, and its first element is displayed.

   [GenericMethodHowTo#22 (complete source file; reference: ./snippets/csharp/construct-generic-method/source.cs#22)](../../../_code/docs/fundamentals/reflection/snippets/csharp/construct-generic-method/source.cs.md)
   [GenericMethodHowTo#22 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb#22)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb.md)

3. To invoke the method using a delegate, you must have a delegate that matches the signature of the constructed generic method. An easy way to do this is to create a generic delegate. The following code creates an instance of the generic delegate `D` defined in the example code, using the [System.Delegate.CreateDelegate%28System.Type%2CSystem.Reflection.MethodInfo%29](https://learn.microsoft.com/search/?terms=System.Delegate.CreateDelegate%2528System.Type%252CSystem.Reflection.MethodInfo%2529) method overload, and invokes the delegate. Delegates perform better than late-bound calls.

   [GenericMethodHowTo#23 (complete source file; reference: ./snippets/csharp/construct-generic-method/source.cs#23)](../../../_code/docs/fundamentals/reflection/snippets/csharp/construct-generic-method/source.cs.md)
   [GenericMethodHowTo#23 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb#23)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb.md)

4. The emitted method can also be called from a program that refers to the saved assembly.

## Example

The following code example creates a nongeneric type, `DemoType`, with a generic method, `Factory`. This method has two generic type parameters, `TInput` to specify an input type and `TOutput` to specify an output type. The `TOutput` type parameter is constrained to implement `ICollection<TInput>` (`ICollection(Of TInput)` in Visual Basic), to be a reference type, and to have a parameterless constructor.

The method has one formal parameter, which is an array of `TInput`. The method returns an instance of `TOutput` that contains all the elements of the input array. `TOutput` can be any generic collection type that implements the [System.Collections.Generic.ICollection`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.ICollection%601) generic interface.

When the code is executed, the dynamic assembly is saved as DemoGenericMethod1.dll, and can be examined using the [Ildasm.exe (IL Disassembler)](../../framework/tools/ildasm-exe-il-disassembler.md).

> **Note:**
> A good way to learn how to emit code is to write a program that performs the task you're trying to emit, and use the disassembler to examine the CIL produced by the compiler.

The code example includes source code that's equivalent to the emitted method. The emitted method is invoked late-bound and also by using a generic delegate declared in the code example.

[GenericMethodHowTo#1 (complete source file; reference: ./snippets/csharp/construct-generic-method/source.cs#1)](../../../_code/docs/fundamentals/reflection/snippets/csharp/construct-generic-method/source.cs.md)
[GenericMethodHowTo#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/GenericMethodHowTo/VB/source.vb.md)

## See also

- [System.Reflection.Emit.MethodBuilder](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.MethodBuilder)
- [How to: Define a Generic Type with Reflection Emit](how-to-define-a-generic-type-with-reflection-emit.md)
