# Source code: samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.formatting.overview/vb/singlecustom1.vb

Complete source file; linked examples may select a region or line range.

```
' Visual Basic .NET Document
Option Strict On

Module Example15
    Public Sub Main15()
        ' <Snippet8>
        Dim date1 As Date = #09/08/2009#
        Console.WriteLine(date1.ToString("%M"))      ' Displays 9
        ' </Snippet8>
    End Sub
End Module


```
