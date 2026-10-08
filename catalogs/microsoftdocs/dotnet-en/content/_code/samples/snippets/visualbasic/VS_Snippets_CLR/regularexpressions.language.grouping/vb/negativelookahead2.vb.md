# Source code: samples/snippets/visualbasic/VS_Snippets_CLR/regularexpressions.language.grouping/vb/negativelookahead2.vb

Complete source file; linked examples may select a region or line range.

```
' Visual Basic .NET Document
'
Option Strict On

' <Snippet8>
Imports System.Text.RegularExpressions

Module Example
    Public Sub Main()
        Dim pattern As String = "\b\w+\b(?!\p{P})"
        Dim input As String = "Disconnected, disjointed thoughts in a sentence fragment."
        For Each match As Match In Regex.Matches(input, pattern)
            Console.WriteLine(match.Value)
        Next
    End Sub
End Module
' The example displays the following output:
'       disjointed
'       thoughts
'       in
'       a
'       sentence
' </Snippet8>

```
