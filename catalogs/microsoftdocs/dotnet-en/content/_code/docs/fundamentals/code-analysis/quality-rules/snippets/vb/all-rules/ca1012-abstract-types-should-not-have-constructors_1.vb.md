# Source code: docs/fundamentals/code-analysis/quality-rules/snippets/vb/all-rules/ca1012-abstract-types-should-not-have-constructors_1.vb

Complete source file; linked examples may select a region or line range.

```
Imports System

Namespace ca1012
    '<snippet1>
    ' Violates this rule      
    Public MustInherit Class Book

        Public Sub New()
        End Sub

    End Class
    '</snippet1>
End Namespace

Namespace ca1012_2
    '<snippet2>
    ' Violates this rule      
    Public MustInherit Class Book

        Protected Sub New()
        End Sub

    End Class
    '</snippet2>
End Namespace

```
