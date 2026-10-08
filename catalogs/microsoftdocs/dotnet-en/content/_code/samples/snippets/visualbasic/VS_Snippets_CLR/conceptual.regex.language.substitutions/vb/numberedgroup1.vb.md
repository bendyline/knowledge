# Source code: samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.regex.language.substitutions/vb/numberedgroup1.vb

Complete source file; linked examples may select a region or line range.

```
' Visual Basic .NET Document
Option Strict On

' <Snippet1>
Imports System.Text.RegularExpressions

Module Example
    Public Sub Main()
        Dim pattern As String = "\p{Sc}*(\s?\d+[.,]?\d*)\p{Sc}*"
        Dim replacement As String = "$1"
        Dim input As String = "$16.32 12.19 £16.29 €18.29  €18,29"
        Dim result As String = Regex.Replace(input, pattern, replacement)
        Console.WriteLine(result)
    End Sub
End Module
' The example displays the following output:
'       16.32 12.19 16.29 18.29  18,29
' </Snippet1>      


```
