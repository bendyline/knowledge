---
title: "Dynamically Loading and Using Types"
description: Dynamically load and use types in .NET. Use reflection, which provides infrastructure used by language compilers to implement implicit late binding.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "late binding, about late binding"
  - "early binding"
  - "dynamically loading and using types"
  - "implicit late binding"
  - "reflection, dynamically using types"
---
# Dynamically load and use types

Reflection provides infrastructure used by language compilers to implement implicit late binding. Binding is the process of locating the declaration (that is, the implementation) that corresponds to a uniquely specified type. When this process occurs at runtime rather than at compile time, it's called late binding. Visual Basic allows you to use implicit late binding in your code; the Visual Basic compiler calls a helper method that uses reflection to obtain the object type. The arguments passed to the helper method cause the appropriate method to be invoked at runtime. These arguments are the instance (an object) on which to invoke the method, the name of the invoked method (a string), and the arguments passed to the invoked method (an array of objects).

In the following example, the Visual Basic compiler uses reflection implicitly to call a method on an object whose type is not known at compile time. A `HelloWorld` class has a `PrintHello` method that prints out "Hello World" concatenated with some text that's passed to the `PrintHello` method. The `PrintHello` method called in this example is actually a [System.Type.InvokeMember*](https://learn.microsoft.com/search/?terms=System.Type.InvokeMember*); the Visual Basic code allows the `PrintHello` method to be invoked as if the type of the object (`helloObj`) were known at compile time (early binding) rather than at runtime (late binding).

```vb
Module Hello
    Sub Main()
        ' Sets up the variable.
        Dim helloObj As Object
        ' Creates the object.
        helloObj = new HelloWorld()
        ' Invokes the print method as if it was early bound
        ' even though it is really late bound.
        helloObj.PrintHello("Visual Basic Late Bound")
    End Sub
End Module
```

## Custom binding

In addition to being used implicitly by compilers for late binding, reflection can be used explicitly in code to accomplish late binding.

