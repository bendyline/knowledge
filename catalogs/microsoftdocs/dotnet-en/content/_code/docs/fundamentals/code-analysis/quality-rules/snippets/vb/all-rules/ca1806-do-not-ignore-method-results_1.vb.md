# Source code: docs/fundamentals/code-analysis/quality-rules/snippets/vb/all-rules/ca1806-do-not-ignore-method-results_1.vb

Complete source file; linked examples may select a region or line range.

```
Imports System

Namespace ca1806
    '<snippet1>
    Public Class Book
        Public Sub New(ByVal title As String)

            If title IsNot Nothing Then
                ' Violates this rule                
                title.Trim()
            End If

            Me.Title = title

        End Sub

        Public ReadOnly Property Title() As String

    End Class
    '</snippet1>

End Namespace

Namespace ca1806_2

    '<snippet2>
    Public Class Book
        Public Sub New(ByVal title As String)

            If title IsNot Nothing Then
                title = title.Trim()
            End If

            Me.Title = title

        End Sub

        Public ReadOnly Property Title() As String

    End Class
    '</snippet2>

End Namespace

```
