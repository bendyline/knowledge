# Source code: docs/fundamentals/code-analysis/quality-rules/snippets/vb/all-rules/ca1034-nested-types-should-not-be-visible_1.vb

Complete source file; linked examples may select a region or line range.

```
Imports System

Namespace ca1034

    Class ParentType

        Public Class NestedType
            Sub New()
            End Sub
        End Class

        Sub New()
        End Sub

    End Class

End Namespace

```
