---
title: "How to: Load Assemblies into an Application Domain"
description: Learn how to load assemblies into an application domain in .NET. The recommended way is to use the static (or Shared) Load method in System.Reflection.Assembly.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
  - "cpp"
helpviewer_keywords:
  - "application domains, loading assemblies"
  - "loading assemblies"
ms.assetid: 1432aa2d-bd83-4346-bf3b-a1b7920e2aa9
---
# How to: Load Assemblies into an Application Domain

> **Note:**
> This article is specific to .NET Framework. It doesn't apply to newer implementations of .NET, including .NET 6 and later versions.


There are several ways to load an assembly into an application domain. The recommended way is to use the `static` (`Shared` in Visual Basic) [System.Reflection.Assembly.Load*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.Load*) method of the [System.Reflection.Assembly](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly) class. Other ways assemblies can be loaded include:

- The [System.Reflection.Assembly.LoadFrom*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.LoadFrom*) method of the [System.Reflection.Assembly](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly) class loads an assembly given its file location. Loading assemblies with this method uses a different load context.

- The [System.Reflection.Assembly.ReflectionOnlyLoad*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.ReflectionOnlyLoad*) and [System.Reflection.Assembly.ReflectionOnlyLoadFrom*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.ReflectionOnlyLoadFrom*) methods load an assembly into the reflection-only context. Assemblies loaded into this context can be examined but not executed, allowing the examination of assemblies that target other platforms. See [How to: Load Assemblies into the Reflection-Only Context](../reflection-and-codedom/how-to-load-assemblies-into-the-reflection-only-context.md).

> **Note:**
> The reflection-only context is new in .NET Framework version 2.0.

- Methods such as [System.AppDomain.CreateInstance*](https://learn.microsoft.com/search/?terms=System.AppDomain.CreateInstance*) and [System.AppDomain.CreateInstanceAndUnwrap*](https://learn.microsoft.com/search/?terms=System.AppDomain.CreateInstanceAndUnwrap*) of the [System.AppDomain](https://learn.microsoft.com/search/?terms=System.AppDomain) class can load assemblies into an application domain.

- The [System.Type.GetType*](https://learn.microsoft.com/search/?terms=System.Type.GetType*) method of the [System.Type](https://learn.microsoft.com/search/?terms=System.Type) class can load assemblies.

- The [System.AppDomain.Load*](https://learn.microsoft.com/search/?terms=System.AppDomain.Load*) method of the [System.AppDomain](https://learn.microsoft.com/search/?terms=System.AppDomain) class can load assemblies, but is primarily used for COM interoperability. It should not be used to load assemblies into an application domain other than the application domain from which it is called.

> **Note:**
> Starting with .NET Framework version 2.0, the runtime will not load an assembly that was compiled with a version of the .NET Framework that has a higher version number than the currently loaded runtime. This applies to the combination of the major and minor components of the version number.

 You can specify the way the just-in-time (JIT) compiled code from loaded assemblies is shared between application domains. For more information, see [Application domains and assemblies](application-domains.md#application-domains-and-assemblies).

## Example

 The following code loads an assembly named "example.exe" or "example.dll" into the current application domain, gets a type named `Example` from the assembly, gets a parameterless method named `MethodA` for that type, and executes the method. For a complete discussion on obtaining information from a loaded assembly, see [Dynamically Loading and Using Types](../../fundamentals/reflection/dynamically-loading-and-using-types.md).

 [System.AppDomain.Load#2 (complete source file; reference: ../../../samples/snippets/cpp/VS_Snippets_CLR_System/system.appdomain.load/cpp/source2.cpp#2)](../../../_code/samples/snippets/cpp/VS_Snippets_CLR_System/system.appdomain.load/cpp/source2.cpp.md)
 [System.AppDomain.Load#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.appdomain.load/cs/source2.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.appdomain.load/cs/source2.cs.md)
 [System.AppDomain.Load#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.appdomain.load/vb/source2.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.appdomain.load/vb/source2.vb.md)

## See also

- [System.Reflection.Assembly.ReflectionOnlyLoad*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.ReflectionOnlyLoad*)
- [Programming with Application Domains](application-domains.md#programming-with-application-domains)
- [Reflection](../../fundamentals/reflection/overview.md)
- [Using Application Domains](use.md)
- [How to: Load Assemblies into the Reflection-Only Context](../reflection-and-codedom/how-to-load-assemblies-into-the-reflection-only-context.md)
- [Application domains and assemblies](application-domains.md#application-domains-and-assemblies)