The [common language runtime](../../standard/clr.md) supports multiple programming languages, and the binding rules of these languages differ. In the early-bound case, code generators can completely control this binding. However, in late binding through reflection, binding must be controlled by customized binding. The [System.Reflection.Binder](https://learn.microsoft.com/search/?terms=System.Reflection.Binder) class provides custom control of member selection and invocation.

Using custom binding, you can load an assembly at runtime, obtain information about types in that assembly, specify the type that you want, and then invoke methods or access fields or properties on that type. This technique is useful if you don't know an object's type at compile time, such as when the object type is dependent on user input.

The following example demonstrates a simple custom binder that provides no argument type conversion. Code for `Simple_Type.dll` precedes the main example. Be sure to build `Simple_Type.dll` and then include a reference to it in the project at build time.

[Conceptual.Types.Dynamic#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.types.dynamic/cs/source1.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.types.dynamic/cs/source1.cs.md)
[Conceptual.Types.Dynamic#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.types.dynamic/vb/source1.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.types.dynamic/vb/source1.vb.md)

### InvokeMember and CreateInstance

Use [System.Type.InvokeMember*](https://learn.microsoft.com/search/?terms=System.Type.InvokeMember*) to invoke a member of a type. The `CreateInstance` methods of various classes, such as [System.Activator.CreateInstance*](https://learn.microsoft.com/search/?terms=System.Activator.CreateInstance*) and [System.Reflection.Assembly.CreateInstance*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.CreateInstance*), are specialized forms of `InvokeMember` that create new instances of the specified type. The `Binder` class is used for overload resolution and argument coercion in these methods.

The following example shows the three possible combinations of argument coercion (type conversion) and member selection. In Case 1, no argument coercion or member selection is needed. In Case 2, only member selection is needed. In Case 3, only argument coercion is needed.

[Conceptual.Types.Dynamic#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.types.dynamic/cs/source2.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.types.dynamic/cs/source2.cs.md)
[Conceptual.Types.Dynamic#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.types.dynamic/vb/source2.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.types.dynamic/vb/source2.vb.md)

Overload resolution is needed when more than one member with the same name is available. The [System.Reflection.Binder.BindToMethod*](https://learn.microsoft.com/search/?terms=System.Reflection.Binder.BindToMethod*) and [System.Reflection.Binder.BindToField*](https://learn.microsoft.com/search/?terms=System.Reflection.Binder.BindToField*) methods are used to resolve binding to a single member. `Binder.BindToMethod` also provides property resolution through the `get` and `set` property accessors.

`BindToMethod` returns the [System.Reflection.MethodBase](https://learn.microsoft.com/search/?terms=System.Reflection.MethodBase) to invoke, or a null reference (`Nothing` in Visual Basic) if no such invocation is possible. The `MethodBase` return value need not be one of those contained in the *match* parameter, although that is the usual case.

When ByRef arguments are present, the caller might want to get them back. Therefore, `Binder` allows a client to map the array of arguments back to its original form if `BindToMethod` has manipulated the argument array. To do this, the caller must be guaranteed that the order of the arguments is unchanged. When arguments are passed by name, `Binder` reorders the argument array, and that's what the caller sees. For more information, see [System.Reflection.Binder.ReorderArgumentArray*](https://learn.microsoft.com/search/?terms=System.Reflection.Binder.ReorderArgumentArray*).

The set of available members are those members defined in the type or any base type. If [System.Reflection.BindingFlags](https://learn.microsoft.com/search/?terms=System.Reflection.BindingFlags) is specified, members of any accessibility are returned in the set. If `BindingFlags.NonPublic` is not specified, the binder must enforce accessibility rules. When specifying the `Public` or `NonPublic` binding flag, you must also specify the `Instance` or `Static` binding flag, or no members will be returned.

If there is only one member of the given name, no callback is necessary, and binding is done on that method. Case 1 of the code example illustrates this point: Only one `PrintBob` method is available, and therefore no callback is needed.

If there is more than one member in the available set, all these methods are passed to `BindToMethod`, which selects the appropriate method and returns it. In Case 2 of the code example, there are two methods named `PrintValue`. The appropriate method is selected by the call to `BindToMethod`.

[System.Reflection.Binder.ChangeType*](https://learn.microsoft.com/search/?terms=System.Reflection.Binder.ChangeType*) performs argument coercion (type conversion), which converts the actual arguments to the type of the formal arguments of the selected method. `ChangeType` is called for every argument even if the types match exactly.

In Case 3 of the code example, an actual argument of type `String` with a value of "5.5" is passed to a method with a formal argument of type `Double`. For the invocation to succeed, the string value "5.5" must be converted to a double value. `ChangeType` performs this conversion.

`ChangeType` performs only lossless or [widening coercions](../../standard/base-types/type-conversion.md), as shown in the following table.

| Source type | Target type |
| --- | --- |
| Any type | Its base type |
| Any type | The interface it implements |
| `Char` | `UInt16`, `UInt32`, `Int32`, `UInt64`, `Int64`, `Single`, `Double` |
| `Byte` | `Char`, `UInt16`, `Int16`, `UInt32`, `Int32`, `UInt64`, `Int64`, `Single`, `Double` |
| `SByte` | `Int16`, `Int32`, `Int64`, `Single`, `Double` |
| `UInt16` | `UInt32`, `Int32`, `UInt64`, `Int64`, `Single`, `Double` |
| `Int16` | `Int32`, `Int64`, `Single`, `Double` |
| `UInt32` | `UInt64`, `Int64`, `Single`, `Double` |
| `Int32` | `Int64`, `Single`, `Double` |
| `UInt64` | `Single`, `Double` |
| `Int64` | `Single`, `Double` |
| `Single` | `Double` |
| Nonreference type | Reference type |

The [System.Type](https://learn.microsoft.com/search/?terms=System.Type) class has `Get` methods that use parameters of type `Binder` to resolve references to a particular member. [System.Type.GetConstructor*](https://learn.microsoft.com/search/?terms=System.Type.GetConstructor*), [System.Type.GetMethod*](https://learn.microsoft.com/search/?terms=System.Type.GetMethod*), and [System.Type.GetProperty*](https://learn.microsoft.com/search/?terms=System.Type.GetProperty*) search for a particular member of the current type by providing signature information for that member. [System.Reflection.Binder.SelectMethod*](https://learn.microsoft.com/search/?terms=System.Reflection.Binder.SelectMethod*) and [System.Reflection.Binder.SelectProperty*](https://learn.microsoft.com/search/?terms=System.Reflection.Binder.SelectProperty*) are called back on to select the given signature information of the appropriate methods.

## See also

- [System.Type.InvokeMember*](https://learn.microsoft.com/search/?terms=System.Type.InvokeMember*)
- [System.Reflection.Assembly.Load*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.Load*)
- [View Type Information](viewing-type-information.md)
- [Type Conversion in .NET](../../standard/base-types/type-conversion.md)
