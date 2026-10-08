---
title: "Attributes interpreted by the compiler: Pseudo-attributes"
ms.date: 02/17/2026
description: "Learn about attributes you can add to code that are written to IL as modifiers. These custom attributes aren't emitted as attributes in the compiled output."
---
# Custom attributes that generate flags or options in the Intermediate Language (IL) output

Add these attributes to your code for the compiler to emit a specified Intermediate Language (IL) modifier. These attributes instruct the compiler to include the corresponding IL modifier in the output.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


| Attribute | Modifier | Comments |
| --- | --- | --- |
| [System.Runtime.InteropServices.ComImportAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.ComImportAttribute) | `import` |  |
| [System.Runtime.InteropServices.DllImportAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.DllImportAttribute) | `pinvokeimpl` | You can add options listed in the constructor. |
| [System.Runtime.InteropServices.FieldOffsetAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.FieldOffsetAttribute) | `.field` | This sets the field offset for memory layout. |
| [System.Runtime.InteropServices.MarshalAsAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.MarshalAsAttribute) | `marshal` | You can set options listed in the constructor. |
| [System.Runtime.CompilerServices.MethodImplAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.MethodImplAttribute) | `flag` | Constructor arguments specify specific named flags such as `aggressiveinlining` or `forwardref`. These flags also specify the `native`, `managed`, or `optil` modifiers for the [System.Runtime.CompilerServices.MethodCodeType](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.MethodCodeType) field. |
| [System.NonSerializedAttribute](https://learn.microsoft.com/search/?terms=System.NonSerializedAttribute) | `notserialized` |  |
| [System.Runtime.InteropServices.OptionalAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.OptionalAttribute) | `[opt]` |  |
| [System.Runtime.InteropServices.PreserveSigAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.PreserveSigAttribute) | `preservesig` |  |
| [System.SerializableAttribute](https://learn.microsoft.com/search/?terms=System.SerializableAttribute) | `serializable` |  |
| [System.Runtime.InteropServices.StructLayoutAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.StructLayoutAttribute) | `auto`, `sequential`, or `explicit` | Layout options can be set using the parameters. |
| [System.Runtime.CompilerServices.IndexerNameAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.IndexerNameAttribute) |  | Add this attribute to an indexer to set a different method name. By default, indexers are compiled to a property named `Item`. You can specify a different name using this attribute. |

> **Important:**
> The [`StructLayoutAttribute`] can't be combined with the [`ExtendedLayout`](general.md#extendedlayout-attribute) attribute.

Some of these custom attributes are applied by using other C# syntax rather than adding the attribute to your source code.

| Attribute | Comments |
| --- | --- |
| [System.Runtime.InteropServices.DefaultParameterValueAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.DefaultParameterValueAttribute) | Specifies the default value for the parameter. Use the [default parameter syntax](../../methods.md#optional-parameters-and-arguments). |
| [System.Runtime.InteropServices.InAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.InAttribute) | Specifies the IL `[in]` modifier. Use the [`in`](../keywords/method-parameters.md#in-parameter-modifier) or [`ref readonly`](../keywords/method-parameters.md#ref-readonly-modifier) modifiers. |
| [System.Runtime.InteropServices.OutAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.OutAttribute) | Specifies the IL `[out]` modifier. Use the [`out`](../keywords/method-parameters.md#out-parameter-modifier) modifier. |
| [System.Runtime.CompilerServices.SpecialNameAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.SpecialNameAttribute) | Specifies the IL `specialname` modifier. The compiler automatically adds this modifier for methods that require it. |
| [System.Runtime.InteropServices.UnmanagedCallersOnlyAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.UnmanagedCallersOnlyAttribute) | This attribute is required for the `delegate*` feature. The compiler adds it to any [`delegate*`](../unsafe-code.md#function-pointers) that requires its use. However, you must add this attribute to any method declaration when that method is assigned to a function pointer. |

The following attributes are generally disallowed in C# source. They're listed here to aid library authors who use reflection, and to ensure you don't create custom attributes with the same fully qualified name.

| Attribute | Comments |
| --- | --- |
| [System.Runtime.CompilerServices.CompilerFeatureRequiredAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.CompilerFeatureRequiredAttribute) | Prevents downlevel compilers from using metadata they can't safely understand. |
| [System.Runtime.CompilerServices.DecimalConstantAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.DecimalConstantAttribute) | Encodes `const decimal` fields. The runtime doesn't support `decimal` values as constant values. |
| [System.Reflection.DefaultMemberAttribute](https://learn.microsoft.com/search/?terms=System.Reflection.DefaultMemberAttribute) | Encodes indexers with [System.Runtime.CompilerServices.IndexerNameAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.IndexerNameAttribute). This attribute notes the default indexer when its name is different than `Item`. This attribute is allowed in source. |
| [System.Runtime.CompilerServices.DynamicAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.DynamicAttribute) | Encodes whether a type in a signature is `dynamic` (versus `object`). |
| [System.Runtime.CompilerServices.ExtensionAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.ExtensionAttribute) | This attribute notes extension methods. The compiler also places this attribute on the containing classes. |
| [System.Runtime.CompilerServices.FixedBufferAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.FixedBufferAttribute) | This attribute specifies `fixed` struct fields. |
| [System.Runtime.CompilerServices.IsByRefLikeAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.IsByRefLikeAttribute) | This attribute specifies a `ref` struct. |
| [System.Runtime.CompilerServices.IsReadOnlyAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.IsReadOnlyAttribute) | This attribute indicates that a parameter has the `in` modifier. It distinguishes `in` parameters from `readonly ref` or `[In] ref`. |
| [System.Runtime.CompilerServices.RequiresLocationAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.RequiresLocationAttribute) | This attribute indicates that a parameter has the `readonly ref` modifier. It distinguishes `readonly ref` from `in` or `[In] ref`. |
| [System.Runtime.CompilerServices.IsUnmanagedAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.IsUnmanagedAttribute) | This attribute specifies the `unmanaged` constraint on a type parameter. |
| [System.Runtime.CompilerServices.NullableAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.NullableAttribute), [System.Runtime.CompilerServices.NullableContextAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.NullableContextAttribute), [System.Runtime.CompilerServices.NullablePublicOnlyAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.NullablePublicOnlyAttribute) | These attributes encode nullable annotations in your source code. |
| [System.ParamArrayAttribute](https://learn.microsoft.com/search/?terms=System.ParamArrayAttribute) | This attribute encodes the `params` modifier on array parameters. |
| [System.Runtime.CompilerServices.ParamCollectionAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.ParamCollectionAttribute) | This attribute encodes the `params` modifier on non-array parameters. |
| [System.Runtime.CompilerServices.RefSafetyRulesAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.RefSafetyRulesAttribute) | This attribute specifies the C# version that is required in order to understand ref safety annotations in the assembly. Ref safety rules evolve as C# gets new features. |
| [System.Runtime.CompilerServices.RequiredMemberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.RequiredMemberAttribute) | This attribute indicates that the `required` modifier was placed on a member declaration. It's the encoding of the [required members](../keywords/required.md) language feature. |
| [System.Runtime.CompilerServices.TupleElementNamesAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.TupleElementNamesAttribute) | This attribute encodes tuple element names used in signatures. |

In addition, the compiler can generate a declaration for other attributes used internally. The compiler generates these attributes in the [System.Runtime.CompilerServices](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices) namespace for its own use. Some aren't in the .NET Runtime libraries. Instead, the compiler synthesizes a definition for an `internal` type declaration in any assembly where the attribute is needed.
