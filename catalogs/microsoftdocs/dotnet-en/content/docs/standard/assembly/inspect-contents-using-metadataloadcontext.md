---
title: "How to: Inspect assembly contents using MetadataLoadContext"
description: "Learn how to use MetadataLoadContext, which is an API that enables you to load .NET assemblies for inspection purposes."
author: MSDN-WhiteKnight
ms.date: 03/10/2020
ms.topic: how-to
---
# How to: Inspect assembly contents using MetadataLoadContext

The reflection API in .NET by default enables developers to inspect the contents of assemblies loaded into the main execution context. However, sometimes it isn't possible to load an assembly into the execution context, for example, because it was compiled for another platform or processor architecture, or it's a [reference assembly](reference-assemblies.md). The [System.Reflection.MetadataLoadContext](https://learn.microsoft.com/search/?terms=System.Reflection.MetadataLoadContext) API allows you to load and inspect such assemblies. Assemblies loaded into the [System.Reflection.MetadataLoadContext](https://learn.microsoft.com/search/?terms=System.Reflection.MetadataLoadContext) are treated only as metadata, that is, you can examine types in the assembly, but you can't execute any code contained in it. Unlike the main execution context, the [System.Reflection.MetadataLoadContext](https://learn.microsoft.com/search/?terms=System.Reflection.MetadataLoadContext) doesn't automatically load dependencies from the current directory; instead it uses the custom binding logic provided by the [System.Reflection.MetadataAssemblyResolver](https://learn.microsoft.com/search/?terms=System.Reflection.MetadataAssemblyResolver) passed to it.

## Prerequisites

To use [System.Reflection.MetadataLoadContext](https://learn.microsoft.com/search/?terms=System.Reflection.MetadataLoadContext), install the [System.Reflection.MetadataLoadContext](https://www.nuget.org/packages/System.Reflection.MetadataLoadContext) NuGet package. It is supported on any .NET Standard 2.0-compliant target framework, for example, .NET Core 2.0 or .NET Framework 4.6.1.

## Create MetadataAssemblyResolver for MetadataLoadContext

Creating the [System.Reflection.MetadataLoadContext](https://learn.microsoft.com/search/?terms=System.Reflection.MetadataLoadContext) requires providing the instance of the [System.Reflection.MetadataAssemblyResolver](https://learn.microsoft.com/search/?terms=System.Reflection.MetadataAssemblyResolver). The simplest way to provide one is to use the [System.Reflection.PathAssemblyResolver](https://learn.microsoft.com/search/?terms=System.Reflection.PathAssemblyResolver), which resolves assemblies from the given collection of assembly path strings. This collection, besides assemblies you want to inspect directly, should also include all needed dependencies. For example, to read the custom attribute located in an external assembly, you should include that assembly or an exception will be thrown. In most cases, you should include at least the *core assembly*, that is, the assembly containing built-in system types, such as [System.Object](https://learn.microsoft.com/search/?terms=System.Object). The following code shows how to create the [System.Reflection.PathAssemblyResolver](https://learn.microsoft.com/search/?terms=System.Reflection.PathAssemblyResolver) using the collection consisting of the inspected assembly and the current runtime's core assembly:

[Code example (complete source file; reference: snippets/inspect-contents-using-metadataloadcontext/MetadataLoadContextSnippets.cs#CoreAssembly)](../../../_code/docs/standard/assembly/snippets/inspect-contents-using-metadataloadcontext/MetadataLoadContextSnippets.cs.md)

If you need access to all BCL types, you can include all runtime assemblies in the collection. The following code shows how to create the [System.Reflection.PathAssemblyResolver](https://learn.microsoft.com/search/?terms=System.Reflection.PathAssemblyResolver) using the collection consisting of the inspected assembly and all assemblies of the current runtime:

[Code example (complete source file; reference: snippets/inspect-contents-using-metadataloadcontext/MetadataLoadContextSnippets.cs#RuntimeAssemblies)](../../../_code/docs/standard/assembly/snippets/inspect-contents-using-metadataloadcontext/MetadataLoadContextSnippets.cs.md)

## Create MetadataLoadContext

To create the [System.Reflection.MetadataLoadContext](https://learn.microsoft.com/search/?terms=System.Reflection.MetadataLoadContext), invoke its constructor [System.Reflection.MetadataLoadContext.%23ctor%28System.Reflection.MetadataAssemblyResolver%2CSystem.String%29](https://learn.microsoft.com/search/?terms=System.Reflection.MetadataLoadContext.%2523ctor%2528System.Reflection.MetadataAssemblyResolver%252CSystem.String%2529), passing the previously created [System.Reflection.MetadataAssemblyResolver](https://learn.microsoft.com/search/?terms=System.Reflection.MetadataAssemblyResolver) as the first parameter and the core assembly name as the second parameter. You can omit the core assembly name, in which case the constructor will attempt to use default names: "mscorlib", "System.Runtime", or "netstandard".

After you've created the context, you can load assemblies into it using methods such as [System.Reflection.MetadataLoadContext.LoadFromAssemblyPath*](https://learn.microsoft.com/search/?terms=System.Reflection.MetadataLoadContext.LoadFromAssemblyPath*). You can use all reflection APIs on loaded assemblies except ones that involve code execution. The [System.Reflection.MemberInfo.GetCustomAttributes*](https://learn.microsoft.com/search/?terms=System.Reflection.MemberInfo.GetCustomAttributes*) method does involve the execution of constructors, so use the [System.Reflection.MemberInfo.GetCustomAttributesData*](https://learn.microsoft.com/search/?terms=System.Reflection.MemberInfo.GetCustomAttributesData*) method instead when you need to examine custom attributes in the [System.Reflection.MetadataLoadContext](https://learn.microsoft.com/search/?terms=System.Reflection.MetadataLoadContext).

The following code sample creates [System.Reflection.MetadataLoadContext](https://learn.microsoft.com/search/?terms=System.Reflection.MetadataLoadContext), loads the assembly into it, and outputs assembly attributes into the console:

[Code example (complete source file; reference: snippets/inspect-contents-using-metadataloadcontext/MetadataLoadContextSnippets.cs#CreateContext)](../../../_code/docs/standard/assembly/snippets/inspect-contents-using-metadataloadcontext/MetadataLoadContextSnippets.cs.md)

If you need to test types in [System.Reflection.MetadataLoadContext](https://learn.microsoft.com/search/?terms=System.Reflection.MetadataLoadContext) for equality or assignability, only use type objects loaded into that context. Mixing [System.Reflection.MetadataLoadContext](https://learn.microsoft.com/search/?terms=System.Reflection.MetadataLoadContext) types with runtime types is not supported. For example, consider a type `testedType` in [System.Reflection.MetadataLoadContext](https://learn.microsoft.com/search/?terms=System.Reflection.MetadataLoadContext). If you need to test whether another type is assignable from it, don't use code like `typeof(MyType).IsAssignableFrom(testedType)`. Use code like this instead:

[Code example (complete source file; reference: snippets/inspect-contents-using-metadataloadcontext/MetadataLoadContextSnippets.cs#Assignability)](../../../_code/docs/standard/assembly/snippets/inspect-contents-using-metadataloadcontext/MetadataLoadContextSnippets.cs.md)

## Example

For a complete code example, see the [Inspect assembly contents using MetadataLoadContext sample](https://learn.microsoft.com/samples/dotnet/samples/inspect-assembly-contents-using-metadataloadcontext/).

## See also

- [Reflection in .NET](../../fundamentals/reflection/overview.md)
