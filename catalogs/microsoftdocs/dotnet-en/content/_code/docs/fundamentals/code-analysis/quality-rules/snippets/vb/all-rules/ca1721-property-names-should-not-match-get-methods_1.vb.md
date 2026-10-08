# Source code: docs/fundamentals/code-analysis/quality-rules/snippets/vb/all-rules/ca1721-property-names-should-not-match-get-methods_1.vb

Complete source file; linked examples may select a region or line range.

```
Imports System

Namespace ca1721

    Public Class Test

        Public ReadOnly Property [Date]() As DateTime
            Get
                Return DateTime.Today
            End Get
        End Property

        ' Violates rule: PropertyNamesShouldNotMatchGetMethods.
        Public Function GetDate() As String
            Return Me.Date.ToString()
        End Function

    End Class

End Namespace

```
