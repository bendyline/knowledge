---
title: "How to: Create a Class Using CodeDOM"
description: See a detailed example that explains how to create a class using the Code Document Object Model (CodeDOM).
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "Code Document Object Model, graphs"
  - "Code Document Object Model, creating classes"
  - "graphing with CodeDOM"
  - "CodeDOM, creating classes"
  - "CodeDOM, graphs"
ms.assetid: 0ceb70fe-36e1-49bb-922b-e9f615c20a14
---
# How to: Create a class Using CodeDOM

The following procedures illustrate how to create and compile a CodeDOM graph that generates a class containing two fields, three properties, a method, a constructor, and an entry point.

1. Create a console application that will use CodeDOM code to generate the source code for a class.

   In this example, the generating class is named `Sample`, and the generated code is a class named `CodeDOMCreatedClass` in a file named SampleCode.

2. In the generating class, initialize the CodeDOM graph and use CodeDOM methods to define the members, constructor, and entry point (`Main` method) of the generated class.

   In this example, the generated class has two fields, three properties, a constructor, a method, and a `Main` method.

3. In the generating class, create a language-specific code provider and call its [System.CodeDom.Compiler.CodeDomProvider.GenerateCodeFromCompileUnit*](https://learn.microsoft.com/search/?terms=System.CodeDom.Compiler.CodeDomProvider.GenerateCodeFromCompileUnit*) method to generate the code from the graph.

4. Compile and execute the application to generate the code.

   In this example, the generated code is in a file named SampleCode. Compile and execute that code to see the sample output.

## Create the application that will execute the CodeDOM code

Create a console application class to contain the CodeDOM code. Define the global fields that are to be used in the class to reference the assembly ([System.CodeDom.CodeCompileUnit](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeCompileUnit)) and class ([System.CodeDom.CodeTypeDeclaration](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeTypeDeclaration)), specify the name of the generated source file, and declare the `Main` method.

[CodeDOM Class Sample Main#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/CodeDOM Class Sample Main/CS/program.cs#1)](<../../../_code/samples/snippets/csharp/VS_Snippets_CLR/CodeDOM Class Sample Main/CS/program.cs.md>)
[CodeDOM Class Sample Main#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/CodeDOM Class Sample Main/VB/program.vb#1)](<../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/CodeDOM Class Sample Main/VB/program.vb.md>)

### Initialize the CodeDOM graph

In the constructor for the console application class, initialize the assembly and class, and add the appropriate declarations to the CodeDOM graph.

[CodeDOM Class Sample#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/CodeDOM Class Sample/CS/program.cs#2)](<../../../_code/samples/snippets/csharp/VS_Snippets_CLR/CodeDOM Class Sample/CS/program.cs.md>)
[CodeDOM Class Sample#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/CodeDOM Class Sample/VB/program.vb#2)](<../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/CodeDOM Class Sample/VB/program.vb.md>)

### Add members to the CodeDOM graph

- Add fields to the CodeDOM graph by adding [System.CodeDom.CodeMemberField](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeMemberField) objects to the [System.CodeDom.CodeTypeDeclaration.Members](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeTypeDeclaration.Members) property of the class.

  [CodeDOM Class Sample#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/CodeDOM Class Sample/CS/program.cs#3)](<../../../_code/samples/snippets/csharp/VS_Snippets_CLR/CodeDOM Class Sample/CS/program.cs.md>)
  [CodeDOM Class Sample#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/CodeDOM Class Sample/VB/program.vb#3)](<../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/CodeDOM Class Sample/VB/program.vb.md>)

- Add properties to the CodeDOM graph by adding [System.CodeDom.CodeMemberProperty](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeMemberProperty) objects to the [System.CodeDom.CodeTypeDeclaration.Members](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeTypeDeclaration.Members) property of the class.

  [CodeDOM Class Sample#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/CodeDOM Class Sample/CS/program.cs#4)](<../../../_code/samples/snippets/csharp/VS_Snippets_CLR/CodeDOM Class Sample/CS/program.cs.md>)
  [CodeDOM Class Sample#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/CodeDOM Class Sample/VB/program.vb#4)](<../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/CodeDOM Class Sample/VB/program.vb.md>)

- Add a method to the CodeDOM graph by adding a [System.CodeDom.CodeMemberMethod](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeMemberMethod) object to the [System.CodeDom.CodeTypeDeclaration.Members](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeTypeDeclaration.Members) property of the class.

   [CodeDOM Class Sample#5 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/CodeDOM Class Sample/CS/program.cs#5)](<../../../_code/samples/snippets/csharp/VS_Snippets_CLR/CodeDOM Class Sample/CS/program.cs.md>)
   [CodeDOM Class Sample#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/CodeDOM Class Sample/VB/program.vb#5)](<../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/CodeDOM Class Sample/VB/program.vb.md>)

- Add a constructor to the CodeDOM graph by adding a [System.CodeDom.CodeConstructor](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeConstructor) object to the [System.CodeDom.CodeTypeDeclaration.Members](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeTypeDeclaration.Members) property of the class.

   [CodeDOM Class Sample#6 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/CodeDOM Class Sample/CS/program.cs#6)](<../../../_code/samples/snippets/csharp/VS_Snippets_CLR/CodeDOM Class Sample/CS/program.cs.md>)
   [CodeDOM Class Sample#6 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/CodeDOM Class Sample/VB/program.vb#6)](<../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/CodeDOM Class Sample/VB/program.vb.md>)

- Add an entry point to the CodeDOM graph by adding a [System.CodeDom.CodeEntryPointMethod](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeEntryPointMethod) object to the [System.CodeDom.CodeTypeDeclaration.Members](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeTypeDeclaration.Members) property of the class.

   [CodeDOM Class Sample#7 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/CodeDOM Class Sample/CS/program.cs#7)](<../../../_code/samples/snippets/csharp/VS_Snippets_CLR/CodeDOM Class Sample/CS/program.cs.md>)
   [CodeDOM Class Sample#7 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/CodeDOM Class Sample/VB/program.vb#7)](<../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/CodeDOM Class Sample/VB/program.vb.md>)

### Generate the code from the CodeDOM graph

Generate source code from the CodeDOM graph by calling the [System.CodeDom.Compiler.CodeDomProvider.GenerateCodeFromCompileUnit*](https://learn.microsoft.com/search/?terms=System.CodeDom.Compiler.CodeDomProvider.GenerateCodeFromCompileUnit*) method.

[CodeDOM Class Sample#8 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/CodeDOM Class Sample/CS/program.cs#8)](<../../../_code/samples/snippets/csharp/VS_Snippets_CLR/CodeDOM Class Sample/CS/program.cs.md>)
[CodeDOM Class Sample#8 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/CodeDOM Class Sample/VB/program.vb#8)](<../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/CodeDOM Class Sample/VB/program.vb.md>)

### Create the graph and generate the code

1. Add the methods created in the preceding steps to the `Main` method defined in the first step.

   [CodeDOM Class Sample#9 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/CodeDOM Class Sample/CS/program.cs#9)](<../../../_code/samples/snippets/csharp/VS_Snippets_CLR/CodeDOM Class Sample/CS/program.cs.md>)
   [CodeDOM Class Sample#9 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/CodeDOM Class Sample/VB/program.vb#9)](<../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/CodeDOM Class Sample/VB/program.vb.md>)

2. Compile and execute the generating class.

## Example

The following code example shows the code from the preceding steps.

[CodeDOM Class Sample#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/CodeDOM Class Sample/CS/program.cs#1)](<../../../_code/samples/snippets/csharp/VS_Snippets_CLR/CodeDOM Class Sample/CS/program.cs.md>)
[CodeDOM Class Sample#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/CodeDOM Class Sample/VB/program.vb#1)](<../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/CodeDOM Class Sample/VB/program.vb.md>)

When the preceding example is compiled and executed, it produces the following source code.

[CodeDOM Class Sample#99 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/CodeDOM Class Sample/CS/SampleCode.cs#99)](<../../../_code/samples/snippets/csharp/VS_Snippets_CLR/CodeDOM Class Sample/CS/SampleCode.cs.md>)
[CodeDOM Class Sample#99 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/CodeDOM Class Sample/VB/SampleCode.vb#99)](<../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/CodeDOM Class Sample/VB/SampleCode.vb.md>)

The generated source code produces the following output when compiled and executed.

```output
The object:
 width = 5.3,
 height = 6.9,
 area = 36.57
```

## Compiling the Code

- This code example requires the `FullTrust` permission set to execute successfully.

## See also

- [Using the CodeDOM](using-the-codedom.md)
- [Generating and Compiling Source Code from a CodeDOM Graph](generating-and-compiling-source-code-from-a-codedom-graph.md)
