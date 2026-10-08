# Source code: docs/fundamentals/code-analysis/quality-rules/snippets/vb/all-rules/ca1043-use-integral-or-string-argument-for-indexers_1.vb

Complete source file; linked examples may select a region or line range.

```
Imports System

Namespace ca1043

    Public Class Months
        '<Snippet1>
        Private month() As String = {"Jan", "Feb", "..."}

        Default ReadOnly Property Item(index As Integer) As String
            Get
                Return month(index)
            End Get
        End Property
        '</Snippet1>

    End Class

End Namespace

```
