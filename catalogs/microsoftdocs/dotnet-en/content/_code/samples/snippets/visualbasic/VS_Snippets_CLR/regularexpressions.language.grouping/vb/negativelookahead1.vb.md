# Source code: samples/snippets/visualbasic/VS_Snippets_CLR/regularexpressions.language.grouping/vb/negativelookahead1.vb

Complete source file; linked examples may select a region or line range.

```
' Visual Basic .NET Document
Option Strict On

' <Snippet7>
Imports System.Text.RegularExpressions

Module Example
    Public Sub Main()
        Dim pattern As String = "\b(?!un)\w+\b"
        Dim input As String = "unite one unethical ethics use untie ultimate"
        For Each match As Match In Regex.Matches(input, pattern, RegexOptions.IgnoreCase)
            Console.WriteLine(match.Value)
        Next
    End Sub
End Module
' The example displays the following output:
'       one
'       ethics
'       use
'       ultimate
' </Snippet7>

```
