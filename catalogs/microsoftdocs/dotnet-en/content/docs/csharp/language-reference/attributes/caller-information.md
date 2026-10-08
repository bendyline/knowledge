---
title: "Attributes interpreted by the compiler: Tracking caller information"
ms.date: 01/14/2026
description: These attributes instruct the compiler to generate information about the code that calls a member. You use the CallerFilePath, CallerLineNumber, CallerMemberName, and CallerArgumentExpression to provide detailed trace information
---

# Determine caller information by using attributes that the C# compiler interprets

By using info attributes, you can get information about the caller to a method. You can get the file path of the source code, the line number in the source code, and the member name of the caller. To get member caller information, use attributes that you apply to optional parameters. Each optional parameter specifies a default value.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


The following table lists the Caller Info attributes that are defined in the [System.Runtime.CompilerServices](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices) namespace:

| Attribute | Description | Type |
| --- | --- | --- |
| [System.Runtime.CompilerServices.CallerFilePathAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.CallerFilePathAttribute) | Full path of the source file that contains the caller. The full path is the path at compile time. | `String` |
| [System.Runtime.CompilerServices.CallerLineNumberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.CallerLineNumberAttribute) | Line number in the source file from which the method is called. | `Integer` |
| [System.Runtime.CompilerServices.CallerMemberNameAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.CallerMemberNameAttribute) | Method name or property name of the caller. | `String` |
| [System.Runtime.CompilerServices.CallerArgumentExpressionAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.CallerArgumentExpressionAttribute) | String representation of the argument expression. | `String` |

This information helps you with tracing and debugging, and helps you to create diagnostic tools. The following example shows how to use caller info attributes. On each call to the `TraceMessage` method, the caller information is inserted for the arguments to the optional parameters.

[language="csharp" source="./snippets/CallerInformation.cs" id="CallerFileMemberLine"::: (complete source file; reference: ./snippets/CallerInformation.cs)](../../../../_code/docs/csharp/language-reference/attributes/snippets/CallerInformation.cs.md)

You specify an explicit default value for each optional parameter. You can't apply caller info attributes to parameters that aren't optional. The caller info attributes don't make a parameter optional. Instead, they affect the default value passed in when the argument is omitted. The compiler emits caller info values as literals into the Intermediate Language (IL) at compile time. Unlike the results of the [System.Exception.StackTrace](https://learn.microsoft.com/search/?terms=System.Exception.StackTrace) property for exceptions, obfuscation doesn't affect the results. You can explicitly supply the optional arguments to control the caller information or to hide caller information.

## Member names

Use the `CallerMemberName` attribute to avoid specifying the member name as a `String` argument to the called method. By using this technique, you avoid the problem that **Rename Refactoring** doesn't change the `String` values. This benefit is especially useful for the following tasks:

- Using tracing and diagnostic routines.
- Implementing the [System.ComponentModel.INotifyPropertyChanged](https://learn.microsoft.com/search/?terms=System.ComponentModel.INotifyPropertyChanged) interface when binding data. This interface allows the property of an object to notify a bound control that the property changed. The control can display the updated information. Without the `CallerMemberName` attribute, you must specify the property name as a literal.

The following chart shows the member names that are returned when you use the `CallerMemberName` attribute.

| Calls occur within | Member name result |
| --- | --- |
| Method, property, or event | The name of the method, property, or event from which the call originated. |
| Constructor | The string ".ctor" |
| Static constructor | The string ".cctor" |
| Finalizer | The string "Finalize" |
| User-defined operators or conversions | The generated name for the member, for example, "op_Addition". |
| Attribute constructor | The name of the method or property to which the attribute is applied. If the attribute is any element within a member (such as a parameter, a return value, or a generic type parameter), this result is the name of the member associated with that element. |
| No containing member (for example, assembly-level or attributes that are applied to types) | The default value of the optional parameter. |

## Argument expressions

Use the [System.Runtime.CompilerServices.CallerArgumentExpressionAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.CallerArgumentExpressionAttribute) when you want the expression passed as an argument. Diagnostic libraries can provide more details about the *expressions* passed to arguments. By providing the expression that triggered the diagnostic, in addition to the parameter name, developers have more details about the condition that triggered the diagnostic. That extra information makes it easier to fix.

The following example shows how you can provide detailed information about the argument when it's invalid:

[language="csharp" source="./snippets/CallerInformation.cs" id="TestCondition"::: (complete source file; reference: ./snippets/CallerInformation.cs)](../../../../_code/docs/csharp/language-reference/attributes/snippets/CallerInformation.cs.md)

You invoke it as shown in the following example:

[language="csharp" source="./snippets/CallerInformation.cs" id="InvokeTestCondition"::: (complete source file; reference: ./snippets/CallerInformation.cs)](../../../../_code/docs/csharp/language-reference/attributes/snippets/CallerInformation.cs.md)

The compiler injects the expression used for `condition` into the `message` argument. When a developer calls `Operation` with a `null` argument, the following message is stored in the `ArgumentException`:

```text
Argument failed validation: <func is not null>
```

By using this attribute, you can write diagnostic utilities that provide more details. Developers can more quickly understand what changes are needed. You can also use the [System.Runtime.CompilerServices.CallerArgumentExpressionAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.CallerArgumentExpressionAttribute) to determine what expression was used as the receiver for extension members. The following method samples a sequence at regular intervals. If the sequence has fewer elements than the frequency, it reports an error:

[language="csharp" source="./snippets/CallerInformation.cs" id="ExtensionMethod"::: (complete source file; reference: ./snippets/CallerInformation.cs)](../../../../_code/docs/csharp/language-reference/attributes/snippets/CallerInformation.cs.md)

The previous example uses the [`nameof`](../operators/nameof.md) operator for the parameter `sequence`. You could call this method as follows:

[language="csharp" source="./snippets/Program.cs" id="ShortSequence"::: (complete source file; reference: ./snippets/Program.cs)](../../../../_code/docs/csharp/language-reference/attributes/snippets/Program.cs.md)

The preceding example throws an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) whose message is the following text:

```text
Expression doesn't have enough elements: Enumerable.Range(0, 10) (Parameter 'sequence')
```

## See also

- [Named and Optional Arguments](../../programming-guide/classes-and-structs/named-and-optional-arguments.md)
- [System.Reflection](https://learn.microsoft.com/search/?terms=System.Reflection)
- [System.Attribute](https://learn.microsoft.com/search/?terms=System.Attribute)
- [Attributes](../../../standard/attributes/index.md)
