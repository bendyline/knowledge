# Source code: samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.regex.language.assertions/vb/nonword1.vb

Complete source file; linked examples may select a region or line range.

```
' Visual Basic .NET Document
Option Strict On

' <Snippet8>
Imports System.Text.RegularExpressions

Module Example
    Public Sub Main()
        Dim input As String = "equity queen equip acquaint quiet"
        Dim pattern As String = "\Bqu\w+"
        For Each match As Match In Regex.Matches(input, pattern)
            Console.WriteLine("'{0}' found at position {1}",
                              match.Value, match.Index)
        Next
    End Sub
End Module
' The example displays the following output:
'       'quity' found at position 1
'       'quip' found at position 14
'       'quaint' found at position 21
' </Snippet8>

```
