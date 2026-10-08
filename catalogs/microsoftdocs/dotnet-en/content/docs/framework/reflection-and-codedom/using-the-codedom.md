---
title: "Using the CodeDOM"
description: Use the Code Document Object Model (CodeDOM), which provides types representing many common types of source code elements, to assemble an object graph.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
  - "cpp"
helpviewer_keywords:
  - "code compilers"
  - "Code Document Object Model"
  - "Code Document Object Model, graphs"
  - "types, CodeDOM"
  - "namespaces [.NET Framework], CodeDOM"
  - "templated code generation"
  - "dynamically representing source code"
  - "source code models"
  - "CodeDOM"
  - "graphing with CodeDOM"
  - "dynamic compilation"
  - "code generators"
  - "CodeDOM, graphs"
ms.assetid: 0444ddf3-c3f6-44ed-a999-f710d9c3e0cf
---
# Use the CodeDOM

The CodeDOM provides types that represent many common types of source code elements. You can design a program that builds a source code model using CodeDOM elements to assemble an object graph. This object graph can be rendered as source code using a CodeDOM code generator for a supported programming language. The CodeDOM can also be used to compile source code into a binary assembly.

Some common uses for the CodeDOM include:

- Templated code generation: generating code for ASP.NET, XML Web services client proxies, code wizards, designers, or other code-emitting mechanisms.
- Dynamic compilation: supporting code compilation in single or multiple languages.

## Build a CodeDOM graph

