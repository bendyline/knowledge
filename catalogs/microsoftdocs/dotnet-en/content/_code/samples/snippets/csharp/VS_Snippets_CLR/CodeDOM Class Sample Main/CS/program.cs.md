# Source code: samples/snippets/csharp/VS_Snippets_CLR/CodeDOM Class Sample Main/CS/program.cs

Complete source file; linked examples may select a region or line range.

```
//<Snippet1>
using System;
using System.Reflection;
using System.IO;
using System.CodeDom;
using System.CodeDom.Compiler;
using Microsoft.CSharp;

namespace SampleCodeDom
{
    class Sample
    {
        CodeCompileUnit targetUnit;
        CodeTypeDeclaration targetClass;
        private const string outputFileName = "SampleCode.cs";
        static void Main(string[] args)
        {
        }
    }
}
//</Snippet1>

```
