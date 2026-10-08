# Source code: samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.regex.language.assertions/vb/word1.vb

Complete source file; linked examples may select a region or line range.

```
' Visual Basic .NET Document
Option Strict On

' <Snippet7>
Imports System.Text.RegularExpressions

Module Example
    Public Sub Main()
        Dim input As String = "area bare arena mare"
        Dim pattern As String = "\bare\w*\b"
        Console.WriteLine("Words that begin with 'are':")
        For Each match As Match In Regex.Matches(input, pattern)
            Console.WriteLine("'{0}' found at position {1}",
                              match.Value, match.Index)
        Next
    End Sub
End Module
' The example displays the following output:
'       Words that begin with 'are':
'       'area' found at position 0
'       'arena' found at position 10
' </Snippet7>

```