The [System.CodeDom](https://learn.microsoft.com/search/?terms=System.CodeDom) namespace provides classes for representing the logical structure of source code, independent of language syntax.

### The structure of a CodeDOM graph

The structure of a CodeDOM graph is like a tree of containers. The top-most, or root, container of each compilable CodeDOM graph is a [System.CodeDom.CodeCompileUnit](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeCompileUnit). Every element of your source code model must be linked into the graph through a property of a [System.CodeDom.CodeObject](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeObject) in the graph.

### Build a source code model for a sample Hello World program

The following walkthrough provides an example of how to build a CodeDOM object graph that represents the code for a simple Hello World application. For the complete source code for this code example, see the [System.CodeDom.Compiler.CodeDomProvider](https://learn.microsoft.com/search/?terms=System.CodeDom.Compiler.CodeDomProvider) article.

#### Create a compile unit

The CodeDOM defines an object called a [System.CodeDom.CodeCompileUnit](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeCompileUnit), which can reference a CodeDOM object graph that models the source code to compile. A `CodeCompileUnit` has properties for storing references to attributes, namespaces, and assemblies.

The CodeDom providers that derive from the [System.CodeDom.Compiler.CodeDomProvider](https://learn.microsoft.com/search/?terms=System.CodeDom.Compiler.CodeDomProvider) class contain methods that process the object graph referenced by a **CodeCompileUnit**.

To create an object graph for a simple application, you must assemble the source code model and reference it from a **CodeCompileUnit**.

You can create a new compile unit with the syntax demonstrated in this example:

[CodeDomExample#12 (complete source file; reference: ../../../samples/snippets/cpp/VS_Snippets_CLR/CodeDomExample/CPP/source2.cpp#12)](../../../_code/samples/snippets/cpp/VS_Snippets_CLR/CodeDomExample/CPP/source2.cpp.md)
[CodeDomExample#12 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/CodeDomExample/CS/source2.cs#12)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/CodeDomExample/CS/source2.cs.md)
[CodeDomExample#12 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/CodeDomExample/VB/source2.vb#12)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/CodeDomExample/VB/source2.vb.md)

A [System.CodeDom.CodeSnippetCompileUnit](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeSnippetCompileUnit) can contain a section of source code that's already in the target language, but cannot be rendered to another language.

#### Define a namespace

To define a namespace, create a [System.CodeDom.CodeNamespace](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeNamespace) and assign a name for it using the appropriate constructor or by setting its `Name` property.

[CodeDomExample#13 (complete source file; reference: ../../../samples/snippets/cpp/VS_Snippets_CLR/CodeDomExample/CPP/source2.cpp#13)](../../../_code/samples/snippets/cpp/VS_Snippets_CLR/CodeDomExample/CPP/source2.cpp.md)
[CodeDomExample#13 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/CodeDomExample/CS/source2.cs#13)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/CodeDomExample/CS/source2.cs.md)
[CodeDomExample#13 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/CodeDomExample/VB/source2.vb#13)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/CodeDomExample/VB/source2.vb.md)

#### Import a namespace

To add a namespace import directive to the namespace, add a [System.CodeDom.CodeNamespaceImport](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeNamespaceImport) that indicates the namespace to import to the **CodeNamespace.Imports** collection.

The following code adds an import for the `System` namespace to the `Imports` collection of a `CodeNamespace` named `samples`:

[CodeDomExample#14 (complete source file; reference: ../../../samples/snippets/cpp/VS_Snippets_CLR/CodeDomExample/CPP/source2.cpp#14)](../../../_code/samples/snippets/cpp/VS_Snippets_CLR/CodeDomExample/CPP/source2.cpp.md)
[CodeDomExample#14 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/CodeDomExample/CS/source2.cs#14)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/CodeDomExample/CS/source2.cs.md)
[CodeDomExample#14 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/CodeDomExample/VB/source2.vb#14)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/CodeDomExample/VB/source2.vb.md)

#### Link code elements into the object graph

All code elements that form a CodeDOM graph must be linked to the [System.CodeDom.CodeCompileUnit](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeCompileUnit) that is the root element of the tree by a series of references between elements directly referenced from the properties of the root object of the graph. Set an object to a property of a container object to establish a reference from the container object.

The following statement adds the `samples` `CodeNamespace` to the `Namespaces` collection property of the root **CodeCompileUnit**.

[CodeDomExample#15 (complete source file; reference: ../../../samples/snippets/cpp/VS_Snippets_CLR/CodeDomExample/CPP/source2.cpp#15)](../../../_code/samples/snippets/cpp/VS_Snippets_CLR/CodeDomExample/CPP/source2.cpp.md)
[CodeDomExample#15 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/CodeDomExample/CS/source2.cs#15)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/CodeDomExample/CS/source2.cs.md)
[CodeDomExample#15 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/CodeDomExample/VB/source2.vb#15)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/CodeDomExample/VB/source2.vb.md)

#### Define a type

To declare a class, structure, interface, or enumeration using the CodeDOM, create a new [System.CodeDom.CodeTypeDeclaration](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeTypeDeclaration), and assign it a name. The following example demonstrates this using a constructor overload to set the `Name` property:

[CodeDomExample#16 (complete source file; reference: ../../../samples/snippets/cpp/VS_Snippets_CLR/CodeDomExample/CPP/source2.cpp#16)](../../../_code/samples/snippets/cpp/VS_Snippets_CLR/CodeDomExample/CPP/source2.cpp.md)
[CodeDomExample#16 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/CodeDomExample/CS/source2.cs#16)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/CodeDomExample/CS/source2.cs.md)
[CodeDomExample#16 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/CodeDomExample/VB/source2.vb#16)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/CodeDomExample/VB/source2.vb.md)

To add a type to a namespace, add a [System.CodeDom.CodeTypeDeclaration](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeTypeDeclaration) that represents the type to add to the namespace to the `Types` collection of a **CodeNamespace**.

The following example demonstrates how to add a class named `class1` to a `CodeNamespace` named `samples`:

[CodeDomExample#17 (complete source file; reference: ../../../samples/snippets/cpp/VS_Snippets_CLR/CodeDomExample/CPP/source2.cpp#17)](../../../_code/samples/snippets/cpp/VS_Snippets_CLR/CodeDomExample/CPP/source2.cpp.md)
[CodeDomExample#17 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/CodeDomExample/CS/source2.cs#17)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/CodeDomExample/CS/source2.cs.md)
[CodeDomExample#17 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/CodeDomExample/VB/source2.vb#17)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/CodeDomExample/VB/source2.vb.md)

#### Add class members to a class

The [System.CodeDom](https://learn.microsoft.com/search/?terms=System.CodeDom) namespace provides a variety of elements that can be used to represent class members. Each class member can be added to the `Members` collection of a [System.CodeDom.CodeTypeDeclaration](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeTypeDeclaration).

#### Define a code entry point method for an executable

If you are building code for an executable program, it is necessary to indicate the entry point of a program by creating a [System.CodeDom.CodeEntryPointMethod](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeEntryPointMethod) to represent the method at which program execution should begin.

The following example demonstrates how to define an entry point method that contains a [System.CodeDom.CodeMethodInvokeExpression](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeMethodInvokeExpression) that calls **System.Console.WriteLine** to print "Hello World!":

[CodeDomExample#18 (complete source file; reference: ../../../samples/snippets/cpp/VS_Snippets_CLR/CodeDomExample/CPP/source2.cpp#18)](../../../_code/samples/snippets/cpp/VS_Snippets_CLR/CodeDomExample/CPP/source2.cpp.md)
[CodeDomExample#18 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/CodeDomExample/CS/source2.cs#18)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/CodeDomExample/CS/source2.cs.md)
[CodeDomExample#18 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/CodeDomExample/VB/source2.vb#18)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/CodeDomExample/VB/source2.vb.md)

The following statement adds the entry point method named `Start` to the `Members` collection of `class1`:

[CodeDomExample#19 (complete source file; reference: ../../../samples/snippets/cpp/VS_Snippets_CLR/CodeDomExample/CPP/source2.cpp#19)](../../../_code/samples/snippets/cpp/VS_Snippets_CLR/CodeDomExample/CPP/source2.cpp.md)
[CodeDomExample#19 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/CodeDomExample/CS/source2.cs#19)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/CodeDomExample/CS/source2.cs.md)
[CodeDomExample#19 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/CodeDomExample/VB/source2.vb#19)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/CodeDomExample/VB/source2.vb.md)

Now the [System.CodeDom.CodeCompileUnit](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeCompileUnit) named `compileUnit` contains the CodeDOM graph for a simple Hello World program. For information on generating and compiling code from a CodeDOM graph, see [Generating Source Code and Compiling a Program from a CodeDOM Graph](generating-and-compiling-source-code-from-a-codedom-graph.md).

### More information on building a CodeDOM graph

The CodeDOM supports the many common types of code elements found in programming languages that support the common language runtime. The CodeDOM was not designed to provide elements to represent all possible programming language features. Code that cannot be represented easily with CodeDOM elements can be encapsulated in a [System.CodeDom.CodeSnippetExpression](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeSnippetExpression), a [System.CodeDom.CodeSnippetStatement](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeSnippetStatement), a [System.CodeDom.CodeSnippetTypeMember](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeSnippetTypeMember), or a [System.CodeDom.CodeSnippetCompileUnit](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeSnippetCompileUnit). However, snippets cannot be translated to other languages automatically by the CodeDOM.

For documentation for the each of the CodeDOM types, see the reference documentation for the [System.CodeDom](https://learn.microsoft.com/search/?terms=System.CodeDom) namespace.

For a quick chart to locate the CodeDOM element that represents a specific type of code element, see the [CodeDOM Quick Reference](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/f1dfsbhc\(v=vs.100\)).
