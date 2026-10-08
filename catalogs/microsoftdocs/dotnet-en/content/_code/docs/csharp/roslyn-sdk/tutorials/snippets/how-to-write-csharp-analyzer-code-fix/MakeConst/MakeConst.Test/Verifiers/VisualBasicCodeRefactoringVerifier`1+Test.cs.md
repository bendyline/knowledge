# Source code: docs/csharp/roslyn-sdk/tutorials/snippets/how-to-write-csharp-analyzer-code-fix/MakeConst/MakeConst.Test/Verifiers/VisualBasicCodeRefactoringVerifier`1+Test.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.CodeAnalysis.CodeRefactorings;
using Microsoft.CodeAnalysis.Testing.Verifiers;
using Microsoft.CodeAnalysis.VisualBasic.Testing;

namespace MakeConst.Test
{
    public static partial class VisualBasicCodeRefactoringVerifier<TCodeRefactoring>
        where TCodeRefactoring : CodeRefactoringProvider, new()
    {
        public class Test : VisualBasicCodeRefactoringTest<TCodeRefactoring, MSTestVerifier>
        {
        }
    }
}

```
