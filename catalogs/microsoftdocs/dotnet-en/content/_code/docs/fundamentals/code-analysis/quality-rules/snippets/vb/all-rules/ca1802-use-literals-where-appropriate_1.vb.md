# Source code: docs/fundamentals/code-analysis/quality-rules/snippets/vb/all-rules/ca1802-use-literals-where-appropriate_1.vb

Complete source file; linked examples may select a region or line range.

```
Imports System

Namespace ca1802

    ' This class violates the rule.
    Public Class UseReadOnly

        Shared ReadOnly x As Integer = 3
        Shared ReadOnly y As Double = x + 2.1
        Shared ReadOnly s As String = "readonly"

    End Class

    ' This class satisfies the rule.
    Public Class UseConstant

        Const x As Integer = 3
        Const y As Double = x + 2.1
        Const s As String = "const"

    End Class

End Namespace

```
