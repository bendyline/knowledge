# Source code: docs/fundamentals/code-analysis/quality-rules/snippets/vb/all-rules/ca1052-static-holder-types-should-be-sealed_1.vb

Complete source file; linked examples may select a region or line range.

```
Imports System

Namespace ca1052

    Public Class StaticMembers

        Shared Property SomeProperty As Integer

        Private Sub New()
        End Sub

        Shared Sub SomeMethod()
        End Sub

    End Class

End Namespace

```
