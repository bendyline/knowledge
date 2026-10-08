# Source code: samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/vb/replace1.vb

Complete source file; linked examples may select a region or line range.

```
' Visual Basic .NET Document
Option Strict On

' <Snippet4>
Imports System.Text.RegularExpressions

Module Example
    Public Sub Main()
        Dim pattern As String = "\b\d+\.\d{2}\b"
        Dim replacement As String = "$$$&"
        Dim input As String = "Total Cost: 103.64"
        Console.WriteLine(Regex.Replace(input, pattern, replacement))
    End Sub
End Module
' The example displays the following output:
'       Total Cost: $103.64
' </Snippet4>

```
