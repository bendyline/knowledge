# Source code: docs/fundamentals/code-analysis/quality-rules/snippets/vb/all-rules/ca1401-p-invokes-should-not-be-visible_1.vb

Complete source file; linked examples may select a region or line range.

```
Imports System

Namespace ca1401

    ' Violates rule: PInvokesShouldNotBeVisible.
    Public Class NativeMethods
        Public Declare Function RemoveDirectory Lib "kernel32" (
        ByVal Name As String) As Boolean
    End Class

End Namespace

```
