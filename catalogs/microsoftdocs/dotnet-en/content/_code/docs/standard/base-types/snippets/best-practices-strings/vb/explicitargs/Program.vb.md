# Source code: docs/standard/base-types/snippets/best-practices-strings/vb/explicitargs/Program.vb

Complete source file; linked examples may select a region or line range.

```
Module Program
    Sub Main()
        CompareWithDefault()
        CompareExplicit()
    End Sub

    Sub CompareWithDefault()
        '<default>
        Dim url As New Uri("https://learn.microsoft.com/")

        ' Incorrect
        If String.Equals(url.Scheme, "https") Then
            ' ...Code to handle HTTPS protocol.
        End If
        '</default>
    End Sub

    Sub CompareExplicit()
        '<explicit>
        Dim url As New Uri("https://learn.microsoft.com/")

        ' Incorrect
        If String.Equals(url.Scheme, "https", StringComparison.OrdinalIgnoreCase) Then
            ' ...Code to handle HTTPS protocol.
        End If
        '</explicit>
    End Sub
End Module

```
