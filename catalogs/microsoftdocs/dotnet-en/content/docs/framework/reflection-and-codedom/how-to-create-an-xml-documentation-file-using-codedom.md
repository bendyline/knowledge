---
title: "How to: Create an XML Documentation File Using CodeDOM"
description: In this detailed example, see how to generate code that creates an XML documentation file using the Code Document Object Model (CodeDOM).
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "CodeDOM, generating XML documentation"
  - "XML documentation, creating using CodeDOM"
  - "Code Document Object Model, generating XML documentation"
ms.assetid: e3b80484-36b9-41dd-9d21-a2f9a36381dc
---
# How to: Create an XML documentation file using CodeDOM

CodeDOM can be used to create code that generates XML documentation. The process involves creating the CodeDOM graph that contains the XML documentation comments, generating the code, and compiling the generated code with the compiler option that creates the XML documentation output.

## Create a CodeDOM graph

1. Create a [System.CodeDom.CodeCompileUnit](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeCompileUnit) containing the CodeDOM graph for the sample application.

2. Use the [System.CodeDom.CodeCommentStatement.%23ctor*](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeCommentStatement.%2523ctor*) constructor with the `docComment` parameter set to `true` to create the XML documentation comment elements and text.

   [CodeDomHelloWorldSample#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/CodeDomHelloWorldSample/cs/program.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/CodeDomHelloWorldSample/cs/program.cs.md)
   [CodeDomHelloWorldSample#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/CodeDomHelloWorldSample/vb/program.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/CodeDomHelloWorldSample/vb/program.vb.md)

### Generate the code from the CodeCompileUnit

Use the [System.CodeDom.Compiler.CodeDomProvider.GenerateCodeFromCompileUnit*](https://learn.microsoft.com/search/?terms=System.CodeDom.Compiler.CodeDomProvider.GenerateCodeFromCompileUnit*) method to generate the code and create a source file to be compiled.

[CodeDomHelloWorldSample#5 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/CodeDomHelloWorldSample/cs/program.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/CodeDomHelloWorldSample/cs/program.cs.md)
[CodeDomHelloWorldSample#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/CodeDomHelloWorldSample/vb/program.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/CodeDomHelloWorldSample/vb/program.vb.md)

### Compile the code and generate the documentation file

Add the **/doc** compiler option to the [System.CodeDom.Compiler.CompilerParameters.CompilerOptions](https://learn.microsoft.com/search/?terms=System.CodeDom.Compiler.CompilerParameters.CompilerOptions) property of a [System.CodeDom.Compiler.CompilerParameters](https://learn.microsoft.com/search/?terms=System.CodeDom.Compiler.CompilerParameters) object and pass the object to the [System.CodeDom.Compiler.CodeDomProvider.CompileAssemblyFromFile*](https://learn.microsoft.com/search/?terms=System.CodeDom.Compiler.CodeDomProvider.CompileAssemblyFromFile*) method to create the XML documentation file when the code is compiled.

[CodeDomHelloWorldSample#6 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/CodeDomHelloWorldSample/cs/program.cs#6)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/CodeDomHelloWorldSample/cs/program.cs.md)
[CodeDomHelloWorldSample#6 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/CodeDomHelloWorldSample/vb/program.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/CodeDomHelloWorldSample/vb/program.vb.md)

## Example

The following code example creates a CodeDOM graph with documentation comments, generates a code file from the graph, and compiles the file and creates an associated XML documentation file.

[CodeDomHelloWorldSample#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/CodeDomHelloWorldSample/cs/program.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/CodeDomHelloWorldSample/cs/program.cs.md)
[CodeDomHelloWorldSample#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/CodeDomHelloWorldSample/vb/program.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/CodeDomHelloWorldSample/vb/program.vb.md)

The code example creates the following XML documentation in the *HelloWorldDoc.xml* file.

```xml
<?xml version="1.0" ?>
<doc>
  <assembly>
    <name>HelloWorld</name>
  </assembly>
  <members>
    <member name="T:Samples.Class1">
      <summary>
        Create a Hello World application.
      </summary>
      <seealso cref="M:Samples.Class1.Main" />
    </member>
    <member name="M:Samples.Class1.Main">
      <summary>
        Main method for HelloWorld application.
        <para>Add a new paragraph to the description.</para>
      </summary>
    </member>
  </members>
</doc>
```

## Compile permissions

This code example requires the `FullTrust` permission set to execute successfully.

## See also

- [Document your code with XML (Visual Basic)](../../visual-basic/programming-guide/program-structure/documenting-your-code-with-xml.md)
- [XML documentation comments](../../csharp/language-reference/xmldoc/index.md)
