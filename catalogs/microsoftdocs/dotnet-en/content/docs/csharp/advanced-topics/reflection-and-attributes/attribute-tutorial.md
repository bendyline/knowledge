---
title: "Tutorial: Define and read custom attributes."
description: Learn how attributes work in C#. You define custom attributes to add metadata to your code. You read those attributes to learn about the code at runtime
author: mgroves
ms.date: 03/15/2023
---

# Define and read custom attributes

Attributes provide a way of associating information with code in a declarative way. They can also provide a reusable element that can be applied to various targets. Consider the [System.ObsoleteAttribute](https://learn.microsoft.com/search/?terms=System.ObsoleteAttribute). It can be applied to classes, structs, methods, constructors, and more. It _declares_ that the element is obsolete. It's then up to the C# compiler to look for this attribute, and do some action in response.

In this tutorial, you learn how to add attributes to your code, how to create and use your own attributes, and how to use some attributes that are built into .NET.

## Prerequisites

You need to set up your machine to run .NET. You can find the installation instructions on the [.NET Downloads](https://dotnet.microsoft.com/download) page. You can run this application on Windows, Ubuntu Linux, macOS, or in a Docker container. You need to install your favorite code editor. The following descriptions use [Visual Studio Code](https://code.visualstudio.com), which is an open-source, cross-platform editor. However, you can use whatever tools you're comfortable with.

## Create the app

Now that you've installed all the tools, create a new .NET console app. To use the command line generator, execute the following command in your favorite shell:

```dotnetcli
dotnet new console
```

This command creates bare-bones .NET project files. You run `dotnet restore` to restore the dependencies needed to compile this project.

You don't have to run [`dotnet restore`](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/includes/~/docs/core/tools/dotnet-restore.md) because it's run implicitly by all commands that require a restore to occur, such as `dotnet new`, `dotnet build`, `dotnet run`, `dotnet test`, `dotnet publish`, and `dotnet pack`. To disable implicit restore, use the `--no-restore` option.

The `dotnet restore` command is still useful in certain scenarios where explicitly restoring makes sense, such as [continuous integration builds in Azure DevOps Services](https://learn.microsoft.com/azure/devops/build-release/apps/aspnet/build-aspnet-core) or in build systems that need to explicitly control when the restore occurs.

For information about how to manage NuGet feeds, see the [`dotnet restore` documentation](../../../core/tools/dotnet-restore.md).


To execute the program, use `dotnet run`. You should see "Hello, World" output to the console.

## Add attributes to code

In C#, attributes are classes that inherit from the `Attribute` base class. Any class that inherits from `Attribute` can be used as a sort of "tag" on other pieces of code. For instance, there's an attribute called `ObsoleteAttribute`. This attribute signals that code is obsolete and shouldn't be used anymore. You place this attribute on a class, for instance, by using square brackets.

[language="csharp" source="./snippets/tutorial/Program.cs" id="ObsoleteExample1"::: (complete source file; reference: ./snippets/tutorial/Program.cs)](../../../../_code/docs/csharp/advanced-topics/reflection-and-attributes/snippets/tutorial/Program.cs.md)

While the class is called `ObsoleteAttribute`, it's only necessary to use `[Obsolete]` in the code. Most C# code follows this convention. You can use the full name `[ObsoleteAttribute]` if you choose.

When marking a class obsolete, it's a good idea to provide some information as to *why* it's obsolete, and/or *what* to use instead. You include a string
parameter to the Obsolete attribute to provide this explanation.

[language="csharp" source="./snippets/tutorial/Program.cs" id="ObsoleteExample2"::: (complete source file; reference: ./snippets/tutorial/Program.cs)](../../../../_code/docs/csharp/advanced-topics/reflection-and-attributes/snippets/tutorial/Program.cs.md)

The string is being passed as an argument to an `ObsoleteAttribute` constructor, as if you were writing `var attr = new ObsoleteAttribute("some string")`.

Parameters to an attribute constructor are limited to simple types/literals: `bool, int, double, string, Type, enums, etc` and arrays of those types.
You can't use an expression or a variable. You're free to use positional or named parameters.

## Create your own attribute

You create an attribute by defining a new class that inherits from the `Attribute` base class.

[language="csharp" source="./snippets/tutorial/Program.cs" id="CreateAttributeExample1"::: (complete source file; reference: ./snippets/tutorial/Program.cs)](../../../../_code/docs/csharp/advanced-topics/reflection-and-attributes/snippets/tutorial/Program.cs.md)

With the preceding code, you can use `[MySpecial]` (or `[MySpecialAttribute]`) as an attribute elsewhere in the code base.

[language="csharp" source="./snippets/tutorial/Program.cs" id="CreateAttributeExample2"::: (complete source file; reference: ./snippets/tutorial/Program.cs)](../../../../_code/docs/csharp/advanced-topics/reflection-and-attributes/snippets/tutorial/Program.cs.md)

Attributes in the .NET base class library like `ObsoleteAttribute` trigger certain behaviors within the compiler. However, any attribute you create acts only as metadata, and doesn't result in any code within the attribute class being executed. It's up to you to act on that metadata elsewhere in your code.

There's a 'gotcha' here to watch out for. As mentioned earlier, only certain types can be passed as arguments when using attributes. However, when creating an attribute type, the C# compiler doesn't stop you from creating those parameters. In the following example, you've created an attribute with a constructor that compiles correctly.

[language="csharp" source="./snippets/tutorial/Program.cs" id="AttributeGotcha1"::: (complete source file; reference: ./snippets/tutorial/Program.cs)](../../../../_code/docs/csharp/advanced-topics/reflection-and-attributes/snippets/tutorial/Program.cs.md)

However, you're unable to use this constructor with attribute syntax.

[language="csharp" source="./snippets/tutorial/Program.cs" id="AttributeGotcha2"::: (complete source file; reference: ./snippets/tutorial/Program.cs)](../../../../_code/docs/csharp/advanced-topics/reflection-and-attributes/snippets/tutorial/Program.cs.md)

The preceding code causes a compiler error like `Attribute constructor parameter 'myClass' has type 'Foo', which is not a valid attribute parameter type`

## How to restrict attribute usage

Attributes can be used on the following "targets". The preceding examples show them on classes, but they can also be used on:

- Assembly
- Class
- Constructor
- Delegate
- Enum
- Event
- Field
- GenericParameter
- Interface
- Method
- Module
- Parameter
- Property
- ReturnValue
- Struct

When you create an attribute class, by default, C# allows you to use that attribute on any of the possible attribute targets. If you want to restrict your attribute to certain targets, you can do so by using the `AttributeUsageAttribute` on your attribute class. That's right, an attribute on an attribute!

[language="csharp" source="./snippets/tutorial/Program.cs" id="AttributeUsageExample1"::: (complete source file; reference: ./snippets/tutorial/Program.cs)](../../../../_code/docs/csharp/advanced-topics/reflection-and-attributes/snippets/tutorial/Program.cs.md)

If you attempt to put the above attribute on something that's not a class or a struct, you get a compiler error like `Attribute 'MyAttributeForClassAndStructOnly' is not valid on this declaration type. It is only valid on 'class, struct' declarations`

[language="csharp" source="./snippets/tutorial/Program.cs" id="AttributeUsageExample2"::: (complete source file; reference: ./snippets/tutorial/Program.cs)](../../../../_code/docs/csharp/advanced-topics/reflection-and-attributes/snippets/tutorial/Program.cs.md)

## How to use attributes attached to a code element

Attributes act as metadata. Without some outward force, they don't actually do anything.

To find and act on attributes, reflection is needed. Reflection allows you to write code in C# that examines other code. For instance, you can use Reflection to get information about a class(add `using System.Reflection;` at the head of your code):

[language="csharp" source="./snippets/tutorial/Program.cs" id="ReflectionExample1"::: (complete source file; reference: ./snippets/tutorial/Program.cs)](../../../../_code/docs/csharp/advanced-topics/reflection-and-attributes/snippets/tutorial/Program.cs.md)

That prints something like: `The assembly qualified name of MyClass is ConsoleApplication.MyClass, attributes, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null`

Once you have a `TypeInfo` object (or a `MemberInfo`, `FieldInfo`, or other object), you can use the `GetCustomAttributes` method. This method returns a collection of `Attribute` objects. You can also use `GetCustomAttribute` and specify an Attribute type.

Here's an example of using `GetCustomAttributes` on a `MemberInfo` instance for `MyClass` (which we saw earlier has an `[Obsolete]` attribute on it).

[language="csharp" source="./snippets/tutorial/Program.cs" id="ReflectionExample2"::: (complete source file; reference: ./snippets/tutorial/Program.cs)](../../../../_code/docs/csharp/advanced-topics/reflection-and-attributes/snippets/tutorial/Program.cs.md)

That prints to console: `Attribute on MyClass: ObsoleteAttribute`. Try adding other attributes to `MyClass`.

It's important to note that these `Attribute` objects are instantiated lazily. That is, they aren't be instantiated until you use `GetCustomAttribute` or `GetCustomAttributes`. They're also instantiated each time. Calling `GetCustomAttributes` twice in a row returns two different instances of `ObsoleteAttribute`.

## Common attributes in the runtime

Attributes are used by many tools and frameworks. NUnit uses attributes like `[Test]` and `[TestFixture]` that are used by the NUnit test runner. ASP.NET MVC uses attributes like `[Authorize]` and provides an action filter framework to perform cross-cutting concerns on MVC actions. [PostSharp](https://www.postsharp.net) uses the attribute syntax to allow aspect-oriented programming in C#.

Here are a few notable attributes built into the .NET Core base class libraries:

* `[Obsolete]`. This one was used in the above examples, and it lives in the `System` namespace. It's useful to provide declarative documentation about a changing code base. A message can be provided in the form of a string, and another boolean parameter can be used to escalate from a compiler warning to a compiler error.
* `[Conditional]`. This attribute is in the `System.Diagnostics` namespace. This attribute can be applied to methods (or attribute classes). You must pass a string to the constructor. If that string doesn't match a `#define` directive, then the C# compiler removes any calls to that method (but not the method itself). Typically you use this technique for debugging (diagnostics) purposes.
* `[CallerMemberName]`. This attribute can be used on parameters, and lives in the `System.Runtime.CompilerServices` namespace. `CallerMemberName` is an attribute that is used to inject the name of the method that is calling another method. It's a way to eliminate 'magic strings' when implementing INotifyPropertyChanged in various UI frameworks. As an example:

[language="csharp" source="./snippets/tutorial/Program.cs" id="CallerMemberName1"::: (complete source file; reference: ./snippets/tutorial/Program.cs)](../../../../_code/docs/csharp/advanced-topics/reflection-and-attributes/snippets/tutorial/Program.cs.md)

In the above code, you don't have to have a literal `"Name"` string. Using `CallerMemberName` prevents typo-related bugs and also makes for smoother refactoring/renaming. Attributes bring declarative power to C#, but they're a meta-data form of code and don't act by themselves.
