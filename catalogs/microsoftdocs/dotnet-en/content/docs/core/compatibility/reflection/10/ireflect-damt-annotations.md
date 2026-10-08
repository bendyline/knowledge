---
title: "Breaking change: More restricted annotations on InvokeMember/FindMembers/DeclaredMembers"
description: "Learn about the breaking change in .NET 10 where System.Reflection APIs InvokeMember, FindMembers, and DeclaredMembers use more restricted annotations instead of DynamicallyAccessedMemberTypes.All."
ms.date: 10/09/2025
ai-usage: ai-generated
---

# More restricted annotations on InvokeMember/FindMembers/DeclaredMembers

Starting in .NET 10, the [System.Reflection](https://learn.microsoft.com/search/?terms=System.Reflection) APIs [System.Reflection.IReflect.InvokeMember*](https://learn.microsoft.com/search/?terms=System.Reflection.IReflect.InvokeMember*), [System.Type.FindMembers*](https://learn.microsoft.com/search/?terms=System.Type.FindMembers*), and [System.Reflection.TypeInfo.DeclaredMembers](https://learn.microsoft.com/search/?terms=System.Reflection.TypeInfo.DeclaredMembers) use more restricted annotations instead of [System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes.All](https://learn.microsoft.com/search/?terms=System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes.All).

This change affects scenarios where developers implement the [System.Reflection.IReflect](https://learn.microsoft.com/search/?terms=System.Reflection.IReflect) interface or derive from [System.Reflection.TypeInfo](https://learn.microsoft.com/search/?terms=System.Reflection.TypeInfo). The previous use of [System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes.All](https://learn.microsoft.com/search/?terms=System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes.All) was overly permissive and could lead to unintended behavior, such as capturing interface methods implemented by a class or generating warnings due to unsafe reflection calls.

## Version introduced

.NET 10

## Previous behavior

Previously, the [affected APIs](#affected-apis) used the [System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes.All](https://learn.microsoft.com/search/?terms=System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes.All) annotation, which was overly permissive. This could result in capturing additional members, such as interface methods implemented by a class, and potentially cause runtime warnings or unsafe reflection calls.

## New behavior

The [affected APIs](#affected-apis) now use more restricted annotations, which provide better control over the members captured during reflection.

## Type of breaking change

This change is a [behavioral change](../../categories.md#behavioral-change) and can affect [source compatibility](../../categories.md#source-compatibility).

## Reason for change

The change was introduced to improve the accuracy of annotations in [System.Reflection](https://learn.microsoft.com/search/?terms=System.Reflection) APIs and to address issues caused by the overly permissive [System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes.All](https://learn.microsoft.com/search/?terms=System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes.All) annotation. This ensures better compatibility with trimming and reflection scenarios, reduces runtime warnings, and prevents unsafe reflection calls.

## Recommended action

If you implement [System.Reflection.IReflect](https://learn.microsoft.com/search/?terms=System.Reflection.IReflect) or derive from [System.Reflection.TypeInfo](https://learn.microsoft.com/search/?terms=System.Reflection.TypeInfo), review your code and update annotations to align with the new behavior. Specifically:

1. Replace [System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes.All](https://learn.microsoft.com/search/?terms=System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes.All) annotations with more restricted annotations, such as [System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes.PublicMethods](https://learn.microsoft.com/search/?terms=System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes.PublicMethods), [System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes.NonPublicMethods](https://learn.microsoft.com/search/?terms=System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes.NonPublicMethods), or other appropriate types.

   The following code snippet shows an example.

   ```csharp
   class MyType : IReflect
   {
       [DynamicallyAccessedMembers(
           DynamicallyAccessedMemberTypes.PublicFields | DynamicallyAccessedMemberTypes.NonPublicFields |
           DynamicallyAccessedMemberTypes.PublicMethods | DynamicallyAccessedMemberTypes.NonPublicMethods |
           DynamicallyAccessedMemberTypes.PublicProperties | DynamicallyAccessedMemberTypes.NonPublicProperties |
           DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
        public object InvokeMember(string name, BindingFlags invokeAttr, Binder? binder, object? target,
            object?[]? args, ParameterModifier[]? modifiers, CultureInfo? culture, string[]? namedParameters)
        { }
   }
   ```

1. Test reflection scenarios to ensure that the updated annotations capture the intended members and don't introduce runtime errors or warnings.

For more information on `DynamicallyAccessedMembers` annotations and their usage, see [Prepare .NET libraries for trimming](../../../deploying/trimming/prepare-libraries-for-trimming.md).

## Affected APIs

- [System.Reflection.IReflect.InvokeMember(System.String,System.Reflection.BindingFlags,System.Reflection.Binder,System.Object,System.Object\[\],System.Reflection.ParameterModifier\[\],System.Globalization.CultureInfo,System.String\[\])](https://learn.microsoft.com/search/?terms=System.Reflection.IReflect.InvokeMember(System.String%2CSystem.Reflection.BindingFlags%2CSystem.Reflection.Binder%2CSystem.Object%2CSystem.Object%5B%5D%2CSystem.Reflection.ParameterModifier%5B%5D%2CSystem.Globalization.CultureInfo%2CSystem.String%5B%5D))
- [System.Type.FindMembers(System.Reflection.MemberTypes,System.Reflection.BindingFlags,System.Reflection.MemberFilter,System.Object)](https://learn.microsoft.com/search/?terms=System.Type.FindMembers(System.Reflection.MemberTypes%2CSystem.Reflection.BindingFlags%2CSystem.Reflection.MemberFilter%2CSystem.Object))
- [System.Reflection.TypeInfo.DeclaredMembers](https://learn.microsoft.com/search/?terms=System.Reflection.TypeInfo.DeclaredMembers)
