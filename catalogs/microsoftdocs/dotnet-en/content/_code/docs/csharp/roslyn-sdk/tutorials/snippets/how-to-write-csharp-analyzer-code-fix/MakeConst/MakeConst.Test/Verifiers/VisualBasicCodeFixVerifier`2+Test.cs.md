# Source code: docs/csharp/roslyn-sdk/tutorials/snippets/how-to-write-csharp-analyzer-code-fix/MakeConst/MakeConst.Test/Verifiers/VisualBasicCodeFixVerifier`2+Test.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.CodeAnalysis.CodeFixes;
using Microsoft.CodeAnalysis.Diagnostics;
using Microsoft.CodeAnalysis.Testing.Verifiers;
using Microsoft.CodeAnalysis.VisualBasic.Testing;

namespace MakeConst.Test
{
    public static partial class VisualBasicCodeFixVerifier<TAnalyzer, TCodeFix>
        where TAnalyzer : DiagnosticAnalyzer, new()
        where TCodeFix : CodeFixProvider, new()
    {
        public class Test : VisualBasicCodeFixTest<TAnalyzer, TCodeFix, MSTestVerifier>
        {
        }
    }
}

```
