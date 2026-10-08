---
title: "Viewing Type Information"
description: View type information using System.Type, which is central to reflection in .NET. Review ConstructorInfo, MemberInfo, MethodInfo, FieldInfo, and PropertyInfo.
ms.date: 03/27/2024
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "types, viewing type information"
  - "Type object"
  - "viewing type information"
  - "reflection, viewing type information"
---
# View type information

The [System.Type](https://learn.microsoft.com/search/?terms=System.Type) class is central to reflection. The common language runtime creates the `Type` for a loaded type when reflection requests it. You can use a `Type` object's methods, fields, properties, and nested classes to find out everything about that type.

Use [System.Reflection.Assembly.GetType*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.GetType*) or [System.Reflection.Assembly.GetTypes*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.GetTypes*) to obtain `Type` objects from assemblies that have not been loaded, passing in the name of the type or types you want. Use [System.Type.GetType*](https://learn.microsoft.com/search/?terms=System.Type.GetType*) to get the `Type` objects from an assembly that is already loaded. Use [System.Reflection.Module.GetType*](https://learn.microsoft.com/search/?terms=System.Reflection.Module.GetType*) and [System.Reflection.Module.GetTypes*](https://learn.microsoft.com/search/?terms=System.Reflection.Module.GetTypes*) to obtain module `Type` objects.

> **Note:**
> If you want to examine and manipulate generic types and methods, please see the additional information provided in [Reflection and Generic Types](reflection-and-generic-types.md) and [How to: Examine and Instantiate Generic Types with Reflection](how-to-examine-and-instantiate-generic-types-with-reflection.md).

The following example shows the syntax necessary to get the [System.Reflection.Assembly](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly) object and module for an assembly.

[Conceptual.Types.ViewInfo#6 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.types.viewinfo/cs/source5.cs#6)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.types.viewinfo/cs/source5.cs.md)
[Conceptual.Types.ViewInfo#6 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.types.viewinfo/vb/source5.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.types.viewinfo/vb/source5.vb.md)

The following example demonstrates getting `Type` objects from a loaded assembly.

[Conceptual.Types.ViewInfo#7 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.types.viewinfo/cs/source5.cs#7)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.types.viewinfo/cs/source5.cs.md)
[Conceptual.Types.ViewInfo#7 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.types.viewinfo/vb/source5.vb#7)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.types.viewinfo/vb/source5.vb.md)

Once you obtain a `Type`, there are many ways you can discover information about the members of that type. For example, you can find out about all the type's members by calling the [System.Type.GetMembers*](https://learn.microsoft.com/search/?terms=System.Type.GetMembers*) method, which obtains an array of [System.Reflection.MemberInfo](https://learn.microsoft.com/search/?terms=System.Reflection.MemberInfo) objects describing each of the members of the current type.

You can also use methods on the `Type` class to retrieve information about one or more constructors, methods, events, fields, or properties that you specify by name. For example, [System.Type.GetConstructor*](https://learn.microsoft.com/search/?terms=System.Type.GetConstructor*) encapsulates a specific constructor of the current class.

If you have a `Type`, you can use the [System.Type.Module](https://learn.microsoft.com/search/?terms=System.Type.Module) property to obtain an object that encapsulates the module containing that type. Use the [System.Reflection.Module.Assembly](https://learn.microsoft.com/search/?terms=System.Reflection.Module.Assembly) property to locate an object that encapsulates the assembly containing the module. You can obtain the assembly that encapsulates the type directly by using the [System.Type.Assembly](https://learn.microsoft.com/search/?terms=System.Type.Assembly) property.

## System.Type and ConstructorInfo

The following example shows how to list the constructors for a class, in this case, the [System.String](https://learn.microsoft.com/search/?terms=System.String) class.

[Conceptual.Types.ViewInfo#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.types.viewinfo/cs/source1.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.types.viewinfo/cs/source1.cs.md)
[Conceptual.Types.ViewInfo#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.types.viewinfo/vb/source1.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.types.viewinfo/vb/source1.vb.md)

## MemberInfo, MethodInfo, FieldInfo, and PropertyInfo

Obtain information about the type's methods, properties, events, and fields using [System.Reflection.MemberInfo](https://learn.microsoft.com/search/?terms=System.Reflection.MemberInfo), [System.Reflection.MethodInfo](https://learn.microsoft.com/search/?terms=System.Reflection.MethodInfo), [System.Reflection.FieldInfo](https://learn.microsoft.com/search/?terms=System.Reflection.FieldInfo), or [System.Reflection.PropertyInfo](https://learn.microsoft.com/search/?terms=System.Reflection.PropertyInfo) objects.

The following example uses `MemberInfo` to list the number of members in the `System.IO.File` class and uses the [System.Type.IsPublic](https://learn.microsoft.com/search/?terms=System.Type.IsPublic) property to determine the visibility of the class.

[Conceptual.Types.ViewInfo#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.types.viewinfo/cs/source2.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.types.viewinfo/cs/source2.cs.md)
[Conceptual.Types.ViewInfo#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.types.viewinfo/vb/source2.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.types.viewinfo/vb/source2.vb.md)

The following example investigates the type of the specified member. It performs reflection on a member of the `MemberInfo` class, and lists its type.

[Conceptual.Types.ViewInfo#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.types.viewinfo/cs/source3.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.types.viewinfo/cs/source3.cs.md)
[Conceptual.Types.ViewInfo#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.types.viewinfo/vb/source3.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.types.viewinfo/vb/source3.vb.md)

The following example uses all the Reflection `*Info` classes along with [System.Reflection.BindingFlags](https://learn.microsoft.com/search/?terms=System.Reflection.BindingFlags) to list all the members (constructors, fields, properties, events, and methods) of the specified class, dividing the members into static and instance categories.

[Conceptual.Types.ViewInfo#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.types.viewinfo/cs/source4.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.types.viewinfo/cs/source4.cs.md)
[Conceptual.Types.ViewInfo#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.types.viewinfo/vb/source4.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.types.viewinfo/vb/source4.vb.md)
