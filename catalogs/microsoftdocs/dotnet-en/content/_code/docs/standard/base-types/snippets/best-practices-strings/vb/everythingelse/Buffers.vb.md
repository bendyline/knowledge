# Source code: docs/standard/base-types/snippets/best-practices-strings/vb/everythingelse/Buffers.vb

Complete source file; linked examples may select a region or line range.

```
Imports System.Buffers

Namespace ExampleCode
    Partial Friend Class DemoCode

        Private Shared ReadOnly Commands As SearchValues(Of String) =
            SearchValues.Create(
                {"start", "run", "go", "begin", "commence"},
                StringComparison.OrdinalIgnoreCase)

        Sub ProcessCommand(command As String)
            If Commands.Contains(command) Then
                ' ...
            End If
        End Sub

    End Class
End Namespace

```
