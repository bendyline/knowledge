---
title: Resolve assembly loads
description: This article describes the .NET AppDomain.AssemblyResolve event. Use this event for applications that require control over assembly loading.
ms.date: 12/15/2020
helpviewer_keywords:
  - "assemblies [.NET], resolving loads"
  - "application domains, loading assemblies"
  - "resolving assembly loads"
  - "assemblies [.NET], loading"
  - "application domains, resolving assembly loads"
ms.assetid: 5099e549-f4fd-49fb-a290-549edd456c6a
dev_langs:
  - "csharp"
  - "vb"
  - "cpp"
---

# Resolve assembly loads

.NET provides the [System.AppDomain.AssemblyResolve](https://learn.microsoft.com/search/?terms=System.AppDomain.AssemblyResolve) event for applications that require greater control over assembly loading. By handling this event, your application can load an assembly into the load context from outside the normal probing paths, select which of several assembly versions to load, emit a dynamic assembly and return it, and so on. This topic provides guidance for handling the [System.AppDomain.AssemblyResolve](https://learn.microsoft.com/search/?terms=System.AppDomain.AssemblyResolve) event.

> **Note:**
> For resolving assembly loads in the reflection-only context, use the [System.AppDomain.ReflectionOnlyAssemblyResolve](https://learn.microsoft.com/search/?terms=System.AppDomain.ReflectionOnlyAssemblyResolve) event instead.

## How the AssemblyResolve event works

When you register a handler for the [System.AppDomain.AssemblyResolve](https://learn.microsoft.com/search/?terms=System.AppDomain.AssemblyResolve) event, the handler is invoked whenever the runtime fails to bind to an assembly by name. For example, calling the following methods from user code can cause the [System.AppDomain.AssemblyResolve](https://learn.microsoft.com/search/?terms=System.AppDomain.AssemblyResolve) event to be raised:

- An [System.AppDomain.Load*](https://learn.microsoft.com/search/?terms=System.AppDomain.Load*) method overload or [System.Reflection.Assembly.Load*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.Load*) method overload whose first argument is a string that represents the display name of the assembly to load (that is, the string returned by the [System.Reflection.Assembly.FullName](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.FullName) property).

- An [System.AppDomain.Load*](https://learn.microsoft.com/search/?terms=System.AppDomain.Load*) method overload or [System.Reflection.Assembly.Load*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.Load*) method overload whose first argument is an [System.Reflection.AssemblyName](https://learn.microsoft.com/search/?terms=System.Reflection.AssemblyName) object that identifies the assembly to load.

- An [System.Reflection.Assembly.LoadWithPartialName*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.LoadWithPartialName*) method overload.

- An [System.AppDomain.CreateInstance*](https://learn.microsoft.com/search/?terms=System.AppDomain.CreateInstance*) or [System.AppDomain.CreateInstanceAndUnwrap*](https://learn.microsoft.com/search/?terms=System.AppDomain.CreateInstanceAndUnwrap*) method overload that instantiates an object in another application domain.

## What the event handler does

The handler for the [System.AppDomain.AssemblyResolve](https://learn.microsoft.com/search/?terms=System.AppDomain.AssemblyResolve) event receives the display name of the assembly to be loaded, in the [System.ResolveEventArgs.Name](https://learn.microsoft.com/search/?terms=System.ResolveEventArgs.Name) property. If the handler does not recognize the assembly name, it returns `null` (C#), `Nothing` (Visual Basic), or `nullptr` (Visual C++).

If the handler recognizes the assembly name, it can load and return an assembly that satisfies the request. The following list describes some sample scenarios.

- If the handler knows the location of a version of the assembly, it can load the assembly by using the [System.Reflection.Assembly.LoadFrom*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.LoadFrom*) or [System.Reflection.Assembly.LoadFile*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.LoadFile*) method, and can return the loaded assembly if successful.

- If the handler has access to a database of assemblies stored as byte arrays, it can load a byte array by using one of the [System.Reflection.Assembly.Load*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.Load*) method overloads that take a byte array.

- The handler can generate a dynamic assembly and return it.

> **Note:**
> The handler must load the assembly into the load-from context, into the load context, or without context. If the handler loads the assembly into the reflection-only context by using the [System.Reflection.Assembly.ReflectionOnlyLoad*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.ReflectionOnlyLoad*) or the [System.Reflection.Assembly.ReflectionOnlyLoadFrom*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.ReflectionOnlyLoadFrom*) method, the load attempt that raised the [System.AppDomain.AssemblyResolve](https://learn.microsoft.com/search/?terms=System.AppDomain.AssemblyResolve) event fails.

It is the responsibility of the event handler to return a suitable assembly. The handler can parse the display name of the requested assembly by passing the [System.ResolveEventArgs.Name](https://learn.microsoft.com/search/?terms=System.ResolveEventArgs.Name) property value to the [System.Reflection.AssemblyName.%23ctor%28System.String%29](https://learn.microsoft.com/search/?terms=System.Reflection.AssemblyName.%2523ctor%2528System.String%2529) constructor. Beginning with the .NET Framework 4, the handler can use the [System.ResolveEventArgs.RequestingAssembly](https://learn.microsoft.com/search/?terms=System.ResolveEventArgs.RequestingAssembly) property to determine whether the current request is a dependency of another assembly. This information can help identify an assembly that will satisfy the dependency.

The event handler can return a different version of the assembly than the version that was requested.

In most cases, the assembly that is returned by the handler appears in the load context, regardless of the context the handler loads it into. For example, if the handler uses the [System.Reflection.Assembly.LoadFrom*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.LoadFrom*) method to load an assembly into the load-from context, the assembly appears in the load context when the handler returns it. However, in the following case the assembly appears without context when the handler returns it:

- The handler loads an assembly without context.

- The [System.ResolveEventArgs.RequestingAssembly](https://learn.microsoft.com/search/?terms=System.ResolveEventArgs.RequestingAssembly) property is not null.

- The requesting assembly (that is, the assembly that is returned by the [System.ResolveEventArgs.RequestingAssembly](https://learn.microsoft.com/search/?terms=System.ResolveEventArgs.RequestingAssembly) property) was loaded without context.

For information about contexts, see the [System.Reflection.Assembly.LoadFrom%28System.String%29](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.LoadFrom%2528System.String%2529) method overload.

Multiple versions of the same assembly can be loaded into the same application domain. This practice is not recommended, because it can lead to type assignment problems. See [Best practices for assembly loading](../../framework/deployment/best-practices-for-assembly-loading.md).

## What the event handler should not do

The primary rule for handling the [System.AppDomain.AssemblyResolve](https://learn.microsoft.com/search/?terms=System.AppDomain.AssemblyResolve) event is that you should not try to return an assembly you do not recognize. When you write the handler, you should know which assemblies might cause the event to be raised. Your handler should return null for other assemblies.

> **Important:**
> Beginning with the .NET Framework 4, the [System.AppDomain.AssemblyResolve](https://learn.microsoft.com/search/?terms=System.AppDomain.AssemblyResolve) event is raised for satellite assemblies. This change affects an event handler that was written for an earlier version of the .NET Framework, if the handler tries to resolve all assembly load requests. Event handlers that ignore assemblies they do not recognize are not affected by this change: They return `null`, and normal fallback mechanisms are followed.

When loading an assembly, the event handler must not use any of the [System.AppDomain.Load*](https://learn.microsoft.com/search/?terms=System.AppDomain.Load*) or [System.Reflection.Assembly.Load*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.Load*) method overloads that can cause the [System.AppDomain.AssemblyResolve](https://learn.microsoft.com/search/?terms=System.AppDomain.AssemblyResolve) event to be raised recursively, because this can lead to a stack overflow. (See the list provided earlier in this topic.) This happens even if you provide exception handling for the load request, because no exception is thrown until all event handlers have returned. Thus, the following code results in a stack overflow if `MyAssembly` is not found:

```csharp
using System;
using System.Reflection;

class BadExample
{
    static void Main()
    {
        AppDomain ad = AppDomain.CreateDomain("Test");
        ad.AssemblyResolve += MyHandler;

        try
        {
            object obj = ad.CreateInstanceAndUnwrap(
                "MyAssembly, version=1.2.3.4, culture=neutral, publicKeyToken=null",
                "MyType");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
    }

    static Assembly MyHandler(object source, ResolveEventArgs e)
    {
        Console.WriteLine("Resolving {0}", e.Name);
        // DO NOT DO THIS: This causes a StackOverflowException
        return Assembly.Load(e.Name);
    }
}

/* This example produces output similar to the following:

Resolving MyAssembly, Version=1.2.3.4, Culture=neutral, PublicKeyToken=null
Resolving MyAssembly, Version=1.2.3.4, Culture=neutral, PublicKeyToken=null
...
Resolving MyAssembly, Version=1.2.3.4, Culture=neutral, PublicKeyToken=null
Resolving MyAssembly, Version=1.2.3.4, Culture=neutral, PublicKeyToken=null

Process is terminated due to StackOverflowException.
 */
```

```vb
Imports System.Reflection

Class BadExample

    Shared Sub Main()

        Dim ad As AppDomain = AppDomain.CreateDomain("Test")
        AddHandler ad.AssemblyResolve, AddressOf MyHandler

        Try
            Dim obj As object = ad.CreateInstanceAndUnwrap(
                "MyAssembly, version=1.2.3.4, culture=neutral, publicKeyToken=null",
                "MyType")
        Catch ex As Exception
            Console.WriteLine(ex.Message)
        End Try
    End Sub

    Shared Function MyHandler(ByVal source As Object, _
                              ByVal e As ResolveEventArgs) As Assembly
        Console.WriteLine("Resolving {0}", e.Name)
        // DO NOT DO THIS: This causes a StackOverflowException
        Return Assembly.Load(e.Name)
    End Function
End Class

' This example produces output similar to the following:
'
'Resolving MyAssembly, Version=1.2.3.4, Culture=neutral, PublicKeyToken=null
'Resolving MyAssembly, Version=1.2.3.4, Culture=neutral, PublicKeyToken=null
'...
'Resolving MyAssembly, Version=1.2.3.4, Culture=neutral, PublicKeyToken=null
'Resolving MyAssembly, Version=1.2.3.4, Culture=neutral, PublicKeyToken=null
'
'Process is terminated due to StackOverflowException.
```

```cpp
using namespace System;
using namespace System::Reflection;

ref class Example
{
internal:
    static Assembly^ MyHandler(Object^ source, ResolveEventArgs^ e)
    {
        Console::WriteLine("Resolving {0}", e->Name);
        // DO NOT DO THIS: This causes a StackOverflowException
        return Assembly::Load(e->Name);
    }
};

void main()
{
    AppDomain^ ad = AppDomain::CreateDomain("Test");
    ad->AssemblyResolve += gcnew ResolveEventHandler(&Example::MyHandler);

    try
    {
        Object^ obj = ad->CreateInstanceAndUnwrap(
            "MyAssembly, version=1.2.3.4, culture=neutral, publicKeyToken=null",
            "MyType");
    }
    catch (Exception^ ex)
    {
        Console::WriteLine(ex->Message);
    }
}

/* This example produces output similar to the following:

Resolving MyAssembly, Version=1.2.3.4, Culture=neutral, PublicKeyToken=null
Resolving MyAssembly, Version=1.2.3.4, Culture=neutral, PublicKeyToken=null
...
Resolving MyAssembly, Version=1.2.3.4, Culture=neutral, PublicKeyToken=null
Resolving MyAssembly, Version=1.2.3.4, Culture=neutral, PublicKeyToken=null

Process is terminated due to StackOverflowException.
*/
```

### The correct way to handle AssemblyResolve

When resolving assemblies from the [System.AppDomain.AssemblyResolve](https://learn.microsoft.com/search/?terms=System.AppDomain.AssemblyResolve) event handler, a [System.StackOverflowException](https://learn.microsoft.com/search/?terms=System.StackOverflowException) will eventually be thrown if the handler uses the [System.Reflection.Assembly.Load*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.Load*) or [System.AppDomain.Load*](https://learn.microsoft.com/search/?terms=System.AppDomain.Load*) method calls. Instead, use [System.Reflection.Assembly.LoadFile*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.LoadFile*) or [System.Reflection.Assembly.LoadFrom*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.LoadFrom*) methods, as they do not raise the `AssemblyResolve` event.

Imagine that `MyAssembly.dll` is located near the executing assembly, in a known location, it can be resolved using `Assembly.LoadFile` given the path to the assembly.

```csharp
using System;
using System.IO;
using System.Reflection;

class CorrectExample
{
    static void Main()
    {
        AppDomain ad = AppDomain.CreateDomain("Test");
        ad.AssemblyResolve += MyHandler;

        try
        {
            object obj = ad.CreateInstanceAndUnwrap(
                "MyAssembly, version=1.2.3.4, culture=neutral, publicKeyToken=null",
                "MyType");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
    }

    static Assembly MyHandler(object source, ResolveEventArgs e)
    {
        Console.WriteLine("Resolving {0}", e.Name);

        var path = Path.GetFullPath("../../MyAssembly.dll");
        return Assembly.LoadFile(path);
     }
}
```

```vb
Imports System.IO
Imports System.Reflection

Class CorrectExample

    Shared Sub Main()

        Dim ad As AppDomain = AppDomain.CreateDomain("Test")
        AddHandler ad.AssemblyResolve, AddressOf MyHandler

        Try
            Dim obj As Object = ad.CreateInstanceAndUnwrap(
                "MyAssembly, version=1.2.3.4, culture=neutral, publicKeyToken=null",
                "MyType")
        Catch ex As Exception
            Console.WriteLine(ex.Message)
        End Try
    End Sub

    Shared Function MyHandler(ByVal source As Object,
                              ByVal e As ResolveEventArgs) As Assembly
        Console.WriteLine("Resolving {0}", e.Name)

        Dim fullPath = Path.GetFullPath("../../MyAssembly.dll")
        Return Assembly.LoadFile(fullPath)
    End Function
End Class
```

```cpp
using namespace System;
using namespace System::IO;
using namespace System::Reflection;

ref class Example
{
internal:
    static Assembly^ MyHandler(Object^ source, ResolveEventArgs^ e)
    {
        Console::WriteLine("Resolving {0}", e->Name);

        String^ fullPath = Path::GetFullPath("../../MyAssembly.dll");
        return Assembly::LoadFile(fullPath);
    }
};

void main()
{
    AppDomain^ ad = AppDomain::CreateDomain("Test");
    ad->AssemblyResolve += gcnew ResolveEventHandler(&Example::MyHandler);

    try
    {
        Object^ obj = ad->CreateInstanceAndUnwrap(
            "MyAssembly, version=1.2.3.4, culture=neutral, publicKeyToken=null",
            "MyType");
    }
    catch (Exception^ ex)
    {
        Console::WriteLine(ex->Message);
    }
}
```

## See also

- [Best practices for assembly loading](../../framework/deployment/best-practices-for-assembly-loading.md)
- [Use application domains](../../framework/app-domains/use.md)
